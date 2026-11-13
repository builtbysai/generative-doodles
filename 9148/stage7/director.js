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

  // `routineBeatOverride` (Stage 8): when the routine loops a section,
  // the viewer passes the LOOPED routine beat here; shots use it while
  // the street breath and sceneManager.update still use the absolute
  // beat. Omitted = current behaviour (routine beat = beat % 24).
  function update(beat, routineBeatOverride) {
    const rb = routineBeatOverride !== undefined
      ? routineBeatOverride
      : ((beat % ROUTINE_BEATS) + ROUTINE_BEATS) % ROUTINE_BEATS;
    const shot = shotAt(rb);
    currentShot = shot;
    const t = smooth((rb - shot.at) / shot.dur);
    let az = lerp(shot.az, shot.azEnd !== undefined ? shot.azEnd : shot.az, t);
    let dist = lerp(shot.dist, shot.distEnd !== undefined ? shot.distEnd : shot.dist, t);
    // Street-change signature: a 1-beat "breath" over the first beat of
    // each new street (skipped at the piece's start). sin^2 starts and
    // ends at rest, so the excursion is smooth in and out, completes
    // within 1 beat (0.42 s at 144 BPM), and never overshoots.
    if (beat >= BEATS_PER_STREET) {
      const sb = beat % BEATS_PER_STREET;
      if (sb < 1) {
        const sn = Math.sin(Math.PI * sb);
        const s = sn * sn;
        dist *= 1 - 0.1 * s;
        az += D(10) * s;
      }
    }
    camera.position.set(Math.sin(az) * dist, shot.height, Math.cos(az) * dist);
    if (shot.ballTarget) player.ball.getWorldPosition(tmpTarget);
    else tmpTarget.set(0, shot.targetY, 0);
    camera.lookAt(tmpTarget);
    if (shot.roll) camera.rotateZ(shot.roll);
    if (camera.fov !== shot.fov) {
      camera.fov = shot.fov;
      camera.updateProjectionMatrix();
    }
    // Pass the ACTUAL azimuth so the backdrop counter-rotates to the
    // directed camera (scene.js falls back to the orbit when omitted).
    sceneManager.update(beat, az);
    return shot;
  }

  return {
    update,
    shotAt,
    moveFor,
    get shots() { return SHOTS; },
    get currentShot() { return currentShot; },
  };
}
