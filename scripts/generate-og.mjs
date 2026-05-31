// One-off script to (re)generate public/og-image.png.
// Run: node scripts/generate-og.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '..', 'public', 'og-image.png');

const W = 1200;
const H = 630;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f1014"/>
      <stop offset="100%" stop-color="#1c1d22"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.25" cy="0.1" r="0.8">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- grid hint -->
  <g stroke="#27282d" stroke-width="1" opacity="0.5">
    <line x1="0" y1="${H - 1}" x2="${W}" y2="${H - 1}"/>
  </g>

  <!-- monogram tag -->
  <g transform="translate(80, 80)">
    <rect width="64" height="32" rx="8" fill="#1c1d22" stroke="#3a3b40"/>
    <text x="32" y="22" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="600" fill="#a1a1aa" letter-spacing="2">JL</text>
  </g>

  <!-- name -->
  <text x="80" y="320" font-family="Inter, system-ui, sans-serif" font-size="92" font-weight="700" fill="#fafafa" letter-spacing="-2">
    Josh Edward Lui
  </text>

  <!-- tagline -->
  <text x="80" y="395" font-family="Inter, system-ui, sans-serif" font-size="36" font-weight="400" fill="#a1a1aa">
    Full-stack Developer · BSIT, Cebu
  </text>

  <!-- chips row -->
  <g transform="translate(80, 470)" font-family="Inter, system-ui, sans-serif" font-size="20" font-weight="500" fill="#e4e4e7">
    <g>
      <rect width="120" height="40" rx="8" fill="#1c1d22" stroke="#3a3b40"/>
      <text x="60" y="26" text-anchor="middle">C# · .NET</text>
    </g>
    <g transform="translate(140, 0)">
      <rect width="100" height="40" rx="8" fill="#1c1d22" stroke="#3a3b40"/>
      <text x="50" y="26" text-anchor="middle">Vue · React</text>
    </g>
    <g transform="translate(260, 0)">
      <rect width="140" height="40" rx="8" fill="#1c1d22" stroke="#3a3b40"/>
      <text x="70" y="26" text-anchor="middle">Azure OpenAI</text>
    </g>
    <g transform="translate(420, 0)">
      <rect width="110" height="40" rx="8" fill="#1c1d22" stroke="#3a3b40"/>
      <text x="55" y="26" text-anchor="middle">PostgreSQL</text>
    </g>
  </g>

  <!-- footer URL -->
  <text x="80" y="585" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="500" fill="#71717a" letter-spacing="2">
    GITHUB.COM/JEQL88
  </text>
</svg>
`;

await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log('Wrote', OUT);
