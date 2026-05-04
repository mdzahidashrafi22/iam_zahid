# Project 2 · 01 — Business Context

## The Industry

Indian B2B SaaS is a $13-15 Bn market (Bain–Nasscom 2024 estimate), growing at 27-30% CAGR. The SMB-focused segment (companies serving < 500-employee customers) is more crowded — ~3,400 funded Indian SaaS companies, of which ~600 serve SMB exclusively.

The economic features that matter here:

1. **Subscription = deferred revenue accounting.** Cash collected upfront, revenue recognised over the contract. This makes "revenue" and "billings" two very different numbers — and creates the most common budget-vs-actual confusion.
2. **CAC payback dominates economics.** A typical Indian SMB SaaS has CAC of ₹35-60 K and ARPA of ₹40-80 K/yr. Payback is 12-22 months. Mix matters because Starter-plan CAC payback is **2.4× longer** than Enterprise-plan payback at this company.
3. **Commission plans drive behaviour.** Reps optimise for what they're paid on. Pay them on logos, you get logos. Pay them on ACV, you get bigger contracts. Pay them on gross-margin contribution, you get profitable contracts.
4. **Engineering is the largest cost line, not S&M.** This contradicts the US SaaS Rule of 40 framing. In Indian SaaS at our stage, R&D = 38-42% of OPEX, S&M = 30-34%, CS+G&A = the rest.

## The Company

| Attribute | Value |
|---|---|
| Founded | FY20 |
| Funding | Series-B, ₹140 Cr raised, last round at ₹420 Cr post-money (FY23) |
| Product | Cloud HR + Payroll for 50-500 employee Indian SMBs |
| Pricing | Starter ₹49/employee/mo · Growth ₹89 · Enterprise ₹149+ |
| Customers | 1,420 paying logos at FY24 close |
| Geographic mix | India 87% / SE Asia 11% / Middle East 2% |
| Gross margin | 71% blended (Starter 58%, Growth 73%, Enterprise 81%) |
| Net Revenue Retention (NRR) | 108% |

## Why Mix Matters So Much in SaaS — And Why CMAs Add Value Here

The Sales pipeline metric most companies watch is **ARR (Annual Recurring Revenue)**. ARR treats a ₹1 L Starter deal the same as a ₹1 L Enterprise deal. They are not the same:

| Metric | Starter | Growth | Enterprise |
|---|---:|---:|---:|
| ARPA | ₹35,000 | ₹62,000 | ₹1,80,000 |
| Gross margin % | 58% | 73% | 81% |
| Annual gross profit / customer | ₹20,300 | ₹45,260 | ₹1,45,800 |
| CAC | ₹38,000 | ₹54,000 | ₹1,12,000 |
| CAC payback (months) | 22.5 | 14.3 | 9.2 |
| Logo churn % / yr | 14% | 7% | 3% |
| 3-year LTV | ₹39,000 | ₹1,02,000 | ₹3,71,000 |
| LTV/CAC | 1.0× | 1.9× | 3.3× |

**Insight:** Starter is barely above the 1× LTV/CAC line. Enterprise is healthily above 3×. **An incremental Enterprise customer is worth ~10× an incremental Starter customer in 3-year gross profit.** The budget assumes a 30/45/25 mix (Starter/Growth/Enterprise). Actual was 41/41/18 — a heavy shift to Starter. **This explains the entire variance gap.**

A traditional FP&A function would report this as "revenue mix shifted". A CMA frames it as a **gross-margin contribution variance with attribution to sales-incentive design** — that's the difference.

## The Plan & The Reality

### FY24 plan (set in Feb 2023)

| Line | Plan ₹ Cr | % of revenue |
|---|---:|---:|
| Revenue | 78.0 | 100.0% |
| COGS (hosting + CS variable) | (22.6) | 29.0% |
| **Gross profit** | **55.4** | **71.0%** |
| S&M | (24.7) | 31.7% |
| R&D | (19.4) | 24.9% |
| G&A | (6.7) | 8.6% |
| **EBITDA** | **4.60** | **5.9%** |

### FY24 actual

| Line | Actual ₹ Cr | % of revenue |
|---|---:|---:|
| Revenue | 73.2 | 100.0% |
| COGS | (23.1) | 31.5% |
| **Gross profit** | **50.1** | **68.5%** |
| S&M | (27.5) | 37.6% |
| R&D | (20.5) | 28.0% |
| G&A | (7.5) | 10.2% |
| **EBITDA** | **1.20** | **1.6%** |

The 250 bps gross-margin compression alone (71% → 68.5%) accounts for ₹1.83 Cr — and that compression is the mix shift. The remaining ₹1.6 Cr is cost-side variance. We'll decompose both in [03-analysis-methodology.md](./03-analysis-methodology.md).

## Stakeholders

| Stakeholder | Position going in | What they want from this analysis |
|---|---|---|
| CFO (sponsor) | Neutral; needs facts | Defensible bridge for the Board |
| CRO (Sales) | Defensive; will push "demand environment" | A fair hearing — and a fix that protects rep earnings |
| CTO (R&D) | Defensive on overspend | Recognition that 2 features were exec-mandated |
| Head of CS | Pleased with cost discipline | Permission to backfill 4 vacant roles |
| Head of HR | Concerned about commission redesign | Reassurance reps won't churn |
| Board / Investors | Want a credible FY25 plan | Confidence that mistakes are diagnosed and fixed |

## Why a CMA in SaaS

SaaS companies historically hire FP&A from investment banking or strategy consulting. CMAs are rare — and underrated. The CMA value-add here:

- **Standard costing logic** applied to SaaS gross margin (per-customer COGS as a "standard cost", actual as variance against it).
- **Activity-based costing** applied to S&M (per-rep sales productivity, per-channel CAC).
- **Contribution margin** thinking applied to plan tiers — the same toolkit as Project 1 (auto components), redeployed.

This project is partly a *demonstration of skills transfer*: same CMA toolkit, different industry, recognisably professional output.
