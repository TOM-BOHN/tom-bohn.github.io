# Cloud Agent Instructions

These instructions are for automated changes in this repository. The main
priority is to keep the site building successfully after every change.

## Required checks (always run)

1. Install dependencies (if not already installed):
   - `npm install`
2. Run the production build:
   - `npm run build`

## Build failure workflow (mandatory)

If the build fails, you must:

1. Read the full build output and identify the error source.
2. Fix the error in code or configuration.
3. Re-run `npm run build`.
4. Repeat until the build succeeds.

Do not stop after a failed build. Keep iterating until it passes.

## Notes

- The `export` script is currently the same as `build`, so `npm run build`
  is the canonical check for release readiness.
- If you are only changing content or links, the build is still required.
