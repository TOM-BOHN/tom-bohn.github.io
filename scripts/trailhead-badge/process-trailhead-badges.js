/**
 * Process Trailhead Metadata
 *
 * This script processes the raw Trailhead metadata extracted from the browser
 * and prepares it for use in the learning.json file.
 *
 * Usage: node scripts/trailhead-badge/process-trailhead-badges.js
 */

const path = require('path');
const { fromRoot, readJson, writeJson } = require('../_shared/fs-json');
const fs = require('fs');

const RAW_DATA_PATH = fromRoot('data', 'badges', 'trailhead', 'raw.json');
const CACHED_DATA_PATH = fromRoot('data', 'badges', 'trailhead', 'cached.json');

// Ensure directories exist
;[path.dirname(RAW_DATA_PATH), path.dirname(CACHED_DATA_PATH)].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function processMetadata() {
  console.log('Processing Trailhead metadata...\n');

  if (!fs.existsSync(RAW_DATA_PATH)) {
    console.error(`Error: Raw data file not found at ${RAW_DATA_PATH}`);
    console.error('Please run the browser extraction script first.');
    process.exit(1);
  }

  const rawData = readJson(RAW_DATA_PATH);
  console.log('Raw metadata:', rawData.metadata);

  const metadata = {
    trailheadRank: rawData.metadata.trailheadRank || null,
    certificationCount: rawData.metadata.certificationCount || null,
    agentblazerStatuses: rawData.metadata.agentblazerStatuses || [],
  };

  const cachedData = {
    profileUrl: rawData.profileUrl,
    extractedAt: rawData.extractedAt,
    processedAt: new Date().toISOString(),
    metadata: metadata,
  };

  writeJson(CACHED_DATA_PATH, cachedData);
  console.log(`\n✓ Processed metadata`);
  console.log(`✓ Cached data written to ${CACHED_DATA_PATH}`);

  console.log(`\nSummary:`);
  console.log(`  Trailhead Rank: ${metadata.trailheadRank || 'Not found'}`);
  console.log(
    `  Certification Count: ${metadata.certificationCount ?? 'Not found'}`
  );
  console.log(
    `  Agentblazer Statuses: ${
      metadata.agentblazerStatuses.length > 0
        ? metadata.agentblazerStatuses.join(', ')
        : 'Not found'
    }`
  );

  // Soft warnings only — counts and years change over time.
  if (metadata.certificationCount == null) {
    console.log(`\n⚠ Warning: Certification count not found in extracted metadata`);
  }

  if (metadata.agentblazerStatuses.length === 0) {
    console.log(`\n⚠ Warning: No Agentblazer statuses found in extracted metadata`);
  }

  if (!metadata.trailheadRank) {
    console.log(`\n⚠ Warning: Trailhead rank not found`);
  }
}

processMetadata();
