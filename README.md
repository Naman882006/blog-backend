# Strapi Blog Backend

## Prerequisites

- Node.js 18+ (LTS) with npm or yarn
- SQLite (bundled via `better-sqlite3`)

## Setup

```bash
cd backend
npm install
cp .env.example .env    # set real secrets before running
npm run develop
```

The admin panel will be available at `http://localhost:1337/admin`.

## Seeding Content

```bash
npm run seed
```

This script provisions:

- Author: Naman Sharma
- Category: Web Development
- Tag: JavaScript
- Posts: 2 sample posts with linked relations

## Permissions

Public role permissions are configured automatically in `src/index.js` so the REST API exposes:

- `GET /api/posts`
- `GET /api/posts/:slug`
- `GET /api/categories`
- `GET /api/tags`
- `GET /api/authors`

`POST /api/posts` is admin-only and protected by the `global::is-admin` policy.

## Uploads

The default upload provider is local disk (`/public/uploads`). To switch to S3 or another provider, configure `config/plugins.js`.

## Database

### SQLite (default)

Controlled via `.env`:

```
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

### PostgreSQL (production)

1. Install dependency:

   ```bash
   npm install pg
   ```

2. Update `.env`:

   ```
   DATABASE_CLIENT=postgres
   DATABASE_HOST=your-db-host
   DATABASE_PORT=5432
   DATABASE_NAME=your-db-name
   DATABASE_USERNAME=your-db-user
   DATABASE_PASSWORD=your-db-password
   DATABASE_SSL=true
   ```

3. Replace `config/database.js` with:

   ```js
   module.exports = ({ env }) => ({
     connection: {
       client: "postgres",
       connection: {
         host: env("DATABASE_HOST"),
         port: env.int("DATABASE_PORT", 5432),
         database: env("DATABASE_NAME"),
         user: env("DATABASE_USERNAME"),
         password: env("DATABASE_PASSWORD"),
         ssl: env.bool("DATABASE_SSL", false),
       },
     },
   });
   ```

4. Run `npm run build && npm run start`.

## Useful Commands

| Command          | Description                |
| ---------------- | -------------------------- |
| `npm run develop`| Start Strapi in watch mode |
| `npm run build`  | Build admin panel          |
| `npm run start`  | Start production server    |
| `npm run seed`   | Populate sample content    |

## Documentation

- API contracts: `docs/API.md`
- Seed script: `scripts/seed.js`


