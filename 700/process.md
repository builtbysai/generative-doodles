# No.700 Unland

EXPANSION #85 doris-salcedo, prompt block 5 "Unland" (TASKS.md, verified verbatim).

## Concept

Salcedo's Unland (1995-98): two half-tables, mismatched, their cut edges
facing each other across a dark gap, sewn together by hundreds of
hair-thin strands. The tables are sick; the hair is the suture. This
piece renders that as a slow, watch-only accumulation: the suture is
already dense when the piece opens, a few more strands grow across
during each minute-long cycle, occasionally an old strand snaps, and at
the end of the cycle the whole web fades softly and starts again from a
fresh base set. A drag across the gap disturbs the strands near the
pointer; a tap reseeds with new cut profiles and a new base set. No
faces, no bodies, no text: the tables stand in for them.

## Construction

- Single self-contained index.html, canvas 2D, no external assets.
  Palette is strict: wood dark #4A3826, wood edge #6B4F35, hair
  #D8D2C4 (alpha-managed), background #0D0C0B.
- Tables: each half is drawn as flat paths, a top board band (wood edge)
  over a body (wood dark), with the inner edge following a jagged
  14-segment profile from the epoch's mulberry32 stream. The halves are
  deliberately mismatched: tabletop height, board thickness, face
  height, leg positions and lengths, and the two cut profiles all come
  from independent draws. Nine to twelve faint horizontal grain lines
  per half; the cut edge is stroked in wood edge so it catches the
  light. Seven strands dangle from the undersides and sway on sine
  phases.
- Accumulation schedule: strands for a cycle are generated from
  mulberry32(BASE_SEED + epoch*100003 + cycle*7919 + 17). The base set
  (120 strands) has birth time -3 s, so it is fully grown at frame one.
  34 further strands are born at seeded times between 2 s and 50 s of
  the 60 s cycle and grow across over 3 s; growth is drawn as the
  de Casteljau sub-curve of the strand's quadratic Bezier up to the
  growth parameter, starting from a seeded edge. Five strands per cycle
  carry a seeded snap time between 12 s and 52 s; at the snap the
  strand vanishes and its two neighbours in y-order get a 1 s recoil
  (decaying sine offset on the control point, precomputed neighbour
  lists). Cycle envelope: all strand alpha fades out from 55 s to
  59.5 s, and in cycles after the first (and after a reseed) the new
  base set fades in over the first 2 s, so the reset is soft.
- Interaction: pointer drags are recorded with anchored-clock
  positions; strands whose midpoints fall near the recorded pointer get
  a high-frequency, low-amplitude control-point jitter scaled by a
  Gaussian proximity falloff, at full strength while dragging and
  decaying with a 0.8 s time constant after release. A tap (under
  0.3 s, under 6 px of travel) reseeds: epoch increments, cut profiles
  and tables rebuild from the new epoch stream, the clock re-anchors.
  Dragging never reloads; tapping never reloads either, it reseeds the
  suture as specced.
- Determinism: frame one is the synchronous draw(0) at load, the base
  set evaluated at cycle time 0. The animation clock is anchored on
  first use (performance.now minus a start stamp) and never read from
  Date. Births, growth, snaps, recoils, the reset envelope, dangle
  sway and drag tremble (from recorded pointer state) are all pure
  functions of elapsed time and recorded events. requestAnimationFrame
  is typeof-guarded; without it the piece simply holds frame one.
- Sizing: canvas size from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas.style width/height
  pinned in px inside draw() every frame. Phone detection via
  window.screen (min dimension < 700 px), tall aspect as fallback
  only; on phones the gap narrows (0.040 of width vs 0.058) and the
  halves keep their left/right relation.

## QA log

- Rendered with ~/workspace/tools/render-piece.js (node-canvas):
  qa-desktop.png 1280x900, qa-mobile.png 390x844, thumb.png 720x720.
- Determinism: thumb.png rendered twice and cmp-compared
  byte-identical; the second render was deleted.
- Read-backs: desktop and thumb show two dark table halves at slightly
  different heights, jagged cut edges facing across a black gap, a
  dense web of pale hair strands sewing the full height of the cut,
  faint grain lines, two legs per half, and a few strands dangling
  under the tables. Mobile keeps the left/right arrangement with a
  narrower gap; nothing is clipped.
- Phase checks via the inert ?seed=tNN hook (scratch renders, read
  back, deleted): t=30 shows a denser web (births accumulated) and
  dangles swayed to new phases; t=58 shows the strand field faded most
  of the way into the soft reset; t=75 (second cycle) renders without
  error.
- Code audit: no Date calls, no Math.random, no createElement, no
  AudioContext, no external URLs, no microphone, no visible text
  besides the title.

## Deviations

- None from the prompt's substance. Two small readings worth noting:
  the snap recoil is applied to the two neighbours in y-order
  (precomputed at generation) rather than by live distance search, so
  it stays a pure function of cycle time; and the cycle-end reset fades
  the strands out over the last 4.5 s with the next base set fading in
  over 2 s, instead of an instant count reset, which is the soft reset
  the prompt asks for.
