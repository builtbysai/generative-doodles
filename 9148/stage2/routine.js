// routine.js — Stage 2b: the 24-beat freestyle routine (144 BPM, 10.0 s).
//
// Keyframe-based, beat-driven, procedural posing on the Stage 2a IK system.
// No AnimationMixer. Every frame: reset to bind, then apply the interpolated
// pose for the current beat. The loop seam is exact by construction: the last
// keyframe IS the first keyframe (same pose object), so beat 24 == beat 0.
//
// The ball stays parented to the active hand in this stage (Stage 3 takes
// over the hybrid ball drive). Hand changes re-parent the ball with attach(),
// which preserves its world transform. During the finger spin the ball is
// placed on the index fingertip instead of under the palm.
//
// Arm reach is ~0.49 m (chibi proportions, Stage 13b), so dribbles
// work at waist height (0.6-0.7 m) with torso lean — a real control
// dribble, not a knee-height one. Low moves use a deeper crouch +
// lean to stay in reach.
import * as THREE from 'three';
import { palmDownQuat } from './pose.js';

export const BPM = 144;
export const BEAT = 60 / BPM; // 0.41667 s
export const ROUTINE_BEATS = 24;
export const ROUTINE_SECS = ROUTINE_BEATS * BEAT; // 10.0 s

// Move map: [name, startBeat, endBeat]. Whole beats only; boundaries on beats.
export const MOVE_MAP = [
  { name: 'Control dribble', start: 0, end: 3 },
  { name: 'Crossover', start: 3, end: 5 },
  { name: 'Between the legs', start: 5, end: 7 },
  { name: 'Behind the back', start: 7, end: 9 },
  { name: 'Spin move', start: 9, end: 12 },
  { name: 'Around the world', start: 12, end: 15 },
  { name: 'Retrieval dribble', start: 15, end: 18 },
  { name: 'Finger spin', start: 18, end: 24 },
];

// Which hand holds the ball during each move (Stage 3 replaces this with the
// hybrid drive; here it drives the re-parenting at move boundaries).
export const BALL_HAND = {
  'Control dribble': 'R',
  'Crossover': 'L', // ends in the left hand
  'Between the legs': 'R',
  'Behind the back': 'L',
  'Spin move': 'L',
  'Around the world': 'L', // ball stays in L; R hand mirrors behind
  'Retrieval dribble': 'R',
  'Finger spin': 'R',
};

function clamp01(x) { return Math.min(1, Math.max(0, x)); }
function smooth(t) { t = clamp01(t); return t * t * (3 - 2 * t); }
// Procedural movement layers fade in/out at move boundaries, avoiding
// the hard velocity changes of per-move sine functions.
function motionWindow(beat, start, end, edge = 0.5) {
  return smooth((beat - start) / edge) * (1 - smooth((beat - end + edge) / edge));
}
function lerp(a, b, t) { return a + (b - a) * t; }
function lerp3(a, b, t) { return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]; }
// Non-uniform Catmull-Rom (Barry-Goldman), time-parameterized by the
// keyframes' actual beats: the spline passes through p1 and p2 with a
// velocity set by the neighbours AND their spacing, so the motion
// flows through the keyframes at a steady rate. Uniform CR (the
// first fix) treated the 0.4-beat crossover steps and the 2-beat
// snatch as equal, which rushed the long segments and crawled the
// short ones. Times t0..t3 must be strictly increasing (the caller
// unwraps the loop neighbours).
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

// Keyframe: every channel present (null = hold, but the framework fills
// nulls from the previous keyframe at build time, so interpolation is total).
// root: [x, z] root travel in the ground plane (y stays 0 — the root
// is travel + sway only). pelvis: y pelvis height (crouch, bob, jump,
// accents). The two channels are splined separately (Stage 13a): the
// skeleton's root bone IS the pelvis (BIND_ROOT in pose.js), so the
// separation is in the routine, not the rig — interpolate() composes
// the bone position as (rootX, pelvisY, rootZ). yaw: root yaw in
// radians (unwrapped for spins).
// lean: forward torso lean in radians (applied to spine2/spine3/chest).
// hands: { L: [x, y, z] | null, R: ... } — null clears the target.
// palm: { L: bool, R: bool } — true = palm down (setJointWorld after IK).
// (The feet are NOT a keyframe channel: since Stage 13a they are a
// state machine — see FOOT_START/STEPS/footState below. A planted foot
// is held exactly by the run, a step is a sine lift over a schedule.)
const K = (beat, o) => ({ beat, ...o });

// The stance everything returns to: athletic dribble stance, right hand low.
const STANCE = {
  root: [0, 0], pelvis: 0.68, yaw: 0, lean: 0.22,
  hands: { L: [-0.28, 0.69, 0.18], R: [0.30, 0.64, 0.28] },
  palm: { L: false, R: true },
};

const KEYFRAMES = [
  // ---- Control dribble (beats 0-3): right hand, waist height, two dribbles.
  // Hand bobs: push (low) on the beat, recover (high) between.
  K(0.0, { ...STANCE }),
  K(0.9, { ...STANCE, root: [0, 0], pelvis: 0.66, hands: { L: [-0.28, 0.67, 0.18], R: [0.30, 0.57, 0.30] }, lean: 0.30 }),
  K(1.8, { ...STANCE, root: [0, 0], pelvis: 0.66, hands: { L: [-0.28, 0.67, 0.18], R: [0.30, 0.62, 0.28] }, lean: 0.30 }),
  K(2.7, { ...STANCE, root: [0, 0], pelvis: 0.66, hands: { L: [-0.28, 0.67, 0.18], R: [0.30, 0.57, 0.30] }, lean: 0.30 }),
  K(3.0, { ...STANCE }),

  // ---- Crossover (beats 3-5): ball driven low across the body, R -> L.
  // Hips shift left, right hand sweeps low across, left hand receives low.
  K(3.6, {
    root: [-0.06, 0], pelvis: 0.65, yaw: 0.15, lean: 0.32,
    hands: { L: [-0.10, 0.59, 0.30], R: [0.05, 0.56, 0.32] },
    palm: { L: true, R: true },
  }),
  K(4.4, {
    root: [-0.10, 0], pelvis: 0.67, yaw: 0.10, lean: 0.24,
    hands: { L: [-0.30, 0.63, 0.28], R: [0.28, 0.69, 0.18] },
    palm: { L: true, R: false },
  }),
  // ---- Setup step (beat 4.7): the player hops into the wide stance
  // for the between-the-legs, BEFORE the ball leaves the left hand
  // (Stage 12: the feet used to spread DURING the ball's pass, so the
  // legs were still narrow when the ball threaded them and it clipped
  // both shins by 13-18 cm). The footwork itself is the state
  // machine's 4.4-5.0 step (see STEPS); this keyframe is the body's
  // half of the hop.
  K(4.7, {
    root: [-0.09, 0], pelvis: 0.66, yaw: 0.05, lean: 0.23,
    hands: { L: [-0.22, 0.63, 0.28], R: [0.28, 0.69, 0.18] },
    palm: { L: true, R: false },
  }),
  K(5.0, {
    root: [-0.08, 0], pelvis: 0.65, yaw: 0, lean: 0.22,
    hands: { L: [-0.15, 0.64, 0.28], R: [0.28, 0.69, 0.18] },
    palm: { L: true, R: false },
  }),

  // ---- Between the legs (beats 5-7): ball through the legs, L -> R.
  // Left leg forward, right leg back; the ball bounces between the
  // spread feet. The left hand releases from near the centre (Stage 12:
  // releasing from out left put the ball's descent right through the
  // left knee) and the left foot is only moderately forward, so the
  // knee sits behind the ball's descending line.
  K(5.8, {
    root: [0, 0], pelvis: 0.64, yaw: -0.08, lean: 0.30,
    hands: { L: [-0.02, 0.47, 0.08], R: [0.24, 0.64, -0.05] },
    palm: { L: true, R: false },
  }),
  K(6.6, {
    root: [0.02, 0], pelvis: 0.65, yaw: 0.05, lean: 0.24,
    // Right hand OUT to the side (Stage 12): the old low hold sat the
    // ball against the right thigh and belly for 1.35 beats. The arm is
    // at full extension here, so the target's DIRECTION is what moves
    // the clamped hand sideways, clear of the leg.
    hands: { L: [-0.28, 0.69, 0.18], R: [0.45, 0.62, 0.05] },
    palm: { L: false, R: true },
  }),
  K(7.0, {
    root: [0, 0], pelvis: 0.68, yaw: 0, lean: 0.22,
    hands: { L: [-0.28, 0.69, 0.18], R: [0.30, 0.64, 0.28] },
    palm: { L: false, R: true },
  }),

  // ---- Behind the back (beats 7-9): ball guided behind, R -> L.
  // Right hand sweeps behind the back, left hand receives on the far side.
  K(7.8, {
    root: [0.02, 0], pelvis: 0.65, yaw: -0.18, lean: 0.26,
    hands: { L: [-0.24, 0.61, -0.18], R: [0.12, 0.59, -0.28] },
    palm: { L: true, R: true },
  }),
  K(8.6, {
    root: [-0.04, 0], pelvis: 0.68, yaw: -0.05, lean: 0.22,
    hands: { L: [-0.30, 0.64, 0.28], R: [0.28, 0.69, 0.18] },
    palm: { L: true, R: false },
  }),
  K(9.0, {
    root: [0, 0], pelvis: 0.65, yaw: 0, lean: 0.28,
    hands: { L: [-0.30, 0.61, 0.28], R: [0.28, 0.65, 0.18] },
    palm: { L: true, R: false },
  }),

  // ---- Spin move (beats 9-12): full 360-degree pivot on the left foot.
  // Yaw is unwrapped (0 -> 2π); hands are body-relative (handsBody) so the
  // arms do not wind up around the torso. The footwork is the state
  // machine's three spin steps (see STEPS): the left foot is the pivot
  // (planted, never flat, rotating on the ball of the foot) and the
  // right foot steps around it. FEET ARE WORLD TARGETS (the poser does
  // not rotate them by the yaw), so the stepping foot's positions are
  // PRE-ROTATED by the yaw at each step: the body-local step
  // [0.22, 0.17, 0.10] at yaw pi is world [-0.22, 0.17, -0.10], and
  // [0.10, 0.12, -0.30] at yaw 3pi/2 is world [0.30, 0.12, 0.10].
  // Without this the legs cross at yaw pi (the foot stays on the
  // body's original side while the hips rotate away). The stepping
  // foot lifts LOW (0.065 above the floor) and stays close in (0.22):
  // a higher/wider lift read as a scissor kick in the Stage 11 review.
  K(10.0, {
    root: [0, 0], pelvis: 0.65, yaw: Math.PI, lean: 0.24,
    handsBody: { L: [-0.42, 0.62, 0.26], R: [0.28, 0.68, 0.18] },
    palm: { L: true, R: false },
  }),
  K(11.0, {
    root: [0, 0], pelvis: 0.65, yaw: Math.PI * 1.5, lean: 0.24,
    handsBody: { L: [-0.42, 0.62, 0.26], R: [0.28, 0.68, 0.18] },
    palm: { L: true, R: false },
  }),
  K(12.0, {
    root: [0, 0], pelvis: 0.68, yaw: Math.PI * 2, lean: 0.22,
    hands: { L: [-0.30, 0.64, 0.28], R: [0.28, 0.69, 0.18] },
    palm: { L: true, R: false },
  }),

  // ---- Around the world (beats 12-15): ball circles the waist.
  // Yaw stays at 2π as the base (continuous with the spin). Left hand
  // carries the ball across the front; right hand mirrors behind.
  // SIDE KEYFRAMES (Stage 12): without them the hands interpolate
  // straight from front-centre to back-centre THROUGH the torso, and
  // the ball (in the left hand) spent 1.25 beats inside the belly and
  // both thighs. The 13.5/14.5 keyframes route both hands around the
  // waist — left hand around the left side, right hand around the
  // right side, behind the back — so the ball sweeps the waist.
  K(13.0, {
    root: [0, 0], pelvis: 0.68, yaw: Math.PI * 2 + 0.12, lean: 0.22,
    hands: { L: [0.05, 0.63, 0.34], R: [-0.18, 0.64, -0.22] },
    palm: { L: true, R: false },
  }),
  K(13.5, {
    root: [0, 0], pelvis: 0.68, yaw: Math.PI * 2, lean: 0.22,
    hands: { L: [-0.38, 0.63, 0.08], R: [0.35, 0.64, -0.25] },
    palm: { L: true, R: false },
  }),
  // Mid-transition pins (Stage 12): the spline between the side
  // keyframes bowed inward and the ball still grazed the torso and
  // left thigh. These hold the hands out at the left-back diagonal.
  K(13.75, {
    root: [0, 0], pelvis: 0.68, yaw: Math.PI * 2 - 0.06, lean: 0.22,
    hands: { L: [-0.40, 0.63, -0.12], R: [0.38, 0.64, 0.0] },
    palm: { L: true, R: false },
  }),
  K(14.0, {
    root: [0, 0], pelvis: 0.68, yaw: Math.PI * 2 - 0.12, lean: 0.22,
    // Left hand stays on the LEFT-BACK diagonal (Stage 13b): the old
    // centre-back hold (-0.05, -0.22) put the ball against the left
    // shorts at the back pass (thighL -0.064, torso -0.063). The hand
    // is out of reach here, so the IK clamps it to the widest the arm
    // allows — and the clamped position clears the shorts.
    hands: { L: [-0.18, 0.63, -0.34], R: [0.28, 0.64, 0.28] },
    palm: { L: false, R: true },
  }),
  K(14.25, {
    root: [0, 0], pelvis: 0.68, yaw: Math.PI * 2 - 0.09, lean: 0.22,
    hands: { L: [-0.40, 0.63, -0.10], R: [0.36, 0.64, 0.18] },
    palm: { L: false, R: true },
  }),
  K(14.5, {
    root: [0, 0], pelvis: 0.68, yaw: Math.PI * 2 - 0.06, lean: 0.22,
    hands: { L: [-0.38, 0.64, 0.02], R: [0.35, 0.64, 0.10] },
    palm: { L: false, R: true },
  }),
  K(15.0, {
    root: [0, 0], pelvis: 0.68, yaw: Math.PI * 2, lean: 0.22,
    hands: { L: [-0.28, 0.69, 0.18], R: [0.30, 0.64, 0.28] },
    palm: { L: false, R: true },
  }),

  // ---- Retrieval dribble (beats 15-18): ball pushed up and away, flicked back.
  K(16.0, {
    root: [0, 0], pelvis: 0.70, yaw: Math.PI * 2, lean: 0.10,
    hands: { L: [-0.28, 0.69, 0.18], R: [0.35, 0.83, 0.45] },
    palm: { L: false, R: true },
  }),
  K(17.0, {
    root: [0, 0], pelvis: 0.68, yaw: Math.PI * 2, lean: 0.24,
    hands: { L: [-0.28, 0.69, 0.18], R: [0.30, 0.65, 0.30] },
    palm: { L: false, R: true },
  }),
  K(18.0, {
    root: [0, 0], pelvis: 0.68, yaw: Math.PI * 2, lean: 0.22,
    hands: { L: [-0.28, 0.69, 0.18], R: [0.30, 0.64, 0.28] },
    palm: { L: false, R: true },
  }),

  // ---- Finger spin (beats 18-24): the signature moment.
  // Right arm rises, index finger up, ball balanced on the fingertip
  // (ball placement is per-frame logic in updateBall, not a keyframe).
  // 20.0: behind-the-back transfer (arm sweeps behind, ball stays spinning).
  // 21.5-22.5: snatch (ball tossed up, caught back on the finger).
  // 23.0: resolve — hand lowers, ball back in the palm, stance returns.
  K(19.0, {
    root: [0, 0], pelvis: 0.69, yaw: Math.PI * 2, lean: 0.08,
    hands: { L: [-0.30, 0.69, 0.15], R: [0.42, 0.95, 0.30] },
    palm: { L: false, R: false }, spinHand: 'R',
  }),
  K(20.0, {
    root: [0, 0], pelvis: 0.69, yaw: Math.PI * 2 + 0.30, lean: 0.08,
    // Hand out to the right-back (Stage 13b): the old near-centre hold
    // (0.15, -0.25) swung the fingertip ball past the big chibi head
    // (head -0.046 at 20.35). Out at (0.28, -0.32) the transfer arc
    // clears the skull.
    hands: { L: [-0.30, 0.69, 0.15], R: [0.28, 0.95, -0.32] },
    palm: { L: false, R: false }, spinHand: 'R',
  }),
  K(21.0, {
    root: [0, 0], pelvis: 0.69, yaw: Math.PI * 2, lean: 0.08,
    hands: { L: [-0.30, 0.69, 0.15], R: [0.42, 0.95, 0.30] },
    palm: { L: false, R: false }, spinHand: 'R',
  }),
  K(23.0, {
    root: [0, 0], pelvis: 0.68, yaw: Math.PI * 2, lean: 0.22,
    hands: { L: [-0.28, 0.69, 0.18], R: [0.30, 0.64, 0.28] },
    palm: { L: false, R: true },
  }),

  // ---- Seam: beat 24 == beat 0 (same stance, yaw 2π == 0 orientation).
  K(24.0, { ...STANCE, yaw: Math.PI * 2 }),
];

// ---------- Engine ----------

// Rotate a body-local (x, z) offset by yaw into world space (three.js Ry).
function localToWorldXZ(lx, lz, yaw, rootX, rootZ) {
  const c = Math.cos(yaw), s = Math.sin(yaw);
  return [rootX + lx * c + lz * s, rootZ - lx * s + lz * c];
}
function worldToLocalXZ(wx, wz, yaw, rootX, rootZ) {
  const c = Math.cos(yaw), s = Math.sin(yaw);
  const dx = wx - rootX, dz = wz - rootZ;
  return [dx * c - dz * s, dx * s + dz * c];
}

// Normalize every keyframe's hands to BODY-LOCAL offsets (x/z rotated by the
// keyframe's own yaw). Interpolating in local space keeps the hands glued to
// the body's sides through the 360-degree spin instead of cutting through it.
function normalizeHands(kf) {
  const out = { ...kf };
  const hands = {};
  for (const side of ['L', 'R']) {
    if (kf.handsBody && kf.handsBody[side]) {
      hands[side] = [...kf.handsBody[side]];
    } else if (kf.hands && kf.hands[side]) {
      const [lx, lz] = worldToLocalXZ(kf.hands[side][0], kf.hands[side][2], kf.yaw, kf.root[0], kf.root[1]);
      hands[side] = [lx, kf.hands[side][1], lz];
    } else {
      hands[side] = null;
    }
  }
  out.handsLocal = hands;
  return out;
}
const KEYS = KEYFRAMES.map(normalizeHands);

function moveAt(beat) {
  for (const m of MOVE_MAP) if (beat >= m.start && beat < m.end) return m;
  return MOVE_MAP[MOVE_MAP.length - 1];
}

// Hand orientation for the finger spin: index finger pointing straight up,
// palm facing back. Derived from palm-down: flip 180 deg about Z (palm up,
// fingers forward), then -90 deg about X (fingers up, palm back).
const _qx = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
const _qz = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI);
function spinFingerQuat() {
  return new THREE.Quaternion().copy(_qx).multiply(_qz).multiply(palmDownQuat('R'));
}

// Hand-off timing: the ball switches hands when the hands MEET mid-move,
// not at the move boundary. Before the hand-off beat the ball stays with
// the passing hand (the previous move's hand); after it, with the receiver.
const HANDOFF_BEAT = { 'Crossover': 3.6, 'Between the legs': 6.5, 'Behind the back': 7.8 };
function ballHandFor(beat) {
  const move = moveAt(beat);
  const handoff = HANDOFF_BEAT[move.name] ?? move.start;
  if (beat < handoff) {
    const idx = MOVE_MAP.indexOf(move);
    const prev = MOVE_MAP[(idx + MOVE_MAP.length - 1) % MOVE_MAP.length];
    return BALL_HAND[prev.name];
  }
  return BALL_HAND[move.name];
}

const BALL_R = 0.12; // visual ball radius (the mesh, the floor contact)
const BALL_R_PHYS = 0.135; // physics radius: contact is computed at a
// slightly generous radius, so hand-offs read as contact instead of
// floating or clipping (Stage 13a). The ball's centre sits 0.135 from
// the palm/fingertip; the visual surface is 15 mm short of the contact
// surface — invisible at the piece's framing (~2 px at full body).
const BALL_OFFSET = new THREE.Vector3(0, -0.130, 0.034); // standard palm hold (|offset| = BALL_R_PHYS)
const SPIN_START = 18.5, SPIN_END = 23.0; // ball-on-fingertip window (beats)
const SNATCH_START = 21.5, SNATCH_END = 22.5;

export function createRoutine(player, poser) {
  const { bones, ball, group } = player;
  let ballHand = 'R'; // current parent hand ('G' = group, during the spin)
  let ballBlend = 1; // 0..1 blend from attach offset to standard offset
  let ballBlendBeat = -10;
  let lastBeat = -1;

  // The last keyframe (beat 24) duplicates the 1st (beat 0): the loop
  // has KEYS.length - 1 unique keyframes. keyAt indexes them circularly,
  // with the time and yaw unwrapped per loop — so the spline's four times
  // are always strictly increasing. (The first non-uniform version took
  // the neighbours straight from KEYS, so at the seam two of the four
  // times coincided and the divisions produced NaN.)
  // NKEYS MUST track the keyframe count: it was hardcoded to 27, and
  // adding the 13.5/14.5 around-the-world keyframes (Stage 12) left it
  // stale — the spline's "next" neighbour past beat 21 wrapped to a
  // beat-1.8 keyframe, and the whole body collapsed to the floor around
  // beats 21-22. It is computed from KEYS now, so it cannot go stale.
  const NKEYS = KEYS.length - 1;
  function keyAt(j) {
    const loops = Math.floor(j / NKEYS);
    const idx = ((j % NKEYS) + NKEYS) % NKEYS;
    const k = KEYS[idx];
    return { kf: k, beat: k.beat + loops * ROUTINE_BEATS, yaw: k.yaw + loops * Math.PI * 2 };
  }

  // ---- Feet state machine (Stage 13a) ----
  // The feet are world-space IK targets driven by a step schedule,
  // not keyframes. A planted foot's position is held by the run (no
  // spline drift, no sliding); a step moves the foot from its planted
  // spot to the next with x/z eased (smoothstep) and y arcing as a
  // sine bump (peak = lift). The spin's steps are pre-rotated into
  // world space (Stage 11), so the spin never drags the feet.
  // The schedule is the routine's footwork, derived from the Stage 11
  // keyframed positions: the between-legs setup step (4.4-5.0, the
  // only move that widens the stance) and its return (6.6-7.0), and
  // the three spin steps (9.0-12.0). Outside the schedule both feet
  // stay planted at their stance spots for the whole routine.
  const FOOT_START = { L: [-0.16, 0.105, 0.06], R: [0.16, 0.105, -0.04] };
  const STEPS = {
    L: [
      // The crossover sets the receiving foot, then resets for the
      // between-the-legs preparation. Between steps, the foot is planted.
      { from: 3.15, to: 3.68, fromPos: [-0.16, 0.105, 0.06], toPos: [-0.19, 0.105, 0.10], lift: 0.043 },
      { from: 3.90, to: 4.33, fromPos: [-0.19, 0.105, 0.10], toPos: [-0.16, 0.105, 0.06], lift: 0.034 },
      { from: 4.4, to: 5.0, fromPos: [-0.16, 0.105, 0.06], toPos: [-0.20, 0.105, 0.30], lift: 0.10 },
      { from: 6.6, to: 7.0, fromPos: [-0.20, 0.105, 0.30], toPos: [-0.16, 0.105, 0.06], lift: 0.07 },
    ],
    R: [
      { from: 4.4, to: 5.0, fromPos: [0.16, 0.105, -0.04], toPos: [0.20, 0.105, -0.20], lift: 0.07 },
      { from: 6.6, to: 7.0, fromPos: [0.20, 0.105, -0.20], toPos: [0.16, 0.105, -0.04], lift: 0.07 },
      // Behind-back transfer: free hand opens as the trailing foot rocks.
      { from: 7.3, to: 7.76, fromPos: [0.16, 0.105, -0.04], toPos: [0.20, 0.105, -0.08], lift: 0.028 },
      { from: 8.26, to: 8.86, fromPos: [0.20, 0.105, -0.08], toPos: [0.16, 0.105, -0.04], lift: 0.027 },
      { from: 9.0, to: 10.0, fromPos: [0.16, 0.105, -0.04], toPos: [-0.22, 0.105, -0.10], lift: 0.045 },
      { from: 10.0, to: 11.0, fromPos: [-0.22, 0.105, -0.10], toPos: [0.30, 0.105, 0.10], lift: 0.045 },
      { from: 11.0, to: 12.0, fromPos: [0.30, 0.105, 0.10], toPos: [0.16, 0.105, -0.04], lift: 0.045 },
    ],
  };
  // The left foot is the spin pivot (9.0-12.0): planted but never
  // flat — it rotates on the ball of the foot while the body turns.
  const PIVOT_START = 9.0, PIVOT_END = 12.0;

  // { pos, flat } for one foot at a beat. Flat means planted, not the
  // pivot, and not about to lift (within 0.1 beats of the next step
  // the foot is already leaving the ground, so it must not snap flat
  // for one frame at a landing that is also a take-off).
  function footState(beat, side) {
    beat = ((beat % ROUTINE_BEATS) + ROUTINE_BEATS) % ROUTINE_BEATS;
    const steps = STEPS[side];
    let pos = FOOT_START[side];
    let planted = true;
    let nextStepAt = Infinity;
    for (const st of steps) {
      if (beat >= st.from && beat < st.to) {
        const u = (beat - st.from) / (st.to - st.from);
        const e = smooth(u);
        pos = [
          lerp(st.fromPos[0], st.toPos[0], e),
          // Squared sine keeps vertical foot velocity continuous at lift-off
          // and landing (plain sin produced a sharp velocity discontinuity).
          0.105 + st.lift * Math.sin(Math.PI * u) ** 2,
          lerp(st.fromPos[2], st.toPos[2], e),
        ];
        planted = false;
        break;
      }
      if (beat < st.from) { nextStepAt = st.from; break; }
      pos = st.toPos;
    }
    const pivot = side === 'L' && beat >= PIVOT_START && beat < PIVOT_END;
    return { pos, flat: planted && !pivot && (nextStepAt - beat > 0.1) };
  }

  function interpolate(beat) {
    beat = ((beat % ROUTINE_BEATS) + ROUTINE_BEATS) % ROUTINE_BEATS;
    let i = 0;
    while (i < KEYS.length - 2 && KEYS[i + 1].beat <= beat) i++;
    const pa = keyAt(i - 1), ka = keyAt(i), kb = keyAt(i + 1), na = keyAt(i + 2);
    const a = ka.kf, b = kb.kf, p = pa.kf, n = na.kf;
    const span = kb.beat - ka.beat;
    const u = span > 0 ? (beat - ka.beat) / span : 0;
    // Root (travel) and pelvis (height) are splined as separate
    // channels (Stage 13a): nucr is per-component, so splining x, z,
    // and pelvis separately is mathematically identical to the old
    // 3-vector root spline — the motion is preserved exactly, but the
    // travel and the vertical are now independent channels.
    const rootX = nucr(p.root[0], a.root[0], b.root[0], n.root[0], pa.beat, ka.beat, kb.beat, na.beat, beat);
    const rootZ = nucr(p.root[1], a.root[1], b.root[1], n.root[1], pa.beat, ka.beat, kb.beat, na.beat, beat);
    const pelvis = nucr(p.pelvis, a.pelvis, b.pelvis, n.pelvis, pa.beat, ka.beat, kb.beat, na.beat, beat);
    const root = [rootX, 0, rootZ]; // ground root: travel + sway only, y stays 0
    const yaw = nucr(pa.yaw, ka.yaw, kb.yaw, na.yaw, pa.beat, ka.beat, kb.beat, na.beat, beat);
    const lean = nucr(p.lean, a.lean, b.lean, n.lean, pa.beat, ka.beat, kb.beat, na.beat, beat);
    // Feet come from the state machine (footState), not the keyframes.
    const feet = {}, flat = {};
    for (const side of ['L', 'R']) {
      const fs = footState(beat, side);
      feet[side] = fs.pos;
      flat[side] = fs.flat;
    }
    const handsLocal = {};
    for (const side of ['L', 'R']) {
      const ha = a.handsLocal[side], hb = b.handsLocal[side];
      if (ha && hb) {
        const hp = p.handsLocal[side] || ha, hn = n.handsLocal[side] || hb;
        handsLocal[side] = nucr3(hp, ha, hb, hn, pa.beat, ka.beat, kb.beat, na.beat, beat);
      } else handsLocal[side] = hb || ha;
    }
    // The hand-state channels blend over the segment instead of
    // snapping at the midpoint (the old step made the fingers snap
    // open/shut and the wrist snap between palm-down and the spin
    // platform at every hand-off and at the spin's edges).
    const blend = (va, vb) => (va === vb ? (va ? 1 : 0) : (vb ? smooth(u) : 1 - smooth(u)));
    const spinSide = a.spinHand || b.spinHand || null;
    const spinBlend = spinSide ? blend(!!a.spinHand, !!b.spinHand) : 0;
    const palmBlend = { L: blend(a.palm.L, b.palm.L), R: blend(a.palm.R, b.palm.R) };
    return { root, pelvis, yaw, lean, feet, handsLocal, palmBlend, flat, spinHand: spinSide, spinBlend };
  }

  function applyPose(beat) {
    const p = interpolate(beat);
    const b = ((beat % ROUTINE_BEATS) + ROUTINE_BEATS) % ROUTINE_BEATS;
    // A weighted athletic stance: knees absorb the dribble, pelvis shifts
    // over the supporting feet, shoulders counter-rotate into the transfer.
    // All secondary motion is analytic in beat time, so seeking, looping
    // and exporting reproduce exactly the same position and contact.
    const handles = Math.min(1, motionWindow(b, 0, 9, 0.65) +
      motionWindow(b, 15, 18, 0.5));
    const show = motionWindow(b, 18, 23, 0.65);
    const groove = Math.sin(Math.PI * b);
    const lift = Math.sin(Math.PI * b) ** 2;
    const cross = motionWindow(b, 3, 5, 0.55);
    const between = motionWindow(b, 5, 7, 0.55);
    const behind = motionWindow(b, 7, 9, 0.55);
    const counter = 0.07 * groove * handles - 0.11 * cross +
      0.085 * between + 0.09 * behind;
    const sideLean = (0.04 * groove + 0.013 * Math.sin(2 * Math.PI * b)) *
      handles + 0.015 * Math.sin(Math.PI * b / 3) * show;
    const lean = p.lean + handles * (0.034 * Math.cos(Math.PI * b));
    const hipX = p.root[0] + handles * 0.018 * groove;
    const hipY = p.pelvis - handles * 0.018 * lift +
      show * 0.009 * Math.sin(Math.PI * b / 3);
    // The feet remain exact world-space IK anchors. Only the pelvis moves
    // slightly above them; the solver absorbs the shift at the knees.
    poser.beginBatch();
    poser.reset();
    poser.setRoot([hipX, hipY, p.root[2]], [0, p.yaw, 0]);
    poser.setJoint('spine2', [lean * 0.42, counter * 0.33, sideLean * 0.4]);
    poser.setJoint('spine3', [lean * 0.36, counter * 0.4, sideLean * 0.4]);
    poser.setJoint('chest', [lean * 0.22, counter * 0.27, sideLean * 0.2]);
    poser.setJoint('neck', [-lean * 0.48, -counter * 0.22, -sideLean * 0.33]);
    poser.setJoint('head', [-lean * 0.28, -counter * 0.20, -sideLean * 0.23]);
    for (const side of ['L', 'R']) {
      if (p.feet[side]) poser.setFootTarget(side, p.feet[side], { flat: p.flat[side] !== false });
      else poser.clearTarget('foot', side);
      if (p.handsLocal[side]) {
        const [wx, wz] = localToWorldXZ(p.handsLocal[side][0], p.handsLocal[side][2], p.yaw, p.root[0], p.root[2]);
        poser.setHandTarget(side, [wx, p.handsLocal[side][1], wz]);
      } else poser.clearTarget('hand', side);
    }
    poser.endBatch();
    // Hand orientation after the IK solve (setJointWorld does not
    // re-solve). The orientation blends from the IK-solved pose
    // toward the spin platform and/or palm-down by the blends, so
    // the wrist rotates smoothly instead of snapping at the
    // hand-offs and the spin's edges. poser.update() first, so the
    // blend starts from THIS frame's IK orientation, not the last
    // frame's stale matrices. endBatch() already refreshed the rig.
    for (const side of ['L', 'R']) {
      const q = bones[`hand_${side}`].getWorldQuaternion(new THREE.Quaternion());
      let set = false;
      if (p.spinHand === side && p.spinBlend > 0) {
        q.slerpQuaternions(q, spinFingerQuat(), p.spinBlend);
        set = true;
      }
      if (p.palmBlend[side] > 0) {
        q.slerpQuaternions(q, palmDownQuat(side), p.palmBlend[side]);
        set = true;
      }
      if (set) poser.setJointWorld(`hand_${side}`, q);
    }
    // During the 360 spin, the support shoe swivels on the ball of
    // the planted foot. It remains anchored while its heading turns;
    // beat 12 is 2PI and returns to world identity without a snap.
    if (b >= PIVOT_START && b < PIVOT_END) {
      const plantedYaw = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0), p.yaw);
      poser.setJointWorld('foot_L', plantedYaw);
    }
    // Finger-spin platform: index straight, the other fingers curled
    // into the palm so the ball reads as balanced on ONE finger. Curl
    // is about the hand-local Z axis, toward the palm (-Z for the
    // right hand). Scaled by spinBlend, so the platform forms and
    // releases gradually instead of snapping open/shut.
    if (p.spinHand && p.spinBlend > 0) {
      const s = p.spinHand;
      const dir = s === 'R' ? -1 : 1;
      const c = p.spinBlend;
      for (const f of ['middle', 'ring', 'pinky']) {
        poser.setJointLocal(`${f}Proximal_${s}`, [0, 0, dir * 1.2 * c]);
        poser.setJointLocal(`${f}Middle_${s}`, [0, 0, dir * 1.0 * c]);
        poser.setJointLocal(`${f}Distal_${s}`, [0, 0, dir * 0.5 * c]);
      }
      poser.setJointLocal(`thumbProximal_${s}`, [0, 0, dir * 0.5 * c]);
      poser.setJointLocal(`thumbMiddle_${s}`, [0, 0, dir * 0.5 * c]);
      poser.update(); // refresh the skinned mesh once, not once per finger
    }
    return p;
  }

  function fingertipWorld(out = new THREE.Vector3()) {
    poser.update();
    const mid = bones.indexMiddle_R.getWorldPosition(new THREE.Vector3());
    const dist = bones.indexDistal_R.getWorldPosition(new THREE.Vector3());
    const dir = new THREE.Vector3().subVectors(dist, mid).normalize();
    return out.copy(dist).addScaledVector(dir, 0.022 + BALL_R_PHYS);
  }

  function updateBall(beat) {
    const move = moveAt(beat);
    if (beat >= SPIN_START && beat < SPIN_END) {
      // Ball on the fingertip (group space == world space; group at origin).
      if (ballHand !== 'G') { group.attach(ball); ballHand = 'G'; }
      const tip = fingertipWorld();
      let lift = 0;
      if (beat >= SNATCH_START && beat < SNATCH_END) {
        lift = 0.28 * Math.sin(Math.PI * (beat - SNATCH_START) / (SNATCH_END - SNATCH_START));
      }
      ball.position.set(tip.x, tip.y + lift, tip.z);
      return;
    }
    const want = ballHandFor(beat);
    if (ballHand !== want) {
      const handBone = bones[`hand_${want}`];
      handBone.attach(ball);
      ballHand = want;
      ballBlend = 0;
      ballBlendBeat = beat;
      ball.userData.attachOffset = ball.position.clone();
    }
    if (ballBlend < 1) {
      ballBlend = clamp01((beat - ballBlendBeat) / 0.5);
      const from = ball.userData.attachOffset || BALL_OFFSET;
      ball.position.lerpVectors(from, BALL_OFFSET, smooth(ballBlend));
    } else {
      ball.position.copy(BALL_OFFSET);
    }
  }

  function update(beat) {
    applyPose(beat);
    updateBall(beat);
    lastBeat = beat;
  }

  // ---- Measurements (all in code, not eyeballed) ----
  function snapshotPose(beat) {
    update(beat);
    return poser.snapshot();
  }

  function quatAngleDeg(q1, q2) {
    const d = Math.abs(q1[0] * q2[0] + q1[1] * q2[1] + q1[2] * q2[2] + q1[3] * q2[3]);
    return 2 * Math.acos(Math.min(1, d)) * 180 / Math.PI;
  }

  function measureLoopSeam() {
    const a = snapshotPose(0);
    const b = snapshotPose(ROUTINE_BEATS);
    let maxDeg = 0, worst = null;
    for (const name of Object.keys(a.joints)) {
      const deg = quatAngleDeg(a.joints[name], b.joints[name]);
      if (deg > maxDeg) { maxDeg = deg; worst = name; }
    }
    const rootDelta = Math.hypot(
      a.rootPos[0] - b.rootPos[0], a.rootPos[1] - b.rootPos[1], a.rootPos[2] - b.rootPos[2]);
    return { maxJointDeltaDeg: maxDeg, worstJoint: worst, rootDeltaM: rootDelta };
  }

  function measureFootSkate() {
    // Sample at 120 Hz. A foot is "planted" when its interpolated target is
    // at ground height and unchanged from the previous sample; report the
    // max distance the foot bone drifts from the interval start.
    const hz = 120, n = ROUTINE_BEATS * BEAT * hz;
    const res = { L: { maxSkateM: 0 }, R: { maxSkateM: 0 } };
    const anchor = { L: null, R: null };
    let prevTarget = { L: null, R: null };
    for (let i = 0; i <= n; i++) {
      const beat = (i / hz) / BEAT;
      update(beat);
      const p = interpolate(beat);
      for (const side of ['L', 'R']) {
        const tgt = p.feet[side];
        const planted = tgt && tgt[1] <= 0.11 &&
          prevTarget[side] && Math.hypot(tgt[0] - prevTarget[side][0], tgt[2] - prevTarget[side][2]) < 1e-9;
        const pos = poser.jointWorld(`foot_${side}`);
        if (planted) {
          if (!anchor[side]) anchor[side] = pos.clone();
          const d = pos.distanceTo(anchor[side]);
          if (d > res[side].maxSkateM) res[side].maxSkateM = d;
        } else anchor[side] = null;
        prevTarget[side] = tgt ? [...tgt] : null;
      }
    }
    return res;
  }

  function measureHandBall() {
    // NOTE: the Stage 2 plan's literal wording (ball CENTRE within 5 cm of
    // the hand bone) is unachievable for a 24 cm ball — the centre sits
    // ~11.9 cm from the wrist even in a perfect palm hold. The meaningful
    // measure is the CONTACT GAP: centre distance minus the ball radius,
    // which is ~0 when the ball is in the hand. Samples taken during a
    // hand-off blend (the ball flying between hands — Free Phase, not
    // Control) are reported separately as transit, not as contact failures.
    const hz = 120, n = ROUTINE_BEATS * BEAT * hz;
    const res = { contact: {}, transit: {} };
    for (let i = 0; i <= n; i++) {
      const beat = (i / hz) / BEAT;
      update(beat);
      const move = moveAt(beat);
      if (beat >= SPIN_START && beat < SPIN_END) continue; // fingertip, not palm
      const hand = ballHandFor(beat);
      const hp = poser.jointWorld(`hand_${hand}`);
      const bp = new THREE.Vector3();
      ball.getWorldPosition(bp);
      const gap = hp.distanceTo(bp) - BALL_R_PHYS;
      const bucket = ballBlend < 1 ? res.transit : res.contact;
      if (!bucket[move.name]) bucket[move.name] = { maxGapM: -Infinity, minGapM: Infinity };
      if (gap > bucket[move.name].maxGapM) bucket[move.name].maxGapM = gap;
      if (gap < bucket[move.name].minGapM) bucket[move.name].minGapM = gap;
    }
    return res;
  }

  return {
    update, applyPose, interpolate, moveAt,
    measureLoopSeam, measureFootSkate, measureHandBall,
    MOVE_MAP, ROUTINE_BEATS, BPM,
  };
}
