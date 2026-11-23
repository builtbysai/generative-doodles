# №125 · Rayhatch Co-create - process notes

## Concept
After Piter Pasma's Universal Rayhatcher and the fx(params) idea: a live raymarched world the viewer shapes. A soft blobby form floats in the dark, its surface described only by hatch lines whose length follows the light, and three invisible zones along the bottom strip let the viewer's drags morph the form, move the light and change the hatch density. Every touch makes a unique edition; the audience completes the work.

## Construction
- Single self-contained page, no libraries, no WebGL. A compact sphere tracer in 2D canvas marches each ray (up to 64 steps, analytic bounding-sphere reject first) through an SDF of exactly three primitives: a sphere, a torus and a rounded box, blended by a morph parameter (sphere to torus to box) with a gentle sine displacement so the form stays soft. Normals come from the SDF gradient; shade is a wrapped diffuse term.
- Rendering is hatching, not shading: the march runs on a reduced grid (cell about a 220th of the frame's short side, finer on small screens) and full-resolution hatch segments are drawn from it. Layer one lays diagonal segments whose length grows with the light; layer two cross-hatches only in strong light. The deepest crevices (shade under 0.10) take the one accent, deep teal #1F6E6B, instead of warm white #EDE6D6. Ground #101012. On narrow frames the camera pulls back so the form always fits.
- The form rotates slowly on its own. Dragging in the bottom strip: left third morphs the form, middle third moves the light, right third changes hatch density. Dragging anywhere else orbits the form. Double-tap randomizes all parameters, a fresh edition. No sliders, no buttons, no visible chrome; the zones are invisible.
- Full-bleed on phones. Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px each frame; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load and requestAnimationFrame is guarded so node-canvas QA works.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before reporting. The first frame already shows the fully developed hatched form (the marcher is stateless per frame): cross-hatch in the lit upper right, sparse diagonal ticks in shadow, teal sitting in the lower-left crevice.
- One fix during QA: the first build framed the form too small (about half the frame height); the camera moved closer and the portrait fit was recomputed, so the form now floats large on desktop and fits phone widths with margin. Render time for a full desktop frame is well under a second in the QA harness. Hans's real-device check is the final gate.
- Deviation: on large frames the march grid is coarser than strict half resolution (about quarter) to hold the frame rate with 64-step tracing; the hatch strokes themselves are drawn at full resolution.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short.
- Files: `125/index.html`, `125/thumb.png` (720x720, rendered from the live script), `125/process.md`. Gallery entry to be added to pieces.json by fly with the formula date 2002 · 05 · 16.
