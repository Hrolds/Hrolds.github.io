/**
 * Harold Mallorca — Developer Portfolio Scripts
 * Handles Dark/Light Theme Toggle, Case Study Modals, and Navigation.
 */

// --- 1. THEME MANAGEMENT ---
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

// Initialize theme from localStorage or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  if (savedTheme === 'light') {
    htmlEl.classList.remove('dark');
  } else {
    htmlEl.classList.add('dark');
  }
} else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
  htmlEl.classList.remove('dark');
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
    badge: 'Biometric IoT & Identity Studio',
    title: 'BiomSys & ID Maker Ecosystem',
    subtitle: 'City Government of Baguio — City Human Resource Management Office (CHRMO)',
    overview: 'A mission-critical attendance tracking and identity issuance system handling thousands of daily biometric clock-ins across municipal offices, paired with high-definition PVC employee badge and OJT ID generation.',
    images: [
      { src: 'images/idmaker-harold.png', title: 'ID Maker Studio (Harold P. Mallorca • 7641)', desc: 'Official photo alignment, Wacom STU-540 digital signature capture & SFTP/HRIS synchronization' },
      { src: 'images/zkteco-hologram.png', title: 'ZKTeco Biometrics — Hologram HUD (7641)', desc: 'MB560-VL terminal management with hand radar scan, 128-D facial AI mesh & holographic avatar' },
      { src: 'images/wacom-signature-bridge.png', title: 'Wacom STU-540 Bridge', desc: 'Live vector signature capture and contrast adjustment tool' },
      { src: 'images/biomsys-portal.png', title: 'BiomSys Web Portal', desc: 'Employee registration & document management portal interface' },
      { src: 'images/biomsys-masterlist.png', title: 'Masterlist Database', desc: 'Real-time newly registered table with administrative controls' }
    ],
    architecture: [
      {
        title: 'ZKTeco Hardware Socket Protocol',
        desc: 'Built a specialized background Python daemon (zk_reader.py) using low-level TCP/IP sockets to interact with biometric timeclocks. It pulls punch records in real time, manages user enrollments, and extracts facial recognition templates directly from device memory.'
      },
      {
        title: 'Wacom STU-540 Signature Tablet Bridge',
        desc: 'Implemented custom client-side integration using the Wacom SigCaptX SDK. Enables simultaneous live preview rendering on the LCD tablet screen while transmitting biometric stroke vector coordinates to HTML5 Canvas.'
      },
      {
        title: 'Automated PVC & OJT ID Printing Pipeline',
        desc: 'A canvas-based graphics rendering engine that automates dynamic barcode, QR code, and photo composition. Produces print-ready 300+ DPI vector graphics for front-and-back PVC badges and temporary OJT identification.'
      },
      {
        title: 'Multi-Tier Cloud & SFTP Synchronization',
        desc: 'Orchestrates bidirectional data movement across on-premises Microsoft SQL Server (BiomSys_Masterlist), cloud Supabase storage buckets, and secure SFTP file repositories for automated employee face photo and signature cataloging.'
      }
    ],
    techStack: [
      'Node.js', 'Express', 'Python Daemon', 'Microsoft SQL Server', 
      'Supabase (PostgreSQL & Storage)', 'Wacom SigCaptX SDK', 'ZKTeco Protocol', 
      'HTML5 Canvas', 'SVG', 'REST APIs', 'SFTP'
    ]
  },

  joborder: {
    badge: 'BaguioHRDirect Platform',
    title: 'Job Order Management System',
    subtitle: 'City Government of Baguio — Position Standardization & Tranche Review',
    overview: 'An administrative and financial governance platform built to standardize contractual positions, maintain Section 6.x duties & functions, and review compensation according to National Salary Tranches.',
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
    mainImg.parentElement.parentElement.onclick = () => openLightbox(imgPath, caption);
  }

  // Update thumbnail active ring
  const card = mainImg.closest('article');
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
