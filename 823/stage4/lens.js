// lens.js — Stage 13d: the fisheye lens, as a post pass.
//
// The reference (DECONSTRUCTION §6c) replaces the projection in EVERY
// material by string patching (lensProject in the vertex shader). Our
// codebase has five different material systems (toon, inverted-hull
// outlines with projection-dependent width math, halftone shadow,
// skinned stroke shader, street canvases) — patching all of them
// would touch every look system and break the hull width math. A post
// pass is cleaner: render the scene to a multisampled render target,
// then remap it through a fisheye projection in one fullscreen blit.
// No material changes, no framing changes to the director.
//
// The remap is the equidistant fisheye: a point at angle theta from
// the optical axis lands at radius theta (not tan(theta) as in a
// pinhole). The scene is rendered at a WIDER fov than the shot's, so
// the fisheye has source material past the original frame edges, and
// the centre is magnified back so the director's framing is preserved.
// All three (fov boost, magnification, warp blend) scale with the
// strength, so strength 0 is exactly the identity — and the viewer
// skips the pass entirely at strength 0, so "fisheye off" is the
// byte-identical 13c render path.
//
// Implemented from understanding of the deconstruction, in our own
// code: our remap, our parameters, our pass structure.
import * as THREE from 'three';

// At full strength: the source fov is boosted 1.375x (a 40-degree shot
// renders at 55 degrees) and the centre is magnified 1.25x. Both scale
// linearly with strength, so the default 0.6 gives a 1.225x boost and
// a 1.15x magnification — the character reads at ~97% of the
// undistorted size, the edges show ~7% more street, warped.
const FOV_BOOST = 0.375;
const MAG = 0.25;

export function fisheyeParams(strength) {
  const s = Math.min(1, Math.max(0, strength));
  return { fovBoost: 1 + FOV_BOOST * s, mag: 1 + MAG * s };
}

const BLIT_VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

const BLIT_FRAG = `
uniform sampler2D uMap;
uniform float uStrength; // 0 = identity, 1 = full fisheye remap
uniform float uFov;      // source vertical fov, radians
uniform float uMag;      // centre magnification
uniform float uAspect;   // drawing-buffer aspect (w / h)
varying vec2 vUv;
void main() {
  // Half-height units: y in [-1, 1], x in [-aspect, aspect].
  vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0) * 2.0;
  float r = length(p);
  // Equidistant fisheye: theta grows linearly with radius; the source
  // (pinhole) radius for that theta is tan(theta) / tan(halfFov).
  float halfFov = uFov * 0.5;
  float theta = (r / uMag) * halfFov;
  float rSrc = tan(theta) / tan(halfFov);
  float rBlend = mix(r, rSrc, uStrength);
  vec2 q = r > 1e-6 ? p * (rBlend / r) : p;
  vec2 uv = q / vec2(uAspect, 1.0) * 0.5 + 0.5;
  // The corners of a wide fisheye can sample past the render target;
  // clamp to the edge (a few pixels of edge smear, invisible in
  // practice) instead of wrapping.
  uv = clamp(uv, 0.0, 1.0);
  vec3 col = texture2D(uMap, uv).rgb;
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`;

export function createLensPass({ renderer, lowCost = false }) {
  const dbSize = new THREE.Vector2();
  renderer.getDrawingBufferSize(dbSize);
  // Reduce expensive MSAA resolves on desktop. Low-cost devices keep the
  // fisheye distortion with an 8-bit non-MSAA target to save bandwidth.
  const rt = new THREE.WebGLRenderTarget(dbSize.x, dbSize.y, {
    type: lowCost ? THREE.UnsignedByteType : THREE.HalfFloatType,
    samples: lowCost ? 0 : 2,
  });
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uMap: { value: rt.texture },
      uStrength: { value: 0 },
      uFov: { value: THREE.MathUtils.degToRad(40) },
      uMag: { value: 1 },
      uAspect: { value: dbSize.x / dbSize.y },
    },
    vertexShader: BLIT_VERT,
    fragmentShader: BLIT_FRAG,
    depthTest: false,
    depthWrite: false,
  });
  // Fullscreen triangle (one triangle covers the screen; no quad seam).
  const triGeo = new THREE.BufferGeometry();
  triGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
    -1, -1, 0, 3, -1, 0, -1, 3, 0,
  ]), 3));
  triGeo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([
    0, 0, 2, 0, 0, 2,
  ]), 2));
  const tri = new THREE.Mesh(triGeo, mat);
  tri.frustumCulled = false;
  const fsScene = new THREE.Scene();
  fsScene.add(tri);
  const fsCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  // Render the scene through the lens. The caller owns the camera's
  // fov boost (see fisheyeParams) and passes the BOOSTED fov here.
  function render(scene, camera, { strength = 0, fovDeg = 40, mag = 1 } = {}) {
    // The export resizes the renderer directly (not through the
    // viewer's applyFormat), so the target is re-synced every render.
    renderer.getDrawingBufferSize(dbSize);
    if (rt.width !== dbSize.x || rt.height !== dbSize.y) {
      rt.setSize(dbSize.x, dbSize.y);
    }
    renderer.setRenderTarget(rt);
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
    mat.uniforms.uStrength.value = strength;
    mat.uniforms.uFov.value = THREE.MathUtils.degToRad(fovDeg);
    mat.uniforms.uMag.value = mag;
    mat.uniforms.uAspect.value = dbSize.x / dbSize.y;
    renderer.render(fsScene, fsCamera);
  }

  function dispose() {
    rt.dispose();
    triGeo.dispose();
    mat.dispose();
  }

  return { render, dispose, get target() { return rt; } };
}
