# №1315 "Chromatic Ground" — process notes

Leslie Hewitt LH4 (PP482), diptych: a dechromatized B&W Riffs stack against a
golden Chromatic Ground photogram. The pairing asks after the colors that are
NOT visibly present in the B&W photograph.

## Frame one (t = 0, boot flag)

Left panel: black ground, centered grayscale stack at 60% of panel width —
shellac-dark wood floor with grain streaks and knots, a document rotated ~4
degrees with fold line, ink scrawl doodles, and a jagged torn edge, and a
snapshot rotated -7 degrees from the document with white border, soft gray
blobs (abstract figures, pearls, grill — never a real photo), and flat-alpha
drop shadows from simulated height offsets. Right panel: deep amber field
with layered gold and cream washes, flat-alpha light-leak bands at the edges,
near-black vignette bands, and a thin cream paper-edge frame. The checked /
gingham pattern sits at zero opacity at t = 0 (it fades in over the first
25 s of the 75 s loop). A hairline seam divides the two panels; two objects,
not one image.

## Motion

Watch-only, 75 s loop on the right: gold washes drift on slow sines, cream
washes breathe, the checked pattern fades in (0–25 s), holds (25–50 s), and
fades out (50–75 s). The B&W panel is still except for a slow grain shimmer
(seeded flecks, alpha breathing on a 0.6 rad/s sine). Drag horizontally
shifts the seam (clamped to 32–68% of width); on release the seam decays
back to center with tau 1.2 s. Seam offset is a closed-form function of the
recorded drag events and piece time. Never click-to-reload.

## Determinism

Frame one draws synchronously at exactly t = 0 via a boot flag; the
performance clock starts only with the rAF loop. All grain, wash, leak, and
check layouts come from seeded mulberry32 streams (seed 1315000 and
derivatives), never Math.random. Loop reseeds advance per loop index.

## Adaptations

- Light washes, light-leaks, and vignette are layered FLAT ALPHA shapes —
  no gradients anywhere (the QA renderer cannot render gradients reliably).
- All right-panel washes, leaks, and checks are clipped to the right panel
  so nothing bleeds over the seam (first render had gold ellipses crossing
  into the black panel; fixed with a clip rect).
- On narrow panels (phone portrait, panel under 300 px) the stack widens
  from 60% to 85% of panel width so it stays legible; desktop keeps the
  specced 60%.
- The rAF loop is a plain function declaration behind a typeof guard
  (№1278 lesson). Token scan clean of Math.random, createElement,
  AudioContext, getUserMedia, gradients, shadowBlur, filters.

## Verification

Rendered at 1280×900 desktop, 390×844 mobile, 720×720 thumb; all three
inspected. Forced-time probe at t = 37 (temp copy, discarded) differs from
frame one in 229,249 of 518,400 pixels — washes drifted, checked pattern at
full hold alpha, grain shimmer moved — confirming the loop runs. Thumb
rendered four times total (three fresh plus the shipped thumb), all
cmp byte-identical. Final md5 of index.html:
235299ffd634f15e9b658232d4b23eeb.
