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

## v2 (2026-10-03): Real surf

Hans: "9054 sucks. See the waves moving up and down. Research ocean
waves top down and drastically improve." Rebuilt around top-down surf
reference (aerial wave photography): wave sets now march toward shore
as parallel foam bands, brighten and thicken as they approach, break
into wide turbulent lace at the break zone, then swash pushes white
foam up the sand before receding. The water visibly moves up and down.
