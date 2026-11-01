# №972 — Siphon

Study #119 kyle-mcdonald, PP133 "Wifi Whisperer".

## Concept

A dark room holds twelve serene seated figures, each a head dot over a rounded body-rect. Every figure's device beacons: a faint cyan ring expands from it and dissolves. Roaming the room is the whisperer — a hollow red circle with a single ear-arc — trailing a faint red record of its route. It seeks the nearest active beacon, and when it arrives it siphons: the captured ring contracts into the whisperer as a red spiral, and the figure leaks its data as roughly sixty small amber glyphs (dots, ticks, arcs) that rise and fade. Nothing in the room is in a hurry and nothing is legible; the theft is calm, ambient, and continuous. The venue reseeds every 240 seconds.

## Construction

- **Simulation:** fixed-timestep 120 Hz sim driven from a mulberry32 stream seeded 972101. All state (figure drift, beacon phases, whisperer path, spirals, glyph particles) advances only through sim steps, so the piece is fully deterministic per seed.
- **Frame one:** the synchronous draw after exactly 3600 pre-roll steps (30 sim-seconds). No wall clock feeds any drawn state.
- **Figures:** twelve seated figures on a jittered lattice with seeded micro-wander — they shift, they do not travel. Beacon timers are staggered per figure.
- **Whisperer:** steers to the nearest active beacon; capture triggers the spiral (1.5 s contraction) and then the leak. Its route trace is a fading polyline, the only continuous line in the piece.
- **Leaks:** ~60 amber glyphs per capture, emitted spread over ~2 s and rising/fading over ~6 s.
- **Interaction:** tap a figure to force its beacon and divert the whisperer to it; drag to steer the whisperer directly under a 10 s override; double-tap to reseed the venue. Tap and drag feed one merged override channel.
- **Venue cycle:** reseeds every 240 s behind a pure venue-clock dim veil (no wall clock involved).
- **Audio:** lazy and typeof-guarded — created only on first gesture; the QA renderer supplies no AudioContext and the piece renders in silence.
- **House rules honoured:** canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas style width/height pinned in px inside draw(); phone detection via window.screen physical size with aspect fallback; no gradients, no shadowBlur, no ctx.filter, no offscreen canvas; no visible text except `<title>`.

## QA log

- Rendered with `render-piece.js` at 1280×900 (desktop), 390×844 (mobile), 720×720 (thumb) from the final index.html.
- **Determinism:** thumb rendered twice and byte-compared with `cmp` — identical.
- **Desktop (1280×900):** dark room, twelve pale seated figures, faint cyan beacon rings at five figures (two large double-ring expansions, three small), the red hollow whisperer at centre with its faint red route trace behind it, the capture spiral mid-contraction around the centre figure, and the first amber glyphs of the new leak just lifting above it.
- **Thumb (720×720):** same composition at gallery size; all elements legible.
- **Mobile (390×844):** full venue fits the narrow frame, nothing clipped; whisperer, spiral, rings and figures all present.

### Seed choice and recorded deviations

1. **Seed 972101 was chosen by pixel-scanning candidate seeds.** Spirals live only 1.5 s, so most seeds show frame one with no capture in progress. Candidate seeds were rendered and scanned for the red-pixel signature of a spiral; 972101 puts the whisperer on top of a figure with the spiral mid-contraction at frame one. The honest trade-off: at this seed the capture was recent, so the amber leak column is young — just beginning above the whisperer rather than fully risen. That is the correct behaviour of the mechanism, not a rendering shortcut.
2. **Venue reseed uses a pure venue-clock dim veil** rather than any wall-clock or real-time fade.
3. **Tap and drag feed one merged override** for the whisperer instead of two separate steering paths.
4. **Glyph emission spreads over ~2 s** of the ~6 s leak rather than bursting all ~60 glyphs at the capture instant.
