# №1518 — The False Medium's Real Vision (clement-cogitore CC7, PP765)

Gallery date: 2006 · 03 · 09 (recorded here only, never drawn in the piece).

## Spec

Dark room near-black #12121a. Small glowing fragments (phone-screen
rectangles, photo corners, name-like abstract bars, never readable) in
screen-blue #6a8ab8 and screen-white #d8dce2 drift in from the edges and
assemble into a neat, plausible gold #c9a227 pattern ("a reading") at
centre; candle accent #e8a83a. The pattern holds, then one fragment
(chosen per cycle by seeded mulberry32, seed 1518000, never Math.random)
glows vivid green #5a8a3a and shows a true image (a simple door, a small
tree, or a window), and the whole neat pattern falls apart and re-forms
differently around it. Dragging a fragment moves it (pattern repairs
itself around the move); dragging the true fragment holds its glow
longer. Drag never freezes the pattern, never adds fragments, never
writes a word.

## Build

- 12 fragments in three kinds: phone-screen rectangles (with a top glare
  strip), photo-corner L-shapes, and name-like abstract bars (three
  horizontal bars of varying length, never letterforms).
- 60 s cycle inside a 240 s super-loop (4 cycles): drift in 0–12 s,
  settle 12–20 s, hold 20–30 s, true glow with the other fragments
  scattering 30–42 s, true fragment falling apart 42–50 s, re-form into
  a permuted layout with the true fragment at centre slot 50–58 s,
  release back toward the edge entries 58–60 s so each cycle boundary
  is continuous.
- Per-cycle variation (true fragment, true image, slot permutation,
  fall-apart offsets) comes from one mulberry32 stream (seed 1518000)
  precomputed for cycles 0–3, so t = 240 and t = 480 are byte-identical
  to t = 0 while the four cycles differ. All animation sines run on
  loop-local time (t mod 240) with periods dividing 240 s.
- Fragment geometry (sizes, kinds, base colours, edge entries) is
  cycle-independent from a second mulberry32 stream (seed 1518001).
- Drag is closed-form over recorded events: while dragging, the fragment
  follows the pointer plus its grab offset; on release its offset from
  the schedule decays as exp(-(t - t1) / 2), so the pattern repairs
  itself. Dragging the true fragment during its glow window extends the
  glow end by the held duration (capped at +10 s); the glyph fades over
  2 s after the glow ends.
- Candle accent bottom-right: layered flat-alpha glow discs and a
  flickering flame (8 s period, divides 240 s).
- Fully silent; no AudioContext, no gradients (flat-alpha layers only),
  no visible text except the title element. Canvas 2D only.
- Viewport from the Visual Viewport API with canvas pinned in draw();
  phone detection via window.screen (min dimension < 700 px) with the
  aspect fallback, used for a 0.92 size factor on phones.
- First frame is draw(0): fragments at the edges, drifting in. The rAF
  loop is a plain function declaration; frame one never reads the wall
  clock.

## QA (probe-1518.js, vm-style harness driving the piece's own rAF loop)

All probes pass:

- Frame one identical across fresh instances.
- Loop closure: t = 240 and t = 480 byte-identical to t = 0.
- Gold pattern: 10,459 gold px at hold t = 25; 80 gold px at drift t = 5
  (no pattern yet); 0 green px at t = 5.
- True glow: at t = 35 exactly one fragment's worth of green
  (2,118 px in a 61 x 44 bbox); 177 ink px inside the shrunken bbox
  (the true-image glyph); glow frame differs from hold frame by
  24,168 px.
- Fall apart / re-form: fallen frame differs from hold by 27,665 px;
  re-formed frame differs from hold by 28,753 px.
- Drag: dragged frame differs from control by 1,126 px at t = 27;
  654 gold px in a 60 x 60 box at the drag target; after release the
  frame differs from control by only 798 px at t = 35 (schedule
  repaired). Same drag sequence byte-identical across instances.
- Glow extension: dragging the true fragment during 35–40 s leaves
  2,024 green px at t = 45, versus 0 in the control.
- Forbidden-API grep clean: no Math.random, Date.now, performance.now,
  AudioContext, getUserMedia, Path2D, createElement, localStorage,
  gradients, fillText, or strokeText.
- Renders inspected personally: desktop 1280 x 720 and mobile 390 wide
  show fragments at the edges with no clipping and the candle accent
  bottom-right; qa-glow.png (t = 35) shows the gold pattern mid-fall
  with one green fragment carrying a window glyph.
- Thumb byte-compare: two independent 720 x 720 renders byte-identical
  to the shipped thumb.

## Fix rounds

1. Probe-harness fix only (not a piece change): the first probe run
   drove instances to t = 25 without an anchoring rAF call, so the
   piece clock anchored at 25 s and every frame read as t = 0. The
   harness now anchors at 0 before driving time, per the established
   probe pattern; the piece itself was untouched.
2. Probe-assertion fixes only: the drag-target check now counts gold
   pixels in a box around the target instead of sampling one centre
   pixel (corner-kind fragments leave their centre empty), and the
   glyph check counts ink in the shrunken green bbox interior.

## Deviations from the prompt

None beyond documented house-rule adaptations: canvas 2D throughout;
closed-form motion (no frame-integrated simulation); flat-alpha layers
instead of gradients; fully silent; the 240 s super-loop form for
per-cycle variation with exact loop closure; a release phase
(58–60 s) returning fragments toward the shared edge entries so cycle
boundaries are continuous.

## Files

- index.html — md5 162a685c658007cafb9b5a27fd4db79a
- thumb.png (720 x 720) — md5 4b98e86d8d011edf4cf9281eef7f1b77
- qa-desktop.png, qa-mobile.png, qa-glow.png (t = 35), probe-1518.js
- Nothing pushed to GitHub; ready for fly's gate.
