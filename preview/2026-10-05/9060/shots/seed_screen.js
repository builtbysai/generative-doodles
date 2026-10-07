#!/usr/bin/env node
/* Pre-screen seeds for 9060: mirrors buildHistory() in index.html.
   Score: reward spread + decisive bends, penalize coiliness and crossings. */
'use strict';
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function gauss(rng) {
  let u = 0, v = 0;
  while (u === 0) u = rng();
  while (v === 0) v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
const NSEG = 150;
function gen(seed) {
  const rng = mulberry32(seed);
  const vpts = [{ x: 0, y: 0 }];
  let x = 0, y = 0, hd = rng() * Math.PI * 2, sinceBend = 99, cumTurn = 0, bends = 0;
  for (let i = 0; i < NSEG; i++) {
    let d = gauss(rng) * 0.028;
    sinceBend++;
    if (sinceBend > 5 && rng() < 0.105) {
      const r = rng();
      const mag = r < 0.62 ? 0.35 + rng() * 0.55 : r < 0.90 ? 0.95 + rng() * 0.60 : 1.70 + rng() * 0.80;
      let sgn = rng() < 0.5 ? -1 : 1;
      if (Math.abs(cumTurn) > 1.1 && Math.sign(cumTurn || sgn) === sgn) sgn = -sgn;
      d = mag * sgn; sinceBend = 0; bends++;
    }
    const rad = Math.hypot(x, y);
    if (rad > 0.62) {
      const want = Math.atan2(-y, -x);
      let dd = want - hd;
      while (dd > Math.PI) dd -= 2 * Math.PI;
      while (dd < -Math.PI) dd += 2 * Math.PI;
      d += dd * 0.045;
    }
    cumTurn = cumTurn * 0.93 + d;
    hd += d; x += Math.cos(hd); y += Math.sin(hd);
    vpts.push({ x, y });
  }
  return { vpts, bends };
}
function segInt(p1, p2, p3, p4) {
  const d = (p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x);
  if (Math.abs(d) < 1e-9) return false;
  const t = ((p3.x - p1.x) * (p4.y - p3.y) - (p3.y - p1.y) * (p4.x - p3.x)) / d;
  const u = ((p3.x - p1.x) * (p2.y - p1.y) - (p3.y - p1.y) * (p2.x - p1.x)) / d;
  return t > 0.02 && t < 0.98 && u > 0.02 && u < 0.98;
}
function score(seed) {
  const { vpts, bends } = gen(seed);
  let minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9, cx = 0, cy = 0;
  for (const p of vpts) {
    cx += p.x; cy += p.y;
    if (p.x < minx) minx = p.x; if (p.x > maxx) maxx = p.x;
    if (p.y < miny) miny = p.y; if (p.y > maxy) maxy = p.y;
  }
  cx /= vpts.length; cy /= vpts.length;
  const bw = maxx - minx, bh = maxy - miny;
  let meanD = 0;
  for (const p of vpts) meanD += Math.hypot(p.x - cx, p.y - cy);
  meanD /= vpts.length;
  const spread = meanD / Math.max(1e-9, Math.hypot(bw, bh) / 2);
  const aspect = Math.min(bw, bh) / Math.max(1e-9, Math.max(bw, bh));
  let cross = 0;
  for (let i = 0; i < vpts.length - 1; i += 2)
    for (let j = i + 4; j < vpts.length - 1; j += 2)
      if (segInt(vpts[i], vpts[i + 1], vpts[j], vpts[j + 1])) cross++;
  const bendScore = Math.min(1, bends / 12) * (bends > 22 ? 0.6 : 1);
  return { seed, s: spread * 2 + aspect + bendScore - cross * 0.06,
           spread: spread.toFixed(2), aspect: aspect.toFixed(2), bends, cross };
}
const out = [];
for (let sd = 906001; sd <= 906040; sd++) out.push(score(sd));
out.sort((a, b) => b.s - a.s);
for (const o of out.slice(0, 8))
  console.log(o.seed, o.s.toFixed(2), 'spread', o.spread, 'aspect', o.aspect, 'bends', o.bends, 'cross', o.cross);
