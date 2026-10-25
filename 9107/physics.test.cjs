'use strict';
/**
 * Deterministic headless regression tests for Wonderworks.
 * Run: node 9107/physics.test.cjs
 *
 * The simulation is self-contained in the first inline script of index.html.
 * No browser, external physics package, network, or test framework required.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const firstScript = html.match(/<script>([\s\S]*?)<\/script>/);
assert(firstScript, 'physics script must be present');
const moduleShim = { exports: {} };
vm.runInNewContext(firstScript[1], { module: moduleShim, Math, console },
  { filename: '9107/index.html (physics)', timeout: 3000 });
const SIM = moduleShim.exports;
assert(SIM.DT > 0 && SIM.DT < 1 / 100, 'fixed physics substep');

function step(w, secs, onStep) {
  const count = Math.round(secs / SIM.DT);
  for (let i = 0; i < count; i++) {
    SIM.stepWorld(w);
    if (onStep) onStep(w);
    if (i % 120 === 0) {
      assert(Number.isFinite(w.ball.x + w.ball.y + w.ball.vx + w.ball.vy),
        'finite ball position and velocity');
      assert(w.segments.length <= 8, 'old sections must be released');
    }
    // Same as the audio loop: the browser consumes every frame's impacts.
    if (w.impacts.length > 36) throw new Error('impact queue escaped bound');
    w.impacts.length = 0;
  }
}
const results = [];
for (let seed = 1; seed <= 8; seed++) {
  const w = SIM.buildEndless(seed);
  const initialModules = w.segments[0].modNames.slice();
  step(w, 20);
  assert(w.ball.y > 1450, 'seed ' + seed + ': marble must advance after 20s');
  assert(w.maxStall < 3, 'seed ' + seed + ': extended stall');
  results.push({ seed, initialModules, progressedToY: Math.round(w.ball.y) });
}

// Early dominoes must remain upright until an actual trigger collision.
// Seed 11 reaches the side-chain in the third generated section.
{
  const w = SIM.buildEndless(11);
  const dominoes = w.dominoes.filter(d => /^s2-dom/.test(d.id));
  assert.equal(dominoes.length, 7, 'seven real domino bodies in side-chain');
  assert(dominoes.every(d => d._sleeping), 'initial dominoes upright');
  step(w, 20);
  assert(dominoes.every(d => d._sleeping), 'distant dominoes remain upright');
  step(w, 10);
  assert(dominoes.some(d => !d._sleeping), 'ball-induced lever wakes chain');
  assert(w.ball.y > 4500, 'marble continues beyond domino section');
  results.push({ seed: 11, dominoesWoken: dominoes.filter(d => !d._sleeping).length,
    progressedToY: Math.round(w.ball.y) });
}
console.log('PASS Wonderworks physics and domino triggers', JSON.stringify(results));
