# Lana's Kitchen Miami — Backup & Restore Procedures

> See also: [`RECOVERY.md`](../RECOVERY.md) for the full emergency recovery guide.

---

## Quick Backup

```bash
bash scripts/backup-project.sh
```

Creates: `~/Documents/LanasKitchenBackups/lanas-kitchen-YYYY-MM-DD_HH-MM-SS.tar.gz`

Run this before any significant change to the site.

---

## What the Backup Includes

The archive contains the full working copy of the project minus excluded paths:

| Included | Excluded |
|----------|----------|
| `index.html`, `styles.css`, `script.js` | `.git/` (repo history lives on GitHub) |
| All HTML pages | `node_modules/` |
| `assets/` (images, icons, favicon) | `.wrangler/`, `worker/.wrangler/` |
| `worker/index.js`, `worker/wrangler.toml` | `.gstack/` |
| `admin/index.html` | `.env`, `.dev.vars` (secrets) |
| `scripts/`, `docs/`, `RECOVERY.md` | `qa-shots-*/` (QA screenshots) |
| `.github/workflows/` | `*.pem`, `*.key` |
| `.gitignore` | `menu-audit-export.*` |
| | `dishes.before-menu-audit-backup.json` |
| | `package-lock.json` |

---

## Backup Frequency Recommendation

| Event | Action |
|-------|--------|
| Before any code change session | `bash scripts/backup-project.sh` |
| After successful production deploy | `bash scripts/backup-project.sh` |
| Weekly minimum | `bash scripts/backup-project.sh` |

---

## Restore from Local Backup

```bash
# 1. List available backups
ls ~/Documents/LanasKitchenBackups/

# 2. Inspect archive contents (without extracting)
tar -tzf ~/Documents/LanasKitchenBackups/lanas-kitchen-YYYY-MM-DD_HH-MM-SS.tar.gz | head -30

# 3. Extract to a temporary location
mkdir -p ~/Desktop/lanas-restore
tar -xzf ~/Documents/LanasKitchenBackups/lanas-kitchen-YYYY-MM-DD_HH-MM-SS.tar.gz \
    -C ~/Desktop/lanas-restore

# 4. Compare with current project or copy specific files
diff ~/Desktop/lanas-restore/mamas-table-miami/styles.css \
     ~/Documents/mamas-table-miami/styles.css
```

---

## Git-Based Rollback (Preferred Method)

Git history is the primary recovery mechanism. Prefer git over local archives for code changes.

### Revert last deploy

```bash
cd ~/Documents/mamas-table-miami
git log --oneline -5          # find the bad commit
git revert HEAD               # create a revert commit
git push origin main          # redeploy automatically
```

### Restore specific file

```bash
git checkout <commit-hash> -- styles.css
git add styles.css
git commit -m "restore: styles.css from <commit-hash>"
git push origin main
```

### Roll back to stable tag

```bash
git tag --sort=-creatordate   # list available tags
git checkout -b rollback-test production-stable-2026-07-08   # inspect tag
# If confirmed OK:
git checkout main
git reset --hard production-stable-2026-07-08
git push origin main          # forces GitHub Pages to redeploy
```

---

## Create a Stable Tag (Manual)

After a confirmed stable production deploy, create an annotated tag:

```bash
git tag -a production-stable-YYYY-MM-DD \
    -m "Stable production: brief description" \
    <commit-hash>

# Push tag to GitHub (after separate confirmation):
# git push origin production-stable-YYYY-MM-DD
```

---

## Verify Backup Integrity

```bash
# List and check archive is not zero bytes
ls -lh ~/Documents/LanasKitchenBackups/*.tar.gz

# Verify archive is valid (no extraction)
gzip -t ~/Documents/LanasKitchenBackups/lanas-kitchen-YYYY-MM-DD_HH-MM-SS.tar.gz
echo "Archive OK: $?"

# Check archive does NOT contain sensitive paths
tar -tzf ~/Documents/LanasKitchenBackups/lanas-kitchen-YYYY-MM-DD_HH-MM-SS.tar.gz \
    | grep -E "\.git$|node_modules|\.env$|\.dev\.vars|\.wrangler|\.gstack|qa-shots" \
    && echo "WARNING: excluded paths found" || echo "Clean: no excluded paths"
```

---

## Cloudflare Worker — Not Covered by Local Backup

The Worker (`lanas-kitchen-preorder-api`) is deployed to Cloudflare independently.

- **Source code** is in `worker/index.js` and IS included in the backup archive.
- **Secrets** (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, GOOGLE_PLACES_KEY) are stored in Cloudflare and are NOT in the archive. They survive code redeployments.
- **Worker rollback**: use Cloudflare dashboard → Workers → Deployments tab.

---

## Storage Management

Backups are NOT deleted automatically by the script. Manual cleanup:

```bash
# List backups with dates and sizes
ls -lh ~/Documents/LanasKitchenBackups/

# Delete a specific old backup
rm ~/Documents/LanasKitchenBackups/lanas-kitchen-YYYY-MM-DD_HH-MM-SS.tar.gz
```

Keep at minimum:
- The 3 most recent backups
- The backup matching the last known stable production commit
