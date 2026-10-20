# No.372 Eye-Spiral Tree

## Concept

After Olena Kovalova's (al_kovalyova_design) vyshyvanka Tree of Life:
a symmetric Ukrainian Tree of Life on cream - central trunk with
mirrored branches, eye-spiral flowers (a concentric spiral as the
iris of each flower), flanking birds, and diamond cross-stitch
borders top and bottom. Three tiers of eye-flowers: one large at the
top, two at mid height, three low. The eyes rotate slowly, watchful
rather than psychedelic. Dragging across the tree sways the branches
toward the pointer and spins the eyes faster with drag velocity;
double-tap advances the iris palette while the structure never
changes.

Palette, flat only: ground cream #F5EFE2; trunk and leaves #4A6B4F;
border diamonds #7A5C44; bird outlines #4A2E1E. Iris palettes, three
authored sets cycled by double-tap: (1) teal-ochre-coral - iris
#3AA6A0, ring #C96A1E, petals #B5501E; (2) plum-gold - iris #6B3A5B,
ring #C9A24B, petals #4A2A44; (3) indigo-rust - iris #3E4E7E, ring
#B5501E, petals #D98E4A. The spiral line itself is drawn in the
ground cream so the eye reads on every palette.

## Construction

One canvas, 2D, all marks drawn directly each frame from fixed data.
No offscreen canvas, no filters, no blur shadows, no gradients.

- Symmetry: strict vertical mirror symmetry about x = 640, asserted
  at load. The tree is authored as axis elements plus a right half
  (limbs, leaf sites, one bird, off-axis flowers) and drawn twice:
  once normally, once under a translate-and-negate transform, so the
  left half is the right half reflected, never independently
  computed. The flower set is built by reflection from the half list
  and asserted to hold exactly 6 flowers with a mirror twin for
  every off-axis flower.
- Skeleton: a filled symmetric trunk with root flare and brown
  cross-stitch Xs down its centre, authored limbs as quadratic
  curves, and a recursive branchlet generator (depth 3) seeded from
  three limb tips, forking at fixed data offsets and collecting leaf
  sites at its tips; further leaf pairs are authored along the
  limbs. Leaves are pointed-ellipse shapes in the trunk green.
- Eye-flowers: petal ring of 6 to 8 ellipses (count per flower:
  top 8, mid 7, low 6) in the palette petal colour stroked with the
  ring colour, an outer ring disc, an inner iris disc, and an
  Archimedean spiral (4.5 turns, 90 steps) stroked in ground cream
  with a ring-colour pupil dot at its heart.
- Birds: one outline bird perched on a long twig at the top right,
  facing the axis - stroke-only body, head, beak, wing arc and legs
  in #4A2E1E with a filled eye dot; the mirrored pass produces the
  left bird facing inward.
- Bands: top and bottom bands of 17 diamonds each (centres at
  640 + k*56, k from -8 to 8, symmetric by construction), each
  diamond outlined in #7A5C44 with a cross-stitch X inside, a centre
  dot, spacer dots between diamonds, and stitch dash lines above
  and below the row.
- Loop length: 60 seconds, one seamless master loop. The only
  ambient motion is the eye rotation: every spiral completes
  exactly 2 whole rotations per loop (one turn per 30s), direction
  alternating by tier, so the loop is seamless.
- Determinism: frame one is drawn synchronously at the constant
  phase T = 23.0s into the loop, eyes mid-rotation, sway exactly
  zero and no spin boost. The rAF loop (typeof-guarded) advances T
  from that same anchor in fixed 1/60 ticks. Frame one never reads
  a wall clock.
- Interaction: drag across the tree sets a sway target from the
  pointer's horizontal offset from the axis (shear about the trunk
  base, clamped to plus or minus 0.14); while dragging the sway
  eases toward the target and a spin boost builds from smoothed
  drag velocity (capped at 2.6 rad/s extra). On release the sway
  eases home and snaps to exactly zero below a 0.0004 threshold,
  and the boost velocity decays and snaps to exactly zero, so the
  eyes return to base speed and the branches to exact rest.
  Double-tap (two taps within 0.35s and 30 design px, each under
  0.3s with under 2px of travel) advances the iris palette through
  the three authored palettes. Never click-to-reload. Pointer
  coordinates convert through the stored fit transform (S, OX, OY).
- House rules: Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned every frame via style
  width/height in px; phone detection via window.screen min
  dimension under 700px with aspect fallback (h > w * 1.15);
  design space 1280 x 900, centred fit with the tree in the centre
  of the frame; page ground is the piece's own cream.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png) and 720x720 (thumb.png), all from the
  shipped script.
- thumb.png rendered twice and byte-compared: identical.
- Desktop render inspected: centred mirror-symmetric tree fills the
  middle of the frame; six eye-flowers in three tiers (one large
  top centre, two mid, three low) with coral petals, ochre rings
  and teal spiral eyes; two outline birds flank the top tier facing
  inward from their perch twigs; diamond cross-stitch bands run
  across top and bottom; leaf clusters read along the branches.
- Mobile render inspected: centred fit keeps the whole tree and
  both bands in frame, cream ground continuous to the edges (the
  page ground is the piece's cream), no letterboxing artefacts.
- Load-time assertions pass in the renderer: loop 60s, exactly 3
  iris palettes, exactly 6 eye-flowers with mirror symmetry
  verified, 17 diamonds per band.
