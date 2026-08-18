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

vm.runInContext(`${source}\n;globalThis.auditTest = { state, normalizeDocument, createVideoOnlyDocument, reconcileDocumentVideo, reviewSampleStep, sampleReviewFrames, clipTimepoints, nearestFrameInClip, nearestFrameIndexAtTimeline, firstFrameIndexForClip, lastFrameIndexForClip, clipTimebarPosition, rasterizeReportHeatmap, seekVideo, seekPresentedVideoFrame, waitForVideoFrameData, fileNameOnly, videoMatchesDocument, detectVisualCutsFromSignatures, detectSceneCutsFromScores, createClipRangesFromCuts, clipBoundaryUpdate, mergeAdjacentClipRanges, isShortForwardAdvance, sequentialPlaybackRate, preferLiveSequentialDecode, runHeldFrameNavigation, clipDetectionWorkerCount, frameCacheLimitForSize, trimVideoFrameCache, markFrame, createRecoverySnapshot, applyRecoveryCheckpoint, recoverySourceSignature, boxesIntersect, resizeBoxFromHandle, collectBatchEraseMatches };`, context);

const { state, normalizeDocument, createVideoOnlyDocument, reconcileDocumentVideo, reviewSampleStep, sampleReviewFrames, clipTimepoints, nearestFrameInClip, nearestFrameIndexAtTimeline, firstFrameIndexForClip, lastFrameIndexForClip, clipTimebarPosition, rasterizeReportHeatmap, seekVideo, seekPresentedVideoFrame, waitForVideoFrameData, fileNameOnly, videoMatchesDocument, detectVisualCutsFromSignatures, detectSceneCutsFromScores, createClipRangesFromCuts, clipBoundaryUpdate, mergeAdjacentClipRanges, isShortForwardAdvance, sequentialPlaybackRate, preferLiveSequentialDecode, runHeldFrameNavigation, clipDetectionWorkerCount, frameCacheLimitForSize, trimVideoFrameCache, markFrame, createRecoverySnapshot, applyRecoveryCheckpoint, recoverySourceSignature, boxesIntersect, resizeBoxFromHandle, collectBatchEraseMatches } = context.auditTest;
assert.equal(reviewSampleStep(), 10);
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
state.report.clips = state.doc.clips;

state.report.tenderer = 'Recovery test tenderer';
state.report.captures = [{ dataUrl: 'large-generated-image' }];
state.report.baseImages = { 'clip-1': 'large-generated-image' };
state.recoveryVideo = { name: 'inspection.mp4', duration: 60 };
const recoverySnapshot = createRecoverySnapshot('2026-08-17T12:00:00.000Z');
assert.equal(recoverySnapshot.savedAt, '2026-08-17T12:00:00.000Z');
assert.equal(recoverySnapshot.report.tenderer, 'Recovery test tenderer');
assert.equal(recoverySnapshot.video.name, 'inspection.mp4');
assert.equal(recoverySnapshot.report.captures, undefined, 'Generated report images must not enter browser recovery storage');
assert.equal(recoverySnapshot.report.baseImages, undefined, 'Generated base images must not enter browser recovery storage');
state.report.tenderer = '';
state.report.captures = [];
state.report.baseImages = {};
state.recoveryVideo = null;

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
assert.match(html, /id="report-heatmap-pages"/);
assert.match(html, /id="report-clip-list"/);
assert.match(html, /id="report-clip-time-slider"/);
assert.match(html, /id="report-video-time-slider"/);
assert.doesNotMatch(source, /report-summary-sheet/, 'The standalone clip summary page must stay removed');
assert.match(source, /report-count-sheet/, 'Per-clip count reports must remain available');
assert.match(html, /data-action="open-json"[^>]*id="json-import-button"/);
assert.match(html, /data-action="open-video"[^>]*id="video-import-button"/);
assert.match(html, /id="json-input"[^>]*accept="\.json,application\/json"/);
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
assert.deepEqual(Array.from(state.report.captures), [], 'Decoded and generated media must be rebuilt after recovery');
assert.equal(state.recoveryVideo.name, 'inspection.mp4');
assert.equal(state.videoFile, null, 'Recovery must never pretend the browser still has MP4 file permission');
assert.match(recoverySourceSignature(), /restored\.json/);

console.log('Audit checks passed: recovery, held-key navigation, real 26,100-frame import, multi-clip reports, source matching, distinct seeks, and cancellation.');
