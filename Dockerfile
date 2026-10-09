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
# The warm-up port is deliberately unusual and is read back from the CLI's own output:
# Coolify runs build steps on the host network, where :3000 can already be taken, and
# `mint dev` then silently moves to the next free port ("trying 3001 instead").
RUN set -eu; \
    mint dev --no-open --port 43111 > /tmp/mint-warmup.log 2>&1 & \
    pid=$!; \
    port=""; \
    for _ in $(seq 1 180); do \
      port=$(sed -n 's#.*local.*http://localhost:\([0-9]*\).*#\1#p' /tmp/mint-warmup.log | head -n1); \
      if [ -n "$port" ] && curl -sf -o /dev/null "http://127.0.0.1:$port/"; then break; fi; \
      port=""; \
      sleep 2; \
    done; \
    if [ -z "$port" ]; then echo "warm-up never became ready"; cat /tmp/mint-warmup.log; exit 1; fi; \
    kill "$pid" 2>/dev/null || true; \
    rm -f /tmp/mint-warmup.log

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=90s --retries=3 \
  CMD curl -sf -o /dev/null http://127.0.0.1:3000/ || exit 1

# --port is undocumented in `mint dev --help` but works. The server binds 0.0.0.0.
CMD ["mint", "dev", "--no-open", "--port", "3000"]