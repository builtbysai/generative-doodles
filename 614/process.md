# No.614 "One Impression"

EXPANSION #74 adolfo-serra, prompt block 6 "Nogalina Monotype".

## Concept

Serra's monotype and natural-pigment practice as a one-shot instrument. Each
gesture pulls a single unrepeatable impression onto the paper: a walnut-brown
or turmeric-gold wash with wax-resist blooms (pale patches where wax repelled
the pigment) and grain baked in. There is no eraser and no undo; the paper
keeps every impression it is given. The piece also carries his channel split:
the same composition reads two ways, the color channel (@adolfoserra) and the
pure-ink channel (@serradolfo), flipped by double-tapping a small circle in
the corner. The mark is a circle, never a word, and there is no text anywhere
in the piece.

Interactions:

- TAP the paper: pull one impression at that spot. One-shot, seeded, never
  editable, never undoable.
- DRAG: smear the wettest impression slightly, only while it is wet (the
  first ~3 seconds of its life). The smear distorts its contour once, then
  the impression is dry and locked.
- DOUBLE-TAP the corner circle: flip color / B&W channels. The flip is
  hit-tested against the circle only; a double-tap anywhere else does
  nothing (and a plain tap elsewhere still pulls an impression).
- Watch-only: wet impressions dry and settle, their alpha deepening slightly
  over their first three seconds.

## Construction

Data-mark architecture (the core decision): an impression is stored as pure
data, never as pixels. Each mark holds its center (fraction of W/H), a
harmonic radius function (5 harmonics, seeded), a pigment index, 120 baked
grain dabs (polar position, size, stretch, rotation, role, alpha), 3 to 5
wax-resist patches (polar position, size, own wobble harmonics, alpha), a
birth time on the anchored clock, and a one-shot smear vector. Every frame
renders the whole sheet from this list. Because marks are data, the channel
flip is a palette LUT swap over identical marks: the color palette maps the
roles (body / dark / light / resist) to walnut #4A3423, turmeric #D9A441 and
resist cream #EFE3C8 on paper #F5F0E6; the ink palette maps the same roles to
#1A1A1A and paper, preserving grain and resist as value. Ink body passes get
a 0.72 alpha compensation so the B&W reading holds the same weight as the
pigment reading.

A wash is drawn as four layered translucent passes of its noise-displaced
contour (halo at 1.13 scale, body at 1.0, pooling at 0.76 and 0.48), which
keeps edges washy instead of digitally clean. Grain dabs and resist blooms
are then drawn clipped to the true contour. The smear bulges the contour
toward the drag direction inside the same radius function, so a smeared
impression's grain and resist travel with it.

Determinism: frame one is drawn synchronously at load with the three seeded
starting impressions (seeds 614011 / 614023 / 614037, composed in the lower
two-thirds, born at t = -10 so they arrive dry) and the mode mark filled.
The clock is anchored: elapsed starts at 0 and advances only from rAF
timestamps relative to the first frame. `Date.now()` is never used; wetness
and drying run on the anchored elapsed. Tap-born impressions take seeds
SEED_BASE + 500 + tapCount * 131, so a session's paper is reproducible from
its tap count. rAF is typeof-guarded (the QA renderer has none). Canvas size
comes from the Visual Viewport API with resize listeners on visualViewport
and window; the canvas is pinned in px inside draw(); phone detection uses
window.screen physical size with the aspect ratio as fallback only. No
offscreen canvas, no ctx.filter, no audio. Marks cap at 40 for performance;
the oldest impressions always stay.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp:
  identical. Second render deleted.
- Desktop read-back: three washy impressions low on the sheet (large walnut
  left, turmeric lower center, small walnut right), visible grain speckle
  inside every wash, pale resist blooms reading clearly, filled walnut
  circle mark at bottom-right, no text anywhere.
- Mobile read-back: full-bleed paper, all three impressions inside the
  frame, nothing clipped, mark present at the corner.
- B&W check: a state-forced copy (mode initialized to 1) rendered at
  1280x900 in /tmp, read back, then deleted. Same composition, same shapes
  in the same places, rendered in pure ink values; resist blooms survive as
  pale value patches; the corner mark renders as an outline circle, as
  specced.
- Interaction paths (tap / drag-smear / double-tap-on-mark flip) are
  code-reviewed; the headless renderer registers the four canvas pointer
  listeners but fires no pointer events, so gestures are verified by code
  path, not by render.

## Deviations

- None from the prompt block. Two implementation notes: the prompt's
  technical sketch names no cap, but marks are capped at 40 so a long
  tapping session cannot degrade the frame rate; and the B&W body's 0.72
  alpha factor is a rendering compensation inside the ink palette only,
  needed because pure ink at pigment alphas would read heavier than the
  color channel of the same marks.
