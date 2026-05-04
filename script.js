/* ============================================================
   IamZahid.xyz — interactivity
   - Mobile nav toggle
   - Auto-close mobile nav on link click
   - Footer year
   - Reveal-on-scroll for cards/sections
   ============================================================ */

(function () {
  'use strict';

  /* --- Mobile nav --- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- Footer year --- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- Reveal on scroll (lightweight) --- */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document
      .querySelectorAll('.skill-card, .project-card, .step, .insight, .kpi-tile, .timeline > li')
      .forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity .55s ease, transform .55s ease';
        observer.observe(el);
      });

    // Add the in-view class behaviour via a tiny stylesheet rule injection
    const style = document.createElement('style');
    style.textContent = `.in-view { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);
  }

  /* --- Active nav link highlight on scroll --- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach(a => {
            const href = a.getAttribute('href');
            if (href === '#' + id) a.classList.add('is-active');
            else a.classList.remove('is-active');
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => navObserver.observe(s));

    const styleNav = document.createElement('style');
    styleNav.textContent = `.nav-links a.is-active { color: var(--c-gold-2); } .nav-links a.is-active::after { width: 100% !important; }`;
    document.head.appendChild(styleNav);
  }
})();
