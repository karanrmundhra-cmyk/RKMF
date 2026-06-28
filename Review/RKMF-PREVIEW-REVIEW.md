# RKMF — Preview Review Package
**Batch:** Look-and-feel reskin (warm-white palette · muted gold · editorial serif). **Status: 🟡 PREVIEW READY — awaiting approval. NOT deployed.**

> **Preview-first honoured.** Changes exist only in the local working tree. No push, no production deploy. Visual evidence = `RKMF-Before-After-Preview.html` (open it: the *same* hero/content rendered with current tokens vs. new tokens, stacked for direct comparison; resize the window for mobile review). Full-experience reference = `RKMF-V2-Premium-Homepage-Prototype.html`.
>
> **One honest limit:** I can't mint a Vercel *preview URL* or render PNG screenshots from this environment (no deploy access; no headless browser in the sandbox). The openable before/after HTML is the faithful stand-in; a true preview URL is one `git push` to a branch away (steps at the bottom).

---

## Change table

| # | Section / Scope | Before | After | Files modified | Expected impact | Risk |
|---|---|---|---|---|---|---|
| C1 | **Canvas — all sections** | Cool near-white `#FAFAFA` | Warm white `#FBF9F5` | `tailwind.config.ts` (`snow`) | Whole site reads warmer, calmer, more premium | **Low** — near-white→near-white, no layout change |
| C2 | **Accent — buttons, links, eyebrows, rules, slider** | Copper/orange `#c58a4a` / `#93502b` | Muted gold `#bd9442` / `#9a7324` | `tailwind.config.ts` (`copper`) | Accent shifts from "friendly copper" to editorial muted gold (the approved direction) | **Low–Med** — see contrast note below |
| C3 | **Text & dark elements** | Pure black `#0b0b0b` | Warm near-black `#211f1b` | `tailwind.config.ts` (`ink`) | Softer, warmer text/dark buttons; less harsh | **Low** — contrast stays ~15:1 |
| C4 | **Headlines (h-display, display-1/2/3, editorial-word)** | Inter, semibold sans | **Fraunces** editorial serif (Inter body unchanged) | `app/globals.css`, `app/layout.tsx` (font load) | The biggest "editorial / premium" lift; warmth + character | **Med** — font swap; review first (see QA) |

**Files modified (entire batch): 3** — `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`. **Zero** page/section/content files touched (verified via `git diff --name-only`). All copy, structure, hierarchy, nav, IA unchanged.

---

## QA control (verified before presenting)

| Check | Result | Notes |
|---|---|---|
| Type check (`tsc --noEmit`) | ✅ Pass | exit 0 |
| Tailwind/CSS compile | ✅ Pass | exit 0; `font-serif` + new tokens resolved in output |
| Full `next build` | ⏳ Pending | Exceeds the sandbox's 45s shell limit — **confirm on the Vercel preview build** before promoting |
| Images load | ✅ Pass | No image paths changed; reskin is tokens/fonts only |
| Layout shift (CLS) | ⚠️ Watch | Colour tokens = zero shift. **Font swap (Inter→Fraunces) can cause minor heading reflow** on first paint; mitigated by `display=swap` + Georgia fallback (close metrics). Verify on preview. |
| Console errors | ✅ None expected | No JS changed |
| Mobile responsive | ✅ Unchanged | No layout/breakpoint changes — tokens only |
| Accessibility (contrast) | ⚠️ Check | Warm ink `#211f1b` on warm white ≈ 15:1 (excellent). **Muted-gold `#9a7324` on warm white ≈ 4.4:1 — borderline AA for small text** (eyebrows/links). The old copper-dark `#93502b` was darker. *If preview shows small gold text, deepen gold-dark to ~`#8a6a1f` for a comfortable AA pass.* |

---

## Master change log (with new statuses)

| ID | Change | Status |
|---|---|---|
| C1 | Warm white canvas | 🟡 Preview Ready |
| C2 | Muted gold accent | 🟡 Preview Ready |
| C3 | Warm near-black text | 🟡 Preview Ready |
| C4 | Editorial serif headlines | 🟡 Preview Ready |

*Statuses available:* Planned · Approved · Implemented · **Preview Ready** · Preview Approved · Deployed · Verified · Deferred · Rejected.
Carried from earlier batches (also Preview Ready, not deployed): email-honesty fixes, noindex orphan pages, Hindi-label removal.

---

## ⛔ APPROVAL GATE — work stopped here

Per the Preview-First Rule, I will not deploy until you approve. Reply with one of:

- **APPROVE** *(a change # or list)* — approve specific changes (e.g. "APPROVE C1, C3").
- **APPROVE ALL** — approve the whole batch.
- **MODIFY** *(what)* — e.g. "MODIFY C2: deepen the gold" or "MODIFY C4: keep Inter headlines."
- **WAIT** — hold; I do nothing.
- **SKIP** *(change #)* — drop a change from the batch.

### When you approve, the path to a real preview (not production)
1. From your Mac (where git + GitHub auth work):
   ```bash
   git checkout -b reskin-warm-editorial
   git add tailwind.config.ts app/globals.css app/layout.tsx
   git commit -m "Look-and-feel reskin: warm white, muted gold, editorial serif (no content change)"
   git push origin reskin-warm-editorial
   ```
2. Vercel auto-builds a **preview URL** (`rkm-foundation-git-reskin-warm-editorial-…vercel.app`) — review it desktop + mobile, confirm the `next build` and the two ⚠️ QA items.
3. Only on your go: merge to `main` → production.

Production stays untouched until step 3, which is entirely your call.
