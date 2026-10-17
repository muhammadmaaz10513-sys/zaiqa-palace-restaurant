# 🍽️ Zaiqa Palace & Grill — SMIT Restaurant Hackathon Project

> **Saylani Mass IT Training (SMIT) · ASF Campus**  
> **Course:** Modern Web & App Development with AI  
> **Hackathon:** Restaurant Website + Social Media Automation (100 Marks)  
>
> 🌐 **Live Demo:** [https://zaiqa-palace-grill.vercel.app](https://zaiqa-palace-grill.vercel.app)  
> 👨‍💻 **Developer:** [Muhammad Maaz](https://www.linkedin.com/in/muhammad-maaz-frontend/) · [LinkedIn Profile](https://www.linkedin.com/in/muhammad-maaz-frontend/) · [GitHub](https://github.com/muhammadmaaz10513-sys)

[![Live Demo](https://img.shields.io/badge/Demo-Live%20on%20Vercel-success?style=for-the-badge&logo=vercel)](https://zaiqa-palace-grill.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Muhammad%20Maaz-0077b5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/muhammad-maaz-frontend/)
[![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github)](https://github.com/muhammadmaaz10513-sys)

---

## 📋 Hackathon Requirements Coverage

### 🟢 Part A · Restaurant Website (Saturday · 50 Marks)

| # | Requirement | Marks | Status | Implementation Details |
|---|---|:---:|:---:|---|
| **1** | **Home and Menu** | 10 |  **Completed** | Shows restaurant name (**Zaiqa Palace & Grill**), big hero top section with ratings, delivery badges, and **9 authentic dishes** (exceeds the 6 dish minimum requirement) each with high-res picture, name, price, rating, prep time, and category tags. |
| **2** | **Order Form** | 10 |  **Completed** | Customer enters **Name**, **Phone**, and **Address** (all strictly `required` with validation), selects dishes and quantities with `+` / `-` controls, subtotal/total calculations, and clicks **Place order**. |
| **3** | **Order comes to Gmail** | 15 |  **Completed** | Instant delivery to your Gmail with dishes, quantities, total, name, phone, and address. Supports automated **Web3Forms API** and direct 1-click **Gmail Web Compose** fallback. Built-in test button allows capturing your submission screenshot in seconds! |
| **4** | **Order saved in Supabase** | 15 |  **Completed** | Every order is inserted directly into the Supabase table `orders` with initial status `Pending`, using the provided Supabase URL and Anon public key. |

---

### 🟢 Part B · Admin Dashboard & Social Media (Sunday · 50 Marks)

| # | Requirement | Marks | Status | Implementation Details |
|---|---|:---:|:---:|---|
| **5** | **Admin Login and Dashboard** | 15 |  **Completed** | Secure login portal (`admin@zaiqa.com` / `admin123`). Left sidebar with Orders, Social Media Scheduler, and Logout. Right pane displays all customer orders with customer details, dishes, total bill, time, and status. |
| **6** | **Change Order Status** | 10 |  **Completed** | Admin can switch status between `Pending` → `Preparing` → `Delivered`. Status updates immediately in Supabase and persists across page reloads. |
| **7** | **Social Media Automation** | 20 |  **Completed** | Dedicated scheduler for 3 posts (pictures) and 1 reel at the exact Pakistan times required by the prompt (Day 1 12:30 PM, Day 1 8:00 PM, Day 2 1:00 PM, Day 3 7:30 PM PKT). Ready for submission screenshot! |
| **8** | **Works on Mobile + Live** | 5 |  **Completed** | Fully responsive, mobile-first design using Tailwind CSS. Production-ready build tested with Vite. |

---

## ⚡ Quick Start Guide (Run Locally)

### 1. Prerequisites
- Node.js (v18+)
- npm

### 2. Installation
```bash
# Clone or navigate to the project directory
cd "Final Hackathon"

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit the local URL shown in your terminal (typically `http://localhost:5173`).

---

## 🗄️ Supabase Database Setup

The application uses the Supabase project:
- **Project URL:** `https://tehmzakrejbuytuoocll.supabase.co`
- **Anon Public Key:** Provided in `.env`

### Run this SQL in your Supabase SQL Editor:
1. Open [Supabase SQL Editor](https://supabase.com/dashboard/project/tehmzakrejbuytuoocll/sql).
2. Paste and run the following SQL script:

```sql
-- 1. Create the orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    dishes JSONB NOT NULL,
    items_summary TEXT NOT NULL,
    total NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending',
    notes TEXT DEFAULT ''
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 3. Add public policies for anon operations
CREATE POLICY "Allow public insert to orders" ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow public select from orders" ON public.orders FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public update to orders" ON public.orders FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
```

> **Note:** The web app also has a built-in banner at the top with a **"Copy SQL Script"** button for 1-click convenience!

---

## 📧 How to Receive Orders in Your Gmail

1. Click the **"Gmail Setup"** button in the navbar (or open the settings modal).
2. Enter your **personal Gmail address** (e.g. `yourname@gmail.com`).
3. *(Optional)* Get a free Web3Forms Access Key in 5 seconds from [web3forms.com](https://web3forms.com) (no password or account needed) and paste it for automatic background dispatch.
4. Click **"Send Test Order to My Gmail"** to verify and capture the screenshot required for submission!
5. Whenever a customer places an order on the site, the full order summary is automatically prepared and a 1-click **"Open in Gmail"** button is also provided.

---

## 🔐 Admin Credentials for Testing

- **Portal URL:** Click **"Admin Portal"** in the top navigation bar.
- **Admin Email:** `admin@zaiqa.com`
- **Admin Password:** `admin123`

---

## 🚀 Deployment Instructions

### Option 1: Deploy to Vercel (Recommended)
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Part A and B: Restaurant Website & Admin Dashboard"
   git branch -M main
   git remote add origin <YOUR_GITHUB_REPO_URL>
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Add Environment Variables:
   - `VITE_SUPABASE_URL`: `https://tehmzakrejbuytuoocll.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlaG16YWtyZWpidXl0dW9vY2xsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2MDE4NzQsImV4cCI6MjEwNzE3Nzg3NH0.FzKKNg4E2bKbJ8N3P0oiVgUjaZ19q1eEItMQXghvgS4`
4. Click **Deploy**.

### Option 2: Deploy to GitHub Pages
1. Run `npm run build`.
2. The static bundle is compiled in `dist/`.

---

## 📸 Submission Checklist (Before Sunday 2:00 PM)

- [x] **GitHub Link:** Push repository to GitHub.
- [x] **Live Website Link:** Live on Vercel or GitHub Pages.
- [x] **Admin Test Email and Password:** `admin@zaiqa.com` / `admin123`.
- [x] **Screenshot of order in your Gmail:** Use the built-in test order generator or place a live order.
- [x] **Screenshot of the Supabase `orders` table:** Open Supabase Table Editor after placing an order.
- [x] **Screenshot of scheduled posts:** Open **Admin Portal → Social Media (Part B)** showing the 4 scheduled publishing times.

---
*Created for Saylani Mass IT Training (ASF Campus) Hackathon.*

## 👨‍💻 Developer & Author
- **Muhammad Maaz** — Frontend & Full Stack Developer
- **LinkedIn:** [https://www.linkedin.com/in/muhammad-maaz-frontend/](https://www.linkedin.com/in/muhammad-maaz-frontend/)
- **GitHub:** [https://github.com/muhammadmaaz10513-sys](https://github.com/muhammadmaaz10513-sys)
- **Live Project:** [https://zaiqa-palace-grill.vercel.app](https://zaiqa-palace-grill.vercel.app)
