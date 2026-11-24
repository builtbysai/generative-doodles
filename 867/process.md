# №867 Posted Backward

ZW5 / PP1267, study #263 zach-wolfe. Formula date 2004 · 05 · 27.

The driver, as a felt phenomenon: remembering is one frame at a
time, newest first, each held until it fades into an older one. A
diary of frames surfacing in reverse time order, coachella, then
cancun, glacier, portland, cheesesteak, each alone and fullscreen
with its one-word caption beneath, held, then replaced by an older
memory. The feed reads like remembering, not releasing.

## Build

- First frame: FIRST_T = 0 s into a 40 s cycle. Five frames, 8 s
  each: 6.5 s hold, 1.5 s slow crossfade into the next, older
  frame. Grain breathing is 4 s; every period divides 40, so frame
  one is deterministic and the frame at FIRST_T + 40 equals the
  frame at FIRST_T.
- One frame at a time, no grid, no campaign layout. Each frame
  carries its own memory-color, drawn procedurally from fixed
  seeded tables: coachella, a desert sunset in deep orange and
  pink with a ferris wheel silhouette, a low sun, a palm, and a
  crowd of bobbing dots; cancun, pale sky over turquoise sea bands
  with a white sand strip and a leaning palm; glacier, pale blue
  layered peaks with crevasse lines, a snowfield, and breathing
  ice sparkle; portland, grey-green rain over a bridge arc with
  suspension drops and a still river; cheesesteak, a warm dark
  diner with a glowing STEAKS neon sign, three hanging lamps, a
  counter, and two stools.
- Film-grain dust gathers on the older frames: fixed speckle
  tables, 26 speckles on the newest frame rising to 82 on the
  oldest, plus a faint warm-grey age wash that deepens with age
  and a soft vignette, the remembered edge.
- The one-word memory caption sits beneath its frame in quiet
  white italic on black, in the prompt's order: coachella,
  cancun, glacier, portland, cheesesteak. The caption crossfade is
  staggered: the old word fades out over the first half of the
  crossfade, the new word fades in over the second half, so the
  two never sit on top of each other mid-fade.
- Watch-only; the cadence is the content, and skipping ahead
  would be a different piece. No tap, no click-to-reload, no
  reseed. Visual-only: no WebAudio, no autoplay audio, per the
  Franke rule.
- Caption plate top left (№867 · Posted Backward,
  2004 · 05 · 27) and hint bottom center (One memory at a time,
  newest first.), drawn in-canvas in the template's place.
- Canvas 2D only. No em dashes in visible copy. Flicker at or
  below 14 Hz by construction: all motion is a 4 s breathing and
  a 1.5 s crossfade on an 8 s cadence.

## QA

- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile,
  720x720 thumb; all three inspected visually, plus one 720x720
  probe per frame at t=0 / 8 / 16 / 24 / 32, a mid-crossfade
  probe at t=7.2, and a loop-return probe at t=40.
- Per-frame probes: each frame shows its own memory-color and
  its own caption word, coachella / cancun / glacier / portland /
  cheesesteak in order. Pixel diff between consecutive frames:
  62.91% / 62.87% / 62.94% / 63.01%, the whole frame changing
  color and scene. The t=7.2 probe shows the crossfade halfway,
  coachella dissolving into cancun with the old caption nearly
  gone and the new one not yet in.
- Determinism: two draws at t=0 differ in 0 pixels.
- Seamless loop: frames at t=0 and t=40 (FIRST_T + 40) differ in
  0 pixels.
- Fix rounds: 1. Round 1: on the 390x844 mobile frame the
  ferris wheel was cropped at the left edge, because its radius
  was sized from frame height while the phone frame is taller
  than wide; the wheel and sun are now sized from the smaller
  frame dimension. The palm fronds read as a rake, so both palms
  now arch up and droop. The two captions overlapped mid-fade
  into a muddy double word, so the caption crossfade is now
  staggered, old out first, new in second.

## Deviations

- None from the prompt. One frame at a time, newest first, with
  the five captions in the prompt's order.

## Known warts

- The palm fronds are stylized arcs; at thumb size they read as
  a simple palm, but the frond count is visibly five strokes.
- The cheesesteak stools sit behind the counter and read as
  small T shapes; they are quiet by design.
- The glacier sparkle is subtle at thumb size, a few pale
  points on the ice face.
