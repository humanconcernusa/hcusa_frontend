# hcusa — MERN starter with Next.js

Full MERN stack in **one** package. One command starts everything.

- **M**ongoDB Atlas — database
- **E**xpress — REST API under `/api`
- **N**ext.js (React 19) — all pages and UI, instead of plain React
- **N**ode.js — one server process for both

Next.js serves the pages. Express serves `/api/*`. Anything else goes to Next.js.
Because of this, do not create files in `src/app/api/` — put API code in `server/`.

## 1. Install

```bash
npm install
```

If your shell has `NODE_ENV=production` set (some tools set it), npm skips dev
packages. Use this instead:

```bash
npm install --include=dev
```

## 2. Connect MongoDB Atlas

1. Make a free cluster on https://www.mongodb.com/cloud/atlas
2. Make a database user (username and password).
3. Network Access -> add your IP address.
4. Connect -> Drivers -> copy the connection string.
5. Open `.env` and paste it:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/hcusa?retryWrites=true&w=majority
```

You can change the database name `hcusa` to any name you like.
Restart the server after changing `.env`.

The server still starts when MongoDB is not reachable. Open http://localhost:3000
to see the database state on the page. `/api/health` shows the same info as JSON.

## 3. Run

```bash
npm run dev        # development, hot reload
npm run build      # production build
npm start          # production server (run build first)
npm run lint       # eslint
npm run typecheck  # typescript check only
```

Open http://localhost:3000

## Folder structure

```
server/                 Express API
  index.ts              starts Next.js and Express in one http server
  app.ts                express app, middleware, mounts /api, error handler
  config/env.ts         reads .env
  config/db.ts          mongoose connection and status
  models/               mongoose schemas
  controllers/          request handlers
  routes/               route definitions
  middleware/           request logger, 404, error handler
  utils/                ApiError helper

src/
  app/                  Next.js pages (App Router)
  lib/api.ts            typed fetch helper used by the frontend
```

## Add a new endpoint

1. Add a model in `server/models/` (copy `user.ts`).
2. Add a controller in `server/controllers/`.
3. Add a router in `server/routes/`.
4. Register it in `server/routes/index.ts`:

```ts
apiRouter.use("/things", thingRouter);
```

Express 5 forwards errors from async functions by itself, so controllers do not
need try/catch. Just throw `ApiError.notFound("...")` or `ApiError.badRequest("...")`.

## Notes

- Custom CSS is in the "Custom CSS" block of `src/app/globals.css`.
  Tailwind utilities still work everywhere.
- CORS is enabled only when `CORS_ORIGIN` is set in `.env`.
  Same-origin requests need nothing.
- `.env` is git-ignored. Never commit real credentials.
- `next dev` and `next build` write `AGENTS.md` and `CLAUDE.md` notes for coding
  agents. Keep them in commits so the working tree stays clean.
