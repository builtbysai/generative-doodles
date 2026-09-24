# Bjorn Ottosson (Okhsl / Okhsv): Study Notes

**Site:** bottosson.github.io/posts/colorpicker/ (essay),
bottosson.github.io/misc/colorpicker/ (interactive comparison) |
**Doorway:** Anatoly Zenkov adapted Ottosson's OKHSL picker code for his own
ColorPicker; Zenkov's colors.js notes point here.

**Depth: deep.** The full essay read end to end (history, the eight desirable
properties, HSV/HSL/HSLuv critiques, the Okhsv and Okhsl constructions, the
tradeoff tables, future work). The interactive comparison page visually
inspected at full resolution via headless Chrome: all four picker rows
(square HSV/OKHSV/OKLrCH, wheels HSL/OKHSL/HSLuv, rainbow planes, hue strips)
with #ff0000 loaded across all six models. The core claim, orthogonal
lightness, re-implemented fresh in plain canvas (Ottosson's published
sRGB to OKLCH matrices) and visually inspected: a hue sweep at constant
OKLCH lightness vs the same sweep at HSL L=50.

## The problem, as he frames it

Almost every color picker is HSL or HSV, two transforms from a 1978 paper
that were designed to be cheap, not perceptual. Ottosson lists eight
desirable properties for a picker space and admits up front they conflict:
orthogonal lightness, chroma, saturation, hue; simple geometrical shape;
max chroma at the edge; smooth variation; even variation. You cannot have
all of them, so picker design is choosing which tradeoffs to make. His
scorecard: HSV/HSL get the cylinder shape and smooth variation but fail
orthogonal lightness completely; HSLuv fixes lightness (it is built on
CIELChuv) but its hue is distorted by the Abney effect, worst in deep blues
and purples, and its saturation rescales so unevenly against the sRGB gamut
that constant "saturation" with varying hue jumps in perceived chroma;
Lab-like spaces model perception well but the sRGB gamut is an irregular
blob inside them, so changing one parameter constantly throws you out of
gamut.

## The constructions

- **Lr, a better lightness for the job.** Oklab is scale-independent by
  design (no reference white), which hurts lightness prediction in a picker
  with a fixed white. Ottosson adds a toe function, Lr, with constants
  k1=0.206, k2=0.03, tuned to nearly match CIELAB L at 50% (Y 0.18419 vs
  0.18406). The same toe later resurfaced in his Oklrab revision, a tell
  that the dark-end correction mattered.
- **Okhsv.** Start from OkLCh, keep its hue, find the gamut cusp per hue
  (the most saturated point, via his sRGB gamut clipping method), remap so
  the cusp lands at s=1, v=1, stretch the triangle's lower half into a
  square, then a small curve correction at the top to fit the cylinder
  exactly, plus a subtle low-saturation uniformity tweak. Familiar to HSV
  users, perceptually repaired.
- **Okhsl, the real invention.** HSLuv scales chroma by a single Cmax(h,l),
  which drags the gamut's unevenness into the whole interior. Ottosson's
  move: three chroma references instead of one. C0(l) is hue-independent, so
  the space is continuous near the gray axis. Cmid(h,l) is an optimized
  smoother shape, closer to Cmax but well behaved. Cmax(h,l) is the true
  gamut edge. Interpolate: at s=0 the slope is C0, at s=0.8 C=Cmid, at s=1
  C=Cmax. The gamut's lumpiness is quarantined at the high-saturation
  edge; the interior stays smooth. He is candid that it is ad hoc, chosen
  because it is cheap to compute and easy to invert, not because it falls
  out of a boundary-value problem.

## The comparison page, seen live

Four rows. Row 1: square pickers, HSV vs OKHSV vs OKLrCH. The OKLrCH
triangle is visibly warped next to the HSV square, the cusp pulled to one
corner, honest about the gamut's real shape. Row 2: the wheels. HSL's
wheel looks washed and pastel next to OKHSL's even vividness; HSLuv's
wheel shows its hue distortion plainly. Row 3: full rainbow planes (hue
across, lightness down). HSL's plane has the classic dark band through
blue/purple; OKHSL's and HSLuv's stay even. Row 4: hue strips at fixed
settings. The numbers panel tells the story in one glance: pure red is
H 0 in HSL/HSV, H 29 in every OK space, H 12 in HSLuv. Same color, three
different "hues". Hue was never a physical fact, only a coordinate choice.

## The re-render: orthogonal lightness, seen in pixels

Two horizontal strips, hue 0 to 360. Top: OKLCH at L=0.65, C=0.12. Bottom:
HSL at S=70, L=50. The OKLCH strip reads almost flat in lightness from red
through green, teal, blue, purple, back to red. The HSL strip blazes at
yellow and green and sinks into near-navy at blue and purple, the exact
failure in his "HSL constant lightness" figure. Rendering it myself with
his published matrices (they round-trip cleanly) made the point land
harder than reading it: in HSL, "L=50" is a promise about arithmetic, in
OKLCH it is a promise about your eyes.

## What sings

- The honesty about tradeoffs. The eight-property table with "no" and
  "partial" entries, and the admission that the Okhsl interior is ad hoc,
  is why the work is trusted. He ships the scorecard with the product.
- Quarantining the unevenness. C0/Cmid/Cmax is a generalizable design
  pattern: when the boundary is lumpy, do not let the boundary's lumpiness
  infect the interior. Useful far beyond color.
- The toe function as craft. A tiny rational function that buys CIELAB
  compatibility at midtones. Small math, large perceptual payoff.
- Hue as coordinate, not fact. The H 0 vs 29 vs 12 panel is the kind of
  demo that permanently changes how you read every other tool's UI.

## What is overdone / avoid-list

- The essay's own warning applies to generative art directly: interpolating
  or ramping in HSL/HSV because it is convenient produces the dark-blue /
  neon-yellow banding you see in cheap generative palettes. If a piece ramps
  hue, do it in OKLCH or accept the artifact as a choice, not an accident.
- Do not treat "perceptual" as a synonym for "correct". His closing point
  stands: uniformity is measured against datasets that disagree with each
  other. OKLCH is good enough and cheap enough, which is why it won CSS,
  not because it is right.
- The NCS-style remapping idea he floats (warping hue spacing to familiar
  axes) is tempting for art tools but trades evenness for familiarity; for
  generative palettes, even is usually what you want.

## Doorways for future passes

- His Oklab post (bottosson.github.io/posts/oklab/) and the sRGB gamut
  clipping post the cusp-finding method comes from.
- okpalette.color.pizza and the colorsort-js stack: perceptual sorting of
  palettes as traveling-salesman, cited in meodai's skill notes as
  powering FarbVelo.
- The Aseprite Okhsl picker plugin (behreajj/asepriteokhsl): the same math
  inside a pixel-art tool, a different audience with different constraints.
