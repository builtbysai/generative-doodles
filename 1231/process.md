# №1231 — Just One Peek (Aftermath)

Leslie Supnet study block LS8 (PP390), after her 2025 film *Just One Peek* on social
media addiction. The piece is the aftermath, not the feed: a dark ink room where
phantom notification shapes float like dust and dissolve when touched. A lone
figure sits in the corner. Nothing here rewards interaction with content —
dissolving is the whole verb.

## The room

Flat ink shapes only. Two walls meet at a corner line (62% across): back wall
#17161D, side wall #100F13, floor #0C0B0F below the 78% floor line, baseboards,
two faint floor seams running into the corner, and one dark window on the side
wall with no light through it. The figure is a seated silhouette (#0A0A0A) in the
lower-left corner — hunched back, bowed head, knees up, legs along the floor —
with a bone (#E8E2D4) rim light stroked along its lit edges.

## The phantoms

46 phantom ranks, each with seeded static parameters (shape, size 15–41 px,
path speed, wander phases, a fixed current lane). Three abstracted shapes,
outlined in screen-glow gray #8A93A8: rounded rectangles, heart outlines, bell
curves. No logos, no app UI, no counts. Every third rank carries an "unread"
core in notification red #C62B5E (a small filled circle, or a small filled heart
inside the heart phantoms). "Glow" is a larger, fainter outline copy behind each
shape at flat alpha — no shadowBlur, no gradients.

Positions are closed-form functions of piece time: each phantom follows an
analytic path entering at the upper right (the feed direction) and sweeping down
across the room on summed-sine wander, with per-phantom lane offsets so the
current spreads like dust rather than a queue. Nothing is frame-integrated.

## Density waves (90 s cycle)

One envelope N(t) governs how many ranks exist:

- **build** [0, 35): N rises 6 → 46; each rank fades in as N passes it
- **crest** [35, 55): N = 46; unread cores brighten (crest factor ramps 33–38 s, out 52–57 s)
- **empty** [55, 90): N falls 46 → 2; a #2E4A5A tint wash passes over the room,
  peaking mid-phase at alpha 0.16

Frame one is fixed at T0 = 24 s (build phase). Envelope math:
N(24) = 6 + 40 × (24/35) = **33.43** — ranks 0–32 fully present (33 phantoms),
rank 33 fading in at 0.43; 12 of the admitted ranks carry red cores. A few
phantoms sit near their path entry (off-frame right / edge-faded) at any given
instant, so the on-frame count reads in the high twenties, thickening toward 46
at the crest.

## Interaction

- **Tap a phantom → it dissolves.** Hit-testing runs against the closed-form
  positions at tap time; the nearest phantom inside its radius bursts into 5
  short line fragments on seeded velocities (a pure function of t − t_dissolve,
  gone after 0.8 s) and stays absent for the rest of that wave cycle. It can
  only return when the next wave builds. That is the only tap verb — a small
  mercy, not a control.
- **Drag → stirs the currents.** Drag samples are recorded (t, x, y); phantoms
  within 120 px of a sample receive a radial offset that decays closed-form
  over 3 s. A press that lands on a phantom is a dissolve, not a stir.

## House rules

- Canvas sized from the Visual Viewport API (visualViewport + window resize
  listeners); canvas CSS size pinned in draw().
- Phone detection via window.screen physical size (min dimension < 700 px),
  aspect fallback h > w × 1.15.
- Determinism: synchronous first frame at fixed phase T0 = 24 s; the rAF loop
  (typeof-guarded) is anchored as T0 + elapsed. All randomness is a seeded
  sine hash — no unseeded randomness anywhere.
- Silent. No gradients, no ctx.filter, no shadowBlur, no createElement, no
  ImageData / offscreen canvas, no microphone. No visible text beyond <title>.

## Files

- `index.html` — the piece (md5 9096426b66fdca31a069eb1b1dff8a98)
- `thumb.png` — 720×720, rendered from the live script; rendered twice and
  byte-compared (cmp): **byte-identical**
- `qa-desktop.png` — 1280×800 render
- `qa-mobile.png` — 390×844 render

Frame-one read (all sizes): dark corner room with window and floor seams, the
seated rim-lit silhouette lower-left, and a spreading field of gray phantom
outlines — rounded rectangles, hearts, bells — drifting in from the upper
right, about a third of them carrying red cores.
