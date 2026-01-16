/**
 * Organize Trailhead Metadata into Learning Groups
 * 
 * This script takes processed Trailhead metadata and updates
 * the Salesforce Core Platform group in learning.json.
 * 
 * Usage: node scripts/trailhead-badge/organize-trailhead-badges.js
 */

const fs = require('fs');
const path = require('path');

const CACHED_DATA_PATH = path.join(__dirname, '../../data/badges/trailhead/cached.json');
const LEARNING_DATA_PATH = path.join(__dirname, '../../data/learning/learning.json');

function organizeMetadata() {
  console.log('Organizing Trailhead metadata...\n');
  
  // Read cached metadata
  if (!fs.existsSync(CACHED_DATA_PATH)) {
    console.error(`Error: Cached data file not found at ${CACHED_DATA_PATH}`);
    console.error('Please run process-trailhead-badges.js first.');
    process.exit(1);
  }
  
  const cachedData = JSON.parse(fs.readFileSync(CACHED_DATA_PATH, 'utf8'));
  console.log('Cached metadata:', cachedData.metadata);
  
  // Read learning data
  if (!fs.existsSync(LEARNING_DATA_PATH)) {
    console.error(`Error: Learning data file not found at ${LEARNING_DATA_PATH}`);
    process.exit(1);
  }
  
  const learningData = JSON.parse(fs.readFileSync(LEARNING_DATA_PATH, 'utf8'));
  
  // Find Salesforce Core Platform group
  const salesforceGroup = learningData.accomplished.find(g => g.id === 'salesforce-core');
  
  if (!salesforceGroup) {
    console.error('Error: Salesforce Core Platform group not found in learning.json');
    process.exit(1);
  }
  
  console.log(`Found Salesforce Core Platform group`);
  
  // Initialize metadata array if it doesn't exist
  if (!salesforceGroup.metadata) {
    salesforceGroup.metadata = [];
  }
  
  const metadata = salesforceGroup.metadata;
  const metadataMap = new Map(metadata.map(m => [m.label, m]));
  
  // Update or add Trailhead rank
  if (cachedData.metadata.trailheadRank) {
    if (metadataMap.has('Trailhead Ranger')) {
      metadataMap.get('Trailhead Ranger').value = cachedData.metadata.trailheadRank;
    } else {
      metadata.push({
        label: 'Trailhead Ranger',
        value: cachedData.metadata.trailheadRank
      });
    }
    console.log(`✓ Updated Trailhead Ranger: ${cachedData.metadata.trailheadRank}`);
  }
  
  // Update or add certification count
  if (cachedData.metadata.certificationCount) {
    if (metadataMap.has('Certifications')) {
      metadataMap.get('Certifications').value = cachedData.metadata.certificationCount.toString();
    } else {
      metadata.push({
        label: 'Certifications',
        value: cachedData.metadata.certificationCount.toString()
      });
    }
    console.log(`✓ Updated Certifications: ${cachedData.metadata.certificationCount}`);
  }
  
  // Update or add Agentblazer statuses
  if (cachedData.metadata.agentblazerStatuses && cachedData.metadata.agentblazerStatuses.length > 0) {
    cachedData.metadata.agentblazerStatuses.forEach(year => {
      const label = `Agentblazer ${year}`;
      if (metadataMap.has(label)) {
        metadataMap.get(label).value = 'Active';
      } else {
        metadata.push({
          label: label,
          value: 'Active'
        });
      }
      console.log(`✓ Updated ${label}: Active`);
    });
  }
  
  // Update the metadata array
  salesforceGroup.metadata = metadata;
  
  // Write updated learning data
  fs.writeFileSync(LEARNING_DATA_PATH, JSON.stringify(learningData, null, 2));
  console.log(`\n✓ Updated learning.json with Trailhead metadata`);
  console.log(`  Total metadata items: ${metadata.length}`);
  
  // Summary
  console.log(`\nSummary of updates:`);
  console.log(`  Trailhead Rank: ${cachedData.metadata.trailheadRank || 'Not updated'}`);
  console.log(`  Certifications: ${cachedData.metadata.certificationCount || 'Not updated'}`);
  console.log(`  Agentblazer Statuses: ${cachedData.metadata.agentblazerStatuses?.join(', ') || 'Not updated'}`);
}

organizeMetadata();
