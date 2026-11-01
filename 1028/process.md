# No.1028 "The Machine, Placed"

Study #126 tomoaki-yanagisawa, PP189 "Black Cube" (Beyond Perception enclosure).

## Concept

A white gallery. On a white plinth, lower-center, sits a matte black cube: perfect, seamless, no lights, no ports, no vents, no branding. The black is total. The cube is not dead, though: it breathes, a slow brightness wave travelling across its faces, barely above black, like a sleeping animal. Beside it, a tenth-size black cube sits in attendance, still.

Above the machine, the gallery wall carries the cube's dreams: quiet ink-blue generative fields, washes and drifting contour lines, large and slow. The dreams follow the breath: every time the cube's pulse peaks, the wall imagery gently crossfades into a new field over three seconds. The relationship is the piece: the silent machine and its loud dreams.

Interactions: drag across the cube to wake it slightly (its breath quickens, the dreams intensify, then everything settles). Tap the wall for a new dream on command. Double-tap for a new machine. Sound, only after a first gesture: a sub-bass pulse on the breath, soft pads under the dreams, one clear tone when a dream is commanded.

## Construction

Single self-contained canvas 2D page. No external assets, no gradients, no shadowBlur, no filter, no offscreen canvas. All softness is layered flat-alpha shapes. Canvas size comes from the Visual Viewport API with resize listeners on both visualViewport and window; the canvas style width and height are pinned in px on every draw. Phone detection uses window.screen physical size (min dimension under 700px), with the aspect fallback h > w*1.15.

Determinism: frame one is the synchronous draw at fixed piece-time T0 = 20 s. Nothing in the drawn state derives from Date.now(); the animation loop, when requestAnimationFrame exists, only advances piece time as offset plus elapsed-since-load. Every random value comes from mulberry32 streams seeded by integer hashes.

Breath and dream coupling (the core mechanism):

- Breath phase is the integral of 1/period over piece time, integrated at fixed 1/30 s steps. The period is 7 s at rest and eases toward 3.5 s as the wake level rises. Wake level is a closed-form function of the recorded drag events (fast attack while a cube drag is held, exponential settle with an ~8 s tail after release), so the phase, and therefore everything downstream, is a pure function of (event list, t). Phase peaks are recorded during the integration scan, with the crossing time interpolated inside its step.
- Face shading is a per-face sample of the same breath pulse with phase lags (front 0, top 0.18 cycles, side 0.36 cycles), interpolated between #0B0B0C and #161618. At T0 the front face sits at the pulse peak, full sheen; the wave visibly travels face to face as the cube breathes.
- Dream change points are the breath peaks plus recorded wall taps. The current dream field index is the count of change points up to t, and the crossfade is a smoothstep over the 3 s after the latest change point, so the dream follows the breath by construction, not by a timer checked per frame.
- A dream field is fully seeded by (base seed, machine seed, field index): 13 ink or wash blobs, each drawn as 4 jittered overlapping sub-ellipses (seeded offsets and scales) so washes read as clouds rather than concentric targets, plus 7 contour lines from a seeded two-sine field, all drifting slowly with t. The morph clamp rule from sibling pieces is not needed here: fields never resolve into images at all, they are abstract washes by construction, and they evolve continuously within a generation as well as across the peak crossfades.

The gallery is layered flat tones (three wall bands lightening toward the top light, a floor band, hairline seam). The plinth is a flat box with a shaded side face; contact shadows under both cubes and under the plinth are layered flat-alpha ellipses. The small cube is exactly S/10 in linear size, floored at 9 px so it stays visible on small screens.

Audio is lazy: the AudioContext is created inside the first pointer gesture, typeof-guarded, and every audio call is wrapped. A 41 Hz sine's gain follows the breath pulse, three detuned triangles form the pad bed, and the wall-tap tone is a single 620 Hz blip. Audio never feeds back into the visuals.

## QA log

Renderer: node render-piece.js (node-canvas, no rAF, no AudioContext) at 1280x900, 390x844, and 720x720. The piece renders cleanly in silence; frame one is the fixed T0 draw.

Determinism: thumb.png rendered twice and byte-compared with cmp: identical. Re-verified after every retune round.

Read-backs:
- Desktop (1280x900): warm-white gallery with layered bands, ink and wash clouds dreaming across the upper wall with pale contour lines running through them, white plinth lower-center holding the matte black cube (top face faintly sheened at this phase, no detail anywhere on the cube) and the tiny attendant cube at its right, soft floor shadow under the plinth.
- Thumb (720x720): same composition; the dream field sits over the upper two-thirds, cube and attendant whole.
- Mobile (390x844, phone path via screen size): plinth and cubes lower-center and whole, attendant cube visible at the plinth's right end, dream field compressed above them, nothing clipped.

Retune rounds:
1. First build drew washes as three concentric scaled ellipses per blob: they read as grey target rings, far too large, with hard clip edges where the anchor region cut them. Blob radii shrank, ink share raised, contour amplitude cut (an early x7 gain made the lines jagged scribbles), contour sampling raised to 96 steps, and the dream clip changed from the anchor rectangle to the whole wall above the floor so washes are cut only by the frame edges.
2. Concentric layers still read as flat oval plates. Each blob is now 4 seeded jittered sub-ellipses; the targets became irregular ink clouds.

Deviations:
- The floor band (#EFEDE8) and plinth side shading are flat tones a few value steps from the specced gallery and plinth hexes, in the same spirit as the brief's layered-flat-tone top light: a single flat hex for wall, floor, and plinth made the placement unreadable. All dream and cube colors stay strictly inside the specced palette.
- The cube's three faces use base shades a step apart only through the breath lerp itself (front, top, side sample the same #0B0B0C to #161618 ramp at different phases), which supplies the "barely-different top face" the brief asks for without inventing new colors.
- Wall taps are debounced by 360 ms so a double-tap can be recognised as new machine instead of also firing a new dream; the dream change is timestamped at the tap itself, so the visual timing is the tap's, not the debounce's.
- The attendant cube's size is S/10 as specced, with a 9 px floor for legibility on narrow phones.
