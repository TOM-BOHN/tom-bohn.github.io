# Quick Start Guide

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see your site.

3. **Build for Production**
   ```bash
   npm run build
   ```
   This creates static files in the `out/` directory.

## Adding Your Content

### 1. Update About Page
Edit `app/about/page.tsx` and replace the placeholder text with your information.

### 2. Add Blog Posts
Create markdown files in `content/blog/`:
- Format: `YYYY-MM-DD-title.md`
- Include frontmatter:
  ```markdown
  ---
  title: "Your Post Title"
  date: "2024-01-15"
  excerpt: "A brief description"
  mediumUrl: "https://medium.com/@yourusername/your-post-slug"  # Optional: link to Medium article
  ---
  
  Your content here...
  ```

### 3. Add Projects
Edit `data/projects.json`:
```json
[
  {
    "id": "project-1",
    "title": "My Project",
    "description": "Project description",
    "url": "https://example.com",
    "tags": ["React", "Next.js"]
  }
]
```

### 4. Add Links
Edit `data/links.json`:
```json
{
  "Development Tools": [
    {
      "id": "link-1",
      "title": "Tool Name",
      "url": "https://example.com",
      "description": "What it's for"
    }
  ]
}
```

### 5. Add Certifications
Edit `data/certifications.json`:
```json
[
  {
    "id": "cert-1",
    "title": "Certification Name",
    "issuer": "Issuing Organization",
    "date": "2024-01-15",
    "description": "Description",
    "url": "https://credential-url.com",
    "status": "completed"
  }
]
```

### 6. Add Hub Links
Edit `data/hub/hub.json`:
```json
[
  {
    "id": "hub-1",
    "title": "LinkedIn",
    "url": "https://linkedin.com/in/yourprofile",
    "description": "Professional network"
  }
]
```

### 7. Update Contact Page
Edit `app/contact/page.tsx` and add your contact information.

## Theme Toggle

The site includes a theme toggle button in the header:
- **Modern Mode**: Clean, professional design
- **Xanga Mode**: Nostalgic 2000s web design with Comic Sans, bright colors, and retro styling

Users can toggle between themes, and their preference is saved in localStorage.

## Customization

### Colors
Edit CSS variables in `app/globals.css`:
- Modern theme: `:root` selector
- Xanga theme: `[data-theme="xanga"]` selector

### Styling
The site uses Tailwind CSS. You can customize the theme in `tailwind.config.ts`.

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: react-icons
- **Content**: Markdown with remark

## Deployment

The site is configured for automatic deployment to GitHub Pages via GitHub Actions. Just push to the `main` branch!

For custom domain setup, see `DEPLOYMENT.md`.

## Built with Cursor AI

This website was designed and implemented with the help of [Cursor AI](https://cursor.com), an AI-powered code editor that assists with development workflows.
