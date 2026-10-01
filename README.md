# Harold Mallorca — Developer Portfolio

Modern, high-performance developer portfolio website engineered with clean semantic HTML5, Tailwind CSS, Lucide Icons, and Vanilla JavaScript.

Features a dark/light mode toggle, interactive technical case study modals, and dedicated spotlights on flagship enterprise & hardware systems.

---

## 🌟 Featured Highlights

1. **BiomSys & ID Maker Ecosystem:**
   - ZKTeco Biometric Timeclock TCP/IP Socket Daemon (`zk_reader.py`)
   - Wacom STU-540 Signature Tablet integration via SigCaptX bridge
   - Automated high-resolution PVC & OJT ID Canvas rendering
   - Multi-tier synchronization across local SQL Server, Supabase, and SFTP

2. **Job Order Management System (BaguioHRDirect Initiative):**
   - 1,689 active municipal records normalized across 27 government offices
   - Contract of Service (Section 6.x) Duties & Functions editor with optimistic version locking
   - 2025/2026 Salary Tranche compensation and daily rate computation (+20% premium)
   - Dual-mode hybrid cloud synchronization (`sync-cloud.js`) between Cloud Firestore and local SQL Server

---

## 🚀 How to Preview Locally

You can preview the portfolio using any local web server:

### Option A: Using Python (Built-in)
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000` in your web browser.

### Option B: Using Node.js / npx
```bash
npx serve .
```

### Option C: VS Code / Antigravity Live Server
Right-click `index.html` and select **"Open with Live Server"**.

---

## 🌐 How to Deploy to GitHub Pages (Free)

Follow these simple steps to deploy your portfolio live to the web for free on GitHub Pages:

### Step 1: Initialize Git and Commit
Open PowerShell or Terminal inside this `portfolio` folder:
```bash
git init
git add .
git commit -m "feat: initial commit of developer portfolio"
```

### Step 2: Create a Repository on GitHub
1. Go to [GitHub](https://github.com/new).
2. Create a repository named:
   - `<your-github-username>.github.io` (e.g., `haroldmallorca.github.io` for a primary portfolio URL), **OR**
   - `portfolio` (will be hosted at `your-username.github.io/portfolio`).
3. Set the repository to **Public**.

### Step 3: Push to GitHub
```bash
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub → **Settings** → **Pages** (under "Code and automation" on the left menu).
2. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and `/ (root)`.
   - Click **Save**.
3. Within 1 minute, your portfolio will be live at:
   `https://<your-username>.github.io/`

---

## 🔥 Alternative: How to Deploy to Firebase Hosting

Since this is a static site, you can also deploy it to Firebase Hosting in 2 commands:

```bash
# 1. Initialize Firebase Hosting in this folder
firebase init hosting

# When prompted:
# - What do you want to use as your public directory? Enter: . (current directory)
# - Configure as a single-page app? Enter: No
# - Set up automatic builds and deploys with GitHub? Enter: No

# 2. Deploy live
firebase deploy --only hosting
```

---

## 📄 License
MIT License © 2026 Harold Mallorca
