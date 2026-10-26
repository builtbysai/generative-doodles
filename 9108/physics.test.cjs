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
const relayCast=[[[27,35,31],[31,35]],[[28,36],[32,36]],[[39,33,29],[37,29]],[[30,34,38],[38,34]]];
function checkChapter(s){
 const r=s.relay;assert(r,'procedural connected assembly');
 assert(relayCast[s.world][0].includes(s.scenes[0].type),'source belongs to biome');
 assert(relayCast[s.world][1].includes(s.scenes[1].type),'receiver belongs to biome');
 assert.notEqual(r.source.kind,r.receiver.kind,'different connected acts');
 assert.equal(r.source.next,r.receiver,'explicit handoff');
 assert(Math.abs(r.source.homeX-r.receiver.homeX)>350,'horizontal journey');
 assert(r.balance && r.gate,'physical balance and linked exit');
 // The feed rail must not form a marble-width vise with the moving deck,
 // including at its mechanical stops (seed 7, second-cycle garden regression).
 for(let i=0;i<=4;i++){
  const b={...r.balance,angle:r.balance.angleMin+(r.balance.angleMax-r.balance.angleMin)*i/4};
  const corners=sim.fixtureCorners(b,b.fixtures[0]),p={x:r.returnRail.x2,y:r.returnRail.y2};
  for(let j=0;j<4;j++){
   const a=corners[j],z=corners[(j+1)%4],dx=z[0]-a[0],dy=z[1]-a[1];
   const u=Math.max(0,Math.min(1,((p.x-a[0])*dx+(p.y-a[1])*dy)/(dx*dx+dy*dy)));
   assert(Math.hypot(p.x-a[0]-u*dx,p.y-a[1]-u*dy)>28,'feed and tipping deck cannot pinch a marble');
  }
 }
}
function checkRelayProgress(w){
 for(const s of w.segments){
  const r=s.relay;if(!r)continue;
  if(r.receiver.capturedAt!==undefined){
   assert(r.key.pressedAt!==undefined,'contact key must unlock receiver');
   assert(r.source.releasedAt<r.receiver.capturedAt,'free rolling handoff after release');
   assert(r.key.pressedAt<=r.receiver.capturedAt,'key before capture');
  }
  if(r.gate.openedAt!==undefined)assert(r.balance.loadAt<r.gate.openedAt,'real load tips gate lever');
  if(r.balance.loadAt!==undefined && r.balance.dyePigment)assert(r.balance._dyed,'contact with coated deck earns pigment');
  if(w.ball.y>s.y1){
   assert.equal(r.source.state,'released','source completes before leaving assembly');
   assert.equal(r.receiver.state,'released','receiver cannot be bypassed');
   assert(r.gate.openedAt!==undefined,'exit earned by physical lever');
  }
 }
}

assert.equal(sim.DT,1/480);
function step(w,secs,onStep){
 const count=Math.round(secs/sim.DT),seen=new Set();
 for(let i=0;i<count;i++){
  sim.stepWorld(w);
  if(onStep)onStep(w);
  if(i%120===0){
   if(w.fixtureAct===undefined)for(const s of w.segments)if(!seen.has(s.idx)){
    checkChapter(s);seen.add(s.idx);
   }
   if(w.fixtureAct===undefined)checkRelayProgress(w);
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
// Seed changes the devices, orientation, spacing and height, not a playlist.
const arrangements=new Set(),homes=new Set(),openings=new Set(),directions=new Set();
for(let seed=1;seed<=16;seed++){
 const w=sim.buildEndless(seed),r=w.segments[0].relay;
 assert(w.segments.every(s=>s.awakenedAt===undefined),'scenery waits for contact');
 assert(r.receiver.locked && !r.rail.mask && !r.gate.openedAt,'dormant assembled mechanisms');
 arrangements.add(JSON.stringify(w.segments.map(s=>[s.modNames,s.relay.source.homeX,s.relay.receiver.top])));
 homes.add(r.source.homeX);openings.add(r.source.kind);directions.add(r.direction);
}
assert.equal(arrangements.size,16,'sixteen distinct seeded constructions');
assert.equal(homes.size,16,'continuous staging variation');
assert.equal(openings.size,3,'three different mechanical openings');
assert.equal(directions.size,2,'both lateral directions');
// The old standalone fixtures retain their biome-constrained support deck.
{
 const w=sim.buildEndless(7,0);w.actDeck=[38];w.recentActs=[1,2,16];
 w.ball.y=1500;sim.stepWorld(w);
 assert([1,2,16].includes(w.segments.find(s=>s.idx===3).scenes[1].type),'legacy deck refill remains in biome');
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
// their stages in order, release the SAME marble, and reach the next act.
for(let act=27;act<=39;act++)for(const seed of [1,7,44]){
 const w=sim.buildEndless(seed,act),ball=w.ball;
 w.ball.x=seed===1?694:seed===7?700:706;
 let last={x:ball.x,y:ball.y},captured=false,releasedWithCollision=false,rise=0,high=ball.y;
 const trajectory=[];
 step(w,16,()=>{
  const distance=Math.hypot(ball.x-last.x,ball.y-last.y);
  assert(distance<11,'continuous transfer, act '+act);
  if(ball.carrier){if(last.carrier===ball.carrier)assert(distance<1,'bounded carrier speed '+act+' '+w.t);captured=true;
   for(const rail of w.segs){
    if(!(rail.mask&sim.CAT.BALL))continue;
    const dx=rail.x2-rail.x1,dy=rail.y2-rail.y1;
    const u=Math.max(0,Math.min(1,((ball.x-rail.x1)*dx+(ball.y-rail.y1)*dy)/(dx*dx+dy*dy)));
    assert(Math.hypot(ball.x-rail.x1-u*dx,ball.y-rail.y1-u*dy)>ball.r+1,'carrier clears real rail '+act+' '+rail.id);
   }
   trajectory.push([ball.x,ball.y]);high=Math.max(high,ball.y);rise=Math.max(rise,high-ball.y);}
  if(ball.carrier && last.carrier!==ball.carrier){
   assert.equal(ball.carrier.x,ball.carrier.homeX,'carrier does not jump to impact point');
   assert.equal(ball.carrier.y,ball.carrier.top+250,'dock height stays fixed on capture');
  }
  if(ball.carrier && last.carrier===ball.carrier && last.stage!==ball.carrier.stage)
   assert.equal(ball.carrier.progress,0,'stage transition draws the START of the next stage');
  if(ball.carrier?.kind==='coaster' && last.carrier===ball.carrier)
   assert(Math.abs((ball.carrier.drawAngle||0)-(last.drawAngle||0))<.1,'fluid carriage orientation');
  if(last.carrier && !ball.carrier){assert.equal(ball.mask,0xffff,'release restores collision mask');releasedWithCollision=true;}
  assert.equal(w.ball,ball,'identity is preserved');
  last={x:ball.x,y:ball.y,carrier:ball.carrier,stage:ball.carrier?.stage,drawAngle:ball.carrier?.drawAngle};
 });
 const events=w.events.filter(e=>e.device===w.machines[0].id && e.type!=='recolor' && e.type!=='ticket');
 assert(captured,'contact capture, act '+act);
 const stages=sim.machineMotion[w.machines[0].kind].length;
 assert.deepEqual(Array.from(events,e=>e.type),['capture',...Array(stages).fill('machineStage'),'release']);
 assert.deepEqual(Array.from(events.filter(e=>e.type==='machineStage'),e=>e.stage),Array.from({length:stages},(_,i)=>i));
 assert.equal(w.machines[0].state,'released');
 assert(ball.y>1000,'safe downstream handoff, act '+act);
 assert(releasedWithCollision,'observed collision-enabled release');
 if(act===38)assert.deepEqual(Array.from(w.events.filter(e=>e.type==='ticket'&&e.device===w.machines[0].id),e=>e.index),[1,2,3],'three earned perforations');
 if(act===37)assert(w.events.some(e=>e.type==='recolor'&&e.device===w.machines[0].id),'clam contact dyes marble');
 if(act!==32)assert(rise>(act===39?30:40),'upward travel, act '+act);
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
assert.equal(new Set(signatures).size,13,'thirteen different transport trajectories');
// Dormant dominoes must not fall just because the generator ran ahead.
for(const seed of [1,7,44]){
 const w=sim.buildEndless(seed,1);
 step(w,.5,()=>assert(w.dominoes.every(d=>d._sleeping),'no pre-activated dominoes'));
 step(w,14);
 assert(w.trippers.some(t=>t._armed),'marble hits the real trip');
 assert(w.dominoes.some(d=>!d._sleeping),'trip wakes the chain');
}
// Whole generated chains: contact -> deploy -> roll -> key -> catch ->
// retract -> tipped plank -> open gate. Check active geometry during carriage.
for(const seed of [1,7,23,44]){
 const w=sim.buildEndless(seed),seconds=seed===7?400:300;let rollDistance=0,upDistance=0,previous={x:w.ball.x,y:w.ball.y};
 step(w,seconds,()=>{
  const b=w.ball;
  if(b.y<previous.y)upDistance+=previous.y-b.y;
  if(!b.carrier && Math.abs(b.vy)<Math.abs(b.vx)*.5)rollDistance+=Math.abs(b.x-previous.x);
  previous={x:b.x,y:b.y};
  if(b.carrier && w.stepCount%4===0)for(const r of w.segs){
   if(!(r.mask&sim.CAT.BALL))continue;
   const dx=r.x2-r.x1,dy=r.y2-r.y1,u=Math.max(0,Math.min(1,((b.x-r.x1)*dx+(b.y-r.y1)*dy)/(dx*dx+dy*dy||1)));
   assert(Math.hypot(b.x-r.x1-u*dx,b.y-r.y1-u*dy)>b.r,'generated carrier clears active rail '+seed+' '+b.carrier.id+' '+r.id);
  }
 });
 assert(w.portalSerial>=4,'complete four-world route');
 assert(upDistance>1500,'substantial real upward travel');
 assert(rollDistance>3000,'substantial free rolling travel');
 assert(w.maxStall<3,'connected chains do not stall');
 results.push({relaySeed:seed,seconds,depth:Math.round(w.ball.y),up:Math.round(upDistance),rolling:Math.round(rollDistance)});
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
  assert(w.ball.y>4200,'three connected assemblies in the first minute, seed '+seed);
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
   assert(w.machines.length<=w.segments.length*2,'two bounded carriers per assembly');
   assert(w.maxStall<3,'no stalled marble, seed '+seed);
  });
  assert(w.portalSerial>=8,'two complete four-world cycles, seed '+seed);
  assert(maxKeys<512,'bounded collision cooldown keys');
  results.push({long:600,seed,depth:Math.round(w.ball.y),portals:w.portalSerial,maxSections,maxBodies,maxKeys});
 }
}
console.log('PASS 9108 Marble Atlas physics and world transitions');
console.log(JSON.stringify(results,null,2));
