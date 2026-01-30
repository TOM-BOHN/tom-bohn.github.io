/**
 * Generates PNG icons from public/icons/icon.svg for web and PWA use.
 * Run: node scripts/icons/generate-icons.js
 * Requires: npm install sharp (devDependency)
 */
const path = require('path')
const fs = require('fs')

const projectRoot = path.resolve(__dirname, '../..')
const iconsDir = path.join(projectRoot, 'public', 'icons')
const svgPath = path.join(iconsDir, 'icon.svg')

const sizes = [
  { name: 'apple-touch-icon.png', width: 180, height: 180 },
  { name: 'android-chrome-192x192.png', width: 192, height: 192 },
  { name: 'android-chrome-512x512.png', width: 512, height: 512 },
]

async function main() {
  if (!fs.existsSync(svgPath)) {
    console.error('SVG not found at', svgPath)
    process.exit(1)
  }

  let sharp
  try {
    sharp = require('sharp')
  } catch (e) {
    console.error('sharp is required. Run: npm install sharp --save-dev')
    process.exit(1)
  }

  const svgBuffer = fs.readFileSync(svgPath)

  for (const { name, width, height } of sizes) {
    const outPath = path.join(iconsDir, name)
    await sharp(svgBuffer)
      .resize(width, height)
      .png()
      .toFile(outPath)
    console.log('Wrote', outPath)
  }

  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
