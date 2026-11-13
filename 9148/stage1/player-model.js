// player-model.js — Stage 1: procedural freestyle basketball player (Route 1).
// Geometry generated in code, joint hierarchy defined in code, posed by code.
// No Blender, no GLB, no downloaded assets. Later stages import createPlayer()
// and drive the bones procedurally (routine, IK, ball) on top of this rig.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export const PALETTE = {
  skin: new THREE.Color(0x8a5a3b),    // warm mid-brown skin
  jersey: new THREE.Color(0x0f766e),  // deep teal jersey (NOT Vedel's pink)
  cream: new THREE.Color(0xf5efe0),   // cream shorts / trim
  shoe: new THREE.Color(0xf2f2f2),
  sole: new THREE.Color(0x262626),
  hair: new THREE.Color(0x1a1210),
  ink: new THREE.Color(0x1a1440),    // dark navy ink (eyes, smile)
  cheek: new THREE.Color(0xf472b6),   // soft pink cheeks
};

// The torso lathe mixes two kit colours in ONE geometry part: jersey
// above this bind-pose height, shorts (cream) below. recolourKit uses
// the same threshold to split the torso's vertex range (Stage 8).
export const TORSO_JERSEY_Y = 0.85;

// ---------------------------------------------------------------------------
// Bone definitions: bind positions in world space (metres, y-up, faces +z).
// Local positions are derived (world minus parent world) so the numbers
// below are the only ones that need to be right.
// ---------------------------------------------------------------------------
const S = { L: -1, R: 1 };

// Finger joint layouts per hand. joints[0]=proximal, [1]=middle, [2]=distal,
// [3]=fingertip (no bone). Fingers curl toward the palm as they extend.
// Chibi proportions (Stage 13b): total height 1.64 m, head 33%
// (0.54 m, chin 1.10 to crown 1.64). Shorter limbs, wider torso,
// head bone at the skull's pivot (1.30; the skull centre is 1.37).
// Same topology and joint names as before, so the routine, IK,
// ball drive, and audit keep working unchanged.
function fingerJoints(side) {
  const hx = 0.34 * side;
  const fingers = [];
  const specs = [
    { name: 'index',  z: 0.036,  seg: [0.027, 0.023, 0.018], r: 0.0120 },
    { name: 'middle', z: 0.012,  seg: [0.029, 0.024, 0.019], r: 0.0125 },
    { name: 'ring',   z: -0.012, seg: [0.028, 0.023, 0.018], r: 0.0120 },
    { name: 'pinky',  z: -0.036, seg: [0.022, 0.018, 0.015], r: 0.0110 },
  ];
  for (const spec of specs) {
    const joints = [[hx, 0.525, spec.z]];
    let px = hx, py = 0.525;
    let angle = 0;
    for (let i = 0; i < 3; i++) {
      const dx = -Math.sin(angle) * side;
      const dy = -Math.cos(angle);
      px += dx * spec.seg[i];
      py += dy * spec.seg[i];
      joints.push([px, py, spec.z]);
      angle += 0.21; // ~12 deg more curl per segment
    }
    fingers.push({ name: spec.name, r: spec.r, joints });
  }
  // Thumb: angled forward off the front of the palm.
  fingers.push({
    name: 'thumb', r: 0.0140,
    joints: [
      [hx - 0.004 * side, 0.575, 0.042],
      [hx - 0.008 * side, 0.555, 0.058],
      [hx - 0.013 * side, 0.538, 0.070],
      [hx - 0.018 * side, 0.522, 0.080],
    ],
  });
  return fingers;
}

const BONE_DEFS = [
  { name: 'root',   parent: null,     pos: [0, 0.74, 0] },
  { name: 'spine1', parent: 'root',   pos: [0, 0.82, 0] },
  { name: 'spine2', parent: 'spine1', pos: [0, 0.90, 0] },
  { name: 'spine3', parent: 'spine2', pos: [0, 0.98, 0] },
  { name: 'chest',  parent: 'spine3', pos: [0, 1.06, 0] },
  { name: 'neck',   parent: 'chest',  pos: [0, 1.12, 0] },
  { name: 'head',   parent: 'neck',   pos: [0, 1.30, 0] },
  { name: 'jaw',    parent: 'head',   pos: [0, 1.26, 0.10] },
];
for (const side of ['L', 'R']) {
  const s = S[side];
  BONE_DEFS.push(
    { name: `clavicle_${side}`,      parent: 'chest',               pos: [0.100 * s, 1.080, 0] },
    { name: `upperArm_${side}`,      parent: `clavicle_${side}`,    pos: [0.240 * s, 1.040, 0] },
    { name: `forearm_${side}`,       parent: `upperArm_${side}`,    pos: [0.305 * s, 0.800, 0] },
    { name: `forearmTwist1_${side}`, parent: `forearm_${side}`,     pos: [0.318 * s, 0.720, 0] },
    { name: `forearmTwist2_${side}`, parent: `forearmTwist1_${side}`, pos: [0.332 * s, 0.640, 0] },
    { name: `hand_${side}`,          parent: `forearmTwist2_${side}`, pos: [0.345 * s, 0.560, 0] },
  );
  for (const f of fingerJoints(s)) {
    const [prox, mid, dist] = f.joints;
    BONE_DEFS.push(
      { name: `${f.name}Proximal_${side}`, parent: `hand_${side}`,                 pos: prox },
      { name: `${f.name}Middle_${side}`,   parent: `${f.name}Proximal_${side}`,   pos: mid },
      { name: `${f.name}Distal_${side}`,   parent: `${f.name}Middle_${side}`,     pos: dist },
    );
  }
  BONE_DEFS.push(
    { name: `thigh_${side}`, parent: 'root',           pos: [0.120 * s, 0.72, 0] },
    { name: `shin_${side}`,  parent: `thigh_${side}`, pos: [0.125 * s, 0.42, 0] },
    { name: `foot_${side}`,  parent: `shin_${side}`,  pos: [0.125 * s, 0.105, 0] },
    { name: `toe1_${side}`,  parent: `foot_${side}`,  pos: [0.125 * s, 0.06, 0.13] },
    { name: `toe2_${side}`,  parent: `toe1_${side}`,  pos: [0.125 * s, 0.05, 0.21] },
  );
}

export const BONE_NAMES = BONE_DEFS.map((d) => d.name);
const BONE_INDEX = {};
BONE_DEFS.forEach((d, i) => { BONE_INDEX[d.name] = i; });
const BONE_POS = {};
BONE_DEFS.forEach((d) => { BONE_POS[d.name] = new THREE.Vector3(...d.pos); });

// ---------------------------------------------------------------------------
// Skin-weight + colour helpers
// ---------------------------------------------------------------------------
// Blend between two bones over a scalar range (smoothstep).
function blend2(boneA, boneB, t, t0, t1) {
  if (t <= t0) return [[boneA, 1]];
  if (t >= t1) return [[boneB, 1]];
  const s = (t - t0) / (t1 - t0);
  const e = s * s * (3 - 2 * s);
  return [[boneA, 1 - e], [boneB, e]];
}

// Ladder: anchors [[scalar, bone], ...] sorted ascending; weights blend
// linearly (smoothstepped) between adjacent anchors.
function ladderWeights(v, anchors) {
  if (v <= anchors[0][0]) return [[anchors[0][1], 1]];
  for (let i = 0; i < anchors.length - 1; i++) {
    const [v0, b0] = anchors[i];
    const [v1, b1] = anchors[i + 1];
    if (v <= v1) return blend2(b0, b1, v, v0, v1);
  }
  return [[anchors[anchors.length - 1][1], 1]];
}

function paintSkin(geo, fn) {
  const pos = geo.attributes.position;
  const n = pos.count;
  const idx = new Uint16Array(n * 4);
  const wgt = new Float32Array(n * 4);
  const p = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    p.set(pos.getX(i), pos.getY(i), pos.getZ(i));
    const list = fn(p);
    let sum = 0;
    for (const [, w] of list) sum += w;
    for (let k = 0; k < Math.min(4, list.length); k++) {
      idx[i * 4 + k] = BONE_INDEX[list[k][0]];
      wgt[i * 4 + k] = list[k][1] / sum;
    }
  }
  geo.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(idx, 4));
  geo.setAttribute('skinWeight', new THREE.Float32BufferAttribute(wgt, 4));
  return geo;
}

function paintColor(geo, fn) {
  const pos = geo.attributes.position;
  const n = pos.count;
  const col = new Float32Array(n * 3);
  const p = new THREE.Vector3();
  const c = new THREE.Color();
  for (let i = 0; i < n; i++) {
    p.set(pos.getX(i), pos.getY(i), pos.getZ(i));
    fn(p, c);
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return geo;
}

const solidColor = (color) => (p, c) => c.copy(color);
const solidBone = (bone) => () => [[bone, 1]];

// ---------------------------------------------------------------------------
// Geometry parts
// ---------------------------------------------------------------------------
// Capsule from a to b, tapered rA -> rB, built as a lathe so the straight
// section has intermediate rings (CapsuleGeometry has none, which left the
// twist-test bands empty). Weights/colours are applied by the caller via
// paintSkin/paintColor (position-based, so any rule works).
function capsuleBetween(a, b, rA, rB, capSegs = 4, radialSegs = 12, straightSegs = 6) {
  const av = new THREE.Vector3(...a);
  const bv = new THREE.Vector3(...b);
  const dir = new THREE.Vector3().subVectors(bv, av);
  const len = dir.length();
  const dirN = dir.clone().normalize();
  // Short segments (fingertips) can be shorter than rA + rB; shrink the
  // radii so the straight section stays non-negative.
  if (rA + rB > len) {
    const f = (len * 0.95) / (rA + rB);
    rA *= f; rB *= f;
  }
  // Profile in local space: axis = Y, from -len/2 to +len/2.
  const half = len / 2;
  const capN = Math.max(capSegs, 2);
  const pts = [];
  // Bottom cap: hemisphere of radius rA centred at y = -half + rA.
  for (let k = 0; k <= capN; k++) {
    const th = -Math.PI / 2 + (k / capN) * (Math.PI / 2);
    pts.push(new THREE.Vector2(
      Math.max(rA * Math.cos(th), 0.0001),
      -half + rA + rA * Math.sin(th),
    ));
  }
  // Straight section: radius lerps rA -> rB.
  for (let k = 1; k <= straightSegs; k++) {
    const t = k / straightSegs;
    pts.push(new THREE.Vector2(
      THREE.MathUtils.lerp(rA, rB, t),
      THREE.MathUtils.lerp(-half + rA, half - rB, t),
    ));
  }
  // Top cap: hemisphere of radius rB centred at y = half - rB.
  for (let k = 1; k <= capN; k++) {
    const th = (k / capN) * (Math.PI / 2);
    pts.push(new THREE.Vector2(
      Math.max(rB * Math.cos(th), 0.0001),
      half - rB + rB * Math.sin(th),
    ));
  }
  const geo = new THREE.LatheGeometry(pts, radialSegs);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dirN);
  geo.applyQuaternion(q);
  const mid = new THREE.Vector3().addVectors(av, bv).multiplyScalar(0.5);
  geo.translate(mid.x, mid.y, mid.z);
  return geo;
}

function spherePart(center, r, scale = [1, 1, 1], wSeg = 12, hSeg = 10) {
  const geo = new THREE.SphereGeometry(r, wSeg, hSeg);
  geo.scale(scale[0], scale[1], scale[2]);
  geo.translate(center[0], center[1], center[2]);
  return geo;
}

// Projection of a point onto the a->b segment, as t in [0, 1].
function segT(p, a, b) {
  const av = new THREE.Vector3(...a);
  const bv = new THREE.Vector3(...b);
  const dir = new THREE.Vector3().subVectors(bv, av);
  return THREE.MathUtils.clamp(p.clone().sub(av).dot(dir) / dir.lengthSq(), 0, 1);
}

function buildBodyGeometry() {
  const parts = [];
  const partRanges = {}; // name -> [startVertex, count] in the merged geometry
  let vertexOffset = 0;
  const add = (geo, weightFn, colorFn, name) => {
    paintSkin(geo, weightFn);
    paintColor(geo, colorFn);
    // Part ranges (Stage 8 kit recolour): mergeGeometries concatenates
    // the parts' vertex buffers in order, so the running position
    // count is the merged-geometry offset. Named parts only.
    if (name) partRanges[name] = [vertexOffset, geo.attributes.position.count];
    vertexOffset += geo.attributes.position.count;
    parts.push(geo);
  };

  // ---- Torso: lathe, elliptical, jersey above the waist, shorts below ----
  // Chibi (Stage 13b): same absolute widths as before, compressed
  // vertically (pelvis 0.72 to neck 1.13), so the torso reads wide.
  const profile = [
    [0.001, 0.720], [0.120, 0.724], [0.150, 0.738], [0.155, 0.750],
    [0.148, 0.800], [0.135, 0.860], [0.140, 0.920], [0.155, 0.980],
    [0.175, 1.030], [0.182, 1.070], [0.175, 1.100], [0.140, 1.120],
    [0.080, 1.130], [0.001, 1.135],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const torso = new THREE.LatheGeometry(profile, 28);
  torso.scale(1.28, 1, 0.88);
  add(
    torso,
    (p) => ladderWeights(p.y, [[0.78, 'root'], [0.84, 'spine1'], [0.92, 'spine2'], [1.00, 'spine3'], [1.08, 'chest']]),
    (p, c) => c.copy(p.y < TORSO_JERSEY_Y ? PALETTE.cream : PALETTE.jersey),
    'torso',
  );

  // Pelvis volume under the lathe.
  add(
    spherePart([0, 0.76, 0], 0.14, [1.10, 0.70, 0.85], 16, 12),
    solidBone('root'), solidColor(PALETTE.cream), 'pelvis',
  );

  // Waistband + chest band (cream rings over the jersey).
  const waist = new THREE.TorusGeometry(0.141, 0.012, 8, 32);
  waist.rotateX(Math.PI / 2);
  waist.scale(1.28, 1, 0.88);
  waist.translate(0, 0.85, 0);
  add(waist, solidBone('spine1'), solidColor(PALETTE.cream), 'waist');

  const chestBand = new THREE.TorusGeometry(0.177, 0.008, 8, 32);
  chestBand.rotateX(Math.PI / 2);
  chestBand.scale(1.28, 1, 0.88);
  chestBand.translate(0, 1.02, 0);
  add(chestBand, solidBone('spine3'), solidColor(PALETTE.cream), 'chestBand');

  // ---- Neck + head ----
  const neck = new THREE.CylinderGeometry(0.055, 0.060, 0.10, 12);
  neck.translate(0, 1.15, 0);
  add(
    neck,
    (p) => ladderWeights(p.y, [[1.10, 'neck'], [1.20, 'head']]),
    solidColor(PALETTE.skin),
  );

  // Chibi head (Stage 13b): authored at true size, no scale hack. The
  // skull is a 0.27 m sphere centred at y 1.37 (chin 1.10, crown
  // 1.64), 33% of the 1.64 m total height. The head bone sits at
  // 1.30, just below the skull centre, so rotations pivot at the neck
  // joint, not the skull centre. The Stage 10 1.35x scaleAbout is
  // gone: the head is a real skinned part of the chibi rig.
  add(
    spherePart([0, 1.37, 0], 0.27, [0.96, 1.0, 1.02], 24, 18),
    (p) => (p.y < 1.28 && p.z > 0 ? [['head', 0.7], ['jaw', 0.3]] : [['head', 1]]),
    solidColor(PALETTE.skin),
  );

  // Hair cap (top + back of head).
  const hair = new THREE.SphereGeometry(0.278, 24, 14, 0, Math.PI * 2, 0, 1.6);
  hair.scale(0.98, 1.0, 1.04);
  hair.translate(0, 1.375, -0.015);
  add(hair, solidBone('head'), solidColor(PALETTE.hair));

  // Spiky hair: short cones on the top and back of the head, pointing
  // out along their surface normal. Skull centre [0, 1.37, 0], radius
  // 0.27; spikes sit at radius 0.25, length 0.09.
  const spikeDirs = [
    [0, 1, 0.15], [0.45, 0.85, 0.1], [-0.45, 0.85, 0.1],
    [0.8, 0.55, -0.1], [-0.8, 0.55, -0.1], [0.25, 0.7, -0.65],
    [-0.25, 0.7, -0.65], [0, 0.55, -0.85], [0.55, 0.35, -0.7],
    [-0.55, 0.35, -0.7],
  ];
  for (const d of spikeDirs) {
    const dir = new THREE.Vector3(...d).normalize();
    const spike = new THREE.ConeGeometry(0.035, 0.09, 6);
    spike.translate(0, 0.045, 0); // base at the origin, tip at +y
    spike.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir));
    spike.translate(dir.x * 0.25, 1.37 + dir.y * 0.25, dir.z * 0.25);
    add(spike, solidBone('head'), solidColor(PALETTE.hair));
  }

  // Headband.
  const band = new THREE.TorusGeometry(0.278, 0.022, 8, 32);
  band.rotateX(Math.PI / 2);
  band.scale(0.97, 1, 1.03);
  band.translate(0, 1.44, 0);
  add(band, solidBone('head'), solidColor(PALETTE.jersey), 'headband');

  // Ears.
  for (const s of [-1, 1]) {
    add(
      spherePart([0.25 * s, 1.37, 0], 0.045, [0.5, 1, 0.8], 8, 6),
      solidBone('head'), solidColor(PALETTE.skin),
    );
  }

  // ---- Arms, hands, fingers (per side) ----
  for (const side of ['L', 'R']) {
    const s = S[side];
    const shoulder = [0.24 * s, 1.04, 0];
    const elbow = [0.305 * s, 0.80, 0];
    const wrist = [0.345 * s, 0.56, 0];

    add(
      spherePart(shoulder, 0.068, [1, 1, 1], 12, 10),
      () => [[`upperArm_${side}`, 0.7], [`clavicle_${side}`, 0.3]],
      solidColor(PALETTE.skin),
    );

    add(
      capsuleBetween(shoulder, elbow, 0.058, 0.050, 4, 12),
      (p) => ladderWeights(segT(p, shoulder, elbow), [[0, `upperArm_${side}`], [0.8, `upperArm_${side}`], [1, `forearm_${side}`]]),
      solidColor(PALETTE.skin),
    );

    add(
      spherePart(elbow, 0.050, [1, 1, 1], 10, 8),
      () => [[`upperArm_${side}`, 0.5], [`forearm_${side}`, 0.5]],
      solidColor(PALETTE.skin),
    );

    // Forearm: the twist-critical part. Two twist bones split the twist
    // into three ~60-degree steps (forearm -> twist1 -> twist2 -> hand),
    // so no blend zone ever sees more than a 60-degree differential.
    add(
      capsuleBetween(elbow, wrist, 0.050, 0.040, 4, 12),
      (p) => ladderWeights(segT(p, elbow, wrist), [
        [0, `forearm_${side}`], [0.30, `forearm_${side}`],
        [0.50, `forearmTwist1_${side}`], [0.65, `forearmTwist1_${side}`],
        [0.80, `forearmTwist2_${side}`], [0.90, `forearmTwist2_${side}`],
        [1, `hand_${side}`],
      ]),
      solidColor(PALETTE.skin),
    );

    add(
      spherePart(wrist, 0.040, [1, 1, 1], 10, 8),
      () => [[`forearmTwist2_${side}`, 0.5], [`hand_${side}`, 0.5]],
      solidColor(PALETTE.skin),
    );

    // Palm (thin axis faces inward, toward the thigh).
    add(
      spherePart([0.345 * s, 0.53, 0], 1, [0.026, 0.045, 0.042], 10, 8),
      solidBone(`hand_${side}`), solidColor(PALETTE.skin),
    );

    // Fingers: 3 capsule segments each, weighted to their own joints.
    for (const f of fingerJoints(s)) {
      const [j0, j1, j2, j3] = f.joints;
      const segDefs = [
        [j0, j1, f.r, f.r * 0.92, `${f.name}Proximal_${side}`, `${f.name}Middle_${side}`],
        [j1, j2, f.r * 0.92, f.r * 0.85, `${f.name}Middle_${side}`, `${f.name}Distal_${side}`],
        [j2, j3, f.r * 0.85, f.r * 0.78, `${f.name}Distal_${side}`, `${f.name}Distal_${side}`],
      ];
      for (const [a, b, rA, rB, boneA, boneB] of segDefs) {
        add(
          capsuleBetween(a, b, rA, rB, 3, 8, 2),
          (p) => ladderWeights(segT(p, a, b), [[0, boneA], [0.7, boneA], [1, boneB]]),
          solidColor(PALETTE.skin),
        );
      }
    }

    // ---- Legs (per side) ----
    const hip = [0.12 * s, 0.72, 0];
    const knee = [0.125 * s, 0.42, 0];
    const ankle = [0.125 * s, 0.105, 0];

    add(
      capsuleBetween(hip, knee, 0.088, 0.066, 6, 12),
      (p) => ladderWeights(segT(p, hip, knee), [[0, `thigh_${side}`], [0.85, `thigh_${side}`], [1, `shin_${side}`]]),
      solidColor(PALETTE.skin),
    );

    // Baggy basketball short leg: tapered tube from the hip to just above
    // the knee, wider than the thigh, flat hem ring closing to the leg.
    // Profile ordered bottom-to-top: LatheGeometry needs ascending y for
    // outward normals (top-to-bottom wound it inside-out).
    const shortProfile = [
      [0.070, 0.450], [0.104, 0.450], [0.100, 0.480], [0.102, 0.580],
      [0.104, 0.700], [0.102, 0.730],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    const shortLeg = new THREE.LatheGeometry(shortProfile, 20);
    shortLeg.translate(0.122 * s, 0, 0);
    add(shortLeg, solidBone(`thigh_${side}`), solidColor(PALETTE.cream), `shortLeg_${side}`);

    // Teal hem stripe.
    const hem = new THREE.TorusGeometry(0.104, 0.008, 8, 28);
    hem.rotateX(Math.PI / 2);
    hem.translate(0.122 * s, 0.455, 0);
    add(hem, solidBone(`thigh_${side}`), solidColor(PALETTE.jersey), `hem_${side}`);

    add(
      spherePart(knee, 0.064, [1, 1, 1], 10, 8),
      () => [[`thigh_${side}`, 0.5], [`shin_${side}`, 0.5]],
      solidColor(PALETTE.skin),
    );

    add(
      capsuleBetween(knee, ankle, 0.062, 0.048, 4, 12),
      (p) => ladderWeights(segT(p, knee, ankle), [[0, `shin_${side}`], [0.85, `shin_${side}`], [1, `foot_${side}`]]),
      solidColor(PALETTE.skin),
    );

    add(
      spherePart(ankle, 0.048, [1, 1, 1], 10, 8),
      () => [[`shin_${side}`, 0.5], [`foot_${side}`, 0.5]],
      solidColor(PALETTE.skin),
    );

    // Shoe: rounded capsule along z, flattened; sole box; toe cap.
    // Chunky trainers (Stage 10): wider radii, longer toe, thicker
    // sole — the reference's enormous trainers, in our own kit.
    const shoe = capsuleBetween([0.125 * s, 0.055, -0.05], [0.125 * s, 0.055, 0.19], 0.062, 0.058, 4, 12);
    shoe.translate(0, -0.055, 0);
    shoe.scale(1, 0.8, 1);
    shoe.translate(0, 0.055, 0);
    add(
      shoe,
      (p) => ladderWeights(p.z, [[-0.05, `foot_${side}`], [0.08, `foot_${side}`], [0.15, `toe1_${side}`], [0.19, `toe1_${side}`]]),
      solidColor(PALETTE.shoe),
      `shoe_${side}`,
    );

    const sole = new THREE.BoxGeometry(0.135, 0.03, 0.31);
    sole.translate(0.125 * s, 0.016, 0.05);
    add(sole, solidBone(`foot_${side}`), solidColor(PALETTE.sole), `sole_${side}`);

    add(
      spherePart([0.125 * s, 0.05, 0.185], 0.056, [1.05, 0.85, 1.0], 10, 8),
      () => [[`toe1_${side}`, 0.6], [`toe2_${side}`, 0.4]],
      solidColor(PALETTE.shoe),
      `toe_${side}`,
    );
  }

  const merged = mergeGeometries(parts, false);
  merged.computeBoundingSphere();
  merged.userData.partRanges = partRanges;
  return merged;
}

// ---------------------------------------------------------------------------
// Basketball prop (separate, unskinned mesh; parented to the hand bone).
// ---------------------------------------------------------------------------
// colour: the ball's base (Stage 8 setting). Seams stay dark.
export function makeBallTexture(colour = '#e8722a') {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = colour;
  g.fillRect(0, 0, 512, 256);
  g.strokeStyle = '#1a1a1a';
  g.lineWidth = 6;
  g.lineCap = 'round';
  g.beginPath(); g.moveTo(0, 128); g.lineTo(512, 128); g.stroke(); // equator
  g.beginPath(); g.moveTo(256, 0); g.lineTo(256, 256); g.stroke(); // vertical
  g.beginPath(); g.arc(128, 128, 92, -1.05, 1.05); g.stroke();
  g.beginPath(); g.arc(384, 128, 92, Math.PI - 1.05, Math.PI + 1.05); g.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildBall() {
  const geo = new THREE.SphereGeometry(0.12, 24, 18);
  const mat = new THREE.MeshStandardMaterial({ map: makeBallTexture(), roughness: 0.85 });
  const ball = new THREE.Mesh(geo, mat);
  ball.castShadow = true;
  ball.name = 'basketball';
  return ball;
}

// ---------------------------------------------------------------------------
// Skeleton
// ---------------------------------------------------------------------------
function buildSkeleton() {
  const bones = {};
  for (const def of BONE_DEFS) {
    const bone = new THREE.Bone();
    bone.name = def.name;
    bones[def.name] = bone;
  }
  for (const def of BONE_DEFS) {
    const bone = bones[def.name];
    const world = BONE_POS[def.name];
    if (def.parent) {
      const parentWorld = BONE_POS[def.parent];
      bone.position.subVectors(world, parentWorld);
      bones[def.parent].add(bone);
    } else {
      bone.position.copy(world);
    }
  }
  return { bones, root: bones.root, ordered: BONE_DEFS.map((d) => bones[d.name]) };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------
// Live kit recolour (Stage 8): rewrites the merged geometry's color
// attribute over the named part ranges. Colour families: jersey =
// torso above TORSO_JERSEY_Y + headband + hem stripes; shorts = torso
// below the split + pelvis + waistband + chest band + short legs.
// Skin, hair, and shoes are never touched. Colours accept hex numbers
// or '#rrggbb' strings (THREE.Color.set handles both, with the same
// sRGB->linear conversion the builder applies, so the default kit
// reproduces the built colours exactly).
export function recolourKit(player, { jersey, shorts, headband }) {
  const geo = player.mesh.geometry;
  const ranges = geo.userData.partRanges || {};
  const col = geo.attributes.color;
  const pos = geo.attributes.position;
  const c = new THREE.Color();
  const paintRange = (name, hex) => {
    const r = ranges[name];
    if (!r || hex === undefined) return;
    c.set(hex);
    for (let i = r[0]; i < r[0] + r[1]; i++) col.setXYZ(i, c.r, c.g, c.b);
  };
  // Torso: split by bind-pose y (the geometry's position attribute is
  // the bind pose, so y is stable under any pose).
  const torso = ranges.torso;
  if (torso && (jersey !== undefined || shorts !== undefined)) {
    for (let i = torso[0]; i < torso[0] + torso[1]; i++) {
      const hex = pos.getY(i) >= TORSO_JERSEY_Y ? jersey : shorts;
      if (hex === undefined) continue;
      c.set(hex);
      col.setXYZ(i, c.r, c.g, c.b);
    }
  }
  for (const name of ['pelvis', 'waist', 'chestBand', 'shortLeg_L', 'shortLeg_R']) {
    paintRange(name, shorts);
  }
  for (const name of ['hem_L', 'hem_R']) paintRange(name, jersey);
  paintRange('headband', headband);
  col.needsUpdate = true;
}

export function createPlayer() {
  const group = new THREE.Group();
  group.name = 'player';

  const geometry = buildBodyGeometry();
  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    skinning: true,
    roughness: 0.9,
    metalness: 0,
  });
  const mesh = new THREE.SkinnedMesh(geometry, material);
  mesh.name = 'playerMesh';
  mesh.castShadow = true;
  mesh.frustumCulled = false;

  const { bones, root, ordered } = buildSkeleton();
  mesh.add(root);
  group.add(mesh);
  // Bind pose: update world matrices BEFORE creating the skeleton, so the
  // inverse bind matrices are computed from the real bind pose.
  group.updateMatrixWorld(true);
  const skeleton = new THREE.Skeleton(ordered);
  mesh.bind(skeleton);

  const ball = buildBall();
  ball.position.set(0, -0.130, 0.034); // palm hold (BALL_OFFSET; |offset| = BALL_R_PHYS)
  bones.hand_R.add(ball);

  // Face (Stage 10, re-seated for the chibi head in Stage 13b): separate
  // small meshes parented to the head bone, so they follow the head
  // exactly. Positions are head-bone-local: the bone sits at world y
  // 1.30, the skull centre at 1.37, so the centre is (0, 0.07, 0) here
  // and the front surface at eye height is z ~0.27. Eyes are vertical
  // ovals (closed, happy slits); the smile is a torus arc; cheeks are
  // soft pink flats. MeshToon (no gradient map — smooth shading is
  // right for tiny features). They carry no hull outline: small
  // dark/pink accents don't need one.
  const faceMat = (color) => new THREE.MeshToonMaterial({ color });
  const face = new THREE.Group();
  face.name = 'face';
  const eyeGeo = new THREE.SphereGeometry(0.028, 10, 8);
  eyeGeo.scale(1, 1.5, 0.5);
  for (const s of [-1, 1]) {
    // Eyes sit BELOW the headband (the band is at bone-local y 0.14;
    // the first placement put the eyes at the same height and the band
    // hid them). Cheeks below the eyes, smile below the cheeks.
    const eye = new THREE.Mesh(eyeGeo, faceMat(PALETTE.ink));
    eye.position.set(0.105 * s, 0.08, 0.26);
    eye.castShadow = false;
    face.add(eye);
    const cheek = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), faceMat(PALETTE.cheek));
    cheek.scale.set(1, 0.7, 0.4);
    cheek.position.set(0.18 * s, 0.02, 0.18);
    cheek.castShadow = false;
    face.add(cheek);
  }
  const smile = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.012, 6, 16, Math.PI * 0.9), faceMat(PALETTE.ink));
  smile.position.set(0, -0.03, 0.25);
  smile.rotation.z = Math.PI + (Math.PI - Math.PI * 0.9) / 2; // arc at the bottom
  smile.castShadow = false;
  face.add(smile);
  bones.head.add(face);

  // Live ball recolour (Stage 8): regenerates the seam texture with a
  // new base colour on the ball's CURRENT material (viewers replace
  // the material with a toon one but keep the map slot).
  function recolourBall(colour) {
    const old = ball.material.map;
    ball.material.map = makeBallTexture(colour);
    ball.material.needsUpdate = true;
    if (old) old.dispose();
  }

  return {
    group, mesh, skeleton, bones, ball,
    partRanges: geometry.userData.partRanges,
    recolourBall,
  };
}

export function getStats(player) {
  const geo = player.mesh.geometry;
  const triangles = geo.index ? geo.index.count / 3 : geo.attributes.position.count / 3;
  const ballGeo = player.ball.geometry;
  const ballTriangles = ballGeo.index ? ballGeo.index.count / 3 : ballGeo.attributes.position.count / 3;
  return {
    joints: BONE_DEFS.length,
    boneNames: [...BONE_NAMES],
    triangles,
    ballTriangles,
    trianglesTotal: triangles + ballTriangles,
    vertices: geo.attributes.position.count,
  };
}

// ---------------------------------------------------------------------------
// Twist test (candy-wrapper check, Stage 1 acceptance criterion).
// Measures the mean squared radius of the forearm cross-section at three
// bands along the right forearm, at rest and under a 180-degree wrist twist
// (60 deg on each twist bone + 60 deg on the hand), plus a control with the
// twist bones held at 0 (hand takes the full 180). Ratio >= 0.60 passes.
// ---------------------------------------------------------------------------
function skinnedPositions(player) {
  const mesh = player.mesh;
  const geo = mesh.geometry;
  const pos = geo.attributes.position;
  const skinIndex = geo.attributes.skinIndex;
  const skinWeight = geo.attributes.skinWeight;
  const bm = mesh.skeleton.boneMatrices;
  const out = new Float32Array(pos.count * 3);
  const m = new THREE.Matrix4();
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    let x = 0, y = 0, z = 0;
    for (let k = 0; k < 4; k++) {
      const w = skinWeight.getComponent(i, k);
      if (w === 0) continue;
      const b = skinIndex.getComponent(i, k);
      m.fromArray(bm, b * 16);
      v.set(pos.getX(i), pos.getY(i), pos.getZ(i)).applyMatrix4(m);
      x += v.x * w; y += v.y * w; z += v.z * w;
    }
    out[i * 3] = x; out[i * 3 + 1] = y; out[i * 3 + 2] = z;
  }
  return out;
}

function bandMeanR2(player, skinned, t0, t1) {
  const elbow = BONE_POS.forearm_R;
  const wrist = BONE_POS.hand_R;
  const axis = new THREE.Vector3().subVectors(wrist, elbow);
  const lenSq = axis.lengthSq();
  axis.normalize();
  const geo = player.mesh.geometry;
  const pos = geo.attributes.position;
  const skinIndex = geo.attributes.skinIndex;
  const allowed = new Set([
    BONE_INDEX.forearm_R, BONE_INDEX.forearmTwist1_R,
    BONE_INDEX.forearmTwist2_R, BONE_INDEX.hand_R,
  ]);
  let sum = 0;
  let n = 0;
  const p = new THREE.Vector3();
  const q = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    if (!allowed.has(skinIndex.getComponent(i, 0))) continue;
    p.set(pos.getX(i), pos.getY(i), pos.getZ(i));
    const t = p.clone().sub(elbow).dot(new THREE.Vector3().subVectors(wrist, elbow)) / lenSq;
    if (t < t0 || t > t1) continue;
    q.set(skinned[i * 3], skinned[i * 3 + 1], skinned[i * 3 + 2]);
    const along = q.clone().sub(elbow).dot(axis);
    const radial = q.clone().sub(elbow).addScaledVector(axis, -along);
    sum += radial.lengthSq();
    n++;
  }
  return { meanR2: n > 0 ? sum / n : 0, n };
}

export function measureTwist(player) {
  const { bones, group, skeleton } = player;
  const elbow = BONE_POS.forearm_R;
  const wrist = BONE_POS.hand_R;
  const axis = new THREE.Vector3().subVectors(wrist, elbow).normalize();
  const bands = [[0.28, 0.48], [0.52, 0.72], [0.88, 0.97]];

  const applyTwist = (twistDeg, handDeg) => {
    const qT = new THREE.Quaternion().setFromAxisAngle(axis, THREE.MathUtils.degToRad(twistDeg));
    const qH = new THREE.Quaternion().setFromAxisAngle(axis, THREE.MathUtils.degToRad(handDeg));
    bones.forearmTwist1_R.quaternion.copy(qT);
    bones.forearmTwist2_R.quaternion.copy(qT);
    bones.hand_R.quaternion.copy(qH);
    group.updateMatrixWorld(true);
    skeleton.update();
  };
  const restore = () => {
    bones.forearmTwist1_R.quaternion.identity();
    bones.forearmTwist2_R.quaternion.identity();
    bones.hand_R.quaternion.identity();
    group.updateMatrixWorld(true);
    skeleton.update();
  };

  const measure = () => {
    const skinned = skinnedPositions(player);
    return bands.map(([t0, t1]) => bandMeanR2(player, skinned, t0, t1));
  };

  // Rest.
  const rest = measure();
  // Twist bones take half each: 60 + 60 + 60 = 180 degrees at the hand.
  applyTwist(60, 60);
  const twisted = measure();
  // Control: twist bones held at 0, hand takes the full 180.
  applyTwist(0, 180);
  const control = measure();
  restore();

  const results = bands.map((band, i) => ({
    band,
    n: rest[i].n,
    rest: rest[i].meanR2,
    twisted: twisted[i].meanR2,
    control: control[i].meanR2,
    ratioTwisted: rest[i].meanR2 > 0 ? twisted[i].meanR2 / rest[i].meanR2 : 0,
    ratioControl: rest[i].meanR2 > 0 ? control[i].meanR2 / rest[i].meanR2 : 0,
  }));
  const minRatioTwisted = Math.min(...results.map((r) => r.ratioTwisted));
  return { results, minRatioTwisted, pass: minRatioTwisted >= 0.60 };
}
