---
name: dependabot-upgrade
description: >-
  Work through Dependabot / dependency upgrade PRs for this site: try the bump,
  merge when green, or open a tracking issue and a dedicated migration PR when
  it breaks. Use whenever Dependabot PRs, package upgrades, or dependabot.yml
  ignores are in scope — never leave a broken upgrade as a forever-ignore.
---

# Dependabot / dependency upgrade workflow

## Goal

Keep dependencies current for security and freshness. A failed upgrade is a
**migration with a tracked exit**, not a permanent ignore.

## When to use

- Open Dependabot PRs (npm or GitHub Actions)
- User asks to “work through dependabot updates”
- Adding/changing entries in `.github/dependabot.yml`
- A dependency bump fails `npm run build` or CI

## Hard rules

1. PRs target **`sandbox`**. Required gate: `npm run build`. Lint is informational.
2. **Never** add a Dependabot `ignore` without an open tracking issue that has
   acceptance criteria and a path to remove the ignore.
3. **Never** close a failing upgrade as “won’t update.” Open an issue, then fix
   in a dedicated migration PR that closes it (`Fixes #N`).
4. Prefer **dedicated PRs** for majors / migrations. Do not bury breakers inside
   unrelated grouped bumps (take the safe subset; track the rest).
5. Ignores must be as narrow as possible (`update-types: semver-major` when the
   break is major-only) and must cite `#N` in the `dependabot.yml` comment.

## Happy path (upgrade works)

1. Read the Dependabot PR diff (`package.json` / lockfile / Actions pins).
2. On a feature branch from latest `sandbox`, apply the bump (or check out the
   Dependabot branch and validate).
3. Run `npm install` (if npm) then `npm run build`. Optionally `npm audit`.
4. If green: merge path is a PR into `sandbox` (or approve the Dependabot PR).
5. For **grouped** PRs that mix good and bad updates: land the safe subset in a
   superseding PR; do **not** merge the red group as-a-whole.

## Break path (upgrade fails)

```text
Dependabot / bump PR
    → npm install && npm run build (or Actions workflow)
    → FAIL
         1. Comment on the PR with the failure excerpt (command + error)
         2. Open a GitHub issue with the blocked-dependency-upgrade template
         3. Close or leave unmerged the red Dependabot PR (do not merge red)
         4. Only if drive-by Dependabot would keep re-opening the same breaker:
            add a narrow ignore in dependabot.yml with comment `# tracking: #N`
         5. Implement the migration on `cursor/<pkg>-upgrade-…` targeting sandbox
         6. Migration PR: Fixes #N, removes the ignore, build green
```

### Issue requirements

Use `.github/ISSUE_TEMPLATE/blocked-dependency-upgrade.yml` (or equivalent body):

| Section | Required content |
|---------|------------------|
| Package / from → to | Exact versions |
| Failure evidence | Command + error excerpt; link Dependabot PR |
| Blast radius | Files / features likely touched |
| Acceptance criteria | Checklist including: build green, remove ignore, `Fixes #N` |
| Temporary ignore? | Yes/no and scope (e.g. majors only) |

Title pattern: `migrate: <package> <from> → <to>`.

Label: `dependencies`.

### Temporary ignore checklist

Before editing `.github/dependabot.yml`:

- [ ] Tracking issue is open and linked in the YAML comment (`# tracking: #N`)
- [ ] Ignore is scoped (prefer `semver-major`, not all updates)
- [ ] `AGENTS.md` / `SECURITY.md` footguns list cites the same `#N`
- [ ] Issue acceptance criteria include removing the ignore

### Migration PR checklist

- [ ] Branch from `sandbox`; PR targets `sandbox`
- [ ] Body references the issue; include `Fixes #N`
- [ ] Removes the matching `ignore` (and group exclude if no longer needed)
- [ ] `npm run build` green; for UI-facing migrations follow `CLOUD.md` screenshots
- [ ] Does not reintroduce a forever pin without a new tracking issue

## Grouped updates

Catch-all group `npm_and_yarn` excludes packages that need solo review
(`tailwindcss`, `typescript`, `@types/node`) — see `.github/dependabot.yml`.
Excluding from a group is **not** an ignore: Dependabot still opens PRs; they
are just not bundled with unrelated bumps.

When a group PR contains one breaker:

1. Land safe members in a superseding PR.
2. Open/track the breaker via the break path above.
3. Comment on the Dependabot PR with the superseding PR + tracking issue links.

## Current tracked ignores

These must stay linked to open issues until migrated:

| Package | Scope | Tracking |
|---------|-------|----------|
| `tailwindcss` | majors | #102 |
| `typescript` | majors | #109 |

If you find an ignore **without** an open tracking issue, open one before any
other work on that package.

## Out of scope

- Do not push to `main` or merge sandbox→main promotion PRs unless asked.
- Do not “fix” a failed major by only widening an ignore.
- Do not migrate Tailwind v4 or react-icons icons inside an unrelated feature PR.
