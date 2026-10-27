/**
 * Process Accredible Badge Data
 * 
 * This script processes the raw Accredible credential data extracted from the browser
 * and prepares it for use in the learning.json file.
 * 
 * Usage: node scripts/accredible-badge/process-accredible-badges.js
 */

const fs = require('fs');
const path = require('path');
const { fromRoot, readJson, writeJson } = require('../_shared/fs-json');
const { downloadImage, sanitizeFilename } = require('../_shared/download-image');

const RAW_DATA_PATH = fromRoot('data', 'badges', 'accredible', 'raw.json');
const CACHED_DATA_PATH = fromRoot('data', 'badges', 'accredible', 'cached.json');
const BADGES_DIR = fromRoot('public', 'badges', 'accredible');

// Ensure directories exist
[path.dirname(RAW_DATA_PATH), path.dirname(CACHED_DATA_PATH), BADGES_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

async function processBadges() {
  console.log('Processing Accredible credential data...\n');
  
  // Read raw data
  if (!fs.existsSync(RAW_DATA_PATH)) {
    console.error(`Error: Raw data file not found at ${RAW_DATA_PATH}`);
    console.error('Please run the browser extraction script first.');
    process.exit(1);
  }
  
  const rawData = readJson(RAW_DATA_PATH);
  console.log(`Found ${rawData.credentials.length} credentials in raw data`);
  
  const processedCredentials = [];
  
  for (let i = 0; i < rawData.credentials.length; i++) {
    const cred = rawData.credentials[i];
    console.log(`\nProcessing credential ${i + 1}/${rawData.credentials.length}: ${cred.name}`);
    
    // Clean credential name for filename
    const cleanName = sanitizeFilename(cred.name, { separator: '-', maxLength: 50 });
    
    const filename = `${cleanName}-${cred.id}.png`;
    const localPath = `/badges/accredible/${filename}`;
    const filepath = path.join(BADGES_DIR, filename);
    
    let imageSrc = cred.imageUrl;
    
    // Try to download image
    if (cred.imageUrl && !cred.imageUrl.startsWith('/')) {
      try {
        console.log(`  Attempting to download: ${cred.imageUrl}`);
        await downloadImage(cred.imageUrl, filepath);
        imageSrc = localPath;
        console.log(`  ✓ Downloaded to ${localPath}`);
      } catch (error) {
        console.log(`  ✗ Download failed: ${error.message}`);
        console.log(`  Using external URL: ${cred.imageUrl}`);
        // Keep the external URL if download fails
        imageSrc = cred.imageUrl;
      }
    } else {
      imageSrc = cred.imageUrl || localPath;
    }
    
    const processedCred = {
      id: cred.id,
      name: cred.name,
      cleanName: cred.name.trim(),
      issuer: cred.issuer || '',
      imageUrl: imageSrc,
      imageAlt: cred.imageAlt || cred.name,
      description: cred.description || '',
      url: cred.url || `https://www.credential.net/profile/thomasbohn/wallet`,
      verifyUrl: cred.verifyUrl || null,
      issueDate: cred.issueDate || ''
    };
    
    processedCredentials.push(processedCred);
  }
  
  // Create cached data structure
  const cachedData = {
    profileUrl: rawData.profileUrl,
    extractedAt: rawData.extractedAt,
    processedAt: new Date().toISOString(),
    credentials: processedCredentials
  };
  
  // Write cached data
  writeJson(CACHED_DATA_PATH, cachedData);
  console.log(`\n✓ Processed ${processedCredentials.length} credentials`);
  console.log(`✓ Cached data written to ${CACHED_DATA_PATH}`);
  
  // Summary
  console.log(`\nSummary:`);
  console.log(`  Total credentials: ${processedCredentials.length}`);
  const issuers = [...new Set(processedCredentials.map(c => c.issuer).filter(Boolean))];
  if (issuers.length > 0) {
    console.log(`  Unique issuers: ${issuers.length}`);
    issuers.forEach(issuer => {
      const count = processedCredentials.filter(c => c.issuer === issuer).length;
      console.log(`    - ${issuer}: ${count}`);
    });
  }
}

processBadges().catch(error => {
  console.error('Error processing credentials:', error);
  process.exit(1);
});
