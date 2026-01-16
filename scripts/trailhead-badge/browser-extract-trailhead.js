/**
 * Browser Console Script to Extract Trailhead Metadata
 * 
 * Instructions:
 * 1. Visit https://www.salesforce.com/trailblazer/thomasbohn
 * 2. Open browser console (F12 or Right-click > Inspect > Console)
 * 3. Scroll down to see all profile information
 * 4. Copy and paste this entire script
 * 5. Press Enter
 * 6. Copy the JSON output
 * 7. Paste into data/badges/trailhead/raw.json
 * 
 * Note: This extracts metadata only (certifications, rank, Agentblazer status)
 * Badge images are not needed - only the counts and status information.
 */

(function() {
  console.log('Extracting Trailhead metadata from profile...\n');
  
  const data = {
    profileUrl: window.location.href,
    extractedAt: new Date().toISOString(),
    metadata: {}
  };
  
  // Extract profile metadata
  const extractMetadata = () => {
    console.log('Starting metadata extraction...\n');
    
    // Wait a bit for dynamic content to load
    const pageText = document.body.innerText || document.body.textContent || '';
    const fullHTML = document.body.innerHTML || '';
    
    console.log('Page text length:', pageText.length);
    console.log('Full HTML length:', fullHTML.length);
    
    // Debug: Show all text that might contain relevant info
    const debugText = pageText.substring(0, 5000);
    console.log('First 5000 chars of page text:', debugText);
    
    // Look for Trailhead rank (Ranger status) - try multiple patterns
    const rangerPatterns = [
      /(All Star )?Ranger/i,
      /Trailhead\s+(All Star )?Ranger/i,
      /Rank:\s*(All Star )?Ranger/i,
      /(All Star )?Ranger\s+Status/i,
      /Ranger/i
    ];
    
    for (const pattern of rangerPatterns) {
      const match = pageText.match(pattern);
      if (match) {
        data.metadata.trailheadRank = match[0].trim();
        console.log('✓ Found Ranger status:', data.metadata.trailheadRank);
        break;
      }
    }
    
    // Look for certification count (should be 22) - try multiple patterns
    const certPatterns = [
      /(\d+)\s*certifications?/i,
      /certifications?:\s*(\d+)/i,
      /(\d+)\s*certs?/i,
      /certification\s*count[:\s]*(\d+)/i,
      /(\d{2})\s*certifications?/i  // Specifically look for 2-digit numbers
    ];
    
    for (const pattern of certPatterns) {
      const match = pageText.match(pattern);
      if (match) {
        const count = parseInt(match[1] || match[0]);
        if (count > 0 && count <= 100) {  // Reasonable range
          data.metadata.certificationCount = count;
          console.log('✓ Found certification count:', count);
          break;
        }
      }
    }
    
    // Look for Agentblazer statuses (2025, 2026) - try multiple patterns
    const agentblazerPatterns = [
      /Agentblazer\s*(\d{4})/gi,
      /Agent\s*Blazer\s*(\d{4})/gi,
      /Agentblazer.*?(\d{4})/gi,
      /(\d{4})\s*Agentblazer/gi
    ];
    
    const agentblazerYears = [];
    for (const pattern of agentblazerPatterns) {
      let match;
      // Reset regex lastIndex
      pattern.lastIndex = 0;
      while ((match = pattern.exec(pageText)) !== null) {
        const year = match[1] || match[0].match(/\d{4}/)?.[0];
        if (year && (year === '2025' || year === '2026')) {
          if (!agentblazerYears.includes(year)) {
            agentblazerYears.push(year);
          }
        }
      }
    }
    
    if (agentblazerYears.length > 0) {
      data.metadata.agentblazerStatuses = agentblazerYears.sort();
      console.log('✓ Found Agentblazer statuses:', agentblazerYears);
    }
    
    // Try to find metadata in specific DOM elements - expanded selectors
    const metadataSelectors = [
      '[class*="ranger"]',
      '[class*="rank"]',
      '[class*="certification"]',
      '[class*="cert"]',
      '[class*="agentblazer"]',
      '[class*="agent-blazer"]',
      '[class*="agent_blazer"]',
      '[class*="stat"]',
      '[class*="metric"]',
      '[class*="achievement"]',
      '[class*="profile"]',
      '[class*="badge-count"]',
      '[class*="count"]',
      '[data-testid*="ranger"]',
      '[data-testid*="certification"]',
      '[data-testid*="agentblazer"]',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      '[role="heading"]',
      'span', 'div', 'p'
    ];
    
    console.log('\nSearching DOM elements...');
    let elementsChecked = 0;
    
    metadataSelectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          elementsChecked++;
          const text = (el.innerText || el.textContent || '').trim();
          const className = el.className || '';
          const id = el.id || '';
          
          // Check for Ranger status
          if (text.match(/ranger/i) && !data.metadata.trailheadRank) {
            const rangerMatch = text.match(/(All Star )?Ranger/i);
            if (rangerMatch) {
              data.metadata.trailheadRank = rangerMatch[0];
              console.log('✓ Found Ranger in element:', selector, text.substring(0, 50));
            }
          }
          
          // Check for certification count
          if ((text.match(/certification/i) || className.match(/cert/i)) && !data.metadata.certificationCount) {
            const certMatch = text.match(/(\d{2})/);  // Look for 2-digit numbers (like 22)
            if (certMatch) {
              const count = parseInt(certMatch[1]);
              if (count >= 10 && count <= 100) {
                data.metadata.certificationCount = count;
                console.log('✓ Found certification count in element:', selector, text.substring(0, 50));
              }
            }
          }
          
          // Check for Agentblazer
          if (text.match(/agentblazer|agent.blazer/i)) {
            const yearMatch = text.match(/(202[5-6])/);
            if (yearMatch) {
              const year = yearMatch[1];
              if (!data.metadata.agentblazerStatuses) {
                data.metadata.agentblazerStatuses = [];
              }
              if (!data.metadata.agentblazerStatuses.includes(year)) {
                data.metadata.agentblazerStatuses.push(year);
                console.log('✓ Found Agentblazer in element:', selector, year);
              }
            }
          }
        });
      } catch (e) {
        // Ignore selector errors
      }
    });
    
    console.log(`Checked ${elementsChecked} DOM elements`);
    
    // Sort Agentblazer statuses if found
    if (data.metadata.agentblazerStatuses) {
      data.metadata.agentblazerStatuses.sort();
    }
    
    // If still nothing found, provide manual extraction hints
    if (!data.metadata.trailheadRank && !data.metadata.certificationCount && !data.metadata.agentblazerStatuses) {
      console.log('\n⚠ No metadata found automatically. Try these manual steps:');
      console.log('1. Look for "Ranger" or "All Star Ranger" text on the page');
      console.log('2. Look for certification count (should be 22)');
      console.log('3. Look for "Agentblazer 2025" and "Agentblazer 2026"');
      console.log('4. You can manually create the JSON with the structure:');
      console.log(JSON.stringify({
        profileUrl: window.location.href,
        extractedAt: new Date().toISOString(),
        metadata: {
          trailheadRank: "All Star Ranger",  // Replace with actual value
          certificationCount: 22,              // Replace with actual count
          agentblazerStatuses: ["2025", "2026"] // Replace with actual years
        }
      }, null, 2));
    }
  };
  
  // Run extraction
  extractMetadata();
  
  // Output results
  console.log('Extracted metadata:');
  console.log('  Trailhead Rank:', data.metadata.trailheadRank || 'Not found');
  console.log('  Certification Count:', data.metadata.certificationCount || 'Not found');
  console.log('  Agentblazer Statuses:', data.metadata.agentblazerStatuses || 'Not found');
  console.log('\n=== COPY THE JSON BELOW ===\n');
  console.log(JSON.stringify(data, null, 2));
  console.log('\n=== END OF JSON ===\n');
  
  return data;
})();
