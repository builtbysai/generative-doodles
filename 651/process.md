# №1992 The Lonely Bench: process notes

SN1 / PP1239, study #260 syd-nuku. Watch-only.
Gallery date: 2007 · 06 · 26. Hint: "Watch. Nothing hurries here."

## Build

- Template: live `1991/index.html` structure (Visual Viewport sizing,
  canvas pinned in draw(), phone detection via window.screen with aspect
  fallback, one synchronous frame at load, requestAnimationFrame guarded
  by typeof check, ?t= / ?seed= probe hooks, window.__draw and
  window.__piece1992 QA hooks).
- The driver: a locked static frame of a drab room. Washed turquoise
  walls with faint panel seams and one small scuff, a tired fluorescent
  bar with a soft glow near the top, a grey floor with baseboard, one
  long grey bench, three figures seated on it like furniture, facing
  nowhere, spaced with awkward symmetry (seeded jitter around
  x = 0.245 / 0.505 / 0.755 of the scene width).
- Figures are flat front-view blocks: grey torso, warm skin-tone face
  with a plain grey hair cap and no facial detail, dark legs hanging
  to the floor with shoes, skin-tone hands at the ends of the arms.
  The two outer figures never move. The middle figure is the only
  moving thing in the room.
- Mechanism: the middle figure leans on a 120 s sine (max 7 degrees,
  rotating torso, head and arms about the hip, feet planted) and raises
  its right hand once per cycle (up 52-64 s, held 64-76 s, down
  76-88 s, still for the other 84 s). Long pauses between moves are
  built into the cycle, not randomized at runtime, so the piece stays
  a pure function of t.
- No pointer handlers (watch-only). No audio. No em dashes in visible
  copy. No camera motion of any kind, no cutting.
- Layout: the room is drawn in a scene rect, 16:10 letterboxed on
  desktop, near-square on phones so the figures stay legible; outside
  the rect is plain wall colour, so the negative wall space is part of
  the composition. Title/date plate drawn on canvas: "№1992 · The
  Lonely Bench" and "2007 · 06 · 26" top left, hint bottom center.

## Determinism

- FIRST_T = 40 s, cycle = 120 s.
- At t = 40 the lean is at 0.575 of full (about 4 degrees) and the
  hand is down: the first frame shows the middle figure caught
  mid-lean, the room otherwise perfectly still.
- No wall-clock or random seed at load; all motion is a pure function
  of t. The blocking jitter comes from a seeded PRNG fixed at load.
- Determinism check: rendering t = 40 twice at 720x720 gives identical
  md5 (9daf8aa7de01403b74685d98c3f68184).

## Probe results (desktop 1280x900 renders)

- t = 40 md5 d626dcec1a5c57b504558207edc94ad6; t = 70 md5
  63287eeab76f791b86fd416305733617; t = 100 md5
  e41a623a312654e10b2b2e3c6c543e2b.
- Pixel diffs (threshold > 8 summed per channel, 685,584 px total):
  t40 vs t70 2,029 px changed (0.30%); t40 vs t100 737 px (0.11%);
  t70 vs t100 2,259 px (0.33%).
- At t = 70 the middle figure is at full lean (0.994) with its right
  hand raised up and out at head height; at t = 100 the lean is back
  to 0.426 and the hand is down again. The wall-strip regions above
  and below the scene rect show 0 changed pixels in every comparison:
  the room and bench never move, only the one figure does.

## Fix rounds

1. First gate: the contact shadows under the figures rendered as
   grey semicircular bowls hanging below the floor line (an arc from
   0 to PI draws the lower half). Replaced with flat ellipses centred
   just below the floor line, which read as contact shadows.
2. Also fixed during the build, before the first render: the arm
   angle math used a mirrored cosine that would have swung the left
   arm toward the body. Rewrote drawArm() as an angle from straight
   down, toward the figure's own side.
3. Re-gated fully after the fixes: desktop, mobile and thumb
   re-rendered and inspected; probes re-run on the final file. No
   edits since.

## Deviations from the prompt

- The prompt calls for "long randomized pauses between moves". The
  pauses are long (84 s of stillness per 120 s cycle for the hand)
  but fixed by the cycle schedule rather than randomized at runtime,
  because the determinism rule requires frame one to be reproducible.
  The gesture library (lean, raise, lower) is exactly as specced.
- The date line "2007 · 06 · 26" is drawn under the title as part of
  the title plate (house rule), though the prompt itself carries no
  date text.

## Known visual warts (honest)

- The figures are deliberately crude blocks with no facial detail;
  at thumb size the heads read as skin circles with grey caps, which
  is the intended deadpan look but leaves them a little doll-like.
- On phones the room is a near-square band with a lot of empty wall
  above and below; that is the prompt's negative space, but the
  figures are small at 390 wide.
- The fluorescent glow is a soft radial wash that reads as a faint
  pale rectangle around the fixture on desktop; subtle, but visible
  if you look for it.
- The bench shadow is a flat translucent strip rather than a cast
  shadow with direction; the light has no direction in this room.
