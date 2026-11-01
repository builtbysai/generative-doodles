# The Chair

## Concept

No.1071 turns Yoichi Sakamoto's motion-linked multiplex VR chair into a quiet first-person ride. The viewer is not shown a headset, avatar, or game cockpit. A simple dark chair remains anchored at the bottom of the frame while a cold data landscape drifts past in fog. The subject is the bodily sensation of being carried: structures approach at different rates, the horizon stays low, and the seat banks gently with the recorded path.

Frame one is fixed at 18 seconds, already inside the flight. The chair leans a few degrees, the warm cushion catches the only warm color in the piece, and pale structures stand at several depths ahead.

## Construction

The flight is a closed-form 55 second loop over a 660 unit circuit. Phase starts at 18/55. The camera path is an analytic sum of sines rather than a frame-integrated simulation:

- Lateral position: `15 sin(0.0105 z) + 9 sin(0.021 z + 1.7)`.
- Vertical position: `3.2 sin(0.016 z + 0.4) + 1.4 sin(0.033 z + 2.1)`.
- Forward position advances uniformly through the loop, so the same phase always produces the same view.

Thirty-two structures are generated with a seeded Mulberry32 stream. Their positions are distributed around the full circuit and their lateral anchors are defined relative to the camera path at the same forward coordinate. Side structures keep at least 54 units of clearance, while gate structures span the path and are passed underneath. This makes collision avoidance a property of the layout rather than a runtime steering rule. Four procedural families are used: solid monoliths, tapered pylons, gates, and stacked panels.

Projection uses the wrapped forward distance for scale and parallax. Far structures are drawn first and nearer structures last. Ground guides at five lateral offsets expose the changing path and speed without adding a visible interface. Fog is built from flat translucent bands and depth-darkened panels because gradients are prohibited.

Banking comes from the second derivative of the lateral path, clamped to keep the motion calm, plus a very small rig sway. The landscape counter-rocks at 18 percent of the chair bank. Dragging adds a recorded lean offset; on release that offset decays through a closed-form damped return. Tapping advances the phase smoothly to the next of eight waypoints. A double tap advances the seed and regenerates the landscape without reloading the page.

The chair is drawn in a local coordinate system as furniture only: a broad back, a warm seat cushion at the specified 0.4 alpha, side supports, and a low base. Its proportions increase on phone-sized screens. The canvas uses Visual Viewport dimensions, listens for resize on both the Visual Viewport and window, pins its CSS pixel size during setup and drawing, and guards the animation loop when requestAnimationFrame is unavailable.

Audio is created only after the first pointer gesture. A seeded noise buffer feeds a low-pass wind layer, and a low sawtooth supplies the motor whir. Filter and oscillator frequencies follow the ride state, including the faster phase change during a waypoint jump. A stereo panner follows bank when the browser provides one. No audio is created during QA rendering.

## QA log

Rendered with `node ~/workspace/tools/render-piece.js`:

- Desktop: 1280 x 900, saved as `qa-desktop.png`.
- Mobile: 390 x 844, saved as `qa-mobile.png`.
- Thumbnail: 720 x 720, saved as `thumb.png`.

The desktop frame shows a low horizon, near and far pale structures, visible fog bands, and the chair as a dark back and base with a warm horizontal cushion. The seat is banked gently rather than level. The thumbnail preserves the same hierarchy at gallery size: central gates and pylons remain distinct, and the chair reads immediately against the dark ground.

The mobile frame keeps the full chair inside the portrait view, with its base at the bottom edge and the cushion legible. The landscape remains full-bleed; near structures may leave the side edges as they pass, which is intentional first-person parallax rather than clipped interface content. No text is visible in any render.

Determinism was checked by rendering the 720 x 720 frame twice and comparing the files byte for byte. They matched. The duplicate was deleted. The synchronous first frame explicitly uses elapsed time zero after setup, preventing machine-dependent setup time from leaking into the phase.

Hygiene checks found no date-derived frame state, external assets, absolute URLs, visible text beyond the document title, gradients, shadow blur, canvas filters, offscreen canvas creation, element creation, or microphone access.

## Deviations

- The recorded path is represented by closed-form sine functions instead of a stored spline. This preserves a repeatable recorded ride while making the first frame and every loop phase exact.
- Fog uses layered flat alpha shapes rather than volumetric rendering or gradients, following the house rendering constraints.
- The prompt's sound is gesture gated and created lazily, following browser policy and the house audio rule. The visual piece is complete without sound.
- During drag, only the chair and rig lean change. The underlying flight path remains fixed, as specified.
