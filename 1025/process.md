# No.1025 "The Body the Lights Agree On"

Study #126 tomoaki-yanagisawa, PP186 "Seven Points" (LED Mesh Frame tracking).

## Concept

Seven infra-red markers hang in black space. They are shown this once, small and dim and honest, because they are the truth of the piece rather than its subject. Between them a faint frame is implied, and the seven points move as one rigid body: the constellation never deforms, because a motion capture system does not recognize a shape, it recognizes a single solid thing. Across that body, projection light plays: cool white sweeps and amber pools that conform to the frame wherever it turns. Halfway through the 45 second loop the markers sink to near invisibility, the tracking an audience must never see, while the light keeps dancing on the ghost of the frame. The body is gone; the performance continues.

The performance is the light. The markers are only ever the quiet evidence underneath it.

## Construction

- Stage: flat #060607. Page ground matches, so the stage takes the whole screen.
- Constellation: seven local points generated once from a mulberry32 stream seeded 1025186: six at seeded angles and radii (0.34 to 0.50 before normalization), one near the middle. The set is then normalized so the largest radius is exactly 0.5, which keeps the body's apparent size identical for any seed. The locals array is never mutated after the build; a new body (double-tap) rebuilds it wholesale from a fresh seed.
- Frame: the edge set is computed once from the locals: a monotone chain convex hull gives the cycle, hull chords (i to i+2) and spokes from the interior point to its two nearest and one farthest hull vertices complete it. Lines are stroked in #2A2D36 and the hull is filled with the same tone at 0.42 alpha, an implication rather than a mesh.
- Rigid transform: one transform for everything. Angle, center drift are closed-form sums of sines on the 45 s loop period (plus its first harmonic), so the loop is seamless by construction. World position of a point is center plus scale times the rotation of its local coordinates. Markers, frame, hull clip and washes all inherit this single transform; there is no per-point state anywhere in the file.
- Light: washes are evaluated in the frame's local space and drawn under a clip of the transformed hull polygon, so the light conforms to the body exactly. The cool sweep is five layered flat-alpha strips of #F4F6FF (widths 0.46 down to 0.07, alphas 0.05 up to 0.26) crossing on a 15 s cycle with a fixed local lean. The amber pools are two drifting points in local space, each drawn as six concentric flat-alpha discs of #FFB545 at 0.05 per layer. No gradients anywhere.
- Ghost phase: a marker factor envelope on the loop: full from 0 to 20 s, smoothstep down between 20 and 22.5 s to 0.067 of full (the 0.06 alpha floor over the 0.9 base), held to 27.5 s, smoothstep back by 30 s. Only the marker layer reads this envelope; the frame and the light ignore it.
- Frame one is a synchronous draw at the fixed piece time T0 = 8 s (markers full, the sweep band near local x = 0.06, mid-crossing). The animation loop, where present, advances piece time from that offset using the rAF clock; nothing drawn is ever derived from a wall clock date.
- Interaction: drag grasps the body. The drag target is the pointer's rotation about the body's current center plus its translation, applied to the rigid transform as a whole through a spring (stiff while held, softer on release, settling back to the closed-form path over roughly 4 s). Individual points cannot move relative to each other under any input. Tap triggers a relight: one extra sweep band crossing over 6 s with a sine envelope, kept in a small event list. Double-tap reseeds the constellation.
- Sound: created lazily inside the first pointer gesture, every use typeof guarded. A low sawtooth servo hum through a lowpass, its pitch following the analytic angular velocity of the transform; a looped noise wash through a bandpass whose gain follows the sweep band's presence in the frame; a falling sine as the markers cross into the ghost phase and a rising sine as they return.
- Sizing: canvas from the Visual Viewport API with resize listeners on both visualViewport and window; canvas style width and height are pinned in px on every draw. Phone detection uses window.screen physical size (min dimension under 700 px), with the tall-aspect test only when screen data is absent. On phones the body scale factor is 0.88 of the short side instead of 0.92, because the center drift is a fraction of width and at 0.92 the rightmost marker's halo touched the frame edge (see QA log).

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png). All three render cleanly in silence: no audio is attempted without a gesture, and the script draws its first frame synchronously.
- Read back desktop: a large faint polygonal frame on black, seven small dim red markers (six on the hull, one interior with its spokes), the cool white sweep band crossing inside the polygon and clipped by it, two amber pools glowing in the upper-left and center. Nothing of the light escapes the hull.
- Read back thumb: same composition at square aspect, body large in frame, markers small and legible, sweep mid-crossing.
- Read back mobile, first pass: the rightmost hull marker sat on the frame edge (center drift of 0.027 of width plus the 0.94 phone scale left no room for its halo). Fixed by reducing the phone scale factor to 0.88; re-rendered mobile shows clear margin on all four sides with the whole constellation, sweep and pools intact.
- Determinism: thumb.png rendered twice and compared with cmp: byte-identical. The duplicate render was deleted. Frame one depends only on the seed and the fixed T0.
- Rigidity verification: the build math was replicated in a throwaway probe. All 21 pairwise distances between the seven points were computed in world pixels (1280x900 geometry) at piece time t = 8 s and again at t = 31.7 s, two unrelated phases of the tumble. The two distance sets are identical to three decimals (525.152, 637.082, 794.960, 601.644, 343.640, 367.387, 202.146, 619.618, 667.899, 669.741, 310.774, 449.637, 578.665, 680.350, 312.405, 319.533, 617.598, 452.196, 331.054, 378.429, 373.239 px), with a maximum absolute difference of 2.3e-13 px across all pairs, which is floating point noise. This holds by construction: the locals are constant and a single rotation plus translation preserves distances exactly; the probe confirms the code does what the construction promises.

## Deviations

- Phone body scale 0.88 rather than 0.92 of the short side, for the clipping reason recorded in the QA log. Desktop and thumb keep 0.92, and the prompt's requirement that the constellation fills the view still holds at both.
- The double-tap reseed draws its seed from Math.random inside the pointer handler. Frame one and every seeded state before any visitor input are unaffected; the randomness exists only in a gesture path, the same sanctioned pattern used by No.1001 and No.1012.
- The amber pools use six flat alpha layers at 0.05 rather than a soft radial falloff, per the standing no-gradient rule; the layered discs read as pools at stage scale.
