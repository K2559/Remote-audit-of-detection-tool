# Remote Audit of Detection Tool

- [RodentVision video and CSV audit](https://k2559.github.io/Remote-audit-of-detection-tool/csv/)
- [Thermal Audit Desk for video and JSON annotations](https://k2559.github.io/Remote-audit-of-detection-tool/)

## Audit a RodentVision CSV

1. Use the desktop app's automatic `RodentVision-analysis-results.csv` or a CSV saved with **Report → Save CSV**. Drop the CSV and source videos onto the audit page, use **Choose files**, or use **Choose output folder**. The page pairs clips to videos by filename, ignoring case and the video extension. Use **Attach video** to pair a clip manually.
2. Select a clip and click an event time to jump to it. Use **Edit** to type a corrected elapsed time or copy the current playback position. Reviewers can add or remove events, change their type, and mark each clip reviewed.
3. In **Report**, choose **Elapsed video time** for positions measured from the start of each clip. For **Camera timestamp**, pause each source video in **Review**, select **Set camera timestamp**, and enter the date and time visible on that frame.
4. Use **Print / Save PDF** or download a **Report CSV** to export the displayed times. Select **Desktop import CSV** to send completed clips back through **Report → Import reviewed CSV** in the desktop app.

Folder import looks for `RodentVision-analysis-results.csv` first. Reports list all imported and edited times. The desktop import CSV uses elapsed times and event types and includes clips marked reviewed. For events with a missing type, use **RodentVision export settings** in the event editor. Camera timestamps use the reference frame and the elapsed time between frames. Save an export before closing the page to retain your edits. Files are read and exported locally in the browser. Playback uses the browser's supported video formats, such as H.264 MP4.

## GitHub Pages and local development

The GitHub Actions workflow checks CSV compatibility and publishes the static `web/` directory on pushes to `video-csv-audit`. The detection review app remains on `main`. Run the audit locally with `python -m http.server 4173 --directory web` and open `http://127.0.0.1:4173/csv/`. Run the CSV tests with `node --test tests/csv.test.mjs`.
