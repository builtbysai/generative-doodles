# No.918 Scorched Earth

Study #112 duncan_geere, PP79 "Scorched Text". Title suggestion: "Scorched Earth".

## Concept

The piece opens as text: a six-line explainer set in quiet serif type on a
paper ground. The legend is half the work, and the loop always returns to
it. Then a small flame catches at the center of the text, and a burning
ring expands outward at a rate set by one synthetic year of fire data:
the ring's radius follows the cumulative land burnt, so it creeps in
spring, races through the high summer weeks, and slows into autumn.
Where the ring passes, the paper chars and the words are scorched away.
When the year is done, what remains is the record: the ring's weekly
history settled as concentric tree rings on the charred disc. The paper
then restores and the year burns again.

The explainer, verbatim:

    Scorched Earth
    One year of fire, drawn as it burnt.
    Each tick of the ring is a fire.
    The ring grows with the land burnt.
    The roar is the day's area.
    What remains is the record: rings.

Palette, strict: paper #F4EFE6, text #1A1A1A, flame #FF6B1A, ring
#CC3D00, ring edge #FFB84D, char #2A1A10. No stock-fire imagery anywhere:
the ring is the fire.

Interaction. Tap anywhere: the cycle jumps to ignition at your finger
and the year burns from there. Drag during the burn: the wind; the ring
drifts and bulges downwind, then relaxes. Double-tap: the year in a
glance, an 8 s accelerated burn to the full ring set. Sound starts on
the first gesture, as browsers require: thinned per-fire clicks, a brown
noise roar whose gain is the day's burnt area, one deep note per weekly
ring completed, and a paper-catch burst with a low thump at ignition.

## Construction

Single self-contained index.html, canvas 2D, no external assets.

Fire data is seeded init data (mulberry32, seed 91879): 365 days, a
season curve peaking at day 198 (late July), daily fire counts with
occasional spike days, daily area from count and season weight. Ring
radius is RMAX * sqrt(cumulative area / total area), RMAX = 0.44 of the
smaller viewport dimension, interpolated day by day. Fifty-three weekly
aggregates give each tree ring its radius and its darkness.

The cycle is a closed-form function of elapsed time and the recorded
event log, never of Date.now. Base cycle: text 4 s, flame 1.2 s, burn
40 s, hold 6 s, with a 1.2 s restore fade inside the hold. A tap starts
a new cycle at the tap point (flame 1.0 s, burn 40 s). A double-tap
starts the glance cycle (flame 0.6 s, burn 8 s). Cycles are rebuilt from
the tap list on every frame: taps are paired within a 0.35 s window, a
lone tap confirms at tap time + 0.35 s, and any tap truncates the cycle
in progress. Drag wind is stored as segments of timestamped cumulative
displacement (fractions of the smaller dimension); during a cycle's
burn it becomes a center drift plus a radial asymmetry in the direction
of the drag, decaying with a 2.5 s time constant after release, capped
at 0.16 of the frame.

The char is a filled disc at the current ring radius, drawn over the
text; the text itself is drawn through a clip path with the disc cut
out (reversed winding), so the words survive exactly where the ring has
not reached. The burning edge is layered flat strokes (pale edge, flame
band, the dark ring line), no shadowBlur, no gradients, no filter, no
offscreen canvas. The flame is three nested teardrop shapes with seeded
spark particles whose positions are pure functions of flame age.
Canvas size comes from the Visual Viewport API with resize listeners on
visualViewport and window; the canvas style is pinned in px inside
draw(); phone detection uses window.screen physical size with an aspect
fallback, and the type scales so the explainer stays whole at 390 px.
Audio is lazy, typeof-guarded, and built only inside the first pointer
gesture; the piece renders complete in silence.

## QA log

Rendered with node render-piece.js (node-canvas harness):

- qa-desktop.png 1280x900: warm paper, the six explainer lines centered
  in quiet dark serif, nothing else on the page.
- qa-mobile.png 390x844: same explainer, legible and unclipped, type
  scaled to the narrow frame.
- thumb.png 720x720: same frame one.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. The duplicate was deleted.

Frame-one choice, recorded: t = 0 sits inside the 4 s text phase, and
the explainer is fully present from t = 0. The loop's opening is the
frame. A first build faded the text in over 0.5 s, which left frame one
blank paper; that fade was removed for exactly this reason.

Phase probes (temporary copies with the frame-one call retimed, not
shipped): t = 4.6 shows the flame caught at the text's center, a small
layered teardrop over the middle lines; t = 25 (mid-burn) shows the
char disc with the weekly rings accumulating inside it and the orange
edge still burning, the text already gone where the ring has passed;
t = 46 (hold) shows the finished record, the full ring set settled on
the char at final radius.

Deviations and implementation notes:

- Text survival is exact rather than approximate: instead of only
  covering the text with the char disc, the explainer is drawn through
  a clip with the burn disc cut out, then the char disc is laid over.
  Same visual contract, cleaner edge.
- Completed weeks' rings are already faintly visible inside the char
  while the burn is running, and settle to full strength in the hold.
  This follows the prompt's own technical note that the tree rings are
  the ring's history drawn as concentric strokes.
- The char disc is laid at alpha 0.88, not opaque, so the ring strokes
  and a hint of the paper read through the scorch.
- A lone tap takes effect 0.35 s after release, the house disambiguation
  window that lets a second tap turn the gesture into the double-tap
  glance instead.
- Audio clicks are thinned to at most 3 scheduled clicks per day and 12
  per frame; the roar carries the density on the biggest days.
- The restore is a crossfade over the last 1.2 s of the hold: char and
  rings fade out while the explainer fades back in, so the loop returns
  to its text without a cut.
