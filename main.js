import { animate, stagger } from "motion";

// ==========================================================================
// Theme Toggle Logic
// ==========================================================================
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

// Check local storage for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  root.setAttribute('data-theme', 'light');
  if(themeToggle) themeToggle.innerHTML = '<i data-lucide="moon"></i>';
}

// Initialize Lucide Icons after the theme toggle has potentially injected a new icon
lucide.createIcons();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    if (currentTheme === 'light') {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = '<i data-lucide="sun"></i>';
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = '<i data-lucide="moon"></i>';
    }
    lucide.createIcons(); // refresh icon rendering
  });
}

// Set current year in footer
document.querySelector('.footer-copy').innerHTML = `&copy; ${new Date().getFullYear()} S M Raisul Islam. All rights reserved.`;

// ==========================================================================
// Navbar Scroll & Mobile Menu
// ==========================================================================
const navbar = document.getElementById('navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('nav-links');
const navItems = navLinks.querySelectorAll('a');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Highlight active section
  let current = '';
  const sections = document.querySelectorAll('.section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    // Adjust height check for bottom sections
    if (pageYOffset >= (sectionTop - 250)) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href').includes(current)) {
      a.classList.add('active');
    }
  });
});

menuToggle.addEventListener('click', () => {
  const isDisplayed = window.getComputedStyle(navLinks).display !== 'none';
  if (isDisplayed && window.innerWidth <= 768) {
    navLinks.style.display = 'none';
  } else {
    navLinks.style.display = 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.width = '100%';
    navLinks.style.background = 'var(--bg-color)';
    navLinks.style.padding = '2rem';
    navLinks.style.borderBottom = '1px solid var(--card-border)';
    navLinks.style.gap = '1.5rem';
  }
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if(targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      if(window.innerWidth <= 768) {
         navLinks.style.display = 'none'; // close menu on mobile
      }
      window.scrollTo({
        top: targetElement.offsetTop - 80, // offset for navbar
        behavior: 'smooth'
      });
    }
  });
});

// ==========================================================================
// Typing Animation
// ==========================================================================
const words = ["AI", "Math", "Programming", "Education"];
let i = 0;
let timer;
const typingText = document.getElementById('typing-text');
const initialPrefix = "Educator | AI Researcher | Software Engineer";

// We'll display the prefix, and loop the words at the end.
// Actually, the spec says: "Typing animation subtitle: Educator | AI Researcher | Software Engineer"
// Wait, the spec says "Typing animation in the hero (cycles: 'AI' -> 'Math' -> 'Programming' -> 'Education')"
// I'll make the subtitle display: "Educator | AI Researcher | Software Engineer" 
// And the typing animation will be an extra flair at the end, or replacing a word.
// Let's just make it type: "Passionate about [word]" in the subtitle area. Or standard setup.
// I will just cycle the 4 words in the designated span.

function typeNow() {
  let word = words[i].split('');
  let loopTyping = function() {
    if (word.length > 0) {
      typingText.innerHTML += word.shift();
    } else {
      setTimeout(deleteNow, 2000);
      return false;
    }
    timer = setTimeout(loopTyping, 100);
  };
  loopTyping();
}

function deleteNow() {
  let word = words[i].split('');
  let loopDeleting = function() {
    if (word.length > 0) {
      word.pop();
      typingText.innerHTML = word.join('');
    } else {
      if (words.length > (i + 1)) {
        i++;
      } else {
        i = 0;
      }
      setTimeout(typeNow, 500);
      return false;
    }
    timer = setTimeout(loopDeleting, 50);
  };
  loopDeleting();
}

// Set initial prefix statically if we wanted, but the HTML has the sentence below it.
// I'll prefix the typing with "Expertise in: " for context.
typingText.insertAdjacentHTML('beforebegin', 'Educator | AI Researcher | Software Engineer <br/><br/> Expertise in: ');

// Start typing animation
setTimeout(typeNow, 1000);


// ==========================================================================
// Layout & Scroll Animations (Motion One + IntersectionObserver)
// ==========================================================================

// Hero Initial Animation
animate(
  ".welcome-label",
  { opacity: [0, 1], y: [20, 0] },
  { duration: 0.8, easing: "ease-out" }
);

animate(
  ".hero-title",
  { opacity: [0, 1], y: [40, 0] },
  { duration: 0.8, delay: 0.2, easing: "ease-out" }
);

animate(
  ".hero-subtitle",
  { opacity: [0, 1], y: [30, 0] },
  { duration: 0.8, delay: 0.4, easing: "ease-out" }
);

animate(
  ".hero-paragraph",
  { opacity: [0, 1], y: [20, 0] },
  { duration: 0.8, delay: 0.5, easing: "ease-out" }
);

animate(
  ".hero-buttons .btn",
  { opacity: [0, 1], y: [20, 0] },
  { duration: 0.6, delay: stagger(0.1, { start: 0.6 }), easing: "ease-out" }
);

animate(
  ".hero-social a",
  { opacity: [0, 1], scale: [0.8, 1] },
  { duration: 0.6, delay: stagger(0.1, { start: 0.8 }), easing: "ease-out" }
);

animate(
  ".hero-glow-ring",
  { opacity: [0, 1], scale: [0.8, 1] },
  { duration: 1, delay: 0.5, easing: "ease-out" }
);

// Unified Scroll Reveal Animation using Native IntersectionObserver
const revealElements = document.querySelectorAll("[data-reveal='true']");

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animate(
        entry.target,
        { opacity: [0, 1], y: [40, 0] },
        { duration: 0.8, easing: [0.17, 0.55, 0.55, 1] } 
      );
      obs.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach((el) => {
  // Set initial state so they are invisible before scrolling into view
  el.style.opacity = "0";
  observer.observe(el);
});
