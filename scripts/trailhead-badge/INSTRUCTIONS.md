# Trailhead Metadata Extraction Instructions

This guide walks you through extracting Trailhead metadata from your Salesforce Trailblazer profile. **Note: This extracts metadata only (certifications, rank, Agentblazer status), not badge images.**

## Prerequisites

- Access to https://www.salesforce.com/trailblazer/thomasbohn
- A modern web browser (Chrome, Firefox, Edge, etc.)
- Node.js installed (for processing scripts)

## Step 1: Extract Badge Data from Browser

1. **Open your Trailblazer profile**:
   - Navigate to: https://www.salesforce.com/trailblazer/thomasbohn
   - Wait for the page to fully load

2. **Scroll to see all profile information**:
   - Scroll down the page to ensure all profile sections are visible
   - Look for sections showing certifications, rank, and Agentblazer status

3. **Open Browser Console**:
   - Press `F12` or `Right-click > Inspect > Console`
   - Or use `Ctrl+Shift+J` (Windows/Linux) or `Cmd+Option+J` (Mac)

4. **Run the extraction script**:
   - Open `scripts/trailhead-badge/browser-extract-trailhead.js`
   - Copy the entire contents of the file
   - Paste into the browser console
   - Press `Enter`

5. **Copy the JSON output**:
   - The script will output JSON data
   - Look for the section marked `=== COPY THE JSON BELOW ===`
   - Copy everything from that marker to `=== END OF JSON ===`
   - Save it to `data/badges/trailhead/raw.json`

## Step 2: Process the Raw Data

1. **Run the processing script**:
   ```bash
   node scripts/trailhead-badge/process-trailhead-badges.js
   ```

2. **What this does**:
   - Reads `data/badges/trailhead/raw.json`
   - Validates and normalizes the metadata
   - Creates `data/badges/trailhead/cached.json` with processed metadata
   - Provides validation warnings if expected values are not found

3. **Check the output**:
   - Review the console output for validation warnings
   - Expected values:
     - Certification Count: 22
     - Agentblazer Statuses: 2025, 2026
     - Trailhead Rank: Should include "Ranger"

## Step 3: Organize Badges into Learning Data

1. **Run the organization script**:
   ```bash
   node scripts/trailhead-badge/organize-trailhead-badges.js
   ```

2. **What this does**:
   - Reads `data/badges/trailhead/cached.json`
   - Updates the Salesforce Core Platform group in `data/learning/learning.json`
   - Updates metadata:
     - Trailhead Ranger (rank)
     - Certifications (count: 22)
     - Agentblazer 2025 (status)
     - Agentblazer 2026 (status)

3. **Verify the results**:
   - Check `data/learning/learning.json`
   - The Salesforce Core Platform group metadata should be updated with:
     - Trailhead Ranger status
     - Certification count (22)
     - Agentblazer 2025: Active
     - Agentblazer 2026: Active

## Troubleshooting

### No metadata extracted
- Make sure you've scrolled to see all profile sections
- Check that the page has fully loaded
- Try refreshing the page and running the script again
- You may need to manually add metadata to `raw.json` if extraction fails

### Metadata not extracted correctly
- The metadata extraction relies on finding specific text patterns
- You may need to manually add metadata to `raw.json`:
  ```json
  "metadata": {
    "trailheadRank": "All Star Ranger",
    "certificationCount": 22,
    "agentblazerStatuses": ["2025", "2026"]
  }
  ```
- Then re-run the processing script

## Expected Output

After completing all steps, you should have:

- `data/badges/trailhead/raw.json` - Raw extracted metadata
- `data/badges/trailhead/cached.json` - Processed metadata
- Updated `data/learning/learning.json` with Trailhead metadata in Salesforce group:
  - Trailhead Ranger: [rank status]
  - Certifications: 22
  - Agentblazer 2025: Active
  - Agentblazer 2026: Active

## Next Steps

- Review the updated learning.json to ensure all badges are included
- Check that metadata is accurate (badge counts, Ranger status, etc.)
- Test the website to see badges displayed on the Certifications page
