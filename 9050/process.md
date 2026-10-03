# №9050 · Tidepool Contours - process notes

## Concept
A rock shelf at low tide, seen from above. Depth reads as bathymetric color bands: each pool is a wobbly organic basin with quantized depth levels in tidepool greens, ringed by thin iso-contour lines. The pools breathe with slow expanding ripple rings; small orange shore crabs scuttle across the wet rock, steering away from deep water. Click drops a pebble: three expanding rings where it lands.

## Construction
- Depth field: 4-6 seeded pools, each with wobbled radius (sum of sines per angle). Depth falls off smoothly; the field renders to a low-res offscreen canvas quantized into 9 bands, then drawn scaled up for soft band edges.
- Palette: deep slate through teal to pale sand, 9 stops interpolated.
- Crisp iso-contour rings redrawn per frame over the soft bands (4 per pool), plus one breathing ripple ring each.
- Crabs: orange ellipses with sideways scuttle wiggle, simple wander steering, wrap at edges.
- Pebble ripples: click spawns 3 staggered expanding rings, 2.2s life.
- Default seed 7. No ?seed= override wired to a new field on click (click is the pebble); reload for a new shelf.

## Why this variant won
First render. The wobble frequencies gave the pools a convincing rock-basin irregularity, the band quantization reads instantly as depth, and the crabs add the small living accent the composition needed. No iteration required beyond the initial build.

## Concept family
"bathymetric tidepool": depth-quantized color bands over wobbled pool basins with iso-contour rings, ambient ripple animation, wandering agents, click ripples. Checked against the ledger; no prior piece uses bathymetric bands or tidepools.
