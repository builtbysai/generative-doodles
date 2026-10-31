# No.703 Fragmentos Floor

EXPANSION #85 doris-salcedo, prompt block 8 "Fragmentos Floor"
(TASKS.md, verified verbatim).

## Concept

Salcedo's Fragmentos (Bogota, 2017): the floor of the memorial is made
of tiles hammered from weapons surrendered under the peace accord, the
metal beaten flat by women who survived the conflict. Visitors walk on
it. This piece renders the making, not the weapon: a dark ground is
laid, tile by tile, with heavy flat metal tiles, each one dented and
slightly irregular, as if set down by invisible hands. Tapping a tile
strikes it: the dent deepens, a highlight flashes for a frame, a thin
ring spreads and fades. It is participatory making, not a game: no
scores, no combos, no sound, no weapon imagery, no text. The tiles are
abstract; the transformation is the subject.

## Construction

- Single self-contained index.html, canvas 2D, no external assets.
  Palette is strict: tiles #8C8C88 (oxidized metal), dents #3A3A38,
  tile seams #1A1A1A, fresh-strike highlight #C9C9C4, ground #101010.
  Nothing else.
- Scene: a 10x8 grid centred in the frame with a dark margin. Each
  tile is 90% of its cell, drawn as a slightly irregular quad (four
  seeded corner jitters), offset over a seam-tone shadow rect so the
  gaps read as dark seams. Dent fields are flat shading only: 2-5
  seeded radial dents per tile, each drawn as three layered ellipses
  in the dent tone at rising alpha, with a slight vertical squash.
- Sweep schedule: placement follows a fixed serpentine order (row 0
  left to right, row 1 right to left, and so on). Slot k is scheduled
  at k * 1.7 s - 0.4 s plus a seeded jitter of +/-0.5 s from the cycle
  stream (slot 0 sits at -0.4 s exactly, so the first tile is already
  settled at frame one and the floor opens mostly bare). Placement
  times never reorder, since the jitter range is narrower than the
  spacing. A placed tile settles in over 0.35 s (alpha ramp, 3 px drop,
  0.97 to 1.0 scale). The last scheduled tile lands around 134 s; the
  cycle then rests with the full floor until 148 s, and the floor
  lifts (all tile alpha fades to zero) from 148 s to 154 s, when the
  next cycle begins laying again from a new cycle seed.
- Strike model: taps are recorded events {cycle, cell, absolute time}
  on the anchored clock. A tap on a placed tile adds one strike: the
  tile's dent depth scale grows by 0.30 per strike (capped at 2.0) and
  its dent radius scale by 0.10 (capped at 1.4), a highlight flash in
  #C9C9C4 decays over 0.15 s from the strike, and a thin ring expands
  from the tile centre from 0.28 to 1.13 cell widths over 1 s, fading
  as it goes. A tap on an empty cell during the laying phase places
  that cell's tile immediately (recorded as an early placement) with a
  strike on top. Taps during the lift phase are ignored. Per-cell dent
  fields and corner jitters come from per-cell mulberry32 streams
  (BASE_SEED + cycle*104729 + cell*131 + 7), so recorded strikes
  deepen a tile without ever disturbing its base field.
- Determinism: frame one is the synchronous draw(0) at load: ground
  and the single first tile, settled. The animation clock is anchored
  on first use (performance.now minus a start stamp) and never read
  from Date. The sweep schedule, dent fields, settle envelopes, fade
  phases, flashes and rings are all pure functions of elapsed time
  and recorded events. requestAnimationFrame is typeof-guarded;
  without it the piece simply holds frame one.
- Sizing: canvas size from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas.style width/height
  pinned in px inside draw() every frame. Phone detection via
  window.screen (min dimension < 700 px), tall aspect as fallback
  only; on phones the 10x8 grid refits the narrow frame and stays
  centred, nothing clipped. No audio anywhere: the prompt needs none.

## QA log

- Rendered with ~/workspace/tools/render-piece.js (node-canvas):
  qa-desktop.png 1280x900, qa-mobile.png 390x844, thumb.png 720x720.
- Determinism: thumb.png rendered twice and cmp-compared
  byte-identical; the second render was deleted.
- Read-backs: desktop and thumb (frame one) show the near-black
  ground, empty but for the first dented tile at the serpentine
  origin (top left of the grid area), its dents visible as soft dark
  layered ellipses, a seam shadow at its lower right. Mobile shows
  the same single tile refit to the phone frame, vertically centred,
  nothing clipped.
- Phase check via the inert ?seed=tNN hook (scratch render, read
  back, deleted): t=80 shows the sweep well advanced, 48 of 80 tiles
  laid: four full serpentine rows plus eight tiles into the fifth,
  the last one caught mid-settle at reduced alpha. Dent fields vary
  tile to tile, corner irregularities and dark seams read clearly,
  no text or imagery anywhere.
- Code audit: no Date calls, no Math.random, no createElement, no
  AudioContext, no external URLs, no microphone, no visible text
  besides the title.

## Deviations

- None from the prompt's substance. Two small readings worth noting:
  the scheduled spacing is 1.7 s rather than exactly 2 s, so the full
  floor completes in about 134 s and frame-state checks land on a
  mostly laid floor sooner (the prompt's "one tile every ~2 seconds"
  is honoured within its tilde, and the cycle stays watchable); and
  the strike ring is drawn in the fresh-strike highlight tone, the
  only light tone in the palette, since the prompt leaves the ring
  colour open.
