# Doodle №9005: Strata (2026-09-06)

**File:** `9005/index.html` (self-contained, three.js 0.160 via CDN import map)

## Concept
The gallery's first true 3D piece. An imaginary terrain sliced the way a
museum cuts a landscape model: 9 to 12 translucent elevation sheets floating
in a dark studio, each one glowing along its contour edge, with a single
warm amber layer buried mid-stack among the ink blues. The camera turns on a
slow turntable; you can drag to orbit and scroll to zoom. A pool of studio
light glows under the stack and dust motes drift through the air.

## Technique synthesis (from study, not copied)
- **From the Codrops instancing study:** one geometry, many draws. Every
  slice shares a single plane; only the shader uniforms differ per layer.
  The per-layer work happens in a fragment shader, not in geometry.
- **From the Awwwards WebGL survey:** pacing is the premium. The orbit runs
  at 0.07 rad/s (a full turn takes about 90 seconds) and each slice bobs on
  its own slow sine so the stack feels suspended, never mechanical. Also the
  fallback habit: if WebGL is missing, the page draws a flat 2D strata map
  from the same elevation field instead of dying.
- **The volumetric trick:** each slice is a full 10x10 sheet, but the shader
  discards everything below its elevation threshold and draws a bright band
  exactly at the contour line. From above you see nested glowing coastlines;
  from the side you see the stack. No marching-squares geometry needed.

## Terrain
One recipe, widely parameterized: island fbm with a seeded dash of ridged
noise (0 to 45 percent blend), domain warp, seeded frequency and falloff.
Normalization happens before the radial edge fade so low slices keep an
organic footprint instead of a square one. Two box-blur passes keep the
contour lines clean.

## Seeds tried
Rendered and compared five seeds headless (software WebGL via SwiftShader):
20260906, 9005, 424242, 777, 1234567.

Two iterations. The first read as a flat blue blob: camera too high, slices
too many and too opaque, plinth lip drawing a stray arc across the frame.
The second pass cut slices to 9..12 at 0.18 opacity, raised vertical
exaggeration, dropped the plinth for a light pool, and moved the accent
layer to mid-stack where it stays continuous instead of fragmenting.

Default seed 20260906 won: the warm layer sits broad and central like a lit
stratum, the side view shows real stacking, and the top fragments read as
small floating islands. 1234567 was weakest (accent broke into patches) but
still in-family; every seed stayed elegant, none collapsed.

## Verification
- Headless Chromium CDP at desktop and 390px mobile: no overflow,
  composition holds at both
- Zero console errors on load and on click-regenerate
- Click/tap regenerates: verified via CDP input dispatch
  (?seed=20260906 became ?seed=759167187, scene rebuilt)
- Thumbnail 720x720 clipped from the stage at the default seed

## Polish pass (2026-09-23)
Two targeted changes, concept/seed/layout untouched:
- Camera: initial polar angle 1.02 -> 0.84 rad (~42° above horizon, was
  ~31°). The opening frame is now a 3/4 elevated view, so the translucent
  stacked sheets and glowing contour edges read immediately instead of
  opening on the top-down blob view. Drag-orbit, zoom limits, and the
  seeded opening azimuth are unchanged.
- Brightness: slice fragment shader color multiplied by 1.18 (+18%), so
  the ink-blue layers separate from the black ground on phone screens.
  Dark studio mood kept; no tone-mapping or palette changes.
- Re-verified headless (xvfb + CDP, SwiftShader, isolated port 9333):
  desktop 1280x1000 and 390x844 mobile, zero console errors, no
  scroll/overflow at either viewport, click regenerates (?seed= ->
  ?seed=806217161, scene rebuilt).
- thumb.png re-rendered from the new composition (720x720, square stage
  clip at the default seed); final screenshots saved to
  hidden_files/9005-polish-desktop.png and 9005-polish-mobile.png.
- Noted (pre-existing, out of scope): at desktop widths the flex column
  shrink-to-fit makes the stage slightly non-square (760x657 at
  1280x1000) so the whole page fits with no scroll; camera.aspect adapts,
  so the 3D render itself is undistorted. Mobile 390px stays square.
