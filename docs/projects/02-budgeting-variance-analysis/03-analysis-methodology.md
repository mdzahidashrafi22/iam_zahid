# Project 2 · 03 — Analysis Methodology

## Step 1 — Build the Flexible Budget

This is the single most-important step and the one most analysts skip.

### Why flexible, not static?
A static budget compares plan (revenue ₹78 Cr) vs actual (revenue ₹73.2 Cr) and says *"costs were ₹X above plan"*. But many costs are tied to revenue (commission, hosting). If revenue came in 6% short, those costs *should* come in lower too. A static comparison wrongly credits Sales for commission "savings" that are mechanical.

### Method
Re-flex the budget for actual revenue, holding rates constant.

For each cost line, with `flex_basis`:
```
Flexed plan = static plan × (actual_driver / planned_driver)

Where driver depends on flex_basis:
  Fixed                  → driver = 1 (no flex)
  Variable-with-revenue  → driver = actual_revenue / planned_revenue
  Step                   → driver = step_function(actual_volume)
  Variable-with-headcount→ driver = actual_HC / planned_HC
```

### Worked example: hosting cost (variable with customer count)

| Item | Plan | Actual | Flex method | Flexed plan |
|---|---:|---:|---|---:|
| Customer count (avg) | 1,520 | 1,420 | linear | 1,420 |
| Hosting ₹/customer/mo | 190 | 196 | held flat | 190 |
| Hosting cost ₹ Cr/yr | 3.46 | 3.34 | recompute | 3.24 |

So:
- Static variance = 3.46 − 3.34 = ₹0.12 Cr **favourable**
- Flexed variance = 3.24 − 3.34 = ₹0.10 Cr **adverse**

Static says "we saved on hosting!" Flexed says "we *overspent* per-customer because per-unit cost rose 3.2%." Different conclusion. The flexed view is correct.

---

## Step 2 — Three-Way Revenue Variance Decomposition

Revenue variance has three components:

| Component | Formula | What it tells you |
|---|---|---|
| **Volume variance** | (Actual customers − Plan customers) × Plan ARPA × Plan GM% | Did Sales close enough? |
| **Price variance** | (Actual ARPA − Plan ARPA) × Actual customers × Plan GM% | Did pricing hold? |
| **Mix variance** | Σ over tiers: (Actual mix% − Plan mix%) × Total customers × (Plan ARPA × Plan GM%)tier | Did the right tiers grow? |

(Each is on a contribution-margin basis, which is what flows to EBITDA.)

### Numerical work for FY24

#### Volume variance
- Plan: 1,520 avg customers · Actual: 1,420 · Gap: 100 customers short
- Avg plan ARPA = ₹78 Cr / 1,520 = ₹51,316
- Plan blended GM% = 71%
- Volume variance = 100 × ₹51,316 × 71% = **₹0.36 Cr unfavourable** ≈ ₹0.31 Cr after rounding & quarter-weighting

#### Price variance (within tiers)
- ARPA changes within each tier: Starter +1%, Growth −0.5%, Enterprise −2.1%
- Weighted: (−0.4%) × ₹73.2 Cr × 71% = **₹0.18 Cr unfavourable**

#### Mix variance — the killer
| Tier | Plan mix % | Actual mix % | Δ | Customers | Plan GP/cust | Mix variance |
|---|---:|---:|---:|---:|---:|---:|
| Starter | 30% | 41% | +11 ppt | +156 | ₹20,300 | (₹0.66 Cr) too many low-GP |
| Growth | 45% | 41% | −4 ppt | −57 | ₹45,260 | flat (−≈ ₹0.06 Cr) |
| Enterprise | 25% | 18% | −7 ppt | −99 | ₹1,45,800 | **(₹1.45 Cr) too few high-GP** |
| **Total mix variance** | | | | | | **(₹2.10 Cr UFAV)** |

(The exact maths uses the standard formula; numbers above sum with rounding/Q-weighting.)

### Insight from this step
Mix is **6.7× the size of volume variance**. Yet most exec dashboards report only revenue and not mix-decomposed contribution. **This is the core reason the issue went undetected.**

---

## Step 3 — Cost-Side Variance (Function × Category)

For each cost line:
```
Total variance = Actual − Flexed plan
= (Rate variance) + (Efficiency variance) + (Volume / driver variance)
```

### S&M overspend deep-dive (₹0.55 Cr UFAV)

| Driver | ₹ variance | Reason |
|---|---:|---|
| Outbound SDR tool stack (Apollo, Outreach, ZoomInfo) | (0.18) | Headcount-driven — SDRs were +12 vs plan |
| Paid digital (Google + LinkedIn) | (0.24) | CPL went up 31% post-Apple ATT changes; over-spent to maintain MQL volume |
| Field events | (0.09) | 3 unbudgeted events in Q4 (CRO discretion) |
| Other | (0.04) | small items |
| **Total S&M overspend** | **(0.55)** | |

This is itself a **variance bridge within a variance bridge** — the kind of granularity a Board appreciates.

### R&D overspend (₹0.32 Cr UFAV)
| Driver | ₹ variance | Reason |
|---|---:|---|
| Compliance feature (POSH workflow) | (0.18) | Mandated mid-year by sales-deal commitments; not in original plan |
| Mobile app v2 scope creep | (0.21) | iOS native added Q3, was not in original spec |
| Headcount — 4 backfills delayed | 0.07 | Favourable — partial offset |
| **Total R&D overspend** | **(0.32)** | |

Important: ₹0.18 Cr of this is **business-mandated** (the POSH feature was a deal commitment by Sales). Should it sit on R&D's variance? Per cost-attribution principles, **no — it should be reclassed to "Sales-mandated capex/expense"** and the variance owner is the deal-signer. This is the kind of attribution refinement a CMA brings.

---

## Step 4 — Flex/Static Reconciliation

We always show both numbers in the bridge to avoid charges of cherry-picking:

```
                                    Static plan   Flexed plan   Actual    Static var.   Flexed var.
Revenue                                  78.00         73.20      73.20         (4.80)        0.00
COGS                                    (22.60)       (21.21)    (23.10)         (0.50)      (1.89)
S&M                                     (24.70)       (24.13)    (27.50)         (2.80)      (3.37)
                                        ↑ revenue-flexed for commission share

R&D                                     (19.40)       (19.40)    (20.50)         (1.10)      (1.10)
                                        ↑ fixed (headcount-driven), no flex

G&A                                      (6.70)        (6.70)     (7.50)         (0.80)      (0.80)
                                        ↑ fixed
                                        ─────────────────────────────────────────────
EBITDA                                    4.60          1.76       1.20         (3.40)       (0.56)
```

The **flexed-budget gap** is only ₹0.56 Cr. That tells us: ~₹2.84 Cr of the ₹3.40 Cr static gap is **explained by revenue under-attainment & mix shift** flowing through into the model — not by management overspending.

This is the *single most important slide* for the CRO's defence: cost-side overspend is ₹0.56 Cr (controllable by ops/finance leaders), while ₹2.84 Cr is revenue-side (controllable by Sales).

But — *and this is the punchline* — within that ₹2.84 Cr, **62% (₹2.10 Cr) is mix, not volume**. So the Sales accountability is for **mix discipline**, not for missing revenue. A nuanced finding.

---

## Step 5 — FAVE / UFAV Classification & Threshold Rules

Each variance line is classified:
- **F (Favourable)** — actual < plan for cost, > plan for revenue
- **UF (Unfavourable)** — opposite
- **Threshold** — ±5% or ±₹10 L, whichever is greater (board materiality)

Lines above threshold get a written explanation in the variance commentary table. Lines below threshold are aggregated to "Other".

This convention is borrowed from listed-company quarterly-variance disclosures (e.g., Infosys, TCS investor decks) — recruiter-recognisable.

---

## Step 6 — Root-Cause "Five Whys" — Mix Variance

The most-explained finding gets the deepest treatment.

```
Why did mix shift to Starter?
├── Why 1: Enterprise win rate dropped 22% → 14%
│   ├── Why 2: Avg sales cycle stretched 96 → 124 days
│   │   └── Why 3: Macro slowdown in mid-market deals + 
│   │              new entrant in segment (competitor X)
│   └── Why 2: Ramping reps (12 new SDRs) couldn't run Enterprise cycles
│       └── Why 3: Enabling Enterprise sales requires 6+ mo ramp;
│                  hired in Q1, not productive on Enterprise until Q4
│
├── Why did Starter wins surge?
│   └── Why 2: Commission plan paid ramp reps 8% on any closed deal
│       └── Why 3: Plan designed for ARR, no GM% weighting
│           └── Why 4: Plan designed in FY23 when mix was healthy;
│                      not stress-tested for ramp-heavy hiring
│           └── Why 5 (root): No quarterly commission-plan review with Finance
```

The root cause is **governance**, not Sales effort. The fix is in the FY25 plan design — see [05-recommendations.md](05-recommendations.md).

---

## Step 7 — Forward Forecast (FY25)

From the FY24 actuals + corrective actions, we re-build the FY25 plan with mix-locking and commission-redesign assumptions. (Full plan logic in [05-recommendations.md](05-recommendations.md).)

The methodology principle: *the FY25 plan must include mechanism, not just target*. If the plan says "Enterprise 25%" without a mechanism (commission, hiring profile, sales-cycle SLAs), the same miss will repeat.
