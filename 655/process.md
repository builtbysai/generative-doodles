# No.655 — Pila del Oráculo

EXPANSION #79 francisco-gazitua, prompt block 7. The Oráculo Imperial
baptismal font as a stillness instrument: "es agua del oráculo."

## Concept

A circular stone font, centered, occupying about half the frame, and
nothing else. Perfect symmetry is the point. The basin ring is a thick
band of flat stone with a slightly irregular hand-cut outer edge and a
clean inner circle; inside it, a dark water disc. On the water, one
reflected star: a single flat paper point with a distorted echo below
it, a short vertical smear of smaller fading flat dots.

The water breathes on a long slow loop (about 60 seconds): the disc's
radius swells and settles by a few pixels, and the star's echo
stretches and relaxes with it. Otherwise the piece is watch-only sacred
calm. Dragging across the water stirs it; the ripples and the echo's
wobble settle back to glass. No text, no narrative, no occult styling.

## Construction

- Palette (strict): ground #0A0A0B, basin stone #3A3A3D, water
  #0E2A33, ripple lines #7FB3C8, star #F2EDE4. No gradients anywhere;
  all fades are per-element globalAlpha on flat fills/strokes.
- Basin ring: an even-odd fill between two paths in one pass — the
  outer edge is a 72-point polygon whose radius is a seeded sum of two
  low sines plus small jitter (mulberry32, seed 655001; the stone edge
  is the piece's only use of randomness), and the inner edge is an
  exact arc, so the rim reads hand-cut outside and true inside.
- Breathing model: breath(t) = sin(2π t / 60). Water radius =
  innerR × 0.985 × (1 + 0.012 × breath), so at full swell the water
  still sits just inside the rim. Echo stretch = 1 + 0.30 × breath.
  Phase 0 at t = 0: frame one is level-neutral.
- Ripple model: a stir is recorded as (x, y, birth) with birth on the
  anchored elapsed clock. Each stir renders up to four concentric thin
  rings, ring k at radius speed × (age − 0.45k) with speed = 0.16 ×
  waterR per second, alpha 0.5 × (1 − age/9)^1.4, all clipped to the
  water disc. Life is 9 s; stirs older than that are dropped.
  Disturbance(t) = min(1, Σ exp(−age / 2.6)) over live stirs drives
  the echo dots' sideways wobble, sin(t × 7.3 − j × 0.95) per dot j,
  so the reflection trembles while the surface is unsettled and goes
  still as it settles (about 8 s to glass).
- Star and echo: the star point sits at (−0.36, −0.33) × waterR from
  center (upper-left of center). The echo is up to 7 dots below it,
  spacing growing by factor (0.6 + 0.17j) × stretch, radius and alpha
  falling per dot; the column stops before the disc's lower edge.
- Interaction: pointerdown on the water records a stir at that point
  (a tap is a tiny stir); pointermove while down records further stirs
  once the pointer has travelled 18 px. Stirs outside the rim are
  ignored. No tap/double-tap semantics, no click-to-reload.
- House rules: single self-contained index.html, canvas 2D only, no
  external assets. Canvas size from the Visual Viewport API with
  resize listeners on visualViewport AND window; canvas style pinned
  in px inside draw(). Phone detection via window.screen min
  dimension < 700 with aspect h > w × 1.15 as fallback; on phones the
  font takes a larger share of the frame (outer radius 0.36 × min
  dimension vs 0.26 on desktop). rAF is typeof-guarded.

## QA log

- Determinism: frame one is the synchronous draw(0) — glass calm,
  breath phase 0, no ripples. No Date.now(), no Math.random(), no
  document.createElement, no AudioContext, no ctx.filter, no
  gradients (grep-verified). Live state is a pure function of the
  anchored elapsed clock plus the recorded stir list.
- Renders via render-piece.js: qa-desktop.png (1280×900),
  qa-mobile.png (390×844), thumb.png (720×720) — all show the stone
  ring font centered with the dark water disc and the single star
  point upper-left of center with its dotted echo; nothing clipped on
  mobile.
- Thumb determinism: thumb.png rendered twice, cmp byte-identical;
  second render deleted.
- Stirred-state verification: a throwaway render with the piece's
  inert ?seed=stir hook (three stirs pre-recorded just before t = 0)
  showed three families of expanding rings clipped to the disc and
  the echo in its disturbed configuration; the throwaway was read and
  deleted from /tmp. The hook is inert without the query string.
- Deviations: none from the prompt. The prompt's "about 60 s" breath
  period is exactly 60 s; the prompt's "ripples appear only when
  disturbed" is kept by rendering rings solely from recorded stirs.
