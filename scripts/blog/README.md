# Blog Sync Scripts

This directory contains automation for keeping website blog content in sync with Medium.

## `sync-medium-content.js`

Sync workflow:

1. Fetches all articles from the Medium RSS feed (`https://medium.com/feed/@ThomasLBohn` by default).
2. Compares feed items with existing local blog posts (`content/blog/*.md`) using `mediumUrl`.
3. Creates missing markdown blog pages for articles that do not exist yet.
4. Refreshes existing auto-synced posts so titles stay aligned with Medium and synced summaries stay current.
5. Includes a longer multi-paragraph excerpt from each article in generated blog pages.
6. Scores and selects featured Medium articles for the homepage module.
7. Updates `data/medium-homepage.json` with the selected articles.

### Run

```bash
npm run sync:medium
```

### Optional environment variables

- `MEDIUM_PROFILE` (default: `ThomasLBohn`)
- `MEDIUM_FEED_URL` (default: `https://medium.com/feed/@<MEDIUM_PROFILE>`)
- `MEDIUM_PROFILE_URL` (default: `https://medium.com/@<MEDIUM_PROFILE>`)
- `MEDIUM_HOMEPAGE_LIMIT` (default: `3`)
- `MEDIUM_EXCERPT_MAX` (default: `320`)
- `MEDIUM_BLOG_BODY_MAX` (default: `2400`)
- `MEDIUM_BLOG_PARAGRAPH_MAX` (default: `10`)
- `MEDIUM_REFRESH_AUTOSYNCED` (default: `true`; set to `false` to avoid refreshing existing auto-synced posts)
