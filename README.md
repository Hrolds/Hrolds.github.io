# Harold P. Mallorca — Developer Portfolio

[![Live Site](https://img.shields.io/badge/Live_Site-hrolds.github.io-6366f1?style=for-the-badge&logo=githubpages&logoColor=white)](https://hrolds.github.io/)
[![GitHub](https://img.shields.io/badge/GitHub-Hrolds-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Hrolds)
[![Facebook](https://img.shields.io/badge/Facebook-KKharold28-1877f2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/KKharold28)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

Official portfolio of **Harold P. Mallorca**, Developer and Systems Administrator Assistant at the City Human Resource Management Office (CHRMO) • Baguio City Hall.

> **Core Focus:**  
> *"Focused on customizing and automating software solutions to meet company needs and improve daily operations."*

---

## 👤 About Harold P. Mallorca

* **Position:** Systems Administrator Assistant / Developer
* **Office:** City Human Resource Management Office (CHRMO), Baguio City Hall
* **Tenure:** October 27, 2022 – Present (4 Years Continuous Service)
* **Education:** 3-Year Diploma in Computer Science (Informatics Institute of Computer Technology, Baguio)
* **Accreditation Track:** Expanded Tertiary Education Equivalency & Accreditation Program (ETEEAP) for BSIT

### 📬 Contact Channels

* 📞 **Phone / Mobile:** [`+0 985 925 1674`](tel:09859251674) / `09859251674`
* 🌐 **Facebook:** [https://www.facebook.com/KKharold28](https://www.facebook.com/KKharold28)
* ✉️ **Email:** [hroldmallorca@gmail.com](mailto:hroldmallorca@gmail.com)
* 💻 **GitHub:** [https://github.com/Hrolds](https://github.com/Hrolds)
* ⚡ **Live Website:** [https://hrolds.github.io/](https://hrolds.github.io/)

---

## 🏛️ Flagship Enterprise Systems

### 1. BiomSys Registration System (Municipal Flagship Ecosystem)
A unified enterprise platform serving municipal personnel timekeeping, high-definition ID issuance, and IoT device fleet management for Baguio City Hall:

* **Module 1: ID System Suite**
  * **Regular ID Studio:** High-definition employee badge generation with live Wacom STU-540 signature capture, photo alignment guides, and SFTP/HRIS synchronization.
  * **OJT ID Module:** Trainee lifecycle tracking featuring 5-tier intelligent fuzzy matching against citizen masterlists to resolve emergency contacts.
  * **Design & PVC Format Engine:** Interactive 8-point visual layout format editor (`layout.json`) and dual-sided PVC canvas renderer with dynamic QR code verification.
* **Module 2: ZKTeco Terminal IoT Management**
  * Direct TCP/IP socket daemon (Port 4370) communicating via PyZK with single-socket concurrency locking.
  * Synchronizes 1,970+ users in 1.27 seconds via hardware register polling.
  * 128-D Visible Light Facial AI mesh extraction and SilkID 10-slot optical fingerprint radar matrix.
  * Push user photo synchronization protocol (`0x271A / 0x2719`).
* **Module 3: Biometric Registration**
  * **Internal Masterlist:** Canonical on-premises SQL Server Newly Registered database with pull-and-delete synchronization.
  * **Public Cloud Portal:** [bio-registration.web.app](https://bio-registration.web.app/) with multi-track appointment document attachment validation and Supabase Row-Level Security.
* **Module 4: Biometric Reports & Municipal Fleet Manager**
  * **44 Municipal Stations:** Fleets spanning City Hall, district clinics, and remote offices (D01–D43 + HR Enrollment Center).
  * **Public Incident Reporting Portal:** [biometric-incident-report.web.app](https://biometric-incident-report.web.app/).
  * **Internal Management Dashboard:** Numerical station sorting (`compareDeviceNames`), incident triage (Pending/Verified/Rejected), and automated HRMO letterhead print engine.

### 2. Job Order Management & Classification System
* **Live Production Portal:** [jo-classification.web.app](https://jo-classification.web.app/)
* Administrative and financial governance platform standardizing contractual positions across 27 municipal offices.
* Normalized 1,689 disparate records into 354 standardized composite job profiles.
* Contract of Service (Section 6.x) Duties & Functions editor with optimistic version locking.
* 2025/2026 National Salary Tranche compensation and daily rate computation (+20% premium).
* Dual-mode hybrid cloud synchronization between Cloud Firestore and local SQL Server.

### 3. M.O.V.E. HRIS Platform (Under Development)
* Executive Management Information System & Dashboard for Men Opposed to Violence Against Women Everywhere (M.O.V.E. Baguio Chapter).
* Features executive metric counters, interactive department distribution rosters, and governance dossiers.

---

## ⚡ Portfolio Studio (Visual CMS & One-Click Publishing)

The portfolio includes an administrative management center (**Portfolio Studio**) to visually update credentials, contact info, metrics, systems, and skills without writing raw code.

* **Security PIN:** `7641` (Authorized Developer PIN)
* **Live Studio Link:** [https://hrolds.github.io/admin.html](https://hrolds.github.io/admin.html)
* **Local Studio Link:** `http://localhost:3000/admin.html`
* **Keyboard Shortcut:** Press `Ctrl + Shift + E` or `Alt + A` on the portfolio to open Studio.

### Features
1. **Profile & Identity Editor:** Update titles, municipal positions, availability status, and professional focus statements.
2. **Contact Channels Manager:** Edit phone numbers, Facebook URLs, email addresses, and GitHub handles with automated tel/mailto links.
3. **Metrics & Impact:** Modify real-time statistics and headline numbers.
4. **Flagship Systems CMS:** Add, edit, or remove enterprise systems with custom tags, screenshots, and live application URLs.
5. **Split Live Preview:** Real-time side-by-side rendering pane showing changes instantly.
6. **One-Click Git Push:** Click **"Publish to GitHub (main)"** to automatically run `git add .`, `git commit -m "..."`, and `git push origin main` locally, or commit directly via GitHub REST API.

---

## 📁 Repository Structure

```
portfolio/
├── .nojekyll                 # Bypasses Jekyll processing on GitHub Pages
├── index.html                # Main semantic HTML5 portfolio document
├── script.js                 # Theme toggle, interactive modals, preview switchers & hydration
├── style.css                 # Custom styles, glow effects, and transitions
├── admin.html                # Portfolio Studio (Visual CMS with Live Preview & Git Push)
├── admin-server.js           # Lightweight local Node.js server with Git Publishing Engine
├── portfolio-data.json       # Central structured JSON data source for portfolio content
├── package.json              # NPM scripts (npm start, npm run publish)
├── README.md                 # Project documentation (this file)
├── Documents/
│   ├── Biography.docx        # Official Applicant Biography & Technical Profile (.docx)
│   └── Biography.md          # Full Markdown version of technical credentials & bio
└── images/
    ├── harold-photo.png      # Authentic high-resolution portrait of Harold Mallorca
    ├── idmaker-harold.png    # Authentic ID Maker Studio screenshot (Profile & Signature)
    ├── zkteco-hologram.png   # Authentic ZKTeco MB560-VL Hologram HUD (Harold Mallorca • 7641)
    ├── bio-registration-public.png   # Public Bio-Registration portal screenshot
    ├── biometric-incident-public.png # Public Incident Reporting portal screenshot
    ├── biometric-reports-manager.png # Fleet Manager (44 municipal stations D01-D43)
    ├── joborder-portal.png   # Job Order Classification portal screenshot
    ├── joborder-workflow.png # Job Order Approval workflow screenshot
    ├── move-dashboard.png    # M.O.V.E. Executive Dashboard screenshot
    ├── move-logo.png         # M.O.V.E. Chapter seal
    └── wacom-signature-bridge.png    # Wacom STU-540 signature bridge screenshot
```

---

## 💻 Tech Stack

* **Front-End:** HTML5, Tailwind CSS, Vanilla JavaScript (ES6+), Lucide Icons
* **CMS & Publishing:** Node.js native HTTP server, child_process Git CLI, GitHub REST API
* **Languages & Frameworks:** C#, Blazor (Server/WebAssembly), MudBlazor, Node.js, Express, Python
* **Databases:** Microsoft SQL Server (T-SQL), PostgreSQL, Supabase, Google Cloud Firestore, Firebase Hosting
* **Hardware Protocols:** ZKTeco Standalone Push SDK (Socket TCP 4370), Wacom SigCaptX SDK (STU-540)
* **Hosting:** GitHub Pages (`https://hrolds.github.io/`)

---

## 🚀 How to Run & Publish Locally

### Option A: Portfolio Studio with Automatic Git Publishing (Recommended)
```bash
npm start
# or: node admin-server.js
```
* **Live Site:** `http://localhost:3000/`
* **Portfolio Studio (CMS):** `http://localhost:3000/admin.html`
* Any changes made in the Studio can be published live with one click via the **"Publish to GitHub"** button!

### Option B: Quick Static Server
```bash
python -m http.server 3000
```

---

## 📄 License & Attribution

MIT License © 2026 **Harold P. Mallorca**. All rights reserved.  
Official documents and credentials can be referenced in [`Documents/Biography.md`](Documents/Biography.md) and [`Documents/Biography.docx`](Documents/Biography.docx).
