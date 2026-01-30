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

### Step 3: Ensure screenshots directory exists

All screenshots should be saved to `public/screenshots/` directory:

```bash
mkdir -p public/screenshots
```

### Step 4: Take screenshots with Puppeteer

Puppeteer is already installed as a dev dependency. Run this inline script to capture screenshots of all major pages:

```bash
node -e "
const puppeteer = require('puppeteer');
const path = require('path');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const SCREENSHOT_DIR = '/workspace/public/screenshots';

async function takeScreenshots() {
  console.log('Starting puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Pages to screenshot - add/remove based on what changed
  // Public pages
  const pages = [
    { name: 'home', url: '/' },
    { name: 'about', url: '/about' },
    { name: 'blog', url: '/blog' },
    { name: 'projects', url: '/projects' },
    { name: 'certifications', url: '/certifications' },
    { name: 'contact', url: '/contact' },
    // VIP pages
    { name: 'hub', url: '/hub' },
    { name: 'links', url: '/links' },
    { name: 'v2me', url: '/v2me' },
  ];
  
  // Desktop viewport
  await page.setViewport({ width: 1440, height: 900 });
  
  // Take screenshots in dark mode first
  console.log('\\n=== DARK MODE SCREENSHOTS ===');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(() => {
    const darkBtn = document.querySelector('button[aria-label=\"Dark theme\"]');
    if (darkBtn) darkBtn.click();
  });
  await delay(500);
  
  for (const p of pages) {
    console.log('Taking dark mode screenshot: ' + p.name + '...');
    await page.goto('http://localhost:3000' + p.url, { waitUntil: 'networkidle0', timeout: 30000 });
    await delay(1000);
    await page.screenshot({ 
      path: path.join(SCREENSHOT_DIR, 'screenshot-' + p.name + '-dark.png'),
      fullPage: false
    });
  }
  
  // Take screenshots in light mode
  console.log('\\n=== LIGHT MODE SCREENSHOTS ===');
  await page.evaluate(() => {
    const lightBtn = document.querySelector('button[aria-label=\"Light theme\"]');
    if (lightBtn) lightBtn.click();
  });
  await delay(500);
  
  for (const p of pages) {
    console.log('Taking light mode screenshot: ' + p.name + '...');
    await page.goto('http://localhost:3000' + p.url, { waitUntil: 'networkidle0', timeout: 30000 });
    await delay(1000);
    await page.screenshot({ 
      path: path.join(SCREENSHOT_DIR, 'screenshot-' + p.name + '-light.png'),
      fullPage: false
    });
  }
  
  // Mobile screenshots (dark mode)
  console.log('\\n=== MOBILE SCREENSHOTS ===');
  await page.setViewport({ width: 375, height: 812 });
  await page.evaluate(() => {
    const darkBtn = document.querySelector('button[aria-label=\"Dark theme\"]');
    if (darkBtn) darkBtn.click();
  });
  await delay(500);
  
  for (const p of pages) {
    console.log('Taking mobile dark screenshot: ' + p.name + '...');
    await page.goto('http://localhost:3000' + p.url, { waitUntil: 'networkidle0', timeout: 30000 });
    await delay(800);
    await page.screenshot({ 
      path: path.join(SCREENSHOT_DIR, 'screenshot-' + p.name + '-mobile-dark.png'),
      fullPage: false
    });
  }
  
  await browser.close();
  console.log('\\nAll screenshots saved to public/screenshots/');
}

takeScreenshots().catch(console.error);
"
```

### Step 5: Share screenshots in the chat

After taking screenshots, use the Read tool to display them in the chat:

```
Read the image file: /workspace/public/screenshots/screenshot-home-dark.png
Read the image file: /workspace/public/screenshots/screenshot-home-light.png
Read the image file: /workspace/public/screenshots/screenshot-about-dark.png
// etc.
```

This allows the user to review the UI changes visually before merging.

### Step 6: Commit screenshots (optional)

If the user wants screenshots included in the PR for documentation:

```bash
git add public/screenshots/
git commit -m "docs: Add UI screenshots for PR review"
git push origin <branch-name>
```

---

## Screenshot Directory Structure

All screenshots are saved to `public/screenshots/` with the following naming convention:

```
public/screenshots/
├── screenshot-{page}-dark.png       # Desktop dark mode
├── screenshot-{page}-light.png      # Desktop light mode
├── screenshot-{page}-mobile-dark.png # Mobile dark mode
```

Where `{page}` is one of: `home`, `about`, `blog`, `projects`, `certifications`, `contact`, `hub`, `links`, `v2me`

---

## Screenshot Checklist

For UI changes, the script automatically captures:

| Screenshot Type | Description | Files Generated |
|-----------------|-------------|-----------------|
| Desktop Dark Mode | All pages in dark theme | `screenshot-*-dark.png` |
| Desktop Light Mode | All pages in light theme | `screenshot-*-light.png` |
| Mobile Dark Mode | All pages in mobile viewport | `screenshot-*-mobile-dark.png` |

### Minimum Required Screenshots

| Screenshot | Required |
|------------|----------|
| Homepage (both themes) | Always |
| Pages with changes | Yes |
| Mobile view | Yes (for responsive/nav changes) |

---

## Page-Specific Screenshots

The standard script captures these pages:

### Public Pages

| Page | URL | When to capture |
|------|-----|-----------------|
| Homepage | `/` | Always for any UI changes |
| About | `/about` | Global layout, typography changes |
| Blog | `/blog` | Card styles, listing changes |
| Projects | `/projects` | Card styles, section changes |
| Certifications | `/certifications` | Accordion, badge display changes |
| Contact | `/contact` | Form styles, layout changes |

### VIP Pages (included in standard script)

| Page | URL | When to capture |
|------|-----|-----------------|
| Hub | `/hub` | Linktree-style layout, section styling |
| Links | `/links` | Links directory, section styling |
| V2ME | `/v2me` | V2ME framework components, progress bar |

### Additional pages (add to script if needed):

| Page | URL | When to capture |
|------|-----|-----------------|
| Blog Post | `/blog/[slug]` | Blog content styling |

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
