# №1467 "The Masks, Worn in Full View" (delphine-seyrig DS4, PP714)

## Prompt
One figure stands center-frame, face and stance never changing, while her costume
swaps wholesale at intervals: a black evening dress, a silver sheath with a
feather boa, a fairy-tale gown, a bunny costume with a trophy. Each swap happens
in a single frame, with a brief one-frame flash of white. The background changes
with the costume: ballroom, garden, forest, festival square.

## What was built
A single figure, centered and large (spanning roughly 78% of frame height), whose
face, stance, and body geometry are identical in every state. Only the costume
layer and the flat background change:

0. Black evening dress on ballroom #e8dcc4 (tall white windows, gold chandelier,
   gold floor line).
1. Silver sheath with a white-and-gold feather boa on garden #2f4636 (gold path
   strip, silver bench bars).
2. Gold fairy-tale gown with puff sleeves on forest #1e2e22 (black silhouette
   trees, gold moon).
3. White bunny costume (long ears, gold trophy in hand) on festival square
   #e8c9a8 (black dais, gold bunting line).

The costume holds 5 seconds, then swaps on its own; the four-state sequence
cycles every 20 seconds. Tapping swaps immediately to the next costume in the
fixed sequence. A tap never pauses the figure and never restarts the sequence:
the 5-second hold simply re-anchors at the tap, and auto-advance continues from
there.

## Adaptations
- Figure as a layered sprite: constant head (ivory face, dark hair cap, dot eyes,
  mouth line), ivory arms, black shoes; per-state costume layers only.
- Swap as an instantaneous layer switch plus one white frame: the frame drawn at
  a segment boundary is solid white; the very next frame shows the new costume.
  Implemented as a closed-form function of piece time and the recorded tap list,
  never frame-integrated state, so every frame is reproducible from the same
  event list.
- Gowns drawn as single quad paths (an early two-triangle build left a visible
  diagonal seam down the dress; fixed, all renders re-done).
- Arms drawn over the costume so they stay visible where a wide gown would
  otherwise swallow them.
- Fully silent (no AudioContext at all). No offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing. No visible
  text besides `<title>`; no role labels, per the prompt.
- No fading alphas are used at all (every fill is opaque), so the node-canvas
  scientific-notation alpha quirk cannot bite. Dots are own-beginPath arcs with
  a moveTo first, or filled rects.
- Top-level geometry variables are named CW/CH, not W/H: the QA harness
  (render-piece.js) declares its own const W/H in the same eval scope, and a
  `var W` in the piece throws at load. Caught during QA, renamed, re-verified.
- Phone: centered composition keeps its shape; the page ground takes the current
  state's background color. Checked at 390 wide with no clipping.

## Verification
Rendered with node ~/workspace/tools/render-piece.js at 1280x900, 390x844, and
720x720; all three inspected. Thumb renders byte-identical across repeated
renders.

Forced-time probe harness (vm-isolated instance, piece driven via
window.__piece.draw(t), taps via window.__piece.tap()):
- stateAt: 0 at t=0, 1 at t=5, 2 at t=10, 3 at t=15, back to 0 at t=20.
- t=0 redraw diff 0 px; fresh t=20.05 vs t=0 diff 0 px (loop closes exactly).
- Signature colours per settled state: black dress 78,222 px on ballroom
  374,052 px at t=0; silver sheath 41,326 px on garden 440,412 px at t=6; gold
  gown 82,829 px on forest 396,052 px at t=11; white bunny 45,570 px on square
  433,815 px at t=16.
- Head-zone ivory essentially constant across states (5,493 / 5,481 / 5,481 /
  5,487 px; the 12 px spread is background props at the zone edge, the face
  drawing itself is identical code in every state).
- White flash: t=5.0 is fully white (518,400 px); t=5.05 has 0 white px.
- Tap at t=3 advances immediately to state 1 (silver 41,326 px at t=3.1);
  a second tap at t=3.5 advances to state 2 (gold 82,829 px at t=3.6);
  auto-advance still runs, reaching state 3 at t=8.6.
- Token scan clean: no Math.random, createElement, Path2D, shadowBlur,
  AudioContext, getUserMedia, or gradient constructors.
