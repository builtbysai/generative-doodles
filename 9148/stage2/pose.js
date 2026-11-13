// pose.js — Stage 2a: two-bone IK + procedural posing API for the Stage 1 player.
//
// The routine (Stage 2b) drives bones procedurally each frame; there is no
// AnimationMixer. Targets persist until cleared: setRoot/setJoint re-solve
// any active targets, so planted feet stay planted while the body moves.
//
// World space = player group space (the group sits at the origin, unrotated).
// The character faces +z. Leg poles point +z (knees forward); arm poles
// point back/out (elbows back), matching a natural reach.
import * as THREE from 'three';

const IDENTITY_Q = new THREE.Quaternion();
const _a = new THREE.Vector3();
const _b = new THREE.Vector3();
const _c = new THREE.Vector3();
const _q1 = new THREE.Quaternion();
const _q2 = new THREE.Quaternion();

function clamp(x, lo, hi) { return Math.min(hi, Math.max(lo, x)); }

// Rotate `bone` in world space so the direction from the bone's origin to
// `fromWorld` now points at `toWorld`. Minimal rotation, no extra twist.
function aimBone(bone, fromWorld, toWorld) {
  const origin = bone.getWorldPosition(_a);
  const cur = _b.copy(fromWorld).sub(origin);
  const want = _c.copy(toWorld).sub(origin);
  if (cur.lengthSq() < 1e-12 || want.lengthSq() < 1e-12) return;
  cur.normalize();
  want.normalize();
  if (cur.dot(want) > 0.999999) return;
  _q1.setFromUnitVectors(cur, want);
  bone.getWorldQuaternion(_q2);
  _q1.multiply(_q2); // new world quaternion
  bone.parent.getWorldQuaternion(_q2);
  bone.quaternion.copy(_q2.invert().multiply(_q1));
}

function setBoneWorldQuat(bone, quat) {
  bone.parent.getWorldQuaternion(_q2);
  bone.quaternion.copy(_q2.invert().multiply(quat));
}

// World orientation with the palm facing down and the fingers pointing
// forward (+z). In bind pose the palm normal is -x (right hand) / +x (left)
// and the fingers point -y.
export function palmDownQuat(side) {
  const m = new THREE.Matrix4();
  if (side === 'R') {
    m.makeBasis(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, -1),
      new THREE.Vector3(-1, 0, 0),
    );
  } else {
    m.makeBasis(
      new THREE.Vector3(0, -1, 0),
      new THREE.Vector3(0, 0, -1),
      new THREE.Vector3(1, 0, 0),
    );
  }
  return new THREE.Quaternion().setFromRotationMatrix(m);
}

const CHAINS = {
  foot_L: { root: 'thigh_L', mid: 'shin_L', end: 'foot_L', pole: new THREE.Vector3(0, 0, 1) },
  foot_R: { root: 'thigh_R', mid: 'shin_R', end: 'foot_R', pole: new THREE.Vector3(0, 0, 1) },
  hand_L: { root: 'upperArm_L', mid: 'forearm_L', end: 'hand_L', pole: new THREE.Vector3(-0.35, -0.35, -1).normalize() },
  hand_R: { root: 'upperArm_R', mid: 'forearm_R', end: 'hand_R', pole: new THREE.Vector3(0.35, -0.35, -1).normalize() },
};

export function createPoser(player) {
  const { bones, group, skeleton } = player;
  const BIND_ROOT = new THREE.Vector3(0, 0.74, 0); // chibi pelvis bind height (Stage 13b)
  const targets = { foot_L: null, foot_R: null, hand_L: null, hand_R: null };
  const flatFoot = { L: true, R: true };

  function update() {
    group.updateMatrixWorld(true);
    skeleton.update();
  }

  function hasTargets() {
    return targets.foot_L || targets.foot_R || targets.hand_L || targets.hand_R;
  }

  // Analytic two-bone solve: place the mid joint by the law of cosines on
  // the pole side, then aim the two segments. The target is clamped to the
  // chain's reachable annulus. The arm's twist bones sit between forearm
  // and hand with identity local rotations, so they pass the aim through.
  function solveChain(key, target) {
    const ch = CHAINS[key];
    const rootB = bones[ch.root];
    const midB = bones[ch.mid];
    const endB = bones[ch.end];
    update();
    const R = rootB.getWorldPosition(new THREE.Vector3());
    const M = midB.getWorldPosition(new THREE.Vector3());
    const E = endB.getWorldPosition(new THREE.Vector3());
    const L1 = R.distanceTo(M);
    const L2 = M.distanceTo(E);
    const T = new THREE.Vector3().copy(target);
    const dirRT = new THREE.Vector3().subVectors(T, R);
    let d = dirRT.length();
    if (d < 1e-4) return;
    dirRT.divideScalar(d);
    const maxD = (L1 + L2) * 0.999;
    const minD = Math.abs(L1 - L2) + 0.005;
    if (d > maxD) { T.copy(R).addScaledVector(dirRT, maxD); d = maxD; }
    else if (d < minD) { T.copy(R).addScaledVector(dirRT, minD); d = minD; }
    const bend = new THREE.Vector3().copy(ch.pole)
      .addScaledVector(dirRT, -ch.pole.dot(dirRT));
    if (bend.lengthSq() < 1e-6) {
      bend.set(0, 0, 1).addScaledVector(dirRT, -dirRT.z);
      if (bend.lengthSq() < 1e-6) bend.set(1, 0, 0);
    }
    bend.normalize();
    const cosA1 = clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1);
    const a1 = Math.acos(cosA1);
    const midTarget = new THREE.Vector3().copy(R)
      .addScaledVector(dirRT, L1 * Math.cos(a1))
      .addScaledVector(bend, L1 * Math.sin(a1));
    aimBone(rootB, M, midTarget);
    update();
    const E2 = endB.getWorldPosition(new THREE.Vector3());
    aimBone(midB, E2, T);
    update();
  }

  function solveAll() {
    update();
    for (const key of Object.keys(targets)) {
      if (!targets[key]) continue;
      solveChain(key, targets[key]);
      if (key.startsWith('foot')) {
        const side = key.slice(-1);
        if (flatFoot[side]) setBoneWorldQuat(bones[CHAINS[key].end], IDENTITY_Q);
      }
    }
    update();
  }

  function reset() {
    for (const name of Object.keys(bones)) bones[name].quaternion.identity();
    bones.root.position.copy(BIND_ROOT);
    targets.foot_L = null;
    targets.foot_R = null;
    targets.hand_L = null;
    targets.hand_R = null;
    update();
  }

  function setFootTarget(side, pos, opts = {}) {
    targets[`foot_${side}`] = new THREE.Vector3(pos[0], pos[1], pos[2]);
    flatFoot[side] = opts.flat !== false;
    solveAll();
  }

  function setHandTarget(side, pos) {
    targets[`hand_${side}`] = new THREE.Vector3(pos[0], pos[1], pos[2]);
    solveAll();
  }

  function clearTarget(kind, side) {
    targets[`${kind}_${side}`] = null;
  }

  function setJoint(name, euler) {
    bones[name].quaternion.setFromEuler(new THREE.Euler(euler[0], euler[1], euler[2], 'XYZ'));
    if (hasTargets()) solveAll(); else update();
  }

  function setJointWorld(name, quat) {
    update();
    setBoneWorldQuat(bones[name], quat);
    update();
  }

  function setRoot(pos, euler) {
    if (pos) bones.root.position.set(pos[0], pos[1], pos[2]);
    if (euler) bones.root.quaternion.setFromEuler(new THREE.Euler(euler[0], euler[1], euler[2], 'XYZ'));
    if (hasTargets()) solveAll(); else update();
  }

  function snapshot() {
    const joints = {};
    for (const name of Object.keys(bones)) joints[name] = bones[name].quaternion.toArray();
    return { rootPos: bones.root.position.toArray(), joints };
  }

  function restore(snap) {
    bones.root.position.fromArray(snap.rootPos);
    for (const name of Object.keys(snap.joints)) bones[name].quaternion.fromArray(snap.joints[name]);
    if (hasTargets()) solveAll(); else update();
  }

  function jointWorld(name, out = new THREE.Vector3()) {
    update();
    return bones[name].getWorldPosition(out);
  }

  // Offset of the mid joint from the root->end line (world space). For the
  // pole test: a leg's knee offset should point +z (forward).
  function jointBendOffset(chainKey) {
    const ch = CHAINS[chainKey];
    update();
    const R = bones[ch.root].getWorldPosition(new THREE.Vector3());
    const M = bones[ch.mid].getWorldPosition(new THREE.Vector3());
    const E = bones[ch.end].getWorldPosition(new THREE.Vector3());
    const dir = new THREE.Vector3().subVectors(E, R).normalize();
    const rel = new THREE.Vector3().subVectors(M, R);
    return rel.addScaledVector(dir, -rel.dot(dir));
  }

  return {
    setFootTarget, setHandTarget, clearTarget, setJoint, setJointWorld,
    setRoot, snapshot, restore, reset, solveAll, update,
    jointWorld, jointBendOffset, CHAINS,
  };
}
