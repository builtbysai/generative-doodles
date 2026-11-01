# No.1022 — Sit Down, Move Through

Study #125 yuta-asai, PP183 "The Chair Moves You" (multiplex VR chair).

## Concept

The viewer is strapped into a chair that glides, slow and heavy, through a 360° data field. The world is not scenery: a seeded corridor of data (point clouds, wireframe rings, detection-box constellations, depth washes) streams past the viewpoint with true parallax, so the motion is proved by the field itself. The only interface is a faint wireframe chair outline at the bottom of the frame, tilting with the banking. No HUD, no gauges, no text. Drag steers the chair with weight and lag; a tap commits it to a seeded dive or rise; a double-tap reseeds the sky.

## Construction

- **Camera model.** The viewpoint is a closed-form function of piece time t: forward glide z = 2.0t along a wrapping corridor of depth 140 units; lateral sway, rise, yaw, pitch and bank are sums of slow sines (periods roughly 30–230 s, bank peaking near 6 degrees). Frame one is the synchronous draw at fixed offset T0 = 16 s, a pure function of the seed: no wall clock, no springs, no visitor state feeds it.
- **Projection.** Each field element is projected against the camera with yaw and pitch rotations, perspective divide by depth, and a final screen-space rotation by the bank angle. Near points cross the frame faster than far ones; that differential is the parallax and it is computed, not faked. The corridor wraps modulo its depth, so the glide is endless and the field never empties.
- **Field.** All content is generated from a mulberry32 seed: 760 points (430 on phones) at varied depths with per-point size and a gentle twinkle; 8 wireframe rings drawn as doubled ellipse outlines whose squash slowly tumbles; 6 detection-box clusters (a main bracket plus seeded satellite brackets) that blink on seeded periods and are visible only briefly per cycle; 5 depth washes built from six nested flat-alpha ellipses (no gradients). One ring, one cluster and one wash are hero-placed relative to the frame-one camera position so the first frame always composes: ring passing upper-frame, constellation drifting in, chair tilted a few degrees.
- **Interaction.** Dragging sets target bank/yaw/pitch offsets that a stiff, heavily damped spring (k = 5.5, damping ratio 0.92) chases, so the chair feels massive; on release the targets zero and it eases back onto its arc. A tap records a maneuver event: a 4 s closed-form envelope (sin squared) added to the camera height and pitch, alternating dive and rise by tap count. A double-tap reseeds the field and clears maneuvers. Springs and events never exist at frame one, so the determinism gate is untouched.
- **Sound.** Audio is created lazily inside the first pointer gesture, typeof-guarded, and is silent in QA: a low airy two-oscillator tone through a lowpass whose pitch tracks glide speed and steering effort, a short band-passed creak when the bank spring works hard, and a rising or falling sweep for each maneuver.
- **House rules.** Single self-contained file, canvas 2D only. Canvas size comes from the Visual Viewport API with resize listeners on both visualViewport and window; style width/height are pinned in px inside draw() every frame. Phone detection uses window.screen's physical min dimension (< 700 px) with the tall-aspect fallback; on phones the point count steps down to 430, the focal length widens, and the field's vertical spread scales by 1.8 so the tall frame stays full. No gradients, no shadowBlur, no ctx.filter, no offscreen canvas, no Date.now. Palette is the specced six tones only.

## QA log

- Rendered with the house renderer at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). Renders cleanly in silence; listeners registered for resize and pointer events only.
- Determinism: thumb.png rendered twice and byte-compared with cmp — identical. The duplicate render was deleted.
- Read-back, desktop: black void with white points at varied sizes spread across the frame, cyan wireframe rings upper-frame (one passing at the left edge), faint blue depth washes behind the mid-field, red bracket constellations left and right, and the dark chair outline at the bottom tilted with the bank.
- Read-back, thumb: hero ring upper-center, bracket clusters on both sides, washes faint, chair whole and dark at the bottom.
- Read-back, mobile: the field fills the tall frame after the portrait adjustments below; rings cross the top, the chair sits whole at bottom-center, nothing clipped except one ring exiting the top corner as it passes overhead.
- Fix rounds: (1) the first build's point spread (±16 x, ±9 y) compressed the cloud into the center and left the frame edges empty — spreads widened to ±26 x, ±15.5 y, point radii raised; (2) depth washes read as hard-edged blue discs — per-layer alpha lowered and layers increased from five to six; (3) on the tall phone frame the field collapsed into a middle band and very near rings ballooned across the screen — portrait vertical spread scaled, phone focal length widened, and rings now fade in with depth and are skipped when they would exceed 1.15x the frame's short side.

## Deviations

- Phone point count steps down to 430 from 760, per the brief's allowance; recorded here as required.
- Ring "passing overhead" moments can carry a ring partly out of frame at the edges; this is the specced behavior (the data streams past), kept, but rings are depth-faded and size-capped so they never swallow the whole frame.
- The maneuver envelope returns the chair to its arc after about 4 s rather than permanently offsetting the path; the dive/rise reads as a committed rush of data and the loop stays a closed glide, which keeps every later frame reproducible from the event list.
