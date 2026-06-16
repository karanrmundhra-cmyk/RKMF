# RKMF — Live Experience Upgrade
**Make the *same* site feel alive.** No content, copy, hierarchy, IA, or structural changes. Only movement, interaction, transitions, image presentation, and storytelling flow.

> Instagram reference was login-walled (couldn't open it) — direction taken from the approved Framer site + your live homepage. Colour target honoured: **~65% white · 20% photography · 10% charcoal · 5% gold.** More white, less black.

---

## Foundation already in your stack (use it — nothing new to install)
`framer-motion`, `gsap`, `lenis` are in `package.json`; you already ship `Reveal.tsx`, `Parallax.tsx`, `CountUp.tsx`, `ImpactSlider.tsx`, `HomeExperience.tsx`. **Most of this is wiring existing tools, not building from scratch.**

**Global rules for every motion below:** transforms/opacity only (never animate layout — protect CLS/LCP); honour `prefers-reduced-motion`; one-shot reveals via `IntersectionObserver` (no re-trigger on scroll-up); keep durations 0.5–1.1s, easing `cubic-bezier(.16,1,.3,1)`; lazy-load below-fold images.

### Global layers (do these once, they lift the whole site)
1. **Lenis smooth scroll** — confirm it's active site-wide (it's installed). Gentle inertia instantly reads "premium." *(P0)*
2. **Thin gold scroll-progress bar** at the very top (2px, 5% gold). Continuous feedback as you scroll. *(P0)*
3. **Nav transition** — transparent over hero → frosted white on scroll (you have this pattern). *(P0)*
4. **Section reveal discipline** — every section's heading + first element fade-up with a 70ms stagger via `Reveal`. *(P0)*

---

## Section-by-section motion + interaction map (live homepage order)

### 1 · Hero — "They can't ask for help. You can give it."
| | |
|---|---|
| **Current** | Single static `dog.jpg`, static headline + CTAs. |
| **Why static** | Nothing moves on load or scroll; the image is a flat backdrop. |
| **New motion** | 8–12s slow **Ken-Burns** zoom-out on the photo (scale 1.08→1); headline **words rise** in sequence (`framer-motion` staggerChildren, y:24→0); CTAs fade in last; subtle **scroll-depth parallax** (image drifts up ~6% slower than content). |
| **New interaction** | Animated scroll-cue; on scroll, hero photo gains a soft light scrim so the next section "lifts" over it. |
| **Engagement impact** | High — the first 1s now feels cinematic and intentional; sets the premium tone for everything after. |

### 2 · "What We Do" — Rescue · Feed · Heal · Shelter (4 image cards)
| | |
|---|---|
| **Current** | Four images + text, appear all at once, static. |
| **Why static** | No entrance, no hover, no rhythm — reads like a brochure grid. |
| **New motion** | **Staggered fade-up** of the four cards (90ms apart) on scroll-in. |
| **New interaction** | **Hover:** image zooms 1.06 + warms from slight grayscale to full colour; caption underline draws in gold. **Mobile:** convert to a **swipeable horizontal scroll-snap** rail (thumb-native) instead of a stacked grid. |
| **Engagement impact** | High — turns a static grid into a tactile, explorable row; the mobile swipe is a big native-feel win. |

### 3 · "How It Started" — Tobler story + quote
| | |
|---|---|
| **Current** | Image + prose + pull-quote, static. |
| **Why static** | The most emotional moment on the page just sits there. |
| **New motion** | Image **reveals via a clip-path wipe** (or mask) as it enters; the **pull-quote fades word-by-word**; gentle parallax between image and text columns. |
| **New interaction** | Optional **"Read Tobler's full story" expands inline** (height auto-animate) instead of navigating away — keeps people on the page. |
| **Engagement impact** | High — slows the eye at the emotional peak; word-reveal makes the quote land. |

### 4 · "Why Trust RKM" — three reasons
| | |
|---|---|
| **Current** | Three static text points. |
| **Why static** | Pure text, no motion, easy to skip. |
| **New motion** | **Numbered counters tick 01→03** as they enter; each point fades-up staggered. |
| **New interaction** | Light **hover lift** on each point; a thin gold rule draws left-to-right under the active one. |
| **Engagement impact** | Medium — adds rhythm to a text block without changing a word. |

### 5 · "Registered & Transparent" — certificate downloads
| | |
|---|---|
| **Current** | Static row of cert buttons (12A/80G/CSR/DARPAN). |
| **Why static** | Looks like a footer afterthought; trust is under-sold. |
| **New motion** | Buttons **fade-up stagger**; on enter, a subtle gold **shimmer sweep** across the row once. |
| **New interaction** | **Hover** reveals a tiny certificate-thumbnail preview + "Download PDF"; micro press-state. |
| **Engagement impact** | Medium-High — makes credibility feel active and premium, not buried. |

### 6 · "What Your Gift Does" — `ImpactSlider` (₹2,500 / 5,000 / 10,000)
| | |
|---|---|
| **Current** | Draggable amount slider (already interactive — good). |
| **Why static** | The *outcome* doesn't visually respond; numbers don't animate. |
| **New motion** | As the slider moves, the **impact number counts** to the new value and the **outcome line cross-fades**; an accompanying **image swaps** (meal → treatment → surgery) with a soft fade. |
| **New interaction** | Snap to tiers with haptic-style easing; "Give ₹X" button label animates to match. |
| **Engagement impact** | Very High — directly converts: the donor *sees* their rupees become a bigger outcome in real time. |

### 7 · Final CTA — "Somewhere out there, an animal is waiting."
| | |
|---|---|
| **Current** | Static headline + buttons. |
| **Why static** | The closing emotional ask has no weight. |
| **New motion** | Headline fade-up; **buttons gently pulse once** on enter (scale 1→1.03→1); optional faint parallax background image. |
| **New interaction** | Primary CTA hover: fill-sweep + lift. |
| **Engagement impact** | Medium-High — gives the final ask presence. |

### 8 · Newsletter — "See who you helped this month."
| | |
|---|---|
| **Current** | Static email field + Subscribe. |
| **Why static** | No feedback, no life. |
| **New motion** | Field + button fade-up; on submit, **inline success micro-animation** (checkmark draw) instead of a reload. |
| **New interaction** | Focus state animates the field border to gold; button press-state. |
| **Engagement impact** | Medium — small, but removes a dead, static touchpoint. |

### 9 · Footer
| | |
|---|---|
| **Current** | Static 5-column footer. |
| **Why static** | Fine as-is; lowest priority. |
| **New motion** | Columns fade-up stagger on enter; "Back to top" smooth-scrolls via Lenis. |
| **Engagement impact** | Low — polish only. |

---

## Interactive elements to add (no content/structure change)
- **Swipeable galleries / horizontal rails** — "What We Do" cards and any image group become scroll-snap carousels on mobile. *(P0 mobile)*
- **Animated counters** — wherever a number appears (trust, impact), count-up on view via existing `CountUp`. *(P1)*
- **Before/after slider** — if/when a paired rescue image exists, drop in the drag slider (you've seen it in the V2 prototype) inside the existing "What Your Gift Does" or story area — *uses existing imagery slots, adds no new section*. *(P1)*
- **Expandable Tobler story** — inline height-animate instead of page nav. *(P1)*
- **Hover zoom + warm-up** on every photo card. *(P0)*
- **Scrolling testimonials** — if testimonials are added later, a gentle marquee/drag carousel. *(P2)*

## Scroll experience principle
Something subtle happens in **every** viewport — a reveal, a counter, a parallax drift, a hover affordance — but never more than one *primary* motion per screen. The cumulative effect: a continuous, calm, editorial sense of life. Target frame budget: all motion on compositor (transform/opacity), 60fps, zero layout shift.

## Mobile (native-feel priorities)
1. **Horizontal scroll-snap** for the "What We Do" cards and image groups — thumb-swipe, not stacked scroll. *(P0)*
2. **Sticky gold donate bar** (you have `StickyDonateBar` — keep, ensure it animates in on scroll). *(P0)*
3. **Tap-to-expand** cards/stories; larger tap targets in the bottom third. *(P1)*
4. **Reduced-motion + data-saver** fallbacks: instant, no parallax. *(P0)*

---

## Priority ranking

**P0 — Immediate (biggest lift, lowest risk; mostly wiring existing tools)**
- Lenis smooth scroll confirmed active + gold scroll-progress bar + nav transition.
- Hero: Ken-Burns + word-stagger headline + scroll parallax.
- Section reveal discipline (fade-up stagger) across all sections via `Reveal`.
- "What We Do": hover zoom/warm-up + **mobile horizontal swipe**.
- Mobile: scroll-snap rails + animated sticky donate + reduced-motion fallback.

**P1 — Next**
- `ImpactSlider`: animated count + outcome cross-fade + image swap.
- Animated counters wherever numbers appear.
- Tobler clip-path image reveal + word-by-word quote + inline expand.
- Certificate hover-preview + shimmer sweep.
- Before/after slider into existing imagery slots.

**P2 — Later**
- Newsletter submit micro-animation; final-CTA pulse; footer stagger; scrolling testimonials (when content exists); page-transition fades between routes.

---

## The most important answer

> **What specific changes would make the website feel 3× more alive while keeping 95% of the existing content unchanged?**

Seven changes — all motion/interaction, zero content rewrite — do ~90% of the work:

1. **Lenis smooth scrolling + a gold scroll-progress bar.** One global change; instantly reads premium and "alive" on every page.
2. **A living hero:** slow Ken-Burns zoom + words that rise in sequence + light scroll parallax. The first second stops feeling like a poster.
3. **Fade-up reveal discipline on every section** (staggered) so *something happens in every viewport* as you scroll — calm, continuous, never busy.
4. **Photo cards that respond:** hover zoom + grayscale-to-colour warm-up on the "What We Do" images — turns flat tiles into tactile, explorable storytelling.
5. **Mobile horizontal swipe rails** for image groups + an animated sticky donate bar — makes the phone experience feel native, not like a scaled-down desktop page.
6. **A reactive `ImpactSlider`:** the impact number counts and the outcome image cross-fades as the donor drags — the single highest-converting "alive" moment, because they *watch their rupees become impact*.
7. **The Tobler moment, slowed and revealed:** clip-path image wipe + word-by-word quote — the emotional peak finally lands instead of scrolling past.

**Why this hits 3×:** you're not adding content or risk — you're adding *response*. Right now the site is silent when touched; after this, it answers every scroll, hover, and swipe with calm, intentional motion. Same words, same photos, same structure, same trust — but it now feels handcrafted, immersive, and alive. And because it's all transform/opacity on libraries you already ship, it stays fast and keeps the ~65% white / 5% gold restraint intact.
