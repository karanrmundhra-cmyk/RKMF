# RKM FOUNDATION — MASTER OPERATING DOCUMENT
### Version 1.0 · Frozen 24 June 2026 · Single Source of Truth

> This document is self-contained and supersedes all previous audit reports, registers, addenda, and notes for RKM Foundation. A new team member (Claude, developer, designer, marketing, or fundraising) should be able to read **only this file** and understand the project completely. From this point forward: **execution, not auditing.**
>
> **Anti-fabrication rule (binding):** Every impact number, rescue story, donor count, financial figure, and credential in this project must be real and attributable. Items requiring real data are marked **`[NEEDS DATA]`** and must never be invented.

---

## SECTION 1 — EXECUTIVE SUMMARY

**Organisation.** RKM Foundation is a registered charitable trust in India (Thane West, Maharashtra) working in animal welfare: rescue, feeding, veterinary treatment, sterilisation, vaccination, rehabilitation, and rehoming. Founded in 2014; grew from a family-funded effort that began with the founders' pug, **Tobler**, and the strangers they met carrying hurt street animals into the vet.

**Mission (working — confirm exact wording).** "RKM Foundation rescues, feeds, heals, and shelters animals in need across India." `[NEEDS DATA: founder to confirm the one canonical sentence.]`

**Website vision.** One of the most trustworthy, memorable, and beautifully executed animal-welfare websites in India — award-credible (Awwwards / CSS Design Awards / FWA) **and** a high-performing donation engine. A first-time visitor understands **who we are, what we do, why it matters, and how to help** within 5 seconds, on every page.

**Definition of success.**
1. **Award-credible experience** — a distinctive signature concept, not just polish (Design 40% · Usability 30% · Creativity 20% · Content 10% on Awwwards).
2. **Maximised recurring donations** through trust, clarity, and storytelling — measured, not asserted.
3. **Verified technical bar:** Core Web Vitals "good" at field p75 (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1); WCAG 2.2 AA (manually verified); PCI-DSS SAQ-A; DPDP/GDPR compliant.

**Strategic priorities (in order).** Clarity → Emotional connection → Trust → Distinctiveness → UX → Donation conversion → Performance → Accessibility → SEO. On the donation flow specifically, conversion mechanics outrank raw minimalism.

**Key risks.**
- **No analytics baseline yet** — conversion cannot be measured until instrumented (in progress).
- **Cookie consent is non-compliant** (cosmetic banner) — a DPDP/§13 exposure and the blocker to analytics go-live.
- **Live secrets were exposed in chat** (handover) — must be rotated before public launch.
- **Trust/proof density is thin** — strong credentials but no impact numbers, financials, or named rescue stories surfaced (all fact-blocked on founder data).
- **Revenue concentration risk** — no recurring program identity, no legacy/major-donor channels yet.

**Key opportunities.**
- **Monthly-first donations** (now defaulted) + a named **Guardian / Sponsor-a-Rescue** program — the realistic path to roughly doubling annualised donation value.
- **Legacy giving (gifts in wills)** — for animal causes this is the single largest channel globally (≈55% of RSPCA's income); RKM has none today.
- **Tribute/memorial giving** and **peer-to-peer fundraising** — high-emotion, occasion-driven channels currently absent or unoptimised.
- **Authentic storytelling** (Tobler + real rescues) — the highest-ROI lever, gated only on real content.

---

## SECTION 2 — AUDIT COMPLETENESS REPORT

| Category | Audited? | Closed? | Remaining gaps | Status |
|---|---|---|---|---|
| Architecture | Yes | Mostly | DB schema not version-controlled (RKMF-028) | Strong (Next.js 14, Supabase, Razorpay, Resend, Vercel) |
| Security | Yes | Mostly | CSP nonce (023), admin per-user auth (029), secret rotation (030) | Strong backend; CSP partially hardened |
| Compliance | Yes | Mostly | Cookie consent (004) is the open critical | 12A/80G/CSR-1/DARPAN/PAN all present & consistent |
| SEO (technical) | Yes | Mostly | schema fixed; content/editorial SEO not audited (050) | Good; sitemap, canonicals, OG present |
| Accessibility | Yes (heuristic) | Partially | Manual WCAG 2.2 AA passes (025), reduced-motion (026) | Mostly complete; manual verification outstanding |
| Performance | Yes (design-level) | Partially | Fonts (021), next/image (022); field data unmeasured (051) | Lab-level only until analytics/devices |
| Donation Conversion | Yes | Mostly | Amount ladder (011), UPI primary (013), floor (014), segmentation (015) | Monthly-default, fee-cover, story+proof shipped |
| Fundraising | Yes | Yes | Execution of new channels (legacy/tribute/P2P) | Complete audit; building phase |
| Trust | Yes | Partially | Impact #s (012), financials (016), board (017), validation (018) — all fact-blocked | Credentials strong; proof density thin |
| Storytelling | Yes | Partially | Rescue stories (019), homepage story (020) — fact-blocked | Tobler exists; under-leveraged |
| Analytics | Yes (design) | Partially | Provider deploy (005) + baseline; depends on consent (004) | Instrumentation built, not live |
| Recurring Giving | Yes | Partially | Program identity build (040) | Strategy complete |
| Major Donors | Yes | No | Journey + top-20 analysis (031, 034) — data-blocked | Identified, not built |
| CSR | Yes | No | Landing conversion (032), case studies (033) | Identified, not built |
| Volunteer Funnel | Yes | No | Volunteer→donor path (041) | Identified, not built |
| Email Lifecycle | Yes | No | Nurture/win-back/impact emails (035–037) | Identified, not built |
| WhatsApp Lifecycle | Yes | No | Journeys (038); opt-in exists, unused | Identified, not built |
| Benchmarking | Yes | Yes | — (global + India complete) | Closed |

---

## SECTION 3 — MASTER ISSUE REGISTER (RKMF-001 → RKMF-052)

**Status legend:** DONE (edited, typecheck-clean) · IN-PR (done, awaiting commit on founder's Mac) · OPEN · FACT-BLOCKED (needs founder content/legal data) · DATA-BLOCKED (needs analytics/donor data) · BUILD-BLOCKED (needs build/deploy test) · FOUNDER (operational action).

| ID | Category | Description | Impact | Effort | Dependencies | Status | Recommended fix |
|---|---|---|---|---|---|---|---|
| RKMF-001 | Conversion | Donation frequency defaulted to one-time | Critical | S | — | DONE | Default to monthly; one-time one tap away |
| RKMF-002 | Conversion | No fee-cover option | High | S | — | DONE | ~2% opt-in; live recompute of charged amount |
| RKMF-003 | Analytics | No funnel instrumentation | Critical | M | — | DONE | `lib/analytics.ts` + events wired, consent-gated |
| RKMF-004 | Compliance | Cookie banner cosmetic — no reject, gates nothing (DPDP) | Critical | M | — | OPEN | Granular consent; reject=accept; set consent flag only on opt-in |
| RKMF-005 | Analytics | No analytics provider deployed → no baseline | Critical | S | 004 | OPEN | Add cookieless provider (Plausible/Fathom); connect `track()` |
| RKMF-006 | SEO/Trust | schema.org tagged Indian trust as US 501(c)(3) | High | S | — | DONE | Correct NGO + Indian IDs + DonateAction |
| RKMF-007 | Security | CSP carried `unsafe-eval` | High | S | — | DONE (verify on preview) | Removed `unsafe-eval`; smoke-test donate flow |
| RKMF-008 | Hygiene | 357 junk files committed | High | S | — | IN-PR | Cleanup+commit script (run on Mac); .gitignore guards added |
| RKMF-009 | Emotion/Trust | No story / social proof at the ask | High | S | — | DONE | Tobler story + monthly-donor testimonial on donate page |
| RKMF-010 | Trust | No "where your money goes" strip at the ask | High | S | Fund % | FACT-BLOCKED | Honest allocation strip beside widget |
| RKMF-011 | Conversion | Amount ladder: same tiers monthly/one-time; no low entry | High | M | Cost math | FACT-BLOCKED | 4-tier ladder; monthly lower absolutes + annual impact |
| RKMF-012 | Trust | Zero impact numbers on homepage | High | M | Impact #s | FACT-BLOCKED | Proof-density stat band (rescued/treated/fed, dated) |
| RKMF-013 | Conversion | UPI/GPay as grey text, not primary on mobile | Med | M | — | OPEN | Lead with UPI above card on mobile |
| RKMF-014 | Conversion | ₹1,000 floor vs peers' ₹500 entry | Med | S | Confirm cost math | OPEN | Lower floor to ₹500 with micro-impact line |
| RKMF-015 | Conversion | No donor segmentation (first/return/lapsed) | High | M | 005 | OPEN | Returning → give-again/upgrade; lapsed → win-back |
| RKMF-016 | Trust | No annual report / audited financials / fund % | High | M | §0 docs | FACT-BLOCKED | Transparency section + downloads (+ optional live dashboard) |
| RKMF-017 | Trust | Founders/board anonymous | Med | S | Consent | FACT-BLOCKED | Named leadership + photo on /about |
| RKMF-018 | Trust | No third-party validation (vets/press/ratings) | Med | M | §0 | FACT-BLOCKED | Partner logos + press/ratings strip |
| RKMF-019 | Storytelling | One story told once; no named rescue + before/after | High | M | Stories+photos | FACT-BLOCKED | 3–5 rescue narratives with outcomes |
| RKMF-020 | Storytelling | No story on homepage | High | M | 019 | OPEN | Lead homepage with one animal (signature concept) |
| RKMF-021 | Perf/Privacy | Fonts from Google CDN (IP leak + render-block) | High | M | Build test | BUILD-BLOCKED | Self-host (60+ literal refs → vars, or /public/fonts + @font-face) |
| RKMF-022 | Perf | 0× next/image; 12 raw `<img>` (CLS/oversized) | High | M | Build test | OPEN | Migrate to next/image w/ dimensions + AVIF |
| RKMF-023 | Security | CSP still has script-src `unsafe-inline` | High | M | Deploy test | OPEN | Per-request nonce via middleware.ts |
| RKMF-024 | Quality | No donation-flow E2E | High | L | — | OPEN | Playwright incl. declined/idempotent/3DS |
| RKMF-025 | A11y | No manual WCAG 2.2 AA pass | High | M | — | OPEN | Keyboard/SR/zoom/target-size/focus passes |
| RKMF-026 | A11y/Motion | reduced-motion unverified across Lenis/GSAP | Med | M | — | OPEN | Audit motion layer; ensure off-switch |
| RKMF-027 | Hygiene | prototype + prototype-v2 dead routes shipping | Med | S | — | OPEN | Delete or noindex + remove from build |
| RKMF-028 | Architecture | DB schema not version-controlled (no migrations) | High | M | — | OPEN | Commit SQL migrations as source of truth |
| RKMF-029 | Security | Admin = single static shared token | Med | M | — | OPEN | Per-user auth (Supabase Auth) |
| RKMF-030 | Security | Live secrets exposed in chat (handover) | Critical | S | — | FOUNDER | Rotate Supabase/Resend/admin/webhook keys |
| RKMF-031 | Major gifts | No major-donor journey (₹25k–₹1L) | High | M | Donor data | DATA-BLOCKED | High-touch ask + stewardship path |
| RKMF-032 | CSR | CSR landing not audited for conversion | High | M | — | OPEN | Audit + rebuild /csr conversion flow |
| RKMF-033 | CSR | No CSR case studies / outreach assets | Med | M | §0 cases | FACT-BLOCKED | Build CSR proof + one-pager |
| RKMF-034 | Major gifts | No top-20 donor analysis / journey | High | M | Donor data | DATA-BLOCKED | Segment + define follow-up |
| RKMF-035 | Retention | No new-donor nurture (thank-you→impact→monthly) | High | M | 005 | OPEN | Build lifecycle email series |
| RKMF-036 | Retention | No lapsed win-back | High | M | Donor data | DATA-BLOCKED | Win-back flow |
| RKMF-037 | Retention | No monthly impact email | High | M | Impact #s | FACT-BLOCKED | Recurring impact update |
| RKMF-038 | Retention | No WhatsApp journeys (opt-in exists, unused) | Med | M | Provider | OPEN | Impact updates via WhatsApp opt-in |
| RKMF-039 | Fundraising | No campaign calendar (festival/emergency/seasonal) | High | M | — | OPEN | Annual calendar + templates |
| RKMF-040 | Recurring | Generic monthly toggle, no program identity | High | L | Named animals | OPEN | Guardian / Sponsor-a-Rescue / Feed-a-Pack |
| RKMF-041 | Funnel | No volunteer→donor→monthly path | Med | M | — | OPEN | Volunteer conversion journey |
| RKMF-042 | International | FCRA status unconfirmed → foreign giving blocked | High | S | Legal | FACT-BLOCKED | Confirm FCRA before any foreign-donor claim |
| RKMF-043 | i18n | Hindi storytelling = parallel hardcode (drift risk) | Med | M | — | OPEN | Shared content model for EN/HI |
| RKMF-044 | Legacy | No gifts-in-wills / legacy giving (≈55% of RSPCA income) | High (long-term) | M | Legal wording | OPEN | "Remember RKM in your will" page + enquiry form |
| RKMF-045 | Tribute | No memorial / in-honour giving + e-cards | Med-High | M | E-card template | OPEN | Tribute donate path with paper/e-card |
| RKMF-046 | Peer-to-peer | /fundraiser flow unaudited/unoptimised | High | M | — | OPEN | Audit + optimise; shareable supporter pages; birthday prompts |
| RKMF-047 | Adoption | No adoptable-animals / rehoming portal | Med | L | Real animals | FACT-BLOCKED | Searchable listings → foster/adopt → donor funnel |
| RKMF-048 | In-kind | No structured in-kind/wishlist giving | Low-Med | S | Supply list | OPEN | Published wishlist (food/blankets/meds) |
| RKMF-049 | Audit | Shop/e-commerce flow conversion unaudited | Med | M | — | OPEN | Audit /shop funnel + states |
| RKMF-050 | Audit | Content/editorial SEO (keywords, blog) unaudited | Med | M | — | OPEN | Keyword + content strategy |
| RKMF-051 | Audit | Real-device mobile UX + field performance unmeasured | High | M | 005 + devices | DATA-BLOCKED | Real-device test + CrUX/RUM field p75 |
| RKMF-052 | Audit | Email deliverability not independently verified | Med | S | — | OPEN | Deliverability + transactional-copy review |

**Resolved conflict:** a previous note flagged the ₹5,000 default as "high-anchor." With a 3-tier ladder ₹5,000 is the second-lowest tier, which is the correct default — so that is **not** an issue. The real improvement is a 4-tier ladder (RKMF-011), retained.

---

## SECTION 4 — IMPLEMENTATION ROADMAP

| Batch | Goal | Issues | Expected outcome | Dependencies |
|---|---|---|---|---|
| **Batch 1 — Critical revenue/trust/compliance** | Ship the highest-ROI conversion + compliance wins; turn on measurement | 001, 002, 003, 004, 005, 006, 007, 008, 009, 010 | Monthly-first donations live; analytics measuring; legally-compliant consent; trust at the ask | 005 needs 004; 010 needs fund % |
| **Batch 2 — Conversion + trust depth** | Lift completion + average gift; close trust/proof gaps | 011, 012, 013, 014, 015, 016, 017, 018, 019, 020 | 4-tier ladder, UPI-first mobile, proof density, named stories, segmentation | Most fact-blocked on §0 data |
| **Batch 3 — SEO / A11y / Perf / tech-debt** | Hit the world-class technical bar | 021, 022, 023, 024, 025, 026, 027, 028, 029, 030 | Self-hosted fonts, next/image, nonce CSP, E2E, manual a11y, migrations, secret rotation | Fonts/next-image/CSP need build+deploy test |
| **Batch 4 — Major donor & CSR** | Open high-value channels | 031, 032, 033, 034 | Major-donor journey + CSR conversion + case studies | Donor data (analytics) + §0 cases |
| **Batch 5 — Email & WhatsApp lifecycle** | Build retention engine | 035, 036, 037, 038 | New-donor nurture, win-back, monthly impact, WhatsApp | Analytics + impact #s + provider |
| **Batch 6 — Campaigns, recurring programs, new channels** | Build the recurring + new-channel engine | 039, 040, 041, 042, 043, 044, 045, 046, 047, 048 | Guardian/Sponsor/Feed programs, legacy, tribute, P2P, adoption, wishlist, campaign calendar | Named animals, legal (FCRA/wills), content |
| **(Carry-forward audits)** | Close remaining audit surface | 049, 050, 051, 052 | Shop, content SEO, field perf, deliverability audited | 051 needs analytics |

**Recommended start order:** RKMF-004 → 005 (unblocks all measurement), then the remaining open Batch-1/2 items, in parallel with founder supplying §0 data to unblock the FACT-BLOCKED rows. RKMF-044 (legacy) is the highest-value *new* build.

---

## SECTION 5 — FUNDRAISING SYSTEM (final architecture)

| Vehicle | Why it exists | Priority | Dependencies |
|---|---|---|---|
| **One-time giving** | Entry gift; funds surgeries/emergencies (one-off costs). Always visible, one tap from monthly. | Live | — |
| **Monthly giving** | The lifeline — funds daily food, vet care, staff. **Defaulted** in the form. Worth a multiple of one-time over 12 months. | Live (default) | — |
| **Guardian program** | Productised monthly identity ("keep an animal fed every day"); converts better than a generic toggle. | High | Program build (RKMF-040) |
| **Sponsor-a-Rescue** | Monthly gift tied to a **named animal** with photo updates — strongest emotional pull (Kannan model). | High | Real, consented animals `[NEEDS DATA]` |
| **Feed-a-Pack** | Fund a feeding-drive route; community/group + CSR framing. | Med | RKMF-040 |
| **Legacy giving (gifts in wills)** | Largest channel for animal causes globally (~55% of RSPCA income); multi-year pipeline RKM lacks. | High (long-term) | India-correct legal wording (RKMF-044) |
| **Memorial / tribute giving** | Occasion-driven, high-emotion (in memory of a pet); near-universal among top NGOs; pairs with donate flow. | Med-High | E-card template (RKMF-045) |
| **Wishlist / in-kind** | Low-friction non-cash entry that often converts to cash later. | Low-Med | Supply list (RKMF-048) |
| **Peer-to-peer fundraising** | Supporters raise on RKM's behalf (birthdays, crowdfunding). `/fundraiser` exists; optimise it. | High | RKMF-046 |
| **CSR** | India 12A/80G/CSR-1 unlock corporate giving; needs a converting landing + case studies. | High | RKMF-032/033 |
| **Major donors** | ₹25k–₹1L+ donors need a high-touch journey + stewardship, not the standard form. | High | Donor data (RKMF-031/034) |

---

## SECTION 6 — DONOR JOURNEY

**Visitor → Donor → Repeat Donor → Monthly Donor → Major Donor → Legacy Donor**

| Stage | Website touchpoint | Email | WhatsApp | Conversion point |
|---|---|---|---|---|
| **Visitor** | Homepage signature story + impact numbers; clear "how to help"; sticky donate | Newsletter capture | — | First donate-CTA click |
| **Donor (first gift)** | Monthly-default donate form; story + social proof at ask; fee-cover; instant receipt | Immediate thank-you + 80G receipt; impact-of-this-gift | Optional opt-in impact updates | Form start → complete |
| **Repeat Donor** | Returning-donor recognition → "give again"; tribute/occasion paths | Impact updates; second-gift prompt | Field photos/stories | Second gift |
| **Monthly Donor (Guardian)** | Guardian/Sponsor-a-Rescue identity; upgrade prompts | Monthly impact email; named-animal updates | Monthly animal update | One-time → monthly upgrade |
| **Major Donor** | Major-gift / CSR landing; personal contact | Stewardship + reports | Personal liaison | High-touch ask |
| **Legacy Donor** | "Remember RKM in your will" page + enquiry | Legacy guide + follow-up | — | Will enquiry submitted |

**Lapsed donors** branch out at any stage into a **win-back** flow (email + WhatsApp), gated on analytics/donor data.

---

## SECTION 7 — ANALYTICS BLUEPRINT

**Provider:** cookieless, IP-anonymised, consent-gated (Plausible/Fathom or server-side). No off-device send before explicit opt-in.

**Events.**
*Site/homepage:* `page_view` · `hero_viewed` · `scroll_depth{25,50,75,100}` · `story_viewed` · `donate_cta_click{location}`.
*Donation funnel:* `donate_view` → `frequency_selected{monthly|one_time}` → `amount_selected{value,preset|custom}` → `details_started` → `razorpay_launched` → `payment_success{value,frequency,method}` / `payment_failed{reason}` → `thankyou_view` → `monthly_upgrade_click`.

**KPIs (baseline then track).** Donate-CTA CTR · form start-rate · **start→complete %** · **mobile vs desktop completion** · average gift · **recurring share of gifts** · monthly-upgrade take-rate · second-gift rate · donor retention · LTV by cohort.

**Funnels.** (1) Homepage→donate-click→complete. (2) Donate-view→amount→method→success (drop-off per step). (3) First-gift→second-gift. (4) One-time→monthly upgrade.

**Dashboards.** Executive (revenue, recurring %, avg gift, retention) · Conversion (funnel drop-off) · Channel (one-time/monthly/legacy/tribute/P2P/CSR) · Campaign (per appeal).

**Reports.** Weekly funnel + drop-off; monthly revenue + recurring cohort retention; per-campaign post-mortem; quarterly LTV/retention review.

---

## SECTION 8 — CONTENT & STORYTELLING

| Element | Final requirement | Data needed |
|---|---|---|
| **Homepage** | Lead with one real animal (signature concept) + a proof-density stat band; 5-second test passes | Impact numbers `[NEEDS DATA]` |
| **Tobler story** | Keep central; surface a compact version at the ask (done) and on /about (exists) | — |
| **Rescue stories** | 3–5 named animals, before/after, outcome (adopted/recovered/released) | Consented stories + photos `[NEEDS DATA]` |
| **Testimonials** | 5 real, named, with photos (Raghav Daga, Shweta Desai, Ankit Palan, Aditya Mohatta, Dr. Kiran Shelar) — place at the ask (done) + homepage | — |
| **Impact numbers** | Animals rescued/treated/sterilised/vaccinated/fed/rehomed, with dates & cost-per-outcome | `[NEEDS DATA]` |
| **Trust signals** | 12A 47522 · 80G CITE80G9792014-152016-17 · CSR-1 CSR00089305 · DARPAN MH/2024/0457296 · Trust E-30560 · PAN AACTR4271L · address · phone (all real, present) | — |
| **Transparency** | "Where your money goes" %, annual/impact report, optional live dashboard | Fund-allocation % + report `[NEEDS DATA]` |
| **Photography** | One coherent documentary treatment of real rescued animals; no stock; dignity over shock | Cleared real photos `[NEEDS DATA]` |

---

## SECTION 9 — BENCHMARK FINDINGS (global + India)

**Benchmark set:** RSPCA, Dogs Trust, Cats Protection, Battersea, Blue Cross UK, ASPCA, Best Friends, Humane World (HSUS), Wisconsin Humane, Operation Kindness, North Shore Animal League, PetSmart Charities, Alley Cat Allies, Animal Welfare Institute, Soi Dog, Four Paws, IFAW, charity:water + St. Jude (UX), and India: RESQ, Kannan, Blue Cross India, VOSD.

**Adopted (added to register).** Legacy/gifts-in-wills (044) · Tribute/memorial + e-cards (045) · Peer-to-peer fundraising (046) · Adoptable-animals portal (047) · Structured wishlist (048). Plus confirmed-already-covered: sponsor-an-animal monthly (040), transparency/financials (010/016), impact numbers + authentic storytelling (012/019/020), prominent one-click donate + mobile express pay (013), emergency/seasonal campaigns (039), donor segmentation/upgrade (015), third-party validation (018), email lifecycle (035/036).

**Rejected (out-of-scope for an India/₹ trust).**
- **Charity lottery / weekly raffle** (UK) — Indian lottery/gaming regulation; impractical/illegal for a trust.
- **Stock / DAF / crypto giving** (US major-gift rails) — not applicable to INR/Razorpay; revisit only if FCRA + NRI opens.
- **Gift Aid** (UK tax uplift) — India equivalent is **80G**, already implemented.

---

## SECTION 10 — OPEN ITEMS (what's required to close each)

**FACT-BLOCKED (need founder content/legal data):**
- 010 fund-allocation %; 011 real cost-per-outcome math; 012 & 037 real impact numbers + dates; 016 audited financials / fund %; 017 board/founder names + consent; 018 partner/press/ratings; 019 & 047 consented rescue stories + animal data + photos; 033 CSR case studies; 042 FCRA legal status.
- *To close:* founder supplies the §0 data pack (impact figures, cost math, fund %, board consent, real stories + photos, FCRA status, CSR cases).

**DATA-BLOCKED (need analytics/donor data that doesn't exist yet):**
- 031 & 034 major-donor/top-20 analysis; 036 lapsed win-back; 051 real-device/field performance.
- *To close:* deploy analytics (005) + accumulate ≥28 days of field + donor data.

**BUILD-BLOCKED (need a build/deploy test in a real environment):**
- 021 self-host fonts; 022 next/image; 023 CSP nonce; 007 final verification.
- *To close:* run `npm run build` + Vercel preview; smoke-test donate flow + console for CSP violations; visual-diff typography/images.

---

## SECTION 11 — DEFERRED ITEMS (intentional, with reasons)

- **Self-host fonts (021):** correct fix touches 60+ files that hardcode literal family names; shipping blind would regress typography sitewide + all Hindi pages. Deferred until a build test or font binaries are added to /public/fonts.
- **CSP nonce (023):** removing `script-src 'unsafe-inline'` must be smoke-tested against live Razorpay checkout; `style-src 'unsafe-inline'` is retained permanently (Framer Motion writes inline styles — impractical to remove).
- **Admin per-user auth (029) & secret rotation (030):** founder/ops, sequenced around launch per the handover.
- **Batches 4–6 (major donor, CSR, email/WhatsApp, campaigns, new channels):** execution-phase; gated on analytics baseline + §0 content. Not started by design.
- **Amount-ladder redesign (011) & impact strip (010):** deferred specifically to avoid fabricating impact claims — unblock the moment real cost math + fund % arrive.

---

## SECTION 12 — EXECUTION GOVERNANCE

**Weekly review.** Review the funnel report (drop-off per step) + issues moved DONE/OPEN. Re-rank the next 10 by ROI. Confirm no FACT/DATA/BUILD-blocked item is silently stalling. Owner: project lead.

**Monthly review.** Revenue + recurring-cohort retention; campaign post-mortems; ratchet CI Lighthouse/a11y gates from warn→error as fixes land; re-verify Core Web Vitals field p75; review the §0 data backlog with the founder.

**Ownership model.** Founder — §0 facts, legal (FCRA/wills), financials, photos, secret rotation, DNS/keys. Engineering — Batches 1/3 + analytics + CI/quality gates. Design/Content — Batches 2/8 (storytelling, trust, signature concept). Fundraising/Marketing — Batches 4/5/6 (programs, lifecycle, campaigns).

**Decision model.** Every change must answer: *does this make RKM clearer, more trustworthy, more memorable, more emotionally impactful, more distinctive, or increase donations — without harming a higher priority?* If no, reject. Donation-flow changes require a **funnel metric** to be considered verified — "it looks better" is not verification. No impact number or rescue claim ships without a real, attributable source.

---

## SECTION 13 — FINAL CLOSURE STATEMENT

1. **Is the audit complete?** Yes for the core donation-growth surface — architecture, security, compliance, technical SEO, accessibility (heuristic), performance (design-level), donation conversion, fundraising, trust, storytelling, analytics design, recurring strategy, and global benchmarking are all audited. Four audit tasks remain (RKMF-049–052).
2. **What remains unaudited?** Shop/e-commerce flow (049), content/editorial SEO (050), real-device/field performance (051), and email deliverability (052) — logged as issues, none expected to outrank Batches 1–2 in ROI.
3. **What remains unknown?** All real impact numbers, cost-per-outcome math, fund-allocation %, board identities, FCRA status, CSR cases, and live donor analytics — these are missing **source data**, not audit failures.
4. **Highest-priority next action.** Ship **RKMF-004 (compliant cookie consent)**, then **RKMF-005 (deploy analytics)** — together they unblock every revenue measurement. In parallel, the founder supplies the §0 data pack; RKMF-044 (legacy giving) is the highest-value new build.
5. **Can this be treated as the permanent source of truth?** Yes.

---

### Version 1.0 — Frozen — Source of Truth
**No further audits. Execution only from this point forward.** This document is the single reference for Claude, developers, designers, marketing, fundraising, and any future review. All prior audit reports, registers, and addenda are superseded.
