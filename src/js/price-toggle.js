import { DURATIONS, GROUPS, formatIDR, groupPrice } from '../data.js';

export function initPriceToggle({ onBook }) {
  const radiogroup = document.querySelector('[data-duration-toggle]');
  if (!radiogroup) return;

  const options = [...radiogroup.querySelectorAll('[role="radio"]')];
  const cards = [...document.querySelectorAll('[data-group]')];
  const status = document.querySelector('[data-price-status]');
  let minutes = Number(options.find((o) => o.getAttribute('aria-checked') === 'true').dataset.minutes);

  const fallbackFor = (groupId) => DURATIONS.find((d) => groupPrice(groupId, d) != null);

  const render = () => {
    const missing = [];
    for (const card of cards) {
      const groupId = card.dataset.group;
      const name = GROUPS.find((g) => g.id === groupId).name;
      const price = groupPrice(groupId, minutes);
      const available = price != null;
      const button = card.querySelector('[data-book-group]');

      card.querySelector('[data-group-available]').hidden = !available;
      const unavailable = card.querySelector('[data-group-unavailable]');
      if (unavailable) unavailable.hidden = available;

      if (available) {
        card.querySelector('[data-group-price]').textContent = formatIDR(price);
        card.querySelector('[data-group-unit]').textContent = `per ${minutes} min session`;
        button.textContent = 'Book Now';
        button.href = '#booking';
      } else {
        missing.push(name);
        button.textContent = `See ${fallbackFor(groupId)} min price`;
        button.href = '#prices';
      }
      button.setAttribute('aria-label', `${button.textContent}: ${name}`);
    }
    return missing;
  };

  const select = (option, focus = false) => {
    minutes = Number(option.dataset.minutes);
    for (const o of options) {
      const checked = o === option;
      o.setAttribute('aria-checked', String(checked));
      o.tabIndex = checked ? 0 : -1;
    }
    if (focus) option.focus();
    const missing = render();
    status.textContent = missing.length
      ? `Showing ${minutes} min prices. ${missing.join(' and ')} is not offered at ${minutes} min.`
      : `Showing ${minutes} min prices.`;
  };

  options.forEach((option, i) => {
    option.addEventListener('click', () => select(option));
    option.addEventListener('keydown', (event) => {
      const last = options.length - 1;
      const target = {
        ArrowRight: i === last ? 0 : i + 1,
        ArrowDown: i === last ? 0 : i + 1,
        ArrowLeft: i === 0 ? last : i - 1,
        ArrowUp: i === 0 ? last : i - 1,
        Home: 0,
        End: last,
      }[event.key];
      if (target === undefined) return;
      event.preventDefault();
      select(options[target], true);
    });
  });

  for (const card of cards) {
    card.querySelector('[data-book-group]').addEventListener('click', (event) => {
      const groupId = card.dataset.group;
      if (groupPrice(groupId, minutes) != null) {
        onBook(groupId, minutes);
        return;
      }
      event.preventDefault();
      const fallback = fallbackFor(groupId);
      select(options.find((o) => Number(o.dataset.minutes) === fallback), true);
    });
  }

  render();
}
