import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets';
const OUT = 'public/img';

const wa = (stamp) => `WhatsApp Image 2026-10-31 at ${stamp}.jpeg`;

// Widths never exceed the source width; 640 is the smallest card/tile size used in the layout.
const photos = [
  { src: 'image-hero.jpg', name: 'hero-back', widths: [640, 1280, 2048], jpg: 1280 },
  { src: 'image-cta-1.jpg', name: 'spa-back', widths: [640, 1280, 2048], jpg: 1280 },
  { src: 'image-cta-3.jpg', name: 'reflexology', widths: [320, 640, 1280, 2048], jpg: 1280 },
  { src: 'image-service-1.jpg', name: 'full-body', widths: [640, 1280] },
  { src: 'image-service-2.jpg', name: 'knuckle-back', widths: [640, 1280, 2048] },
  { src: 'image-service-3.png', name: 'face-acupressure', widths: [320, 640] },
  { src: 'image-service-4.jpg', name: 'shoulder', widths: [320, 640] },
  { src: 'image-service-5.png', name: 'kerokan', widths: [320, 432] },
  { src: 'image-service-6.jpg', name: 'cupping', widths: [320, 640] },
  { src: 'cta.png', name: 'whatsapp-chat', widths: [640, 1024] },
  { src: wa('12.50.51 (1)'), name: 'foot-bath', widths: [640] },
  { src: wa('12.50.52 (1)'), name: 'candle-back', widths: [640] },
  { src: wa('12.50.52 (2)'), name: 'facial', widths: [640] },
  { src: wa('12.50.52'), name: 'towels', widths: [640] },
  // The bottom strip of these two carries a third-party watermark.
  { src: wa('12.50.53 (1)'), name: 'oil', widths: [640], trimBottom: 0.08 },
  { src: wa('12.50.53'), name: 'deep-back', widths: [736], trimBottom: 0.08 },
  { src: wa('12.50.53 (2)'), name: 'hand-foot', widths: [448] },
];

// Bounding box of the circular mark inside logo.png, plus 8px padding.
const MARK = { left: 222, top: 384, width: 658, height: 574 };

async function isFresh(srcPath, outPath) {
  try {
    const [s, o] = await Promise.all([fs.stat(srcPath), fs.stat(outPath)]);
    return o.mtimeMs >= s.mtimeMs;
  } catch {
    return false;
  }
}

async function load(job) {
  const srcPath = path.join(SRC, job.src);
  let img = sharp(srcPath).rotate();
  if (job.trimBottom) {
    const { width, height } = await sharp(srcPath).metadata();
    img = img.extract({ left: 0, top: 0, width, height: Math.round(height * (1 - job.trimBottom)) });
  }
  return { srcPath, img };
}

async function photo(job) {
  const { srcPath } = await load(job);
  const outputs = job.widths.map((w) => ({ w, file: path.join(OUT, `${job.name}-${w}.webp`), type: 'webp' }));
  if (job.jpg) outputs.push({ w: job.jpg, file: path.join(OUT, `${job.name}-${job.jpg}.jpg`), type: 'jpg' });

  let written = 0;
  for (const o of outputs) {
    if (await isFresh(srcPath, o.file)) continue;
    const { img } = await load(job);
    const resized = img.resize({ width: o.w, withoutEnlargement: true });
    if (o.type === 'webp') await resized.webp({ quality: 78, effort: 5 }).toFile(o.file);
    else await resized.flatten({ background: '#ffffff' }).jpeg({ quality: 78, mozjpeg: true }).toFile(o.file);
    written++;
  }
  return written;
}

async function logo() {
  const srcPath = path.join(SRC, 'logo.png');
  const targets = [
    { file: 'logo-mark-160.webp', size: 160, fmt: 'webp' },
    { file: 'logo-mark-480.webp', size: 480, fmt: 'webp' },
    { file: 'favicon-32.png', size: 32, fmt: 'png', square: true },
    { file: 'favicon-192.png', size: 192, fmt: 'png', square: true },
    { file: 'apple-touch-icon.png', size: 180, fmt: 'png', square: true, opaque: true },
  ];
  let written = 0;
  for (const t of targets) {
    const out = path.join(OUT, t.file);
    if (await isFresh(srcPath, out)) continue;
    let img = sharp(srcPath).extract(MARK);
    img = t.square
      ? img.resize(t.size, t.size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      : img.resize({ width: t.size });
    if (t.opaque) img = img.flatten({ background: '#FBFAFC' });
    await (t.fmt === 'webp' ? img.webp({ quality: 88, alphaQuality: 90 }) : img.png({ compressionLevel: 9 })).toFile(out);
    written++;
  }
  return written;
}

await fs.mkdir(OUT, { recursive: true });
const counts = await Promise.all([...photos.map(photo), logo()]);
const total = counts.reduce((a, b) => a + b, 0);
console.log(total ? `optimize-images: wrote ${total} file(s) to ${OUT}` : 'optimize-images: up to date');
