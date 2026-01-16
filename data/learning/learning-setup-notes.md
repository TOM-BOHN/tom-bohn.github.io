# Learning Section Setup Notes

## Badge Images

Badge images should be placed in the `public/badges/` directory. The learning.json file references these images with paths like `/badges/cimp-badge-1.png`.

### Current Badge Image Requirements:

1. **CIMP Badges** (4+ badges needed):
   - `/badges/cimp-badge-1.png`
   - `/badges/cimp-badge-2.png`
   - `/badges/cimp-badge-3.png`
   - `/badges/cimp-badge-4.png`
   - Add more as needed

2. **Salesforce Badges** (18+ badges needed):
   - `/badges/salesforce-badge-1.png`
   - `/badges/salesforce-badge-2.png`
   - Add more as needed

### Badge Image Guidelines:
- Recommended size: 200x200px to 400x400px
- Format: PNG with transparent background preferred
- Aspect ratio: Square (1:1)
- File naming: Use descriptive names that match the certification

## Updating Learning Data

Edit `data/learning/learning.json` to:
1. Add new certification groups to the `accomplished` array
2. Update badge image paths
3. Add metadata (certification counts, Trailhead status, etc.)
4. Update learning goals in the `planning` array

## Learning Goals Checklist

The learning goals support:
- Title and description
- Completion status (checkbox)
- Target date
- Notes
- Progress tracking (automatic based on completed items)

Goals are stored in `data/learning/learning.json` and can be toggled in the UI. The completion state is currently stored locally in the browser. To persist across sessions, you may want to implement backend storage or localStorage.

## Metadata Fields

Certification groups can include metadata such as:
- Certification count
- Trailhead Ranger status
- Badge count
- Agentblazer status (2025, 2026, etc.)

Add these in the `metadata` array for each certification group.
