# About this marketplace

Multivers.io is focused on reducing barriers to adopting and developing open geospatial technology. This marketplace is a simple public entry point for software, experiments, plugins, examples, and downloadable artifacts produced through that work.

## Publishing model

The site deliberately stays static. GitHub Pages serves the catalog; `projects.json` describes what appears in it; each card can link independently to a source repository and/or a downloadable artifact. Downloads can therefore live in GitHub Releases, an operations repository, object storage, or another distribution service without coupling the marketplace to that infrastructure.

## Project metadata

Each project has an `id`, `name`, `description`, `type`, and `tags`. Optional `repository` and `download` fields control which action buttons appear. Set `featured` to `true` to visually highlight a project.
