# Badge Extraction Instructions

Since automated scraping didn't work (Credly may have anti-bot protection), here's how to extract your badges manually:

## Quick Method: Browser Console

1. **Visit your Credly profile**: https://www.credly.com/users/thomasbohn

2. **Open Browser Console**:
   - Press `F12` or `Ctrl+Shift+J` (Windows) / `Cmd+Option+J` (Mac)
   - Or Right-click > Inspect > Console tab

3. **Run the extraction script**:
   - Open `browser-extract-badges.js` in this directory
   - Copy the ENTIRE contents
   - Paste into the browser console
   - Press Enter

4. **Copy the JSON output** that appears in the console

5. **Save the data**:
   - Paste the JSON into `data/badges/credly/raw.json`
   - Or run: `node scripts/credly-badge/process-manual-badges.js "<paste-json-here>"`

6. **Process the badges**:
   ```bash
   node scripts/credly-badge/process-manual-badges.js
   ```

This will:
- Download all badge images to `public/badges/`
- Create structured metadata in `data/badges/credly/cached.json`
- Show a summary of your badges

## Alternative: Manual Collection

If the browser script doesn't work, you can manually collect badge data:

1. For each badge on your Credly profile:
   - Click on the badge
   - Right-click the badge image > "Save image as..." > Save to `public/badges/`
   - Note down:
     - Badge name
     - Issuer
     - Issue date
     - Badge URL

2. Create entries in `data/badges/credly/raw.json`:
```json
[
  {
    "id": "badge-1",
    "name": "Salesforce Certified Administrator",
    "issuer": "Salesforce",
    "imageUrl": "https://images.credly.com/...",
    "issueDate": "2024-01-15",
    "description": "Badge description",
    "credlyUrl": "https://www.credly.com/badges/..."
  }
]
```

3. Run the processing script:
```bash
node scripts/credly-badge/process-manual-badges.js
```

## After Processing

Once badges are cached, organize them into certification groups:

```bash
node scripts/credly-badge/organize-badges.js
```

This will:
- Deduplicate badges
- Organize by category (Tableau, Salesforce, CIMP, etc.)
- Update `data/learning/learning.json` with organized badge groups
- Save organized data to `data/badges/credly/organized.json`

## Need Help?

If you run into issues:
- Check that the JSON is valid (use a JSON validator)
- Make sure image URLs are accessible
- Verify badge names and issuers are correct
