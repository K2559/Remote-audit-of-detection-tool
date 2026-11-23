# Remote Audit of Detection Tool

- [RodentVision video and CSV audit](https://k2559.github.io/Remote-audit-of-detection-tool/csv/)
- [Thermal Audit Desk for video and JSON annotations](https://k2559.github.io/Remote-audit-of-detection-tool/)

## Audit a RodentVision CSV

1. In the desktop app, open **Report → Save CSV**. Drop the CSV and its source videos onto the audit page, use **Choose files**, or use **Choose output folder** to select the folder containing the detector CSV and videos. The page pairs clips to videos by filename, ignoring case and the video extension. Use **Attach video** to pair a clip manually.
2. Select a clip and click an event time to jump to it. Use **Edit** to type a corrected elapsed time or copy the current playback position. Reviewers can add or remove events, change their type, and mark each clip reviewed.
3. Select **RodentVision report CSV** and **Download CSV** to export the same two-column format as the desktop report. Select **Desktop import CSV** to send completed clips back through **Report → Import reviewed CSV** in the desktop app.
4. Open **Report → Print / Save PDF** for the same paginated A4 Littering Act Report as the desktop app.

The desktop report CSV marks dog occurrences with a suffix and omits the event type for other timestamps. Assign those event types in the browser before exporting a desktop import CSV. Pending clips stay in the report CSV and PDF and are skipped in the desktop import CSV. Save an export before closing the page to retain your edits. Files are read and exported locally in the browser. Playback uses the browser's supported video formats, such as H.264 MP4.

## GitHub Pages and local development

The GitHub Actions workflow checks CSV compatibility and publishes the static `web/` directory on pushes to `video-csv-audit`. The detection review app remains on `main`. Run the audit locally with `python -m http.server 4173 --directory web` and open `http://127.0.0.1:4173/csv/`. Run the CSV tests with `node --test tests/csv.test.mjs`.
