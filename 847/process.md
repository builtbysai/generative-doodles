# No.847 The Lit Bed (IA1 / PP1247, study #261 iso-attrill)

Date: 2004 · 05 · 07 (formula 2002-01-10 + 848 days).
Gallery note: "A rumpled white bed floats in total blackness under one hard light, a tuxedoed figure on its edge. Drag to move the light."

## What it is
A rumpled white bed floats in total blackness under one hard light. A figure
in a tuxedo with a cravat sits on the bed's near edge, left of center; a
nightstand to the right holds a glass of water and a small alarm clock
(hands fixed at 3:00); a wilting orchid boutonniere is pinned to the lapel.
Nothing else exists. Bed centered low, vast black surround doing the
focusing. No visible room or walls, no color, no horror cliches, no text
in the piece (per the batch standing rule, no hint or caption text; the
interaction cue lives in the gallery note only).

## Timing
- FIRST_T = 12 s. Cycle = 60 s.
- Light: closed-form 60 s loop above the bed, x sweeping left to right and
  back, y dipping slightly mid-crossing. At FIRST_T the light is mid-swing
  at the right (0.8234, 0.1755), the orchid partly wilted.
- Orchid wilt: closed-form function of cycle phase, 0 at cycle start, 1 at
  cycle end. At FIRST_T wilt = 0.2 (petals slightly drooped, still pale).
  At t = 42 wilt = 0.7, light at the left (0.1766, 0.1445).

## Interaction
DRAG moves the single light source. While held, the light eases toward the
pointer (time constant 0.3 s). Release eases it back to the loop path over
about 4 s (smoothstep). The figure never moves; only the light pool, the
beam, the cast shadow across the sheets, and the lit edges of the jacket,
headboard, and nightstand follow the light. No click-to-reload; taps do
nothing. Drag state is closed-form in t given the event state, so probes
drive it with explicit times.

## Palette (hex)
- Black void #000000, bed base #262626 / #141414, headboard #141414
- Sheet #C9C9C9, lit #EEEEEE, dim #8E8E8E, pillow #E0E0E0
- Blanket #8A8A8A, blanket dark #606060
- Nightstand #1C1C1C, top slab #2C2C2C, edges #6E6E6E
- Tuxedo #0E0E0E, jacket edge #787878, shirt #F0F0F0, cravat #050505
- Skin (the one warm highlight) #D9A06B, skin shadow #B27C4C
- Hair #080808, shoes #0A0A0A
- Glass #C8C8C8, clock face #E8E8E8
- Orchid fresh #ECECEC wilting to #8F8F8F

## Audio
None. No prompt earns audio here; silent build per the batch standing
rule. No samples, no WebAudio.

## QA
Rendered from the actual script with node ~/workspace/tools/render-piece.js:
- Desktop 1280x900, mobile 390x844, thumb 720x720, all three inspected.
- Thumb rendered twice, byte-identical (md5 ab1f506153007099b8a3efe43318eb93).
- Drag probe (probe847.js, seed 12, drag +0.25/-0.08, redraw at t=13):
  light moved to (0.9166, 0.0983) vs loop (0.8326, 0.1704); figure anchor
  unchanged (0.345, 0.47); the drag render shows the light, beam, pool,
  and cast shadow moved while the figure sits still.
- Release probe (same drag, release at t=13, redraw at t=18): light
  (0.8234, 0.1445) exactly equals the loop position; return complete
  within the 4 s ease.
- Time probe at t=42: light at the left, wilt 0.7; composition holds.

## Fix rounds: 1
Round 1 (after first gate): rumple fold strokes were reading as bright
white scratches, so highlight alpha 0.5 to 0.32, shadow alpha 0.38 to
0.26, stroke slightly thicker; the face shadow was a hard pie-wedge
split down the face, replaced with a clipped offset-disc crescent;
contact shadow under the figure softened 0.35 to 0.22 alpha. All three
sizes and the thumb byte-compare re-gated after the fix.

## Deviations
None from the spec. The alarm clock hands are fixed at 3:00 (authored,
not a live clock).

## Known warts
- The cast shadow of the figure is a simple tapered quad, so at light
  positions near the bed's left edge it reads as a broad dark wedge
  rather than a soft figure-shaped shadow.
- The contact shadow under the seated figure still reads as a distinct
  dark oval on the sheet at larger sizes.
- On portrait phones the figure is small against the vast black surround;
  this is the prompt's composition (vast black doing the focusing), kept
  as specced.

Parent fix round (gate): the in-canvas caption plate (number, title, formula date) and interaction hint were missing; added at the end of draw() in the template place, then re-rendered and re-gated desktop, mobile, and thumb (thumb byte-identical twice).
