# Data Directory

This directory contains all data files for the website, organized by concern.

## Structure

```
data/
├── badges/              # Badge/credential data by source
│   ├── credly/          # Credly-specific badge data
│   │   ├── raw.json     # Raw extracted badge data
│   │   ├── cached.json  # Processed badge data with metadata
│   │   └── organized.json # Badges organized by category
│   └── trailhead/       # Trailhead-specific badge data
│       ├── raw.json     # Raw extracted badge data
│       └── cached.json  # Processed badge data with metadata
├── learning/            # Learning section data
│   ├── learning.json    # Certification groups and learning goals
│   ├── setup-notes.md   # Setup instructions for badge images
│   └── README.md        # Learning section documentation
├── hub/                 # Hub page data
│   ├── hub.json        # Hub sections and links
│   └── todos.md        # Hub page todos
├── certifications.json  # Certifications page data
├── links.json          # Links page data
└── projects.json       # Projects page data
```

## Adding New Badge Sources

When adding scripts for a new badge/credential platform (e.g., Credential.net), create a new subdirectory:

```
data/badges/
└── credential-net/
    ├── raw.json
    ├── cached.json
    └── organized.json
```

## File Locations

- **Badge data**: `data/badges/{source}/`
- **Learning data**: `data/learning/`
- **Hub data**: `data/hub/`
- **General site data**: `data/` (root level)
