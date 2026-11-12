# №1716 "Dune Hatches" (PP963, EXPANSION #225 goodbad-png) - process notes

## Spec
Built from ~/workspace/goals/generative-doodles-backfill-from-9067/hidden_files/BATCH-1712-1716-SPEC.md,
№1716 section. Gallery date 2006 · 09 · 23. Gallery note: "Teal dashes fan from a flexing
spine over cream. Watch only." Template: live №1711 index.html, fetched via fetch-blob.

## Build
Canvas 2D only (p5.js-to-2D substitution per house rules). A central spine is a quadratic
Bezier running diagonally from the lower-left edge to the upper-right edge; its control
point flexes as a closed-form function of piece time (16 s period), so the spine slowly
flexes like a leaf in wind. 2,400 short teal dashes fan from the spine: each dash is
positioned perpendicular to the spine at a seeded station u and distance fraction f, with
length and alpha falling off with distance. Hatches are redrawn every frame as a pure
function of the spine's current shape; only seeded parameters (u, side, f, jitter, length,
alpha, dot flag) are stored, no hatch positions or frame-integrated state. Three long
coral arcs sweep high over the fan, flexing slightly with the same period. Tiny dotted
noise rides on about 22% of the dashes. Watch-only; no interaction handlers.

Palette (hand-picked from the prompt's named colors): cream ground #F6F0DF, teal dashes
#0E7C7B, deep teal #0A5E5D, coral arcs #E85D3D.

## Deviations
- The spec's "f17 exact" palette codes have no study file to resolve them from:
  studies/goodbad-png.md does not exist in the repo (the studies/ dir holds only 7 files,
  none for goodbad-png). Hexes are hand-picked from the prompt's named colors (teal dashes,
  coral arcs, cream ground), as №1704-1711 did for aaron-penne. No study file was invented.
- No other deviations. Dashes are short segments only, never full-length lines; the fan is
  dense on the lower side of the spine and thins toward the upper side; the spine is never
  drawn as a straight line.

## Frame one
Fixed phase t = 3.0 s of a 16 s period. Spine control point at (0.537, 0.668) in stage
fractions, i.e. near full flex (sin(2*pi*3/16) = 0.924), so the bow is legible and the
density gradient (dense near the spine, thinning outward) reads. Deterministic: seeded
mulberry32(1716) only; no Date.now() or Math.random().

## QA
Rendered from the actual script with node ~/workspace/tools/render-piece.js:
- Desktop 1280x900: spine visibly bows across the square stage; dense teal fan below the
  spine thinning toward the upper side; three coral arcs sweep over the fan; title plate
  "Dune Hatches / 2006 · 09 · 23" and "Watch only." hint plate legible.
- Mobile 390x844: full-bleed; spine curves diagonally, fan dense below, arcs at top;
  plates legible, no overlap with the composition.
- Thumb 720x720 (thumb.png IS this render): same as the desktop square, spine bow and
  density gradient legible at thumbnail size.
First gate found the spine nearly straight (control offset too small) and the dense fan
too evenly spread; fixed by raising the control-point flex amplitude (y 0.52 +/- 0.16) and
biasing dense-side distances toward the spine (pow(rng, 1.3)), then re-gated all three
sizes. No post-gate edits.
