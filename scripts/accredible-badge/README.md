# Accredible Badge Extraction Scripts

Scripts for extracting and processing Accredible (credential.net) badge data from digital credential wallets.

## Directory Structure

```
scripts/accredible-badge/
├── browser-extract-accredible.js    # Browser console script for manual extraction
├── process-accredible-badges.js     # Process raw data and download images
├── organize-accredible-badges.js    # Organize badges into learning.json
├── INSTRUCTIONS.md                 # Detailed step-by-step instructions
└── README.md                       # This file

data/badges/accredible/
├── raw.json                        # Raw extracted data from browser
└── cached.json                     # Processed badge data with local paths

public/badges/accredible/
└── [badge-images].png              # Downloaded badge images
```

## Workflow

1. **Extract Data** (Manual): Run `browser-extract-accredible.js` in browser console
2. **Process Badges**: Run `node scripts/accredible-badge/process-accredible-badges.js`
3. **Organize Data**: Run `node scripts/accredible-badge/organize-accredible-badges.js`

## What Gets Extracted

- **Badges/Credentials**: All digital credentials from Accredible wallet
- **Metadata**:
  - Credential names and descriptions
  - Issue dates
  - Issuing organizations
  - Credential images
  - Verification URLs

## See Also

- `INSTRUCTIONS.md` for detailed step-by-step instructions
- `scripts/credly-badge/` for similar Credly badge extraction workflow
- `scripts/trailhead-badge/` for Trailhead metadata extraction workflow
