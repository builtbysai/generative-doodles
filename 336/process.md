# No.336 Red Triangle - process notes

## Concept
After Arunima Dazess Wangchuk's 2024 degree-show installation: a
tall red-lit triangular arch stands in a black room, a projected
fire burning inside it, flanked at the base by dark glazed masks
with red-lit eyes. Red is the operating colour and light is the
structural material. The palette holds to six colours only: arch
red, fire orange, ember yellow, mask dark, eye red and room
black, and nothing else is used anywhere in the piece. The piece
is watch-only, with no interaction at all: the fire churns, the
edge light breathes, and the masks never move.

## Construction
- Single self-contained page, canvas 2D, one canvas, no
  libraries. Design space 1280x900, centred fit, page ground set
  to the room black so the letterbox on tall screens is seamless.
- The arch is a triangular frame path, apex near the top of the
  frame, stroked in six layered translucent red passes from a
  wide faint halo to a thin bright core. The alpha of every pass
  follows one combined light value: a breath term completing one
  whole sine cycle in 30s, multiplied by a flicker term read from
  a fixed seeded table of 60 values sampled eight times a second
  and smoothed, the table repeating every 30s. Because both terms
  close at 30s, the frame at 30s is pixel-identical to frame 0.
- The fire is particle data, not an image: exactly 120 particles,
  asserted in the code, drawn inside a path clip of the triangle
  interior. Each particle respawns at the base and rises once per
  its own duration; every duration (3.75, 5, 6, 7.5 or 10
  seconds) divides the 30s loop a whole number of times, and each
  particle's sideways sway completes a whole number of cycles per
  rise, so every particle completes its rise inside the loop's
  flicker cycle. Particle colour steps from fire orange low in
  the rise to ember yellow higher up, size shrinking as it climbs.
  A low translucent fire-bed band glows along the base inside the
  clip. Glow everywhere is layered translucency only: no
  shadowBlur, no filters, no gradients, no offscreen canvas.
- Exactly 4 flanking masks, asserted in the code, two per side in
  a loose row at the base. Each is fixed dark path data: a
  crown-tufted silhouette filled in mask dark, features carved
  with room black strokes (stern angled brows, nose, frown,
  forehead line), drawn every frame in the same place and never
  moving. Their eye points are small filled circles in eye red at
  constant alpha, never touched by the breath or flicker: the
  only constant red in the piece.
- The first frame is already developed: the loop clock starts at
  7.5s, a quarter into the cycle, so the fire is burning
  mid-flicker and the edge light is mid-breath on load. Visual
  Viewport sizing with resize listeners on visualViewport and
  window; canvas pinned by style width and height every frame;
  phone detection via window.screen min dimension under 700px
  with aspect fallback; every requestAnimationFrame call
  typeof-guarded; fixed seeds throughout.

## QA log
- Frames rendered from the actual page script (node-canvas) at
  1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and
  inspected before handoff. Desktop: tall triangle centred, apex
  near the top, fire densest and orange at the base stepping to
  ember yellow near the apex, four dark masks in a flanking row
  at the base with red eye points. Mobile: centred fit holds,
  masks and fire legible, ground seamless. Thumb: composition
  reads at small size.
- First render pass showed the mask brows reading as closed
  happy eyes and the mouth as a smile; brows were redrawn as
  stern angled strokes and the mouth as a shallow frown, and the
  particle halos and fire-bed band were softened. Re-rendered and
  re-inspected after the fix.
- Assertions in code: exactly 120 particles, every rise duration
  dividing the 30s loop, every sway a whole number of cycles,
  exactly 60 flicker table values, exactly 4 masks with exactly
  two per side. All pass at load; the renderer runs the script
  without error.
- Visible copy check: no em dashes, no date strings, no absolute
  URLs, no text or UI in the piece. Hans's real-device check is
  the final gate.
- Files: `336/index.html`, `336/thumb.png` (720x720, rendered
  from the live script), `336/process.md`, plus `336/qa-desktop.png`
  and `336/qa-mobile.png` alongside. Gallery entry belongs in
  pieces.json with the formula date 2002 · 12 · 13.
