# tom-bohn.github.io

Personal website built with Next.js, React, and TypeScript, featuring a modern design with a nostalgic Xanga mode toggle. Designed and implemented with the help of [Cursor AI](https://cursor.com).

## 🌐 Live Site

Visit the site at [thomaslbohn.com](https://thomaslbohn.com)

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16.1.1 (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [react-icons](https://react-icons.github.io/react-icons/)
- **Content**: Markdown with [remark](https://remark.js.org/) for blog posts
- **Deployment**: GitHub Pages (static export)

## ✨ Features

- 🏠 **Home/Landing page** - Introduction and featured work
- 📝 **About page** - Professional background, technical expertise, and personal highlights
- 📰 **Blog** - Markdown-based blog with Medium integration
- 📧 **Contact page** - Multiple ways to get in touch
- 💼 **Projects/Portfolio** - Theme-based project organization with artifacts and deliverables
- 🔗 **Links** - Curated directory of tools, services, and documentation
- 🎓 **Certifications & Learning** - Professional credentials and learning journey with expand/collapse controls
- 🌐 **Hub** - Linktree-style page with all online presence
- 📊 **V2ME** - Interactive personal V2MOM (Vision, Values, Methods, Obstacles, Measures) framework with drag-and-drop reordering, markdown editing, and JSON import/export
- 🎨 **Xanga Mode** - 2000s nostalgia theme with:
  - Customizable sidebar position (left, right, or hidden)
  - Sidebar applets (Profile, Music Player, Weather, etc.)
  - Compact SoundCloud player integration
  - Retro color palette and styling

## 🚀 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Export static site for GitHub Pages
npm run export
```

The development server will be available at `http://localhost:3000`.

## 📁 Project Structure

```
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
│   ├── projects/         # Projects-related components
│   ├── v2me/              # V2ME framework components
│   ├── xanga/            # Xanga theme components
│   │   └── applets/      # Xanga sidebar applets
│   ├── Footer.tsx        # Site footer
│   ├── Header.tsx        # Site header/navigation
│   ├── ThemeProvider.tsx # Theme context provider
│   ├── XangaShell.tsx    # Xanga theme shell
│   └── XangaLayoutWrapper.tsx # Xanga sidebar state management
├── content/              # Content files
│   └── blog/             # Markdown blog posts
├── data/                 # JSON data files
│   ├── badges/           # Badge data (Credly, Accredible, Trailhead)
│   ├── hub/              # Hub configuration
│   ├── learning/         # Learning data
│   ├── certifications.json
│   ├── links.json
│   ├── projects.json
│   └── v2me.json         # V2ME framework data
├── lib/                  # Utility functions
│   ├── blog.ts           # Blog post utilities
│   ├── certifications.ts # Certification utilities
│   ├── hub.ts            # Hub utilities
│   ├── links.ts          # Links utilities
│   ├── projects.ts       # Projects utilities
│   └── v2me.ts           # V2ME framework utilities
├── scripts/              # Build and data scripts
│   ├── credly-badge/     # Credly badge fetcher
│   ├── accredible-badge/ # Accredible badge fetcher
│   └── trailhead-badge/  # Trailhead badge fetcher
└── public/               # Static assets
    ├── icons/            # Site favicon and PWA icons (SVG + generated PNGs)
    ├── images/           # General images (e.g. profile photo)
    ├── badges/           # Badge images
    └── education/        # Education images
```

## 🚢 Deployment

This site is configured for GitHub Pages. After building, the `out/` directory contains the static files ready for deployment.

The site uses Next.js static export (`output: 'export'`) which generates a fully static site that can be hosted on GitHub Pages.

## 🌍 Custom Domain

The `CNAME` file is located in the `public/` directory. This ensures it's included in the static export and deployed to GitHub Pages, enabling the custom domain `thomaslbohn.com`.

## 🖼️ Icons

Site icons live in `public/icons/`:

- **icon.svg** – Source favicon (TLB on orange–blue gradient), sized so TLB stays visible when shown in a circle (e.g. in search results).
- **apple-touch-icon.png**, **android-chrome-192x192.png**, **android-chrome-512x512.png** – PNGs generated from the SVG.

To regenerate PNGs after editing the SVG: `npm run generate:icons` (requires `sharp` as a devDependency).

## 🖼️ Social Share Image

`public/images/og-image.png` is the Open Graph / Twitter Card image shown when a link to the site is shared. It's generated from `public/images/profile.jpg` plus the site's brand colors.

To regenerate it after updating the profile photo or brand colors: `npm run generate:og-image` (requires `sharp` as a devDependency).

## 📝 Content Management

- **Blog Posts**: Written in Markdown and stored in `content/blog/`
- **Medium Sync**: Run `npm run sync:medium` to import missing Medium posts into `content/blog/` and refresh homepage featured Medium links
- **Links**: Managed via JSON files in `data/links.json`
- **Hub Content**: Configured in `data/hub/hub.json`
- **Learning Data**: Stored in `data/learning/learning.json`

## 🎨 Design System

The site uses a custom design system built on Tailwind CSS with:
- **Tableau Color Blind Palette** - Blue-orange diverging color scheme for accessibility
- Consistent color palette (accent colors, text colors, backgrounds)
- Responsive design patterns
- Dark/light/Xanga theme support
- Custom typography with monospace accents
- Xanga theme with reduced borders, smaller fonts, and retro styling

## 🎮 Interactive Features

- **V2ME Framework**: 
  - Drag-and-drop reordering of items
  - Markdown editing with live preview
  - JSON import/export functionality
  - Progress tracking for Methods and Measures
  - Expand/collapse controls at page and section levels

- **Xanga Sidebar Controls**:
  - Position sidebar on left, right, or hide completely
  - Icon-based controls with hover tooltips
  - State persistence across page reloads
  - Dynamic header icon replacement when sidebar is hidden

- **Page-Level Controls**:
  - Expand/collapse all items on Learning, Projects, and V2ME pages
  - Section-level expand/collapse for better content organization

## 🤝 Contributing

This is a personal website, but suggestions and feedback are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

All rights reserved. This is a personal website and portfolio.

---

**Built with help from [Cursor AI](https://cursor.com)**
