# Project 1 · 05 — Recommendations

Five initiatives, totalling **₹2.18 Cr/yr** of margin recovery, sequenced by payback. Each is owned, costed, and risk-rated.

---

## Initiative 1 — Supplier Consolidation (Steel & Aluminium)

| Field | Detail |
|---|---|
| **Owner** | VP – Procurement |
| **Annual saving** | ₹84 Lakh |
| **Margin uplift** | 34 bps |
| **Capex / one-time cost** | ₹3 L (RFQ admin, supplier audit) |
| **Payback** | Immediate (Q1 FY26) |
| **Risk** | Medium — single-source concentration risk if not managed |

### Current state
We buy steel from 8 suppliers and aluminium ingot from 5. Spend is fragmented:

| Material | Top supplier share | Number of suppliers | Volume-weighted avg discount |
|---|---:|---:|---:|
| HRC steel | 27% | 8 | 1.4% off list |
| Special alloy | 41% | 5 | 2.1% off list |
| Aluminium ingot | 38% | 5 | 1.8% off list |

### Proposal
Move to a **2+1 model** per material: 2 lead suppliers (40% + 35% share) + 1 spot/tactical (25%). Volume commitments enable price negotiations.

### Negotiated outcome (validated with Procurement)
- Lead supplier discount: 4.0–4.5% off list (committed annual volume)
- Tier-2 supplier: 2.5% off list
- Spot/tactical: market

### Calculation
```
Annual RM spend (steel + aluminium) = ₹113.6 Cr
Weighted-avg uplift in discount     = 0.74% (1.4% → 2.14% blended)
Annual saving                        = ₹113.6 Cr × 0.74% = ₹84 L
```

### Risk mitigation
- Dual-source for safety-critical grades (no single-source on caliper steel).
- Quarterly supplier scorecard (delivery, quality, payment terms).
- Right-to-audit clause.

---

## Initiative 2 — Plant-B Scrap Reduction (3.8% → 2.4%)

| Field | Detail |
|---|---|
| **Owner** | Plant Head – Chennai (Plant-B) |
| **Annual saving** | ₹62 Lakh |
| **Margin uplift** | 25 bps |
| **Capex / one-time** | ₹14 L (vision-system upgrade, op-2 inspection station) |
| **Payback** | 4 months |
| **Risk** | Low — proven kaizen technology |

### Root cause (from `fact_scrap_log` analysis)
Scrap reasons at Plant-B (FY24, by ₹ value):

| Reason | % of scrap value |
|---|---:|
| Tool wear — late detection | 31% |
| Setup error (first-piece reject) | 22% |
| Material defect (incoming) | 18% |
| Operator skill (new joiners) | 14% |
| Machine drift / unplanned downtime | 9% |
| Other | 6% |

### Levers
1. **Tool-life monitoring system** (₹6 L) — predicts insert wear before reject parts produced. Addresses 31%.
2. **First-piece-OK gate** (process change, no capex) — operator must clear automated dimensional check before batch. Addresses 22%.
3. **Incoming inspection on top-3 RM grades** (₹2 L for gauges) — addresses 18%.
4. **Standard work + buddy system for new joiners** (HR-led, ₹1 L). Addresses 14%.
5. **Vision-system OP-30 inspection** (₹5 L) — catches drift early.

### Quantification
```
Plant-B revenue              = ₹84 Cr
Plant-B variable cost        = ₹54 Cr (64% of revenue)
Scrap value at 3.8%          = ₹2.05 Cr/yr
Scrap value at 2.4% target   = ₹1.30 Cr/yr
Saving                        = ₹75 L − ₹13 L recovery loss = ₹62 L net
```

---

## Initiative 3 — SKU Rationalisation

| Field | Detail |
|---|---|
| **Owner** | Head – Sales & KAM |
| **Annual saving** | ₹41 Lakh |
| **Margin uplift** | 17 bps |
| **Capex / one-time** | Nil |
| **Payback** | 6 months (timing-driven by LTC cycles) |
| **Risk** | Low for orphans, Medium for re-pricing |

### Action plan

| Sub-action | SKUs | Annual benefit | Timing |
|---|---:|---:|---|
| Drop 7 orphan SKUs (legacy 2W customer) | 7 | ₹14 L (cost relief) | Immediate |
| Re-price 5 mis-priced SKUs at LTC renewal | 5 | ₹27 L (if accepted) | Aug-Oct 2026 |
| Retain 11 strategic loss-leaders | 11 | — | Defended |

### Why we don't drop the 11 strategic ones
Maruti basket bid covers 38 SKUs total. The 11 loss-leaders bring −₹19 L of contribution **but are bundled with 27 profitable SKUs that contribute ₹3.4 Cr.** Killing the 11 forces the 27 onto open-RFQ which historically takes ~14% pricing hit. **Net loss of unbundling: ₹47 L / yr.** So bundling stays.

This is the single most important "what would you NOT do" answer in the interview.

---

## Initiative 4 — Heat-Treatment In-sourcing (Pune)

| Field | Detail |
|---|---|
| **Owner** | VP – Operations + CFO (joint capex case) |
| **Annual saving** | ₹19 Lakh |
| **Margin uplift** | 8 bps |
| **Capex** | ₹1.3 Cr (HT line + utilities) |
| **Payback** | 14 months (fully-loaded basis) |
| **Risk** | Medium — first-time technology, ramp curve |

### Decision driver
Fully-loaded analysis (see [03-analysis-methodology.md §5](./03-analysis-methodology.md)) shows ₹2.30/part advantage on 8.4 L parts/yr. Outsource cost looks marginal in P&L because hidden costs sit elsewhere (logistics, in-process inventory, line-stop risk).

### Pre-conditions
- Volume commitment > 7.5 L parts/yr (sensitivity threshold).
- Vendor exit clause (12-month notice, no liquidated damages).
- Tech transfer + AMC from equipment supplier (₹6 L/yr in cost case).

### Sensitivity
At 6 L parts/yr, payback stretches to 22 months — board threshold is 18, so insourcing falls below approval threshold. The volume threshold is **the single most-important monitoring item**.

---

## Initiative 5 — Open-Access Power (Plant-A)

| Field | Detail |
|---|---|
| **Owner** | Plant Head – Pune + CFO |
| **Annual saving** | ₹12 Lakh (conservative case; ₹13.6 L base case) |
| **Margin uplift** | 5 bps |
| **Capex / one-time** | ₹4 L (legal, registration, metering compliance) |
| **Payback** | 9 months |
| **Risk** | Low — purely contractual, no operational change |

### Mechanism
- Sign 1-year Open-Access PPA with a renewable IPP (solar + wind hybrid in MH).
- Net of CSS (cross-subsidy surcharge), wheeling, SLDC fees: ₹0.35–0.45 / kWh saving.
- Optionality: switch back to MERC tariff with 30-day notice if grid cheaper.

### Not in scope (Plant-B)
Plant-B at 1.8 Mn kWh/yr is below the 1 MW Open-Access threshold for TN. Re-evaluate in FY27 if load grows.

---

## Roll-up & Roadmap

| Initiative | Q1 FY26 | Q2 | Q3 | Q4 | Annualised ₹ |
|---|---|---|---|---|---:|
| 1. Supplier consolidation | ▓▓▓ | ▓▓▓ | ▓▓▓ | ▓▓▓ | 84 L |
| 2. Scrap reduction | ░░░ | ▓▓▓ | ▓▓▓ | ▓▓▓ | 62 L |
| 3. SKU rationalisation | ░░░ | ░░░ | ▓▓▓ | ▓▓▓ | 41 L |
| 4. HT in-sourcing | ░░░ | ░░░ | ░░░ | ▓▓▓ | 19 L (Y2 onwards) |
| 5. Open-Access power | ░░░ | ▓▓▓ | ▓▓▓ | ▓▓▓ | 12 L |
| **Cumulative run-rate** | 84 L | 1.46 Cr | 1.87 Cr | **₹2.18 Cr** | |

▓▓▓ = active savings | ░░░ = setup phase

---

## Investment Summary

| Item | ₹ |
|---|---:|
| One-time setup costs (RFQ admin, gauges, legal) | ₹16 L |
| Capex (HT line, vision systems) | ₹1.44 Cr |
| **Total investment** | **₹1.60 Cr** |
| Year-1 savings | ₹1.78 Cr (full year for 4 of 5 levers) |
| Year-2 onwards savings | ₹2.18 Cr |
| **Blended ROI Year-1** | **111%** |
| **3-year cumulative savings** | **₹6.14 Cr** |

---

## What I Explicitly Did NOT Recommend

1. **Plant-B closure** — politically and operationally premature; new aluminium programme has 18-month ramp left.
2. **Headcount reduction** — payroll is 7.7% of cost; cuts would breach quality KPIs (already noted by customer audits).
3. **Across-the-board price increase to customers** — kills volume on price-elastic SKUs; surgical re-pricing only.
4. **Single-supplier consolidation (1+0 model)** — concentration risk; auditor would flag.

Stating these explicitly demonstrates **judgement** — the project owner thought about what *not* to do, which is what senior reviewers look for.
