# Scripts Directory

This directory contains scripts organized by service/platform for extracting and processing badge/credential data.

## Structure

Each subdirectory contains scripts and documentation for a specific badge/credential platform:

- **`credly-badge/`** - Scripts for extracting and organizing badges from Credly profiles
- **`trailhead-badge/`** - Scripts for extracting and organizing badges from Salesforce Trailhead profiles
- **`accredible-badge/`** - Scripts for extracting and organizing credentials from Accredible (credential.net) wallets

## Adding New Platforms

When adding scripts for a new platform, create a new subdirectory following this structure:

```
scripts/
└── platform-name/
    ├── README.md          # Overview of scripts
    ├── INSTRUCTIONS.md    # Step-by-step usage guide
    └── [script files]     # Platform-specific scripts
```
