import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const appPath = new URL('./app.js', import.meta.url);
const source = fs.readFileSync(appPath, 'utf8').replace(/\nboot\(\);\s*$/, '');
const html = fs.readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('./styles.css', import.meta.url), 'utf8');
const context = vm.createContext({
  console,
  setTimeout,
  clearTimeout,
  AbortController,
  requestAnimationFrame: (callback) => setTimeout(callback, 0),
});

vm.runInContext(`${source}\n;globalThis.auditTest = { state, normalizeDocument, createVideoOnlyDocument, reconcileDocumentVideo, buildImportPairs, mergeImportedDocuments, reviewSampleStep, sampleReviewFrames, clipTimepoints, nearestFrameInClip, nearestFrameIndexAtTimeline, firstFrameIndexForClip, lastFrameIndexForClip, clipTimebarPosition, rasterizeReportHeatmap, seekVideo, seekPresentedVideoFrame, waitForVideoFrameData, fileNameOnly, videoMatchesDocument, detectVisualCutsFromSignatures, detectSceneCutsFromScores, createClipRangesFromCuts, clipBoundaryUpdate, mergeAdjacentClipRanges, isShortForwardAdvance, canUseAdjacentSourceFrameAdvance, sequentialPlaybackRate, preferLiveSequentialDecode, runHeldFrameNavigation, clipDetectionWorkerCount, frameCacheLimitForSize, trimVideoFrameCache, markFrame, createRecoverySnapshot, applyRecoveryCheckpoint, recoverySourceSignature, recoveryVideoDescriptors, recoveryVideoReattachPlan, heatmapBaseFrameSelection, heatmapBaseFrameSelectionKey, heatmapBaseFrameOptionSignature, heatmapShownFrameIndex, heatmapShownFrameTarget, boxesIntersect, resizeBoxFromHandle, collectBatchEraseMatches, videoSourceIndexForFrame, usesLocalVideoTimeForFrame, videoTimeForFrame, sourceFrameRate, sourcePreviewClipTime, sourcePreviewTimeline, previewVideoTimeForFrame, canUseGlobalVideoCache, containedMediaRect, containedPointToPixels, containedPixelsToPercentStyle };`, context);

const { state, normalizeDocument, createVideoOnlyDocument, reconcileDocumentVideo, buildImportPairs, mergeImportedDocuments, reviewSampleStep, sampleReviewFrames, clipTimepoints, nearestFrameInClip, nearestFrameIndexAtTimeline, firstFrameIndexForClip, lastFrameIndexForClip, clipTimebarPosition, rasterizeReportHeatmap, seekVideo, seekPresentedVideoFrame, waitForVideoFrameData, fileNameOnly, videoMatchesDocument, detectVisualCutsFromSignatures, detectSceneCutsFromScores, createClipRangesFromCuts, clipBoundaryUpdate, mergeAdjacentClipRanges, isShortForwardAdvance, canUseAdjacentSourceFrameAdvance, sequentialPlaybackRate, preferLiveSequentialDecode, runHeldFrameNavigation, clipDetectionWorkerCount, frameCacheLimitForSize, trimVideoFrameCache, markFrame, createRecoverySnapshot, applyRecoveryCheckpoint, recoverySourceSignature, recoveryVideoDescriptors, recoveryVideoReattachPlan, heatmapBaseFrameSelection, heatmapBaseFrameSelectionKey, heatmapBaseFrameOptionSignature, heatmapShownFrameIndex, heatmapShownFrameTarget, boxesIntersect, resizeBoxFromHandle, collectBatchEraseMatches, videoSourceIndexForFrame, usesLocalVideoTimeForFrame, videoTimeForFrame, sourceFrameRate, sourcePreviewClipTime, sourcePreviewTimeline, previewVideoTimeForFrame, canUseGlobalVideoCache, containedMediaRect, containedPointToPixels, containedPixelsToPercentStyle } = context.auditTest;
assert.equal(state.report.tenderer, 'K-Solution Design and Engineering Limited', 'The report must start with the requested editable tenderer name');
assert.equal(reviewSampleStep(), 10);
assert.match(source, /function startFrameKeyNavigation\(event\)[\s\S]*?const step = 1;/, 'Arrow keys must always move one 10-second review sample');
assert.doesNotMatch(source, /event\.shiftKey \? 10 : 1/, 'Shift must not turn arrow navigation into a 100-second jump');
assert.match(source, /key === 'a' \|\| key === 'd'[\s\S]*?stepSourceVideoFrame/, 'A and D must use source-frame navigation');
assert.match(source, /stepSourceVideoFrame[\s\S]*?renderFrame\(\{ exactSeek: true \}\)/, 'Fine frame navigation must bypass playback-based decoder advances');
assert.match(source, /allowSequential && await playVideoForwardToTime/, 'Exact seeks must be able to disable sequential playback');
assert.match(source, /!usesFrameCallback[\s\S]*?setTimeout\(\(\) => check\(performance\.now\(\)\), 8\)/, 'Fine stepping must have a media-clock fallback when frame callbacks are unavailable');
assert.match(source, /Math\.min\(video\.duration - 0\.001/, 'Heat-map captures must clamp terminal timestamps to a decodable frame');
assert.doesNotMatch(source, /className = 'box-label'/, 'Review boxes must not render a group-name caption over the image');
assert.doesNotMatch(css, /\.box-label\b/, 'Removed box captions must not retain obsolete styling');
assert.match(html, /<kbd>A \/ D<\/kbd><span>Move one source frame<\/span>/, 'The shortcut reference must describe fine source-frame navigation');
const letterboxed = containedMediaRect(1200, 900, 640, 360);
assert.ok(Math.abs(letterboxed.top - 112.5) < 0.000001, '16:9 media should be vertically letterboxed in a 4:3 stage');
assert.equal(letterboxed.left, 0);
assert.equal(letterboxed.width, 1200);
assert.equal(letterboxed.height, 675);
const pillarboxed = containedMediaRect(1200, 900, 360, 640);
assert.ok(Math.abs(pillarboxed.left - 346.875) < 0.000001, 'portrait media should be horizontally pillarboxed');
assert.equal(pillarboxed.top, 0);
assert.equal(pillarboxed.width, 506.25);
assert.equal(pillarboxed.height, 900);
const reviewStyle = containedPixelsToPercentStyle([356, 190, 446, 262], 4, 3, 640, 360);
assert.ok(Math.abs(parseFloat(reviewStyle.left) - 55.625) < 0.000001);
assert.ok(Math.abs(parseFloat(reviewStyle.top) - 52.0833333333) < 0.000001);
assert.ok(Math.abs(parseFloat(reviewStyle.width) - 14.0625) < 0.000001);
assert.ok(Math.abs(parseFloat(reviewStyle.height) - 15) < 0.000001);
assert.deepEqual(
  { ...containedPointToPixels(600, 450, 1200, 900, 640, 360) },
  { x: 320, y: 180 },
  'Drawing in the centre of a letterboxed video should map to the source-frame centre',
);
assert.deepEqual(
  { ...containedPointToPixels(0, 0, 1200, 900, 640, 360) },
  { x: 0, y: 0 },
  'Drawing in a letterbox band should clamp to the nearest source-frame edge',
);
const frames = [0, 10, 20, 30, 40, 50].map((timestamp, index) => ({
  sample_index: index,
  source_frame_index: index * 250,
  timestamp_sec: timestamp,
  review_status: 'accepted',
  detections: [{
    class_id: 0,
    label: 'rat',
    confidence: 0.95,
    bbox_xyxy_pixels: index < 3 ? [48, 90, 144, 180] : [336, 90, 432, 180],
    bbox_yolo_normalized: [0, 0, 0, 0],
  }],
}));

state.sourceJsonName = 'two-clips.json';
state.doc = normalizeDocument({
  classes: [{ id: 0, name: 'rat' }],
  sampling: { source_fps: 25, sample_fps: 0.1, source_frame_stride: 250 },
  video: { width: 480, height: 360, source_duration_sec: 60 },
  heatmap: { splices_sec: [30] },
  frames,
});
const finePreviewFrame = state.doc.frames[1];
assert.equal(sourceFrameRate(), 25);
assert.ok(Math.abs(previewVideoTimeForFrame({ duration: 60 }, finePreviewFrame, 1) - 10.04) < 0.000001, 'D must seek exactly one 25 fps source frame forward');
assert.ok(Math.abs(previewVideoTimeForFrame({ duration: 60 }, finePreviewFrame, -1) - 9.96) < 0.000001, 'A must seek exactly one 25 fps source frame backward');
assert.ok(Math.abs(sourcePreviewClipTime(finePreviewFrame, 1) - 10.04) < 0.000001, 'Fine navigation must update the clip time readout');
assert.ok(Math.abs(sourcePreviewTimeline(finePreviewFrame, 1) - 10.04) < 0.000001, 'Fine navigation must update the video timebar without changing the label sample');
state.report.clips = state.doc.clips;

state.report.tenderer = 'Recovery test tenderer';
state.report.captures = [{ dataUrl: 'large-generated-image' }];
state.report.baseImages = { 'clip-1': 'large-generated-image' };
state.report.heatmapFrameSelections = { 'clip-1': '2' };
state.heatmapBaseFrameSelections = { 'clip-1': '2' };
state.report.heatmapImages = { 'clip-1': 'large-generated-heatmap-background' };
state.recoveryVideo = { name: 'inspection.mp4', duration: 60 };
const recoverySnapshot = createRecoverySnapshot('2026-08-17T12:00:00.000Z');
assert.equal(recoverySnapshot.savedAt, '2026-08-17T12:00:00.000Z');
assert.equal(recoverySnapshot.report.tenderer, 'Recovery test tenderer');
assert.equal(recoverySnapshot.video.name, 'inspection.mp4');
assert.equal(recoverySnapshot.report.captures, undefined, 'Generated report images must not enter browser recovery storage');
assert.equal(recoverySnapshot.report.baseImages, undefined, 'Generated base images must not enter browser recovery storage');
assert.equal(recoverySnapshot.report.heatmapFrameSelections['clip-1'], '2', 'Manual heatmap frame selections must survive recovery');
assert.equal(recoverySnapshot.heatmapBaseFrameSelections['clip-1'], '2', 'Heatmap page base frame selections must survive recovery');
assert.equal(recoverySnapshot.report.heatmapImages, undefined, 'Generated heatmap backgrounds must not enter browser recovery storage');
state.report.tenderer = '';
state.report.captures = [];
state.report.baseImages = {};
state.report.heatmapFrameSelections = {};
state.heatmapBaseFrameSelections = {};
state.report.heatmapImages = {};
state.recoveryVideo = null;

state.doc.video.sources = [
  { index: 0, video_name: 'clip-a.mp4' },
  { index: 1, video_name: 'clip-b.mp4' },
];
state.recoveryVideos = [{ name: 'clip-a.mp4' }, { name: 'clip-b.mp4' }];
const recoveryPlan = recoveryVideoReattachPlan([{ name: 'clip-b.mp4', type: 'video/mp4' }, { name: 'clip-a.mp4', type: 'video/mp4' }]);
assert.equal(recoveryPlan.complete, true, 'Recovered multi-video files should be matched before attachment');
assert.deepEqual(Array.from(recoveryPlan.files, (file) => file.name), ['clip-a.mp4', 'clip-b.mp4'], 'Recovered sources must be restored in annotation order');
const partialRecoveryPlan = recoveryVideoReattachPlan([{ name: 'renamed-source.mp4', type: 'video/mp4' }]);
assert.equal(partialRecoveryPlan.complete, false, 'A partial recovered source selection must stay pending');
assert.equal(partialRecoveryPlan.candidates[0].name, 'renamed-source.mp4', 'Pending recovery must retain unmatched videos until the rest are selected');
assert.equal(heatmapBaseFrameSelection(state.doc.clips[0]).sample_index, 0, 'A heatmap base frame should have a deterministic fallback');
assert.equal(heatmapBaseFrameOptionSignature(state.doc.clips[0]), 'clip-1:0|1|2', 'The base-frame selector should have a stable clip-specific option signature');
state.heatmapBaseFrameSelections['clip-1'] = '1';
assert.equal(heatmapBaseFrameSelection(state.doc.clips[0]).sample_index, 1, 'A manually selected heatmap frame must remain selected');
state.heatmapBaseFrameSelections = {};
state.heatmapTimelinePreview = 20;
assert.equal(heatmapShownFrameIndex(), 2, 'Use shown frame must resolve the previewed heatmap time before a delayed timeline commit');
assert.equal(heatmapShownFrameTarget().clipFrameIndex, 2, 'Using a shown frame must resolve it within the active clip without changing the review cursor');
state.heatmapTimelinePreview = null;
const shownCursor = state.frameIndex;
state.frameIndex = 2;
assert.equal(heatmapShownFrameIndex(), 2, 'Use shown frame must prefer the committed review cursor when no preview is active');
state.frameIndex = shownCursor;
state.doc.video.sources = undefined;
state.recoveryVideos = [];

assert.equal(boxesIntersect([10, 10, 40, 40], [30, 30, 60, 60]), true, 'Area delete must include overlapping boxes');
assert.equal(boxesIntersect([10, 10, 20, 20], [21, 21, 30, 30]), false, 'Area delete must leave separate boxes untouched');
assert.equal(boxesIntersect([40, 40, 10, 10], [15, 15, 25, 25]), true, 'Area delete must support a reverse drag selection');
const batchEraseFrames = [
  { clip_index: 0, timeline_sec: 1, detections: [{ bbox_xyxy_pixels: [10, 10, 30, 30] }, { bbox_xyxy_pixels: [70, 70, 90, 90] }] },
  { clip_index: 0, timeline_sec: 2, detections: [{ bbox_xyxy_pixels: [12, 12, 28, 28] }] },
  { clip_index: 0, timeline_sec: 3, detections: [{ bbox_xyxy_pixels: [12, 12, 28, 28] }] },
  { clip_index: 1, timeline_sec: 1, detections: [{ bbox_xyxy_pixels: [12, 12, 28, 28] }] },
];
const batchEraseMatches = collectBatchEraseMatches(batchEraseFrames, [[0, 0, 40, 40], [60, 60, 100, 100]], 0, 0, 2);
assert.equal(batchEraseMatches.boxCount, 3, 'Multiple delete areas must combine into one batch');
assert.equal(batchEraseMatches.frameCount, 2, 'The selected end time must be inclusive');
assert.deepEqual(Array.from(batchEraseMatches.matches, ({ frameIndex, detectionIndexes }) => [frameIndex, Array.from(detectionIndexes)]), [[0, [0, 1]], [1, [0]]]);
assert.equal(collectBatchEraseMatches(batchEraseFrames, [[0, 0, 40, 40]], 0, 0, 2).boxCount, 2, 'Removing one area must narrow the preview');
assert.equal(collectBatchEraseMatches(batchEraseFrames, [[0, 0, 100, 100]], 0, 0, 0.5).boxCount, 0, 'Boxes after the chosen time range must remain untouched');
assert.deepEqual(Array.from(resizeBoxFromHandle([10, 20, 110, 120], 'se', { x: 150, y: 170 }, 200, 200)), [10, 20, 150, 170]);
assert.deepEqual(Array.from(resizeBoxFromHandle([10, 20, 110, 120], 'nw', { x: -20, y: -30 }, 200, 200)), [0, 0, 110, 120], 'Resize handles must clamp to the image');
assert.deepEqual(Array.from(resizeBoxFromHandle([10, 20, 110, 120], 'e', { x: 5, y: 0 }, 200, 200)), [10, 20, 16, 120], 'Resize handles must preserve a usable minimum size');

assert.equal(state.doc.clips.length, 2);
assert.deepEqual(Array.from(state.doc.frames, (frame) => frame.clip_index), [0, 0, 0, 1, 1, 1]);
assert.deepEqual(Array.from(state.doc.frames, (frame) => frame.clip_time_sec), [0, 10, 20, 0, 10, 20]);
assert.deepEqual(Array.from(clipTimepoints(state.doc.clips[0], 10)), [0, 10, 20]);
assert.deepEqual(Array.from(clipTimepoints(state.doc.clips[1], 10)), [0, 10, 20]);
assert.equal(nearestFrameInClip(state.doc.clips[1], 0, 0.75).timestamp_sec, 30);
assert.equal(firstFrameIndexForClip(state.doc.clips[0]), 0);
assert.equal(firstFrameIndexForClip(state.doc.clips[1]), 3);
assert.equal(lastFrameIndexForClip(state.doc.clips[0]), 2);
assert.equal(lastFrameIndexForClip(state.doc.clips[1]), 5);
const localClipPosition = clipTimebarPosition(state.doc.clips[1], 42.6);
assert.ok(Math.abs(localClipPosition.current - 12.6) < 0.0001);
assert.equal(localClipPosition.duration, 30);
assert.equal(clipTimebarPosition(state.doc.clips[1], 10).timeline, 30, 'Clip-local seeking must clamp to the clip start');
assert.equal(clipTimebarPosition(state.doc.clips[1], 80).timeline, 60, 'Clip-local seeking must clamp to the clip end');
assert.equal(nearestFrameIndexAtTimeline(30, state.doc.clips[0]), 2, 'Clip-local seeking must not cross a shared clip boundary');

const firstHeatmap = rasterizeReportHeatmap(state.doc.clips[0]);
const secondHeatmap = rasterizeReportHeatmap(state.doc.clips[1]);
assert.equal(firstHeatmap.confirmedSamples, 3);
assert.equal(secondHeatmap.confirmedSamples, 3);
assert.equal(firstHeatmap.detectionCount, 3);
assert.equal(secondHeatmap.detectionCount, 3);

const weightedColumn = (heatmap) => {
  let weighted = 0;
  let total = 0;
  heatmap.cells.forEach((value, index) => {
    weighted += (index % heatmap.columns) * value;
    total += value;
  });
  return total ? weighted / total : 0;
};
assert.ok(weightedColumn(firstHeatmap) < firstHeatmap.columns * 0.4, 'Clip 1 heat must remain concentrated on the left');
assert.ok(weightedColumn(secondHeatmap) > secondHeatmap.columns * 0.6, 'Clip 2 heat must remain concentrated on the right');

const htmlIds = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(htmlIds).size, htmlIds.length, 'HTML ids must be unique');
const referencedIds = [...source.matchAll(/\$\(['"]#([^'"\s>+~:[\]]+)/g)].map((match) => match[1]);
const missingIds = [...new Set(referencedIds)].filter((id) => !htmlIds.includes(id));
assert.deepEqual(missingIds, [], `Missing HTML ids referenced by app.js: ${missingIds.join(', ')}`);
assert.match(html, /id="report-clip-cuts"/);
assert.match(html, /id="report-tenderer"[^>]*value="K-Solution Design and Engineering Limited"/, 'The report form must expose the requested editable tenderer default');
const tendererInput = html.match(/<input id="report-tenderer"[^>]*>/)?.[0] || '';
assert.doesNotMatch(tendererInput, /\b(?:disabled|readonly)\b/, 'The pre-filled tenderer name must remain editable');
assert.match(html, /id="report-heatmap-pages"/);
assert.match(html, /id="report-clip-list"/);
assert.doesNotMatch(html, /report-clip-inspector|report-clip-time-slider|report-video-time-slider/, 'The redundant report clip inspector must stay removed');
assert.match(source, /report-heatmap-source-select/, 'Every report clip must expose a heatmap background selector');
assert.match(source, /report-heatmap-canvas/, 'Report heatmaps must render into a canvas overlay');
assert.doesNotMatch(source, /report-heatmap-cells|report-heat-cell/, 'Report heatmaps must not regress to tiled DOM cells');
assert.match(source, /const sourceCanvases = \[\.\.\.page\.querySelectorAll\('canvas'\)\]/, 'Batch PDF export must copy pixels from live canvases before cloning');
assert.match(source, /xmlns="\$\{xhtmlNamespace\}"/, 'Batch PDF export must serialize report pages in the XHTML namespace');
assert.match(source, /await waitForReportImage\(image\)/, 'Batch PDF export must wait for embedded report images to decode');
assert.match(source, /const flattenRules = \(cssRules\) =>/, 'Batch PDF export must flatten print media rules for rasterization');
assert.match(source, /function inlineReportComputedStyles\(root\)/, 'Batch PDF export must inline computed print styles');
assert.match(source, /clone\.classList\.remove\('report-page', 'report-page-last'\)/, 'Batch PDF export must replace print-only page footer styling with its own numbered footer');
assert.match(source, /prepareReportExportClone\(pages\[pageIndex\], pageIndex \+ 1, pages\.length, exportStyles\)/, 'Each exported page must use the print-style staging pass');
assert.doesNotMatch(source, /report-summary-sheet/, 'The standalone clip summary page must stay removed');
assert.match(source, /report-count-sheet/, 'Per-clip count reports must remain available');
assert.match(source, /<th>Time in clip<\/th><th>Detections<\/th>/, 'Per-clip count reports must keep only time and detections');
assert.doesNotMatch(source, /<th>Source frame<\/th>/, 'Per-clip count reports must not expose a Source frame column');
assert.doesNotMatch(source, />Appendix\s+[A-Z0-9]+</i, 'Generated report pages must not display appendix labels');
assert.match(source, /pageIndex \+= pageIndex === 0 \? 1 : 2/, 'The tender-style first page must contain one image before two-image continuation pages');
assert.match(source, /figure\.append\(media, caption\)/, 'Thermal-image captions must sit below their images');
assert.match(source, /function renderReportPreview\(\)/, 'Report preview sections must have a shared refresh path');
assert.match(source, /state\.report\.selectedClipId = clip\.id;[\s\S]*?renderReportPreview\(\);/, 'Selecting a report clip must refresh its preview');
assert.match(source, /const mode = state\.annotationTool === 'erase' \? 'erase' : 'draw';/, 'Empty review-stage drags must create boxes in Select mode');
assert.match(source, /event\.stopPropagation\(\); selectDetection\(index\);/, 'Clicking a review box must select it');
assert.match(source, /if \(\(event\.key === 'Delete' \|\| event\.key === 'Backspace'\) && !typing\) \{ event\.preventDefault\(\); return deleteSelectedBox\(\); \}/, 'Delete and Backspace must work when a review box button has focus');
assert.match(source, /if \(event\.ctrlKey && event\.key\.toLowerCase\(\) === 'z'\) \{ event\.preventDefault\(\); return undo\(\); \}/, 'Ctrl+Z must prevent browser handling and call undo');
assert.match(html, /data-action="open-json"[^>]*id="json-import-button"/);
assert.match(html, /data-action="open-video"[^>]*id="video-import-button"/);
assert.match(html, /id="json-input"[^>]*accept="\.json,application\/json"[^>]*multiple/);
assert.match(html, /id="video-input"[^>]*multiple/);
assert.match(html, /id="heatmap-base-frame-select"/);
assert.match(html, /data-action="heatmap-use-current-frame"/);
assert.match(source, /if \(select\.dataset\.signature !== signature\)/, 'Heatmap redraws must not replace the frame options while the selector is open');
assert.match(source, /cached\?\.frameKey === selectedKey && cached\.image/, 'A stale timeline image must not replace the manually selected heatmap base');
assert.match(source, /heatmapBaseCaptureRequests\.get\(clipKey\) === frameKey/, 'Heatmap redraws must not cancel an in-flight base-frame capture');
assert.match(source, /async function reattachRecoveredVideos\(files\)/, 'Recovered videos must be attached without rebuilding the saved document');
assert.match(source, /state\.recoveryReattachFiles = plan\.candidates/, 'Partial recovery must retain all selected source candidates');
assert.match(html, /id="clip-dialog"/);
assert.match(html, /data-action="detect-clips"[^>]*id="detect-clips-button"/);
assert.match(html, /data-action="add-clip"/);
assert.match(html, /data-action="merge-clips"[^>]*id="merge-clips-button"[^>]*disabled/);
assert.match(html, /id="video-time-slider"/);
assert.match(html, /id="clip-time-slider"/);
assert.match(html, /id="clip-time-current"/);
assert.match(html, /Changes are backed up in this browser/);
assert.match(html, /data-action="annotation-tool" data-tool="select"/);
assert.match(html, /data-action="annotation-tool" data-tool="draw"/);
assert.match(html, /data-action="annotation-tool" data-tool="erase"/);
assert.match(html, /id="detection-list" class="detection-list box-list"/);
assert.match(html, /id="erase-region-layer"/);
assert.match(html, /id="batch-erase-panel"/);
assert.match(html, /id="batch-erase-start-slider"/);
assert.match(html, /id="batch-erase-end-slider"/);
assert.match(html, /data-action="apply-batch-erase"/);
assert.match(source, /indexedDB\.open\(RECOVERY_DB_NAME/);
assert.match(source, /addEventListener\('pagehide'/);
assert.match(source, /addEventListener\('visibilitychange'/);
assert.match(css, /\.clip-time-input:not\(\[readonly\]\):focus/);
assert.match(css, /\.clip-thumbnail:focus-visible/);
assert.match(css, /\.clip-select-checkbox/);
assert.match(css, /\.video-timebar/);
assert.match(css, /\.timebar-stack/);
assert.match(css, /\.box-resize-handle/);
assert.match(css, /\.draw-cursor\.erase-preview/);
assert.match(css, /\.erase-region-marker/);
assert.match(css, /\.batch-erase-panel/);
assert.match(css, /linear-gradient\(90deg, #151f7a[\s\S]*#d11f2a 100%\)/);
assert.doesNotMatch(css, /report-heat-spot/);
assert.match(css, /\.report-document\s*\{[^}]*counter-reset:\s*report-page/);
assert.match(css, /\.report-page::after\s*\{[^}]*content:\s*"Page " counter\(report-page\)/);
assert.match(css, /\.report-capture-page \.report-capture-media\s*\{[^}]*width:\s*min\(100%, 125mm\)/, 'Tender capture frames should use the enlarged A4-friendly width');

const videoOnlyDocument = createVideoOnlyDocument({ name: 'inspection.mp4' }, 75.5, 640, 480);
assert.equal(videoOnlyDocument.source_video, 'inspection.mp4');
assert.equal(videoOnlyDocument.frames.length, 8);
assert.equal(videoOnlyDocument.frames[1].timestamp_sec, 10);
assert.equal(videoOnlyDocument.frames.at(-1).timestamp_sec, 70);
assert.equal(videoOnlyDocument.frames[1].source_frame_index, 250);
assert.equal(videoOnlyDocument.sampling.sample_fps, 0.1);
assert.equal(videoOnlyDocument.sampling.source_frame_stride, 250);
assert.equal(videoOnlyDocument.video.sampled_frame_count, 8);
assert.deepEqual(Array.from(videoOnlyDocument.clips, (clip) => [clip.start_sec, clip.end_sec, clip.source]), [[0, 75.5, 'video']], 'Video-only import must create one full-duration clip');

const pairedVideos = [
  { name: 'North Hall.mp4' },
  { name: 'South Hall.mp4' },
];
const pairedJsons = [
  { name: 'South Hall_labels.json' },
  { name: 'North Hall_labels.json' },
  { name: 'Unmatched_labels.json' },
];
const importPairs = buildImportPairs(pairedVideos, pairedJsons);
assert.deepEqual(
  Array.from(importPairs, (pair) => [pair.video?.name || null, pair.json?.name || null]),
  [['North Hall.mp4', 'North Hall_labels.json'], ['South Hall.mp4', 'South Hall_labels.json'], [null, 'Unmatched_labels.json']],
  'Multi-input imports must pair files by their normalized stems before falling back to order',
);
const mergedImport = mergeImportedDocuments([
  {
    video: { name: 'North Hall.mp4', duration: 25, width: 640, height: 480 },
    videoIndex: 0,
    jsonIndex: 1,
    jsonName: 'North Hall_labels.json',
    doc: {
      classes: [{ id: 0, name: 'rat' }],
      sampling: { source_fps: 25 },
      video: { width: 640, height: 480, source_duration_sec: 25 },
      frames: [{ sample_index: 0, timestamp_sec: 0, detections: [] }, { sample_index: 1, timestamp_sec: 10, detections: [] }],
    },
  },
  {
    video: { name: 'South Hall.mp4', duration: 15, width: 800, height: 600 },
    videoIndex: 1,
    jsonIndex: 0,
    jsonName: 'South Hall_labels.json',
    doc: {
      classes: [{ id: 0, name: 'rat' }],
      sampling: { source_fps: 25 },
      video: { width: 800, height: 600, source_duration_sec: 15 },
      frames: [{ sample_index: 0, timestamp_sec: 0, detections: [] }, { sample_index: 1, timestamp_sec: 10, detections: [] }],
    },
  },
]);
assert.deepEqual(Array.from(mergedImport.clips, (clip) => [clip.start_sec, clip.end_sec, clip.source_video_index, clip.source_json_index]), [[0, 25, 0, 1], [25, 40, 1, 0]]);
assert.deepEqual(Array.from(mergedImport.frames, (frame) => [frame.timeline_sec, frame.clip_time_sec, frame.source_video_index]), [[0, 0, 0], [10, 10, 0], [25, 0, 1], [35, 10, 1]], 'Each imported source must retain local and global frame times');
assert.deepEqual([mergedImport.video.width, mergedImport.video.height], [800, 600], 'Merged media dimensions must reflect the selected sources');
const normalizedMergedImport = normalizeDocument(JSON.parse(JSON.stringify(mergedImport)));
assert.deepEqual(Array.from(normalizedMergedImport.clips, (clip) => [clip.source_video_index, clip.source_json_index]), [[0, 1], [1, 0]], 'Source pairing metadata must survive export and recovery normalization');
assert.deepEqual(Array.from(normalizedMergedImport.frames, (frame) => [frame.timeline_sec, frame.clip_time_sec]), [[0, 0], [10, 10], [25, 0], [35, 10]], 'Explicit merged timelines must survive a reload');
state.doc = { clips: [{ source_video_index: null }, { source_video_index: 1 }] };
assert.equal(videoSourceIndexForFrame({ clip_index: 0, source_video_index: null }), null, 'JSON-only clips must not coerce a missing video source to index zero');
assert.equal(videoSourceIndexForFrame({ clip_index: 1, source_video_index: 1 }), 1);
const mixedSourceDoc = {
  video: { sources: [{ index: 0 }, { index: null }] },
  clips: [{ source_video_index: 0 }, { source_video_index: null }],
};
const previousDoc = state.doc;
const previousVideoSources = state.videoSources;
state.doc = mixedSourceDoc;
state.videoSources = [{ index: 0, duration: 60 }];
const mixedVideoFrame = { clip_index: 0, source_video_index: 0, timeline_sec: 34, clip_time_sec: 4 };
const mixedJsonFrame = { clip_index: 1, source_video_index: null, timeline_sec: 64, clip_time_sec: 4 };
assert.equal(usesLocalVideoTimeForFrame(mixedVideoFrame), true, 'A video-backed clip must seek within its own source even when JSON-only clips are present');
assert.equal(videoTimeForFrame({ duration: 60 }, mixedVideoFrame), 4, 'Mixed imports must use clip-local video time');
assert.equal(usesLocalVideoTimeForFrame(mixedJsonFrame), false, 'A JSON-only clip must not request a video-local timestamp');
assert.equal(canUseGlobalVideoCache(), false, 'Merged imports must not share a single-source global frame cache');
state.doc = previousDoc;
state.videoSources = previousVideoSources;
assert.match(source, /const videos = selectedVideos\.length \? selectedVideos : \(state\.videoFiles \|\| \[\]\)/, 'A later JSON picker selection must reuse retained videos');
assert.match(source, /const jsons = selectedJsons\.length \? selectedJsons : \(state\.jsonFiles \|\| \[\]\)/, 'A later video picker selection must reuse retained JSON files');
assert.match(source, /state\.sourceJsonNames\?\.length > 1[\s\S]*?thermal-audit/, 'Merged exports must use a stable filename instead of the multi-file placeholder');

const inferenceOutputDocument = normalizeDocument({
  schema: 'rodent-vision-inference/1.0',
  input: {
    video: 'C:\\source\\Clip for Demonstration for Tender Ref. FEHQ 1020_25.mp4',
    width: 1280,
    height: 960,
    fps: 25,
    frames: 750,
    durationSeconds: 30,
    sourceFramesRead: 3,
  },
  settings: { sampleFps: 0.1, renderPlaybackFps: 0.1 },
  outputs: {
    renderedVideo: 'C:\\output\\Clip_for_Demonstration_for_Tender_Ref._FEHQ_1020_25_pilot21-screened-control.mp4',
    renderedVideoInfo: {
      path: 'C:\\output\\Clip_for_Demonstration_for_Tender_Ref._FEHQ_1020_25_pilot21-screened-control.mp4',
      width: 1280,
      height: 960,
      fps: 0.1,
      frames: 3,
      durationSeconds: 30,
    },
  },
  frames: [
    { sampleIndex: 0, sourceFrameIndex: 125, timestampSeconds: 5, outputTimestampSeconds: 0, detections: [] },
    { sampleIndex: 1, sourceFrameIndex: 375, timestampSeconds: 15, outputTimestampSeconds: 10, detections: [] },
    {
      sampleIndex: 2,
      sourceFrameIndex: 625,
      timestampSeconds: 25,
      outputTimestampSeconds: 20,
      detections: [{ classId: 1, className: 'rodent', score: 0.73, bboxXyxyPixels: [724, 370, 760, 412] }],
    },
  ],
});
assert.equal(inferenceOutputDocument.frames.length, 3, 'The producer schema must preserve all 0.1 FPS samples');
assert.deepEqual(
  Array.from(inferenceOutputDocument.frames, (frame) => [frame.timestamp_sec, frame.source_timestamp_sec]),
  [[0, 5], [10, 15], [20, 25]],
  'Rendered timestamps must remain separate from source timestamps',
);
assert.equal(inferenceOutputDocument.sampling.sample_fps, 0.1);
assert.equal(inferenceOutputDocument.sampling.source_frame_stride, 250);
assert.equal(inferenceOutputDocument.video.source_duration_sec, 30);
assert.equal(inferenceOutputDocument.video.rendered_sampled_video, true);
assert.equal(inferenceOutputDocument.frames[2].detections[0].label, 'rodent');
assert.deepEqual(Array.from(inferenceOutputDocument.frames[2].detections[0].bbox_xyxy_pixels), [724, 370, 760, 412]);
state.doc = inferenceOutputDocument;
state.sourceJsonName = 'Clip_for_Demonstration_for_Tender_Ref._FEHQ_1020_25_pilot21-screened-control_t0p3711.json';
assert.equal(
  videoMatchesDocument({ name: 'Clip_for_Demonstration_for_Tender_Ref._FEHQ_1020_25_pilot21-screened-control_t0p3711.mp4' }),
  true,
  'A generated rendered MP4 must match the source JSON by normalized stem',
);
assert.equal(
  videoMatchesDocument({ name: 'Clip_for_Demonstration_for_Tender_Ref._FEHQ_1020_25_pilot21-screened-control_t0p3711_20260818_150107.mp4' }),
  true,
  'Timestamped rendered MP4 exports must match the producer JSON',
);

const sparseDocument = normalizeDocument({
  source_video: 'sparse.mp4',
  sampling: { source_fps: 25, sample_fps: 5, source_frame_stride: 5 },
  video: { width: 1280, height: 960, sampled_frame_count: 2 },
  frames: [
    { sample_index: 0, source_frame_index: 0, timestamp_sec: 0, detections: [] },
    { sample_index: 1, source_frame_index: 5, timestamp_sec: 0.2, detections: [] },
  ],
});
assert.equal(sparseDocument.frames.length, 1);
assert.ok(sparseDocument.clips[0].end_sec < 1, 'Sparse labels initially cover less than one second');
assert.equal(reconcileDocumentVideo(sparseDocument, 75.5, 640, 480), true);
assert.equal(sparseDocument.video.source_duration_sec, 75.5);
assert.equal(sparseDocument.video.width, 640);
assert.equal(sparseDocument.video.height, 480);
assert.equal(sparseDocument.video.source_frame_count, 1888);
assert.equal(sparseDocument.video.sampled_frame_count, 1, 'MP4 metadata must not invent label samples');
assert.equal(sparseDocument.clips[0].end_sec, 75.5, 'The clip range must follow the attached MP4 duration');
assert.deepEqual(Array.from(sparseDocument.clips, (clip) => [clip.start_sec, clip.end_sec, clip.source]), [[0, 75.5, 'video']], 'A label-only JSON must become one full-video clip');

const exportedInferred = normalizeDocument({
  source_video: 'exported-inferred.mp4',
  video: { source_duration_sec: 1 },
  clips: [{ id: 'clip-1', start_sec: 0, end_sec: 1, source: 'labels' }],
  frames: [{ sample_index: 0, source_frame_index: 0, timestamp_sec: 0, detections: [] }],
});
assert.equal(exportedInferred.clips[0].source, 'labels', 'Exported inferred provenance must survive import');
assert.equal(reconcileDocumentVideo(exportedInferred, 40, 640, 480), true);
assert.deepEqual(Array.from(exportedInferred.clips, (clip) => [clip.start_sec, clip.end_sec, clip.source]), [[0, 40, 'video']], 'Previously inferred clip ranges must not stay authoritative');

const sparseSplicedDocument = normalizeDocument({
  source_video: 'sparse-spliced.mp4',
  sampling: { source_fps: 25, sample_fps: 5, source_frame_stride: 5 },
  video: { width: 1280, height: 960, sampled_frame_count: 2 },
  heatmap: { splices_sec: [30] },
  frames: [
    { sample_index: 0, source_frame_index: 0, timestamp_sec: 0, detections: [] },
    { sample_index: 1, source_frame_index: 5, timestamp_sec: 0.2, detections: [] },
  ],
});
assert.equal(sparseSplicedDocument.clips.length, 1, 'A splice beyond sparse label coverage must wait for video metadata');
assert.equal(reconcileDocumentVideo(sparseSplicedDocument, 75.5, 640, 480), true);
assert.deepEqual(Array.from(sparseSplicedDocument.clips, (clip) => [clip.start_sec, clip.end_sec]), [[0, 30], [30, 75.5]]);

const signatures = [
  { timestamp: 0, luma: Array(64).fill(0.1) },
  { timestamp: 1, luma: Array(64).fill(0.1) },
  { timestamp: 2, luma: Array(64).fill(0.9) },
  { timestamp: 3, luma: Array(64).fill(0.9) },
];
assert.deepEqual(Array.from(detectVisualCutsFromSignatures(signatures, 4)), [2], 'Visual detector should return an adaptive local-max cut');
const sceneScores = [
  { timestamp: 1, score: 0.08 },
  { timestamp: 2, score: 0.31 },
  { timestamp: 2.8, score: 0.28 },
  { timestamp: 7, score: 0.42 },
];
assert.deepEqual(Array.from(detectSceneCutsFromScores(sceneScores, 10)), [2, 7], 'Scene detector should retain the strongest separated cuts');
assert.deepEqual(Array.from(createClipRangesFromCuts([2], 4), (clip) => [clip.start_sec, clip.end_sec]), [[0, 2], [2, 4]]);
const editableClips = createClipRangesFromCuts([180, 780, 1260], 1500);
const editedBoundary = clipBoundaryUpdate(editableClips, 1500, 0, 'end', '00:02:54');
assert.equal(editedBoundary.time, 174, 'HH:MM:SS clip edits must be accepted');
assert.deepEqual(Array.from(editedBoundary.cuts), [174, 780, 1260], 'Editing one clip end must move the adjacent clip start');
assert.equal(clipBoundaryUpdate(editableClips, 1500, 1, 'start', '00:13:00'), null, 'A clip boundary cannot overlap the following boundary');
const mergedClips = mergeAdjacentClipRanges(editableClips, [1, 2], 1500);
assert.deepEqual(Array.from(mergedClips, (clip) => [clip.start_sec, clip.end_sec]), [[0, 180], [180, 1260], [1260, 1500]], 'Merging adjacent clips must remove only their internal boundary');
assert.equal(mergeAdjacentClipRanges(editableClips, [0, 2], 1500), null, 'Non-adjacent clip selections must not merge');
assert.equal(isShortForwardAdvance(88.2, 88.4), true, 'Adjacent sampled frames should use sequential decode');
assert.equal(isShortForwardAdvance(88.4, 88.2), false, 'Backward navigation should use cache or an exact seek');
assert.equal(isShortForwardAdvance(88.2, 4500), false, 'Long jumps should use an exact seek');
assert.equal(canUseAdjacentSourceFrameAdvance({ currentTime: 88.2 }, 88.4), true, 'Forward fine stepping should use the decoder clock');
assert.equal(canUseAdjacentSourceFrameAdvance({ currentTime: 88.4 }, 88.2), false, 'Reverse fine stepping should not use forward playback');
assert.ok(sequentialPlaybackRate(88.2, 88.4, true) > sequentialPlaybackRate(88.2, 88.4, false), 'Held navigation should decode adjacent frames faster');
assert.equal(sequentialPlaybackRate(0, 10, true), 12, 'Rapid sequential decode must stay within the browser playback-rate limit');
assert.equal(preferLiveSequentialDecode(88.2, 88.4, 1, true), true, 'Held Right must keep the live decoder synchronized beyond the cache window');
assert.equal(preferLiveSequentialDecode(88.2, 88.4, 1, false), false, 'Single-step review may use a cached bitmap');
assert.equal(preferLiveSequentialDecode(88.4, 88.2, -1, true), false, 'Held Left must use the rolling reverse cache');
assert.equal(clipDetectionWorkerCount(5220, 8), 4, 'Long videos should use the bounded decoder pool');
assert.equal(clipDetectionWorkerCount(5220, 20), 6, 'High-core systems should use the larger bounded decoder pool');
assert.equal(clipDetectionWorkerCount(300, 8), 1, 'Short videos should avoid unnecessary decoder setup');
assert.equal(frameCacheLimitForSize(1280, 960), 20, 'HD review should retain a useful two-sided frame window');
assert.equal(frameCacheLimitForSize(3840, 2160), 4, 'Large sources must keep the decoded frame cache bounded');
const cacheTestDocument = state.doc;
state.doc = { frames: [{ timeline_sec: 10 }] };
state.frameIndex = 0;
state.videoFrameCacheLimit = 4;
state.videoPrefetchDirection = 1;
state.videoFrameCache = new Map(['8', '9', '10', '11', '12'].map((key) => [key, { close() {} }]));
trimVideoFrameCache();
assert.deepEqual(Array.from(state.videoFrameCache.keys()), ['9', '10', '11', '12'], 'Forward review should evict the farthest frame behind first');
state.videoPrefetchDirection = -1;
state.videoFrameCache = new Map(['8', '9', '10', '11', '12'].map((key) => [key, { close() {} }]));
trimVideoFrameCache();
assert.deepEqual(Array.from(state.videoFrameCache.keys()), ['8', '9', '10', '11'], 'Backward review should evict the farthest frame ahead first');
state.videoFrameCache.clear();
state.videoFrameCacheLimit = 16;
state.videoPrefetchDirection = 1;
state.doc = cacheTestDocument;
assert.doesNotMatch(Function.prototype.toString.call(markFrame), /\brenderAll\s*\(/, 'Accept and next must not rebuild the full review page');
assert.match(source, /addEventListener\('keyup', handleKeyup\)/, 'Arrow-key navigation must stop cleanly on key release');

const navigationDocument = state.doc;
const navigationIndex = state.frameIndex;
state.doc = { frames: Array.from({ length: 6 }, (_, index) => ({ timeline_sec: index / 5 })) };
state.frameIndex = 0;
const visitedFrames = [];
const heldNavigation = {
  key: 'ArrowRight', direction: 1, step: 1, token: ++state.frameNavigationToken, running: false, atBoundary: false, pending: Promise.resolve(true),
};
state.frameKeyNavigation = heldNavigation;
await runHeldFrameNavigation(
  heldNavigation,
  async (index) => {
    state.frameIndex = index;
    visitedFrames.push(index);
    if (visitedFrames.length === 3) state.frameKeyNavigation = null;
    return true;
  },
  async () => {},
  () => {},
);
assert.deepEqual(visitedFrames, [1, 2, 3], 'Held navigation must serialize presented frames instead of cancelling in-flight work');

state.frameIndex = 0;
const retriedFrames = [];
const retryNavigation = {
  key: 'ArrowRight', direction: 1, step: 1, token: ++state.frameNavigationToken, running: false, atBoundary: false, pending: Promise.resolve(true),
};
state.frameKeyNavigation = retryNavigation;
await runHeldFrameNavigation(
  retryNavigation,
  async (index) => {
    state.frameIndex = index;
    retriedFrames.push(index);
    if (index === 1 && retriedFrames.length === 1) return false;
    if (index === 2) state.frameKeyNavigation = null;
    return true;
  },
  async () => {},
  () => {},
);
assert.deepEqual(retriedFrames, [1, 1, 2], 'A transient decode failure must retry the same held-key frame before advancing');
state.frameKeyNavigation = null;
state.rapidFrameNavigation = false;
state.doc = navigationDocument;
state.frameIndex = navigationIndex;

class MockVideo {
  constructor() {
    this.duration = 5220;
    this.readyState = 2;
    this.seeking = false;
    this.assignments = [];
    this.listeners = new Map();
    this.frameCallbacks = new Map();
    this.nextFrameCallback = 1;
    this._currentTime = 0;
    this.seekOffset = 0;
    this.presentationOffset = 0;
    this.suppressPresentation = false;
  }

  get currentTime() { return this._currentTime; }

  set currentTime(value) {
    this._currentTime = value + this.seekOffset;
    this.assignments.push(value);
    this.seeking = true;
    setTimeout(() => {
      this.seeking = false;
      this.emit('seeked');
      if (!this.suppressPresentation) {
        const callbacks = [...this.frameCallbacks.values()];
        this.frameCallbacks.clear();
        callbacks.forEach((callback) => callback(0, { mediaTime: this._currentTime + this.presentationOffset }));
      }
    }, 1);
  }

  addEventListener(type, listener) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(listener);
  }

  removeEventListener(type, listener) { this.listeners.get(type)?.delete(listener); }

  emit(type) { [...(this.listeners.get(type) || [])].forEach((listener) => listener()); }

  requestVideoFrameCallback(callback) {
    const id = this.nextFrameCallback++;
    this.frameCallbacks.set(id, callback);
    return id;
  }

  cancelVideoFrameCallback(id) { this.frameCallbacks.delete(id); }
}

const mockVideo = new MockVideo();
assert.equal(await seekVideo(mockVideo, 88.2), true);
assert.equal(await seekVideo(mockVideo, 88.4), true);
assert.deepEqual(mockVideo.assignments, [88.2, 88.4], 'Adjacent samples must request distinct video times');

const presentedVideo = new MockVideo();
const presentedStart = Date.now();
assert.equal(await seekPresentedVideoFrame(presentedVideo, 88.2), true);
assert.ok(Date.now() - presentedStart < 100, 'Presented-frame seeks must not wait for a fixed timeout');

const exactFrameVideo = new MockVideo();
exactFrameVideo._currentTime = 10;
assert.equal(await seekPresentedVideoFrame(exactFrameVideo, 10.04, { allowSequential: false }), true);
assert.deepEqual(exactFrameVideo.assignments, [10.04], 'One-frame navigation must assign the exact media time instead of playing past it');

const timestampOffsetVideo = new MockVideo();
timestampOffsetVideo.seekOffset = 0.024;
timestampOffsetVideo.presentationOffset = 0.08;
const timestampOffsetStart = Date.now();
assert.equal(await seekPresentedVideoFrame(timestampOffsetVideo, 88.2), true);
assert.ok(Date.now() - timestampOffsetStart < 100, 'Nearby decoded timestamps must not stall paused H.264 seeking');

const missingCallbackVideo = new MockVideo();
missingCallbackVideo.suppressPresentation = true;
const missingCallbackStart = Date.now();
assert.equal(await seekPresentedVideoFrame(missingCallbackVideo, 88.2), true);
assert.ok(Date.now() - missingCallbackStart < 100, 'A missing paused-video presentation callback must fall back to the next paint');

const decodePendingVideo = new MockVideo();
decodePendingVideo.readyState = 1;
const firstFrameReady = waitForVideoFrameData(decodePendingVideo);
setTimeout(() => {
  decodePendingVideo.readyState = 2;
  decodePendingVideo.emit('loadeddata');
}, 1);
assert.equal(await firstFrameReady, true, 'The first detection sample must wait for decoded frame data');

const cancelledSeek = new AbortController();
const cancelledResult = seekVideo(mockVideo, 88.6, { signal: cancelledSeek.signal });
cancelledSeek.abort();
assert.equal(await cancelledResult, false, 'Superseded seeks must stop immediately');

const realLabelPath = new URL('../sample/Clip for Demonstration for Tender Ref. FEHQ 1020_25_label.json', import.meta.url);
const realDocument = normalizeDocument(JSON.parse(fs.readFileSync(realLabelPath, 'utf8')));
const firstDetectedFrame = realDocument.frames.find((frame) => frame.detections.length);
assert.equal(realDocument.frames.length, 522);
assert.equal(realDocument.frames[1].timestamp_sec, 10);
assert.equal(realDocument.sampling.sample_fps, 0.1);
assert.equal(realDocument.video.input_sampled_frame_count, 26100);
assert.ok(firstDetectedFrame, 'The ten-second review set should retain detected samples');
state.doc = realDocument;
assert.equal(fileNameOnly('C:\\video\\CLIP FOR DEMONSTRATION FOR TENDER REF. FEHQ 1020_25.MP4'), 'clip for demonstration for tender ref. fehq 1020_25.mp4');
assert.equal(videoMatchesDocument({ name: 'Clip for Demonstration for Tender Ref. FEHQ 1020_25.mp4' }), true);
assert.equal(videoMatchesDocument({ name: 'different-video.mp4' }), false);

const reviewedLabelPath = new URL('../sample/Clip for Demonstration for Tender Ref. FEHQ 1020_25_label_reviewed.json', import.meta.url);
const reviewedDocument = normalizeDocument(JSON.parse(fs.readFileSync(reviewedLabelPath, 'utf8')));
assert.deepEqual(Array.from(reviewedDocument.clips, (clip) => [clip.start_sec, clip.end_sec]), [[0, 2460], [2460, 5220]], 'Reviewed JSON splice metadata must create both clips');

const restored = applyRecoveryCheckpoint({
  key: 'current',
  schemaVersion: 1,
  savedAt: '2026-08-17T12:00:00.000Z',
  sourceJsonName: 'restored.json',
  frameIndex: 2,
  selectedDetection: null,
  showBoxes: false,
  view: 'report',
  dirty: true,
  video: { name: 'inspection.mp4', duration: 75.5 },
  heatmapBaseFrameSelections: { 'clip-1': '4' },
  doc: videoOnlyDocument,
  report: {
    tenderer: 'Recovered Tenderer',
    demonstrationDate: '2026-08-17',
    tp: '12',
    fp: '3',
    up: '1',
    iou: '0.55',
    compliance: { infrared: true },
    clips: videoOnlyDocument.clips,
    clipCutsText: '',
    heatmapFrameSelections: { 'clip-1': '3' },
  },
});
assert.equal(restored, true);
assert.equal(state.sourceJsonName, 'restored.json');
assert.equal(state.frameIndex, 2);
assert.equal(state.view, 'report');
assert.equal(state.showBoxes, false);
assert.equal(state.dirty, true);
assert.equal(state.report.tenderer, 'Recovered Tenderer');
assert.equal(state.report.compliance.infrared, true);
assert.equal(state.report.heatmapFrameSelections['clip-1'], '3');
assert.equal(state.heatmapBaseFrameSelections['clip-1'], '4');
assert.deepEqual(Array.from(state.report.captures), [], 'Decoded and generated media must be rebuilt after recovery');
assert.deepEqual(Object.keys(state.report.heatmapImages), [], 'Generated heatmap backgrounds must be rebuilt after recovery');
assert.equal(state.recoveryVideo.name, 'inspection.mp4');
assert.equal(state.videoFile, null, 'Recovery must never pretend the browser still has MP4 file permission');
assert.match(recoverySourceSignature(), /restored\.json/);

console.log('Audit checks passed: recovery, held-key navigation, real 26,100-frame import, multi-clip reports, source matching, distinct seeks, and cancellation.');
