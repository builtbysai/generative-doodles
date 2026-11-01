# №1181 — Everything Wrong the Right Way

Jason Soliday study block SD6, after I ♥ PRESETS (2004–08+, Jon Satrom,
Rob Ray, Jason Soliday): "breaking down, complicating, and glorifying
instrument settings, tool presets, and art-making interfaces normally
accepted as fixed and stable." The piece is the trio console as pure
choreography: the preset is fixed until it goes wrong, on schedule,
everyone at once.

## Distinction from №1169

№1169 "I Love Resets" (Satrom JS2) is the visitor-driven sibling: its
knobs and sliders drag, its jam is procedural and audible, and its
wrong-right event interrupts a performance the visitor is steering.
This piece is mechanically the opposite on every axis:

- **No dragging.** The controls are read-only chrome; they move only
  when the choreography moves them.
- **No audio.** The piece ships silent; there is nothing to start.
- **Fixed choreography, not a jam.** A strict 13-bar loop (below) with
  a WRONG light; wrongness is a score, not an event that happens to you.
- **Per-panel viewports.** Each panel performs in its own viewport —
  stepped-block bassline (VOX), dithered GIF-shape cycler (VID),
  stuttering dot grid (DRUM) — instead of №1169's waveform strip and
  shared step grid.
- **Preset readouts.** Each panel names its preset (SPREADSHEET-04,
  GIFLOOP-11, CASIO-BENT-02); the joke is that these fixed, named
  settings are what get glorified and abused.

## The choreography

Bar clock: 4/4 at 150 BPM, one bar = 1.6 s, cycle = 13 bars = 20.8 s.
A single wrongness value w drives all twelve controls and all three
viewports — the discipline is ensemble: same clock, same wrongness.

- **Bars 1–8:** w = 0. Panels run at their presets.
- **Bar 9:** the WRONG light flashes (stepped 4 Hz blink) and w slams
  0 → 0.25 → 0.5 → 0.75 → 1.0, one hard step per beat. Every control
  value is preset + w × (extreme − preset), so knobs, sliders and
  readouts move in lockstep with the viewports.
- **Bars 10–12:** w = 1. Readouts sit at seeded absurd extremes —
  RATE 400%, PITCH −80%, FRAMES −100%, DITHER 385%, GATE 400%,
  DECAY −45%, SPLIT 400%, JITTER −70%, DENSITY 400%, SCATTER 330%,
  STUTTER −90%, GHOST 400%. The WRONG light burns solid.
- **Bar 13, beat 1:** RESET slams w back to 0 and a white flash
  (alpha 0.85, 0.08 s) covers the frame. The loop repeats.

The one allowed interaction: tapping the RESET button fires the same
slam early — flash included — and re-anchors the cycle at bar 1.
Taps anywhere else do nothing. The sliders are never draggable.

## The viewports at w = 1

- **VOX** — 16 stepped blocks from a seeded bassline table. As w rises
  the heights invert (level → 1 − level), seeded steps drop out
  (dropSeed < w × 0.45) and seeded silent steps fire at full height
  (addSeed < w × 0.35). GATE scales block width.
- **VID** — a geometric shape (star / ring / zigzag / diamond) cycling
  in 4 GIF-ish stepped frames, filled with a 4×4 Bayer dither whose
  density follows DITHER. At w > 0 the frame order scrambles
  ([2,0,3,1]), the shape splits into three channel copies
  (#FF2B6E / #FFE14D / #00FFC2) offset by w × 8 px, and JITTER's
  extreme spins the figure.
- **DRUM** — an 8×8 dot grid. DENSITY 400% fills every seeded cell;
  SCATTER throws each dot along a seeded vector × w; stutter blink
  steps cells off in thirds; GHOST spawns faint echo dots. Scatter is
  clipped to the viewport — the dots go feral inside their box.

## Determinism and house rules

- First frame is drawn synchronously at fixed phase T0 inside bar 11
  (wrongness full): WRONG light solid, controls at extremes, all three
  viewports feral. The rAF loop is typeof-guarded and anchored as
  T0 + elapsed since load; all randomness is seeded hash functions of
  fixed indices — no Math.random anywhere.
- Canvas size comes from the Visual Viewport API with resize listeners
  on both visualViewport and window; canvas.style.width/height are
  pinned in px in fit(). Phone detection via window.screen physical
  size (min dimension < 700 px) with the h > w × 1.15 aspect fallback;
  on phones the panels stack vertically and the header title shortens
  so it clears the WRONG lamp.
- Silent by design. No gradients, no ctx.filter, no shadowBlur, no
  createElement, no ImageData, no offscreen canvas, no microphone.

## QA

- Rendered with the house node-canvas renderer at 1280×800 (desktop),
  390×844 (mobile), 720×720 (thumb). Thumb rendered twice and
  byte-compared with cmp: identical.
- Frame one read: three panels with named presets, WRONG lamp lit,
  "BAR 11 / 13", all twelve readouts at extremes, VOX blocks inverted
  with dropped/added steps, VID diamond channel-split and dithered,
  DRUM dots scattered with ghosts inside the viewport.
- Two fix rounds during QA: DRUM scatter initially spilled outside
  the viewport (now clipped); the first mobile layout collided the
  header title with the WRONG lamp and cut off each panel's second
  slider (now stacked with a height-budgeted control zone).
