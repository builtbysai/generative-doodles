# No.167 Hat Tile Field

## Concept
A patch of the aperiodic hat monotile (Smith, Myers, Kaplan, Goodman-Strauss, 2023): every tile carries the same small eight pointed star in neon line on near black, one tile in forty in signal orange. The field drifts almost imperceptibly so the non repetition can sink in. Watch only.

## Construction
The patch is genuine, not a periodic stand-in. It was grown at build time with the H/T/P/F metatile substitution from the paper (Kaplan's reference rules): three inflations of the H supertile give 1156 hats. Build-time verification reproduced the published census exactly (level 1: 25 hats, 3 reflected; level 2: 169, 22; level 3: 1156, 147) and a pairwise check found zero overlapping tiles. The finished piece bakes a centre crop of that patch (462 tile placements as centroid, rotation in 30 degree steps, reflection flag, over a shared 13-vertex outline); a raster check confirmed the crop window is 99.996 percent covered, sampling error only, so tiles bleed off the panel edges with no gaps. Palette is exactly the spec: ground #0B0B0E, neon line #7DF9FF at 85 percent alpha, orange #FF5C1F for every fortieth tile. The star motif sits at each tile's centroid and rotates with the tile. Motion is a 30 second loop: a horizontal pan of plus/minus 2 percent of panel width, and one faint alpha pulse of the orange tiles per loop. No interaction, no hint, no text.

## QA log
Rendered with the house node-canvas harness at 1280x900, 390x844 and 720x720 and inspected all three. The fedora silhouette reads clearly across the field (the orange tiles make it unmistakable), stars sit inside their tiles at matching rotations, tiles clip cleanly at the panel edges, and the phone frame keeps the centred square panel on the piece's own black. Renderer reports resize listeners only, confirming watch-only. Frame one is offset 12 seconds into the loop, mid pan.
