# Project 2 · 06 — Excel Workbook Structure

Filename: `workbooks/p2-budget-variance.xlsx`

## Sheet List

| # | Sheet | Tab colour | Purpose |
|---|---|---|---|
| 1 | `00_Cover` | Black | Project metadata |
| 2 | `01_Bridge_Dashboard` | Green | The single-screen bridge & KPIs |
| 3 | `02_Inputs_Assumptions` | Yellow | All hard-coded inputs |
| 4 | `03_Static_Budget` | Blue | The original FY24 plan (locked) |
| 5 | `04_Flexed_Budget` | Blue | Re-flexed plan (formula sheet) |
| 6 | `05_Actuals` | Grey | Monthly actuals |
| 7 | `06_Mst_Plans` | Blue | Plan tier master |
| 8 | `07_Mst_Customer` | Blue | Customer master |
| 9 | `08_Mst_Employee` | Blue | Employee master |
| 10 | `09_Mst_CoA` | Blue | Chart of accounts |
| 11 | `10_Fact_Billings` | Grey | Customer × month billings |
| 12 | `11_Fact_Revenue` | Grey | Customer × month recognised revenue |
| 13 | `12_Fact_Costs` | Grey | Account × month costs |
| 14 | `13_Fact_Pipeline` | Grey | CRM extract |
| 15 | `14_Calc_RevVariance` | Orange | Volume / Price / Mix decomposition |
| 16 | `15_Calc_CostVariance` | Orange | Function × category variance |
| 17 | `16_Calc_FlexEngine` | Orange | The flex-formula engine |
| 18 | `17_Calc_RampAttribution` | Orange | Ramp-rep mix attribution |
| 19 | `18_Calc_FY25_Plan` | Orange | FY25 build with mechanisms |
| 20 | `19_Out_Bridge` | Green | The bridge waterfall data |
| 21 | `20_Out_Tripwires` | Green | KPI tripwire status |
| 22 | `21_QC_Reconciliation` | Red | 7 reconciliation tests |
| 23 | `22_Audit_Trail` | Red | Cell-level documentation |

---

## Sheet 16 — `Calc_FlexEngine` (the heart of the model)

For every cost line, the flexed plan is computed:

```
Column A: account_code (lookup from 09_Mst_CoA)
Column B: account_name
Column C: function
Column D: flex_basis      ← (Fixed / Variable-revenue / Variable-HC / Step)
Column E: planned_amount  (from 03_Static_Budget)

Column F: planned_driver_value      = lookup planned driver
Column G: actual_driver_value       = lookup actual driver
Column H: flex_factor               =IF(D="Fixed",1, G/F)

Column I: flexed_plan               =E * H

Column J: actual_amount             (from 05_Actuals)
Column K: static_variance           =E - J     (favourable if positive)
Column L: flexed_variance           =I - J     (favourable if positive)

Column M: flex_effect               =L - K     (the "auto-flex" component)
```

The *flex_effect* column tells you how much of the static variance was simply mechanical flexing (variable cost moving with volume) vs management decision.

---

## Sheet 14 — `Calc_RevVariance` (3-way decomposition)

Layout:
```
Section 1: Volume variance (per tier)
    Plan customers (tier)        Actual customers (tier)        Δ
    Plan ARPA (tier)             Plan GM% (tier)
    Volume var = Δ × Plan ARPA × Plan GM%   ← formula

Section 2: Price variance (per tier)
    Plan ARPA (tier)             Actual ARPA (tier)             Δ
    Actual customers (tier)      Plan GM% (tier)
    Price var = Δ × Actual customers × Plan GM%

Section 3: Mix variance (multi-tier)
    Plan mix %                   Actual mix %                   Δ
    Total customers (actual)
    Plan GP per customer (tier)
    Mix var = Δ × Total customers × Plan GP/customer
    Sum across tiers

Section 4: Total revenue variance (reconciliation)
    Σ Volume + Σ Price + Σ Mix = Total revenue variance
    Tie-out: total revenue var = Plan revenue × Plan GM% − Actual revenue × Plan GM% ?
    (Sub-totals reconcile within ₹1 L; rounding tolerance.)
```

A pivot beneath summarises by tier, by quarter, by region.

---

## Sheet 17 — `Calc_RampAttribution` (the causal-chain sheet)

```
A: opp_id                       (from 13_Fact_Pipeline)
B: rep_id
C: rep_tenure_at_close_months   =DATEDIF(rep_join_date, close_date, "M")
D: ramp_status                  =IF(C<6,"Ramping",IF(C<12,"Mid-ramp","Tenured"))
E: plan_tier
F: amount

Pivot (rows = ramp_status, cols = plan_tier, values = % of ACV):
                    Starter   Growth   Enterprise
    Ramping            73%      21%        6%
    Mid-ramp           48%      40%       12%
    Tenured            32%      47%       21%
```

This pivot is the visual proof of Insight 2 — and the chart in the dashboard.

---

## Sheet 02 — `Inputs_Assumptions`

Includes critical-path inputs:

```
Period:     fy_start   2023-04-01
            fy_end     2024-03-31
            months     12

Revenue plan: by tier × quarter (12 cells)
Cost plan:    by function × category × quarter (80 cells)

FY25 plan parameters:
    new_commission_multiplier_enterprise   1.4
    new_commission_multiplier_growth       1.0
    new_commission_multiplier_starter      0.65
    sdr_hiring_pause_months                6
    expected_mix_recovery_pct              80%

Sensitivities:
    enterprise_win_rate_recovery           [14%, 18%, 22%]
    starter_churn_assumption               [12%, 14%, 16%]
```

Two-way data tables fed by these for the FY25 plan range.

---

## Power Pivot Measures (DAX)

```dax
ARR_Today               = SUMX('Fact_Revenue', 'Fact_Revenue'[mrr_impact]*12)
NRR                     = DIVIDE(
                              CALCULATE([ARR_Today], 'Customer'[is_returning]=TRUE),
                              CALCULATE([ARR_Today], DATEADD('Date'[Date],-12,MONTH))
                          )
GrossMargin             = DIVIDE([Revenue]-[COGS], [Revenue])
GP_per_customer         = DIVIDE([GrossProfit], DISTINCTCOUNT('Customer'[customer_id]))
CAC                     = DIVIDE([SM_spend], [NewCustomers_LastQuarter])
LTV                     = DIVIDE([GP_per_customer], [LogoChurn_pct])
LTV_to_CAC              = DIVIDE([LTV], [CAC])
MagicNumber             = DIVIDE([NetNewARR_Quarter]*4, [SM_spend_LastQuarter])
RuleOf40                = [Revenue_growth_yoy] + [EBITDA_margin]
```

These power the SaaS metrics panel on the dashboard.

---

## Conditional Formatting

- Variance cells: green (favourable), red (unfavourable), heatmap on size
- KPI threshold cells: red < threshold, green ≥
- Tripwires sheet: traffic-light icons

---

## Workbook Protection

- All sheets except `02_Inputs_Assumptions` are protected
- Yellow cells unlocked
- Comments on every formula in `22_Audit_Trail` (cell ref → assumption description → owner → last-validated)
