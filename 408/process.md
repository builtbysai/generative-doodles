# No.408 Sleeve - process

## Concept

After Nina Clausonet's commercial motif-field
packaging mechanism (nina-clausonet study, EXPANSION
#43 prompt NINA8; MyMuesli limited edition, WRAPPR
Regal Collection): a product sleeve, a tall rounded
rectangle like a muesli tube, wrapped in her flat
illustration. Deep navy ground tossed with coral
tulips, cream stars, orange wheat stalks and small
stylised women figures; a bold coral typography band
across the middle reading the piece title in flat
geometric lettering; and a few motifs escaped onto
the cream margin around the sleeve, drifting up like
released seeds. No brand names, no small print, no
text beyond the title band.

The prompt's two runtime-random mechanisms take the
house fixed authored table treatment (the No.394 /
No.403 precedent). The offscreen motif strip is not
used at all (the No.398 precedent): the field is a
fixed scatter table drawn directly on the one canvas
every frame, and the cylinder wrap is pure
mathematics. The double-tap reseed advances a fixed
authored table of 3 scatter variants, same lexicon,
new arrangement. Nothing is random at runtime.

## Construction

One self-contained canvas, design space 1280x900,
centred fit; the page ground is the margin cream
#F5E9D0. All marks are JS data drawn directly each
frame; no offscreen canvas, no gradients, no
filters, no shadowBlur. Flat colour only, palette
closed at the five specced hexes (navy #1B2A5B,
cream #F5E9D0, coral #F26B4F, orange #F5A623, pink
#F2A0C0; grep-verified).

The sleeve is a rounded rectangle (440,52, 400x796,
corner radius 46) centred in the design field,
resting at a slight tilt of -0.02 rad. The motif
field lives inside its clip.

The fixed authored scatter table: 3 variants, each
exactly 64 motifs asserted at load (per variant:
16 tulips, 16 stars, 16 wheat, 8 women, 8 filler
dots, dealt by a repeating pattern cycle of 8). Each
motif carries a strip position u around the tube
(circumference 680 units), a design height y, a
scale, a fixed tossed rotation, and a parallax layer
rate (0.8 back, 1.0 front). Strip positions are
stratified: the 64 slots divide the tube evenly and
are shuffled by the variant's fixed seed, so the
field covers like printed packaging wrap instead of
clumping by chance. All tables are baked at load
from fixed-seed LCGs and are identical on every
render.

The wrap: each frame, a motif's angle is its strip
position plus the rotation phase for its layer
(phase = rot x 340 strip units). Its x is the
centre plus sin(angle) x 206, its horizontal squeeze
is cos(angle); motifs on the back half (cos <= 0.02)
are not drawn, so they round the edges compressed
and vanish, exactly the prompt's sinusoidal sampling
done as table lookups instead of an offscreen strip.
Three stepped flat navy alpha bands (0.16 / 0.10 /
0.05) at each inner edge fake the tube's falloff;
they are flat steps, not a gradient.

The title band is a coral rect across the middle
(y 404-496) over the field. SLEEVE is drawn as flat
geometric letter PATHS: filled bars for S, L, E and
one filled polygon for V, on a 64-tall grid, never
font text. During rotation the letters squeeze by
cos(rot x 0.8), floored at 0.8, far slower than the
field's edge compression, so the band stays readable
longest.

Margin motifs: exactly 8 asserted (tulip, star,
wheat, woman, star, tulip, wheat, woman), placed on
the cream around the sleeve; margin stars are coral
because cream would vanish on the ground. Exactly 4
of the 8 drift: on the 20s ambient loop they rise
130 design units and fade on a sine envelope, on
whole cycles only (k = 1 or 2 cycles per loop, fixed
phases).

Interaction, per Hans's RETHINK rule: drag rotates,
double-tap re-scatters, nothing else. A horizontal
drag sets the rotation target from the drag distance
(clamped to +-1); the whole sleeve group tilts
(rot x 0.12) and shears (rot x 0.15) while the field
scrolls with parallax. On release the spring
(stiffness 130, damping 15, fixed 1/60 ticks) eases
the rotation back and snaps to exactly rot 0, so
the sleeve returns to exactly its resting angle and
the field to exactly its frame-one arrangement. A
double-tap (two taps within 0.4s of the piece clock,
tap = press and release under 0.8s with under 28
design px of travel) advances the scatter variant;
a single tap does nothing. Never click-to-reload.

Grain follows the batch grain rule: exactly 700
speckle dots from a fixed table (navy at 0.05 alpha,
coral at 0.06), drawn last, in table order, every
frame. Never a noise texture or overlay.

Determinism: frame one is drawn synchronously at
the constant phase T = 6.5s into the 20s loop
(sleeve at rest, first scatter variant complete,
the four drifters mid-rise at developed fades). The
animation clock is anchored at that constant and
advances in fixed 1/60 ticks accumulated from rAF
timestamps, typeof guarded; frame one is never
derived from Date.now() or any wall clock. Pointer
coordinates convert through the stored fit transform
(S, OX, OY). Sizing uses the Visual Viewport API
with resize listeners on visualViewport and window;
the canvas is pinned by style width/height every
frame; phone detection uses window.screen with the
aspect fallback.

Two QA hooks ride the query string the house
renderer passes (?seed=...): var=N renders scatter
variant N at rest, tilt=1 renders a mid-drag frame
at rot 0.65. Default play is unaffected.

## QA log

Rendered with the house renderer
(node ~/workspace/tools/render-piece.js):

- qa-desktop.png (1280x900): frame one, variant 1.
  Navy sleeve near full height at its resting tilt,
  the tossed field reading across it (women in pink
  and coral, wheat ears, coral tulips, cream stars),
  SLEEVE band crisp in cream geometric letters on
  coral, the 8 margin motifs on cream with the
  drifters mid-fade.
- qa-mobile.png (390x844): centred fit, whole sleeve
  in frame, page ground continuous cream.
- thumb.png (720x720): rendered twice from the
  shipped script; byte-identical (md5
  df2da02efaabe72403246129659a2d5e).
- Probe renders (temporary, not shipped): variant 2
  and variant 3 at rest (both complete, distinct,
  evenly tossed fields), and a tilt probe at rot
  0.65 (field scrolled to a new wrap position,
  sleeve tilted and sheared, band letters squeezed
  slightly and still fully readable).

Fixes during QA: the first field was too sparse on
the front face (about 11 of 48 motifs readable), so
the tables grew to 64 motifs per variant at a larger
scale; the wheat recipe's grains first angled
down-outward and read as a centipede, so the grain
angles were flipped to angle up-outward with awns
added; strip positions were then stratified so the
front face covers evenly like printed wrap instead
of clumping.

Deviations: none from the spec or its adaptation
flag. The prompt's offscreen strip and runtime
reseed are replaced by the table treatments exactly
as the flag prescribes.
