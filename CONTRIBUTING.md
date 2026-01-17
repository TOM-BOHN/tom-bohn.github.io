# Contributing

This is a personal website, but if you have suggestions or find issues, feel free to open an issue or submit a pull request.

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: react-icons
- **Content**: Markdown with remark

## Project Structure

```
tom-bohn.github.io/
├── app/                  # Next.js App Router pages
│   ├── about/            # About page
│   ├── blog/             # Blog listing and posts
│   │   └── [slug]/       # Dynamic blog post pages
│   ├── certifications/   # Certifications page
│   ├── contact/          # Contact page
│   ├── hub/              # Hub page
│   ├── links/            # Links page
│   ├── projects/         # Projects page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   ├── not-found.tsx     # 404 page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── hub/              # Hub-related components
│   ├── links/            # Links-related components
│   ├── xanga/            # Xanga theme components
│   ├── Footer.tsx        # Site footer
│   ├── Header.tsx        # Site header/navigation
│   ├── ThemeProvider.tsx # Theme context provider
│   └── XangaShell.tsx    # Xanga theme shell
├── lib/                  # Utility functions
│   ├── blog.ts           # Blog post utilities
│   ├── certifications.ts # Certification utilities
│   ├── hub.ts            # Hub utilities
│   ├── links.ts          # Links utilities
│   └── projects.ts       # Projects utilities
├── data/                 # JSON data files
│   ├── badges/           # Badge data (Credly, Accredible, Trailhead)
│   ├── hub/              # Hub configuration
│   ├── learning/         # Learning data
│   ├── certifications.json
│   ├── links.json
│   └── projects.json
├── content/              # Markdown content
│   └── blog/             # Blog posts
├── scripts/              # Build and data scripts
│   ├── credly-badge/     # Credly badge fetcher
│   ├── accredible-badge/ # Accredible badge fetcher
│   └── trailhead-badge/  # Trailhead badge fetcher
├── public/               # Static assets
│   ├── badges/           # Badge images
│   ├── education/        # Education images
│   └── profile.jpg       # Profile picture
└── .github/              # GitHub Actions workflows
```

## Adding Content

### Blog Posts
- Create markdown files in `content/blog/`
- Format: `YYYY-MM-DD-title.md`
- Include frontmatter with `title`, `date`, `excerpt`, and optional `mediumUrl`:
  ```markdown
  ---
  title: "Your Post Title"
  date: "2024-01-15"
  excerpt: "A brief description"
  mediumUrl: "https://medium.com/@yourusername/your-post-slug"  # Optional
  ---
  ```

### Projects
- Edit `data/projects.json`
- Add project objects with: `id`, `title`, `description`, `url`, `tags`

### Links
- Edit `data/links.json`
- Organize by category with arrays of link objects

### Certifications
- Edit `data/certifications.json`
- Add certification objects with relevant fields

### Hub Links
- Edit `data/hub/hub.json`
- Add link objects for your online presence

## Building for Production

```bash
npm run build
```

This creates a static export in the `out/` directory ready for GitHub Pages.
