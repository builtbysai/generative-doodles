# №1398 "Balloon Speaker" — zack-khalil ZK7 (PP621)

## Prompt
A dark membrane surface — like a held balloon or a drum skin — that ripples
and deforms in response to a deep sub-bass pulse; the ripples resolve into
brief geometric patterns before dissolving back into the skin. Palette:
membrane latex #d8b8a8, bass shadow #2a1e1a, ripple highlight #f5c542,
deep void #0c0a09. The membrane fills the whole frame edge to edge; the
bass source is an implied point that drifts slowly; ripples radiate from it;
the patterns that form are fleeting — a star, a ring, a hand — never stable.
Motion is continuous; the sub-bass envelope drives everything (WebAudio
optional, visual-only fallback with a visible pulse metronome); dragging the
bass point relocates the ripple source; pressing and holding deepens the
bass and the ripples grow violent, then the membrane "relaxes" on release.
Avoid: photoreal latex, readable text, decorative gradients, click-to-reload.

## Implementation
- Membrane as a height-field grid (56×40 cells, flat fills per cell), the
  height at each cell a closed-form sum of two traveling wavefronts from the
  bass point and its mirror point (the mirror wave gives constructive
  interference): `sin(2π(r·3.2) − 2πt/1.3) · exp(−r·2.6)`, amplitude
  modulated by a 2.6 s bass pulse envelope (sharp attack, exponential decay).
  No frame-integrated simulation anywhere; every state is a closed-form
  function of piece time and recorded events.
- Cell shading is a flat-fill palette ramp, never a gradient: bass shadow →
  membrane latex → ripple-highlight gold as height rises, toward deep void
  as it falls. The grid reads as the skin's own texture.
- Motif stamps: three seeded interference hotspots (star, ring, hand). When
  the local wave value at a hotspot crosses 0.45, its motif stamps in gold
  with alpha scaled by the excess, then dissolves as the crest passes. Over
  a 120 s sweep each hotspot fires ~2–3.5% of the time: fleeting, never
  stable. Verified visually at t=7.85 (gold star over a ripple crest).
- Visible pulse metronome: a small gold dot, bottom-left, whose radius and
  alpha breathe with the bass envelope (full gold at each pulse peak, dim
  between pulses).
- Interaction: drag relocates the bass point; on release the offset decays
  back to the slow drift path (tau 4 s). Press-and-hold deepens the bass:
  amplitude multiplier rises to ×2.7 over 1.2 s of holding, then relaxes
  with tau 0.8 s on release.
- Audio: fully visual by default. A 55 Hz sine hum is created only inside
  the first pointerdown (lazily created, typeof-guarded WebAudio), sounds
  only while the pointer is held, and stops on release. Never autoplay.
- No visible text except `<title>`. No offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, localStorage, getUserMedia, or
  fillText/strokeText. The single `Math.random` token in the file is the
  comment stating it is never used.

## House-rule compliance
- Canvas size from the Visual Viewport API with window fallback; canvas
  pinned in draw() with style width/height in px; resize listeners on
  visualViewport and window.
- Field-like composition goes full-bleed on phones; checked at 390 wide.
- Determinism: synchronous first frame at a constant phase via a boot flag
  (frame one = draw(0), clock starts only with the rAF loop); all randomness
  from a seeded mulberry32 PRNG (seed 1398000 + index·7919), never
  Math.random. rAF loop is a plain function declaration behind a typeof
  guard.
- node-canvas quirks honored: every fading alpha rounded to 4 decimals
  before stringifying (scientific-notation alphas parse as opaque in
  node-canvas); dots drawn as filled rects; every arc with its own
  beginPath.

## Verification (forced-time probe harness, stubbed rAF driving the piece's
own loop, pointer events to its own listeners, 1280×900)
- Two fresh instances render byte-identical frame-one images (0 px diff);
  thumb byte-identical across repeated renders, including after the fix.
- Frame one: dark membrane edge to edge, bright ripple crest ring around
  the bass source, latex tones, bass-shadow dark areas, gold metronome dot
  bottom-left. Mobile keeps the same full-bleed composition, no clipping.
- t=0 vs t=0.65 differ in 1,142,658 px (the whole membrane moves).
- Metronome: dot-center pixel full gold (245,197,66) at a pulse peak,
  dimmed (133,105,60) mid-decay.
- Drag: dragged vs undragged at t=5 differ in 1,143,570 px; gold-range
  pixels in the 100×100 region around the drag point: 10,000 dragged vs 0
  undragged (the ripple source relocated).
- Hold: highlight pixels at t=6.5: 73,979 held vs 0 unheld (ripples grow
  violent); after release, t=12 highlight count returns to 0, matching
  unheld (membrane relaxed).
- One fix round: motif-stamp threshold lowered from 0.72 to 0.45. At 0.72
  the stamps could never fire (replica sweep over 120 s: max hotspot value
  0.654, 0% of samples above 0.72); at 0.45 each hotspot fires ~2–3.5% of
  the time, matching "fleeting, never stable". All renders re-done after
  the fix; frame-one thumb re-verified byte-identical.
