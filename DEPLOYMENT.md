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
   - Add **A** records pointing to GitHub's IPv4 IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - **Proxy status**: DNS only (gray cloud)
   
   **For IPv6 Support (optional but recommended):**
   - Add **AAAA** records pointing to GitHub's IPv6 IPs:
     - `2606:50c0:8000::153`
     - `2606:50c0:8001::153`
     - `2606:50c0:8002::153`
     - `2606:50c0:8003::153`
   - **Proxy status**: DNS only (gray cloud)

3. Enable custom domain in GitHub repository settings:
   - Go to Settings > Pages (under "Code and automation" section)
   - Under "Custom domain", enter `thomaslbohn.com` (or `www.thomaslbohn.com`)
   - Click "Save"
   - GitHub will automatically create/update the CNAME file
   - GitHub will begin automatic DNS check to verify configuration
   - A check mark will appear beside your domain when certificate provisioning is complete

4. Wait for DNS propagation and certificate provisioning:
   - Cloudflare typically propagates quickly (5-15 minutes)
   - GitHub's TLS certificate provisioning may take several minutes to hours
   - Check status in GitHub Settings > Pages (look for check mark next to domain)
   - Once certificate is ready, you can enable "Enforce HTTPS"
   - If certificate doesn't provision, see troubleshooting in HTTPS Configuration section

### Important Cloudflare Notes:
- **Always use "DNS only" (gray cloud)** for GitHub Pages - proxying through Cloudflare can cause issues
- Cloudflare's CNAME flattening allows apex domains to use CNAME records
- If you want to use Cloudflare's CDN/proxy features, consider using a subdomain instead

## HTTPS Configuration

### Automatic HTTPS

- All GitHub Pages sites, including sites with custom domains, support HTTPS
- Sites created after June 15, 2016 using `github.io` domains are served over HTTPS automatically
- HTTPS adds encryption to prevent snooping and tampering with traffic to your site

### Enforcing HTTPS

To enforce HTTPS (redirect all HTTP requests to HTTPS):

1. Go to your repository Settings
2. Navigate to **Pages** (under "Code and automation" section)
3. Under "GitHub Pages," check **Enforce HTTPS**

**Note:** This option may not be available immediately after setting up a custom domain. Wait for the SSL certificate to be provisioned (see troubleshooting below).

### Troubleshooting Certificate Provisioning

If you see a "Certificate not yet created" error:

1. **Wait for DNS propagation**: After setting/changing your custom domain, GitHub automatically checks DNS configuration
2. **Verify DNS settings**: Ensure your DNS records match GitHub's requirements (see Custom Domain Setup above)
3. **Restart provisioning**: If the process hasn't completed after several minutes:
   - Click **Remove** next to your custom domain
   - Retype the domain name and click **Save** again
   - This will cancel and restart the certificate provisioning process

### Mixed Content Issues

If you enable HTTPS but your site still references assets over HTTP, you'll have **mixed content** issues:

- **Problem**: Mixed content makes your site less secure and can cause assets to fail loading
- **Solution**: Update all asset references from `http://` to `https://` in your HTML files
- **Common locations**:
  - CSS: `<link>` tags in `<head>` section
  - JavaScript: `<script>` tags in `<head>` or before `</body>`
  - Images: `<img>` tags in `<body>` section

**Tip**: Search your source files for `http://` to find all HTTP references.

### DNS Configuration for HTTPS

To ensure HTTPS certificates generate correctly:

- **Apex domain** (`example.com`): Use A records pointing to GitHub IPs OR ALIAS/ANAME to `username.github.io`
- **Subdomain** (`www.example.com`): Use CNAME pointing to `username.github.io`
- **Avoid**: Extra A, AAAA, ALIAS, ANAME, or CNAME records that may conflict with GitHub Pages requirements

**Domain Length Limitation**: The entire domain name must be less than 64 characters for certificate creation (per RFC3280).

## GitHub Pages Settings

1. Go to your repository Settings
2. Navigate to **Pages** (under "Code and automation" section)
3. Source should be set to "GitHub Actions" (automatic deployment)
4. Custom domain can be configured here
5. **Enforce HTTPS** can be enabled here (after certificate is provisioned)

## Security Notes

⚠️ **Important**: GitHub Pages sites are publicly available on the internet, even if the repository is private (depending on your plan). 

- Do not use GitHub Pages for sensitive transactions (passwords, credit card numbers)
- Remove sensitive data from your repository before publishing
- Always enforce HTTPS for production sites

For more information, see [GitHub's HTTPS documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).
