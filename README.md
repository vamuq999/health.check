# Boardium Governance Health Check

A web-based governance diagnostic tool for not-for-profit boards.

This application provides a structured assessment, generates a governance score, highlights key risks, and delivers a board-ready report — while capturing leads and enabling paid report access.

---

## 🚀 Overview

The Boardium Governance Health Check is designed to:

* Provide a rapid governance diagnostic
* Generate a clear, structured governance score
* Highlight top risk areas
* Deliver actionable priority recommendations
* Serve as both a lead generation and revenue tool

This is an MVP focused on speed, clarity, and practical usability.

---

## 🧩 Features

### 1. Governance Assessment

* 4 key governance areas:

  * Board Structure
  * Risk & Compliance
  * Finance & Oversight
  * Culture & Effectiveness
* 20 structured questions
* Scoring scale: 1–4

### 2. Results Engine

* Overall governance score (%)
* Category-level scoring
* Top risk identification (low-scoring areas)
* Priority actions
* 12-month roadmap

### 3. Lead Capture

* Captures:

  * Name
  * Organisation
  * Email
* Stored via API (Google Sheets / Airtable ready)

### 4. Payment Integration

* Stripe Checkout integration
* Report access gated behind payment
* Price: AUD $149

### 5. Report Delivery

* Results summary shown in-app
* PDF report (planned / optional enhancement)

---

## 🛠 Tech Stack

* **Framework:** Next.js (App Router)
* **Frontend:** React + CSS (custom styling)
* **Deployment:** Vercel
* **Payments:** Stripe Checkout
* **Data Storage:** API route (Google Sheets / Airtable ready)

---

## 📁 Project Structure

```bash
/app
  /api
    /checkout      # Stripe checkout session
    /lead          # Lead capture endpoint
  /components
    Header.tsx
    Footer.tsx
  /success         # Payment success page
  page.tsx         # Main application flow
  globals.css      # Styling
/public
  logo.png
```

---

## ⚙️ Environment Variables

Create a `.env.local` file:

```env
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXX
NEXT_PUBLIC_URL=http://localhost:3000
```

For production (Vercel), set:

```env
NEXT_PUBLIC_URL=https://healthcheck.boardium.com.au
```

---

## 🧪 Running Locally

```bash
npm install
npm run dev
```

App will run at:

```
http://localhost:3000
```

---

## 💳 Stripe Test Payments

Use this test card:

```
4242 4242 4242 4242
Any future date
Any CVC
```

---

## 📦 Deployment

1. Push to GitHub
2. Import into Vercel
3. Add environment variables
4. Deploy

---

## 🌐 Domain Setup

Point domain to Vercel:

```
healthcheck.boardium.com.au
```

Configured via Vercel dashboard → Domains

---

## 🔮 Roadmap (Next Enhancements)

* PDF report generation (branded)
* Email delivery of report
* Admin dashboard for submissions
* CRM integration (HubSpot)
* Analytics tracking

---

## 💼 Business Model

* Free assessment experience
* Paid report unlock (AUD $149)
* Lead generation funnel for Boardium services

---

## 🤝 Author

Built for **Boardium**
Governance consulting for boards and not-for-profits

---

## ⚡ Status

MVP — production-ready with payment flow enabled.
