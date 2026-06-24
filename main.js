/* ReviewHub — main.js */

// ── Pricing toggle ────────────────────────
(function initPricingToggle() {
  const btns      = document.querySelectorAll('.ptoggle');
  const priceEl   = document.getElementById('pro-price');
  const periodEl  = document.getElementById('pro-period');
  const noteEl    = document.getElementById('pro-yearly-note');
  if (!btns.length || !priceEl) return;

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      btns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const isYearly = btn.dataset.period === 'yearly';
      priceEl.textContent  = isYearly ? '₱69'     : '₱99';
      periodEl.textContent = isYearly ? '/ month'  : '/ month';
      if (noteEl) noteEl.hidden = !isYearly;
    });
  });
})();

// ── Scroll Reveal ─────────────────────────
(function initScrollReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-l, .reveal-r');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('on');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  els.forEach((el) => observer.observe(el));
})();

// ── Staggered grid animations ─────────────
(function initGridStagger() {
  const DELAY = 0.08;
  const grids = document.querySelectorAll(
    '.problem-grid, .features-grid, .community-grid, .spaces-grid, .test-grid, .about-visual'
  );
  grids.forEach((grid) => {
    grid.querySelectorAll('.reveal, .about-card').forEach((card, i) => {
      card.style.transitionDelay = `${i * DELAY}s`;
    });
  });
})();

// ── Header shadow on scroll ───────────────
(function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ── Mobile hamburger menu ─────────────────
(function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    links.classList.toggle('open', !expanded);
  });

  // Close on nav link click
  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      btn.setAttribute('aria-expanded', 'false');
      links.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      btn.setAttribute('aria-expanded', 'false');
      links.classList.remove('open');
    }
  });
})();

// ── Active nav link highlight ─────────────
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id], div[id="home"]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((a) => a.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
})();
