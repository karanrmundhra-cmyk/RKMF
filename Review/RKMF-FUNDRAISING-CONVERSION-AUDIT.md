# RKM Foundation — Fundraising & Conversion Audit

**Lens:** RKM as a fundraising operation, not a codebase. Scored against §2 (Emotional Connection #2, Trust #3, Donation Conversion #6) and §8/§9.
**Method:** Donation-flow code inspection (file/line), site storytelling/trust review, and benchmarking vs. Indian animal NGOs (RESQ, Kannan, Blue Cross, PFA, VOSD, Stray Animal Foundation). Date: 24 Jun 2026.

> **The one honest limit:** RKM has **no analytics installed**, so the funnel *numbers* (visitors, donate-click rate, form completion, average gift, monthly-donor %) **do not exist**. I cannot report leaks I can't measure. So this audit does two things: (1) fixes the **structural** conversion leaks visible in the code now, and (2) gives the **instrumentation + revenue model** to measure everything else. Every revenue figure below is a clearly-labeled `[ASSUMPTION]` built on benchmark ranges — replace with real numbers once §0 + analytics land.

---

## PART A — Donation-flow conversion leaks (structural, fixable today)

The donation engine is technically excellent (webhook source-of-truth, idempotency, 80G receipts). But the **form itself leaves recurring revenue on the table**. Mapped to §8:

| # | Leak (evidence) | §8 rule broken | Fix | Expected effect | Effort |
|---|---|---|---|---|---|
| A1 | **Frequency toggle defaults to One-Time** (`DonateWidget.tsx:15` — `useState(params.get("monthly") ? "monthly" : "one-time")`). | "Lead the form with a monthly/one-time toggle **defaulted to monthly**." | Default to monthly; keep one-time one tap away. | Monthly-default is the single highest-leverage change in nonprofit forms — recurring share routinely 2–4× when monthly is the default frame. Recurring donor LTV ≫ one-time. | **S** |
| A2 | **Same ₹2,500/₹5,000/₹10,000 presets for monthly and one-time**; monthly isn't reframed to lower absolute amounts or annual impact. | "Frame monthly at **lower absolute amounts** and show **cumulative annual impact**." | Monthly tiers ₹500/₹1,000/₹2,500 with "₹2,500/mo = a year of food for one shelter animal" (once real cost math confirmed). | Lowers the psychological price of recurring; raises monthly take-rate and retention. | S |
| A3 | **Default selected amount is ₹5,000 — the "Most Chosen" middle/high anchor** (`DonateWidget.tsx:17,21`). | "Pre-select the **second-lowest** tier as default." | Pre-select tier 2 of a 4-tier ladder; keep a visible higher anchor above it. | Reduces sticker-shock abandonment for first-timers while anchor lifts average gift. | S |
| A4 | **No social proof at the ask.** `Testimonials` (4 named monthly donors w/ photos, `lib/content.ts:47`) exist but are **not rendered adjacent to the form**; no donor count / recent-gift activity. | "Peer proof… placed **near the form**." | Put 1–2 monthly-donor testimonials + a live/honest donor-count or "X monthly guardians" beside the widget. | Peer proof at the decision point is one of the most reliable conversion lifts. | S–M |
| A5 | **No "where your money goes" breakdown** anywhere near the form. | "Pre-empt the overhead objection **at the point of giving**." | Add an honest allocation strip (e.g. "X% to direct animal care") beside the widget — **needs real §0 fund-allocation %**. | Removes the #1 NGO objection at the moment of doubt. | S (once data) |
| A6 | **No "cover transaction fees" opt-in.** | "Offer (don't force) a cover-fees opt-in." | Add an optional checkbox; Razorpay fee ≈ 2%. | Recovers gateway fees on a meaningful share of gifts at ~zero cost. | S |
| A7 | **Payment methods are tiny grey text below the submit button** ("UPI · GPay · PhonePe · Cards", `DonateWidget.tsx`), not surfaced as primary. | "Surface UPI/GPay **above the card form; visually primary on mobile**." | Lead with UPI/wallet affordances above the fold on mobile; cards as fallback. | UPI is the dominant India rail; leading with it reduces mobile drop-off. | M |
| A8 | **₹1,000 minimum donation** (`DonateWidget.tsx:34`, `api/donate/route.ts:14`). Benchmarks convert first-timers at **₹500 ("feeds 5 dogs")**. | Field discipline / first-time donor capture (§8 segmentation). | Lower floor to ₹500 with a concrete micro-impact line; keep higher tiers anchored. | Captures small/first-time gifts → the top of the second-gift funnel. Challenge, don't assume — confirm against cost math. | S |
| A9 | **No donor segmentation** — identical form for first-time, returning, lapsed. | "Adapt CTA/defaults for first-time / returning / lapsed." | Returning donors (cookie/email) skip the pitch → "give again / upgrade to monthly." | Returning-donor and upgrade flows convert far above cold. | M |
| A10 | **No analytics → the funnel is invisible.** No event on view/start/amount/method/complete. | §12 ("no conversion claim without a funnel metric"). | Privacy-first analytics + the Part E event map. | Unlocks measurement of A1–A9 and everything else. | M |

**What's already good (keep):** the thank-you page is strong — monthly-upgrade upsell, WhatsApp/Facebook share, immediate receipt expectation, two-stage PAN capture (`thank-you/page.tsx`, `ComplianceForm`). The demo/empty state and reduced-motion discipline are well done. Don't strip these.

---

## PART B — Donor trust architecture (§9)

NGO donations are gated by trust, and RKM's is **half-built**: strong *institutional* credentials, weak *proof density*.

**Present:** 12A/80G/CSR-1/DARPAN/PAN with downloadable certificates (`lib/content.ts` `DOWNLOADS`); honest "we're small, family-funded" framing (credible, rare, good); secure-payment + 80G badges on the form; physical address + phone + maps.

**Missing / weak (each a trust leak):**
- **Zero impact numbers on the homepage** (no `CountUp` stats render on `HomeExperience`). The honesty is admirable, but *no proof density* = donors can't gauge that gifts do anything. **Fix needs real §0 numbers** — animals rescued/treated/sterilised/fed, with dates.
- **No annual report / audited financials / fund-allocation %** surfaced. Certificates prove *registration*, not *stewardship*. Add a "where money goes" + latest impact report.
- **No third-party validation** (partner vets, shelters, ratings, press) beyond self-published certs.
- **Testimonials underused** — 4 good named ones exist but aren't placed where trust decisions happen (the ask, the homepage).
- **No named leadership/board** — the founders are anonymous ("our family"). A face + name materially raises trust; needs §0 consent.

---

## PART C — Storytelling audit (§2 Emotional Connection — 20% of award score, and the top donation driver)

**Strength:** the **Tobler origin story** (`about/page.tsx`) is genuinely moving and authentic — the "strangers who couldn't walk past a hurt animal" frame is excellent. Keep it central.

**Gaps:**
- **One story, told once.** Tobler lives only on /about + one blog post. No **rescue stories with names + before/after + outcome** (adopted/recovered/released) — the §9/§6a signature content that outperforms every technical fix. Needs real, consented animal stories (§0).
- **No story on the homepage or at the ask.** Emotion should precede the donate decision; right now the donate page leads with abstract copy, not a specific animal.
- **No founder narrative as a person** (it's "our family," faceless).
- **Hindi storytelling is a parallel hardcode** (translation-drift risk), not a managed story system.

> Storytelling is the highest-ROI area and the one most blocked by §0 facts. The moment you supply 3–5 real rescue narratives + before/after photos, this becomes the centerpiece of the homepage signature concept.

---

## PART D — Recurring giving program (the biggest revenue lever)

Today RKM has a **generic monthly toggle**, not a *program*. Benchmarks productize recurring giving and it dominates their revenue:

- **RESQ** — "Social Investment Plan," a monthly changemaker program tied to "8,000+ animals/year."
- **Kannan Animal Welfare** — **sponsor-a-specific-dog**: your monthly gift is tied to one named animal's food/treatment/shelter.
- Industry framing: **₹2,500/month = a month of food + medicine for one animal**; monthly funds daily care, one-time funds surgeries.

**Recommended program ladder for RKM (names indicative):**
1. **Guardian (₹500–₹2,500/mo)** — the default monthly identity; "you keep an animal fed every day."
2. **Sponsor-a-Rescue** — monthly gift tied to a **named animal** with photo updates (Kannan model). Highest emotional pull; needs real animals + a light update cadence.
3. **Feed-a-Pack** — fund a feeding-drive route; community/团体 framing for groups & CSR.

Each needs: a landing identity, a badge/name donors join, and a **monthly impact email** (currently missing — handover §6 lists donor nurture as not-built). Recurring + a retention email program is where "double donations" realistically comes from, not from one-time spikes.

---

## PART E — Analytics instrumentation plan (do this first; everything else is unmeasurable without it)

Privacy-first, cookieless (Plausible/Fathom or server-side per §13). Event map:

**Homepage / site**
`page_view` · `hero_viewed` · `scroll_depth{25,50,75,100}` · `story_viewed` · `donate_cta_click{location: header|hero|sticky|footer}`

**Donation funnel (the money path)**
`donate_view` → `frequency_selected{monthly|one_time}` → `amount_selected{value, preset|custom}` → `details_started` → `razorpay_launched` → `payment_success{value, frequency, method}` / `payment_failed{reason}` → `thankyou_view` → `monthly_upgrade_click`

**Derived KPIs to baseline (currently all unknown):**
donate-CTA click-through · form start-rate · **start→complete %** · **mobile vs desktop completion** · average gift · **recurring share of gifts** · thank-you upgrade take-rate · second-gift rate.

> Until these exist, nobody — not me, not any agency — can say whether RKM's constraint is *traffic*, *conversion*, or *trust*. Instrumenting is the precondition for the revenue model below.

---

## PART F — Benchmark summary (Indian animal NGOs)

| Mechanic | RESQ | Kannan (KAW) | Blue Cross | RKM today |
|---|---|---|---|---|
| Monthly program identity | ✅ "Social Investment Plan" | ✅ Sponsor-a-dog (named animal) | ✅ | ⚠️ Generic toggle, one-time default |
| Impact-tied amounts | ✅ ("8,000+/yr") | ✅ per-dog | ✅ ABC-AR framing | ⚠️ Copy only, no verified totals |
| Named-animal sponsorship | — | ✅ (strongest pull) | — | ❌ |
| Low entry point | ✅ | ✅ ₹500 "feeds 5 dogs" | ✅ | ❌ ₹1,000 floor |
| Impact numbers on site | ✅ | ✅ | ✅ | ❌ none rendered |
| 80G / transparency | ✅ | ✅ | ✅ | ✅ certs ✅ / ❌ financials |

RKM's **trust credentials and engineering are ahead** of several peers; its **conversion mechanics and proof density are behind**. That gap is the opportunity.

---

## PART G — International / NRI donor readiness (§0 #6 + FCRA)

Currently **India/₹ only** (Razorpay INR, no multi-currency, no FCRA references in code).
- **FCRA:** accepting foreign-source donations from non-NRI foreigners legally requires **FCRA registration**. NRIs (Indian passport holders) can give to a normal 80G account; foreign nationals generally cannot without FCRA. **This is a legal gate, not a UI toggle** — confirm RKM's FCRA status (§0) before any "international" claim.
- If NRI-in-scope: add NRI-friendly framing (80G applies to Indian-taxable NRIs), keep ₹ + show an indicative currency hint, and clear "who can give" guidance. **Do not** add multi-currency/foreign rails until FCRA is confirmed.

---

## PART H — Revenue model + 90-day roadmap

**The model (parametric — plug in real numbers after Part E):**

`Monthly donation revenue ≈ Visitors × DonateCTR × FormCompletion × AvgGift × (1 + RecurringMultiplier)`

`[ASSUMPTION]` Illustrative only, benchmark-ranged — **not** RKM data:
- A monthly-default (A1) typically shifts recurring share materially upward; recurring donors are worth a multiple of one-time over 12 months.
- Social proof + fee-cover + lower floor (A4/A6/A8) each add incremental completion/value.
- The compounding lever is **recurring share × retention**, not one-time conversion.

I won't fabricate a "2× donations" number — the honest claim is: **A1 + a named Guardian program + monthly impact emails are the realistic path to roughly doubling annualised donation value**, and Part E will prove or correct it within ~60 days of data.

**90-day roadmap (effort × impact):**

| Window | Do | Why |
|---|---|---|
| **Days 0–15 (instrument + quick wins)** | Analytics + funnel events (E); A1 monthly-default; A3 second-lowest default; A6 fee-cover; A8 lower floor. | Cheap, structural, starts the data clock. |
| **Days 15–45 (trust + proof)** | A4 social proof at ask; A5 allocation strip; surface impact numbers + latest report (needs §0); place a rescue story before the ask. | Lifts completion + average gift; closes trust leaks. |
| **Days 45–90 (program + retention)** | Launch **Guardian** + **Sponsor-a-Rescue**; monthly impact email; A9 returning/lapsed segmentation; A2 monthly annual-impact framing. | Builds the recurring engine + retention — the actual "double donations" mechanism. |

**Hard dependencies (from you):** real impact numbers + cost math (A2/A5/B), 3–5 consented rescue stories + before/after photos (C/D), fund-allocation % (A5/B), FCRA status (G), and the analytics go-ahead (E).

---

## Open Questions / Assumptions register
- All revenue figures = `[ASSUMPTION]`, benchmark-ranged, pending Part E data + §0 facts.
- `[ASSUMPTION]` ₹2,500 "month of food/medicine" framing borrowed from sector benchmark — confirm RKM's real cost math before publishing.
- Still blocked on §0 Set A (impact numbers, cost math, board, FCRA/NRI, photos, stories) — these gate Parts B, C, D, G and the revenue math.

## Sources
- [RESQ — Become a Regular Donor](https://www.resqct.org/become-a-regular-donor) · [RESQ home](https://www.resqct.org/)
- [Kannan Animal Welfare — How your donation helps](https://kannananimalwelfare.org/how-your-donation-helps-save-animals/) · [One-time vs Monthly](https://kannananimalwelfare.org/ngo-donations-one-time-vs-monthly/) · [Dog food donation](https://kannananimalwelfare.org/dog-food-donation/)
- [Stray Animal Foundation India — Sponsor Monthly](https://strayanimalfoundationindia.org/sponsor/)
- [VOSD — Donation for dogs](https://vosd.in/donation-for-dogs/)
