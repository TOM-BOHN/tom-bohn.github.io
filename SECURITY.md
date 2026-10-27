# Security Policy

## Supported versions

This repository publishes a static site to GitHub Pages. Security fixes land on the `sandbox` branch first, then promote to `main` for production deploy.

| Branch | Status |
|--------|--------|
| `main` | Production (GitHub Pages) |
| `sandbox` | Integration / pre-production |

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security-sensitive reports.

Email **bohn.tl@gmail.com** with:

- A short description of the issue and impact
- Steps to reproduce (or a proof of concept if available)
- Affected URL(s) or repository paths, if known

You should receive an acknowledgment within a few days. Please allow reasonable time for investigation and a fix before any public disclosure.

## Scope notes

- This is a **static** Next.js export (`output: 'export'`). There is no server-side application runtime or database in production.
- Dependency updates are managed with Dependabot (`.github/dependabot.yml`), targeting `sandbox`. After bumps, run `npm audit` and `npm run build`.
- Intentionally pinned / ignored updates: Tailwind CSS majors (stay on v3) and `react-icons` above 5.5.0 (see `AGENTS.md`).
