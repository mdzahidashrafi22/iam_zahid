# Project 2 · 04 — Key Insights

## Insight 1 — The bridge — ₹4.6 Cr → ₹1.2 Cr

The single chart of the project. Each bar is owned, sized, and explained.

| # | Bridge step | ₹ Cr | Owner | F/UFAV |
|---|---|---:|---|---|
| 0 | Plan EBITDA | 4.60 | — | — |
| 1 | Revenue volume miss | (0.31) | CRO | UF |
| 2 | Price compression (within tier) | (0.18) | CRO | UF |
| 3 | **Mix shift Starter↑ Enterprise↓** | **(2.10)** | **CRO** | **UF** |
| 4 | Sales commission auto-flex | 0.04 | — | F (mechanical) |
| 5 | S&M overspend (paid + tools + events) | (0.55) | CMO | UF |
| 6 | R&D overspend (POSH + mobile scope) | (0.32) | CTO + CRO¹ | UF |
| 7 | CS staffing under-run | 0.06 | Head CS | F (tactical delay) |
| 8 | G&A & infra | (0.12) | CFO | UF |
| 9 | Hosting per-customer drift | (0.10) | CTO | UF |
| 10 | Other small items | 0.18 | various | net F |
|   | **Actual EBITDA** | **1.20** | | |
|   | **Total variance** | **(3.40)** | | |

¹ Of the ₹0.32 Cr R&D overspend, ₹0.18 Cr is the POSH feature mandated by a sales-deal commitment — this should be reclassified to a Sales-mandated bucket, but is shown here under R&D for budget-line traceability.

**Headline:** mix variance alone is **62% of the gap**. The "Sales missed" narrative is wrong; the right narrative is **"Sales hit volume (94%) but missed mix discipline (Enterprise win rate halved)."**

---

## Insight 2 — Mix shift is causally tied to commission design + ramp hiring, not "demand"

Pulling from [03-analysis-methodology.md §6](03-analysis-methodology.md):

```
Hiring decision (Q1 FY24, 12 new SDRs)
   ↓
Ramp reps (45% of pipeline by Q3) close mostly Starter
   ↓
Commission plan (no GM weighting) rewards Starter wins
   ↓
Mix shifts from 30/45/25 → 41/41/18
   ↓
GP/customer drops; EBITDA misses by ₹2.1 Cr
```

This is *not* a demand environment. The same time period saw Indian SaaS NRR averages hold at ~110% (Bain-Nasscom benchmark). Our NRR also held (108%). What broke was *new business mix*, which is internally controllable.

---

## Insight 3 — Cost discipline was actually decent

Strip out the revenue-flex effect, and management overspent **only ₹0.56 Cr** on a ₹52.8 Cr cost base — about 1.1%. That's within normal noise for a Series-B startup.

| Function | Static var. | Flexed var. | Verdict |
|---|---:|---:|---|
| COGS | (0.50) | (1.89) | Mostly flow-through from revenue mix; controllable portion ₹0.10 Cr |
| S&M | (2.80) | (3.37)¹ | Real overspend ₹0.55 Cr in addition to revenue flex |
| R&D | (1.10) | (1.10) | Real overspend ₹0.32 Cr (₹0.18 attributable to Sales-mandated POSH) |
| G&A | (0.80) | (0.80) | Real overspend ₹0.12 Cr (cloud cost true-up + audit fees) |

¹ S&M flexed variance is *worse* than static because revenue underperformed but committed S&M (paid + tools + people) didn't.

**Insight:** the dominant problem is revenue-side mix, not cost-side overspend. The recommendation must therefore weigh more on the revenue side.

---

## Insight 4 — Hidden problem: ramp-rep retention will compound this if unaddressed

10 of the 12 SDRs hired in Q1 are still under-ramp at year-end (15+ months of tenure required for Enterprise productivity). At current attrition (~22% in Year-1 for SaaS SDRs), **2-3 will leave before reaching productivity** — meaning their CAC investment is partially wasted and the FY25 productive Enterprise capacity is even thinner than expected.

| Cohort | Hired | Expected to ramp to Enterprise | Likely Y1 attrition | Net Enterprise reps in FY25 |
|---|---:|---:|---:|---:|
| Q1 FY24 cohort | 12 | 8 (67% expected promotion to AE) | 2-3 | **5-6 productive AEs** |

For FY25 plan, this means we cannot assume a flat Enterprise mix recovery. **The bottom-up Enterprise capacity is ~30% lower than what FY23 baseline would suggest.** Plan accordingly.

---

## Insight 5 — The "cost discipline" story masks two specific decisions worth flagging

| Decision | ₹ Cr impact | Why it slipped through |
|---|---:|---|
| 3 unbudgeted Q4 field events (CRO discretion) | (0.09) | No CFO sign-off threshold; CRO authority limit was ₹15 L per event |
| iOS-native rebuild (Q3 scope addition) | (0.21) | Approved by Product VP without re-baselining R&D budget |

These are governance gaps. The fix is **threshold-based re-approval**, not blame.

---

## Insight 6 — The hosting cost / customer is creeping (early warning)

Per-customer hosting was ₹190/mo planned, ran at ₹196/mo actual. 3.2% drift. Looks small, but at projected FY25 customer count of ~1,800, this becomes ₹14 L of run-rate.

Cause analysis:
- AWS data-egress charges +18% YoY (egress was free for first-year volume; now full price)
- New compliance log retention (DPDP Act 2023) — extra storage of 90 days
- Read-replica added in Q3 for performance — not in original capacity plan

Each of these is small individually. Together, they're a **silent cost-creep** that cost-discipline reports don't surface. **Add per-customer infra cost as a tracked KPI.**

---

## The Punchline (one sentence)

> *"₹3.4 Cr of EBITDA variance has one dominant cause — sales-mix discipline broke down because of a hiring-and-incentive-design interaction that wasn't anticipated when the FY24 plan was set. The fix is a redesigned commission plan tied to gross-margin contribution, locked sales-mix targets in the FY25 plan, and a quarterly commission-plan review with Finance — not a 'demand-environment' apology."*

That is the opening line of the Board memo.
