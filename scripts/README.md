# Scripts Directory

Build and data scripts for content sync and badge/credential processing.

## Structure

| Folder | Purpose |
|--------|---------|
| `blog/` | Medium → `content/blog/` + homepage featured articles (`npm run sync:medium`) |
| `icons/` | Favicon / PWA PNG generation (`npm run generate:icons`) |
| `og-image/` | Open Graph image generation (`npm run generate:og-image`) |
| `credly-badge/` | Credly badge extract / process / organize |
| `accredible-badge/` | Accredible (credential.net) pipeline |
| `trailhead-badge/` | Trailhead metadata pipeline |
| `_shared/` | Shared helpers (`download-image.js`, `fs-json.js`) used by badge processors |

Each badge platform folder should include `README.md`, `INSTRUCTIONS.md`, and the platform scripts.

## Shared helpers

```js
const { fromRoot, readJson, writeJson } = require('../_shared/fs-json')
const { downloadImage, sanitizeFilename } = require('../_shared/download-image')
```

Prefer `fromRoot(...)` over mixing `process.cwd()` and `__dirname` so scripts behave the same no matter which directory you launch them from (always prefer running from the repo root).

## Adding a Platform

```
scripts/
└── platform-name/
    ├── README.md
    ├── INSTRUCTIONS.md
    └── [script files]
```

Pair with `data/badges/<platform>/` for raw/cached JSON.
