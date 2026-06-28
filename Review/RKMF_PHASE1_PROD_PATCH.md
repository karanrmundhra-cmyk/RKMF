# RKMF — Phase 1 PRODUCTION Patch Plan (plan only — nothing implemented)

**Repo:** this folder *is* the live Next.js source for rkmfoundation.com (`app/`, `components/`, `.git`, `.vercel`).
**Branch:** `main` · **Date:** 19 Jun 2026 · **Status:** PLAN ONLY. No `.tsx` edited, no build, no deploy.

---

## ⚠️ READ FIRST — scope reconciliation (important)

The 6 items were approved on the **standalone preview** (`RKMF-Premium-Final-Preview.html`), which is a 4-card layout with a custom before/after slider. The **production** homepage is different:

- The live "Four ways" section is **editorial numbered rows** (`components/prototype-v2/WhatWeDo.tsx`), not 4 cards.
- **There is NO before/after slider in production.** Confirmed: no slider component exists in `app/` or `components/` (only in the preview HTML). The live homepage's only "drag" element is the donation-amount slider — unrelated.

**Therefore only 3 of the 6 approved items map to production:**

| Approved item | Maps to production? | Why |
|---|---|---|
| 1. One-line heading | ✅ Yes | Heading exists in `WhatWeDo.tsx` |
| 2. Heal image | ✅ Yes | Image src in `WhatWeDo.tsx` |
| 3. Shelter image | ✅ Yes | Image src in `WhatWeDo.tsx` |
| 4. Slider enhancement | ❌ No | No slider in production |
| 5. Slider accessibility | ❌ No | No slider in production |
| 6. Slider mobile interaction | ❌ No | No slider in production |

Recommendation: ship items **1–3** now. Items 4–6 would mean **adding a new before/after section** to the live site — that's a new feature / redesign, which you said you don't want yet. Keep them for a later, separately-approved batch.

---

## ⚠️ Repo state caveat (affects rollback)

`git status` shows the working tree is **already dirty** from prior sessions — e.g. `M app/about/page.tsx`, `app/csr/page.tsx`, `app/donate-now/page.tsx`, and others are modified but uncommitted. Before applying Phase 1, those changes should be **committed or stashed** so the Phase-1 diff is isolated and cleanly reversible. Otherwise rollback will be tangled with unrelated edits.

Recommended: do Phase 1 on a **new branch** off a clean commit → trivial rollback.

---

## The patch — exact files, lines, diffs

### File 1 — `components/prototype-v2/WhatWeDo.tsx`

**Item 1 · one-line heading — line 25**
```diff
- <h2 className="display-2 mt-5 max-w-[16ch] text-balance">Four ways we show up for animals.</h2>
+ <h2 className="display-2 mt-5 whitespace-nowrap max-md:whitespace-normal">Four ways we show up for animals.</h2>
```
`max-w-[16ch]` is what forces the two-line wrap. Removing it + `whitespace-nowrap` gives one line on desktop/tablet; `max-md:whitespace-normal` lets it wrap on phones (no overflow). (`text-balance` is redundant once nowrap, so dropped.)

**Item 2 · Heal image — line 15**
```diff
- { word: "Heal", label: "With trusted vets", desc: "...", src: "/images/site/heal.jpg", alt: "A rescued dog receiving veterinary care at the RKM shelter" },
+ { word: "Heal", label: "With trusted vets", desc: "...", src: "/images/site/heal-v2.jpg", alt: "A golden retriever holding a flower" },
```

**Item 3 · Shelter image — line 16**
```diff
- { word: "Shelter", label: "A place to rest", desc: "...", src: "/images/site/rest.jpg", alt: "A rescued dog resting at the RKM Foundation shelter" },
+ { word: "Shelter", label: "A place to rest", desc: "...", src: "/images/site/shelter-cat.jpg", alt: "A rescued ginger cat resting" },
```

### File 2 — new image assets (add to `public/images/site/`)

| New file | Image | Source (free Unsplash license) |
|---|---|---|
| `public/images/site/heal-v2.jpg` | golden retriever holding a tulip | `images.unsplash.com/photo-1552053831-71594a27632d` |
| `public/images/site/shelter-cat.jpg` | ginger cat | `images.unsplash.com/photo-1573865526739-10659fec78a5` |

Why new filenames (not overwriting `heal.jpg`/`rest.jpg`): those two files are **also used by the Hindi homepage** (`components/home/HomeHi.tsx` lines 19–20). New filenames keep this change isolated to the English Heal/Shelter rows. `EditorialFigure` renders a plain `<img>`, so the Unsplash CDN URL would also work directly — but **self-hosting is recommended** (no third-party-CDN dependency, faster, no `next.config` change).

### Optional — Hindi parity (`components/home/HomeHi.tsx`)
If you want the Hindi homepage to match, the same two src swaps apply at lines 19 (इलाज/Heal) and 20 (आश्रय/Shelter). Not included by default — your call.

---

## Before / After (images)

- **Before (current live):** Heal = real photo of two people with a rescued white dog (`heal.jpg`); Shelter = real photo of a black-and-white shelter dog (`rest.jpg`). *(Both verified by opening the live URLs.)*
- **After (approved):** Heal = golden retriever with tulip; Shelter = ginger cat. *(Both verified — they match your second screenshot.)*

A pixel-accurate **rendered** "after" will come from the **Phase 2 preview deployment**, because the live layout (editorial rows) differs from the preview's card layout — the new images need to be eyeballed in the real component, not just the mockup.

---

## Content consideration (flag, not a blocker)
Production currently uses **real RKM field photos** (actual rescued animals + team). The approved change swaps them for **stock** images. For an NGO, authentic field photos often build *more* donor trust than stock. You approved the swap — flagging it so it's a conscious choice. Options: keep real photos / use the approved stock / source higher-quality real photos of an animal being healed and a sheltered animal.

---

## Rollback plan

**Best practice:** make Phase 1 a single commit on a branch.
```
git switch -c phase1-approved        # off a clean baseline (after handling the dirty tree)
# apply the 3 edits + add the 2 images
git add -A && git commit -m "Phase 1: one-line heading + Heal/Shelter images"
```
- **Rollback (whole patch):** `git revert <commit>` — or just don't merge the branch.
- **Rollback (per change):** restore the 3 lines in `WhatWeDo.tsx` to the "before" above; delete `heal-v2.jpg` and `shelter-cat.jpg`. Each is independent.
- **Caveat:** isolate from the existing dirty working tree first (commit/stash unrelated `M` files) or the revert will be muddied.

---

## Explicitly NOT in this patch
copy · colours · typography · spacing · navigation · section order · donation flow · Razorpay · donor data · compliance · all other images · and the before/after slider (does not exist in production).

---

## Phase 2 (only after you approve this plan)
1. Handle the dirty tree (commit/stash prior changes).
2. New branch; apply the 3 edits + 2 images; run `next build` locally to verify it compiles.
3. Push branch → Vercel **preview** deployment (preview only, never production).
4. Deliver: `git diff`, changed-files list, preview URL, visual QA (desktop + mobile + the one-line heading + both new images).

**What I can do in Phase 2:** the code edits + local `next build` verification + the git diff.
**What I cannot do:** trigger the Vercel deploy or merge to production — that needs your account/CI and is a deploy action you've (rightly) gated. Pushing the branch to your connected repo will auto-create the Vercel preview.

**Phase 1 is plan-only. Awaiting your approval before any code is touched.**
