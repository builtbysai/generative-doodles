# №856 Mismatch Engine

CK2 / PP1256, study #262 colton-kempf. Formula date 2004 · 05 · 16.

The driver, as a felt phenomenon: one sound hovers between two
versions of the same figure and can never quite land on either.
On the left the figure waves on tidal flats at dusk; on the right
the same figure stands at a crowded street memorial. Drag shifts
the offset between image and sound, and the almost-right feels
tender while the wide offset feels haunted.

## Build

- First frame: FIRST_T = 15 s into a 120 s cycle. Wave, candle
  flicker, tide shimmer, crowd sway and the cursor's loop drift
  are closed-form functions of t, so frame one is deterministic.
- Split frame, two procedural panels. Left: dusk-blue sky into a
  rose horizon, wet flats with six drifting tide-shimmer lines,
  the lone figure waving on a 6 s wave cycle, its reflection
  wobbling in the wet flats. Right: grey wall and pavement, four
  soft head-and-shoulders crowd silhouettes swaying behind the
  figure, seven candles flickering with warm glows, three small
  rose flower clusters at the base of the memorial.
- The same abstract figure at the same scale in both panels: head,
  torso, legs, one waving arm, no face, no detail.
- Offset model: the sound's resting offset drifts slowly over the
  120 s cycle (loopOff = 0.30 sine). Drag adds to it. The phase
  difference between the panels is clamp(|offset|, 0.06, 1) x 0.5
  wave cycles, so it never reaches zero: perfect sync is
  impossible by construction. The right panel runs on t minus
  that shift, so its wave and candle glow fall out of phase.
- The audio cursor is a thin vertical hairline with a small head
  on the horizon line and short ticks at top and bottom. Its
  position is 0.5 + 0.38 x offset.
- Near zero offset: both panels in warm balance, cursor near
  center, a faint warm rose tint (up to 0.10 alpha) over the
  frame. Wide offset: the panel the sound has left behind gets a
  grey veil (up to 0.42 alpha) with softened edges, and the
  figure's wave falls out of phase with the candle glow.
- Interaction: drag horizontally to shift the sound. On release
  the offset eases back to the loop path (exponential, 0.9 s).
- Audio is visual-only in this gallery: no real WebAudio, the
  cursor IS the sound, per the Franke audio rule.
- Caption plate top left (№856 · Mismatch Engine, 2004 · 05 · 16)
  and hint bottom center (Drag to shift the sound.), drawn
  in-canvas in the template's place.
- Canvas 2D only. No click-to-reload. No em dashes in visible
  copy. Candle flicker runs at 0.27 Hz and 0.53 Hz, well under
  the 14 Hz ceiling.

## QA

- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile,
  720x720 thumb; all three inspected.
- Time probes (node harness, /tmp/probe856.js): loop offset
  0.280 / 0.109 / -0.280 / -0.109 at t=15/45/75/105; phase
  difference 0.140 / 0.054 / 0.140 / 0.054; cursor 0.606 / 0.541
  / 0.394 / 0.459; veil left 0.117 / left 0.046 / right 0.117 /
  right 0.046; warm tint 0.000 / 0.040 / 0.000 / 0.040; candle 0
  glow 0.300 / 0.765 / 0.765 / 0.727. Wave angle at t=17: left
  1.114, right 1.139; at t=18.5: left 0.540, right 0.914. Pixel
  diff t=15 vs t=17: 21.13%; t=15 vs t=45: 63.97%.
- Drag probe at t=15: near-zero drag (dragX -0.280) gives offset
  0.000, phase difference 0.030 (the clamped minimum), cursor
  0.500, veil none, warm tint 0.100, wave right 0.671 vs left
  0.750. Wide drag (+1.000) gives offset 1.000, phase
  difference 0.500, cursor 0.880, left veil 0.42, warm 0.000.
  Wide drag the other way gives offset -0.720, phase difference
  0.360, cursor 0.226, right veil 0.303. Near-zero vs wide
  pixels: 64.00%.
- Release: dragX eases 1.000 to 0.574 / 0.329 / 0.189 / 0.108 /
  0.062 over 2.5 s, reaching 0.004 after 5 s; offset returns to
  0.283 against the loop offset 0.280.
- Phase floor: minimum phase difference over the full cycle at
  rest is 0.030, never zero.
- Determinism: two draws at t=15 differ in 0 pixels.
- Fix rounds (2): crowd first drawn as large dark ovals that
  dominated the right panel, redrawn smaller and lower, then
  rebuilt as head-and-shoulders silhouettes standing on the
  pavement, with heads lowered to touch the shoulders.

## Deviations

- None from the prompt. The crowd is suggested as soft
  head-and-shoulders silhouettes rather than detailed figures,
  per the prompt's own wording.

## Known warts

- The left figure's reflection reads slightly detached at the
  head, a side effect of the half-height flip; acceptable as a
  wet-flat reflection.
- On narrow phones each panel is about 195 px wide, so the
  memorial candles and crowd sit close together; the composition
  still reads as two scenes.
