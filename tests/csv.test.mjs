import assert from 'node:assert/strict';
import test from 'node:test';
import { clipKey, compareClipNames, formatTime, newClip, parseTime, readResults, reportRows, reviewCsvIssue, writeResults } from '../web/csv/model.mjs';

const report = '\uFEFF"Name of Video Clip","Time of the littering act / dog occurrence"\r\n'
  + '"Route, ""North""","00:01.125\n00:03 (dog)\nREVIEW PENDING"\r\n'
  + '"Clip-B","NA"\r\n'
  + '"Clip-C","REVIEW PENDING"\r\n';

test('reads the desktop report and round-trips an edited time and review status', () => {
  const clips = readResults(report);
  const [north, empty, pending] = clips;
  assert.equal(clipKey('ROUTE, "NORTH".MP4'), north.key);
  assert.deepEqual(north.events.map(({ time, category }) => [time, category]), [[1.125, ''], [3, 'dog_presence']]);
  assert.equal(north.reviewed, false);
  assert.equal(empty.reviewed, true);
  assert.deepEqual(empty.events, []);
  assert.equal(pending.reviewed, false);
  north.events[0].time = 2.375;
  north.reviewed = true;
  const updated = writeResults(clips, 'report');
  assert.match(updated, /"Route, ""North""","00:02\.375\n00:03 \(dog\)"/);
  assert.deepEqual(readResults(updated).map(({ name, reviewed }) => [name, reviewed]),
    [['Clip-B', true], ['Clip-C', false], ['Route, "North"', true]]);
});

test('exports only reviewed clips in the format the desktop importer accepts', () => {
  const clips = readResults(report);
  clips[0].reviewed = true;
  assert.match(reviewCsvIssue(clips), /Choose an event type/);
  clips[0].events[0].category = 'bird_feeding';
  assert.equal(reviewCsvIssue(clips), '');
  const csv = writeResults(clips, 'review');
  assert.match(csv, /^"clip_name","event_time","event_type"/);
  assert.doesNotMatch(csv, /Clip-C/);
  const [north, empty] = readResults(csv);
  assert.deepEqual(north.events.map(({ time, category }) => [time, category]), [[1.125, 'bird_feeding'], [3, 'dog_presence']]);
  assert.deepEqual(empty.events, []);
});

test('preserves elapsed precision and rejects malformed or conflicting data', () => {
  assert.equal(parseTime('125.2'), 125.2);
  assert.equal(formatTime(parseTime('01:02:03.004')), '01:02:03.004');
  assert.ok(Number.isNaN(parseTime('01:60:00')));
  assert.ok(Number.isNaN(parseTime('00:01.1234')));
  assert.throws(() => readResults('"clip_name,event_time,event_type"\na,0,dog_presence'), /Choose a RodentVision/);
  assert.throws(() => readResults('clip_name,event_time,event_type\na,NA,\na,0,dog_presence'), /mixes NA/);
  assert.throws(() => readResults('clip_name,event_time,event_type\na,"0,dog_presence'), /unclosed quote/);
  assert.throws(() => readResults('clip_name,event_time,event_type\na,0,dog_presence\na,00:00,dog_presence'), /repeats an event/);
});

test('matches the desktop column values and natural clip order in the report CSV', () => {
  const clips = readResults(
    'clip_name,event_time,event_type\n10B.mp4,NA,\n2B.mov,2,dog_presence\n2B.mov,0.125,bird_feeding',
  );
  clips[1].reviewed = false;
  assert.deepEqual(reportRows(clips), [['2B', '00:00.125\n00:02 (dog)\nREVIEW PENDING'], ['10B', 'NA']]);
  assert.equal(writeResults(clips, 'report'),
    '\uFEFF"Name of Video Clip","Time of the littering act / dog occurrence"\r\n'
    + '"2B","00:00.125\n00:02 (dog)\nREVIEW PENDING"\r\n"10B","NA"');
});

test('sorts video-only imports by filename with numeric order', () => {
  const clips = ['4B.mp4', '11B.mp4', '6B.mp4', '24B.mp4', '1B.mp4', '3B.mp4'].map((name) => newClip(name));
  assert.deepEqual(clips.sort(compareClipNames).map(({ name }) => name),
    ['1B.mp4', '3B.mp4', '4B.mp4', '6B.mp4', '11B.mp4', '24B.mp4']);
});

test('reads the detector folder report format with pending rows and duplicate timestamps', () => {
  const clips = readResults(
    '\uFEFF"Name of Video Clip","Time of the littering act / dog occurrence"\r\n'
    + '"1B","00:10\n00:10"\r\n'
    + '"2B","NA"\r\n'
    + '"3B","REVIEW PENDING"\r\n'
    + '"23B","00:18 (dog)"\r\n',
  );
  assert.equal(clips.length, 4);
  assert.deepEqual(clips[0].events.map(({ time, category }) => [time, category]),
    [[10, ''], [10, '']]);
  assert.equal(clips[2].reviewed, false);
  assert.deepEqual(reportRows(clips), [
    ['1B', '00:10\n00:10'],
    ['2B', 'NA'],
    ['3B', 'REVIEW PENDING'],
    ['23B', '00:18 (dog)'],
  ]);
});
