# 💼 GoodForMe – Commercial Analytics Dashboard (Tableau)

This repository showcases a complete analytics suite built for a fictional wellness brand, **GoodForMe**, focused on KPI monitoring and campaign performance analysis.

---

## 📊 Project Overview

This Tableau project was designed to replicate the kind of reporting and commercial insight work a Graduate Business Analyst might deliver for a direct-to-consumer subscription business.

It features:

- 📈 **Executive Dashboard**:  
  - MRR, Active Subscribers, Churn Rate, and Net Revenue
  - Dual-axis MRR vs. Revenue trend
  - Revenue split by subscription type

- 🎯 **Campaign Performance Dashboard**:  
  - Revenue by Campaign
  - ROI Scatter Plot (Marketing Cost vs. Return)
  - Campaign Timeline (Gantt Chart)

---

## 🛠 Stack

This project was built using:

| Layer         | Tools                              |
|---------------|-------------------------------------|
| 📦 Data Layer | PostgreSQL (Supabase)               |
| 🔧 ETL        | Python (synthetic data generation)  |
| 📈 BI Layer   | Tableau (Desktop & Public)          |

---

## 📁 Data Model

Synthetic data was generated for:

- `transactions.csv`
- `customers.csv`
- `products.csv`
- `campaigns.csv`
- `subscription_kpis.csv`

All were imported into Supabase and structured using a star-schema model. Key views were created to enable smooth joining inside Tableau (e.g. monthly grain alignment, surrogate keys).

---

## 🌐 Live Demo / Screenshots


![Executive Dashboard](https://github.com/user-attachments/assets/b28ae926-0f36-45b7-8aa1-b9b4402d0f27)
![Campaign Performance Dashboard](https://github.com/user-attachments/assets/75348eb8-08bd-4abc-8f26-8d65675d47a5)


---

## 📌 Key Features

- Designed around GoodForMe’s job description for a Graduate Business Analyst
- Demonstrates both descriptive and analytical dashboarding
- Includes calculated fields for:
  - Net Revenue
  - ROI
  - LTV
  - Churn Rate
  - YoY MRR delta

---

## 🚀 Next Steps (Planned)

- Cohort retention heatmap
- Churn prediction scorecards
- Embedded analytics with Supabase + React

---

## 🔗 Related Links

- [Tableau Dashboard (if public)](https://public.tableau.com/app/profile/yourusername/viz/GoodForMeDashboard)
- [Lovable Frontend (Address Form Companion)](https://lovable.dev/projects/8d30e354-e16b-4241-8ff3-041724a86526)

---

## 📄 License

This project is for educational and demonstration purposes only.
