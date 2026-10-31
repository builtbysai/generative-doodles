# No.900 Suspension of d_is/b[e]l/ie.'f

Study #110 sakrmusic, PP61 "The Broken Orb".

## Concept

A monochrome world with exactly one wound of color. A barren hillside
slopes diagonally from lower-left to upper-right under a pale sky; in the
lower-left a dark hooded figure sits cross-legged, holding a small device,
rendered as a pure abstract silhouette with no face or clothing detail.
Above mid-frame hovers the orb: the only magenta thing in existence. It
slowly alternates between a diffuse pink vortex and a contained sphere
with swirling pink-white interior streaks, drifting gently as it goes.

The baseline is the quiet hillside. Corrosion must be earned: dragging
tears scanlines across the slope and chews dark blotches into it, and the
orb is drawn toward the most-torn ground, feeding on the damage. Release
and the terrain heals over about twenty seconds while the orb drifts
home. A tap makes the orb churn, one violent internal swirl. A double-tap
detonates it: a single magenta-white flash and the glitch blown out
across the whole frame, then everything settles back to quiet. Sound
starts on the first gesture only: low wind, digital grit that rises with
the mean damage, and one deep boom for the detonation.

## Construction

Single self-contained index.html, canvas 2D only, no external assets.
Palette is strict: slope #2A2A2C, sky #B8B8B2, figure #0C0C0C, orb
magenta #FF2E9E (the only color), orb core #FFD6F2, glitch dark #141414,
and black at low alpha for scanlines and shading. No text anywhere except
the title.

Terrain model: the ridge is a seeded 1D value-noise fbm (three octaves,
smoothstep interpolation over a mulberry32-seeded table) warping a
straight diagonal fall from 0.80 of frame height at the left edge to 0.36
at the right. The ridge is tabulated once per resize (241 samples) and
inverted per row to find where each horizontal slice of slope begins. The
slope is drawn in horizontal slices of about H/130 so damage can tear
them: each slice is offset sideways in proportion to its row's mean
damage, with the direction taken from the seeded noise, and heavily torn
rows get a thin black seam line. Natural texture is 46 precomputed seeded
blotches (position, radius, alpha, squash) drawn clipped inside the ridge
polygon; they are visually distinct from damage because damage blotches
are denser, darker, and arrive only where a hand has been. One tuning
round during QA reduced the blotch size/alpha and the sky banding alpha
so frame one reads as the specced quiet baseline rather than a textured
screen.

The figure is four flat black shapes: a crossed-leg trapezoid wedge, an
elliptical torso, a hood arc over a head circle, and one small rotated
rectangle for the device, its outline reading against the slope where it
protrudes past the torso.

Damage model: a 28x28 grid of floats. Dragging deposits damage along the
pointer segment with radial falloff; the screenshot machinery never sees
any because frame one precedes all interaction. In the rAF loop the whole
grid decays exponentially (tau 6.5 s, near-clean in about 20 s).
Detonation adds 0.8 to every cell at the event moment. Mean damage
drives the audio grit gain and the strength of the orb's pull toward the
damage centroid; the centroid itself is computed from the grid each step
and the orb's bias toward it is a smoothed state (tau 2.2 s), so the orb
leans into corruption gradually and lets go gradually.

Orb model: the state mix is a smoothstepped sine LFO with a 47 s period,
phased so t = 0 is fully diffuse. The diffuse state is five spiral arms
drawn as per-segment strokes with width and alpha tapering along the arm,
over two soft heart discs and a small hot core. The contained state is
layered flat-alpha discs for glow (no gradients anywhere), a solid
magenta body, and seven spiral streaks clipped inside the body circle:
every third in orb-core pink-white, the rest as low-alpha black shadow
streaks, so no off-palette shade is ever introduced. Wander is closed-form
summed sines. The swirl angle is also closed-form: a base rate plus, per
recorded churn or detonation event, a saturating exponential term, so a
tap's violent spin-up and settle are exact functions of the event list.
The detonation flash is an exponential envelope (tau 0.35 s) over the
event times, drawn as expanding pink-white and magenta discs at the orb.

Canvas size comes from the Visual Viewport API with resize listeners on
both visualViewport and window; the canvas CSS size is pinned in px
inside draw() every frame. Phone detection uses window.screen physical
size (min dimension under 700 px) with aspect ratio only as fallback; the
diagonal composition is defined in normalized coordinates, so on a tall
phone the slope still runs corner to corner. Audio is created lazily
inside the first pointerdown and is fully typeof-guarded: pinkish looped
noise through a lowpass for wind (with a slow LFO on its gain), the same
noise waveshaped and highpassed for grit, and a sine dropping 95 to 28 Hz
for the boom. The piece renders complete in silence.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png). All three show the quiet frame
  one: pale grey sky, a dark diagonal hillside running lower-left to
  upper-right, the abstract black seated figure with its device in the
  lower-left, and one magenta spiral orb hovering above mid-frame.
  Magenta is the only color in any render; nothing is clipped on mobile.
- Determinism: thumb.png rendered twice and byte-compared with cmp;
  identical (re-verified after the tuning round). The duplicate render
  was deleted. Frame one is the synchronous draw at t = 0 with the damage
  grid all zero; no Date.now anywhere, and grep confirms no gradients,
  shadowBlur, ctx.filter, or offscreen canvas.
- One tuning round: the first read-back had the natural mottling reading
  as deliberate dark ovals and the sky banding reading as screen stripes.
  Blotch radius and alpha ranges were cut roughly in half and the sky
  band alpha cut to about a third; renders redone and the byte-compare
  rerun green.
- Deviations from the brief: none of substance. Two recorded choices:
  (1) the contained sphere's darker interior streaks are low-alpha black
  rather than a darker magenta, because the palette is strict and a
  mixed shade would be a second color in spirit; (2) the damage grid is
  frame-integrated state driven only by recorded pointer events (the
  sanctioned interaction pattern), while everything visible at frame one
  (terrain, figure, orb state, wander, swirl) is closed-form, keeping the
  determinism gate exact.
