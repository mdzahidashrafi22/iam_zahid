# Project 2 — Budgeting & Variance Analysis

## "The ₹3.4 Cr Variance That Wasn't a Sales Miss"
### A Series-B B2B SaaS company in Bengaluru hits 94% of its FY24 revenue plan but EBITDA is ₹3.4 Cr below budget. Sales is being blamed. The data says otherwise.

---

## Snapshot

| Field | Detail |
|-------|--------|
| **Industry** | B2B SaaS (subscription HR-Tech / Payroll, Indian SMB market) |
| **Company archetype** | Series-B Indian SaaS, ARR ~₹68 Cr, 4-year-old |
| **Revenue model** | Annual / quarterly subscription; 3 plan tiers (Starter, Growth, Enterprise) |
| **Headcount** | 187 (Sales 42, Engg 78, CS 31, G&A 36) |
| **FY24 Revenue plan** | ₹78 Cr | **Actual:** ₹73.2 Cr (94%) |
| **FY24 EBITDA plan** | ₹4.6 Cr (5.9%) | **Actual:** ₹1.2 Cr (1.6%) |
| **Variance** | ₹3.4 Cr (74% of budgeted EBITDA missed) |
| **Period analysed** | FY24 — full year, 12 months |
| **My role (simulated)** | Senior Manager – FP&A, reporting to CFO |
| **Tools** | Excel + Power Query (the model), Power BI (the dashboard) |

---

## The Brief

> *"Board is meeting in 2 weeks. Sales head says 'demand environment'. CRO says 'pricing pressure'. CTO says 'engg overspend was budget-approved'. We need a clean variance bridge from ₹4.6 Cr planned EBITDA to ₹1.2 Cr actual. Tell me who owns each rupee, and what we change for FY25."* — CFO

The deliverable here is *not* a forecast. It's a **variance forensic** — a clean, owned, ₹-quantified bridge that lets the board see exactly what happened and approve a credible FY25 budget.

---

## What This Project Demonstrates

1. **Flexible budget construction** — re-flexing the master budget for actual volume, so the variance compares apples to apples.
2. **Three-way variance decomposition** — price × volume × mix at the SaaS-plan level.
3. **Cost-side variance breakdown** — by function (S&M, R&D, CS, G&A) and by category (rate × efficiency × volume).
4. **Root-cause attribution** — variance owners, not just variance numbers.
5. **Forward-looking corrective action** — what changes in the FY25 budget process.

---

## File Map

| # | File | What's inside |
|---|------|---------------|
| 1 | [01-business-context.md](./01-business-context.md) | SaaS unit economics, Indian SMB market, why a CMA is rare in SaaS |
| 2 | [02-dataset-description.md](./02-dataset-description.md) | Master budget, actuals, CRM extract, schema |
| 3 | [03-analysis-methodology.md](./03-analysis-methodology.md) | Flexible budget, three-way variance, FAVE/UFAV rules |
| 4 | [04-key-insights.md](./04-key-insights.md) | The 6 findings + the ₹3.4 Cr bridge |
| 5 | [05-recommendations.md](./05-recommendations.md) | FY25 budget process changes, governance, KPIs |
| 6 | [06-excel-structure.md](./06-excel-structure.md) | Workbook layout |
| 7 | [07-dashboard-wireframe.md](./07-dashboard-wireframe.md) | Variance dashboard layout |
| 8 | [08-report-outline.md](./08-report-outline.md) | Board report structure |

---

## Headline Result — The Bridge

```
PLANNED EBITDA            ₹4.60 Cr
─────────────────────────
+ Volume variance         (₹0.31 Cr)   sales miss — −6%, not −15% as feared
+ Price variance          (₹0.18 Cr)   pricing pressure real but small
+ MIX variance            (₹2.10 Cr)   ← biggest single driver, 62% of gap
+ Sales commission var.   (₹0.04 Cr)   F   plan tied to revenue, auto-flex
+ Sales & Mktg overspend  (₹0.55 Cr)   UFAV uncontrolled — outbound spend
+ R&D overspend           (₹0.32 Cr)   UFAV scope creep on 2 features
+ CS staffing variance    (₹0.06 Cr)   F   delayed hiring (tactical)
+ Other (G&A, infra)      (₹0.12 Cr)   UFAV
─────────────────────────
ACTUAL EBITDA             ₹1.20 Cr
```

**Verdict to the Board:** Sales hit 94% of revenue but **mix shifted from Enterprise (high LTV, high GM) to Starter (high CAC, low LTV)**. That alone is ₹2.10 Cr of EBITDA. **This is a CRO/Sales-leadership issue, not a "demand environment" issue.**

---

## Why This Project Stands Out

- **It assigns blame correctly.** Most variance analyses stop at "revenue down, costs up". This one *names the mechanism* (mix shift) and *names the owner* (CRO's commission plan, which over-rewarded Starter wins for ramping reps).
- **It produces a budget-process change**, not just a one-time report. The FY25 budget will use **mix-locked targets** and **commission tied to gross-margin contribution**, not GMV.
- **It uses real SaaS metrics** (NRR, CAC, LTV/CAC, magic-number) integrated with the variance — bridging the FP&A-vs-CMA gap that most candidates miss.
