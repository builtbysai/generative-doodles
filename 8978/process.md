# Doodle №8978: Mud Map (2026-08-24)

**File:** `8978/index.html` (self-contained, canvas 2D, no dependencies;
hand-rolled OKLCH → linear sRGB → sRGB conversion, per-hue gamut clamping
via binary-searched max-chroma table at L 0.66)

## Concept
A color-theory diagram of the palette-maker's ugliest rule: certain hue
regions are dead ground where color goes to mud. The piece draws the OKLCH
hue wheel at L 0.66 on a dark ground, marks three named mud zones as
hatched, darkened sectors (brown-olive 68–115°, sick-green 115–158°,
corpse-cyan 158–205°), then scatters 260 random colors across the wheel.
Every color trapped in a mud zone draws its escape: a short curved arc to
the nearest zone edge, brightening along the path to a chroma-boosted
(+0.12) glowing dot that lands exactly on the boundary line. The arcs all
bow outward and converge on the four zone edges, so the escapes read as a
migration fleeing the dead regions, not noise. Zone names sit inside the
dark inner disc with leader ticks to their zones; cardinal hue letters
(R Y G C B M) and degree ticks ring the wheel. On load the escapes bloom
outward from each zone's center as a migration wave (~1.5s);
`?still=1` or reduced-motion shows the finished frame. Click reseeds the
scattered colors and their escapes (the wheel itself is the fixed map).

## Seeds tried
- 89780824 (default): most even coverage across all three zones; dense
  fans in brown-olive, clean convergence in sick-green and corpse-cyan.
  **This one won.**
- 424242: handsome corpse-cyan fan but a visible gap mid-zone in
  brown-olive; rejected.
- 20260824: strong brown-olive, slightly sparse corpse-cyan; rejected.

## Iterations
- v1: zone names drawn as rotated arc text on the zones; the two left-side
  labels collided with each other, and the offscreen wheel layer (opaque
  black where undrawn) showed as a visible square on the page ground.
  Fixed by filling the offscreen with the ground color first and moving
  zone names to upright labels inside the inner disc.
- v2: arcs were too thin to read as migration. Thickened the gradient core,
  added an under-glow pass, enlarged the escaped-color end dots, raised
  the chroma boost to +0.12.
- v3: the "OKLCH" center label collided with the corpse-cyan zone label;
  moved the center label to the top of the inner disc.

## Verification
- Rendered headless via CDP on isolated port 9335 at 1280×800, 1440×900,
  and 390×844: no scroll or overflow at desktop or mobile; composition
  holds at 390px.
- `cdp_exceptions.py` exit 0: zero console errors/exceptions.
- Mid-animation frame (0.45s) confirms the migration wave: arcs bloom
  from zone centers toward edges.
- Thumbnail `thumb.png` is exactly 1280×800 (bare-mode capture of the
  stage, seamless on the page ground color).
