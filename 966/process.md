# No.966 Saliva Exchange

Study #118 lauren-lee-mccarthy, PP127. The Saliva mechanism: bio-data barter as
social ritual, drawn as a diagram. Nothing biological-literal: no lips, no
swabs, no samples; a bar counter, a queue of dots, and two dotted strands that
trade colors in mid-air.

## Concept

A long bar counter runs across the lower third of a clinical-dark room. An
attendant (one mint dot) works a station right of center. Patrons (desaturated
dots) queue along the counter front, extending left from the station. Every
roughly nine seconds the attendant takes the front two patrons: a strand rises
from each, the two strands cross above the station and trade colors (cyan
becomes magenta, magenta becomes cyan) across the crossing, then each strand
descends into the other patron. Absorbing a strand permanently tints the
patron toward the received color, and tints accumulate across exchanges, so
the bar slowly becomes a portrait of circulation. Exchanged patrons leave to
the right; new patrons arrive from the left untinted. The circulation never
stops: arrival, exchange, tint, departure.

Interactions: tap a patron to sample it (its accumulated strand lifts and
coils above the bar for eight seconds, a small helix in its own tint: the
history made visible). Drag a queued patron to the attendant to skip the
line; the exchange happens out of turn. Double-tap starts a new shift:
existing tints fade out over two seconds and the bar restocks.

## Construction

Single self-contained index.html, canvas 2D, no external assets.

- Simulation: fixed-timestep state machine at 120 Hz. The exchange runs as
  step-counted phases: idle (3.0 s, 1.0 s before the first) -> stepup (1.4 s,
  the pair walks to the station slots) -> strands (4.5 s) -> settle (0.9 s,
  strands fade while the pair departs) -> idle. Patron positions live in
  normalized coordinates and ease toward slot targets at per-state speeds;
  queue slots recompute every step, so the line shuffles forward on its own.
- Strands: each strand is a parametric dotted arc from one partner to the
  other, height from a sine arch, lateral weave from a counter-phased sine so
  the two strands braid around each other; each is drawn as two helix rails
  (dots offset by a rotating phase) for the double-helix read. Dot color is a
  function of arc parameter: a smoothstep between s = 0.3 and s = 0.7 swaps
  cyan to magenta (and mirror) across the mid-air crossing. Growth is the
  phase progress p in [0, 1]; at p = 1 the absorb fires: partner A gains
  magenta, partner B gains cyan (accumulators +0.55, opposite accumulator
  damped by 0.75, capped at 1). A patron's dot color is its desaturated base
  mixed toward cyan and magenta by its accumulators.
- All randomness is mulberry32 seeded (base seed 966127; per-shift and
  per-arrival streams derived from it). The shift opening is seeded with
  pre-tinted patrons, since the piece opens mid-shift. New arrivals after
  that are untinted, per the brief. Frame one is the synchronous draw after
  exactly 3000 pre-roll steps (25 s): by then two exchanges have completed
  and a third is mid-strand at progress about 0.67, strands crossed and
  mid-swap.
- Interaction events are consumed in sim time: a tap is held 0.35 s of sim
  time so a second tap can upgrade it to a double-tap before the sample
  fires; a press that travels less than 0.02 normalized units is a tap, more
  is a drag. Dragging only arms on queued patrons.
- Sizing follows the house rules: Visual Viewport API with resize listeners
  on both visualViewport and window, canvas style width/height pinned in
  draw() every frame, phone detection from window.screen (min dimension
  under 700 px) with the aspect fallback. On phones the queue spacing
  tightens and the strand rise shortens so the arcs stay in frame.
- Sound, only after the first gesture and all lazily created and
  typeof-guarded: a low filtered-noise murmur bed with sparse glass clinks,
  a double-helix chime (two sine tones crossing in pitch) while the strands
  run, and a low thump at absorb. The visual renders in complete silence.
- No gradients, no shadowBlur, no ctx.filter, no offscreen canvas, no
  microphone, no wall-clock input to any drawn state.

## QA log

- Rendered with node render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png). All clean, silent.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. Duplicate render deleted. Re-verified after the weave change.
- Desktop read-back: dark ground; the counter slab spans the lower third
  with its lighter top edge; the mint attendant stands at the station at
  68 percent width; eleven patron dots queue along the counter front,
  several visibly cyan- or pink-tinted among the gray; the exchanging pair
  stands at the station with two dotted arcs braided above it, cyan on the
  left turning magenta past the crown crossing, magenta mirroring.
- Mobile read-back: same scene fits the 390-wide frame whole; queue, pair,
  attendant and full strand arcs all inside the frame, nothing clipped.
- Fix round 1: a plain tap on a queued patron was being consumed by the
  drag branch (pointerdown arms a drag on any queued patron), so the tap
  sample could never fire. Tap versus drag is now decided by travel
  distance at pointerup.
- Fix round 2: the strand weave amplitude was raised (0.016 to 0.026
  normalized units) so the two strands visibly braid and cross along the
  rise instead of only kissing at the apex.

## Deviations

- The counter's top edge line and rail line use derived lighter shades of
  the specced counter tone (#1E222B family), since the brief asks for a
  lighter top edge without naming a hex.
- During the settle phase the fading strands are drawn from the pair's
  recorded station positions (the partners are already walking off), so
  the diagram completes its arc instead of dragging after them.
- The double-tap new shift restocks the bar with untinted patrons after
  the two-second tint fade, rather than with a fresh set of pre-tinted
  ones: a new shift starts clean; the opening shift is the only one that
  begins mid-history.
