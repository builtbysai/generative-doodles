# Process — №9007 "Old Courses" (2026-09-08)

## Rework — 2026-09-23 (review-driven)
Hans was unsure about the shipped piece. Three concrete flaws were identified
and fixed structurally:

1. **The white worm.** The current course was a cream-filled ribbon
   (`#f4ecda`) with an ink outline that read as a glowing worm laid over the
   plate. It now uses the same ribbon language as the historical stages:
   dark umber ink (`#41321f`, `NEWEST`), drawn at 0.9x channel width and
   0.88 alpha with a 2.1px ink edge. Slightly heavier than the old stages,
   a sibling of them, not an overlay.
2. **Muddy middle.** The 13 stage ribbons were 0.94x width at 0.88 alpha and
   piled into brown mush in the densest zone. Stages are now 0.74x width at
   0.55 alpha, each with a thin (0.9px) ink edge at 0.5 alpha, so every
   stage's crescent reads individually. Oxbow lakes slimmed to match.
3. **Label collisions.** The half-width estimate (`name.length * fs * 0.32`)
   under-measured long names, so "WRENBROOK Mountain" spilled into the legend
   swatches. Labels are now placed by true measured width
   (`spacedWidth`, including letter-spacing) plus a 5px margin, with an
   explicit no-go rect around the legend (both side and strip layouts), and
   inter-label separation is width-aware instead of a flat 46px radius —
   this caught a real "EMBERHAM Overlook"/"LOONDALE Marsh" overlap on seed
   90210. A pre-existing mobile defect (the "click for another survey" hint
   overlapping the scale bar at 390px) was also fixed by moving the hint
   under the legend strip.

Seeds re-compared under the new styling (424242, 90210, 777001, 867530):
867530 still wins — clearest Fisk-like nesting, graceful dark channel, no
tight knots. Default seed unchanged.

Final QA: 0 console errors, no scroll/overflow at 1440x900 and 390x700
(scrollWidth/scrollHeight vs viewport via CDP), click verified to change
`?seed=` and re-run the survey on both viewports.

Final local screenshots (rework):
- Desktop (1440×900): `hidden_files/9007-rework-desktop.png`
- Mobile (390×700): `hidden_files/9007-rework-mobile.png`
- Thumbnail source (720×720): `hidden_files/9007-rework-thumb-src.png`

## Concept (original)
A fictional antique survey plate of a river that never existed. The piece runs
a real meander simulation and then presents its output the way a 19th-century
surveyor would: past channel positions as numbered historical stages, the current channel as a dark
ink ribbon in the same language as the stages (reworked 2026-09-23; was a
where the river pinched itself off, and the whole thing dressed as an engraved
plate with a title cartouche, stage legend, scale bar, graticule ticks, faint
terrain, and invented place names. Clicking re-surveys: a new seed grows a new
river, new names, a new survey year and plate number.

## Study source
Robert Hodgin (flight404), via Raven Kwok's doorway list. The study focused on
his Meander project (roberthodgin.com/project/meander), read in full, plus four
finished maps and his Harold Fisk 1944 reference plate inspected at full
resolution. The technique was re-derived locally in
`hidden_files/hodgin-study/meander-study.html` (v1 to v4): a polyline guide
whose points migrate each year by a blend of tangent and a curvature-weighted
outward bitangent, with curvature smoothed over a wide neighborhood so long
wavelengths win, saturated curvature response, fixed-count arc-length
resampling, a valley-center spring, a displacement clamp, and cutoff detection
that pinches near self-collisions into shrinking oxbow lakes. Epoch snapshots
every 45 model years give the Fisk-style stage ribbons.

Full notes: `study/robert-hodgin.md`.

## Variants compared
Rendered six seeds at 1440×900 (424242, 867530, 90210, 123456, 777001,
314159) and three viewport passes at 390×700. Every seed cleared the bar, so
the choice was about the default thumbnail moment.

- 424242: first working plate; river too blobby at width 26, labels collided.
- 867530 ("Osiercombe River"): dramatic nested crescents on the left, a
  graceful continuous cream channel, balanced asymmetry. **Chosen default.**
- 90210 ("Flintmere River"): big open loop up top, strong runner-up.
- 123456 ("Kestrelbrook River") and 314159 ("Reedshaw River"): pretty but with
  a small tight knot of rust color near the middle that reads as a scribble.
- 777001: fine, less distinctive bend vocabulary.

## Why the winner won
867530 has the clearest Fisk-like epoch nesting: the old stages read as a
family of crescents rather than noise, and the current channel threads through
them without any of the tight knots the other seeds showed. At thumbnail size
it still reads as a map, not a tangle.

## Structural iterations (approach changed, not just the seed)
1. Channel width 26 → 17 after the first render looked like fat worms; bends
   turned graceful and more stages stayed visible.
2. Labels moved from virtual river space to screen-space placement in draw():
   on narrow viewports the river's fitted centering shifted under fixed labels
   and they landed on the channel. Screen-space placement with a 30px river
   clearance and 46px label separation fixed every viewport.
3. Mobile got its own layout: compact title, legend as a horizontal chip strip
   instead of a side column, hint moved to the bottom-left corner so it could
   not collide with the title or scale bar.
4. Legend chips start below the two-line legend title after stage 1's number
   collided with it.

## Final local screenshots
- Desktop (1440×900): `hidden_files/9007-final-desktop.png`
- Mobile (390×700): `hidden_files/9007-final-mobile.png`
- Thumbnail source (720×720): `hidden_files/9007-final-thumb-src.png`

Console errors on every render: 0. No scroll or overflow at desktop and 390px
(verified scrollWidth/scrollHeight against the viewport via CDP). Click
verified via CDP: dispatching a click changed the URL to a fresh `?seed=` and
re-ran the survey. `thumb.png` is exactly 720×720.
