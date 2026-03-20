import { animate, stagger, inView } from "motion";

// ==========================================================================
// CV Download Function
// ==========================================================================
function downloadCV() {
  const link = document.createElement('a');
  link.href = './public/CV_SM_Raisul_Islam.pdf';
  link.download = 'CV_SM_Raisul_Islam.pdf';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Make function globally available
window.downloadCV = downloadCV;

// ==========================================================================
// Theme Toggle Logic
// ==========================================================================
let themeToggle, body, sunIcon, moonIcon, savedTheme;

function initializeThemeToggle() {
  themeToggle = document.getElementById('theme-toggle');
  body = document.body;
  sunIcon = document.querySelector('.sun-icon');
  moonIcon = document.querySelector('.moon-icon');

  savedTheme = 'light';
  try {
    savedTheme = localStorage.getItem('theme') || 'light';
  } catch (e) {
    console.warn("localStorage not available, defaulting to light theme.");
  }
  body.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      body.setAttribute('data-theme', newTheme);
      try {
        localStorage.setItem('theme', newTheme);
      } catch (e) {}
      updateThemeIcons(newTheme);

      animate(".card", { scale: [0.98, 1], opacity: [0.9, 1] }, { duration: 0.3 });
    });
  }
}

function updateThemeIcons(theme) {
  if (theme === 'dark') {
    if (sunIcon) sunIcon.style.display = 'none';
    if (moonIcon) moonIcon.style.display = 'block';
  } else {
    if (sunIcon) sunIcon.style.display = 'block';
    if (moonIcon) moonIcon.style.display = 'none';
  }
}

// ==========================================================================
// Advanced Motion Animations
// ==========================================================================

// 1. Initial Entrances
animate(".sidebar", { x: [-100, 0], opacity: [0, 1] }, { duration: 0.8, easing: "ease-out" });
animate(".dashboard-header", { y: [-50, 0], opacity: [0, 1] }, { duration: 0.8, delay: 0.2 });

// Hero Section Staggered Entrance
inView("#home", ({ target }) => {
  animate(".hero-badge", { opacity: [0, 1], y: [20, 0] }, { duration: 0.6, delay: 0.1 });
  animate(".hero-text h1", { opacity: [0, 1], x: [-30, 0] }, { duration: 0.8, delay: 0.2 });
  animate(".hero-text p", { opacity: [0, 1], y: [20, 0] }, { duration: 0.6, delay: 0.4 });
  animate(".hero-highlights > div", { opacity: [0, 1], x: [-20, 0] }, { duration: 0.5, delay: stagger(0.1, { start: 0.5 }) });
  animate(".hero-text .btn-primary", { opacity: [0, 1], scale: [0.8, 1] }, { duration: 0.5, delay: 0.8 });
  animate(".social-links-hero a", { opacity: [0, 1], y: [20, 0] }, { duration: 0.4, delay: stagger(0.1, { start: 0.9 }) });
  animate(".hero-illustration-wrapper", { opacity: [0, 1], scale: [0.8, 1], rotate: [-10, 0] }, { duration: 1, delay: 0.3 });
});

// 2. Scroll-Triggered Native Reveals (Slide & Zoom)
const addScrollAnimation = (selector, initialStyle, keyframes) => {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach((el) => {
    Object.assign(el.style, initialStyle);
    el.dataset.animated = "false";
  });

  const checkScroll = () => {
    const triggerBottom = window.innerHeight * 0.90;
    elements.forEach((el) => {
      if (el.dataset.animated === "true") return;
      const box = el.getBoundingClientRect();
      if (box.top < triggerBottom && box.bottom > 0) {
        el.dataset.animated = "true";
        animate(el, keyframes, { duration: 0.8, easing: [0.17, 0.55, 0.55, 1] });
      }
    });
  };

  window.addEventListener("scroll", checkScroll, { passive: true });
  setTimeout(checkScroll, 100);
};

// 1. Headings come from left
addScrollAnimation(".section-title", { opacity: "0", transform: "translateX(-50px)" }, { opacity: [0, 1], x: [-50, 0] });

// 2. Cards zoom in
addScrollAnimation(".card:not(.hero-card), .gallery-item", { opacity: "0", transform: "scale(0.8)" }, { opacity: [0, 1], scale: [0.8, 1] });

// 3. Texts come from right
addScrollAnimation(".about-grid div, .stat-value, .stat-label", { opacity: "0", transform: "translateX(50px)" }, { opacity: [0, 1], x: [50, 0] });

// 4. Footer Entrance
addScrollAnimation(".dashboard-footer-main", { opacity: "0", transform: "translateY(50px)" }, { opacity: [0, 1], y: [50, 0] });

// 4. Hover Micro-interactions (Programmatic)
document.querySelectorAll(".card:not(.hero-card), .gallery-item").forEach(element => {
  element.addEventListener("mouseenter", () => {
    animate(element, { scale: 1.02, y: -5 }, { duration: 0.3 });
  });
  element.addEventListener("mouseleave", () => {
    animate(element, { scale: 1, y: 0 }, { duration: 0.3 });
  });
});

// ==========================================================================
// Navigation & Core Logic
// ==========================================================================
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.dashboard-section');

window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach((item) => {
        item.classList.remove("active");
        if (item.getAttribute("href") === `#${current}`) {
            item.classList.add("active");
        }
    });
});

// ==========================================================================
// Skill Filtering Logic
// ==========================================================================
const filterBtns = document.querySelectorAll('.filter-btn');
const skillItems = document.querySelectorAll('.skill-item-wrapper');

// Set Programming filter as default on page load
window.addEventListener('load', () => {
  const programmingBtn = document.querySelector('.filter-btn[data-filter="programming"]');
  if (programmingBtn) {
    programmingBtn.click();
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    
    // Update active button state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Filter and animate skill items
    skillItems.forEach(item => {
      const category = item.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        // Show item
        item.style.display = 'flex';
        animate(
          item, 
          { opacity: [0, 1], scale: [0.9, 1], y: [20, 0] }, 
          { duration: 0.4, easing: "ease-out" }
        );
        
        // Re-trigger progress bar animation
        const fill = item.querySelector('.progress-fill');
        if (fill) {
          const targetWidth = fill.getAttribute('data-target-width') || fill.style.width;
          if (!fill.getAttribute('data-target-width')) {
            fill.setAttribute('data-target-width', targetWidth);
          }
          fill.style.width = '0%';
          setTimeout(() => {
            fill.style.width = targetWidth;
          }, 150);
        }
      } else {
        // Hide item
        animate(item, { opacity: 0, scale: 0.95, y: 10 }, { duration: 0.2 }).finished.then(() => {
          item.style.display = 'none';
        });
      }
    });
  });
});

// Update the initial progress bar reveal to store the target width
inView('.progress-bar', ({ target }) => {
  const fill = target.querySelector('.progress-fill');
  if (fill) {
    const targetWidth = fill.style.width;
    fill.setAttribute('data-target-width', targetWidth);
    fill.style.width = '0%';
    setTimeout(() => {
      fill.style.width = targetWidth;
    }, 200);
  }
});

// Initialize Lucide Icons
if (window.lucide) {
    window.lucide.createIcons();
    // Initialize theme toggle after icons are created
    initializeThemeToggle();
}

console.log("Raisul.ai Advanced Motion System Online 🚀");
