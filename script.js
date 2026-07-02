// ===== Typewriter in hero =====
const roles = [
  'web applications.',
  'backend systems.',
  'Android apps.',
  'AI-powered tools.',
];
const typeEl = document.getElementById('typewriter');
let roleIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIdx];
  typeEl.textContent = current.slice(0, charIdx);

  let delay;
  if (!deleting && charIdx < current.length) {
    charIdx++;
    delay = 70;
  } else if (!deleting) {
    deleting = true;
    delay = 1800; // pause before deleting
  } else if (charIdx > 0) {
    charIdx--;
    delay = 35;
  } else {
    deleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    delay = 400;
  }
  setTimeout(typeLoop, delay);
}
typeLoop();

// ===== Navbar shadow + scroll progress + back-to-top =====
const navbar = document.getElementById('navbar');
const progressBar = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 10);
  backToTop.classList.toggle('show', scrollY > 600);

  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = max > 0 ? `${(scrollY / max) * 100}%` : '0';
}, { passive: true });

// ===== Cursor glow follows the mouse =====
const cursorGlow = document.getElementById('cursorGlow');
window.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
}, { passive: true });

// ===== Mobile menu =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.addEventListener('click', (e) => {
  if (e.target.matches('.nav-link')) {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

// ===== Reveal on scroll (staggered per section) =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('section, .marquee').forEach((section) => {
  section.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 90, 450)}ms`;
    revealObserver.observe(el);
  });
});

// ===== Animated counters in hero stats =====
function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1200;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach((el) => statsObserver.observe(el));

// ===== Active nav link follows section =====
const sections = document.querySelectorAll('section[id]');
const linkMap = new Map(
  [...document.querySelectorAll('.nav-link')].map((a) => [a.getAttribute('href').slice(1), a])
);
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      linkMap.forEach((link) => link.classList.remove('active'));
      const link = linkMap.get(entry.target.id);
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach((s) => sectionObserver.observe(s));

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
