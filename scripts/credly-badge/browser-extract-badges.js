/**
 * Browser Console Script to Extract Credly Badge Data
 * 
 * Instructions:
 * 1. Visit https://www.credly.com/users/thomasbohn
 * 2. Open browser console (F12 or Right-click > Inspect > Console)
 * 3. Copy and paste this entire script
 * 4. Press Enter
 * 5. Copy the JSON output
 * 6. Paste into data/badges/credly/raw.json or run the process script
 */

(function() {
  console.log('Extracting badge data from Credly profile...\n');
  
  const badges = [];
  
  // Method 1: Try to find badge elements in the DOM
  const badgeSelectors = [
    '[class*="badge"]',
    '[data-badge-id]',
    '[class*="credential"]',
    '[class*="certification"]',
    'article',
    '[role="article"]'
  ];
  
  let foundElements = [];
  badgeSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (!foundElements.includes(el)) {
        foundElements.push(el);
      }
    });
  });
  
  foundElements.forEach((el, idx) => {
    const img = el.querySelector('img');
    const titleEl = el.querySelector('h1, h2, h3, h4, h5, h6, [class*="title"], [class*="name"], [class*="badge-name"]');
    const issuerEl = el.querySelector('[class*="issuer"], [class*="organization"], [class*="issued-by"]');
    const dateEl = el.querySelector('[class*="date"], time, [class*="issued"], [class*="earned"]');
    const descEl = el.querySelector('[class*="description"], [class*="criteria"], p');
    const linkEl = el.querySelector('a[href*="credly.com/badges"]');
    
    if (img && titleEl) {
      const badgeId = el.getAttribute('data-badge-id') || 
                     el.getAttribute('id') || 
                     (linkEl ? linkEl.href.match(/badges\/([^\/]+)/)?.[1] : null) ||
                     `badge-${idx}`;
      
      badges.push({
        id: badgeId,
        name: titleEl.textContent.trim(),
        issuer: issuerEl ? issuerEl.textContent.trim() : '',
        imageUrl: img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy-src'),
        issueDate: dateEl ? dateEl.textContent.trim() : '',
        description: descEl ? descEl.textContent.trim() : '',
        tags: [],
        credlyUrl: linkEl ? linkEl.href : `https://www.credly.com/badges/${badgeId}`
      });
    }
  });
  
  // Method 2: Try to extract from JSON-LD structured data
  document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
    try {
      const data = JSON.parse(script.textContent);
      
      // Handle different JSON-LD structures
      const processItem = (item) => {
        if (item['@type'] === 'EducationalOccupationalCredential' || 
            item['@type'] === 'Thing' ||
            item.type === 'Badge') {
          badges.push({
            id: item.identifier || item['@id'] || `badge-${badges.length}`,
            name: item.name,
            issuer: item.issuer?.name || item.credentialCategory || '',
            imageUrl: item.image || (typeof item.image === 'object' ? item.image.url : ''),
            issueDate: item.datePublished || item.validFrom || '',
            description: item.description || '',
            tags: item.about || item.keywords || [],
            credlyUrl: item.url || item['@id'] || ''
          });
        }
      };
      
      if (Array.isArray(data)) {
        data.forEach(processItem);
      } else if (data['@graph']) {
        data['@graph'].forEach(processItem);
      } else {
        processItem(data);
      }
    } catch (e) {
      // Not valid JSON, skip
    }
  });
  
  // Method 3: Try to find any embedded JSON data
  document.querySelectorAll('script').forEach(script => {
    const text = script.textContent;
    if (text.includes('badge') || text.includes('credential')) {
      try {
        // Look for JSON objects in script tags
        const jsonMatch = text.match(/\{[\s\S]*"badge[\s\S]*\}/);
        if (jsonMatch) {
          const data = JSON.parse(jsonMatch[0]);
          if (Array.isArray(data)) {
            data.forEach(badge => badges.push(badge));
          }
        }
      } catch (e) {
        // Not parseable, skip
      }
    }
  });
  
  // Remove duplicates based on ID or name
  const uniqueBadges = [];
  const seen = new Set();
  badges.forEach(badge => {
    const key = badge.id || badge.name;
    if (key && !seen.has(key)) {
      seen.add(key);
      uniqueBadges.push(badge);
    }
  });
  
  console.log(`Found ${uniqueBadges.length} unique badges\n`);
  console.log('Badge Data (copy this JSON):');
  console.log('='.repeat(50));
  console.log(JSON.stringify(uniqueBadges, null, 2));
  console.log('='.repeat(50));
  console.log('\nNext steps:');
  console.log('1. Copy the JSON above');
  console.log('2. Paste into data/badges/credly/raw.json');
  console.log('3. Run: node scripts/fetch-credly-badges.js');
  
  return uniqueBadges;
})();
