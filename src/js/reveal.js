export function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  const reveal = (el) => {
    el.dataset.revealed = 'true';
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    targets.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      reveal(entry.target);
      observer.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

  targets.forEach((el) => observer.observe(el));
}
