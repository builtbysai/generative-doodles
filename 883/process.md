# No.883 — Noisy Nebula

Study #108 bnsh_av, PP44 "Full System". His Patreon "Full Systems" sell the whole
TouchDesigner patch behind a finished piece, not a single effect. This piece is that
patch, exposed and playable: four visual layers stacked into one image, each with a
fader, each with a voice. There is no play button and no timeline. The piece is
performed, not played.

## Concept

A dark field where four layers composite additively into a "finished" nebula:

1. **NEBULA** — 400 drifting particles in dim indigo with a pale-violet hot core,
   distributed with radial falloff around a center that slowly rotates.
2. **WEB** — an ice-blue filament network: 26 points on independent Lissajous paths,
   joined by lines wherever they pass within range of each other.
3. **SMEAR** — magenta feedback trails left by 34 comets crossing the field.
4. **GRAIN** — a faint white speckle finish over everything.

The layer stack is drawn on the piece itself as four thin fader strips down the left
edge (NEBULA / WEB / SMEAR / GRAIN) plus a MASTER strip along the bottom. Mute all
but one layer and you see the skeleton; bring them all up and the nebula blooms.

## Construction

**Layer/fader model.** Each layer owns a gain (0–1). Defaults: NEBULA 0.8, WEB 0.6,
SMEAR 0.5, GRAIN 0.4, MASTER 0.9. A *target* gain is what the visitor sets; a *shown*
gain eases exponentially toward it (rate 9/s), and the shown value drives both the
canvas alpha and the matching WebAudio gain node, so ear and eye ride the same fader.
Effective gain = shown gain, except during a solo (below), multiplied by MASTER at
draw time and at the master audio node.

- Drag vertically on a strip: sets that layer's target from the pointer height in the
  strip. Strips are drawn 12 px wide but hit-tested over 36 px so they stay tappable.
- Drag horizontally on the MASTER strip: sets the whole-patch target.
- Drag on the field: the conductor's hand. Horizontal movement accumulates a rotation
  offset applied to the nebula; vertical movement bends the smear amount (trail steps,
  clamped to a 0.15–1.8 multiplier).
- Tap a strip: solo. For 5 sim-seconds the effective gains of the other three layers
  are forced to 0 (targets untouched), then the mix restores itself.
- Double-tap the field: snapshot. The layer clock freezes at the double-tap instant
  and every layer is drawn at that held time for 3 sim-seconds, then releases.

**Layers are seeded closed-form systems.** Nebula particle positions are a seeded
base offset rotated by (0.02·t + conductor offset) with a per-particle wobble; web
points and smear comets are sums of sines in t. Nothing is integrated frame to frame,
so any layer can be drawn at any t — which is what makes the snapshot freeze exact
rather than a screen grab.

**Smear adaptation (deviation, recorded).** The prompt describes feedback as drawing
the canvas into itself. The house renderer has no offscreen canvas and the technique
would also break the determinism gate (frame one must be reproducible byte-for-byte).
The smear is therefore analytic: each comet's trail is a polyline through its own
closed-form positions at t − k·0.055 s, k = 1…26 (scaled by the smear amount), with
alpha and width falling along the trail. Same visual fact — long magenta persistence
threading the frame — reached without sampling the framebuffer. At t = 0 the trails
are already fully developed because the position functions evaluate into negative
time.

**Grain.** Seeded per frame index: the grain field for frame ⌊18t⌋ is generated from
mulberry32(9000 + frameIndex), so the speckle is a pure function of the layer clock,
identical on every render.

**Audio.** Lazy and typeof-guarded; created only inside the first pointerdown, so
the piece renders in total silence in QA. Four voices mirror the four layers through
per-layer gain nodes into a master gain: NEBULA is a deep drone (55 / 82.41 / 110.3 Hz
through a 220 Hz lowpass), WEB a pair of high sines with slow tremolo, SMEAR a looped
noise buffer through a bandpass, GRAIN a seeded crackle — short noise pops scheduled
from a dedicated RNG stream at a rate proportional to the grain gain. No microphone.

**House rules.** Single self-contained file, canvas 2D only. Canvas size from the
Visual Viewport API with resize listeners on both visualViewport and window; canvas
CSS size pinned in px inside draw(). Phone detection via window.screen (min dimension
< 700 px) with the h > w·1.15 aspect as fallback only; on phones the grain count drops
and labels shrink, strips keep their 36 px hit width. Palette strict: #050508, #3B2E7A,
#B8A9FF, #7FD8E8, #FF2E88 (smear trails only), #E8E8E0. The only visible text is the
five specced strip labels and the title. No gradients, no shadowBlur, no ctx.filter,
no offscreen canvas. Frame one is the synchronous draw at t = 0 with the default mix;
no Date.now anywhere; requestAnimationFrame typeof-guarded.

## QA log

- `render-piece.js` at 1280×900 (qa-desktop.png), 390×844 (qa-mobile.png), 720×720
  (thumb.png). Script runs cleanly in the harness (no AudioContext, no rAF): frame
  one is the synchronous draw.
- Determinism: thumb.png rendered twice and `cmp` byte-compared — identical. The
  duplicate was deleted.
- Desktop read-back: indigo nebula cluster with a bright violet-white core right of
  center; ice-blue web polygon spanning the frame with nodes; long magenta comet
  trails threading through; faint grain speckle in the dark; four labeled strips at
  left with fills at 0.8 / 0.6 / 0.5 / 0.4 and cap lines; MASTER strip along the
  bottom filled to 0.9 with its label above the left end.
- First pass fix: the nebula read as a tight ball (radial exponent 1.7 over-clustered
  the center). Loosened to 1.3, raised the outer-particle alpha, and lifted trail
  alpha 0.20 → 0.27; re-rendered all three sizes and re-ran the byte-compare.
- Mobile read-back (phone path): whole composition holds in the tall frame — strips
  and labels legible down the left, MASTER strip and label unclipped at the bottom,
  nebula core, web, and trails all inside the frame.
