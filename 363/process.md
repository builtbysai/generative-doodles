# No.363 Snowy Owl Stare

## Concept

After Julianne Haness's "Snowy Owls": giant snowy-owl faces in
half-drop repeat on a gold-ochre ground. White feather bodies,
bold black brow wedges slanting down toward the centre, piercing
orange eyes with black pupils staring straight out at the viewer.
The stare is direct and slightly unsettling, never cute. The blink
is the only motion in the piece. Palette is closed: owl white
#F5F2EA, eye orange #E07B1F, brow black #1A1A1A, ground #D9A441,
flat fills only.

## Construction

One canvas, design space 1280x900, full-bleed cover-fit. The
repeat is 35 faces in a 7 by 5 grid (columns 320 apart, rows 450
apart, odd rows shifted half a column), each face about half the
frame height, authored across an oversized world (centres span
x -960..1120, y -900..900) so the field covers the frame at every
pan. Each owl is drawn from primitives: an egg-shaped white body,
twelve fixed speckle marks on the lower body and crown sides, two
rows of faint scallop arcs low on the body, a pair of thick black
brow wedges, two orange eye discs with black pupils and white
catchlights, and a small black diamond beak.

The master loop is 700 seconds. Each owl blinks exactly once per
loop at its own fixed slot: slot s starts at s x 20 seconds and
the eye discs scale Y toward 0.05 over 0.7 seconds on a sine dip,
so blinks land one at a time, one every 20 seconds, and frame 700
is pixel-identical to frame 0. Double-tap advances which owl
starts the sequence through a fixed offset table (shifts of 0, 7,
14, 21, 28 owls); the cadence never changes. Drag pans the repeat
grab-style, clamped to the authored margin, and the explored
position persists on release.

Determinism: frame one is drawn synchronously at the constant
phase T = 340.35 seconds, the middle owl's slot plus half a
blink, so the first frame is developed with exactly one owl
mid-blink (asserted in code at load) and every other eye wide
open. The animation clock advances from that same anchor in
fixed 1/60 ticks; no wall clock ever seeds the phase. House
rules throughout: Visual Viewport sizing with resize listeners
on visualViewport and window, canvas pinned every frame, phone
detection via window.screen with aspect fallback, pointer
coordinates converted through the stored cover transform,
rAF typeof-guarded, no offscreen canvas, no gradients, no
shadowBlur, no text.

## QA log

- Rendered with render-piece.js at 1280x900 (desktop), 390x844
  (mobile) and 720x720 (thumb).
- Desktop: offset rows of giant faces edge to edge; the centre
  owl of the middle row is mid-blink, its eyes compressed to
  thin orange slits under the brow wedges; all other eyes open
  with catchlights; speckles and scallops read as plumage
  texture, not noise.
- Thumb: same composition at gallery size; the blinking owl
  sits dead centre by construction (it is the middle owl of
  the grid) and the blink reads at 720px.
- Mobile: full-bleed centre crop; one whole face fills the
  phone frame with the blink legible, ground continuous, no
  letterboxing.
- Determinism gate: the thumb was rendered twice and compared
  byte for byte; identical (md5 543d06f565e0a95a0ed7135b5d13af6c).
- Palette audit: the file contains exactly the four specced
  colours and no others.
