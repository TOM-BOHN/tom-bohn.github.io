# Deployment Guide

This site is configured to deploy automatically to GitHub Pages using GitHub Actions.

## Automatic Deployment

1. Push changes to the `main` branch
2. GitHub Actions will automatically build and deploy the site
3. The site will be available at `https://[your-username].github.io`

## Manual Deployment

If you need to deploy manually:

```bash
# Build the site
npm run build

# The static files will be in the out/ directory
# You can commit and push these files to the gh-pages branch
```

## Custom Domain Setup

### For Cloudflare Users (thomaslbohn.com)

1. Create a `CNAME` file in the `public/` directory with your domain:
   ```
   thomaslbohn.com
   ```
   Or if you want to use www:
   ```
   www.thomaslbohn.com
   ```

2. Configure DNS records in Cloudflare:
   
   **For Apex Domain (thomaslbohn.com):**
   - Go to Cloudflare Dashboard > DNS > Records
   - Add a **CNAME** record (Cloudflare supports CNAME flattening for apex domains):
     - **Name**: `@` or `thomaslbohn.com`
     - **Target**: `tom-bohn.github.io`
     - **Proxy status**: DNS only (gray cloud) - **Important**: Disable proxy for GitHub Pages
     - **TTL**: Auto
   
   **For www Subdomain (www.thomaslbohn.com):**
   - Add a **CNAME** record:
     - **Name**: `www`
     - **Target**: `tom-bohn.github.io`
     - **Proxy status**: DNS only (gray cloud)
     - **TTL**: Auto
   
   **Alternative for Apex Domain (if CNAME doesn't work):**
   - Add **A** records pointing to GitHub's IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **Proxy status**: DNS only (gray cloud)

3. Enable custom domain in GitHub repository settings:
   - Go to Settings > Pages
   - Under "Custom domain", enter `thomaslbohn.com` (or `www.thomaslbohn.com`)
   - Click "Save"
   - GitHub will automatically create/update the CNAME file
   - Enable "Enforce HTTPS" (may take a few minutes after DNS propagates)

4. Wait for DNS propagation:
   - Cloudflare typically propagates quickly (5-15 minutes)
   - GitHub's SSL certificate may take up to 24 hours to provision
   - Check status in GitHub Settings > Pages

### Important Cloudflare Notes:
- **Always use "DNS only" (gray cloud)** for GitHub Pages - proxying through Cloudflare can cause issues
- Cloudflare's CNAME flattening allows apex domains to use CNAME records
- If you want to use Cloudflare's CDN/proxy features, consider using a subdomain instead

## GitHub Pages Settings

1. Go to your repository Settings
2. Navigate to Pages
3. Source should be set to "GitHub Actions" (automatic deployment)
4. Custom domain can be configured here as well
