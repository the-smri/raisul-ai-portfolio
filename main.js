import { animate, stagger, inView } from "motion";

// ==========================================================================
// Theme Toggle Logic
// ==========================================================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

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
    
    animate(".card", { scale: [0.98, 1], opacity: [0.9, 1] }, { duration: 0.3 });
  });
}

// ==========================================================================
// Advanced Motion Animations
// ==========================================================================

// 1. Initial Sidebar & Header Entrance
animate(".sidebar", { x: [-100, 0], opacity: [0, 1] }, { duration: 0.8, easing: "ease-out" });
animate(".dashboard-header", { y: [-50, 0], opacity: [0, 1] }, { duration: 0.8, delay: 0.2 });

// 2. Scroll-Triggered Section Reveals (Multi-Directional)
const sectionsList = document.querySelectorAll(".dashboard-section");
sectionsList.forEach((section, index) => {
  const isEven = index % 2 === 0;
  
  inView(section, ({ target }) => {
    // Section Title Animation
    const title = target.querySelector(".section-title");
    if (title) {
      animate(title, { x: [isEven ? -50 : 50, 0], opacity: [0, 1] }, { duration: 0.8, easing: "ease-out" });
    }

    // Main Section Content Reveal
    animate(
      target,
      { 
        x: [isEven ? -100 : 100, 0], 
        y: [40, 0], 
        opacity: [0, 1] 
      },
      { duration: 1, easing: [0.17, 0.67, 0.83, 0.67] }
    );

    // Stagger child cards with extra lift
    const cards = target.querySelectorAll(".card");
    if (cards.length > 0) {
      animate(
        cards,
        { y: [30, 0], opacity: [0, 1], scale: [0.9, 1] },
        { 
          delay: stagger(0.12, { start: 0.3 }),
          duration: 0.6,
          easing: "ease-out"
        }
      );
    }
  }, { margin: "-100px 0px -100px 0px" });
});

// 3. Footer Entrance
inView(".dashboard-footer-main", ({ target }) => {
  animate(target, { y: [50, 0], opacity: [0, 1] }, { duration: 1, delay: 0.2 });
});

// 4. Hover Micro-interactions (Programmatic)
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    animate(card, { scale: 1.02, y: -5 }, { duration: 0.3 });
  });
  card.addEventListener("mouseleave", () => {
    animate(card, { scale: 1, y: 0 }, { duration: 0.3 });
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
}

console.log("Raisul.ai Advanced Motion System Online 🚀");
