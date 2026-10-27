# tom-bohn.github.io

Personal website built with Next.js, React, and TypeScript, featuring a modern design with a nostalgic Xanga mode toggle. Designed and implemented with the help of [Cursor AI](https://cursor.com).

## Live Site

Visit the site at [thomaslbohn.com](https://thomaslbohn.com)

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16 (App Router, static export)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React](https://react.dev/) 19 + [Tailwind CSS](https://tailwindcss.com/) 3
- **Icons**: [react-icons](https://react-icons.github.io/react-icons/)
- **Content**: Markdown with [remark](https://remark.js.org/) / [react-markdown](https://github.com/remarkjs/react-markdown); HTML sanitized with [sanitize-html](https://github.com/apostrophecms/sanitize-html)
- **Drag & drop**: [@dnd-kit](https://dndkit.com/) (V2ME reordering)
- **Deployment**: GitHub Pages via GitHub Actions (`sandbox` → `main` promotion, then deploy)

## Features

- **Home** — Introduction and featured Medium articles
- **About** — Professional background and personal highlights
- **Blog** — Markdown posts with Medium sync
- **Contact** — Email and LinkedIn
- **Projects** — Theme-based portfolio with expand/collapse controls
- **Links** — Curated directory of tools and docs
- **Certifications & Learning** — Credentials, education, and learning goals
- **Hub** — Linktree-style online presence
- **V2ME** — Interactive V2MOM-style planner (Vision, Values, Methods, Obstacles, Measures) with drag-and-drop, markdown editing, and JSON import/export
- **Xanga Mode** — Nostalgic theme with sidebar applets and SoundCloud player

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → out/
npm run lint     # ESLint (informational in promotion CI)
```

Useful content scripts:

```bash
npm run sync:medium       # Import missing Medium posts + refresh homepage featured links
npm run generate:icons    # Regenerate PWA/favicon PNGs from public/icons/icon.svg
npm run generate:og-image # Regenerate Open Graph image
```

## Project Structure

```
├── app/                  # Next.js App Router pages
├── components/           # React components (hub, links, projects, v2me, xanga, shared chrome)
├── content/blog/         # Markdown blog posts
├── data/                 # JSON data (hub, learning, links, projects, v2me, badges, Medium homepage)
├── lib/                  # Data loaders and shared helpers (json, blog, hub, …)
├── scripts/              # Medium sync, icons/OG, Credly/Accredible/Trailhead badge pipelines
├── public/               # Static assets (icons, images, badges, education)
└── .github/              # Workflows + Dependabot config
```

Shared UI building blocks:

- `components/PageShell.tsx` — stars/nebula backgrounds + content column
- `components/PageHeader.tsx` — role typewriter + ⟩ TITLE + optional actions
- `components/ExpandCollapseControls.tsx` — expand/collapse control pair

## Branching & Deployment

| Branch | Role |
|--------|------|
| `sandbox` | Integration branch for PRs (Dependabot and feature work target here) |
| `main` | Production; deploys to GitHub Pages |

After a PR merges into `sandbox`, `.github/workflows/promote-sandbox-to-main.yml` runs `npm run build`. If the build passes and `sandbox` is ahead of `main`, it opens (or updates) a **sandbox → main** promotion PR for human review. Merging that PR triggers `.github/workflows/deploy.yml`.

See `DEPLOYMENT.md` for custom domain / HTTPS details and `.cursor/rules/sandbox-to-main-promotion.mdc` for the promotion contract.

## Custom Domain

The `CNAME` under `public/` is included in the static export for `thomaslbohn.com`.

## Content Management

| Content | Location |
|---------|----------|
| Blog posts | `content/blog/` (`YYYY-MM-DD-title.md` + frontmatter) |
| Medium sync | `npm run sync:medium` |
| Links | `data/links.json` |
| Hub | `data/hub/hub.json` |
| Learning / certifications | `data/learning/learning.json` |
| Projects | `data/projects.json` |
| V2ME | `data/v2me.json` (also editable in the UI) |
| Badge pipelines | `data/badges/{credly,accredible,trailhead}/` + `scripts/*-badge/` |

## Design System

Custom Tailwind theme with a Tableau color-blind–friendly blue–orange palette, dark/light/Xanga modes, and monospace accents.

## Dependency & Security Maintenance

- Dependabot: `.github/dependabot.yml` — weekly grouped npm updates on `sandbox`; **Tailwind CSS major bumps are ignored** (v4 is a breaking migration; keep on v3 until an intentional upgrade).
- After dependency changes, run `npm audit` and `npm run build`.
- Prefer merging Dependabot PRs into `sandbox`, never directly to `main`.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup, content workflows, and PR expectations. Quick orientation: [QUICKSTART.md](./QUICKSTART.md). Cloud agent notes: [CLOUD.md](./CLOUD.md). Architecture and agent invariants for Cursor/Cloud sessions: [AGENTS.md](./AGENTS.md).

## License

All rights reserved. This is a personal website and portfolio.

---

**Built with help from [Cursor AI](https://cursor.com)**
