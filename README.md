# Remote Audit of Detection Tool

This repository publishes the browser-based thermal detection review tool in
`web/`. It runs entirely in the browser and supports importing a video and
JSON detections, reviewing frames and clips, editing boxes, and exporting the
reviewed annotations.

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` publishes `web/` to
GitHub Pages whenever `main` changes. The deployed site is expected at:

`https://k2559.github.io/Remote-audit-of-detection-tool/`

## Local development

Open `web/index.html` directly, or serve the `web/` directory with any static
HTTP server. No backend is required.
