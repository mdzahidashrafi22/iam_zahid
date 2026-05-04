# Project 1 · 02 — Dataset Description

## Approach: "Anchored Synthetic"

Real internal cost-ledger data for an Indian auto-component manufacturer is not publicly available (it's competitively sensitive). I therefore use an **anchored synthetic** approach:

- **Anchors are real:** input prices (HRC, aluminium LME, MERC power tariffs, ACMA industry margin benchmarks, Bharat Forge / Sundram Fasteners segment disclosures).
- **Structure is real:** SKU naming, BOM logic, machining-route logic, scrap categories follow standard auto-component ERP master-data structure (SAP CO-PC / Oracle EBS).
- **Volumes & rates are simulated** but grounded in published unit economics (e.g., Bharat Forge FY24 revenue / employee = ₹1.31 Cr; we calibrate Plant-A within ±15% of that).

This gives a dataset that **looks real, audits clean, and behaves correctly** under stress tests, without misrepresenting any actual company's financials.

---

## Source Layer (where the anchors come from)

| Source | What we used | URL / reference |
|---|---|---|
| ACMA Annual Report FY24 | Industry margin band, RM cost share, conversion cost share | acma.in (Annual Industry Report) |
| Bharat Forge Ltd. Annual Report FY24 | Segment EBITDA, RM/sales ratio, employee cost ratio (peer anchor) | BSE filings |
| Sundram Fasteners Ltd. Annual Report FY24 | Auto-segment margin, scrap & rework disclosure | NSE filings |
| RBI Commodity Prices Bulletin | Monthly HRC, billet, aluminium, copper price series | rbi.org.in/database |
| MERC Tariff Orders 2022, 2023, 2024 | Maharashtra HT-I industrial tariff schedule | merc.gov.in |
| TNERC tariff orders | Tamil Nadu HT-II industrial tariff | tnerc.gov.in |
| Kaggle: "Manufacturing Cost Dataset" | Schema reference for production / scrap structure | kaggle datasets |
| MoSPI WPI series | Wage & overhead inflation calibration | mospi.gov.in |

All sources are public. None are paywalled.

---

## Dataset Files (12 sheets, ~22,000 rows total)

The Excel workbook `data/p1-cost-data.xlsx` is structured as:

### A. Master tables (slowly changing)

| Sheet | Rows | Key columns |
|---|---:|---|
| `mst_sku` | 142 | sku_id, part_name, family (caliper/knuckle/hub/mount/other), customer_id, customer_name, plant_id, material_grade, weight_kg, list_price_inr, lifecycle_status |
| `mst_customer` | 14 | customer_id, customer_name, segment (OEM/Tier1), credit_days, contract_type (LTC/spot), pass_through_clause |
| `mst_supplier` | 28 | supplier_id, supplier_name, material_category, location, gst_state, lead_time_days, payment_terms |
| `mst_cost_centre` | 9 | cc_id, cc_name, plant_id, cost_centre_type (production/service/admin) |
| `mst_machine` | 47 | machine_id, machine_name, cc_id, capex_inr, depn_method, useful_life_yr, energy_kw, std_cycle_time_sec |

### B. Transactional tables (fact data)

| Sheet | Rows | Granularity | Key columns |
|---|---:|---|---|
| `fact_production` | 7,560 | Plant × SKU × Month (36 months) | period, plant_id, sku_id, qty_produced, qty_good, qty_scrap, machine_hrs, labour_hrs, energy_kwh |
| `fact_sales` | 6,840 | Customer × SKU × Month | period, customer_id, sku_id, qty_sold, gross_revenue_inr, discount_inr, freight_inr |
| `fact_rm_purchases` | 4,320 | Supplier × Material × Month | period, supplier_id, material_code, qty_kg, unit_rate_inr, total_value_inr, gst_pct |
| `fact_overheads` | 1,944 | Cost-centre × OH-type × Month | period, cc_id, oh_type, amount_inr (rent, depn, maintenance, indirect_labour, qa_cost, etc.) |
| `fact_scrap_log` | 1,260 | Plant × Reason × Month | period, plant_id, scrap_reason, scrap_qty, scrap_kg, recovery_value_inr |
| `fact_energy` | 72 | Plant × Month | period, plant_id, demand_kva, units_kwh, tariff_inr_per_kwh, total_bill_inr |
| `fact_payroll` | 72 | Plant × Month | period, plant_id, headcount, ctc_total_inr, overtime_inr, contract_labour_inr |

### C. Derived / output

| Sheet | Description |
|---|---|
| `out_sku_pnl` | SKU × Month profitability — output of methodology in [03-analysis-methodology.md](03-analysis-methodology.md) |
| `out_variance` | Actual vs Standard Cost variance per SKU |
| `out_dashboard_data` | Flattened table for Tableau / Power BI |

---

## Key Variables — Glossary

| Variable | Unit | Definition / formula | Source |
|---|---|---|---|
| `qty_good` | nos. | Good parts produced (passes QA) | Production daily report |
| `qty_scrap` | nos. | Rejected parts | QA log |
| `scrap_pct` | % | qty_scrap / (qty_good + qty_scrap) | Calculated |
| `machine_hrs` | hours | Machine running hours per SKU per month | MES log |
| `std_cost_per_part` | ₹ | Standard cost (RM + conv + alloc OH) | BOM × routing × OH rate |
| `actual_cost_per_part` | ₹ | Actual incurred / qty_good | From facts |
| `contribution` | ₹ | Selling price – variable cost | Calculated |
| `cm_pct` | % | contribution / selling_price | Calculated |
| `rm_yield_pct` | % | (output_kg / input_kg) × 100 | Material balance |
| `energy_per_part` | kWh | total_kwh / qty_good | Calculated |
| `oee` | % | Availability × Performance × Quality | Standard formula |

---

## Data Quality & Reconciliation Tests

Before any analysis, the workbook runs 7 reconciliation tests in `qc_reconciliation` sheet:

1. **Production-to-Sales reconciliation:** Σ qty_good (production) ≈ Σ qty_sold (sales) ± inventory delta. **Tolerance: ±0.5%.**
2. **RM purchase-to-consumption reconciliation:** RM purchased − RM consumed = closing stock movement. **Tolerance: ±2%.**
3. **Revenue tie-out:** Σ gross_revenue (fact_sales) = revenue line on P&L (₹245.6 Cr FY24). **Exact match.**
4. **Overhead allocation tie-out:** Σ allocated OH across SKUs = Σ fact_overheads. **Exact match.**
5. **Scrap mass-balance:** Σ scrap_kg ≤ Σ (input_kg − output_kg). **Pass / fail.**
6. **Headcount × CTC sanity:** monthly CTC / headcount within ±5% of plant-level mean. **Outliers flagged.**
7. **Capex-to-depreciation tie:** depreciation in fact_overheads = SLM on mst_machine capex. **Exact within ₹1,000.**

If any test fails, the dashboard goes red. This is the kind of control a recruiter wants to hear about.

---

## Why This Dataset Design Works for an Interview

If an interviewer asks *"walk me through the data"*, the structure above is **the exact ERP-fact-and-dimension model** used in real SAP CO-PC / Oracle Cost Accounting deployments. So the answer demonstrates:
- Familiarity with **dimensional modelling** (master vs fact).
- Familiarity with **production data flow** (BOM → routing → cost-centre → SKU).
- Awareness of **reconciliation controls** (auditor's first question).
- Comfort with **₹-amounts at SKU granularity**, not just consolidated P&L.
