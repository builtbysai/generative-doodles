# №1385 "Recruitment Station" (adam-khalil AK2, PP608)

A New Red Order recruitment office, faced head-on like a checkpoint. A
red-tinted window with cut-white-vinyl slogans occupies the top band; nylon
banner walls ripple slowly at either side; four small monitors in a row
along the folding table loop pseudo-script manifesto frames; pamphlets lie
on the table; a blinking strip runs along the bottom edge. The viewer is
being enlisted — but nothing here is a button, a form, or a signup.

## Composition

- Window band (top 28%): banner red with a dark translucent tint, black
  frame bar and mullions. The vinyl slogan is one row of large off-white
  pseudo-script glyphs (7 on desktop, 5 on phones) with a fainter second
  row beneath for depth.
- Banner side walls (15% of width each): darker red panels whose inner
  edges ripple as a closed-form sine wave of piece time, with a seeded
  nylon-weave dot texture.
- Mid-zone: near-black with two faint vertical seams.
- Monitors: four screens on the table, each showing three rows of
  scrolling cyan pseudo-script glyphs drawn from a shared seeded stream,
  with seeded flicker dropouts (quantized 0.12 s) and a sweeping manifesto
  band every 4 s.
- Folding table: gray band with a darker top edge; off-white pamphlets
  with red headers and tiny glyph lines, slightly rotated, seeded.
- Bottom strip: banner-red band with a row of off-white pseudo-script
  marks, blinking on a square-wave envelope (1.4 Hz). Visual only.

## Interaction

Drag across the window smears the vinyl slogan like wet paint. Each drag
movement records a sample (position, displacement, time); every slogan
glyph is displaced by a closed-form sum over samples — Gaussian falloff
with distance, exponential decay over 3 s, capped — so the smear follows
the drag and settles back. The effect is confined to the window band: a
dragged-vs-undragged probe differs by 24,026 px inside the window and
exactly 0 px below it. No click actions, no reload, no form.

## Study-wide rule

Pseudo-script only, never readable real words, except `<title>`. All
glyphs are drawn shapes (chevrons, triangles, crosses, arcs, zigzags,
hooks, dot pairs, loops); the file contains no `fillText`/`strokeText`
anywhere, so no readable text can leak in. The bottom strip carries
pseudo-script marks only — the prompt's strip label is not rendered as a
word, per the study-wide rule, and the strip is visual only, never a
button.

## Adaptations

- Monitors are cropped looping pseudo-script scenes from a shared seed
  (no video, no external assets).
- Vinyl smear is a closed-form displacement field over recorded drags
  with decay (no shader, no frame-integrated state).
- Banner ripple is a closed-form wave function of piece time.
- No audio at all: the prompt specs none for this piece, so no
  AudioContext exists in it. No offscreen canvas, gradients, shadowBlur,
  Path2D, createElement, localStorage, or getUserMedia.

## House rules

- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via
  `canvas.style.width/height` in px.
- Phone detection via `window.screen` physical size (min dimension <
  700 px) with aspect `h > w*1.15` as fallback; the centered composition
  keeps its shape on phones, the page ground takes the piece's own
  near-black, and the layout was checked at 390 wide with no clipping.
- Determinism: frame one = `draw(0)` via a boot flag; the rAF clock
  starts only with the first rAF timestamp, and the loop is a plain
  function declaration behind a `typeof` guard. All randomness comes
  from mulberry32 (seed 1385000 + index·7919) and deterministic lattice
  hashes — never `Math.random` (the only match in the file is a comment
  stating it is never used). Dots are single `arc()` calls with their
  own `beginPath`, never batched ellipses.
- Thumb renders byte-identical across repeated renders.

## Verification (probe harness, stubbed rAF driving the piece's own loop,
pointer events to its own listeners, 1280×900)

- t=0 vs t=5 differ in 29,390 px whole-frame; monitor band alone differs
  in 19,391 px (scroll + ripple + flicker move).
- Strip blink: t=0 vs t=1 differ in 3,046 px in the strip band only.
- Smear: a 300 px drag across the window at t=2 changes 24,026 px in
  the window band at t=3 versus undragged, and 0 px below the window.
- Palette spot checks on frame one: window pixel (100,60) = (122,22,25)
  (red darkened by the tint overlay); table pixel (20,700) exactly
  (107,107,102); strip pixel (10,830) exactly (176,30,36).
- One harness bug found during probing (first rAF call anchors the
  clock, so a single-call drive always draws t=0); fixed in the harness
  with a dummy anchor call, not the piece.
- One fix round: the bottom-strip glyphs crowded and overlapped on the
  390-wide render, so strip glyph size dropped from 0.55 to 0.42 of
  strip height; all renders re-done after the fix.

## Files

- `index.html` — self-contained, fully silent, no external assets
  (md5 `8dc8d9e52f440c37d1d6c5b00a98d2bf`)
- `process.md` — this file
- `thumb.png` — 720×720, byte-identical across repeated renders
- `qa-desktop.png` — 1280×900
- `qa-mobile.png` — 390×844
