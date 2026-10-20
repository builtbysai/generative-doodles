# No.361 Goldline Poppies

## Concept

After Julianne Haness's (jmarie.creates) best seller
"Dramatic Deco Poppies", golden colorway: oversized flat
poppy heads at wallpaper scale, deep teal petals with
every edge traced in a thin flat gold contour, on a
near-black ground. The flowers are the field: a half-drop
repeat of heads about a third of the frame wide, stems
barely visible in the gaps. Watch-only slow bloom pulse,
drag to pan the repeat, double-tap to flip to the golden
colourway (gold petals, teal contours, same ground). The
gold is a flat stroke colour, never a metallic gradient.

## Construction

- One canvas, design space 1280x900, cover-fit full-bleed
  field. Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned every frame via
  style width/height in px; phone detection via
  window.screen min dimension < 700px with aspect fallback.
- Palette is exactly three flat colours: teal #2E7E7B,
  gold #C9A24B, ground #0E1216. Two authored colourways
  asserted in code (fill/line swap only).
- Lattice: columns step 400px, rows step 300px, odd columns
  dropped half a row; 64 heads authored over an oversized
  range so the clamped drag pan (plus/minus 260 x, 180 y)
  never uncovers an edge. Per-head rotation, scale
  (0.92-1.08) and pulse phase come from a fixed seeded
  table (seed 3610127), consumed in a fixed order at load;
  nothing is runtime random.
- Each head: a barely visible stem stub, a back layer of
  5 wide bezier-lobe petals (three scalloped lobes per
  edge, filled flat, stroked 2.6px, plus an inner contour
  line at 0.7 scale), a front layer of 4 smaller petals,
  and a ground-colour heart ringed with 12 gold stamen
  ticks and 7 seed dots. Petal half-widths were slimmed
  during QA (0.52R back, 0.36R front) so petals separate
  with dark notches and read as poppies, not blobs.
- Motion: one seamless 24s master loop. The bloom pulse
  rotates each head's petals by plus/minus 3.2 degrees
  (alternating per petal) and swells the head by 3
  percent, sine phase per head from its lattice position,
  whole cycles only, so frame 24s is pixel-identical to
  frame 0.
- Determinism: frame one is drawn synchronously at the
  constant phase T = 9.4s into the loop (pulse mid-swell),
  and the rAF loop (typeof-guarded, fixed 1/60 ticks) is
  anchored at that constant plus elapsed time. No
  wall-clock phase anywhere.
- Interaction: drag pans (pointer coords converted via the
  stored cover transform S, OX, OY; pan persists on
  release); a tap under 14 design px within 400ms counts
  toward a double-tap inside 350ms, which flips the
  colourway. No text, no UI, no offscreen canvas, no
  gradients, no shadowBlur.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and
  720x720 (thumb.png); all three inspected.
- Thumb rendered twice: byte-identical, before and after
  the petal slimming fix.
- First render pass: petals at 0.60R half-width overlapped
  into cabbage-like masses; slimmed to 0.52R (back) and
  0.36R (front) and re-rendered. Petals now separate,
  hearts and stamens read, the poppy silhouette is clear
  at all three sizes.
- Desktop: dense half-drop wallpaper field, gold contours
  crisp, stems just visible in two gaps. Mobile: dramatic
  full-bleed crop, no letterboxing, ground continuous.
  Thumb: poppies legible at gallery size.
- Palette audit: the file contains exactly the three
  specced hexes and no others; no em dashes.
