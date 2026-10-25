'use strict';
// Deterministic physics QA for Marble Atlas. Run: node 9108/physics.test.cjs
// Extended multi-world run: LONG_TEST=1 node 9108/physics.test.cjs
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const src=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
const scripts=[...src.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length,3,'three inline modules');
for(let k=0;k<scripts.length;k++)new vm.Script(scripts[k][1],{filename:'9108-script-'+k});
const shim={exports:{}};
vm.runInNewContext(scripts[0][1],{module:shim,Math,console,global:{}},{timeout:3000});
const sim=shim.exports;
assert.equal(sim.DT,1/480);
function step(w,secs,onStep){
 const count=Math.round(secs/sim.DT);
 for(let i=0;i<count;i++){
  sim.stepWorld(w);
  if(onStep)onStep(w);
  if(i%120===0){
   assert(Number.isFinite(w.ball.x+w.ball.y+w.ball.vx+w.ball.vy),'finite position and velocity');
   assert(w.segments.length<=8,'bounded active section count');
   assert(w.colorEvents.length<=16,'bounded dye history');
   assert(w.portalEvents.length<=12,'bounded portal history');
   assert(w.impacts.length<=36,'bounded sound impacts');
  }
  w.impacts.length=0; // consumer audio loop
 }
}
const results=[];
for(let seed=1;seed<=8;seed++){
 const w=sim.buildEndless(seed),first=w.segments[0].modNames;
 assert.notEqual(first[0],first[1],'varied adjacent acts');
 assert(w.segments.every(s=>s.world===0),'initially mechanical');
 step(w,15);
 assert(w.ball.y>550,'ball begins its route, seed '+seed);
 assert(w.maxStall<3,'seed '+seed+' should not stall');
 assert(!w.events.some(e=>e.type==='nan'),'finite solver state');
 results.push({seed,y:Math.round(w.ball.y),acts:first});
}
// Golden seed determinism includes geometry and machine selection.
const A=sim.buildEndless(44),B=sim.buildEndless(44);
step(A,3);step(B,3);
assert.equal(A.ball.x,B.ball.x);
assert.equal(A.ball.y,B.ball.y);
assert.deepEqual(Array.from(A.actHistory),Array.from(B.actHistory));
// A dimensional transition is spatial and based on reached depth, not time.
// Independent worlds are tested with separate states, since large artificial
// teleports invalidate the collision simulation's neighboring-section map.
for(let world=1;world<=3;world++){
 const w=sim.buildEndless(100+world);
 w.ball.y=world*5*sim.PITCH+15;
 sim.stepWorld(w);
 assert.equal(w.worldIndex,world,'world '+world+' reached');
 assert.equal(w.portalEvents.length,1,'one transition, not an oscillation');
 assert(w.colorEvents.length>=1,'portal recolors the marble');
 results.push({portal:world,color:w.ball.fill});
}
if(process.env.LONG_TEST==='1'){
 const w=sim.buildEndless(7);step(w,180);
 assert(w.worldsVisited.includes(1),'garden reached');
 assert(w.worldsVisited.includes(2),'ocean reached');
 assert(w.colorEvents.length>=1,'visible color-change history');
 results.push({long:180,depth:Math.round(w.ball.y),worlds:Array.from(w.worldsVisited)});
}
console.log('PASS 9108 Marble Atlas physics and world transitions');
console.log(JSON.stringify(results,null,2));
