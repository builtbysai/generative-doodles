# Selva — No. 486 (EXPANSION #58 giuliadallara, prompt GD6)

## Concept

A screenprint-like emblem after Giulia Dall'Ara's Dante Plus "Selva": a classical
profile portrait (Dante in laurel) in burnt orange on a dark brown panel, ringed by
sage-green botanical forms carrying chunky decorative halftone dots, the whole piece
held inside a dotted zigzag border frame on cream. Three inks only: burnt orange
#C65A1E, dark brown #2E1D12, sage #9AA87E, on cream #F2E8D0. No text except the single
lowercase hint "tap" in the bottom-right corner, dark brown at 50% alpha.

Tap reseeds: a new profile (seeded brow slope, nose length and angle, chin set, skull
shift), a new foliage arrangement and a new laurel, always in the same three-ink
system. There is no ambient motion and no animation loop; the piece is still.

## Construction

Single self-contained `index.html`, 2D canvas only, no external assets. The
composition lives in a 1000x1000 design space fitted and centred with
`Math.min(vw/1000, vh/1000)`, so it keeps its shape on phones; the page ground is the
cream everywhere. Canvas size comes from the Visual Viewport API with resize
listeners on both `visualViewport` and `window`; `draw()` pins
`canvas.style.width/height` in px every frame. Phone detection uses `window.screen`
(min dimension < 700px) with the aspect fallback `h > w * 1.15` only when screen
dimensions are unavailable.

All state derives from one seed via `buildState(seed)`, driven by a mulberry32 RNG.
The load state uses the fixed house seed 486058, and the first frame is drawn
synchronously at load, fully formed: profile, laurel, foliage, halftone and border.
Nothing is derived from `Date.now()`; there is no `requestAnimationFrame`, no audio,
no offscreen canvas and no `document.createElement`. A tap (`pointerdown`) advances
the seed with an LCG step, rebuilds the state and redraws. Never a page reload.

Profile: a single filled burnt-orange silhouette. `profilePoints()` returns seeded
control points ordered from the front shoulder, up the front of the neck, throat,
under-chin, chin, lips, mouth, nose underside, nose tip, bridge, brow, forehead,
crown, the back of the skull, the back of the neck and down to the rear shoulder;
`smoothThrough()` draws a Catmull-Rom spline (converted to bezier segments) through
them and the bust base closes with a straight line. The head spans design y 196 to
798, about 60% of the frame height, faces left and sits centred. Two details are cut
in the ground colour: one filled eye ellipse and a two-arc ear in dark brown at 55%
alpha, plus a drape line across the base of the neck at the same alpha.

Leaves: every leaf is a precomputed parametric sprite. Its outline samples the
half-width profile `sin(pi * u^0.75)` (pointed at base and tip) around a slightly
bent centreline, stored as point data. Halftone dots are tested against that same
profile in JS: dots are kept where the across-axis offset fraction falls inside the
profile at that u, biased to 0.5–0.9 so they cluster along the leaf edges with a
density falloff toward the tip, plus sparse interior dots; radii are chunky
(roughly 1.4–4.5 design px). This is pure point data per seed, not composite masking
on a second canvas.

Foliage: a mirrored ring of leaf pairs on an ellipse (radii about 332 x 318) around
the portrait, tips pointing outward with seeded rotation jitter, plus burnt-orange
berries tucked at some leaf bases (suppressed on the two topmost leaves so a berry
never lands on the brow). Four corner sprigs, each a short sage stem quadratic with
three fan leaves, answer the ring in the panel corners. Everything botanical is drawn
behind the portrait.

Laurel: a sage stem drawn as an ellipse arc (centre 498, 422; radii 176 x 236; from
195 degrees to 345 degrees) over the head, with 13 leaves placed on a slightly larger
matching ellipse (radii + 14) so the wreath reads clear of the silhouette, each leaf
rotated to the ellipse tangent minus 0.55 rad with seeded jitter.

Border: a zigzag polyline on the cream band at inset 54, step 40, amplitude 13,
alternating vertices offset inward; corner vertices stay on the rectangle so all
four corners turn cleanly. A burnt-orange dot (radius 5) sits on every vertex. The
dark brown panel fills inset 84 to 916 behind the composition.

## QA log

Rendered with `node ~/workspace/tools/render-piece.js` at all three sizes:

- `qa-desktop.png` (1280x900): the emblem sits centred on cream with wide margins;
  the profile reads instantly as a noble left-facing head — clean nose, lips and
  chin, no caricature — with the laurel arc clear over the crown, the sage ring and
  corner sprigs filling the panel, chunky halftone along the leaves, and the dotted
  zigzag border complete on all four sides with clean corner turns.
- `qa-mobile.png` (390x844): the square emblem fits the width and centres
  vertically on cream; nothing is clipped, the border and hint survive at small
  size, and the profile still reads at a glance.
- `thumb.png` (720x720): same composition at gallery size; three-ink screenprint
  look holds, halftone stays chunky and decorative.

Determinism: `thumb.png` rendered twice and compared with `cmp` — byte-identical.
The second render was deleted.

Iteration notes: the first render's laurel sank into the silhouette (leaves centred
on the head's own contour), so the laurel ellipse was enlarged and its leaves pushed
14px outward along the radial; the corner sprigs were too thin, so their leaves were
lengthened and widened and the stems shortened; one berry landed on the forehead
edge and top-leaf berries were suppressed. All three renders were re-read after the
final pass.

Deviations: none from the brief. The tap hint sits in the bottom-right corner of the
cream margin below the panel, as the panel itself is dark brown and the hint is
specified in dark brown at low alpha.
