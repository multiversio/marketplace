# Multivers.io Marketplace

A lightweight public gallery for Multivers.io open geospatial projects, plugins, experiments, and downloadable artifacts.

The site is built with **MkDocs + Material for MkDocs** and is intended to be published with **GitHub Pages**. The marketplace itself contains no backend: project cards are loaded from `docs/assets/data/projects.json`, and actions point to GitHub repositories, releases, ZIP files, or any external download URL you control.

## Quick start

```bash
make install
make serve
```

Open `http://127.0.0.1:8000`.

## Add a project

Edit `docs/assets/data/projects.json` and append an object. Example:

```json
{
  "id": "my-plugin",
  "name": "My GeoServer Plugin",
  "description": "A short explanation of what this artifact does.",
  "type": "Plugin",
  "tags": ["GeoServer", "Java"],
  "repository": "https://github.com/multiversio/my-plugin",
  "download": "https://github.com/multiversio/my-plugin/releases/latest/download/my-plugin.zip",
  "featured": false
}
```

`repository` and `download` are optional. The UI only renders actions that exist.

## Commands

- `make install` — install MkDocs dependencies.
- `make serve` — local development server with live reload.
- `make build` — production build into `site/`.
- `make check` — strict build, useful in CI.
- `make clean` — remove generated site.

## GitHub Pages

The included workflow deploys `main` automatically to GitHub Pages. In the repository settings select **Settings → Pages → Source: GitHub Actions**.

## Structure

```text
.
├── .github/workflows/pages.yml
├── docs/
│   ├── index.md
│   ├── about.md
│   └── assets/
│       ├── data/projects.json
│       ├── javascripts/marketplace.js
│       ├── stylesheets/marketplace.css
│       └── images/
├── Makefile
├── mkdocs.yml
└── requirements.txt
```
