# No.894 Bliss Seed

Study #109 klsr.av, PP55 "The Seed".

## Concept

A dim starburst seed sits at the exact center of a near-black field and never
moves. It is a held breath: a gray core with short faint blades in all
directions. The only way it grows is patience. Sustained touch near the seed
feeds a growth value G; roughly thirty seconds of cumulative care carries it
to full bloom, where the blades lengthen and brighten from gray to off-white,
extra blade pairs cross in, and the star resolves into the cross-flare
geometry of a lens artifact, a long horizontal blade crossed by a vertical
beam, with a violet fringe at the tips that exists only at full growth.
Starved, it sighs back down toward the dim seed, but it never dies: a floor
keeps it always revivable. A tap is one drop of light. A double-tap commands
rest, five seconds at its dimmest, then it resumes. Sound starts on the first
gesture and blooms with the picture: a soft tone cluster that gains harmonic
partials as G rises, with a faint shimmer at full growth.

Readout word rule: the tiny word at the bottom reads SEED while G < 0.5 and
BLOOM while G >= 0.5. It is the only visible text besides the title.

## Construction

Single self-contained index.html, canvas 2D, no external assets. Palette is
strict: ground #050506, seed gray #C8C8CC, grown blade #E8E8E0, fringe violet
#8A5CFF, center white #FFFFFF.

Growth model. G is a closed-form function of the recorded event history and
t, never frame-integrated state that drifts. Pointer contact is recorded as
segments, each classified near or far by whether the pointer is within 15% of
frame width of the center; a segment splits whenever the classification
changes. G(t) is evaluated by walking the sorted critical times (segment
edges, bump times, rest edges) and applying, per interval: near segments rise
at 1/30 per second (so about 30 s of cumulative near-touch takes G from 0 to
1; from the seeded start of 0.2 it is about 24 s), all other time decays at
1/50 per second toward the floor of 0.06, and rest intervals pin G to the
floor. Frame one is G = 0.2 exactly: the synchronous draw at t = 0, with no
wall-clock input. Per-blade length jitter comes from a mulberry32 stream
seeded once at load, so the star is asymmetric but identical on every visit.

Blades are pure functions of G. Eight star directions; the diagonals stay
short while the horizontal and vertical blades scale with the frame and with
G until they dominate at high G. Two extra faint blade pairs cross in past
G 0.3 and G 0.65. Each blade is a pointed lens path drawn as five stepped
flat-alpha passes, widest and faintest first, narrowest and brightest last,
and the core is layered flat-alpha discs. There are no canvas gradients, no
shadowBlur, no ctx.filter, no offscreen canvas. The violet fringe is small
discs at the four cross tips, alpha driven by smoothstep(0.85, 1, G).

Interaction. Drag or hold near the center to feed; distant swipes do nothing.
A tap (short, nearly still) adds +0.04 to G and fires a soft expanding pulse
ring drawn from the same event list. A double-tap (two taps within 0.4 s)
commands rest instead. Audio is created lazily inside the first pointer
gesture, typeof-guarded: five sine partials of a 196 Hz fundamental whose
gains switch on at G thresholds 0, 0.25, 0.45, 0.65, 0.8 using the same
closed-form G the visuals use, plus a high shimmer partial that only sounds
near full growth. No microphone.

Sizing follows the house rules: Visual Viewport API with resize listeners on
visualViewport and window, canvas style width and height pinned in px inside
draw(), phone detection from window.screen physical size (min dimension
under 700 px) with the aspect test only as fallback. The rAF loop is guarded
by a typeof check; the piece draws one complete frame synchronously at load.

Deviations, with reasons:

- Tap bumps land 0.33 s after the tap rather than instantly. A double-tap
  must be able to pre-empt the bump and become a rest instead; the short
  disambiguation window is the established house pattern for tap/double-tap
  pieces, and growth and the pulse ring both read the same derived event
  list, so picture and growth stay in step.
- Soft blade falloffs are stepped flat-alpha passes instead of gradients,
  per the renderer limits recorded for this series. The passes are fine
  enough that the blades read as continuous light.
- Decay runs toward a floor of 0.06 rather than to the starting 0.2, so a
  long-starved seed reads dimmer than a fresh one while still never dying,
  as the prompt requires.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). The piece
  renders complete in silence; no AudioContext exists in the harness and none
  is touched.
- Determinism gate: thumb.png rendered twice and byte-compared with cmp:
  identical. Frame one is the synchronous draw at t = 0 (G = 0.2); no
  Date.now() or wall-clock value feeds any drawn state.
- Read-back: desktop and thumb show the near-black field with a small dim
  gray starburst exactly at center, cross blades slightly longer than the
  diagonals, a bright core, and SEED small at the bottom. Mobile shows the
  same composition in the tall frame, seed centered, readout legible,
  nothing clipped. No fix round was needed.
