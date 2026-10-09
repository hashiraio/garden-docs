# Serves the docs with the Mintlify CLI's dev server, which is the only renderer the
# CLI ships: there is no `mint build` and no static export.
FROM node:22-slim

RUN apt-get update \
 && apt-get install -y --no-install-recommends curl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# Pin the CLI. `mint dev` pairs with a client it downloads at runtime, so an unpinned
# CLI means the rendered output can change without a commit.
RUN npm install -g mint@4.2.284

WORKDIR /docs
COPY . .

# First run downloads the client (~321MB) and builds the project preview (~356MB) into
# $HOME/.mintlify. Doing it at build time bakes both into the image, so the container
# starts in seconds rather than downloading on every boot. Needs network egress here.
RUN set -eu; \
    mint dev --no-open --port 3000 & \
    for _ in $(seq 1 180); do \
      curl -sf -o /dev/null http://127.0.0.1:3000/ && break; \
      sleep 2; \
    done; \
    curl -sf -o /dev/null http://127.0.0.1:3000/ || { echo "warm-up never became ready"; exit 1; }; \
    kill %1 2>/dev/null || true

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=90s --retries=3 \
  CMD curl -sf -o /dev/null http://127.0.0.1:3000/ || exit 1

# --port is undocumented in `mint dev --help` but works. The server binds 0.0.0.0.
CMD ["mint", "dev", "--no-open", "--port", "3000"]