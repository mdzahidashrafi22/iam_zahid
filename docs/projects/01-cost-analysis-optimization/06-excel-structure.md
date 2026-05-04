# Project 1 · 06 — Excel Workbook Structure

Filename: `workbooks/p1-cost-analysis.xlsx`

## Sheet List (in tab order)

| # | Sheet | Tab colour | Purpose |
|---|---|---|---|
| 1 | `00_Cover` | Black | Project metadata, version log, sign-off |
| 2 | `01_Dashboard` | Green | Executive view (the only sheet most readers will see) |
| 3 | `02_Inputs_Assumptions` | Yellow | All hard-coded inputs (₹ rates, %, dates) |
| 4 | `03_Mst_SKU` | Blue | SKU master |
| 5 | `04_Mst_Customer` | Blue | Customer master |
| 6 | `05_Mst_Supplier` | Blue | Supplier master |
| 7 | `06_Mst_CostCentre` | Blue | Cost-centre master |
| 8 | `07_Fact_Production` | Grey | Production transactions |
| 9 | `08_Fact_Sales` | Grey | Sales transactions |
| 10 | `09_Fact_RM` | Grey | RM purchase transactions |
| 11 | `10_Fact_Overheads` | Grey | Overhead ledger |
| 12 | `11_Fact_Scrap` | Grey | Scrap log |
| 13 | `12_Fact_Energy` | Grey | Energy bills |
| 14 | `13_Fact_Payroll` | Grey | Payroll roll-up |
| 15 | `14_Calc_CostClassification` | Orange | High-low + regression |
| 16 | `15_Calc_ABC_Allocation` | Orange | ABC re-allocation |
| 17 | `16_Calc_SKU_PnL` | Orange | SKU-level P&L (the engine) |
| 18 | `17_Calc_Variance` | Orange | Standard vs actual variance |
| 19 | `18_Calc_MakeBuy_HT` | Orange | Heat-treatment decision |
| 20 | `19_Calc_Sensitivity` | Orange | Two-way data tables |
| 21 | `20_Out_Recommendations` | Green | 5-initiative roll-up |
| 22 | `21_QC_Reconciliation` | Red | 7 reconciliation tests |
| 23 | `22_Audit_Trail` | Red | Cell-level documentation |

---

## Sheet 02 — `Inputs_Assumptions` (the only sheet users edit)

All other sheets pull from here. Strict colour rules:
- **Yellow fill = input** (user-editable)
- **No fill = formula** (locked)
- **Light blue = derived constant** (e.g., periods)

```
A1: Title — "P1 Cost Analysis – Inputs"
A3: Group: Period
B3: fy_start_date            B4: 2021-04-01
B5: fy_end_date              B6: 2024-03-31
B7: months                   B8: =DATEDIF(B3,B5,"M")+1

A11: Group: Plants
B11: plant_a_name            B12: "Pune"
B13: plant_a_capacity_units  B14: 4200000
B15: plant_b_name            B16: "Chennai"
B17: plant_b_capacity_units  B18: 2800000

A22: Group: Recommendation parameters
B22: rec1_discount_uplift    B23: 0.74%      ← input
B24: rec1_target_spend       B25: =SUMIFS('09_Fact_RM'!total_value,...)
B26: rec1_savings            B27: =B23*B25

... (continues with 5 initiatives)

A60: Group: Sensitivity flexes
B60: volume_flex             B61: 100%
B62: discount_flex           B63: 100%
```

---

## Sheet 16 — `Calc_SKU_PnL` (the engine)

Granularity: 1 row per SKU per month = 142 SKUs × 36 months = 5,112 rows.

Columns (left to right):

```
A: period
B: plant_id
C: sku_id
D: sku_name (lookup from 03_Mst_SKU)
E: customer_id
F: family
G: qty_good                       =SUMIFS('07_Fact_Production'!qty_good,...)
H: qty_scrap                      =SUMIFS('07_Fact_Production'!qty_scrap,...)
I: scrap_pct                      =H/(G+H)
J: gross_revenue                  =SUMIFS('08_Fact_Sales'!gross_revenue,...)
K: avg_selling_price              =J/SUMIFS(qty_sold,...)

L: rm_cost                        =SUMPRODUCT( bom_qty_kg × rm_rate ) × G
M: cutting_tools_cost             =std_tool_rate × machine_hrs
N: variable_labour_cost           =contract_labour_rate × labour_hrs
O: variable_oh_cost               =SUMIFS for variable OH allocated
P: total_variable_cost            =L+M+N+O

Q: contribution                   =J-P
R: contribution_pct               =Q/J

S: alloc_fixed_labour             =fixed_labour_pool × (G/total_qty_plant)
T: alloc_depreciation             =depn_pool × (machine_hrs/total_machine_hrs)
U: alloc_admin_qa                 =admin_pool × (G/total_qty_plant)
V: total_fixed_alloc              =S+T+U

W: full_cost                      =P+V
X: full_margin                    =J-W
Y: full_margin_pct                =X/J

Z: variance_flag                  =IF(ABS(R - std_cm_pct) > 5%, "REVIEW", "")
```

Validation: `=SUM(W:W)` ties to `=SUM('10_Fact_Overheads'!amount) + SUM('07_Fact_Production'!direct_costs)` exactly.

---

## Sheet 14 — `Calc_CostClassification` (high-low + regression)

For each cost line:

```
Cost line:        Power
Activity driver:  machining_hours_total
Period range:     36 months

Column A: month
Column B: machining_hours_total      (from 07_Fact_Production aggregated)
Column C: power_cost                 (from 12_Fact_Energy)

D2: high_hours          =MAX(B2:B37)
D3: high_cost           =INDEX(C:C, MATCH(D2,B:B,0))
D4: low_hours           =MIN(B2:B37)
D5: low_cost            =INDEX(C:C, MATCH(D4,B:B,0))

D7: variable_rate_HL    =(D3-D5)/(D2-D4)         → ₹6.10/hr
D8: fixed_cost_HL       =D3 - D7*D2

D11: regression_slope   =SLOPE(C2:C37, B2:B37)   → ₹4.85/hr
D12: regression_intcpt  =INTERCEPT(C2:C37, B2:B37)
D13: r_squared          =RSQ(C2:C37, B2:B37)     → 0.78

D15: classification     =IF(D13>=0.85,"Variable",
                          IF(D13>=0.65,"Mixed","Step"))
```

Repeated for each cost line. Output table feeds into `Calc_SKU_PnL`.

---

## Sheet 17 — `Calc_Variance`

For each SKU × month, 6 variances:

```
Material price variance   =(std_price - actual_price) * actual_qty
Material usage variance   =(std_qty_for_actual_output - actual_qty) * std_price
Labour rate variance      =(std_rate - actual_rate) * actual_hrs
Labour efficiency var.    =(std_hrs_for_actual_output - actual_hrs) * std_rate
Variable OH efficiency    =(std_hrs - actual_hrs) * std_var_oh_rate
Fixed OH volume variance  =(actual_units - budgeted_units) * fixed_oh_rate_per_unit
```

Each cell has conditional formatting:
- **Green** = favourable & within ±2%
- **Yellow** = favourable but >5% (could be std-rate stale)
- **Red** = adverse > threshold

A pivot beneath shows variance by owner (procurement / quality / HR / ops / sales).

---

## Sheet 18 — `Calc_MakeBuy_HT` (decision-grade)

```
A1: Heat-Treatment Make vs Buy

A3: Volume scenario          B3: 8,400,000 parts/yr   ← input
A4: Years horizon            B4: 7

A7: OUTSOURCE
B7: Direct cost ₹/part       =VLOOKUP("HT_jobwork_rate", inputs, 2)
B8: Logistics ₹/part         =0.6 (1-way) + 0.6 (return)
B9: WIP holding ₹/part       =cycle_days_extra * daily_holding_cost / qty
B10: Quality reject ₹/part   =reject_pct * (rm_cost+conv_cost_to_HT)
B11: Line-stop risk ₹/part   =annual_risk_₹ / annual_volume
B12: Total ₹/part            =SUM(B7:B11)

A15: INSOURCE
B15: Direct cost ₹/part      =gas+power+labour+consumables_per_part
B16: Capex annualised        =1300000/B4 / B3
B17: Maintenance             =maint_pa / B3
B18: Logistics               =0
B19: WIP holding             =0
B20: Quality reject          =reject_pct_inhouse * (rm_cost+conv)
B21: Line-stop risk          =reduced_risk_₹ / annual_volume
B22: Total ₹/part            =SUM(B15:B21)

A25: DECISION
B25: Saving ₹/part           =B12-B22
B26: Annual saving ₹         =B25 * B3
B27: NPV @ 12% over 7 yr     =NPV(0.12, 7-yr cashflows)
B28: Payback (months)        =1300000 / (B26/12)

A30: SENSITIVITY (volume × scrap-rate)
=> two-way data table B3 vs scrap-rate-inhouse
```

---

## Quality / Audit Mechanisms

1. **Input cells locked except yellow.** Worksheet protection, password documented in `22_Audit_Trail`.
2. **Named ranges** for every input (`fy_start_date`, `rec1_savings`, etc.) — formulas read like English.
3. **`22_Audit_Trail`** logs every assumption: source, owner, last-validated date.
4. **Data Validation** drop-downs for plant_id, sku_family, customer_id — prevents typo-driven errors.
5. **`21_QC_Reconciliation`** runs on workbook open via Workbook_Open VBA hook — turns `01_Dashboard` red if any check fails.
6. **Version control** via `00_Cover`: every save bumps version + date + initials + change-log line.

---

## Power Query / Power Pivot Use

- Power Query loads all 7 fact sheets from a single source folder (`data/raw/`) — refresh with one click.
- A Power Pivot data model joins facts to dimensions on `sku_id`, `customer_id`, `period`. This enables DAX measures used on `01_Dashboard`:

```dax
Total Revenue          = SUM('Fact_Sales'[gross_revenue])
Total Variable Cost    = SUM('Fact_Cost'[variable_cost])
Contribution           = [Total Revenue] - [Total Variable Cost]
CM%                    = DIVIDE([Contribution], [Total Revenue])
EBITDA                 = [Contribution] - [Fixed Cost Pool]
EBITDA%                = DIVIDE([EBITDA], [Total Revenue])
YoY EBITDA pp          = [EBITDA%] - CALCULATE([EBITDA%], DATEADD('Date'[Date],-1,YEAR))
```

These measures power the dashboard slicers (Plant, Family, Customer, Period).
