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

Configured in `.github/dependabot.yml` (targets `sandbox`). Prefer opening update PRs; only ignore proven breakages:

- **Tailwind**: majors ignored — v4 broke the PostCSS/`npm run build` path when Dependabot applied it (#77 → fixed in #79). Stay on **v3** until an intentional migration.
- **react-icons**: majors ignored; pin **5.5.0**. 5.6+ removed Simple Icons brands used by Links/Hub (`SiTableau`, `SiSalesforce`, `SiSlack`, `SiOpenai`, `SiAmazon`, `SiDbt`, …). Unblock by migrating those call sites to Fa/Fa6 (or equivalent).
- **TypeScript / `@types/node`**: not ignored. Excluded from the catch-all npm group so majors open as dedicated PRs (avoids #97-style bundling with unrelated bumps). Evaluate on build evidence, not a permanent ignore.
- GitHub Actions updates are **grouped** monthly. Majors are not ignored — review and land them when CI is green.

## Content / automation pointers

- Medium blog sync workflow: `.cursor/rules/medium-blog-sync.mdc` + `npm run sync:medium`
- Badge pipelines: `npm run badges:credly` / `badges:accredible` / `badges:trailhead` (see `scripts/README.md`)
- Human docs: `SITE.md` (site reader), `README.md`, `CONTRIBUTING.md`, `QUICKSTART.md`, `DEPLOYMENT.md`, `SECURITY.md`
- Runtime: Node **20+** (`.nvmrc`, `engines`). TypeScript is currently **5.9**; majors are allowed via dedicated Dependabot PRs — require a green `npm run build` before merging.

## Prefer when editing UI

- Reuse `PageShell` + `PageHeader` for page chrome.
- Reuse `ExpandCollapseControls` for expand/collapse button pairs.
- Prefer types from `lib/*` over re-declaring the same interfaces in components.
