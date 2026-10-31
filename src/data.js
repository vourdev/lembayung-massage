export const WHATSAPP_NUMBER = '6287771210204';
export const WHATSAPP_DISPLAY = '+62 877-7121-0204';

export const HOURS = { open: '08:00', close: '23:00' };

export const CITIES = ['Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi', 'Serang', 'Cilegon'];

export const DURATIONS = [60, 90, 120];

export const GROUPS = [
  { id: 'single', name: 'Single Treatment' },
  { id: 'combo', name: 'Massage Combos' },
  { id: 'cupping', name: 'Massage + Cupping' },
];

// Prices in IDR per session. A missing duration means the treatment is not offered at that length.
export const TREATMENTS = [
  { id: 'full-body', name: 'Full Body Massage', group: 'single', prices: { 60: 100000, 90: 150000, 120: 190000 } },
  { id: 'reflexology', name: 'Reflexology', group: 'single', prices: { 60: 100000, 90: 150000, 120: 190000 } },
  { id: 'face-acupressure', name: 'Full Body + Face Acupressure', group: 'combo', prices: { 60: 160000, 120: 200000 } },
  { id: 'body-reflexology', name: 'Full Body + Reflexology', group: 'combo', prices: { 60: 160000, 120: 200000 } },
  { id: 'kerokan', name: 'Full Body + Kerokan', group: 'combo', prices: { 60: 160000, 120: 200000 } },
  { id: 'cupping', name: 'Full Body + Cupping', group: 'cupping', prices: { 60: 245000, 90: 280000, 120: 310000 } },
];

const idr = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });

// id-ID inserts a non-breaking space after "Rp"; keep it so the amount never wraps away from the symbol.
export const formatIDR = (amount) => idr.format(amount);

export const findTreatment = (id) => TREATMENTS.find((t) => t.id === id);

export const durationsFor = (treatment) => DURATIONS.filter((d) => treatment.prices[d] != null);

export const groupPrice = (groupId, minutes) => {
  const first = TREATMENTS.find((t) => t.group === groupId);
  return first.prices[minutes] ?? null;
};

export const firstInGroup = (groupId) => TREATMENTS.find((t) => t.group === groupId);

export const whatsappUrl = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
