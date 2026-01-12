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

1. Create a `CNAME` file in the `public/` directory with your domain:
   ```
   www.yourdomain.com
   ```

2. Configure DNS records with your domain registrar:
   - For apex domain: Add A records pointing to GitHub's IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - For www subdomain: Add CNAME record pointing to `[your-username].github.io`

3. Enable custom domain in GitHub repository settings:
   - Go to Settings > Pages
   - Enter your custom domain
   - Enable "Enforce HTTPS"

4. Wait for DNS propagation (can take up to 48 hours)

## GitHub Pages Settings

1. Go to your repository Settings
2. Navigate to Pages
3. Source should be set to "GitHub Actions" (automatic deployment)
4. Custom domain can be configured here as well
