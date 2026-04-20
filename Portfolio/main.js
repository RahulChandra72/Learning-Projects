// ─── NAVBAR SCROLL ───────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ─── HAMBURGER MENU ──────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ─── TERMINAL TYPING ──────────────────────────────────────
const messages = [
  'Open to Work ✓',
  'Building Cool Stuff...',
  'Available for Freelance',
  'MERN Stack Dev 🚀'
];
let msgIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typedEl = document.querySelector('.typed-text');

function typeLoop() {
  if (!typedEl) return;
  const current = messages[msgIdx];

  if (!isDeleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      msgIdx = (msgIdx + 1) % messages.length;
    }
  }
  setTimeout(typeLoop, isDeleting ? 60 : 100);
}
typeLoop();

// ─── SKILL BARS ON SCROLL ────────────────────────────────
function animateBars() {
  const bars = document.querySelectorAll('.bar-fill');
  bars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      bar.style.width = bar.dataset.width + '%';
    }
  });
}

// ─── REVEAL ON SCROLL ────────────────────────────────────
function revealOnScroll() {
  const els = document.querySelectorAll('.reveal');
  els.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
  animateBars();
}

// Add reveal class to sections
document.querySelectorAll(
  '.skill-category, .project-card, .blog-card, .timeline-item, .tl-card'
).forEach(el => el.classList.add('reveal'));

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // run once on load

// ─── CONTACT FORM ────────────────────────────────────────
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    formSuccess.style.display = 'block';
    form.reset();
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled = false;
    setTimeout(() => formSuccess.style.display = 'none', 5000);
  }, 1200);
});

// ─── ACTIVE NAV LINK ─────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function setActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current
      ? 'var(--accent)' : '';
  });
}
window.addEventListener('scroll', setActiveNav);
