/**
 * Harold P. Mallorca — Developer Portfolio Scripts
 * Handles Dark/Light Theme Toggle, Case Study Modals, and Navigation.
 */

// --- 1. THEME MANAGEMENT ---
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

// Initialize theme from localStorage or default to dark
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  htmlEl.classList.remove('dark');
} else {
  htmlEl.classList.add('dark');
}

// Toggle theme on click
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = htmlEl.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (window.lucide) {
      lucide.createIcons();
    }
  });
}

// --- 2. MOBILE MENU MANAGEMENT ---
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// --- 3. CASE STUDY DATA & MODAL LOGIC ---
const caseStudies = {
  biomsys: {
    badge: 'Flagship Municipal Ecosystem • Live',
    title: 'BiomSys Registration System',
    subtitle: 'City Government of Baguio — City Human Resource Management Office (CHRMO)',
    overview: 'A unified enterprise ecosystem combining high-definition municipal employee & OJT ID card issuance, low-level ZKTeco biometric timekeeping hardware integration, a public citizen registration portal (bio-registration.web.app), and city-wide biometric terminal incident reporting & fleet management (biometric-incident-report.web.app).',
    images: [
      { src: 'images/idmaker-harold.png', title: 'ID Maker Studio — Personnel ID & Signature Module', desc: 'Official photo alignment, Wacom STU-540 digital signature capture & SFTP/HRIS synchronization' },
      { src: 'images/zkteco-hologram.png', title: 'ZKTeco Biometrics — Hologram HUD', desc: 'MB560-VL terminal management with hand radar scan, 128-D facial AI mesh & holographic avatar' },
      { src: 'images/biometric-reports-manager.png', title: 'Biometric Reports Manager', desc: 'Internal fleet control center tracking 44 municipal stations (D01–D43 + HR Master) with verification workflows' },
      { src: 'images/bio-registration-public.png', title: 'Public Personnel Registration Form', desc: 'Mobile-responsive citizen registration portal hosted live at bio-registration.web.app' },
      { src: 'images/biometric-incident-public.png', title: 'Public Incident Reporting Portal', desc: 'Field incident reporting form hosted live at biometric-incident-report.web.app' },
      { src: 'images/wacom-signature-bridge.png', title: 'Wacom STU-540 Tablet Bridge', desc: 'Live vector signature capture and contrast adjustment tool' },
      { src: 'images/biomsys-masterlist.png', title: 'Masterlist Database', desc: 'Canonical SQL Server Newly Registered table with administrative controls' }
    ],
    architecture: [
      {
        title: 'ID System Suite (Regular, OJT, Design & PVC)',
        desc: 'Engineered a modular identification studio comprising: (1) Regular Employee ID generator with Wacom STU-540 signature capture, (2) OJT ID subsystem featuring 5-tier intelligent fuzzy matching against citizen registrations to resolve emergency contacts, (3) Interactive 8-point visual layout format editor (layout.json), and (4) Dual-sided PVC canvas renderer with dynamic QR code verification.'
      },
      {
        title: 'ZKTeco MB560-VL Biometric Socket Daemon (PyZK)',
        desc: 'Engineered a low-level TCP/IP socket daemon (port 4370) with a single-socket concurrency controller. Synchronizes 1,970+ users in 1.27 seconds via hardware register polling, processes 128-D Visible Light Facial AI templates, and manages SilkID 10-slot optical fingerprint scans.'
      },
      {
        title: 'Public Registration Portal (bio-registration.web.app)',
        desc: 'Published responsive citizen registration portal supporting all municipal appointment tracks (Job Order, Casual, Regular, Temporary, Coterminous, Internship) with dynamic document attachment validation and zero-LAN direct Supabase staging under Row-Level Security.'
      },
      {
        title: 'Biometric Reports & 44-Station Municipal Fleet (D01–D43 + HR Station)',
        desc: 'Built the incident management pipeline pairing the public reporting portal (biometric-incident-report.web.app) with the internal Biometric Reports Manager. Tracks 44 city stations (D01–D43 and HR Enrollment Center) with strict numerical sorting (compareDeviceNames), incident triage (Pending/Verified/Rejected), and an automated HRMO letterhead print engine.'
      }
    ],
    techStack: [
      'Node.js', 'Express', 'Python Daemon (PyZK)', 'Microsoft SQL Server', 
      'Supabase (PostgreSQL & Storage)', 'Firebase Hosting', 'Cloud Firestore',
      'Wacom SigCaptX SDK', 'HTML5 Canvas', 'SVG', 'SFTP Connection Pool', 'PDF.js'
    ]
  },

  joborder: {
    badge: 'BaguioHRDirect Platform • Live',
    title: 'Job Order Management System',
    subtitle: 'City Government of Baguio — Position Standardization & Tranche Review',
    overview: 'An administrative and financial governance platform built to standardize contractual positions, maintain Section 6.x duties & functions, and review compensation according to National Salary Tranches. Live in production at jo-classification.web.app.',
    images: [
      { src: 'images/joborder-portal.png', title: 'Job Order Renewal Portal', desc: 'Position classifications, step grades, and renewal workflow table' },
      { src: 'images/joborder-workflow.png', title: 'HR Workflow Navigation', desc: 'Multi-stage approval pipeline from department head to mayor' }
    ],
    architecture: [
      {
        title: 'HRIS Data Audit & Deduplication Engine',
        desc: 'Analyzed and normalized 1,689 disparate Job Order records across 27 city hall offices. Successfully consolidated these into 354 standardized composite profiles (OfficeCode + PositionTitle + SalaryGrade).'
      },
      {
        title: 'Section 6.x Contract of Service Duties Editor',
        desc: 'An administrative portal allowing office supervisors to standardize contract clauses with automated decimal reindexing (6.1, 6.2, 6.3). Features keyboard shortcuts, modal backdrop safety, and optimistic version locking (expectedVersion) to eliminate concurrent edit overwrites.'
      },
      {
        title: 'Salary Tranche Compensation Analytics',
        desc: 'An evaluation engine matching each position against the 2025 2nd Tranche and 2026 3rd Tranche schedules, computing monthly step rates, daily compensation (Monthly ÷ 22 days), and the mandatory +20% contractual premium.'
      },
      {
        title: 'Dual-Mode Hybrid Cloud Sync (sync-cloud.js)',
        desc: 'A CLI and daemon synchronizer supporting bidirectional sync, cloud push, and local pull between Google Cloud Firestore and the on-premises Microsoft SQL Server database.'
      }
    ],
    techStack: [
      'Google Firebase', 'Cloud Firestore', 'Node.js', 
      'Microsoft SQL Server', 'Firebase Authentication', 
      'Firebase Security Rules', 'Optimistic Locking', 'REST APIs'
    ]
  },

  move: {
    badge: 'Advocacy Chapter HRIS • In Development',
    title: 'M.O.V.E. Baguio Chapter HRIS Platform',
    subtitle: 'City Government of Baguio — Men Opposed to VAW Everywhere Chapter',
    overview: 'An enterprise management information system and spreadsheet database sync engine designed for the Baguio City Chapter of MOVE (Men Opposed to Violence Against Women Everywhere), providing municipal workforce roster analysis, automated seminar cohort allocation, and membership governance.',
    images: [
      { src: 'images/move-dashboard.png', title: 'MOVE Executive HRIS Dashboard', desc: 'Real-time KPI metrics, department distribution bars, demographic breakdown & training attendance' },
      { src: 'images/move-logo.png', title: 'MOVE Baguio Chapter Official Insignia', desc: 'Official chapter seal — Men Opposed to Violence Against Women Everywhere (City Government of Baguio)' }
    ],
    architecture: [
      {
        title: 'Master SpreadsheetML Excel Sync Architecture',
        desc: 'Built a local multi-sheet Excel database engine synchronizing 7 dedicated worksheets (Permanent: 506, Casual: 275, Officers: 17, Committees: 15, Selected Participants: 51, Office Summary: 19, Members: 51) across 748+ municipal male personnel.'
      },
      {
        title: '50-Participant Departmental Quota Engine',
        desc: 'Engineered an algorithmic participant selector balancing quotas across all 23 municipal offices for anti-VAWC capacity training seminars, preferring age brackets (30–40) and ensuring proportional representation.'
      },
      {
        title: 'Chapter Governance & Membership Dossiers',
        desc: 'Maintains comprehensive organizational directories for the 2026 Administration (Pres. Dan Ricky M. Ong) and 2025 Administration (Past Pres. Harold Mallorca), Standing Committees, Google Form intake survey integration, and verified member profiles.'
      },
      {
        title: 'Automated Attendance Tracking & Certificate Studio',
        desc: 'Tracks real-time seminar attendance (94.5% verified rate) with built-in certificate generation tools and instant Excel export workflows.'
      }
    ],
    techStack: [
      'HTML5', 'Tailwind CSS', 'JavaScript (ES6+)', 'SheetJS (xlsx)', 
      'Python Sync Server', 'Microsoft Excel SpreadsheetML', 'Interactive Analytics', 'FontAwesome'
    ]
  }
};

const modalBackdrop = document.getElementById('modalBackdrop');
const modalBox = document.getElementById('modalBox');
const modalContent = document.getElementById('modalContent');

// --- 4. PREVIEW SWITCHER ON CARDS ---
function switchPreview(project, imgPath, caption) {
  const mainImg = document.getElementById(`${project}MainImg`);
  if (mainImg) {
    mainImg.src = imgPath;
    const previewContainer = mainImg.closest('.group\\/img') || mainImg.parentElement.parentElement;
    if (previewContainer) {
      previewContainer.onclick = () => openLightbox(imgPath, caption);
      const captionEl = document.getElementById(`${project}Caption`) || previewContainer.querySelector('.truncate');
      if (captionEl && caption) {
        captionEl.textContent = caption;
      }
    }
  }

  // Update thumbnail active ring
  const card = mainImg ? mainImg.closest('article') : null;
  if (card) {
    const thumbs = card.querySelectorAll('button[onclick*="switchPreview"]');
    thumbs.forEach(btn => {
      if (btn.getAttribute('onclick').includes(imgPath)) {
        btn.classList.add('border-brand-500', 'opacity-100');
        btn.classList.remove('opacity-70', 'border-slate-800');
      } else {
        btn.classList.remove('border-brand-500', 'opacity-100');
        btn.classList.add('opacity-70', 'border-slate-800');
      }
    });
  }
}

// --- 5. LIGHTBOX MODAL LOGIC ---
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

function openLightbox(imgPath, caption) {
  if (!lightboxModal || !lightboxImg) return;
  lightboxImg.src = imgPath;
  if (lightboxCaption) {
    lightboxCaption.textContent = caption || 'System Screenshot';
  }
  document.body.classList.add('modal-active');
  lightboxModal.classList.remove('hidden');
  setTimeout(() => {
    lightboxModal.classList.remove('opacity-0');
  }, 10);
  if (window.lucide) {
    lucide.createIcons();
  }
}

function closeLightbox() {
  if (!lightboxModal) return;
  lightboxModal.classList.add('opacity-0');
  setTimeout(() => {
    lightboxModal.classList.add('hidden');
    if (!modalBackdrop || modalBackdrop.classList.contains('hidden')) {
      document.body.classList.remove('modal-active');
    }
  }, 200);
}

// --- 6. CASE STUDY MODAL ---
function openModal(projectId) {
  const data = caseStudies[projectId];
  if (!data) return;

  const imagesHtml = data.images.map(img => `
    <div class="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden cursor-pointer group/modalimg shadow" onclick="openLightbox('${img.src}', '${img.title} — ${img.desc}')">
      <div class="aspect-[16/10] overflow-hidden">
        <img src="${img.src}" alt="${img.title}" class="w-full h-full object-cover object-top group-hover/modalimg:scale-105 transition-transform duration-300">
      </div>
      <div class="p-2.5 bg-slate-900/90 text-left">
        <div class="text-xs font-bold text-white flex items-center justify-between">
          <span>${img.title}</span>
          <i data-lucide="zoom-in" class="w-3 h-3 text-brand-400"></i>
        </div>
        <p class="text-[11px] text-slate-400 leading-tight mt-0.5">${img.desc}</p>
      </div>
    </div>
  `).join('');

  const archHtml = data.architecture.map(item => `
    <div class="p-4 rounded-xl border border-slate-800 bg-slate-950/70">
      <h5 class="text-sm font-bold text-white mb-1 flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-brand-400"></span>
        ${item.title}
      </h5>
      <p class="text-xs text-slate-300 leading-relaxed">${item.desc}</p>
    </div>
  `).join('');

  const tagsHtml = data.techStack.map(tag => `
    <span class="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-slate-200 border border-slate-700">
      ${tag}
    </span>
  `).join('');

  modalContent.innerHTML = `
    <div>
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-300 border border-brand-500/20 mb-3">
        ${data.badge}
      </div>
      <h3 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">${data.title}</h3>
      <p class="text-xs font-mono text-slate-400 mt-1">${data.subtitle}</p>
      
      <p class="mt-4 text-sm text-slate-300 leading-relaxed">
        ${data.overview}
      </p>

      <!-- System Screenshot Gallery in Modal -->
      <div class="mt-6">
        <h4 class="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <i data-lucide="image" class="w-3.5 h-3.5 text-brand-400"></i>
          <span>Production Interface Screenshots (Click to Expand)</span>
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${imagesHtml}
        </div>
      </div>

      <div class="mt-6 pt-6 border-t border-slate-800">
        <h4 class="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Architecture & Engineering Highlights
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${archHtml}
        </div>
      </div>

      <div class="mt-6 pt-6 border-t border-slate-800">
        <h4 class="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Technologies Implemented
        </h4>
        <div class="flex flex-wrap gap-2">
          ${tagsHtml}
        </div>
      </div>
    </div>
  `;

  document.body.classList.add('modal-active');
  modalBackdrop.classList.remove('hidden');
  setTimeout(() => {
    modalBackdrop.classList.remove('opacity-0');
    modalBox.classList.remove('scale-95');
    modalBox.classList.add('scale-100');
  }, 10);

  if (window.lucide) {
    lucide.createIcons();
  }
}

function closeModal() {
  modalBackdrop.classList.add('opacity-0');
  modalBox.classList.remove('scale-100');
  modalBox.classList.add('scale-95');
  setTimeout(() => {
    modalBackdrop.classList.add('hidden');
    if (!lightboxModal || lightboxModal.classList.contains('hidden')) {
      document.body.classList.remove('modal-active');
    }
  }, 200);
}

// Close modal when clicking outside or pressing Escape
if (modalBackdrop) {
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxModal && !lightboxModal.classList.contains('hidden')) {
        closeLightbox();
      } else {
        closeModal();
      }
    }
  });
}

// --- 7. KEYBOARD SHORTCUT FOR PORTFOLIO STUDIO (Ctrl+Shift+E or Alt+A) ---
window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') || (e.altKey && e.key.toLowerCase() === 'a')) {
    e.preventDefault();
    window.location.href = 'admin.html';
  }
});

// --- 8. CLIENT HYDRATION FROM portfolio-data.json ---
async function hydratePortfolio() {
  try {
    const res = await fetch('portfolio-data.json?t=' + Date.now());
    if (!res.ok) return;
    const data = await res.json();
    if (!data) return;

    // Hydrate Profile
    if (data.profile) {
      const p = data.profile;
      if (p.name) document.querySelectorAll('[data-field="profile-name"]').forEach(el => el.textContent = p.name);
      if (p.role) document.querySelectorAll('[data-field="profile-role"]').forEach(el => el.textContent = p.role);
      if (p.employmentTitle) document.querySelectorAll('[data-field="profile-employmentTitle"]').forEach(el => el.textContent = p.employmentTitle);
      if (p.office) document.querySelectorAll('[data-field="profile-office"]').forEach(el => el.textContent = p.office);
      if (p.location) document.querySelectorAll('[data-field="profile-location"]').forEach(el => el.textContent = p.location);
      if (p.status) document.querySelectorAll('[data-field="profile-status"]').forEach(el => el.textContent = p.status);
      if (p.focusQuote) document.querySelectorAll('[data-field="profile-focusQuote"]').forEach(el => el.textContent = p.focusQuote);
      if (p.avatar) {
        document.querySelectorAll('[data-field="profile-avatar"]').forEach(img => {
          img.src = p.avatar;
        });
      }
    }

    // Hydrate Contacts
    if (data.contacts) {
      const c = data.contacts;
      if (c.phone) {
        document.querySelectorAll('[data-field="contact-phone"]').forEach(el => el.textContent = c.phone);
        document.querySelectorAll('[data-field="contact-phone-link"]').forEach(el => el.href = `tel:${c.phone}`);
        document.querySelectorAll('a[href^="tel:"]').forEach(el => {
          el.href = `tel:${c.phone}`;
          const span = el.querySelector('span');
          if (span && /^\d+$/.test(span.textContent.trim())) span.textContent = c.phone;
        });
      }
      if (c.facebook) {
        document.querySelectorAll('[data-field="contact-facebook-link"]').forEach(el => el.href = c.facebook);
        document.querySelectorAll('[data-field="contact-facebook-text"]').forEach(el => {
          el.textContent = c.facebook.replace(/^https?:\/\/(www\.)?facebook\.com\/?/, 'facebook.com/');
        });
        document.querySelectorAll('a[href*="facebook.com"]').forEach(el => el.href = c.facebook);
      }
      if (c.email) {
        document.querySelectorAll('[data-field="contact-email"]').forEach(el => el.textContent = c.email);
        document.querySelectorAll('[data-field="contact-email-link"]').forEach(el => el.href = `mailto:${c.email}`);
        document.querySelectorAll('a[href^="mailto:"]').forEach(el => el.href = `mailto:${c.email}`);
      }
    }

    // Hydrate Metrics
    if (data.metrics && Array.isArray(data.metrics)) {
      data.metrics.forEach((m, idx) => {
        const valEl = document.getElementById(`metric-val-${idx}`);
        const lblEl = document.getElementById(`metric-lbl-${idx}`);
        if (valEl && m.value) valEl.textContent = m.value;
        if (lblEl && m.label) lblEl.textContent = m.label;
      });
    }

    // Sync Case Studies with edited project data
    if (data.projects && Array.isArray(data.projects)) {
      data.projects.forEach(proj => {
        if (proj.id && caseStudies[proj.id]) {
          if (proj.title) caseStudies[proj.id].title = proj.title;
          if (proj.subtitle) caseStudies[proj.id].subtitle = proj.subtitle;
          if (proj.overview) caseStudies[proj.id].overview = proj.overview;
          if (proj.badge) caseStudies[proj.id].badge = proj.badge;
          if (proj.tags) caseStudies[proj.id].techStack = proj.tags;
        }
      });
    }

    if (window.lucide) {
      lucide.createIcons();
    }
  } catch (err) {
    // Graceful fallback to static pre-rendered markup
  }
}

// Hydrate on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hydratePortfolio);
} else {
  hydratePortfolio();
}
