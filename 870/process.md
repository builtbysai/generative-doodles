# №870 The Flash Cadence

ZW8 / PP1270, study #263 zach-wolfe. Formula date 2004 · 05 · 30.
Completes EXPANSION #263 with its siblings.

The driver, as a felt phenomenon: a dark party room where nothing
is visible except when the flash fires. Then the room strobes into
hard light, faces mid-laugh mid-dance frozen mid-gesture, then falls
back to dark. The flash is the light source and the aesthetic.

## Build

- First frame: FIRST_T = 0 s into a 20 s cycle. Four flashes per
  cycle, one every 5 s, each with a 0.8 s lit hold: 0.05 s attack,
  0.6 s full hold, 0.15 s decay, then dark. The flash fires 0.35 s
  before each 5 s slot boundary, so at FIRST_T the first flash is
  mid-hold at full light and the first frame shows the frozen
  faces. All motion is a function of cycle phase, so frame one is
  deterministic and the frame at FIRST_T + 20 equals the frame at
  FIRST_T.
- Flash cadence and safety: one flash every 5 seconds, 0.2 Hz,
  far below the 14 Hz limit by construction. Never strobe, never
  faster than once per 4 seconds, no rapid on/off flicker anywhere.
  The only motion is the slow dark-phase sway and the flash ramps.
- Four flashes, three figures each, drawn procedurally from fixed
  seeded tables (mulberry32, seed 870): tight crops on laughing
  faces with closed laughing eyes, open mouths, shallow hair caps,
  raised arms mid-gesture, torsos in party colors (red, teal,
  yellow, magenta, green, blue) over four skin tones. Each flash
  is a different arrangement. A pale offset ghost of each figure
  stands in for motion-blur capture, and 42 fixed confetti pieces
  per flash hang caught mid-air, visible only in the light.
- In the dark the same figures drift as near-black silhouettes,
  swaying out from their frozen pose on a sine that returns to
  zero at the next flash, so the flash always catches them where
  the dark left them. The room is never fully visible: no walls,
  no furniture, only a breath of warm dark at the floor.
- Caption plate top left (№870 · The Flash Cadence,
  2004 · 05 · 30) and hint bottom center (Watch the flash fire.),
  drawn in-canvas in the template's place. The text inverts with
  the flash, quiet white in the dark, near-black under the hard
  light, so it stays readable either way.
- Watch-only; the cadence is the content, and triggering the
  flash by hand would make it a toy. No tap, no click-to-reload,
  no reseed. Visual-only: no WebAudio, no autoplay audio, per the
  Franke rule.
- Canvas 2D only. No em dashes in visible copy.

## QA

- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile,
  720x720 thumb; all three inspected visually, plus probes at
  t=0 (lit flash 0), t=0.45 (dark, just after decay), t=2.5 (dark,
  mid-sway), t=5 (lit flash 1), and t=20 (loop return).
- Lit vs dark at the same cycle: 99.98% of pixels differ, the
  whole room changing from black to hard white light. Flash 0 vs
  flash 1: 42.40% of pixels differ, a different arrangement of
  faces and gestures.
- Position consistency: the t=0.45 dark frame, where the drift
  term is exactly zero at the flash boundary, shows the
  silhouettes in exactly the same positions as the lit figures
  in the t=0 frame, same heads, same raised arm.
- Determinism: two draws at t=0 differ in 0 pixels.
- Seamless loop: frames at t=0 and t=20 (FIRST_T + 20) differ in
  0 pixels.
- Fix rounds: 1. Round 1: the hair cap covered the top half of
  each head and hid the laughing eyes, so it is now a shallow
  cap with the eyes visible below the hairline; the dark
  silhouettes were headless because the dark branch returned
  before the head was drawn, so dark figures now draw their head
  silhouette; the floating rim arcs on the dark figures read as
  stray curves, so they were removed and the silhouette fill
  lightened slightly instead.

## Deviations

- None from the prompt. Dark room, flash as the only light,
  frozen faces and gestures, watch-only, slow cadence.

## Known warts

- The torso ellipses are large and pill-like by design; where
  figures overlap, the rear torso is mostly hidden and reads as
  a colored shoulder behind the front figure.
- The motion-blur ghosts are subtle at thumb size, a faint pale
  edge on the frozen figures.
- The confetti is sparse at the frame edges, denser near the
  figures, since it is seeded over the whole frame.
