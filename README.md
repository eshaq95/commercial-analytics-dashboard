# 💼 Analytics Dashboard (Tableau)

This repository showcases a complete analytics suite built for a fictional wellness brand, focused on KPI monitoring and campaign performance analysis.

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

![Executive Dashboard](Executive%20Dashboard.png)
![Campaign Performance Dashboard](Campaign%20Performance%20Dashboard.png)

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


## 📄 License

This project is for educational and demonstration purposes only.
