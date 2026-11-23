# No.409 Cat Window - process

## Concept

After Yeti Iglesias's Golden Sun composition
(yeti-iglesias study, EXPANSION #44 prompt YETI1):
an arched window against a deep olive ground, a
huge stippled orange sun filling the arch, and on
the checkered windowsill her recurring cat
protagonist - one orange striped cat with green
eyes, tail flicking - beside a green planter with
leaves and small flowers and a red polka-dot mug
breathing steam. WATCH-ONLY: no pointer handlers at
all; the 30s seamless loop is the piece. Her
hand-lettered "Yeti" signature sits bottom right.

The prompt's hue-shifted gradient on the sun takes
the set gradient rule (BATCH-409-413-SPEC): two
flat tones with a hard diagonal edge, never a
smooth blend. The sun's two tones are the specced
sun orange #FF9500 and the palette's deeper orange
#F26A1B; the stipple is the darkest orange #C94E0F
at 0.15 alpha. No colour outside the specced
palette is introduced.

## Construction

One self-contained canvas, design space 1280x900,
centred fit; the page ground is the deep olive
#3A3D12. All marks are JS data drawn directly each
frame; no offscreen canvas, no gradients, no
filters, no shadowBlur. Flat colour only, palette
closed at the specced hexes (ground #3A3D12, sun
#FF9500 / #F26A1B, stipple and stripes #C94E0F, cat
#F26A1B, eyes and leaf accent #6BAE6B, planter
#2E7D4F, mug #E63329, cream #FCE8D5, sill checkers
#55602A / #6B7A2A).

The window: outer arch centred (640,370), radius
310, sides down to y 790; inner opening inset 28
(radius 282); a sill top rail at y 608 and a ledge
slab below the window. Inside the clipped opening:
the sun (centre 640,378, radius 258) drawn as a
flat disc, clipped, rotated -0.55 rad, and filled
past the diagonal with the second tone, so the hard
edge crosses the disc diagonally.

Counts, asserted at load: stipple exactly 400 dots
(rejection-sampled inside the sun disc from a
fixed-seed LCG, drawn in table order every frame at
0.15 alpha); dust motes exactly 14 (fixed table of
base position, radius, drift period and phase,
inside the sun).

The cat is a fixed recipe: body ellipse, head
circle, ear triangles with darker insets, forehead
and body stripes clipped to the body, green eyes
with olive slit pupils, and a tail built as a chain
of 9 circles along a quadratic curve, alternating
orange and stripe tones. The tail bases at the
body's left on the sill and curls up the cat's left
side against the sun; the flick moves the curve's
tip control point on a sine.

The planter: trapezoid pot with a rim in planter
green, five leaves fanning from the pot mouth on
fixed stems (alternating the two palette greens),
three small flowers (red petals, cream hearts) at
stem ends. Leaf index 3 is the swaying leaf. The
mug: rounded body in red with six cream polka dots
clipped to it, a stroked handle, and a darker-orange
coffee ellipse on top. Steam is 2 curling strokes:
each wisp is a sampled sine polyline whose rise
phase runs on a 6s cycle, its alpha a sine of the
phase, so it fades in at the mug and out at the top
and the wrap is invisible.

Motion, all periods dividing the 30s loop so the
loop is seamless: sun pulse, a flat cream overlay on
the sun disc whose alpha breathes 0.05 +/- 0.05 on a
7.5s cycle (four whole cycles per loop; the
prompt's ~8s pulse resolved to the nearest period
that keeps the loop seamless); tail flick on a 6s
cycle (5 per loop); steam rise on 6s cycles; the
planter leaf sways on a 10s cycle; dust motes drift
on 10/15/30s cycles.

The signature is designed text under the set's
exception: "Yeti" drawn as hand-lettered stroke
paths (polylines and one sampled arc for the e) in
cream at 0.92 alpha, bottom right. No font text
anywhere in the piece.

Determinism: frame one is drawn synchronously at
the constant phase T = 7.5s (scene complete, tail at
full flick, steam mid-rise, flowers open). The
animation clock is anchored there and advances in
fixed 1/60 ticks via a guarded rAF loop; the first
frame never comes from a wall clock.

## QA log

Rendered with the house node-canvas renderer:
qa-desktop.png 1280x900, qa-mobile.png 390x844,
thumb.png 720x720. The thumb was rendered twice
from the shipped script and compared byte for byte:
identical (final file md5 0d8e5cdc...).

Desktop: the two-tone sun fills the arch with its
hard diagonal edge and visible stipple; the cat
sits left on the checkered sill with green eyes and
body stripes; the planter stands centre with five
leaves and three flowers; the red mug steams at
right; the signature reads bottom right. Thumb: the
whole window, cat, planter and mug read at gallery
size. Mobile: centred fit holds the complete window
in frame on the continuous olive ground.

First-pass fix: the tail originally curled up the
cat's right side, where the planter pot covered its
middle and its tip muddied the flowers. The tail
curve was re-based to the body's left, curling up
the cat's left side against the sun, where the full
striped chain reads. All three renders were remade
after the fix and the thumb byte-compare repeated:
identical.

Palette and hygiene greps: no gradient, shadowBlur,
offscreen-canvas, Math.random or Date.now usage in
code (the words occur only in the header comment
noting their absence, as in sibling pieces); no
absolute URLs; no em dashes.
