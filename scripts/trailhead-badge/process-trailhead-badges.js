/**
 * Process Trailhead Metadata
 * 
 * This script processes the raw Trailhead metadata extracted from the browser
 * and prepares it for use in the learning.json file.
 * 
 * Usage: node scripts/trailhead-badge/process-trailhead-badges.js
 */

const fs = require('fs');
const path = require('path');

const RAW_DATA_PATH = path.join(__dirname, '../../data/badges/trailhead/raw.json');
const CACHED_DATA_PATH = path.join(__dirname, '../../data/badges/trailhead/cached.json');

// Ensure directories exist
[path.dirname(RAW_DATA_PATH), path.dirname(CACHED_DATA_PATH)].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function processMetadata() {
  console.log('Processing Trailhead metadata...\n');
  
  // Read raw data
  if (!fs.existsSync(RAW_DATA_PATH)) {
    console.error(`Error: Raw data file not found at ${RAW_DATA_PATH}`);
    console.error('Please run the browser extraction script first.');
    process.exit(1);
  }
  
  const rawData = JSON.parse(fs.readFileSync(RAW_DATA_PATH, 'utf8'));
  console.log('Raw metadata:', rawData.metadata);
  
  // Validate and normalize metadata
  const metadata = {
    trailheadRank: rawData.metadata.trailheadRank || null,
    certificationCount: rawData.metadata.certificationCount || null,
    agentblazerStatuses: rawData.metadata.agentblazerStatuses || []
  };
  
  // Create cached data structure
  const cachedData = {
    profileUrl: rawData.profileUrl,
    extractedAt: rawData.extractedAt,
    processedAt: new Date().toISOString(),
    metadata: metadata
  };
  
  // Write cached data
  fs.writeFileSync(CACHED_DATA_PATH, JSON.stringify(cachedData, null, 2));
  console.log(`\n✓ Processed metadata`);
  console.log(`✓ Cached data written to ${CACHED_DATA_PATH}`);
  
  // Summary
  console.log(`\nSummary:`);
  console.log(`  Trailhead Rank: ${metadata.trailheadRank || 'Not found'}`);
  console.log(`  Certification Count: ${metadata.certificationCount || 'Not found'} (expected: 22)`);
  console.log(`  Agentblazer Statuses: ${metadata.agentblazerStatuses.length > 0 ? metadata.agentblazerStatuses.join(', ') : 'Not found'} (expected: 2025, 2026)`);
  
  // Validation warnings
  if (metadata.certificationCount !== 22) {
    console.log(`\n⚠ Warning: Certification count is ${metadata.certificationCount}, expected 22`);
  }
  
  if (metadata.agentblazerStatuses.length !== 2) {
    console.log(`\n⚠ Warning: Found ${metadata.agentblazerStatuses.length} Agentblazer statuses, expected 2 (2025, 2026)`);
  }
  
  if (!metadata.trailheadRank) {
    console.log(`\n⚠ Warning: Trailhead rank not found`);
  }
}

processMetadata();
