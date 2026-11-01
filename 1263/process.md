# №1263 — Tooth or Dare (esther-hz EH8 / PP422)

## Prompt

Two flat collage figures across a small table with a shared plate, on
Leon-gallery white (#EFEAE0). Tap a figure to feed the other: the morsel
arcs with wobble (drag steadies it), the receiver's paper mouth opens
with a cheek-retractor stretch (steel #9AA0A8). Three successful feeds
lean them closer; a drop leans them apart. Relationship = a single lean
scalar. No dating-sim UI: no hearts, no scores, no win state. Awkward
and tender, never crude.

## What was built

- Two flat collage figures face each other across a wooden table, a
  shared plate of four morsels between them. Left figure: rust shirt,
  lighter skin; right figure: sage shirt, deeper skin. Paper-cut heads
  with dark hair caps, dot eyes, brow lines.
- Tap either figure and it feeds the other: a morsel (berry, olive,
  carrot round, bread bit, cycling deterministically by feed count)
  lifts from the plate and arcs to the receiver's mouth over 1.8 s.
- Wobble: the morsel carries a sinusoidal perpendicular wobble (20 px
  starting amplitude, 3 oscillations over the flight). Holding a drag
  during the flight accumulates steadying time; amplitude decays as
  exp(-steady x 1.5). At arrival, amplitude under 7 px means a
  successful feed; above it, the morsel drops.
- Success: the receiver's mouth opens on a sine curve (1.4 s) with the
  steel retractor hooks stretching the mouth corners outward as it
  opens. Lean scalar +1.
- Drop: the morsel falls from the mouth on a gravity curve, splats on
  the table, and fades. Lean scalar -1.
- Lean: a single scalar clamped to [-2, +6]. Each step moves both
  figures 12 px toward (or away from) each other and tilts their heads
  0.03 rad toward (or away from) each other. No numbers, hearts, or
  scores are ever drawn; the distance between the figures is the whole
  record of the relationship.
- The plate depletes as morsels are fed and restocks after every fourth
  feed. Taps during a flight are ignored; a new feed starts only once
  the previous outcome animation has finished.
- Frame one: both figures at rest, lean 0, plate full with four
  morsels, mouths closed with retractor hooks at rest. No visible text
  except the page title.

## House adaptations

- Determinism: frame one is drawn at a constant phase (t = 0). All
  event-driven state (feeds, drag intervals, lean) is a closed-form
  function of the recorded event lists and piece time t; nothing is
  frame-integrated. The rAF loop is anchored as offset + elapsed since
  load, and every rAF call is typeof-guarded for the node-canvas QA
  renderer.
- Renderer limits: no gradients, filters, shadow blur, offscreen
  canvases, element creation, audio, or microphone use. All dots are
  drawn with a moveTo before each arc (node-canvas ellipse/arc quirk).
- Viewport: sized from the Visual Viewport API with resize listeners
  on visualViewport and window; canvas pinned in draw() via
  style.width/height in px; phone detection via window.screen physical
  size (min dimension under 700 px) with the aspect fallback. Centered
  scene keeps its shape on phones with the page ground set to the
  piece's own background color.

## QA

- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile, and
  720x720 thumb; all three inspected. Desktop and mobile hold the
  same read: two figures, table, shared plate.
- Fix round 1: the first render showed only one figure and two
  detached floating mouths. Cause: drawFigure applied an outer
  translate(x, 0) on top of absolute body coordinates, doubling x and
  pushing the right figure off-canvas while mouths (drawn in absolute
  coordinates) stayed behind. Fixed by removing the outer translate
  and drawing the body in absolute coordinates with only the head
  under a local transform; arms extended toward the plate and a neck
  added so the head no longer floats.
- Fix round 2: an 8 px gap between head bottom and neck top; neck
  extended upward to overlap the head.
- Mechanics probed with temporary copies (discarded): mid-flight with
  a steadying drag shows the morsel arcing with damped wobble; a
  no-drag flight resolves to a drop at the receiver's mouth; three
  past successes show the figures 36 px closer per side with heads
  tilted toward each other.
- Thumb rendered twice at 720x720 and byte-compared identical.
- Token scan clean of unseeded randomness, element creation, pixel
  buffers, gradients, blur, and audio/mic APIs (only the guarded
  requestAnimationFrame remains, as required).
- md5 (index.html): 36821718e179317fcd71eb959b33e06f
