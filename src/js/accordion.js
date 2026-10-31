export function initAccordions() {
  for (const list of document.querySelectorAll('[data-accordion]')) {
    const triggers = [...list.querySelectorAll('.accordion-trigger')];

    const setOpen = (trigger, open) => {
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      trigger.setAttribute('aria-expanded', String(open));
      panel.dataset.open = String(open);
      // Collapsed panels are 0px tall but still in the DOM; inert keeps their text out of Tab and the reading order.
      panel.inert = !open;
    };

    for (const trigger of triggers) {
      setOpen(trigger, trigger.getAttribute('aria-expanded') === 'true');
      trigger.addEventListener('click', () => {
        const willOpen = trigger.getAttribute('aria-expanded') !== 'true';
        triggers.forEach((t) => setOpen(t, t === trigger && willOpen));
      });
    }
  }
}
