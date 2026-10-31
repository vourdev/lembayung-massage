import { CITIES, GROUPS, HOURS, TREATMENTS, durationsFor, findTreatment, formatIDR, whatsappUrl } from '../data.js';

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

const pad = (n) => String(n).padStart(2, '0');
const isoDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const longDate = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

export function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return { preselect() {} };

  const fields = {
    name: form.querySelector('#f-name'),
    city: form.querySelector('#f-city'),
    treatment: form.querySelector('#f-treatment'),
    duration: form.querySelector('#f-duration'),
    date: form.querySelector('#f-date'),
    time: form.querySelector('#f-time'),
    notes: form.querySelector('#f-notes'),
  };
  const summary = form.querySelector('[data-booking-summary]');
  const status = form.querySelector('[data-booking-status]');
  const errorIcon = document.getElementById('icon-error');

  // Remember each field's own hint so error ids can be added and removed without losing it.
  for (const field of Object.values(fields)) field.dataset.hint = field.getAttribute('aria-describedby') ?? '';

  for (const city of CITIES) fields.city.append(new Option(city, city));
  for (const group of GROUPS) {
    const optgroup = document.createElement('optgroup');
    optgroup.label = group.name;
    TREATMENTS.filter((t) => t.group === group.id).forEach((t) => optgroup.append(new Option(t.name, t.id)));
    fields.treatment.append(optgroup);
  }
  fields.date.min = isoDate(new Date());

  const updateSummary = () => {
    const treatment = findTreatment(fields.treatment.value);
    const minutes = Number(fields.duration.value);
    summary.textContent = treatment && minutes
      ? `${formatIDR(treatment.prices[minutes])} for ${minutes} min`
      : 'Choose a treatment and length';
  };

  const renderDurations = (keep) => {
    const treatment = findTreatment(fields.treatment.value);
    fields.duration.replaceChildren(new Option(treatment ? 'Choose length' : 'Pick a treatment first', ''));
    fields.duration.disabled = !treatment;
    if (treatment) {
      durationsFor(treatment).forEach((d) => fields.duration.append(new Option(`${d} min`, String(d))));
      if (keep && treatment.prices[keep] != null) fields.duration.value = String(keep);
    }
    updateSummary();
  };

  const showError = (field, message) => {
    const id = `${field.id}-error`;
    let error = document.getElementById(id);
    if (!error) {
      error = document.createElement('p');
      error.id = id;
      error.className = 'field-error';
      error.append(errorIcon.content.firstElementChild.cloneNode(true), document.createElement('span'));
      (field.closest('.relative') ?? field).after(error);
    }
    error.lastElementChild.textContent = message;
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', `${field.dataset.hint} ${id}`.trim());
  };

  const clearError = (field) => {
    document.getElementById(`${field.id}-error`)?.remove();
    field.removeAttribute('aria-invalid');
    if (field.dataset.hint) field.setAttribute('aria-describedby', field.dataset.hint);
    else field.removeAttribute('aria-describedby');
  };

  // Returns an error message, or an empty string when the field is valid.
  const check = {
    name: () => (fields.name.value.trim() ? '' : 'Enter your name.'),
    city: () => (fields.city.value ? '' : 'Choose your city.'),
    treatment: () => (fields.treatment.value ? '' : 'Choose a treatment.'),
    duration: () => (fields.duration.disabled || fields.duration.value ? '' : 'Choose a session length.'),
    date: () => {
      if (!fields.date.value) return 'Choose a date.';
      return fields.date.value < fields.date.min ? 'Choose today or a later date.' : '';
    },
    time: () => {
      const value = fields.time.value;
      if (!value) return 'Choose a time.';
      if (toMinutes(value) < toMinutes(HOURS.open) || toMinutes(value) > toMinutes(HOURS.close)) {
        return `Choose a time between ${HOURS.open} and ${HOURS.close} WIB.`;
      }
      const now = new Date();
      if (fields.date.value === isoDate(now) && toMinutes(value) <= now.getHours() * 60 + now.getMinutes()) {
        return 'Choose a time later than now.';
      }
      return '';
    },
  };

  const validate = (key) => {
    const message = check[key]();
    if (message) showError(fields[key], message);
    else clearError(fields[key]);
    return !message;
  };

  const buildMessage = () => {
    const treatment = findTreatment(fields.treatment.value);
    const minutes = Number(fields.duration.value);
    const [y, m, d] = fields.date.value.split('-').map(Number);
    const notes = fields.notes.value.trim();
    return [
      'Hello Lembayung, I would like to book a home session.',
      '',
      `Name: ${fields.name.value.trim()}`,
      `City: ${fields.city.value}`,
      `Treatment: ${treatment.name}`,
      `Duration: ${minutes} min (${formatIDR(treatment.prices[minutes])})`,
      `Date: ${longDate.format(new Date(y, m - 1, d))}`,
      `Time: ${fields.time.value} WIB`,
      ...(notes ? [`Address / notes: ${notes}`] : []),
    ].join('\n');
  };

  const showSent = (url) => {
    const box = document.createElement('p');
    box.className = 'mt-6 rounded-field bg-mist p-4 text-[15px] text-plum';
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.className = 'font-semibold text-violet underline underline-offset-4';
    link.textContent = 'open WhatsApp';
    box.append('WhatsApp is opening with your booking. Press send there and our admin will confirm. If nothing opened, ', link, '.');
    status.replaceChildren(box);
  };

  fields.treatment.addEventListener('change', () => {
    renderDurations(Number(fields.duration.value));
    if (fields.treatment.getAttribute('aria-invalid')) validate('treatment');
    clearError(fields.duration);
  });
  fields.duration.addEventListener('change', () => {
    updateSummary();
    if (fields.duration.getAttribute('aria-invalid')) validate('duration');
  });

  // Once a field has shown an error, re-check it as the user fixes it.
  for (const key of ['name', 'city', 'date', 'time']) {
    const field = fields[key];
    const recheck = () => {
      if (field.getAttribute('aria-invalid')) validate(key);
    };
    field.addEventListener('input', recheck);
    field.addEventListener('change', recheck);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.replaceChildren();
    const order = ['name', 'city', 'treatment', 'duration', 'date', 'time'];
    const invalid = order.filter((key) => !validate(key));
    if (invalid.length) {
      fields[invalid[0]].focus();
      return;
    }
    const url = whatsappUrl(buildMessage());
    window.open(url, '_blank', 'noopener');
    showSent(url);
  });

  renderDurations();

  return {
    preselect(treatmentId, minutes) {
      fields.treatment.value = treatmentId;
      clearError(fields.treatment);
      clearError(fields.duration);
      renderDurations(minutes);
    },
  };
}
