# No.1039 "The Other Audience"

Study #127 toshitaka-mochizuki, PP200 "Seen by Cameras Only" (marker rigging).

## Concept

One scene, two audiences. The frame is split vertically. On the left, the
human view: five plain white objects (two cubes, two mobility shells, one
open frame) drift across a dark stage, dim and calm, exactly as a person in
the room would see them. On the right, the camera view: the same five
objects at the same instants, but rendered as the motion-capture system
reads them, dark rigid-body wireframes carrying burning retroreflective
marker constellations, white hot dots laced with IR red. The markers are
not decoration: in the human view they are not drawn at all, and in the
camera view they are the whole picture. Every nine seconds one
constellation flares as the system locks onto it, while the left half
stays indifferent. No labels, no legend; the brightness says which side
belongs to the machine.

## Construction

- Single self-contained canvas 2D page, no external assets. Canvas size
  comes from the Visual Viewport API with resize listeners on both
  visualViewport and window; the canvas element's CSS size is pinned in
  px inside draw() every frame. Phone detection uses window.screen
  physical size (min dimension under 700px) with the h > w*1.15 aspect
  check as fallback only. The split stays vertical and centered at every
  size; the scene scale follows the narrower half, so nothing clips on a
  phone.
- Sync guarantee: each frame computes ONE array of object transforms
  from piece time t, then draws that same array twice, once per view,
  each view clipped to its half. The two audiences cannot drift apart
  because there is only one state; the camera side's occlusion wobble is
  a draw-time offset applied after the shared transform, on that side
  only.
- Motion is closed-form: each object's center follows a sum of sines
  whose frequencies are whole cycles of the 50 s loop, and its rotation
  is a single sine on the same loop, so the composition repeats exactly
  every 50 s. Objects hold spread home positions with small wander
  amplitudes so the five bodies stay readable and apart. Marker
  constellations (4 to 7 points) sit at fixed local coordinates on each
  body and ride its rigid transform.
- Flares are scheduled, not random at runtime: a flare starts every 9 s
  (first at 1.8 s) and lasts 0.7 s under a squared-sine envelope; which
  constellation burns is taken from a seeded order table. Frame one is
  drawn at fixed phase t = 11 s, which lands 0.2 s into the flare that
  started at 10.8 s, so the lower cube's constellation is mid-flare in
  the first frame while every other constellation sits at resting heat.
- Interaction: dragging across the right (camera) half occludes any
  marker within a small radius of the finger; those markers vanish, their
  red links break, and any object that loses more than half its markers
  gets a small deterministic jitter on its camera-side wireframe until
  the finger passes and it re-locks. Dragging on the left half does
  nothing, by design. A tap forces a flare on the nearest constellation
  (recorded as an event with its start time). A double-tap reseeds the
  inventory and marker sets. Nothing reloads.
- Sound is visitor-gated: the AudioContext is created lazily inside the
  first pointer gesture and every use is typeof-guarded and wrapped.
  A near-silent room tone (two detuned low sines at very low gain) runs
  once audio exists; a two-note confirmation chime sounds when a flare
  begins and a short tick when the lock settles at its end. The page is
  fully visual and silent otherwise. No microphone is ever touched.
- Palette is strict: stage #08080A, human objects #E4E6EA, markers and
  flare #FFFFFF, IR #FF2E2E, wireframes #2A2D36, split line #1A1B1E.
  Marker glow is built from layered flat-alpha discs; there are no
  gradients, no shadowBlur, no ctx.filter, no offscreen canvas, and no
  visible text anywhere except the document title.

## QA log

- Rendered with the house renderer at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png) and 720x720 (thumb.png). The page renders
  cleanly in silence: no audio is attempted without a gesture.
- Determinism: frame one is the synchronous draw at fixed t = 11 s;
  nothing in the first frame derives from Date.now() or any wall clock
  (the rAF loop, where present, only advances time from that fixed
  phase). thumb.png was rendered twice and byte-compared identical;
  the duplicate was deleted.
- Read-back, desktop and thumb: dark stage split down the middle. Left
  half shows five plain dim white shapes, a cube upper left, a domed
  shell upper right, the open frame center, a second cube lower left
  and the second shell lower right, with no dots or marks on any of
  them. Right half shows the same five shapes at the same positions as
  dark wireframes, each carrying a red-linked constellation of white
  hot markers; the lower-left cube's markers are visibly swollen and
  brighter, the frame-one flare. No labels anywhere.
- Read-back, mobile: the split stays centered, all five objects remain
  whole in both halves at reduced scale, constellations and the flare
  cluster still read, nothing is clipped.
- Fix round: the first build let all five objects wander over wide
  overlapping paths, and frame one caught them piled into one bright
  knot in both views. Homes were spread across the stage and wander
  amplitudes cut to a few percent of the frame; all sizes re-rendered
  and determinism re-verified after the change.
- Deviations: none from the brief. Drag on the human half is inert,
  which the brief allowed as the stricter reading (the human cannot
  disturb the machine's view).
