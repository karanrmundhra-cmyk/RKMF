# RKMF Premium UX Blueprint
**A black · white · grey · gold editorial system for a world-class animal-welfare brand.**

> Direction set without copying any reference board: National-Geographic-grade intimate animal portraiture, luxury-editorial restraint, slow cinematic motion. The aim is **museum, not marketplace** — quiet, confident, emotional.

---

## 1. Brand direction in one line
**"The dignity of every life."** Premium does not mean cold — it means we treat each animal's story with the gravity a great magazine gives a cover subject. Black for gravity, gold for hope, white for honesty, grey for calm.

---

## 2. Colour system
| Token | Hex | Use |
|---|---|---|
| Black | `#0B0B0C` | Primary background, gravity |
| Ink | `#16161A` | Alt sections, depth banding |
| Charcoal | `#2A2A2E` | Cards, borders-on-dark |
| Line | `#23232A` | Hairline dividers |
| Grey | `#6E6E76` | Secondary text |
| Mist | `#A9A9B2` | Body text on dark |
| Paper | `#F6F5F2` | Light sections (before/after, testimonials) |
| White | `#FFFFFF` | Headlines on imagery |
| **Gold** | `#C9A24B` | The one accent — CTAs, numbers, rules, hover |
| Gold soft | `#E4CE93` | Gold text on dark |
| Gold deep | `#9C7A2E` | Gold on light, gradients |

**Rule:** gold is rationed. One accent, used for *the ask* and *the proof* only. Never two accent colours. Never gradients except subtle gold-to-deep on bars/handles.

## 3. Typography system
- **Display / headlines:** a refined serif — *Cormorant Garamond* (or Canela / GT Sermon if licensed). Large, tight leading (1.04), slight negative tracking. This single move shifts the brand from "NGO" to "editorial."
- **Body / UI / labels:** *Inter*, weight 300–500. Light body weight reads premium.
- **Eyebrows:** Inter 500, 11px, letter-spacing .3em, uppercase, gold.
- **Scale:** Display `clamp(44–104px)` · H2 `clamp(32–60px)` · Lead `17–21px` · Body `14–16px` · Label `11–13px`.
- **Pull quotes:** serif, 22–30px, gold left-rule, cite in uppercase Inter.

## 4. Spacing system
- 8px base grid. Section padding `clamp(80–150px)` vertical. Container max `1240px`, side gutter `32px`.
- **Generous negative space is the luxury cue.** When in doubt, add air. One idea per screen.
- Hairline `1px` borders in `--line` separate bands; never heavy boxes or drop shadows (except the slider handle and lifted cards).

## 5. Image system
- **Treatment:** rich, slightly desaturated (grayscale .1–.2) warming to full colour on hover. Deep gradient scrims (`rgba(11,11,12,.85)`) at the foot of every hero/portrait so white type always reads.
- **Aspect ratios:** Hero `full-bleed`, animal portraits `3:4`, story `4:5`, before/after `16:9`, CSR `5:4`.
- **Composition:** eyes-to-camera intimacy. The animal is the subject, never decoration. Faces, not wide shots.
- **Motion in stills:** 14s slow zoom on the hero only; everything else still until interacted with.

## 6. Iconography system
- Thin line icons, 1.7px stroke, 20–24px, currentColor. Used sparingly (contact, social, scroll cue). No filled/coloured icon sets. The brand speaks in photography and type, not icons.

---

## 7. Homepage architecture (exact order)
1. **Hero** — full-viewport rescue portrait, gold eyebrow, serif headline ("They can't ask. So we answer."), one primary gold CTA + one ghost CTA, scroll cue.
2. **Trust bar** — 12A · 80G · CSR-1 · DARPAN, hairline band.
3. **Origin story** — editorial 4:5 image + serif prose + gold pull-quote (Tobler).
4. **Meet the Animals** — four `3:4` portrait cards, each a named individual with rescue date, story, recovery progress bar, "Sponsor →".
5. **Before / After** — interactive drag slider, "Drag to see what your kindness does."
6. **Impact counters** — gold count-up numbers on black (meals, rescues, surgeries, sheltered).
7. **Sponsor an Animal** — three monthly tiers (Feed / Heal / Shelter), "Heal" highlighted as most chosen.
8. **"Your ₹1,000 did this"** — three impact blocks tying rupees to outcomes, primary donate CTA + trust line.
9. **Testimonials** — three serif quotes on paper.
10. **CSR** — dark split: Schedule VII messaging + audit badges + programme image + CTA.
11. **Closing band** — emotional one-liner + donate/sponsor.
12. **Footer** — black, gold accents, full registrations.

---

## 8. Meet-the-Animals feature (data model + layout)
Each animal is a **person**:
```
{ name, photo(3:4), status: Resident|In care|Sheltered,
  rescuedDate, oneLineStory, recoveryPercent, sponsorTier, gallery[] }
```
- **Card:** portrait with gradient foot, status chip top-left, name + rescue line bottom, story (≤120 chars), recovery bar, "Sponsor →".
- **Detail page (`/animals/[name]`):** hero portrait, rescue-journey timeline (Found → Treated → Recovering → Home), photo gallery, "Sponsor [Name]" sticky CTA, related animals.
- Seed names: **Tobler, Sheru, Luna, Gauri** (founder supplies real photos + dates + stories).

## 9. Emotional storytelling modules (page structures)
- **Animal of the Week** — homepage slot + `/stories` feature; one animal, one journey, one ask.
- **Rescue Journey** — vertical scrollytelling: Found → Treated → Recovering → Home, photo per step.
- **Before / After** — drag slider, reusable on home + story pages.
- **Success Stories** — `/stories` grid, filter by Dogs / Cats / Cows.
- **Adoption Stories** — "Where they are now," with adopter quote.
- **Memorial Stories** — "In loving memory," dignified, gold candle motif — the brand's emotional high note.

## 10. Photography guidelines
**Only:** dogs, cats, cows, rescues in progress, treatment/vet moments, volunteers in action, rehabilitation, the shelter itself.
**Banned:** generic stock animals, corporate/office imagery, clip-art, smiling-handshake CSR clichés, anything not a real RKM animal or person.
**Where each image goes:** hero (most arresting single portrait) · origin (Tobler) · 4 animal portraits · before/after pair · CSR (programme/field) · testimonials (optional small portraits) · story pages (galleries). Shoot tight, eyes-to-camera, natural light, consistent warm-neutral grade.

## 11. Motion design (Framer-quality, performance-safe)
- **Scroll reveals:** IntersectionObserver, `translateY(26px)→0` + fade, `cubic-bezier(.16,1,.3,1)`, 70ms stagger. (No scroll libraries needed.)
- **Hero:** 14s slow zoom-out once.
- **Counters:** count-up on first view, cubic ease-out.
- **Before/after:** pointer + touch drag, clip-path.
- **Cards:** `translateY(-6px)` + image scale 1.07 + grayscale→colour on hover.
- **Nav:** `mix-blend-mode:difference` over imagery → solid blurred bar on scroll.
- **Performance:** transforms/opacity only; `will-change` sparingly; lazy-load below-fold images; respect `prefers-reduced-motion`.

## 12. Donation UX
- Lead with **emotion then ask**: impact blocks ("Your ₹1,000 did this") immediately above the donate CTA.
- **Monthly = default**, framed as "Sponsor an animal," tied to a named face.
- Lower the entry minimum so first-time donors can say yes.
- Trust line at the button: *256-bit secure · Razorpay · instant 80G receipt.*
- Post-gift: "the animal you helped" photo follow-up; one-tap upgrade to monthly.

## 13. Mobile experience
- **Thumb-first:** sticky gold donate bar; primary actions in the bottom third.
- **Swipe stories:** Meet-the-Animals becomes a horizontal swipe carousel; Rescue Journeys as reels-style full-screen cards.
- **Galleries:** edge-to-edge, snap-scroll.
- Type scales down gracefully; one column; before/after responds to touch.

## 14. Trust architecture
- **Transparency dashboard** (`/transparency`): live impact numbers, income/spend split, downloadable annual report + financials.
- **Rescue proof:** dated before/after + journey galleries.
- **Treatment proof:** vet partners, surgery logs (anonymised), receipts.
- **Volunteer proof:** faces, feeding-drive photos, "visit the shelter" open invite.
- Registrations always one click away (already strong — keep, elevate visually as gold-rule badges).

---

## The 30-second answer
> **If a donor spends 30 seconds on the website, what should they see, feel, and do?**

- **SEE (0–5s):** one arresting rescue portrait, a serif line — *"They can't ask. So we answer."* — and a single gold **Donate** button. Instantly: this is serious, beautiful, and about an animal, not an institution.
- **FEEL (5–20s):** scrolling past Tobler's story and four *named* animals with recovery bars, they feel these are individuals with second chances — and that this organisation is intimate, real, and transparent (12A/80G/CSR visible, before/after proof, counted impact).
- **DO (20–30s):** they reach **"Your ₹1,000 did this"**, understand exactly what their money buys, and tap **Donate** (or **Sponsor Sheru**) — emotionally moved, fully trusting, one tap from giving.

If those three beats land in thirty seconds, the site is doing its job at a world-class level.
