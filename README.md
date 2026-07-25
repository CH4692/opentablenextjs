# Seatly

Restaurant discovery and reservation demo built with **Next.js**, **Prisma**, **Neon Postgres**, JWT auth, and Tailwind CSS. Portfolio project inspired by OpenTable-style booking flows — not affiliated with OpenTable.

## Features

- Browse and search restaurants by city, cuisine, and price
- Restaurant detail pages with ratings, photos, reviews, and menus
- Auth (sign up / sign in / session restore / sign out)
- End-to-end reservation flow persisted in Neon

## Stack

- Next.js App Router + Pages API routes
- Prisma + Neon PostgreSQL (develop / production branches)
- Tailwind CSS
- JWT auth (`jose` + cookie via `cookies-next`)

## Environments

| Git branch   | Neon branch | Env file (local)            |
|--------------|-------------|-----------------------------|
| `develop`    | develop     | `.env`                      |
| `production` | production  | `.env.production.local`     |

On Vercel / hosting:
- Preview / develop → Neon **develop** `DATABASE_URL` + `DIRECT_URL`
- Production → Neon **production** `DATABASE_URL` + `DIRECT_URL`

`DIRECT_URL` is the same Neon connection **without** `-pooler` in the hostname (needed for Prisma schema pushes).

### Vercel env vars (required or build fails)

In **Project → Settings → Environment Variables**, add for **Production** (and Preview if used):

| Name | Example |
|------|---------|
| `DATABASE_URL` | Neon pooled URL (`…-pooler…`) |
| `DIRECT_URL` | Neon direct URL (no `-pooler`) |
| `JWT_SECRET` | long random string |

Then **Redeploy**. Without `DATABASE_URL` / `DIRECT_URL`, `next build` crashes while prerendering `/` and `/search`.

## Setup

1. Copy env template and fill Neon URLs:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
npm install
```

3. Push schema to the develop database:

```bash
npm run db:push:develop
```

4. Start the app:

```bash
npm run dev
```

5. Seed demo data (destructive — wipes existing rows):

Open [http://localhost:3000/api/seed](http://localhost:3000/api/seed) once, then return to the home page.

Demo cities: `ottawa`, `toronto`, `niagara`.

### Production database

```bash
# loads .env.production.local then pushes schema
set -a && source .env.production.local && set +a && npx prisma db push
```

Then set the same production URLs in your host’s Production environment variables.

## Tests

Playwright E2E covers home, search, restaurant/menu, reservation, and auth.

```bash
npx playwright install chromium
npm test
```

The test runner starts `next dev`, seeds the database via `/api/seed`, then runs the suite.

### Scheduled CI + failure alerts

GitHub Actions runs Playwright daily at **07:00 UTC**, on push/PR, and via **Actions → Playwright E2E → Run workflow**.

**Required repository secrets** (`Settings → Secrets and variables → Actions`):

| Secret | Value |
|--------|--------|
| `DATABASE_URL` | Neon **develop** pooled URL (**required**) |
| `DIRECT_URL` | Neon **develop** direct URL (optional — CI derives it from `DATABASE_URL` by removing `-pooler`) |
| `JWT_SECRET` | any strong secret for CI (optional — CI falls back to a dummy value) |

**Optional:** `SLACK_WEBHOOK_URL` for Slack alerts.

On failure the workflow:
1. Uploads the Playwright HTML report as an artifact
2. Opens/comments a GitHub Issue labeled `playwright-failure`
3. Posts to Slack if `SLACK_WEBHOOK_URL` is set

Also enable GitHub email alerts: **GitHub → Settings → Notifications → Actions** → “Send notifications for failed workflows”.

## Demo path

1. Search a city from the hero
2. Open a restaurant → Overview / Menu
3. Pick party size, date, time → **Find a Time**
4. Complete the reservation form
5. Sign up / sign in and confirm the nav shows your name

## Notes

- Never commit `.env` / `.env*.local`. Rotate secrets if they were shared in chat or git history.
- `/api/seed` is blocked on Vercel unless `ALLOW_SEED=true`.
- This is a learning/portfolio demo.
