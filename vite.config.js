import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const ICON_ROOT = fileURLToPath(new URL('./node_modules/@phosphor-icons/core/assets/', import.meta.url));

// Swaps <i data-ph="name" class="..."></i> for the inline Phosphor SVG so icons ship without runtime JS.
// Names ending in "-fill" come from the fill weight; everything else is regular.
function phosphorIcons() {
  const cache = new Map();
  const load = (name) => {
    if (!cache.has(name)) {
      const file = `${ICON_ROOT}${name.endsWith('-fill') ? 'fill' : 'regular'}/${name}.svg`;
      if (!fs.existsSync(file)) throw new Error(`Unknown Phosphor icon "${name}"`);
      cache.set(name, fs.readFileSync(file, 'utf8').trim());
    }
    return cache.get(name);
  };
  return {
    name: 'phosphor-icons',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(/<i data-ph="([\w-]+)"(?: class="([^"]*)")?><\/i>/g, (_, name, cls = '') => {
          const className = `icon ${cls}`.trim();
          return load(name).replace('<svg ', `<svg class="${className}" aria-hidden="true" focusable="false" `);
        });
      },
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), phosphorIcons()],
  build: {
    assetsInlineLimit: 0,
  },
});
