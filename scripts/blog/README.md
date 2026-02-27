# Blog Sync Scripts

This directory contains automation for keeping website blog content in sync with Medium.

## `sync-medium-content.js`

Sync workflow:

1. Fetches all articles from the Medium RSS feed (`https://medium.com/feed/@ThomasLBohn` by default).
2. Compares feed items with existing local blog posts (`content/blog/*.md`) using `mediumUrl`.
3. Creates missing markdown blog pages for articles that do not exist yet.
4. Scores and selects featured Medium articles for the homepage module.
5. Updates `data/medium-homepage.json` with the selected articles.

### Run

```bash
npm run sync:medium
```

### Optional environment variables

- `MEDIUM_PROFILE` (default: `ThomasLBohn`)
- `MEDIUM_FEED_URL` (default: `https://medium.com/feed/@<MEDIUM_PROFILE>`)
- `MEDIUM_PROFILE_URL` (default: `https://medium.com/@<MEDIUM_PROFILE>`)
- `MEDIUM_HOMEPAGE_LIMIT` (default: `3`)
