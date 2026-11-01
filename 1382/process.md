# №1382 "Silver Mine" (adam-piron AP7, PP605)

## What it is

A film strip melting down into a mine shaft. Silver-gelatin tones above,
cavern dark below; ore dust rises and becomes film grain as it crosses the
surface line. Palette: silver gelatin #b9bcc0, mine dark #14100c, shaft amber
#8a5a24, cyanotype shadow #2b4a5e.

## Composition

- A vertical film strip, centered, enters from the top edge and feeds
  downward. Sprocket holes run along both edges. Each frame carries a
  procedural mini-scene: ridge lines, a pseudo-script glyph row, a dot grid
  with circle outlines, a vertical-bar ticker fragment, a spiral, or flame
  tongues.
- A horizontal amber surface line at 0.52H. Frames dissolve AT the line:
  the frame body is clipped to the line and only melt drips fall below it.
- Below the line, the mine shaft: side timbers, cross beams whose spacing
  grows and tone darkens with depth, flat-alpha amber glow hugging the line,
  and cyanotype shadow patches.
- One particle system crosses the boundary: amber ore-dust dots below the
  line become silver film-grain dots above it, and extra grain rises through
  the strip itself.

## Motion

- The strip feeds continuously at a base 46 px/s. Frames cycle seamlessly
  (6 frames per cycle, wrapped modulo the cycle length).
- Melt: as a frame's bottom enters a melt zone above the line, its alpha
  fades, its height squashes slightly, and drip rects extend below the line
  from a closed-form downward displacement field.
- Drag vertically to change feed speed: each drag movement records a
  velocity impulse that decays exponentially (tau 1.2 s), so the feed surges
  and always settles back to base speed. No buttons, never click-to-reload.

## Adaptations from the prompt

- The melt is a closed-form displacement field (fade + squash + drip rects),
  not a shader; the QA renderer paints one frame.
- Dust/grain is a single stored-history particle system: every particle's
  position is a pure function of piece time, so one frame shows the field
  and the dust-to-grain conversion reads at the line.
- No readable text on frames: all frame content is drawn shapes, and glyphs
  are a cipher set (chevrons, ticks, open arcs, zigzags, open spiral curls).
  No fillText/strokeText anywhere; only `<title>` carries text.
- No audio at all (the prompt specs none for this piece).
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, localStorage, or getUserMedia. Amber glow and vignette are
  stacked flat-alpha rects, never gradients.

## House rules

- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window, never window.innerWidth/Height alone; canvas
  pinned in draw() via canvas.style.width/height in px.
- Phone detection via window.screen physical size (min dimension < 700px)
  with aspect h > w*1.15 as fallback; the strip widens to 74% on phones and
  the page ground takes the piece's own mine-dark color.
- Determinism: frame one is draw(0) via a boot flag, the clock starts only
  with the rAF loop; all randomness comes from mulberry32 (seed 1382000 +
  index*7919), never Math.random. The rAF loop is a plain function
  declaration behind a typeof guard.
- Dots are filled rects or single-subpath arcs with a moveTo before each
  arc, per the node-canvas batched-arc quirk.

## Verification

- Rendered at 1280x900, 390x844, and 720x720 and inspected all three; thumb
  byte-identical across repeated renders (including a final re-verify after
  the last edit).
- Probe harness (stubbed rAF driving the piece's own loop, pointer events
  to its own listeners): surface-line pixel exactly amber (138,90,36), sky
  exactly silver-dark (143,146,150), shaft exactly mine dark (20,16,12);
  343 amber dust pixels below the line; t=0 vs t=2 differ in 185,849 px
  (strip feeds continuously); dragged vs undragged at t=6 differ in
  181,963 px (drag changes feed speed).
- Fix rounds (2): the first pass drew a faint full frame below the surface
  line (a ghost slab) — frames are now clipped to the line with only drips
  below; one glyph shape read as a closed "9"-like ring — replaced with an
  open spiral curl. All renders re-done after each fix.
