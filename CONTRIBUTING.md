# Contributing

This is a personal website, but suggestions and bug reports are welcome via issues or pull requests.

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

Before opening a PR, run:

```bash
npm run build
```

`npm run build` is the hard gate used by promotion CI. `npm run lint` is informational and may report pre-existing findings unrelated to your change.

## Tech Stack

- **Framework**: Next.js 16 (App Router, `output: 'export'`)
- **Language**: TypeScript
- **UI**: React 19 + Tailwind CSS 3
- **Icons**: react-icons
- **Content**: Markdown (remark / react-markdown) with sanitize-html
- **Drag & Drop**: @dnd-kit (V2ME)
- **Fonts**: Next.js font optimization (Open Sans)

## Branching

1. Branch from `sandbox` (not `main`).
2. Open PRs targeting **`sandbox`**.
3. After merge, automation validates the build and may open a **sandbox → main** promotion PR for human review. Do not push to `main` or merge the promotion PR unless you own production releases.

Dependabot also targets `sandbox`. Tailwind CSS major updates are intentionally ignored in Dependabot config.

## Project Structure

```
tom-bohn.github.io/
├── app/                  # App Router pages (about, blog, certifications, contact, hub, links, projects, v2me)
├── components/           # Feature folders + shared PageShell / PageHeader / ExpandCollapseControls
├── lib/                  # JSON/Markdown loaders (blog, hub/learning, links, projects, v2me, json helper)
├── data/                 # Site JSON (hub, learning, links, projects, v2me, badges, medium-homepage)
├── content/blog/         # Markdown posts
├── scripts/              # Medium sync, icons/OG, badge pipelines (+ scripts/_shared helpers)
├── public/               # Static assets
└── .github/              # deploy + promote-sandbox-to-main workflows, dependabot.yml
```

## Adding Content

### Blog Posts

- Create markdown in `content/blog/` as `YYYY-MM-DD-title.md`
- Frontmatter: `title`, `date`, `excerpt`, optional `mediumUrl`
- Or sync from Medium: `npm run sync:medium`

### Projects

Edit `data/projects.json` (theme → artifacts structure). Legacy flat arrays are ignored by the loader.

### Links

Edit `data/links.json` (category → link arrays).

### Certifications & Learning

Edit `data/learning/learning.json` (education, accomplished certification groups, planning goals).  
Badge images live under `public/badges/`; Credly / Accredible / Trailhead pipelines are under `scripts/*-badge/` (see `scripts/README.md` and each folder’s `INSTRUCTIONS.md`).

### Hub

Edit `data/hub/hub.json`.

### V2ME

Edit `data/v2me.json`, or use the on-page editor and JSON download/upload.  
`vision` is an object `{ id, title, description }` (legacy string vision is migrated on load).

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run sync:medium` | Import missing Medium posts + refresh homepage featured links |
| `npm run generate:icons` | Rebuild favicon / PWA PNGs |
| `npm run generate:og-image` | Rebuild Open Graph image |

Badge processors (run from repo root):

```bash
node scripts/credly-badge/process-manual-badges.js
node scripts/accredible-badge/process-accredible-badges.js
node scripts/trailhead-badge/process-trailhead-badges.js
```

Shared helpers: `scripts/_shared/download-image.js`, `scripts/_shared/fs-json.js`.

## Building for Production

```bash
npm run build
```

Static files land in `out/` for GitHub Pages. See `DEPLOYMENT.md` for domain and HTTPS setup.
