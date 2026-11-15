# No.1797 Ghosts of the Piece

- Study: lawrence-english, EXPANSION #235, LE6, PP1044
- Source: TASKS.md prompt block lawrence-english, mechanism 6, Imagined field recordings; the ghosts of the piece
- Date: 2006 · 12 · 13 (formula: 2002-01-10 + (1797+1) days)
- Interaction: Watch only.

## Driver

The piece is a memory buffer that only ever decays and replays. The mechanism is the fade-by-age renderer plus the mutated ghost scheduler, not a live seascape. No scene is ever drawn live: the display reads a buffer of timestamped gesture records, each drawn with exponential fade by age, and a scheduler occasionally re-inserts a mutated copy of an old record, lighter and slightly drifted. Live input is refused by design; no pointer handlers are registered.

## How it is built

- A fixed seeded table (mulberry32, seed 1797) holds 16 records: one water band, one headland polyline, two fog bands, seven wave arcs, five bird paths.
- Every record carries t0 (seconds the gesture was made), tau (fade time constant) and a base alpha. The renderer draws only records, alpha = base * exp(-age / tau).
- The ghost scheduler holds eight fixed ghost events. Each names a source record plus a drift offset and a rescale. Ghost color is the source color lightened 30 percent toward salt white. Ghost alpha rises over 2 s, then decays with a 14 s time constant.
- Frame one is a fixed phase at t = 60 s, so the buffer already holds several faded gestures (headland line, wave arcs, bird paths) at fixed fade levels, plus one wave ghost mid-replay (born at 56.5 s) and a faint bird ghost (born at 41 s). No wall clock is read for frame one.
- Palette: salt white #F2F0EA, fog grey #8E9599, deep water blue-black #0E1A22, on a fog grey ground #D8DAD6.
- Composition: wide horizontal landscape, low horizon at 62 percent, large empty sky. Headland on the left, birds and ghosts peripheral, center mostly empty.
- House rules: single HTML file, canvas 2D only, no document.createElement. Visual Viewport sizing with resize listeners on both visualViewport and window. Canvas pinned in draw() via style width/height in px. Phone detection via window.screen (min dimension under 700 px) with aspect fallback. Field-like composition: full-bleed on phones, square on desktop. One synchronous frame at load; every requestAnimationFrame call guarded by a typeof check. Reduced motion renders a still frame. No flashing above 14 Hz by construction.

## Deviations from the prompt

- The water is itself a record (a deep band below the horizon, t0 = 2 s, tau = 200 s) rather than only wave strokes, so the water reads at frame one while still fading by the same rule.
- Two fog bands are added as records, drawn as soft vertical gradients, to carry the fog grey of the palette in the sky. The prompt names the palette but not fog bands.
- Ghost alpha peaks at 0.8 times the source base alpha on top of the 30 percent color lightening, so a ghost reads as both lighter and slightly fainter than its original.

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb. Visually inspected all three renders.

- Desktop: low horizon, large empty sky, headland line on the left, water band with faded wave arcs, peripheral bird chevrons, ghost wave visible as a lighter doubled arc, center mostly empty, plates legible.
- Mobile: full-bleed, headland and waves read, fog bands soft, plates legible, nothing clipped.
- Thumb: re-rendered last from the final index.html, matches the desktop composition.
- Fix round: first render showed the fog bands as hard-edged grey bars; changed them to vertical gradient bands with soft edges and re-rendered all three sizes.

## Files

- index.html md5: 03dbd7721093e30cd784caba868bc837
- thumb.png md5: 8fe39cc838b39e5313277347b5e13972
