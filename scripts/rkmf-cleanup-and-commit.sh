#!/usr/bin/env bash
# RKMF Safe-Infra Batch 1 — cleanup + commit
# RUN THIS ON YOUR MAC, from the repo root: bash scripts/rkmf-cleanup-and-commit.sh
#
# Why on your Mac: the cloud-synced sandbox mount blocks file deletes and could
# not clear a stale .git/index.lock. Your Mac can do both. This script is
# idempotent and only touches junk patterns + the specific files I changed.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

echo "==> 1/5 Clear stale git lock + stray sandbox test file"
rm -f .git/index.lock
rm -f .__deltest_* 2>/dev/null || true

echo "==> 2/5 Confirm branch"
git rev-parse --abbrev-ref HEAD

echo "==> 3/5 Delete 357 committed junk files (.fuse_hidden / .bak / .DS_Store)"
git ls-files | grep -E '\.fuse_hidden|\.bak|\.DS_Store' > /tmp/rkmf_junk.txt || true
if [ -s /tmp/rkmf_junk.txt ]; then
  # remove from index + working tree
  tr '\n' '\0' < /tmp/rkmf_junk.txt | xargs -0 git rm -q --
fi
# also any untracked editor temp files on disk
find . -path ./node_modules -prune -o \( -name '.fuse_hidden*' -o -name '*.bak' -o -name '.DS_Store' \) -print -delete 2>/dev/null | wc -l | xargs echo "   extra untracked junk deleted:"

echo "==> 4/6 Stage Batch-1 infra changes (your unrelated WIP stays uncommitted)"
git add .gitignore app/layout.tsx next.config.mjs lighthouserc.json .github/
# NOTE: app/layout.tsx already contained your earlier <LangSync/> WIP line; it
# rides along since it is part of the same file. Other working-tree changes
# (other pages, lib/db.ts, sitemap.ts, docs) are NOT staged.

echo "==> 5/6 Commit infra"
git commit -m "chore(infra): purge 357 junk files; fix schema.org (NGO not 501c3) + DonateAction; drop CSP unsafe-eval; add CI + secret/dep scanning" \
  -m "Safe-infra Batch 1. Fonts self-hosting, nonce CSP, next/image, and E2E deferred to Batch 2 (need a build/deploy test). See RKMF-P1-BATCH1-IMPLEMENTATION.md."

echo "==> 6/6 Stage + commit fundraising/conversion changes"
# app/donate-now/page.tsx may also contain prior WIP — it rides along.
git add lib/analytics.ts components/DonateWidget.tsx app/donate-now/page.tsx
git commit -m "feat(donate): monthly-default + fee-cover opt-in + consent-gated funnel analytics; emotion + social proof on donate page" \
  -m "Conversion Batch 1 (§8). Amount-ladder redesign + impact/allocation strip deferred (need real cost math + fund-allocation %). See RKMF-FUNDRAISING-CONVERSION-AUDIT.md."

echo ""
echo "DONE. Next:"
echo "  1) npm run build   (local sanity)"
echo "  2) push -> Vercel preview"
echo "  3) Smoke-test the donate flow end to end; watch DevTools console for CSP"
echo "     violations (unsafe-eval removal) and confirm monthly is the default."
