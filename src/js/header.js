const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])';

function initSolidOnScroll(header) {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;
  // The header turns solid as soon as its own 80px band no longer overlaps the hero photo.
  new IntersectionObserver(([entry]) => {
    header.dataset.solid = String(!entry.isIntersecting);
  }, { rootMargin: '-80px 0px 0px 0px' }).observe(hero);
}

function initActiveLinks() {
  const links = [...document.querySelectorAll('#site-header nav a[href^="#"], #mobile-menu nav li a[href^="#"]')];
  const ids = [...new Set(links.map((link) => link.hash.slice(1)))];
  const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
  const visible = new Set();

  // A thin band across the middle of the viewport decides which section is "current".
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) visible.add(entry.target.id);
      else visible.delete(entry.target.id);
    }
    const current = ids.find((id) => visible.has(id));
    for (const link of links) {
      if (link.hash.slice(1) === current) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  }, { rootMargin: '-45% 0px -54% 0px' });

  sections.forEach((section) => observer.observe(section));
}

function initDrawer() {
  const drawer = document.getElementById('mobile-menu');
  const openButton = document.querySelector('[data-menu-open]');
  if (!drawer || !openButton) return;
  const closeButton = drawer.querySelector('[data-menu-close]');
  const desktop = window.matchMedia('(min-width: 1024px)');
  const isOpen = () => drawer.dataset.open === 'true';

  const setOpen = (open, restoreFocus = true) => {
    drawer.dataset.open = String(open);
    openButton.setAttribute('aria-expanded', String(open));
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) closeButton.focus();
    else if (restoreFocus) openButton.focus();
  };

  openButton.addEventListener('click', () => setOpen(true));
  closeButton.addEventListener('click', () => setOpen(false));
  drawer.querySelectorAll('[data-menu-link]').forEach((link) => {
    link.addEventListener('click', () => setOpen(false, false));
  });

  document.addEventListener('keydown', (event) => {
    if (!isOpen()) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [...drawer.querySelectorAll(FOCUSABLE)];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  desktop.addEventListener('change', (event) => {
    if (event.matches && isOpen()) setOpen(false, false);
  });
}

export function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  initSolidOnScroll(header);
  initActiveLinks();
  initDrawer();
}
