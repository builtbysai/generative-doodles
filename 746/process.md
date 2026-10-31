# No.746 "Afrum Corner"

EXPANSION #91 james-turrell, prompt block 3 "Afrum Corner". After Turrell's
Afrum-Proto (1966-67): a flat projection of light aimed into a room corner
that the eye reads as a luminous cube hovering just off the wall.

## Concept

A dark room corner, drawn in weak two-point perspective: two wall planes, a
ceiling line, a floor line, and the vertical corner seam running the full
height of the frame. On the corner sits the projection: one square of warm
white light, thrown from an unseen projector across the room. Nothing in the
piece is a drawn cube. The bright shape is a single flat square of light
landing on two angled walls, and the fold where it crosses the corner seam
is what the visual system assembles into a solid, floating cube: a hexagon
silhouette whose top and bottom points sit on the corner line, with a
vertical front edge between them.

The projection breathes plus or minus 2 percent, a projector lamp's idle.
A tap re-aims the projector: the corner placement and the beam's shear move
to the next seeded configuration over a 0.8 s eased pan, and the cube
re-forms at the new corner. There is no projector, no UI, and no text on the
piece beyond the title.

## Construction

Single self-contained index.html, canvas 2D, no assets. Palette is strict:
room #0D0D0F, cube face #FFF4E0, edge falloff #E8D8B8, wall spill #3A3428.
Falloff and glow are layered alpha only; there are no canvas gradients and
no shadowBlur anywhere in the piece.

The room is screen-space decor over the model: ceiling and floor planes are
flat polygons tinted with the spill tone at very low alpha (0.05 and 0.085),
the two walls are separated by a whisper of the same tint (0.015 left, 0.04
right), and the corner seam is stroked soft and then thin so it reads above
and below the projection and anchors the fold.

Projection math. The room corner is modeled in real 3D: the corner line is
the world y axis, the left wall is the plane x + z = 0 (its x <= 0 half),
the right wall is -x + z = 0 (x >= 0 half), a true 90 degree corner. The
camera is a pinhole at (0, 0, -4.5) with focal length 0.88 times the smaller
frame dimension; a configuration's cornerShift slides the projected corner
line across the frame. The virtual projector stands across the room at
(projX, projY, projZ), z between -5.6 and -5.0, aiming at a target near the
corner line. Its beam is a square through the target, perpendicular to the
aim direction, with half-size 0.66 to 0.95. The square's boundary is sampled
at 84 points; each sample casts a ray from the projector that is solved
against both wall planes, and the valid hit (correct half-plane, first along
the ray) becomes a boundary vertex of the light shape in 3D. Walking the
boundary, wherever consecutive samples land on different walls, the exact
corner crossing is found by bisection on the sign of the left-plane
intersection's x coordinate; at the crossing both plane solutions agree on
the corner line itself. Those two crossing points split the loop into a
left-wall polygon and a right-wall polygon that share the corner segment.

Each half is drawn as ten nested passes, spill first at 1.34 scale, then
falloff, then the face color rising to alpha 0.97 at 0.72 scale. Inset
passes lerp ordinary vertices toward the half's centroid, but the two
corner vertices lerp toward the shared corner segment's midpoint, so the
kink stays exactly on the corner line at every pass and the two halves
never gap or overlap along the fold. A per-face brightness multiplier comes
from the incidence angle between the projector direction and each wall's
normal, clamped to 0.80..1.0, so the face turned more squarely to the
projector sits slightly brighter, as it does in the room.

Configurations form one seeded sequence from a mulberry32 stream (seed
746013), generated lazily in tap order. Their ranges are constrained so the
beam square always straddles the corner (|tgtX| <= 0.18 against half >=
0.66): both walls always catch the light and the shape can never collapse
into a one-wall kite. Frame one is the synchronous draw at t = 0 with
configuration 0 and breathing phase 0 (multiplier exactly 1). Interactions
are recorded tap times; live parameters are a closed-form easeInOutCubic
lerp over each 0.8 s transition, so any frame is a pure function of the
seed, the taps, and t. No Date.now, no Math.random, no audio, no
microphone. Sizing follows the Visual Viewport API with resize listeners
on visualViewport and window; the canvas style size is pinned in px on
every draw; phone detection uses window.screen's smaller dimension under
700 px with the h > w * 1.15 aspect fallback.

Geometry tuning, recorded honestly: the first build threw the beam from
z = -3.3 with the camera at -6, and it read wrong. From that throw, the 3D
height of the top edge drops where it crosses the corner faster than
perspective can lift it, so the silhouette pinched inward at the corner and
the shape read as an open book. Moving the projector back to z = -5.6..-5.0
(a long throw, like the real xenon setup across the room) and the camera in
to -4.5 flipped the balance: the top and bottom edges now peak at the
corner line, the outline is the classic Afrum hexagon, and the fold reads
as the front edge of a hovering cube. All adjustment was in the model's
distances, not in the drawn shape: the polygon is still nothing but the
projected square, kinked by the corner.

## QA log

Rendered with node ~/workspace/tools/render-piece.js (node-canvas, no
requestAnimationFrame, no AudioContext in the harness):

- qa-desktop.png (1280x900): dark corner with ceiling and floor lines
  converging on a vertical seam slightly left of center; the projection
  sits mid-frame as a warm white folded square, top edge peaked at the
  corner line, the seam continuing visibly above and below it, soft layered
  falloff at the edges and a faint spill halo. It reads as light wrapped
  around the corner, not a flat card.
- thumb.png (720x720): same composition, tighter; hexagon silhouette and
  corner kink clear.
- qa-mobile.png (390x844): corner centered, projection whole and unclipped
  in the tall frame, seam runs full height.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. The duplicate render was deleted.
- Two geometry rounds during QA (the book read, then the squat read) are
  recorded under Construction; final ranges are the ones in the file.
- Audit: no Date.now, no Math.random, no createElement, no AudioContext,
  no external URLs, no em dashes in the piece. The only visible text is
  the <title>.

Deviations: none from the prompt's substance. The prompt's tap behavior
(the corner position and the polygon's shear shift to a new seeded
configuration) is exactly what is built; the transition is an eased 0.8 s
pan of all parameters at once rather than a cut, which the prompt's
"re-aims" wording allows. The idle breathing is plus or minus 2 percent
on a 7 s period, phase 0 at load.
