# №1344 "Day Desk / Night Table" (eric-gottesman EG1, PP567)

## Frame one
Exactly t = 0 via a boot flag, phase-shifted 8 seconds into the day phase:
the left half is the cool day desk (#3E4A5C) with the first row of six
seal-stamp tiles landed plus the first tile of row two, each tile a
#7A8BA0 rounded square with a #2A323E thud shadow and an invented glyph
mark (slash, plus, double-bar, dot-and-arc) that reads as a mark, never a
letter. The right half is the night table idling in darkness: a dim yellow
pad (#E8C96A at low alpha) centered in its half, no landscape strokes yet,
and a faint flat-alpha amber glow top-right of the night half, never a
drawn lamp. A thin pencil-gray (#8A8A8A) line splits the field exactly at
50% width. The two sides share one room's tone range and are split by
light only.

## Loop (44 seconds, watch-only, no pointer input)
- Day phase, 0-20 s: stamps land one per 1.2 s in row-major order across a
  6x8 grid in the upper two-thirds of the day half; a completed row fades
  out starting 6 s after completion over 2 s, to make room.
- Wash, 20-22 s: a flat-alpha amber band sweeps across the split while a
  faint full-field wash peaks mid-changeover. No gradients anywhere.
- Night phase, 22-42 s: the stamps sleep (alpha x 0.35), the bulb glow
  strengthens, and the pad draws ~400 graphite scratch strokes over 16 s
  along three seeded mountain ridgelines (1D value noise), resolving into
  a landscape that holds 4 s.
- Wash, 42-44 s: the night state fades out and the loop restarts with a
  fresh day phase.

Note on the prompt's timing: its phase durations (20 + 2 + 20 + 2) sum to
44 s, so the loop is 44 s; the prompt's "48 s" total is its own loose
count of two 24 s day/night cycles.

## Determinism
Frame one draws synchronously at exactly t = 0 via a boot flag; the clock
starts only with the rAF loop (plain function declaration behind a typeof
guard). All phase state is a closed-form function of piece time: stamp
alpha, row fades, stroke count, night factor, and wash position are all
computed from the cycle time, never from accumulated state. All layout,
glyphs, and strokes come from seeded mulberry32 streams (seeds 1344000 /
1344001), never Math.random. Resize redraws at the current piece time,
never restarting.

## Adaptations
- Bulb glow as two layered flat-alpha ellipses, never a radial gradient
  and never a drawn lamp; changeover wash as a flat-alpha sweeping band.
- Study-wide rule honored: no readable text anywhere; stamps carry
  invented marks only, no Latin or Amharic letters.
- No literal desk objects (no pens, no drawers).
- Canvas 2D only; no offscreen canvas, no gradients, no shadowBlur, no
  filters, no AudioContext, no getUserMedia. Dots and marks are drawn one
  shape per path (moveTo before every batched arc) per the node-canvas
  quirk. Visual Viewport sizing with resize listeners on visualViewport
  and window; canvas pinned in draw() via style width/height in px; phone
  detection via window.screen physical size with the aspect fallback;
  full-bleed field composition, checked at 390 wide.

## QA
Rendered at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three
inspected. Thumb rendered three times plus a final re-verification after
this file was written: all cmp byte-identical. A forced-time probe on a
discarded temp copy (phase forced to 30 s, mid-night-phase) confirmed the
landscape resolves: 2,079 graphite pixels inside the pad region at 200 of
400 strokes. No fix rounds required: first renders at all three sizes
read correctly.
