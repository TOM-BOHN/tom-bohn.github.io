# Contributing

This is a personal website, but if you have suggestions or find issues, feel free to open an issue or submit a pull request.

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
tom-bohn.github.io/
├── app/              # Next.js app directory (pages)
├── components/       # React components
├── lib/              # Utility functions and data fetching
├── data/             # JSON data files (projects, links, etc.)
├── content/          # Markdown content (blog posts)
├── public/           # Static assets
└── .github/          # GitHub Actions workflows
```

## Adding Content

### Blog Posts
- Create markdown files in `content/blog/`
- Format: `YYYY-MM-DD-title.md`
- Include frontmatter with `title`, `date`, and `excerpt`

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
- Edit `data/hub.json`
- Add link objects for your online presence

## Building for Production

```bash
npm run build
```

This creates a static export in the `out/` directory ready for GitHub Pages.
