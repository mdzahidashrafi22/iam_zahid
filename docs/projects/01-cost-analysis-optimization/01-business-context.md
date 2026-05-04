# Project 1 · 01 — Business Context

## The Industry

Indian auto-component manufacturing is a ~$69.7 Bn industry (FY24, ACMA), 2.3% of India's GDP, employing ~1.5 Mn directly. The segment I'm modelling — **machined safety-critical components for passenger vehicles & light commercial vehicles** — sits in the Tier-2 layer:

```
OEM (Maruti, Hyundai, Tata, M&M)
   ↓
Tier-1 (Bosch, Bharat Forge, Sundram Fasteners) — system integrators
   ↓
Tier-2 (us) — single-component specialists (machined castings)
   ↓
Tier-3 — raw casting / forging suppliers
```

### Key economic features of Tier-2

1. **Customer concentration:** Top-3 customers usually = 60-75% of revenue. We have Maruti (32%), Tata (18%), Bosch India (14%) = 64%.
2. **Annual price negotiation ("LTC" — Long-Term Contracts):** Most contracts have an RM-pass-through clause indexed to LME / SAIL prices, but with a **3-month lag** and **80% pass-through cap**. That 20% un-passed inflation is where margin bleeds.
3. **High operating leverage:** Capex-heavy (CNC machining centres ₹1.2-3 Cr each). Fixed cost recovery is volume-sensitive.
4. **Working-capital pinch:** OEM credit terms are 60-90 days. RM suppliers want 30-45 days. Negative cash-conversion is normal.
5. **Quality-driven cost:** A single Customer Line Stoppage event can cost ₹15-40 L in penalties + future business loss. Quality cost is not optional.

## Macro Backdrop During the Period (FY22–FY24)

| Driver | What happened | Impact on us |
|---|---|---|
| Steel prices (HRC) | ₹52,000 → ₹64,000 → ₹56,000 / tonne | Volatile; 80% pass-through clause leaves 20% on us |
| Aluminium (LME) | $2,400 → $2,800 → $2,300 / tonne | Inputs for ~22% of our SKUs |
| Rupee | ₹74 → ₹83 / USD | Imported tooling, cutting inserts more expensive |
| Diesel (logistics) | ₹81 → ₹90 / litre | 7% of total logistics cost |
| Industrial power tariff (MH) | ₹7.20 → ₹8.40 / kWh | Pune plant: power = 6.2% of cost |
| Auto industry volume | PV demand +28% (FY22→FY24) | Volume tailwind we partially captured |
| Wage inflation | ~7% / yr CTC | Payroll up 14.4% over 24 months |

**Sources:** ACMA Annual Report FY24, SIAM monthly volume data, RBI commodity prices bulletin, MERC tariff orders, MoSPI WPI series.

## Why Peers Held Margin Better Than Us

This is the central diagnostic question. Initial hypotheses (to be validated by data):

| Hypothesis | If true, evidence we'd find |
|---|---|
| H1 — Peers have better RM pass-through clauses | Their margin-erosion timing wouldn't match RM-spike timing |
| H2 — Peers have richer mix (more value-add SKUs) | Their gross-margin / kg of metal is structurally higher |
| H3 — Peers run leaner conversion (lower scrap, energy) | Conversion cost / SKU is lower for peers |
| H4 — Peers have negotiated power & gas at better tariffs | Energy cost / unit divergent |
| H5 — We have a SKU rationalisation problem (long tail) | Our bottom-quartile SKUs are dilutive |

Findings (spoiler — see [04-key-insights.md](./04-key-insights.md)): **H3 + H5 are the dominant drivers; H1 explains less than 25% of the gap.** That changes the recovery plan dramatically — it pushes effort toward operations, not commercial.

## Our Plant Footprint

| Plant | Location | Started | Capacity (parts/yr) | Utilisation FY24 | Key SKUs |
|---|---|---|---|---|---|
| Plant-A | Chakan, Pune (MH) | 2009 | 4.2 Mn | 78% | Brake calipers, hubs (steel) |
| Plant-B | Oragadam, Chennai (TN) | 2017 | 2.8 Mn | 64% | Aluminium knuckles, mounts |

Plant-B's lower utilisation is itself a clue — if fixed cost spreads over fewer units, conversion cost / unit at Plant-B should be higher. **Confirmed in data: 18.4% higher.** This becomes recommendation #3.

## Stakeholder Map for the Project

| Stakeholder | Interest | What they need from this analysis |
|---|---|---|
| CFO (sponsor) | Margin recovery | Quantified plan, ownership, payback |
| Plant Heads | Don't get blamed | Root-cause data, not opinions |
| KAM / Sales | Push back on price-pass-through asks | Evidence that ops, not pricing, is the bigger lever |
| Operations | Resources to fix scrap/energy | Business case to fund kaizens |
| Procurement | Support for supplier consolidation | Spend analytics, RFQ shortlist |
| Audit Committee | Numbers stand up | Reconciliation, audit trail |

This stakeholder framing matters in interviews: a recruiter will ask *"how did you get buy-in?"* and the answer should reference *which* stakeholder *which* artefact convinced.
