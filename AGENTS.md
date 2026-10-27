# Agent instructions — tom-bohn.github.io

Personal site: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS **3**, static export to GitHub Pages (`thomaslbohn.com`).

## Hard gates

- PRs target **`sandbox`**, never push straight to `main`.
- Required check: `npm run build` (static export → `out/`). `npm run lint` is informational only.
- Promotion: merge to `sandbox` → CI may open **sandbox → main** for human review → merge to `main` deploys. Details: `.cursor/rules/sandbox-to-main-promotion.mdc`.
- Cloud Agent build/UI screenshot process: `CLOUD.md`.

## Architecture map

| Area | Path | Notes |
|------|------|--------|
| Routes | `app/` | Home, about, blog, certifications, contact, hub, links, projects, v2me |
| UI | `components/` | Feature folders (`hub/`, `links/`, `projects/`, `v2me/`, `xanga/`) + shared chrome |
| Shared chrome | `PageShell`, `PageHeader`, `ExpandCollapseControls` | Prefer these over copying stars/nebula + ⟩ TITLE blocks |
| Data loaders | `lib/` | Thin JSON/Markdown loaders; shared `lib/json.ts` `readJsonFile` |
| Site JSON | `data/` | Hub, learning, links, projects, v2me, badges, Medium homepage |
| Blog posts | `content/blog/` | Markdown + frontmatter; sync via `npm run sync:medium` |
| Scripts | `scripts/` | Medium, icons/OG, badge pipelines; shared helpers in `scripts/_shared/` |
| Static assets | `public/` | Icons, images, badges, education |

### Data ownership (don’t invent parallel files)

- Certifications & learning → `data/learning/learning.json` (+ `getLearningData()` in `lib/hub.ts`)
- Hub → `data/hub/hub.json`
- Links → `data/links.json`
- Projects → `data/projects.json` (themes + artifacts)
- V2ME → `data/v2me.json` (`vision` is an **object** `{ id, title, description }`; legacy string vision is migrated on load)
- There is no live `data/certifications.json` / `lib/certifications.ts` — removed as dead code

### V2ME

- List sections (Values / Methods / Obstacles / Measures) share `components/v2me/SortableMarkdownListSection.tsx`; keep wrappers thin.
- Page-level expand/collapse uses **React state + incrementing tokens** (`expandItemsToken` / `collapseItemsToken`) — do not reintroduce `window` CustomEvents.
- JSON upload must accept object-shaped `vision`, not only legacy strings.

## Dependency footguns

Configured in `.github/dependabot.yml` (targets `sandbox`):

- **Tailwind**: stay on **v3**. Majors ignored — v4 broke the build when Dependabot applied it (#79 / #81).
- **react-icons**: pin **5.5.0**. 5.6+ removed Simple Icons brands used by Links/Hub (`SiTableau`, `SiSalesforce`, `SiSlack`, `SiOpenai`, `SiAmazon`, `SiDbt`, …). Don’t bump without migrating those call sites to Fa/Fa6 (or equivalent).
- GitHub Actions updates are **grouped** monthly; Action **majors** are ignored.

## Content / automation pointers

- Medium blog sync workflow: `.cursor/rules/medium-blog-sync.mdc` + `npm run sync:medium`
- Badge pipelines: `npm run badges:credly` / `badges:accredible` / `badges:trailhead` (see `scripts/README.md`)
- Human docs: `SITE.md` (site reader), `README.md`, `CONTRIBUTING.md`, `QUICKSTART.md`, `DEPLOYMENT.md`, `SECURITY.md`
- Runtime: Node **20+** (`.nvmrc`, `engines`); TypeScript **5.9** (do not bump to 6+/7 while `eslint-config-next` peers require `<6.1`)

## Prefer when editing UI

- Reuse `PageShell` + `PageHeader` for page chrome.
- Reuse `ExpandCollapseControls` for expand/collapse button pairs.
- Prefer types from `lib/*` over re-declaring the same interfaces in components.
