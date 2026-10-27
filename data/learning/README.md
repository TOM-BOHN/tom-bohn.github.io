# Learning / Certifications Data

Source of truth for the Certifications & Learning page (`/certifications`).

## What it powers

- **Education** — schools and degrees
- **What I've Accomplished** — certification groups with badge images and metadata
- **What I'm Planning** — interactive learning goals checklist

## Files

| Path | Role |
|------|------|
| `data/learning/learning.json` | Education, `accomplished` groups, `planning` goals |
| `lib/hub.ts` | Types + `getLearningData()` |
| `components/hub/LearningSection.tsx` | Page section container |
| `components/hub/CertificationGroup.tsx` | Badge group UI |
| `components/hub/LearningGoals.tsx` | Goals checklist UI |
| `components/hub/Education.tsx` | Education entries |

## Updating badges

1. Run the appropriate pipeline under `scripts/credly-badge`, `scripts/accredible-badge`, or `scripts/trailhead-badge` (see each folder’s `INSTRUCTIONS.md`).
2. Place or refresh images under `public/badges/`.
3. Point `badgeImages[].src` (and optional `url`) in `learning.json` at those assets.

## Notes

- Goal completion is client-side only (resets on refresh) unless you persist it elsewhere.
- Types for certification groups and goals are defined once in `lib/hub.ts` and re-exported from the components that consume them.
