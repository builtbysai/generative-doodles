# No.137 Cursor Bloom

## Concept
One desktop arrow cursor multiplies into four cursor comets (arrow, I-beam,
hand, crosshair) wandering a dark void on slow Lissajous paths, each drawing
a fading ribbon in one of three hues. Where a comet lingers at a turning
point, its ribbon thickens into a bloom. The viewer's touch becomes a fifth
cursor, a bright white arrow whose ribbon is thicker, and the nearest comet
breaks choreography to follow it for a few seconds.

## Construction
Canvas 2D, single self-contained page. Each comet's position is a periodic
parametric path (integer frequency pairs over a 40s loop, so the loop
closes exactly). A 12 second position history per comet is kept at 30 steps
per second; the ribbon is stroked segment by segment with alpha rising
toward the head and width driven by local speed: thin while travelling,
swelling where the path slows, plus a soft flat disc at strong linger
points for the bloom. History is pre-rolled 12 seconds at load so frame
one is fully developed. Glyphs are small vector polygons and strokes drawn
at each comet head in cursor white. Pointer input maintains its own short
history for the fifth cursor's ribbon and eases a follow weight on the
nearest comet. House rules held: Visual Viewport sizing with resize
listeners on visualViewport and window, canvas pinned in px every frame,
window.screen phone check with aspect fallback, synchronous first frame,
typeof-guarded requestAnimationFrame.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720 and
inspected all three. First pass: ribbons read as fat neon tubes; thinned
the stroke so width comes almost entirely from the linger term, and
smoothed segment sampling to remove stipple. Final frames: four legible
glyph cursors, cyan, magenta and yellow ribbons fading over their 12
second tails, bloom pooling visible at the turning points (top of the
cyan loop, the magenta tail), full-bleed on the phone frame. Palette
audit: ground #101014, white #F2F2F2, hues #5AF2FF / #FF3EB5 / #E8FF47
only. Interaction is pointer drag (the fifth cursor); no click-to-reload.
Gallery entry ready: 2002 · 05 · 28, "One arrow cursor multiplies into a
comet trail of cursors drawing fading ribbons that thicken into blooms
where they linger. Touch to become the fifth cursor."
