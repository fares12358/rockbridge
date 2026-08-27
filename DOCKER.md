# Docker Setup

Runs the backend API and frontend web app as two containers via
`docker-compose.yml` at the repo root. There is **no database container** —
`MONGO_URI` (in `backend/.env`) points at a hosted MongoDB Atlas cluster, not
a local Mongo instance, so Docker only needs to reach the internet, not run a DB.

## Prerequisites

- Docker Desktop (or Docker Engine + Compose plugin) running
- `backend/.env` filled in (see `backend/README.md`) — it's read at container
  start via `env_file` and is **never** copied into the image or baked into a
  layer
- (Optional) a root `.env` — copy `.env.example` to `.env`. This is a
  **different file** from `backend/.env`: it's only read by `docker compose`
  itself, for `${VAR}` substitution inside `docker-compose.yml` (currently
  just `NEXT_PUBLIC_API_BASE` and the port overrides below) — it has nothing
  to do with the backend's runtime environment.

## Quick start

From the repo root:

```bash
docker compose up -d --build
```

- Backend: http://localhost:5000
- Frontend: http://localhost:3000

Stop everything (containers + network; does **not** touch `backend/uploads/`
on disk):

```bash
docker compose down
```

## Overriding ports

If 3000 or 5000 are already taken on your machine, override them with env
vars instead of editing the compose file:

```bash
BACKEND_PORT=5050 FRONTEND_PORT=3050 docker compose up -d --build
```

(This is exactly how it was verified while building this setup — port 5000
was already in use locally, and the override above worked without any file
changes.)

## Uploaded media

`backend/uploads/` is **bind-mounted**, not copied into the image or a named
volume — the container reads/writes the exact same folder you already use in
local dev. Nothing is duplicated, and removing containers/images never
deletes anything under `uploads/`.

## Frontend API base URL

`NEXT_PUBLIC_API_BASE` is inlined into the Next.js client bundle at **build**
time (Next.js does this for all `NEXT_PUBLIC_*` vars), so it can't be changed
by just restarting the container — it has to be set before a (re)build.

The recommended way is the root `.env` file mentioned in Prerequisites —
`docker compose` loads it automatically, no flags needed:

```bash
cp .env.example .env
# edit .env, then:
docker compose build frontend
docker compose up -d frontend
```

For a one-off override without touching `.env`, an inline var still works
and takes precedence:

```bash
NEXT_PUBLIC_API_BASE=http://localhost:5050/api docker compose build frontend
docker compose up -d frontend
```

Default (if neither `.env` nor an inline var sets it) is
`http://localhost:5000/api` — the backend's published port on the host,
since the browser (not the frontend container) is what actually calls this
URL. Note this is deliberately different from `frontend/lib/api.js`'s own
fallback (the production URL) — the compose default targets a
locally-running backend instead.

## Common commands

```bash
docker compose build backend        # rebuild just one image
docker compose logs backend -f      # tail logs
docker compose logs frontend -f
docker compose ps                   # container status
docker compose exec backend sh      # shell into the running backend
```

## Troubleshooting

- **"ports are not available" / "Only one usage of each socket address..."**
  Something on the host is already using 3000 or 5000. Use the port override
  above, or stop whatever's using it (e.g. a locally-running
  `npm run dev`/`npm start`).
- **Backend logs don't show "✅ MongoDB connected"** — check `MONGO_URI` in
  `backend/.env`; the container needs outbound internet access to reach
  Atlas.
- **`bcrypt` build errors** — shouldn't happen with the current
  `node:20-slim` (Debian/glibc) base image; this was specifically chosen
  over an Alpine image because `bcrypt`'s prebuilt native binary targets
  glibc. If you change the base image, expect to need build tools
  (`python3`, `make`, `g++`) or to switch to `bcryptjs`.
