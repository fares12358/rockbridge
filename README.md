# Rock Bridge

Marketing site and admin dashboard for **Rock Bridge** — import, export, and
commercial mediation services connecting businesses to global markets from
Saudi Arabia ([rockbridge.store](https://rockbridge.store)).

The public site showcases services, a media gallery, and a quote-request
form; an admin dashboard manages that content and reviews incoming quote
requests.

## Structure

This is a two-app repo:

| App | Stack | Detail |
| :-- | :-- | :-- |
| [`backend/`](backend/README.md) | Node.js, Express, MongoDB (Mongoose), JWT auth | REST API — services, media, quote requests, auth |
| [`frontend/`](frontend/README.md) | Next.js 16 (App Router), React 19, Tailwind CSS 4 | Public site + `/dashboard` admin UI |

Each app's README has the full tech stack, API/route reference, and
project-structure breakdown — this file just covers running them together.

## Prerequisites

- Node.js
- A MongoDB connection string (the backend expects a live MongoDB instance —
  Atlas or otherwise; there's no bundled local database)
- Docker + Docker Compose, if you'd rather run it containerized (see below)

## Getting started (local, no Docker)

1. Install dependencies for all three `package.json`s:
   ```bash
   npm install
   npm install --prefix backend
   npm install --prefix frontend
   ```

2. Configure the backend — create `backend/.env` per
   [`backend/README.md`](backend/README.md#environment-setup).

3. Seed the admin login (sets/resets that one user's credentials only —
   doesn't touch services, media, or quotes):
   ```bash
   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=changeme npm run seed:admin --prefix backend
   ```

4. (Optional) Point the frontend at a specific backend URL — copy
   `frontend/.env.local.example` to `frontend/.env.local` and adjust
   `NEXT_PUBLIC_API_BASE`. Without it, the frontend falls back to the
   production API.

5. Run both apps from the repo root:
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

   Or run just one: `npm run dev:frontend` / `npm run dev:backend`.

## Getting started (Docker)

```bash
docker compose up -d --build
```

No database container is included — the backend connects to whatever
`MONGO_URI` in `backend/.env` points at. Full setup, port overrides, and
troubleshooting are in [`DOCKER.md`](DOCKER.md).

## Root-level scripts

```bash
npm run dev            # frontend + backend concurrently
npm run dev:frontend
npm run dev:backend
npm run build           # next build (frontend only)
npm start                # node backend/src/server.js
```

There is no automated test suite in either app.
