# No.621 — Watch It Being Made

EXPANSION #75 mariona-cabassa / theinvisiblecircle, prompt block 5 "Pintura en Video".

## Concept

Her video-painting format as the whole piece: a painting that visibly paints
itself on blank paper, in real layers, with the brush in frame. Nothing appears
instantly. Each painting rests, fades back to blank under a paper-coloured
overlay, the paper breathes, and a new painting begins with a new creature and
a newly discovered palette family. The making is never hidden, and the viewer
never erases anything: paintings complete and fade on their own rhythm.

The endless series cycles palette families (indigo monochrome #2B3A67 on
paper; garden brights #5C8A4D / #E87B9C / #F2C14E on paper; dusk #E2725B /
#E8B93B on #14100C) and creatures (fox, bird, serpent, fish).

## Construction

**Strokes as data.** Every painting k is generated once from
mulberry32(BASE_SEED + k * 7919) into a pure-data stroke list, independent of
canvas size (all geometry in unit space, 1 unit = min(W, H), centre origin):

- Layer 0, washes: 3-4 broad translucent blobs (seeded radial-noise polygons,
  Catmull-Rom smoothed). Painting 1 is pinned to exactly 3 washes so frame one
  matches its spec.
- Layer 1, shapes: one creature built from tapered ribbon strokes (parametric
  templates: tail/back/head/ears/belly/legs for the fox, equivalent sets for
  bird, serpent, fish), plus 4-6 leaf or blossom accents scattered around it.
- Layer 2, details: eye dot and pattern dots in the ground colour, a ground
  line, a flourish line.

Each stroke carries a seeded duration and a human-like pause. The raw timeline
is normalised to exactly 40 s of painting inside a fixed 52 s cycle:
2 s blank-paper breath, 40 s painting, 6 s rest, 4 s fade.

**Playback.** The draw function is a pure function of a global clock t:
painting index = floor(t / 52), phase from t mod 52. A stroke's revealed
fraction is (paintTime - start) / duration; ribbons are drawn as resampled
polylines whose per-segment width tapers (thin ends, full middle), washes grow
and deepen, dots pop in sequence. The visible brush (pigment-loaded bristle,
ferrule, handle hint, flat translucent hand-shadow blob trailing up-left; no
blur, no filter) rides the active stroke, and lifts during pauses.

**Frame one (determinism).** Painting 1's timeline yields frame1Time = the
paint-time at which its washes and its first four shape strokes are complete.
The synchronous first frame is draw(BREATHE + frame1Time): 3 indigo washes
down, fox tail/back/head/ears laid, brush parked at the end of the ears
stroke. The rAF loop (typeof-guarded) anchors startTs on its first callback
and draws T1 + elapsed + bonus, so playback continues seamlessly from the
frozen first frame. No Date.now, no Math.random anywhere.

**Interaction.** Drag takes the brush: the visitor's strokes render with the
same tapered-ribbon code in the current family's pigments (cycling), stay as
part of the painting, and fade with it at cycle end. Tap (short, near-still
press) during the paint phase adds a time bonus that jumps the artist to the
next layer boundary (shapes, then details, then rest). Pointer handlers never
fire in the QA renderer, so they cannot affect frame one.

**House rules.** Canvas sized from the Visual Viewport API with resize
listeners on visualViewport and window; canvas.style.width/height pinned in
px inside draw(); phone detection via window.screen (min dimension < 700)
with aspect h > w*1.15 as fallback only; full-bleed on phones (unit space
keeps the composition centred, page ground follows the current family);
canvas 2D only, no offscreen canvas, no ctx.filter, no audio, no external
assets, no visible text besides the title.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb rendered twice, cmp byte-identical (re-verified after
  every fix round). Second render deleted.
- Fix round 1: washes too large and merged into one gray continent; wash
  radius cut and centres spread, wash alpha raised so indigo reads. Creature
  head templates changed from closed loops (read as blobs) to open wedges.
  Ribbon segment beading fixed by resampling paths before per-segment taper.
  Brush shrunk (it read as a large icon) and its shadow tightened.
- Fix round 2: painting 1 pinned to exactly 3 washes per the frame-one spec.
- Read-back (final): desktop and thumb show the three indigo washes complete,
  the fox's first four strokes (tail curl, back, head wedge, ears) laid in
  indigo, the brush parked at the ear tip with its shadow trailing up-left.
  Mobile shows the same state centred in the tall frame, nothing clipped.
- Grep confirms zero Date.now / Math.random / createElement / AudioContext.

## Deviations

- None from the prompt's prohibitions. Two interpretation notes: the "hint of
  the hand" is rendered as a flat translucent shadow blob (the renderer has no
  blur/filter, and the brief itself specifies a flat shadow shape). User drag
  strokes are stored per painting and cleared when the next painting's cycle
  begins, which is the data-level equivalent of fading with their painting;
  the 4 s ground-coloured overlay covers the fade itself.
