# No.643 — Amanecida en Cerro Castillo

EXPANSION #78 paulo-cox, prompt block 3 "Amanecida" (verified verbatim from TASKS.md).

## Concept

Paulo Cox's dawn post ("Amanecida en cerro Castillo", Folio No.16) as a fixed-scene
temporal loop. One ridgeline, drawn once from a single seeded function, never changes.
The sky above it cycles through the night-to-dawn sequence as flat color bands:
night indigo, pre-dawn violet, dawn rose, daybreak gold, then back. Stars fade as
the bands shift. Once per loop, at peak dawn, a single condor silhouette crosses
the sky, slow and unhurried, wings flat, and is gone. Then night returns. The
mountain does not move; the hour does.

Watch-only loop of about 90 seconds. Tap forces one immediate dawn: the phase
jumps to the start of the gold window (condor crossing included) and the loop
continues from there through dusk back to night. Never click-to-reload.

## Construction

Single self-contained index.html, canvas 2D only, no external assets.

Palette (strict, no more): ridge black #0C0F14, night indigo #141B33, pre-dawn
violet #3A2E5C, dawn rose #E89B7D, daybreak gold #E8B93B, star white #F2EDDA,
condor black #0A0C10.

Sky: four stacked flat rectangles with hard edges (band boundaries at 0, 0.28,
0.52, 0.76, 1.0 of the sky depth, meeting the ridge baseline exactly). No
gradients, no sun disc. Band colors lerp in RGB between phase keyframes:

| phase | top     | upper   | lower   | bottom  | reading     |
|-------|---------|---------|---------|---------|-------------|
| 0.00  | indigo  | indigo  | indigo  | indigo  | night       |
| 0.34  | indigo  | indigo  | indigo  | indigo  | night holds |
| 0.45  | indigo  | violet  | violet  | violet  | pre-dawn    |
| 0.55  | violet  | violet  | rose    | rose    | dawn rose   |
| 0.62  | violet  | rose    | rose    | gold    | peak dawn   |
| 0.69  | violet  | violet  | rose    | rose    | dusk rose   |
| 0.79  | indigo  | violet  | violet  | violet  | dusk violet |
| 0.89  | indigo  | indigo  | indigo  | indigo  | night       |
| 1.00  | indigo  | indigo  | indigo  | indigo  | night       |

The low bands warm first on the way up (violet and rose reach the bottom band
before the top), matching how a real amanecida climbs from the horizon.

Ridgeline: 361 samples from one seed-fixed function (mulberry32, seed 0xCE570):
two octaves of cosine-interpolated value noise for the base swell (26 knots at
0.08–0.30 of the ridge band, plus a 110-knot jagged octave at 0.055 amplitude)
and nine steep gaussian spires sharpened by a 0.55 power curve, seven of them
clustered at x 0.40–0.64 (the Cerro Castillo towers) with two outlying crags.
Baseline at 0.72 of frame height, ridge band 0.44 of frame height, so the
massif sits in the lower third and the towers rise well above the swell.

No-offscreen note: the original prompt suggests rendering the ridge once to an
offscreen canvas and reusing it. This environment has no offscreen canvas, so
the ridge is instead redrawn every frame from the same precomputed seed-fixed
sample array. The drawn output is identical every frame and every loop, which
is what the prompt's rule protects: the ridge never regenerates.

Stars: 170 dots from a second seeded stream (seed 0x57A25), fixed positions in
the upper sky, radius 0.6–2.1 px. Opacity is a pure function of phase via a
daylight factor (0 at night, 1 at phase 0.62): alpha = 1 − smoothstep(0.10,
0.55, daylight), with a whisper of twinkle (±18%) driven by the anchored phase
only. Stars are fully gone by peak gold.

Condor: drawn only while phase is inside the gold window [0.545, 0.695] (about
13.5 s of the 90 s loop). Progress q maps x from −0.10 to 1.10 of frame width
(left to right) and y along a slight arc (0.215 → 0.170 → 0.215 of height). The
silhouette is one fixed pose: two broad flat wing polygons held in a shallow V
(dihedral built into the polygon coordinates), body ellipse, small head, fanned
tail trapezoid. There is no wing animation parameter anywhere in the code; the
condor soars and never flaps.

Phase plumbing: the phase is a pure function of the anchored elapsed clock
(rAF timestamps; phase = (elapsed / 90 + phaseOffset) mod 1). Tap adds the
offset that lands the current phase exactly on 0.545. Frame one is the
synchronous draw at phase 0 (full night: indigo bands, stars out, ridge black,
no condor) before any rAF runs. rAF is typeof-guarded.

Sizing: canvas from the Visual Viewport API with resize listeners on both
visualViewport and window; canvas.style.width/height pinned in px inside draw()
every frame. Phone detection via window.screen physical size (min dimension
< 700 px) with aspect h > w × 1.15 as fallback; on phones the scene refits the
taller frame (same normalized geometry, slightly smaller condor and stars) and
the page ground is the night indigo.

QA hook: an inert `?t=<seconds>` query freezes the synchronous frame at that
loop time. It exists so the headless QA renderer (which has no rAF) can verify
non-zero phases. It changes nothing without the query string.

## QA log

Renderer: `node ~/workspace/tools/render-piece.js` (node-canvas, no rAF, no
AudioContext, no document.createElement, no offscreen canvas, no ctx.filter).

- qa-desktop.png (1280×900), frame one: full night. Indigo sky, dense star
  field, black massif across the lower third with a cluster of seven steep
  spires mid-ridge and outlying crags, no condor, no text. Pass.
- qa-mobile.png (390×844), frame one: same scene refit to the tall frame,
  spire cluster legible, nothing clipped. Pass.
- thumb.png (720×720): rendered twice and cmp byte-compared: identical.
  Second render deleted. Determinism gate passes.
- Forced dawn check: throwaway render at /tmp with `?t=55.8` (phase 0.62,
  peak gold). Verified visually, then deleted. It showed: top band violet,
  upper and lower bands rose, lowest band flat gold, hard band edges, no sun
  disc, stars fully gone, condor mid-crossing at frame center with broad flat
  wings in a shallow V and fanned tail, and the ridgeline pixel-identical to
  the night frame. Pass.
- Grep checks on index.html: no Date.now, no Math.random, no createElement,
  no AudioContext, no gradient constructors, no external URLs, no em dashes.
  All randomness is mulberry32 with fixed seeds.

Fix round during build: the first ridge sat too high and read as smooth
rolling dunes (crest near mid-frame). Base knots were lowered (0.08–0.30 of
the band), the baseline moved to 0.72 of height, a jagged second noise octave
was added, and the spires were narrowed and sharpened. Re-rendered and
re-verified after the fix, including the byte-compare.

## Deviations

- Offscreen-canvas ridge caching replaced by per-frame redraw from the
  precomputed seed-fixed samples (see the no-offscreen note above). Reason:
  the renderer and house rules forbid offscreen canvas creation; the redraw
  satisfies the prompt's actual requirement, a byte-identical ridge.
- The peak-gold keyframe puts gold only in the lowest band, with rose above
  it and violet at the top, rather than washing the whole sky gold. The prompt
  names daybreak gold as the peak of a band sequence and forbids a sun disc;
  a horizon band of gold under rose and violet is the amanecida the reference
  post describes, and it keeps the flat-band discipline legible.
- The condor window [0.545, 0.695] is slightly wider than the exact gold
  keyframe span so the full crossing (entering from off-frame left to leaving
  off-frame right) happens while the low band is gold or lerping through rose
  at the gold end of its range. The bird is never on screen outside the dawn.
