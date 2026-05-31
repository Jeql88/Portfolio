// One-off script to (re)generate favicon assets.
// Run: node scripts/generate-favicon.mjs
import sharp from 'sharp';
import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, '..', 'public');

// "JL" on zinc-950 with rounded corners. Matches OG image palette.
const svg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f1014"/>
      <stop offset="100%" stop-color="#1c1d22"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#bg)" stroke="#3a3b40" stroke-width="1"/>
  <text x="32" y="44" font-family="Inter, system-ui, -apple-system, Segoe UI, Arial, sans-serif" font-size="30" font-weight="700" fill="#fafafa" text-anchor="middle" letter-spacing="-1">JL</text>
</svg>
`.trim();

// Inline SVG: best for modern browser tabs (sharp at any zoom)
await writeFile(resolve(PUBLIC, 'icon.svg'), svg(64));
console.log('Wrote', resolve(PUBLIC, 'icon.svg'));

// 180×180 PNG: iOS "Add to Home Screen"
await sharp(Buffer.from(svg(180)))
  .resize(180, 180)
  .png()
  .toFile(resolve(PUBLIC, 'apple-touch-icon.png'));
console.log('Wrote', resolve(PUBLIC, 'apple-touch-icon.png'));

// 32×32 PNG for legacy fallback (will be served as /favicon.ico)
await sharp(Buffer.from(svg(64)))
  .resize(32, 32)
  .png()
  .toFile(resolve(PUBLIC, 'favicon-32.png'));
console.log('Wrote', resolve(PUBLIC, 'favicon-32.png'));
