export const categories = {
  pedestrian_littering: 'Pedestrian littering',
  vehicle_littering: 'Vehicle littering',
  bird_feeding: 'Bird feeding',
  dog_presence: 'Dog occurrence',
};

export const reportHeader = ['Name of Video Clip', 'Time of the littering act / dog occurrence'];
const reviewHeader = ['clip_name', 'event_time', 'event_type'];
const spreadsheetFormula = /^[\s]*[=+\-@]|^[\t\r\n]/;
const videoExtension = /\.(mp4|m4v|mov|mkv|avi|webm|ogv)$/i;
const clipDisplayName = (name) => name.trim().replace(videoExtension, '');
export const clipKey = (name) => clipDisplayName(name).toLowerCase();

export function parseTime(value) {
  const text = value.trim();
  const parts = text.split(':').map(Number);
  const seconds = parts.reduce((sum, part) => sum * 60 + part, 0);
  if (seconds > Number.MAX_SAFE_INTEGER / 1000) return NaN;
  if (/^\d+(?:\.\d{1,3})?$/.test(text)) return seconds;
  if (!/^(?:\d{1,4}:)?\d{1,2}:[0-5]\d(?:\.\d{1,3})?$/.test(text)) return NaN;
  return parts.length === 3 && parts[1] >= 60 ? NaN : seconds;
}

export function formatTime(seconds) {
  const ms = Math.round(seconds * 1000);
  const whole = Math.floor(ms / 1000);
  const hours = Math.floor(whole / 3600);
  const minutes = String(Math.floor(whole / 60) % 60).padStart(2, '0');
  const end = String(whole % 60).padStart(2, '0');
  const fraction = String(ms % 1000).padStart(3, '0').replace(/0+$/, '');
  return (hours ? String(hours).padStart(2, '0') + ':' : '') + minutes + ':' + end
    + (fraction ? '.' + fraction : '');
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  let closed = false;
  const input = text.replace(/^\uFEFF/, '');
  for (let i = 0; i <= input.length; i++) {
    const char = input[i];
    if (quoted) {
      if (char === undefined) throw new Error('The CSV contains an unclosed quote.');
      if (char !== '"') field += char;
      else if (input[i + 1] === '"') {
        field += '"';
        i++;
      } else {
        quoted = false;
        closed = true;
      }
    } else if (char === ',' || char === '\n' || char === '\r' || char === undefined) {
      row.push(field.trim());
      field = '';
      closed = false;
      if (char !== ',') {
        rows.push(row);
        row = [];
        if (char === '\r' && input[i + 1] === '\n') i++;
      }
    } else if (char === '"' && !field && !closed) {
      quoted = true;
    } else {
      if (closed || char === '"') throw new Error('The CSV contains an invalid quote.');
      field += char;
    }
  }
  return rows;
}

export function newClip(name, reviewed = false) {
  return { name, key: clipKey(name), events: [], reviewed, file: null, duration: null };
}

export function sortedEvents(clip) {
  return [...clip.events].sort((a, b) => a.time - b.time);
}

export function readResults(text) {
  const [header, ...rows] = parseCsv(text);
  const matchesHeader = (columns) => columns.length === header.length
    && columns.every((column, index) => column.toLowerCase() === header[index].toLowerCase());
  const report = matchesHeader(reportHeader);
  if (!report && !matchesHeader(reviewHeader)) {
    throw new Error('Choose a RodentVision Report CSV or a CSV with clip_name, event_time, event_type.');
  }
  const clips = new Map();
  const emptyClips = new Set();
  for (const [index, row] of rows.entries()) {
    if (row.every((value) => !value)) continue;
    const label = 'CSV row ' + (index + 2);
    const [rawName, times, type] = row;
    // The desktop exporter prefixes spreadsheet formula-like names with an apostrophe.
    const name = rawName.replace(/^'(?=\s*[=+\-@])/, '');
    const key = clipKey(name);
    if (row.length !== (report ? 2 : 3) || !key || !times || /[\\/]/.test(name)) {
      throw new Error(label + ' needs a clip name and an event time, NA, or REVIEW PENDING.');
    }
    const existing = clips.get(key);
    const clip = existing ?? newClip(name, true);
    if (report && existing) throw new Error(label + ' repeats the clip name ' + name + '.');

    if (times.toUpperCase() === 'NA') {
      if (existing || type) throw new Error(label + ' must use a single NA row with no event type.');
      emptyClips.add(key);
    } else {
      if (emptyClips.has(key)) throw new Error(label + ' mixes NA and event times.');
      for (const entry of report ? times.split(/\r\n|\n|\r/) : [times]) {
        const value = entry.trim();
        if (report && value.toUpperCase() === 'REVIEW PENDING') {
          clip.reviewed = false;
          continue;
        }
        const category = report ? (/\s+\(dog\)$/i.test(value) ? 'dog_presence' : '') : type;
        const time = parseTime(report ? value.replace(/\s+\(dog\)$/i, '') : value);
        if (!Number.isFinite(time)) throw new Error(label + ' has an invalid time: ' + value + '.');
        if (!report && !Object.hasOwn(categories, category)) throw new Error(label + ' has an invalid event type.');
        if (!report && clip.events.some((event) => event.time === time && event.category === category)) {
          throw new Error(label + ' repeats an event for the same clip.');
        }
        clip.events.push({ time, category, originalTime: time });
      }
    }
    clips.set(key, clip);
  }
  if (!clips.size) throw new Error('The CSV contains no clips.');
  return [...clips.values()];
}

export function reviewCsvIssue(clips) {
  const reviewed = clips.filter((clip) => clip.reviewed);
  if (!reviewed.length) return 'Mark at least one clip reviewed to export a desktop import CSV.';
  for (const clip of reviewed) {
    if (spreadsheetFormula.test(clip.name)) return 'Use the report CSV for a clip whose name starts with =, +, - or @.';
    const encountered = new Set();
    for (const event of clip.events) {
      if (!event.category) return 'Choose an event type for every timestamp in ' + clip.name + '.';
      const key = event.time + '/' + event.category;
      if (encountered.has(key)) return 'Remove duplicate times with the same event type in ' + clip.name + '.';
      encountered.add(key);
    }
  }
  return '';
}

export function reportRows(clips) {
  return clips.map((clip) => {
    const lines = sortedEvents(clip).map((event) => formatTime(event.time) + (event.category === 'dog_presence' ? ' (dog)' : ''));
    if (!clip.reviewed) lines.push('REVIEW PENDING');
    return [clipDisplayName(clip.name), lines.join('\n') || 'NA'];
  }).sort(([first], [second]) => first.localeCompare(second, undefined, { numeric: true }));
}

export function writeResults(clips, format) {
  const rows = format === 'review'
    ? [reviewHeader, ...clips.filter((clip) => clip.reviewed).flatMap((clip) => clip.events.length
      ? sortedEvents(clip).map((event) => [clip.name, formatTime(event.time), event.category])
      : [[clip.name, 'NA', '']])]
    : [reportHeader, ...reportRows(clips)];
  const csv = rows.map((row) => row.map((value) => {
    const safe = spreadsheetFormula.test(value) ? "'" + value : value;
    return '"' + safe.replaceAll('"', '""') + '"';
  }).join(',')).join('\r\n');
  return format === 'review' ? csv + '\r\n' : '\uFEFF' + csv;
}
