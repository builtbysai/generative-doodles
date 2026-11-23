# №1981 The Shadow In Frame

CR6 / PP1228, study #258 ciara-reddy, completing the study. Gallery date 2007-06-15, shown as "2007 · 06 · 15". Interaction cue: drag to move the light.

## What the piece does

An overhead shot: a figure floats diagonally in still teal water among seeded rocks, arms out, hair fanned behind the head, faint ripple rings around the torso and thin sunlit caustic rings drifting on the water. Then the long shadow of the person holding the camera crosses the frame diagonally, over the water, the rocks and the figure's edge, and leaves. The shadow is a readable silhouette: round head, round-capped torso, two arms reaching forward to a camera box with a lens dot, drawn in three passes at growing scale and falling alpha so its edges stay soft in dark gray, semi-transparent at the edges. The image is about being inside the thing you are making.

- Cycle, 30 s: the shadow centre travels the diagonal from the lower edge (off frame) to the upper edge (off frame). At the first frame it is mid-crossing over the lower water and rocks, clear of the figure's face.
- The diagonal is offset perpendicular (down-right) so the shadow's centre passes below the figure's face: it crosses the torso, legs and arms, and only grazes the face's edge for a brief moment around t = 20.

## FIRST_T

FIRST_T = 11 s. At t = 11 the shadow centre sits at about (0.47W, 0.76H), mid-crossing over the lower water and rocks, overlapping the figure's legs, with the face fully clear. The frame is a pure function of the virtual clock plus drag state; no wall clock or Date is read for animation state, and all randomness comes from a seeded PRNG (mulberry32) or a deterministic hash.

## Interaction

Drag to move the light. A horizontal pointer drag re-aims the directional source within a small arc (clamped to plus or minus 0.5 radians, about 29 degrees), so the photographer's shadow swings across the scene on your hand. Release and the angle eases back to 0 in the motion loop, settling into the slow automatic crossing. There is no click to reload and no reseed. In reduced motion mode there is no automatic loop; a drag still re-aims the light and redraws.

## QA hooks

- `?t=<seconds>` sets the virtual clock at load; `?seed=` is an alias (the render tool passes its probe value as `?seed=`).
- `?sx=<degrees>` sets the light angle offset at load.
- `window.__draw(t)` drives draw() with a virtual clock.
- `window.__piece1981` exposes `firstT`, `cycle`, `state(t)`, `light()`, `setLight(a)`, `drag(dx)`, `release()` and `redraw(t)`.

## Probes

Rendered with node ~/workspace/tools/render-piece.js from the actual script. Note: the render tool resizes its canvas to the stage, so each PNG is the stage only (828x828 desktop, 390x844 mobile, 720x720 thumb).

- t = 11, desktop 1280x900, mobile 390x844, thumb 720x720: figure fully in frame, face clear, shadow mid-crossing over the lower water and the figure's legs, caption and hint legible, no clipping or overlap. Clean on all three sizes.
- t = 2: shadow just entering from the lower edge, figure and rocks clear. Confirms the entry.
- t = 20: shadow passing the figure's shoulder and arm edge, face clear (the offset diagonal keeps it off the face). Confirms the face rule holds at the closest pass.
- Drag probe (small node harness using `window.__piece1981.setLight(0.4)` at t = 11): the shadow swings to a visibly shallower angle, 39,371 pixels differ from the first frame. Confirms drag re-aims the light.
- Release probe (`setLight(0)` then redraw at t = 11): 6 pixels differ from the thumb, max channel difference 2, a text anti-aliasing artifact of drawing through the harness rather than the render tool. The frame returns to the first frame for practical purposes.
- Determinism: thumb rendered twice with the render tool is byte-identical, md5 43e6e69a3f7c3596f44facbbfd573421 both times.
- Listeners confirmed in every render log: pointerdown, pointermove, pointerup, pointercancel, pointerleave, window resize, visualViewport resize.

## Fix rounds

Two fix rounds after the first render pass.

- Round 1: the figure's legs ran off the top-right corner because the head-to-feet angle pointed up-right instead of down-left. Fixed by flipping the body angle to 2.49 radians. The hair fan was a ring of beads around the head; fixed to fan behind the head only, away from the body. The shadow was a malformed single path that rendered as a dark block; rebuilt as separate simple shapes (head circle, round-capped torso stroke, converging arm strokes, camera rect with lens dot). The water bands were too stripey and the caustic arcs read as bowls; bands softened, arcs replaced with thin faint full rings, ripple rings reduced from five centred on the head to three centred on the torso.
- Round 2: at t = 20 the shadow crossed directly over the face. Fixed by offsetting the whole crossing diagonal perpendicular (down-right) by 0.10W / 0.08H, so the shadow passes below the face and only grazes its edge. The camera box still read as a wide frame with the arms; narrowed the camera rect and converged the arms toward it. Verified in the re-rendered t = 20 probe: face clear.

## Deviations from the prompt

None visual. The prompt's "photographer-rig shadow caster attached to the camera" is implemented as the shadow silhouette itself, whose angle is driven by the drag-re-aimed light; there is no separate rig object in the scene, since the scene is the photograph being taken.

## Known warts

- The caustic rings still read slightly as faint bubbles scattered on the water at thumb size; they are thin and low alpha, and they drift, which sells them as light on water in motion.
- On the tall phone stage the shadow at first frame sits well below the figure, detached from it; it is mid-crossing and reaches the figure later in the cycle, which is the point of the diagonal, but the first phone frame reads more as two separate subjects than the desktop frame does.
- One rock near the lower left can read as a dark hole where the shadow passes over it; it is a rock under the shadow, not a gap.
