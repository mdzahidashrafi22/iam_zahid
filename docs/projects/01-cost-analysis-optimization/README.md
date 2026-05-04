# Project 1 — Cost Analysis & Optimization

## "Margin Recovery at a Tier-2 Auto-Component Manufacturer"
### A ₹245 Cr revenue precision-machining unit losing 4.6 ppt of EBITDA in 24 months — what's actually driving it, and how do we get it back?

---

## Snapshot

| Field | Detail |
|-------|--------|
| **Industry** | Auto-component manufacturing (machined castings — brake calipers, knuckles, hubs) |
| **Company archetype** | Indian Tier-2 supplier to OEMs (Maruti, Tata, M&M) and Tier-1s (Bosch, Bharat Forge) |
| **Plants** | 2 (Pune & Chennai), 5 SKU families, 142 active part-numbers |
| **Revenue (FY24)** | ₹245.6 Cr |
| **EBITDA decline** | 14.2% (FY22) → 9.6% (FY24) — 460 bps compression |
| **Period analysed** | FY22 (Apr-2021 to Mar-2022) → FY24 (Apr-2023 to Mar-2024) — 36 months |
| **My role (simulated)** | Manager – Cost & Management Accounting, reporting to CFO |
| **Tools used** | Excel (Power Query, Power Pivot, DAX), Tableau Public for the dashboard |

---

## The Brief I Was Given

> *"Our raw material cost has gone up — that's industry-wide. But our peers (Bharat Forge ancillary peers, Endurance, Sundram Fasteners small-component division) only lost 150-200 bps of margin in the same window. We've lost 460 bps. Find the gap. I want a number, an owner, and a recovery plan in 3 weeks."* — CFO

That brief shaped the project. The deliverable is **not** a costing exercise — it is a **margin diagnostic** with a costed recovery plan.

---

## What This Project Demonstrates

1. **Cost classification at SKU level**, not just P&L level — splitting fixed/variable across 142 part-numbers using high-low + regression validation.
2. **Cost-driver decomposition** — how much of the 460 bps decline is price-of-input, mix, scrap, energy, overheads?
3. **Contribution-margin ranking** + 80/20 SKU rationalisation analysis.
4. **Make-vs-buy** decision on one critical sub-operation (heat treatment).
5. **Optimisation roadmap** with phased ₹-quantified savings, payback, and ownership.

---

## File Map

| # | File | What's inside |
|---|------|---------------|
| 1 | [01-business-context.md](./01-business-context.md) | Industry backdrop, RM cost cycle, why peers held margin |
| 2 | [02-dataset-description.md](./02-dataset-description.md) | Data sources (real + synthetic), schema, 12 sheets, ~22,000 rows |
| 3 | [03-analysis-methodology.md](./03-analysis-methodology.md) | High-low method, regression check, contribution formulas, sensitivity |
| 4 | [04-key-insights.md](./04-key-insights.md) | The 6 findings — what's *really* driving the margin loss |
| 5 | [05-recommendations.md](./05-recommendations.md) | 5 initiatives, ₹2.18 Cr/yr savings, phased plan |
| 6 | [06-excel-structure.md](./06-excel-structure.md) | Sheet-by-sheet workbook layout + formulas |
| 7 | [07-dashboard-wireframe.md](./07-dashboard-wireframe.md) | One-page CFO dashboard layout & charts |
| 8 | [08-report-outline.md](./08-report-outline.md) | 7-page PDF report structure |

---

## Headline Result

| Recovery lever | Annual ₹ impact | Margin uplift | Payback |
|---|---:|---:|---|
| Supplier consolidation (steel & aluminium ingots) | ₹84 L | 34 bps | Immediate (Q1) |
| Scrap-rate reduction at Pune plant (3.8% → 2.4%) | ₹62 L | 25 bps | 4 months |
| SKU rationalisation — drop bottom 23 part-numbers | ₹41 L | 17 bps | 6 months |
| Heat-treatment in-sourcing (vs current job-work) | ₹19 L | 8 bps | 14 months |
| Power-tariff optimisation (Open-Access in Pune) | ₹12 L | 5 bps | 9 months |
| **Total** | **₹2.18 Cr** | **89 bps** | Avg 7 months |

> This recovers **89 of the 460 bps lost** — explicitly *not* a full recovery. The remainder is acknowledged as structural input-cost inflation that requires price pass-through negotiation, which is out of CMA scope and flagged as a separate workstream owned by Sales/KAM.

---

## Why This Project Stands Out in Interviews

- It does what most CMA projects don't — **distinguishes controllable cost from non-controllable**, then explicitly hands the non-controllable back to the right function.
- The numbers reconcile: SKU-level contribution sums to plant-level contribution sums to consolidated EBITDA. (See [02-dataset-description.md](./02-dataset-description.md) §7 "Reconciliation tests".)
- The **make-vs-buy** for heat treatment is genuinely non-obvious — current cost looks 11% cheaper, but on a fully-loaded basis (logistics, in-process inventory, quality rejection) in-sourcing wins by ₹19 L. That's the kind of analysis a hiring manager probes for.
