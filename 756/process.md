# No.756 Fluorescent Fold

EXPANSION #92 robert-irwin, prompt block 5 "Fluorescent Fold". After Irwin's
gel-wrapped fluorescent fields (Sunshine Noir technique; Light and Space,
2007, 115 tubes): white light fractured into tonal fields no pigment could
make.

## Concept

Two fields of vertical fluorescent tubes cross-hatch at 30 degrees over a
near-black ground, enveloping the frame in light. The tubes are wrapped in
theatrical gels, so stretches of each tube burn violet, teal, amber, or rose
instead of white, and short black and white tape ticks interrupt the light
like marks on a real gel sleeve. Nothing is drawn as an object: no fixtures,
no sockets, no tube hardware. The light itself is the material. The gel hues
breathe slowly, drifting a few degrees and coming back over five minutes,
and a drag bends the whole sheet of tubes the way a hand would disturb a
hanging scrim of light, then lets it settle.

## Construction

- Strict palette, nothing else is ever drawn: ground #101014, tube white
  #F5F5F0, gel bands violet #8A5AE0, teal #4AD8C8, amber #F0A840, rose
  #E06A8A, tape ticks black #1A1A1A and white #FFFFFF.
- Tube fields are precomputed once at load from seeded mulberry32 streams
  (field A seed 756101, field B seed 756202) in abstract unit space. Tube
  centers advance by a seeded random walk (step 0.020 to 0.058 of the span)
  and widths vary per tube, so spacing is irregular and never a grid. Each
  tube's length is partitioned into bands of seeded length (0.10 to 0.32 of
  the extent); each band is bare tube white with probability 0.42 or one of
  the four gel anchors otherwise. Each tube also carries 2 to 5 tape ticks
  at seeded heights. Because the layout is pure seeded data, it is identical
  at every frame size and every load.
- A tube is drawn as a warped ribbon: three layered-alpha passes per band
  (width multipliers 2.5, 1.55, 1.0 at alphas 0.075, 0.15, 0.92) build a
  bright core with a soft falloff. No gradients or shadowBlur anywhere; the
  falloff is the layering. Light passes composite with 'lighter', so where
  the rotated field crosses the vertical one the brightness adds, as real
  crossed tubes would. Tape ticks are drawn after the light passes with
  'source-over', slightly wider than the core, so a black tick genuinely
  cuts the tube instead of vanishing under additive blending.
- Field B is the same construction from its own seed, drawn behind field A
  at globalAlpha 0.5 inside a 30-degree rotation about the frame center,
  with its local span set to the frame diagonal so its tubes still cross
  every corner after rotation.
- Gel modulation: each gel anchor is converted to HSL once. At loop time t
  a band's hue is the anchor hue plus tube.drift * 15 degrees * sin(2 pi t
  / 300), where tube.drift is a seeded signed factor in [-1, 1] per tube.
  The 300 s period is the specced 5-minute cycle; the sine is exactly 0 at
  t = 0 for every tube, so frame one shows the pure anchors (drift phase 0)
  and the swing never exceeds the specced +/-15 degrees, keeping every band
  inside its color family.
- Drag warp: pointer samples are recorded (down point, current point,
  release time). While dragging, horizontal travel as a fraction of frame
  width sets a signed warp amplitude (capped at 0.055 of the smaller
  dimension) and vertical travel sets the phase; the x-offset at height
  fraction p is amp * sin(p * 3 pi + phase), applied identically to both
  fields' ribbons and ticks, so the whole sheet bends as one. On release
  the phase freezes and the amplitude decays as relAmp * exp(-(t - relT) /
  1.1). The warp at any t is a closed form of the recorded samples; with no
  samples it is exactly zero. Clicking never reloads anything.
- Sizing: canvas from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas.style.width/height pinned in px inside
  draw() every frame; devicePixelRatio applied to the backing store only.
  Phone detection via window.screen (min dimension under 700 px), aspect
  h > w * 1.15 as fallback only; on phones tube widths get a 1.3 boost so
  the fracture stays legible in the narrow frame. Fields refit purely from
  the unit-space layout.
- Determinism: layout, ticks, and drift factors are fixed seeded data; gel
  color and warp are closed-form functions of (recorded drag samples, t).
  Frame one is the synchronous draw at t = 0: both fields at drift phase 0,
  no warp. Nothing is derived from Date.now() and there is no Math.random.
  The rAF loop is typeof-guarded and anchored at its first callback
  timestamp; the QA renderer has no rAF, so QA renders are exactly the
  synchronous frame. An inert QA hook (?seed=tNN, house convention) offsets
  the start time for state-forced checks; without it the piece starts at 0.
- No audio, no microphone. The only text is the <title>.

## QA log

- Rendered with the house renderer (node-canvas, the piece's actual
  script): qa-desktop.png at 1280x900, qa-mobile.png at 390x844, thumb.png
  at 720x720. All three read back.
- Desktop: irregular vertical tubes across a near-black ground, gel
  segments (violet, teal, amber, rose) and black/white tape ticks plainly
  visible, the rotated second field crossing behind at 30 degrees and
  adding brightness at the crossings. Tubes run off the frame edges by
  design (full-bleed fields); nothing is clipped that should be visible.
- Mobile: the same layout refits the tall frame with the phone width
  boost; gel bands and ticks stay legible, the cross-hatch still reads,
  nothing clipped.
- Thumb: same composition at 720x720, full-bleed.
- Determinism: thumb.png rendered twice back-to-back and cmp-compared:
  byte-identical. The second render was deleted.
- State-forced check: a throwaway render at t=75 (quarter cycle, drift at
  full swing) showed the identical layout with hues rotated inside their
  families (ambers toward yellow/orange, teals toward green, roses
  warmer), confirming the modulation path; the throwaway was deleted.
- No fix round was needed.

## Deviations

- None from the prompt's substance. Two construction notes: the prompt's
  hue drift is implemented as an HSL rotation of the specced anchor hexes
  (saturation and lightness untouched), so drifted bands are the anchors'
  own hues turned at most 15 degrees, never new colors; and the warp is
  applied in each field's local coordinates, so the rotated field bends
  along its own tubes rather than shearing against them, which keeps the
  cross-hatch coherent while dragging.
