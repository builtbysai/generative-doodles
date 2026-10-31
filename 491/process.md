# No.491 Smoke Word

EXPANSION #59 eugenio-bertozzi, prompt EB3.

## Concept

His "BUGS" smokey type (2023) as a watch-only loop. One invented word stands
centered as a single cloud-tube mass, off-white smoke #EDEDE8 on black
#0B0B0B, the only two colors. The letterforms read through black
negative-space counters trapped inside the smoke: the holes in P, O, A, B, D,
G, R are the drawing. Tiny mono caps frame the word: "SMOKE CASTING / MADE
IN ITALY" above, "SHIPPED WORLDWIDE" below. Every 40 seconds the word
dissolves and re-blobs into the next seeded word; a tap reseeds immediately.

## Construction

- Single self-contained index.html, canvas 2D, palette exactly black
  #0B0B0B and smoke #EDEDE8 (intermediate grays arise only from alpha).
- Letters are parametric skeleton templates on a 7-unit cap height (A, B, D,
  E, G, K, L, M, N, O, P, R, S, T, U, V), each a set of polylines smoothed
  with quadratic midpoints and sampled densely. The tube is the skeleton
  stroked at 1.5 units with round caps and joins, so each letter inflates
  into one rounded cloud mass; letters sit close enough (1.12 units of
  tracking) that the word reads as one continuous tube.
- Cloud edge: seeded puffs (circles of about 0.8 units) are stamped along
  every skeleton and a 1.6x halo stroke at 0.10 alpha sits under the tube,
  scalloping and softening the outline. Puff radii breathe on the wobble
  phase; per-letter offsets drift on an 8s period; the whole word breathes
  at 1 percent scale. All periods divide the 40s word block.
- Counters (house adaptation, recorded per the brief): instead of a
  destination-out composite, each counter is drawn as a black shape over
  the finished tube, an ellipse (a triangle for A) with a 1.22x copy at
  0.28 alpha underneath as a soft rim. Same visual, safe in the node QA
  renderer, and the counter wobbles with its letter so registration holds.
- Word sequence: a bank of 16 invented words (5 to 6 letters, no real
  brands: PLOVA, KORVA, TUMLO, SENKA, VELDO, MORVA, TOLPA, BRUMO, SOLKA,
  VUNDA, PERLO, GAVRO, KUVARA, TOLVAN, MEROKA, SOLVEN) shuffled once with
  mulberry32 seed 491, which puts PLOVA first. Each word's puff jitter uses
  its own seeded stream.
- Morph: in the last 4.5s of each 40s block the old word fades, grows 13
  percent and wobbles harder while the next word fades in doing the
  reverse, a cross-fade re-blob. Tap (pointerdown or touchstart) jumps the
  clock to 2s before the next block boundary, so the next word blobs in at
  once; it is a reseed, never a page reload.
- Layout: word centered at about 70 percent of width on desktop, 86
  percent on phones; mono lines centered at 6.5 and 93.5 percent of
  height, letterspaced by hand in a monospace stack.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas.style.width/height
  pinned in px in draw(); phone detection via window.screen (min
  dimension under 700px) with the h > w*1.15 aspect fallback; page ground
  is the piece black. No audio, no microphone, no external assets.
- Determinism: the first frame is drawn synchronously at the constant
  pre-roll PHASE = 14.0s (word PLOVA fully formed, wobble mid-phase).
  requestAnimationFrame is typeof-guarded and anchored as PHASE plus
  elapsed since load; no Date.now() and no Math.random() anywhere.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb rendered twice and byte-compared with cmp,
  identical, re-verified after every fix; the second render was deleted
  each time.
- Desktop and thumb: PLOVA reads at first glance. P, O and A counters are
  solid black holes inside the smoke; L and V read by silhouette; the
  tube is chunky with a scalloped cloud edge; mono lines top and bottom,
  nothing clipped.
- Mobile: composition keeps its shape, the word spans the width and
  still reads letter by letter, mono lines fit inside the margins.
- Sequence audit: extra renders at later phases confirmed the seeded
  order matches the shuffle exactly (block 1 KORVA, 2 TUMLO, 5 SENKA,
  6 VELDO) and that BRUMO and TOLVAN also read at first glance.
- Iterations: P, R and B counters were enlarged twice and D's bowl widened
  after early renders showed small or gray counters; the counter soft rim
  was reduced from 1.3x at 0.35 alpha to 1.22x at 0.28 so the holes read
  black, not gray; tracking tightened from 1.3 to 1.12 units so the word
  hangs together as one mass.
- Deviations: the counter adaptation above (black shapes over the tube
  instead of destination-out), and the tap landing 2s inside the morph
  window rather than cutting instantly, so a reseed still arrives as
  smoke. No other deviations from the prompt.
