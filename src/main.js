import '@fontsource-variable/inter';
import '@fontsource/playfair-display/400.css';
import './styles.css';

import { durationsFor, findTreatment, firstInGroup, formatIDR } from './data.js';
import { initAccordions } from './js/accordion.js';
import { initBookingForm } from './js/booking-form.js';
import { initCarousels } from './js/carousel.js';
import { initHeader } from './js/header.js';
import { initHeroSlider } from './js/hero-slider.js';
import { initPriceToggle } from './js/price-toggle.js';
import { initReveal } from './js/reveal.js';

// Prices in the markup are a no-JS fallback; data.js is the source of truth and overwrites them here.
function fillPrices() {
  for (const el of document.querySelectorAll('[data-price]')) {
    const [id, key] = el.dataset.price.split(':');
    const treatment = findTreatment(id);
    const amount = key === 'from'
      ? Math.min(...durationsFor(treatment).map((d) => treatment.prices[d]))
      : treatment.prices[key];
    el.textContent = formatIDR(amount);
  }
}

fillPrices();
initHeader();
initHeroSlider();
initCarousels();
initAccordions();

const booking = initBookingForm();
initPriceToggle({
  onBook: (groupId, minutes) => booking.preselect(firstInGroup(groupId).id, minutes),
});
document.querySelectorAll('[data-book]').forEach((link) => {
  link.addEventListener('click', () => booking.preselect(link.dataset.book));
});

initReveal();
