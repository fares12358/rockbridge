# ---- deps: install once, cached separately from source changes ----
FROM node:20-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder ----
FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* vars are inlined into the client bundle at build time, so
# this must be passed as a build arg, not a runtime env var.
# Defaults to the production API; override for local/other deployments, e.g.:
#   docker compose build --build-arg NEXT_PUBLIC_API_BASE=http://localhost:5000/api frontend
ARG NEXT_PUBLIC_API_BASE=https://rockbridge.store/api
ENV NEXT_PUBLIC_API_BASE=$NEXT_PUBLIC_API_BASE

RUN npm run build

# ---- runner: only the standalone server output, no full node_modules ----
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
