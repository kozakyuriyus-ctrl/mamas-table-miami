#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Lana's Kitchen Miami — Local Backup Script
# Creates a timestamped archive of the project (excluding secrets, deps, QA files)
#
# Usage:
#   bash scripts/backup-project.sh
#
# Output:
#   ~/Documents/LanasKitchenBackups/lanas-kitchen-YYYY-MM-DD_HH-MM-SS.tar.gz
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
BACKUP_DIR="$HOME/Documents/LanasKitchenBackups"
TIMESTAMP="$(date +%Y-%m-%d_%H-%M-%S)"
ARCHIVE_NAME="lanas-kitchen-${TIMESTAMP}.tar.gz"
ARCHIVE_PATH="${BACKUP_DIR}/${ARCHIVE_NAME}"

echo "──────────────────────────────────────────────"
echo "  Lana's Kitchen Miami — Backup"
echo "  $(date '+%Y-%m-%d %H:%M:%S')"
echo "──────────────────────────────────────────────"
echo "  Source:  $PROJECT_DIR"
echo "  Output:  $ARCHIVE_PATH"
echo ""

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Build the archive
# Excludes: .git, node_modules, secrets, QA files, Wrangler/gstack artifacts
tar --exclude='.git' \
    --exclude='node_modules' \
    --exclude='.wrangler' \
    --exclude='worker/.wrangler' \
    --exclude='.gstack' \
    --exclude='.DS_Store' \
    --exclude='*.pem' \
    --exclude='*.key' \
    --exclude='.env' \
    --exclude='.env.*' \
    --exclude='.dev.vars' \
    --exclude='worker/.dev.vars' \
    --exclude='credentials' \
    --exclude='credentials.json' \
    --exclude='qa-shots-brand' \
    --exclude='qa-shots-delivery' \
    --exclude='qa-shots-mobile-checkout' \
    --exclude='qa-shots-placeholder' \
    --exclude='qa-shots-places' \
    --exclude='qa-shots-production' \
    --exclude='qa-shots-production-smoke' \
    --exclude='qa-shots-targeted' \
    --exclude='qa-*.mjs' \
    --exclude='menu-audit-export.*' \
    --exclude='dishes.before-menu-audit-backup.json' \
    --exclude='package-lock.json' \
    --exclude='npm-debug.log*' \
    -czf "$ARCHIVE_PATH" \
    -C "$(dirname "$PROJECT_DIR")" \
    "$(basename "$PROJECT_DIR")"

# Verify the archive was created
if [ ! -f "$ARCHIVE_PATH" ]; then
  echo "ERROR: Archive was not created at $ARCHIVE_PATH" >&2
  exit 1
fi

ARCHIVE_SIZE=$(du -sh "$ARCHIVE_PATH" | cut -f1)

echo "  ✓ Archive created successfully"
echo ""
echo "  Path:    $ARCHIVE_PATH"
echo "  Size:    $ARCHIVE_SIZE"
echo "  Date:    $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# Show current git commit included in backup
if command -v git &>/dev/null; then
  CURRENT_COMMIT=$(git -C "$PROJECT_DIR" log -1 --format="%h %s" 2>/dev/null || echo "unknown")
  echo "  Git commit in this backup: $CURRENT_COMMIT"
  echo ""
fi

# List existing backups
echo "  Existing backups in $BACKUP_DIR:"
ls -lh "$BACKUP_DIR"/*.tar.gz 2>/dev/null | awk '{print "    " $5 "  " $9}' || echo "    (none)"
echo ""
echo "  Note: Old backups are NOT deleted automatically."
echo "        Remove them manually when no longer needed."
echo "──────────────────────────────────────────────"
