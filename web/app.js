const ICON_PATHS = {
  scan: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v3M17 3v3M3 7h3M3 17h3M21 7h-3M21 17h-3M7 21v-3M17 21v-3"/>',
  heat: '<path d="M12 3c2.7 3.4 5.6 6.4 5.6 10.2A5.6 5.6 0 0 1 12 18.8a5.6 5.6 0 0 1-5.6-5.6C6.4 9.4 9.4 6.4 12 3Z"/><path d="M12 10.2c1.2 1.4 2.1 2.4 2.1 3.6a2.1 2.1 0 1 1-4.2 0c0-1.2.9-2.2 2.1-3.6Z"/>',
  table: '<path d="M4 4h16v16H4zM4 9h16M4 14h16M9 4v16M15 4v16"/>',
  command: '<circle cx="12" cy="12" r="8.5"/><path d="M8 12h8M12 8v8"/>',
  upload: '<path d="M12 16V4M7.5 8.5 12 4l4.5 4.5M4 16v3h16v-3"/>',
  download: '<path d="M12 4v12M7.5 11.5 12 16l4.5-4.5M4 20h16"/>',
  undo: '<path d="M9 7 4 12l5 5"/><path d="M5 12h8a6 6 0 0 1 6 6"/>',
  redo: '<path d="m15 7 5 5-5 5"/><path d="M19 12h-8a6 6 0 0 0-6 6"/>',
  eye: '<path d="M2.5 12s3.4-5 9.5-5 9.5 5 9.5 5-3.4 5-9.5 5-9.5-5-9.5-5Z"/><circle cx="12" cy="12" r="2.2"/>',
  flag: '<path d="M5 21V4"/><path d="M5 5c3-2 5 2 8 0 1.3-.9 2.5-1 4-.2v8.3c-1.5-.8-2.7-.7-4 .2-3 2-5-2-8 0"/>',
  film: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M17 9h4M3 15h4M17 15h4"/>',
  expand: '<path d="M8 3H3v5M16 3h5v5M8 21H3v-5M21 16v5h-5"/><path d="m3 8 5-5M16 3l5 5M3 16l5 5M16 21l5-5"/>',
  'chevron-left': '<path d="m14 5-7 7 7 7"/>',
  'chevron-right': '<path d="m10 5 7 7-7 7"/>',
  play: '<path d="m8 5 11 7-11 7V5Z"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  pointer: '<path d="m4 4 7.1 17 2.5-7.4L21 11.1 4 4Z"/><path d="m13.6 13.6 4.2 4.2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  trash: '<path d="M4 7h16M10 11v5M14 11v5M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  edit: '<path d="m4 16-.8 4.8L8 20l11.5-11.5a2.2 2.2 0 0 0-3.1-3.1L4 16Z"/><path d="m14.5 6.5 3 3"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14.8-4L3 10M3 5v5h5M4 13a8 8 0 0 0 14.8 4L21 14m0 5v-5h-5"/>',
  merge: '<path d="M5 5v3a4 4 0 0 0 4 4h10M5 19v-3a4 4 0 0 1 4-4"/><path d="m16 9 3 3-3 3"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m4 17 5-5 3 3 2-2 6 5"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  report: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 12h6M9 16h6"/>',
  printer: '<path d="M7 9V3h10v6M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M7 14h10v7H7z"/>',
  layers: '<path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4M4 17l8 4 8-4"/>',
  'check-square': '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="m8 12 2.5 2.5L16 9"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
};

const REPORT_REQUIREMENTS = [
  { id: 'infrared', code: '1A(a)', label: 'Infrared recording', requirement: 'Thermal video and/or image recording by infrared.' },
  { id: 'netd', code: '1A(b)', label: 'NETD below 50 mK', requirement: 'Thermal sensitivity (NETD) below 50 milliKelvins.' },
  { id: 'focal', code: '1A(c)', label: '3.5 mm lens', requirement: 'Focal length of 3.5 mm (+/- 0.5 mm).' },
  { id: 'capture', code: '1A(d)', label: 'Resolution and frame rate', requirement: 'At least 256 x 192 pixels and at least 20 fps.' },
  { id: 'waterproof', code: '1A(e)', label: 'Waterproof camera', requirement: 'Each thermal imaging camera has a waterproof design.' },
  { id: 'differentiate', code: '1B(a)', label: 'Heat differentiation', requirement: 'Differentiates cold or ambient-temperature objects from heat-generating objects.' },
  { id: 'range', code: '1B(b)', label: '15 m recognition range', requirement: 'Recognises rodent activity within 15 m of the camera.' },
  { id: 'cabinet', code: '1B(c)', label: 'Weather-proof cabinet', requirement: 'System components other than cameras are housed in a weather-proof cabinet.' },
  { id: 'formats', code: '1B(d)', label: 'Standard media formats', requirement: 'Records standard video or image formats approved by the Government Representative.' },
  { id: 'storage', code: '1B(e)', label: 'Encrypted 7-day storage', requirement: 'Removable encrypted storage holds at least seven consecutive days.' },
  { id: 'transmission', code: '1B(f)', label: 'Secure 4.5G access', requirement: '4.5G or above transmission supports secure remote viewing, search and download.' },
  { id: 'display', code: '1B(g)', label: 'Display quality', requirement: 'Remote display is at least 256 x 192 pixels and at least 20 fps.' },
  { id: 'facial', code: '1B(h)', label: 'No facial recognition', requirement: 'Human facial detection and recognition are not used.' },
];

const RECOVERY_DB_NAME = 'thermal-audit-recovery';
const RECOVERY_DB_VERSION = 1;
const RECOVERY_STORE = 'checkpoints';
const RECOVERY_KEY = 'current';
const RECOVERY_CURSOR_KEY = 'thermal-audit-recovery-cursor-v1';
const RECOVERY_SCHEMA_VERSION = 1;
const RECOVERY_DEBOUNCE_MS = 1000;
const RECOVERY_MAX_WAIT_MS = 5000;

// Tender review samples are intentionally sparse. The source video keeps its
// native frame rate, but labels, heatmaps, and reports only need one sample
// every ten seconds.
const REVIEW_SAMPLE_INTERVAL_SEC = 10;
const REVIEW_SAMPLE_FPS = 1 / REVIEW_SAMPLE_INTERVAL_SEC;
const REVIEW_PLAYBACK_FPS = 5;

let recoveryDatabasePromise = null;

function todayIsoDate() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function icon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON_PATHS[name] || ''}</svg>`;
}

const state = {
  doc: null,
  sourceJsonName: 'demo-labels.json',
  videoFile: null,
  videoUrl: '',
  videoTargetTime: null,
  videoDisplayedTime: null,
  videoRequestedTime: null,
  videoSeekToken: 0,
  videoSeekPromise: null,
  videoSeekAbortController: null,
  videoAttachmentToken: 0,
  videoSeeking: false,
  videoFrameCache: new Map(),
  // Keep a small rolling window of decoded sampled frames. A larger window
  // makes rapid keyboard review smooth without retaining the entire source
  // video as full-resolution bitmaps.
  videoFrameCacheLimit: 16,
  videoPrefetchDirection: 1,
  videoPrefetchTimer: null,
  videoPrefetchAbortController: null,
  videoPrefetchQueuedOrigin: null,
  videoPrefetchDecoders: [],
  videoPrefetchSetupPromise: null,
  videoPrefetchGeneration: 0,
  inspectorListSignature: '',
  videoTimeScrubTimer: null,
  clipTimeScrubTimer: null,
  clipThumbnails: new Map(),
  clipThumbnailToken: 0,
  clipThumbnailPreparing: false,
  clipThumbnailTimer: null,
  clipThumbnailAbortController: null,
  clipDetectionRunning: false,
  clipDetectionProgress: 0,
  clipDetectionAbortController: null,
  clipSelection: new Set(),
  frameIndex: 0,
  selectedDetection: null,
  showBoxes: true,
  annotationTool: 'select',
  playing: false,
  playTimer: null,
  frameKeyNavigation: null,
  frameNavigationToken: 0,
  rapidFrameNavigation: false,
  gesture: null,
  batchErase: { clipIndex: null, startSec: 0, endSec: 0, regions: [] },
  history: [],
  future: [],
  dirty: false,
  recoveryTimer: null,
  recoveryMaxTimer: null,
  recoveryIdleHandle: null,
  recoveryCursorTimer: null,
  recoverySaving: false,
  recoveryRevision: 0,
  recoverySavedRevision: 0,
  recoverySavedAt: '',
  recoveryRestored: false,
  recoveryVideo: null,
  view: 'review',
  tableFilter: 'all',
  tableQuery: '',
  tableSelection: new Set(),
  windows: [],
  selectedWindow: null,
  heatmapCache: new Map(),
  report: {
    tenderer: '',
    demonstrationDate: todayIsoDate(),
    tp: '',
    fp: '',
    up: '',
    iou: '',
    compliance: Object.fromEntries(REPORT_REQUIREMENTS.map((item) => [item.id, false])),
    clips: [],
    clipCutsText: '',
    selectedClipId: null,
    selectedClipIds: [],
    batchPrint: false,
    captures: [],
    baseImages: {},
    preparing: false,
  },
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function installIcons() {
  $$('[data-icon]').forEach((node) => { node.innerHTML = icon(node.dataset.icon); });
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function recoverySourceSignature() {
  const frames = state.doc?.frames || [];
  const sourceVideo = String(state.doc?.source_video || state.doc?.video?.source_video || '').toLowerCase();
  return [
    String(state.sourceJsonName || '').toLowerCase(),
    sourceVideo,
    frames.length,
    frames[0]?.sample_index ?? '',
    frames.at(-1)?.sample_index ?? '',
  ].join('|');
}

function recoveryVideoMetadata() {
  const sourceName = String(state.doc?.source_video || state.doc?.video?.source_video || '').split(/[\\/]/).pop();
  const file = state.videoFile;
  const previous = state.recoveryVideo || {};
  const name = file?.name || previous.name || sourceName;
  if (!name) return null;
  return {
    name,
    type: file?.type || previous.type || '',
    size: Number(file?.size ?? previous.size) || 0,
    lastModified: Number(file?.lastModified ?? previous.lastModified) || 0,
    duration: Number(state.doc?.video?.source_duration_sec ?? previous.duration) || 0,
  };
}

function createRecoverySnapshot(savedAt = new Date().toISOString()) {
  if (!state.doc?.frames?.length) return null;
  return {
    key: RECOVERY_KEY,
    schemaVersion: RECOVERY_SCHEMA_VERSION,
    savedAt,
    sourceJsonName: state.sourceJsonName,
    video: recoveryVideoMetadata(),
    frameIndex: state.frameIndex,
    selectedDetection: state.selectedDetection,
    showBoxes: state.showBoxes,
    view: state.view,
    dirty: state.dirty,
    doc: state.doc,
    report: {
      tenderer: state.report.tenderer,
      demonstrationDate: state.report.demonstrationDate,
      tp: state.report.tp,
      fp: state.report.fp,
      up: state.report.up,
      iou: state.report.iou,
      compliance: state.report.compliance,
      clips: state.report.clips,
      clipCutsText: state.report.clipCutsText,
      selectedClipId: state.report.selectedClipId,
      selectedClipIds: state.report.selectedClipIds,
    },
  };
}

function openRecoveryDatabase() {
  if (!globalThis.indexedDB) return Promise.resolve(null);
  if (recoveryDatabasePromise) return recoveryDatabasePromise;
  recoveryDatabasePromise = new Promise((resolve, reject) => {
    const request = globalThis.indexedDB.open(RECOVERY_DB_NAME, RECOVERY_DB_VERSION);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(RECOVERY_STORE)) {
        request.result.createObjectStore(RECOVERY_STORE, { keyPath: 'key' });
      }
    };
    request.onsuccess = () => {
      const database = request.result;
      database.onversionchange = () => {
        database.close();
        recoveryDatabasePromise = null;
      };
      resolve(database);
    };
    request.onerror = () => reject(request.error || new Error('Browser recovery database could not be opened'));
    request.onblocked = () => reject(new Error('Browser recovery database is blocked by another tab'));
  }).catch((error) => {
    recoveryDatabasePromise = null;
    throw error;
  });
  return recoveryDatabasePromise;
}

async function readRecoveryCheckpoint() {
  const database = await openRecoveryDatabase();
  if (!database) return null;
  return new Promise((resolve, reject) => {
    const request = database.transaction(RECOVERY_STORE, 'readonly').objectStore(RECOVERY_STORE).get(RECOVERY_KEY);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error || new Error('Browser recovery checkpoint could not be read'));
  });
}

async function writeRecoveryCheckpoint(checkpoint) {
  const database = await openRecoveryDatabase();
  if (!database) return false;
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(RECOVERY_STORE, 'readwrite');
    transaction.objectStore(RECOVERY_STORE).put(checkpoint);
    transaction.oncomplete = () => resolve(true);
    transaction.onerror = () => reject(transaction.error || new Error('Browser recovery checkpoint could not be saved'));
    transaction.onabort = () => reject(transaction.error || new Error('Browser recovery checkpoint was cancelled'));
  });
}

async function deleteRecoveryCheckpoint() {
  const database = await openRecoveryDatabase();
  if (!database) return false;
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(RECOVERY_STORE, 'readwrite');
    transaction.objectStore(RECOVERY_STORE).delete(RECOVERY_KEY);
    transaction.oncomplete = () => resolve(true);
    transaction.onerror = () => reject(transaction.error || new Error('Browser recovery checkpoint could not be cleared'));
  });
}

function saveRecoveryCursorNow() {
  if (!state.doc?.frames?.length) return;
  clearTimeout(state.recoveryCursorTimer);
  state.recoveryCursorTimer = null;
  try {
    globalThis.localStorage?.setItem(RECOVERY_CURSOR_KEY, JSON.stringify({
      source: recoverySourceSignature(),
      frameIndex: state.frameIndex,
      selectedDetection: state.selectedDetection,
      showBoxes: state.showBoxes,
      view: state.view,
    }));
  } catch (_error) {
    // A cursor is optional; the full IndexedDB checkpoint remains authoritative.
  }
}

function scheduleRecoveryCursor() {
  clearTimeout(state.recoveryCursorTimer);
  state.recoveryCursorTimer = setTimeout(saveRecoveryCursorNow, 500);
}

function restoreRecoveryCursor() {
  try {
    const cursor = JSON.parse(globalThis.localStorage?.getItem(RECOVERY_CURSOR_KEY) || 'null');
    if (!cursor || cursor.source !== recoverySourceSignature()) return;
    state.frameIndex = Math.max(0, Math.min(state.doc.frames.length - 1, Number(cursor.frameIndex) || 0));
    const selectedDetection = Number(cursor.selectedDetection);
    state.selectedDetection = cursor.selectedDetection == null || !Number.isInteger(selectedDetection) ? null : selectedDetection;
    state.showBoxes = cursor.showBoxes !== false;
    if (['review', 'heatmap', 'table', 'report'].includes(cursor.view)) state.view = cursor.view;
  } catch (_error) {
    // Ignore a stale or malformed cursor and use the checkpoint position.
  }
}

function clearRecoverySchedule() {
  clearTimeout(state.recoveryTimer);
  clearTimeout(state.recoveryMaxTimer);
  state.recoveryTimer = null;
  state.recoveryMaxTimer = null;
  if (state.recoveryIdleHandle != null && globalThis.cancelIdleCallback) {
    globalThis.cancelIdleCallback(state.recoveryIdleHandle);
  }
  state.recoveryIdleHandle = null;
}

function recoverySavedLabel(savedAt) {
  const parsed = new Date(savedAt);
  if (Number.isNaN(parsed.getTime())) return 'Autosaved in browser';
  return `Autosaved ${parsed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

function updateRecoveryStatus(message) {
  if (typeof document === 'undefined' || state.clipDetectionRunning) return;
  const node = $('#save-state');
  if (!node) return;
  node.textContent = message;
  node.previousElementSibling?.classList.add('online');
}

async function persistRecoveryCheckpoint() {
  clearRecoverySchedule();
  if (!state.doc?.frames?.length) return false;
  if (state.recoverySaving) return false;
  const revision = state.recoveryRevision;
  const snapshot = createRecoverySnapshot();
  if (!snapshot) return false;
  state.recoverySaving = true;
  try {
    const saved = await writeRecoveryCheckpoint(snapshot);
    if (!saved) {
      state.recoverySavedRevision = revision;
      updateRecoveryStatus('Browser backup unavailable');
      return false;
    }
    state.recoverySavedRevision = revision;
    state.recoverySavedAt = snapshot.savedAt;
    saveRecoveryCursorNow();
    updateRecoveryStatus(recoverySavedLabel(snapshot.savedAt));
    return true;
  } catch (error) {
    console.warn('Browser recovery checkpoint failed', error);
    state.recoverySavedRevision = revision;
    updateRecoveryStatus('Browser backup unavailable');
    return false;
  } finally {
    state.recoverySaving = false;
    if (state.recoveryRevision > state.recoverySavedRevision) {
      scheduleRecoveryCheckpoint({ immediate: true, changed: false });
    }
  }
}

function queueRecoveryWrite() {
  clearTimeout(state.recoveryTimer);
  clearTimeout(state.recoveryMaxTimer);
  state.recoveryTimer = null;
  state.recoveryMaxTimer = null;
  const save = () => {
    state.recoveryIdleHandle = null;
    void persistRecoveryCheckpoint();
  };
  if (globalThis.requestIdleCallback) {
    state.recoveryIdleHandle = globalThis.requestIdleCallback(save, { timeout: 1200 });
  } else {
    save();
  }
}

function scheduleRecoveryCheckpoint({ immediate = false, changed = true } = {}) {
  if (!state.doc?.frames?.length) return;
  if (changed) state.recoveryRevision += 1;
  clearTimeout(state.recoveryTimer);
  if (state.recoveryIdleHandle != null && globalThis.cancelIdleCallback) {
    globalThis.cancelIdleCallback(state.recoveryIdleHandle);
    state.recoveryIdleHandle = null;
  }
  state.recoveryTimer = setTimeout(queueRecoveryWrite, immediate ? 0 : RECOVERY_DEBOUNCE_MS);
  if (!state.recoveryMaxTimer) state.recoveryMaxTimer = setTimeout(queueRecoveryWrite, RECOVERY_MAX_WAIT_MS);
  scheduleRecoveryCursor();
}

function applyRecoveryCheckpoint(checkpoint) {
  if (!checkpoint || checkpoint.schemaVersion !== RECOVERY_SCHEMA_VERSION || !checkpoint.doc?.frames?.length) return false;
  state.doc = normalizeDocument(checkpoint.doc);
  state.sourceJsonName = String(checkpoint.sourceJsonName || '');
  state.frameIndex = Math.max(0, Math.min(state.doc.frames.length - 1, Number(checkpoint.frameIndex) || 0));
  const selectedDetection = Number(checkpoint.selectedDetection);
  state.selectedDetection = checkpoint.selectedDetection == null || !Number.isInteger(selectedDetection) ? null : selectedDetection;
  state.showBoxes = checkpoint.showBoxes !== false;
  state.view = ['review', 'heatmap', 'table', 'report'].includes(checkpoint.view) ? checkpoint.view : 'review';
  state.dirty = Boolean(checkpoint.dirty);
  state.history = [];
  state.future = [];
  state.tableSelection.clear();
  state.windows = [];
  state.selectedWindow = null;
  const savedReport = checkpoint.report || {};
  state.report = {
    tenderer: String(savedReport.tenderer || ''),
    demonstrationDate: String(savedReport.demonstrationDate || todayIsoDate()),
    tp: String(savedReport.tp || ''),
    fp: String(savedReport.fp || ''),
    up: String(savedReport.up || ''),
    iou: String(savedReport.iou || ''),
    compliance: {
      ...Object.fromEntries(REPORT_REQUIREMENTS.map((item) => [item.id, false])),
      ...(savedReport.compliance || {}),
    },
    clips: Array.isArray(savedReport.clips) ? savedReport.clips : [],
    clipCutsText: String(savedReport.clipCutsText || ''),
    selectedClipId: savedReport.selectedClipId ? String(savedReport.selectedClipId) : null,
    selectedClipIds: Array.isArray(savedReport.selectedClipIds) ? savedReport.selectedClipIds.map(String) : [],
    batchPrint: false,
    captures: [],
    baseImages: {},
    preparing: false,
    preparePromise: null,
  };
  if (!state.report.selectedClipIds.length && state.report.clips.length) {
    state.report.selectedClipIds = state.report.clips.map((clip) => String(clip.id));
  }
  state.recoveryRestored = true;
  state.recoveryVideo = checkpoint.video && typeof checkpoint.video === 'object' ? checkpoint.video : null;
  state.recoverySavedAt = String(checkpoint.savedAt || '');
  state.recoveryRevision = 0;
  state.recoverySavedRevision = 0;
  restoreRecoveryCursor();
  const frame = state.doc.frames[state.frameIndex];
  if (!frame?.detections?.length || state.selectedDetection < 0 || state.selectedDetection >= frame.detections.length) {
    state.selectedDetection = null;
  }
  return true;
}

function createDemoDocument() {
  const frames = [];
  for (let i = 0; i < 51; i += 1) {
    const timestamp = 84 + i * 0.2;
    const hasDetection = i >= 21;
    const box = hasDetection ? [Math.max(136, 214 - i * 1.9), 175 + Math.sin(i / 4) * 13, Math.max(218, 302 - i * 1.6), 330 + Math.sin(i / 3) * 16] : null;
    frames.push({
      sample_index: 420 + i,
      source_frame_index: 2100 + i * 5,
      timestamp_sec: Number(timestamp.toFixed(1)),
      detections: box ? [{ class_id: 0, label: 'rat', confidence: Number((0.93 - i * 0.008).toFixed(3)), bbox_xyxy_pixels: box, bbox_yolo_normalized: normalizeYolo(box, 1280, 960) }] : [],
      raw_model_answer: '',
      review_status: i < 8 ? 'edited' : 'unreviewed',
      review_flags: [],
    });
  }
  return {
    schema: 'locateanything-llm-pseudo-labels/1.0',
    annotation_status: 'machine_generated_unreviewed',
    source_video: 'Clip for Demonstration for Tender Ref. FEHQ 1020_25.mp4',
    classes: [{ id: 0, name: 'rat' }],
    sampling: { source_fps: 25, sample_fps: 5, source_frame_stride: 5 },
    video: { width: 1280, height: 960, source_frame_count: 130500, sampled_frame_count: 26100, source_duration_sec: 5220 },
    summary: { detected_sampled_frames: 3727, total_boxes: 5523 },
    frames,
  };
}

function createVideoOnlyDocument(file, duration, width, height) {
  const sourceFps = 25;
  const sampleFps = REVIEW_SAMPLE_FPS;
  const mediaDuration = Math.max(0, Number(duration) || 0);
  const sampleCount = Math.max(1, Math.ceil(mediaDuration * sampleFps));
  const frames = Array.from({ length: sampleCount }, (_value, index) => {
    const timestamp = Math.min(Math.max(0, mediaDuration - 0.001), index * REVIEW_SAMPLE_INTERVAL_SEC);
    return {
      sample_index: index,
      source_frame_index: Math.round(timestamp * sourceFps),
      timestamp_sec: Number(timestamp.toFixed(3)),
      detections: [],
      raw_model_answer: '',
      review_status: 'unreviewed',
      review_flags: [],
    };
  });
  return normalizeDocument({
    schema: 'locateanything-llm-pseudo-labels/1.0',
    annotation_status: 'machine_generated_unreviewed',
    source_video: String(file?.name || 'source-video.mp4'),
    classes: [{ id: 0, name: 'rat' }],
    sampling: { source_fps: sourceFps, sample_fps: sampleFps, source_frame_stride: sourceFps / sampleFps },
    video: {
      width: Math.max(1, Number(width) || 1280),
      height: Math.max(1, Number(height) || 960),
      source_frame_count: Math.max(1, Math.round(mediaDuration * sourceFps)),
      sampled_frame_count: sampleCount,
      source_duration_sec: mediaDuration,
    },
    summary: { detected_sampled_frames: 0, total_boxes: 0 },
    clips: createClipRangesFromCuts([], mediaDuration, 'video'),
    frames,
  });
}

function normalizeYolo(box, width, height) {
  const [x1, y1, x2, y2] = box;
  const w = x2 - x1;
  const h = y2 - y1;
  return [Number(((x1 + x2) / 2 / width).toFixed(6)), Number(((y1 + y2) / 2 / height).toFixed(6)), Number((w / width).toFixed(6)), Number((h / height).toFixed(6))];
}

function finiteNumber(...values) {
  for (const value of values) {
    const number = Number(value);
    if (Number.isFinite(number)) return number;
  }
  return null;
}

function isInferenceOutputDocument(raw) {
  if (!raw || typeof raw !== 'object') return false;
  if (String(raw.schema || '').toLowerCase() === 'rodent-vision-inference/1.0') return true;
  return Boolean(raw.input && Array.isArray(raw.frames) && raw.frames.some((frame) => frame && (
    frame.sampleIndex != null || frame.timestampSeconds != null || frame.outputTimestampSeconds != null
  )));
}

function adaptInferenceOutputDocument(raw) {
  if (!isInferenceOutputDocument(raw)) return raw;
  const input = raw.input && typeof raw.input === 'object' ? raw.input : {};
  const settings = raw.settings && typeof raw.settings === 'object' ? raw.settings : {};
  const outputs = raw.outputs && typeof raw.outputs === 'object' ? raw.outputs : {};
  const renderedInfo = outputs.renderedVideoInfo && typeof outputs.renderedVideoInfo === 'object'
    ? outputs.renderedVideoInfo
    : {};
  const sourceFps = finiteNumber(raw.sampling?.source_fps, raw.sampling?.sourceFps, input.fps, 25) || 25;
  const sampleFps = finiteNumber(raw.sampling?.sample_fps, raw.sampling?.sampleFps, settings.sampleFps, settings.requestedSampleFps, 0.1) || 0.1;
  const sourceDuration = finiteNumber(
    raw.video?.source_duration_sec,
    raw.video?.sourceDurationSec,
    input.durationSeconds,
    renderedInfo.durationSeconds,
  ) || 0;
  const sourceFrameCount = finiteNumber(raw.video?.source_frame_count, raw.video?.sourceFrameCount, input.frames);
  const sampledFrameCount = finiteNumber(
    raw.video?.input_sampled_frame_count,
    raw.video?.sampled_frame_count,
    input.sourceFramesRead,
    renderedInfo.frames,
    Array.isArray(raw.frames) ? raw.frames.length : 0,
  ) || 0;
  const renderedVideo = outputs.renderedVideo || renderedInfo.path || '';
  const hasOutputTimestamps = Array.isArray(raw.frames) && raw.frames.some((frame) => frame?.outputTimestampSeconds != null);
  const renderedSampledVideo = Boolean(renderedVideo && (Number(renderedInfo.fps) > 0 && Number(renderedInfo.fps) <= 0.2 || hasOutputTimestamps));
  raw.source_video ||= input.video || '';
  raw.video = {
    ...(raw.video || {}),
    width: finiteNumber(raw.video?.width, input.width, renderedInfo.width, 1280) || 1280,
    height: finiteNumber(raw.video?.height, input.height, renderedInfo.height, 960) || 960,
    source_duration_sec: sourceDuration,
    source_frame_count: sourceFrameCount || 0,
    sampled_frame_count: sampledFrameCount,
    input_sampled_frame_count: sampledFrameCount,
    rendered_video: renderedVideo,
    rendered_sampled_video: renderedSampledVideo,
  };
  raw.sampling = {
    ...(raw.sampling || {}),
    source_fps: sourceFps,
    sample_fps: sampleFps,
    source_frame_stride: finiteNumber(raw.sampling?.source_frame_stride, raw.sampling?.sourceFrameStride, sourceFps / sampleFps) || sourceFps / sampleFps,
  };
  if (!Array.isArray(raw.classes) || !raw.classes.length) raw.classes = [{ id: 1, name: 'rodent' }];
  raw.rendered_video = renderedVideo;
  raw.rendered_sampled_video = renderedSampledVideo;
  return raw;
}

function median(values) {
  const sorted = values.filter((value) => Number.isFinite(value) && value > 0).sort((a, b) => a - b);
  if (!sorted.length) return 0;
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function explicitClipIndex(frame) {
  const value = frame.clip_index ?? frame.clipIndex ?? frame.segment_index ?? frame.segmentIndex ?? frame.video_clip_index ?? frame.clip?.index;
  const number = Number(value);
  return Number.isInteger(number) && number >= 0 ? number : null;
}

function clipLabel(index, source = {}) {
  return String(source.name || source.label || source.title || `Clip ${index + 1}`);
}

function normalizeExplicitClips(raw, duration) {
  const source = Array.isArray(raw?.clips) ? raw.clips : Array.isArray(raw?.segments) ? raw.segments : [];
  if (!source.length) return [];
  let cursor = 0;
  const clips = source.map((item, index) => {
    const start = Math.max(0, finiteNumber(item.start_sec, item.startSec, item.source_start_sec, item.sourceStartSec, item.timeline_start_sec, item.timelineStartSec, item.offset_sec, item.offsetSec, cursor) || 0);
    const declaredEnd = finiteNumber(item.end_sec, item.endSec, item.source_end_sec, item.sourceEndSec, item.timeline_end_sec, item.timelineEndSec);
    const itemDuration = Math.max(0, finiteNumber(item.duration_sec, item.durationSec, item.durationSeconds, item.duration) || 0);
    const end = Math.max(start, declaredEnd ?? (itemDuration ? start + itemDuration : start));
    cursor = end;
    const savedSource = String(item.source || '').toLowerCase();
    const sourceType = ['metadata', 'heatmap', 'manual', 'detected', 'labels', 'inferred', 'video'].includes(savedSource)
      ? savedSource
      : 'metadata';
    return { id: String(item.id || `clip-${index + 1}`), index, name: clipLabel(index, item), start_sec: start, end_sec: end, source: sourceType };
  });
  clips.forEach((clip, index) => {
    if (clip.end_sec <= clip.start_sec) clip.end_sec = clips[index + 1]?.start_sec || duration || clip.start_sec;
  });
  return clips.filter((clip) => clip.end_sec > clip.start_sec);
}

function clipsFromHeatmap(raw, duration) {
  const splices = Array.isArray(raw?.heatmap?.splices_sec)
    ? raw.heatmap.splices_sec.map(Number).filter((value) => Number.isFinite(value) && value > 0 && value < duration).sort((a, b) => a - b)
    : [];
  if (splices.length) {
    const bounds = [0, ...new Set(splices), duration];
    return bounds.slice(0, -1).map((start, index) => ({ id: `clip-${index + 1}`, index, name: `Clip ${index + 1}`, start_sec: start, end_sec: bounds[index + 1], source: 'heatmap' }));
  }
  const windows = Array.isArray(raw?.heatmap?.windows) ? raw.heatmap.windows : [];
  const groups = new Map();
  windows.forEach((window) => {
    const index = Math.max(0, Number(window.clip_index) || 0);
    const start = finiteNumber(window.start_sec);
    const end = finiteNumber(window.end_sec);
    if (start == null || end == null || end <= start) return;
    const current = groups.get(index) || { start, end };
    current.start = Math.min(current.start, start);
    current.end = Math.max(current.end, end);
    groups.set(index, current);
  });
  return [...groups.entries()].sort((a, b) => a[0] - b[0]).map(([sourceIndex, range], index) => ({ id: `clip-${index + 1}`, index, name: `Clip ${index + 1}`, start_sec: range.start, end_sec: range.end, source: 'heatmap', source_index: sourceIndex }));
}

function deriveDocumentClips(doc, rawFrames, raw) {
  const frames = doc.frames;
  if (!frames.length) return [];
  const deltas = [];
  for (let index = 1; index < rawFrames.length; index += 1) {
    const delta = Number(rawFrames[index]?.timestamp_sec) - Number(rawFrames[index - 1]?.timestamp_sec);
    if (delta > 0) deltas.push(delta);
  }
  const configuredSampleFps = Number(doc.sampling.sample_fps);
  const expected = median(deltas) || (Number.isFinite(configuredSampleFps) && configuredSampleFps > 0 ? 1 / configuredSampleFps : 1);
  const frameMaximum = Math.max(...frames.map((frame) => frame.timestamp_sec));
  const duration = Math.max(frameMaximum + expected, Number(doc.video.source_duration_sec || 0));
  let clips = normalizeExplicitClips(raw, duration);
  if (!clips.length) clips = clipsFromHeatmap(raw, duration);

  if (clips.length) {
    frames.forEach((frame) => {
      const explicitIndex = frame.clip_index;
      let clip = explicitIndex != null ? clips.find((item) => item.source_index === explicitIndex || item.index === explicitIndex) : null;
      if (!clip) clip = clips.find((item, index) => frame.timestamp_sec >= item.start_sec && (frame.timestamp_sec < item.end_sec || index === clips.length - 1));
      clip ||= frame.timestamp_sec < clips[0].start_sec ? clips[0] : clips.at(-1);
      const timestampLooksLocal = frame.timestamp_sec < clip.start_sec - expected;
      frame.timeline_sec = timestampLooksLocal ? clip.start_sec + frame.timestamp_sec : frame.timestamp_sec;
      frame.clip_index = clip.index;
      frame.clip_time_sec = Math.max(0, frame.timeline_sec - clip.start_sec);
    });
    return clips;
  }

  const hasExplicitFrameClips = frames.some((frame) => frame.clip_index != null);
  const gapThreshold = Math.max(5, expected * 25);
  const groups = [];
  let current = [];
  rawFrames.forEach((_rawFrame, index) => {
    const frame = frames[index];
    const previous = current[current.length - 1];
    const changedExplicitClip = hasExplicitFrameClips && previous && frame.clip_index !== previous.clip_index;
    const reset = previous && frame.timestamp_sec < previous.timestamp_sec - expected * 2;
    const gap = previous && frame.timestamp_sec - previous.timestamp_sec > gapThreshold;
    if (current.length && (changedExplicitClip || reset || gap)) {
      groups.push(current);
      current = [];
    }
    current.push(frame);
  });
  if (current.length) groups.push(current);

  let cursor = 0;
  clips = groups.map((group, index) => {
    const firstTimestamp = group[0].timestamp_sec;
    const lastTimestamp = group[group.length - 1].timestamp_sec;
    const timestampsAreGlobal = index === 0 || firstTimestamp >= cursor - expected;
    const offset = timestampsAreGlobal ? 0 : cursor - firstTimestamp;
    group.forEach((frame) => {
      frame.timeline_sec = frame.timestamp_sec + offset;
      frame.clip_index = index;
    });
    const start = group[0].timeline_sec;
    const end = Math.max(start + expected, group[group.length - 1].timeline_sec + expected);
    group.forEach((frame) => { frame.clip_time_sec = Math.max(0, frame.timeline_sec - start); });
    cursor = end;
    return { id: `clip-${index + 1}`, index, name: `Clip ${index + 1}`, start_sec: start, end_sec: end, source: groups.length > 1 ? 'inferred' : 'labels' };
  });
  return clips;
}

function reviewSampleStep() {
  return REVIEW_SAMPLE_INTERVAL_SEC;
}

function sampleReviewFrames(frames, clips, intervalSec = REVIEW_SAMPLE_INTERVAL_SEC) {
  if (!Array.isArray(frames) || !frames.length) return [];
  const interval = Math.max(0.001, Number(intervalSec) || REVIEW_SAMPLE_INTERVAL_SEC);
  const ordered = [...frames].sort((a, b) => frameTimeline(a) - frameTimeline(b) || Number(a.sample_index || 0) - Number(b.sample_index || 0));
  const groups = new Map();
  ordered.forEach((frame) => {
    const key = Number.isInteger(Number(frame.clip_index)) ? Number(frame.clip_index) : 0;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(frame);
  });
  const ranges = Array.isArray(clips) && clips.length
    ? clips
    : [{ index: 0, start_sec: frameTimeline(ordered[0]), end_sec: frameTimeline(ordered.at(-1)) + interval }];
  const selected = [];
  const selectedSet = new Set();
  ranges.forEach((clip) => {
    const clipIndex = Number.isInteger(Number(clip?.index)) ? Number(clip.index) : 0;
    const group = groups.get(clipIndex) || (ranges.length === 1 ? ordered : []);
    if (!group.length) return;
    const start = Number.isFinite(Number(clip?.start_sec)) ? Number(clip.start_sec) : frameTimeline(group[0]);
    const end = Math.max(start, Number.isFinite(Number(clip?.end_sec)) ? Number(clip.end_sec) : frameTimeline(group.at(-1)) + interval);
    let cursor = 0;
    for (let target = start; target < end - 0.000001; target += interval) {
      while (cursor + 1 < group.length && Math.abs(frameTimeline(group[cursor + 1]) - target) <= Math.abs(frameTimeline(group[cursor]) - target)) cursor += 1;
      const frame = group[cursor];
      if (!frame || frameTimeline(frame) < start - interval || frameTimeline(frame) >= end + interval) continue;
      if (!selectedSet.has(frame)) {
        selectedSet.add(frame);
        selected.push(frame);
      }
    }
    if (!selectedSet.has(group[0])) {
      selectedSet.add(group[0]);
      selected.push(group[0]);
    }
  });
  return selected.sort((a, b) => frameTimeline(a) - frameTimeline(b) || Number(a.sample_index || 0) - Number(b.sample_index || 0));
}

function numericBox(value) {
  if (!Array.isArray(value) || value.length < 4) return null;
  const box = value.slice(0, 4).map(Number);
  return box.every((item) => Number.isFinite(item)) ? box : null;
}

function normalizedXyxyToPixels(box, width, height) {
  if (!box) return null;
  return [box[0] * width, box[1] * height, box[2] * width, box[3] * height];
}

function yoloToPixels(box, width, height) {
  if (!box) return null;
  const [centerX, centerY, boxWidth, boxHeight] = box;
  return [(centerX - boxWidth / 2) * width, (centerY - boxHeight / 2) * height, (centerX + boxWidth / 2) * width, (centerY + boxHeight / 2) * height];
}

function normalizeDocument(raw) {
  const doc = raw && typeof raw === 'object' ? raw : createDemoDocument();
  adaptInferenceOutputDocument(doc);
  doc.classes = Array.isArray(doc.classes) && doc.classes.length ? doc.classes : [{ id: 0, name: 'object' }];
  doc.video = { width: 1280, height: 960, source_duration_sec: 0, sampled_frame_count: 0, ...(doc.video || {}) };
  doc.sampling = { source_fps: 25, sample_fps: 5, source_frame_stride: 5, ...(doc.sampling || {}) };
  const inputSampleFps = Number(doc.sampling.sample_fps) > 0 ? Number(doc.sampling.sample_fps) : 5;
  const inputSourceStride = Number(doc.sampling.source_frame_stride) > 0 ? Number(doc.sampling.source_frame_stride) : Number(doc.sampling.source_fps) / inputSampleFps;
  const rawFrames = Array.isArray(doc.frames) ? doc.frames : [];
  const sourceFps = Number(doc.sampling.source_fps) > 0 ? Number(doc.sampling.source_fps) : 25;
  const useRenderedTimeline = Boolean(doc.rendered_sampled_video || doc.video.rendered_sampled_video);
  doc.frames = rawFrames.map((frame, index) => {
    const sourceTimestamp = finiteNumber(frame.timestamp_sec, frame.timestampSeconds, frame.outputTimestampSeconds, index / inputSampleFps) ?? 0;
    const outputTimestamp = finiteNumber(frame.output_timestamp_sec, frame.outputTimestampSeconds);
    const timestamp = useRenderedTimeline && outputTimestamp != null ? outputTimestamp : sourceTimestamp;
    const sampleIndex = finiteNumber(frame.sample_index, frame.sampleIndex, index) ?? index;
    const sourceFrameIndex = finiteNumber(frame.source_frame_index, frame.sourceFrameIndex, frame.frameIndex, Math.round(sourceTimestamp * sourceFps)) ?? Math.round(sourceTimestamp * sourceFps);
    const detections = Array.isArray(frame.detections) ? frame.detections.map((detection) => {
      const classId = finiteNumber(detection.class_id, detection.classId, detection.category_id, detection.categoryId, 0) ?? 0;
      const classEntry = doc.classes.find((item) => Number(item?.id) === classId);
      const pixelBox = numericBox(detection.bbox_xyxy_pixels)
        || numericBox(detection.bboxXyxyPixels)
        || normalizedXyxyToPixels(numericBox(detection.bbox_xyxy_normalized) || numericBox(detection.bboxXyxyNormalized), Number(doc.video.width) || 1280, Number(doc.video.height) || 960)
        || yoloToPixels(numericBox(detection.bbox_yolo_normalized) || numericBox(detection.bboxYoloNormalized), Number(doc.video.width) || 1280, Number(doc.video.height) || 960)
        || [0, 0, 1, 1];
      const normalizedXyxy = numericBox(detection.bbox_xyxy_normalized) || numericBox(detection.bboxXyxyNormalized)
        || [pixelBox[0] / (Number(doc.video.width) || 1280), pixelBox[1] / (Number(doc.video.height) || 960), pixelBox[2] / (Number(doc.video.width) || 1280), pixelBox[3] / (Number(doc.video.height) || 960)];
      const yoloBox = numericBox(detection.bbox_yolo_normalized) || numericBox(detection.bboxYoloNormalized) || normalizeYolo(pixelBox, Number(doc.video.width) || 1280, Number(doc.video.height) || 960);
      return {
        ...detection,
        class_id: classId,
        label: String(detection.label ?? detection.className ?? detection.class_name ?? classEntry?.name ?? doc.classes[0]?.name ?? 'object'),
        confidence: Number(detection.confidence ?? detection.score ?? detection.probability ?? 1),
        bbox_xyxy_pixels: pixelBox.map(Number),
        bbox_xyxy_normalized: normalizedXyxy.map(Number),
        bbox_yolo_normalized: yoloBox.map(Number),
      };
    }) : [];
    return {
      ...frame,
      sample_index: sampleIndex,
      source_frame_index: sourceFrameIndex,
      timestamp_sec: timestamp,
      source_timestamp_sec: sourceTimestamp,
      output_timestamp_sec: outputTimestamp,
      detections,
      raw_model_answer: frame.raw_model_answer ?? frame.rawModelAnswer ?? '',
      review_status: String(frame.review_status ?? frame.reviewStatus ?? 'unreviewed').toLowerCase(),
      reviewed_at_utc: frame.reviewed_at_utc ?? frame.reviewedAtUtc,
      review_flags: Array.isArray(frame.review_flags) ? frame.review_flags : Array.isArray(frame.reviewFlags) ? frame.reviewFlags : [],
      clip_index: explicitClipIndex(frame),
    };
  });
  doc.clips = deriveDocumentClips(doc, doc.frames, raw);
  doc.frames.sort((a, b) => a.timeline_sec - b.timeline_sec || a.sample_index - b.sample_index);
  const inputFrameCount = Number(doc.video.input_sampled_frame_count || doc.video.sampled_frame_count) || doc.frames.length;
  doc.frames = sampleReviewFrames(doc.frames, doc.clips, REVIEW_SAMPLE_INTERVAL_SEC);
  doc.sampling = {
    ...doc.sampling,
    input_sample_fps: inputSampleFps,
    input_source_frame_stride: inputSourceStride,
    review_interval_sec: REVIEW_SAMPLE_INTERVAL_SEC,
    sample_fps: REVIEW_SAMPLE_FPS,
    source_frame_stride: Number(doc.sampling.source_fps) > 0 ? Number(doc.sampling.source_fps) * REVIEW_SAMPLE_INTERVAL_SEC : 250,
  };
  doc.video.input_sampled_frame_count = inputFrameCount;
  doc.video.sampled_frame_count = doc.frames.length;
  if (!doc.video.source_duration_sec && doc.frames.length) doc.video.source_duration_sec = doc.frames[doc.frames.length - 1].timeline_sec;
  return doc;
}

function isAuthoritativeClip(clip) {
  return ['metadata', 'heatmap', 'manual', 'detected'].includes(String(clip?.source || ''));
}

function createClipRangesFromCuts(cuts, duration, source = 'manual') {
  const mediaDuration = Math.max(0, Number(duration) || 0);
  if (!mediaDuration) return [];
  const normalizedCuts = [...new Set((cuts || [])
    .map(Number)
    .filter((time) => Number.isFinite(time) && time > 0.001 && time < mediaDuration - 0.001)
    .map((time) => Number(time.toFixed(3))))]
    .sort((a, b) => a - b);
  const bounds = [0, ...normalizedCuts, mediaDuration];
  return bounds.slice(0, -1).map((start, index) => ({
    id: `clip-${index + 1}`,
    index,
    name: `Clip ${index + 1}`,
    start_sec: start,
    end_sec: bounds[index + 1],
    source,
  }));
}

function assignFramesToClips(doc, clips) {
  if (!doc?.frames || !clips.length) return;
  doc.frames.forEach((frame) => {
    const timeline = Number(frame.timeline_sec ?? frame.timestamp_sec ?? 0);
    const locatedIndex = clips.findIndex((clip, index) => timeline >= clip.start_sec && (timeline < clip.end_sec || index === clips.length - 1));
    const clipIndex = locatedIndex >= 0 ? locatedIndex : timeline < clips[0].start_sec ? 0 : clips.length - 1;
    frame.clip_index = clipIndex;
    frame.clip_time_sec = Math.max(0, timeline - clips[clipIndex].start_sec);
  });
}

function clipRangeSignature(clips) {
  return JSON.stringify((clips || []).map((clip) => [clip.start_sec, clip.end_sec, clip.source]));
}

function reconcileDocumentVideo(doc, duration, width, height) {
  if (!doc || !Number.isFinite(duration) || duration <= 0) return false;
  let changed = false;
  const mediaDuration = Number(duration);
  doc.video ||= {};
  doc.sampling ||= {};
  const sourceFps = Math.max(1, Number(doc.sampling?.source_fps) || 25);
  if (Number(doc.video?.source_duration_sec || 0) !== mediaDuration) {
    doc.video.source_duration_sec = mediaDuration;
    changed = true;
  }
  if (Number.isFinite(width) && width > 0 && Number(doc.video?.width) !== width) {
    doc.video.width = width;
    changed = true;
  }
  if (Number.isFinite(height) && height > 0 && Number(doc.video?.height) !== height) {
    doc.video.height = height;
    changed = true;
  }
  const frameCount = Math.max(1, Math.round(mediaDuration * sourceFps));
  if (Number(doc.video?.source_frame_count || 0) !== frameCount) {
    doc.video.source_frame_count = frameCount;
    changed = true;
  }

  const protectedRanges = (doc.clips || []).some((clip) => ['metadata', 'manual', 'detected'].includes(String(clip?.source || '')));
  const videoSplices = Array.isArray(doc.heatmap?.splices_sec)
    ? [...new Set(doc.heatmap.splices_sec.map(Number).filter((value) => Number.isFinite(value) && value > 0 && value < mediaDuration))].sort((a, b) => a - b)
    : [];
  if (!protectedRanges && videoSplices.length) {
    const spliceClips = createClipRangesFromCuts(videoSplices, mediaDuration, 'heatmap');
    const previousRanges = clipRangeSignature(doc.clips);
    const nextRanges = clipRangeSignature(spliceClips);
    if (previousRanges !== nextRanges) {
      doc.clips = spliceClips;
      assignFramesToClips(doc, spliceClips);
      changed = true;
    }
  }

  let clips = Array.isArray(doc.clips) ? doc.clips : [];
  const hasAuthoritativeRange = clips.some(isAuthoritativeClip);
  if (!hasAuthoritativeRange) {
    const fullVideoClip = createClipRangesFromCuts([], mediaDuration, 'video');
    if (clipRangeSignature(clips) !== clipRangeSignature(fullVideoClip)) {
      doc.clips = fullVideoClip;
      clips = fullVideoClip;
      assignFramesToClips(doc, clips);
      changed = true;
    }
  }
  clips.forEach((clip) => {
    const boundedEnd = Math.min(mediaDuration, Math.max(Number(clip.start_sec) || 0, Number(clip.end_sec) || 0));
    if (Number(clip.end_sec) !== boundedEnd) {
      clip.end_sec = boundedEnd;
      changed = true;
    }
  });
  return changed;
}

function currentFrame() { return state.doc?.frames?.[state.frameIndex] || null; }
function frameTimeline(frame) { return Number(frame?.timeline_sec ?? frame?.timestamp_sec ?? 0); }
function frameClipTime(frame) { return Number(frame?.clip_time_sec ?? frame?.timestamp_sec ?? 0); }
function durationSec() { return Number(state.doc?.video?.source_duration_sec || frameTimeline(state.doc?.frames?.at(-1)) || 0); }
function videoWidth() { return Math.max(1, Number(state.doc?.video?.width || 1280)); }
function videoHeight() { return Math.max(1, Number(state.doc?.video?.height || 960)); }

function videoTimeForFrame(video, frame) {
  const target = Math.max(0, frameTimeline(frame));
  if (!Number.isFinite(video.duration) || video.duration <= 0) return target;
  return Math.min(target, Math.max(0, video.duration - 0.001));
}

function setVideoSeeking(seeking) {
  state.videoSeeking = seeking;
  const showBusy = seeking && !state.rapidFrameNavigation;
  const stage = $('#frame-stage');
  stage?.classList.toggle('is-seeking', showBusy);
  stage?.setAttribute('aria-busy', String(seeking));
  const status = $('#video-state');
  if (!status) return;
  status.classList.remove('error');
  status.hidden = !showBusy;
  if (showBusy) $('#video-state-copy').textContent = 'Loading frame';
}

function showVideoError(message) {
  state.videoSeeking = false;
  const stage = $('#frame-stage');
  stage?.classList.remove('is-seeking');
  stage?.setAttribute('aria-busy', 'false');
  const status = $('#video-state');
  if (!status) return;
  status.hidden = false;
  status.classList.add('error');
  $('#video-state-copy').textContent = message;
}

function recordVideoDecode(mode, startedAt) {
  const stage = $('#frame-stage');
  if (!stage) return;
  stage.dataset.decodeMode = mode;
  stage.dataset.decodeMs = String(Math.max(0, Math.round(performance.now() - startedAt)));
}

function paintVideoFrame(video) {
  const canvas = $('#frame-canvas');
  const width = Math.max(1, video.videoWidth || videoWidth());
  const height = Math.max(1, video.videoHeight || videoHeight());
  if (canvas.width !== width) canvas.width = width;
  if (canvas.height !== height) canvas.height = height;
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) throw new Error('Canvas is unavailable');
  context.drawImage(video, 0, 0, width, height);
  canvas.hidden = false;
}

function videoFrameCacheKey(time) {
  return Number(time || 0).toFixed(4);
}

function clearVideoFrameCache() {
  state.videoFrameCache.forEach((bitmap) => bitmap?.close?.());
  state.videoFrameCache.clear();
}

function frameCacheLimitForSize(width, height, budgetBytes = 96 * 1024 * 1024) {
  const bytesPerFrame = Math.max(1, Number(width) || 1) * Math.max(1, Number(height) || 1) * 4;
  return Math.max(4, Math.min(20, Math.floor(budgetBytes / bytesPerFrame)));
}

function trimVideoFrameCache() {
  const anchor = frameTimeline(currentFrame());
  const direction = state.videoPrefetchDirection < 0 ? -1 : 1;
  while (state.videoFrameCache.size > state.videoFrameCacheLimit) {
    let evictKey = state.videoFrameCache.keys().next().value;
    let evictScore = -1;
    for (const key of state.videoFrameCache.keys()) {
      const delta = Number(key) - anchor;
      const score = Math.abs(delta) * (delta * direction >= 0 ? 0.5 : 1);
      if (score > evictScore) {
        evictKey = key;
        evictScore = score;
      }
    }
    state.videoFrameCache.get(evictKey)?.close?.();
    state.videoFrameCache.delete(evictKey);
  }
}

function cachedVideoFrame(time) {
  const key = videoFrameCacheKey(time);
  const bitmap = state.videoFrameCache.get(key);
  if (!bitmap) return null;
  state.videoFrameCache.delete(key);
  state.videoFrameCache.set(key, bitmap);
  return bitmap;
}

function paintCachedVideoFrame(bitmap) {
  const canvas = $('#frame-canvas');
  const width = Math.max(1, bitmap.width || videoWidth());
  const height = Math.max(1, bitmap.height || videoHeight());
  if (canvas.width !== width) canvas.width = width;
  if (canvas.height !== height) canvas.height = height;
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) return false;
  context.drawImage(bitmap, 0, 0, width, height);
  canvas.hidden = false;
  $('#frame-video').style.opacity = '0';
  return true;
}

async function cachePresentedVideoFrame(video, time, attachmentToken = state.videoAttachmentToken) {
  if (typeof createImageBitmap !== 'function' || !state.videoFile) return;
  try {
    const bitmap = await createImageBitmap(video);
    if (attachmentToken !== state.videoAttachmentToken || !state.videoFile) {
      bitmap.close?.();
      return;
    }
    const key = videoFrameCacheKey(time);
    state.videoFrameCache.get(key)?.close?.();
    state.videoFrameCache.delete(key);
    state.videoFrameCache.set(key, bitmap);
    trimVideoFrameCache();
  } catch (_error) {
    // Browsers without a transferable video surface still use sequential decode.
  }
}

function isShortForwardAdvance(currentTime, targetTime, maximumSeconds = 0.65) {
  const delta = Number(targetTime) - Number(currentTime);
  return Number.isFinite(delta) && delta > 0.001 && delta <= maximumSeconds;
}

function sequentialPlaybackRate(currentTime, targetTime, rapid = state.rapidFrameNavigation) {
  const delta = Math.max(0, Number(targetTime) - Number(currentTime));
  const targetUpdatesPerSecond = rapid ? 30 : 15;
  return Math.max(1.5, Math.min(12, delta * targetUpdatesPerSecond));
}

function preferLiveSequentialDecode(
  currentTime,
  targetTime,
  direction = state.videoPrefetchDirection,
  rapid = state.rapidFrameNavigation,
) {
  return rapid && direction > 0 && isShortForwardAdvance(currentTime, targetTime);
}

function playVideoForwardToTime(video, targetTime, {
  signal,
  timeoutMs = state.rapidFrameNavigation ? 600 : 2500,
  playbackRate = sequentialPlaybackRate(video.currentTime, targetTime),
} = {}) {
  if (signal?.aborted || typeof video.requestVideoFrameCallback !== 'function'
    || video.seeking || !isShortForwardAdvance(video.currentTime, targetTime)) return Promise.resolve(false);
  return new Promise((resolve) => {
    let callbackId = null;
    let timeoutId = null;
    let settled = false;
    const previousRate = Number(video.playbackRate) || 1;
    const previousMuted = video.muted;
    const sourceFps = Math.max(1, Number(state.doc?.sampling?.source_fps) || 25);
    const tolerance = Math.max(0.006, 0.55 / sourceFps);
    const cleanup = () => {
      clearTimeout(timeoutId);
      signal?.removeEventListener('abort', aborted);
      if (callbackId != null && typeof video.cancelVideoFrameCallback === 'function') video.cancelVideoFrameCallback(callbackId);
      video.pause();
      video.playbackRate = previousRate;
      video.muted = previousMuted;
    };
    const done = (value) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(value);
    };
    const aborted = () => done(false);
    const observe = () => {
      callbackId = video.requestVideoFrameCallback((_now, metadata = {}) => {
        callbackId = null;
        const mediaTime = Number.isFinite(Number(metadata.mediaTime)) ? Number(metadata.mediaTime) : Number(video.currentTime);
        if (mediaTime + tolerance < targetTime) {
          video.playbackRate = sequentialPlaybackRate(mediaTime, targetTime);
          observe();
          return;
        }
        done(Math.abs(mediaTime - targetTime) <= tolerance);
      });
    };
    signal?.addEventListener('abort', aborted, { once: true });
    video.muted = true;
    video.playbackRate = playbackRate;
    observe();
    timeoutId = setTimeout(() => done(false), timeoutMs);
    Promise.resolve(video.play()).catch(() => done(false));
  });
}

function waitForNextPaint() {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

function waitForPresentedVideoFrame(video, { signal, expectedTime = null, timeoutMs = 3000 } = {}) {
  if (signal?.aborted) return Promise.resolve(false);
  if (typeof video.requestVideoFrameCallback !== 'function') return waitForNextPaint().then(() => !signal?.aborted);
  return new Promise((resolve) => {
    let callbackId = null;
    let timeoutId = null;
    let settled = false;
    const cleanup = () => {
      signal?.removeEventListener('abort', aborted);
      clearTimeout(timeoutId);
      if (callbackId != null && typeof video.cancelVideoFrameCallback === 'function') video.cancelVideoFrameCallback(callbackId);
    };
    const done = (value) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(value);
    };
    const aborted = () => done(false);
    const requestFrame = () => {
      callbackId = video.requestVideoFrameCallback((_now, metadata = {}) => {
        callbackId = null;
        const mediaTime = Number(metadata.mediaTime);
        // A callback queued before currentTime changes may belong to the old
        // frame. Once seeking has finished, however, the browser is allowed to
        // snap presentation timestamps to a nearby decoded frame (notably for
        // H.264 sources with B-frames). Treat that callback as presented.
        if (Number.isFinite(expectedTime) && Number.isFinite(mediaTime) && video.seeking) {
          requestFrame();
          return;
        }
        if (video.dataset && Number.isFinite(expectedTime) && Number.isFinite(mediaTime)) {
          video.dataset.presentationDriftMs = String(Math.round((mediaTime - expectedTime) * 1000));
        }
        done(true);
      });
    };
    signal?.addEventListener('abort', aborted, { once: true });
    requestFrame();
    timeoutId = setTimeout(() => done(false), timeoutMs);
  });
}

async function seekPresentedVideoFrame(video, time, { signal } = {}) {
  const safeTime = Math.max(0, Math.min(Math.max(0, video.duration - 0.001), Number(time) || 0));
  if (signal?.aborted) return false;
  const sourceFps = Math.max(1, Number(state.doc?.sampling?.source_fps) || 25);
  const tolerance = Math.max(0.003, 0.5 / sourceFps);
  const alreadyPresented = Math.abs(Number(video.currentTime) - safeTime) <= tolerance && !video.seeking;
  if (alreadyPresented) {
    if (video.dataset) video.dataset.decodeMode = 'current';
    return waitForVideoFrameData(video, { signal });
  }

  if (await playVideoForwardToTime(video, safeTime, { signal })) {
    if (video.dataset) video.dataset.decodeMode = 'sequential';
    return true;
  }
  if (video.dataset) video.dataset.decodeMode = 'seek';

  if (typeof video.requestVideoFrameCallback !== 'function') {
    const completed = await seekVideo(video, safeTime, { signal });
    if (!completed) return false;
    await waitForNextPaint();
    return !signal?.aborted;
  }

  // Register before assigning currentTime. A paused video can present the
  // target frame before a callback registered after `seeked` is observed.
  const presentationController = new AbortController();
  const abortPresentation = () => presentationController.abort();
  signal?.addEventListener('abort', abortPresentation, { once: true });
  const presented = waitForPresentedVideoFrame(video, {
    signal: presentationController.signal,
    expectedTime: safeTime,
  });
  try {
    const completed = await seekVideo(video, safeTime, { signal });
    if (!completed) {
      presentationController.abort();
      return false;
    }
    // `seeked` confirms that target data is available. Some browsers omit a
    // paused-video presentation callback, so never let that optional signal
    // hold the review loop: the next paint is a valid fallback.
    const confirmed = await Promise.race([
      presented,
      waitForNextPaint().then(() => !signal?.aborted),
    ]);
    presentationController.abort();
    return confirmed;
  } catch (error) {
    presentationController.abort();
    throw error;
  } finally {
    signal?.removeEventListener('abort', abortPresentation);
  }
}

function syncVideoToFrame(video, frame) {
  if (!state.videoFile || !frame) return Promise.resolve(false);
  const decodeStartedAt = performance.now();
  const requestedTime = Math.max(0, frameTimeline(frame));
  const sameRequestedFrame = state.videoSeekPromise && Math.abs(Number(state.videoRequestedTime) - requestedTime) <= 0.001;
  if (sameRequestedFrame) return state.videoSeekPromise;

  const canvas = $('#frame-canvas');
  const sameDisplayedFrame = state.videoDisplayedTime != null
    && Math.abs(Number(state.videoDisplayedTime) - requestedTime) <= 0.001
    && (!canvas.hidden || video.style.opacity === '1');
  if (sameDisplayedFrame) {
    setVideoSeeking(false);
    recordVideoDecode('current', decodeStartedAt);
    return Promise.resolve(true);
  }

  // During a held Right key, keep the native decoder moving with the visible
  // frame. Consuming only cached bitmaps leaves the video several seconds
  // behind and causes a hard seek when the rolling cache is exhausted.
  const cachedFrame = preferLiveSequentialDecode(video.currentTime, requestedTime)
    ? null
    : cachedVideoFrame(requestedTime);
  if (cachedFrame) {
    state.videoSeekAbortController?.abort();
    state.videoSeekToken += 1;
    state.videoSeekPromise = null;
    state.videoSeekAbortController = null;
    state.videoRequestedTime = requestedTime;
    state.videoTargetTime = requestedTime;
    state.videoDisplayedTime = requestedTime;
    paintCachedVideoFrame(cachedFrame);
    setVideoSeeking(false);
    recordVideoDecode('cache', decodeStartedAt);
    renderFrameBoxes();
    scheduleVideoFramePrefetch(video, state.frameIndex);
    return Promise.resolve(true);
  }

  // A non-cached request needs exclusive use of the decoder. The rolling
  // prefetch path is safe to keep running for cache hits, but it must yield for
  // a random seek.
  stopVideoFramePrefetch();
  state.videoSeekAbortController?.abort();
  const seekController = new AbortController();
  state.videoSeekAbortController = seekController;
  const token = ++state.videoSeekToken;
  state.videoRequestedTime = requestedTime;
  state.videoTargetTime = requestedTime;
  setVideoSeeking(true);

  const seekPromise = (async () => {
    try {
      await waitForVideoMetadata(video);
      if (token !== state.videoSeekToken || !state.videoFile) return false;
      const target = videoTimeForFrame(video, frame);
      state.videoRequestedTime = target;
      state.videoTargetTime = target;
      video.pause();
      const presented = await seekPresentedVideoFrame(video, target, { signal: seekController.signal });
      if (!presented || token !== state.videoSeekToken || !state.videoFile) return false;
      // Native video presentation avoids a full-resolution canvas copy on every frame.
      // Keep the canvas path as a fallback for browsers without requestVideoFrameCallback.
      if (typeof video.requestVideoFrameCallback === 'function') {
        canvas.hidden = true;
        video.style.opacity = '1';
      } else {
        paintVideoFrame(video);
        video.style.opacity = '0';
      }
      state.videoDisplayedTime = target;
      setVideoSeeking(false);
      recordVideoDecode(video.dataset?.decodeMode || 'seek', decodeStartedAt);
      renderFrameBoxes();
      void cachePresentedVideoFrame(video, target, state.videoAttachmentToken);
      scheduleVideoFramePrefetch(video, state.frameIndex);
      return true;
    } catch (error) {
      if (token !== state.videoSeekToken) return false;
      console.error(error);
      showVideoError('Frame could not be decoded');
      return false;
    } finally {
      if (token === state.videoSeekToken) {
        state.videoSeekPromise = null;
        state.videoSeekAbortController = null;
      }
    }
  })();
  state.videoSeekPromise = seekPromise;
  return seekPromise;
}

function stopVideoFramePrefetch() {
  clearTimeout(state.videoPrefetchTimer);
  state.videoPrefetchTimer = null;
  state.videoPrefetchQueuedOrigin = null;
  state.videoPrefetchAbortController?.abort();
  state.videoPrefetchAbortController = null;
}

function disposeVideoElements(videos) {
  videos.forEach((video) => {
    video.pause();
    video.removeAttribute('src');
    video.load();
  });
}

function clearVideoPrefetchDecoders() {
  state.videoPrefetchGeneration += 1;
  disposeVideoElements(state.videoPrefetchDecoders);
  state.videoPrefetchDecoders = [];
  state.videoPrefetchSetupPromise = null;
}

async function ensureVideoPrefetchDecoders(attachmentToken) {
  if (state.videoPrefetchDecoders.length) return state.videoPrefetchDecoders;
  if (state.videoPrefetchSetupPromise) return state.videoPrefetchSetupPromise;
  const sourceUrl = state.videoUrl;
  const generation = state.videoPrefetchGeneration;
  const decoderCount = Math.min(4, Math.max(2, Math.floor((globalThis.navigator?.hardwareConcurrency || 4) / 2)));
  const decoders = Array.from({ length: decoderCount }, () => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    video.src = sourceUrl;
    return video;
  });
  const setupPromise = Promise.all(decoders.map((video) => waitForVideoMetadata(video)))
    .then(() => {
      if (generation !== state.videoPrefetchGeneration || attachmentToken !== state.videoAttachmentToken || sourceUrl !== state.videoUrl) {
        disposeVideoElements(decoders);
        return [];
      }
      state.videoPrefetchDecoders = decoders;
      return decoders;
    })
    .catch(() => {
      disposeVideoElements(decoders);
      return [];
    });
  state.videoPrefetchSetupPromise = setupPromise;
  try {
    return await setupPromise;
  } finally {
    if (state.videoPrefetchSetupPromise === setupPromise) state.videoPrefetchSetupPromise = null;
  }
}

async function prefetchAdjacentVideoFrames(_video, originIndex, { signal, count = 12 } = {}) {
  const frames = state.doc?.frames || [];
  const attachmentToken = state.videoAttachmentToken;
  const originFrame = frames[originIndex];
  if (!originFrame || signal?.aborted || state.frameIndex !== originIndex) return;
  const originTime = frameTimeline(originFrame);
  cachedVideoFrame(originTime);
  const decoders = await ensureVideoPrefetchDecoders(attachmentToken);
  if (!decoders.length || signal?.aborted || attachmentToken !== state.videoAttachmentToken) return;
  const targets = [];
  const direction = state.videoPrefetchDirection < 0 ? -1 : 1;
  const offsets = [];
  for (let offset = 1; offset <= count; offset += 1) offsets.push(direction * offset);
  for (let offset = 1; offset <= Math.ceil(count / 2); offset += 1) offsets.push(-direction * offset);
  for (const offset of offsets) {
    const frame = frames[originIndex + offset];
    if (!frame) continue;
    const target = frameTimeline(frame);
    if (!state.videoFrameCache.has(videoFrameCacheKey(target))) targets.push(target);
  }
  if (!targets.length) return;
  const activeDecoders = decoders.slice(0, Math.min(decoders.length, targets.length));
  const chunkSize = Math.ceil(targets.length / activeDecoders.length);
  await Promise.all(activeDecoders.map(async (decoder, decoderIndex) => {
    const start = decoderIndex * chunkSize;
    const end = Math.min(targets.length, start + chunkSize);
    for (let index = start; index < end; index += 1) {
      if (signal?.aborted || attachmentToken !== state.videoAttachmentToken) return;
      const target = targets[index];
      if (state.videoFrameCache.has(videoFrameCacheKey(target))) continue;
      const presented = await seekPresentedVideoFrame(decoder, target, { signal });
      if (!presented) return;
      await cachePresentedVideoFrame(decoder, target, attachmentToken);
    }
  }));
}

function scheduleVideoFramePrefetch(video, originIndex, delay = 0) {
  state.videoPrefetchQueuedOrigin = originIndex;
  // Keep the current fill alive, then extend the window from the newest frame.
  if (state.videoPrefetchAbortController) return;
  clearTimeout(state.videoPrefetchTimer);
  const rollingReversePrefetch = state.rapidFrameNavigation && state.videoPrefetchDirection < 0;
  if (!state.videoFile || state.playing || (state.rapidFrameNavigation && !rollingReversePrefetch) || state.view !== 'review') return;
  state.videoPrefetchTimer = setTimeout(() => {
    state.videoPrefetchTimer = null;
    const queuedOrigin = state.videoPrefetchQueuedOrigin;
    state.videoPrefetchQueuedOrigin = null;
    if (queuedOrigin == null) return;
    const controller = new AbortController();
    state.videoPrefetchAbortController = controller;
    void prefetchAdjacentVideoFrames(video, queuedOrigin, { signal: controller.signal }).finally(() => {
      if (state.videoPrefetchAbortController !== controller) return;
      state.videoPrefetchAbortController = null;
      if (state.videoPrefetchQueuedOrigin != null) scheduleVideoFramePrefetch(video, state.videoPrefetchQueuedOrigin);
    });
  }, delay);
}

function formatTime(seconds, frames = false) {
  const safe = Math.max(0, Number(seconds) || 0);
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const secs = Math.floor(safe % 60);
  const fraction = frames ? Math.floor((safe % 1) * (Number(state.doc?.sampling?.source_fps) || 25)) : Math.floor((safe % 1) * 10);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}${frames ? `:${String(fraction).padStart(2, '0')}` : `.${fraction}`}`;
}

function formatClock(seconds) {
  const safe = Math.max(0, Math.floor(Number(seconds) || 0));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function formatClipClock(seconds) {
  const value = Math.max(0, Number(seconds) || 0);
  return value > 0 && value < 1 ? formatTime(value) : formatClock(value);
}

function statusText(status) {
  const value = String(status || 'unreviewed').toLowerCase();
  return value === 'accepted' ? 'ACCEPTED' : value === 'edited' ? 'EDITED' : 'PENDING';
}

function markDirty() {
  state.dirty = true;
  state.heatmapCache.clear();
  updateRecoveryStatus('Autosaving...');
  scheduleRecoveryCheckpoint();
}

function recordFrameEdit(mutator) {
  const frame = currentFrame();
  if (!frame) return;
  const before = deepClone(frame);
  mutator(frame);
  const after = deepClone(frame);
  state.history.push({ index: state.frameIndex, before, after });
  state.future = [];
  markDirty();
}

function recordFramesEdit(mutator) {
  if (!state.doc) return;
  const before = new Map();
  state.doc.frames.forEach((frame, index) => { if (mutator(frame, index, true)) before.set(index, deepClone(frame)); });
  if (!before.size) return;
  // Re-run the mutation against the saved indexes; the preview pass above is intentionally read-only.
  before.forEach((_snapshot, index) => mutator(state.doc.frames[index], index, false));
  const after = new Map();
  before.forEach((_snapshot, index) => after.set(index, deepClone(state.doc.frames[index])));
  state.history.push({ indexes: [...before.keys()], before: Object.fromEntries(before), after: Object.fromEntries(after) });
  state.future = [];
  markDirty();
}

function undo() {
  const entry = state.history.pop();
  if (!entry) return showToast('Nothing to undo', '');
  if (entry.indexes) {
    entry.indexes.forEach((index) => { state.doc.frames[index] = deepClone(entry.before[index]); });
  } else {
    state.doc.frames[entry.index] = deepClone(entry.before);
    state.frameIndex = entry.index;
  }
  state.future.push(entry);
  state.selectedDetection = null;
  markDirty();
  renderAll();
  showToast('Edit undone', 'success');
}

function redo() {
  const entry = state.future.pop();
  if (!entry) return showToast('Nothing to redo', '');
  if (entry.indexes) {
    entry.indexes.forEach((index) => { state.doc.frames[index] = deepClone(entry.after[index]); });
  } else {
    state.doc.frames[entry.index] = deepClone(entry.after);
    state.frameIndex = entry.index;
  }
  state.history.push(entry);
  state.selectedDetection = null;
  markDirty();
  renderAll();
  showToast('Edit restored', 'success');
}

function stopHeldFrameNavigation({ resumePrefetch = true } = {}) {
  const navigation = state.frameKeyNavigation;
  if (!navigation && !state.rapidFrameNavigation) return;
  state.frameNavigationToken += 1;
  state.frameKeyNavigation = null;
  state.rapidFrameNavigation = false;
  if (resumePrefetch && state.videoFile && state.view === 'review') {
    scheduleVideoFramePrefetch($('#frame-video'), state.frameIndex, 120);
  }
}

async function runHeldFrameNavigation(
  navigation,
  advanceFrame = setFrame,
  nextPaint = waitForNextPaint,
  refreshSeeking = setVideoSeeking,
) {
  if (!navigation || navigation.running || state.frameKeyNavigation !== navigation) return;
  navigation.running = true;
  navigation.atBoundary = false;
  state.rapidFrameNavigation = true;
  refreshSeeking(state.videoSeeking);
  stopVideoFramePrefetch();
  if (navigation.direction < 0 && state.videoFile) {
    scheduleVideoFramePrefetch($('#frame-video'), state.frameIndex);
  }
  try {
    if (navigation.pending) await navigation.pending;
    while (state.frameKeyNavigation === navigation && navigation.token === state.frameNavigationToken) {
      const nextIndex = Math.max(0, Math.min(
        state.doc.frames.length - 1,
        state.frameIndex + navigation.direction * navigation.step,
      ));
      if (nextIndex === state.frameIndex) {
        navigation.atBoundary = true;
        break;
      }
      navigation.pending = Promise.resolve(advanceFrame(nextIndex, { fromHeldNavigation: true }));
      let presented = await navigation.pending;
      if (presented === false
        && state.frameKeyNavigation === navigation
        && navigation.token === state.frameNavigationToken) {
        await nextPaint();
        navigation.pending = Promise.resolve(advanceFrame(nextIndex, { fromHeldNavigation: true }));
        presented = await navigation.pending;
      }
      if (state.frameKeyNavigation !== navigation || navigation.token !== state.frameNavigationToken) break;
      await nextPaint();
    }
  } finally {
    navigation.running = false;
    if (!state.frameKeyNavigation || state.frameKeyNavigation === navigation) state.rapidFrameNavigation = false;
  }
}

function startFrameKeyNavigation(event) {
  const direction = event.key === 'ArrowLeft' ? -1 : 1;
  const step = event.shiftKey ? 10 : 1;
  const current = state.frameKeyNavigation;
  if (event.repeat && current?.key === event.key && current.step === step) {
    if (!current.running && !current.atBoundary) void runHeldFrameNavigation(current);
    return;
  }

  stopHeldFrameNavigation({ resumePrefetch: false });
  const nextIndex = Math.max(0, Math.min(state.doc.frames.length - 1, state.frameIndex + direction * step));
  const navigation = {
    key: event.key,
    direction,
    step,
    token: ++state.frameNavigationToken,
    running: false,
    atBoundary: nextIndex === state.frameIndex,
    pending: null,
  };
  state.frameKeyNavigation = navigation;
  if (!navigation.atBoundary) {
    navigation.pending = Promise.resolve(setFrame(nextIndex, { fromHeldNavigation: true }));
  }
}

function handleKeyup(event) {
  if (state.frameKeyNavigation?.key === event.key) stopHeldFrameNavigation();
}

function setFrame(index, { fromHeldNavigation = false } = {}) {
  if (!state.doc?.frames?.length) return null;
  if (!fromHeldNavigation) stopHeldFrameNavigation({ resumePrefetch: false });
  stopPlayback(false);
  deferClipThumbnailsForInteraction();
  const nextIndex = Math.max(0, Math.min(state.doc.frames.length - 1, Number(index) || 0));
  if (nextIndex !== state.frameIndex) state.videoPrefetchDirection = nextIndex < state.frameIndex ? -1 : 1;
  state.frameIndex = nextIndex;
  const frame = currentFrame();
  if (state.annotationTool === 'erase' && Number(frame?.clip_index ?? 0) !== Number(state.batchErase.clipIndex ?? 0)) resetBatchErase(activeClip());
  state.selectedDetection = frame?.detections?.length ? Math.min(state.selectedDetection ?? 0, frame.detections.length - 1) : null;
  const frameReady = renderFrame();
  updateTimelineCursor();
  renderInspector();
  updateActiveClip();
  if (state.view === 'heatmap') {
    updateHeatmapTimebars();
    if (frameReady?.then) {
      void frameReady.then(() => {
        if (state.view === 'heatmap') renderHeatmapFrameOnly();
      });
    } else {
      renderHeatmapFrameOnly();
    }
  }
  if (state.view === 'report') updateReportTimebars(null, { syncSelection: true });
  scheduleRecoveryCursor();
  return frameReady;
}

function selectDetection(index) {
  const frame = currentFrame();
  if (!frame || index < 0 || index >= frame.detections.length) return;
  state.annotationTool = 'select';
  state.selectedDetection = index;
  renderFrameBoxes();
  renderInspector();
  renderAnnotationTools();
  scheduleRecoveryCursor();
}

function clampBox(box) {
  let [x1, y1, x2, y2] = box.map(Number);
  x1 = Math.max(0, Math.min(videoWidth(), x1)); x2 = Math.max(0, Math.min(videoWidth(), x2));
  y1 = Math.max(0, Math.min(videoHeight(), y1)); y2 = Math.max(0, Math.min(videoHeight(), y2));
  if (x2 < x1) [x1, x2] = [x2, x1]; if (y2 < y1) [y1, y2] = [y2, y1];
  return [x1, y1, x2, y2];
}

function boxUsable(box) { return (box[2] - box[0]) >= 6 && (box[3] - box[1]) >= 6; }

function boxesIntersect(first, second) {
  const normalize = (box) => {
    const [x1, y1, x2, y2] = box.map((value) => Number(value) || 0);
    return [Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2)];
  };
  const a = normalize(first); const b = normalize(second);
  return a[0] <= b[2] && a[2] >= b[0] && a[1] <= b[3] && a[3] >= b[1];
}

function collectBatchEraseMatches(frames, regions, clipIndex, startSec, endSec) {
  const areas = (regions || []).filter(boxUsable);
  const start = Math.min(Number(startSec) || 0, Number(endSec) || 0);
  const end = Math.max(Number(startSec) || 0, Number(endSec) || 0);
  const matches = [];
  let boxCount = 0;
  if (!areas.length) return { matches, boxCount, frameCount: 0 };
  (frames || []).forEach((frame, frameIndex) => {
    if (Number(frame.clip_index ?? 0) !== Number(clipIndex ?? 0)) return;
    const timeline = frameTimeline(frame);
    if (timeline < start - 0.0001 || timeline > end + 0.0001) return;
    const detectionIndexes = [];
    (frame.detections || []).forEach((detection, detectionIndex) => {
      if (areas.some((region) => boxesIntersect(detection.bbox_xyxy_pixels, region))) detectionIndexes.push(detectionIndex);
    });
    if (!detectionIndexes.length) return;
    boxCount += detectionIndexes.length;
    matches.push({ frameIndex, detectionIndexes });
  });
  return { matches, boxCount, frameCount: matches.length };
}

function resetBatchErase(clip = activeClip()) {
  const clipIndex = Number(currentFrame()?.clip_index ?? clip?.index ?? 0);
  const start = Math.max(0, Number(clip?.start_sec) || 0);
  const end = Math.max(start, Number(clip?.end_sec) || start);
  state.batchErase = { clipIndex, startSec: 0, endSec: end - start, regions: [] };
}

function ensureBatchEraseScope() {
  const clip = activeClip();
  if (!clip) return null;
  const clipIndex = Number(currentFrame()?.clip_index ?? clip.index ?? 0);
  if (state.batchErase.clipIndex !== clipIndex) resetBatchErase(clip);
  const duration = Math.max(0, Number(clip.end_sec) - Number(clip.start_sec));
  state.batchErase.startSec = Math.max(0, Math.min(duration, Number(state.batchErase.startSec) || 0));
  state.batchErase.endSec = Math.max(state.batchErase.startSec, Math.min(duration, Number(state.batchErase.endSec) || 0));
  return clip;
}

function batchEraseBounds() {
  const clip = ensureBatchEraseScope();
  if (!clip) return { clip: null, start: 0, end: 0, duration: 0 };
  const clipStart = Math.max(0, Number(clip.start_sec) || 0);
  const duration = Math.max(0, Number(clip.end_sec) - clipStart);
  return {
    clip,
    duration,
    start: clipStart + state.batchErase.startSec,
    end: clipStart + state.batchErase.endSec,
  };
}

function batchErasePreview() {
  const bounds = batchEraseBounds();
  if (!bounds.clip) return { matches: [], boxCount: 0, frameCount: 0 };
  return collectBatchEraseMatches(
    state.doc?.frames,
    state.batchErase.regions,
    state.batchErase.clipIndex,
    bounds.start,
    bounds.end,
  );
}

function frameInBatchEraseRange(frame) {
  if (!frame || Number(frame.clip_index ?? 0) !== Number(state.batchErase.clipIndex ?? 0)) return false;
  const { start, end } = batchEraseBounds();
  const timeline = frameTimeline(frame);
  return timeline >= start - 0.0001 && timeline <= end + 0.0001;
}

function resizeBoxFromHandle(original, handle, point, width = videoWidth(), height = videoHeight(), minimumSize = 6) {
  let [x1, y1, x2, y2] = original.map(Number);
  const x = Math.max(0, Math.min(width, Number(point.x) || 0));
  const y = Math.max(0, Math.min(height, Number(point.y) || 0));
  if (handle.includes('w')) x1 = Math.min(x, x2 - minimumSize);
  if (handle.includes('e')) x2 = Math.max(x, x1 + minimumSize);
  if (handle.includes('n')) y1 = Math.min(y, y2 - minimumSize);
  if (handle.includes('s')) y2 = Math.max(y, y1 + minimumSize);
  x1 = Math.max(0, Math.min(width - minimumSize, x1));
  y1 = Math.max(0, Math.min(height - minimumSize, y1));
  x2 = Math.max(x1 + minimumSize, Math.min(width, x2));
  y2 = Math.max(y1 + minimumSize, Math.min(height, y2));
  return [x1, y1, x2, y2];
}

function pointToPixels(event) {
  const rect = $('#frame-stage').getBoundingClientRect();
  return { x: (event.clientX - rect.left) / rect.width * videoWidth(), y: (event.clientY - rect.top) / rect.height * videoHeight() };
}

function pixelsToStyle(box) {
  const [x1, y1, x2, y2] = box;
  return { left: `${x1 / videoWidth() * 100}%`, top: `${y1 / videoHeight() * 100}%`, width: `${(x2 - x1) / videoWidth() * 100}%`, height: `${(y2 - y1) / videoHeight() * 100}%` };
}

function renderEraseRegions() {
  const layer = $('#erase-region-layer');
  if (!layer) return;
  layer.replaceChildren();
  if (state.annotationTool !== 'erase') return;
  ensureBatchEraseScope();
  state.batchErase.regions.forEach((region, index) => {
    const marker = document.createElement('span');
    marker.className = 'erase-region-marker';
    Object.assign(marker.style, pixelsToStyle(region));
    const label = document.createElement('span');
    label.textContent = String(index + 1);
    marker.append(label);
    layer.append(marker);
  });
}

function renderFrameBoxes() {
  const layer = $('#box-layer');
  const frame = currentFrame();
  renderEraseRegions();
  if (!frame || !state.showBoxes || !frame.detections.length) {
    if (layer.childElementCount) layer.replaceChildren();
    return;
  }
  layer.replaceChildren();
  const eraseAreas = state.annotationTool === 'erase'
    ? [...state.batchErase.regions, ...(state.gesture?.mode === 'erase' && state.gesture.previewBox ? [state.gesture.previewBox] : [])]
    : [];
  const eraseFrameActive = eraseAreas.length > 0 && frameInBatchEraseRange(frame);
  frame.detections.forEach((detection, index) => {
    let box = detection.bbox_xyxy_pixels;
    if (['move', 'resize'].includes(state.gesture?.mode) && state.gesture.index === index && state.gesture.previewBox) box = state.gesture.previewBox;
    const deletionTarget = eraseFrameActive && eraseAreas.some((area) => boxesIntersect(box, area));
    const node = document.createElement('button');
    node.type = 'button';
    node.className = `detection-box${state.selectedDetection === index ? ' selected' : ''}${deletionTarget ? ' deletion-target' : ''}`;
    Object.assign(node.style, pixelsToStyle(box));
    node.setAttribute('aria-label', `${detection.label} detection ${index + 1}`);
    const label = document.createElement('span');
    label.className = 'box-label';
    label.textContent = `${detection.label} ${Math.round((Number(detection.confidence) || 0) * 100)}%`;
    node.append(label);
    if (state.selectedDetection === index && state.annotationTool === 'select') {
      ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'].forEach((handle) => {
        const resizeHandle = document.createElement('span');
        resizeHandle.className = `box-resize-handle handle-${handle}`;
        resizeHandle.dataset.handle = handle;
        resizeHandle.addEventListener('pointerdown', (event) => startResizeGesture(event, index, handle));
        node.append(resizeHandle);
      });
    }
    node.addEventListener('pointerdown', (event) => startMoveGesture(event, index));
    node.addEventListener('click', (event) => { event.stopPropagation(); if (state.annotationTool === 'select') selectDetection(index); });
    layer.append(node);
  });
}

function startMoveGesture(event, index) {
  if (state.annotationTool !== 'select' || event.button !== 0) return;
  event.preventDefault(); event.stopPropagation();
  const frame = currentFrame();
  if (!frame?.detections[index]) return;
  selectDetection(index);
  const point = pointToPixels(event);
  state.gesture = { mode: 'move', pointerId: event.pointerId, index, start: point, original: [...frame.detections[index].bbox_xyxy_pixels], previewBox: [...frame.detections[index].bbox_xyxy_pixels] };
  $('#frame-stage').setPointerCapture?.(event.pointerId);
}

function startResizeGesture(event, index, handle) {
  if (state.annotationTool !== 'select' || event.button !== 0) return;
  event.preventDefault(); event.stopPropagation();
  const frame = currentFrame();
  if (!frame?.detections[index]) return;
  selectDetection(index);
  const original = [...frame.detections[index].bbox_xyxy_pixels];
  state.gesture = { mode: 'resize', pointerId: event.pointerId, index, handle, original, previewBox: original };
  $('#frame-stage').setPointerCapture?.(event.pointerId);
}

function startCanvasGesture(event) {
  if (!currentFrame() || event.button !== 0) return;
  if (state.annotationTool === 'select') {
    state.selectedDetection = null;
    renderFrameBoxes();
    renderInspector();
    return;
  }
  event.preventDefault();
  const point = pointToPixels(event);
  state.gesture = { mode: state.annotationTool, pointerId: event.pointerId, start: point, previewBox: [point.x, point.y, point.x, point.y] };
  $('#frame-stage').setPointerCapture?.(event.pointerId);
  renderGesturePreview();
}

function moveGesture(event) {
  if (!state.gesture) return;
  const point = pointToPixels(event);
  if (state.gesture.mode === 'draw' || state.gesture.mode === 'erase') {
    state.gesture.previewBox = clampBox([state.gesture.start.x, state.gesture.start.y, point.x, point.y]);
  } else if (state.gesture.mode === 'move') {
    const dx = point.x - state.gesture.start.x; const dy = point.y - state.gesture.start.y;
    const original = state.gesture.original; const width = original[2] - original[0]; const height = original[3] - original[1];
    const x1 = Math.max(0, Math.min(videoWidth() - width, original[0] + dx)); const y1 = Math.max(0, Math.min(videoHeight() - height, original[1] + dy));
    state.gesture.previewBox = [x1, y1, x1 + width, y1 + height];
  } else if (state.gesture.mode === 'resize') {
    state.gesture.previewBox = resizeBoxFromHandle(state.gesture.original, state.gesture.handle, point);
  }
  renderGesturePreview();
}

function renderGesturePreview() {
  const cursor = $('#draw-cursor');
  if (state.gesture?.mode === 'draw' || state.gesture?.mode === 'erase') {
    cursor.hidden = false;
    cursor.classList.toggle('erase-preview', state.gesture.mode === 'erase');
    Object.assign(cursor.style, pixelsToStyle(state.gesture.previewBox));
  } else cursor.hidden = true;
  renderFrameBoxes();
}

function endGesture(event) {
  if (!state.gesture || (state.gesture.pointerId != null && state.gesture.pointerId !== event.pointerId)) return;
  $('#frame-stage').releasePointerCapture?.(event.pointerId);
  const gesture = state.gesture; state.gesture = null; $('#draw-cursor').hidden = true; $('#draw-cursor').classList.remove('erase-preview');
  if (gesture.mode === 'draw') {
    if (boxUsable(gesture.previewBox)) {
      const box = clampBox(gesture.previewBox);
      recordFrameEdit((frame) => {
        frame.detections.push({ class_id: state.doc.classes[0]?.id ?? 0, label: state.doc.classes[0]?.name || 'object', confidence: 1, bbox_xyxy_pixels: box, bbox_yolo_normalized: normalizeYolo(box, videoWidth(), videoHeight()) });
        frame.review_status = 'edited'; frame.reviewed_at_utc = new Date().toISOString();
      });
      state.selectedDetection = currentFrame().detections.length - 1;
      showToast('Detection added', 'success');
    }
    state.annotationTool = 'select';
  } else if (['move', 'resize'].includes(gesture.mode) && gesture.previewBox && JSON.stringify(gesture.previewBox) !== JSON.stringify(gesture.original)) {
    recordFrameEdit((frame) => { frame.detections[gesture.index].bbox_xyxy_pixels = clampBox(gesture.previewBox); frame.detections[gesture.index].bbox_yolo_normalized = normalizeYolo(frame.detections[gesture.index].bbox_xyxy_pixels, videoWidth(), videoHeight()); frame.review_status = 'edited'; frame.reviewed_at_utc = new Date().toISOString(); });
    showToast(gesture.mode === 'resize' ? 'Box size updated' : 'Box position updated', 'success');
  } else if (gesture.mode === 'erase') {
    if (boxUsable(gesture.previewBox)) {
      state.batchErase.regions.push(clampBox(gesture.previewBox));
      showToast(`Delete area ${state.batchErase.regions.length} added`, 'success');
    }
  }
  renderAll();
}

function setAnnotationTool(tool) {
  const next = ['select', 'draw', 'erase'].includes(tool) ? tool : 'select';
  state.annotationTool = next !== 'select' && state.annotationTool === next ? 'select' : next;
  state.gesture = null;
  $('#draw-cursor').hidden = true;
  $('#draw-cursor').classList.remove('erase-preview');
  if (state.annotationTool !== 'select') state.showBoxes = true;
  if (state.annotationTool === 'erase') ensureBatchEraseScope();
  renderAnnotationTools();
  renderFrameBoxes();
  renderBatchErasePanel();
}

function renderAnnotationTools() {
  $$('[data-action="annotation-tool"]').forEach((button) => {
    const active = button.dataset.tool === state.annotationTool;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  const stage = $('#frame-stage');
  stage.classList.toggle('draw-active', state.annotationTool === 'draw');
  stage.classList.toggle('erase-active', state.annotationTool === 'erase');
}

function clearBatchEraseRegions() {
  if (!state.batchErase.regions.length) return;
  state.batchErase.regions = [];
  renderFrameBoxes();
  renderBatchErasePanel();
  showToast('Delete areas cleared');
}

function removeBatchEraseRegion(index) {
  if (!state.batchErase.regions[index]) return;
  state.batchErase.regions.splice(index, 1);
  renderFrameBoxes();
  renderBatchErasePanel();
}

function setBatchEraseTime(bound, rawValue, { parse = false } = {}) {
  const { duration } = batchEraseBounds();
  const parsed = parse ? parseClipTime(rawValue) : Number(rawValue);
  const input = $(`#batch-erase-${bound}-time`);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > duration) {
    input?.classList.add('invalid');
    return false;
  }
  input?.classList.remove('invalid');
  if (bound === 'start') {
    state.batchErase.startSec = parsed;
    if (state.batchErase.endSec < parsed) state.batchErase.endSec = parsed;
  } else {
    state.batchErase.endSec = parsed;
    if (state.batchErase.startSec > parsed) state.batchErase.startSec = parsed;
  }
  renderBatchErasePanel();
  renderFrameBoxes();
  return true;
}

function renderBatchErasePanel() {
  const panel = $('#batch-erase-panel');
  if (!panel) return;
  const active = state.annotationTool === 'erase';
  panel.hidden = !active;
  $('.box-inspector-body')?.classList.toggle('is-batch-erase', active);
  if (!active) return;
  const { clip, duration } = batchEraseBounds();
  if (!clip) return;
  const sampleStep = reviewSampleStep();
  $('#batch-erase-clip').textContent = `${clip.name || `Clip ${state.batchErase.clipIndex + 1}`} only`;
  const regionList = $('#batch-region-list');
  regionList.replaceChildren();
  state.batchErase.regions.forEach((_region, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'batch-region-chip';
    button.setAttribute('aria-label', `Remove delete area ${index + 1}`);
    button.innerHTML = `<span>${index + 1}</span><span>Area ${index + 1}</span><span class="icon">${icon('close')}</span>`;
    button.addEventListener('click', () => removeBatchEraseRegion(index));
    regionList.append(button);
  });
  $('#batch-region-empty').hidden = state.batchErase.regions.length > 0;
  ['start', 'end'].forEach((bound) => {
    const slider = $(`#batch-erase-${bound}-slider`);
    const input = $(`#batch-erase-${bound}-time`);
    const value = state.batchErase[`${bound}Sec`];
    slider.min = '0'; slider.max = String(duration); slider.step = String(sampleStep); slider.value = String(value);
    if (document.activeElement !== input) input.value = formatTime(value);
  });
  const preview = batchErasePreview();
  const previewNode = $('#batch-erase-preview');
  if (!state.batchErase.regions.length) previewNode.textContent = 'Add an area to preview matches';
  else previewNode.textContent = `${preview.boxCount} ${preview.boxCount === 1 ? 'box' : 'boxes'} in ${preview.frameCount} ${preview.frameCount === 1 ? 'frame' : 'frames'}`;
  const applyButton = $('#apply-batch-erase-button');
  applyButton.disabled = preview.boxCount === 0;
  applyButton.lastElementChild.textContent = preview.boxCount ? `Delete ${preview.boxCount}` : 'Delete matches';
}

function applyBatchErase() {
  const preview = batchErasePreview();
  if (!preview.boxCount) return showToast('No matching boxes in this time range');
  const removals = new Map(preview.matches.map((match) => [match.frameIndex, new Set(match.detectionIndexes)]));
  recordFramesEdit((frame, index, previewOnly) => {
    const indexes = removals.get(index);
    if (!indexes) return false;
    if (!previewOnly) {
      frame.detections = frame.detections.filter((_detection, detectionIndex) => !indexes.has(detectionIndex));
      frame.review_status = 'edited';
      frame.reviewed_at_utc = new Date().toISOString();
    }
    return true;
  });
  state.selectedDetection = null;
  state.batchErase.regions = [];
  state.annotationTool = 'select';
  renderAll();
  showToast(`${preview.boxCount} ${preview.boxCount === 1 ? 'box' : 'boxes'} removed from ${preview.frameCount} ${preview.frameCount === 1 ? 'frame' : 'frames'}`, 'success');
}

function deleteSelectedBox() {
  const frame = currentFrame();
  if (!frame || state.selectedDetection == null || !frame.detections[state.selectedDetection]) return;
  const label = frame.detections[state.selectedDetection].label;
  recordFrameEdit((current) => { current.detections.splice(state.selectedDetection, 1); current.review_status = 'edited'; current.reviewed_at_utc = new Date().toISOString(); });
  state.selectedDetection = frame.detections.length ? Math.min(state.selectedDetection, frame.detections.length - 1) : null;
  renderAll(); showToast(`${label} detection removed`, 'success');
}

function toggleFlag() {
  const frame = currentFrame(); if (!frame) return;
  recordFrameEdit((current) => { const flags = new Set(current.review_flags || []); flags.has('manual_flag') ? flags.delete('manual_flag') : flags.add('manual_flag'); current.review_flags = [...flags]; });
  renderAll();
}

function markFrame(status, advance = false) {
  if (!currentFrame()) return;
  const markedIndex = state.frameIndex;
  recordFrameEdit((frame) => { frame.review_status = status; frame.reviewed_at_utc = new Date().toISOString(); });
  renderProgress();
  renderDocumentInfo();
  updateTimelineBucket(markedIndex);
  showToast(status === 'accepted' ? 'Frame accepted' : 'Frame marked edited', 'success');
  if (advance && markedIndex < state.doc.frames.length - 1) {
    setFrame(markedIndex + 1);
    return;
  }
  renderFrame();
  renderInspector();
  updateTimelineCursor();
  updateActiveClip();
}

function toggleBoxes() { state.showBoxes = !state.showBoxes; renderAll(); scheduleRecoveryCursor(); }

function startPlayback() {
  if (!state.doc?.frames?.length) return;
  stopHeldFrameNavigation({ resumePrefetch: false });
  stopVideoFramePrefetch();
  state.videoPrefetchDirection = 1;
  state.playing = true;
  $('#play-icon').innerHTML = icon('pause');
  clearTimeout(state.playTimer);
  // Playback remains responsive even though the underlying review samples
  // are ten seconds apart; this is a UI preview speed, not source decoding.
  const sampleFps = REVIEW_PLAYBACK_FPS;
  const frameDelay = Math.max(40, Math.round(1000 / sampleFps));
  const advance = async () => {
    if (!state.playing) return;
    if (state.frameIndex >= state.doc.frames.length - 1) return stopPlayback();
    state.frameIndex += 1;
    state.selectedDetection = null;
    const frameReady = renderFrame();
    updateTimelineCursor();
    renderInspector();
    updateActiveClip();
    if (frameReady) await frameReady;
    if (state.playing) state.playTimer = setTimeout(advance, frameDelay);
  };
  state.playTimer = setTimeout(advance, frameDelay);
}

function stopPlayback(render = true) {
  if (!state.playing && !state.playTimer) return;
  state.playing = false; clearTimeout(state.playTimer); state.playTimer = null;
  $('#frame-video')?.pause();
  if (render && $('#play-icon')) $('#play-icon').innerHTML = icon('play');
  scheduleRecoveryCursor();
}

function togglePlayback() { state.playing ? stopPlayback() : startPlayback(); }

function renderFrame() {
  const frame = currentFrame(); if (!frame) return;
  const image = $('#frame-image'); const video = $('#frame-video'); const canvas = $('#frame-canvas');
  let frameReady = null;
  if (state.videoFile) {
    image.style.display = 'none';
    video.style.display = 'block';
    video.style.opacity = state.videoDisplayedTime == null ? '0' : video.style.opacity;
    canvas.hidden = typeof video.requestVideoFrameCallback === 'function' && state.videoDisplayedTime != null;
    frameReady = syncVideoToFrame(video, frame);
  } else {
    image.style.display = state.sourceJsonName === 'demo-labels.json' ? 'block' : 'none';
    video.style.display = 'none';
    video.style.opacity = '0';
    canvas.hidden = true;
    state.videoTargetTime = null;
    setVideoSeeking(false);
  }
  $('#stage-empty').hidden = Boolean(state.videoFile || state.sourceJsonName === 'demo-labels.json');
  $('#frame-index-label').textContent = `FRAME ${String(frame.sample_index).padStart(4, '0')}`;
  $('#frame-time-label').textContent = `Clip ${(frame.clip_index ?? 0) + 1} / ${formatTime(frameClipTime(frame))}`;
  $('#current-frame-count').textContent = `${state.frameIndex + 1} / ${state.doc.frames.length}`;
  $('#source-resolution').textContent = `${videoWidth()} x ${videoHeight()}`;
  $('#play-icon').innerHTML = icon(state.playing ? 'pause' : 'play');
  renderAnnotationTools();
  const boxesButton = $('[data-action="toggle-boxes"]');
  boxesButton.classList.toggle('is-on', state.showBoxes);
  boxesButton.setAttribute('aria-pressed', String(state.showBoxes));
  renderFrameBoxes();
  updateVideoTimebar();
  return frameReady;
}

function clipThumbnailKey(clip, edge) {
  return `${clip.id || clip.index}:${edge}`;
}

function clipDurationLabel(clip) {
  const duration = Math.max(0, Number(clip.end_sec) - Number(clip.start_sec));
  if (duration >= 3600) return `${(duration / 3600).toFixed(duration % 3600 ? 1 : 0)}h`;
  if (duration >= 60) return `${Math.round(duration / 60)}m`;
  if (duration < 1) return `${duration.toFixed(1)}s`;
  return `${Math.round(duration)}s`;
}

function firstFrameIndexForClip(clip) {
  const frames = state.doc?.frames || [];
  const byIndex = frames.findIndex((frame) => frame.clip_index === clip.index);
  if (byIndex >= 0) return byIndex;
  const inRange = frames.findIndex((frame) => frameTimeline(frame) >= clip.start_sec && frameTimeline(frame) < clip.end_sec);
  if (inRange >= 0) return inRange;
  return frames.reduce((best, frame, index) => best < 0 || Math.abs(frameTimeline(frame) - clip.start_sec) < Math.abs(frameTimeline(frames[best]) - clip.start_sec) ? index : best, -1);
}

function lastFrameIndexForClip(clip) {
  const frames = state.doc?.frames || [];
  for (let index = frames.length - 1; index >= 0; index -= 1) {
    if (frames[index].clip_index === clip.index) return index;
  }
  for (let index = frames.length - 1; index >= 0; index -= 1) {
    const time = frameTimeline(frames[index]);
    if (time >= clip.start_sec && time < clip.end_sec) return index;
  }
  return firstFrameIndexForClip(clip);
}

function createClipThumbnail(clip, edge) {
  const holder = document.createElement('button');
  holder.type = 'button';
  holder.className = 'clip-thumbnail';
  const clipName = clip.name || `Clip ${Number(clip.index) + 1}`;
  const edgeLabel = edge === 'start' ? 'start' : 'end';
  holder.setAttribute('aria-label', `Jump to ${clipName} ${edgeLabel} frame`);
  holder.title = `Go to clip ${edgeLabel}`;
  holder.addEventListener('click', (event) => {
    event.stopPropagation();
    const frameIndex = edge === 'start' ? firstFrameIndexForClip(clip) : lastFrameIndexForClip(clip);
    if (frameIndex >= 0) setFrame(frameIndex);
  });
  const key = clipThumbnailKey(clip, edge);
  const source = state.clipThumbnails.get(key) || (state.sourceJsonName === 'demo-labels.json' ? './public/demo-frame.jpg' : '');
  if (source) {
    const image = document.createElement('img');
    image.src = source;
    image.alt = '';
    image.dataset.clipThumb = key;
    holder.append(image);
  } else {
    const placeholder = document.createElement('span');
    placeholder.className = 'icon';
    placeholder.innerHTML = icon('image');
    holder.append(placeholder);
  }
  return holder;
}

function updateActiveClip() {
  const activeIndex = currentFrame()?.clip_index ?? 0;
  $$('#clip-list .clip-row, #heatmap-clip-list .clip-row').forEach((row) => {
    const active = Number(row.dataset.clipIndex) === activeIndex;
    const changed = active && !row.classList.contains('is-active');
    row.classList.toggle('is-active', active);
    active ? row.setAttribute('aria-current', 'true') : row.removeAttribute('aria-current');
    if (changed) row.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  });
}

function sortedClipSelection() {
  return [...state.clipSelection].sort((left, right) => left - right);
}

function clipSelectionIsAdjacent(indexes) {
  return indexes.every((index, position) => position === 0 || index === indexes[position - 1] + 1);
}

function updateClipSelectionUi() {
  const clips = state.doc?.clips || [];
  [...state.clipSelection].forEach((index) => {
    if (!Number.isInteger(index) || index < 0 || index >= clips.length) state.clipSelection.delete(index);
  });
  const selected = sortedClipSelection();
  $$('#clip-list .clip-row, #heatmap-clip-list .clip-row').forEach((row) => {
    const index = Number(row.dataset.clipIndex);
    const checked = state.clipSelection.has(index);
    row.classList.toggle('is-selected', checked);
    row.querySelector('.clip-select-checkbox')?.toggleAttribute('checked', checked);
    const checkbox = row.querySelector('.clip-select-checkbox');
    if (checkbox) checkbox.checked = checked;
  });
  const button = $('#merge-clips-button');
  if (!button) return;
  const canMerge = selected.length >= 2 && clipSelectionIsAdjacent(selected);
  button.disabled = !canMerge;
  const label = canMerge
    ? `Merge ${selected.length} selected clips`
    : selected.length === 1
      ? 'Select a neighboring clip to merge'
      : 'Select adjacent clips to merge';
  button.setAttribute('aria-label', label);
  button.dataset.tooltip = label;
}

function toggleClipSelection(index, checked) {
  const selected = sortedClipSelection();
  if (checked && selected.length && index !== selected[0] - 1 && index !== selected[selected.length - 1] + 1) {
    showToast('Select the neighboring clip first', 'error');
    updateClipSelectionUi();
    return false;
  }
  if (!checked && selected.length > 2 && index !== selected[0] && index !== selected[selected.length - 1]) {
    showToast('Remove a clip from either end of the selection', 'error');
    updateClipSelectionUi();
    return false;
  }
  checked ? state.clipSelection.add(index) : state.clipSelection.delete(index);
  updateClipSelectionUi();
  return true;
}

function activeClip() {
  const clips = state.doc?.clips || [];
  const index = currentFrame()?.clip_index ?? 0;
  return clips[index] || clips[0] || null;
}

function clipTimebarPosition(clip, timelineTime) {
  const start = Math.max(0, Number(clip?.start_sec) || 0);
  const end = Math.max(start, Number(clip?.end_sec) || start);
  const duration = end - start;
  const current = Math.max(0, Math.min(duration, (Number(timelineTime) || 0) - start));
  return { start, end, duration, current, timeline: start + current };
}

function nearestFrameIndexAtTimeline(time, clip = null) {
  const frames = state.doc?.frames || [];
  if (!frames.length) return -1;
  let low = 0;
  let high = frames.length;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    if (frameTimeline(frames[middle]) < time) low = middle + 1;
    else high = middle;
  }
  const candidates = [low, low - 1].filter((index) => index >= 0 && index < frames.length)
    .filter((index) => {
      if (!clip) return true;
      const frame = frames[index];
      if (frame.clip_index != null && clip.index != null) return Number(frame.clip_index) === Number(clip.index);
      return frameTimeline(frame) >= clip.start_sec && frameTimeline(frame) < clip.end_sec;
    });
  return candidates.sort((left, right) => Math.abs(frameTimeline(frames[left]) - time) - Math.abs(frameTimeline(frames[right]) - time))[0] ?? -1;
}

function updateVideoTimebar(timeOverride = null) {
  const slider = $('#video-time-slider');
  const duration = Math.max(0, state.videoFile ? Number($('#frame-video')?.duration || 0) : durationSec());
  if (!slider || !duration) {
    updateClipTimebar();
    return;
  }
  const frame = currentFrame();
  const current = Math.max(0, Math.min(duration, Number(timeOverride ?? frameTimeline(frame)) || 0));
  slider.min = '0';
  slider.max = String(duration);
  slider.step = String(reviewSampleStep());
  slider.value = String(current);
  slider.setAttribute('aria-valuetext', `${formatClipClock(current)} of ${formatClipClock(duration)}`);
  const progress = duration ? current / duration * 100 : 0;
  slider.style.setProperty('--timebar-progress', `${progress}%`);
  const clipLabelNode = $('#video-time-clip');
  if (clipLabelNode) clipLabelNode.textContent = 'Video';
  const currentNode = $('#video-time-current');
  const endNode = $('#video-time-end');
  if (currentNode) currentNode.textContent = formatClipClock(current);
  if (endNode) endNode.textContent = formatClipClock(duration);

  updateClipTimebar(current);

  const segments = $('#video-time-segments');
  if (segments) {
    const signature = (state.doc?.clips || []).map((item) => `${item.start_sec}:${item.end_sec}`).join('|');
    if (segments.dataset.signature !== signature) {
      segments.dataset.signature = signature;
      segments.replaceChildren();
      (state.doc?.clips || []).forEach((item, index) => {
        const segment = document.createElement('span');
        segment.className = `video-time-segment${index === (frame?.clip_index ?? 0) ? ' active' : ''}`;
        segment.style.left = `${Math.max(0, Number(item.start_sec) || 0) / duration * 100}%`;
        segment.style.width = `${Math.max(0, (Number(item.end_sec) || 0) - (Number(item.start_sec) || 0)) / duration * 100}%`;
        segment.dataset.clipIndex = String(index);
        segments.append(segment);
      });
    }
    $$('#video-time-segments .video-time-segment').forEach((segment) => segment.classList.toggle('active', Number(segment.dataset.clipIndex) === (frame?.clip_index ?? 0)));
  }
  $$('#clip-list [data-clip-progress], #heatmap-clip-list [data-clip-progress]').forEach((track) => {
    const clip = state.doc?.clips?.[Number(track.dataset.clipProgress)];
    const fill = track.firstElementChild;
    if (!clip || !fill) return;
    const range = Math.max(0.001, Number(clip.end_sec) - Number(clip.start_sec));
    const ratio = Math.max(0, Math.min(1, (current - Number(clip.start_sec)) / range));
    fill.style.width = `${ratio * 100}%`;
  });
}

function updateClipTimebar(timelineOverride = null) {
  const slider = $('#clip-time-slider');
  if (!slider) return;
  const clip = activeClip();
  const labelNode = $('#clip-time-label');
  const currentNode = $('#clip-time-current');
  const endNode = $('#clip-time-end');
  if (!clip) {
    slider.disabled = true;
    slider.value = '0';
    if (labelNode) labelNode.textContent = 'Clip';
    if (currentNode) currentNode.textContent = '00:00:00.0';
    if (endNode) endNode.textContent = '00:00:00.0';
    return;
  }

  const frame = currentFrame();
  const position = clipTimebarPosition(clip, timelineOverride ?? frameTimeline(frame));
  const clipIndex = Math.max(0, Number.isFinite(Number(clip.index)) ? Number(clip.index) : (state.doc?.clips || []).indexOf(clip));
  const clipLabel = `Clip ${clipIndex + 1}`;
  slider.disabled = position.duration <= 0;
  slider.min = '0';
  slider.max = String(Math.max(position.duration, 0.001));
  slider.step = String(reviewSampleStep());
  slider.value = String(position.current);
  slider.setAttribute('aria-valuetext', `${formatTime(position.current)} of ${formatTime(position.duration)} in ${clipLabel}`);
  slider.style.setProperty('--timebar-progress', `${position.duration ? position.current / position.duration * 100 : 0}%`);
  if (labelNode) labelNode.textContent = clipLabel;
  if (currentNode) currentNode.textContent = formatTime(position.current);
  if (endNode) endNode.textContent = formatTime(position.duration);
}

function updateTimelineCursor() {
  const frames = state.doc?.frames || [];
  if (!frames.length) return;
  const slider = $('#timeline-slider');
  if (slider) slider.value = String(state.frameIndex);
  const thumb = $('#timeline-thumb');
  if (thumb) thumb.style.left = `${frames.length > 1 ? state.frameIndex / (frames.length - 1) * 100 : 0}%`;
  const position = $('#timeline-position');
  if (position) position.textContent = `Frame ${frames[state.frameIndex]?.sample_index ?? state.frameIndex}`;
  $$('#filmstrip .filmstrip-item').forEach((item) => item.classList.toggle('active', Number(item.dataset.frameIndex) === state.frameIndex));
}

function updateTimelineBucket(frameIndex) {
  const frames = state.doc?.frames || [];
  const track = $('#timeline-track');
  if (!frames.length || !track) return;
  const bucketCount = Math.min(720, Math.max(1, frames.length));
  const bucketIndex = Math.min(bucketCount - 1, Math.floor(Math.max(0, frameIndex) / frames.length * bucketCount));
  const start = Math.ceil(bucketIndex / bucketCount * frames.length);
  const end = Math.max(start + 1, Math.ceil((bucketIndex + 1) / bucketCount * frames.length));
  let detected = false;
  let reviewed = false;
  let flagged = false;
  for (let index = start; index < end && index < frames.length; index += 1) {
    const frame = frames[index];
    if (frame.detections.length) detected = true;
    if (frame.review_status !== 'unreviewed') reviewed = true;
    if (frame.review_flags?.includes('manual_flag')) flagged = true;
  }
  let segment = track.querySelector(`[data-timeline-bucket="${bucketIndex}"]`);
  if (!detected && !reviewed && !flagged) {
    segment?.remove();
    return;
  }
  if (!segment) {
    segment = document.createElement('span');
    segment.dataset.timelineBucket = String(bucketIndex);
    segment.style.left = `${bucketIndex / bucketCount * 100}%`;
    segment.style.width = `${100 / bucketCount + .15}%`;
    track.append(segment);
  }
  segment.className = `timeline-segment${flagged ? ' flagged' : reviewed ? ' reviewed' : ''}`;
}

function renderClipSidebar(listSelector = '#clip-list', countSelector = '#clip-count') {
  const list = $(listSelector);
  if (!list) return;
  const clips = state.doc?.clips || [];
  const count = $(countSelector);
  if (count) count.textContent = clips.length;
  const signature = clips.map((clip) => [
    clip.id,
    clip.start_sec,
    clip.end_sec,
    state.clipThumbnails.has(clipThumbnailKey(clip, 'start')),
    state.clipThumbnails.has(clipThumbnailKey(clip, 'end')),
  ].join(':')).join('|');
  if (list.dataset.signature === signature && list.childElementCount === clips.length) {
    updateActiveClip();
    updateClipSelectionUi();
    updateClipDetectionUi();
    return;
  }

  list.dataset.signature = signature;
  list.replaceChildren();
  clips.forEach((clip, index) => {
    const frameIndex = firstFrameIndexForClip(clip);
    const row = document.createElement('article');
    row.className = 'clip-row';
    row.dataset.clipIndex = clip.index;
    row.setAttribute('aria-label', `${clip.name || `Clip ${index + 1}`}, ${formatClipClock(clip.start_sec)} to ${formatClipClock(clip.end_sec)}`);

    const heading = document.createElement('span');
    heading.className = 'clip-row-heading';
    const titleGroup = document.createElement('span');
    titleGroup.className = 'clip-row-title-group';
    const selection = document.createElement('input');
    selection.type = 'checkbox';
    selection.className = 'clip-select-checkbox';
    selection.checked = state.clipSelection.has(index);
    selection.setAttribute('aria-label', `Select ${clip.name || `Clip ${index + 1}`} for merging`);
    selection.title = 'Select clip for merging';
    selection.addEventListener('change', () => toggleClipSelection(index, selection.checked));
    const title = document.createElement('span');
    title.className = 'clip-row-title';
    title.textContent = clip.name || `Clip ${index + 1}`;
    const duration = document.createElement('span');
    duration.className = 'clip-row-duration';
    duration.textContent = clipDurationLabel(clip);
    titleGroup.append(selection, title);
    heading.append(titleGroup, duration);

    const thumbnails = document.createElement('span');
    thumbnails.className = 'clip-thumbnails';
    thumbnails.append(createClipThumbnail(clip, 'start'), createClipThumbnail(clip, 'end'));

    const times = document.createElement('span');
    times.className = 'clip-time-range';
    const start = document.createElement('input');
    start.type = 'text';
    start.className = 'clip-time-input';
    start.value = formatClipClock(clip.start_sec);
    start.inputMode = 'text';
    start.setAttribute('aria-label', `${clip.name || `Clip ${index + 1}`} start time`);
    start.readOnly = index === 0;
    const arrow = document.createElement('span');
    arrow.className = 'icon';
    arrow.innerHTML = icon('chevron-right');
    const end = document.createElement('input');
    end.type = 'text';
    end.className = 'clip-time-input';
    end.value = formatClipClock(clip.end_sec);
    end.inputMode = 'text';
    end.setAttribute('aria-label', `${clip.name || `Clip ${index + 1}`} end time`);
    end.readOnly = index === clips.length - 1;
    const wireTimeInput = (input, edge) => {
      const original = input.value;
      let committing = false;
      input.title = input.readOnly ? 'Video boundary' : 'Click to edit time';
      input.addEventListener('click', (event) => { event.stopPropagation(); input.select(); });
      input.addEventListener('pointerdown', (event) => event.stopPropagation());
      input.addEventListener('input', () => {
        input.classList.remove('invalid');
        input.removeAttribute('aria-invalid');
      });
      const commit = () => {
        if (input.readOnly || committing || input.value.trim() === original) return true;
        committing = true;
        const applied = commitClipBoundary(index, edge, input.value, input);
        if (!applied) committing = false;
        return applied;
      };
      input.addEventListener('keydown', (event) => {
        event.stopPropagation();
        if (event.key === 'Enter') {
          event.preventDefault();
          if (commit() && input.isConnected) input.blur();
        }
        if (event.key === 'Escape') {
          event.preventDefault();
          input.value = original;
          input.classList.remove('invalid');
          input.removeAttribute('aria-invalid');
          input.blur();
        }
      });
      input.addEventListener('blur', () => {
        if (!commit()) {
          input.value = original;
          input.classList.remove('invalid');
          input.removeAttribute('aria-invalid');
        }
      });
    };
    wireTimeInput(start, 'start');
    wireTimeInput(end, 'end');
    times.append(start, arrow, end);
    const progress = document.createElement('span');
    progress.className = 'clip-progress';
    progress.dataset.clipProgress = String(clip.index);
    progress.append(document.createElement('span'));
    row.append(heading, thumbnails, times, progress);
    row.addEventListener('click', (event) => {
      if (event.target.closest('input, button')) return;
      setFrame(frameIndex);
    });
    list.append(row);
  });
  updateActiveClip();
  updateClipSelectionUi();
  updateClipDetectionUi();
}

function renderHeatmapClipSidebar() {
  renderClipSidebar('#heatmap-clip-list', '#heatmap-clip-count');
}

function resetClipThumbnails() {
  pauseClipThumbnailWork();
  state.clipSelection.clear();
  state.clipThumbnails.clear();
  state.heatmapCache.clear();
  ['#clip-list', '#heatmap-clip-list'].forEach((selector) => {
    const list = $(selector);
    if (list) list.dataset.signature = '';
  });
}

// Thumbnail seeks use their own decoder, but they still compete for the same
// browser media pipeline as the review surface and the clip scanner. Stop that
// background work whenever an interactive or bulk decode needs priority.
function pauseClipThumbnailWork() {
  clearTimeout(state.clipThumbnailTimer);
  state.clipThumbnailTimer = null;
  state.clipThumbnailAbortController?.abort();
  state.clipThumbnailAbortController = null;
  state.clipThumbnailToken += 1;
  state.clipThumbnailPreparing = false;
}

async function captureClipThumbnail(video, time, { signal } = {}) {
  const presented = await seekPresentedVideoFrame(video, time, { signal });
  if (!presented) return '';
  const canvas = document.createElement('canvas');
  canvas.width = 192;
  canvas.height = 144;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', 0.72);
}

async function prepareClipThumbnails() {
  if (!state.videoUrl || !state.doc?.clips?.length || state.clipThumbnailPreparing) return;
  const token = ++state.clipThumbnailToken;
  const controller = new AbortController();
  state.clipThumbnailAbortController = controller;
  state.clipThumbnailPreparing = true;
  const sourceVideo = document.createElement('video');
  sourceVideo.preload = 'metadata';
  sourceVideo.muted = true;
  sourceVideo.playsInline = true;
  sourceVideo.src = state.videoUrl;

  try {
    sourceVideo.load();
    await waitForVideoMetadata(sourceVideo);
    const sourceFps = Math.max(1, Number(state.doc.sampling?.source_fps) || 25);
    for (const clip of state.doc.clips) {
      const endTime = Math.max(clip.start_sec, clip.end_sec - 1 / sourceFps);
      for (const [edge, time] of [['start', clip.start_sec], ['end', endTime]]) {
        if (token !== state.clipThumbnailToken || controller.signal.aborted) return;
        const key = clipThumbnailKey(clip, edge);
        if (state.clipThumbnails.has(key)) continue;
        const thumbnail = await captureClipThumbnail(sourceVideo, time, { signal: controller.signal });
        if (token !== state.clipThumbnailToken || controller.signal.aborted) return;
        state.clipThumbnails.set(key, thumbnail);
        ['#clip-list', '#heatmap-clip-list'].forEach((selector) => {
          const list = $(selector);
          if (list) list.dataset.signature = '';
        });
        renderClipSidebar();
        renderHeatmapClipSidebar();
      }
    }
  } catch (error) {
    if (token === state.clipThumbnailToken && !controller.signal.aborted) console.warn('Clip thumbnails could not be prepared', error);
  } finally {
    sourceVideo.removeAttribute('src');
    sourceVideo.load();
    if (state.clipThumbnailAbortController === controller) state.clipThumbnailAbortController = null;
    if (token === state.clipThumbnailToken) state.clipThumbnailPreparing = false;
  }
}

function deferClipThumbnailsForInteraction() {
  pauseClipThumbnailWork();
  const expected = (state.doc?.clips?.length || 0) * 2;
  if (state.videoUrl && state.clipThumbnails.size < expected) scheduleClipThumbnails(1400);
}

function analyzeFrameLuma(canvas) {
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) return { plane: [], signature: [] };
  const width = Math.max(1, canvas.width);
  const height = Math.max(1, canvas.height);
  const pixels = context.getImageData(0, 0, width, height).data;
  const plane = new Float32Array(width * height);
  const sums = new Float32Array(64);
  const counts = new Uint16Array(64);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      // The source is BT.470/BT.601 YUV. Reconstructing that luma channel from
      // the browser's RGB canvas tracks FFmpeg's scene detector more closely.
      const luma = (0.299 * pixels[offset] + 0.587 * pixels[offset + 1] + 0.114 * pixels[offset + 2]) / 255;
      plane[y * width + x] = luma;
      const cellX = Math.min(7, Math.floor(x * 8 / width));
      const cellY = Math.min(7, Math.floor(y * 8 / height));
      const cellIndex = cellY * 8 + cellX;
      sums[cellIndex] += luma;
      counts[cellIndex] += 1;
    }
  }
  const signature = Array.from(sums, (sum, index) => counts[index] ? sum / counts[index] : 0);
  return { plane, signature };
}

function lumaSignatureFromCanvas(canvas) { return analyzeFrameLuma(canvas).signature; }

function lumaDistance(left, right) {
  const count = Math.min(left?.length || 0, right?.length || 0);
  if (!count) return 0;
  let total = 0;
  for (let index = 0; index < count; index += 1) total += Math.abs(Number(left[index]) - Number(right[index]));
  return total / count;
}

// Canvas frames pass through the browser's RGB conversion and bilinear resize,
// so their scene scores are lower than FFmpeg's raw-YUV 0.25 values. On the
// reference source, 0.09 preserves the same cuts while one-second motion stays well below it.
function detectSceneCutsFromScores(samples, duration, threshold = 0.09, minSeparation = 2) {
  if (!Array.isArray(samples) || !samples.length) return [];
  const candidates = samples
    .filter((sample) => Number(sample.score) > threshold
      && Number(sample.timestamp) > 0.001
      && Number(sample.timestamp) < duration - 0.001)
    .sort((left, right) => Number(left.timestamp) - Number(right.timestamp));
  const detected = [];
  for (const candidate of candidates) {
    const previous = detected.at(-1);
    if (previous && Number(candidate.timestamp) - Number(previous.timestamp) < minSeparation) {
      if (Number(candidate.score) > Number(previous.score)) detected[detected.length - 1] = candidate;
    } else detected.push(candidate);
  }
  return detected.map((sample) => Number(Number(sample.timestamp).toFixed(3)));
}

function detectVisualCutsFromSignatures(signatures, duration, minimumThreshold = 0.18, medianFactor = 5) {
  if (!Array.isArray(signatures) || signatures.length < 2) return [];
  const distances = new Array(signatures.length).fill(0);
  for (let index = 1; index < signatures.length; index += 1) distances[index] = lumaDistance(signatures[index - 1].luma, signatures[index].luma);
  const baseline = distances.slice(1).sort((left, right) => left - right);
  const middle = Math.floor(baseline.length / 2);
  const baselineMedian = baseline[middle];
  const adaptive = Math.max(minimumThreshold, baselineMedian * medianFactor);
  const detected = [];
  for (let index = 1; index < distances.length; index += 1) {
    const previous = index === 1 ? 0 : distances[index - 1];
    const next = index + 1 < distances.length ? distances[index + 1] : 0;
    if (distances[index] >= adaptive && distances[index] + 1e-9 >= previous && distances[index] + 1e-9 >= next) {
      const time = Number(signatures[index].timestamp);
      if (Number.isFinite(time) && time > 0.001 && time < duration - 0.001) detected.push(Number(time.toFixed(3)));
    }
  }
  return [...new Set(detected)].sort((left, right) => left - right);
}

function detectTimestampGapCuts(signatures, factor = 2.5) {
  if (!Array.isArray(signatures) || signatures.length < 3) return [];
  const gaps = [];
  for (let index = 1; index < signatures.length; index += 1) {
    const gap = Number(signatures[index].timestamp) - Number(signatures[index - 1].timestamp);
    if (Number.isFinite(gap) && gap > 0) gaps.push(gap);
  }
  if (!gaps.length) return [];
  const sorted = [...gaps].sort((left, right) => left - right);
  const baseline = sorted[Math.floor(sorted.length / 2)];
  if (!baseline) return [];
  return signatures.slice(1).filter((_signature, index) => gaps[index] > baseline * factor).map((signature) => Number(signature.timestamp.toFixed(3)));
}

function updateClipDetectionUi() {
  const button = $('[data-action="detect-clips"]');
  if (button) {
    button.disabled = !state.videoUrl && !state.clipDetectionRunning;
    button.setAttribute('aria-busy', String(state.clipDetectionRunning));
    button.setAttribute('aria-label', state.clipDetectionRunning ? 'Cancel clip detection' : 'Detect video clips');
    button.dataset.tooltip = state.clipDetectionRunning ? 'Cancel clip detection' : 'Detect video clips';
  }
  const count = $('#clip-count');
  if (count && state.clipDetectionRunning) count.textContent = `${Math.round(state.clipDetectionProgress)}%`;
  if (state.clipDetectionRunning) {
    const saveState = $('#save-state');
    if (saveState) saveState.textContent = `Detecting clips ${Math.round(state.clipDetectionProgress)}%`;
  }
}

function cancelClipDetection() {
  state.clipDetectionAbortController?.abort();
}

function clipDetectionWorkerCount(duration, hardwareConcurrency = globalThis.navigator?.hardwareConcurrency || 4) {
  if (Number(duration) <= 600) return 1;
  return Math.min(6, Math.max(2, Math.floor(Math.max(2, Number(hardwareConcurrency) || 4) / 2)));
}

async function detectVideoClips() {
  if (state.clipDetectionRunning) return cancelClipDetection();
  if (!state.videoUrl) return showToast('Load an MP4 before detecting clips', 'error');
  const detectionStartedAt = performance.now();
  let detectionCompleted = false;
  delete document.body.dataset.clipDetectionMs;
  delete document.body.dataset.clipDetectionResult;
  delete document.body.dataset.clipDetectionCount;
  stopVideoFramePrefetch();
  clearVideoPrefetchDecoders();
  pauseClipThumbnailWork();
  const controller = new AbortController();
  state.clipDetectionAbortController = controller;
  state.clipDetectionRunning = true;
  state.clipDetectionProgress = 0;
  updateClipDetectionUi();
  showToast('Scanning the video for scene changes');
  const scanWorkers = [];
  const createScanWorker = () => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    video.src = state.videoUrl;
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 48;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    const worker = { video, canvas, context };
    scanWorkers.push(worker);
    video.load();
    return worker;
  };
  try {
    const primaryWorker = createScanWorker();
    await waitForVideoMetadata(primaryWorker.video);
    const duration = Number(primaryWorker.video.duration);
    if (!Number.isFinite(duration) || duration <= 0) throw new Error('Video duration is unavailable');
    const desiredWorkers = clipDetectionWorkerCount(duration);
    while (scanWorkers.length < desiredWorkers) createScanWorker();
    await Promise.all(scanWorkers.slice(1).map((worker) => waitForVideoMetadata(worker.video)));
    // Long sources use a coarse scan followed by one-second refinement around
    // candidate cuts. This retains the desktop app's boundary precision without
    // forcing thousands of random seeks through an hour-long browser video.
    const coarseInterval = duration > 1800 ? 10 : duration > 600 ? 5 : 1;
    const coarseTimes = [];
    for (let time = 0; time < duration; time += coarseInterval) coarseTimes.push(Math.min(time, duration - 0.001));
    if (!coarseTimes.length) coarseTimes.push(Math.max(0, duration - 0.001));
    const scanTimes = async (times, progressStart, progressEnd, breakIndices = null) => {
      if (!times.length) return { signatures: [], sceneSamples: [] };
      const results = new Array(times.length);
      const activeWorkers = scanWorkers.slice(0, Math.min(scanWorkers.length, times.length));
      const chunkSize = Math.ceil(times.length / activeWorkers.length);
      let completed = 0;
      let failed = false;
      let lastProgressUpdate = 0;
      await Promise.all(activeWorkers.map(async (worker, workerIndex) => {
        const start = workerIndex * chunkSize;
        const end = Math.min(times.length, start + chunkSize);
        for (let index = start; index < end; index += 1) {
          if (controller.signal.aborted || failed) return;
          const presented = await seekPresentedVideoFrame(worker.video, times[index], { signal: controller.signal });
          if (!presented) {
            failed = true;
            return;
          }
          worker.context?.drawImage(worker.video, 0, 0, worker.canvas.width, worker.canvas.height);
          results[index] = { timestamp: times[index], analysis: analyzeFrameLuma(worker.canvas) };
          completed += 1;
          const now = performance.now();
          if (completed === times.length || now - lastProgressUpdate >= 80) {
            lastProgressUpdate = now;
            state.clipDetectionProgress = progressStart + completed / times.length * (progressEnd - progressStart);
            updateClipDetectionUi();
          }
        }
      }));
      if (controller.signal.aborted || failed || results.some((result) => !result)) return null;
      const signatures = [];
      const sceneSamples = [];
      let previousPlane = null;
      let previousMafd = 0;
      for (let resultIndex = 0; resultIndex < results.length; resultIndex += 1) {
        if (breakIndices?.has(resultIndex)) {
          previousPlane = null;
          previousMafd = 0;
        }
        const result = results[resultIndex];
        const { timestamp, analysis } = result;
        signatures.push({ timestamp, luma: analysis.signature });
        const mafd = previousPlane ? lumaDistance(previousPlane, analysis.plane) : 0;
        const sceneScore = previousPlane ? Math.min(mafd, Math.abs(mafd - previousMafd)) : 0;
        sceneSamples.push({ timestamp, score: sceneScore });
        previousPlane = analysis.plane;
        previousMafd = mafd;
      }
      return { signatures, sceneSamples };
    };

    const coarse = await scanTimes(coarseTimes, 0, coarseInterval === 1 ? 100 : 70);
    if (!coarse) return;
    const coarseSceneCuts = detectSceneCutsFromScores(coarse.sceneSamples, duration, coarseInterval === 1 ? 0.09 : 0.075);
    const coarseVisualCuts = detectVisualCutsFromSignatures(coarse.signatures, duration);
    const coarseCandidateCuts = coarseInterval === 1 ? [] : detectVisualCutsFromSignatures(coarse.signatures, duration, 0.06, 4);
    let cuts;
    if (coarseInterval === 1) {
      cuts = coarseSceneCuts.length ? coarseSceneCuts : coarseVisualCuts;
    } else {
      const candidates = [...new Set([...coarseSceneCuts, ...coarseVisualCuts, ...coarseCandidateCuts])].sort((left, right) => left - right);
      const ranges = [];
      candidates.forEach((candidate) => {
        const start = Math.max(0, candidate - coarseInterval);
        const end = Math.min(duration - 0.001, candidate + 1);
        const previous = ranges.at(-1);
        if (previous && start <= previous.end + 1) previous.end = Math.max(previous.end, end);
        else ranges.push({ start, end });
      });
      const plans = ranges.map((range) => {
        const times = [];
        for (let time = range.start; time <= range.end + 0.001; time += 1) times.push(Number(time.toFixed(3)));
        return times;
      });
      const refinementTimes = [];
      const refinementOffsets = [];
      plans.forEach((times) => {
        const start = refinementTimes.length;
        refinementTimes.push(...times);
        refinementOffsets.push({ start, end: refinementTimes.length });
      });
      const refinementBreaks = new Set(refinementOffsets.slice(1).map(({ start }) => start));
      const refined = await scanTimes(refinementTimes, 70, 92, refinementBreaks);
      if (!refined) return;
      const refinedCuts = [];
      for (const { start, end } of refinementOffsets) {
        const sceneSamples = refined.sceneSamples.slice(start, end);
        const signatures = refined.signatures.slice(start, end);
        const sceneCuts = detectSceneCutsFromScores(sceneSamples, duration);
        const visualCuts = sceneCuts.length ? sceneCuts : detectVisualCutsFromSignatures(signatures, duration);
        refinedCuts.push(...visualCuts);
      }
      const unverifiedCuts = [...new Set(refinedCuts)].filter((cut) => cut >= 2).sort((left, right) => left - right);
      const verificationTimes = unverifiedCuts.flatMap((cut) => [cut - 12, cut - 6, cut].map((time) => Math.max(0, Number(time.toFixed(3)))));
      const verificationBreaks = new Set(unverifiedCuts.slice(1).map((_, index) => (index + 1) * 3));
      const verification = await scanTimes(verificationTimes, 92, 100, verificationBreaks);
      if (!verification) return;
      const verificationScores = unverifiedCuts.map((cut, index) => ({
        timestamp: cut,
        score: Number(verification.sceneSamples[index * 3 + 2]?.score) || 0,
      }));
      cuts = detectSceneCutsFromScores(verificationScores, duration, 0.095);
      state.clipDetectionProgress = 100;
      updateClipDetectionUi();
    }
    applyDocumentClips(createClipRangesFromCuts(cuts, duration, 'detected'), {
      source: 'detected',
      message: cuts.length ? `${cuts.length + 1} clips detected` : 'No scene changes found; using the full video as one clip',
    });
    detectionCompleted = true;
  } catch (error) {
    if (!controller.signal.aborted) {
      console.warn('Clip detection failed', error);
      showToast('Clip detection could not read this video', 'error');
    }
  } finally {
    scanWorkers.forEach(({ video }) => {
      video.pause();
      video.removeAttribute('src');
      video.load();
    });
    if (state.clipDetectionAbortController === controller) {
      state.clipDetectionAbortController = null;
      state.clipDetectionRunning = false;
      state.clipDetectionProgress = 0;
      updateClipDetectionUi();
      renderClipSidebar();
      renderImportStatus();
      document.body.dataset.clipDetectionMs = String(Math.max(0, Math.round(performance.now() - detectionStartedAt)));
      document.body.dataset.clipDetectionResult = controller.signal.aborted ? 'cancelled' : detectionCompleted ? 'complete' : 'failed';
      document.body.dataset.clipDetectionCount = String(state.doc?.clips?.length || 0);
      $('#save-state').textContent = importReadinessText();
      if (state.videoUrl) scheduleClipThumbnails(900);
    }
  }
}

function renderInspector() {
  const frame = currentFrame(); if (!frame) return;
  $('#sample-index').textContent = frame.sample_index;
  $('#source-frame').textContent = frame.source_frame_index;
  $('#timecode').textContent = formatTime(frameClipTime(frame), true);
  $('#detection-count').textContent = frame.detections.length;
  $('#detection-summary').textContent = `${frame.detections.length} ${frame.detections.length === 1 ? 'BOX' : 'BOXES'}`;
  const badge = $('#review-badge'); badge.textContent = statusText(frame.review_status); badge.className = `review-badge ${frame.review_status === 'accepted' ? 'accepted' : frame.review_status === 'edited' ? 'edited' : 'pending'}`;
  $('#inspector-dot').style.background = frame.review_status === 'accepted' ? 'var(--mint)' : frame.review_status === 'edited' ? 'var(--purple)' : 'var(--orange)';
  $('#inspector-note').textContent = frame.review_flags?.includes('manual_flag') ? 'Flagged for a second look.' : 'Changes are backed up in this browser.';
  $('#selection-copy').textContent = state.selectedDetection == null ? 'No detection selected' : `${frame.detections[state.selectedDetection]?.label || 'Detection'} selected`;
  const list = $('#detection-list');
  const detectionSignature = frame.detections.length
    ? `${state.frameIndex}:${frame.detections.map((detection) => `${detection.label}:${detection.confidence}:${detection.bbox_xyxy_pixels.join(',')}`).join(';')}:${state.selectedDetection}`
    : `empty:${state.selectedDetection}`;
  if (list.dataset.signature !== detectionSignature) {
    list.dataset.signature = detectionSignature;
    list.replaceChildren();
    if (!frame.detections.length) {
      const empty = document.createElement('div');
      empty.className = 'box-list-empty';
      empty.innerHTML = `<span class="icon">${icon('scan')}</span><strong>No boxes on this frame</strong><span>Choose Add box, then drag on the image.</span>`;
      list.append(empty);
    } else frame.detections.forEach((detection, index) => {
      const row = document.createElement('button'); row.type = 'button'; row.className = `detection-row${state.selectedDetection === index ? ' selected' : ''}`; row.setAttribute('aria-pressed', String(state.selectedDetection === index)); row.addEventListener('click', () => selectDetection(index));
      const swatch = document.createElement('span'); swatch.className = 'detection-swatch';
      const [x1, y1, x2, y2] = detection.bbox_xyxy_pixels;
      const copy = document.createElement('span'); copy.className = 'detection-row-copy'; const title = document.createElement('span'); title.className = 'detection-row-title'; title.textContent = `${detection.label} ${index + 1}`; const meta = document.createElement('span'); meta.className = 'detection-row-meta'; meta.textContent = `x ${Math.round(x1)}  y ${Math.round(y1)}  /  ${Math.round(x2 - x1)} x ${Math.round(y2 - y1)} px`; copy.append(title, meta); const confidence = document.createElement('span'); confidence.className = 'detection-confidence'; confidence.textContent = `${Math.round((Number(detection.confidence) || 0) * 100)}%`; row.append(swatch, copy, confidence); list.append(row);
    });
  }
  $('#delete-box-button').disabled = state.selectedDetection == null || !frame.detections[state.selectedDetection];
  const flagButton = $('[data-action="toggle-flag"]'); const flagged = frame.review_flags?.includes('manual_flag'); flagButton.classList.toggle('is-on', flagged); flagButton.setAttribute('aria-pressed', String(flagged));
  renderBatchErasePanel();
}

function renderProgress() {
  const frames = state.doc?.frames || []; const reviewed = frames.filter((frame) => frame.review_status !== 'unreviewed').length; const ratio = frames.length ? reviewed / frames.length : 0;
  $('#reviewed-count').textContent = reviewed.toLocaleString(); $('#total-count').textContent = frames.length.toLocaleString(); $('#progress-ring-fill').style.width = `${ratio * 100}%`; $('.progress-ring').style.background = `conic-gradient(var(--mint) ${ratio * 360}deg, #dbe9e1 0deg)`;
}

function renderTimeline() {
  const frames = state.doc?.frames || []; if (!frames.length) return;
  const slider = $('#timeline-slider'); slider.max = Math.max(1, frames.length - 1); slider.value = state.frameIndex;
  const track = $('#timeline-track'); track.replaceChildren();
  const bucketCount = Math.min(720, Math.max(1, frames.length)); const buckets = Array.from({ length: bucketCount }, () => ({ detected: false, reviewed: false, flagged: false }));
  frames.forEach((frame, index) => { const bucket = buckets[Math.min(bucketCount - 1, Math.floor(index / frames.length * bucketCount))]; if (frame.detections.length) bucket.detected = true; if (frame.review_status !== 'unreviewed') bucket.reviewed = true; if (frame.review_flags?.includes('manual_flag')) bucket.flagged = true; });
  buckets.forEach((bucket, index) => { if (!bucket.detected && !bucket.reviewed && !bucket.flagged) return; const segment = document.createElement('span'); segment.dataset.timelineBucket = String(index); segment.className = `timeline-segment${bucket.flagged ? ' flagged' : bucket.reviewed ? ' reviewed' : ''}`; segment.style.left = `${index / bucketCount * 100}%`; segment.style.width = `${100 / bucketCount + .15}%`; track.append(segment); });
  const thumb = $('#timeline-thumb'); thumb.style.left = `${frames.length > 1 ? state.frameIndex / (frames.length - 1) * 100 : 0}%`;
  const ruler = $('#timeline-ruler'); ruler.replaceChildren(); const startTime = frameTimeline(frames[0]); const end = frameTimeline(frames[frames.length - 1]); for (let i = 0; i < 6; i += 1) { const tick = document.createElement('span'); tick.className = 'ruler-tick'; tick.style.left = `${i / 5 * 100}%`; tick.textContent = formatTime(startTime + (end - startTime) * i / 5).slice(0, 8); ruler.append(tick); }
  $('#timeline-start').textContent = formatTime(startTime).slice(0, 8); $('#timeline-position').textContent = `Frame ${frames[state.frameIndex].sample_index}`; $('#timeline-end').textContent = formatTime(end).slice(0, 8);
  const strip = $('#filmstrip'); strip.replaceChildren(); const start = Math.max(0, Math.min(frames.length - 1, state.frameIndex - 4)); for (let offset = 0; offset < 9; offset += 1) { const index = Math.min(frames.length - 1, start + offset); const item = document.createElement('button'); item.type = 'button'; item.dataset.frameIndex = String(index); item.className = `filmstrip-item${index === state.frameIndex ? ' active' : ''}`; item.addEventListener('click', () => setFrame(index)); const image = document.createElement('img'); image.src = './public/demo-frame.jpg'; image.alt = ''; const label = document.createElement('span'); label.textContent = String(frames[index].sample_index); item.append(image, label); strip.append(item); }
  updateTimelineCursor();
}

function confirmedFrames() { return (state.doc?.frames || []).filter((frame) => (frame.review_status === 'accepted' || frame.review_status === 'edited') && frame.detections.length); }

function buildWindows() {
  const frames = confirmedFrames(); const map = new Map(); frames.forEach((frame) => { const clipIndex = frame.clip_index ?? 0; const clip = state.doc?.clips?.[clipIndex]; const localStart = Math.floor(frameClipTime(frame) / 10) * 10; const start = (clip?.start_sec || 0) + localStart; const key = `${clipIndex}:${localStart}`; if (!map.has(key)) map.set(key, { id: `window-${clipIndex}-${localStart}`, clipIndex, localStart, start, end: Math.min(clip?.end_sec || start + 10, start + 10), frames: [], boxes: 0 }); const window = map.get(key); window.frames.push(frame); window.boxes += frame.detections.length; });
  state.windows = [...map.values()].sort((a, b) => a.start - b.start); if (state.selectedWindow && !state.windows.some((window) => window.id === state.selectedWindow)) state.selectedWindow = null; if (!state.selectedWindow && state.windows.length) state.selectedWindow = state.windows[0].id;
}

function heatColor(value) {
  if (value <= 0) return '#e6efeb';
  const hue = 255 - Math.min(220, value * 215); const saturation = 38 + value * 42; const light = 92 - value * 39; return `hsl(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(light)}%)`;
}

function heatmapFramesForClip(clip) {
  const frames = state.doc?.frames || [];
  if (!clip) return frames;
  const clipIndex = Number(clip.index);
  const indexed = Number.isInteger(clipIndex)
    ? frames.filter((frame) => frame.clip_index != null && Number(frame.clip_index) === clipIndex)
    : [];
  if (indexed.length) return indexed;
  const start = Number(clip.start_sec) || 0;
  const end = Math.max(start, Number(clip.end_sec) || start);
  const ranged = frames.filter((frame) => {
    const time = frameTimeline(frame);
    return time >= start - 0.0001 && (time <= end + 0.0001 || end <= start);
  });
  return ranged.length || frames.length === 0 ? ranged : (state.doc.clips?.length === 1 ? frames : ranged);
}

function heatmapEntriesForFrames(frames) {
  const entries = [];
  (frames || []).forEach((frame, frameIndex) => {
    (frame.detections || []).forEach((detection) => entries.push({ frame, frameIndex, detection }));
  });
  const rats = entries.filter(({ detection }) => /(?:^|\b)(rat|rodent|mouse|mice)(?:\b|$)/i.test(String(detection.label || '')));
  return rats.length ? rats : entries;
}

function heatmapAggregateForClip(clip) {
  const frames = heatmapFramesForClip(clip);
  const entries = heatmapEntriesForFrames(frames);
  const clipKey = clip ? `${clip.id || clip.index}:${Number(clip.start_sec) || 0}:${Number(clip.end_sec) || 0}` : 'all';
  const cacheKey = `${clipKey}:${frames.length}:${entries.length}:${videoWidth()}x${videoHeight()}`;
  const cached = state.heatmapCache.get(cacheKey);
  if (cached) return cached;

  const columns = 64;
  const rows = 48;
  const values = new Float32Array(columns * rows);
  const framesWithBoxes = new Set();
  let peak = 0;
  entries.forEach(({ frame, frameIndex, detection }) => {
    const box = Array.isArray(detection.bbox_xyxy_pixels) ? detection.bbox_xyxy_pixels.map(Number) : null;
    if (!box || box.length < 4) return;
    const x1 = Math.max(0, Math.min(videoWidth(), Math.min(box[0], box[2])));
    const y1 = Math.max(0, Math.min(videoHeight(), Math.min(box[1], box[3])));
    const x2 = Math.max(x1, Math.min(videoWidth(), Math.max(box[0], box[2])));
    const y2 = Math.max(y1, Math.min(videoHeight(), Math.max(box[1], box[3])));
    if (x2 <= x1 || y2 <= y1) return;
    framesWithBoxes.add(frame.sample_index ?? frameIndex);
    const centerX = ((x1 + x2) * 0.5 / videoWidth()) * columns;
    const centerY = ((y1 + y2) * 0.5 / videoHeight()) * rows;
    const radiusX = Math.max(1.2, ((x2 - x1) / videoWidth()) * columns * 0.58);
    const radiusY = Math.max(1.2, ((y2 - y1) / videoHeight()) * rows * 0.58);
    const minCol = Math.max(0, Math.floor(centerX - radiusX * 2.4));
    const maxCol = Math.min(columns - 1, Math.ceil(centerX + radiusX * 2.4));
    const minRow = Math.max(0, Math.floor(centerY - radiusY * 2.4));
    const maxRow = Math.min(rows - 1, Math.ceil(centerY + radiusY * 2.4));
    const confidence = Math.max(0.2, Math.min(1, Number(detection.confidence) || 1));
    const weight = 0.35 + confidence * 0.65;
    for (let row = minRow; row <= maxRow; row += 1) {
      for (let col = minCol; col <= maxCol; col += 1) {
        const dx = (col + 0.5 - centerX) / radiusX;
        const dy = (row + 0.5 - centerY) / radiusY;
        const distance = dx * dx + dy * dy;
        if (distance > 5.8) continue;
        const contribution = weight * Math.exp(-distance * 0.72);
        const index = row * columns + col;
        values[index] += contribution;
        if (values[index] > peak) peak = values[index];
      }
    }
  });
  const aggregate = {
    columns,
    rows,
    values,
    peak,
    boxCount: entries.length,
    frameCount: frames.length,
    framesWithBoxes: framesWithBoxes.size,
    clip,
  };
  state.heatmapCache.set(cacheKey, aggregate);
  return aggregate;
}

function heatmapColor(value) {
  const stops = [
    [0, [22, 68, 145]],
    [0.22, [0, 177, 211]],
    [0.45, [45, 187, 81]],
    [0.68, [255, 220, 42]],
    [0.84, [255, 128, 20]],
    [1, [211, 31, 43]],
  ];
  const safe = Math.max(0, Math.min(1, Number(value) || 0));
  for (let index = 1; index < stops.length; index += 1) {
    if (safe > stops[index][0]) continue;
    const [leftStop, leftColor] = stops[index - 1];
    const [rightStop, rightColor] = stops[index];
    const ratio = (safe - leftStop) / Math.max(0.0001, rightStop - leftStop);
    return leftColor.map((channel, colorIndex) => Math.round(channel + (rightColor[colorIndex] - channel) * ratio));
  }
  return stops.at(-1)[1];
}

function heatmapSourceSurface() {
  const video = $('#frame-video');
  if (state.videoFile && video?.readyState >= 2 && video.videoWidth) return video;
  const canvas = $('#frame-canvas');
  if (canvas && !canvas.hidden && canvas.width && canvas.height) return canvas;
  const image = $('#frame-image');
  if (image?.complete && image.naturalWidth) return image;
  return null;
}

function heatmapCanvasDimensions(source) {
  const width = Math.max(1, Number(source?.videoWidth || source?.naturalWidth || source?.width || videoWidth()));
  const height = Math.max(1, Number(source?.videoHeight || source?.naturalHeight || source?.height || videoHeight()));
  const scale = Math.min(1, 960 / width, 720 / height);
  return { width: Math.max(1, Math.round(width * scale)), height: Math.max(1, Math.round(height * scale)) };
}

function drawHeatmapBackground() {
  const base = $('#heatmap-base-canvas');
  const overlay = $('#heatmap-overlay-canvas');
  if (!base || !overlay) return false;
  const source = heatmapSourceSurface();
  const dimensions = heatmapCanvasDimensions(source);
  if (base.width !== dimensions.width) base.width = dimensions.width;
  if (base.height !== dimensions.height) base.height = dimensions.height;
  if (overlay.width !== dimensions.width) overlay.width = dimensions.width;
  if (overlay.height !== dimensions.height) overlay.height = dimensions.height;
  const context = base.getContext('2d', { alpha: false });
  if (!context) return false;
  context.fillStyle = '#111918';
  context.fillRect(0, 0, base.width, base.height);
  if (source) {
    context.drawImage(source, 0, 0, base.width, base.height);
    $('#heatmap-source-status').textContent = state.videoFile ? 'Live source frame' : 'Demo source frame';
  } else {
    $('#heatmap-source-status').textContent = 'Source frame unavailable';
  }
  return Boolean(source);
}

function drawHeatmapOverlay(aggregate) {
  const overlay = $('#heatmap-overlay-canvas');
  if (!overlay) return;
  const context = overlay.getContext('2d');
  if (!context) return;
  context.clearRect(0, 0, overlay.width, overlay.height);
  if (!aggregate?.peak || !aggregate.values.length) return;
  const low = document.createElement('canvas');
  low.width = aggregate.columns;
  low.height = aggregate.rows;
  const lowContext = low.getContext('2d');
  if (!lowContext) return;
  const pixels = lowContext.createImageData(low.width, low.height);
  for (let index = 0; index < aggregate.values.length; index += 1) {
    const normalized = aggregate.values[index] / aggregate.peak;
    if (normalized < 0.012) continue;
    const [red, green, blue] = heatmapColor(Math.pow(normalized, 0.78));
    const offset = index * 4;
    pixels.data[offset] = red;
    pixels.data[offset + 1] = green;
    pixels.data[offset + 2] = blue;
    pixels.data[offset + 3] = Math.min(238, Math.round(255 * Math.pow(normalized, 0.7)));
  }
  lowContext.putImageData(pixels, 0, 0);
  context.save();
  context.globalAlpha = 0.82;
  context.imageSmoothingEnabled = true;
  context.filter = 'blur(1.2px)';
  context.drawImage(low, 0, 0, overlay.width, overlay.height);
  context.restore();
}

function updateHeatmapTimebars(timeOverride = null) {
  const frame = currentFrame();
  const video = $('#frame-video');
  const duration = Math.max(0, Number(video?.duration) || durationSec());
  const timeline = Math.max(0, Math.min(duration || durationSec(), Number(timeOverride ?? frameTimeline(frame)) || 0));
  const globalSlider = $('#heatmap-video-time-slider');
  if (globalSlider) {
    globalSlider.disabled = !duration;
    globalSlider.min = '0';
    globalSlider.max = String(Math.max(0.001, duration));
    globalSlider.step = String(reviewSampleStep());
    globalSlider.value = String(timeline);
    globalSlider.style.setProperty('--timebar-progress', `${duration ? timeline / duration * 100 : 0}%`);
    globalSlider.setAttribute('aria-valuetext', `${formatClipClock(timeline)} of ${formatClipClock(duration)}`);
  }
  const globalCurrent = $('#heatmap-video-time-current');
  const globalEnd = $('#heatmap-video-time-end');
  if (globalCurrent) globalCurrent.textContent = formatClipClock(timeline);
  if (globalEnd) globalEnd.textContent = formatClipClock(duration);
  const segments = $('#heatmap-video-time-segments');
  if (segments) {
    const signature = `${duration}:${(state.doc?.clips || []).map((clip) => `${clip.start_sec}:${clip.end_sec}`).join('|')}`;
    if (segments.dataset.signature !== signature) {
      segments.dataset.signature = signature;
      segments.replaceChildren();
      (state.doc?.clips || []).forEach((clip, index) => {
        const segment = document.createElement('span');
        segment.className = 'video-time-segment';
        segment.dataset.clipIndex = String(index);
        segment.style.left = `${duration ? Math.max(0, Number(clip.start_sec) || 0) / duration * 100 : 0}%`;
        segment.style.width = `${duration ? Math.max(0, Number(clip.end_sec) - Number(clip.start_sec)) / duration * 100 : 0}%`;
        segments.append(segment);
      });
    }
    $$('#heatmap-video-time-segments .video-time-segment').forEach((segment) => segment.classList.toggle('active', Number(segment.dataset.clipIndex) === Number(frame?.clip_index ?? 0)));
  }
  const clip = activeClip();
  const clipSlider = $('#heatmap-clip-time-slider');
  const clipPosition = clip ? clipTimebarPosition(clip, timeline) : { current: 0, duration: 0 };
  if (clipSlider) {
    clipSlider.disabled = !clip || clipPosition.duration <= 0;
    clipSlider.min = '0';
    clipSlider.max = String(Math.max(0.001, clipPosition.duration));
    clipSlider.step = String(reviewSampleStep());
    clipSlider.value = String(clipPosition.current);
    clipSlider.style.setProperty('--timebar-progress', `${clipPosition.duration ? clipPosition.current / clipPosition.duration * 100 : 0}%`);
  }
  const clipIndex = clip ? Math.max(0, Number(clip.index) || 0) : 0;
  const clipLabel = $('#heatmap-clip-time-label');
  const clipCurrent = $('#heatmap-clip-time-current');
  const clipEnd = $('#heatmap-clip-time-end');
  if (clipLabel) clipLabel.textContent = clip ? `Clip ${clipIndex + 1}` : 'Clip';
  if (clipCurrent) clipCurrent.textContent = formatTime(clipPosition.current);
  if (clipEnd) clipEnd.textContent = formatTime(clipPosition.duration);
  $$('#heatmap-clip-list [data-clip-progress]').forEach((track) => {
    const item = state.doc?.clips?.[Number(track.dataset.clipProgress)];
    const fill = track.firstElementChild;
    if (!item || !fill) return;
    const span = Math.max(0.001, Number(item.end_sec) - Number(item.start_sec));
    fill.style.width = `${Math.max(0, Math.min(1, (timeline - Number(item.start_sec)) / span)) * 100}%`;
  });
}

function renderHeatmapFrameOnly() {
  if (!state.doc || state.view !== 'heatmap') return;
  const clip = activeClip();
  const aggregate = heatmapAggregateForClip(clip);
  updateHeatmapTimebars();
  drawHeatmapBackground();
  drawHeatmapOverlay(aggregate);
  const frame = currentFrame();
  const frameStatus = $('#heatmap-frame-status');
  if (frameStatus) frameStatus.textContent = frame ? `Frame ${frame.sample_index} / ${formatClipClock(frameTimeline(frame))}` : 'No frame';
}

function renderHeatmap() {
  if (!state.doc) return;
  renderHeatmapClipSidebar();
  const clip = activeClip();
  const aggregate = heatmapAggregateForClip(clip);
  const clipIndex = clip ? Number(clip.index) || 0 : 0;
  const title = $('#heatmap-title');
  const caption = $('#heatmap-frame-caption');
  const summary = $('#heatmap-summary');
  const summaryClip = $('#heatmap-summary-clip');
  const boxCount = $('#heatmap-box-count');
  const frameCount = $('#heatmap-frame-count');
  const coverage = $('#heatmap-coverage');
  const detail = $('#heatmap-summary-detail');
  const empty = $('#heatmap-empty');
  if (title) title.textContent = clip ? `Clip ${clipIndex + 1} / ${formatClipClock(clip.start_sec)} - ${formatClipClock(clip.end_sec)}` : 'No clip selected';
  if (caption) caption.textContent = clip ? `All ${aggregate.boxCount.toLocaleString()} rat detections across this clip are combined into one field.` : 'The overlay combines detections from the full active clip.';
  if (summary) summary.textContent = `${aggregate.boxCount.toLocaleString()} ${aggregate.boxCount === 1 ? 'box' : 'boxes'}`;
  if (summaryClip) summaryClip.textContent = clip ? `Clip ${clipIndex + 1}` : 'None';
  if (boxCount) boxCount.textContent = aggregate.boxCount.toLocaleString();
  if (frameCount) frameCount.textContent = aggregate.framesWithBoxes.toLocaleString();
  if (coverage) coverage.textContent = `${aggregate.frameCount ? Math.round(aggregate.framesWithBoxes / aggregate.frameCount * 100) : 0}%`;
  if (detail) detail.textContent = clip ? `The grayscale frame is the current source position. The colored field is aggregated from every detection in Clip ${clipIndex + 1}.` : 'Select a clip to build the aggregate heatmap.';
  if (empty) empty.hidden = Boolean(aggregate.boxCount);
  renderHeatmapFrameOnly();
}

function flattenLabels() {
  const output = []; const query = state.tableQuery.toLowerCase();
  (state.doc?.frames || []).forEach((frame, frameIndex) => frame.detections.forEach((detection, detectionIndex) => { const key = `${frameIndex}:${detectionIndex}`; const haystack = `${frame.sample_index} ${detection.label} ${frame.review_status}`.toLowerCase(); if (state.tableFilter !== 'all' && frame.review_status !== state.tableFilter) return; if (query && !haystack.includes(query)) return; output.push({ key, frame, frameIndex, detection, detectionIndex }); }));
  return output;
}

function renderTable() {
  const rows = flattenLabels();
  const body = $('#label-table-body');
  const visible = rows.slice(0, 1000);
  body.replaceChildren();
  visible.forEach(({ key, frame, detection, frameIndex, detectionIndex }) => {
    const tr = document.createElement('tr');
    if (state.tableSelection.has(key)) tr.classList.add('is-selected');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = state.tableSelection.has(key);
    checkbox.setAttribute('aria-label', `Select ${detection.label} on frame ${frame.sample_index}`);
    checkbox.addEventListener('change', () => {
      checkbox.checked ? state.tableSelection.add(key) : state.tableSelection.delete(key);
      tr.classList.toggle('is-selected', checkbox.checked);
      $('#delete-selected-button').disabled = state.tableSelection.size === 0;
      $('#table-select-all').checked = visible.length > 0 && visible.every((row) => state.tableSelection.has(row.key));
    });
    const checkCell = document.createElement('td');
    checkCell.className = 'check-col';
    checkCell.append(checkbox);
    const frameCell = document.createElement('td');
    frameCell.className = 'table-mono';
    frameCell.textContent = String(frame.sample_index);
    const timeCell = document.createElement('td');
    timeCell.className = 'table-mono';
    timeCell.textContent = `C${(frame.clip_index ?? 0) + 1} ${formatTime(frameClipTime(frame), true)}`;
    const labelCell = document.createElement('td');
    labelCell.className = 'table-label';
    labelCell.textContent = detection.label;
    const confidenceCell = document.createElement('td');
    confidenceCell.className = 'confidence';
    confidenceCell.textContent = `${Math.round((Number(detection.confidence) || 0) * 100)}%`;
    const stateCell = document.createElement('td');
    const stateLabel = document.createElement('span');
    stateLabel.className = `table-state ${frame.review_status}`;
    stateLabel.textContent = statusText(frame.review_status);
    stateCell.append(stateLabel);
    const boxCell = document.createElement('td');
    boxCell.className = 'table-mono';
    boxCell.textContent = `${Math.round(detection.bbox_xyxy_pixels[0])}, ${Math.round(detection.bbox_xyxy_pixels[1])}`;
    tr.append(checkCell, frameCell, timeCell, labelCell, confidenceCell, stateCell, boxCell);
    tr.addEventListener('dblclick', () => { state.view = 'review'; state.frameIndex = frameIndex; state.selectedDetection = detectionIndex; renderAll(); scheduleRecoveryCursor(); });
    body.append(tr);
  });
  $('#table-summary').textContent = rows.length > visible.length ? `${visible.length.toLocaleString()} of ${rows.length.toLocaleString()} labels` : `${rows.length.toLocaleString()} ${rows.length === 1 ? 'label' : 'labels'}`;
  $('#delete-selected-button').disabled = state.tableSelection.size === 0;
  $('#table-select-all').checked = visible.length > 0 && visible.every((row) => state.tableSelection.has(row.key));
}

function deleteSelectedRows() {
  if (!state.tableSelection.size || !state.doc) return;
  const targets = [...state.tableSelection].map((key) => key.split(':').map(Number)).filter(([frameIndex, detectionIndex]) => state.doc.frames[frameIndex]?.detections[detectionIndex]);
  const frameIndexes = [...new Set(targets.map(([frameIndex]) => frameIndex))];
  const snapshots = frameIndexes.map((frameIndex) => [frameIndex, deepClone(state.doc.frames[frameIndex])]);
  targets.sort((a, b) => b[0] - a[0] || b[1] - a[1]).forEach(([frameIndex, detectionIndex]) => { state.doc.frames[frameIndex].detections.splice(detectionIndex, 1); state.doc.frames[frameIndex].review_status = 'edited'; state.doc.frames[frameIndex].reviewed_at_utc = new Date().toISOString(); });
  const after = Object.fromEntries(snapshots.map(([index]) => [index, deepClone(state.doc.frames[index])])); state.history.push({ indexes: snapshots.map(([index]) => index), before: Object.fromEntries(snapshots), after }); state.future = []; state.tableSelection.clear(); markDirty(); renderAll(); showToast(`${targets.length} labels removed`, 'success');
}

function reportDurationSec() {
  const frames = state.doc?.frames || [];
  const frameEnd = frames.length ? frameTimeline(frames[frames.length - 1]) : 0;
  const attachedDuration = state.videoFile ? Number($('#frame-video')?.duration || 0) : 0;
  if (Number.isFinite(attachedDuration) && attachedDuration > 0) return attachedDuration;
  if (state.sourceJsonName === 'demo-labels.json') return frameEnd;
  const declared = Number(state.doc?.video?.source_duration_sec || 0);
  return Number.isFinite(declared) && declared > 0 ? declared : frameEnd;
}

function parseClipTime(value) {
  const parts = String(value || '').trim().split(':').map(Number);
  if (!parts.length || parts.some((part) => !Number.isFinite(part) || part < 0)) return null;
  if (parts.length === 1) return parts[0];
  if (parts.length === 2 && parts[1] < 60) return parts[0] * 60 + parts[1];
  if (parts.length === 3 && parts[1] < 60 && parts[2] < 60) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return null;
}

function openClipDialog() {
  const input = $('#clip-cuts-input');
  if (!input) return;
  input.value = (state.doc?.clips || []).slice(1).map((clip) => formatClipClock(clip.start_sec)).join(', ');
  input.classList.remove('invalid');
  const duration = reportDurationSec();
  $('#clip-dialog-note').textContent = `Source duration ${formatClipClock(duration)}. Leave blank for one clip.`;
  $('#clip-dialog').hidden = false;
  window.setTimeout(() => input.focus(), 0);
}

function closeClipDialog() {
  $('#clip-dialog').hidden = true;
}

function persistClipSplices(clips) {
  state.doc.heatmap = { ...(state.doc.heatmap || {}), splices_sec: (clips || []).slice(1).map((clip) => Number(Number(clip.start_sec).toFixed(3))) };
}

function applyDocumentClips(clips, { source = 'manual', persist = true, dirty = true, message = '' } = {}) {
  if (!state.doc || !clips?.length) return false;
  state.doc.clips = clips.map((clip, index) => ({
    ...clip,
    id: `clip-${index + 1}`,
    index,
    name: `Clip ${index + 1}`,
    source,
  }));
  if (persist) persistClipSplices(state.doc.clips);
  assignFramesToClips(state.doc, state.doc.clips);
  resetBatchErase(activeClip());
  resetClipThumbnails();
  resetReportClips();
  buildWindows();
  if (dirty) markDirty();
  renderAll();
  if (state.videoUrl) scheduleClipThumbnails();
  if (message) showToast(message, 'success');
  return true;
}

function commitClipBoundary(clipIndex, edge, value, input) {
  const clips = state.doc?.clips || [];
  const duration = Math.max(0, reportDurationSec());
  const update = clipBoundaryUpdate(clips, duration, clipIndex, edge, value);
  input.classList.toggle('invalid', !update);
  input.toggleAttribute('aria-invalid', !update);
  if (!update) {
    showToast('Enter a time between the neighboring clip boundaries', 'error');
    return false;
  }
  return applyDocumentClips(createClipRangesFromCuts(update.cuts, duration, 'manual'), {
    source: 'manual',
    message: `Clip boundary set to ${formatClipClock(update.time)}`,
  });
}

function clipBoundaryUpdate(clips, duration, clipIndex, edge, value) {
  const mediaDuration = Math.max(0, Number(duration) || 0);
  if (!clips?.length || !mediaDuration || clipIndex < 0 || clipIndex >= clips.length) return null;
  const boundaryIndex = edge === 'start' ? clipIndex : clipIndex + 1;
  if (boundaryIndex <= 0 || boundaryIndex >= clips.length) return null;
  const parsed = parseClipTime(value);
  const previous = Number(clips[boundaryIndex - 1].start_sec);
  const next = boundaryIndex + 1 < clips.length ? Number(clips[boundaryIndex + 1].start_sec) : mediaDuration;
  const valid = parsed != null && parsed > previous + 0.04 && parsed < next - 0.04;
  if (!valid) return null;
  const cuts = clips.slice(1).map((clip) => Number(clip.start_sec));
  cuts[boundaryIndex - 1] = parsed;
  return { boundaryIndex, cuts, time: parsed };
}

function mergeAdjacentClipRanges(clips, selectedIndexes, duration) {
  const selected = [...new Set(selectedIndexes || [])].sort((left, right) => left - right);
  if (!clips?.length || selected.length < 2 || !clipSelectionIsAdjacent(selected)) return null;
  if (selected[0] < 0 || selected[selected.length - 1] >= clips.length) return null;
  const first = selected[0];
  const last = selected[selected.length - 1];
  const cuts = clips.slice(1)
    .filter((_clip, cutIndex) => {
      const rightClipIndex = cutIndex + 1;
      return rightClipIndex <= first || rightClipIndex > last;
    })
    .map((clip) => Number(clip.start_sec));
  return createClipRangesFromCuts(cuts, duration, 'manual');
}

function mergeSelectedClips() {
  const clips = state.doc?.clips || [];
  const selected = sortedClipSelection();
  const duration = Math.max(0, reportDurationSec());
  const merged = mergeAdjacentClipRanges(clips, selected, duration);
  if (!merged) {
    showToast('Select two or more adjacent clips', 'error');
    updateClipSelectionUi();
    return false;
  }
  return applyDocumentClips(merged, {
    source: 'manual',
    message: `${selected.length} adjacent clips merged`,
  });
}

function addDocumentClip() {
  const duration = Math.max(0, reportDurationSec());
  const existing = state.doc?.clips || [];
  if (!state.doc || !duration) return showToast('Load a playable video before adding a clip', 'error');
  const frameTime = Number.isFinite(state.videoDisplayedTime) ? state.videoDisplayedTime : frameTimeline(currentFrame());
  let split = Math.max(0.04, Math.min(duration - 0.04, frameTime));
  const containingIndex = existing.findIndex((clip, index) => split >= clip.start_sec && (split < clip.end_sec || index === existing.length - 1));
  const candidate = existing[containingIndex >= 0 ? containingIndex : 0];
  if (!candidate || candidate.end_sec - candidate.start_sec < 0.08 || split <= candidate.start_sec + 0.04 || split >= candidate.end_sec - 0.04) {
    const longest = existing.reduce((best, clip, index) => !best || clip.end_sec - clip.start_sec > best.clip.end_sec - best.clip.start_sec ? { clip, index } : best, null);
    if (!longest || longest.clip.end_sec - longest.clip.start_sec < 0.08) return showToast('There is not enough time left to add a clip', 'error');
    split = (Number(longest.clip.start_sec) + Number(longest.clip.end_sec)) / 2;
  }
  const cuts = existing.slice(1).map((clip) => Number(clip.start_sec));
  cuts.push(split);
  cuts.sort((a, b) => a - b);
  applyDocumentClips(createClipRangesFromCuts(cuts, duration, 'manual'), {
    source: 'manual',
    message: `Clip added at ${formatClipClock(split)}`,
  });
}

function applyDocumentClipCuts(value) {
  if (!state.doc) return false;
  const duration = Math.max(0, reportDurationSec());
  const tokens = String(value || '').split(',').map((token) => token.trim()).filter(Boolean);
  const parsed = tokens.map(parseClipTime);
  const valid = duration > 0 && parsed.every((time) => time != null && time > 0 && time < duration);
  const input = $('#clip-cuts-input');
  input?.classList.toggle('invalid', !valid);
  if (!valid) return false;

  const cuts = [...new Set(parsed)].sort((a, b) => a - b);
  applyDocumentClips(createClipRangesFromCuts(cuts, duration, 'manual'), { source: 'manual' });
  closeClipDialog();
  showToast(`${state.doc.clips.length} ${state.doc.clips.length === 1 ? 'clip' : 'clips'} set`, 'success');
  return true;
}

function resetReportClips() {
  const duration = reportDurationSec();
  const source = (state.doc?.clips || []).map((clip, index) => ({ ...clip, id: `clip-${index + 1}`, index, name: `Clip ${index + 1}` }));
  if (source.length === 1 && source[0].start_sec <= 0.001 && duration > source[0].end_sec) source[0].end_sec = duration;
  state.report.clips = source.length ? source : [{ id: 'clip-1', index: 0, name: 'Clip 1', start_sec: 0, end_sec: duration, source: 'report' }];
  state.report.selectedClipId = state.report.clips[0]?.id || null;
  state.report.selectedClipIds = state.report.clips.map((clip) => String(clip.id));
  state.report.batchPrint = false;
  state.report.clipCutsText = state.report.clips.slice(1).map((clip) => formatClock(clip.start_sec)).join(', ');
  state.report.captures = [];
  state.report.baseImages = {};
  const input = $('#report-clip-cuts');
  if (input) input.value = state.report.clipCutsText;
}

function applyReportClipCuts(value) {
  const duration = Math.max(0, reportDurationSec());
  const tokens = String(value || '').split(',').map((token) => token.trim()).filter(Boolean);
  const parsed = tokens.map(parseClipTime);
  const valid = parsed.every((time) => time != null && time > 0 && time < duration);
  const input = $('#report-clip-cuts');
  input?.classList.toggle('invalid', !valid);
  if (!valid) {
    $('#report-clip-summary').textContent = 'Check clip start times';
    return false;
  }
  const cuts = [...new Set(parsed)].sort((a, b) => a - b);
  const bounds = [0, ...cuts, duration];
  state.report.clips = bounds.slice(0, -1).map((start, index) => ({ id: `clip-${index + 1}`, index, name: `Clip ${index + 1}`, start_sec: start, end_sec: bounds[index + 1], source: 'manual' }));
  state.report.selectedClipId = state.report.clips.find((clip) => clip.id === state.report.selectedClipId)?.id || state.report.clips[0]?.id || null;
  const selectedIds = new Set((state.report.selectedClipIds || []).map(String));
  const preservedSelection = state.report.clips.filter((clip) => selectedIds.has(String(clip.id))).map((clip) => String(clip.id));
  state.report.selectedClipIds = preservedSelection.length ? preservedSelection : state.report.clips.map((clip) => String(clip.id));
  state.report.batchPrint = false;
  state.report.clipCutsText = String(value || '');
  state.report.captures = [];
  state.report.baseImages = {};
  markDirty();
  return true;
}

function reportClips() {
  return state.report.clips.length ? state.report.clips : [{ id: 'clip-1', index: 0, name: 'Clip 1', start_sec: 0, end_sec: reportDurationSec(), source: 'report' }];
}

function reportSelectedClip() {
  const clips = reportClips();
  const selected = clips.find((clip) => clip.id === state.report.selectedClipId) || clips[0] || null;
  if (selected && state.report.selectedClipId !== selected.id) state.report.selectedClipId = selected.id;
  return selected;
}

function reportBatchSelectedClips() {
  const selectedIds = new Set((state.report.selectedClipIds || []).map(String));
  return reportClips().filter((clip) => selectedIds.has(String(clip.id)));
}

function reportPreviewClips() {
  const active = reportSelectedClip();
  if (!state.report.batchPrint) return active ? [active] : [];
  const selected = reportBatchSelectedClips();
  return selected.length ? selected : (active ? [active] : []);
}

function toggleReportClipSelection(clipId, checked) {
  const clips = reportClips();
  const selected = new Set((state.report.selectedClipIds || []).map(String));
  if (checked) selected.add(String(clipId)); else selected.delete(String(clipId));
  state.report.selectedClipIds = clips.filter((clip) => selected.has(String(clip.id))).map((clip) => String(clip.id));
  markDirty();
  updateReportClipSidebarUi();
  renderReportSummaryPages();
}

function selectAllReportClips() {
  state.report.selectedClipIds = reportClips().map((clip) => String(clip.id));
  state.report.batchPrint = false;
  markDirty();
  updateReportClipSidebarUi();
  renderReportSummaryPages();
  showToast(`${state.report.selectedClipIds.length} clips selected for batch output`, 'success');
}

function reportClipFrameIndex(clip, edge = 'start') {
  if (!clip) return -1;
  const sampleStep = reviewSampleStep();
  const start = Math.max(0, Number(clip.start_sec) || 0);
  const end = Math.max(start, Number(clip.end_sec) || start);
  const time = edge === 'end' ? Math.max(start, end - sampleStep) : start;
  return nearestFrameIndexAtTimeline(time);
}

function reportFocusSection(clip = reportSelectedClip()) {
  if (!clip) return;
  const section = [...$$('#report-summary-pages [data-clip-id]')].find((item) => item.dataset.clipId === clip.id);
  section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setReportSelectedClip(clip, { jump = false, edge = 'start', focus = false } = {}) {
  if (!clip) return;
  state.report.selectedClipId = clip.id;
  if (jump) {
    const frameIndex = reportClipFrameIndex(clip, edge);
    if (frameIndex >= 0) setFrame(frameIndex);
  } else {
    updateReportTimebars();
  }
  updateReportClipSidebarUi();
  if (focus) reportFocusSection(clip);
  scheduleRecoveryCursor();
}

function reportClipThumbnail(clip, edge) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'report-clip-thumbnail';
  button.setAttribute('aria-label', `Jump to ${clip.name} ${edge} frame`);
  button.title = `Go to clip ${edge}`;
  const source = state.clipThumbnails.get(clipThumbnailKey(clip, edge)) || reportBaseImage(clip);
  if (source) {
    const image = document.createElement('img');
    image.src = source;
    image.alt = '';
    button.append(image);
  } else {
    const placeholder = document.createElement('span');
    placeholder.className = 'icon';
    placeholder.innerHTML = icon('image');
    button.append(placeholder);
  }
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    setReportSelectedClip(clip, { jump: true, edge });
  });
  return button;
}

function updateReportClipSidebarUi(timelineOverride = null) {
  const selected = reportSelectedClip();
  const selectedIds = new Set((state.report.selectedClipIds || []).map(String));
  const timeline = Math.max(0, Number(timelineOverride ?? frameTimeline(currentFrame())) || 0);
  $$('#report-clip-list .report-clip-row').forEach((row) => {
    const clip = reportClips().find((item) => item.id === row.dataset.reportClipId);
    if (!clip) return;
    const active = clip.id === selected?.id;
    row.classList.toggle('is-active', active);
    active ? row.setAttribute('aria-current', 'true') : row.removeAttribute('aria-current');
    const fill = row.querySelector('.report-clip-progress > span');
    const duration = Math.max(0.001, Number(clip.end_sec) - Number(clip.start_sec));
    if (fill) fill.style.width = `${Math.max(0, Math.min(1, (timeline - Number(clip.start_sec)) / duration)) * 100}%`;
    const checkbox = row.querySelector('.report-clip-select-checkbox');
    if (checkbox) checkbox.checked = selectedIds.has(String(clip.id));
  });
  const count = $('#report-selected-clip-count');
  if (count) count.textContent = `${selectedIds.size} selected`;
  const previewTitle = $('#report-preview-title');
  const previewNote = $('#report-preview-note');
  if (previewTitle) previewTitle.textContent = state.report.batchPrint ? `${selectedIds.size || 1} clip report${selectedIds.size === 1 ? '' : 's'}` : `${selected?.name || 'Clip'} report`;
  if (previewNote) previewNote.textContent = state.report.batchPrint ? 'Batch preview: one A4 report per selected clip' : 'One clip per report';
}

function renderReportClipSidebar() {
  const list = $('#report-clip-list');
  if (!list) return;
  const clips = reportClips();
  const count = $('#report-clip-count');
  if (count) count.textContent = clips.length;
  const signature = clips.map((clip) => [
    clip.id,
    clip.start_sec,
    clip.end_sec,
    state.clipThumbnails.has(clipThumbnailKey(clip, 'start')),
    state.clipThumbnails.has(clipThumbnailKey(clip, 'end')),
    Boolean(reportBaseImage(clip)),
  ].join(':')).join('|');
  if (list.dataset.signature === signature && list.childElementCount === clips.length) {
    updateReportClipSidebarUi();
    return;
  }
  list.dataset.signature = signature;
  list.replaceChildren();
  clips.forEach((clip, index) => {
    const row = document.createElement('article');
    row.className = 'report-clip-row';
    row.dataset.reportClipId = clip.id;
    row.setAttribute('aria-label', `View ${clip.name}, ${formatClipClock(clip.start_sec)} to ${formatClipClock(clip.end_sec)}`);

    const rowHeader = document.createElement('div');
    rowHeader.className = 'report-clip-row-header';
    const selectLabel = document.createElement('label');
    selectLabel.className = 'report-clip-select';
    selectLabel.title = `Include ${clip.name} in batch output`;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'report-clip-select-checkbox';
    checkbox.checked = new Set((state.report.selectedClipIds || []).map(String)).has(String(clip.id));
    checkbox.setAttribute('aria-label', `Include ${clip.name} in batch output`);
    selectLabel.append(checkbox);

    const heading = document.createElement('button');
    heading.type = 'button';
    heading.className = 'report-clip-row-heading';
    const title = document.createElement('strong');
    title.textContent = clip.name || `Clip ${index + 1}`;
    const duration = document.createElement('span');
    duration.textContent = clipDurationLabel(clip);
    heading.append(title, duration);

    const thumbnails = document.createElement('div');
    thumbnails.className = 'report-clip-thumbnails';
    thumbnails.append(reportClipThumbnail(clip, 'start'), reportClipThumbnail(clip, 'end'));

    const range = document.createElement('div');
    range.className = 'report-clip-time-range';
    range.innerHTML = `<span>${formatClipClock(clip.start_sec)}</span><span class="icon">${icon('chevron-right')}</span><span>${formatClipClock(clip.end_sec)}</span>`;

    const progress = document.createElement('div');
    progress.className = 'report-clip-progress';
    progress.append(document.createElement('span'));
    rowHeader.append(selectLabel, heading);
    row.append(rowHeader, thumbnails, range, progress);
    checkbox.addEventListener('click', (event) => event.stopPropagation());
    checkbox.addEventListener('change', (event) => toggleReportClipSelection(clip.id, event.target.checked));
    heading.addEventListener('click', (event) => {
      event.stopPropagation();
      setReportSelectedClip(clip, { focus: true });
    });
    row.addEventListener('click', () => setReportSelectedClip(clip, { focus: true }));
    list.append(row);
  });
  updateReportClipSidebarUi();
}

function updateReportTimebars(timeOverride = null, { syncSelection = false } = {}) {
  const clips = reportClips();
  const duration = Math.max(0, Number($('#frame-video')?.duration) || durationSec());
  const timeline = Math.max(0, Math.min(duration || durationSec(), Number(timeOverride ?? frameTimeline(currentFrame())) || 0));
  if (syncSelection) {
    const containing = clips.find((clip, index) => timeline >= Number(clip.start_sec) - 0.0001 && (timeline < Number(clip.end_sec) || index === clips.length - 1));
    if (containing) state.report.selectedClipId = containing.id;
  }
  const clip = reportSelectedClip();
  const step = reviewSampleStep();
  const videoSlider = $('#report-video-time-slider');
  if (videoSlider) {
    videoSlider.disabled = duration <= 0;
    videoSlider.min = '0';
    videoSlider.max = String(Math.max(0.001, duration));
    videoSlider.step = String(step);
    videoSlider.value = String(timeline);
    videoSlider.style.setProperty('--timebar-progress', `${duration ? timeline / duration * 100 : 0}%`);
    videoSlider.setAttribute('aria-valuetext', `${formatClipClock(timeline)} of ${formatClipClock(duration)}`);
  }
  const videoCurrent = $('#report-video-time-current');
  const videoEnd = $('#report-video-time-end');
  if (videoCurrent) videoCurrent.textContent = formatClipClock(timeline);
  if (videoEnd) videoEnd.textContent = formatClipClock(duration);

  const position = clip ? clipTimebarPosition(clip, timeline) : { current: 0, duration: 0 };
  const clipSlider = $('#report-clip-time-slider');
  if (clipSlider) {
    clipSlider.disabled = !clip || position.duration <= 0;
    clipSlider.min = '0';
    clipSlider.max = String(Math.max(0.001, position.duration));
    clipSlider.step = String(step);
    clipSlider.value = String(position.current);
    clipSlider.style.setProperty('--timebar-progress', `${position.duration ? position.current / position.duration * 100 : 0}%`);
    clipSlider.setAttribute('aria-valuetext', `${formatTime(position.current)} of ${formatTime(position.duration)} in ${clip?.name || 'clip'}`);
  }
  const clipLabel = $('#report-clip-time-label');
  const clipCurrent = $('#report-clip-time-current');
  const clipEnd = $('#report-clip-time-end');
  const title = $('#report-active-clip-title');
  const note = $('#report-clip-time-note');
  if (clipLabel) clipLabel.textContent = clip?.name || 'Clip';
  if (clipCurrent) clipCurrent.textContent = formatTime(position.current);
  if (clipEnd) clipEnd.textContent = formatTime(position.duration);
  if (title) title.textContent = `${clip?.name || 'Clip'} report`;
  if (note) note.textContent = clip ? `${clip.name}: ${formatClipClock(clip.start_sec)} to ${formatClipClock(clip.end_sec)}. Click either image to jump to its source frame.` : 'No report clip available.';
  updateReportClipSidebarUi(timeline);
}

function clipTimepoints(clip, intervalSec) {
  const interval = Math.max(1, Number(intervalSec) || 1);
  const duration = Math.min(24 * 3600, Math.max(0, clip.end_sec - clip.start_sec));
  const points = [];
  for (let time = 0; time < Math.max(1, duration) && points.length < 10000; time += interval) points.push(time);
  return points.length ? points : [0];
}

function reportCaptureKey(clip, localTime) { return `${clip.id}:${Number(localTime).toFixed(3)}`; }

function reportSampleTolerance() {
  return Math.max(0.75, reviewSampleStep() / 2);
}

function nearestFrameAtTimeline(time, tolerance = Infinity, clip = null) {
  const frames = state.doc?.frames || [];
  if (!frames.length) return null;
  let low = 0;
  let high = frames.length;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    if (frameTimeline(frames[middle]) < time) low = middle + 1; else high = middle;
  }
  const candidates = [frames[low], frames[low - 1]].filter(Boolean);
  const closest = candidates
    .filter((frame) => !clip || (frameTimeline(frame) >= clip.start_sec - tolerance && frameTimeline(frame) <= clip.end_sec + tolerance))
    .sort((a, b) => Math.abs(frameTimeline(a) - time) - Math.abs(frameTimeline(b) - time))[0];
  return closest && Math.abs(frameTimeline(closest) - time) <= tolerance ? closest : null;
}

function nearestFrameInClip(clip, localTime, tolerance = Infinity) {
  return nearestFrameAtTimeline(clip.start_sec + localTime, tolerance, clip);
}

function reportBaseImage(clip) {
  return state.report.baseImages[clip.id] || (state.sourceJsonName === 'demo-labels.json' ? './public/demo-frame.jpg' : '');
}

function formatReportDate(value) {
  if (!value) return 'Not entered';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
}

function reportNumber(key) {
  const raw = state.report[key];
  if (raw === '' || raw == null) return null;
  const value = Number(raw);
  return Number.isFinite(value) && value >= 0 ? value : null;
}

function calculateReportMetrics() {
  const tp = reportNumber('tp');
  const fp = reportNumber('fp');
  const up = reportNumber('up');
  const iou = reportNumber('iou');
  return {
    precision: tp != null && fp != null && tp + fp > 0 ? tp / (tp + fp) : null,
    recall: tp != null && up != null && tp + up > 0 ? tp / (tp + up) : null,
    iou,
  };
}

function setReportMetric(valueId, statusId, value, threshold) {
  const valueNode = $(valueId);
  const statusNode = $(statusId);
  if (value == null) {
    valueNode.textContent = 'Not entered';
    statusNode.textContent = 'NOT ASSESSED';
    statusNode.className = 'report-status pending';
    return;
  }
  const passed = value > threshold;
  valueNode.textContent = value.toFixed(3);
  statusNode.textContent = passed ? 'PASS' : 'FAIL';
  statusNode.className = `report-status ${passed ? 'pass' : 'fail'}`;
}

function renderReportControls() {
  const fields = {
    '#report-tenderer': 'tenderer',
    '#report-date': 'demonstrationDate',
    '#report-tp': 'tp',
    '#report-fp': 'fp',
    '#report-up': 'up',
    '#report-iou': 'iou',
  };
  Object.entries(fields).forEach(([selector, key]) => {
    const input = $(selector);
    if (!input.dataset.reportInitialized) {
      input.value = state.report[key];
      input.dataset.reportInitialized = 'true';
    }
  });

  const controls = $('#report-compliance-controls');
  if (!controls.childElementCount) {
    REPORT_REQUIREMENTS.forEach((item) => {
      const label = document.createElement('label');
      label.className = 'report-compliance-option';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.dataset.compliance = item.id;
      const copy = document.createElement('span');
      const title = document.createElement('strong');
      title.textContent = `${item.code} ${item.label}`;
      const requirement = document.createElement('small');
      requirement.textContent = item.requirement;
      copy.append(title, requirement);
      label.append(input, copy);
      controls.append(label);
    });
  }
  $$('[data-compliance]').forEach((input) => { input.checked = Boolean(state.report.compliance[input.dataset.compliance]); });
  const clips = reportClips();
  const clipInput = $('#report-clip-cuts');
  if (document.activeElement !== clipInput) clipInput.value = state.report.clipCutsText;
  const summary = $('#report-clip-summary');
  summary.textContent = `${clips.length} ${clips.length === 1 ? 'clip' : 'clips'} / ${Math.max(0, clips.length - 1)} ${clips.length === 2 ? 'cut' : 'cuts'}`;
  summary.title = clips.map((clip) => `${clip.name}: ${formatClock(clip.start_sec)}-${formatClock(clip.end_sec)}`).join('\n');
}

function renderReportIdentity() {
  $$('[data-report-tenderer]').forEach((node) => { node.textContent = state.report.tenderer.trim() || 'Not entered'; });
  $$('[data-report-date]').forEach((node) => { node.textContent = formatReportDate(state.report.demonstrationDate); });
  $$('[data-page-tenderer]').forEach((node) => { node.textContent = state.report.tenderer.trim() || 'Not entered'; });
  $$('[data-page-date]').forEach((node) => { node.textContent = formatReportDate(state.report.demonstrationDate); });
  $('#report-source-value').textContent = state.sourceJsonName || state.videoFile?.name || 'Not entered';
  const frames = state.doc?.frames || [];
  const first = frameTimeline(frames[0]);
  const last = frameTimeline(frames[frames.length - 1]);
  $('#report-coverage-value').textContent = frames.length ? `${formatClock(first)} to ${formatClock(last)} / ${reportClips().length} ${reportClips().length === 1 ? 'clip' : 'clips'} (${frames.length.toLocaleString()} sampled frames)` : 'No sampled frames';
}

function renderReportMetrics() {
  const metrics = calculateReportMetrics();
  setReportMetric('#report-precision-value', '#report-precision-status', metrics.precision, 0.8);
  setReportMetric('#report-recall-value', '#report-recall-status', metrics.recall, 0.8);
  setReportMetric('#report-iou-value', '#report-iou-status', metrics.iou, 0.2);
}

function renderReportCompliance() {
  const body = $('#report-compliance-table');
  body.replaceChildren();
  let confirmed = 0;
  REPORT_REQUIREMENTS.forEach((item) => {
    const checked = Boolean(state.report.compliance[item.id]);
    if (checked) confirmed += 1;
    const row = document.createElement('tr');
    const code = document.createElement('td');
    code.textContent = item.code;
    const requirement = document.createElement('td');
    requirement.textContent = item.requirement;
    const statusCell = document.createElement('td');
    const status = document.createElement('span');
    status.className = `report-status ${checked ? 'pass' : 'pending'}`;
    status.textContent = checked ? 'DECLARED COMPLIANT' : 'NOT ASSESSED';
    statusCell.append(status);
    row.append(code, requirement, statusCell);
    body.append(row);
  });
  $('#report-compliance-count').textContent = `${confirmed} / ${REPORT_REQUIREMENTS.length} confirmed`;
}

function renderReportCountLog() {
  const body = $('#report-count-log');
  if (!body) return;
  body.replaceChildren();
  let missing = 0;
  let total = 0;
  const clips = reportPreviewClips();
  clips.forEach((clip) => {
    clipTimepoints(clip, 120).forEach((time) => {
      total += 1;
      const frame = nearestFrameInClip(clip, time, reportSampleTolerance());
      if (!frame) missing += 1;
      const row = document.createElement('tr');
      const clipCell = document.createElement('td');
      clipCell.textContent = clip.name;
      const timeCell = document.createElement('td');
      timeCell.textContent = formatClock(time);
      const countCell = document.createElement('td');
      countCell.textContent = frame ? String(frame.detections.length) : '-';
      row.append(clipCell, timeCell, countCell);
      body.append(row);
    });
  });
  $('#report-count-note').textContent = missing ? `${missing} of ${total} time points have no matching sampled frame.` : `${total} time points across ${clips.length} ${clips.length === 1 ? 'clip' : 'clips'} matched to sampled frames.`;
}

function reportClipFrames(clip) {
  const start = Number(clip?.start_sec) || 0;
  const end = Number(clip?.end_sec) || start;
  return (state.doc?.frames || []).filter((frame) => {
    const time = frameTimeline(frame);
    return time >= start - 0.001 && time <= end + 0.001;
  });
}

function reportMetricDisplay(value) {
  return value == null ? 'Not entered' : value.toFixed(3);
}

function reportMetricState(value, threshold) {
  if (value == null) return ['NOT ASSESSED', 'pending'];
  return value > threshold ? ['PASS', 'pass'] : ['FAIL', 'fail'];
}

function renderReportSummaryPages() {
  const root = $('#report-summary-pages');
  if (!root) return;
  root.replaceChildren();
  const clips = reportPreviewClips();
  const metrics = calculateReportMetrics();
  const sourceName = state.sourceJsonName || state.videoFile?.name || 'Not entered';

  clips.forEach((clip) => {
    const frames = reportClipFrames(clip);
    const detections = frames.reduce((sum, frame) => sum + (frame.detections?.length || 0), 0);
    const overview = document.createElement('section');
    overview.className = 'report-sheet report-summary-sheet';
    overview.dataset.clipId = clip.id;
    overview.innerHTML = `
      <div class="report-running-head"><strong>Thermal audit report</strong><span data-summary-clip></span></div>
      <h2>FEHQ 1019/26 rodent detection report</h2>
      <div class="report-reference">Tender output for one video clip</div>
      <div class="report-meta-grid">
        <span>Name of Tenderer</span><strong data-summary-tenderer></strong>
        <span>Date of Demonstration</span><strong data-summary-date></strong>
        <span>Source label file</span><strong data-summary-source></strong>
        <span>Clip coverage</span><strong data-summary-range></strong>
        <span>Sampled frames</span><strong data-summary-frames></strong>
        <span>Detection boxes</span><strong data-summary-detections></strong>
      </div>
      <h3>Calculated detection results</h3>
      <table class="report-table report-metric-table"><thead><tr><th>Indicator</th><th>Result</th><th>Status</th></tr></thead><tbody></tbody></table>
      <h3>Camera and system declarations</h3>
      <table class="report-table report-compliance-table"><thead><tr><th>Item</th><th>Mandatory feature</th><th>Declaration</th></tr></thead><tbody></tbody></table>
      <p class="report-note" data-summary-note></p>`;
    overview.querySelector('[data-summary-clip]').textContent = `${clip.name} / ${formatClipClock(clip.start_sec)}-${formatClipClock(clip.end_sec)}`;
    overview.querySelector('[data-summary-tenderer]').textContent = state.report.tenderer.trim() || 'Not entered';
    overview.querySelector('[data-summary-date]').textContent = formatReportDate(state.report.demonstrationDate);
    overview.querySelector('[data-summary-source]').textContent = sourceName;
    overview.querySelector('[data-summary-range]').textContent = `${formatClipClock(clip.start_sec)} to ${formatClipClock(clip.end_sec)} (${formatTime(Math.max(0, clip.end_sec - clip.start_sec))})`;
    overview.querySelector('[data-summary-frames]').textContent = frames.length.toLocaleString();
    overview.querySelector('[data-summary-detections]').textContent = detections.toLocaleString();

    const metricBody = overview.querySelector('.report-metric-table tbody');
    [
      ['Precision', metrics.precision, 0.8],
      ['Recall', metrics.recall, 0.8],
      ['Mean IoU', metrics.iou, 0.2],
    ].forEach(([label, value, threshold]) => {
      const row = document.createElement('tr');
      const labelCell = document.createElement('td');
      labelCell.textContent = label;
      const valueCell = document.createElement('td');
      valueCell.textContent = reportMetricDisplay(value);
      const statusCell = document.createElement('td');
      const status = document.createElement('span');
      const [text, className] = reportMetricState(value, threshold);
      status.className = `report-status ${className}`;
      status.textContent = text;
      statusCell.append(status);
      row.append(labelCell, valueCell, statusCell);
      metricBody.append(row);
    });

    const complianceBody = overview.querySelector('.report-compliance-table tbody');
    REPORT_REQUIREMENTS.forEach((item) => {
      const checked = Boolean(state.report.compliance[item.id]);
      const row = document.createElement('tr');
      const code = document.createElement('td');
      code.textContent = item.code;
      const requirement = document.createElement('td');
      requirement.textContent = item.requirement;
      const statusCell = document.createElement('td');
      const status = document.createElement('span');
      status.className = `report-status ${checked ? 'pass' : 'pending'}`;
      status.textContent = checked ? 'DECLARED COMPLIANT' : 'NOT ASSESSED';
      statusCell.append(status);
      row.append(code, requirement, statusCell);
      complianceBody.append(row);
    });
    overview.querySelector('[data-summary-note]').textContent = `${clip.name} is reported independently. It contains ${frames.length.toLocaleString()} sampled frame${frames.length === 1 ? '' : 's'} and ${detections.toLocaleString()} labelled detection ${detections === 1 ? 'box' : 'boxes'}.`;
    root.append(overview);

    const countPage = document.createElement('section');
    countPage.className = 'report-sheet report-count-sheet';
    countPage.dataset.clipId = clip.id;
    countPage.innerHTML = `
      <div class="report-running-head"><strong>Thermal audit report</strong><span data-summary-clip></span></div>
      <h2>${clip.name} count log</h2>
      <div class="report-reference">Sampled every 2 minutes within this clip</div>
      <div class="report-meta-grid report-meta-compact"><span>Clip coverage</span><strong data-summary-range></strong><span>Source label file</span><strong data-summary-source></strong></div>
      <h3>Detection count by time point</h3>
      <table class="report-table report-count-table"><thead><tr><th>Time in clip</th><th>Source frame</th><th>Detections</th></tr></thead><tbody></tbody></table>
      <p class="report-note" data-summary-note></p>`;
    countPage.querySelector('[data-summary-clip]').textContent = `${clip.name} / ${formatClipClock(clip.start_sec)}-${formatClipClock(clip.end_sec)}`;
    countPage.querySelector('[data-summary-range]').textContent = `${formatClipClock(clip.start_sec)} to ${formatClipClock(clip.end_sec)}`;
    countPage.querySelector('[data-summary-source]').textContent = sourceName;
    const countBody = countPage.querySelector('tbody');
    let missing = 0;
    const points = clipTimepoints(clip, 120);
    points.forEach((time) => {
      const frame = nearestFrameInClip(clip, time, reportSampleTolerance());
      if (!frame) missing += 1;
      const row = document.createElement('tr');
      const timeCell = document.createElement('td');
      timeCell.textContent = formatClock(time);
      const frameCell = document.createElement('td');
      frameCell.textContent = frame ? String(frame.sample_index ?? '-') : '-';
      const countCell = document.createElement('td');
      countCell.textContent = frame ? String(frame.detections.length) : '-';
      row.append(timeCell, frameCell, countCell);
      countBody.append(row);
    });
    countPage.querySelector('[data-summary-note]').textContent = missing ? `${missing} of ${points.length} time points had no matching sampled label frame.` : `${points.length} time points matched sampled label frames. This page belongs only to ${clip.name}.`;
    root.append(countPage);
  });
}

function interpolateColor(left, right, amount) {
  return left.map((value, index) => Math.round(value + (right[index] - value) * amount));
}

function reportHeatColor(value) {
  const stops = [
    [0, [21, 31, 122]],
    [0.18, [0, 91, 211]],
    [0.36, [0, 190, 209]],
    [0.54, [51, 190, 76]],
    [0.72, [255, 226, 45]],
    [0.86, [255, 132, 23]],
    [1, [209, 31, 42]],
  ];
  const t = Math.max(0, Math.min(1, value));
  const upperIndex = Math.max(1, stops.findIndex(([point]) => point >= t));
  const [leftPoint, left] = stops[upperIndex - 1];
  const [rightPoint, right] = stops[upperIndex];
  const rgb = interpolateColor(left, right, (t - leftPoint) / Math.max(0.001, rightPoint - leftPoint));
  return `rgb(${rgb.join(', ')})`;
}

function rasterizeReportHeatmap(clip, columns = 48, rows = 36) {
  const start = Math.max(0, Number(clip.start_sec) || 0);
  const end = Math.max(start, Number(clip.end_sec) || start);
  const aggregate = heatmapAggregateForClip({
    ...clip,
    id: `report-${clip.id}`,
    index: undefined,
    start_sec: start,
    end_sec: Math.max(start, end - 0.001),
  });
  const cells = new Float32Array(columns * rows);
  if (aggregate?.values?.length) {
    for (let row = 0; row < rows; row += 1) {
      const sourceTop = Math.floor(row * aggregate.rows / rows);
      const sourceBottom = Math.max(sourceTop + 1, Math.ceil((row + 1) * aggregate.rows / rows));
      for (let column = 0; column < columns; column += 1) {
        const sourceLeft = Math.floor(column * aggregate.columns / columns);
        const sourceRight = Math.max(sourceLeft + 1, Math.ceil((column + 1) * aggregate.columns / columns));
        let value = 0;
        for (let sourceRow = sourceTop; sourceRow < sourceBottom; sourceRow += 1) {
          for (let sourceColumn = sourceLeft; sourceColumn < sourceRight; sourceColumn += 1) {
            value = Math.max(value, aggregate.values[sourceRow * aggregate.columns + sourceColumn] || 0);
          }
        }
        cells[row * columns + column] = value;
      }
    }
  }
  return {
    cells,
    columns,
    rows,
    peak: Math.max(0, ...cells),
    matchedSamples: aggregate?.frameCount || 0,
    confirmedSamples: aggregate?.framesWithBoxes || 0,
    detectionCount: aggregate?.boxCount || 0,
  };
}

function renderReportHeatmaps() {
  const root = $('#report-heatmap-pages');
  root.replaceChildren();
  reportPreviewClips().forEach((clip) => {
    const heatmap = rasterizeReportHeatmap(clip);
    const section = document.createElement('section');
    section.className = 'report-sheet report-appendix-c';
    section.dataset.clipId = clip.id;
    section.innerHTML = `
      <div class="report-annex-label">Appendix C</div>
      <div class="report-sample-heading">Sample of &ldquo;Heat Map&rdquo;</div>
      <h2>Tender for Provision of Services on Assessing Rodent Activity for Rodent Activity Survey and Anti-Rodent Operation in the Territory</h2>
      <div class="report-reference">(Tender Ref.: FEHQ 1019/26)</div>
      <div class="report-annex-meta">
        <div><strong>Name of Tenderer</strong><span>:</span><em data-page-tenderer></em></div>
        <div><strong>Date of Demonstration</strong><span>:</span><em data-page-date></em></div>
      </div>
      <h3 class="report-heatmap-description">Heat Map showing the intensity of rodent activities aggregated across the full video clip and overlaid on a grayscale source frame</h3>
      <div class="report-frequency-legend">
        <div class="report-legend-label"><strong>Legend</strong></div>
        <div class="report-frequency-body">
          <span>(Frequency)</span>
          <div class="report-frequency-scale"><span>Lower</span><span>Higher</span><div></div></div>
        </div>
      </div>
      <div class="report-heatmap-band"><strong>Heat map</strong><span><b data-heatmap-clip></b> / <i data-heatmap-range></i></span></div>
      <div class="report-heatmap-frame">
        <div class="report-heatmap-plot"><img alt="Grayscale thermal image used for the activity heat map" /><div class="report-heatmap-cells" aria-hidden="true"></div><div class="report-media-empty" hidden></div></div>
      </div>
      <p class="report-note report-heatmap-note"></p>`;
    section.querySelector('[data-heatmap-clip]').textContent = clip.name;
    section.querySelector('[data-heatmap-range]').textContent = `${formatClock(0)}-${formatClock(clip.end_sec - clip.start_sec)}`;
    section.querySelector('[data-page-tenderer]').textContent = state.report.tenderer.trim() || 'Not entered';
    section.querySelector('[data-page-date]').textContent = formatReportDate(state.report.demonstrationDate);
    const image = section.querySelector('img');
    const baseImage = reportBaseImage(clip);
    image.hidden = !baseImage;
    if (baseImage) image.src = baseImage;
    const frame = section.querySelector('.report-heatmap-frame');
    frame.classList.toggle('no-source', !baseImage);
    const overlay = section.querySelector('.report-heatmap-cells');
    if (heatmap.peak > 0) {
      heatmap.cells.forEach((value, index) => {
        if (value <= 0) return;
        const cell = document.createElement('span');
        const column = index % heatmap.columns;
        const row = Math.floor(index / heatmap.columns);
        const strength = value / heatmap.peak;
        cell.className = 'report-heat-cell';
        cell.style.left = `${column / heatmap.columns * 100}%`;
        cell.style.top = `${row / heatmap.rows * 100}%`;
        cell.style.width = `${100 / heatmap.columns + 0.08}%`;
        cell.style.height = `${100 / heatmap.rows + 0.08}%`;
        cell.style.backgroundColor = reportHeatColor(strength);
        cell.style.opacity = String(0.58 + strength * 0.34);
        overlay.append(cell);
      });
    }
    const empty = section.querySelector('.report-media-empty');
    empty.hidden = heatmap.detectionCount > 0;
    empty.textContent = baseImage ? 'No rodent detections in this clip' : 'Source video not attached';
    section.querySelector('.report-heatmap-note').textContent = `${heatmap.matchedSamples.toLocaleString()} sampled frames in this clip; ${heatmap.confirmedSamples.toLocaleString()} frames with detections and ${heatmap.detectionCount.toLocaleString()} rodent boxes contributed to this clip-wide heat map.`;
    root.append(section);
  });
}

function renderCaptureBoxes(container, frame) {
  (frame?.detections || []).forEach((detection) => {
    const box = document.createElement('span');
    box.className = 'report-capture-box';
    Object.assign(box.style, pixelsToStyle(detection.bbox_xyxy_pixels));
    const label = document.createElement('span');
    label.textContent = 'Rodent';
    box.append(label);
    container.append(box);
  });
}

function renderReportCaptures() {
  const root = $('#report-capture-pages');
  root.replaceChildren();
  const prepared = new Map(state.report.captures.map((entry) => [reportCaptureKey({ id: entry.clipId }, entry.time), entry]));
  const entries = reportPreviewClips().flatMap((clip) => clipTimepoints(clip, 120).map((time) => {
    const media = prepared.get(reportCaptureKey(clip, time)) || {};
    return { clip, time, timelineTime: clip.start_sec + time, src: media.src || reportBaseImage(clip), videoCaptured: Boolean(media.videoCaptured), frame: nearestFrameInClip(clip, time, reportSampleTolerance()) };
  }));

  for (let pageIndex = 0; pageIndex < entries.length; pageIndex += 2) {
    const section = document.createElement('section');
    section.className = 'report-sheet report-appendix-d';
    section.innerHTML = '<div class="report-running-head"><strong>Captured Thermal Images</strong><span>Appendix D</span></div><h2>Tender for Provision of Services on Assessing Rodent Activity for Rodent Activity Survey and Anti-Rodent Operation in the Territory</h2><div class="report-reference">Tender Ref.: FEHQ 1019/26</div><div class="report-meta-grid report-meta-compact"><span>Name of Tenderer</span><strong data-page-tenderer></strong><span>Date of Demonstration</span><strong data-page-date></strong></div><h3>Thermal images captured every 2 minutes with AI model boundary boxes</h3><div class="report-capture-list"></div>';
    section.querySelector('[data-page-tenderer]').textContent = state.report.tenderer.trim() || 'Not entered';
    section.querySelector('[data-page-date]').textContent = formatReportDate(state.report.demonstrationDate);
    const list = section.querySelector('.report-capture-list');
    entries.slice(pageIndex, pageIndex + 2).forEach((entry) => {
      const figure = document.createElement('figure');
      figure.className = 'report-capture';
      const caption = document.createElement('figcaption');
      caption.textContent = `${entry.clip.name} / Time point of the thermal video: ${formatClock(entry.time)}`;
      const media = document.createElement('div');
      media.className = 'report-capture-media';
      const hasImage = Boolean(entry.src && (entry.videoCaptured || entry.frame));
      if (hasImage) {
        const image = document.createElement('img');
        image.src = entry.src;
        image.alt = `${entry.clip.name} thermal video frame at ${formatClock(entry.time)}`;
        const boxes = document.createElement('div');
        boxes.className = 'report-capture-boxes';
        renderCaptureBoxes(boxes, entry.frame);
        media.append(image, boxes);
      } else {
        const missing = document.createElement('div');
        missing.className = 'report-media-empty';
        missing.textContent = state.videoFile ? 'Preview not prepared' : 'Source frame not available';
        media.append(missing);
      }
      const source = document.createElement('div');
      source.className = 'report-capture-source';
      source.textContent = entry.frame ? `Sampled frame ${entry.frame.sample_index} / source ${formatClock(entry.timelineTime)} / ${entry.frame.detections.length} rodent ${entry.frame.detections.length === 1 ? 'box' : 'boxes'}` : 'No matching sampled label frame';
      figure.append(caption, media, source);
      list.append(figure);
    });
    root.append(section);
  }
}

function renderReport() {
  renderReportControls();
  renderReportClipSidebar();
  renderReportMetrics();
  renderReportCompliance();
  renderReportCountLog();
  renderReportSummaryPages();
  renderReportHeatmaps();
  renderReportCaptures();
  renderReportIdentity();
  updateReportTimebars();
}

function waitForVideoMetadata(video) {
  if (video.readyState >= 1) return Promise.resolve();
  return new Promise((resolve, reject) => {
    let timeout;
    const cleanup = () => { clearTimeout(timeout); video.removeEventListener('loadedmetadata', done); video.removeEventListener('error', failed); };
    const done = () => { cleanup(); resolve(); };
    const failed = () => { cleanup(); reject(new Error('Video could not be read')); };
    timeout = setTimeout(() => { cleanup(); reject(new Error('Video metadata timed out')); }, 20000);
    video.addEventListener('loadedmetadata', done, { once: true });
    video.addEventListener('error', failed, { once: true });
  });
}

function waitForVideoFrameData(video, { signal } = {}) {
  if (signal?.aborted) return Promise.resolve(false);
  if (video.readyState >= 2) return Promise.resolve(true);
  return new Promise((resolve, reject) => {
    let timeout;
    const cleanup = () => {
      clearTimeout(timeout);
      video.removeEventListener('loadeddata', done);
      video.removeEventListener('canplay', done);
      video.removeEventListener('error', failed);
      signal?.removeEventListener('abort', aborted);
    };
    const done = () => {
      if (video.readyState < 2) return;
      cleanup();
      resolve(true);
    };
    const failed = () => {
      cleanup();
      reject(new Error('Video frame could not be decoded'));
    };
    const aborted = () => {
      cleanup();
      resolve(false);
    };
    timeout = setTimeout(() => {
      cleanup();
      reject(new Error('Video frame decode timed out'));
    }, 20000);
    video.addEventListener('loadeddata', done);
    video.addEventListener('canplay', done);
    video.addEventListener('error', failed);
    signal?.addEventListener('abort', aborted, { once: true });
    if (video.readyState >= 2) done();
  });
}

function seekVideo(video, time, { signal } = {}) {
  const safeTime = Math.max(0, Math.min(Math.max(0, video.duration - 0.001), time));
  if (signal?.aborted) return Promise.resolve(false);
  if (Math.abs(video.currentTime - safeTime) <= 0.001 && !video.seeking) return waitForVideoFrameData(video, { signal });
  return new Promise((resolve, reject) => {
    let timeout;
    const cleanup = () => { clearTimeout(timeout); video.removeEventListener('seeked', done); video.removeEventListener('error', failed); signal?.removeEventListener('abort', aborted); };
    const done = () => {
      if (video.seeking) return;
      if (video.dataset) video.dataset.seekDriftMs = String(Math.round((Number(video.currentTime) - safeTime) * 1000));
      cleanup();
      resolve(true);
    };
    const failed = () => { cleanup(); reject(new Error('Video seek failed')); };
    const aborted = () => { cleanup(); resolve(false); };
    timeout = setTimeout(() => { cleanup(); reject(new Error('Video seek timed out')); }, 20000);
    video.addEventListener('seeked', done);
    video.addEventListener('error', failed);
    signal?.addEventListener('abort', aborted, { once: true });
    video.currentTime = safeTime;
  });
}

async function captureVideoFrame(video, time) {
  if (!Number.isFinite(video.duration) || time >= video.duration) return '';
  const presented = await seekPresentedVideoFrame(video, time);
  if (!presented) return '';
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth || videoWidth();
  canvas.height = video.videoHeight || videoHeight();
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', 0.86);
}

async function prepareReportMedia({ silent = false } = {}) {
  if (state.report.preparePromise) return state.report.preparePromise;
  const button = $('[data-action="prepare-report"]');
  state.report.preparePromise = (async () => {
    state.report.preparing = true;
    if (button) {
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      if (button.lastElementChild) button.lastElementChild.textContent = 'Preparing...';
    }
    let sourceVideo = null;
    if (state.videoUrl) {
      try {
        sourceVideo = document.createElement('video');
        sourceVideo.muted = true;
        sourceVideo.playsInline = true;
        sourceVideo.preload = 'metadata';
        sourceVideo.src = state.videoUrl;
        await waitForVideoMetadata(sourceVideo);
      } catch (error) {
        console.warn(error);
        sourceVideo = null;
      }
    }

    const fallback = state.sourceJsonName === 'demo-labels.json' ? './public/demo-frame.jpg' : '';
    const captures = [];
    const baseImages = {};
    for (const clip of reportPreviewClips()) {
      for (const time of clipTimepoints(clip, 120)) {
        const timelineTime = clip.start_sec + time;
        let src = fallback;
        let videoCaptured = false;
        if (sourceVideo) {
          try {
            const captured = await captureVideoFrame(sourceVideo, timelineTime);
            if (captured) { src = captured; videoCaptured = true; }
          } catch (error) {
            console.warn(error);
          }
        }
        captures.push({ clipId: clip.id, time, timelineTime, src, videoCaptured });
        if (!baseImages[clip.id] && src) baseImages[clip.id] = src;
      }
    }
    state.report.captures = captures;
    state.report.baseImages = baseImages;
    renderReport();
    if (!silent) showToast('Tender report preview refreshed', 'success');
  })();
  try {
    await state.report.preparePromise;
  } finally {
    state.report.preparePromise = null;
    state.report.preparing = false;
    if (button) {
      button.disabled = false;
      button.removeAttribute('aria-busy');
      if (button.lastElementChild) button.lastElementChild.textContent = 'Refresh preview';
    }
  }
}

async function printReport() {
  state.report.batchPrint = false;
  renderReport();
  await prepareReportMedia({ silent: true });
  await document.fonts?.ready;
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  window.print();
}

async function printReportBatch() {
  const selected = reportBatchSelectedClips();
  if (!selected.length) {
    showToast('Select at least one clip for batch output', 'error');
    return;
  }
  state.report.batchPrint = true;
  renderReport();
  await prepareReportMedia({ silent: true });
  await document.fonts?.ready;
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const restore = () => {
    state.report.batchPrint = false;
    renderReport();
    scheduleRecoveryCursor();
  };
  window.addEventListener('afterprint', restore, { once: true });
  window.print();
}

function renderImportStatus() {
  const jsonButton = $('#json-import-button');
  const videoButton = $('#video-import-button');
  const jsonReady = Boolean(state.doc && state.sourceJsonName && state.sourceJsonName !== 'demo-labels.json');
  const videoReady = Boolean(state.videoFile);
  jsonButton?.classList.toggle('is-loaded', jsonReady);
  videoButton?.classList.toggle('is-loaded', videoReady);
  if (jsonButton) {
    jsonButton.querySelector('[data-import-label]').textContent = jsonReady ? 'JSON loaded' : 'Open JSON';
    jsonButton.title = jsonReady ? `Label JSON loaded: ${state.sourceJsonName}` : 'Choose label JSON';
    jsonButton.setAttribute('aria-label', jsonReady ? `Replace label JSON, current file ${state.sourceJsonName}` : 'Choose label JSON');
  }
  if (videoButton) {
    videoButton.querySelector('[data-import-label]').textContent = videoReady ? 'Video loaded' : 'Open video';
    videoButton.title = videoReady ? `Source video loaded: ${state.videoFile.name}` : 'Choose source video MP4, MOV, or WebM';
    videoButton.setAttribute('aria-label', videoReady ? `Replace source video, current file ${state.videoFile.name}` : 'Choose source video MP4, MOV, or WebM');
  }
}

function importReadinessText() {
  if (state.dirty) return state.recoverySavedRevision >= state.recoveryRevision ? 'Autosaved in browser' : 'Autosaving...';
  const jsonReady = Boolean(state.doc && state.sourceJsonName && state.sourceJsonName !== 'demo-labels.json');
  if (!state.videoFile) return state.recoveryRestored ? 'Video needs reload' : jsonReady ? 'Label JSON loaded' : 'Demo loaded';
  if (!videoMatchesDocument()) return 'Check source video';
  return jsonReady ? 'Files ready' : 'Video ready';
}

function renderDocumentInfo() {
  if (!state.doc) return;
  const videoTitle = (state.videoFile?.name || state.recoveryVideo?.name || 'Video review').replace(/\.[^.]+$/, '');
  const title = state.sourceJsonName === 'demo-labels.json' ? 'Demo frame slice' : state.sourceJsonName ? state.sourceJsonName.replace(/\.json$/i, '') : videoTitle;
  const mediaStatus = state.videoFile ? `video ${formatClipClock(reportDurationSec())}` : state.recoveryVideo?.name ? 'video needs reload' : 'video not loaded';
  $('#document-title').textContent = title;
  $('#document-subtitle').textContent = `${state.doc.schema || 'label document'} / ${state.doc.frames.length.toLocaleString()} review samples / 1 frame per 10 sec / ${mediaStatus}`;
  const hasReview = state.doc.frames.some((frame) => frame.review_status !== 'unreviewed');
  $('#document-status').textContent = hasReview ? 'REVIEW COPY' : !state.sourceJsonName && state.videoFile ? 'VIDEO ONLY' : 'MACHINE GENERATED';
}

function renderView() {
  document.body.classList.toggle('viewport-fit', state.view !== 'report');
  $$('[data-view-panel]').forEach((panel) => { panel.hidden = panel.dataset.viewPanel !== state.view; });
  $$('.nav-item').forEach((button) => { const active = button.dataset.view === state.view; button.classList.toggle('active', active); active ? button.setAttribute('aria-current', 'page') : button.removeAttribute('aria-current'); });
  $('#breadcrumb-current').textContent = state.view === 'review' ? 'Review' : state.view === 'heatmap' ? 'Heatmap' : state.view === 'table' ? 'Labels' : 'Report';
}

function renderAll() {
  if (!state.doc) return;
  renderView();
  renderImportStatus();
  renderDocumentInfo();
  renderProgress();
  if (state.view === 'review') { renderClipSidebar(); renderFrame(); renderInspector(); renderTimeline(); }
  else if (state.view === 'heatmap') {
    const frameReady = renderFrame();
    renderHeatmap();
    if (frameReady?.then) {
      void frameReady.then((ready) => {
        if (ready && state.view === 'heatmap') renderHeatmapFrameOnly();
      });
    }
  }
  else if (state.view === 'table') renderTable();
  else if (state.view === 'report') renderReport();
}

function showToast(message, kind = '') {
  const toast = document.createElement('div'); toast.className = `toast ${kind}`; const mark = document.createElement('span'); mark.className = 'icon'; mark.innerHTML = icon(kind === 'error' ? 'close' : kind === 'success' ? 'check' : 'command'); const copy = document.createElement('span'); copy.textContent = message; toast.append(mark, copy); $('#toast-region').replaceChildren(toast); setTimeout(() => toast.remove(), 3200);
}

function updateSummary() {
  if (!state.doc) return;
  state.doc.summary = { ...(state.doc.summary || {}), detected_sampled_frames: state.doc.frames.filter((frame) => frame.detections.length).length, total_boxes: state.doc.frames.reduce((total, frame) => total + frame.detections.length, 0) };
  state.doc.annotation_status = state.doc.frames.some((frame) => frame.review_status !== 'unreviewed') ? 'review_in_progress' : 'machine_generated_unreviewed';
}

function saveJson() {
  if (!state.doc) return;
  updateSummary();
  state.doc.review = {
    ...(state.doc.review || {}),
    tool: 'Thermal Audit Desk',
    schema_version: 1,
    source_label_file: state.sourceJsonName,
    started_at_utc: state.doc.review?.started_at_utc || new Date().toISOString(),
    updated_at_utc: new Date().toISOString(),
    reviewed_frame_count: state.doc.frames.filter((frame) => frame.review_status !== 'unreviewed').length,
  };
  const payload = JSON.stringify(state.doc, null, 2);
  const blob = new Blob([payload], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  const sourceName = state.sourceJsonName || state.videoFile?.name || 'thermal-audit';
  const baseName = sourceName.replace(/_reviewed(?=\.json$)/i, '').replace(/\.[^.]+$/i, '');
  anchor.href = url;
  anchor.download = `${baseName}_reviewed.json`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
  state.dirty = false;
  updateRecoveryStatus('Saved locally');
  scheduleRecoveryCheckpoint({ immediate: true });
  showToast('Reviewed JSON downloaded', 'success');
}

async function handleFiles(fileList) {
  const files = [...fileList]; const json = files.find((file) => file.name.toLowerCase().endsWith('.json')); const video = files.find((file) => file.type.startsWith('video/') || /\.(mp4|mov|webm|m4v)$/i.test(file.name));
  if (!json && !video) return showToast('Choose a label JSON or video file', 'error');
  const preserveRecoveredReport = Boolean(video && !json && state.recoveryRestored);
  const importStartedAt = performance.now();
  const importKind = json && video ? 'json+video' : json ? 'json' : 'video';
  $('#save-state').textContent = json ? 'Reading label JSON' : 'Loading video';
  if (json) {
    try {
      const raw = JSON.parse(await json.text());
      state.doc = normalizeDocument(raw);
      if (!state.doc.frames.length) throw new Error('Label JSON contains no frames');
      state.sourceJsonName = json.name;
      state.recoveryRestored = false;
      state.recoveryVideo = null;
      state.frameIndex = Math.max(0, state.doc.frames.findIndex((frame) => frame.detections.length));
      state.selectedDetection = state.doc.frames[state.frameIndex]?.detections.length ? 0 : null;
      state.annotationTool = 'select';
      resetBatchErase(activeClip());
      state.history = [];
      state.future = [];
      state.tableSelection.clear();
      state.windows = [];
      state.selectedWindow = null;
      state.dirty = false;
      resetClipThumbnails();
      if (!video && state.videoFile && !videoMatchesDocument()) detachVideo();
      if (state.videoFile && videoMatchesDocument()) {
        const attachedVideo = $('#frame-video');
        reconcileDocumentVideo(state.doc, Number(attachedVideo.duration), attachedVideo.videoWidth, attachedVideo.videoHeight);
      }
      resetReportClips();
      buildWindows();
    } catch (error) {
      console.error(error);
      document.body.dataset.importMs = String(Math.max(0, Math.round(performance.now() - importStartedAt)));
      document.body.dataset.importKind = importKind;
      document.body.dataset.importResult = 'failed';
      $('#save-state').textContent = 'Import failed';
      return showToast('That JSON file could not be parsed or has no frames', 'error');
    }
  }
  let videoReady = true;
  const videoOnlyImport = Boolean(video && !json && !preserveRecoveredReport && (!state.sourceJsonName || state.sourceJsonName === 'demo-labels.json'));
  if (video) videoReady = await attachVideo(video, { createVideoDocument: videoOnlyImport, preserveReport: preserveRecoveredReport });
  renderAll();
  document.body.dataset.importMs = String(Math.max(0, Math.round(performance.now() - importStartedAt)));
  document.body.dataset.importKind = importKind;
  document.body.dataset.importResult = video && !videoReady ? 'failed' : 'complete';
  scheduleRecoveryCheckpoint({ immediate: true });
  if (video && !videoReady) return showToast('Video could not be loaded. Check that it is a playable MP4, MOV, or WebM.', 'error');
  const mismatch = Boolean(video && !videoMatchesDocument());
  if (state.videoFile) {
    const userJsonReady = Boolean(state.sourceJsonName && state.sourceJsonName !== 'demo-labels.json');
    $('#save-state').textContent = mismatch ? 'Check source video' : userJsonReady ? 'Files ready' : 'Video ready';
    const frameReady = state.videoSeekPromise || syncVideoToFrame($('#frame-video'), currentFrame());
    void frameReady?.then((ready) => { if (ready) scheduleClipThumbnails(); });
  } else {
    $('#save-state').textContent = 'Label JSON loaded';
  }
  if (mismatch) showToast('Video loaded, but its filename does not match source_video in the JSON', 'error');
  else if (json && !video && !state.videoFile) showToast('Label JSON loaded. Add the matching video when ready.', 'success');
  else if (video) showToast(`Video loaded (${formatClipClock(Number($('#frame-video').duration) || reportDurationSec())})`, 'success');
  else showToast('Label JSON and video are ready', 'success');
}

function fileNameOnly(value) {
  return String(value || '').split(/[\\/]/).pop().trim().toLowerCase();
}

function expectedVideoFileName() {
  if (state.sourceJsonName === 'demo-labels.json') return '';
  return fileNameOnly(state.doc?.source_video || state.doc?.video?.source_video || '');
}

function expectedVideoFileNames() {
  if (state.sourceJsonName === 'demo-labels.json') return [];
  const values = [
    state.doc?.source_video,
    state.doc?.video?.source_video,
    state.doc?.rendered_video,
    state.doc?.video?.rendered_video,
    state.doc?.outputs?.renderedVideo,
    state.doc?.outputs?.renderedVideoInfo?.path,
  ].map(fileNameOnly).filter(Boolean);
  return [...new Set(values)];
}

function comparableVideoStem(value) {
  return fileNameOnly(value).replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/g, '');
}

function videoMatchesDocument(file = state.videoFile) {
  const expectedNames = expectedVideoFileNames();
  if (!expectedNames.length || !file) return true;
  const actualName = fileNameOnly(file.name);
  if (expectedNames.includes(actualName)) return true;
  const actualStem = comparableVideoStem(actualName);
  if (actualStem.length < 12) return false;
  return expectedNames.some((name) => {
    const expectedStem = comparableVideoStem(name);
    return expectedStem.length >= 12 && (actualStem.includes(expectedStem) || expectedStem.includes(actualStem));
  });
}

function clearVideoCanvas() {
  const canvas = $('#frame-canvas');
  if (!canvas) return;
  canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
  canvas.hidden = true;
}

function detachVideo() {
  cancelClipDetection();
  stopVideoFramePrefetch();
  clearVideoPrefetchDecoders();
  state.videoAttachmentToken += 1;
  state.videoSeekToken += 1;
  state.videoSeekAbortController?.abort();
  state.videoSeekAbortController = null;
  state.videoSeekPromise = null;
  state.videoTargetTime = null;
  state.videoDisplayedTime = null;
  state.videoRequestedTime = null;
  clearVideoFrameCache();
  stopPlayback(false);
  clearTimeout(state.clipThumbnailTimer);
  state.clipThumbnailTimer = null;
  resetClipThumbnails();
  const video = $('#frame-video');
  video?.pause();
  video?.removeAttribute('src');
  video?.load();
  if (state.videoUrl) URL.revokeObjectURL(state.videoUrl);
  state.videoFile = null;
  state.videoUrl = '';
  state.recoveryVideo = null;
  state.report.captures = [];
  state.report.baseImages = {};
  clearVideoCanvas();
  setVideoSeeking(false);
}

async function attachVideo(file, { createVideoDocument = false, preserveReport = false } = {}) {
  detachVideo();
  state.videoFile = file;
  state.videoUrl = URL.createObjectURL(file);
  const attachmentToken = ++state.videoAttachmentToken;
  state.videoTargetTime = null;
  state.videoDisplayedTime = null;
  state.videoRequestedTime = null;
  state.report.captures = [];
  state.report.baseImages = {};
  setVideoSeeking(true);
  const video = $('#frame-video');
  const canvas = $('#frame-canvas');
  $('#frame-image').style.display = 'none';
  video.style.display = 'block';
  canvas.hidden = false;
  $('#stage-empty').hidden = true;
  video.src = state.videoUrl;
  video.load();
  try {
    await waitForVideoMetadata(video);
    if (attachmentToken !== state.videoAttachmentToken) return false;
    const duration = Number(video.duration);
    state.videoFrameCacheLimit = frameCacheLimitForSize(video.videoWidth, video.videoHeight);
    if (createVideoDocument) {
      state.doc = createVideoOnlyDocument(file, duration, video.videoWidth, video.videoHeight);
      state.sourceJsonName = '';
      state.frameIndex = 0;
      state.selectedDetection = null;
      state.annotationTool = 'select';
      resetBatchErase(activeClip());
      state.history = [];
      state.future = [];
      state.tableSelection.clear();
      state.windows = [];
      state.selectedWindow = null;
      state.dirty = false;
      resetClipThumbnails();
    } else {
      const clipRangesChanged = reconcileDocumentVideo(state.doc, duration, video.videoWidth, video.videoHeight);
      if (clipRangesChanged) resetClipThumbnails();
    }
    state.recoveryVideo = {
      name: file.name,
      type: file.type || '',
      size: Number(file.size) || 0,
      lastModified: Number(file.lastModified) || 0,
      duration: Number(duration) || 0,
    };
    if (!preserveReport || !state.report.clips.length) resetReportClips();
    else {
      state.report.captures = [];
      state.report.baseImages = {};
    }
    state.recoveryRestored = false;
    buildWindows();
    return true;
  } catch (error) {
    if (attachmentToken !== state.videoAttachmentToken) return false;
    console.error(error);
    detachVideo();
    showVideoError('Video could not be decoded');
    return false;
  }
}

function scheduleClipThumbnails(delay = 1200) {
  clearTimeout(state.clipThumbnailTimer);
  state.clipThumbnailTimer = setTimeout(() => {
    state.clipThumbnailTimer = null;
    void prepareClipThumbnails();
  }, delay);
}

function addHeatmapWindow() {
  if (!state.doc) return;
  const frame = currentFrame(); const clipIndex = frame?.clip_index ?? 0; const clip = state.doc.clips?.[clipIndex]; const localStart = Math.max(0, Math.floor(frameClipTime(frame) / 10) * 10); const start = (clip?.start_sec || 0) + localStart; const end = Math.min(clip?.end_sec || durationSec(), start + 10); const window = { id: `manual-${Date.now()}`, clipIndex, localStart, start, end, frames: state.doc.frames.filter((candidate) => frameTimeline(candidate) >= start && frameTimeline(candidate) <= end), boxes: 0 }; window.boxes = window.frames.reduce((sum, candidate) => sum + candidate.detections.length, 0); state.windows.push(window); state.windows.sort((a, b) => a.start - b.start); state.selectedWindow = window.id; renderHeatmap(); showToast('Heatmap window added', 'success'); }

function deleteHeatmapWindow() { if (!state.selectedWindow) return; state.windows = state.windows.filter((window) => window.id !== state.selectedWindow); state.selectedWindow = state.windows[0]?.id || null; renderHeatmap(); showToast('Heatmap window removed', 'success'); }

function openShortcuts() { $('#shortcut-dialog').hidden = false; }
function closeShortcuts() { $('#shortcut-dialog').hidden = true; }

function bindEvents() {
  $$('[data-view]').forEach((button) => button.addEventListener('click', () => { state.view = button.dataset.view; renderAll(); scheduleRecoveryCursor(); }));
  $$('[data-action]').forEach((button) => button.addEventListener('click', () => {
    const action = button.dataset.action;
    if (action === 'open-json') $('#json-input').click();
    else if (action === 'open-video') $('#video-input').click();
    else if (action === 'save-json') saveJson();
    else if (action === 'undo') undo();
    else if (action === 'redo') redo();
    else if (action === 'toggle-boxes') toggleBoxes();
    else if (action === 'toggle-flag') toggleFlag();
    else if (action === 'previous-frame') setFrame(state.frameIndex - 1);
    else if (action === 'next-frame') setFrame(state.frameIndex + 1);
    else if (action === 'toggle-play') togglePlayback();
    else if (action === 'annotation-tool') setAnnotationTool(button.dataset.tool);
    else if (action === 'delete-box') deleteSelectedBox();
    else if (action === 'clear-erase-regions') clearBatchEraseRegions();
    else if (action === 'apply-batch-erase') applyBatchErase();
    else if (action === 'accept-next') markFrame('accepted', true);
    else if (action === 'mark-edited') markFrame('edited');
    else if (action === 'fullscreen') $('#frame-stage').requestFullscreen?.();
    else if (action === 'detect-clips') void detectVideoClips();
    else if (action === 'add-clip') addDocumentClip();
    else if (action === 'merge-clips') mergeSelectedClips();
    else if (action === 'open-clip-dialog') openClipDialog();
    else if (action === 'close-clip-dialog') closeClipDialog();
    else if (action === 'apply-clip-cuts' && !applyDocumentClipCuts($('#clip-cuts-input').value)) showToast('Enter clip starts inside the source video duration', 'error');
    else if (action === 'generate-heatmap') { state.heatmapCache.clear(); renderHeatmap(); showToast('Clip heatmap regenerated', 'success'); }
    else if (action === 'add-window') addHeatmapWindow();
    else if (action === 'delete-window') deleteHeatmapWindow();
    else if (action === 'delete-selected') deleteSelectedRows();
    else if (action === 'prepare-report') void prepareReportMedia();
    else if (action === 'print-report') void printReport();
    else if (action === 'print-report-batch') void printReportBatch();
    else if (action === 'select-all-report-clips') selectAllReportClips();
    else if (action === 'focus-report-clip') reportFocusSection();
    else if (action === 'show-shortcuts') openShortcuts();
    else if (action === 'close-shortcuts') closeShortcuts();
  }));
  $('#json-input').addEventListener('change', async (event) => { const files = [...(event.target.files || [])]; event.target.value = ''; await handleFiles(files); });
  $('#video-input')?.addEventListener('change', async (event) => { const video = event.target.files?.[0]; event.target.value = ''; if (video) await handleFiles([video]); });
  const frameVideo = $('#frame-video');
  frameVideo.addEventListener('loadedmetadata', () => {
    const frameReady = renderFrame();
    if (state.view === 'heatmap') {
      if (frameReady?.then) void frameReady.then(() => renderHeatmapFrameOnly());
      else renderHeatmapFrameOnly();
    }
    if (state.view === 'report') renderReport();
  });
  frameVideo.addEventListener('seeking', () => setVideoSeeking(true));
  frameVideo.addEventListener('error', () => { if (state.videoFile) showVideoError('Video could not be decoded'); });
  $('#timeline-slider').addEventListener('input', (event) => setFrame(Number(event.target.value)));
  const videoTimeSlider = $('#video-time-slider');
  const commitVideoTime = (value) => {
    const time = Math.max(0, Number(value) || 0);
    clearTimeout(state.videoTimeScrubTimer);
    clearTimeout(state.clipTimeScrubTimer);
    state.videoTimeScrubTimer = null;
    state.clipTimeScrubTimer = null;
    const index = nearestFrameIndexAtTimeline(time);
    if (index >= 0) setFrame(index);
  };
  videoTimeSlider?.addEventListener('input', (event) => {
    const time = Number(event.target.value) || 0;
    updateVideoTimebar(time);
    clearTimeout(state.clipTimeScrubTimer);
    clearTimeout(state.videoTimeScrubTimer);
    state.videoTimeScrubTimer = setTimeout(() => commitVideoTime(time), 70);
  });
  videoTimeSlider?.addEventListener('change', (event) => commitVideoTime(event.target.value));
  const clipTimeSlider = $('#clip-time-slider');
  const commitClipTime = (value, clip = activeClip()) => {
    if (!clip) return;
    const start = Math.max(0, Number(clip.start_sec) || 0);
    const target = clipTimebarPosition(clip, start + Math.max(0, Number(value) || 0)).timeline;
    clearTimeout(state.clipTimeScrubTimer);
    clearTimeout(state.videoTimeScrubTimer);
    state.clipTimeScrubTimer = null;
    state.videoTimeScrubTimer = null;
    const index = nearestFrameIndexAtTimeline(target, clip);
    if (index >= 0) setFrame(index);
  };
  clipTimeSlider?.addEventListener('input', (event) => {
    const clip = activeClip();
    if (!clip) return;
    const start = Math.max(0, Number(clip.start_sec) || 0);
    const localTime = Math.max(0, Number(event.target.value) || 0);
    const target = clipTimebarPosition(clip, start + localTime).timeline;
    updateVideoTimebar(target);
    clearTimeout(state.videoTimeScrubTimer);
    clearTimeout(state.clipTimeScrubTimer);
    state.clipTimeScrubTimer = setTimeout(() => commitClipTime(localTime, clip), 70);
  });
  clipTimeSlider?.addEventListener('change', (event) => commitClipTime(event.target.value));
  const heatmapVideoTimeSlider = $('#heatmap-video-time-slider');
  const commitHeatmapVideoTime = (value) => {
    const time = Math.max(0, Number(value) || 0);
    clearTimeout(state.videoTimeScrubTimer);
    clearTimeout(state.clipTimeScrubTimer);
    state.videoTimeScrubTimer = null;
    state.clipTimeScrubTimer = null;
    const index = nearestFrameIndexAtTimeline(time);
    if (index >= 0) setFrame(index);
  };
  heatmapVideoTimeSlider?.addEventListener('input', (event) => {
    const time = Number(event.target.value) || 0;
    updateHeatmapTimebars(time);
    clearTimeout(state.clipTimeScrubTimer);
    clearTimeout(state.videoTimeScrubTimer);
    state.videoTimeScrubTimer = setTimeout(() => commitHeatmapVideoTime(time), 55);
  });
  heatmapVideoTimeSlider?.addEventListener('change', (event) => commitHeatmapVideoTime(event.target.value));
  const heatmapClipTimeSlider = $('#heatmap-clip-time-slider');
  const commitHeatmapClipTime = (value, clip = activeClip()) => {
    if (!clip) return;
    const start = Math.max(0, Number(clip.start_sec) || 0);
    const target = clipTimebarPosition(clip, start + Math.max(0, Number(value) || 0)).timeline;
    clearTimeout(state.clipTimeScrubTimer);
    clearTimeout(state.videoTimeScrubTimer);
    state.clipTimeScrubTimer = null;
    state.videoTimeScrubTimer = null;
    const index = nearestFrameIndexAtTimeline(target, clip);
    if (index >= 0) setFrame(index);
  };
  heatmapClipTimeSlider?.addEventListener('input', (event) => {
    const clip = activeClip();
    if (!clip) return;
    const start = Math.max(0, Number(clip.start_sec) || 0);
    const localTime = Math.max(0, Number(event.target.value) || 0);
    const target = clipTimebarPosition(clip, start + localTime).timeline;
    updateHeatmapTimebars(target);
    clearTimeout(state.videoTimeScrubTimer);
    clearTimeout(state.clipTimeScrubTimer);
    state.clipTimeScrubTimer = setTimeout(() => commitHeatmapClipTime(localTime, clip), 55);
  });
  heatmapClipTimeSlider?.addEventListener('change', (event) => commitHeatmapClipTime(event.target.value));
  const reportVideoTimeSlider = $('#report-video-time-slider');
  const commitReportVideoTime = (value) => {
    const time = Math.max(0, Number(value) || 0);
    clearTimeout(state.videoTimeScrubTimer);
    clearTimeout(state.clipTimeScrubTimer);
    state.videoTimeScrubTimer = null;
    state.clipTimeScrubTimer = null;
    const index = nearestFrameIndexAtTimeline(time);
    if (index >= 0) setFrame(index);
  };
  reportVideoTimeSlider?.addEventListener('input', (event) => {
    const time = Number(event.target.value) || 0;
    updateReportTimebars(time, { syncSelection: true });
    clearTimeout(state.clipTimeScrubTimer);
    clearTimeout(state.videoTimeScrubTimer);
    state.videoTimeScrubTimer = setTimeout(() => commitReportVideoTime(time), 55);
  });
  reportVideoTimeSlider?.addEventListener('change', (event) => commitReportVideoTime(event.target.value));
  const reportClipTimeSlider = $('#report-clip-time-slider');
  const commitReportClipTime = (value, clip = reportSelectedClip()) => {
    if (!clip) return;
    const start = Math.max(0, Number(clip.start_sec) || 0);
    const target = clipTimebarPosition(clip, start + Math.max(0, Number(value) || 0)).timeline;
    clearTimeout(state.clipTimeScrubTimer);
    clearTimeout(state.videoTimeScrubTimer);
    state.clipTimeScrubTimer = null;
    state.videoTimeScrubTimer = null;
    const index = nearestFrameIndexAtTimeline(target);
    if (index >= 0) setFrame(index);
  };
  reportClipTimeSlider?.addEventListener('input', (event) => {
    const clip = reportSelectedClip();
    if (!clip) return;
    const start = Math.max(0, Number(clip.start_sec) || 0);
    const localTime = Math.max(0, Number(event.target.value) || 0);
    const target = clipTimebarPosition(clip, start + localTime).timeline;
    updateReportTimebars(target);
    clearTimeout(state.videoTimeScrubTimer);
    clearTimeout(state.clipTimeScrubTimer);
    state.clipTimeScrubTimer = setTimeout(() => commitReportClipTime(localTime, clip), 55);
  });
  reportClipTimeSlider?.addEventListener('change', (event) => commitReportClipTime(event.target.value));
  ['start', 'end'].forEach((bound) => {
    const slider = $(`#batch-erase-${bound}-slider`);
    const input = $(`#batch-erase-${bound}-time`);
    slider?.addEventListener('input', (event) => setBatchEraseTime(bound, event.target.value));
    input?.addEventListener('change', (event) => setBatchEraseTime(bound, event.target.value, { parse: true }));
    input?.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      if (setBatchEraseTime(bound, event.target.value, { parse: true })) event.target.blur();
    });
  });
  $('#frame-stage').addEventListener('pointerdown', startCanvasGesture); $('#frame-stage').addEventListener('pointermove', moveGesture); $('#frame-stage').addEventListener('pointerup', endGesture); $('#frame-stage').addEventListener('pointercancel', endGesture);
  $('#frame-stage').addEventListener('dragover', (event) => { event.preventDefault(); });
  $('#frame-stage').addEventListener('drop', (event) => { event.preventDefault(); if (event.dataTransfer?.files?.length) handleFiles(event.dataTransfer.files); });
  $('#table-status-filter').addEventListener('change', (event) => { state.tableFilter = event.target.value; state.tableSelection.clear(); renderTable(); }); $('#table-search').addEventListener('input', (event) => { state.tableQuery = event.target.value; renderTable(); }); $('#table-select-all').addEventListener('change', (event) => { const checked = event.target.checked; const visible = flattenLabels().slice(0, 1000); visible.forEach((row) => checked ? state.tableSelection.add(row.key) : state.tableSelection.delete(row.key)); $$('#label-table-body tr').forEach((row) => row.classList.toggle('is-selected', checked)); $$('#label-table-body input[type="checkbox"]').forEach((checkbox) => { checkbox.checked = checked; }); $('#delete-selected-button').disabled = state.tableSelection.size === 0; });
  const reportFields = { '#report-tenderer': 'tenderer', '#report-date': 'demonstrationDate', '#report-tp': 'tp', '#report-fp': 'fp', '#report-up': 'up', '#report-iou': 'iou' };
  Object.entries(reportFields).forEach(([selector, key]) => $(selector).addEventListener('input', (event) => { state.report[key] = event.target.value; markDirty(); renderReportIdentity(); renderReportMetrics(); renderReportSummaryPages(); }));
  $('#report-clip-cuts').addEventListener('change', (event) => { if (applyReportClipCuts(event.target.value)) renderReport(); });
  $('#report-compliance-controls').addEventListener('change', (event) => { const id = event.target.dataset.compliance; if (!id) return; state.report.compliance[id] = event.target.checked; markDirty(); renderReportCompliance(); renderReportSummaryPages(); });
  $('#clip-dialog').addEventListener('click', (event) => { if (event.target.id === 'clip-dialog') closeClipDialog(); });
  $('#shortcut-dialog').addEventListener('click', (event) => { if (event.target.id === 'shortcut-dialog') closeShortcuts(); });
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('keyup', handleKeyup);
  window.addEventListener('blur', () => stopHeldFrameNavigation({ resumePrefetch: false }));
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'hidden') return;
    stopHeldFrameNavigation({ resumePrefetch: false });
    saveRecoveryCursorNow();
    if (state.recoveryRevision > state.recoverySavedRevision) void persistRecoveryCheckpoint();
  });
  window.addEventListener('pagehide', () => {
    saveRecoveryCursorNow();
    if (state.recoveryRevision > state.recoverySavedRevision) void persistRecoveryCheckpoint();
  });
}

function handleKeydown(event) {
  if (!$('#clip-dialog').hidden) { if (event.key === 'Escape') closeClipDialog(); return; }
  if (!$('#shortcut-dialog').hidden) { if (event.key === 'Escape') closeShortcuts(); return; }
  if (event.ctrlKey && event.key.toLowerCase() === 'z') { event.preventDefault(); return undo(); } if (event.ctrlKey && event.key.toLowerCase() === 'y') { event.preventDefault(); return redo(); } if (event.ctrlKey && event.key.toLowerCase() === 's') { event.preventDefault(); return saveJson(); }
  const target = event.target; const typing = target.matches?.('input, textarea, select, button'); if (event.key === '?' && !typing) return openShortcuts(); if (typing) return;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); startFrameKeyNavigation(event); } else if (event.key === 'ArrowUp' || event.key === 'w') { event.preventDefault(); selectDetection((state.selectedDetection ?? 0) - 1); } else if (event.key === 'ArrowDown' || event.key === 's') { event.preventDefault(); selectDetection((state.selectedDetection ?? -1) + 1); } else if (event.key === 'Enter') { event.preventDefault(); markFrame('accepted', true); } else if (event.key === 'Delete') { event.preventDefault(); deleteSelectedBox(); } else if (event.key === ' ') { event.preventDefault(); togglePlayback(); } else if (event.key.toLowerCase() === 'b') { toggleBoxes(); } else if (event.key.toLowerCase() === 'f') { toggleFlag(); } else if (event.key === 'Escape') { state.annotationTool = 'select'; state.gesture = null; renderAll(); }
}

async function boot() {
  installIcons(); bindEvents();
  try {
    const checkpoint = await readRecoveryCheckpoint();
    if (checkpoint && applyRecoveryCheckpoint(checkpoint)) {
      resetClipThumbnails();
      if (!state.report.clips.length) resetReportClips();
      buildWindows();
      state.annotationTool = 'select';
      resetBatchErase(activeClip());
      renderAll();
      updateRecoveryStatus(state.recoverySavedAt ? `Recovered ${recoverySavedLabel(state.recoverySavedAt).replace('Autosaved ', '')}` : 'Recovered browser backup');
      const videoName = state.recoveryVideo?.name;
      showToast(videoName ? `Recovered browser backup. Re-open ${videoName} to restore video playback.` : 'Recovered browser backup.', 'success');
      return;
    }
  } catch (error) {
    console.warn('Browser recovery checkpoint could not be restored', error);
    try { await deleteRecoveryCheckpoint(); } catch (_deleteError) { /* Ignore cleanup failure. */ }
  }
  try { const response = await fetch('./public/demo-labels.json'); state.doc = normalizeDocument(await response.json()); } catch (_error) { state.doc = normalizeDocument(createDemoDocument()); }
  if (state.sourceJsonName === 'demo-labels.json') state.doc.frames.forEach((frame, index) => { if (index >= 21 && index < 29) frame.review_status = 'accepted'; else if (index >= 29 && index < 33) frame.review_status = 'edited'; });
  state.frameIndex = Math.max(0, state.doc.frames.findIndex((frame) => frame.detections.length)); state.selectedDetection = state.doc.frames[state.frameIndex]?.detections.length ? 0 : null; state.annotationTool = 'select'; resetBatchErase(activeClip()); resetReportClips(); buildWindows(); renderAll();
}

boot();
