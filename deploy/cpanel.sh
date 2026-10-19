#!/bin/bash
# Deploys the Oluseed Laravel app on a cPanel host.
#
# Layout after deployment:
#   $APP_DIR            the Laravel application (outside the web root)
#   $WEB_DIR            public_html: contents of public/, index.php pointed at $APP_DIR
#   $WEB_DIR/storage    symlink to $APP_DIR/storage/app/public (uploads)
#
# Run by .cpanel.yml, or manually from the repository root:
#   APP_DIR=$HOME/oluseed WEB_DIR=$HOME/public_html bash deploy/cpanel.sh
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_DIR="${APP_DIR:-$HOME/oluseed}"
WEB_DIR="${WEB_DIR:-$HOME/public_html}"
PHP_BIN="${PHP_BIN:-php}"

log() { printf '\n==> %s\n' "$*"; }

log "Deploying from $REPO"
log "App directory: $APP_DIR"
log "Web directory: $WEB_DIR"

# ---------------------------------------------------------------------------
# 1. Application files (everything except public/, vendor/, node_modules/, .git)
# ---------------------------------------------------------------------------
mkdir -p "$APP_DIR" "$WEB_DIR"

# public/ is copied here as well so Laravel finds public/build/manifest.json (Vite) and storage:link targets.
for item in app bootstrap config database public resources routes tests artisan composer.json composer.lock package.json package-lock.json vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json; do
  if [ -e "$REPO/$item" ]; then
    rm -rf "${APP_DIR:?}/$item"
    cp -R "$REPO/$item" "$APP_DIR/$item"
  fi
done

# Writable runtime directories (never deleted on deploy)
mkdir -p "$APP_DIR/storage/app/public" \
         "$APP_DIR/storage/framework/cache/data" \
         "$APP_DIR/storage/framework/sessions" \
         "$APP_DIR/storage/framework/views" \
         "$APP_DIR/storage/logs" \
         "$APP_DIR/bootstrap/cache"
chmod -R u+rwX,g+rwX "$APP_DIR/storage" "$APP_DIR/bootstrap/cache"

# ---------------------------------------------------------------------------
# 2. Environment file (created once, never overwritten)
# ---------------------------------------------------------------------------
if [ ! -f "$APP_DIR/.env" ]; then
  cp "$REPO/.env.example" "$APP_DIR/.env"
  sed -i 's#^APP_ENV=.*#APP_ENV=production#; s#^APP_DEBUG=.*#APP_DEBUG=false#' "$APP_DIR/.env"
  log "Created $APP_DIR/.env from .env.example. Set APP_URL, DB_* and ADMIN_* values, then deploy again."
fi

# ---------------------------------------------------------------------------
# 3. Composer dependencies
# ---------------------------------------------------------------------------
cd "$APP_DIR"
if command -v composer >/dev/null 2>&1; then
  log "Installing Composer dependencies"
  composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist
elif [ -f "$HOME/composer.phar" ]; then
  log "Installing Composer dependencies with ~/composer.phar"
  "$PHP_BIN" "$HOME/composer.phar" install --no-dev --optimize-autoloader --no-interaction --prefer-dist
elif [ ! -d "$APP_DIR/vendor" ]; then
  log "WARNING: composer not found and vendor/ is missing. Run 'composer install --no-dev' in $APP_DIR from the cPanel Terminal."
fi

# ---------------------------------------------------------------------------
# 4. Web root: contents of public/ with index.php pointed at the app
# ---------------------------------------------------------------------------
log "Publishing public/ to $WEB_DIR"
# Copy each entry of public/ (including dotfiles such as .htaccess), skipping any local storage link.
rm -rf "$APP_DIR/public/storage"
for entry in "$REPO"/public/* "$REPO"/public/.[!.]*; do
  [ -e "$entry" ] || continue
  name="$(basename "$entry")"
  [ "$name" = "storage" ] && continue
  rm -rf "${WEB_DIR:?}/$name"
  cp -R "$entry" "$WEB_DIR/$name"
done
# Laravel's front controller expects to live inside the app; rewrite its three relative paths.
sed -i "s#__DIR__\.'/\.\./#'$APP_DIR/#g" "$WEB_DIR/index.php"
# Uploads (CVs, images) served from /storage
rm -rf "$WEB_DIR/storage"
ln -sfn "$APP_DIR/storage/app/public" "$WEB_DIR/storage"

# ---------------------------------------------------------------------------
# 5. Laravel housekeeping
# ---------------------------------------------------------------------------
if [ -d "$APP_DIR/vendor" ]; then
  if ! grep -qE '^APP_KEY=.+' "$APP_DIR/.env"; then
    log "Generating APP_KEY"
    "$PHP_BIN" artisan key:generate --force --no-interaction
  fi

  log "Running migrations and seeding defaults"
  "$PHP_BIN" artisan migrate --force --no-interaction
  "$PHP_BIN" artisan db:seed --force --no-interaction

  log "Caching configuration and routes"
  "$PHP_BIN" artisan optimize:clear --no-interaction
  "$PHP_BIN" artisan optimize --no-interaction
fi

log "Deployment finished"
