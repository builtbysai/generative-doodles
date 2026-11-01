# No.1000 — Draw What the Blade Does

Study #123 yuya-hanai, PP161 "Fencing Visualized" (2013): sword tips carry
retroreflective markers, motion capture samples them, and their paths are
drawn as red and cyan ribbon trails on a dark piste. The trail is the
artwork; the movers themselves stay nearly invisible.

## Concept

Three invisible movers duel across a black field inside a barely visible
piste rectangle. Nothing of them shows except a dim short streak at each
head (white at 0.35 alpha) and one constant: a bright 2 px marker dot, the
retroreflective point. Everything else is history: each mover's true
positions are rendered as a tapering ribbon (red, cyan, and white for the
fastest) that persists about six seconds and fades. Where paths braid,
crossing events flash as small bright nodes. If the movers vanished, the
drawing would still be complete. No blades, no masks, no sport imagery:
the drawn path is the piece.

Interactions: tap a ribbon to follow it (it stays bright for 10 s while
the others dim to 0.35); drag to stir the air (movers curve around the
finger); double-tap for a new bout (reseed, ribbons cleared and rebuilt).

Sound (first gesture only, lazily created and guarded): one thin sine
whistle per mover, pitch following its speed, gains kept tiny; a bright
short metallic tick when a crossing is detected.

## Construction

- Fixed-timestep simulation at 120 Hz. Movers are spring-steered agents:
  each steers toward a wandering target at its own cruising speed (red
  0.62, cyan 0.78, white 1.00 field-units/s; 1 unit = piste height), with
  pairwise duel forces (mild attraction at engagement range, strong
  repulsion inside 0.10 units), seeded wander kicks, and velocity
  reflection at the piste bounds. Speeds are clamped per mover so white
  stays fastest and nobody stalls.
- Every step, each mover's position is pushed into a 720-sample ring
  buffer (6 s of history). Ribbons are drawn from those buffers as
  polyline runs of 9 samples, oldest first, width tapering from 5 px at
  the head to 0 at the tail and alpha decaying as (1 - age/6)^1.55.
  Every ribbon segment is a true recorded position; there is no ornament.
- Crossing detection runs inside the sim: head-to-head proximity under
  0.022 units, or a head entering another mover's recorded trail
  (checked at stride 10), spawns a flash node at the braid point with a
  per-pair cooldown of 0.45 s. Flashes live 0.5 s.
- Pointer input is recorded as state and consumed by the fixed steps:
  the drag well applies a tangential plus slight outward force so movers
  curve around the finger; tap hit-testing searches the real buffers;
  the follow window and double-tap window are measured in sim steps.
- Determinism: frame one is the synchronous draw after exactly 1440
  pre-roll steps (12 s) from the seeded build (mulberry32, seed
  1000161). No wall clock feeds any drawn state; the live loop only
  advances the same sim in capped fixed steps.
- Canvas size comes from the Visual Viewport API with resize listeners
  on both visualViewport and window; the canvas CSS size is pinned in
  px on every draw. Phone detection uses window.screen's physical size
  (min dimension under 700 px) with the aspect fallback. The page ground
  is the field tone and the piste scales inside the frame.

## QA log

- Rendered with the house node-canvas renderer at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
  The piece renders cleanly in silence: no requestAnimationFrame, no
  AudioContext, no document.createElement in the harness.
- Determinism: thumb.png rendered twice and byte-compared with cmp;
  the two renders are identical. The duplicate was deleted.
- Read-back of all three renders: near-black field, faint piste outline,
  three long tapering ribbons (red, cyan, white) sweeping and braiding
  across the frame, bright marker dots at the heads, dim streak heads,
  and bright crossing nodes where the ribbons braid. Nothing clipped on
  mobile; the piste scales inside the tall frame.
- One fix round: the first ribbon pass drew its 9-sample runs
  edge-to-edge, which left one-sample gaps and a dashed look; runs now
  share an endpoint sample, so the ribbons are continuous. All sizes
  re-rendered and determinism re-verified. A probe harness also
  confirmed one crossing flash is live at frame one with the shipped
  seed (its soft halo sits under a braid point, as specced at 0.5 s).

## Deviations

- Ribbon history is stored at the full 120 Hz sample rate (720 samples,
  6 s) rather than a 360-sample buffer drawn at stride: the brief
  allowed either, and the full-rate buffer keeps every segment a true
  position history with smooth taper.
- Crossing brightening is implemented as discrete flash nodes at
  detected braid points (the brief's specified approximation) instead of
  an additive pass over whole ribbons, which would not be
  crossing-specific.
- The specced soft exhale for fading ribbons is skipped (the brief
  allows this); the whistles and crossing ticks carry the audio.
- A second, inner piste hairline is drawn at reduced alpha to suggest
  the long piste rectangle; both lines use only the specced piste color.
