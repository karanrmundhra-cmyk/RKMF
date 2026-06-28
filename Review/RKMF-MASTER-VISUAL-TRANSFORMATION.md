# RKMF — Master Visual Transformation Record
**Mode:** PREVIEW ONLY. No deploy / push / merge. Content, messaging, nav, IA, donation flow, **typography, and motion** unchanged.
**Palette:** warm white `#FBF9F5` · gold `#B89245` · dark gold `#8F6A2A` · charcoal `#1F1F1F` · light grey `#F3F3F3`. No copper/orange; no dark-dominant sections.
**Batch 1 preview:** `RKMF-Visual-Preview-Batch1.html`

| ID | Area | Current | Proposed | Status | Founder Decision | Files changed | QA |
|---|---|---|---|---|---|---|---|
| C-H1 | Hero | Image `opacity-60` + full dark gradient over `bg-ink` → murky | Image `opacity-80` + bottom-weighted scrim (`from-ink/90 via-ink/40 to-ink/5`); gold accent via palette. **Motion untouched.** | 🟢 Implemented (preview) | ✅ APPROVED | `components/prototype-v2/HeroMotion.tsx` (visual only) | tsc ✅ · compile ✅ |
| C-C1 | Colour system | Cool white `#FAFAFA`, copper `#c58a4a`/`#93502b`, black `#0b0b0b` | Warm white `#FBF9F5`, gold `#B89245`/`#8F6A2A`, charcoal `#1F1F1F`, + `mist #F3F3F3` token | 🟢 Implemented (preview) | ✅ APPROVED | `tailwind.config.ts` | tsc ✅ · compile ✅ (exact tokens verified) |
| C-T1 | Typography | Inter, bold sans | ~~Fraunces serif~~ — **REVERTED, Inter kept exactly** | 🔴 Rejected — reverted | ❌ REJECTED | none (net-zero; reverted `globals.css`, `layout.tsx`, `tailwind` serif) | no Fraunces/serif in source ✅ |
| C-I1 | Image presentation | — | Rounded, warm frame, light scrim, hover-zoom | 🟡 Approved — partially in place | ✅ APPROVED | `app/globals.css` `.figure-frame`/`.img-hover` already provide rounded+warm+hover-zoom; now warmer via palette. Per-section image **sizing** to be tuned on the live preview (next batch) | n/a |
| C-M1 | Motion system | GSAP/Lenis parallax, reveals, count-ups, transitions | **No change** — kept exactly per founder | ⚪ Deferred — unchanged | ❌ keep as-is | none | n/a |

### Status legend
Proposed → Approved → Preview Ready → **Implemented (preview)** → Preview Approved → QA Passed → Production Approved → Deployed → Verified · (Deferred / Rejected)

### What changed in code this batch (preview only, NOT deployed)
- `tailwind.config.ts` — palette tokens to exact approved values + `mist` (`#F3F3F3`) token.
- `components/prototype-v2/HeroMotion.tsx` — lighter, bottom-weighted hero scrim (visual only; GSAP/Lenis motion untouched).
- Reverted: all serif/Fraunces edits (typography unchanged). Motion: untouched.

## Batch 2 — proposed (preview-first; Inter + motion kept)
Preview: `RKMF-Visual-Preview-Batch2.html`

| ID | Area | Current | Proposed | Status | Founder Decision | Files to change | QA |
|---|---|---|---|---|---|---|---|
| C-W1 | Whitespace & layout rhythm | Section padding `py-20/28/32`; uniform white | Slightly more air; alternate warm-white / light-grey (`mist`) banding; indexed eyebrows | 🟡 Preview Ready | ⏳ Awaiting | `app/globals.css` (`.section-y`), section bg classes | — |
| C-I2 | Section image presentation | Small/flat, heavy dark overlay, square | Larger, rounded, light bottom scrim, hover-zoom (extends C-I1 per section) | 🟡 Preview Ready | ⏳ Awaiting | `WhatWeDo.tsx`, `ToblerStory.tsx` image classes (CSS only) | — |
| C-D1 | Donation section presentation | Plain amount; copper numerals | **White bg kept** (warm-white was dull); gold ₹ numerals + eyebrow (via palette); trust line "256-bit secure · Razorpay · instant 80G receipt" added | 🟢 Implemented (preview) | ✅ APPROVED — "make it live" | `components/prototype-v2/GiftSection.tsx` | tsc ✅ |
| C-TR1 | Trust presentation | Plain cert download buttons | Elegant chip-cards (reg no. + label + download on hover) | 🟡 Preview Ready | ⏳ Awaiting | trust/cert section classes, `.card` in `globals.css` | — |
| C-SP1 | Section hierarchy | Plain eyebrow labels | Indexed eyebrows + gold hairline rules (`.eyebrow-index` already exists) | 🟡 Preview Ready | ⏳ Awaiting | section header classes | — |

**Note:** Batch 2 changes touch *presentation classes only* — no copy, structure, typography (Inter kept), or motion (kept). Code not yet written; awaiting approval to implement into preview.

### Gates remaining before production
Preview Approved (founder reviews real preview) → QA passed (`next build` on Vercel) → Production approved → Deploy. **Nothing deployed; changes staged in working tree only.**
