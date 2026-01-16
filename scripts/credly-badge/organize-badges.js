/**
 * Organize and deduplicate badges, then map to certification groups
 */

const fs = require('fs');
const path = require('path');

const cachedFile = path.join(process.cwd(), 'data', 'badges', 'credly', 'cached.json');
const learningFile = path.join(process.cwd(), 'data', 'learning', 'learning.json');

function parseBadgeName(badge) {
  // The name and issuer are concatenated, try to separate them
  const name = badge.name || '';
  
  // Define issuer patterns with their normalized names
  const issuerPatterns = [
    { pattern: /Tableau$/, normalized: 'Tableau' },
    { pattern: /Scaled Agile, Inc\.$/, normalized: 'Scaled Agile, Inc.' },
    { pattern: /SAFe by Scaled Agile, Inc\.$/, normalized: 'Scaled Agile, Inc.' },
    { pattern: /EDM Association$/, normalized: 'Enterprise Data Management Council (EDMCouncil)' },
    { pattern: /Enterprise Data Management Council|EDMCouncil/i, normalized: 'Enterprise Data Management Council (EDMCouncil)' },
    { pattern: /Alation University$/, normalized: 'Alation University' },
    { pattern: /Scrum\.org$/, normalized: 'Scrum.org' }
  ];
  
  let issuer = '';
  let cleanName = name;
  
  // Try to match issuer patterns at the end of the name
  for (const { pattern, normalized } of issuerPatterns) {
    if (pattern.test(name)) {
      issuer = normalized;
      cleanName = name.replace(pattern, '').trim();
      break;
    }
  }
  
  // If no pattern matched, try to find issuer by looking for common issuer names
  // This handles cases where issuer might be concatenated without proper separation
  if (!issuer) {
    const issuerNames = [
      'Alation University',
      'Scrum.org',
      'Tableau',
      'Scaled Agile',
      'EDM Association',
      'EDMCouncil'
    ];
    
    for (const issuerName of issuerNames) {
      // Check if issuer name appears at the end (case insensitive)
      const regex = new RegExp(issuerName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i');
      if (regex.test(name)) {
        // Find where the issuer name starts
        const index = name.toLowerCase().lastIndexOf(issuerName.toLowerCase());
        if (index > 0) {
          cleanName = name.substring(0, index).trim();
          issuer = issuerName;
          
          // Normalize EDMCouncil
          if (issuerName.includes('EDM Association') || issuerName.includes('EDMCouncil')) {
            issuer = 'Enterprise Data Management Council (EDMCouncil)';
          }
          break;
        }
      }
    }
  }
  
  // If issuer still wasn't found, try to extract from the issuer field
  if (!issuer && badge.issuer) {
    // Check if issuer field is also concatenated
    const issuerField = badge.issuer;
    for (const { pattern, normalized } of issuerPatterns) {
      if (pattern.test(issuerField)) {
        issuer = normalized;
        break;
      }
    }
    if (!issuer) {
      issuer = issuerField;
    }
  }
  
  // Normalize EDMCouncil issuer name (final check)
  if (issuer && (issuer.includes('EDM Association') || issuer.includes('EDMCouncil') || 
      issuer.includes('Enterprise Data Management'))) {
    issuer = 'Enterprise Data Management Council (EDMCouncil)';
  }
  
  return { cleanName, issuer };
}

function parseIssueDate(dateString) {
  if (!dateString) return null;
  
  // Extract dates from strings like "Issued Jan 26, 2023" or "Expires Feb 20, 2026"
  const issuedMatch = dateString.match(/Issued\s+(\w+\s+\d+,\s+\d+)/i);
  const expiredMatch = dateString.match(/Expired\s+(\w+\s+\d+,\s+\d+)/i);
  const expiresMatch = dateString.match(/Expires\s+(\w+\s+\d+,\s+\d+)/i);
  
  if (issuedMatch) return issuedMatch[1];
  if (expiredMatch) return expiredMatch[1];
  if (expiresMatch) return expiresMatch[1];
  
  return dateString;
}

function categorizeBadge(badge) {
  const name = badge.name.toLowerCase();
  const issuer = (badge.issuer || '').toLowerCase();
  
  if (name.includes('tableau') || issuer.includes('tableau')) {
    return 'tableau';
  }
  if (name.includes('salesforce') || issuer.includes('salesforce')) {
    return 'salesforce';
  }
  if (name.includes('cimp') || name.includes('information management') || issuer.includes('arma')) {
    return 'cimp';
  }
  if (name.includes('safe') || issuer.includes('scaled agile')) {
    return 'safe';
  }
  if (name.includes('scrum') || issuer.includes('scrum.org')) {
    return 'scrum';
  }
  if (name.includes('dcam') || name.includes('okg') || name.includes('open knowledge graph') || 
      issuer.includes('edm association') || issuer.includes('edmcouncil') || 
      issuer.includes('enterprise data management council')) {
    return 'data-governance';
  }
  if (name.includes('alation') || issuer.includes('alation')) {
    return 'alation';
  }
  
  return 'other';
}

function main() {
  const badges = JSON.parse(fs.readFileSync(cachedFile, 'utf8'));
  
  // Deduplicate - keep badges with issue dates, prefer ones with more info
  const uniqueBadges = new Map();
  
  badges.forEach(badge => {
    const { cleanName } = parseBadgeName(badge);
    const key = cleanName.toLowerCase();
    
    if (!uniqueBadges.has(key)) {
      uniqueBadges.set(key, badge);
    } else {
      const existing = uniqueBadges.get(key);
      // Prefer badge with issue date
      if (badge.issueDate && !existing.issueDate) {
        uniqueBadges.set(key, badge);
      }
    }
  });
  
  const deduplicated = Array.from(uniqueBadges.values());
  
  console.log(`Deduplicated: ${badges.length} → ${deduplicated.length} badges\n`);
  
  // Organize by category
  const byCategory = {};
  
  deduplicated.forEach(badge => {
    const category = categorizeBadge(badge);
    if (!byCategory[category]) {
      byCategory[category] = [];
    }
    
    const { cleanName, issuer } = parseBadgeName(badge);
    const issueDate = parseIssueDate(badge.issueDate);
    
    byCategory[category].push({
      ...badge,
      cleanName,
      issuer: issuer || badge.issuer,
      issueDate,
      category
    });
  });
  
  console.log('Badges by Category:');
  Object.keys(byCategory).sort().forEach(cat => {
    console.log(`  ${cat}: ${byCategory[cat].length}`);
  });
  
  // Update learning.json structure
  const learning = JSON.parse(fs.readFileSync(learningFile, 'utf8'));
  
  // Remove duplicates first - keep only the first occurrence of each ID
  const seenIds = new Set();
  learning.accomplished = learning.accomplished.filter(group => {
    if (seenIds.has(group.id)) {
      return false; // Remove duplicate
    }
    seenIds.add(group.id);
    return true; // Keep first occurrence
  });
  
  // Helper function to update or add a group (prevents duplicates)
  function updateOrAddGroup(groupId, newGroup) {
    const existingIndex = learning.accomplished.findIndex(g => g.id === groupId);
    if (existingIndex >= 0) {
      learning.accomplished[existingIndex] = newGroup;
    } else {
      learning.accomplished.push(newGroup);
    }
  }
  
  // Create Tableau group
  if (byCategory.tableau && byCategory.tableau.length > 0) {
    const tableauBadges = byCategory.tableau.map(badge => ({
      src: badge.imageUrl.replace('/size/128x128', '/size/340x340'), // Get larger image
      alt: badge.cleanName,
      url: badge.credlyUrl
    }));
    
    updateOrAddGroup('tableau', {
      id: 'tableau',
      title: 'Tableau Certifications',
      description: 'Comprehensive Tableau certifications covering data visualization, analytics, administration, and platform expertise',
      badgeImages: tableauBadges,
      learnMoreUrl: 'https://www.tableau.com/learn/certification',
      viewCertsUrl: 'https://www.credly.com/users/thomasbohn',
      metadata: [
        { label: 'Certifications', value: `${tableauBadges.length}` }
      ]
    });
  }
  
  // Create Data Governance group (EDM Association)
  const dataGovBadges = [
    ...(byCategory['data-governance'] || []),
    ...(byCategory.alation || [])
  ];
  
  if (dataGovBadges.length > 0) {
    const badges = dataGovBadges.map(badge => ({
      src: badge.imageUrl.replace('/size/128x128', '/size/340x340'),
      alt: badge.cleanName,
      url: badge.credlyUrl
    }));
    
    updateOrAddGroup('data-governance', {
      id: 'data-governance',
      title: 'Data Governance & Management',
      description: 'Certifications in data governance, knowledge graphs, and data management frameworks from Enterprise Data Management Council (EDMCouncil) and Alation',
      badgeImages: badges,
      learnMoreUrl: 'https://edmcouncil.org/',
      viewCertsUrl: 'https://www.credly.com/users/thomasbohn',
      metadata: [
        { label: 'Certifications', value: `${badges.length}` }
      ]
    });
  }
  
  // Create SAFe group
  if (byCategory.safe && byCategory.safe.length > 0) {
    const safeBadges = byCategory.safe.map(badge => ({
      src: badge.imageUrl.replace('/size/128x128', '/size/340x340'),
      alt: badge.cleanName,
      url: badge.credlyUrl
    }));
    
    updateOrAddGroup('safe', {
      id: 'safe',
      title: 'SAFe (Scaled Agile Framework)',
      description: 'Scaled Agile Framework certifications for enterprise agility',
      badgeImages: safeBadges,
      learnMoreUrl: 'https://scaledagile.com/',
      viewCertsUrl: 'https://www.credly.com/users/thomasbohn',
      metadata: [
        { label: 'Certifications', value: `${safeBadges.length}` }
      ]
    });
  }
  
  // Create Scrum group
  if (byCategory.scrum && byCategory.scrum.length > 0) {
    const scrumBadges = byCategory.scrum.map(badge => ({
      src: badge.imageUrl.replace('/size/128x128', '/size/340x340'),
      alt: badge.cleanName,
      url: badge.credlyUrl
    }));
    
    updateOrAddGroup('scrum', {
      id: 'scrum',
      title: 'Professional Scrum Certifications',
      description: 'Professional Scrum Master and Product Owner certifications from Scrum.org',
      badgeImages: scrumBadges,
      learnMoreUrl: 'https://www.scrum.org/',
      viewCertsUrl: 'https://www.credly.com/users/thomasbohn',
      metadata: [
        { label: 'Certifications', value: `${scrumBadges.length}` }
      ]
    });
  }
  
  // Save updated learning.json
  fs.writeFileSync(learningFile, JSON.stringify(learning, null, 2));
  
  console.log('\n✓ Updated learning.json with organized badge groups');
  console.log(`\nTotal certification groups: ${learning.accomplished.length}`);
  
  // Save organized data for reference
  const organizedFile = path.join(process.cwd(), 'data', 'badges', 'credly', 'organized.json');
  fs.writeFileSync(organizedFile, JSON.stringify(byCategory, null, 2));
  console.log(`✓ Saved organized badges to ${organizedFile}`);
}

main();
