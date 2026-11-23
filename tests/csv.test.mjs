import assert from 'node:assert/strict';
import test from 'node:test';
import {
  clipKey, compareClipNames, formatTime, isAnalysisCsv, newClip, parseCameraTimestamp, parseTime,
  readResults, reportRows, reviewCsvIssue, writeResults,
} from '../web/csv/model.mjs';

const report = '\uFEFF"Name of Video Clip","Time of the littering act / dog occurrence"\r\n'
  + '"Route, ""North""","00:01.125\n00:03 (dog)\nREVIEW PENDING"\r\n'
  + '"Clip-B","NA"\r\n'
  + '"Clip-C","REVIEW PENDING"\r\n';

test('imports legacy review status and round-trips elapsed report times', () => {
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
  assert.match(updated, /"Route, ""North""","00:02\.375\n00:03"/);
  assert.doesNotMatch(updated, /REVIEW PENDING|\(dog\)/);
  const [clipB, clipC, route] = readResults(updated);
  assert.deepEqual([clipB.name, clipC.name, route.name], ['Clip-B', 'Clip-C', 'Route, "North"']);
  assert.deepEqual(route.events.map(({ time }) => time), [2.375, 3]);
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

test('labels elapsed times and preserves natural clip order in the report CSV', () => {
  const clips = readResults(
    'clip_name,event_time,event_type\n10B.mp4,NA,\n2B.mov,2,dog_presence\n2B.mov,0.125,bird_feeding',
  );
  clips[1].reviewed = false;
  assert.deepEqual(reportRows(clips), [['2B', '00:00.125\n00:02'], ['10B', 'NA']]);
  assert.equal(writeResults(clips, 'report'),
    '\uFEFF"Name of Video Clip","Event time (elapsed from clip start)"\r\n'
    + '"2B","00:00.125\n00:02"\r\n"10B","NA"');
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
    ['3B', 'NA'],
    ['23B', '00:18'],
  ]);
});

test('imports the automatic detector export as pending candidates', () => {
  const analysis = isAnalysisCsv('RodentVision-analysis-results.CSV');
  assert.equal(analysis, true);
  const csv = '\uFEFFclip_name,event_time,event_type\r\n'
    + '"1B.mp4","02:10.125","vehicle_littering"\r\n'
    + '"1B.mp4","02:10.125","vehicle_littering"\r\n'
    + '"2B.mp4","NA",""\r\n'
    + '"3B.mp4","03:01","dog_presence"\r\n';
  const clips = readResults(csv, { analysis });
  assert.equal(clips[0].name, '1B.mp4');
  assert.equal(clips[0].key, clipKey('1B.MP4'));
  assert.deepEqual(clips.map(({ reviewed }) => reviewed), [false, false, false]);
  assert.equal(clips[0].events.length, 2);
  assert.deepEqual(clips[0].events[0], { time: 130.125, category: 'vehicle_littering', originalTime: 130.125 });
  assert.deepEqual(clips[1].events, []);
  assert.match(reviewCsvIssue(clips), /Mark at least one clip reviewed/);
  clips[2].reviewed = true;
  assert.equal(writeResults(clips, 'review'),
    '"clip_name","event_time","event_type"\r\n"3B.mp4","03:01","dog_presence"\r\n');
});

test('computes camera timestamps from each clip’s reference frame across midnight', () => {
  const clips = readResults('clip_name,event_time,event_type\n2B.mp4,12,dog_presence\n1B.mp4,10,bird_feeding\n3B.mp4,NA,');
  clips[0].cameraOffsetMs = parseCameraTimestamp('2025-04-21 23:59:58') - 8000;
  assert.deepEqual(reportRows(clips, 'camera'), [
    ['1B', 'Unavailable'],
    ['2B', '2025-04-22 00:00:02'],
    ['3B', 'NA'],
  ]);
  assert.match(writeResults(clips, 'report', 'camera'), /"Event time \(camera timestamp shown in video\)"/);
  assert.equal(writeResults(clips, 'review', 'camera'), writeResults(clips, 'review', 'elapsed'));
  assert.ok(Number.isNaN(parseCameraTimestamp('2025-02-29 11:00:00')));
});
