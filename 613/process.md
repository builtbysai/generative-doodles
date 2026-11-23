# №1934 Sidekick (CH7, PP1181, study #252 chris-hyson)

## What it is
A hand holds white blossoms just under rippling water. The surface is a
lens: blossoms below it smear and double, rainbow refractions slide across
glass stones, colored threads drift. The water breathes on its own in slow
swells. Tap the water and a ripple spreads from the tap point, scrambling
the refraction field for a while before it settles back into slow breathing.
Tap only. No audio, no reload, no click-to-reseed.

## Fixed phase at frame one
FIRST_T = 8 s. The swell runs on a 9 s cycle, so t = 8 s is late in a swell,
the water at a gentle crest. One settled ripple ring from an earlier tap
(spawned at t = 5 s at normalized 0.62, 0.16, upper right of the surface)
is still faintly visible at frame one, age 3 s, decayed to about 30 percent
of its starting amplitude. All blossoms, stones and threads are placed by
the seeded PRNG mulberry32(1934); all motion is a pure function of t.

## Interaction probe
Query params: ?tapx=0.5&tapy=0.2 renders the frame as if the water had
been tapped at that normalized point 1.5 s before frame one, so the ripple
is strong. The default render (no params) is the deterministic first frame.
Probe results, 720x720 renders of the final index.html:
- default thumb.png md5 b422e577f2c5cd948dd2d3f65c785553
- repeat renders thumb2.png / thumb3.png: same md5, byte-identical
- probe render (?tapx=0.5&tapy=0.2) md5 33d024efb156fd092c582bd317cbcdd1,
  differs from default; a strong ripple ring is visible at the tapped
  point in the surface band and the blossom refraction is scrambled
  relative to the default frame.
Live taps append a ripple at the tapped point with the current time; rings
decay with exp(-age / 2.5) and are gone after about 7 s. A tap never clears
or changes the blossoms; only the refraction offsets change.

## Palette
Hand-picked from the named colors in the prompt. The study file
studies/chris-hyson.md does not exist in the repo.
- Deep water #0e3a3f, mid water #1d6a6e, surface band #7fc4bd,
  surface light #cdeee6
- Blossom white #fbfaf4, blossom shade #e8e2d2, blossom centre #f2d38a
- Glass stone grey #8d9490, stone shadow #5d6663
- Thread muted red #a85a4a, thread muted gold #c9a24b
- Hand warm tan #c99a72, hand shade #a87a55, stem green #4d7a52
- Rainbow refraction pastels #f2b8c6, #f6d9a0, #bfe3c0, #a9d3e8, #d3b8e6
- Plate ink dark #0d2f33 on the bright surface band, light #eef7f2
  over deep water

## Technical approach
A refraction field rendered as a distortion pass over a blossom scene:
every below-surface element is drawn at a position offset by refract(),
which combines an ambient swell driver (9 s period, depth-scaled smear)
with tap-spawned ripple rings that perturb the field phase. Blossoms are
drawn twice, a faint ghost pass at 2.2x offset for the lens doubling,
then the main pass. The field relaxes back to the ambient driver as each
ring decays over seconds. Ripples are gentle by construction: a pond,
not a storm. All motion runs under 1 Hz, well under the 14 Hz ceiling;
prefers-reduced-motion renders the fixed first frame only.

## Gallery date
2007-04-29, formula 2002-01-10 + (N+1) days, shown on the piece as
"2007 · 04 · 29". Title plate "Sidekick", hint "Tap the water to send
a ripple."

## QA
Rendered the actual shipped index.html with node
~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile
and 720x720 thumb; all three inspected visually. thumb.png is
byte-identical to the 720x720 render of the final index.html
(md5 b422e577f2c5cd948dd2d3f65c785553, re-rendered twice, identical).
Fix rounds: 1. First render: blossoms read as hollow rings, the hand
read as a plain dome, threads read as straight scratches. Fixed by
adding a solid white heart to each blossom with radial petals, raising
the fingers above the palm top edge with separation strokes, drawing
threads as smooth midpoint curves at lower alpha, and softening the
rainbow bands. 2. Removed one unused variable; re-rendered all three
sizes, md5s unchanged, no visual change.

## Deviation from the prompt
None material. The hand is stylized (cupped palm, four fingers, thumb)
rather than anatomical, which the flat mark-making taste of the series
requires.

## Known minor warts
- The surface band is a large quiet pale field on desktop; only the
  title, the faint settled ripple ring and caustic dots sit in it.
- On tall phones there is a stretch of open water between the surface
  line and the first blossoms.
- The thumb crossing from the left is mostly hidden behind the palm
  and blossoms; the hand reads through the four fingers and palm.
- Stems cross over the lowest blossom on narrow phones.
