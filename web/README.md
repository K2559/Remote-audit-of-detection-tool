# Thermal Audit Desk

Thermal Audit Desk is a static, browser-only review and tender-reporting surface for LocateAnything pseudo-label JSON and its source video. It supports frame review, corrected detections, activity heatmaps, reviewed JSON export, and a print-ready FEHQ 1019/26 report pack based on Appendices A to D.

## Run locally

No build step or package install is required. From the repository root, serve the `web` folder with any static server. For example:

```powershell
python -m http.server 4173 --directory web
```

Then open `http://127.0.0.1:4173` in a browser.

## Publish with GitHub Pages

1. Push this repository to GitHub with the default branch named `main`.
2. In **Settings > Pages**, set the source to **GitHub Actions**.
3. The workflow at `.github/workflows/deploy-pages.yml` publishes the `web` folder on every push to `main`.

The app does not upload label files or video to a server. The browser reads local files and creates the reviewed JSON and report locally. Audit edits, clip boundaries, report fields, review decisions, and the current workspace position are automatically checkpointed in IndexedDB so an accidentally closed tab can recover on the next visit from the same browser and site address. The video itself is not stored in browser cache; after recovery, select the same local video once to restore frame playback. Large source videos are not committed to the site.

## Import and export

Use **Import** to choose a label `.json`, a matching video, or both at once. The JSON should contain the existing `frames`, `detections`, and `video` fields from the native auditor. After review, **Export JSON** downloads a new file with `_reviewed.json` appended to the original name.

## Tender report

Open **Report**, enter the tenderer and demonstration details, add the validated TP, FP, UP, and mean IoU results, and confirm the applicable camera/system declarations. The report calculates the Appendix A precision and recall thresholds, creates the Appendix B 2-minute count log, builds the Appendix C heat map from 10-second samples, and lays out Appendix D captures at 2-minute intervals. Use **Print / Save PDF** and choose the browser's PDF destination.

For a merged video containing more than one clip, enter each later clip's start time in **Clip start times after Clip 1** (for example, `00:12:40, 00:26:15`). Saved `clips`, `segments`, or `heatmap.splices_sec` metadata is detected automatically. Appendix B and Appendix D restart their displayed time at `00:00:00` for every clip, and Appendix C creates a separate heat map for each clip.

The AI performance fields require validated ground-truth figures. Empty fields remain `NOT ASSESSED`; the app does not infer tender compliance from unreviewed model output.
