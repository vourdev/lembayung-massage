const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function initCarousel(track) {
  const prev = document.querySelector(`[data-carousel-prev="${track.id}"]`);
  const next = document.querySelector(`[data-carousel-next="${track.id}"]`);
  const items = [...track.children];

  // Cards differ in width, so step to the next card edge instead of scrolling a fixed distance.
  const step = (direction) => {
    const snapLine = track.getBoundingClientRect().left + parseFloat(getComputedStyle(track).paddingLeft);
    const offsets = items.map((item) => item.getBoundingClientRect().left - snapLine);
    const target = direction > 0 ? offsets.find((o) => o > 4) : offsets.findLast((o) => o < -4);
    if (target === undefined) return;
    track.scrollBy({ left: target, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  };

  const update = () => {
    const max = track.scrollWidth - track.clientWidth;
    prev?.setAttribute('aria-disabled', String(track.scrollLeft <= 2));
    next?.setAttribute('aria-disabled', String(track.scrollLeft >= max - 2));
  };

  prev?.addEventListener('click', () => {
    if (prev.getAttribute('aria-disabled') !== 'true') step(-1);
  });
  next?.addEventListener('click', () => {
    if (next.getAttribute('aria-disabled') !== 'true') step(1);
  });

  let frame = 0;
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  }, { passive: true });
  new ResizeObserver(update).observe(track);
  update();
}

export function initCarousels() {
  document.querySelectorAll('.carousel-track').forEach(initCarousel);
}
