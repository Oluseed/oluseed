# Oluseed Technologies website

A Laravel application with a React front end.

- **Laravel** handles routing, the database (Eloquent + migrations), authentication (Sanctum), file storage and the JSON API.
- **React 19 + Vite + Tailwind v4 + Framer Motion** power the public site and the admin area, bundled through Laravel's Vite plugin and served from `resources/views/app.blade.php`.

## Requirements

PHP 8.3+, Composer, Node 20+ and SQLite (default) or MySQL/PostgreSQL.

## Getting started

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed      # creates tables, the admin user and default content
php artisan storage:link        # exposes uploads at /storage
composer run dev                # Laravel on :8000 + Vite HMR + queue + logs
```

Open **http://localhost:8000**. Do not open the Vite port (5173) directly; it only serves assets and will show a 404 for page URLs.

### Admin

Go to **http://localhost:8000/admin** and sign in with:

| Email | Password |
| --- | --- |
| admin@admin.com | admin123 |

Change these with `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`. The stored password hash is synced from `.env` on the next login or on `php artisan db:seed`.

## Scripts

| Command | What it does |
| --- | --- |
| `composer run dev` | Laravel dev server, Vite with hot reload, queue worker and log tail |
| `php artisan serve` + `npm run dev` | The same two pieces, run separately |
| `npm run build` | Type-checks and bundles the front end into `public/build` |
| `php artisan test` | Runs the API feature tests |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript |

## Languages

The site is available in English and French. Visitors switch with the EN / FR pill in the navbar (their choice is remembered in the browser). Two kinds of text are translated:

- **Interface strings** (buttons, labels, forms, legal pages): `resources/js/i18n/en.ts` and `fr.ts`.
- **Site content** (hero, services, projects, FAQ, posts, products...): one content document per language in the `site_contents` table, seeded from `resources/js/content/default-content.json` and `default-content.fr.json`.

In the admin, the "Editing content in" switch at the top chooses which language you are editing. Projects, jobs, products and posts are kept in sync across languages automatically (added, removed and reordered everywhere; images, links, prices and flags mirrored), so you only translate their text.

To add a language: add its code to `locales` in `config/oluseed.php`, create `default-content.<code>.json`, add a dictionary in `resources/js/i18n/` and register it in `i18n/context.ts`.

## What the admin area does

- **Overview**: counts, recent applications and messages, JSON export/import, reset to defaults.
- **Projects**: add any project by URL. A screenshot preview is captured automatically if no image is uploaded. Star up to three projects to feature on the home page. Reorder with the arrows.
- **Applications**: everyone who applied through the careers or internships pages, with CV download, status, job/internship filter and search.
- **Messages**: contact-form submissions.
- **Site content**: every section of every page (brand details, hero, stats, services, why us, testimonials, FAQ, page headers, about, contact, careers and benefits, internships, shop products, blog posts, footer).
- **Internships**: publish internship tracks (title, department, duration, location, stipend, deadline, requirements, open/closed) under Site content > Internships. They appear on `/internships`, where visitors apply with a CV; submissions land in Applications tagged as internships.

## Data model

| Table | Purpose |
| --- | --- |
| `site_contents` | One row holding all editable site content as JSON (projects, services, posts, products, copy) |
| `applications` | Job applications submitted from the careers page (CV stored on the `public` disk under `cvs/`) |
| `contact_messages` | Contact form submissions |
| `subscribers` | Newsletter signups from the footer |
| `users` + `personal_access_tokens` | The admin account and its Sanctum tokens |

Default content lives in `resources/js/content/default-content.json`. It seeds the database on first run, is used by "Reset to defaults", and is bundled into the front end as an offline fallback.

## API

All endpoints live under `/api` (see `routes/api.php`). Public: `GET content`, `POST applications`, `POST messages`, `POST subscribers`, `POST upload/cv`, `POST auth/login`. Everything else requires a Sanctum bearer token issued by the login endpoint. Public write endpoints are rate limited.

## Using MySQL / phpMyAdmin

`database/sql/oluseed.sql` is a ready-made MySQL / MariaDB dump with the full schema and seed data (admin account, English and French content, migration records).

1. In phpMyAdmin create an empty database (for example `oluseed`) with the `utf8mb4_unicode_ci` collation.
2. Open it, go to **Import**, choose `database/sql/oluseed.sql` and run it.
3. In `.env` set:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=oluseed
   DB_USERNAME=root
   DB_PASSWORD=
   ```
4. Run `php artisan config:clear`. No `php artisan migrate` is needed; the migrations table is already filled.

The admin password in the dump is the bcrypt hash of `ADMIN_PASSWORD` at generation time (default `admin123`). Changing `ADMIN_PASSWORD` in `.env` later re-syncs the stored hash on the next login. To regenerate the dump after changing migrations or default content, run `php database/sql/build.php`.

## Deploying

1. Set `APP_ENV=production`, `APP_DEBUG=false`, `APP_URL`, your database credentials and the admin credentials in `.env`.
2. Run `composer install --no-dev --optimize-autoloader`, `npm ci && npm run build`, `php artisan migrate --force --seed`, `php artisan storage:link` and `php artisan optimize`.
3. Point your web server (Nginx, Apache, Laravel Forge, Ploi, shared hosting with the `public/` folder as document root) at `public/`.

## Project structure

```
app/Http/Controllers/Api   API controllers (auth, content, applications, messages, subscribers, uploads)
app/Models                 SiteContent, Application, ContactMessage, Subscriber, User
database/migrations        Schema
routes/api.php             JSON API
routes/web.php             Catch-all that renders the React app
resources/views/app.blade.php
resources/js/admin         Admin pages and the schema-driven content editor
resources/js/content       Content types, defaults, API client and React context
resources/js/components    Public site components (motion primitives in components/motion)
resources/js/pages         Route pages
public/images              Default images referenced by content
tests/Feature/ApiTest.php  API tests
```
