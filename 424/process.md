# No.424 Mood Boosters

## Concept

After Kitty O'Rourke's monthly Mood Boosters series: a 2x2 grid of
pocketable joy vignettes on one canvas, reading as a calendar page on
cream. Top-left a bright sun in sunglasses over sunny yellow; top-right
a woman whose deep pockets overflow with flowers, on teal; bottom-left
a beach day-trip (striped towel, dripping ice cream, a small sun of its
own) on coral; bottom-right a woman under a polka-dot umbrella in
April showers, on rain sky. A slim header strip reads MOOD BOOSTERS ·
MAY in caps (the prompt's dash rendered as a middot per the house
no-em-dash rule), flanked by two small flowers. A hand-lettered caption
sits under each scene: "brighter days are coming", "always happy with
decent pockets", "beach day-trip" (the prompt gives the beach cell no
caption, so the prompt's own description words stand in, fly-resolved
and replaceable), "keeping dry in the April showers". Black outlines
on every shape, per her grammar in this set. Kitty O does not sign
these pieces, so there is no signature; all lettering is hand-lettered
stroke paths, never system fonts.

## Construction

One canvas, design space 1280x900, full-bleed cover-fit. Flat colour
only; no gradients, no shadowBlur, no offscreen canvas anywhere.

- Layout: outer margin 24 on the cream page (the set's cream #FFF6E8,
  as in No.419 and No.420), a 56px header strip, then two rows of
  cells 607 wide. Each cell is a 318px scene panel with an ink
  outline, clipped, over a 64px caption zone on the cream. Each cell
  owns its ground (sunny yellow, teal, coral, rain sky); grounds
  never mix across cells, only the shared accents (sun, flowers,
  umbrella pink, rain blue, ink, plum lettering) recur.
- Stagger table: the ambient loop is 36s and each cell runs its
  micro-motion on its own staggered phase, lt = (T + offset) mod 36,
  with asserted offsets:

  | cell | vignette | offset | micro-motion |
  |------|----------|--------|--------------|
  | 0 | sun | 0s | ray group rotates one whole turn per loop; lens glint pulses on 18s (two per loop); clouds drift on 36s |
  | 1 | pockets | 9s | ten pocket flowers (five per pocket) sway on 12s, phase-stepped per stem |
  | 2 | beach | 18s | small sun's rays turn on 36s; clouds drift on 36s; ice cream drips one drop per 9s of cell time (grow, fall, land, fade) |
  | 3 | rain | 27s | 44 rain streaks fall whole wrap ranges per loop; umbrella twirls on 9s; puddle splashes cycle on 3s |

  Every sub-period divides 36s exactly, so the loop wraps seamlessly.
- The sun's sunglasses are two ink rounded-rect lenses with a bridge
  and temple arms; the glint is two white slashes per lens, clipped to
  the lens, at an alpha of sin^8 over the 18s glint cycle.
- Both women share one minimal recipe (ink hair mass, white face with
  closed-eye arcs, smile and pink cheeks, white dress) built only
  from palette colours, since the set palette carries no skin tone.
  Arms are drawn as a fat ink stroke under a white stroke, which
  reads as an ink-outlined limb.
- Rain is a fixed table of exactly 44 streaks (asserted), scattered
  once from a fixed seed; each streak falls 2 or 3 whole wrap ranges
  (panel height + 40) per loop, so positions repeat exactly at the
  seam. The umbrella canopy is a scalloped half-disc path, clipped
  for its white dots, rotated about its crown by the twirl; the
  handle and the holding hand stay readable under it.
- Lettering is a tiny hand-lettered stroke glyph table: capitals in
  a unit box, lowercase sharing the box with baseline at 1.0,
  x-height at 0.35, ascenders to 0 and descenders to 1.35. Header,
  the middot, and all four captions are stroked path data drawn each
  frame; captions auto-shrink to fit their cell width.
- Determinism: frame one is drawn synchronously at the constant
  phase T = 13.7s (sun part-turned, flowers mid-sway, the drip
  mid-fall, rain mid-fall, umbrella mid-twirl); the clock is anchored
  there and advances in fixed 1/60 ticks from the rAF timestamp,
  typeof-guarded. Frame one never comes from a wall clock, so the
  thumbnail reproduces byte-identically.
- House rules: Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned via style width/height in
  px every frame; phone detection via window.screen (min dimension
  under 700px, aspect fallback). Watch-only: no pointer handlers at
  all. Fixed data only, no Math.random at draw time, no em dashes,
  no absolute URLs.
- QA probe (house seed pattern, not shipped behaviour): ?seed=late
  starts the clock at T = 30.25s so the second lens glint, the drip
  reset and the rain wrap can be render-checked.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png) and 720x720 (thumb.png). Thumb rendered
  twice from the shipped script: byte-identical (md5 445ffc57...).
- Desktop: the calendar read is immediate; the header is legible with
  its middot and flanking flowers; all four captions are legible hand
  lettering, including the hyphen in "beach day-trip" and the capital
  A in "April". The sun reads at a glance with hills, clouds and
  shades; the pocket woman's two flower-filled pockets read clearly;
  the beach cell holds its towel, two-scoop ice cream with the drip
  mid-fall, shells and starfish; the rain cell's dotted umbrella,
  streaks and puddle all read.
- Probe: ?seed=late shows the sun turned to a new angle with temple
  arms out, the rain field redistributed, the drip back beside the
  scoop, and the umbrella twirled the other way; all four cells stay
  clean at the late phase.
- Fixes during QA: the pocket cell's ground line ran straight
  through the woman's shoes and read as a bar through her feet; it
  now stops either side of the figure. The beach cell's second shell
  was first drawn as a plain white circle and read as a stray ball;
  it is now a small spoked shell fan matching the first.
- Mobile: cover-fit centre-crops the grid on a portrait phone, as
  specced for this full-bleed piece; grounds and captions crop
  symmetrically around the page centre.
- Palette verified closed against the spec: the four grounds, sun
  yellow and rays orange, flowers pink and white, umbrella pink,
  rain-drop blue, ink, plum lettering, and the set cream only. The
  only banned-term hit in the file is the header comment noting
  their absence.
