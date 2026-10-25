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
// Each new signature act must capture from an actual pan contact, visit all
// three stages in order, release the SAME marble, and reach the next act.
for(let act=27;act<=38;act++)for(const seed of [1,7,44]){
 const w=sim.buildEndless(seed,act),ball=w.ball;
 w.ball.x=seed===1?694:seed===7?700:706;
 let last={x:ball.x,y:ball.y},captured=false,rise=0,high=ball.y;
 const trajectory=[];
 step(w,16,()=>{
  const distance=Math.hypot(ball.x-last.x,ball.y-last.y);
  assert(distance<11,'continuous transfer, act '+act);
  if(ball.carrier){if(captured)assert(distance<1,'bounded carrier speed');captured=true;
   for(const rail of w.segs){
    const dx=rail.x2-rail.x1,dy=rail.y2-rail.y1;
    const u=Math.max(0,Math.min(1,((ball.x-rail.x1)*dx+(ball.y-rail.y1)*dy)/(dx*dx+dy*dy)));
    assert(Math.hypot(ball.x-rail.x1-u*dx,ball.y-rail.y1-u*dy)>ball.r+1,'carrier clears real rail '+act+' '+rail.id);
   }
   trajectory.push([ball.x,ball.y]);high=Math.max(high,ball.y);rise=Math.max(rise,high-ball.y);}
  assert.equal(w.ball,ball,'identity is preserved');
  last={x:ball.x,y:ball.y};
 });
 const events=w.events.filter(e=>e.device===w.machines[0].id && e.type!=='recolor' && e.type!=='ticket');
 assert(captured,'contact capture, act '+act);
 const stages=sim.machineMotion[w.machines[0].kind].length;
 assert.deepEqual(Array.from(events,e=>e.type),['capture',...Array(stages).fill('machineStage'),'release']);
 assert.deepEqual(Array.from(events.filter(e=>e.type==='machineStage'),e=>e.stage),Array.from({length:stages},(_,i)=>i));
 assert.equal(w.machines[0].state,'released');
 assert(ball.y>1000,'safe downstream handoff, act '+act);
 assert.equal(ball.mask,0xffff,'collision mask restored');
 if(act===38)assert.deepEqual(Array.from(w.events.filter(e=>e.type==='ticket'&&e.device===w.machines[0].id),e=>e.index),[1,2,3],'three earned perforations');
 if(act===37)assert(w.events.some(e=>e.type==='recolor'&&e.device===w.machines[0].id),'clam contact dyes marble');
 if(act!==32)assert(rise>40,'upward travel, act '+act);
 if(act===32){const release=events.find(e=>e.type==='release');assert(release.vy<-600,'mushroom releases stored spring energy');}
 results.push({act,seed,rise:Math.round(rise),stages});
}
// Every transport has a distinct spatial/timing signature. Recoloring the
// same animation cannot satisfy this regression.
const signatures=[];
for(const kind of Object.keys(sim.machineMotion)){
 const m={kind,top:0,originX:700,originY:250},path=sim.machineMotion[kind];
 const signature=path.flatMap((part,stage)=>[part[2],...Array.from({length:5},(_,i)=>{
  const p=sim.machinePose(m,stage,i/4);return [Math.round(p.x),Math.round(p.y)];
 }).flat()]);
 signatures.push(JSON.stringify(signature));
}
assert.equal(new Set(signatures).size,12,'twelve different transport trajectories');
// Dormant dominoes must not fall just because the generator ran ahead.
for(const seed of [1,7,44]){
 const w=sim.buildEndless(seed,1);
 step(w,.5,()=>assert(w.dominoes.every(d=>d._sleeping),'no pre-activated dominoes'));
 step(w,14);
 assert(w.trippers.some(t=>t._armed),'marble hits the real trip');
 assert(w.dominoes.some(d=>!d._sleeping),'trip wakes the chain');
}
if(process.env.SEED_SWEEP==='1'){
 let minDepth=Infinity,maxStall=0;
 for(let seed=1;seed<=50;seed++){
  const w=sim.buildEndless(seed);
  step(w,60,()=>{
   assert(w.maxStall<3,'seed sweep stall '+seed);
   for(const d of w.dominoes)if(w.ball.y<d.y-440)
    assert(d._sleeping,'premature domino seed '+seed+' '+d.id);
  });
  assert(w.ball.y>5000,'first-minute progress seed '+seed);
  minDepth=Math.min(minDepth,w.ball.y);maxStall=Math.max(maxStall,w.maxStall);
 }
 results.push({sweep:50,secondsEach:60,minDepth:Math.round(minDepth),maxStall});
}
if(process.env.LONG_TEST==='1'){
 for(const seed of [7,23]){
  const w=sim.buildEndless(seed);let maxSections=0,maxBodies=0,maxKeys=0;
  step(w,600,()=>{
   maxSections=Math.max(maxSections,w.segments.length);
   maxBodies=Math.max(maxBodies,w.bodies.length);
   maxKeys=Math.max(maxKeys,Object.keys(w.impactAt).length);
   assert(w.worldsVisited.length<=12,'bounded world history');
   assert(w.machines.length<=8,'bounded carrier state');
   assert(w.maxStall<3,'no stalled marble, seed '+seed);
  });
  assert(w.portalSerial>=8,'two complete four-world cycles, seed '+seed);
  assert(maxKeys<512,'bounded collision cooldown keys');
  results.push({long:600,seed,depth:Math.round(w.ball.y),portals:w.portalSerial,maxSections,maxBodies,maxKeys});
 }
}
console.log('PASS 9108 Marble Atlas physics and world transitions');
console.log(JSON.stringify(results,null,2));
