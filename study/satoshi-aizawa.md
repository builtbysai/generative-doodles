# satoshi_aizawa: Study Notes

**Profile:** x.com/satoshi_aizawa (login-walled) |
**Elsewhere:** objkt.com (Placehodler series, Tezos), Le Random artist profile

## Status
Deep visual pass completed 2026-09-20 via live browser. Five Placehodler
tokens located on his objkt page (tz1TCWDSUEKnNBqJbiRrmRob7JJsjfchzUzE),
all minted under the hic et nunc collection; four inspected as stills,
the fifth's video asset was broken on objkt but its search thumbnail
matched the dot-grid line. Prior text pass (2026-09-19) covered metadata
only. Honest boundary: the rendered frames were seen, the animation loops
were NOT watched (GIF/video players failed to load), and no source code
or live generative viewer was available, so technique notes below are
inferred from stills, not confirmed from code.

## What is verified

- Satoshi Aizawa is a generative artist collected by Le Random, the
  curated collection of generative works (his artist profile sits
  alongside Tyler Hobbs, Matt DesLauriers, Vera Molnar, Dmitri Cherniak,
  and the other names in that index).
- His series "Placehodler" lives on objkt (Tezos). Le Random tags the
  work: Medium Image, Process Procedural, Tags Pixel.
- The series name is a wink: placeholder plus hodler, crypto culture
  baked into the title.

## The pieces, seen as stills

1. **Placehodler v2021-01-24** (edition of 34). A black and white sphere
   rendered as a pixel checkerboard on a white field. Reads as a
   UV-wrapped grid projected orthographically, tagged "loop", so it
   likely rotates or breathes in a seamless animation loop. Stark,
   graphic, minimal.
2. **Placehodler v2022-03-18** (edition of 20). White rounded squares
   scattered across a black field. Some tiles sit on a tidy grid,
   others are rotated at angles and displaced, like a checkerboard that
   has been shaken or is mid glitch. Tags "algorithmic, gif", so the
   tiles likely jitter or rotate in a looped GIF.
3. **Placehodler v2022-03-24** (edition of 4). A white field with a
   phyllotactic spiral (golden-angle, sunflower-head arrangement) of
   small black X glyphs, tiny and dense at the center, growing larger
   toward the rim. Tag "algorithmicart". A single still frame already
   reads complete; the spiral geometry does all the work.
4. **Placehodler v2022-08-08** (edition of 20, 1008x1008 GIF). A
   full-bleed grid of glowing dots on black, like an LED matrix or RGB
   test pattern. The dots are organized into horizontal strata of the
   full rainbow: red/orange/yellow bands at top, greens and teals in the
   middle, blues and purples lower, then warm reds again at the bottom.
   Within each band the dots vary in brightness with soft glow and
   organic blotchy clustering, so the strata have ragged, data-moshed
   edges rather than clean lines. Tags "animation, computational".
5. **Placehodler v2023-06-09** (edition of 8). The video file failed to
   load on objkt ("Unable to load asset"). The search thumbnail showed
   the same rainbow dot-grid language as v2022-08-08, suggesting
   continuity of that line.

## Core techniques (inferred from stills)

The through-line is grids that are perturbed or stratified. A regular
lattice (dots, squares, checkerboard, glyphs) is sampled with noise or
a parametric function and then one property is modulated: brightness
and hue by vertical band (v2022-08-08), rotation and displacement
(v2022-03-18), size by radial position along a phyllotactic sequence
(v2022-03-24), surface UV projection (v2021-01-24). Everything is
rendered as precomputed looping GIFs (1080x1080 or 1008x1008, a few MB
each), not interactive scripts. There is no live generative viewer or
iframe on any token page. Palette discipline varies by piece:
monochrome in three of the five, full-spectrum rainbow in the dot-grid
pieces. The pixel/dot aesthetic is literal: crisp dots, glyphs, and
tiles, no smoothing.

## What makes it sing

The tension between a rigid grid and a soft perturbation is genuinely
effective. In v2022-08-08 the ragged band edges keep a test-pattern
composition from feeling mechanical, and the glow gives depth to flat
dots. The phyllotaxis piece is the most confident: one clean
mathematical idea, executed with restraint, and the growing glyph size
adds a zoom-like dynamism to a static frame. The restraint of black on
white or white on black in three pieces shows he trusts the system to
carry the image. The wink in the title (placeholder + hodler) is a
smart conceptual frame: these read as "placeholder" graphics, loading
screens, calibration patterns, elevated into collectible artifacts,
which gives the whole series a coherent identity despite the technical
variety.

## What is overdone or weak (avoid-list)

- The rainbow banding in v2022-08-08 is the most familiar move in the
  set; full-spectrum LED gradients are a well-worn generative cliche,
  and the piece leans on palette fireworks rather than system novelty.
- Presentation is thin: three of five pieces carry no description text
  at all, tags are inconsistent ("algorithmicart" vs "algorithmic,
  gif" vs "loop" vs "animation, computational"), and two of the five
  media files failed to play on objkt, which undercuts the work.
- The dated versioning is not a daily practice: only five pieces across
  two and a half years (2021-01-24, 2022-03-18, 2022-03-24,
  2022-08-08, 2023-06-09), so the "vYYYY-MM-DD" names promise a
  discipline the output does not demonstrate.
- Technique-hopping: five pieces use at least four unrelated systems
  (spiral, sphere projection, jittered tiles, dot strata), so the
  series reads more like sketchbook experiments than a deepening
  investigation.

## Process notes and presentation

Only two pieces carry description text: v2022-08-08 says "2^2th work of
'Placehodler' series." and v2023-06-09 says "5th peace of 'Placehodler'
series." (sic, "peace"). So the numbering is sequential and playful
(the 4th is written as 2^2th), and by count the 1st, 2nd, and 3rd are
v2021-01-24, v2022-03-18, and v2022-03-24. There are no artist process
notes on objkt beyond the Le Random taxonomy (Process Procedural, Tags
Pixel). Editions vary widely (4 to 34), suggesting ad hoc pricing
rather than a fixed edition policy.
