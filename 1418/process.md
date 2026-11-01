# №1418 "The Stone Remembers" (thomas-mader TM3, PP641)

A single rough stone, filling the frame, whose surface is a diary: every
touch leaves a mark — a notch where it was tapped, a polish where it was
pointed at, a smudge where it was handled — and the marks layer into a
history you can read like rings.

## What it is

- Stone base #8a8578 fills the frame edge to edge, seen close, its texture
  the whole subject: seeded speckle grain, tonal blotches, horizontal strata
  bands, and thin zigzag cracks. No room, no arms, no context.
- The diary is a persistent mark buffer drawn oldest-first, so newer marks
  overlay older ones. Marks fade only toward a 0.45 alpha floor — the oldest
  marks are slowly overlaid but never erased, so the stone's history
  thickens visibly over minutes. No wipe, no reset control, no clean stone.
- Frame one already carries a diary: 48 ancient marks plus ghost marks
  pre-seeded from the 150 s before t = 0, so the stone never reads as fresh.
- Ghost touches arrive on a seeded schedule: taps from the left every 9 s
  (from t = 6), pointing holds from the right every 13 s (from t = 14).
  Each leaves its mark plus a faint red touch glow (#c8352a) that lives
  only ~1.5 s at the moment of touch.
- Visitor touches mark differently: a quick tap notches (dark wedge
  #4a463c), a hold over 0.6 s polishes (pale ellipse #d6d1c0), a drag
  smudges (cluster of flat-alpha #6a6558 circles along the path).
  A held pointer glows faintly while held.

## Adaptations

- Prompt "mark buffer" is a stored-history array with a slow overlay fade of
  oldest marks only — never canvas-fade, never a wipe.
- Ghost touches are a closed-form seeded schedule (tap/hold times from
  fixed formulas, positions from a seeded table), not a simulation.
- All touch classification is closed-form over recorded events (press time,
  movement, release time).
- No audio of any kind: the marks are the subject. No text except `<title>`.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, getUserMedia, localStorage, or fillText/strokeText.
- Node-canvas quirks honored: fading alphas rounded to 4 decimals before
  stringifying; dots drawn as filled rects or single arcs each with their
  own beginPath (never batched arcs); ellipses one per beginPath.
- Determinism: frame one = draw(0) via a boot flag; the rAF clock starts
  only with the rAF loop (plain function declaration behind a typeof
  guard); all randomness from mulberry32 (seed 1418000), never Math.random.
- Viewport from the Visual Viewport API with resize listeners; canvas
  pinned in draw() via style width/height in px; phone detection via
  window.screen physical size with aspect fallback; field-like composition
  goes full-bleed on phones.

## Verification (forced-time probe harness)

Harness: vm-style stubbed rAF driving the piece's own loop, pointer events
delivered to its own listeners, 640×480 canvas.

- Two fresh instances render byte-identical frame-one images; thumb
  byte-identical across repeated renders including a final re-verify.
- Frame one already marked: 151 dark (notch) pixels at t = 0, plus smudge
  texture — never a clean stone.
- Tap: tap-zone dark pixels 21 → 58 after a tap at (100,100) measured 2 s
  later (after the touch glow faded). First probe measured inside the glow
  window and caught only the red tint; re-probing after the glow faded
  confirmed the notch.
- Hold: hold-zone pale pixels 0 → 198 after a 1.0 s hold at (500,100).
- Drag: drag-band smudge pixels 1298 → 3130 after a (200,300)→(400,300)
  drag.
- Ghost schedule / thickening: whole-frame mark pixels 2316 at t = 18 →
  2428 at t = 120 with no input, and the t = 0 frame already carries marks;
  the wall of history only thickens, never wipes.
- Renders inspected at 1280×900, 390×844, and 720×720: stone fills the
  frame edge to edge at all sizes, marks read as notches, polishes, and
  smudges, no clipping on mobile.

No fix rounds needed.
