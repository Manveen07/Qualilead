# 🚀 QualiLead – AI-Powered B2B Lead Scoring System

QualiLead is an intelligent lead scoring system that leverages machine learning and generative AI to help sales teams prioritize high-conversion B2B leads. Built on real-time data from Product Hunt and enriched with third-party insights, it blends explainability, scoring, and automation to streamline outbound efforts.

---

## 🔍 Overview

- 🎯 **Objective:** Score and rank B2B leads by predicted conversion potential.
- 🧠 **Model:** Random Forest Classifier with SHAP-based feature importance.
- 🪄 **Explainability:** Google Gemini API generates human-readable summaries.
- ✉️ **Sales Enablement:** Integrated cold email generation with lead context.

---
https://qualilead-git-master-shardys-projects.vercel.app

![image](https://github.com/user-attachments/assets/a5cf5b25-5716-402e-ad1a-41712cbbc05f)
![image](https://github.com/user-attachments/assets/bbf1eaa3-016b-4f74-96da-3a1ea19a25e1)
![image](https://github.com/user-attachments/assets/e5d9ab2a-c7f9-4b39-8bf3-d34ab95949af)




## 📊 Dataset & Features

- **Source:** Product Hunt
- **Enrichments:**
  - LinkedIn followers
  - Email validation status
  - Domain age (WHOIS)
  - Industry type
  - Employee count
  - Country of operation

### 🧾 Key Fields Used:
| Field             | Description                            |
|------------------|----------------------------------------|
| `email_valid`     | Boolean email verification             |
| `followers`       | LinkedIn/Product Hunt followers count  |
| `votes`           | Product Hunt upvotes                   |
| `employee_count`  | Estimated company size                 |
| `industry`        | Industry category                      |
| `domain_age`      | Years since domain registration        |
| `engagement_score`| Combined followers and votes           |

---

## ⚙️ Preprocessing Pipeline

- ✅ Removed duplicate domains
- ⚖️ Normalized numeric fields with MinMaxScaler
- 🔢 One-hot encoded `industry` and `country`
- 🧮 Engineered `engagement_score` and binned `domain_age`, `employee_count`
- 🧼 Imputed or dropped missing values based on criticality

---

## 🧠 Model Details

- **Algorithm:** `RandomForestClassifier` (sklearn)
- **Metrics:**

| Metric    | Value |
|-----------|--------|
| Accuracy  | 85%    |
| Precision | 0.86   |
| Recall    | 0.83   |
| ROC AUC   | 0.89   |

- **Baseline models tested:** Logistic Regression, XGBoost (not selected for interpretability reasons)

---

## 📈 Explainability

- **Tool:** SHAP (SHapley Additive Explanations)
- **Usage:** Visual breakdown of top features contributing to each lead's score
- **Common Drivers:** Valid email, Product Hunt traction, employee count, domain age

---

## 🤖 AI Reasoning Integration

- **API Used:** [Google Gemini](https://ai.google)
- **Function:** Generates human-friendly summaries for top leads

> *Example:*  
> “This lead is high-quality due to strong Product Hunt traction, a verified email address, and a large team (~500 employees).”

---

## ✉️ Cold Email Integration

- Each lead comes with a dynamic `mailto:` link
- Auto-populates subject and message body
- Personalized using SHAP + Gemini explanations

---
