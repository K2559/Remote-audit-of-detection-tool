import {
  categories, clipKey, compareClipNames, formatTime, isAnalysisCsv, newClip, parseTime, readResults,
  reportHeader, reportRows, reviewCsvIssue, sortedEvents, writeResults,
} from './model.mjs';

const $ = (id) => document.getElementById(id);
const player = $('video');
const state = {
  clips: [], active: null, source: '', videoUrl: '', editor: null,
  changed: false, importing: false, pendingSeek: null,
};

function element(tag, label, className) {
  const node = document.createElement(tag);
  node.textContent = label;
  if (className) node.className = className;
  return node;
}

function button(label, className, action) {
  const node = element('button', label, className);
  node.type = 'button';
  node.addEventListener('click', action);
  return node;
}

function notice(message = '', error = false) {
  const node = $('notice');
  node.textContent = message;
  node.hidden = !message;
  node.classList.toggle('error', error);
}

function isVideo(file) {
  return file.type.startsWith('video/') || /\.(mp4|mov|m4v|webm|ogv|mkv|avi)$/i.test(file.name);
}

function setFile(clip, file) {
  clip.file = file;
  clip.duration = null;
}

async function readResultCsv(csvFiles) {
  if (!csvFiles.length) return null;
  const analysisFiles = csvFiles.filter((file) => isAnalysisCsv(file.name));
  const analysis = analysisFiles.length > 0;
  const parsed = [];
  let firstError;
  for (const file of analysis ? analysisFiles : csvFiles) {
    try {
      parsed.push({ file, clips: readResults(await file.text(), { analysis }) });
    } catch (error) {
      firstError ??= error;
    }
  }
  if (!parsed.length) throw (firstError || new Error('No compatible RodentVision report CSV was found.'));
  if (parsed.length === 1) return parsed[0];
  const preferred = parsed.filter(({ file }) => /(report|result|analysis)/i.test(file.name));
  if (preferred.length === 1) return preferred[0];
  throw new Error('Found multiple compatible CSV files. Choose the analysis or report CSV separately.');
}

async function importFiles(files) {
  if (state.importing || !files.length) return;
  const csvFiles = files.filter((file) => /\.csv$/i.test(file.name));
  const videos = files.filter(isVideo);
  if (!(csvFiles.length || videos.length)) {
    notice('Choose a RodentVision CSV, source videos, or an output folder.', true);
    return;
  }

  state.importing = true;
  $('open-files').disabled = true;
  $('open-folder').disabled = true;
  try {
    const result = await readResultCsv(csvFiles);
    const csv = result?.file;
    if (result) {
      const clips = result.clips;
      if (state.changed && !window.confirm('Replace the current audit with this CSV?')) return;
      const previous = new Map(state.clips.map((clip) => [clip.key, clip]));
      for (const clip of clips) {
        const match = previous.get(clip.key);
        if (match?.file) setFile(clip, match.file);
      }
      for (const clip of state.clips) {
        if (clip.file && !clips.some((candidate) => candidate.key === clip.key)) {
          const extra = newClip(clip.file.name);
          setFile(extra, clip.file);
          clips.push(extra);
        }
      }
      state.clips = clips;
      state.source = csv.name;
      state.changed = false;
    }

    const matches = new Map();
    for (const file of videos) {
      const key = clipKey(file.name);
      const group = matches.get(key) ?? [];
      group.push(file);
      matches.set(key, group);
    }

    const conflicts = [];
    for (const [key, group] of matches) {
      const clip = state.clips.find((item) => item.key === key);
      if (group.length > 1 || (clip?.file && clip.file.name !== group[0].name)) {
        conflicts.push(group.map((file) => file.name).join(', '));
        continue;
      }
      const target = clip ?? newClip(group[0].name);
      setFile(target, group[0]);
      if (!clip) state.clips.push(target);
    }

    $('source-name').textContent = state.source
      || 'Files stay in this browser. Choose the detector output folder to load its CSV and videos.';
    notice(conflicts.length ? 'More than one video matches a clip. Use Attach video to choose: ' + conflicts.join(' / ') : '', !!conflicts.length);
    const active = state.clips.find((clip) => clip.key === state.active?.key);
    selectClip((csv && !active?.file
      ? state.clips.find((clip) => clip.file) : active) ?? state.clips[0]);
  } catch (error) {
    notice(error.message, true);
  } finally {
    state.importing = false;
    $('open-files').disabled = false;
    $('open-folder').disabled = false;
  }
}

function renderClips() {
  const list = $('clips');
  $('clip-count').textContent = state.clips.length;
  list.replaceChildren();
  for (const clip of [...state.clips].sort(compareClipNames)) {
    const row = button('', 'clip-row', () => {
      if (clip !== state.active) {
        selectClip(clip);
        document.querySelector('.clip-row[aria-pressed="true"]')?.focus();
      }
    });
    row.setAttribute('aria-pressed', clip === state.active);
    const status = [clip.reviewed ? 'Reviewed' : 'Pending', clip.file ? '' : 'Video missing'].filter(Boolean).join(' · ');
    row.append(element('strong', clip.name), element('small', status));
    list.append(row);
  }
}

function selectClip(clip) {
  state.active = clip;
  state.pendingSeek = null;
  closeEditor();
  refresh();
  player.pause();
  if (state.videoUrl) URL.revokeObjectURL(state.videoUrl);
  state.videoUrl = clip?.file ? URL.createObjectURL(clip.file) : '';
  player.hidden = true;
  $('video-empty').hidden = false;
  $('video-message').textContent = state.videoUrl ? 'Loading video…' : 'Attach ' + (clip?.name ?? 'a video') + ' to start playback';
  $('player-title').textContent = clip?.file?.name || 'Source video';
  $('attach-video').hidden = !clip;
  $('attach-video').textContent = clip?.file ? 'Replace video' : 'Attach video';
  if (state.videoUrl) player.src = state.videoUrl;
  else player.removeAttribute('src');
  player.load();
  updatePlayback();
  renderEvents();
}

function updatePlayback() {
  const ready = !player.hidden && Number.isFinite(player.duration);
  $('clock').textContent = ready ? formatTime(player.currentTime) + ' / ' + formatTime(player.duration) : '00:00 / —';
  for (const id of ['back', 'forward', 'use-time']) $(id).disabled = !ready;
}

function seek(time) {
  if (!state.active?.file) {
    notice('Attach the matching video to jump to the event.', true);
    return;
  }
  if (player.error) return;
  if (player.readyState < 1) {
    state.pendingSeek = time;
    return;
  }
  player.pause();
  player.currentTime = Math.max(0, Math.min(time, player.duration));
}

function renderEvents() {
  const clip = state.active;
  const events = clip ? sortedEvents(clip) : [];
  $('event-count').textContent = events.length;
  $('events-empty').hidden = !!events.length;
  $('events-empty').textContent = clip ? 'No events for this clip.' : 'Select a clip to review its timestamps.';
  $('add-event').hidden = !clip;
  $('toggle-review').disabled = !clip;
  $('toggle-review').textContent = clip?.reviewed ? 'Reopen clip' : 'Mark clip reviewed';
  const list = $('events');
  list.replaceChildren();
  for (const event of events) {
    const item = element('div', '', 'event-row');
    const outOfRange = clip.duration !== null && event.time >= clip.duration;
    const jump = button(formatTime(event.time), 'event-time', () => seek(event.time));
    jump.setAttribute('aria-label', 'Jump to ' + formatTime(event.time));
    jump.disabled = outOfRange;
    const info = element('div', '', 'event-info');
    info.append(element('strong', categories[event.category] || 'Type unspecified'));
    if (outOfRange) info.append(element('small', 'Outside video duration', 'invalid-time'));
    else if (event.originalTime !== null && event.time !== event.originalTime) {
      info.append(element('small', 'Was ' + formatTime(event.originalTime)));
    }
    const edit = button('Edit', 'button compact', () => openEditor(event));
    edit.setAttribute('aria-label', 'Edit event at ' + formatTime(event.time));
    item.append(jump, info, edit);
    list.append(item);
  }
}

function playheadTime() {
  const maxMs = Math.max(0, Math.ceil(player.duration * 1000) - 1);
  return Math.min(Math.round(player.currentTime * 1000), maxMs) / 1000;
}

function openEditor(event = null) {
  state.editor = { event };
  $('event-editor').hidden = false;
  $('editor-title').textContent = event ? 'Edit event' : 'Add event';
  $('event-time').value = event ? formatTime(event.time) : player.hidden ? '' : formatTime(playheadTime());
  $('event-type').value = event?.category ?? '';
  $('remove-event').hidden = !event;
  $('editor-error').hidden = true;
  $('event-time').focus();
}

function closeEditor() {
  state.editor = null;
  $('event-editor').hidden = true;
  $('editor-error').hidden = true;
}

function finishEdit(focusTime) {
  closeEditor();
  state.changed = true;
  notice();
  refresh();
  const edit = [...$('events').querySelectorAll('button')].find((node) =>
    node.getAttribute('aria-label') === 'Edit event at ' + focusTime);
  (edit || $('add-event')).focus();
}

function invalidClip(clips) {
  return clips.find((clip) => clip.duration !== null && clip.events.some((event) => event.time >= clip.duration));
}

function refresh() {
  renderClips();
  renderEvents();
  const hasClips = !!state.clips.length;
  $('report-tab').disabled = !hasClips;
  $('export-format').disabled = !hasClips;
  $('download').disabled = !hasClips;
  if (!$('report-view').hidden) renderReport();
}

function renderReport() {
  const stack = $('report-pages');
  $('print-report').disabled = true;
  try {
    renderReportPages(stack);
    $('print-report').disabled = false;
  } catch (error) {
    stack.replaceChildren();
    notice('Could not build the report preview. Open Report again to retry.', true);
    console.error('Report preview failed:', error);
  }
}

function renderReportPages(stack) {
  const master = $('report-page').content.firstElementChild.cloneNode(true);
  master.querySelectorAll('th').forEach((cell, index) => {
    cell.textContent = reportHeader[index];
  });
  master.querySelector('footer').textContent = 'Page 1 of 1';

  // Measure at actual A4 size so the same page breaks apply on screen and in the PDF.
  const measure = master.cloneNode(true);
  measure.classList.add('report-measure');
  measure.setAttribute('aria-hidden', 'true');
  const body = measure.querySelector('tbody');

  for (const [clip, times] of reportRows(state.clips)) {
    const lines = times.split('\n');
    for (let start = 0; start < lines.length; start += 16) {
      const name = start ? clip + ' (continued)' : clip;
      body.insertRow().append(element('td', name), element('td', lines.slice(start, start + 16).join('\n')));
    }
  }

  stack.replaceChildren(measure);
  const header = measure.querySelector('thead').getBoundingClientRect().height;
  const available = measure.querySelector('.report-sheet-body').getBoundingClientRect().height - header - 2;
  const pages = [[]];
  let used = 0;
  for (const row of body.rows) {
    const height = row.getBoundingClientRect().height;
    if (used && used + height > available) {
      pages.push([]);
      used = 0;
    }
    pages.at(-1).push(row);
    used += height;
  }

  const sheets = pages.map((rows, index) => {
    const sheet = master.cloneNode(true);
    sheet.querySelector('tbody').append(...rows);
    sheet.setAttribute('aria-label', 'A4 page ' + (index + 1));
    sheet.querySelector('footer').textContent = 'Page ' + (index + 1) + ' of ' + pages.length;
    return sheet;
  });
  stack.replaceChildren(...sheets);
}

new ResizeObserver(([entry]) => {
  const width = entry.target.firstElementChild?.offsetWidth;
  if (width && entry.contentRect.width) {
    entry.target.style.setProperty('--report-zoom', Math.min(1, entry.contentRect.width / width));
  }
}).observe($('report-pages'));

function showReport(show) {
  if (show && state.editor) {
    notice('Save or cancel the timestamp edit before opening the report.', true);
    $('event-time').focus();
    return;
  }
  notice();
  $('review-view').hidden = show;
  $('report-view').hidden = !show;
  $('review-tab').setAttribute('aria-current', show ? 'false' : 'page');
  $('report-tab').setAttribute('aria-current', show ? 'page' : 'false');
  if (show) {
    player.pause();
    renderReport();
  }
}

function download() {
  if (state.editor) {
    notice('Save or cancel the timestamp edit before exporting.', true);
    $('event-time').focus();
    return;
  }
  const format = $('export-format').value;
  const clips = format === 'review' ? state.clips.filter((clip) => clip.reviewed) : state.clips;
  const invalid = invalidClip(clips);
  const issue = invalid ? 'Correct timestamps outside the video duration for ' + invalid.name + '.'
    : format === 'review' ? reviewCsvIssue(state.clips) : '';
  if (issue) {
    notice(issue, true);
    return;
  }
  const url = URL.createObjectURL(new Blob([writeResults(state.clips, format)], { type: 'text/csv;charset=utf-8' }));
  const anchor = document.createElement('a');
  anchor.download = (state.source.replace(/\.csv$/i, '') || 'rodentvision') + (format === 'review' ? '-desktop-import.csv' : '-audited.csv');
  anchor.href = url;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  notice('Downloaded ' + anchor.download + '.');
}

$('open-files').addEventListener('click', () => $('files').click());
$('files').addEventListener('change', (event) => {
  void importFiles([...event.target.files]);
  event.target.value = '';
});
$('open-folder').addEventListener('click', () => $('folder').click());
$('folder').addEventListener('change', (event) => {
  void importFiles([...event.target.files]);
  event.target.value = '';
});
$('attach-video').addEventListener('click', () => $('video-file').click());
$('video-file').addEventListener('change', (event) => {
  const file = event.target.files[0];
  event.target.value = '';
  if (!file || !state.active) return;
  if (!isVideo(file)) {
    notice('Choose a video file.', true);
    return;
  }
  notice();
  setFile(state.active, file);
  selectClip(state.active);
});

const dropZone = $('drop-zone');
let dragDepth = 0;
window.addEventListener('dragenter', (event) => {
  if (!event.dataTransfer.types.includes('Files')) return;
  if (!$('review-view').hidden) dropZone.classList.add('dragging');
  dragDepth++;
});
window.addEventListener('dragleave', () => {
  dragDepth = Math.max(0, dragDepth - 1);
  if (!dragDepth) dropZone.classList.remove('dragging');
});
window.addEventListener('dragover', (event) => {
  if (event.dataTransfer.types.includes('Files')) event.preventDefault();
});
window.addEventListener('drop', (event) => {
  if (!event.dataTransfer.files.length) return;
  event.preventDefault();
  dragDepth = 0;
  dropZone.classList.remove('dragging');
  if (!$('review-view').hidden) void importFiles([...event.dataTransfer.files]);
});

player.addEventListener('loadedmetadata', () => {
  if (!state.active || player.currentSrc !== state.videoUrl || !Number.isFinite(player.duration)) return;
  state.active.duration = player.duration;
  player.hidden = false;
  $('video-empty').hidden = true;
  if (state.pendingSeek !== null) {
    seek(state.pendingSeek);
    state.pendingSeek = null;
  }
  updatePlayback();
  renderEvents();
});
player.addEventListener('timeupdate', updatePlayback);
player.addEventListener('error', () => {
  if (!state.videoUrl || player.src !== state.videoUrl) return;
  player.hidden = true;
  $('video-empty').hidden = false;
  $('video-message').textContent = 'This browser could not play the video. Try an H.264 MP4.';
  updatePlayback();
});
$('back').addEventListener('click', () => seek(player.currentTime - 1));
$('forward').addEventListener('click', () => seek(player.currentTime + 1));
$('add-event').addEventListener('click', () => openEditor());
$('use-time').addEventListener('click', () => {
  $('event-time').value = formatTime(playheadTime());
});
$('cancel-edit').addEventListener('click', () => {
  const time = state.editor?.event?.time;
  closeEditor();
  if (time === undefined) $('add-event').focus();
  else [...$('events').querySelectorAll('button')].find((node) =>
    node.getAttribute('aria-label') === 'Edit event at ' + formatTime(time))?.focus();
});
$('remove-event').addEventListener('click', () => {
  state.active.events = state.active.events.filter((event) => event !== state.editor.event);
  finishEdit();
});
$('event-editor').addEventListener('submit', (event) => {
  event.preventDefault();
  const time = parseTime($('event-time').value);
  const category = $('event-type').value;
  const existing = state.editor.event;
  let message = '';
  if (!Number.isFinite(time)) message = 'Enter elapsed seconds, MM:SS, or HH:MM:SS.';
  else if (state.active.duration !== null && time >= state.active.duration) {
    message = 'Enter a time before ' + formatTime(state.active.duration) + '.';
  } else if (state.active.events.some((item) => item !== existing && item.time === time && item.category === category)) {
    message = 'An event with this time and type already exists.';
  }
  if (message) {
    $('editor-error').textContent = message;
    $('editor-error').hidden = false;
    $('event-time').focus();
    return;
  }
  if (existing) Object.assign(existing, { time, category });
  else state.active.events.push({ time, category, originalTime: null });
  finishEdit(formatTime(time));
});
$('toggle-review').addEventListener('click', () => {
  if (state.editor) {
    notice('Save or cancel the timestamp edit before changing the review status.', true);
    $('event-time').focus();
    return;
  }
  const clip = state.active;
  if (!clip.reviewed && invalidClip([clip])) {
    notice('Correct timestamps outside the video duration before marking the clip reviewed.', true);
    return;
  }
  clip.reviewed = !clip.reviewed;
  state.changed = true;
  notice();
  refresh();
});
$('review-tab').addEventListener('click', () => showReport(false));
$('report-tab').addEventListener('click', () => showReport(true));
$('download').addEventListener('click', download);
$('print-report').addEventListener('click', () => {
  const invalid = invalidClip(state.clips);
  if (invalid) {
    notice('Correct timestamps outside the video duration for ' + invalid.name + '.', true);
    return;
  }
  window.print();
});
