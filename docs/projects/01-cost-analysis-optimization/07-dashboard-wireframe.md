# Project 1 · 07 — Dashboard Wireframe

## Tool: Excel Power Pivot + Pivot Charts (alternative: Tableau Public)
## Audience: CFO + CEO (single screen, 90-second read)
## Refresh: Power Query, monthly

---

## Layout (1920 × 1080, single page)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  COST ANALYSIS & OPTIMIZATION  ·  Tier-2 Auto-Component  ·  FY22–FY24                 │
│                                                                                       │
│  [ Plant ▼ All ]  [ Family ▼ All ]  [ Customer ▼ All ]  [ Period ▼ FY24 ]  ⟳ refresh │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  KPI ROW                                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │
│  │  Revenue    │ │  EBITDA %   │ │  Contribution│ │  Scrap %    │ │  Recovery   │    │
│  │  ₹ 245.6 Cr │ │   9.6%      │ │   40.0%     │ │   3.4%      │ │  ₹ 2.18 Cr  │    │
│  │  ▲ 8.2% YoY │ │  ▼ 460 bps  │ │  ▼ 220 bps  │ │  ▲ 80 bps   │ │   IDENTIFIED│    │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘    │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  CHART 1: EBITDA WATERFALL — FY22 → FY24                                             │
│  (Stacked bar: starting EBITDA → driver bars → ending EBITDA)                        │
│  14.2% ─────[RM −145bps]───[Scrap −78bps]───[Mix −96bps]──...──→ 9.6%                │
│                                                                                       │
├──────────────────────────────────────┬──────────────────────────────────────────────┤
│  CHART 2: SKU PARETO (Contribution)  │  CHART 3: PLANT-WISE METRICS                 │
│  ────────────────────────────────    │   Pune     Chennai                            │
│  Top 28 SKUs = 79% of contribution   │   Conv ₹/kg   ₹46    ₹54                     │
│  Bottom 23 SKUs = NEGATIVE           │   Scrap %    2.4%   4.7%                     │
│                                      │   OEE        71%    58%                       │
│                                      │   Util       78%    64%                       │
├──────────────────────────────────────┼──────────────────────────────────────────────┤
│  CHART 4: COST CLASSIFICATION DONUT  │  CHART 5: VARIANCE HEATMAP                   │
│  Variable 60% │ Fixed 12% │ Mixed/   │  SKU-family × variance-type                  │
│  Step 9% │ Other 19%                 │  (red = adverse, green = favourable)         │
│                                      │                                              │
├──────────────────────────────────────┴──────────────────────────────────────────────┤
│  CHART 6: RECOMMENDATION ROADMAP — savings run-rate by quarter                       │
│                                                                                       │
│  Q1 ▓▓▓▓ ₹84L                                                                        │
│  Q2 ▓▓▓▓▓▓▓ ₹1.46Cr                                                                  │
│  Q3 ▓▓▓▓▓▓▓▓▓ ₹1.87Cr                                                                │
│  Q4 ▓▓▓▓▓▓▓▓▓▓▓ ₹2.18Cr ← target                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Slicers / Filters (top-right of dashboard)

| Slicer | Values |
|---|---|
| Plant | All / Pune / Chennai |
| SKU Family | All / Caliper / Hub / Knuckle / Mount / Other |
| Customer | All / Maruti / Tata / M&M / Bosch / others |
| Period | FY22 / FY23 / FY24 / 3-yr trend |
| Cost-driver view | All / Controllable / Non-controllable |

All KPIs and charts re-compute via DAX `CALCULATE` with the slicer context.

---

## KPI Cards — Definitions

| KPI | Formula | Threshold (RAG) |
|---|---|---|
| Revenue | `SUM(Fact_Sales[gross_revenue])` | n/a (info) |
| EBITDA % | `EBITDA / Revenue` | Green ≥ 12% / Yellow 9-12% / Red < 9% |
| Contribution % | `Contribution / Revenue` | Green ≥ 42% / Yellow 38-42% / Red < 38% |
| Scrap % | `qty_scrap / (qty_good + qty_scrap)` | Green ≤ 2.5% / Yellow 2.5-3.5% / Red > 3.5% |
| Recovery identified | Sum of 5 recommendation savings | n/a |

YoY arrows use a DAX measure:
```dax
EBITDA_YoY_pp = [EBITDA%] − CALCULATE([EBITDA%], SAMEPERIODLASTYEAR('Date'[Date]))
```

---

## Chart Specifications

### Chart 1 — EBITDA Waterfall
- Excel chart type: Waterfall (built-in since Excel 2016).
- Data source: `02_Inputs_Assumptions` waterfall table (8 bars).
- Colours: starting/ending bar = blue; favourable bars = green; adverse bars = red (per Excel default).
- Data labels in bps.

### Chart 2 — SKU Pareto
- Excel chart type: Pareto (or combo: clustered column + cumulative-% line).
- X-axis: SKU sorted desc by contribution.
- Bars: contribution ₹.
- Line: cumulative % of total.
- Highlight bands: top-28 (green), middle-91 (grey), bottom-23 (red).

### Chart 3 — Plant Metrics Table
- Native Excel table with conditional formatting; not a chart.
- Icons (red/yellow/green dots) based on threshold.

### Chart 4 — Cost Classification Donut
- Donut chart from `Calc_CostClassification` totals.
- Centre label = total cost ₹ Cr.

### Chart 5 — Variance Heatmap
- Pivot of variance value by SKU-family × variance-type.
- Conditional formatting: red-yellow-green colour scale.
- Click any cell → drills down to SKU detail (Excel slicer-driven).

### Chart 6 — Recommendation Roadmap
- Stacked horizontal bar by quarter.
- Each segment = one initiative (5 colours).
- Total bar label = cumulative ₹.

---

## Interactivity

1. **Click a SKU family bar** in Chart 2 → all other charts filter to that family.
2. **Click a plant** in Chart 3 → all other charts filter to that plant.
3. **Click a recommendation segment** in Chart 6 → opens a tooltip card with owner, savings, payback, status.
4. **Click "drill-down"** button on any KPI → opens hidden detail sheet (`16_Calc_SKU_PnL` filtered).

---

## Mobile / Print Variants

- **Email/PDF** version: top KPI row + Chart 1 + Chart 6 only (1 page A4 landscape).
- **Mobile** version: KPI row stacked vertically + Chart 1 + Chart 6 — for CFO phone view.
- **Board pack** version: includes all 6 charts + 2 narrative pages.

---

## Worked Example — How a CFO Would Use This in a Monthly Review

> **Minute 1:** glance at KPI row. EBITDA% red.
> **Minute 2:** waterfall (Chart 1) — RM and Scrap are biggest drags.
> **Minute 3:** click "Chennai" in Plant slicer. Scrap % jumps to 4.7%, OEE to 58%. Confirms Chennai drag.
> **Minute 4:** click "Recommendations" tab → see Initiative 2 status. Owner = Plant Head Chennai. Status: in progress, ₹62 L on track for Q2.
> **Minute 5:** sign off / escalate.

This 5-minute decision cycle is the deliverable. The dashboard's job is **not** to look pretty; it's to make a CFO confident enough to take a decision in 5 minutes.
