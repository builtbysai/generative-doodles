# №1986 One Eye Stays Sharp

Prompt code: MC3 / PP1233. Study #259 mateo-villanueva-brandt.
Gallery date: 2007-06-20, shown as "2007 · 06 · 20".
Interaction cue: "Drag to tilt the water."

## What the piece does

An extreme close-up of a face seen through rippled water, filling the
frame. The face is drawn once onto an offscreen canvas, then blitted
back in horizontal strips displaced by layered slow sine waves, so
features smear and double. A second phase-shifted pass at low alpha
gives the doubling. The mouth is drawn as a wide wavy band, so it
stretches into wave geometry. One vivid blue eye sits at the golden
point (0.618 W, 0.382 H). It is drawn last, directly on the main
canvas, with no term of t, over a feathered unwarped patch of the
face, so it stays perfectly sharp while everything around it moves.
Faint ripple rings and two caustic streaks drift over the water.
Palette: water green-grey, desaturated skin, one vivid blue iris.
Study ref: M3 mediated portraiture.

## FIRST_T and cycle

FIRST_T = 4.5 s. CYCLE = 36 s. The warp breathes on the cycle,
amplitude from 72 percent of base at the trough to full at the crest.
At t = 4.5 the warp is mid-breath, near full strength, so the first
frame shows the smear and the doubling clearly while the eye sits
crisp. All randomness is seeded (mulberry32, hash noise). No wall
clock or Date in animation state.

## Interaction

Drag tilts the water surface. The drag direction sets the warp
direction and the drag distance sets its intensity, up to 1.9x base
amplitude. Release returns the target to zero and the tilt eases
back, so the ripples settle. A tap does nothing. There is no click
action anywhere. Reduced motion: the first frame stays still and no
animation loop runs. No audio.

## QA hook

`?t=` and `?seed=` set the virtual clock at load.
`window.__draw(t)` drives draw with a virtual clock.
`window.__piece1986` exposes firstT, cycle, warpAmp(t),
setTilt(angleRadians, intensity0to1, snap), getTilt, redraw.

## Deviations from the prompt

The prompt asks for fragment-shader refraction over a drawn face.
This build does the refraction as canvas 2D strip displacement over
an offscreen drawn face, not WebGL. The doodle template has no WebGL
path and node-canvas QA cannot run shaders, while the strip pass
gives the same smear, doubling, and masked sharp eye, deterministically.
The sharp region is a feathered unwarped patch plus the separately
drawn vivid eye, which is the prompt's masked sharp region in
practice. The ripple highlight rings are partial arcs, not full
circles, so they read as water rather than target rings.

## Probes

All renders from the actual script with node render-piece.js.

- render-desktop.png, 1280x900, seed 4.5.
  md5 8cf64fe53a04d2cf4d16befa74e530f1. Visually inspected, clean.
- render-mobile.png, 390x844, seed 4.5.
  md5 5f35de8c1c9deda2fae35023039743ea. Visually inspected, clean.
  Full-bleed portrait, face stretches long, per house rules.
- thumb.png, 720x720, seed 4.5.
  md5 df319349c04f3b70edbd060094f5f243. Visually inspected, clean.
- Thumb determinism: rendered twice, both
  md5 df319349c04f3b70edbd060094f5f243. Identical.
- Time probe t=12: probe-t12.png,
  md5 39881479bd6a19e4381d77673766385b. Frame changed.
- Time probe t=25.5: probe-t25.png,
  md5 2ad7364793750a486a62f1eb820a7332. Frame changed again.
  Visually inspected, clean, eye identical.
- Drag probe (probe-drag.js, setTilt(0.6, 0.85, snap) at t=4.5):
  probe-drag.png, md5 655abc9d21ddeb2ffb62e4a94d191f56,
  against probe-base.png md5 8cf64fe53a04d2cf4d16befa74e530f1
  (identical to the desktop render). Full frame differing pixels
  434876 of 685584. Mouth region 26044 of 36540 differing, left
  eye region 14886 of 19256 differing, brow above the eye 4920
  of 10400 differing. Tight eye box (iris, lashes, lids) 0 of
  10800 differing. Iris core box 0 of 5600 differing. The warp
  direction and intensity change under drag while the eye stays
  pixel-identical. Visually inspected, clean: diagonal smear,
  eye crisp.

Note: the first drag comparison used viewport coordinates instead of
stage coordinates and reported false eye differences. The output
canvas is the square stage (828x828 at 1280x900), so compare-eye.js
uses stage coordinates. The corrected comparison is the one above.

## Fix rounds

Round 1, after first renders: the hair read as a dark headband
because its outer quadratic sagged off the top edge, leaving skin
above it. Rebuilt the hair as a solid mass above the hairline.
Raised warp base from 0.012 W to 0.016 W and the doubling pass from
0.20 to 0.28 alpha, so the interior smear reads. Fainted the ripple
rings from 0.14 to 0.09 alpha and made them partial arcs.
Increased the mouth wave amplitude from 0.020 H to 0.024 H.

Round 2, after re-render: cheek and chin shadows and the forehead
light read as hard grey ovals. Replaced all three with soft radial
gradient washes. Re-gated all three sizes after the edit.

No further fix rounds. Final renders above are post round 2.

## Known warts

- The nose tip light and the nostril shadow read as two small
  stacked dots at small sizes. Stylized, acceptable.
- The ripple rings are faintly visible as circle arcs over the
  forehead at some phases. Subtle, reads as water.
- On tall phones the face stretches long under full-bleed. That is
  the house rule for field-like compositions.
- The muted left eye is small and plain by design, so the sharp
  eye owns the frame.
- Offscreen canvases use document.createElement in the browser and
  fall back to the node-canvas module in QA only. That fallback
  branch never runs in a browser.
