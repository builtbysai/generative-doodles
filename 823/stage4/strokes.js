// strokes.js — Stage 13c: brush strokes as geometry.
//
// The Stage 4 look is a procedural canvas texture in UV space: strokes
// stay on surfaces but cannot occlude, vary with facing, or thin on
// silhouette edges. This module samples the character's merged
// geometry (area-weighted triangles, like the reference's paintSkinned)
// and builds instanced-style stroke quads — one merged SkinnedMesh,
// one draw call — that follow the bones exactly: each quad copies the
// skin indices/weights of its dominant surface vertex, so all four
// corners share one bone blend and the quad rides the surface rigidly.
//
// Implemented from understanding of the deconstruction (DECONSTRUCTION
// §6a), in our own code: our sampling, our flow rules, our stamp atlas.
// The UV brush texture stays underneath, so the piece never looks
// worse than Stage 13b if the strokes are subtle.
import * as THREE from 'three';

// Deterministic RNG (mulberry32) so a build's strokes are stable.
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- Stamp atlas: 4 brush shapes in a 2x2 grid, 256x128 ----------
// Each shape is drawn as a white silhouette with ragged edges and
// bristle streaks (destination-out), so the stamp reads as a brush
// dab, not a rounded rect. The fragment shader samples .r as coverage.
export function makeStampTexture() {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = '#000';
  g.fillRect(0, 0, 256, 128);
  const r = rng(91);
  const shapes = [
    (x, y) => { g.beginPath(); g.ellipse(x + 64, y + 32, 56, 20, 0, 0, 7); g.fill(); },
    (x, y) => { g.fillRect(x + 10, y + 20, 108, 24); },
    (x, y) => {
      g.beginPath(); g.moveTo(x + 8, y + 14); g.lineTo(x + 120, y + 26);
      g.lineTo(x + 120, y + 38); g.lineTo(x + 8, y + 50); g.closePath(); g.fill();
    },
    (x, y) => { g.beginPath(); g.arc(x + 64, y + 32, 26, 0, 7); g.fill(); },
  ];
  shapes.forEach((draw, i) => {
    const cx = (i % 2) * 128, cy = Math.floor(i / 2) * 64;
    g.fillStyle = '#fff';
    draw(cx, cy);
    // Ragged edges: punch small holes along the silhouette.
    g.globalCompositeOperation = 'destination-out';
    for (let k = 0; k < 90; k++) {
      const px = cx + r() * 128, py = cy + r() * 64;
      g.globalAlpha = 0.25 + r() * 0.5;
      g.fillRect(px, py, 1 + r() * 3, 1 + r() * 2);
    }
    // Bristle streaks: thin vertical erasures across the shape.
    for (let k = 0; k < 26; k++) {
      const px = cx + 8 + r() * 112;
      g.globalAlpha = 0.10 + r() * 0.18;
      g.fillRect(px, cy + 6, 1 + r() * 2, 52);
    }
    g.globalAlpha = 1;
    g.globalCompositeOperation = 'source-over';
  });
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.NoColorSpace;
  return tex;
}

// ---------- Flow rule: stroke direction from the bind-pose point ----------
// Strokes follow the form: down the limbs and torso, around the torso
// sides, forward on the shoes, down-and-out on the head. The vector is
// projected onto the surface plane at sampling time.
function flowAt(p) {
  const { x, y, z } = p;
  if (y < 0.15) return [0, 0, 1];                    // shoes: forward
  if (y > 1.10) return [2 * x, -1, 1.2 * z - 0.1];   // head/hair: down-out
  if (y > 0.72 && y < 1.13 && Math.abs(x) > 0.13) {  // torso sides: wrap
    return [Math.sign(x), -0.25, 0];
  }
  return [0.25 * x, -1, 0.25 * z];                   // limbs/torso: down
}

// The face front carries the eyes/smile/cheeks (separate meshes); no
// strokes there, or the brushwork would fight the features.
function isFace(p) {
  return p.y > 1.10 && p.z > 0.12 && Math.abs(p.x) < 0.20;
}

// ---------- Area-weighted surface sampling ----------
function sampleStrokes(geometry, count) {
  const pos = geometry.attributes.position;
  const nor = geometry.attributes.normal;
  const col = geometry.attributes.color;
  const sIdx = geometry.attributes.skinIndex;
  const sWgt = geometry.attributes.skinWeight;
  const index = geometry.index;
  const triCount = index ? index.count / 3 : pos.count / 3;
  // Cumulative triangle areas.
  const areas = new Float64Array(triCount);
  const a = new THREE.Vector3(), b = new THREE.Vector3(), cc = new THREE.Vector3();
  const ab = new THREE.Vector3(), ac = new THREE.Vector3();
  let total = 0;
  const vi = (t, k) => (index ? index.getX(t * 3 + k) : t * 3 + k);
  for (let t = 0; t < triCount; t++) {
    a.fromBufferAttribute(pos, vi(t, 0));
    b.fromBufferAttribute(pos, vi(t, 1));
    cc.fromBufferAttribute(pos, vi(t, 2));
    ab.subVectors(b, a); ac.subVectors(cc, a);
    total += ab.cross(ac).length() * 0.5;
    areas[t] = total;
  }
  const r = rng(20261113);
  const strokes = [];
  let guard = 0;
  while (strokes.length < count && guard++ < count * 30) {
    // Binary search the area table.
    const pick = r() * total;
    let lo = 0, hi = triCount - 1;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (areas[mid] < pick) lo = mid + 1; else hi = mid; }
    const t = lo;
    // Uniform barycentric point.
    const u = Math.sqrt(r()), v = r();
    const w0 = 1 - u, w1 = u * (1 - v), w2 = u * v;
    const i0 = vi(t, 0), i1 = vi(t, 1), i2 = vi(t, 2);
    const p = new THREE.Vector3()
      .addScaledVector(a.fromBufferAttribute(pos, i0), w0)
      .addScaledVector(b.fromBufferAttribute(pos, i1), w1)
      .addScaledVector(cc.fromBufferAttribute(pos, i2), w2);
    if (isFace(p)) continue;
    const n = new THREE.Vector3()
      .addScaledVector(a.fromBufferAttribute(nor, i0), w0)
      .addScaledVector(b.fromBufferAttribute(nor, i1), w1)
      .addScaledVector(cc.fromBufferAttribute(nor, i2), w2).normalize();
    const c = new THREE.Color(
      col.getX(i0) * w0 + col.getX(i1) * w1 + col.getX(i2) * w2,
      col.getY(i0) * w0 + col.getY(i1) * w1 + col.getY(i2) * w2,
      col.getZ(i0) * w0 + col.getZ(i1) * w1 + col.getZ(i2) * w2,
    );
    // Dominant vertex lends its skin blend; the quad rides rigidly.
    const dom = w0 >= w1 && w0 >= w2 ? i0 : (w1 >= w2 ? i1 : i2);
    const skin = { idx: [0, 1, 2, 3].map((k) => sIdx.getComponent(dom, k)), wgt: [0, 1, 2, 3].map((k) => sWgt.getComponent(dom, k)) };
    // Tangent: flow projected onto the surface plane, jittered.
    const f = new THREE.Vector3(...flowAt(p));
    const tan = f.addScaledVector(n, -f.dot(n));
    if (tan.lengthSq() < 1e-6) tan.set(1, 0, 0).addScaledVector(n, -n.x);
    tan.normalize();
    const ang = (r() * 2 - 1) * 0.45; // +/- ~26 deg
    tan.applyAxisAngle(n, ang);
    const bitan = new THREE.Vector3().crossVectors(n, tan).normalize();
    // Size: 35% long strokes, else short; +/-20% jitter.
    const long = r() < 0.35;
    const len = (long ? 0.055 : 0.032) * (0.8 + r() * 0.4);
    const wid = (long ? 0.018 : 0.011) * (0.8 + r() * 0.4);
    // Colour: the surface colour, value-jittered; 15% darker strokes.
    const jitter = 0.9 + r() * 0.2;
    const dark = r() < 0.15 ? 0.72 : 1;
    c.multiplyScalar(jitter * dark);
    strokes.push({ p, n, tan, bitan, c, len, wid, shape: (r() * 4) | 0, seed: r(), skin });
  }
  return strokes;
}

// ---------- Stroke geometry: one merged SkinnedMesh ----------
function buildStrokeGeometry(strokes) {
  const n = strokes.length;
  const position = new Float32Array(n * 4 * 3);
  const normal = new Float32Array(n * 4 * 3);
  const aColor = new Float32Array(n * 4 * 3);
  const aUv = new Float32Array(n * 4 * 2);
  const aSeed = new Float32Array(n * 4);
  const skinIndex = new Uint16Array(n * 4 * 4);
  const skinWeight = new Float32Array(n * 4 * 4);
  const index = new Uint32Array(n * 6);
  const OFF = 0.004; // lift above the surface (kills z-fighting)
  const corner = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
  for (let i = 0; i < n; i++) {
    const s = strokes[i];
    const cu = (s.shape % 2) * 0.5, cv = Math.floor(s.shape / 2) * 0.5;
    for (let k = 0; k < 4; k++) {
      const [su, sv] = corner[k];
      const px = s.p.x + s.n.x * OFF + s.tan.x * (su * s.len / 2) + s.bitan.x * (sv * s.wid / 2);
      const py = s.p.y + s.n.y * OFF + s.tan.y * (su * s.len / 2) + s.bitan.y * (sv * s.wid / 2);
      const pz = s.p.z + s.n.z * OFF + s.tan.z * (su * s.len / 2) + s.bitan.z * (sv * s.wid / 2);
      const v = i * 4 + k;
      position.set([px, py, pz], v * 3);
      normal.set([s.n.x, s.n.y, s.n.z], v * 3);
      aColor.set([s.c.r, s.c.g, s.c.b], v * 3);
      aUv.set([cu + (su + 1) * 0.25, cv + (sv + 1) * 0.25], v * 2);
      aSeed[v] = s.seed;
      skinIndex.set(s.skin.idx, v * 4);
      skinWeight.set(s.skin.wgt, v * 4);
    }
    const b = i * 4, q = i * 6;
    index.set([b, b + 1, b + 2, b, b + 2, b + 3], q);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(position, 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(normal, 3));
  geo.setAttribute('aColor', new THREE.BufferAttribute(aColor, 3));
  geo.setAttribute('aUv', new THREE.BufferAttribute(aUv, 2));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(aSeed, 1));
  geo.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndex, 4));
  geo.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeight, 4));
  geo.setIndex(new THREE.BufferAttribute(index, 1));
  geo.computeBoundingSphere();
  return geo;
}

const VERT = `
#include <common>
#include <skinning_pars_vertex>
attribute vec3 aColor;
attribute vec2 aUv;
attribute float aSeed;
uniform vec3 uLightDir;
varying vec3 vColor;
varying vec2 vUv;
varying float vSeed;
varying float vFacing;
varying float vTone;
void main() {
  vec3 transformed = position;
  vec3 objectNormal = normal;
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <skinning_vertex>
  vec4 mv = modelViewMatrix * vec4(transformed, 1.0);
  vec3 nView = normalize(normalMatrix * objectNormal);
  vec3 vView = normalize(-mv.xyz);
  vFacing = dot(nView, vView);
  vec3 lView = normalize((viewMatrix * vec4(uLightDir, 0.0)).xyz);
  float nl = dot(nView, lView) * 0.5 + 0.5;
  vTone = nl < 0.33 ? 0.30 : (nl < 0.66 ? 0.60 : 1.0);
  vColor = aColor;
  vUv = aUv;
  vSeed = aSeed;
  gl_Position = projectionMatrix * mv;
}`;

const FRAG = `
uniform sampler2D uMap;
varying vec3 vColor;
varying vec2 vUv;
varying float vSeed;
varying float vFacing;
varying float vTone;
void main() {
  if (vFacing < 0.06) discard;
  float cov = texture2D(uMap, vUv).r;
  if (cov < 0.08) discard;
  float jitter = 0.92 + 0.16 * fract(vSeed * 7.13);
  vec3 col = vColor * vTone * jitter;
  col *= 0.85 + 0.15 * cov;
  gl_FragColor = vec4(col, cov * 0.95);
  #include <colorspace_fragment>
}`;

export function createStrokeMesh(player, { count = 4000, lightDir = new THREE.Vector3(3, 6, 4).normalize() } = {}) {
  const strokes = sampleStrokes(player.mesh.geometry, count);
  const geo = buildStrokeGeometry(strokes);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uMap: { value: makeStampTexture() },
      uLightDir: { value: lightDir.clone() },
    },
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite: true,
    // NOTE: no `skinning: true` — in three r170 skinning is automatic
    // for SkinnedMesh objects (getParameters: object.isSkinnedMesh),
    // and the property no longer exists on materials.
  });
  const mesh = new THREE.SkinnedMesh(geo, mat);
  mesh.name = 'strokeMesh';
  // Share the player's skeleton (same pattern as look.js makeHull).
  mesh.skeleton = player.mesh.skeleton;
  mesh.bindMatrix = player.mesh.bindMatrix;
  mesh.bindMatrixInverse = player.mesh.bindMatrixInverse;
  mesh.frustumCulled = false;
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  mesh.renderOrder = 2;
  mesh.userData.strokeCount = strokes.length;
  return mesh;
}

// ---------------------------------------------------------------------------
// Object strokes (Stage 13d): the same brushwork for a plain,
// non-skinned object — the basketball. The ball is a separate mesh
// that spins, bounces, and changes parents (hand -> group) during the
// routine, so its strokes are a plain Mesh parented to the ball: they
// ride its transform exactly, through every re-parenting (attach()
// preserves the world transform of the whole subtree).
//
// The sampler duplicates the character sampler's area-weighted
// algorithm (kept separate on purpose: the character path is verified
// and must not be disturbed). Colours come from a callback — for the
// ball, the seam texture itself, so strokes on a seam read dark.
// ---------------------------------------------------------------------------
function sampleObjectStrokes(geometry, { count, colorAt, flowAt, size, seed = 20261113 }) {
  const pos = geometry.attributes.position;
  const nor = geometry.attributes.normal;
  const uv = geometry.attributes.uv;
  const index = geometry.index;
  const triCount = index ? index.count / 3 : pos.count / 3;
  const areas = new Float64Array(triCount);
  const a = new THREE.Vector3(), b = new THREE.Vector3(), cc = new THREE.Vector3();
  const ab = new THREE.Vector3(), ac = new THREE.Vector3();
  let total = 0;
  const vi = (t, k) => (index ? index.getX(t * 3 + k) : t * 3 + k);
  for (let t = 0; t < triCount; t++) {
    a.fromBufferAttribute(pos, vi(t, 0));
    b.fromBufferAttribute(pos, vi(t, 1));
    cc.fromBufferAttribute(pos, vi(t, 2));
    ab.subVectors(b, a); ac.subVectors(cc, a);
    total += ab.cross(ac).length() * 0.5;
    areas[t] = total;
  }
  const r = rng(seed);
  const strokes = [];
  let guard = 0;
  while (strokes.length < count && guard++ < count * 30) {
    const pick = r() * total;
    let lo = 0, hi = triCount - 1;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (areas[mid] < pick) lo = mid + 1; else hi = mid; }
    const t = lo;
    const u = Math.sqrt(r()), v = r();
    const w0 = 1 - u, w1 = u * (1 - v), w2 = u * v;
    const i0 = vi(t, 0), i1 = vi(t, 1), i2 = vi(t, 2);
    const p = new THREE.Vector3()
      .addScaledVector(a.fromBufferAttribute(pos, i0), w0)
      .addScaledVector(b.fromBufferAttribute(pos, i1), w1)
      .addScaledVector(cc.fromBufferAttribute(pos, i2), w2);
    const n = new THREE.Vector3()
      .addScaledVector(a.fromBufferAttribute(nor, i0), w0)
      .addScaledVector(b.fromBufferAttribute(nor, i1), w1)
      .addScaledVector(cc.fromBufferAttribute(nor, i2), w2).normalize();
    const puv = uv ? [
      uv.getX(i0) * w0 + uv.getX(i1) * w1 + uv.getX(i2) * w2,
      uv.getY(i0) * w0 + uv.getY(i1) * w1 + uv.getY(i2) * w2,
    ] : [0.5, 0.5];
    const c = colorAt(puv, p);
    const f = new THREE.Vector3(...flowAt(p, n));
    const tan = f.addScaledVector(n, -f.dot(n));
    if (tan.lengthSq() < 1e-6) tan.set(1, 0, 0).addScaledVector(n, -n.x);
    tan.normalize();
    tan.applyAxisAngle(n, (r() * 2 - 1) * 0.45); // +/- ~26 deg
    const bitan = new THREE.Vector3().crossVectors(n, tan).normalize();
    const long = r() < 0.35;
    const len = (long ? size[0] : size[2]) * (0.8 + r() * 0.4);
    const wid = (long ? size[1] : size[3]) * (0.8 + r() * 0.4);
    const jitter = 0.9 + r() * 0.2;
    const dark = r() < 0.15 ? 0.72 : 1;
    c.multiplyScalar(jitter * dark);
    strokes.push({ p, n, tan, bitan, c, len, wid, shape: (r() * 4) | 0, seed: r() });
  }
  return strokes;
}

function buildObjectStrokeGeometry(strokes, lift) {
  const n = strokes.length;
  const position = new Float32Array(n * 4 * 3);
  const normal = new Float32Array(n * 4 * 3);
  const aColor = new Float32Array(n * 4 * 3);
  const aUv = new Float32Array(n * 4 * 2);
  const aSeed = new Float32Array(n * 4);
  const index = new Uint32Array(n * 6);
  const corner = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
  for (let i = 0; i < n; i++) {
    const s = strokes[i];
    const cu = (s.shape % 2) * 0.5, cv = Math.floor(s.shape / 2) * 0.5;
    for (let k = 0; k < 4; k++) {
      const [su, sv] = corner[k];
      const px = s.p.x + s.n.x * lift + s.tan.x * (su * s.len / 2) + s.bitan.x * (sv * s.wid / 2);
      const py = s.p.y + s.n.y * lift + s.tan.y * (su * s.len / 2) + s.bitan.y * (sv * s.wid / 2);
      const pz = s.p.z + s.n.z * lift + s.tan.z * (su * s.len / 2) + s.bitan.z * (sv * s.wid / 2);
      const v = i * 4 + k;
      position.set([px, py, pz], v * 3);
      normal.set([s.n.x, s.n.y, s.n.z], v * 3);
      aColor.set([s.c.r, s.c.g, s.c.b], v * 3);
      aUv.set([cu + (su + 1) * 0.25, cv + (sv + 1) * 0.25], v * 2);
      aSeed[v] = s.seed;
    }
    const b = i * 4, q = i * 6;
    index.set([b, b + 1, b + 2, b, b + 2, b + 3], q);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(position, 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(normal, 3));
  geo.setAttribute('aColor', new THREE.BufferAttribute(aColor, 3));
  geo.setAttribute('aUv', new THREE.BufferAttribute(aUv, 2));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(aSeed, 1));
  geo.setIndex(new THREE.BufferAttribute(index, 1));
  geo.computeBoundingSphere();
  return geo;
}

// Plain (non-skinned) stroke vertex shader: the same toon tone and
// facing cull as the character strokes, without the skinning includes.
const VERT_PLAIN = `
#include <common>
attribute vec3 aColor;
attribute vec2 aUv;
attribute float aSeed;
uniform vec3 uLightDir;
varying vec3 vColor;
varying vec2 vUv;
varying float vSeed;
varying float vFacing;
varying float vTone;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vec3 nView = normalize(normalMatrix * normal);
  vec3 vView = normalize(-mv.xyz);
  vFacing = dot(nView, vView);
  vec3 lView = normalize((viewMatrix * vec4(uLightDir, 0.0)).xyz);
  float nl = dot(nView, lView) * 0.5 + 0.5;
  vTone = nl < 0.33 ? 0.30 : (nl < 0.66 ? 0.60 : 1.0);
  vColor = aColor;
  vUv = aUv;
  vSeed = aSeed;
  gl_Position = projectionMatrix * mv;
}`;

// Read the ball's seam texture (a canvas) into pixels, once, so stroke
// colours can sample it. The canvas holds sRGB values; the shader
// works in linear, so each sample is converted (matching the
// character strokes, whose vertex colours are linear).
function ballTexturePixels(ball) {
  const canvas = ball.material.map.image;
  const w = canvas.width, h = canvas.height;
  const g = canvas.getContext('2d');
  const data = g.getImageData(0, 0, w, h).data;
  const c = new THREE.Color();
  return (puv) => {
    const x = Math.min(w - 1, Math.max(0, Math.floor(puv[0] * w)));
    const y = Math.min(h - 1, Math.max(0, Math.floor((1 - puv[1]) * h)));
    const i = (y * w + x) * 4;
    c.setRGB(data[i] / 255, data[i + 1] / 255, data[i + 2] / 255);
    return c.convertSRGBToLinear().clone();
  };
}

export function createBallStrokeMesh(player, { count = 450, lightDir = new THREE.Vector3(3, 6, 4).normalize() } = {}) {
  const ball = player.ball;
  const colorAt = ballTexturePixels(ball);
  const up = new THREE.Vector3(0, 1, 0);
  const strokes = sampleObjectStrokes(ball.geometry, {
    count,
    colorAt: (puv) => colorAt(puv),
    // Flow circles the ball (horizontal rings, jittered): the paint
    // follows the ball's curvature, and the seams cut across it.
    flowAt: (p) => {
      const radial = p.clone().normalize();
      const f = new THREE.Vector3().crossVectors(up, radial);
      if (f.lengthSq() < 1e-6) f.set(1, 0, 0);
      return f.toArray();
    },
    size: [0.030, 0.010, 0.018, 0.006], // long len/wid, short len/wid
    seed: 20261113 + 7,
  });
  const geo = buildObjectStrokeGeometry(strokes, 0.0015);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uMap: { value: makeStampTexture() },
      uLightDir: { value: lightDir.clone() },
    },
    vertexShader: VERT_PLAIN,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite: true,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.name = 'ballStrokeMesh';
  mesh.frustumCulled = false;
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  mesh.renderOrder = 2;
  mesh.userData.strokeCount = strokes.length;
  return mesh;
}
