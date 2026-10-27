# Data Directory

JSON and related source data for the site, organized by concern.

## Structure

```
data/
├── badges/                 # Badge/credential extracts by source
│   ├── credly/             # raw.json, cached.json, organized.json
│   ├── trailhead/          # raw.json, cached.json
│   └── accredible/         # raw.json, cached.json (+ mapping docs)
├── learning/               # Certifications & Learning page
│   ├── learning.json       # Education, certification groups, goals
│   └── README.md
├── hub/
│   └── hub.json            # Hub sections and links
├── links.json              # Links page categories
├── projects.json           # Projects themes + artifacts
├── v2me.json               # V2ME framework data
└── medium-homepage.json    # Featured Medium articles for the homepage
```

Learning / certifications content lives in `data/learning/learning.json` (not a top-level `certifications.json`).

## Adding Badge Sources

Create `data/badges/<source>/` with `raw.json` / `cached.json` (and `organized.json` if needed), plus matching scripts under `scripts/<source>-badge/`.
