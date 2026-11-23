# №9065 · Faultline

## Concept

Angular flow with the organic curve banned. A low frequency domain-warped noise
field is quantized to eight compass directions, and walkers move in straight
segments with hard turns, like seismic traces or cracked earth. Two weights of
ink: many hairline fractures and a few long bold faults. Each fault carries a
slip vector; any line drawn afterward that crosses the fault visibly shears,
one side offset by a few pixels, so the strata displace along the fault the
way real rock does. Rust and bone inks on a charcoal ground.

## Construction

- Seeded value-noise fbm (3 octaves) with domain warp; the field angle is
  quantized with `Math.round(a / (PI/4))`, giving regions of constant
  direction separated by sharp boundaries.
- Fractures: 150 to 190 walkers, starts stratified over a 4x4 grid so every
  seed covers the plate. Each walker follows the quantized field (92% adoption
  at boundaries) with a small per-step crackle turn, plus a fixed per-walker
  bias of -45, 0, or +45 degrees so direction sets interweave instead of
  cabling. A directional density grid (per 8-compass-direction counters per
  cell) kills or deflects walkers that would stack parallel lines, which keeps
  coverage even and prevents knots. Occasional branches fork off at hard
  turns. 6% of fractures are drawn at medium weight.
- Faults: 2 or 3 per piece, 6x fracture width with a thin contrasting core
  line, drawn first. Each fault walks both directions from a seed point with
  forced 45-degree kinks every 2 to 4 segments, diagonal-biased starts, and
  the second fault held 90 degrees from the first so faults cross rather than
  run parallel. Each fault gets a perpendicular slip vector (8 to 19 px at
  full size).
- Slip: while stroking any path, every segment is tested against earlier
  fault segments; on crossing, the active slip set toggles and the stroke
  jogs at the exact intersection point. Fractures slip on faults, and later
  faults slip on earlier ones.
- Compositional safety: after composing, the piece must have at least 2 bold
  faults, 60+ fractures, and total ink length of at least 30x the composition
  size, else it retries with a derived seed (up to 15 tries, keeps the best).
- Presentation: square composition centered on the viewport with 8.5%
  margins, clipped so nothing crosses the margin; subtle tonal wash blobs,
  then 3500 single-pixel grain speckles at low alpha.

## Iteration

- v1: field too smooth, fractures too long. Read as a circuit board: endless
  parallel diagonal traces, one giant orientation domain.
- v2: overcorrected. Higher field frequency plus high turn rate produced
  scribble, and both faults landed horizontal, reading as UI dividers.
- v3: better balance, but a dense tangle knot formed where the field swirled,
  and one fault was still a perfectly straight horizontal bar (diagnosed via
  CDP: two walkers' straight runs had concatenated into 12 straight
  segments by chance).
- v4/v5: added forced fault kinks and per-walker direction bias. Fixed the
  knot but cables of parallel lines persisted in smooth field regions.
- v6: added the directional density grid. Evened coverage, killed cables.
- v7: directional grid refined to per-direction counters so weaving is
  allowed but parallel stacking is not.
- Seeds 424242 then exposed two fault failure modes: 90-degree fault kinks
  chained into rectangular frames, and long axis-aligned fault runs reading
  as bars. Fix: faults use 45-degree kinks only, diagonal-biased starts,
  second fault forced 90 degrees from the first, shorter total length.
- Stratified 4x4 walker starts fixed a sparse quadrant on seed 424242.
- Final: seeds 9065, 424242, 777001, 271828 all compose with even coverage,
  kinked lightning-style faults, visible slip jogs at crossings (confirmed
  in 2x zoom crops), and no rectangles, bars, knots, or empty corners.

## Differentiation

- vs №9059 Crosscurrent and all organic flow pieces: those use smooth
  curved flow. Faultline bans curves entirely; every direction is quantized
  to 8 compass headings and every direction change is a hard polygonal turn.
  Different geometry family.
- vs №8935 (hatched lines piece): that piece is static hatching. Faultline
  is directional walkers following a noise field, with bold faults that
  shear every line crossing them via slip offsets. Different mechanism and
  different read (seismic/crack vs hatch).

## QA log

- Seeds rendered and visually reviewed: 9065 (default), 424242, 777001,
  271828. All compose: 2 to 3 faults, 150+ fractures, margins respected,
  slip jogs visible at fault crossings in zoomed crops.
- Console check via CDP: zero errors, zero warnings.
- Responsive: rendered at 1280 and at 390 width (mobile); square composition
  centers and scales correctly, hint legible, no overflow.
- Click interaction: reseeds and redraws (code path matches the collection
  pattern; verified the handler is wired, same as sibling pieces).
- Visible copy audit: no em dashes, no date strings, no absolute URLs.
  Visible text is only the title and the hint "click for another fault".
- Known limits: very small viewports get dense (ink count is fixed, area
  shrinks); accepted as consistent with the piece scaling by S.
