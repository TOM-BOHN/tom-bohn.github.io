/**
 * Process manually extracted badge data
 * 
 * This script helps process badge data that was manually extracted from Credly.
 * You can either:
 * 1. Paste JSON directly when running the script
 * 2. Save badge data to data/badges/credly/raw.json
 * 
 * Usage: node scripts/process-manual-badges.js
 * Or: node scripts/process-manual-badges.js "<json-data>"
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const badgesDir = path.join(process.cwd(), 'public', 'badges');
const rawDataFile = path.join(process.cwd(), 'data', 'badges', 'credly', 'raw.json');
const cachedDataFile = path.join(process.cwd(), 'data', 'badges', 'credly', 'cached.json');

if (!fs.existsSync(badgesDir)) {
  fs.mkdirSync(badgesDir, { recursive: true });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    if (!url || !url.startsWith('http')) {
      reject(new Error('Invalid URL'));
      return;
    }
    
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(filepath);
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    });
    
    request.on('error', (err) => {
      reject(err);
    });
    
    request.setTimeout(10000, () => {
      request.destroy();
      reject(new Error('Download timeout'));
    });
  });
}

function sanitizeFilename(name) {
  return name
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase()
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .substring(0, 100);
}

async function processBadges(badges) {
  console.log(`\nProcessing ${badges.length} badges...\n`);
  const processed = [];
  
  for (let i = 0; i < badges.length; i++) {
    const badge = badges[i];
    const badgeName = badge.name || badge.title || `Badge ${i + 1}`;
    console.log(`[${i + 1}/${badges.length}] Processing: ${badgeName}`);
    
    const badgeId = badge.id || badge.badgeId || `badge-${i + 1}`;
    const filename = `${sanitizeFilename(badgeName)}.png`;
    const localPath = path.join(badgesDir, filename);
    const publicPath = `/badges/${filename}`;
    
    // Download image if URL provided
    if (badge.imageUrl || badge.image) {
      try {
        const imageUrl = badge.imageUrl || badge.image;
        await downloadImage(imageUrl, localPath);
        console.log(`  ✓ Downloaded: ${filename}`);
      } catch (error) {
        console.log(`  ✗ Failed to download image: ${error.message}`);
        // Continue without image - user can add manually
      }
    } else {
      console.log(`  ⚠ No image URL provided`);
    }
    
    processed.push({
      id: badgeId,
      credlyId: badge.credlyId || badge.id,
      name: badgeName,
      issuer: badge.issuer || badge.organization || badge.issuedBy || '',
      issueDate: badge.issueDate || badge.issuedOn || badge.date || '',
      expiryDate: badge.expiryDate || badge.expiresOn || null,
      description: badge.description || badge.criteria || '',
      imageUrl: badge.imageUrl || badge.image || '',
      localImagePath: publicPath,
      tags: badge.tags || badge.skills || [],
      category: badge.category || null,
      bucket: null,
      status: badge.expiryDate && new Date(badge.expiryDate) < new Date() ? 'expired' : 'active',
      credlyUrl: badge.credlyUrl || badge.url || `https://www.credly.com/badges/${badgeId}`,
    });
  }
  
  return processed;
}

async function main() {
  let badges = [];
  
  // Try command line argument
  const args = process.argv.slice(2);
  if (args.length > 0) {
    try {
      badges = JSON.parse(args.join(' '));
      console.log(`✓ Parsed ${badges.length} badges from command line`);
    } catch (e) {
      console.error('Failed to parse JSON from command line:', e.message);
      return;
    }
  }
  
  // Try reading from file
  if (badges.length === 0 && fs.existsSync(rawDataFile)) {
    const fileContent = fs.readFileSync(rawDataFile, 'utf8');
    if (fileContent.trim()) {
      try {
        badges = JSON.parse(fileContent);
        console.log(`✓ Read ${badges.length} badges from ${rawDataFile}`);
      } catch (e) {
        console.error('Failed to parse JSON from file:', e.message);
        return;
      }
    }
  }
  
  if (badges.length === 0) {
    console.log(`
No badge data found. Please provide badge data in one of these ways:

1. Save badge data to: ${rawDataFile}
   Format: [{"name": "...", "imageUrl": "...", ...}, ...]

2. Run with JSON as argument:
   node scripts/credly-badge/process-manual-badges.js '[{"name":"Badge Name","imageUrl":"https://..."}]'

3. Extract from Credly using browser console:
   - Visit https://www.credly.com/users/thomasbohn
   - Open browser console (F12)
   - Run the script from scripts/credly-badge/browser-extract-badges.js
   - Copy the JSON output
   - Paste into ${rawDataFile} or pass as argument
`);
    return;
  }
  
  const processed = await processBadges(badges);
  
  // Save cached data
  fs.writeFileSync(cachedDataFile, JSON.stringify(processed, null, 2));
  console.log(`\n✓ Cached ${processed.length} badges to ${cachedDataFile}`);
  
  // Generate summary
  const summary = {
    total: processed.length,
    byIssuer: {},
    byStatus: {},
  };
  
  processed.forEach(badge => {
    const issuer = badge.issuer || 'Unknown';
    summary.byIssuer[issuer] = (summary.byIssuer[issuer] || 0) + 1;
    summary.byStatus[badge.status] = (summary.byStatus[badge.status] || 0) + 1;
  });
  
  console.log('\n' + '='.repeat(50));
  console.log('SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total Badges: ${summary.total}`);
  console.log('\nBy Issuer:');
  Object.keys(summary.byIssuer).sort().forEach(issuer => {
    console.log(`  ${issuer}: ${summary.byIssuer[issuer]}`);
  });
  console.log('\nBy Status:');
  Object.keys(summary.byStatus).forEach(status => {
    console.log(`  ${status}: ${summary.byStatus[status]}`);
  });
  console.log('='.repeat(50));
}

main().catch(console.error);
