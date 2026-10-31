# No.736 Moonlight Tube

EXPANSION #90 spencer-finch, prompt block 1 "Moonlight Tube", after
Moonlight (Luna County, New Mexico, July 13, 2003).

## Concept

The colorimeter protocol at its most condensed. Finch measured the
color of a full moon over the New Mexico desert and rebuilt it as a
fluorescent tube: a high-CRI white core wrapped in gels until the
light matched the measurement. The piece is that tube alone, floating
centered on near-black. It is the moon: no stars, no desert scene, no
photorealism. Below it, one quiet caption line carries the
measurement data: Luna County, New Mexico, the lunar phase day, and
the derived kelvin.

The tube breathes through the 28-day lunar cycle compressed into a
28-second seamless loop: full bright at the loop start, fading to a
faint ghost at the new moon, and back to full. It never goes fully
black. Tap the tube and it snaps instantly to full moon, then the
cycle resumes from there. Watch-only otherwise; no drag, never
click-to-reload.

## Construction

- Palette, strict: ground #0A0B0D, tube core #F4F1E6, gel anchors warm
  amber #E8C37A, cool blue #9DB8D6, pale violet #C9B8E8, wall spill
  #1A1D24. Nothing else; all shading is alpha of these tones.
- Nine flat gel bands along the tube axis: bands 0 to 4 step amber to
  blue, bands 4 to 8 step blue to violet, band 4 is the blue anchor.
  Each band is drawn translucent (alpha scaled by brightness and a
  small fixed seeded jitter from mulberry32, seed 73609) over the
  core, clipped to the tube's rounded silhouette, so the core burns
  through the gels. A slim bright spine along the center reads as the
  filament line.
- Brightness is a closed-form function of loop phase:
  b = 0.08 + 0.92 * (0.5 + 0.5 * cos(2 pi u)), u = (t mod 28) / 28,
  with a hair of mains shimmer (0.8 percent, a sine of cycle time)
  multiplied in. Frame one is the synchronous draw at t = 0, phase 0,
  full moon. Nothing is derived from Date.now(); the loop clock runs
  from performance.now() minus a boot stamp, and a tap only moves the
  cycle origin.
- Caption values derive from the same phase: day = floor(u * 28),
  kelvin lerps 3750 K at the ghost to 4200 K at full, rounded to the
  nearest 10. The caption shows place, phase day, and kelvin only; no
  calendar date, no clock.
- Sizing follows the house rules: Visual Viewport API with resize
  listeners on visualViewport and window; canvas pinned in draw via
  canvas.style.width/height in px on resize; phone detection via
  window.screen (min dimension under 700 px) with the aspect fallback
  h > w * 1.15. On phones the tube keeps 70 percent of the smaller
  frame width; on desktop it spans 70 percent of frame width. Page
  ground is the piece's own ground tone.
- rAF is typeof-guarded; without it the piece still draws its first
  frame synchronously. An inert QA hook (?seed=tNN) freezes the loop
  at second NN for forced-state renders; it is never present in the
  gallery.

## Deviations

- Flat-band glow adaptation (house rule, required): the prompt calls
  for gradient gels and a radial-gradient glow. Canvas gradients and
  shadowBlur are banned in this series, so the gels are nine flat
  translucent bands, the wall spill is six layered alpha rectangles
  of the spill tone stepping down in size and alpha, and the halo
  hugging the tube is three layered rounded rectangles of the
  averaged gel color at low alpha. The read is the same soft spill;
  the mechanism is flat layers.
- Caption scope: the prompt's caption names date, place, kelvin. The
  caption here carries place, lunar phase day, and kelvin, and no
  calendar date: the piece's data is the phase, and a fixed historic
  date would read as decoration. Day and kelvin update with the loop,
  as specced.
- Kelvin direction: as the tube dims toward the ghost, the derived
  kelvin falls (4200 K to 3750 K) rather than rising. It is a derived
  display value tied to the brightness curve, chosen so the caption's
  two numbers move together through the cycle.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js from the
  actual script at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with cmp;
  identical. Frame one is the synchronous draw at cycle t = 0.
- Forced-state check: ?seed=t14 (mid-loop, u = 0.5) rendered to a
  throwaway file and read back: the tube sits at the ghost floor,
  faint but clearly visible with its gel bands still separable, spill
  nearly gone, caption reading DAY 14 at the low kelvin. Throwaway
  deleted after the check.
- Desktop read-back: glowing horizontal tube at full brightness,
  amber at the left end cooling through blue to violet at the right,
  soft spill rectangle behind, caption legible below, nothing
  clipped.
- Mobile read-back: tube centered in the tall frame at 70 percent of
  the smaller width, bands and caption intact, nothing clipped.
