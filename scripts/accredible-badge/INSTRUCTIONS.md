# Accredible Credential Extraction Instructions

This guide walks you through extracting credential data from your Accredible (credential.net) wallet.

## Prerequisites

- Access to https://www.credential.net/profile/thomasbohn/wallet
- A modern web browser (Chrome, Firefox, Edge, etc.)
- Node.js installed (for processing scripts)

## Step 1: Extract Credential Data from Browser

1. **Open your Accredible wallet**:
   - Navigate to: https://www.credential.net/profile/thomasbohn/wallet
   - Wait for the page to fully load

2. **Scroll to load all credentials**:
   - Scroll down the page to ensure all credentials are loaded
   - Some pages use lazy loading, so you may need to scroll multiple times
   - Wait for all credential images to appear

3. **Open Browser Console**:
   - Press `F12` or `Right-click > Inspect > Console`
   - Or use `Ctrl+Shift+J` (Windows/Linux) or `Cmd+Option+J` (Mac)

4. **Run the extraction script**:
   - Open `scripts/accredible-badge/browser-extract-accredible.js`
   - Copy the entire contents of the file
   - Paste into the browser console
   - Press `Enter`

5. **Copy the JSON output**:
   - The script will output JSON data
   - Look for the section marked `=== COPY THE JSON BELOW ===`
   - Copy everything from that marker to `=== END OF JSON ===`
   - Save it to `data/badges/accredible/raw.json`

## Step 2: Process the Raw Data

1. **Run the processing script**:
   ```bash
   node scripts/accredible-badge/process-accredible-badges.js
   ```

2. **What this does**:
   - Reads `data/badges/accredible/raw.json`
   - Attempts to download credential images to `public/badges/accredible/`
   - Creates `data/badges/accredible/cached.json` with processed data
   - Falls back to external URLs if image download fails

3. **Check the output**:
   - Review the console output for any download failures
   - If images fail to download, you can manually download them later
   - The script will use external URLs as fallback

## Step 3: Organize Credentials into Learning Data

1. **Run the organization script**:
   ```bash
   node scripts/accredible-badge/organize-accredible-badges.js
   ```

2. **What this does**:
   - Reads `data/badges/accredible/cached.json`
   - Categorizes credentials by issuer/type
   - Updates appropriate groups in `data/learning/learning.json`
   - Adds credentials to existing certification groups (CIMP, Tableau, Salesforce, etc.)

3. **Verify the results**:
   - Check `data/learning/learning.json`
   - Credentials should be added to appropriate groups
   - Review any credentials that couldn't be automatically categorized

## Manual Image Download (If Needed)

If the automatic image download fails, you can manually download credential images:

1. **For each credential**:
   - Right-click on the credential image on the Accredible wallet
   - Select "Save image as..." or "Copy image"
   - Save to `public/badges/accredible/` with a descriptive filename

2. **Update cached.json**:
   - Edit `data/badges/accredible/cached.json`
   - Update the `imageUrl` field for each credential to use the local path:
     ```json
     "imageUrl": "/badges/accredible/your-filename.png"
     ```

3. **Re-run organization**:
   ```bash
   node scripts/accredible-badge/organize-accredible-badges.js
   ```

## Troubleshooting

### No credentials extracted
- Make sure you've scrolled to load all credentials
- Check that the page has fully loaded
- Try refreshing the page and running the script again
- The Accredible site structure may have changed - you may need to update the selectors in the extraction script

### Images won't download
- Some images may be protected or require authentication
- Use manual download as fallback
- The script will use external URLs if download fails

### Credentials not categorized correctly
- Review the `categorizeCredential` function in `organize-accredible-badges.js`
- Add additional patterns based on your actual credential names/issuers
- Credentials that can't be categorized will be listed as "other" for manual review

## Expected Output

After completing all steps, you should have:

- `data/badges/accredible/raw.json` - Raw extracted data
- `data/badges/accredible/cached.json` - Processed credential data
- `public/badges/accredible/*.png` - Credential images (if downloads succeeded)
- Updated `data/learning/learning.json` with Accredible credentials in appropriate groups

## Next Steps

- Review the updated learning.json to ensure all credentials are included
- Check that credentials are in the correct groups
- Manually categorize any credentials that couldn't be automatically assigned
- Test the website to see credentials displayed on the Certifications page
