# №1360 "Ledger of Air" (raven-chacon RC1, PP583)

A descending-chronology pictographic score after Chacon's *American Ledger
No. 1* (2018): repeat signs, whole notes, and quarter rests morphed into
land-forms (ship silhouettes, barbed lines, survey grids) drawn in graphite
on paper, top to bottom, ending in an extended black band — erasure as the
final note.

## Composition

- Paper `#EDE8DC`, full-bleed. Six glyph families, all drawn as seeded flat
  strokes on the main canvas: repeat sign (two bars + two dots), whole-note
  oval, quarter-rest zigzag, abstract ship silhouette (hull + mast + small
  sail, no flag), barbed line, survey grid. Graphite `#2B2B2B` with
  ship-red `#A63D2F` (~18%) and copper `#B87333` (~12%) accents.
- Glyphs densify toward the bottom: row density runs 0.30 at the top of the
  scroll tile to 1.00 at the bottom. Faint seeded paper speckle throughout.
- The black band `#0A0A0A` occupies the final 12% at frame one and creeps
  upward as erasure advances (see below). No readable text anywhere except
  `<title>`; no flags, no maps, no cadence-like resolution.

## Motion

- Seamless downward drift: the score scrolls down at 4 px/s. Rows are a pure
  function of absolute row index (mod a 20-row period), so the picture is
  exactly periodic in scroll offset with period 20 × rowH — it never wraps
  visibly. Verified: frame at t = 2880 s (9 scroll periods and 320 breathing
  cycles) is pixel-identical to frame one above the band.
- Glyphs breathe faintly: alpha 0.75–1.0 on a 9 s sine with a seeded phase
  per glyph.
- Erasure band: height = 12% + min(8%, t/600 s × 8%). It creeps from 12%
  toward 20% over the first 10 minutes of viewing, then holds — erasure
  advances, never retreats, never jumps. Frame one is exactly 12%.

## Interaction

- Drag draws a new chronology line: a thin graphite line follows the
  pointer, glyphs compose along it every ~46 px (seeded by line index and
  sample index, rotated to the path direction), and release ends the line
  in a solid black band segment (78 × 26 px, oriented along the final
  segment). Lines persist for the session, capped at the last 8.
- Never click-to-reload; tap without dragging draws nothing.

## Audio adaptation (house rule overrides the prompt's optional drone)

- The prompt lists a faint WebAudio drone as optional. It sounds ONLY while
  dragging: created lazily inside the pointerdown handler behind
  `typeof AudioContext` guards (two detuned low sines, 55 / 55.6 Hz, through
  a lowpass filter). The filter darkens as the band grows (cutoff 900 →
  400 Hz across the band's creep range). On release the gain ramps to zero
  over ~0.2 s. Never autoplay, never on the clock, no microphone.

## Technical constraints honored

- Canvas 2D only, everything on the main canvas: no offscreen canvas, no
  gradients, no shadowBlur, no Path2D, no `createElement`, no getUserMedia.
- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height.
- Phone detection via `window.screen` physical size (min dimension
  < 700 px) with aspect h > w × 1.15 as fallback; field-like composition is
  full-bleed on phones (verified at 390 × 844).
- Determinism: frame one = synchronous `draw(0)` via a boot flag; the clock
  starts only with the rAF loop (plain function declaration behind a
  `typeof` guard). All randomness from seeded mulberry32 streams
  (seed 1360000 + index × 7919; speckle 1360999; user-line glyphs
  1360500000 + line × 7919 + sample × 131), never `Math.random`.

## QA (node-canvas renders of the actual script)

- Rendered at 1280 × 900, 390 × 844, 720 × 720; all three inspected.
  Desktop and mobile both show the densifying score and the 12% band.
- Thumb byte-identical across repeated renders and matching the shipped
  thumb.
- Forced-time probes (harness driving the piece's own rAF loop and pointer
  listeners): frame-one black pixels exactly 1280 × 108 (the 12% band;
  graphite strokes are #2B2B2B, above the near-black threshold); at t = 300 s
  the band is exactly 16% (1280 × 144) and a probe pixel at 0.86H flips from
  paper to black; t = 8 s vs frame one differs in 28,168 px (32 px drift);
  t = 2880 s vs frame one differs in 0 px above the band (exact periodicity).
- Drag probe: a diagonal drag (200,200) → (600,500) changes 13,511 px;
  the endpoint box gains 1,789 black pixels (0 at baseline) from the
  terminal band segment; the rendered drag frame shows the line, the
  path-composed glyphs, and the terminal segment.
- Token scan: no `Math.random`, `createElement`, `getUserMedia`, `Path2D`,
  gradients, or `shadowBlur`. The only audio tokens are the two
  `typeof`-guarded AudioContext lines in the gesture-gated drone.
