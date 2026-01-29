# Cloud Agent Instructions

These instructions are for automated changes in this repository. The main
priority is to keep the site building successfully after every change.

## Required checks (always run)

1. Install dependencies (if not already installed):
   - `npm install`
2. Run the production build:
   - `npm run build`

## Build failure workflow (mandatory)

If the build fails, you must:

1. Read the full build output and identify the error source.
2. Fix the error in code or configuration.
3. Re-run `npm run build`.
4. Repeat until the build succeeds.

Do not stop after a failed build. Keep iterating until it passes.

---

## UI Testing & Screenshot Process (for UI changes)

When making UI changes (styling, components, layout, animations, etc.), you MUST follow this process to verify and document the changes visually.

### Step 1: Build the site

```bash
npm install
npm run build
```

### Step 2: Start the local server

This site uses static export, so use `serve` to host the built files:

```bash
npx serve out -l 3000 &
```

Wait for the server to start, then verify it's running:

```bash
curl -s http://localhost:3000 -o /dev/null -w "%{http_code}"
# Should return 200
```

### Step 3: Take screenshots with Puppeteer

Puppeteer is already installed as a dev dependency. Run this inline script to capture screenshots:

```bash
node -e "
const puppeteer = require('puppeteer');
const path = require('path');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function takeScreenshots() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Desktop viewport
  await page.setViewport({ width: 1440, height: 900 });
  
  // Light mode screenshot
  console.log('Taking light mode screenshot...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  await delay(1500); // Wait for animations
  await page.screenshot({ 
    path: path.join('/workspace', 'public', 'screenshot-light-mode.png'),
    fullPage: false
  });
  
  // Full page light mode
  console.log('Taking full page light mode...');
  await page.screenshot({ 
    path: path.join('/workspace', 'public', 'screenshot-light-full.png'),
    fullPage: true
  });
  
  // Dark mode screenshot
  console.log('Taking dark mode screenshot...');
  await page.evaluate(() => {
    const darkBtn = document.querySelector('button[aria-label=\"Dark theme\"]');
    if (darkBtn) darkBtn.click();
  });
  await delay(800);
  await page.screenshot({ 
    path: path.join('/workspace', 'public', 'screenshot-dark-mode.png'),
    fullPage: false
  });
  
  // Full page dark mode
  console.log('Taking full page dark mode...');
  await page.screenshot({ 
    path: path.join('/workspace', 'public', 'screenshot-dark-full.png'),
    fullPage: true
  });
  
  // Mobile view
  console.log('Taking mobile screenshot...');
  await page.setViewport({ width: 375, height: 812 });
  await delay(800);
  await page.screenshot({ 
    path: path.join('/workspace', 'public', 'screenshot-mobile.png'),
    fullPage: false
  });
  
  await browser.close();
  console.log('All screenshots saved!');
}

takeScreenshots().catch(console.error);
"
```

### Step 4: Screenshot specific pages (if changes affect other pages)

For changes to specific pages (e.g., `/about`, `/blog`, `/projects`), modify the script above to navigate to those pages:

```javascript
// Example: Screenshot the about page
await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });
await delay(1000);
await page.screenshot({ 
  path: '/workspace/public/screenshot-about.png',
  fullPage: true
});
```

### Step 5: Share screenshots in the chat

After taking screenshots, use the Read tool to display them in the chat:

```
Read the image file: /workspace/public/screenshot-light-mode.png
Read the image file: /workspace/public/screenshot-dark-mode.png
// etc.
```

This allows the user to review the UI changes visually before merging.

### Step 6: Commit screenshots (optional)

If the user wants screenshots included in the PR for documentation:

```bash
git add public/screenshot*.png
git commit -m "docs: Add UI screenshots for PR review"
git push origin <branch-name>
```

---

## Screenshot Checklist

For UI changes, capture at minimum:

| Screenshot | Description | Required |
|------------|-------------|----------|
| `screenshot-light-mode.png` | Homepage in light mode | Yes |
| `screenshot-dark-mode.png` | Homepage in dark mode | Yes |
| `screenshot-mobile.png` | Mobile viewport | Yes (for responsive changes) |
| `screenshot-<page>.png` | Specific pages with changes | If applicable |
| `screenshot-*-full.png` | Full page captures | Recommended |

---

## Page-Specific Screenshots

When changes affect specific pages, take targeted screenshots:

| Page | URL | When to capture |
|------|-----|-----------------|
| Homepage | `/` | Always for UI changes |
| About | `/about` | Changes to about page or global layout |
| Blog | `/blog` | Changes to blog listing or cards |
| Blog Post | `/blog/[slug]` | Changes to blog post layout |
| Projects | `/projects` | Changes to project cards or sections |
| Certifications | `/certifications` | Changes to cert display |
| Hub | `/hub` | Changes to hub/linktree layout |
| Links | `/links` | Changes to links page |
| V2ME | `/v2me` | Changes to V2ME components |
| Contact | `/contact` | Changes to contact page |

---

## Troubleshooting

### Server won't start
- Kill any existing processes: `pkill -f "serve out"`
- Try a different port: `npx serve out -l 3001`

### Puppeteer errors
- Ensure `--no-sandbox` flag is used
- Use `delay()` helper instead of deprecated `page.waitForTimeout()`
- Increase timeout for slow pages

### Screenshots are blank or incomplete
- Increase delay after navigation (animations need time)
- Check if page requires JavaScript hydration
- Verify server is responding: `curl http://localhost:3000`

---

## Notes

- The `export` script is currently the same as `build`, so `npm run build`
  is the canonical check for release readiness.
- If you are only changing content or links, the build is still required.
- Screenshots should be taken AFTER the build succeeds.
- Always share screenshots in the chat for user review before completing the task.
