# Bruno Imbrizi: Interactive Particles (Codrops, Jan 2019)

**Source:** https://github.com/brunoimbrizi/interactive-particles and the
Codrops article https://tympanus.net/codrops/2019/01/17/interactive-particles-with-three-js/
(also the queue items "Codrops: Interactive Particles with three.js" and
"Codrops InteractiveParticles tutorial", covered in this one pass).
**Author:** Bruno Imbrizi, a creative developer in London (brunoimbrizi.com),
longtime Codrops contributor. The repo is the article's source code
(webpack + three r98, MIT license).
**Status:** 2026-09-25, deep. Article read end to end; Particles.js,
TouchTexture.js, InteractiveControls.js, particle.vert, particle.frag read
in full from the repo; live demo at
https://tympanus.net/Tutorials/InteractiveParticles/ viewed in headless
Chrome with software WebGL, at rest and with a synthetic pointer sweep
painting the touch trail (touch dispersal confirmed on screen); the core
technique re-rendered fresh in plain 2D canvas (sample-03.png from the
repo's static images, discard threshold, 64x64 touch canvas with the
article's easing/force recipe, shader displacement lines translated to
2D) and frames visually inspected at rest and mid-sweep.

## The core recipe

One image (320x180, 57,600 pixels) becomes one instanced quad per bright
pixel, drawn as a single THREE.Mesh with InstancedBufferGeometry. The
quad geometry is 4 vertices and 2 triangles; the per-instance attributes
are `pindex` (pixel index), `offset` (pixel x,y), and `angle` (one random
0..PI per particle). Everything interesting happens in the vertex shader,
so tens of thousands of particles animate with zero CPU loop per frame.

The displacement has three layers, in this order in particle.vert:

1. **Scatter:** `displaced.xy += vec2(random(pindex)-0.5, ...) * uRandom`.
   Each particle gets a fixed random xy offset. uRandom tweens 1.0 to 2.0
   on show() and 5.0 on hide(), so the intro and outro are just the same
   cloud breathing outward. Cheap, effective.
2. **Drift:** `rndz = random(pindex) + snoise_1_2(vec2(pindex*0.1,
   uTime*0.1))`, then `displaced.z += rndz * (random(pindex)*2.0*uDepth)`.
   Per-particle noise time, all in the shader. Particle size also breathes
   with noise: `psize = (snoise_1_2(vec2(uTime, pindex)*0.5) + 2.0) *
   max(grey, 0.2) * uSize`. Size follows image brightness, so the cloud
   reads as the image even at full scatter.
3. **Touch:** the cursor is raycast against an invisible PlaneGeometry the
   same size as the particle field, uv is stored in a trail, and the trail
   is painted onto a 64x64 offscreen canvas (the touch texture). The vertex
   shader samples it: `float t = texture2D(uTouch, puv).r`, then

   ```
   displaced.z += t * 20.0 * rndz;
   displaced.x += cos(angle) * t * 20.0 * rndz;
   displaced.y += sin(angle) * t * 20.0 * rndz;
   ```

   Note what this is NOT: it is not a radial push away from the cursor.
   Each particle slides along its OWN random angle, scaled by the touch
   brightness under it. The result looks like the image shattering along
   thousands of personal directions where the pointer passes. That is the
   signature of the piece: every particle has a direction, the touch just
   decides how far along it.

The fragment shader is plain: sample the image, convert to grey with the
luminosity method, mask a soft circle with smoothstep on uv distance.
Colors in the samples are portraits, so the piece ships monochrome by
accident of content, not by shader design.

## The touch texture (the portable idea)

TouchTexture.js is the part worth stealing for anything interactive.
64x64 canvas, black. Each frame: clear, age every trail point, drop
points older than maxAge (120 frames), repaint. Each point draws a radial
gradient disc whose intensity has three ingredients:

- **Envelope:** easeOutSine up over the first 30% of life, easeOutSine
  down over the rest. Trails bloom and decay smoothly, never pop.
- **Force:** `min(dd*10000, 1)` where dd is the squared uv distance from
  the previous point. Fast pointer motion paints hot, slow motion paints
  faint. Speed becomes pressure.
- **Radius:** `size * 0.15 * intensity`, so the disc also grows and
  shrinks with the envelope.

Why it sings: the interaction history lives in a texture, not in particle
state. The shader does no tracking, no per-particle velocity, no CPU loop.
You get easing, trails, and pressure for free, at 64x64 cost. Any pointer
or even multi-touch or audio-reactive input can paint into the same
canvas. This is the same trick as pressure-sensitive brush stamping, done
once on the CPU and read by every particle in parallel.

## The discard optimization

Dark pixels are skipped before geometry creation: draw the image to a
canvas, getImageData, count pixels with red > 34 (0x22), allocate only
that many instances. On a portrait over black this cuts most of the
57,600. The shader still uses brightness for size (`max(grey, 0.2)` keeps
mid tones alive), so the count and the look are controlled by two
different knobs: threshold for how many, size curve for how visible.

## What makes it sing

The rest state is a pointillist portrait: dots sized by brightness,
jittered just enough (uRandom 2.0) that edges fizz without dissolving.
The palette is content, not styling: grey dots on near black, the dots
themselves carrying all the tone. The touch feels physical because the
trail has memory (120 frames), envelope easing, and speed-as-force:
flick fast and the image explodes, move slow and it stirs. The intro
(uDepth 40 to 4, uRandom 1 to 2, uSize 0.5 to 1.5 via gsap) assembles the
portrait from a deep scattered field, which is the whole demo in one
gesture.

## Overdone / avoid-list

- Do not reuse the exact recipe (instanced image dots + 64x64 touch) as a
  piece. It is a known Codrops demo; a straight clone reads as a clone.
  Steal the touch-texture-as-input idea, change the geometry and the
  displacement law.
- The grey-on-black portrait is the demo's look, not a choice. If the
  source image has color, keep it or remap it; the fragment shader's grey
  conversion is the least interesting line in the file.
- Per-particle random direction is the demo's secret; radial push from
  the cursor would be the generic version. Keep the personal-direction
  idea when borrowing.

## Technique takeaways for the seed file

- Feedback texture as interaction bus: one low-res canvas the pointer
  (or audio, or another agent) paints into, read by all particles in the
  shader. No per-particle CPU state, trails and easing included.
- Speed as pressure: force = min(dist2 * k, 1) on consecutive pointer
  positions. Turns any pointer path into expressive input without a
  pressure sensor.
- Fixed per-particle direction vector times a field value, instead of
  radial repulsion. Scatters that look chaotic but personal.
- Discard-by-threshold before instancing: count bright pixels first,
  allocate exactly that many instances.
