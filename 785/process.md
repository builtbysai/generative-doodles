# No.785 "Visual Tool" — EXPANSION #96 daniel-buren, PP2

## Concept

Buren's stripe is not decoration; it is a measuring instrument, an
"outil visuel" laid over a site to reveal it. The site here is the
plainest possible room: two walls meeting at a corner, a ceiling line,
a floor, one doorway, all in flat neutral tones with nothing on them.
A single wide band of stripes (white + vermilion, alternating at the
8.7cm module: 17 stripe pairs across the frame width, the band four
pairs wide) sweeps across the room from left to right. Wherever the
band currently overlaps one of the room's edges, that edge ignites
white, as if the stripe were taking its measure. After the band
passes, the edge remembers for a few seconds, fading on a decay tail,
then forgets. Then plain room again, until the next pass. Watch-only:
the room is to behold, not to operate.

## Construction

Single self-contained `index.html`, canvas 2D, no assets, no text
beyond the `<title>`. Strict palette: room #D8D4CC, floor #C4BFB2,
edge glow #FFFFFF, stripe white #F6F3EC, stripe vermilion #C8102E.

Room: the whole frame is filled with the room tone; the floor is one
flat polygon below its perspective line. All architecture is carried
by nine edge polylines (ceiling left/right, corner vertical, floor
line left/right, and the four sides of a doorway quad standing on the
right wall with its feet on the floor line). Each polyline is
precomputed once and subdivided into segments of at most 0.02 frame
units, so ignition can be resolved per segment. Base edges are drawn
as quiet 1px lines in the floor tone at 55% alpha.

The band: a full-height vertical interval whose stripes are anchored
to the band's own left edge, so the stripe pattern travels with the
band. It is drawn after the room fills and before the edges, clipped
to the canvas, so it reads as a thing moving through the room, never
as wallpaper applied to it.

Edge-ignition function (closed form, the core of the piece): the loop
is 45 s. Pass-clock `u = tc + LEAD`, where `tc` is the loop time and
`LEAD` offsets the start (see Deviations). The band's leading edge
sits at `E = speed * u` with `speed = (1 + bandFrac) / 30`, so the
leading edge crosses the full frame plus one band width in 30 s. For
a segment with midpoint `mx`:

- `sIn = mx / speed` (leading edge reaches the segment),
  `sOut = (mx + bandFrac) / speed` (trailing edge leaves it).
- While `sIn <= u <= sOut`: brightness = attack x coverage, where
  attack ramps 0 to 1 over 0.5 s from `sIn`, and coverage is the
  fraction of the segment's x-extent inside the band interval
  (a vertical segment counts as covered if its x is inside).
- While `u > sOut`: brightness = coverage-at-`sOut` x
  `exp(-(u - sOut) / 2.0)`, an exponential tail at about 5% after 6 s.
- While `u < sIn`: only the previous cycle's tail is evaluated the
  same way; with the loop's plain interval it is effectively zero.

Ignited segments are stroked in three layered white passes (widths
7 / 3.5 / 1.6 px, alphas 0.16 / 0.32 / 0.85, each multiplied by the
segment brightness), slightly narrower on phones. Brightness depends
only on the loop phase: no accumulated state, no clock reads, no
randomness anywhere in the piece, so any frame is reproducible from
`t` alone.

Sizing follows the Visual Viewport API with resize listeners on both
`visualViewport` and `window`; the canvas style is pinned in px on
every draw. Phone detection uses `window.screen` (min dimension
< 700px), aspect ratio only as fallback. The rAF loop is
`typeof`-guarded and anchored at its first timestamp; frame one is
the synchronous draw at loop t=0.

## QA log

Renderer: `~/workspace/tools/render-piece.js` (node-canvas).

- qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png
  (720x720) all read back: plain room with corner, ceiling lines,
  floor, and doorway; the striped band two pairs into the frame at the
  left; ceiling and floor lines lit white where they cross the band;
  nothing clipped on mobile, composition intact in the tall frame.
- Determinism: thumb.png rendered twice and `cmp` byte-compared
  identical; duplicate deleted.
- Mid-pass verification: a throwaway render at loop t=16 (via the
  inert `?seed=tNN` hook, active only when rAF is absent) showed the
  band over the corner, the corner vertical and the ceiling/floor
  lines fully lit across the band, and a faint decay tail trailing
  along the lines behind it. Throwaway deleted after the read.
- One fix round: the first frame-one lead (one stripe pair) read as a
  single red stripe rather than a band entering; LEAD was raised to
  two pairs and all renders redone, byte-compare re-run green.

## Deviations

- Frame one is phased with the band's leading edge two stripe pairs
  (about 0.118 of frame width) into the room rather than exactly at
  the edge, per the brief's own frame-one spec (band visibly entering,
  left edges beginning to ignite). The pass therefore completes at
  loop t = about 27.1 s instead of 30 s, and the plain-room interval
  lengthens by the same amount; the 45 s loop and the 30 s crossing
  speed are unchanged.
- The loop seam: during the plain interval the band waits off-frame
  right and re-enters at the left at the wrap. The re-entry is a
  two-pair sliver appearing at the frame edge once per 45 s, the
  standard cost of a hard loop on a crossing pass; recorded rather
  than hidden.
