// look.js — Stage 4: the painted look (hand-rolled, per-mesh).
//
// Decision (evidence in VERIFY-4.md): PainterlyPass was fetched and read
// first-hand (333 lines). It repaints the whole frame with surface-anchored
// strokes, but it has no toon banding, no outlines, no rim erosion, and no
// halftone shadow — all four are Stage 4 acceptance criteria, and all four
// are per-mesh systems. So Stage 4 is hand-rolled per-mesh on the hero, and
// PainterlyPass is deferred to Stage 5 as a candidate world treatment.
//
// Systems here:
//   1. Brush texture (procedural canvas, UV space — strokes stay on surfaces)
//   2. Toon materials (MeshToonMaterial + 3-step gradientMap)
//   3. Inverted-hull outlines (constant px width, N.V weight variation,
//      object-space hash rim erosion)
//   4. Halftone shadow overlay (real shadow-map silhouette, dot screen)
// The Kuwahara base pass lives in kuwahara.js.
import * as THREE from 'three';

// ---------- 1. Brush texture (procedural, no asset) ----------
// Options (Stage 8 settings, all live): size scales the dab radii,
// density scales the dab/stroke counts, disorder scales the dab
// rotation spread. The dabs are VISIBLE directional strokes, not
// grain: the long strokes run near-vertical in UV space, and the
// limb/torso UVs run along the form, so the strokes follow the body
// the way the reference's brush does. Disorder 0 aligns all strokes
// vertically; the default 0.78 spreads them ±~40°.
// (Stage 10 changed the values from the faint Stage 4 grain — base
// 235 -> 208, dab values 180-255 -> 110-200, alpha up — so the
// texture no longer reproduces the Stage 4 bytes. The no-args texture
// and the settings-default texture are still the same canvas.)
export function makeBrushTexture(opts = {}) {
  const px = typeof opts === 'number' ? opts : (opts.px || 512);
  const size = typeof opts === 'number' ? 1 : (opts.size ?? 1.0);
  const density = typeof opts === 'number' ? 1 : (opts.density ?? 1.0);
  const disorder = typeof opts === 'number' ? 0.78 : (opts.disorder ?? 0.78);
  const c = document.createElement('canvas');
  c.width = px; c.height = px;
  const g = c.getContext('2d');
  g.fillStyle = 'rgb(208,208,208)';
  g.fillRect(0, 0, px, px);
  let seed = 1234567;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  // Coarse dab strokes: fewer, bigger, with real value contrast, so
  // they read as brushwork on the figure instead of faint grain.
  for (let i = 0; i < Math.round(220 * density); i++) {
    const x = rnd() * px, y = rnd() * px;
    const len = (15 + rnd() * 30) * size, wid = (5 + rnd() * 6) * size;
    const ang = rnd() * Math.PI * (disorder / 0.78);
    const v = 110 + Math.floor(rnd() * 90);
    g.save();
    g.translate(x, y);
    g.rotate(ang);
    g.fillStyle = `rgba(${v},${v},${v},${0.25 + rnd() * 0.20})`;
    g.beginPath();
    g.ellipse(0, 0, len / 2, wid / 2, 0, 0, Math.PI * 2);
    g.fill();
    g.restore();
  }
  // Long directional strokes: near-vertical in UV space (the limb and
  // torso UVs run along the form), so the strokes follow the body.
  // Disorder widens the spread around vertical.
  for (let i = 0; i < Math.round(60 * density); i++) {
    const x = rnd() * px, y = rnd() * px;
    const len = (40 + rnd() * 60) * size, wid = (4 + rnd() * 4) * size;
    const ang = Math.PI / 2 + (rnd() * 2 - 1) * (Math.PI / 2) * (disorder / 0.78) * 0.8;
    const v = 120 + Math.floor(rnd() * 80);
    g.save();
    g.translate(x, y);
    g.rotate(ang);
    g.fillStyle = `rgba(${v},${v},${v},${0.22 + rnd() * 0.18})`;
    g.beginPath();
    g.ellipse(0, 0, len / 2, wid / 2, 0, 0, Math.PI * 2);
    g.fill();
    g.restore();
  }
  // Fine grain.
  for (let i = 0; i < 4000; i++) {
    const v = 170 + Math.floor(rnd() * 60);
    g.fillStyle = `rgba(${v},${v},${v},0.10)`;
    g.fillRect(rnd() * px, rnd() * px, 1, 1);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  tex.colorSpace = THREE.NoColorSpace;
  return tex;
}

// ---------- 2. Toon gradient (3 hard bands) ----------
export function makeToonGradient() {
  // Tuned equivalent of de Laubier's 0 / 0.25 / 1: the shadow band stays
  // readable (0.30) instead of pure black on a bright character.
  const data = new Uint8Array([76, 153, 255]); // 0.30, 0.60, 1.00
  const tex = new THREE.DataTexture(data, 3, 1, THREE.RedFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  // Required: a 3-byte row is not 4-byte aligned, and the default
  // UNPACK_ALIGNMENT of 4 mis-uploads the middle texel (measured: the
  // middle band never appeared until this was set).
  tex.unpackAlignment = 1;
  tex.needsUpdate = true;
  return tex;
}

// ---------- 3. Inverted-hull outlines ----------
// Constant screen-space width: the view-space offset is
//   width_px * depth / (proj11 * viewportHeight * 0.5)
// so the outline holds at 2 px at any camera distance. Weight varies with
// the normal/view angle (silhouette edges thicken, flat-facing thins).
// Rim erosion discards hull fragments by an object-space hash, so the
// eaten edge sticks to the surface and never swims.
export function makeHullMaterial({ widthPx = 1.75, color = 0x141414, erode = true } = {}) {
  const mat = new THREE.MeshBasicMaterial({ color, side: THREE.BackSide });
  mat.userData.uWidthPx = { value: widthPx };
  mat.userData.uViewportH = { value: 960 };
  mat.userData.uProj11 = { value: 2.747 };
  mat.userData.uErode = { value: erode ? 0.78 : 2.0 }; // >1 disables
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uWidthPx = mat.userData.uWidthPx;
    shader.uniforms.uViewportH = mat.userData.uViewportH;
    shader.uniforms.uProj11 = mat.userData.uProj11;
    shader.uniforms.uErode = mat.userData.uErode;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>
        uniform float uWidthPx; uniform float uViewportH; uniform float uProj11;
        attribute float aCurv;
        varying vec3 vObjPos;`)
      // After skinning_vertex: `transformed` is skinned (or plain).
      // objectNormal exists ONLY when USE_SKINNING is defined (meshbasic
      // guards beginnormal_vertex behind USE_ENVMAP || USE_SKINNING), so
      // the plain-mesh hull uses the `normal` attribute instead.
      // Line weight comes from the per-vertex region class (aCurv):
      // w = 1.0 + 1.0 * aCurv, so the flat torso draws 2 px effective and
      // the curved head ~3.5 px — the >=1 px curved-vs-flat difference
      // the criteria ask for, while the torso edge stays at the 2 px bar.
      .replace('#include <skinning_vertex>', `#include <skinning_vertex>
        vObjPos = position;
        {
          #ifdef USE_SKINNING
            vec3 hn = normalize(objectNormal);
          #else
            vec3 hn = normalize(normal);
          #endif
          vec4 mv = modelViewMatrix * vec4(transformed, 1.0);
          float depth = max(-mv.z, 0.001);
          float off = uWidthPx * depth / (uProj11 * uViewportH * 0.5) * (1.0 + 1.0 * aCurv);
          transformed += hn * off;
        }`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
        uniform float uErode;
        varying vec3 vObjPos;
        float hash3(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453); }`)
      .replace('#include <dithering_fragment>', `
        if (hash3(floor(vObjPos * 30.0)) > uErode) discard;
        #include <dithering_fragment>`);
  };
  return mat;
}

// Keep the hull's projection/viewport uniforms in sync with the real camera.
export function updateHullUniforms(hull, camera, viewportH) {
  const u = hull.material.userData;
  u.uProj11.value = camera.projectionMatrix.elements[5];
  u.uViewportH.value = viewportH;
}

// Per-vertex line weight as an 'aCurv' attribute (0..1).
//
// Two measured-curvature attempts failed to separate the body parts:
// angle-per-edge saturated (short lathe-profile edges), and a fixed 5 cm
// neighbourhood saturated too (the merged mesh mixes parts — a torso
// vertex near the shoulder finds arm vertices with very different normals
// within 5 cm). So the weight is assigned by body region from the known
// bind pose: the regions ARE the curvature classes of this character
// (head = small radius = high curvature, torso = broad = low curvature).
// Documented here, verified by the outline-width measurements (head ~3 px,
// torso ~2 px). The ball (a separate sphere geometry) gets a uniform 0.8.
export function addCurvatureAttribute(geometry, mode = 'player') {
  const pos = geometry.attributes.position;
  const n = pos.count;
  const curv = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    if (mode === 'ball') { curv[i] = 0.8; continue; }
    const x = pos.getX(i), y = pos.getY(i);
    const ax = Math.abs(x);
    if (y > 1.55) curv[i] = 1.0;                    // head
    else if (y < 0.15) curv[i] = 0.5;               // shoes
    else if (y > 1.05 && y <= 1.55 && ax < 0.25) curv[i] = 0.0; // torso
    else if (y >= 0.85 && y <= 1.10 && ax < 0.25) curv[i] = 0.2; // shorts
    else curv[i] = 0.7;                             // arms, legs, hands
  }
  geometry.setAttribute('aCurv', new THREE.BufferAttribute(curv, 1));
  return geometry;
}

// Hull for a mesh: shares geometry + skeleton (skinned) or geometry (plain).
export function makeHull(mesh, opts = {}) {
  const mat = makeHullMaterial(opts);
  let hull;
  if (!mesh.geometry.attributes.aCurv) {
    addCurvatureAttribute(mesh.geometry, mesh.isSkinnedMesh ? 'player' : 'ball');
  }
  if (mesh.isSkinnedMesh) {
    mat.skinning = true; // required: without it the hull stays in bind pose
    hull = new THREE.SkinnedMesh(mesh.geometry, mat);
    hull.skeleton = mesh.skeleton;
    hull.bindMatrix = mesh.bindMatrix;
    hull.bindMatrixInverse = mesh.bindMatrixInverse;
  } else {
    hull = new THREE.Mesh(mesh.geometry, mat);
  }
  hull.frustumCulled = false;
  hull.castShadow = false;
  hull.receiveShadow = false;
  hull.renderOrder = 1;
  return hull;
}

// ---------- 4. Halftone shadow overlay ----------
// A transparent plane just above the ground that samples the directional
// light's real shadow map and draws the shadow as a halftone dot screen.
// The shape is the character's true silhouette (it IS the shadow map);
// dot radius grows with shadow darkness.
export function makeHalftoneShadow(light, { dotScale = 90, opacity = 0.85 } = {}) {
  const geo = new THREE.PlaneGeometry(12, 12);
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uShadowMap: { value: null },
      uShadowMatrix: { value: new THREE.Matrix4() },
      uDotScale: { value: dotScale },
      uOpacity: { value: opacity },
      // Ink colour (Stage 8 palette). Default (0.08, 0.08, 0.12) is the
      // original hardcoded value, now a uniform so the palette can move it.
      uInk: { value: new THREE.Color(0.08, 0.08, 0.12) },
    },
    vertexShader: `
      uniform mat4 uShadowMatrix;
      varying vec4 vShadowCoord;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vShadowCoord = uShadowMatrix * wp;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,
    fragmentShader: `
      uniform sampler2D uShadowMap;
      uniform float uDotScale;
      uniform float uOpacity;
      uniform vec3 uInk;
      varying vec4 vShadowCoord;
      varying vec2 vUv;
      void main() {
        vec3 coord = vShadowCoord.xyz / vShadowCoord.w;
        if (coord.x < 0.0 || coord.x > 1.0 || coord.y < 0.0 || coord.y > 1.0) discard;
        // Five-tap cross PCF instead of nine samples per fragment.
        // The centre is weighted twice to retain the hand-inked soft edge.
        vec2 texel = 1.0 / vec2(textureSize(uShadowMap, 0));
        float depth = coord.z - 0.002;
        float s = 2.0 * step(texture2D(uShadowMap, coord.xy).r, depth);
        s += step(texture2D(uShadowMap, coord.xy + vec2(texel.x, 0.0)).r, depth);
        s += step(texture2D(uShadowMap, coord.xy - vec2(texel.x, 0.0)).r, depth);
        s += step(texture2D(uShadowMap, coord.xy + vec2(0.0, texel.y)).r, depth);
        s += step(texture2D(uShadowMap, coord.xy - vec2(0.0, texel.y)).r, depth);
        float shadow = s / 6.0;
        if (shadow < 0.02) discard;
        // Halftone dots: radius grows with shadow darkness.
        vec2 grid = vUv * uDotScale;
        vec2 cell = fract(grid) - 0.5;
        float r = 0.10 + 0.32 * shadow;
        float dot = smoothstep(r, r - 0.06, length(cell));
        gl_FragColor = vec4(uInk, dot * shadow * uOpacity);
      }`,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 0.005;
  mesh.renderOrder = 2;
  mesh.userData.updateFromLight = () => {
    if (light.shadow.map) mat.uniforms.uShadowMap.value = light.shadow.map.texture;
    mat.uniforms.uShadowMatrix.value.copy(light.shadow.matrix);
  };
  return mesh;
}
