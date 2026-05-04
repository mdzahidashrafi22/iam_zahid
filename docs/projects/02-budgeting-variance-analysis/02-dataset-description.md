# Project 2 · 02 — Dataset Description

## Approach

Same "anchored synthetic" approach as Project 1 — calibrated to **public Indian SaaS benchmarks** (Bain-Nasscom SaaS report 2024, SaaSBoomi data, Freshworks/Zoho/Routematic public disclosures, Tracxn funded-SaaS database). All anchors public; no proprietary data.

---

## Files (8 sheets, ~14,000 rows)

| Sheet | Rows | Granularity | Purpose |
|---|---:|---|---|
| `mst_plans` | 3 | Plan tier | Starter / Growth / Enterprise — pricing & GM% by tier |
| `mst_customer` | 1,420 | Customer | id, signup_date, plan_tier, region, channel, ARPA, status |
| `mst_employee` | 187 | Employee | id, function, designation, ctc, joining_date, exit_date |
| `mst_chart_of_accounts` | 64 | GL account | account_code, account_name, function, fixed_or_variable |
| `fact_billings` | 4,860 | Customer × Month | period, customer_id, plan_tier, billing_amount, mrr_impact |
| `fact_revenue_recognised` | 4,860 | Customer × Month | period, customer_id, recognised_revenue, deferred_balance |
| `fact_costs` | 768 | Account × Month | period, account_code, function, amount_inr |
| `fact_pipeline` | 2,180 | Opportunity | opp_id, source, stage, amount, plan_tier, owner_rep, created, won_lost_date |

Plus output sheets: `out_budget_master`, `out_variance_bridge`, `out_dashboard_data`.

---

## Master Budget Structure (`out_budget_master`)

The FY24 budget was built bottoms-up across 4 functions, then rolled up. Granularity:

```
Revenue:
  - by plan tier (Starter / Growth / Enterprise)
  - by quarter
  - by region (India / SEA / ME)
  → 3 × 4 × 3 = 36 lines

Cost:
  - by function (S&M / R&D / CS / G&A)
  - by category (Salary / Tools / Travel / Hosting / Other)
  - by quarter
  → 4 × 5 × 4 = 80 lines

Total budget granularity: 116 lines
```

### Revenue plan logic
For each tier:
```
New ARR added in quarter Q   = pipeline_qualified × win_rate × ACV
Existing ARR retained         = opening_ARR × (1 - churn_rate) × upsell_factor
Closing ARR                   = New ARR + Retained ARR
Revenue recognised in quarter = avg(Opening ARR, Closing ARR) / 4
```

### Plan assumptions (key ones)

| Assumption | Plan value | Where it broke |
|---|---|---|
| Win rate (Enterprise) | 22% | Actual: 14% — 8 ppt miss |
| Win rate (Starter) | 28% | Actual: 31% — 3 ppt beat (this is bad in disguise) |
| Logo churn (Starter) | 12% | Actual: 14% (worse) |
| NRR | 110% | Actual: 108% |
| Avg sales-cycle (Enterprise) | 96 days | Actual: 124 days |

The win-rate miss on Enterprise + over-attainment on Starter is the **demand-side mechanism** of the mix shift. Combined with rep-incentive design (commission paid on ACV without GM weighting), reps rationally substituted Starter wins for Enterprise effort.

---

## Cost Plan Structure

Each cost line in the budget has these attributes:

| Attribute | Example |
|---|---|
| `account_code` | 5101 |
| `account_name` | Salary – S&M |
| `function` | S&M |
| `category` | Compensation |
| `is_committed` | TRUE (signed-headcount) / FALSE (open-req) |
| `flex_basis` | Fixed / Variable-with-revenue / Step / Variable-with-headcount |
| `owner` | Head of S&M |
| `monthly_₹_plan` | 1,98,000 (per FTE) |

The `flex_basis` field is critical for the flexible-budget step (see [03-analysis-methodology.md](./03-analysis-methodology.md)).

---

## CRM Extract (`fact_pipeline`)

Pulled from HubSpot / Salesforce export, enriched with:

| Field | Source |
|---|---|
| opp_id | CRM |
| source | CRM (organic / paid / outbound / partner / referral) |
| stage | CRM (Lead → SQL → Demo → Proposal → Won/Lost) |
| amount (ACV) | CRM |
| plan_tier | CRM custom field |
| owner_rep | CRM |
| created_date / won_date / lost_date | CRM |
| ramp_status_of_rep_at_close | Calculated (rep tenure < 6 mo = "ramping") |
| stage_velocity_days | Calculated (days in each stage) |

This last field — `ramp_status_of_rep_at_close` — is the linkage between *commission plan* and *mix shift*. Ramping reps (45% of FY24 closed deals) closed 73% Starter, 21% Growth, 6% Enterprise. Tenured reps closed 32/47/21. **Ramp-rep mix is heavily Starter-biased**, and the company hired 12 new SDRs in Q1 FY24 — flooding the deal flow with ramping reps.

This is the *causal chain* the variance analysis surfaces. Without `ramp_status_of_rep_at_close`, we'd see the symptom (mix shift) but not the cause (hiring + commission design).

---

## Data Quality Tests

Same discipline as Project 1, adapted to SaaS:

1. **Billings ≥ Revenue recognised**: in any month, billings ≥ recognised revenue (true for all months). ✓
2. **Deferred revenue roll-forward**: Opening DR + Billings − Recognised − Refunds = Closing DR. ✓
3. **ARR roll-forward**: Opening ARR + New ARR + Expansion − Contraction − Churn = Closing ARR. ✓
4. **Headcount × CTC tie**: monthly cost = Σ active employees × monthly CTC. ✓
5. **Hosting cost vs customer count**: hosting / customer should be ~₹190/mo ± 8%. ✓
6. **Win-loss completeness**: every closed opportunity has won/lost flag. ✓
7. **Commission accrual tie**: monthly commission accrual = Σ closed deals × commission %. ✓

---

## Why This Dataset Works for an Interview

If asked *"how would you investigate a budget miss in a SaaS company"*, this schema is the answer in concrete form:
- Customer master + billings + revenue → revenue-side variance
- Pipeline + ramp status → causal mechanism for revenue mix
- Headcount + cost facts + flex_basis → flexible budget for cost-side variance
- Account-level CoA with function/category → drill-down to specific overrun

It's a **complete FP&A model** for a Series-B SaaS — the kind that a SaaS CFO would recognise.
