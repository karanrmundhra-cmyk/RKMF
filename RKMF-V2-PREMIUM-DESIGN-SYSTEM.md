# RKMF V2 — Premium Design System
**Warm-light editorial. National Geographic · Aman · Apple — not nightclub, not crypto, not watch-store.**

> Direction: keep production's *trust* and animal focus, take Framer's *warmth, light and air*, and keep the V1 concept's *editorial craft and animal storytelling* — minus the 80%-black. The result feels lighter, cleaner, more emotional, and unmistakably premium.

---

## 1. Why the Framer site feels better (and where it's actually weaker)

**Why it feels better:**
1. **Light, warm canvas** — ivory/warm-white backgrounds with air around everything. Reads calm, generous, premium. (Production's copper-on-cream is fine but flatter; the V1 dark concept was heavy.)
2. **Generous spacing & rhythm** — one idea per screen, big breathing room. Luxury = restraint + air.
3. **Real social proof** — named testimonials with faces and cities (Raghav Daga, Shweta Desai, Aditya Mohatta…). Instantly humanising.
4. **Prominent impact counters** — 2,50,000+ meals, 12,000+ vaccinated — scale you can feel.
5. **The faith-based giving section** — Dāna, Zakat, Sadaqah, Dasvandh, Tzedakah… deeply resonant for an Indian audience and a genuinely original, emotional idea.
6. **Softer shapes & gentle motion** — rounded imagery, fades and slides, nothing harsh.

**Where it's actually weaker than production (don't inherit these):**
- It's a lightly-converted **agency template** — pillar cards still carry leftover boilerplate ("Logo Design, Visual Identity Systems, Brand Guidelines, Typography & Color Systems"). Amateur tell.
- **Generic, abstract copy** — "bridging your generosity to lives in need," "beacons of hope." Warm but vague; never shows a *named animal* or a *single rescue*.
- **Diluted focus** — seven pillars + faith paths spread it thin; the animals (RKM's real heart) get one card.
- **Duplicated testimonials** and a Google-Drive download setup (less trustworthy than production's on-domain PDFs).

**So the win is a synthesis, not a switch.**

| Source | Take | Leave |
|---|---|---|
| **Production** | Trust spine (on-domain certs, registrations), animal focus, Tobler story, working donation, CSR/Schedule VII | Brochure icon-grids, flat palette, ₹1,000 min, invisible animals |
| **Framer** | Warm-light palette, air, real testimonials, impact counters, faith-based giving, soft motion | Template residue, vague copy, diluted focus, off-domain downloads |
| **V1 black/gold** | Editorial serif type, named-animal cards, before/after, sponsor-an-animal, design discipline | 80% black backgrounds, "dark luxury" mood |

---

## 2. Colour system (exact codes) — warm, light, premium
**No more 80% black.** One optional warm-dark band (impact counters / footer) for contrast — everything else is light.

| Token | Hex | Role |
|---|---|---|
| Canvas (warm white) | `#FBF9F5` | Primary background |
| Ivory | `#F4EFE5` | Alt sections, banding |
| Soft stone | `#EBE4D6` | Tertiary band (testimonials) |
| Sand | `#E0D8C8` | Card edges, chips |
| Line | `#E5DDCD` | Hairline dividers |
| Warm grey | `#8C8478` | Muted labels |
| Slate | `#6B6459` | Body text |
| Charcoal | `#33302A` | Default text |
| Ink | `#211F1B` | Headlines |
| Cocoa (warm dark) | `#2A2723` | The ONE dark band + footer |
| **Muted gold** | `#B68A36` | Primary accent (CTAs, rules) |
| Gold deep | `#9A7228` | Gold text on light |
| Gold soft | `#E7D6AC` | Gold on dark |
| Gold tint | `#F3E9D2` | Highlight cards, soft fills |

**Rules:** warm whites carry the site; gold is the single accent, used for the ask + the proof; the dark is *cocoa*, never pure black, used at most once or twice. Soft shadows (warm, low-opacity `rgba(60,45,20,.2–.3)`), generous radii (14–20px).

## 3. Typography
- **Display/headlines:** *Fraunces* (warm, optical serif) — soft, editorial, emotional. Weights 400–600, tight leading (1.06), slight negative tracking. (Cormorant/Canela are alternates.)
- **Body/UI:** *Inter* 300–500.
- **Eyebrows:** Inter 600, 11px, .28em, uppercase, gold-deep.
- **Scale:** Display `clamp(42–86px)` · H2 `clamp(30–52px)` · Lead `17–20px` · Body `14–16px`.
- Fraunces over a warm canvas is the single biggest "premium + warm" move.

## 4. Spacing
- 8px grid; section padding `clamp(76–140px)`; container `1200px`; gutter `32px`.
- **Air is the luxury.** One message per viewport. Rounded corners (14–20px). Hairline dividers, never heavy boxes.

## 5. Photography — where each medium leads
| Section | Leads with | Why |
|---|---|---|
| Hero | **Photography** (one rescue portrait, light scrim only) | Emotional hook in 1 second |
| Story (Tobler) | **Storytelling** (image + serif prose) | The origin, told warmly |
| Meet the Animals | **Photography** (named portraits) | Faces convert |
| Before/After | **Photography** (interactive) | Proof of impact |
| Impact counters | **Text/number** (on cocoa) | Scale, stated plainly |
| Sponsor / Your ₹1,000 | **Text** (with small imagery) | The ask, made concrete |
| Faith-based giving | **Text** (light cards) | Cultural resonance |
| Testimonials | **People** (faces + names) | Trust |
| CSR | **Photography + text** split | Credibility + proof |

**Use:** real dogs, cats, cows, rescue/treatment/recovery moments, volunteers, the shelter. **Avoid:** heavy dark overlays (light scrims only), stock charity imagery, generic NGO/corporate stock. Warm, natural-light grade; eyes-to-camera; the animal is always the subject.

## 6. Motion (premium, performance-safe — no gimmicks)
- **Image reveals:** fade + `translateY(24px)→0`, `cubic-bezier(.16,1,.3,1)`, 70ms stagger (IntersectionObserver — no libraries).
- **Subtle parallax:** 12s slow zoom-out on the hero image only; optional ±6px on large images.
- **Counters:** count-up on first view, cubic ease-out.
- **Before/after:** pointer + touch drag.
- **Hover:** cards lift `-6px` + soft shadow + image scale 1.06.
- **Smooth scrolling** (Lenis, already installed) — keep gentle.
- **Avoid:** auto-playing carousels that loop endlessly, parallax on text, anything that shifts layout (protect CLS). Respect `prefers-reduced-motion`.

## 7. What to remove / fix (corporate · cold · generic · template)
- **Remove the brochure "four ways we help" icon grid** on the current home → replace with Meet-the-Animals + Before/After (show, don't list).
- **Remove the abstract Framer copy** ("bridging generosity," "beacons of hope") → concrete, animal-specific lines.
- **De-template the pillar cards** — never ship "Logo Design / Brand Guidelines" residue.
- **Cut duplicate/looping testimonials** down to 3 strong, real ones.
- **Drop off-domain Google-Drive downloads** → keep production's on-domain PDFs (more trustworthy).
- **Retire the all-black mood** — keep at most one cocoa band.
- **Hide half-built surfaces** (shop checkout, orphan fundraiser pages) — already noindexed.
- **Trim the team page** from corporate-directory bios toward warmer, human one-liners.

This system is fully realised in **`RKMF-V2-Premium-Homepage-Prototype.html`** — open it to feel the warmth + light + premium in motion.
