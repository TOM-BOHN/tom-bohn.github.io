# Open Graph image generator

Builds `public/images/og-image.png` (1200×630) from `public/images/profile.jpg` and the site’s Tableau color-blind palette (dark theme).

## Run

From the repo root:

```bash
npm run generate:og-image
```

Requires `sharp` (devDependency).

## When to regenerate

- After updating `public/images/profile.jpg`
- After changing brand colors used in the share card (`scripts/og-image/generate-og-image.js` `COLORS`)

## Output

`public/images/og-image.png` — referenced by Open Graph / Twitter Card meta in the root layout.
