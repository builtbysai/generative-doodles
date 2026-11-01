# Winch Ballet

## Concept

№1083 takes Syn's winch-lofted truss system at face value: the choreography is wire length. Three white triangular truss frames hang in a dark void, each corner on its own wire running up to an implied ceiling rig that is never shown; the wires simply exit the top edge of the frame. The frames adjust height, roll and pitch continuously, but nothing floats — every attitude change is the winches paying wire out or hauling it in, corner by corner. Small white markers sit at the corners and catch the light in brief glints. A slow strobe washes the scene in alternating cyan and magenta, six seconds a colour, and the frames cast soft shadows diagonally across an implied floor.

Frame one is fixed at 10 seconds into the ambient canon: the front-left frame hangs largest, the mid frame up and to the right, the small back frame low at centre, all three mid-attitude with the magenta half of the wash up and catching the tubing.

## Construction

Each triangle is three corners in a fixed local layout (apex, bottom-left, bottom-right). Every corner has its own anchor point on the implied rig far above the frame and a fixed wire direction, slightly slanted. A corner's screen position is anchor + direction × wireLength(t), so position is a closed-form function of the wire lengths alone. Height is the mean length across the triplet; pitch and roll are the differentials — each corner carries its own two-layer sine for length, so the frame tilts because one winch is paying out faster than the others. A slow pendulum sway, proportional to how much wire is out, and a gentle horizontal skew across the frame's height complete the suspended read: the frames never rotate freely, they hang.

The unattended canon layers a small bob over a slow dip that visits each frame in turn — one dip per 24 seconds, staggered by thirds, so the three frames dip, tilt and recover in canon. Every period in the piece (bob, dip, sway, skew, corner lengths, glints, the 12-second wash) divides a 120-second loop, so the whole system is seamless. The strobe wash is a raised-cosine pulse per colour, kept low: a faint global tint over the void plus a tint pass over the tubing as the colour passes. Corner glints are a sharpened sine (eighth power) per corner, drawn as a small cross sparkle over the steady white marker point. Shadows are the triangle's own outline projected onto a floor line — vertically compressed, stretched toward the lower right — drawn as flat shapes in the shadow colour before the wires and frames.

Interaction is one gesture, per the prompt:

- Drag a frame and you re-target its winches. Vertical drag pays wire out or hauls it in (target height, clamped); horizontal drag re-rolls the frame (target skew, clamped). The response is an analytic envelope, not integrated physics: a roughly two-second damped settle toward the nudged target (fast exponential attack), a short hold, then a slow exponential release as the unattended canon resumes. The released drag is stored as a timestamped event per frame, and live and past events are evaluated as closed-form functions of recorded events and elapsed time — no frame-integrated state anywhere.

The truss is drawn as thick outer chords, a thinner inner triangle, and struts from each corner to the two opposite inner corners. Depth is carried by scale, line weight and alpha: front frame largest and brightest, back frame smallest and dimmest, drawn back to front. No gradients, filters, shadow blur, offscreen canvases, or element creation anywhere; all softness is layered flat alpha.

The canvas uses Visual Viewport dimensions with resize listeners on both the Visual Viewport and window, pins its CSS pixel size during setup and drawing, detects phones from the physical screen size with an aspect fallback (frames ride slightly larger on phones), and guards the animation loop when requestAnimationFrame is unavailable. The piece is silent: no audio is specced, so none is made, and no microphone is used.

## QA log

Rendered with `node ~/workspace/tools/render-piece.js`:

- Desktop: 1280 × 800, saved as `qa-desktop.png`.
- Mobile: 390 × 844, saved as `qa-mobile.png`.
- Thumbnail: 720 × 720, saved as `thumb.png`.

The desktop frame shows the near-black void plum-tinted by the magenta wash; three white truss triangles at varied depths and attitudes — front-left largest, mid-right higher, back-centre smallest and lowest — each drawn with outer chords, inner triangle and webbing struts, and each hanging from thin wires that run straight out of the top edge with no rig visible. White marker points sit at the corners, with a sparkle glint caught at the right corner of the back frame and the mid frame. Soft dark shadows stretch diagonally lower-right beneath the frames. The mobile frame keeps the full square composition legible and full-bleed, the frames slightly enlarged, wires still exiting the top. The only text in any render is the document title.

Determinism was checked by rendering the 720 × 720 frame twice and comparing the files byte for byte. They matched (`cmp` clean). The duplicate was deleted. The synchronous first frame is drawn at the fixed 10-second phase, and the animation loop continues from that same phase offset, so frame one never depends on wall-clock or setup time.

Hygiene checks found no date-derived frame state, external assets, absolute URLs, visible text beyond the document title, gradients, shadow blur, canvas filters, offscreen canvas creation, element creation, audio, or microphone access.
