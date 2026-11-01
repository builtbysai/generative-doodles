# №1431 "Closed Mon–Sun" (wolfgang-muller WM8, PP654)

## What it is

A gallery door, closed, with a brass sign that reads CLOSED MON–SUN, and
through its glass, a room full of props: costumes on rails, a doll-record
player, bottles, a bird model, a stack of books, a feather. The props are
lit; the door never opens; a small crowd of shadows waits outside,
patiently, forever. The gallery never opens, and that is the exhibition.

## Frame one (t = 0, boot flag)

Exterior wall and pavement; the door center-frame, large, dark wood. The
glass pane shows the prop room through a full coat of condensation fog:
three costumes on a rail, a stack of books, a red doll-record player, a
clay bird model on a stand, four bottles, a drifting feather — all muted
behind the fog. The brass sign at eye height reads CLOSED MON–SUN. Five
waiting shadows stand along the bottom edge. No other visible text besides
the sign and `<title>`.

## Mechanics (all closed-form over piece time and recorded events)

- 60 s seamless loop. Every ambient period divides 60 s: costume sway 30 s,
  bottle glint 20 s, feather drift 60/30 s, shadow weight-shift 30 s.
- Props shift almost imperceptibly: costumes sway, bottles catch light on a
  glint cycle, the feather drifts on a slow sine path.
- Glass fog is a 24×16 cell grid over the pane. Dragging across the glass
  records wipe events; a cell's fog level is computed from the wipe list and
  regrows exponentially (tau 8 s) toward full fog. A wipe reveals the props
  sharply, then the glass fogs again.
- Dragging the door is a no-op with a subtle sign glow: the brass brightens
  and a flat-alpha halo appears around the sign, decaying with tau 2 s. The
  door never opens; there is no enter state and no interior scene.
- Waiting shadows shift weight on a slow sine; they never leave.

## Adaptations

- Door as a fixed frame with a brass sign sprite; prop room as a background
  scene with slow ambient motion agents; glass as a fog layer with a wipe
  buffer (drag clears, fog regrows on a timer); door drag = no-op with a
  subtle sign glow (the refusal is acknowledged, not punished).
- The sign text is the prompt's own spec, the only visible text besides
  `<title>`. No other text anywhere.
- Fully silent: no AudioContext, no getUserMedia, no offscreen canvas, no
  gradients, no shadowBlur, no Path2D, no createElement, no fillText except
  the specced sign.
- Fading alphas rounded to 4 decimals; dots as filled rects or
  own-beginPath arcs (node-canvas quirks).
- Canvas sized from the Visual Viewport API, pinned in draw(); phone
  detection via window.screen with aspect fallback; centered composition
  keeps its shape, page ground takes the piece's own background color.
- Determinism: frame one = draw(0) via boot flag, clock starts only with
  the rAF loop (plain function declaration behind a typeof guard); all
  randomness from mulberry32 (seed 1431000), never Math.random.

## Verification (forced-time probe harness, stubbed rAF)

- Two fresh instances byte-identical at t = 0.
- Sign zone at 1280×900: 30,139 brass pixels, 2,744 dark text pixels —
  the sign is legible.
- Glass wipe: all 5,000 pixels of a test box around the wipe path changed
  at t = 6 (fog lifted, props revealed); at t = 30 the same box differs
  from t = 0 by 0 pixels (fog fully regrown).
- Door drag: sign mean brightened from (184,141,57) to (213,174,100) at
  t = 0.5 after the drag; a door-slab pixel is unchanged (the door never
  moves, never opens).
- Loop closure: t = 60 vs t = 0 = 0 pixels difference.
- Waiting shadows: 11,780 shadow pixels in the bottom strip.
- Thumb byte-identical across repeated renders.
- Token scan clean (the single "Math.random" hit is a comment stating it
  is never used).

No fix rounds needed.
