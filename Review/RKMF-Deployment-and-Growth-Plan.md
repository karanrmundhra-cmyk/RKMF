# RKM Foundation — Deployment & Growth Plan
*Planning only. No code changes, no payment/production changes. Reflects actual state as of 2026-06-16.*

---

## 1. FINAL DEPLOYMENT REGISTER

### 1A · Deployed (live on production — commit `941032f`)
| ID | Change | Notes |
|---|---|---|
| SEC-01 | Email HTML-injection escaping (staff notifications) | Auto-deployed by pipeline |
| SEC-04 | PII removed from plaintext logs | Live |
| SEC-06 | Constant-time admin token compare | Live |
| SEC-09 | CSV formula-injection guard (admin exports) | Live |

### 1B · Completed but NOT deployed (in working tree — needs preview→merge)
| ID | Change | Risk |
|---|---|---|
| SEC-08 | DB error-leak hardening (generic thrown message) | Low |
| SEO-01/02/07 | Canonical + hreflang on **20 EN pages** (content + legal + shop) | Low (metadata) |
| SEO-04 | FAQPage + BlogPosting JSON-LD | Low |
| SEO-05 | Per-page OpenGraph (donate, blog) | Low |
| SEO-06 | `noindex` on 3 utility pages | Low |
| A11Y-01 | Hindi `<html lang="hi">` fix (LangSync) | Low |
| UX-02 | Editorial pass (Hero / What-We-Do / Tobler / Why-Trust) — reviewed & approved | Low-Med (visual) |

### 1C · Requires approval (visual / design — mockups already produced)
| ID | Item | Gate |
|---|---|---|
| UX-02 | Deploy the approved editorial pass | Preview glance + deploy approval |
| A11Y-02/03 | Contrast floors (darken muted text) | Visual approval |
| CONTENT-01 | Fundraiser goal "Most Chosen" label/value | Visual or refactor approval |
| PERF-01/02/03 | next/font + next/image | Visual (rendering) — preview verify |
| PERF-04 | Compress oversized images (872 KB SVG, photo-PNGs) | Asset approval |
| UX-03 | "Rescues" impact-story experience | New page + content + approval |

### 1D · Requires analytics (cannot proceed without measurement)
| ID | Item |
|---|---|
| ANL-01 / CONV-06 | Install analytics + funnel + consent — **the master unlock** |
| (all CRO) | A/B tests, amount optimization, drop-off fixes |
| (all retention) | Churn, cohort, LTV, recovery-rate reporting |

### 1E · Requires Razorpay access (owner only)
| ID | Item |
|---|---|
| SEC-02 | Verify-route fallback persistence + webhook health check |
| SEC-03 | Webhook amount reconciliation |
| CONV-01 | "Failed" mislabel on successful capture |
| CONV-03 | Recurring tracked at initiation |
| CONV-04 | Pre-payment email validation |
| CONV-05 | Demo-mode outage alert |
| RZP-* | All Monthly Giving improvements (§4) |

### 1F · Requires donor data (owner only)
| ID | Item |
|---|---|
| SEC-07 | Unauthenticated PAN/address write fix (compliance route) |
| CONV-02 | Persist PAN/address captured at donate |

### 1G · Other gates
| ID | Item | Gate |
|---|---|---|
| SEC-05 | Durable rate limiting | New service (Upstash) |
| RET-01/02 | Donor lifecycle + recovery emails | New service (email/CRM) + consent |
| CODE-01/02 | Delete junk + dead code | Manual (run `git clean` locally) |
| A11Y-04 | aria-current on language toggle | Deferred — Header under concurrent edit |
| PERF-05 | Lighthouse scores | Run locally / PSI key |

**Recommended first action:** open a preview branch with everything in 1B, eyeball it, merge to production. That ships all finished low-risk work in one safe step.

---

## 2. DONATION GROWTH ROADMAP

### 30 days — *See & protect*
- **Deploy 1B** via preview→merge (turns finished work into live value).
- **Install analytics + donation funnel + consent** (ANL-01). Nothing else is optimizable without it.
- **Fix the money path** (owner + Razorpay): silent-loss fallback (SEC-02), "failed" mislabel (CONV-01), outage alert (CONV-05).
- **Stand up the rescue capture kit** (phone checklist) and **publish 1 real rescue story**.
- *KPI baseline:* sessions, donate-page views, start→complete rate, one-time vs monthly split.

### 90 days — *Recurring engine v1*
- **Launch monthly giving** ("Companions Circle") with **UPI Autopay** (§4) and a **monthly upsell** on donate + thank-you.
- **Thank-you → relationship**: impact email series; second-gift prompt.
- **Failed-payment recovery** (dunning) live.
- **Rescue Stories template + index**; 6–8 real stories published.
- *KPI:* new monthly donors, monthly-upsell take rate, recovered-payment rate, story→donate CTR.

### 180 days — *Depth & reach*
- **Sponsor-a-Rescue** (named animals, ongoing updates) → converts one-time to monthly.
- **Monthly impact email** cadence; **lapsed-donor win-back**.
- **Perf + premium** live (next/image, next/font, mobile motion).
- **CSR case studies + utilisation reporting**; fundraiser/ambassador tools.
- *KPI:* recurring retention curve, sponsor conversion, CSR pipeline, organic traffic lift.

### 365 days — *Scale*
- Story cadence 2–4/month sustainable; before/after **social-ad pipeline**.
- **Donor dashboard + Transparency Wall**; adoption-story loop; referral program.
- *KPI:* recurring as % of total revenue (target: largest single line), donor LTV, repeat rate, CAC vs LTV.

---

## 3. DONOR ANALYTICS SPECIFICATION
*Implementation requires owner + Razorpay access + a consent decision. This is the spec to hand to whoever sets it up.*

### 3A · Required Razorpay exports (read-only)
| Export | Key fields | Use |
|---|---|---|
| Payments | id, order_id, amount, currency, status (captured/failed), method (upi/card/netbanking/wallet), fee, tax, created_at, notes (name/email/source) | One-time revenue, method mix, fees, success rate |
| Subscriptions | id, plan/amount, status (active/halted/cancelled/completed), total_count, paid_count, charge_at, customer | MRR, active monthly donors, churn |
| Subscription charges | subscription_id, payment status per cycle, failure reason | Recurring success/failure, dunning |
| Refunds | payment_id, amount, reason, created_at | Net revenue, refund rate |
| Settlement reports | settlement id, amount, fees, UTR | Reconciliation, true net |

### 3B · Required GA4 events (donation funnel)
| Event | Params | Stage |
|---|---|---|
| `view_donate` | page | Funnel top |
| `select_amount` | value (₹), tier/custom, frequency (one_time/monthly) | Intent |
| `donate_start` (begin_checkout) | value, currency=INR, frequency | Checkout opened |
| `razorpay_open` (add_payment_info) | method (if known) | Payment UI |
| `donation_complete` (purchase) | transaction_id, value, currency, frequency, fund, method | **Primary conversion** |
| `donation_failed` | value, frequency, reason | Drop-off diagnosis |
| `recurring_upgrade` | from one_time→monthly | Upsell success |
| `story_view` / `story_scroll_depth` | story_id, % | Storytelling→donate link |
| `newsletter_signup`, `fundraiser_start`, `sponsor_click`, `cert_download` | — | Micro-conversions / trust |

*Plus:* a consent banner (legal decision) gating analytics; UTM capture on all entry points; one-time vs monthly as **separate conversion goals**.

### 3C · Required conversion tracking
- Funnel: `view_donate → select_amount → donate_start → razorpay_open → donation_complete`, with drop-off % at each step.
- Separate funnels for **one-time** vs **monthly**.
- Attribution: source / medium / campaign on every conversion; assisted-conversion view (did a story precede the gift?).
- Micro→macro: story_view and newsletter as leading indicators of later donations.
- Reconcile GA4 `donation_complete` count/value against Razorpay payments export weekly (catch tracking gaps).

### 3D · Required recurring-donor reporting
| Metric | Definition |
|---|---|
| MRR | Sum of active monthly subscription amounts |
| Active monthly donors | by tier (Feeder/Healer/Guardian/Patron) |
| New vs churned (monthly) | net adds; voluntary (cancelled) vs involuntary (payment failed) |
| Retention curve / cohorts | % still active at M1, M3, M6, M12 by signup cohort |
| Failed-payment recovery rate | recovered ÷ failed charges |
| Donor LTV | avg lifetime value, one-time vs monthly |
| Upgrade/downgrade rate | tier movement |

---

## 4. RAZORPAY MONTHLY GIVING IMPROVEMENT PLAN
*Planning only — every item requires Razorpay dashboard/API access and is owner-executed. Do not modify payment code without explicit approval.*

### 4A · UPI Autopay (highest-impact lever for India)
- **Why:** the majority of Indian donors pay by UPI; UPI Autopay e-mandates are the dominant recurring rail. Card-only recurring loses most would-be monthly donors.
- **Plan:** enable UPI Autopay on Razorpay Subscriptions; set sensible mandate max (e.g. up to ₹5,000–₹15,000 to cover tiers without re-auth); present UPI as the default monthly method; clearly show the mandate amount + "cancel anytime."
- **Dependency:** Razorpay account capability + subscription/plan config (owner).

### 4B · Subscription UX
- A clear **"Make it monthly"** toggle on the donate page (one-time ⇄ monthly), with the impact line updating ("₹500/month feeds an animal every month").
- Plain-language **mandate explainer** (what you're authorizing, that it's cancel-anytime, when you'll be charged).
- Tier names + benefits (Companions Circle) visible at the point of choice.
- Confirmation + welcome that names the impact, not just the charge.

### 4C · Failed payment recovery (dunning)
- Use Razorpay **smart retries**; handle `subscription.charged` / `subscription.halted` / `payment.failed` events (existing webhook — owner change).
- **Grace period** + donor-facing "update your payment method" flow before cancellation.
- Automated dunning emails (needs email tool/consent): "your monthly gift didn't go through — one tap to keep it going" with the animal it sustains.
- Track recovery rate (§3D).

### 4D · Donor retention
- Tie recurring to the **Companions Circle** program (tiers, monthly impact email, sponsor-a-rescue).
- **Save-flow** on cancel: offer pause / downgrade / "see who you've helped" before ending.
- Anniversary + milestone recognition; annual impact report + 80G summary.
- Win-back series for lapsed monthly donors with a specific animal's story.

---

## 5. IMPACT STORYTELLING BACKLOG
*Content production backlog — reusable templates from the blueprint. No code; this is an editorial/ops plan. Each format is reusable hundreds of times.*

### Production backlog (first 90 days)
| # | Story type | Qty (90d) | Inputs required | Primary channel | CTA | KPI |
|---|---|---|---|---|---|---|
| 1 | **Rescue story** | 6–8 | Intake + recovery photos, vet log, name, location, days | Site /rescues + email | Donate "help the next rescue" | story→donate CTR |
| 2 | **Before/after** | 8–12 | 1 before + 1 after photo, one line | Instagram/Facebook | Donate / follow | reach, saves, CTR |
| 3 | **Recovery journey** | 2–3 | Dated photo series (Day 0→30→180) | Site (scroll) | Sponsor | scroll depth, sponsor clicks |
| 4 | **Medical case** | 2–3 | Injury, procedure, cost band, outcome | Email appeal | Match a specific need | appeal conversion |
| 5 | **Emergency rescue** | as they happen | Live photo, urgent need, target | Stories/email blast | Urgent give | time-to-target, gift count |
| 6 | **Adoption story** | 3–4 | Adoption-day photos | Social + site | Share / donate | shares, brand sentiment |
| 7 | **Sponsor-a-rescue** | 3–4 named animals | One animal + ongoing updates | Monthly-giving page | Become a Companion | one-time→monthly conversion |
| 8 | **Monthly-donor story** | monthly | Aggregate monthly photos | Companions email | Stay / upgrade | recurring retention |

### Transparency reporting (trust engine)
| Item | Cadence | Content | Effect |
|---|---|---|---|
| Monthly impact email | Monthly | "This month, because of you…" + photos + numbers | Retention, second gifts |
| Transparency Wall (site) | Live | Every rupee accounted for; downloadable 12A/80G/CSR/DARPAN (already present — formalize) | Larger & repeat gifts |
| Quarterly utilisation report | Quarterly | Funds in/out, programs funded | CSR + major donor trust |
| Annual impact report | Yearly | Year of rescues, financials, 80G summary | Renewal, board, CSR |

### The operational backbone (non-negotiable)
The **rescue capture kit** — a simple phone checklist completed for every rescue (name, date, location, intake photos, condition, vet/treatment log, recovery photos, "today" shot, outcome). Without disciplined capture, the storytelling engine starves. This is the single most important new habit for the field team.

---

### Honesty footer
This is a plan, not implementation. No code, payment systems, or production was modified. Every Razorpay/analytics/donor-data/new-service item is owner-executed and gated. Revenue/retention targets are directional until analytics (§3) provides a baseline — which is why "install analytics" is the first move in every section above.
