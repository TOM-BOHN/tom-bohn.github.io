# Trailhead Badge Extraction Scripts

Scripts for extracting and processing Trailhead badge data from Salesforce Trailblazer profiles.

## Directory Structure

```
scripts/trailhead-badge/
├── browser-extract-trailhead.js    # Browser console script for manual extraction
├── process-trailhead-badges.js     # Process raw data and download images
├── organize-trailhead-badges.js    # Organize badges into learning.json
├── INSTRUCTIONS.md                 # Detailed step-by-step instructions
└── README.md                       # This file

data/badges/trailhead/
├── raw.json                        # Raw extracted data from browser
└── cached.json                     # Processed badge data with local paths

public/badges/trailhead/
└── [badge-images].png              # Downloaded badge images
```

## Workflow

1. **Extract Data** (Manual): Run `browser-extract-trailhead.js` in browser console
2. **Process Badges**: Run `node scripts/trailhead-badge/process-trailhead-badges.js`
3. **Organize Data**: Run `node scripts/trailhead-badge/organize-trailhead-badges.js`

## What Gets Extracted

- **Metadata Only** (no badge images):
  - Trailhead Rank (Ranger status) - 1 value
  - Certification Count - 22 certifications
  - Agentblazer Statuses - 2 statuses (2025, 2026)

## See Also

- `INSTRUCTIONS.md` for detailed step-by-step instructions
- `scripts/credly-badge/` for similar Credly badge extraction workflow
