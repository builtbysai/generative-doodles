# №1844 "Prime / Uncal" (PS5, PP1091): process.md

EXPANSION #241 phillip-sollmann, PS5. Gallery date 2007 · 01 · 29 (formula
2002-01-10 + 1845 days). Built from BATCH-1842-1846-SPEC.md, mirroring the
live №1841 page structure, plates, Visual Viewport sizing and phone rules.

## The piece

Two concentric sequencer rings on black, centered and large, filling the
frame, nothing else. The outer ring is labeled PRIME in red LED letters
with 29 amber dots; the inner ring is labeled UNCAL in pale green with 31
pale-green dots. Both rings advance at nearly the same speed, their steps
disagreeing most of the time in a low restless churn. On the rare steps
where both fire together, the coincidence flashes pure white: a white halo
outside the outer ring, a white star marker at the centre, and both active
steps turn white. Watch only.

## The two primes and the step durations

- PRIME (outer): prime 29. 29 steps per revolution, step duration 0.29 s.
  One revolution takes 29 x 0.29 = 8.41 s.
- UNCAL (inner): prime 31. 31 steps per revolution, step duration 0.31 s.
  One revolution takes 31 x 0.31 = 9.61 s.
- Step-duration ratio 29:31. The rings can never lock: 29 and 31 are
  coprime, so the pair of step indices cycles through every combination
  before repeating.

## Coincidence schedule

Both rings fire a step boundary together whenever piece time is a multiple
of both step durations. LCM(0.29, 0.31) = 8.99 s, so a coincidence lands
every 8.99 s: t = 0, 8.99, 17.98, 26.97, 35.96, 44.95, 53.94, 62.93, ...
Each flash decays linearly over 0.6 s after the coincidence instant. Seven
coincidences fall in the first 60 s of piece time. The flash is the whole
event: no tap-tempo, no quantize button, no 4/4 grid overlay.

## Frame one (t = 60 s, fixed phase)

- PRIME step index: floor(60 / 0.29) = 206; 206 mod 29 = 3.
- UNCAL step index: floor(60 / 0.31) = 193; 193 mod 31 = 7.
- Coincidence: none flashing. Last coincidence at 53.94 s (6.06 s before
  frame one, past the 0.6 s flash window); next at 62.93 s.
- Both rings and every flash are closed-form functions of piece time on
  the prime ratio. No RNG is used anywhere; no Date.now() or Math.random()
  affects any frame. Frame one is byte-comparable.

## Sound

Described here only; the page plays no audio and has no sound control.
The sound model, for a visitor who enables it in a future revision: each
ring step is a short click, amber steps a dry tick, pale-green steps a
softer tick a fifth lower; on a coincidence a deep tone lands with the
white flash (sine, about 55 Hz, 1.2 s decay). Real WebAudio would be lazy,
inside a visitor gesture only, never autoplay. The visuals carry the piece
alone.

## House rules followed

- Visual Viewport sizing; resize listened to on visualViewport and window.
- Canvas pinned in draw() via canvas.style.width/height in px.
- Phone detection via window.screen (min dimension under 700px) with the
  aspect fallback (h > w*1.15). Centered geometric composition keeps its
  shape; page ground is the piece's own black; hint ink stays light on the
  dark plate.
- One synchronous frame at load; requestAnimationFrame guarded with a
  typeof check so node-canvas QA works.
- Title, date and hint plates drawn on canvas. No em dashes in visible
  copy. No AI-signature copy. Never click-to-reload. Canvas 2D only.
- node-canvas quirks honored: a moveTo precedes every batched arc, and
  fading alphas are rounded to 4 decimals before stringifying.

## Deviations

- Outer ring radius reduced from the first draft (0.47 to 0.43 of the
  square side, inner 0.30 to 0.27) after the first gate render showed the
  bottom outer dots sitting under the hint plate. All dots now clear the
  plates at every size.
- Flash test caught a real bug: drawFlash passed a string to the rgba()
  helper, which calls toFixed on its alpha argument. Fixed by passing
  numbers only; verified by re-rendering the flash frame.
- No sound control on the page (see Sound above); the spec's WebAudio
  sequencer is documented as a model, not implemented, per the build
  brief. No other deviations.

## QA

Rendered from the actual script with node ~/workspace/tools/render-piece.js
and inspected visually, all three sizes, after the final edit:

- 1280x900 desktop: two large concentric rings centered on black; 29 amber
  outer dots, 31 pale-green inner dots; PRIME in red above the band between
  the rings, UNCAL in pale green at the centre; active steps highlighted
  (outer at upper right, inner at right); title/date plate top left, hint
  plate bottom left on one line; bottom dots clear of the plate. Clean.
- 390x844 mobile: rings keep their square shape, centered in the tall
  viewport; hint plate wraps to two lines and fits. Clean.
- 720x720 thumb: identical to desktop at square size; this render is
  thumb.png. Clean.
- Flash check (temporary copy with frame time 53.94 s, a coincidence):
  white halo outside the outer ring, white star at the centre, both active
  steps white. The flash marker reads clearly. The temporary copy was
  discarded; the shipped file keeps frame time 60 s.

Gallery note: "Two rings slip past each other; when they agree, the flash
lands. Watch only."
