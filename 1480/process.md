# №1480 "The Voice That Travels Unchanged" (ioana-wieder IW1, PP727)

## Prompt
Two panels side by side, an interior room on the left and an exterior wall on
the right. A voice-line, a thin gold polyline that rises and falls like a
spoken sentence, travels from the left panel to the right panel. The line's
shape never changes during the crossing; only the panels around it change
color and scale. Palette: left room cream #e8e0d0; right wall brick #a8674a;
voice-line gold #d9a441; figures' clothes #4a5a7a, #6b4a3a; skin #f2ead8.
No other color. Composition: panels equal halves with a visible seam between
them; the voice-line crosses the seam at the vertical center; figures in each
panel are simple head-and-shoulder shapes, still while the line travels.
Motion: watch-first, crossing loop. The line is spoken in the left panel (it
draws itself), pauses at the seam, then continues into the right panel in
exactly the same shape. Dragging the line sideways speeds or slows its
crossing; releasing resumes the automatic pace. Drag never changes the line's
shape and never restarts the sentence. Voice-line as a fixed polyline path
with a draw-progress value; crossing as progress continuing across the seam
with panel context switching at the midpoint; drag maps pointer x to progress
velocity. Avoid: text, subtitles, a line that changes shape mid-crossing, a
voice that is paraphrased or summarized.

## Build
- Self-contained index.html, fully silent (no AudioContext at all), no
  external assets. No visible text except `<title>`.
- Panels: equal halves, cream left / brick right, with a visible seam drawn
  as a 3 px vertical line in clothes blue #4a5a7a (a prompt palette color).
  Three still head-and-shoulder figures per panel in the lower band, clear of
  the voice-line: torso rect in a clothes color, head disc in skin #f2ead8.
- Voice-line: one fixed 22-point polyline in normalized coordinates spanning
  the full frame at vertical center, drawn as a gold stroke up to a
  draw-progress value, plus a small gold tip dot at the leading end while the
  line is still drawing. The path array is a literal constant and is never
  mutated, so the shape cannot change mid-crossing.
- Cycle: 24 s loop — draw left half 0–10 s, pause at the seam 10–12 s, draw
  right half 12–22 s, hold full 22–24 s, then loop. Progress is a closed-form
  function of piece time and the recorded drag/release event list: progress
  advances by the integral of a rate over rate-change segments (base rate 1;
  drag rate = clamp(1 + dx/150, 0.25, 3); release restores rate 1). Drag
  therefore speeds or slows the crossing but never restarts the sentence and
  never alters the path.
- The prompt's "only the panels around it change color and scale" is read as
  context for the two unlike rooms the line crosses (cream interior vs brick
  exterior, figures at panel scale); the panels themselves are flat and
  static, and the line's invariance is implemented literally — the testable
  requirement. No panel animation was invented.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  getUserMedia, or text drawing. No fading alphas are used at all (every fill
  opaque). Dots are own-beginPath arcs with moveTo first (node-canvas
  quirks). No randomness is used anywhere (the seeded mulberry32 helper is
  defined but unneeded; figure colors are fixed by panel).
- House rules: canvas size from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas pinned in draw() via
  style.width/height in px; phone detection via window.screen physical size
  (min dimension < 700 px) with aspect h > w*1.15 as fallback; field-like
  composition goes full-bleed on phones (verified at 390 wide, no clipping).
  Determinism: frame one = draw(0) via a boot flag, clock starts only with
  the rAF loop; rAF loop is a plain function declaration behind a typeof
  guard.

## QA (forced-time probe harness, vm-isolated instance, real node-canvas,
piece driven via window.__piece; harness at tmp/probe1480.js)
- Rendered at 1280×900, 390×844, 720×720 and inspected all three; thumb
  byte-identical across repeated renders.
- t = 0 redraw diff 0 px. Progress values t = 0/5/11/17/23 = 0 / 0.25 /
  0.5 / 0.75 / 1. t = 24 vs t = 0 diff 0 px (loop closes exactly).
- Gold pixels: t = 5 all in the left half (1074 left, 0 right); t = 11 seam
  pause at progress 0.5 (1743 left, 168 right — the tip sits just past the
  seam, since the path midpoint falls at x = 0.505 of the frame); t = 17 both
  halves live (1709 left, 1151 right); t = 23 full line 3546 gold px.
- Shape invariance: every partial line's gold stroke pixels are a subset of
  the full line's gold pixels (1 px neighbourhood tolerance). The only
  pixels outside the full-line set form a single 16×17 px blob at the
  leading tip — the tip dot, confirmed by bounding box (x 198–213,
  y 312–328 at t = 5). The stroke itself never changes shape.
- Drag: fresh instance, drag right (+300 px) from t = 2 to t = 4 advances
  progress to 0.4 vs 0.2 no-drag; drag left (−150 px) slows it to 0.125 vs
  0.2; effectiveElapsed for the left drag is exactly 2.5 s (2 s at rate 1 +
  2 s at rate 0.25). The dragged partial line is likewise a subset of the
  full line (tip dot only outside).
- Token scan clean: no fillText/strokeText, AudioContext, getUserMedia,
  createElement, Path2D, shadowBlur, gradients, or Math.random; the only
  requestAnimationFrame hits are behind typeof guards.

## Fix rounds
None needed.
