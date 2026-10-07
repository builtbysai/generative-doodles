# №8927 "Never Isles" - process notes

## Concept
A procedural antique nautical chart: an archipelago of 5-9 islands with
radial-noise coastlines (plus embayment dents and erosion smoothing passes),
rendered as an engraved maritime plate. Aged paper with grain, shore-parallel
bathymetric contour hatching offshore, hachured relief hills inland, two
compass roses with rhumb lines, a cartouche ("THE NEVER ISLES" / "A Chart of
the Coasts, Harbours & Soundings" / "Scale of Leagues" with a sepia-red seal),
lat/long graticule, tiny italic fathom soundings, and dashed rhumb tracks
between settlements. Every bay, peak, settlement, cape, reef, shoal, channel
and island gets a recombined GNIS-style name (prefix + cropped real-place
roots + water/landform words), with plausibility filters. Water features in
italic serif; settlements in spaced small caps with a shore dot; peaks as a
triangle + elevation. Still image; click/tap re-charts with a new seed;
`?seed=` is shareable. No dates anywhere; no em dashes in title/copy.

## Seeds tried
- `never-anchorage-01` (initial default; later dropped after rng-stream
  changes altered its chart)
- `gull-light-02`, `saltmeadow-03` (early variants)
- `brine-chart-04`, `kelp-light-05`, `fogbound-06`, `wrack-line-07`
- `halcyon-08` (final default), `meridian-09`, `tidewater-10`,
  `brass-compass-11` (final-round scouting)

## Variants and what changed
- **v1** (`v1_blobcoast.html`, since removed): first full render. Coastlines
  came out as smooth potatoes (radial noise too tame, 3 heavy erosion
  passes). Island name overlapped the peak marker; no settlements rendered
  (empty `gentle[]` array silently produced NaN placements); only one compass
  rose; "THE NEVER SEA" missing.
- **v2**: elongated island bases (aspect + rotation), harmonics to k=10,
  stronger jag, 2 lighter erosion passes, deeper embayment dents; mains
  spread across chart thirds; settlement fallback when no gentle shore;
  island names drawn after features and steered off peaks; sea label added
  before soundings; denser soundings; second rose with separation search;
  graticule labels left+bottom only; diamond corner ornaments.
- **v3**: wider label search grid + `water:true` (bay labels must sit in
  water) with outward marching; sea label clamped inside graticule; reefs
  avoid the cartouche; cape/water root blocklists ("Cape Gate",
  "Point Larch Point", "Deep Deep", "By Bight" eliminated); tracks skip
  islands; graticule labels registered as no-label zones.
- **v4**: fixed double "THE NEVER SEA" (was drawn in both build() and
  layoutLabels); peak root filter ("Mount Ing"); wider search for main
  island names (one main's name had been crowded out entirely).
- **v5 (final)**: cartouche rebuilt on S-scaled absolute offsets with
  title-measured width (mobile overflow fixed); sea label fully S-scaled and
  verified not to cross islands; island-name root filter ("By Isle");
  settlement labels moved to 0.55R inland to cut center crowding; island
  names must sit inside their island (`inside` predicate); island names drawn
  before settlements/peaks so everything lays out around them; peak labels
  get wide search; build() reseeds at start so re-renders are idempotent.

## Screenshot paths (all real renders, inspected at pixels)
- `/tmp/8927_v1.png` + crops (`_crop_coast`, `_crop_cartouche`, `_crop_rose`)
- `/tmp/8927_v2a.png`, `/tmp/8927_v3_{never-anchorage-01,gull-light-02,saltmeadow-03}.png`
- `/tmp/8927_v4.png` + crops, `/tmp/8927_v5.png`
- `/tmp/8927_c_*` and `/tmp/8927_d_*` (5-seed comparisons, two rounds)
- `/tmp/8927_e_desk.png`, `/tmp/8927_e_mob.png`, `/tmp/8927_f_desk.png`,
  `/tmp/8927_f_mob.png`, `/tmp/8927_g_*` (final scouting round)
- `/tmp/8927_h.png`, `/tmp/8927_i.png`, `/tmp/8927_j.png` (halcyon-08
  refinements + zoom crops of Red Isle, Twin Isle, Tame Holm)
- `/tmp/8927_final_desk.png`, `/tmp/8927_final_mob.png` (final, default seed)

## cdp_exceptions.py results
- Desktop 1280x800, `?seed=halcyon-08`: OK, no exceptions/errors (exit 0)
- Mobile 390x844, `?seed=halcyon-08`: OK, no exceptions/errors (exit 0)
- Click-to-regenerate verified via CDP input: `?seed=halcyon-08` ->
  `?seed=brine-salt-64`, rebuild completes, `window.__ready` true.

## Why the final variant won
`halcyon-08` has the strongest composition of all seeds tried: two main
islands on a diagonal (Isle of Croft, Isle of Crab) plus four satellites,
both compass roses placed well apart, the sea label sitting cleanly in open
water, and rhumb tracks connecting the mains through open sea. Coastlines
show real character (lobes, bays, headlands) from the elongated-noise +
erosion approach, and the name register reads authentically ("Cape Raven",
"Petrel Roads", "The Sheer Passage", "Fort Limpet", "Santa Agnes",
"Mount Auk 915 ft"). The v1 potato coasts were rejected outright and the
approach changed, not just the seed.

## Open nits (judged acceptable)
- On very crowded islands a cape label can kiss an islet name by a few px.
- "Isle of Crab" is slightly whimsical but defensible (real Crab Islands exist).
- Mobile labels are small by necessity but everything fits with no overflow.
