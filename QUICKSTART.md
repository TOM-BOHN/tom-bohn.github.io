# Quick Start Guide

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

3. **Build for production**

   ```bash
   npm run build
   ```

   Static files are written to `out/`.

## Adding Content

### About / Contact

Edit `app/about/page.tsx` and `app/contact/page.tsx` for narrative copy and contact channels.

### Blog Posts

Create markdown in `content/blog/`:

```markdown
---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "A brief description"
mediumUrl: "https://medium.com/@yourusername/your-post-slug"
---

Your content here...
```

Or sync from Medium:

```bash
npm run sync:medium
```

### Projects

Edit `data/projects.json` (themes with nested artifacts).

### Links

Edit `data/links.json` (categories → link objects with `id`, `title`, `url`, optional `description`).

### Certifications & Learning

Edit `data/learning/learning.json`. Use the badge scripts under `scripts/*-badge/` to refresh Credly / Accredible / Trailhead data into `data/badges/` and then wire paths into learning.json.

### Hub

Edit `data/hub/hub.json`.

### V2ME

Edit `data/v2me.json` or use the page UI (drag-and-drop, markdown edit, JSON import/export).

## Themes

The header theme tray supports light, dark, and Xanga modes. Preference is stored in `localStorage`.

## Customization

- Colors / theme tokens: `app/globals.css`
- Tailwind theme extensions: `tailwind.config.ts`
- Shared page chrome: `components/PageShell.tsx`, `components/PageHeader.tsx`

## Tech Stack (short)

Next.js 16 · React 19 · TypeScript · Tailwind CSS 3 · remark / react-markdown · @dnd-kit

## Deployment

Work lands on `sandbox` first. A passing build opens a human-reviewed **sandbox → main** promotion PR; merging to `main` deploys via GitHub Actions. Details: `DEPLOYMENT.md` and `README.md`.

## Built with Cursor AI

Designed and implemented with help from [Cursor AI](https://cursor.com).
