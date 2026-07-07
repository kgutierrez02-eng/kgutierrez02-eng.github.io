// ================================================================
// Portfolio — Kean Gutierrez
// Smooth scroll, sticky nav, scroll-reveal, mobile menu
// ================================================================

(function () {
  'use strict';

  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelector('.nav-links');
  const toggle   = document.querySelector('.nav-toggle');
  const spans    = toggle ? toggle.querySelectorAll('span') : [];

  // ── Navbar: scroll shadow ──────────────────────────────────
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveNav();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Mobile menu toggle ─────────────────────────────────────
  function openMenu() {
    navLinks.classList.add('open');
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      navLinks.classList.contains('open') ? closeMenu() : openMenu();
    });
  }

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ── Active nav link on scroll ──────────────────────────────
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navAnchors = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));

  function updateActiveNav() {
    const scrollY = window.scrollY + 90;
    let current = '';

    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop) {
        current = sec.getAttribute('id');
      }
    });

    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  // ── Scroll reveal ──────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // Stagger siblings that share the same parent
      const parent   = entry.target.parentElement;
      const siblings = Array.from(parent.querySelectorAll('.reveal:not(.visible)'));
      const idx      = siblings.indexOf(entry.target);
      const delay    = Math.max(0, idx * 75);

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);

      observer.unobserve(entry.target);
    });
  }, {
    threshold:  0.08,
    rootMargin: '0px 0px -32px 0px'
  });

  revealEls.forEach(el => observer.observe(el));

  // ── Smooth scroll for same-page anchors (fallback) ─────────
  // (CSS scroll-behavior handles most cases; this adds offset
  //  correction so sections aren't hidden behind the fixed nav)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target   = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const navH   = navbar ? navbar.offsetHeight : 64;
      const top    = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
