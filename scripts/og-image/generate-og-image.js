/**
 * Generates a static 1200x630 Open Graph / Twitter share image at
 * public/images/og-image.png, composed from the site's profile photo and
 * brand colors (Tableau Color Blind palette, dark theme background).
 *
 * Run: node scripts/og-image/generate-og-image.js
 * Requires: npm install sharp (devDependency)
 */
const path = require('path')
const fs = require('fs')

const projectRoot = path.resolve(__dirname, '../..')
const profilePath = path.join(projectRoot, 'public', 'images', 'profile.jpg')
const outPath = path.join(projectRoot, 'public', 'images', 'og-image.png')

const WIDTH = 1200
const HEIGHT = 630
const PHOTO_SIZE = 360
const PHOTO_CENTER_X = 950
const PHOTO_CENTER_Y = HEIGHT / 2

// Tableau Color Blind palette (matches app/globals.css dark theme).
const COLORS = {
  bgPrimary: '#0b1220',
  bgSecondary: '#111a2e',
  accentOrange: '#fc7d0b',
  accentBlue: '#5fa2ce',
  accentBlueDark: '#1170aa',
  textPrimary: '#e5e7eb',
  peach: '#ffbc79',
}

function buildBackgroundSvg() {
  return `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${COLORS.bgPrimary}" />
      <stop offset="100%" stop-color="${COLORS.bgSecondary}" />
    </linearGradient>
    <radialGradient id="nebula1" cx="15%" cy="20%" r="55%">
      <stop offset="0%" stop-color="${COLORS.accentOrange}" stop-opacity="0.22" />
      <stop offset="100%" stop-color="${COLORS.accentOrange}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="nebula2" cx="85%" cy="80%" r="60%">
      <stop offset="0%" stop-color="${COLORS.accentBlue}" stop-opacity="0.18" />
      <stop offset="100%" stop-color="${COLORS.accentBlue}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="nameGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${COLORS.textPrimary}" />
      <stop offset="55%" stop-color="${COLORS.accentOrange}" />
      <stop offset="100%" stop-color="${COLORS.accentBlue}" />
    </linearGradient>
    <linearGradient id="photoRing" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${COLORS.accentOrange}" />
      <stop offset="100%" stop-color="${COLORS.accentBlueDark}" />
    </linearGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="18" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#nebula1)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#nebula2)" />

  <!-- Subtle starfield -->
  ${Array.from({ length: 40 })
    .map(() => {
      const x = Math.round(Math.random() * WIDTH)
      const y = Math.round(Math.random() * HEIGHT)
      const r = Math.random() < 0.7 ? 1 : 1.6
      const opacity = (0.3 + Math.random() * 0.5).toFixed(2)
      return `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" opacity="${opacity}" />`
    })
    .join('\n  ')}

  <!-- Text block -->
  <text x="80" y="245" font-family="DejaVu Sans Mono, monospace" font-size="24" letter-spacing="2"
        fill="${COLORS.accentOrange}" font-weight="bold">PRODUCT MANAGER &amp; SOFTWARE DESIGNER</text>

  <text x="76" y="335" font-family="DejaVu Sans, sans-serif" font-size="78" font-weight="bold"
        fill="url(#nameGradient)">Thomas Bohn</text>

  <text x="80" y="395" font-family="DejaVu Sans Mono, monospace" font-size="28" letter-spacing="1"
        fill="${COLORS.accentBlue}">thomaslbohn.com</text>

  <rect x="80" y="430" width="460" height="3" fill="url(#photoRing)" opacity="0.7" />

  <!-- Photo frame / glow ring -->
  <circle cx="${PHOTO_CENTER_X}" cy="${PHOTO_CENTER_Y}" r="${PHOTO_SIZE / 2 + 14}"
          fill="none" stroke="url(#photoRing)" stroke-width="6" filter="url(#glow)" opacity="0.85" />
</svg>`
}

async function main() {
  let sharp
  try {
    sharp = require('sharp')
  } catch {
    console.error('sharp is required. Run: npm install sharp --save-dev')
    process.exit(1)
  }

  if (!fs.existsSync(profilePath)) {
    console.error('Profile photo not found at', profilePath)
    process.exit(1)
  }

  const backgroundSvg = Buffer.from(buildBackgroundSvg())
  const background = await sharp(backgroundSvg).png().toBuffer()

  // Circular mask for the profile photo.
  const circleMask = Buffer.from(
    `<svg width="${PHOTO_SIZE}" height="${PHOTO_SIZE}"><circle cx="${PHOTO_SIZE / 2}" cy="${PHOTO_SIZE / 2}" r="${PHOTO_SIZE / 2}" fill="#fff" /></svg>`
  )

  const roundedPhoto = await sharp(profilePath)
    .resize(PHOTO_SIZE, PHOTO_SIZE, { fit: 'cover' })
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer()

  await sharp(background)
    .composite([
      {
        input: roundedPhoto,
        left: Math.round(PHOTO_CENTER_X - PHOTO_SIZE / 2),
        top: Math.round(PHOTO_CENTER_Y - PHOTO_SIZE / 2),
      },
    ])
    .png()
    .toFile(outPath)

  console.log('Wrote', outPath)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
