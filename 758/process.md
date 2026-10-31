# No.758 "Always Changing" — EXPANSION #92 robert-irwin, prompt block 7

## Concept

Irwin's Getty Central Garden as a generative system: a stepped chadar stream
descending diagonally from the upper-left to a bowl pool at the lower-right,
water particles flowing over stone steps and brightening at each drop, splash
motes bursting at the step edges, rebar bowers of bougainvillea framing the
top corners, and the azalea maze — three interlocking rings — floating in the
pool. The maze's bloom state is tied to the real season, per the garden's
mantra: always changing, never twice the same. The piece is a landscape,
readable as water over stone; no photorealism, no figures, no text but the
title.

## Construction

- **Layout.** Everything is built once in unit space from a single mulberry32
  stream (seed 75812031): the stream path from (0.05, 0.07) to (0.74, 0.72),
  9 chadar steps across a channel of half-width 0.085, planted green banks
  flanking the channel, two bower fans (5 rust rebar arcs + 130 seeded
  bougainvillea blobs each) in the top corners, the pool ellipse at
  (0.76, 0.76), and the maze: 3 rings on a triangular arrangement with 240
  seeded bloom dots, each dot carrying its own bloom threshold.
- **Steps.** Each step is drawn as a tread quad (water tone over stone,
  lightened by a sky-wash layer, alternating per step), a riser band at the
  downhill edge (green-grey layering deepens it, a foam wash lightens it),
  and a foam edge line where the water drops. All shading is layered alpha
  of palette tones only; no new hues are mixed.
- **Particle model.** 240 water particles, each owning a lane offset, a
  period (7–16 s plus incommensurate per-index offsets), a phase, a size and
  a wobble phase. Progress is a pure closed-form function of t,
  `frac(t / period + phase)`, so every frame is reproducible and the
  combined flow effectively never repeats over any practical viewing
  window. A particle brightens with foam as its within-step fraction crosses
  the step drop. 63 splash motes are anchored at the 8 inner step edges,
  each a periodic burst (closed-form in t): position drifts outward and
  alpha decays across its cycle. 5 ripple rings expand on the pool.
- **Season model.** Bloom is a pure function of the local date at day
  resolution: monthly anchors (Jan 0.05 … Apr 1.00, May 0.95, summer ~0.5,
  Oct 0.25, Nov 0.12, Dec 0.05) blended toward the next month by day of
  month. Only `getMonth()` and `getDate()` are read, once, at load. A maze
  dot shows when the bloom factor passes its seeded threshold, so spring is
  a full flare, autumn a sparse scatter, winter bare green rings with a few
  rust bud specks. Frame one is therefore constant all day.
- **Dam mechanic.** Dragging (pointer down/move) records a dam position as
  stream progress of the pointer. While held, the warp eases in over ~0.6 s
  and compresses upstream progress toward the dam line (water pooling behind
  it). On release the compression relaxes and a short surge envelope
  (exp decay, ~3 s) advances the reach near the dam. All state comes from
  the recorded event log and t; frame one has no events and is unaffected.
- **House rules.** Canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas style pinned in px on
  every draw; phone detection via window.screen (min dimension < 700) with
  aspect fallback; page ground is the stone tone. rAF is typeof-guarded;
  frame one is the synchronous draw at t = 0. Strict palette: stone
  #8A8D90, water #7FB8C9, foam #EEF6F8, bougainvillea #C22E6B / #D84A5A,
  azalea #E86A9A / #D8407A, rebar rust #7A4A33, sky wash #AFC8E8, maze green
  #3E6B4A. Winter-bare uses maze green + stone + rust only.

## Deviations

- **Audio omitted.** The TASKS prompt offers an optional soft water-audio
  layer, off by default. Gallery pieces are silent, so the layer is not
  implemented at all rather than shipped disabled; recorded here per the
  build brief.
- **Season QA hook.** An inert `?seed=monthN` query forces the season month
  (and `?seed=tNN` the loop time) for QA renders only; with no query the
  piece reads the real local date. House convention, invisible in normal
  viewing.
- **"Never twice the same"** is achieved with long, mutually incommensurate
  closed-form periods instead of wall-clock randomness, so the determinism
  gate holds; no practical viewing window sees a repeat.

## QA log

- Renders via `node ~/workspace/tools/render-piece.js`: qa-desktop.png
  (1280x900), qa-mobile.png (390x844), thumb.png (720x720).
- Determinism: thumb.png rendered twice back-to-back, `cmp` byte-compared
  identical; duplicate deleted.
- Desktop read-back (today, 2026-10-31): diagonal stepped stream with pale
  flowing particles and foam step edges, splash motes at the drops,
  magenta bougainvillea bowers in both top corners, pool at lower-right
  with three interlocking green maze rings and sparse pink dots plus rust
  bud specks. Today's season computes to late-autumn bloom ~0.12 (Oct 31
  blends fully to the November anchor), so the maze reads sparse, as
  specced for autumn.
- Mobile read-back: the descent refits corner to corner in the tall frame,
  maze rings stay circular in the pool, nothing clipped.
- Forced spring check (`?seed=month4`, April): the maze rings flare in
  full pink bloom along all three circles; rest of the scene unchanged.
  Throwaway render deleted after read-back.
