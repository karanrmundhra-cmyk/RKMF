# RKMF — Designer Handover
**Batch:** Warm-editorial look-and-feel reskin. **Status: 🟡 Preview Ready (awaiting approval, not deployed).**
Visual evidence: `RKMF-Before-After-Preview.html` · full reference: `RKMF-V2-Premium-Homepage-Prototype.html`.

Each entry: Before → After · Reason · Visual / Business / UX objective.

---

### C1 — Warm white canvas
- **Before:** `#FAFAFA` (cool grey-white) on all light sections.
- **After:** `#FBF9F5` (warm white).
- **Reason:** the approved Framer direction reads warm and inviting; a cool white feels clinical.
- **Visual objective:** soften and warm the whole field; reduce "tech/clinical" feel.
- **Business objective:** a warmer space lowers the guard and supports emotional giving.
- **UX objective:** calmer reading surface; less eye strain; premium first impression.

### C2 — Muted gold accent
- **Before:** copper `#c58a4a` / dark `#93502b` (orange-brown).
- **After:** muted gold `#bd9442` / dark `#9a7324`.
- **Reason:** "gold as a restrained accent" was the explicit direction; copper skewed casual/orange.
- **Visual objective:** an editorial, slightly luxurious accent used sparingly (CTAs, links, rules).
- **Business objective:** signals trust and quality — helps justify larger gifts.
- **UX objective:** consistent, recognisable affordance colour for actions. *(Verify small-text contrast on preview; deepen if needed for AA.)*

### C3 — Warm near-black text
- **Before:** pure black `#0b0b0b`.
- **After:** warm near-black `#211f1b`.
- **Reason:** pure black against warm white is harsh; warm ink harmonises with the palette.
- **Visual objective:** cohesive warm neutral system end-to-end.
- **Business objective:** premium brands rarely use pure black — this reads more crafted.
- **UX objective:** maintains ~15:1 contrast (fully accessible) while softening glare.

### C4 — Editorial serif headlines
- **Before:** Inter semibold for all display headings.
- **After:** **Fraunces** serif for `.h-display` / `.display-1/2/3` / `.editorial-word`; Inter retained for all body/UI.
- **Reason:** a serif display is the single strongest "editorial / National-Geographic / premium" signal — and it changes *zero* words.
- **Visual objective:** warmth, character, and a clear type hierarchy (serif display vs sans body).
- **Business objective:** elevates perceived credibility and care — the "world-class brand" feel.
- **UX objective:** stronger headline hierarchy improves scannability; `display=swap` + Georgia fallback protects load. *(Biggest visual change — review first; one-line revert keeps Inter if preferred.)*

---

## Design tokens (reference)
| Token | Before | After |
|---|---|---|
| `snow` (canvas) | `#FAFAFA` | `#FBF9F5` |
| `ink` (text/dark) | `#0b0b0b` | `#211f1b` |
| `copper.DEFAULT` | `#c58a4a` | `#bd9442` |
| `copper.dark` (primary accent) | `#93502b` | `#9a7324` |
| `copper.light` | `#e0b685` | `#e7d6ac` |
| display font | Inter | Fraunces (Georgia fallback) |

Unchanged: all content, copy, section structure, navigation, information architecture, image assets, existing motion (hero zoom, card lift, hover zoom, reveals, reduced-motion support), and the ~65% white / 5% gold restraint.
