# №1494 "The Shelf Becomes a Stream" (nadja-ringart NR7, PP741)

Build-only; nothing pushed, no repo touched.

## Prompt

A wall of archive shelves holding rows of tape spines, flat rectangles in muted
colors, some with a thin gold stripe. When a spine is pulled, it does not open a
player: its fragment — a small looping scene of seated figures — travels out of
the shelf as a bright dot and hops across a small network of screens arranged
to the right, lighting each screen briefly as it passes, then settles into the
last screen and keeps playing there. Palette: shelves wood #8a6a48; spines
#4a5a7a, #6b4a3a, #2f4636, #7a6a8a, #d8d2c4; gold stripe #d9a441; network
screens charcoal #2a2a30 with lit screens cream #e8e0d0; travelling dot scarlet
#c1272d. No other color. Shelves left two-thirds in a grid; network of five
small screens right one-third, connected by thin lines; pulled spine offset
outward from its slot. Watch-first with tap-to-send. Tap never removes a tape,
never empties a shelf, never duplicates a fragment. Avoid: text labels on
spines, a search box, a catalog UI, a video player chrome, photorealistic
shelves.

## What was built

- Cream wall; four wood boards left two-thirds, each carrying six spines
  (24 total) in the five muted colors, ~40% with a thin gold stripe, all from
  mulberry32 seed 1494000 (never Math.random).
- Five charcoal screens right one-third in a zigzag, connected by thin
  charcoal lines in order 1→2→3→4→5.
- Tap a spine: it pulls upward out of its slot over 0.4 s, then a scarlet dot
  travels from the pulled spine along the network (5 legs × 0.6 s = 3.0 s),
  lighting each screen briefly as it passes, and settles into the last screen,
  which turns cream and plays the spine's fragment: a small looping scene of
  three seated figures (clothes seeded per spine, speaker cycling every 2 s on
  a 6 s loop, mouth widening for the speaker).
- Tap the settled screen (or the pulled spine itself): the dot travels the
  reverse path and the spine pushes back into its slot over 0.4 s, restoring
  the wall exactly. Tap another spine while one fragment is settled: the old
  fragment returns first, then the new one sends. Taps on empty areas or on
  screens while idle are ignored. Never click-to-reload.
- All state is closed-form over piece time and the recorded tap-event list:
  every tap sequence replays deterministically (pull / travel / settled /
  return / push segments, with implicit returns inserted before a queued send
  while a fragment is out). The idle wall is perfectly static, so any idle
  time equals frame one; the settled scene runs on time-since-settle modulo
  6 s, so it loops exactly.

## Adaptations

- Spines as a grid array with a pulled state; fragment travel as a path
  animation along network edges with per-screen light-up; settled scene as a
  small looping sprite in the final screen; return as the reverse path — all
  as specced.
- This prompt revisits the prior studies' shelf mechanism by its own design,
  kept distinct: here a pulled spine sends a fragment hopping across a
  network of screens instead of opening a monitor player (IW5/CR6) or pulling
  a tape into a monitor (IW5 №1484).
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing. All fills
  opaque (no fading alphas at all, so the node-canvas scientific-notation
  alpha quirk cannot bite). Dots as own-beginPath arcs with moveTo first.
- House rules: canvas from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height;
  phone detection via window.screen physical size with aspect fallback;
  field-like composition full-bleed on phones (checked at 390 wide, no
  clipping); frame one = draw(0) via boot flag, clock starts only with the
  rAF loop (plain function declaration behind a typeof guard); every
  animation value derives from loop-local or event-relative time, never
  absolute piece time (the №1482 loop-closure lesson applied from the start).
- Script wrapped in an IIFE so its locals never collide with the QA
  renderer's top-level names (the №1467 lesson).

## Verification

- Rendered with node ~/workspace/tools/render-piece.js at 1280×900,
  390×844, 720×720; inspected desktop, mobile, and a settled-state render
  (tmp/settled.png). Frame one: cream wall, four wood boards, 24 muted spines
  with gold stripes, five dark screens linked in a zigzag. Settled render:
  pulled spine offset upward out of its slot, last screen lit cream with
  three seated figures on a bench line, other screens dark. Thumb
  byte-identical across repeated renders.
- Forced-time probe harness tmp/probe1494.js (vm-isolated instance, real
  node-canvas, piece driven via window.__piece): 18/18 pass — t=0 redraw 0 px;
  fresh instance t=0 identical; no scarlet at frame one; gold stripes and
  wood present; all 5 screens charcoal at frame one; idle t=100 vs t=0 = 0 px;
  pull animates; dot travelling (scarlet present); settled screen5 lit cream
  with mini-scene figures; settled scene loops exactly (t=11.4 vs t=5.4 =
  0 px); return dot travelling; wall restores exactly (t=15.4 vs frame one =
  0 px); swap returns spine A to its slot exactly and settles spine B;
  empty-area and idle screen taps ignored.
- Token scan: no Math.random, no AudioContext, no getUserMedia, no fillText,
  no Path2D, no gradients.

## Fix rounds

None needed.
