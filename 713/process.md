# No.713 "Hair Mop"

EXPANSION #87 janine-antoni, prompt block 2 "Hair Mop" (verified verbatim from TASKS.md).
Antoni's Loving Care (1992/93): the artist mopped a gallery floor with her own hair
soaked in hair dye, the performance pushing the audience back as the dyed area grew.
Here there is no figure and no hair: an invisible handle trails a bundle of dark strands,
and the floor keeps what the strands lay down. No figure, no hand, no brand text, no
visible text anywhere except the document title.

## Concept

A dark gallery floor fills the frame. The strands rest in a loose bundle at a seeded home
position, swaying almost imperceptibly. Drag, and the bundle follows your hand with spring
lag, spreading like a mop head; the strand tips lay glossy near-black dye wherever they
travel. The dye is persistent: strokes overlap and deepen, fresh strokes catch a wet
sheen for their first second, and everything fades only slowly. Tap, and the floor is
rinsed: the dye fades at triple speed for a few seconds and the strands go home. And as
the dyed fraction of the floor grows past roughly 40 percent, the whole floor content
begins to drift a few pixels away from the dyed centroid, the room quietly backing out,
exactly as Antoni's audience did.

## Construction

- Strands: 52 on desktop, 40 on phones, generated from a mulberry32 stream (BASE_SEED
  71387). Each strand stores a fan direction (spread across the downward arc, so the
  resting bundle reads as a mop head splayed on the floor), a length of 9-18.5 percent of
  the smaller canvas dimension, a spring lag of 0.04-0.42 s, a sway phase and amplitude,
  and a gloss flag. A strand is one quadratic curve: from the handle point, through the
  handle position at half its lag plus 45 percent of its fan offset, to the handle
  position at its full lag plus its whole fan offset. Gloss strands (a seeded 30 percent)
  get a second pass in the sheen tone offset by 0.8 px. At rest the handle never moves,
  so the tips reduce to home plus fan, swaying on a slow closed-form sine.
- The invisible handle follows the pointer through a chain of underdamped spring
  segments in closed form (period 0.6 s, zeta 0.30, the position-only response used in
  No.709). Each recorded pointer sample starts a new segment from wherever the handle is
  at that instant, so the handle position at any time, including lagged times in the
  past, is a pure function of the recorded samples. The chain is pruned to the recent
  history plus one anchor segment.
- Paint layer as data (renderer adaptation, see Deviations): the prompt's offscreen
  paint layer is impossible in this pipeline, because the QA renderer has no
  document.createElement and no offscreen canvas. The paint layer is therefore data.
  While the pointer is down, each frame compares every strand tip with its last recorded
  position; a tip that moved past a small threshold records a dye segment (normalized
  endpoints plus its time). At most 4,000 live segments are kept and redrawn each frame
  in the dye tone at alpha 0.14 times their fade, so overlaps deepen naturally. On
  overflow the oldest 1,200 segments are baked into a coarse 48x48 grid: their dye moves
  into per-cell values drawn as flat rects, alpha by decayed strength (capped at 0.55).
- Fade and rinse: dye strength is fade(a, t) = exp of minus the elapsed time over a
  120 s base time constant, with the clock running at 3x during each 5 s rinse window.
  It is a pure function of the recorded rinse events, applied per segment by birth time
  and per grid cell by its own anchor time (cells decay their stored value to the
  current event time before accumulating more, capped at 6). A tap (press under 0.3 s,
  excursion under 8 px) records a rinse and starts a handle segment home: the strands
  reset. A press that becomes a drag never rinses. Nothing ever reloads.
- Coverage and the backing-out rule: a second 48x48 grid accumulates coverage for every
  segment ever recorded (sampled at four points along its length), with the same
  anchor-and-fade bookkeeping, so coverage survives baking. Each frame, cells whose
  decayed value exceeds 0.35 count as dyed; if the dyed fraction passes 40 percent, the
  content offset is the direction from the dyed centroid toward the canvas center,
  scaled by how far past the threshold the fraction is, up to 2 percent of the smaller
  dimension (about 14 px at 720). The offset translates the mottling, the dye, and the
  strands together; the base floor fill stays put, which is invisible because the floor
  tone is uniform.
- Floor: full-bleed #23211D at every size, with 240 seeded residue spots (residue tone,
  18 percent of them in the sheen tone) at alpha 0.03-0.10, dried patches that were
  always in the floor. Frame one is this floor plus the resting bundle and nothing else.
- Palette is strict: floor #23211D, dye #0A0A0A, wet sheen #1E1C18, strands #1A120B,
  residue #171512. No other colors, no text.
- House rules: canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas style pinned in px inside draw(); phone detection
  via window.screen physical size (min dimension < 700 px) with the h > w*1.15 aspect
  fallback; rAF guarded by a typeof check; all positions stored normalized so resizes
  never re-roll anything; no audio, no microphone.

## QA log

- Renderer: ~/workspace/tools/render-piece.js (node-canvas; no rAF, no AudioContext,
  no document.createElement, no offscreen canvas, no ctx.filter). Renders:
  qa-desktop.png 1280x900, qa-mobile.png 390x844, thumb.png 720x720.
- Determinism (hard gate): frame one is the synchronous draw(0) with no pointer input:
  bare floor, no dye, zero coverage, zero drift, bundle at home. No Date.now, no
  Math.random anywhere (grep-audited, along with createElement, gradients, shadowBlur,
  and external URLs: all absent). Elapsed time comes from a performance.now anchor set
  at boot and frame one never reads it. thumb.png rendered twice and byte-compared with
  cmp: identical. The duplicate was deleted.
- Desktop (1280x900): dark floor with faint dried-residue mottling, and at lower center
  the bundle: 52 hair-fine strands fanning down and out from a single root point, a
  loose dark spray, a few strands catching the sheen pass. No dye anywhere.
- Thumb (720x720): the same read at square size; the spray is clearly visible against
  the floor, the mottling stays subliminal.
- Mobile (390x844): phone rule engaged via window.screen (390 < 700); floor full-bleed,
  40 strands, bundle at the same relative home, fully inside the tall frame, nothing
  clipped.
- Interaction states (drag painting, sheen on fresh strokes, tap rinse, baking past
  4,000 segments, the backing-out drift past 40 percent coverage) cannot be exercised by
  the headless renderer, which fires no pointer events. They are built entirely from
  recorded pointer samples and rinse events evaluated as functions of time, and frame
  one is unaffected by them: the paint path only runs while the pointer is down, and
  the first drag frame re-anchors the tips so no streak can jump across the floor.

## Deviations

- Offscreen paint layer replaced by data (required by the renderer, as briefed): the
  prompt asks for strokes accumulated on an offscreen canvas composited over the floor.
  The QA renderer offers no offscreen canvas at all, so the layer is an array of
  recorded segments redrawn per frame, with the oldest segments baked into a coarse
  grid of flat cells once the array passes 4,000. The visible behavior is the prompt's:
  persistent strokes at low alpha that deepen where they overlap. The one compromise is
  resolution after baking: very old dye reads at grid resolution (one cell is about
  2 percent of the frame) instead of stroke resolution. Live strokes, which are what a
  visitor is actively making, always keep full stroke resolution.
- Rinse strength: the prompt's "fades at 3x speed for a few seconds" is implemented
  literally against a slow 120 s base fade, so one rinse is a gentle acceleration, not
  a wipe; repeated taps compound. The strands resetting home is the immediate visible
  half of the rinse. Chosen over inventing a stronger rinse the prompt does not ask for.
- Handle rest position: after a drag ends (without a tap), the handle stays where it
  was released and the strands settle around it, rather than returning home. Only the
  rinse sends them home, which is the prompt's own reset. The floor's memory is the
  piece; where the mop rests between drags is not.
