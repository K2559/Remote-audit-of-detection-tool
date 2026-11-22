import assert from 'node:assert/strict';
import test from 'node:test';
import { clipKey, formatTime, parseTime, readResults, reviewCsvIssue, writeResults } from '../web/csv/model.mjs';

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
    [['Route, "North"', true], ['Clip-B', true], ['Clip-C', false]]);
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
