export function initHeroSlider() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;

  const slides = [...hero.querySelectorAll('.hero-slide')];
  const dots = [...hero.querySelectorAll('[data-hero-dot]')];
  const thumb = hero.querySelector('[data-hero-thumb]');
  const count = hero.querySelector('[data-hero-count]');
  const nextName = hero.querySelector('[data-hero-next]');
  const status = hero.querySelector('[data-hero-status]');
  let current = 0;

  const show = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.dataset.active = String(active);
      if (active) slide.removeAttribute('aria-hidden');
      else slide.setAttribute('aria-hidden', 'true');
    });
    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === current)));

    const next = slides[(current + 1) % slides.length];
    thumb.src = next.dataset.thumb;
    nextName.textContent = next.dataset.name;
    count.textContent = String(current + 1).padStart(2, '0');
    status.textContent = `Slide ${current + 1} of ${slides.length}: ${slides[current].dataset.name}`;
  };

  dots.forEach((dot) => dot.addEventListener('click', () => show(Number(dot.dataset.heroDot))));
  hero.querySelector('[data-hero-prev]').addEventListener('click', () => show(current - 1));
  hero.querySelector('[data-hero-next-btn]').addEventListener('click', () => show(current + 1));
}
