# №9054 · Dusk Shore

## Study
Hans shared an X post (duck_wtd, 2026-10-03, 147K views): a 29-second
pixel-art animation of a beach from above at dusk — graduated blue
water, white wave-cap streaks, golden sun glitter, scalloped shoreline,
pale sand, tiny dark figures at the water's edge. He asked: "Can this
be created with code?" Yes — studied the post's structure (not copied;
rebuilt from its described elements).

## Concept
A pixel-art dusk beach from above, animated with code. Low-res 160x240
grid scaled up with crisp pixels. Water breathes through a scalloped
shoreline, wave bands drift, sun glitter twinkles gold, tiny figures
bob at the foam edge — one golden, the rest dark.

## Process
- Per-pixel watercolor: deep navy-teal (#0e2a3a) to turquoise (#3aa88f),
  with animated caustic shimmer.
- Shoreline: sum of three sines, scalloped, breathing over time.
- Foam edge: white with flicker.
- Sand: pale tan with grain + wet band near water.
- 14 wave-cap streaks drifting horizontally, wrapping.
- 90 sun-glitter pixels, twinkling gold, concentrated upper-center.
- 4-6 tiny figures (2x3 px people) at the waterline, bobbing.
- Click reseeds the evening.

## QA
- Vertical 800x1200 inspected: matches the reference mood and structure.
- Zero exceptions (cdp_exceptions.py).

## v5 (2026-10-03): Foam as the subject

Hans: "It's like you don't understand how waves work." Fair. This version
was rebuilt from aerial wave photography research plus his reference image
(teal surf, thick bubbly foam, shallow sand, pale beach):

- The water is calm and glassy. Deep teal up top warming to pale turquoise
  over shallow sand, sand shimmering through. No wave bands drawn on the
  water at all.
- Foam is the subject: discrete breaking events erupt as billowing organic
  patches. Dense knotted white cores, big bubble cells with real holes in
  the middle ring, feathery dissipating wisps at the rim. Each event blooms
  fast, drifts shoreward, dissolves over its lifetime. Several generations
  overlap, so the scene never empties.
- Shoreline: a lacy foam wash breathes slowly up and down the pale sand,
  with wet and dry sand bands.

Palette from the reference: deep teal #2e565b, mid teal #52888f, light
teal #7bafb6, sage #91998c, pale sand #e7d6c4. Click for another evening.
