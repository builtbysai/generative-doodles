# №1287 "Grandmother's Garden" (jagdeep-raina JR8, PP446)

## Prompt
A low intimate viewpoint: the viewer kneels in a green Canadian garden looking
slightly up at a Punjabi grandmother in a bright sari, her hands in the earth,
rows of leafy plants receding behind her; the whole drawn in loose washes on
paper, framed by a thin phulkari border band. Grounded in Raina's *Memories of
our vast lush, punjabi alluvial plains find themselves resurrected in these
diasporic baghs* (2019) and the Border Crossings note on work carried out by
women's hands. Palette: garden green #4E6B3A, leaf bright #7BA05B, sari
magenta #B02E5C, sari gold #D9A441, earth brown #6B4E33, paper #DCD6C8,
border thread red #A6343C, ground ink #141210. Horizon high (kneeling
viewpoint); grandmother dominates the upper two-thirds, hands at center;
garden rows converge to a high vanishing point; thin phulkari border; no text.

## What was built
- Paper panel full-bleed on ink ground, framed by a dashed red phulkari border
  band with diamond motifs at the four corners.
- Grandmother seen from behind (no face detail): magenta sari drape with gold
  border trim, dark hair bun, arms in a darker sari shade reaching
  down-forward to two hands kneading a brown earth mound at center, with
  seeded soil dots.
- Garden: nine seeded rows of leaf-cluster plants converging to a vanishing
  point at 20% height, tiny at the horizon, larger toward the foreground,
  over soft green wash blobs.
- Motion, all closed-form over piece time and recorded events: leaves sway on
  a 7 s sine with per-plant phase; hands knead on a 2.4 s loop in opposite
  phases; drag upward raises the viewpoint (garden shifts up, horizon rises),
  release settles back with exp decay (tau 0.9 s). Never click-to-reload.

## House adaptations
- Visual Viewport sizing with resize listeners on visualViewport and window;
  canvas pinned in draw() via style width/height in px; phone detection via
  window.screen (min dimension < 700 px) with aspect fallback. Scene is
  full-bleed at all sizes; figure proportions keyed to min(W,H) so desktop
  and phone read alike.
- Deterministic first frame: boot-flagged draw(0); the performance.now()
  clock starts only with the rAF loop (rAF behind a typeof guard).
- Node-canvas limits respected: no gradients, shadowBlur, filters, offscreen
  canvas, or element creation; leaves drawn as single closed paths (never
  batched ellipse subpaths); all randomness from seeded mulberry32 generators.
- No visible text except <title>; no audio; no getUserMedia.

## QA
- Rendered with node tools/render-piece.js at 1280x900, 390x844, 720x720;
  desktop and mobile renders inspected.
- Thumb rendered three times at 720x720: all byte-identical, and identical
  to the shipped thumb.png.
- Mechanics probe (node harness, controlled clock, through the piece's own
  pointer handlers): drag up 300 px moves the garden layer exactly -8.64 px
  (view 0.48); 2 s after release the shift decays to -0.94 px (exp(-2/0.9));
  hand arcs move in opposite phases with the knead sine (+7/-7 px at t=0.6).
- Token scan clean (single grep hit is a comment stating no Math.random).

## Fix rounds
1. Wash helper drew a stray 1 px dot and the earth mound carried a hidden
   full circle behind its flattened ellipse; both removed before first QA.
2. First renders: arm strokes in sari magenta were invisible against the
   drape (redrawn in darker #7E2248); bottom garden row was clipped at the
   frame edge (row span clamped above the border); the figure stretched
   vertically on phones (proportions re-keyed from H to min(W,H) with
   vertical centering). Re-rendered and re-inspected at all three sizes.

## Files
- index.html (md5 7997358e126439f3eb7c572d9e239d60)
- thumb.png (720x720, md5 63344ce304fc77a53943217026958526)
- qa-desktop.png (1280x900), qa-mobile.png (390x844)
