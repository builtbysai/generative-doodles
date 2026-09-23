# Process — №9007 "Old Courses" (2026-09-08)

## Concept
A fictional antique survey plate of a river that never existed. The piece runs
a real meander simulation and then presents its output the way a 19th-century
surveyor would: past channel positions as numbered historical stages, the
current channel as a cream ribbon with an ink outline, oxbow lakes left behind
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
