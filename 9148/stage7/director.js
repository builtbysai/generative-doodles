// director.js - Stage 7: the camera director.
//
// A shot list over the 24-beat routine loop, cut hard on integer
// beats, with slow within-shot drifts (smoothstep, zero overshoot)
// and one signature transition for street changes: a 1-beat "breath"
// (push in 10% + drift 10 degrees and back, sin^2 eased so it starts
// and ends at rest - no snap at either end, no overshoot).
//
// THE AZIMUTH SWEEP is the design. The character faces +Z (yaw 0) for
// beats 0-9 and 12-24; the spin move (9-12) turns him a full 360
// degrees. The camera orbits 0 -> 175 degrees during the crossover
// sequence (beats 3-9), so the behind-the-back REAR three-quarter
// shot is REACHED by gradual orbit, never by a 180-degree flip (max
// consecutive change 30 degrees, start-to-start). It holds near the
// rear through the spin (the turn reads against the landmark), then
// sweeps back to the front for the finger-spin close-up and the
// resolve wide. The loop seam is clean: the last shot and the first
// both sit at azimuth 0.
//
// Close-ups target the BALL (on the fingertip), not a fixed height.
// NOTE FOR THE AUDIT: a close-up crops the feet by design - the
// hero-in-frame subject for close-up shots is the ball + head, not
// the whole body (see test-7.py).

import * as THREE from '../stage1/vendor/three.module.js';
import { ROUTINE_BEATS } from '../stage2/routine.js';
import { BEATS_PER_STREET } from '../stage5/scene.js';

const D = (deg) => (deg * Math.PI) / 180;
function smooth(t) { t = Math.min(1, Math.max(0, t)); return t * t * (3 - 2 * t); }
function lerp(a, b, t) { return a + (b - a) * t; }

// Shortest-arc azimuth difference in degrees (for the 180-degree rule).
export function azimuthChangeDeg(a, b) {
  let d = ((b - a) * 180) / Math.PI;
  d = ((d % 360) + 540) % 360 - 180;
  return Math.abs(d);
}

// Shot list: at/dur in routine beats; az in radians (D() converts
// degrees for readability); dist/height in metres; targetY the lookAt
// height (ignored when ballTarget); fov degrees; roll radians (Dutch
// angle, used once). azEnd/distEnd: within-shot drift endpoints,
// smoothstepped (drifts stay <= 10 degrees / <= 10% of dist).
// Heights/targetY re-framed for the chibi rig (Stage 13b, 1.64 m):
// the same shots, lowered to the shorter character.
export const SHOTS = [
  // Control dribble: opening medium-wide, slow push-in.
  { at: 0, dur: 2, az: D(0), azEnd: D(10), dist: 6.0, distEnd: 5.5, height: 1.85, targetY: 0.85, fov: 40, roll: 0 },
  { at: 2, dur: 1, az: D(20), azEnd: D(25), dist: 5.0, height: 1.6, targetY: 0.8, fov: 40, roll: 0 },
  // Crossover: LOW angles, orbit begins (the ball is driven low, the
  // camera goes low with it so the ball reads against the backdrop).
  { at: 3, dur: 1, az: D(50), azEnd: D(55), dist: 4.0, height: 0.7, targetY: 0.65, fov: 42, roll: 0 },
  { at: 4, dur: 1, az: D(80), azEnd: D(85), dist: 4.0, height: 0.6, targetY: 0.65, fov: 42, roll: 0.06 },
  // Between the legs: LOW, orbit continues to the rear.
  { at: 5, dur: 1, az: D(110), azEnd: D(115), dist: 3.5, height: 0.75, targetY: 0.65, fov: 44, roll: 0 },
  { at: 6, dur: 1, az: D(140), azEnd: D(145), dist: 4.0, height: 0.85, targetY: 0.72, fov: 42, roll: 0 },
  // Behind the back: REAR three-quarter, LOW. The ball passes behind
  // the body at ~0.60 m; the low rear camera sees it against the sky.
  { at: 7, dur: 1, az: D(165), azEnd: D(168), dist: 4.5, height: 0.85, targetY: 0.72, fov: 40, roll: 0 },
  { at: 8, dur: 1, az: D(175), azEnd: D(172), dist: 3.5, height: 0.75, targetY: 0.72, fov: 44, roll: 0 },
  // Spin move: hold near the rear while he turns 360 degrees.
  { at: 9, dur: 1, az: D(170), azEnd: D(165), dist: 5.0, height: 1.7, targetY: 0.8, fov: 40, roll: 0 },
  { at: 10, dur: 2, az: D(150), azEnd: D(140), dist: 6.5, distEnd: 6.0, height: 2.1, targetY: 0.85, fov: 38, roll: 0 },
  // Around the world: sweep back toward the front.
  { at: 12, dur: 1, az: D(120), azEnd: D(115), dist: 5.0, height: 1.7, targetY: 0.8, fov: 40, roll: 0 },
  { at: 13, dur: 2, az: D(90), azEnd: D(80), dist: 4.0, distEnd: 3.8, height: 1.5, targetY: 0.8, fov: 40, roll: 0 },
  // Retrieval dribble: front three-quarter, settling.
  { at: 15, dur: 1, az: D(60), azEnd: D(55), dist: 5.0, height: 1.7, targetY: 0.8, fov: 40, roll: 0 },
  { at: 16, dur: 2, az: D(30), azEnd: D(20), dist: 5.0, distEnd: 4.5, height: 1.85, targetY: 0.85, fov: 40, roll: 0 },
  // Finger spin: CLOSE-UP, target the ball on the fingertip.
  { at: 18, dur: 2, az: D(10), dist: 2.5, distEnd: 2.2, height: 1.35, targetY: 0.95, fov: 40, roll: 0, ballTarget: true },
  { at: 20, dur: 2, az: D(0), dist: 2.0, distEnd: 1.9, height: 1.3, targetY: 0.95, fov: 42, roll: 0, ballTarget: true },
  // Resolve: WIDE. The gather + the loop's return, whole street.
  { at: 22, dur: 2, az: D(0), dist: 8.0, distEnd: 8.5, height: 2.1, targetY: 0.85, fov: 40, roll: 0 },
];

export function createDirector({ camera, player, routine, sceneManager }) {
  const tmpTarget = new THREE.Vector3();
  let currentShot = SHOTS[0];

  function shotAt(beat) {
    const rb = ((beat % ROUTINE_BEATS) + ROUTINE_BEATS) % ROUTINE_BEATS;
    for (const s of SHOTS) {
      if (rb >= s.at && rb < s.at + s.dur) return s;
    }
    return SHOTS[0]; // unreachable for rb in [0, 24); defensive
  }

  // The move a shot covers (mid-shot beat), for the shot-to-move audit.
  function moveFor(shot) {
    return routine.moveAt(shot.at + shot.dur / 2).name;
  }

  // The original director jumped straight from one shot's last frame
  // to the next shot's start (sometimes changing both radius and height
  // dramatically). Treat the shot starts as periodic camera control
  // points instead: monotone cubic Hermite interpolation gives continuous
  // POSITION AND VELOCITY across boundaries, without zoom overshoot.
  // This preserves the authored angles/framing and the 24-beat loop.
  function pchipSlope(d0, d1, h0, h1) {
    if (d0 * d1 <= 0 || !Number.isFinite(d0 + d1)) return 0;
    const w0 = 2 * h1 + h0, w1 = h1 + 2 * h0;
    return (w0 + w1) / (w0 / d0 + w1 / d1);
  }
  function channel(a, b, prev, after, t0, t1, tp, ta, value, u) {
    const h0 = t0 - tp, h1 = t1 - t0, h2 = ta - t1;
    const d0 = (value(a) - value(prev)) / h0;
    const d1 = (value(b) - value(a)) / h1;
    const d2 = (value(after) - value(b)) / h2;
    const m0 = pchipSlope(d0, d1, h0, h1);
    const m1 = pchipSlope(d1, d2, h1, h2);
    const u2 = u * u, u3 = u2 * u;
    return (2*u3 - 3*u2 + 1) * value(a)
      + (u3 - 2*u2 + u) * h1 * m0
      + (-2*u3 + 3*u2) * value(b)
      + (u3 - u2) * h1 * m1;
  }
  const ballTarget = new THREE.Vector3();
  const PERIOD = ROUTINE_BEATS;
  const N = SHOTS.length;
  function update(beat, routineBeatOverride) {
    const rb = ((routineBeatOverride !== undefined ? routineBeatOverride : beat) % PERIOD + PERIOD) % PERIOD;
    let i = 0;
    while (i + 1 < N && rb >= SHOTS[i + 1].at) i++;
    const a = SHOTS[i], b = SHOTS[(i + 1) % N];
    const prev = SHOTS[(i + N - 1) % N], after = SHOTS[(i + 2) % N];
    const t0 = a.at;
    const t1 = i === N - 1 ? PERIOD : b.at;
    const tp = i === 0 ? prev.at - PERIOD : prev.at;
    const ta = i >= N - 2 ? after.at + PERIOD : after.at;
    const u = Math.min(1, Math.max(0, (rb - t0) / (t1 - t0)));
    const sample = (key) => channel(a, b, prev, after, t0, t1, tp, ta, s => s[key], u);
    currentShot = a;
    let az = sample('az');
    let dist = sample('dist');
    const height = sample('height');
    const fov = sample('fov');
    const roll = sample('roll');
    const targetY = sample('targetY');
    const focus = channel(a, b, prev, after, t0, t1, tp, ta, s => s.ballTarget ? 1 : 0, u);

    // A one-beat street-change breath is an additive, zero-velocity
    // excursion; it doesn't introduce a camera cut.
    if (beat >= BEATS_PER_STREET) {
      const sb = ((beat % BEATS_PER_STREET) + BEATS_PER_STREET) % BEATS_PER_STREET;
      if (sb < 1) {
        const v = Math.sin(Math.PI * sb);
        dist *= 1 - 0.1 * v * v;
        az += D(10) * v * v;
      }
    }
    camera.position.set(Math.sin(az) * dist, height, Math.cos(az) * dist);
    tmpTarget.set(0, targetY, 0);
    if (focus > 0) {
      player.ball.getWorldPosition(ballTarget);
      tmpTarget.lerp(ballTarget, Math.min(1, Math.max(0, focus)));
    }
    camera.lookAt(tmpTarget);
    if (roll) camera.rotateZ(roll);
    if (Math.abs(camera.fov - fov) > 0.00001) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
    sceneManager.update(beat, az);
    return a;
  }

  return {
    update,
    shotAt,
    moveFor,
    get shots() { return SHOTS; },
    get currentShot() { return currentShot; },
  };
}
