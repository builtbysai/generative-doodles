'use strict';
/**
 * The Last Light: deterministic, dependency-free physics regression.
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
      assert(w.linkages.length <= 6, 'old drive linkages must be garbage-collected');
      assert(w.actDeck.length <= 21 && w.actHistory.length <= 96,
        'procedural history and bag remain bounded');
      assert(w.storyImpacts.length <= 20 && w.storyTransitions.length <= 12,
        'story event queues remain bounded');
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
  assert(w.segments.some(s => s.awakenedAt >= 0),
    'physical collision awakens a scene');
  assert.equal(w.segments[0].chapter, 0, 'the journey starts in the foundry');
  assert(w.ball.y > 1400, 'seed ' + seed + ': ball must keep descending');
  assert(w.maxStall < 3, 'seed ' + seed + ': excessive stall');
  assert(!w.events.some(e => e.type === 'nan'), 'no invalid physics');
  results.push({ seed, y: Math.round(w.ball.y), acts: opening });
}

// A linked transmission is powered by the real marble impulse, not a timer.
{
  const w = SIM.buildEndless(5);
  assert(w.segments[0].modNames.includes('beltTransmission'));
  assert.equal(w.linkages.length,1);
  let paddleHit=false;
  advance(w,15,world => {
    if(world.impacts.some(h=>/beltWheel/.test(h.key)))paddleHit=true;
  });
  const link=w.linkages[0];
  assert(paddleHit,'marble strikes primary drive paddles');
  assert(link && Math.abs(link.a.angle)>.05,'first wheel rotates');
  assert(Math.abs(link.b.angle)>.05,'second wheel is torque-coupled');
  results.push({seed:5,primary:+link.a.angle.toFixed(2),
    follower:+link.b.angle.toFixed(2)});
}

// The hammer hits a real spring-mounted gong. Low mass produces a softer
// impulse, so its actual contact must be present in the audio queue.
{
  const w=SIM.buildEndless(1);
  assert(w.segments[0].modNames.includes('hammerBell'));
  let hammer=false,gong=false;
  advance(w,12,world=>{
    for(const h of world.impacts){
      if(h.key.indexOf('s0-hammer|ball')>=0)hammer=true;
      if(h.key.indexOf('s0-hammer|s0-gong')>=0)gong=true;
    }
  });
  assert(hammer,'ball collides with hammer during open-air transfer');
  assert(gong,'hammer strikes sounding plate and creates audio event');
  assert(w.ball.y>1500,'marble continues after gong');
  results.push({seed:1,hammer,gong});
}

// The first domino remains dormant until its lever receives the marble.
// Current composition fixtures put the domino relay in section 1.
for (const seed of [29, 36, 37, 45]) {
  const w = SIM.buildEndless(seed);
  const dominoes = w.dominoes.filter(d => d._seg === 1);
  assert.equal(dominoes.length, 7, 'the side-chain consists of seven dominoes');
  assert(dominoes.every(d => d._sleeping), 'all are initially upright and dormant');
  advance(w, 1);
  assert(dominoes.every(d => d._sleeping), 'distant dominoes must stay upright');
  advance(w, 36.5);
  assert.equal(dominoes.filter(d => !d._sleeping).length, 7,
    'lever contact should initiate the entire chain in seed ' + seed);
  assert(w.ball.y > 3000, 'the marble must exit the mechanism');
  results.push({ seed, dominoes: 7, y: Math.round(w.ball.y) });
}
// One continuous trip must visibly pass through all three story settings,
 // then return to a newly generated foundry with the same living marble.
{
  const w = SIM.buildEndless(1);
  advance(w, 65);
  assert(w.storyTurns >= 3, 'foundry, glasshouse and observatory completed');
  assert.equal(w.storyChapter, 0, 'the light returns to foundry without reset');
  assert(w.storyTransitions.length >= 3, 'each crossing recorded');
  assert(w.storyImpacts.length > 0, 'impact awakenings remain visible');
  assert(w.segments.every(s => s.chapter === Math.floor(s.idx / 2) % 3),
    'story settings derive from their actual generated positions');
  results.push({seed:1,storyTurns:w.storyTurns,
    chapter:w.storyChapter,depth:Math.round(w.ball.y)});
}
console.log('PASS: The Last Light: kinetic flow, three narrative chapters and responsive sets');
console.log(JSON.stringify(results, null, 2));
