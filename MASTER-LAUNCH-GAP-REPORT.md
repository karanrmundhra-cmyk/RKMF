# RKM Foundation — Master Launch Gap Report
**Date:** 15 Jun 2026 · **Live:** https://rkmfoundation.com · **Base commit:** `83c7f05`
**Scope:** Product, UX, automation, premium-design and launch readiness. Does **not** repeat the prior security / donation-workflow / email audits except where they affect this view.

> Note on the design brief: the Pinterest inspiration board (`pin.it/5LMwzVfgm`) was not accessed — private boards aren't reliably fetchable and designs shouldn't be copied. The UX direction below is built from premium animal-welfare / luxury-brand design principles instead.

---

## 1. Executive Summary

RKM Foundation is **already a clean, credible, trustworthy donation site** — live on real `rzp_live_` keys, with statutory registrations (12A / 80G / CSR-1 / DARPAN) downloadable, a complete 13-person team, a compliant CSR Seven-Pillars section, gapless 80G receipts, and a tasteful editorial design. It is **ready to accept donations** once the founder completes the known credential/test steps.

It is **not yet a "world-class, emotionally powerful" platform.** The gap is not bugs — it is **emotional storytelling, proof of impact, and three half-built surfaces** (Shop, Fundraiser, Hindi) that currently imply capabilities the platform doesn't have. The site tells you the foundation is *trustworthy*; it does not yet make you *feel* the animals or *see* the scale of impact. Closing that gap is what separates "a nice NGO site" from "a globally respected one."

**Biggest single lever:** replace restraint with emotion — real animal imagery galleries, before/after rescue stories, named animal personalities, and live impact counters — paired with a lower donation entry point and monthly-giving emphasis.

---

## 2. Launch Score — **8.0 / 10**
Launch-ready as a trustworthy donation site. The missing 2.0 is emotional depth, proof-of-impact, and three half-built surfaces that need hiding or finishing.

## 3. Shop Readiness — **2 / 10**
Not built. A single product ("Hope" Candle) display page labelled **"Launching Soon — Notify Me."** No cart, no checkout, no order API, no payment flow, no inventory, no order/invoice email, no refund flow. The `/shop/thank-you` and `/shop/order-failed` pages are **orphans** (unreachable; one previously made a false email claim — fixed last session).

## 4. Hindi Readiness — **1 / 10**
Not implemented. Only a header/footer label **"EN | हिंदी soon."** No i18n library, no locale routing, no translated content; `<html lang="en">`.

## 5. Donation Readiness — **8.5 / 10**
Live, functional, compliant. Gapless 80G receipts + dual donor emails are coded and on live keys. Deductions: (a) the capture→webhook→receipt→email loop is **unverified end-to-end in production**; (b) **₹1,000 minimum** is a conversion ceiling; (c) almost no donation-psychology features (counters, social proof, goal meters, tax calculator).

## 6. CSR Readiness — **8.5 / 10**
Strong and audit-minded: Seven Pillars mapped to Schedule VII with correct clause notes and disclaimers, utilisation-certificate language, downloadable overview + certificate bundle, lead-capture form. Missing: case studies, corporate logos / past-partner proof, a named CSR contact, and a sample impact report.

## 7. UX/UI Score — **7.5 / 10**
Clean, tasteful, fast, accessible basics in place (skip-link, alt text, mobile sticky donate). But **restrained to the point of emotionally flat** for an animal cause: text-heavy, single static hero, no galleries, no before/after, no live numbers, all-Inter typography, light motion. Premium *structure* without premium *feeling*.

---

## 8. Top 50 UI/UX Improvements (ranked P1 / P2 / P3)

**P1 — do before or at launch (credibility + emotion + hygiene)**
1. Add a **live impact-counter strip** on the home page (Meals served · Rescues · Surgeries · Animals sheltered) — the `CountUp` component already exists; wire real numbers. (P1)
2. Add a **before/after rescue slider** module (drag-to-reveal) with 3–5 real recoveries. (P1)
3. Add **real impact numbers** ("In 2025: X meals, Y rescues, Z surgeries funded"). (P1)
4. Add **donor / volunteer testimonials** with photos near the primary CTA — social proof currently absent. (P1)
5. Add a **"Where your money goes"** breakdown (simple donut: food / medical / shelter / ops). (P1)
6. **Hide the orphan Fundraiser sub-pages** (`/fundraiser/ready`, `/success`, `/thank-you`) until a real P2P feature exists — they imply a platform that isn't there. (P1)
7. **noindex + unlink the dev pages** `/prototype` and `/prototype-v2` (live in prod, only blocked by robots). (P1)
8. **Confirm `/not-found` renders an on-brand 404** (a fetch returned empty) with friendly copy + links. (P1)
9. Keep **Shop as "Coming Soon"** but ensure its thank-you/order-failed pages are `noindex` and truly unreachable. (P1)
10. Add an **FCRA / foreign-donation note** ("currently accepting domestic donations only" or status) — matters to journalists, gov, and large donors. (P1)

**P2 — within the first month**
11. Introduce a **display serif** for headlines (warmth + luxury) alongside Inter for body. (P2)
12. Add a **"From the field" photo gallery** with lightbox (dogs, cats, cows, shelter life, volunteer moments). (P2)
13. Build **named animal personality profiles** ("Meet the residents") — a face and a story converts far better than an abstraction. (P2)
14. Expand the **Tobler story into a designed scrollytelling chapter** (richer storytelling components already exist in the `prototype` build — harvest them). (P2)
15. Make **monthly giving the visually dominant option** in the donate widget. (P2)
16. Add a **campaign goal thermometer** ("₹X of ₹Y raised for the shelter"). (P2)
17. Add an **80G tax-savings calculator** ("Give ₹10,000 → save ₹X"). (P2)
18. **Desktop sticky donate** bar/button (currently mobile-only). (P2)
19. Add **per-page OG images** (home / donate / csr) for richer social shares. (P2)
20. Add structured data: **FAQPage** on `/faqs`, **BreadcrumbList**, **DonateAction**. (P2)
21. **Expand top nav** beyond About/Donate to surface Stories, Get Involved, CSR. (P2)
22. Build a **Stories/Blog hub** (currently a single post). (P2)
23. Verify **Lenis smooth scroll** is active site-wide and tune reveal stagger/parallax. (P2)
24. **Reduced-motion** support for all animations (accessibility + polish). (P2)
25. **Color-contrast audit** on copper-on-light text and muted greys (WCAG AA). (P2)
26. **Inline form validation** + clear success states across all forms. (P2)
27. **Trust line at the pay button** ("256-bit secure · instant 80G receipt"). (P2)
28. Add a **PWA manifest + Apple touch icons** (installable, premium polish). (P2)
29. **Volunteer page**: concrete roles, time commitment, what a day looks like. (P2)
30. **CSR proof**: add (with permission) partner logos / a sample impact report / a named contact. (P2)
31. **Media/press** page: coverage logos, press kit, press contact. (P2)
32. Deepen **FAQs** (where money goes, 80G, receipts, foreign donations, visiting the shelter). (P2)
33. Add a **financial-transparency / annual-report** download. (P2)
34. Add **map embed** of the registered office on Contact. (P2)
35. **Image art-direction pass**: consistent warm grade, aspect ratios, rounded corners, soft shadows. (P2)

**P3 — polish / later**
36. **Donor wall / recent-gift ticker** (privacy-safe: first name + city). (P3)
37. **"Cover the transaction fee"** option at checkout. (P3)
38. **Custom cursor / hover micro-interactions** on cards and CTAs. (P3)
39. **Page transitions** between routes. (P3)
40. **Skeleton/loading states** for the donate widget and galleries. (P3)
41. **Founder video** message (Tobler origin). (P3, asset-dependent)
42. **"A day at the shelter"** photo essay / short film. (P3, asset-dependent)
43. **Breadcrumbs** on deep pages. (P3)
44. **Newsletter double opt-in** + a richer welcome series. (P3)
45. **Careers**: show real openings or an honest "no current openings" state. (P3)
46. **Impact dashboard** page (live, public metrics). (P3)
47. **Adopt / sponsor an animal** recurring product. (P3)
48. **Multilingual groundwork** (see Hindi roadmap). (P3)
49. **Alt-text quality pass** (descriptive, not generic). (P3)
50. **Dark-on-image legibility** scrims for hero/over-photo text. (P3)

---

## 9. Top 25 Conversion Improvements

1. **Lower the minimum donation** from ₹1,000 to ₹100–₹500 — the single biggest funnel widener (founder decision; weigh against processing/receipt economics).
2. **Embed the donate widget above the fold on the home page**, not just a CTA to `/donate-now`.
3. **Make monthly the default**, with "Most donors choose ₹2,500/month."
4. **Live impact counters** as social proof of scale.
5. **Impact-per-amount framing at the point of payment** (₹2,500 = two weeks of meals).
6. **Donor testimonials** beside the donate CTA.
7. **One animal, one ask**: a specific named animal with a goal ("Help Bruno reach his surgery").
8. **Reduce steps**: amount → pay on a single screen.
9. **Trust badges adjacent to the pay button** (Razorpay, 80G, secure).
10. **80G tax-savings calculator** to reframe cost.
11. **Goal thermometers** on campaigns.
12. **Story before the ask** — emotional priming above the form.
13. **Guest donation** (already no forced signup — keep it).
14. **Mobile one-tap UPI** prominence.
15. **Desktop sticky donate** CTA.
16. **Post-donation monthly upsell** (already on `/thank-you` — keep, and A/B the copy).
17. **Post-donation share loop** (already present — add a referral incentive).
18. **"See the animal you helped"** follow-up email with a real photo (operationalise the promise).
19. **Recurring-donor portal** (manage/upgrade/cancel) to lift retention.
20. **Exit-intent gentle nudge** on the donate page.
21. **Urgency windows** ("monsoon rescue drive — 9 days left").
22. **Social proof counts** ("12,340 meals funded this month").
23. **Multiple suggested amounts** with the middle one highlighted as "popular."
24. **Visible certifications + financial transparency** to remove the "is this legit?" hesitation.
25. **A/B test the hero** ("They can't ask for help. You can.") against an animal-specific variant.

---

## 10. Remaining Founder Tasks
- Complete the launch credential loop: **rotate exposed secrets**, **confirm the live Razorpay webhook** (endpoint/events/secret), **decide on seed-data reset**, run the **₹1,000 live test**, **verify receipt + emails**.
- **Decisions this report needs from you:** (a) lower the ₹1,000 minimum? (b) Shop — keep "Coming Soon" vs hide entirely? (c) Fundraiser — launch as a manual "request" model and hide the orphan pages, or invest in a real P2P platform? (d) Hindi — defer vs commit (see §13 roadmap). (e) FCRA/foreign-donation stance.
- Provide assets only you can authorise: **real photography/video**, **impact numbers**, **annual report / financials**, **CSR case studies & partner permissions**, **testimonials**.
- **Push & deploy** the already-completed code fixes (see Developer Tasks) — requires your authenticated machine.

## 11. Remaining Developer Tasks
- **Ship the pending email-honesty fixes** (3 files, type-checked, sitting in the working tree): `git add lib/email.ts app/shop/thank-you/page.tsx app/fundraiser/thank-you/page.tsx && git commit -m "Email honesty fixes" && git push origin main` → Vercel auto-deploys.
- `noindex` + remove links to `/prototype`, `/prototype-v2`; hide orphan `/fundraiser/ready|success|thank-you` and `/shop/thank-you|order-failed` until their features exist.
- Verify/fix the **`/not-found` 404 page** render.
- Wire **`CountUp` impact counters**, **before/after slider**, **gallery + lightbox**, **testimonials** modules.
- Add **per-page OG images**, **FAQPage/Breadcrumb/DonateAction structured data**, **PWA manifest**.
- Donate widget: monthly-default, trust line, goal meter, optional lower minimum, desktop sticky.
- (If pursued) build the **Fundraiser P2P platform** and the **Shop commerce + email/invoice/refund** flows — both are substantial, not quick fixes.

## 12. Do This Week
1. Founder credential loop + ₹1,000 live test (unblocks real donations).
2. Push/deploy the pending email fixes.
3. Hide the half-built surfaces (prototype, orphan fundraiser/shop pages) + fix the 404.
4. Add impact counters, before/after, and testimonials to the home page (highest emotional ROI).
5. Decide Shop / Fundraiser / Hindi / minimum-donation questions.

## 13. Do Next Month
- Stories/Blog hub + named animal profiles + field gallery.
- Donation-psychology upgrades (monthly default, tax calculator, goal meters, lower minimum).
- CSR proof (case studies, logos, sample impact report).
- Financial-transparency / annual-report page.
- **Hindi roadmap (recommended path: phased bilingual via translation toggle):**
  - *Structure:* Next.js App Router i18n with locale segments (`/` and `/hi/...`) + a header EN/हिंदी toggle (replace the "soon" badge).
  - *Phase 1 (highest value):* Home, Donate, About, CSR, Contact, primary nav/footer, donation widget labels, and the **donor-facing emails + 80G receipt** (receipts in Hindi materially help Tier-2/3 donors).
  - *Phase 2:* FAQs, Volunteer/Partner/Careers, legal pages (professionally translated — legal copy must be reviewed, not machine-translated).
  - *Keep English:* statutory registration numbers, PAN, technical/legal identifiers, admin console.
  - *Approach recommendation:* **partial bilingual now → full bilingual over time**, professional translation (not auto-translate) for trust, locale-prefixed URLs for SEO.

---

## 14. Final GO / NO-GO

- **Core site + donations: GO** (after the founder's credential/test loop).
- **Shop: NO-GO as commerce → keep "Coming Soon"** (it honestly captures interest; just hide its orphan transactional pages).
- **Fundraiser: GO as a manual "request a fundraiser" model → hide the orphan P2P placeholder pages.** NO-GO as a self-serve platform (not built).
- **Hindi: NO-GO for launch → deferred per roadmap** (the honest "soon" label is fine).

**Overall: GO for public launch of the core donation site**, with the three half-built surfaces hidden or honestly labelled, and the emotional/impact upgrades scheduled immediately after.

---

## The most important answer

> **If RKM Foundation wanted to look like a premium, emotionally powerful, globally respected animal-welfare organisation tomorrow morning, what are the exact highest-impact changes still missing?**

In priority order, the changes that would move the needle most:

1. **Show the animals, don't describe them.** A full-width **before/after rescue gallery** and **named animal profiles** (dogs, cats, cows — face + name + story) on the home page. Emotion converts; abstraction doesn't. This is the #1 gap.
2. **Prove the scale with live numbers.** An **impact-counter strip** (meals, rescues, surgeries, animals sheltered) using real figures — instant credibility and emotional weight. The component already exists; it just needs real data.
3. **Add social proof.** **Testimonials** from donors and volunteers, with faces, near the donate CTA — the site currently asks for trust without showing that others already gave it.
4. **Lower the donation barrier and lead with monthly.** Drop the **₹1,000 minimum** to ₹100–₹500 and make **monthly giving the default** — the fastest conversion lift available.
5. **Make money transparent.** A simple **"where your money goes"** breakdown + a **financial/annual report** — the difference between "looks nice" and "trusted by Tata/Reliance/Infosys."
6. **Hide what's half-built.** Take down the orphan Fundraiser/Shop/prototype pages so nothing on the site over-promises — a single broken or empty surface undermines the premium feeling more than ten polished ones build it.
7. **Elevate the craft.** A **display serif for headlines**, a **consistent warm image grade**, **smooth motion** (Lenis + staggered reveals), and **desktop sticky donate** — the luxury cues that make a site *feel* world-class.

Do 1–4 and you have an emotionally powerful, high-converting site. Add 5–7 and you have one a global foundation would respect. None of these require new infrastructure — they're storytelling, imagery, numbers, and restraint about what to show.
