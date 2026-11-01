# №1429 "The Band Dissolved into Wine" (wolfgang-muller WM6, PP652)

A long table receding down the frame, covered with 500 small bottles of pale
white wine, and at the head of the table the instruments of a band — guitar,
drums, a microphone, a costume — dissolving, slowly, into the bottles.

## Frame one (t = 0, boot-flagged draw(0))

Dark field #26241f. The table trapezoid runs from a narrow far edge at the
top to a wide near edge at the bottom, covered in 25 rows × 20 columns of
small glass bottles (500 exactly), the far rows mixed toward the dark so the
far end fades into the uncountable. At the near end, large: the guitar (body
plus a neck reaching toward the bottles), the drum (pale head, unclouded),
the microphone on its stand, and the costume with its feather plume. One
small cream label on a front bottle reads "500" — the prompt's own specced
count, printed once, small. No other visible text besides `<title>`. No
performer, no toast, no advertisement.

## Motion

- Bottle-by-bottle filling: bottle i starts filling at t = i × 0.8 s and
  fills over 20 s to a 0.95 cap, near rows first, so the fill front visibly
  advances down the table. Front-band wine-gold pixels grow 374 → 33,170 →
  47,007 from t = 0 → 60 → 120 with no input.
- Dissolution driven by the fill schedule: dissolve = clamp(started / 200,
  0, 1). The guitar neck thins toward bottle-neck width as it advances
  (neck-tip black pixels 784 → 471 from t = 0 → 120); the drumhead clouds
  with wine-gold (drum-zone gold 0 → 20,052); the microphone and costume
  fade in step. The band never reassembles: dissolve is monotonic in the
  fill count.
- Feather drift: on a 12 s cycle a feather drifts from the costume down into
  the current bottle and stays there as a small mark (one landing per cycle,
  in the bottle that started that cycle). Confirmed in flight mid-cycle.
- Ambient shimmer: a flat-alpha glint on bottles, closed-form sine, so the
  room stays alive while the dissolution state persists.
- Loop note (WM4 precedent): the dissolution state persists across the
  would-be loop boundary rather than resetting — the room never returns to
  pristine, the band never reassembles. The seamless-loop requirement is
  carried by the periodic ambient motion (shimmer, feather cycle), exactly
  as №1427's damage persists while its ambient motion loops.

## Interaction

Drag a bottle to pour a little of it out: the pour amount is closed-form
over the recorded drag list, and the poured wine carries a fragment of the
band with it — a feather, a note-shape, or a sequin — which flows out and
settles on the table. A poured bottle is detached from the fill schedule:
its level freezes at (fill at first pour − poured total) and never rises
again, so no bottle ever refills itself. Verified: label-bottle gold
2,036 → 1,650 after a pour, still 1,641 at t = 120 (the 9 px difference is
shimmer noise, far below the pre-pour level).

## Adaptations

- 500 bottle instances with fill-level parameters; instruments as dissolving
  shapes with a dissolve parameter driven by the bottle-fill schedule.
- The count "500" is the prompt's own specced label text — the single
  fillText call in the piece, and the only visible text besides `<title>`.
- Fully silent: no AudioContext, no getUserMedia. No offscreen canvas, no
  gradients, no shadowBlur, no Path2D, no createElement.
- node-canvas quirks: every fading alpha rounded to 4 decimals before
  stringifying; dots as filled rects or own-beginPath arcs/ellipses.
- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw(); phone detection via
  window.screen physical size with aspect fallback; field-like composition
  goes full-bleed on phones (verified at 390 wide, no clipping).
- Determinism: frame one = draw(0) via boot flag, clock starts only with
  the rAF loop (plain function declaration behind a typeof guard); all
  randomness from mulberry32 (seed 1429000), never Math.random (the single
  grep hit is a comment stating so).
- Token scan clean: no gradient, shadowBlur, Path2D, AudioContext,
  getUserMedia, or createElement calls.

## Verification

- Rendered with node ~/workspace/tools/render-piece.js at 1280×900,
  390×844, and 720×720; all three inspected.
- Thumb byte-identical across repeated renders, including a final re-verify.
- Forced-time probe harness (vm-isolated instance, stubbed rAF driving the
  piece's own loop, pointer events to its own listeners): two fresh
  instances byte-identical at t = 0; fill growth, neck thinning, drum
  clouding, feather flight, pour, and no-refill all measured as above.
- No fix rounds needed. (One probe-harness fix, not a piece fix: the first
  drive call anchors the rAF clock, so probes must drive t = 0 before
  driving a later time; and the feather-corridor probe zone was widened
  5 px after the feather's arc peaked just above it.)
