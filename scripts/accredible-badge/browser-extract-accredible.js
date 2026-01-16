/**
 * Browser Console Script to Extract Accredible Badge Data
 * 
 * Instructions:
 * 1. Visit https://www.credential.net/profile/thomasbohn/wallet
 * 2. Open browser console (F12 or Right-click > Inspect > Console)
 * 3. Scroll down to load all credentials (may need to scroll multiple times)
 * 4. Copy and paste this entire script
 * 5. Press Enter
 * 6. Copy the JSON output
 * 7. Paste into data/badges/accredible/raw.json
 */

(function() {
  console.log('Extracting Accredible credential data from wallet...\n');
  
  const data = {
    profileUrl: window.location.href,
    extractedAt: new Date().toISOString(),
    credentials: []
  };
  
  // Extract credentials - be very permissive, filter later
  const extractCredentials = () => {
    const foundElements = new Set();
    
    // Strategy: Find all containers that have an image from credential.net
    // These are likely credential cards regardless of their DOM structure
    const imageMap = new Map(); // Track which image belongs to which container
    
    document.querySelectorAll('img[src*="credential.net"]').forEach(img => {
      // Skip logo images
      const imgSrc = img.src.toLowerCase();
      if (imgSrc.includes('accredible_logo') || imgSrc.includes('accredible_credential_net_logo')) {
        return; // Skip logos
      }
      
      // Find the parent container that likely contains the full credential card
      let container = img.closest('[class*="card"], [class*="item"], [class*="credential"], [class*="badge"], article, [role="article"], div, section');
      
      // If no suitable container found, go up a few levels
      if (!container || container === document.body) {
        container = img.parentElement;
        let attempts = 0;
        while (container && attempts < 3 && container !== document.body) {
          const text = (container.innerText || container.textContent || '').trim();
          if (text.length > 20) {
            break; // Found a container with substantial content
          }
          container = container.parentElement;
          attempts++;
        }
      }
      
      if (container && container !== document.body) {
        // Use image URL as key to track unique images
        // Multiple containers might share the same image, but we want to capture all unique cards
        const imageKey = img.src;
        if (!imageMap.has(imageKey)) {
          imageMap.set(imageKey, []);
        }
        imageMap.get(imageKey).push({ container, img });
        foundElements.add(container);
      }
    });
    
    console.log(`Found ${foundElements.size} potential credential cards with ${imageMap.size} unique images`);
    
    let processedCount = 0;
    let skippedCount = 0;
    
    foundElements.forEach((container, idx) => {
      // Find the image in this container
      const img = container.querySelector('img[src*="credential.net"]');
      
      if (!img || !img.src) {
        skippedCount++;
        console.log(`Skipping container ${idx + 1}: No credential.net image found`);
        return; // Skip if no credential.net image found
      }
      
      // Skip logo images
      const imgSrc = img.src.toLowerCase();
      if (imgSrc.includes('accredible_logo') || imgSrc.includes('accredible_credential_net_logo')) {
        skippedCount++;
        console.log(`Skipping container ${idx + 1}: Logo image`);
        return;
      }
      
      processedCount++;
        // Extract text content properly - helper function
        const getTextContent = (selector) => {
          const elem = container.querySelector(selector);
          if (!elem) return '';
          // Use textContent first (more reliable), then innerText
          let text = '';
          try {
            text = elem.textContent || elem.innerText || '';
            // Ensure it's a string, not an object
            if (typeof text !== 'string') {
              text = String(text);
            }
            // Filter out object strings
            if (text.includes('[object')) {
              return '';
            }
            return text.trim();
          } catch (e) {
            return '';
          }
        };
        
        // Get all text from container for rawText - more robust extraction
        const getAllText = (el) => {
          if (!el) return '';
          try {
            // Try multiple methods to get text
            let text = '';
            
            // Method 1: textContent (most reliable, gets all text including hidden)
            try {
              text = el.textContent || '';
            } catch (e) {}
            
            // Method 2: innerText (respects CSS, might miss hidden text)
            if (!text || text.trim().length === 0) {
              try {
                text = el.innerText || '';
              } catch (e) {}
            }
            
            // Method 3: Try to get text from all child elements
            if (!text || text.trim().length === 0) {
              try {
                const allElements = el.querySelectorAll('*');
                const textParts = [];
                allElements.forEach(child => {
                  const childText = child.textContent || child.innerText || '';
                  if (childText && childText.trim()) {
                    textParts.push(childText.trim());
                  }
                });
                text = textParts.join(' ');
              } catch (e) {}
            }
            
            // Method 4: Try TreeWalker as last resort
            if (!text || text.trim().length === 0) {
              try {
                const textNodes = [];
                const walker = document.createTreeWalker(
                  el,
                  NodeFilter.SHOW_TEXT,
                  null,
                  false
                );
                let node;
                while (node = walker.nextNode()) {
                  if (node.textContent && node.textContent.trim()) {
                    textNodes.push(node.textContent.trim());
                  }
                }
                text = textNodes.join(' ');
              } catch (e) {}
            }
            
            // Ensure it's a string and clean it
            if (text && typeof text === 'string') {
              return text.trim();
            }
            
            return '';
          } catch (e) {
            console.error(`Error extracting text from container ${idx + 1}:`, e);
            return '';
          }
        };
        
        // Get raw text first for debugging and post-processing
        const rawText = getAllText(container);
        
        // Debug: log if rawText is empty (only for first few to avoid spam)
        if ((!rawText || rawText.length === 0) && idx < 3) {
          console.log(`Warning: Container ${idx + 1} has no extractable text.`);
          console.log(`  Container tag: ${container.tagName}, classes: ${container.className}`);
          console.log(`  Container HTML (first 200 chars): ${container.outerHTML.substring(0, 200)}`);
        }
        
        // Try to find credential name - look in multiple places
        let name = '';
        const nameSelectors = [
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          '[class*="title"]',
          '[class*="name"]',
          '[class*="credential-name"]',
          '[class*="certificate-name"]',
          '[class*="badge-name"]'
        ];
        
        for (const selector of nameSelectors) {
          name = getTextContent(selector);
          if (name && name.length > 0 && !name.includes('[object')) {
            break;
          }
        }
        
        // Fallback: try to get text from container, excluding common UI elements
        if (!name || name.includes('[object') || name.toLowerCase().includes('let it be recognized')) {
          const allText = rawText;
          if (allText) {
            const lines = allText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
            // Filter out common UI text and boilerplate
            const filtered = lines.filter(l => 
              typeof l === 'string' &&
              !l.match(/^(Share|Download|Verify|View|More|Less|Details|Credential|Badge|Let it be recognized that)$/i) &&
              !l.toLowerCase().includes('let it be recognized') &&
              !l.toLowerCase().includes('thomas bohn has successfully') &&
              l.length > 3 &&
              !l.includes('[object')
            );
            // Try to find the actual credential name (usually the longest meaningful line or one with keywords)
            if (filtered.length > 0) {
              // Prefer lines with credential keywords
              const credentialKeywords = /(certificate|certified|professional|developer|fundamentals|education|accreditation|steward|management|databricks|dbt)/i;
              const withKeywords = filtered.filter(l => credentialKeywords.test(l));
              if (withKeywords.length > 0) {
                name = withKeywords[0];
              } else {
                // Otherwise take the longest meaningful line
                name = filtered.reduce((a, b) => a.length > b.length ? a : b);
              }
            }
          }
        }
        
        // If still no name, use image alt or generate one
        if (!name || name.includes('[object') || name.toLowerCase().includes('let it be recognized')) {
          const imgAlt = img.alt || '';
          if (imgAlt && typeof imgAlt === 'string' && !imgAlt.includes('[object')) {
            name = imgAlt;
          } else {
            // Try to extract from image URL filename as last resort
            const urlMatch = img.src.match(/\/([^\/]+)\.png$/);
            if (urlMatch && urlMatch[1]) {
              // Use the image ID as a fallback name
              name = `Credential ${urlMatch[1].substring(0, 20)}`;
            } else {
              name = `Credential ${idx + 1}`;
            }
          }
        }
        
        // Final safety check - ensure name is a string and not an object
        if (typeof name !== 'string') {
          name = String(name);
        }
        if (name.includes('[object')) {
          // Last resort: use image URL ID
          const urlMatch = img.src.match(/\/([^\/]+)\.png$/);
          name = urlMatch ? `Credential ${urlMatch[1]}` : `Credential ${idx + 1}`;
        }
        
        // Filter out "Let it be recognized that" - this is boilerplate, not a credential name
        if (name.toLowerCase().includes('let it be recognized')) {
          // Try to find the actual credential name in the container
          const allText = rawText;
          if (allText) {
            const lines = allText.split('\n').map(l => l.trim()).filter(l => l.length > 5 && typeof l === 'string');
            const credentialPattern = /(certificate of|certified|professional|developer|fundamentals|education|accreditation|steward|management|databricks|dbt)/i;
            const credentialLine = lines.find(l => credentialPattern.test(l) && !l.toLowerCase().includes('let it be recognized'));
            if (credentialLine) {
              name = credentialLine;
            }
          }
        }
        
        // Don't aggressively clean names - keep the full credential name
        // Only remove "Academy Accreditation -" prefix if it's redundant
        if (name && name.startsWith('Academy Accreditation -')) {
          name = name.replace(/^Academy Accreditation -\s*/i, '').trim();
        }
        
        // Final safety check - ensure name is a string
        if (!name || typeof name !== 'string' || name.includes('[object')) {
          name = img.alt || `Credential ${idx + 1}`;
        }
        
        // Extract issuer - be more comprehensive
        let issuer = '';
        const issuerSelectors = [
          '[class*="issuer"]',
          '[class*="organization"]',
          '[class*="issued-by"]',
          '[class*="provider"]',
          '[class*="institution"]',
          '[class*="company"]',
          '[class*="brand"]'
        ];
        
        for (const selector of issuerSelectors) {
          issuer = getTextContent(selector);
          if (issuer && issuer.length > 0 && !issuer.includes('[object')) {
            break;
          }
        }
        
        // Fallback: try to extract from surrounding text
        if (!issuer || issuer.includes('[object')) {
          const allText = container.innerText || container.textContent || '';
          // Look for common issuer patterns
          const issuerPatterns = [
            /(?:Issued by|From|Provider|Organization|Institution|Company)[:\s]+([^\n]+)/i,
            /(eLearningCurve|Databricks Academy|Databricks|dbt Labs|dbt|e-learningcurve)/i
          ];
          
          for (const pattern of issuerPatterns) {
            const match = allText.match(pattern);
            if (match && match[1]) {
              issuer = match[1].trim();
              // Normalize issuer names
              if (issuer.toLowerCase().includes('elearningcurve') || issuer.toLowerCase().includes('e-learningcurve')) {
                issuer = 'eLearningCurve';
              } else if (issuer.toLowerCase().includes('databricks')) {
                issuer = issuer.includes('Academy') ? 'Databricks Academy' : 'Databricks';
              } else if (issuer.toLowerCase().includes('dbt')) {
                issuer = 'dbt Labs';
              }
              break;
            }
          }
          
          // Last resort: check parent elements
          if (!issuer || issuer.includes('[object')) {
            let parent = container.parentElement;
            for (let i = 0; i < 3 && parent; i++) {
              const parentText = parent.innerText || parent.textContent || '';
              const match = parentText.match(/(eLearningCurve|Databricks Academy|Databricks|dbt Labs|dbt)/i);
              if (match) {
                const matched = match[0];
                if (matched.toLowerCase().includes('elearningcurve')) {
                  issuer = 'eLearningCurve';
                } else if (matched.toLowerCase().includes('databricks')) {
                  issuer = matched.includes('Academy') ? 'Databricks Academy' : 'Databricks';
                } else if (matched.toLowerCase().includes('dbt')) {
                  issuer = 'dbt Labs';
                }
                break;
              }
              parent = parent.parentElement;
            }
          }
        }
        
        // Extract description
        let description = '';
        const descSelectors = [
          '[class*="description"]',
          '[class*="summary"]',
          'p'
        ];
        
        for (const selector of descSelectors) {
          description = getTextContent(selector);
          if (description && description.length > 0 && !description.includes('[object')) {
            break;
          }
        }
        
        // Extract dates - be more comprehensive
        let issueDate = '';
        const dateSelectors = [
          '[class*="date"]',
          'time',
          '[class*="issued"]',
          '[class*="earned"]',
          '[class*="completed"]',
          '[datetime]'
        ];
        
        for (const selector of dateSelectors) {
          const dateEl = container.querySelector(selector);
          if (dateEl) {
            issueDate = dateEl.getAttribute('datetime') || getTextContent(selector);
            issueDate = issueDate.trim();
            if (issueDate && issueDate.length > 0 && !issueDate.includes('[object')) {
              break;
            }
          }
        }
        
        // Fallback: look for date patterns in text - multiple formats
        if (!issueDate || issueDate.includes('[object')) {
          const allText = container.innerText || container.textContent || '';
          const datePatterns = [
            /(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}/i,
            /\d{1,2}\/\d{1,2}\/\d{4}/,
            /\d{4}-\d{2}-\d{2}/
          ];
          
          for (const pattern of datePatterns) {
            const match = allText.match(pattern);
            if (match) {
              issueDate = match[0];
              break;
            }
          }
        }
        
        // Find links
        const linkEl = container.querySelector('a[href*="credential.net"], a[href*="accredible"]');
        const verifyEl = container.querySelector('a[href*="verify"], [class*="verify"]');
        
        // Generate ID from image URL or index
        const imageId = img.src.match(/\/([^\/]+)\.png$/)?.[1] || `cred-${idx}`;
        const credentialId = container.getAttribute('data-credential-id') || 
                           container.getAttribute('data-badge-id') ||
                           container.getAttribute('id') || 
                           (linkEl ? linkEl.href.match(/credentials?\/([^\/]+)/)?.[1] : null) ||
                           `accredible-${imageId}`;
        
        const credential = {
          id: credentialId,
          name: (name || '').trim(),
          issuer: (issuer || '').trim(),
          imageUrl: img.src,
          imageAlt: (img.alt || name || '').trim(),
          description: (description || '').trim(),
          url: linkEl?.href || `https://www.credential.net/profile/thomasbohn/wallet`,
          verifyUrl: verifyEl?.href || null,
          issueDate: (issueDate || '').trim(),
          // Include raw text for post-processing
          rawText: rawText || ''
        };
        
        // Minimal filtering during extraction - just filter obvious logos
        // We'll do proper filtering, deduplication, and name cleaning in post-processing
        const imageUrlLower = credential.imageUrl.toLowerCase();
        const isLogo = imageUrlLower.includes('accredible_logo') ||
                      imageUrlLower.includes('accredible_credential_net_logo');
        
        // Keep everything with a credential.net image (except logos) for post-processing
        if (!isLogo && credential.imageUrl && credential.imageUrl.includes('credential.net')) {
          data.credentials.push(credential);
        } else {
          console.log(`Filtered out container ${idx + 1}: isLogo=${isLogo}, hasImageUrl=${!!credential.imageUrl}`);
        }
    });
    
    console.log(`\nProcessing summary:`);
    console.log(`  - Total containers found: ${foundElements.size}`);
    console.log(`  - Containers processed: ${processedCount}`);
    console.log(`  - Containers skipped: ${skippedCount}`);
    console.log(`  - Credentials extracted before dedup: ${data.credentials.length}`);
    
    // Deduplicate based on image URL - these are true duplicates
    // Same image URL = same credential (even if metadata extraction failed)
    console.log(`\nDeduplicating based on image URL...`);
    const seen = new Set();
    const beforeDedup = data.credentials.length;
    const duplicates = [];
    
    data.credentials = data.credentials.filter(credential => {
      const key = credential.imageUrl;
      if (seen.has(key)) {
        duplicates.push(credential);
        return false;
      }
      seen.add(key);
      return true;
    });
    
    console.log(`After deduplication: ${data.credentials.length} unique credentials (removed ${beforeDedup - data.credentials.length} duplicates)`);
    if (duplicates.length > 0) {
      console.log(`\nRemoved duplicates (same image URL):`);
      duplicates.forEach((dup, i) => {
        if (i < 5) { // Only show first 5 to avoid spam
          console.log(`  - ${dup.name} (${dup.imageUrl.substring(0, 50)}...)`);
        }
      });
      if (duplicates.length > 5) {
        console.log(`  ... and ${duplicates.length - 5} more`);
      }
    }
  };
  
  // Run extraction
  extractCredentials();
  
  // Output results
  console.log(`\nExtracted ${data.credentials.length} credentials`);
  if (data.credentials.length > 0) {
    console.log('\nCredentials found:');
    data.credentials.forEach((cred, idx) => {
      console.log(`  ${idx + 1}. ${cred.name} (${cred.issuer || 'Unknown issuer'})`);
    });
  }
  console.log('\n=== COPY THE JSON BELOW ===\n');
  console.log(JSON.stringify(data, null, 2));
  console.log('\n=== END OF JSON ===\n');
  
  return data;
})();
