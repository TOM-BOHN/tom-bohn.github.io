/**
 * Organize Accredible Badges into Learning Groups
 * 
 * This script takes processed Accredible credential data and organizes it
 * into the appropriate groups in learning.json based on issuer/category.
 * 
 * Usage: node scripts/accredible-badge/organize-accredible-badges.js
 */

const fs = require('fs');
const path = require('path');

const CACHED_DATA_PATH = path.join(__dirname, '../../data/badges/accredible/cached.json');
const LEARNING_DATA_PATH = path.join(__dirname, '../../data/learning/learning.json');

function categorizeCredential(cred) {
  const name = cred.name.toLowerCase();
  const issuer = (cred.issuer || '').toLowerCase();
  
  // Map credentials to existing groups or create new ones
  // This is a starting point - you may need to adjust based on actual data
  
  // CIMP credentials - check for CIMP, information management, data steward
  if (name.includes('cimp') || 
      name.includes('certified information management professional') ||
      name.includes('certified data steward') ||
      issuer.includes('elearningcurve') ||
      issuer.includes('arma') || 
      issuer.includes('cimp')) {
    return 'cimp';
  }
  
  if (name.includes('tableau') || issuer.includes('tableau')) {
    return 'tableau';
  }
  
  if (name.includes('salesforce') || issuer.includes('salesforce')) {
    return 'salesforce-core';
  }
  
  if (name.includes('safe') || issuer.includes('scaled agile')) {
    return 'professional-agile';
  }
  
  if (name.includes('scrum') || issuer.includes('scrum')) {
    return 'professional-agile';
  }
  
  if (name.includes('data governance') || issuer.includes('edm') || issuer.includes('alation')) {
    return 'data-governance';
  }
  
  // Default: could create a new "Other Certifications" group or skip
  return null;
}

function organizeBadges() {
  console.log('Organizing Accredible credentials...\n');
  
  // Read cached credential data
  if (!fs.existsSync(CACHED_DATA_PATH)) {
    console.error(`Error: Cached data file not found at ${CACHED_DATA_PATH}`);
    console.error('Please run process-accredible-badges.js first.');
    process.exit(1);
  }
  
  const cachedData = JSON.parse(fs.readFileSync(CACHED_DATA_PATH, 'utf8'));
  console.log(`Found ${cachedData.credentials.length} credentials in cached data`);
  
  // Read learning data
  if (!fs.existsSync(LEARNING_DATA_PATH)) {
    console.error(`Error: Learning data file not found at ${LEARNING_DATA_PATH}`);
    process.exit(1);
  }
  
  const learningData = JSON.parse(fs.readFileSync(LEARNING_DATA_PATH, 'utf8'));
  
  // Categorize and organize credentials
  const categorized = {};
  cachedData.credentials.forEach(cred => {
    const category = categorizeCredential(cred);
    if (category) {
      if (!categorized[category]) {
        categorized[category] = [];
      }
      categorized[category].push(cred);
    } else {
      if (!categorized['other']) {
        categorized['other'] = [];
      }
      categorized['other'].push(cred);
    }
  });
  
  console.log('\nCategorized credentials:');
  Object.entries(categorized).forEach(([category, creds]) => {
    console.log(`  ${category}: ${creds.length} credentials`);
  });
  
  // Add credentials to appropriate groups
  Object.entries(categorized).forEach(([category, creds]) => {
    if (category === 'other') {
      console.log(`\n⚠ ${creds.length} credentials could not be categorized. Review manually.`);
      return;
    }
    
    const group = learningData.accomplished.find(g => g.id === category);
    
    if (!group) {
      console.log(`\n⚠ Group '${category}' not found. Skipping ${creds.length} credentials.`);
      return;
    }
    
    console.log(`\nUpdating ${group.title} group...`);
    
    // Convert credentials to BadgeImage format
    const badgeImages = creds.map(cred => ({
      src: cred.imageUrl,
      alt: cred.cleanName || cred.name,
      url: cred.url || `https://www.credential.net/profile/thomasbohn/wallet`
    }));
    
    // Remove duplicates based on image URL
    const existingUrls = new Set(group.badgeImages.map(b => b.src));
    const newBadges = badgeImages.filter(b => !existingUrls.has(b.src));
    
    if (newBadges.length > 0) {
      group.badgeImages.push(...newBadges);
      console.log(`  ✓ Added ${newBadges.length} new credentials`);
    } else {
      console.log(`  No new credentials to add (all already exist)`);
    }
  });
  
  // Write updated learning data
  fs.writeFileSync(LEARNING_DATA_PATH, JSON.stringify(learningData, null, 2));
  console.log(`\n✓ Updated learning.json with Accredible credential data`);
}

organizeBadges();
