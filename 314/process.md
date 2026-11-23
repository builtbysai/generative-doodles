# No.796 — Toile Cirée

EXPANSION #97 niele-toroni, prompt block PP5 "Toile Cirée" (verified verbatim from TASKS.md).

## Concept

Toroni's imprints of a No. 50 brush, repeated at regular intervals since 1966, here laid on the strangest of his supports: toile cirée, waxed fabric. The painting system does not change; the material does. A near-black waxed ground carries a dense brick-offset grid of ochre imprints, each dab squarish, streaked with bristle marks, denser where the brush first pressed, with a thin gloss line of wet paint along its top edge. The imprints never move. What moves is the wax: a slow oily sheen crosses the field diagonally, so the support breathes while the system holds. A folded hem at the bottom-right corner, the fabric's edge turned back, sells the material. No second color, no photographic texture, nothing legible anywhere.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets. Strict palette: waxed ground #14120E, imprint ochre #D9A441, sheen #3A342A. No visible text except the `<title>`.
- Layout is a pure function of frame size, rebuilt deterministically on resize: a mulberry32 stream seeded 79650 generates the grain (thousands of tiny sheen-tone specks at alpha 0.03–0.13, plus sparse ochre micro-flecks), then the imprint grid: step tied to the smaller frame dimension, alternate rows offset by half a step (brick offset), each dab carrying seeded jitter (rotation about ±2°, scale ±5%, alpha ±10%) and 7–12 precomputed bristle streaks biased toward its top edge.
- Each dab is drawn as a rounded rect, a denser paint-load pass over its top third, ground-coloured hairline streaks cut through it (stronger near the top, drier toward the bottom), and a thin full-alpha ochre gloss line at the top edge.
- Sheen construction: the sheen is four nested flat-alpha bands of #3A342A, each the intersection polygon of the frame with a diagonal strip x+y between two values (computed by Sutherland–Hodgman clipping against the two half-planes), stacked widest/faintest (half-width 0.30 of the field diagonal, alpha 0.06) to narrowest/strongest (0.07, alpha 0.17). No gradients, no shadowBlur, no filter, no offscreen canvas: the softness comes from the layered alphas alone. The band centre sits at diagonal coordinate 0.34 + 0.30·sin(2πt/12), so at t=0 the band is already present across the upper-left of the field, and it sweeps back and forth on a 12 s period inside the 30 s loop. The sheen is drawn over the ground and grain but under the imprints: the paint sits on the wax.
- Folded hem: bottom-right corner. A ground-tone shadow triangle just inside the fold line, the flap itself as a flat #3A342A triangle (the fabric's underside) folded inward along the corner diagonal, a sliver of an ochre dab that landed half on the flap, and a thin ground-tone fold edge line. All flat shapes.
- Sizing from the Visual Viewport API with resize listeners on both visualViewport and window; canvas style width/height pinned in px inside draw(). Phone detection via window.screen physical size (min dimension < 700px), aspect fallback h > w*1.15; on phones the grid step widens slightly (fewer, larger dabs) and the field stays full-bleed.
- Determinism: frame one is a synchronous draw(0) at load; no Date.now or wall clock anywhere; animation runs from the rAF timestamp (typeof-guarded) and the sheen is closed-form in t. Resize redraws frame one at t=0.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice, cmp byte-identical. Passed (re-verified after the sheen-alpha adjustment below).
- Read-back, desktop: near-black field, dense brick-offset ochre dab grid with visible bristle streaks and top-edge gloss, broad diagonal sheen passage across the upper-left, folded hem triangle at the bottom-right corner. Nothing clipped.
- Read-back, thumb: same composition at square format; the sheen band reads clearly at t=0 (initially too faint, band alphas raised from 0.05/0.07/0.10/0.13 to 0.06/0.09/0.13/0.17 and all renders redone).
- Read-back, mobile: full-bleed field holds in the tall frame, dab grid dense but legible, hem small at the corner, nothing essential clipped.
- Palette audit: only #14120E, #D9A441, #3A342A and their alpha composites appear. No text besides the title. No audio, no interaction handlers (watch-only).

## Deviations

- Sheen sweep shape: the prompt pairs a 12 s sheen period with a 30 s seamless loop; 12 does not divide 30, so a one-way travelling band would either jump at the loop join or have to start off-field, and the brief requires the band present in frame one. The band therefore oscillates sinusoidally (sweeps across and back) on its 12 s period, which is position-continuous at every multiple of 30 s and keeps the band in frame at t=0. The wave, the period, the diagonal direction, and the fixed imprints are all as specced; only the travel is back-and-forth rather than wrap-around.
