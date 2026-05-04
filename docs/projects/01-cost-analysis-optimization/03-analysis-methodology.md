# Project 1 · 03 — Analysis Methodology

This file explains *why* I made each analytical choice, not just *what* I did. Methodology decisions are where CMAs are tested in interviews.

---

## Step 1 — Cost Classification (Fixed vs Variable vs Step)

### Method used: **High-Low + Regression Validation**

For each cost line, I used the high-low method on 36 monthly observations to compute a tentative variable rate, then validated it with simple linear regression.

#### Why high-low first?
- Fast, intuitive, easy to explain to plant heads.
- Picks up the *range* of activity (max/min volume months), so it's robust if mid-month observations are noisy.

#### Why regression as a check?
- High-low uses only 2 data points; outlier-sensitive.
- Regression's R² tells me whether the linear fixed/variable assumption actually holds.
- If R² < 0.70, I treat the cost as **mixed/step** and build a step-cost schedule instead.

### Classification Result Summary

| Cost line | FY24 ₹ Cr | High-Low VC/unit | Regression slope | R² | Classified as | Why |
|---|---:|---:|---:|---:|---|---|
| Raw material — steel | 91.2 | ₹138.40 | ₹141.10 | 0.97 | **Variable** | High R², slope ≈ HL |
| Raw material — aluminium | 22.4 | ₹164.80 | ₹162.30 | 0.96 | **Variable** | High R² |
| Cutting tools / inserts | 6.8 | ₹4.20 | ₹4.05 | 0.91 | **Variable** | High R², proportional to machining hours |
| Direct labour (permanent) | 14.3 | ₹2.10 | ₹0.85 | 0.41 | **Fixed (largely)** | Low R², CTC doesn't move with volume |
| Direct labour (contract) | 4.6 | ₹3.40 | ₹3.30 | 0.88 | **Variable** | High R², strong with volume |
| Power | 16.1 | ₹6.10 | ₹4.85 | 0.78 | **Mixed** | Demand charge fixed, units variable |
| Maintenance | 5.4 | ₹0.90 | ₹0.70 | 0.55 | **Step** | Major overhauls every 6,000 hrs |
| Depreciation | 8.2 | — | — | — | **Fixed** | SLM on capex |
| Plant admin & QA | 7.0 | — | — | — | **Fixed** | Largely headcount-driven |
| Logistics outbound | 6.5 | ₹2.80 | ₹2.65 | 0.83 | **Variable** | Volume + diesel-indexed |

**Total VC at FY24 actuals: ₹146.4 Cr (59.6% of revenue) | Total FC: ₹29.2 Cr | Mixed/step: ₹21.5 Cr**

### Why this matters
At a P&L glance, cost-of-sales looks like one number. After this split, I can compute a real **contribution margin** — which is what enables every subsequent analysis (mix decisions, breakeven, SKU rationalisation, make-vs-buy).

---

## Step 2 — Cost Driver Analysis

For variable costs, I asked: *what is the actual driver?* Many costs are mis-allocated by volume when they should be allocated by a different driver.

| Cost pool | Old driver (used by Finance) | True driver (from data) | Why it matters |
|---|---|---|---|
| Cutting tools | Units produced | Machining hours × material hardness | Steel SKUs eat 2.4× more inserts than aluminium SKUs of same unit count. Old method under-costed steel parts by ~₹9/part. |
| Power | Units produced | Connected kW × machining hours | Heavy hubs draw 4× more power than small mounts. Old method over-costed mounts. |
| QA / inspection | Units produced | Number of inspection points × volume | Safety-critical SKUs (calipers) need 4 inspection points, mounts need 1. |
| Indirect labour | Units produced | Headcount per cost-centre | Allocate by cost-centre, not by SKU volume. |
| Logistics | Units produced | Weight × distance | A ₹/kg-km rate is more accurate than ₹/unit. |

### Method
**Activity-Based Costing (ABC) "lite"** — full ABC is overkill for a 142-SKU operation. I used 5 cost pools and 5 drivers, which captures ~85% of the misallocation while staying maintainable.

### Impact on contribution margin
Re-allocating with correct drivers shifted contribution per part:

| SKU family | Old CM/part | New CM/part | Change |
|---|---:|---:|---:|
| Brake calipers | ₹78 | ₹64 | **−₹14 (−18%)** |
| Hubs | ₹52 | ₹47 | −₹5 (−10%) |
| Knuckles | ₹61 | ₹66 | +₹5 (+8%) |
| Mounts | ₹39 | ₹54 | **+₹15 (+38%)** |
| Other | ₹28 | ₹26 | −₹2 |

**Insight:** mounts were the most under-priced family — pricing team had been giving discounts assuming they were the lowest-margin family. They were actually the highest in % terms. **This single re-allocation changes commercial strategy.**

---

## Step 3 — Contribution Margin Analysis

For each of 142 SKUs:

```
Contribution per part = Selling price − (RM cost + variable conversion + variable OH)
CM%                   = Contribution per part / Selling price
Total CM             = Contribution per part × volume
```

### Outputs
- **Pareto chart** of total contribution by SKU — confirms 80/20: top 28 SKUs (20%) generate 79% of total contribution.
- **Bottom-tail analysis:** 23 SKUs have negative contribution (selling price < variable cost). These collectively *consume* ₹41 L of contribution per year — their elimination is recommendation #3.

### Cross-check: why are 23 SKUs sold below variable cost?
This is exactly the question an interviewer will ask. Findings:
- 11 SKUs are **strategic loss-leaders** for key customers (Maruti) — they're part of a basket bid. **Cannot be unilaterally dropped.**
- 7 SKUs are **legacy parts** for a 2-wheeler customer who exited 2 years ago — can drop immediately.
- 5 SKUs are **mis-priced**, revealed by ABC re-allocation — can renegotiate at next LTC cycle.

So the headline "drop 23 SKUs" becomes "drop 7 immediately, renegotiate 5, retain 11 strategically." That's the nuance recruiters reward.

---

## Step 4 — Variance Analysis (Standard vs Actual)

For each SKU × month I compute:

| Variance | Formula | Interpretation |
|---|---|---|
| Material price variance (MPV) | (SP − AP) × AQ | Procurement performance |
| Material usage variance (MUV) | (SQ − AQ) × SP | Yield / scrap performance |
| Labour rate variance (LRV) | (SR − AR) × AH | HR / wage management |
| Labour efficiency variance (LEV) | (SH − AH) × SR | Productivity / scheduling |
| Variable OH efficiency variance | (SH − AH) × SVR | Run-rate vs standard |
| Fixed OH volume variance | (Actual vol − Std vol) × FR | Capacity utilisation |

(SP = standard price, AP = actual price, AQ = actual quantity, SQ = standard quantity for actual output, etc.)

### Why this is not just textbook
Each variance is **owned**:

| Variance | Owner | Trigger threshold |
|---|---|---|
| MPV | Procurement Lead | > ±3% of std |
| MUV | Plant Quality Manager | > 2% adverse |
| LRV | HR Business Partner | > ±5% |
| LEV | Plant Operations Manager | > 4% adverse |
| FOH volume variance | Sales / S&OP | < 70% capacity |

The ownership matrix is included in the workbook. This converts variance reporting from a passive number into an **active management routine**.

---

## Step 5 — Make vs Buy (Heat Treatment)

Heat treatment (HT) of 60% of our steel SKUs is currently outsourced as job-work to a Pune vendor. Cost: ₹14/part on average. We considered insourcing.

### Naive comparison (what most do)

| Option | ₹/part |
|---|---:|
| Outsource (current) | ₹14.00 |
| Insource (variable cost only — energy, gas, labour) | ₹12.50 |

Looks like ₹1.50/part savings = ₹15-20 L / yr. Marginal.

### Fully-loaded comparison (what changes the answer)

| Cost element | Outsource | Insource |
|---|---:|---:|
| Direct cost | 14.00 | 12.50 |
| Capex (annualised over 7 yr) | 0 | 1.85 |
| Maintenance | 0 | 0.40 |
| Logistics (1-way + return) | 1.20 | 0 |
| In-process inventory holding (avg 9 days extra) | 0.85 | 0 |
| Quality rejection (HT-related, 1.4%) | 0.95 | 0.20 |
| Customer line-stop risk (annualised) | 0.30 | 0.05 |
| **Fully-loaded ₹/part** | **17.30** | **15.00** |

**Fully-loaded saving = ₹2.30/part × 8.4 L parts/yr = ₹19.3 L/yr | Capex ₹1.3 Cr | Payback ~14 months.**

### Why this matters in interviews
The interviewer will probe: *"why didn't your CFO already do this?"* Answer: because the naïve cost looks marginal, and the hidden costs (in-process inventory, quality risk, line-stop premium) sit in different cost-centres / different P&L lines and are not connected to the HT decision in normal reporting. The CMA's value-add is **forcing the connection**.

---

## Step 6 — Sensitivity Analysis

Every recommendation has a **two-way sensitivity** built in. Example for the supplier-consolidation lever:

| Volume (% of FY24) | Discount achieved (4%) | Discount achieved (3%) | Discount achieved (2%) |
|---|---:|---:|---:|
| 90% | ₹76 L | ₹57 L | ₹38 L |
| 100% (base) | **₹84 L** | ₹63 L | ₹42 L |
| 110% | ₹93 L | ₹70 L | ₹46 L |

This is the kind of table CFOs ask to see — *"what if volume disappoints?"* The answer is in the matrix, not in a single number.

---

## Step 7 — Reconciliation to Reported P&L

Every SKU-level number ladders up:

```
Σ SKU contribution           = ₹98.2 Cr
+ Fixed conversion costs     = (₹29.2) Cr
+ Allocated corporate OH     = (₹15.6) Cr
+ Mixed/step costs           = (₹21.5) Cr
+ Other income / expense     = (₹8.3) Cr
= EBITDA                     = ₹23.6 Cr (9.6% of ₹245.6 Cr revenue) ✓ matches reported
```

Every analytical claim therefore reconciles to the audited P&L. This is non-negotiable.
