# Icon generation

Generates PNG icons from the source SVG for web and PWA use.

## Usage

From the project root:

```bash
npm run generate:icons
```

Requires `sharp` (devDependency). The script reads `public/icons/icon.svg` and writes:

- `public/icons/apple-touch-icon.png` (180×180)
- `public/icons/android-chrome-192x192.png` (192×192)
- `public/icons/android-chrome-512x512.png` (512×512)

Run after editing the SVG to refresh all PNGs.
