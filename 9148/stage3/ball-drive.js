// ball-drive.js — Stage 3: hybrid ball drive (RESEARCH §4.3).
//
// The ball is fully beat-determined (no accumulated state), so any frame
// can be evaluated from the beat alone. Three phases:
// - Control: ball rides the active hand (palm hold, same offset as Stage 2b).
// - Free: analytic ballistic parabola (g = 9.81), solved exactly so the ball
//   arrives at the next hand on its beat. 'bounce' flights hit the floor
//   once at restitution 0.80; 'direct' flights are hand-to-hand arcs.
// - Spin: ball on the index fingertip, rotating 2.5 rev/s about world Y.
//
// Why the hand changes are direct arcs, not bounces: at 144 BPM a floor
// bounce from hand height back to hand height takes >= ~0.54 s, but the
// beat-aligned transfer windows are 0.37 s. Physics forces the quick
// hand-to-hand pass. The dribbles (long windows) get real bounces.
// Why the dribble pushes are firm (~3.9 m/s) with ~1.05 m apexes: a
// 0.78 s flight ending at hand height requires it; a soft push returns
// the ball to ~0.6 m, below the hand. The apex is waist height on this
// 1.87 m character, and the push is a hard wrist snap, not a lob.
import * as THREE from 'three';
import { BEAT, ROUTINE_BEATS } from '../stage2/routine.js';

export const G = 9.81;
export const BALL_R = 0.12; // visual ball radius (the mesh, the floor contact)
export const BALL_R_PHYS = 0.135; // physics radius for contact (Stage 13a; see routine.js)
export const REST = 0.80;
export const SPIN_REV = 2.5; // rev/s on the fingertip
const FLOOR_Y = BALL_R; // ball-centre height at floor contact
const BALL_OFFSET = new THREE.Vector3(0, -0.130, 0.034); // palm hold (routine.js; |offset| = BALL_R_PHYS)
const SPIN_T0 = 18.5, SPIN_T1 = 23.0; // fingertip window (beats)

// [t0, t1, kind, from, to] — beats. kind: control | bounce | direct | path | spin | snatch.
// from/to: 'L'/'R' hand; 'tip' = index fingertip (spin/snatch only).
// Every release/catch is 0.06 beats (25 ms) from a beat boundary.
// 'path' carries a 6th element: vias [[u, dx, dy, dz], ...] — MEASURED
// waypoints (Stage 13a): at parameter u the ball passes through the
// body's root position at beat t0 + u*(t1-t0), plus the offset
// (dx, dy, dz) in the BODY's local frame (rotated by the body's yaw
// at that beat). The route is anchored to the body's measured pose,
// not hand-authored: if the routine's root or yaw moves, the route
// moves with it, and the offsets are chosen as clearances from the
// body (behind the back, out to the sides). (Stage 12's vias were
// world-space offsets from the straight-line lerp between the hand
// endpoints — absolute positions that knew nothing about where the
// body was. A hand-anchored version was tried first in Stage 13a and
// made the clips WORSE: the IK clamps the hands close to the body
// behind the back, so the ball following the hand cut through the
// torso at -0.19 m. The route must be anchored to the body, not the
// hands — the ball's mid-flight arc is its own, wider than the hands.)
// The behind-back transfer runs 7.06-8.50 (1.44 beats): the ball needs
// the time to arc around the back at a believable speed.
const SEGMENTS = [
  [0.00, 1.06, 'control', 'R'],
  [1.06, 2.94, 'bounce', 'R', 'R'], // dribble 1 (waist cycle)
  [2.94, 4.94, 'bounce', 'R', 'L'], // dribble 2 = bounce crossover
  [4.94, 5.06, 'control', 'L'],
  [5.06, 6.50, 'bounce', 'L', 'R'], // between the legs (a real bounce through the gap: the ball hits the floor between the spread feet and comes up to the right hand; Stage 12 — the 'path' version could never clear both shins, the gap at shin height is narrower than the ball)
  [6.50, 7.06, 'control', 'R'],
  [7.06, 8.50, 'path', 'R', 'L', [[0.18, 0.36, -0.05, -0.35], [0.5, 0, -0.05, -0.40], [0.82, -0.44, -0.05, -0.35]]], // behind the back (measured route around the back; last via out to -0.44 in Stage 13b — the -0.36 route's tail bowed into the left shorts at the catch, thighL -0.059)
  [8.50, 15.06, 'control', 'L'], // spin + around the world (carried)
  [15.06, 15.94, 'direct', 'L', 'R'], // retrieval hand-off (tossed pass)
  [15.94, 16.06, 'control', 'R'],
  [16.06, 17.06, 'direct', 'R', 'R'], // retrieval toss up + catch
  [17.06, 18.50, 'control', 'R'],
  [18.50, 21.06, 'spin', 'R'],
  [21.06, 21.94, 'snatch', 'R', 'R'], // ballistic pop, fingertip to fingertip
  [21.94, 23.00, 'spin', 'R'],
  [23.00, 24.00, 'control', 'R'],
];

function solveDirect(p0, p1, T) {
  return new THREE.Vector3((p1.x - p0.x) / T, (p1.y - p0.y + 0.5 * G * T * T) / T, (p1.z - p0.z) / T);
}

// Bounce flight: find the bounce time tB (bisection) such that the ball
// leaves p0, hits the floor once (vy *= -REST), and arrives at p1 at time T.
// tB is searched below the free-fall time, so the release is a real
// downward push, not a lob.
function solveBounce(p0, p1, T) {
  const tFF = Math.sqrt(2 * (p0.y - FLOOR_Y) / G);
  const riseAt = (tB) => {
    const vy0 = (FLOOR_Y - p0.y + 0.5 * G * tB * tB) / tB;
    const vyR = -REST * (vy0 - G * tB);
    const tr = T - tB;
    return FLOOR_Y + vyR * tr - 0.5 * G * tr * tr;
  };
  let lo = 0.01, hi = Math.min(tFF * 0.999, T * 0.95);
  if (!(riseAt(lo) - p1.y > 0 && riseAt(hi) - p1.y < 0)) {
    throw new Error(`bounce solve failed: f(lo)=${riseAt(lo) - p1.y} f(hi)=${riseAt(hi) - p1.y}`);
  }
  for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (riseAt(m) - p1.y > 0) lo = m; else hi = m; }
  const tB = (lo + hi) / 2;
  const vy0 = (FLOOR_Y - p0.y + 0.5 * G * tB * tB) / tB;
  const v0 = new THREE.Vector3((p1.x - p0.x) / T, vy0, (p1.z - p0.z) / T);
  return { tB, v0, vyR: -REST * (vy0 - G * tB) };
}

// Non-uniform Catmull-Rom (Barry-Goldman), copied from routine.js:
// the spline passes through p1 and p2 with a velocity set by the
// neighbours AND their spacing. Times t0..t3 must be strictly
// increasing. Used for 'path' segments (ball routes around the body).
function nucr(p0, p1, p2, p3, t0, t1, t2, t3, t) {
  const A1 = ((t1 - t) / (t1 - t0)) * p0 + ((t - t0) / (t1 - t0)) * p1;
  const A2 = ((t2 - t) / (t2 - t1)) * p1 + ((t - t1) / (t2 - t1)) * p2;
  const A3 = ((t3 - t) / (t3 - t2)) * p2 + ((t - t2) / (t3 - t2)) * p3;
  const B1 = ((t2 - t) / (t2 - t0)) * A1 + ((t - t0) / (t2 - t0)) * A2;
  const B2 = ((t3 - t) / (t3 - t1)) * A2 + ((t - t1) / (t3 - t1)) * A3;
  return ((t2 - t) / (t2 - t1)) * B1 + ((t - t1) / (t2 - t1)) * B2;
}
function nucr3(a, b, c, d, t0, t1, t2, t3, t) {
  return [nucr(a[0], b[0], c[0], d[0], t0, t1, t2, t3, t),
          nucr(a[1], b[1], c[1], d[1], t0, t1, t2, t3, t),
          nucr(a[2], b[2], c[2], d[2], t0, t1, t2, t3, t)];
}

// Evaluate a 'path' segment's spline at parameter u in [0, 1].
// s.pts: [[x,y,z], ...] (p0, vias, p1); s.us: the matching parameters.
function evalPath(s, u) {
  const { pts, us } = s;
  const n = pts.length;
  u = Math.min(1, Math.max(0, u));
  if (u <= 0) return pts[0];
  if (u >= 1) return pts[n - 1];
  let i = 0;
  while (i < n - 2 && u >= us[i + 1]) i++;
  // Neighbours with mirrored parameters at the ends (strictly increasing).
  const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1],
        p3 = pts[Math.min(n - 1, i + 2)];
  const t1 = us[i], t2 = us[i + 1];
  const t0 = i === 0 ? t1 - (t2 - t1) : us[i - 1];
  const t3 = i + 2 >= n ? t2 + (t2 - t1) : us[i + 2];
  return nucr3(p0, p1, p2, p3, t0, t1, t2, t3, u);
}

// Arc-length table for a 'path' segment: the Catmull-Rom's parameter
// speed varies wildly with the via spacing (Stage 12 audit: the
// behind-back ball ran 1.34-6.89 m/s, a 5x swing — it crawled, then
// rocketed). Re-parameterising by arc length makes the ball travel at
// constant speed along the route, the way a firm guided pass does.
// table: [[u, cumulative length], ...] over 200 samples; length: total.
function buildArcTable(s) {
  const N = 200;
  const table = [[0, 0]];
  let prev = evalPath(s, 0);
  let len = 0;
  for (let i = 1; i <= N; i++) {
    const u = i / N;
    const p = evalPath(s, u);
    len += Math.hypot(p[0] - prev[0], p[1] - prev[1], p[2] - prev[2]);
    table.push([u, len]);
    prev = p;
  }
  return { table, length: len };
}
// Map a fractional distance (0-1) along the path to the spline's u.
function arcToU(s, frac) {
  const { table, length } = s.arc;
  const target = frac * length;
  let lo = 0, hi = table.length - 1;
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1;
    if (table[mid][1] < target) lo = mid; else hi = mid;
  }
  const [u0, l0] = table[lo], [u1, l1] = table[hi];
  const t = l1 > l0 ? (target - l0) / (l1 - l0) : 0;
  return u0 + (u1 - u0) * t;
}
export function evalFree(seg, t) {
  const { p0, v0 } = seg;
  if (seg.kind === 'bounce' && t >= seg.tB) {
    const tr = t - seg.tB;
    const bx = p0.x + v0.x * seg.tB, bz = p0.z + v0.z * seg.tB;
    return new THREE.Vector3(bx + v0.x * tr, FLOOR_Y + seg.vyR * tr - 0.5 * G * tr * tr, bz + v0.z * tr);
  }
  return new THREE.Vector3(p0.x + v0.x * t, p0.y + v0.y * t - 0.5 * G * t * t, p0.z + v0.z * t);
}

// ---------- Drive ----------

const _v = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _q2 = new THREE.Quaternion();
const _Y = new THREE.Vector3(0, 1, 0);
function smooth(t) { t = Math.min(1, Math.max(0, t)); return t * t * (3 - 2 * t); }

export function createBallDrive(player, poser, routine) {
  const { bones, ball, group } = player;
  group.attach(ball); // the drive owns the ball now, not the hand
  ball.position.set(0, 0, 0);

  // Hand hold (palm) position + orientation at a beat, via the routine pose.
  function handHold(beat, side) {
    routine.applyPose(beat);
    const hp = poser.jointWorld(`hand_${side}`);
    const hq = bones[`hand_${side}`].getWorldQuaternion(new THREE.Quaternion());
    return { pos: hp.clone().add(_v.copy(BALL_OFFSET).applyQuaternion(hq)), quat: hq };
  }
  // Fingertip ball-centre position at a beat (same math as routine.js).
  function tipPos(beat) {
    routine.applyPose(beat);
    const mid = bones.indexMiddle_R.getWorldPosition(new THREE.Vector3());
    const dist = bones.indexDistal_R.getWorldPosition(new THREE.Vector3());
    const dir = new THREE.Vector3().subVectors(dist, mid).normalize();
    return dist.addScaledVector(dir, 0.022 + BALL_R_PHYS);
  }

  // Measured waypoint for a 'path' segment (Stage 13a, contact by
  // construction): the body's pelvis position at `beat` (ground root
  // + pelvis channel, see routine.js), plus `offset` in the body's
  // local frame (x right, y up, z forward), rotated by the body's
  // yaw at that beat. The anchor is measured from the routine; only
  // the offset (the route's shape: how far behind the back, how far
  // out to the sides) is a design parameter. The route follows the
  // body if the routine changes, instead of sitting at absolute
  // positions that go stale.
  function measuredVia(beat, offset) {
    const p = routine.interpolate(beat);
    const c = Math.cos(p.yaw), s = Math.sin(p.yaw);
    const [lx, ly, lz] = offset;
    return new THREE.Vector3(
      p.root[0] + lx * c + lz * s,
      p.pelvis + ly,
      p.root[2] - lx * s + lz * c,
    );
  }

  // Precompute the Free segments: endpoints from the routine, solved arcs.
  // 'path' segments build their waypoint spline from the vias.
  const segs = SEGMENTS.map(([t0, t1, kind, from, to, vias]) => {
    const s = { t0, t1, kind, from, to, T: (t1 - t0) * BEAT };
    if (kind === 'bounce' || kind === 'direct' || kind === 'snatch' || kind === 'path') {
      const a = kind === 'snatch' ? { pos: tipPos(t0) } : handHold(t0, from);
      const b = kind === 'snatch' ? { pos: tipPos(t1) } : handHold(t1, to);
      s.p0 = a.pos; s.p1 = b.pos;
      if (kind === 'bounce') Object.assign(s, solveBounce(s.p0, s.p1, s.T));
      else if (kind === 'path') {
        s.pts = [s.p0.toArray()];
        s.us = [0];
        for (const [u, dx, dy, dz] of vias) {
          s.pts.push(measuredVia(t0 + u * (t1 - t0), [dx, dy, dz]).toArray());
          s.us.push(u);
        }
        s.pts.push(s.p1.toArray());
        s.us.push(1);
        s.arc = buildArcTable(s);
      } else s.v0 = solveDirect(s.p0, s.p1, s.T);
      // Orientation turns gently from the release hand to the catch hand.
      s.q0 = kind === 'snatch' ? null : handHold(t0, from).quat;
      s.q1 = kind === 'snatch' ? null : handHold(t1, to).quat;
    }
    return s;
  });
  // Spin orientation base: the hand quaternion as the ball goes on the finger.
  const qSpin0 = handHold(SPIN_T0, 'R').quat;
  const spinAngle = (beat) => 2 * Math.PI * SPIN_REV * Math.min(Math.max(beat - SPIN_T0, 0), SPIN_T1 - SPIN_T0) * BEAT;
  const spinQuat = (beat) => new THREE.Quaternion().setFromAxisAngle(_Y, spinAngle(beat)).multiply(qSpin0);

  function segAt(beat) {
    beat = ((beat % ROUTINE_BEATS) + ROUTINE_BEATS) % ROUTINE_BEATS;
    for (const s of segs) if (beat >= s.t0 && beat < s.t1) return s;
    return segs[segs.length - 1];
  }

  // Head tracks the ball (Stage 13a): the head pitches/yaws toward
  // the ball, split 40% neck / 60% head, on top of the lean
  // counter-tilt applyPose set. The direction is measured from the
  // posed head to the ball, rotated into the body frame (yaw only —
  // the lean is small, so the pitch is approximate, not a precise
  // aim). Suppressed during the fingertip spin (the ball sits above
  // the head; tracking it would crane the neck) and when the ball is
  // very close to the head (a hand-off near the face would snap the
  // gaze). The quaternions are set directly on the bones (same Euler
  // 'XYZ' math as poser.setJoint) instead of calling setJoint, which
  // would re-solve the whole IK twice per frame for joints no limb
  // depends on.
  const _headPos = new THREE.Vector3(), _ballPos = new THREE.Vector3();
  const _eul = new THREE.Euler(0, 0, 0, 'XYZ');
  function trackHead(beat) {
    const p = routine.interpolate(beat);
    poser.jointWorld('head', _headPos);
    ball.getWorldPosition(_ballPos);
    const dx = _ballPos.x - _headPos.x, dy = _ballPos.y - _headPos.y, dz = _ballPos.z - _headPos.z;
    const dist = Math.hypot(dx, dy, dz);
    // Weight: 0 in the spin (fade 0.5 beats at the edges), 0 when the
    // ball is within 0.35 m of the head (fade in to 0.5 m).
    const inSpin = smooth((beat - (SPIN_T0 - 0.5)) / 0.5) - smooth((beat - SPIN_T1) / 0.5);
    const w = (1 - inSpin) * smooth((dist - 0.35) / 0.15);
    if (w <= 0) return; // lean-only pose stands
    // Direction in the body frame (inverse of localToWorldXZ).
    const c = Math.cos(p.yaw), s = Math.sin(p.yaw);
    const lx = dx * c - dz * s, lz = dx * s + dz * c;
    const trackYaw = Math.min(0.7, Math.max(-0.7, Math.atan2(lx, lz)));
    const trackPitch = Math.min(0.5, Math.max(-0.6, Math.atan2(dy, Math.hypot(lx, lz))));
    // Positive X pitches the face down, so looking up is negative X.
    _eul.set(-p.lean * 0.5 - trackPitch * 0.4 * w, trackYaw * 0.4 * w, 0);
    bones.neck.quaternion.setFromEuler(_eul);
    _eul.set(-p.lean * 0.3 - trackPitch * 0.6 * w, trackYaw * 0.6 * w, 0);
    bones.head.quaternion.setFromEuler(_eul);
  }

  function update(beat) {
    beat = ((beat % ROUTINE_BEATS) + ROUTINE_BEATS) % ROUTINE_BEATS;
    // The drive owns the ball's parenting: routine.update() runs
    // updateBall (Stage 2b) first, which re-parents the ball to the
    // hand bone on every hand change. The positions below are WORLD
    // positions (group-local == world, the group sits at the origin),
    // so the ball must be the group's child when they are written —
    // otherwise a world position lands in hand-local space and the
    // ball floats ~0.9 m off the hand (found by the Stage 7 visual
    // check at beat 10.5). attach() preserves the current world
    // transform, which this update overwrites unconditionally below.
    if (ball.parent !== group) group.attach(ball);
    const s = segAt(beat);
    routine.applyPose(beat);
    const hand = bones[`hand_${s.from}`];
    const hp = poser.jointWorld(`hand_${s.from}`);
    const hq = hand.getWorldQuaternion(new THREE.Quaternion());
    const palm = hp.clone().add(_v.copy(BALL_OFFSET).applyQuaternion(hq));
    if (s.kind === 'control') {
      if (beat >= SPIN_T1 && beat < SPIN_T1 + 0.5) {
        // Gather: ball comes off the fingertip back into the palm.
        const u = smooth((beat - SPIN_T1) / 0.5);
        ball.position.lerpVectors(tipPos(beat), palm, u);
        ball.quaternion.slerpQuaternions(spinQuat(SPIN_T1), hq, u);
      } else {
        ball.position.copy(palm);
        ball.quaternion.copy(hq);
      }
    } else if (s.kind === 'spin') {
      const tip = tipPos(beat);
      if (beat < SPIN_T0 + 0.5) {
        // Placement: hand lifts the ball onto the finger.
        ball.position.lerpVectors(palm, tip, smooth((beat - SPIN_T0) / 0.5));
      } else {
        ball.position.copy(tip);
      }
      ball.quaternion.copy(spinQuat(beat));
    } else if (s.kind === 'path') {
      // Measured route (behind the back): the ball follows the
      // Catmull-Rom through the measured vias, not a ballistic arc.
      // Arc-length parameterisation: constant speed along the route
      // (Stage 12 — the raw spline parameter swung the speed 5x).
      const u = arcToU(s, (beat - s.t0) / (s.t1 - s.t0));
      ball.position.set(...evalPath(s, u));
      ball.quaternion.slerpQuaternions(s.q0, s.q1, Math.min(1, u));
    } else {
      // Free: ballistic arc (+ orientation turn, or spin during the snatch).
      const t = (beat - s.t0) * BEAT;
      ball.position.copy(evalFree(s, t));
      if (s.kind === 'snatch') ball.quaternion.copy(spinQuat(beat));
      else ball.quaternion.slerpQuaternions(s.q0, s.q1, Math.min(1, t / s.T));
    }
    trackHead(beat); // head follows the ball (after the pose + ball)
    return s;
  }

  return { update, segAt, segs, tipPos, handHold, spinQuat, SPIN_T0, SPIN_T1 };
}
