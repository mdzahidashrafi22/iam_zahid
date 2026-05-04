# Project 3 — Financial Statement Analysis

## "Why Nestlé India Earns 28% RoCE While Britannia Earns 47% — and What That Tells Us About Strategy"
### A 4-year peer-comparison of three listed Indian FMCG majors using **real, audited financial data**.

---

## Snapshot

| Field | Detail |
|-------|--------|
| **Industry** | Indian FMCG — packaged foods & household |
| **Companies** | Nestlé India, Britannia Industries, Hindustan Unilever (HUL) |
| **Period** | FY21 → FY24 (4 fiscal years) |
| **Data source** | **100% real, public:** annual reports, BSE filings, screener.in |
| **Approach** | Common-size, ratio analysis, DuPont, segment & trend, cash-flow quality |
| **Output** | Investment-grade comparison memo + dashboard |
| **Tools** | Excel (formulas + Power Query for filings extraction), Tableau dashboard |
| **My role (simulated)** | Equity Research Analyst — Indian FMCG team |

---

## The Brief

> *"FMCG fund is overweight Britannia, underweight Nestlé. The thesis is 'Britannia is more efficient — higher RoCE, lower cost base'. Stress-test that thesis. If we're wrong, what would the right pair-trade be?"* — Fund Manager

The deliverable: a 6-page investment memo with a defended view, plus a dashboard the analyst can refresh quarterly.

---

## What This Project Demonstrates

1. **Working with real, audited data** — not synthetic. Anyone can cross-check.
2. **Ratio analysis the right way** — DuPont decomposition, not just lifting numbers from screener.in.
3. **Cash-flow quality analysis** — accruals, working capital, capex efficiency.
4. **Industry-specific framing** — FMCG distribution depth, brand premium, working capital cycles.
5. **A defended investment view** — not "all three look good" but an actual call.

---

## File Map

| # | File | What's inside |
|---|------|---------------|
| 1 | [01-business-context.md](./01-business-context.md) | Indian FMCG industry, the three companies, why peer-comparison matters |
| 2 | [02-dataset-description.md](./02-dataset-description.md) | All public-source data, schema, 4-year x 3 companies = 12 datasets |
| 3 | [03-analysis-methodology.md](./03-analysis-methodology.md) | Ratios, DuPont, common-size, cash-flow quality, trend analysis |
| 4 | [04-key-insights.md](./04-key-insights.md) | The 7 findings — and the surprising one |
| 5 | [05-recommendations.md](./05-recommendations.md) | The investment view + risks + monitorables |
| 6 | [06-excel-structure.md](./06-excel-structure.md) | Workbook layout |
| 7 | [07-dashboard-wireframe.md](./07-dashboard-wireframe.md) | Comparison dashboard design |
| 8 | [08-report-outline.md](./08-report-outline.md) | 6-page investment memo structure |

---

## Headline Result

| Company | RoCE FY24 | Source of RoCE | Quality of EBITDA | View |
|---|---:|---|---|---|
| **Nestlé India** | **28.4%** | Asset turnover (4.0×) — capital-light | Highest cash conversion (94%), strong premium positioning | **OVERWEIGHT** |
| **Britannia** | **47.1%** | EBITDA margin (16.8%) — operating leverage | Cash conversion 81%, working-capital tight | NEUTRAL |
| **HUL** | **22.7%** | Both ~average; scale benefits softening | Cash conversion 88%, exposed to rural slowdown | UNDERWEIGHT |

**The contrarian call:** the fund's thesis ("Britannia more efficient") confuses *RoCE level* with *RoCE durability*. Nestlé's lower RoCE comes from a structurally **higher reinvestment rate** (capital-light brand-building) that has stronger compounding economics over 5+ years. Pair-trade: long Nestlé / short HUL; reduce Britannia overweight to neutral.

---

## Why This Project Stands Out

- **Data is real and verifiable.** Every number traces back to a specific page in a publicly-filed annual report. (See [02-dataset-description.md](./02-dataset-description.md) for citations.)
- **DuPont + cash-flow + competitive context all combined.** Most analyst projects do one of these. This does all three and connects them.
- **Has a view.** "Overweight Nestlé, underweight HUL" is a falsifiable, monitor-able call — not a hedged "all are good companies" answer.
- **Covers what most candidates miss:** translating ratios into *strategy implications* — what does this mean about how each company competes?
