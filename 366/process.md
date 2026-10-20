# No.366 Lobster Stripefield

## Concept

After Julianne Haness's (jmarie.creates) "Modern Nautical"
lobsters and her "Swans and Stripes" series, the pieces where
she said the motifs "needed some bold stripes". Bold horizontal
stripe bands are the entire ground field, and hand-drawn
lobsters are stamped along the stripe boundaries, each one
centred on a boundary line so it overlaps both neighbouring
bands. The whole field drifts slowly sideways like a tide,
the lobsters riding the bands they sit on. Watch-only drift,
drag to pan the repeat, double-tap to flip the stripe palette
between the nautical and sunset colourways.

## Construction

One canvas, one hand-authored lobster vector, everything else
fixed tables. Flat colour only: no gradients, no shadowBlur,
no filters, no offscreen canvas, no text or UI.

- Stripes: 6 bands per tile with fixed heights
  (150, 120, 180, 140, 200, 130), asserted to sum to the
  920px tile height. Six is even, so every tile starts on the
  first stripe colour and the alternation never breaks at a
  seam. Bands are drawn as crisp full-width rectangles, never
  wavy, tiled vertically over the pan range.
- Lobsters: exactly 10 per tile (asserted), placed from a
  fixed table: boundary index, x inside the 640px horizontal
  period, facing sign, vertical flip, tilt (asserted within
  20 degrees) and scale. The vector is drawn in local coords,
  head toward +x: three-lobe tail fan, tapered abdomen with
  four segment arcs, bulky thorax with faint groove detail,
  rostrum spike, stalked eyes, four leg pairs (body-colour
  stroke with an ink centre line), two antenna pairs, and two
  unequal claws, the upper the bigger crusher, the lower the
  slimmer cutter, each an open pincer with a tapering fixed
  finger and a curving thumb.
- Palettes: exactly 2 (asserted), flipped by double-tap.
  (A) Nautical: stripes navy #1E3A5C and cream #F5EEDC,
  lobster body coral-red #C9403B, detail ink #7E211C.
  (B) Sunset: stripes coral #E2703A and teal #2E7E7B,
  lobster body navy #1E3A5C, detail ink #0E1F33.
- Motion: one seamless 36s master loop. The drift travels
  exactly one lobster period (640 design px) per loop, so
  frame 36s is pixel-identical to frame 0; the bands are
  uniform along x, so the slide is carried by the lobsters
  parented to their band edges.
- Determinism: frame one is drawn synchronously at the
  constant phase T = 11.0s (drift mid-slide, about 196px
  in), and the rAF clock is anchored to that constant plus
  elapsed time in fixed 1/60 ticks, never a wall-clock
  offset. The thumbnail reproduces byte-identically.
- Interaction: drag pans the oversized repeat, clamped to
  one period in each axis, position persisting on release;
  a tap under the drag threshold twice within 0.38s of the
  piece clock and 60 design px flips the palette. Never
  click-to-reload. Pointer coords convert through the
  stored cover transform (S, OX, OY).
- House rules: Visual Viewport sizing with resize
  listeners on visualViewport and window, canvas pinned
  every frame via style width/height in px, phone
  detection via window.screen min dimension under 700px
  with aspect fallback, cover-fit full-bleed field at the
  1280x900 design space, rAF typeof-guarded, fixed seeds
  (all data is literal tables), no em dashes, no absolute
  URLs.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop),
  390x844 (qa-mobile) and 720x720 (thumb), all inspected.
- Desktop: crisp navy and cream bands run edge to edge;
  lobsters sit centred on the boundaries overlapping both
  bands, at mixed facings, tilts and scales. The vector
  reads unmistakably as a lobster: segmented abdomen, tail
  fan, sweeping antennae, stalked eyes, jointed legs and
  open claws.
- Fix during QA: the first claw pass read as a rounded
  paddle, the fingers buried in the palm silhouette. The
  palm was narrowed and both fingers lengthened with a
  wider gape, so the pincer notch reads at gallery size.
  All renders redone after the fix.
- Palette B probe (temporary copy with the palette index
  set to 1, not shipped): navy lobsters stay legible on
  both the coral and the teal bands, detail ink visible.
- Thumb: rendered twice from the shipped script,
  byte-identical (md5 5f2357dad1be52e8c1b037282ea3eac8).
- Mobile: cover-fit centre crop at 390 wide, bands and
  lobsters large and undistorted, field runs off every
  edge, no letterboxing.
