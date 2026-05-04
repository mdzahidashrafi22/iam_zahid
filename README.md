# IamZahid.xyz — CMA Portfolio

Personal portfolio website for **Mohammad Zahid**, CMA Finalist (ICMAI).

Showcases real-world Cost & Management Accounting projects with clear analysis, simple terminology, and recruiter-friendly presentation.

---

## Live Site

**[IamZahid.xyz](https://IamZahid.xyz)** (hosted via GitHub Pages)

---

## Projects

| # | Project | Industry | Key Skill |
|---|---------|----------|-----------|
| 1 | [Margin Recovery at an Auto-Component Maker](project-1.html) | Manufacturing | Cost classification, cost-driver analysis, contribution margin |
| 2 | [The Variance That Wasn't a Sales Miss](project-2.html) | B2B SaaS | Flexible budgeting, variance decomposition, root-cause analysis |

---

## Repo Structure

```
cma-projects/
├── index.html           ← Landing page (hero, about, skills, projects, education, contact)
├── project-1.html       ← Project 1: Cost Analysis & Optimization
├── project-2.html       ← Project 2: Budgeting & Variance Analysis
├── styles.css           ← Navy + gold professional theme
├── script.js            ← Mobile nav, scroll animations
├── assets/
│   └── md_zahid_dp_cropped.png   ← Profile photo
├── docs/                ← Detailed project research & analysis (Markdown)
│   ├── README.md
│   ├── cv/
│   └── projects/
│       ├── 01-cost-analysis-optimization/
│       └── 02-budgeting-variance-analysis/
└── README.md            ← This file
```

---

## Hosting on GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings > Pages**.
3. Under **Source**, select **Deploy from a branch**.
4. Set branch to `main` and folder to `/ (root)`.
5. Click **Save**.
6. (Optional) Under **Custom domain**, enter `IamZahid.xyz` and save.
7. In your domain registrar (GoDaddy, Namecheap, etc.), add these DNS records:

   | Type  | Name | Value |
   |-------|------|-------|
   | A     | @    | 185.199.108.153 |
   | A     | @    | 185.199.109.153 |
   | A     | @    | 185.199.110.153 |
   | A     | @    | 185.199.111.153 |
   | CNAME | www  | `<your-username>.github.io` |

8. Wait 5-10 min for DNS propagation, then check **Enforce HTTPS** in GitHub Pages settings.

---

## Tech Stack

- **HTML5 / CSS3 / Vanilla JS** — no frameworks, no build step
- **Google Fonts** — Inter + Playfair Display
- **Responsive** — mobile, tablet, desktop breakpoints
- **Zero dependencies** — just open `index.html` in a browser

---

## Local Preview

```bash
# Option 1: Just open the file
open index.html

# Option 2: Local server (if you want live-reload)
npx serve .
```

---

## Contact

**Mohammad Zahid**
CMA Finalist | Finance & Accounting
mdzahidashrafi22@gmail.com | +91 74707 00578
Bangalore, India
