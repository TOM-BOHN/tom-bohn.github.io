# Credly Badge Extraction Scripts

This directory contains scripts for extracting and organizing badges from Credly profiles.

## Workflow

1. **Extract badges from browser** → `browser-extract-badges.js`
2. **Process and cache badges** → `process-manual-badges.js`
3. **Organize into groups** → `organize-badges.js`

## Scripts

### `browser-extract-badges.js`
Browser console script to extract badge data from Credly profile page.
- Copy entire script into browser console on your Credly profile
- Outputs JSON with badge data
- Save output to `data/badges/credly/raw.json`

### `process-manual-badges.js`
Processes raw badge data and downloads images.
- Reads from `data/badges/credly/raw.json`
- Downloads badge images (if accessible)
- Creates `data/badges/credly/cached.json` with structured data
- Shows summary by issuer and status

### `organize-badges.js`
Organizes badges into certification groups and updates learning.json.
- Deduplicates badges
- Categorizes by issuer/type (Tableau, Salesforce, CIMP, etc.)
- Updates `data/learning/learning.json` with organized groups
- Saves organized data to `data/badges/credly/organized.json`

## Usage

See `INSTRUCTIONS.md` in this directory for detailed step-by-step instructions.
