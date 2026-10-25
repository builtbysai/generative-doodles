'use strict';
/**
 * Wonderworks: deterministic, dependency-free physics regression.
 * Run from the repository root: node 9107/physics.test.cjs
 *
 * No snapshots or hardcoded trajectories: checks motion, mechanism variety,
 * collision events, bound memory and the real domino contact handoff.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
assert(!html.includes('id="plate"') && !html.includes('id="toolbar"'),
  'art must remain full-bleed, without a decorative dashboard');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length, 3, 'self-contained physics, camera, and display scripts');
for (const [i, part] of scripts.entries()) {
  new vm.Script(part[1], { filename: '9107/script-' + i + '.js' });
}
const moduleShim = { exports: {} };
// Supply global explicitly: in Node vm contexts it is not automatically bound.
vm.runInNewContext(scripts[0][1], { module: moduleShim, Math, console, global: {} },
  { filename: '9107/physics.js', timeout: 3000 });
const SIM = moduleShim.exports;
assert(SIM.DT > 0 && SIM.DT <= 1 / 120, 'fixed small simulation substep');

function advance(w, seconds, onStep) {
  for (let i = 0, steps = Math.round(seconds / SIM.DT); i < steps; i++) {
    SIM.stepWorld(w);
    if (onStep) onStep(w);
    if (i % 128 === 0) {
      const b = w.ball;
      assert(Number.isFinite(b.x + b.y + b.vx + b.vy + b.angle + b.omega),
        'finite state after step ' + i);
      assert(w.segments.length <= 8, 'endless generation releases old sections');
      assert(w.actDeck.length <= 19 && w.actHistory.length <= 96,
        'procedural history and bag remain bounded');
    }
    assert(w.impacts.length <= 36, 'audio event buffer stays bounded');
    // In the browser, events are drained each frame by the audio engine.
    w.impacts.length = 0;
  }
}
const results = [];
for (let seed = 1; seed <= 12; seed++) {
  const w = SIM.buildEndless(seed);
  const opening = w.segments[0].modNames.slice();
  assert.notEqual(opening[0], opening[1], 'no repeat within a section');
  assert(w.actHistory.every((a,i,h) => i===0 || a !== h[i-1]),
    'no back-to-back duplicate acts');
  let heardHit = false;
  advance(w, 20, world => {
    if (world.impacts.some(h => Number.isFinite(h.x) && Number.isFinite(h.impulse)))
      heardHit = true;
  });
  assert(heardHit, 'real impact events available for sound');
  assert(w.ball.y > 1400, 'seed ' + seed + ': ball must keep descending');
  assert(w.maxStall < 3, 'seed ' + seed + ': excessive stall');
  assert(!w.events.some(e => e.type === 'nan'), 'no invalid physics');
  results.push({ seed, y: Math.round(w.ball.y), acts: opening });
}

// The first domino remains dormant until its lever receives the marble.
// Previously, seeds 31 and 35 either failed to trigger or toppled only one.
for (const seed of [26, 31, 35, 36]) {
  const w = SIM.buildEndless(seed);
  const dominoes = w.dominoes.filter(d => d._seg === 1);
  assert.equal(dominoes.length, 7, 'the side-chain consists of seven dominoes');
  assert(dominoes.every(d => d._sleeping), 'all are initially upright and dormant');
  advance(w, 6);
  assert(dominoes.every(d => d._sleeping), 'future dominoes must stay upright');
  advance(w, 31.5);
  assert.equal(dominoes.filter(d => !d._sleeping).length, 7,
    'lever contact should initiate the entire chain in seed ' + seed);
  assert(w.ball.y > 3600, 'the marble must exit the mechanism');
  results.push({ seed, dominoes: 7, y: Math.round(w.ball.y) });
}
console.log('PASS: Wonderworks kinetic physics, sound contacts and full domino relay');
console.log(JSON.stringify(results, null, 2));
