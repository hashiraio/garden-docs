#!/usr/bin/env python3
"""Regenerate the catalogue-derived enums in an OpenAPI spec from the live catalogue.

The enums drive the API playground's dropdowns. Hand-maintained, they drift: a chain goes
live and the dropdown hides it, or one is retired and the dropdown offers a route that 400s.
`GET /chains` and `GET /assets` are the source of truth, so read them instead.

    python3 scripts/sync_catalogue.py --env testnet            # rewrite the testnet branch
    python3 scripts/sync_catalogue.py --env testnet --check    # report drift, change nothing

Four schemas are generated: `Chain` and `ChainWithId` from the chain catalogue, `Asset` and
`AssetName` from the asset catalogue. `AffiliateFeeAsset` is left alone; which assets may
collect a fee is a deployment setting no catalogue describes.

Only the branch of the `oneOf` whose `title` matches `--env` is touched; the other environment
is left byte-identical. `--check` exits 1 on drift, which is what CI keys on.
"""

from __future__ import annotations

import argparse
import json
import ssl
import sys
import urllib.request

BASES = {
    "testnet": "https://testnet.api.garden.finance",
    "mainnet": "https://api.garden.finance",
}

# The catalogue each schema reads, and the field naming an entry within it.
SOURCE = {
    "Chain": ("chains", "chain"),
    "ChainWithId": ("chains", "id"),
    "Asset": ("assets", "id"),
    "AssetName": ("assets", "name"),
}

# Entries pinned to the front of a dropdown; everything else sorts alphabetically. A pinned
# entry that is no longer live is dropped like any other.
FEATURED = {
    ("testnet", "Chain"): ["arbitrum_sepolia"],
    ("testnet", "Asset"): ["arbitrum_sepolia:wbtc", "ethereum_sepolia:wbtc"],
    ("mainnet", "Chain"): ["arbitrum", "ethereum", "bitcoin"],
    ("mainnet", "Asset"): ["arbitrum:wbtc", "ethereum:wbtc"],
}

# Schemas naming the same rows as another schema through a different field, and so inheriting
# its pins: `Chain` pins `arbitrum_sepolia`, `ChainWithId` pins whatever `id` that row carries.
MIRRORS = {"ChainWithId": "Chain", "AssetName": "Asset"}


def ssl_context() -> ssl.SSLContext:
    """The system trust store, falling back to certifi where Python has no usable one."""
    try:
        import certifi
    except ImportError:
        return ssl.create_default_context()
    return ssl.create_default_context(cafile=certifi.where())


CONTEXT = ssl_context()

# The gateway rejects the default urllib agent.
USER_AGENT = "garden-docs-catalogue-sync"

CACHE: dict[tuple[str, str], list[dict]] = {}


def fetch(base: str, collection: str) -> list[dict]:
    """Read a catalogue, preferring v3 and falling back to v2 where v3 is not yet routed.

    Several schemas read the same two catalogues, so each is fetched once per run.
    """
    if (base, collection) in CACHE:
        return CACHE[(base, collection)]

    last = None
    for version in ("v3", "v2"):
        url = f"{base}/{version}/{collection}"
        request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
        try:
            with urllib.request.urlopen(request, timeout=45, context=CONTEXT) as response:
                if response.status != 200:
                    last = f"{url} -> {response.status}"
                    continue
                rows = json.load(response)["result"]
        except Exception as error:  # noqa: BLE001 - any failure just tries the next version
            last = f"{url} -> {error}"
            continue
        CACHE[(base, collection)] = rows
        return rows
    raise SystemExit(f"could not read {collection}: {last}")


def live_rows(base: str, collection: str) -> list[dict]:
    """Catalogue rows currently served. Inactive ones are reachable only via `include_legacy`."""
    return [row for row in fetch(base, collection) if row.get("is_active", True)]


def pins(rows: list[dict], env: str, name: str) -> list[str]:
    """One schema's pinned entries, expressed in its own field.

    A mirror inherits its source's pins: the pinned row is found by the source's field, then
    read back through the mirror's. Two pins can name one row, so duplicates collapse.
    """
    source = MIRRORS.get(name, name)
    _, source_field = SOURCE[source]
    _, field = SOURCE[name]

    by_source = {row[source_field]: row[field] for row in rows}
    ordered: list[str] = []
    for entry in FEATURED[(env, source)]:
        value = by_source.get(entry)
        if value is not None and value not in ordered:
            ordered.append(value)
    return ordered


def live_ids(base: str, env: str, name: str) -> list[str]:
    """Live entries for one schema, featured first, the rest alphabetical."""
    collection, field = SOURCE[name]
    rows = live_rows(base, collection)
    ids = {row[field] for row in rows}
    featured = pins(rows, env, name)
    return featured + sorted(ids - set(featured))


def branch(spec: dict, name: str, env: str) -> dict:
    """The `oneOf` member of a schema that carries one environment's enum."""
    for member in spec["components"]["schemas"][name]["oneOf"]:
        if member.get("title") == env:
            return member
    raise SystemExit(f"{name} has no {env!r} branch")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--env", choices=sorted(BASES), default="testnet")
    parser.add_argument("--spec", default="api-reference/openapi-v3.json")
    parser.add_argument(
        "--check",
        action="store_true",
        help="report drift and exit 1 without writing",
    )
    args = parser.parse_args()

    spec = json.loads(open(args.spec).read())
    base = BASES[args.env]

    changed = False
    for name in SOURCE:
        member = branch(spec, name, args.env)
        current = list(member["enum"])
        wanted = live_ids(base, args.env, name)

        added = sorted(set(wanted) - set(current))
        removed = sorted(set(current) - set(wanted))
        if not added and not removed and current == wanted:
            print(f"{name:11} {args.env}: {len(wanted)} entries, already in sync")
            continue

        changed = True
        print(f"{name:11} {args.env}: {len(current)} -> {len(wanted)} entries")
        for entry in added:
            print(f"  + {entry}")
        for entry in removed:
            print(f"  - {entry}")
        member["enum"] = wanted

    if args.check:
        if changed:
            sys.stdout.flush()  # keep the report above the verdict in CI logs
            print("\ndrift found; run without --check to apply", file=sys.stderr)
            return 1
        return 0

    if not changed:
        return 0

    # Reproduces the file's existing serialization, so the diff is the enums and nothing else.
    open(args.spec, "w").write(json.dumps(spec, indent=2, ensure_ascii=False) + "\n")
    print(f"\nwrote {args.spec}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
