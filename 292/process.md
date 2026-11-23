# No.665 "Humo Adentro"

EXPANSION #81 jose-perez-de-arce, prompt block 1 "Humo Adentro".

## Concept

El viaje humo adentro, the inner smoke journey: "un rostro que mira
desde ese mundo hacia hoy pareciera cruzar esa linea." A face emerges
inside a drifting smoke field on paper, drawn in pencil hatch, looking
out at the viewer. The smoke never fully clears and the face never
fully arrives. One ember point glows low-left, the only color besides
paper, graphite, and smoke gray.

Interactions: drag tears the smoke (the face strains and reforms as
the field settles), the pupils track the pointer at all times, and a
double-tap reseeds a newly constructed face in reseeded smoke. Single
taps do nothing; nothing reloads.

## Construction

Single self-contained index.html, canvas 2D, no external assets.

Smoke (simulated, never a texture): 400 particles advected at a fixed
1/30 s step on an anchored clock through the curl of a two-octave
seeded value-noise potential (integer lattice hash, finite-difference
curl, speed clamped). Particles wrap at the field margin and are drawn
as short streaks along their local flow direction, half behind the
face and half in front, clipped to the composition field. Each step,
particles deposit into a coarse density grid (0.025-unit cells, decay
0.95 per step); a second grid records drag strain (decay 0.985 per
step, about 4 s to reform). Drag samples are recorded with anchored
times and applied exactly once, at their sim step, as a radial push
plus swirl impulse to nearby particles and a strain deposit.

Face parameterization: the face is rebuilt from a mulberry32 seed at
every reseed. Parameters rolled inside dignified human ranges: half
width 0.185-0.220 and half height 0.265-0.295 composition units, brow
lift and brow line, eye spacing, eye width and opening, eye line
height, nose length and nostril width, lip height, lip width and
fullness, jaw taper, and a slight asymmetry. Features are polylines in
face-local coordinates: a gapped head outline narrowed toward the chin
(stronger on the shadow side, suggestions only at the jaw), diagonal
form-hatch ticks whose shadow boundary sweeps across the face, cheek
shading, three-pass brow arcs, almond eye outlines, nose bridge curves
with tip arc and nostril ticks, and a three-curve lip construction
with sub-lip hatch. Iris and pupil are drawn live each frame, offset
toward the pointer and clamped, with a paper highlight; with no
pointer the gaze rests straight ahead.

Density modulation: every hatch stroke's alpha is multiplied by a
visibility sampled from the density grid at the stroke's own midpoint
(vis = clamp(1.15 - 0.20 * density), further pressed by the ambient
veil factor and by local strain, floored at 0.10 and capped at 0.92,
so the face can neither vanish nor arrive). A slow density tide on
the 60 s ambient cycle deposits extra smoke over the face region: at
ambient t=0 the tide peaks (frame one is a veiled moment by
construction) and at t=30 it has moved on. Frame one is the
synchronous draw at ambient phase 0 after a fixed 240-step pre-roll
that advances only the smoke clock; frame timing never comes from a
wall-clock difference, and the boot draw takes an explicit target of 0
(the first QA pass caught an earlier draft whose frame one absorbed
a variable step or two from the live clock; fixed and re-verified).

House rules honored: Visual Viewport sizing with resize listeners on
visualViewport and window, canvas pinned in px inside draw(), phone
detection via window.screen min dimension under 700 with aspect
fallback, rAF typeof-guarded, strict four-color palette, no audio, no
microphone, no visible text besides the title.

## QA log

Renderer: node ~/workspace/tools/render-piece.js (node-canvas shim).

- qa-desktop.png (1280x900, frame one): paper field, curling gray
  smoke streaks, the hatched face present but veiled at center (one
  eye ghosted by a dense patch, form hatch light), ember point with
  halo low-left, pupils centered. Nothing clipped.
- qa-mobile.png (390x844): same state refit to the tall frame; face
  centered and whole, ember visible, nothing clipped.
- thumb.png (720x720): rendered twice and byte-compared with cmp:
  identical. Second render deleted.
- Forced clearer state (?seed=t30, throwaway render, read back, then
  deleted): at the ambient cycle's low tide the same face stands
  markedly sharper, both eyes dark, nose and lips crisp, smoke
  thinned over the face and curled into a swirl at lower left. The
  face reads unmistakably as a calm face at the clear moment and as a
  half-dissolved one at frame one, as intended.
- Fix round 1: boot draw given an explicit time target so frame one
  is independent of pre-roll wall time (see Construction); thumb
  byte-compare failed before this fix and passes after.
- Fix round 2: outline ring given seeded gaps (widest at the jaw) and
  lower alpha so the head reads as a drawn suggestion rather than a
  closed egg; smoke streak alpha raised 0.075 to 0.095 so the field
  reads as gray breath rather than paper texture.
- Fix round 3: smoke passes clipped to the composition field;
  particles idling in the wrap margin had stacked into dark smudges
  on the paper margins at the top and bottom edges. Gone after the
  clip; margins clean in all three renders.
- Grep check: no Date.now call (one comment states the rule), no
  Math.random, no createElement, no AudioContext, no shadowBlur, no
  gradients, no external URLs, no em dashes.

## Deviations

- The brief calls for the pupils to track the pointer "at all times";
  pointermove is listened to on both the canvas and the window so the
  gaze follows even between strokes of a drag. No other deviation.
