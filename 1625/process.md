# №1625 "Hex Study" (YL2, yi-wen-lin #214, PP872)

## Driver
A plotter drawing a hex lattice one cell at a time; the tap does not redraw
the drawing, it only re-inks it in the next edition.

## Design
After his fxhash "Hex" (2022-12-31 IG post): a near-black field (#0E0E0C)
tiled with a pointy-top hexagonal lattice, roughly 14 cells across, each
cell a hatched parallelogram in cream, teal or rust, the hatch lines fine
and diagonal, the whole lattice read at an angle. Density (line spacing)
and hatch angle vary per cell by seed; about 10 percent of cells stay
empty, letting the black breathe. The lattice draws itself once, cell by
cell, row by row, each cell hatching in over half a second, like the
plotter working; when complete it rests. Tap advances to the next palette
edition (his Hex had 128; this piece cycles a fixed set of twelve), which
cross-fades the same lattice into the new palette over 1.5 seconds.

## Mechanism
Pointy-top hex grid generated once from mulberry32 seed 1625007; the
lattice is never re-seeded, on tap or otherwise. Per cell, in fixed
rng order: empty flag (10 percent), palette slot (cream 38 percent,
teal 34 percent, rust 28 percent), hatch angle (-50 to -10 degrees),
line spacing (0.16R to 0.38R), stroke alpha (0.85 to 1.0). Hatch lines
are parallel diagonals clipped to the hex path, so each cell reads as a
hatched parallelogram; a faint outline in the same ink (0.28 alpha)
marks the cell edge. Draw queue: cell i starts at i * 120 ms and hatches
in over 0.5 s, the first p fraction of its lines drawn, so a cell visibly
hatches in. Cells not yet reached show a faint ghost outline (0.20
alpha) so the whole lattice reads from frame one while the hatching is
still the plotter's work; empty cells never get a ghost outline and stay
black in every edition. Tap (pointerdown only, no drag handlers) advances
the edition, cross-fades over FADE_S = 1.5 s with a smoothstepped alpha,
and persists the edition index in guarded localStorage (key
doodle-1625, try/catch, never throws). A ?edition=K query parameter
previews that edition without touching storage; it exists for QA.
Reduced motion draws the completed lattice once, and a tap switches
editions instantly with no fade. No Math.random, no wall clock anywhere;
all motion is a closed-form function of piece time.

## Twelve-edition palette table
All muted, modeled on the cream / teal / rust family. Each row is
[light, teal, rust]:

1.  #E8E0C8 #5FB8A8 #C1552E (spec palette)
2.  #EFE3C8 #4E9E8E #B0522A
3.  #E3D9B8 #6FAFA0 #C96A3A
4.  #EDE0C0 #58A898 #A84A28
5.  #DDD2B4 #7AB5A6 #CE6B40
6.  #F0E8D8 #4A8F86 #B85A30
7.  #E6DCC2 #63B0A0 #C46236
8.  #DCCFB0 #55A08F #A8522C
9.  #E9DFC6 #6BB3A2 #CC5F32
10. #E0D4B2 #4C968A #B04E26
11. #EFE7CE #72B3A4 #D06A3E
12. #D8CDB2 #5A9E90 #9E4A2A

## Frame-one determinism
Frame one is drawn synchronously at t = PHASE, where PHASE =
floor(N * 0.75) * 0.12 + 0.5 seconds, N being the cell count for the
current field: the queue is three quarters complete, with a few cells
mid-hatch and the rest ghosted. All cell parameters are pure seeded
functions of the fixed seed, and the edition at load is the stored one
(edition 1 on a fresh render), so the first frame is byte-reproducible.
Verified: two independent 720x720 thumb renders have identical md5
(03bbe457e748f25c3755b07dc1d6fd76).

## Tap probe
Rendered edition 4 via ?edition=3 and compared against the edition 1
thumb with an ink-mask comparison (pixel counts as ink if any channel
differs from the #0E0E0C ground by more than 2 levels). Excluding the
title plate, whose edition digits differ by design: 114,870 ink pixels
changed color, and the ink masks agree except for 645 pixels, all
within 4 levels of the ground, which is sub-pixel anti-aliasing
rounding at ghost-outline edges (more of them than the round 1 probe's
101 because the brighter 0.20 ghost puts more edge pixels near the
ink threshold). Geometry is identical; only the palette changed. The
edition label in the title block reads EDITION 04 / 12 in the edition
4 render. Re-run after fix round 2 (ghost alpha 0.10 to 0.20, phase
0.66 to 0.75); index.html md5 aa5470bf6351f7a28e858cc374e41477.

## Deviations
- Ghost outlines for not-yet-drawn cells (0.20 alpha after fix round
  2; 0.10 at first build): the spec's row by row draw at three quarters
  complete left the bottom quarter of a tall phone field as a dead
  black void in the first renders, and the 0.10 ghost was too faint to
  register. The ghost grid keeps the whole lattice readable from frame
  one while the hatching remains the plotter's work; empty cells are
  unaffected.
- Edition count is twelve fixed palettes, not 128: the task brief fixed
  the set at twelve.

## Fix rounds
- Round 1: first renders showed the phone field's bottom third as pure
  black at frame one. Added the ghost outline for queued cells and
  re-rendered all three sizes; desktop, mobile and thumb now read as a
  complete lattice with the lower rows still filling in.
- Round 2 (2026-11-08, fly gate): the 0.10 ghost still did not land
  visually, the mobile 390x844 frame one read as a dead black void in
  its bottom ~45 percent. Raised the ghost-outline alpha from 0.10 to
  0.20 and the fixed frame-one phase from 0.66 to 0.75 of the draw
  queue. Re-rendered all three sizes: the pending grid now reads
  clearly on mobile (no dead black lower half) and on desktop, the
  lattice reads at ~14 cells across, empty cells stay black in every
  edition. Thumb re-rendered twice, byte-identical md5
  03bbe457e748f25c3755b07dc1d6fd76; index.html md5
  aa5470bf6351f7a28e858cc374e41477. Tap/edition probe re-run, geometry
  identical across editions.
- No other fixes. Legibility, clipping, palette mutedness and empty
  cells all passed on first inspection.

## House rules
Visual Viewport sizing with listeners on visualViewport and window;
canvas pinned in draw() via style width/height in px; phone detection
via window.screen with aspect fallback; square field-like lattice,
full-bleed on phones, centred square (0.96 of min dimension) on desktop
with the page ground the same near-black; one synchronous frame at load;
requestAnimationFrame guarded by typeof check; reduced-motion support
(static completed frame, instant edition switch). Title "Hex Study",
date "2006 · 06 · 24" (formula date 2002-01-10 + 1626 days), edition
label "EDITION 01 / 12", hint "Tap for the next edition." Title, date,
edition and hint sit on dark plates over the lattice so the cream copy
reads at every size. No em dashes in visible copy.
