import { animate, stagger } from "motion";

// ==========================================================================
// Theme Toggle Logic
// ==========================================================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

// Check local storage for saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
updateThemeIcons(savedTheme);

function updateThemeIcons(theme) {
  if (theme === 'dark') {
    if (sunIcon) sunIcon.style.display = 'none';
    if (moonIcon) moonIcon.style.display = 'block';
  } else {
    if (sunIcon) sunIcon.style.display = 'block';
    if (moonIcon) moonIcon.style.display = 'none';
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcons(newTheme);
    
    // Smooth transition for dashboard cards
    animate(".card", { scale: [0.98, 1], opacity: [0.9, 1] }, { duration: 0.3 });
  });
}

// ==========================================================================
// Sidebar & Scroll Logic
// ==========================================================================
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.dashboard-section');

// Active state on click
navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    if (item.id === 'theme-toggle') return;
    
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    
    // Mobile: Close menu/drawer if implemented (optional)
  });
});

// Active state on scroll
window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
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
// Initial Animations
// ==========================================================================

// Animate Sidebar
animate(".sidebar", { x: [-100, 0], opacity: [0, 1] }, { duration: 0.8, easing: "ease-out" });

// Animate Hero Card
animate(".hero-card", { y: [50, 0], opacity: [0, 1] }, { duration: 1, easing: "ease-out" });

// Staggered Cards Reveal
animate(
  ".card:not(.hero-card)",
  { y: [30, 0], opacity: [0, 1] },
  { 
    delay: stagger(0.1, { start: 0.5 }),
    duration: 0.6,
    easing: "ease-out"
  }
);

// Animate Progress Bars
const progressFills = document.querySelectorAll('.progress-fill');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const targetWidth = fill.style.width;
      fill.style.width = '0%';
      setTimeout(() => {
        fill.style.width = targetWidth;
      }, 100);
      observer.unobserve(fill);
    }
  });
}, { threshold: 0.5 });

progressFills.forEach(fill => observer.observe(fill));

// Initialize Lucide Icons
if (window.lucide) {
    window.lucide.createIcons();
}

console.log("Raisul.ai Dashboard Logic Initialized 🚀");
