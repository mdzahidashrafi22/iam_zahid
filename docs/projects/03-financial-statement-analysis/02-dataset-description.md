# Project 3 · 02 — Dataset Description

## All-Real-Data Approach

| Source category | Specifics |
|---|---|
| **Annual Reports (audited)** | Nestlé India AR FY21, FY22, FY23, FY24 · Britannia AR FY21-FY24 · HUL AR FY21-FY24 |
| **Investor presentations** | Quarterly inv-presentations from each company's IR website |
| **Stock exchange filings** | BSE / NSE quarterly filings (Form 33-LR / 33-FR) |
| **screener.in** | Cross-check (independent source) for ratios |
| **Industry data** | Nielsen India, IBEF FMCG report, Bain India FMCG outlook |
| **Macro** | RBI commodity prices, MoSPI, GST Council notifications |

URLs (verified accessible):
- nestleinindia.com → Investors → Annual Reports
- britannia.co.in → Investor Information → Annual Reports
- hul.co.in → Investor Centre → Annual Reports
- bseindia.com / nseindia.com → company-specific filings
- screener.in/company/{NESTLEIND, BRITANNIA, HINDUNILVR}

---

## Dataset Files (12 sheets)

The Excel workbook `data/p3-fmcg-data.xlsx` contains **3 companies × 4 years = 12 financial-statement datasets**, each with the standard 3-statement structure.

### Per-company / per-year structure

```
Income Statement (28 lines)
  Revenue from operations
  Other income
  ─────────────────────
  Cost of materials consumed
  Purchases of stock-in-trade
  Changes in inventories
  Employee benefits expense
  Finance costs
  Depreciation & amortisation
  Other expenses
  ─────────────────────
  Profit before tax
  Tax expense
  Profit after tax

Balance Sheet (32 lines)
  Equity & liabilities:
    Equity share capital
    Other equity
    Borrowings (long-term)
    Borrowings (short-term)
    Trade payables
    Other current liabilities
    Provisions
    Deferred tax liabilities
  Assets:
    PP&E (net block)
    Capital work-in-progress
    Goodwill / intangibles
    Investments
    Inventories
    Trade receivables
    Cash & equivalents
    Other current assets

Cash Flow Statement (24 lines)
  Operating cash flow:
    PBT
    Adjustments (D&A, finance cost, other non-cash)
    Working-capital changes
    Tax paid
    = CFO
  Investing cash flow:
    Capex (purchase of PP&E)
    Sale of PP&E
    Investments (purchase / sale)
    Interest received
    = CFI
  Financing cash flow:
    Borrowings raised / repaid
    Dividends paid
    Interest paid
    Buybacks
    = CFF
  Net change in cash

Segment Disclosure
  Foods, Beverages, Confectionery, Milk Products etc. (Nestlé)
  Bakery, Dairy, Adjacencies (Britannia)
  Home Care, Beauty & Personal Care, Foods & Refreshment (HUL)
```

---

## Sheets in the Workbook

| Sheet | Purpose |
|---|---|
| `00_Cover` | Project metadata, sources |
| `01_Comparison_Dashboard` | Single-page peer view |
| `02_Inputs_Sources` | Source URLs, page references for every line |
| `03_Nestle_PnL_4Y` | Nestlé income statement, FY21-24 |
| `04_Nestle_BS_4Y` | Nestlé balance sheet |
| `05_Nestle_CF_4Y` | Nestlé cash flow |
| `06_Nestle_Segment_4Y` | Nestlé segment disclosure |
| `07_Britannia_PnL_4Y` | Britannia ditto |
| `08_Britannia_BS_4Y` | |
| `09_Britannia_CF_4Y` | |
| `10_Britannia_Segment_4Y` | |
| `11_HUL_PnL_4Y` | HUL ditto |
| `12_HUL_BS_4Y` | |
| `13_HUL_CF_4Y` | |
| `14_HUL_Segment_4Y` | |
| `15_Calc_CommonSize` | All three companies, common-size P&L & BS |
| `16_Calc_Ratios` | 28 ratios × 3 companies × 4 years = 336 cells |
| `17_Calc_DuPont` | 5-step DuPont decomposition |
| `18_Calc_CashFlowQuality` | Accrual ratio, FCF, FCF conversion |
| `19_Calc_PeerCompare` | Side-by-side ratio comparison |
| `20_Calc_TrendAnalysis` | YoY trend with CAGR |
| `21_Out_InvestmentMemo` | Memo data |
| `22_QC_Reconciliation` | Tie-out tests |
| `23_Audit_Trail` | Page references |

---

## Key Metrics — 28 Ratios

### Profitability (7)
1. Gross margin %
2. EBITDA margin %
3. EBIT margin %
4. Net profit margin %
5. Return on Equity (RoE)
6. Return on Capital Employed (RoCE)
7. Return on Assets (RoA)

### Efficiency / Asset utilisation (6)
8. Total asset turnover (Revenue / Avg total assets)
9. Fixed asset turnover (Revenue / Avg net block)
10. Inventory turnover (CoGS / Avg inventory)
11. Receivables turnover (Revenue / Avg trade receivables)
12. Payables turnover (Purchases / Avg trade payables)
13. Working-capital turnover

### Liquidity / Solvency (5)
14. Current ratio
15. Quick ratio
16. Debt-to-equity
17. Debt-to-EBITDA
18. Interest coverage (EBIT / Finance cost)

### Activity / Cash conversion (4)
19. Days sales outstanding (DSO)
20. Days inventory on hand (DIH)
21. Days payable outstanding (DPO)
22. Cash conversion cycle (DSO + DIH − DPO)

### Investor / Per-share (6)
23. EPS (diluted)
24. Dividend payout ratio
25. Retention ratio
26. P/E ratio (using period-end share price)
27. P/B ratio
28. Dividend yield

---

## DuPont Decomposition

5-step (extended) DuPont for each company × year:

```
RoE = (Net income / Sales)
    × (Sales / Total assets)
    × (Total assets / Equity)

OR — extended:

RoE = (Operating margin)
    × (Asset turnover)
    × (Interest burden)
    × (Tax burden)
    × (Equity multiplier)
```

Where:
- Operating margin = EBIT / Sales
- Asset turnover = Sales / Total assets
- Interest burden = PBT / EBIT
- Tax burden = PAT / PBT
- Equity multiplier = Total assets / Equity

This decomposes RoE into 5 levers and lets us answer *which lever is driving Britannia's RoE? Nestlé's? HUL's?*

---

## Reconciliation Tests

| # | Test | Tolerance |
|---|---|---|
| 1 | Σ income statement lines = Profit after tax | Exact |
| 2 | Σ assets = Σ equity + liabilities | Exact |
| 3 | Reported CFO from cash flow ≈ derived CFO from indirect method | ±2% |
| 4 | Closing cash (CFS) = Closing cash (BS) | Exact |
| 5 | screener.in ratios within ±5% of our calculated | Pass / fail |
| 6 | YoY revenue growth matches investor presentation commentary | Match |
| 7 | Segment revenue sum = total revenue | Exact |

If a test fails, the source PDF page is flagged in `23_Audit_Trail` for re-reading.

---

## Why "Real Data" Matters Here vs Synthetic

For Cost / Variance / Dashboard projects, synthetic anchored data is fine — the *methodology* is what's being demonstrated. For **Financial Statement Analysis**, the project's value comes from the **comparison** itself; using real Nestlé/Britannia/HUL data:
- Lets the reviewer cross-check on screener.in or directly in the ARs.
- Removes any doubt about cherry-picking.
- Demonstrates familiarity with **actual published Indian FMCG financials** — what a recruiter at Macquarie / Goldman / DSP would test on day one.
