# No.982 — Signal Field

Study #120 daito-manabe, PP143 "VS. Continuum Resonance".

## Concept

A black field of RGB particle static — thousands of tiny red, green and yellow
points gathered into slow swirling clusters, like spiking-neuron or
flow-cytometry data. White wireframe polyhedra drift and rotate through the
field, and the particles bend around their edges as they pass. The whole field
breathes on a 50 bpm sub-bass pulse: every 1.2 s the particle brightness swells
and decays. Every ~40 seconds a word — RESONANCE, CONTINUUM, SIGNAL, BODY,
cycling — slices across the field in huge white type, cut into horizontal
glitch strips, holds for about three seconds, and dissolves back into the
particles. The word is an event, not furniture; most of the time the field is
just the field.

Interactions: tap detonates the particles outward from the tap point and they
settle back into their clusters; drag stirs the field in a viscous wake;
double-tap reseeds a new continuum (new clusters, new polyhedra, word cycle
advanced). Sound starts only on the first gesture: a low sub-bass thump locked
to the visual breath, a very quiet high shimmer, a soft glass tone when a
polyhedron crosses the centre of the field, and a glitch-cut noise burst when
a word slices in.

## Construction

- **Particles.** Fixed-step simulation at 120 Hz (dt = 1/120), seeded with
  mulberry32. 3000 particles on desktop, 1800 on phones (see Deviations).
  Six seeded cluster centres drift on slow closed-form sine paths; each
  particle is bound to one cluster and integrated with a spring toward the
  centre, a tangential swirl term (so clusters rotate rather than collapse),
  velocity damping, and a per-particle sinusoidal jitter. Colour is a seeded
  assignment to one of the three primaries; base alpha 0.4–0.9.
- **Breath.** Closed form in sim time: brightness multiplier
  `1 + 0.5 * exp(-(t mod 1.2) * 4.2)`, applied to particle alpha at draw.
- **Polyhedra.** Cube, tetrahedron, octahedron and icosahedron vertex/edge
  tables (icosahedron edges found by the golden-ratio vertex distance). Seven
  instances travel seeded paths across the frame (wrapping), rotating on three
  axes as closed-form functions of t, orthographically projected, stroked in
  #F5F2EA at 0.7 alpha. **Lensing:** at draw time, a particle inside a solid's
  bounding circle is tested against that solid's projected edge segments;
  within 14 px of a segment it is displaced perpendicular to the segment,
  proportional to closeness — the field visibly bends around the edges.
- **Type event (clip-strip adaptation).** The prompt's source workflow renders
  type to an offscreen canvas and slices it; this gallery forbids offscreen
  canvases, and none is needed: each of the 14 horizontal strips is drawn by
  clipping the context to the strip's band (`save` / `beginPath` / `rect` /
  `clip`) and filling the full word once at that strip's glitch offset. Strip
  offsets combine a per-word seeded displacement with a fast jitter reseeded
  on a 0.09 s hash clock. Font size is fitted by measuring the word so it
  spans ~104% of the frame width and crops at the edges, as specced.
- **Frame one.** The script runs exactly 2400 fixed steps (20 s of sim)
  synchronously at load, then draws. Nothing in the drawn state derives from
  the wall clock; pointer events are queued with sim-step stamps and consumed
  by the stepper in order. The first word is scheduled at t = 40 s, so frame
  one is field-only by design.
- **Sizing.** Canvas size comes from the Visual Viewport API with resize
  listeners on both `visualViewport` and `window`; the canvas CSS size is
  pinned in pixels inside `draw()` every frame. Phone detection uses
  `window.screen` (min dimension < 700 px) with the aspect fallback
  (`h > w * 1.15`). The page ground is the field colour #050607, so the piece
  is full-bleed on phones.
- **Audio.** All WebAudio is lazy, created inside the first pointer gesture
  and `typeof`-guarded. No microphone. The rAF loop is `typeof`-guarded; in
  the QA renderer (no rAF) the piece simply holds its synchronous first frame.

## QA log

- Rendered with `render-piece.js` at 1280×900 (desktop), 390×844 (mobile),
  720×720 (thumb). All renders complete in ~1 s, silent, no errors.
- **Determinism:** thumb rendered twice and `cmp`-compared — byte-identical.
  Duplicate deleted.
- Desktop and thumb read-back: black field, six dense RGB clusters swirling,
  seven wireframe solids at varied sizes mid-journey (icosahedra, cube,
  tetrahedra, octahedron cropped at the left edge while travelling), no text
  at frame one. A bright arc of particles is visible bending along one
  icosahedron edge — the lensing working.
- Mobile read-back: full field fits the tall frame, clusters and solids
  legible, nothing clipped except solids intentionally mid-crossing at the
  edges.
- Word event verified out-of-band: a throwaway copy in /tmp with the first
  word moved to t = 18 s renders "RESONANCE" spanning the full width, cropped
  at both edges, strips displaced horizontally in the glitch pattern. The
  shipped file keeps the specced 40 s schedule (word absent from frame one).
- One fix round: polyhedron scale was originally absolute pixels, which made
  the solids grotesquely large on the 390-wide phone frame. Scale is now
  proportional to `min(W, H)` (0.04–0.11 of the short side as the vertex unit),
  and all three sizes were re-rendered and determinism re-verified.

## Deviations

- **Particle count on phones: 1800 instead of 3000.** Legibility and frame
  rate on small devices; the mechanism and density character are unchanged.
  Recorded per the brief's allowance.
- **Cluster shimmer audio is global, not per-cluster.** The prompt maps
  shimmer gain to local cluster density; the piece uses one very quiet looped
  noise shimmer whose presence reads as the field's air. The density-mapped
  elements that carry the mechanism (breath pulse, glass tones, type burst)
  are exact.
- **Word strips use clip-and-redraw instead of an offscreen type buffer.**
  Same visual result (seeded per-strip offsets, live jitter), no offscreen
  canvas, per house rules. See Construction.
