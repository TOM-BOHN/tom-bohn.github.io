# Site reader

Orientation for humans (and agents) reading this repository and the live site at [thomaslbohn.com](https://thomaslbohn.com).

## Live pages

| Path | Purpose | Primary data / content |
|------|---------|------------------------|
| `/` | Home — intro + featured Medium articles | `data/medium-homepage.json` |
| `/about` | Background and narrative | `app/about/page.tsx` |
| `/blog` | Post index | `content/blog/*.md` via `lib/blog.ts` |
| `/blog/[slug]` | Individual post | same |
| `/contact` | Email / LinkedIn | `app/contact/page.tsx` |
| `/hub` | Linktree-style presence | `data/hub/hub.json` |
| `/links` | Tools & docs directory | `data/links.json` |
| `/certifications` | Education, credentials, goals | `data/learning/learning.json` |
| `/projects` | Theme → artifact portfolio | `data/projects.json` |
| `/v2me` | Interactive V2MOM planner | `data/v2me.json` (+ in-browser edit/export) |

Themes: light, dark, and Xanga (header tray). Preference is stored in `localStorage`.

## Doc map (start here)

| Doc | When to use it |
|-----|----------------|
| [README.md](./README.md) | Product overview, stack, branching, content table |
| [QUICKSTART.md](./QUICKSTART.md) | Fastest path to run and edit content |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Setup, PR target (`sandbox`), content schemas |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Pages deploy, DNS, HTTPS |
| [SECURITY.md](./SECURITY.md) | Vulnerability reporting |
| [AGENTS.md](./AGENTS.md) | Cursor/Cloud agent invariants and footguns |
| [CLOUD.md](./CLOUD.md) | Cloud Agent build / screenshot workflow |
| [data/README.md](./data/README.md) | JSON layout under `data/` |
| [scripts/README.md](./scripts/README.md) | Medium sync, icons/OG, badge pipelines |

## Branching in one line

Work lands on **`sandbox`** → CI build gate → human-reviewed **sandbox → main** promotion → GitHub Pages deploy from **`main`**.

## Shared UI building blocks

Prefer these over copying page chrome:

- `components/PageShell.tsx` — stars/nebula + content column
- `components/PageHeader.tsx` — role typewriter + ⟩ TITLE + actions
- `components/ExpandCollapseControls.tsx` — expand/collapse control pair

Page-level expand/collapse is **React state / tokens** (Hub, Links, Learning, Projects, V2ME), not `window` CustomEvents.
