# Project 2 · 07 — Dashboard Wireframe

## Tool: Power BI (preferred) or Excel Power Pivot
## Audience: CFO, CRO, Board
## Refresh: weekly

---

## Layout (single-page, 1920 × 1080)

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│  BUDGET vs ACTUAL — FY24 — B2B SaaS · HR-Tech (₹ Cr)                                  │
│  [ Quarter ▼ FY24 ]  [ Function ▼ All ]  [ Region ▼ All ]  [ Plan tier ▼ All ]   ⟳   │
├──────────────────────────────────────────────────────────────────────────────────────┤
│  KPI ROW                                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ Revenue  │ │ EBITDA   │ │   NRR    │ │  CAC     │ │ LTV/CAC  │ │ Rule-40  │      │
│  │ ₹ 73.2 Cr│ │ ₹ 1.2 Cr │ │  108%    │ │ ₹52,000  │ │  2.1×    │ │   29     │      │
│  │ vs ₹78.0 │ │ vs ₹4.6  │ │ vs 110%  │ │ vs ₹46K  │ │ vs 2.6   │ │ vs 36    │      │
│  │   94%    │ │   26%    │ │  ▼ 2pp   │ │  ▲ 13%   │ │  ▼ 0.5×  │ │  ▼ 7     │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
├──────────────────────────────────────────────────────────────────────────────────────┤
│  CHART 1: EBITDA BRIDGE — Plan ₹4.6 Cr  →  Actual ₹1.2 Cr (waterfall)                │
│                                                                                        │
│  4.6 ──[Vol −0.31]──[Price −0.18]──[MIX −2.10]──[S&M −0.55]──...──→  1.2              │
│                                       ↑ red, 2× height of others                       │
│                                                                                        │
├─────────────────────────────────────┬────────────────────────────────────────────────┤
│  CHART 2: PLAN TIER MIX             │  CHART 3: RAMP-STATUS × MIX                    │
│  Plan vs Actual stacked bar         │  Heatmap                                        │
│                                     │                Starter Growth Ent                │
│  Plan       30 / 45 / 25            │  Ramping        73%    21%    6%                │
│  Actual     41 / 41 / 18 ← red      │  Mid-ramp       48%    40%   12%                │
│                                     │  Tenured        32%    47%   21%                │
├─────────────────────────────────────┼────────────────────────────────────────────────┤
│  CHART 4: COST VARIANCE BY FUNCTION │  CHART 5: TRIPWIRES (FY25 leading indicators)  │
│  Static & Flexed (twin bars)        │                                                 │
│       Plan  Static  Flexed Actual   │  ● Enterprise mix < 20%       ⚠ Q4 only         │
│  COGS  22.6  +0.5    +1.9    23.1   │  ● Pipeline coverage < 3.5×   ✓ holding         │
│  S&M   24.7  +2.8    +3.4    27.5   │  ● CAC payback > 18 mo         ✓                │
│  R&D   19.4  +1.1    +1.1    20.5   │  ● Hosting / cust drift > 5%   ⚠ +3.2%          │
│  G&A    6.7  +0.8    +0.8     7.5   │  ● S&M flexed run-rate > +6%   ⚠ +14%          │
├─────────────────────────────────────┴────────────────────────────────────────────────┤
│  CHART 6: FY25 SCENARIO BUILD                                                         │
│  Bar chart — Base / Mix-Recovery / Mix-Recovery + Cost-Discipline                    │
│  EBITDA: ₹3.5 Cr / ₹5.4 Cr / ₹6.8 Cr ← committed                                     │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

---

## KPI Definitions (Power BI measures)

| KPI | DAX measure |
|---|---|
| Revenue | `SUM('Fact_Revenue'[recognised_revenue])` |
| EBITDA | `[Revenue] - [COGS] - [S&M] - [R&D] - [G&A]` |
| NRR | `DIVIDE(Σ ARR returning customers FY24, Σ ARR same customers FY23)` |
| CAC | `DIVIDE([S&M_spend_quarter], [NewCustomers_quarter])` |
| LTV/CAC | `DIVIDE([GP_per_cust] / [LogoChurn], [CAC])` |
| Rule-40 | `[YoY revenue growth %] + [EBITDA margin %]` |

Each card shows: actual, plan, % of plan, arrow direction, RAG colour.

---

## Bridge Chart Spec

- Excel Waterfall (Excel 2016+) or Power BI custom waterfall
- Bars in this order (left to right):
  1. Plan EBITDA (blue, anchor)
  2. Volume variance (red)
  3. Price variance (red)
  4. **Mix variance (red, 2× pixel height of other UFAV bars to draw eye)**
  5. Sales commission auto-flex (green, mechanical)
  6. S&M overspend (red)
  7. R&D overspend (red, with annotation: "₹0.18 Cr Sales-mandated")
  8. CS staffing under-run (green)
  9. Other (red, small)
  10. Actual EBITDA (blue, anchor)
- Annotations: callout box on Mix bar reading *"62% of total variance — caused by mix shift, not volume"*

---

## Drill-down Behaviour

| Click on... | Drills to... |
|---|---|
| KPI card | Quarterly trend chart for that KPI |
| Mix variance bar | Sheet 14: tier × month decomposition |
| S&M overspend | Sheet 15: filtered to S&M, by category |
| Plan tier mix bar | Sheet 17: by ramp-status |
| Tripwire item | Underlying time-series for that tripwire |
| FY25 scenario bar | Sheet 18: assumption inputs |

---

## Mobile / Email Variants

- **CFO weekly email:** KPI row + bridge chart only (PNG export)
- **Board pack (PDF):** all 6 charts + 1-page narrative + appendix tables (5 pages)

---

## Refresh & Governance

- **Source:** SQL view from data warehouse / SaaS app, pulled into Power BI on a 24-hour refresh
- **Data quality status badge** on top right: Green / Yellow / Red based on QC checks
- **Last refresh** timestamp visible
- **Data dictionary link** on every chart hover

---

## What a Reviewer Sees

> *"Top of the page tells me the headline; the bridge tells me where the gap came from; charts 2 and 3 prove the mix-causality; charts 4-5 close the cost-side and forward-warnings; chart 6 gives me a credible FY25 ask. I can decide in 5 minutes."*

That 5-minute decision is the dashboard's only purpose.
