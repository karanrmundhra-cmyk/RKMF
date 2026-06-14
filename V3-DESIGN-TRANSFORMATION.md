# RKM Foundation — V3 Design Transformation
**Presentation-layer redesign · 13 June 2026**
Backend, compliance, donations, admin, forms, SEO, registrations, and legal content are untouched. This is purely the visual/presentation layer.

---

## 1. Design analysis — Agentura (agentura.framer.website)

**1. Typography system.** Two extreme tiers, almost nothing in between. (a) A small monospace/grotesque ALL-CAPS micro-type for every label, eyebrow, nav item, and even body statements — ~11–13px, very wide tracking (~0.1–0.25em). (b) A huge bold grotesque display for single hero words (BRANDING, EDITORIAL) — 60–110px, tight tracking. Hierarchy is built entirely from the *scale jump* between tiny label and giant word, not from colour or weight variety.

**2. Spacing system.** Whitespace is the primary material. Sections are full-viewport-height. Content sits in a narrow central column (~40–55% width) with vast side margins. Enormous vertical separation between beats.

**3. Grid system.** Metadata is pinned to the absolute left/right page edges (corner labels). Imagery runs in a centred column. The numbered service rows use a 3-part horizontal grid: index (far left) · short statement (left-centre) · category label + giant word (far right).

**4. Section rhythm.** Hero (full-bleed portrait) → manifesto statements (corner labels) → vertical image gallery with geometric line overlays → numbered service rows with scroll-linked full-bleed image reveals → clients/testimonial → journal → big restrained closing CTA. Each beat breathes; nothing is crowded.

**5. Image treatment.** Monochrome, high-contrast editorial photography, one strong image per beat. Occasional single accent colour (red/orange) bleeding through an otherwise B&W frame. Images are framed by thin geometric line-art (circles, diamonds).

**6. Motion treatment.** Scroll-linked throughout. Images translate at a different rate than text (parallax); full-bleed bands slide *behind* floating label cards; line-art draws in. Slow, deliberate, never bouncy.

**7. Scroll behaviour.** Smooth (Lenis-style) inertia. Overlapping reveals where a full-bleed image passes behind floating metadata cards as you scroll.

**8. Visual hierarchy.** Driven by scale + position only. The eye is pulled from a whispered label to a shouted word. Restraint everywhere else.

**9. CTA treatment.** Understated and confident. Small uppercase links ("BOOK A FREE TOUR"), thin underlines, no loud buttons. Authority through scarcity ("We take on a limited number of projects").

**10. Use of whitespace.** The defining trait — generous, asymmetric, intentional. Content floats.

### What transfers to RKM (and what must NOT)
RKM keeps its **light** identity (snow/ink/copper, Inter) and its NGO warmth — we are **not** copying Agentura's dark monochrome brand or its content. We adopt only the **structural DNA**: dramatic type scale, indexed eyebrow labels, huge whitespace, asymmetric numbered editorial rows, scroll-linked image reveals, edge-pinned metadata, and restrained confident CTAs. The founder stays humble — presentation improves, mythology does not.

---

## 2. Transformation plan (section-by-section)

| Section | Verdict | What changes |
|---|---|---|
| **Global type scale** | Rebuild | Add fluid `display-1/2/3` clamp classes; far larger headlines, tighter tracking, lower line-height. Add indexed mono `eyebrow` label. |
| **Global spacing** | Rebuild | New `.section` rhythm (py ~28→40, fluid). Editorial 12-col gutters; asymmetry over centred stacks. |
| **Hero** | Rebuild | Keep dark image + copy. Much larger headline (`display-1`), add corner micro-labels (mission/registration), refined scroll cue. |
| **Tobler story** | Keep + re-present | Same humble copy. Editorial asymmetric layout, oversized pull-quote, edge caption, parallax image. |
| **What We Do (Rescue/Feed/Heal/Shelter)** | Rebuild | From 4-card grid → **numbered editorial rows** ("01 — RESCUE" + giant word + statement + parallax image). Biggest single upgrade. |
| **What Your Gift Does** | Rebuild | From 3 equal cards → asymmetric editorial: large left headline column + tiers as a spacious lined list with big ₹ numerals. |
| **Why Trust** | Rebuild (light) | Bigger headline, more air, refined 2-col reasons, certificate row restyled. |
| **Testimonials** | Keep | Inherits new type scale; light spacing polish. |
| **CTA banner** | Rebuild | Larger, more confident, restrained; inherits display scale. |
| **About hero + story** | Rebuild | Editorial asymmetric hero; oversized story pull-quote; generous measure. |
| **PageHero (all secondary pages)** | Rebuild | Larger display title + more air → lifts every secondary page automatically. |
| **Photography gaps** | Add | `PlaceholderImage` clearly labelled "PLACEHOLDER IMAGE – TO BE REPLACED" wherever real photography is needed. No fabricated impact. |
| **Motion** | Add | `Parallax` primitive (scroll-linked, reduced-motion + mobile gated, content always visible). Never hide content; never create blank scroll zones. |
| Backend / compliance / forms / SEO / legal / registrations | **Untouched** | Out of scope by instruction. |

---

## 3. Implemented changes

**New design system (global, lifts every page)**
- `app/globals.css` — fluid clamp display scale (`display-1/2/3`, `editorial-word`), indexed eyebrow label (`eyebrow-index` with a leading copper rule), editorial section rhythm (`section-y` / `section-y-lg`, py up to 40–52), editorial image frame (`figure-frame`), and a labelled photography placeholder style (`placeholder-figure` / `placeholder-tag`).
- **New components:**
  - `components/Parallax.tsx` — scroll-linked vertical drift via `requestAnimationFrame` (no library). Reduced-motion, touch, and <1024px all get the static element; content always renders visible (it only animates a few clamped px of Y — it can never strand content or make a blank zone).
  - `components/EditorialFigure.tsx` — one consistent frame for all imagery; renders the real photo if a `src` is given, otherwise a clearly-labelled **"PLACEHOLDER IMAGE / TO BE REPLACED"** block. Optional parallax + caption.
  - `components/SectionIntro.tsx` — reusable indexed-eyebrow + display headline header.

**Homepage (rebuilt)**
- **Hero** — headline up to `display-1` (clamp ~2.75→6.5rem), indexed eyebrow, edge-pinned corner labels ("Registered Charitable Trust" / "Est. 2014 · Thane, India"), more air. Image parallax retained.
- **Tobler story** — same humble copy, re-presented: asymmetric 5/7 split, oversized pull-quote (`text-2xl→3xl`), edge caption, parallax image.
- **What We Do** — **the headline change**: from a 4-card grid → numbered editorial rows ("01 · ON THE STREET · **Rescue**") with an oversized word, a short statement, and a parallax image, alternating sides.
- **What Your Gift Does** — from 3 equal cards → asymmetric layout: a sticky left headline column + gift tiers as a spacious ruled list with oversized ₹ numerals (count-up to the real values).
- **Why Trust** — numbered 01–04 reasons with more air; "Every rupee is accounted for." band with a restrained certificate row.
- **Testimonials & CTA** — lifted to the new display scale and rhythm; CTA enlarged and more confident.
- **Background rhythm** — clean alternation (dark hero → white → snow → white → snow → white → dark CTA).

**About (rebuilt)** — editorial asymmetric hero (`display-1` + framed parallax portrait), oversized story heading, new rhythm and indexed eyebrows across Values / Ways to belong / Team.

**Secondary pages (lifted automatically)** — `PageHero` and `CTABanner` now use `display-1`/`display-2` + the new rhythm, so every secondary page (Media, CSR, Careers, Contact, FAQs, Fundraiser, Partner, Legal, etc.) inherits the larger type and more whitespace.

**Untouched (by instruction):** backend, compliance, donations, admin, forms, SEO/metadata, registrations, legal content.

## 4. Before vs after

| | Before (V2) | After (V3) |
|---|---|---|
| Headlines | `text-3xl–5xl`, centred, uniform | Fluid `display-1/2` up to 6.5rem, asymmetric |
| Eyebrows | plain copper caps | indexed label with leading rule |
| "What We Do" | 4 equal cards in a row | numbered editorial rows + oversized words + images |
| Gift tiers | 3 identical boxes | sticky headline + ruled list, big ₹ numerals |
| Section padding | uniform `py-24` | `section-y` rhythm (py 24→40+, fluid) |
| Imagery | inline rounded thumbnails | consistent editorial frame + parallax; labelled placeholders |
| Motion | framer stagger (occasional faint/blank zones on fast scroll) | content always visible; lightweight parallax enhancement only |
| Overall feel | competent "template NGO" | premium, editorial, confident, spacious |

## 5. Screenshots
Captured before (V2) and after (V3) on desktop (1440px) and mobile (~400px) — shown inline in this session: hero, Tobler story, the four numbered rows, gift list, trust band, and the About hero. Mobile confirmed to stack to a single clean column with no horizontal overflow.

## 6. Performance impact
- **TypeScript:** `tsc --noEmit` → 0 errors. **Build:** 51 routes, all prerendered static.
- **Homepage first-load JS ≈ 150 kB** (8.12 kB page-specific). The rebuild **removed framer-motion from three sections** (What We Do, Gift, Why Trust — now static `Reveal`-based) and the new parallax uses a **native rAF primitive with no new dependency**, so the design upgrade adds essentially **no JS weight** (net neutral-to-lighter). GSAP/Lenis remain dynamically imported (out of the initial bundle).
- **Reliability:** every section renders visible from first paint; motion is pure enhancement, reduced-motion + touch gated — no blank scroll zones (an issue visible in the V2 "before" captures is now eliminated).

## 7. Final deployed URL
**Production: https://rkm-foundation.vercel.app** (also aliased to **rkmfoundation.com**, pending the GoDaddy DNS records). Deployed 13 Jun 2026, "Ready in 40s".

---
# V3.1 — Push-to-Premium pass (Agentura + Kanso benchmark)

### Would an independent designer believe RKM and Agentura/Kanso came from the same calibre of studio?
**Honest answer: on the homepage and About, increasingly yes on _layout language_ — but not yet identical, and they'd spot why in seconds.** The structure (dramatic type, indexed labels, numbered editorial rows, asymmetry, whitespace, scroll word-fade, editorial footer) is now in the same family. Two things still separate them: (1) **art-directed photography** — Agentura/Kanso are carried by stunning monochrome imagery; RKM shows placeholders and a couple of branded tiles, and (2) a **distinctive display typeface** — they use characterful grotesques, RKM uses Inter (clean but common). Both are deliberate: photography is yours to supply, and Inter was kept for reliability/licensing.

### Section audit (brutal, pre-this-pass)
| Section | Verdict before V3.1 |
|---|---|
| Homepage hero | **A — Premium** |
| Homepage "What We Do" rows | **A** (but placeholders looked like unfinished CMS slots) |
| Homepage gift / trust | **B+** |
| Tobler story | **B** → needed a signature motion moment |
| About | **C+** — still card grids (Values/Roles) |
| Donate | **B** — strong hero, conventional interior |
| Media / CSR / Fundraiser | **B/C** — big headlines, card-y interiors |
| Footer | **C — template** — dense grid of small links |
| Trust section | **B** |

### What still felt template-like → what I changed
1. **Placeholders read as "unfinished CMS"** (clip-art image icon + dashed "upload here" border). → Rebuilt into an **art-directed frame**: same quiet solid frame as real figures, a large **ghosted index numeral** ("01–04"), and a discreet "• Photograph to come" tag. Reads as an intentional editorial frame, not a broken slot.
2. **No scroll-driven word reveal** (the shared Kanso/Agentura signature). → Built **`ScrollFadeWords`**: the Tobler opening line now brightens word-by-word from soft grey to ink as it scrolls. Reliability-first — full ink without JS / reduced-motion, dimmest state still legible, never a blank zone.
3. **Generic footer** (dense link grid). → Restructured into a **confident editorial masthead** — "Be the someone who shows up." + Donate, with the subscribe form alongside — over a rule, then the (still-complete, founder-spec) 5-column metadata. More air, real hierarchy.
4. **About card grids** (Values, Roles). → Replaced with **editorial ruled lists** — numbered, left-aligned, no card boxes — matching the homepage language.

### What I removed
- The clip-art / dashed-border placeholder look. The 4-column Values card grid. The 3-column Roles card grid. The flat top-of-footer subscribe block.

### What I simplified
- Placeholder content (one ghosted mark + one quiet label, vs. two stacked "PLACEHOLDER / TO BE REPLACED" lines). Footer reading order (statement → action → metadata).

### What I enlarged
- Footer top into a `display-2` statement. About Values/Roles headings into `display-3` items. The Tobler lead line (now `text-xl→2xl`, the focal word-fade element).

### What I restructured
- About Values & Roles (cards → numbered editorial lists). Footer top (link grid → editorial masthead). Placeholder anatomy (icon-centred → ghosted-index editorial frame).

### Performance impact
- `tsc` 0 errors; build 51 routes, all static. Homepage first-load **≈150 kB** (the word-fade added ~0.3 kB; no new dependency — `ScrollFadeWords` and `Parallax` are native rAF). Net: **no meaningful weight added**, and three homepage sections still carry **no framer-motion**.

### Honest score — how close is RKM to Agentura / Kanso?
**7.5 / 10.** The homepage and About now genuinely sit at ~8 — the editorial grammar, type scale, whitespace, numbered rows, scroll word-fade, and footer are in the same league. It's held back from 9+ by two things only: **real art-directed photography** (the single biggest lever, and not something I'll fake) and a **distinctive display typeface**. Secondary-page interiors (testimonial cards, some benefit lists) are the next ~0.5 to claw back. This is the real number, not a polite one: structurally close, finish-dependent on imagery.

### Final deployed URL (V3.1)
**https://rkm-foundation.vercel.app** (aliased to rkmfoundation.com, pending DNS). Deployed 13 Jun 2026, "Ready in 41s".

