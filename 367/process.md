# No.1064 Doors of Light

Study #131 yoichi-sakamoto, prompt YS1 / PP225 (optical walls, 2019 / 2022).

## Concept

A dark, misty room where light is the building material. Seven thin white
rectangle frames nest inside each other like a tunnel of doorways, receding
from 70 percent of the frame width down to 15 percent. No frame is aligned
with the next: each is rotated a few degrees off its neighbour, which is the
signature of the inspected optical walls photographs. Small lens discs hang
on hair-thin wires above some of the frames; they are the sources the planes
of light come from. The frames breathe and swing slowly; mist drifts through
the planes. White light only, clinical, never neon. The frames are
architecture, not ornament.

## Construction

- Canvas 2D, single self-contained file, no assets. Strict palette: void
  #030304, frame core #F4F6F8 at 1.0, glow pass #DCE8FF at 0.5, lens discs
  #FFFFFF, wires #1A1C20, mist #0C0E12.
- Frame / lens model: every frame is a rectangle hung from a pivot point on
  its top edge (pivot offset seeded along the edge). The pivot's world
  position is fixed at build time as C + Rot(rot) * P. At time t the frame's
  angle is rot + swing + tilt and every corner maps as Wp + Rot(angle) *
  (q - P), so the frame genuinely rotates about its hanging point. A lens
  disc, where present, sits on the same axis above the pivot at a seeded hang
  distance; its world position is Wp + Rot(angle) * (0, -hang), so it rides
  the same pendulum. Its wire is drawn vertically from the top of the view to
  the disc (gravity, not frame rotation).
- Sizes fall geometrically from 0.70 to 0.15 of the world side; aspect ratios
  1.22 to 1.40; centre jitter up to 0.015. Rotation steps between consecutive
  frames are seeded at 1.2 to 4.9 degrees with mixed signs, cumulative clamp
  about 11 degrees, so misalignment is always visible but never chaotic.
- Motion is closed-form in piece time t. Breathing is a 2 percent scale
  oscillation; swing is a 0.6 to 1.3 degree pendulum oscillation. All periods
  are drawn from divisors of 60 (breathe 12 / 15 / 20 / 30 s, swing 20 / 30 /
  60 s, mist 20 / 30 / 60 s), so the whole room repeats exactly at 60 s.
- Mist: 16 seeded blobs, each drawn as 5 layered ellipses in #0C0E12 whose
  radius grows as alpha falls (data-drawn, no gradients). About 70 percent
  drift behind the frames, the rest in front at reduced alpha, so mist passes
  through the planes. Drift is sinusoidal on loop-divisor periods.
- Frame rendering: two strokes of the same path, a wider #DCE8FF pass at 0.5
  beneath a sharp #F4F6F8 core at 1.0. No shadowBlur, no gradients, no
  offscreen canvas anywhere.
- Interaction: drag near a frame (nearest by normalised local distance,
  score under 1.5) tilts it about its pivot; the horizontal drag maps to a
  tilt target clamped at about 17 degrees, eased fast while held and released
  with a slow exponential settle. Tap flashes the nearest frame: stroke
  blooms white with a widened glow, attack 50 ms, decay about 1 s. Tap and
  double-tap are disambiguated with a 0.30 s deferral; double-tap reseeds the
  room. Never click-to-reload.
- Audio: prompt-specced, but created lazily inside the first visitor gesture
  and typeof-guarded throughout, so the piece is silent and complete in QA.
  Room tone is looped low-passed noise; one sine hum per frame, pitched by
  depth (46 Hz for the largest frame up to about 126 Hz for the smallest);
  a two-note chime (1568 / 2093 Hz) fires on the tap flash. Hums rebuild on
  reseed. No microphone, no autoplay.
- Determinism: frame one is the synchronous draw at fixed phase T0 = 18 s.
  The animation clock starts at T0 and advances in real time from there;
  nothing in the first frame derives from Date.now(). rAF is typeof-guarded;
  interaction state (tilts, flashes) is zero before input.
- House rules: Visual Viewport sizing with resize listeners on both
  visualViewport and window; canvas style width and height pinned in px in
  draw(); phone detection via window.screen (min dimension under 700) with
  aspect fallback (discs slightly larger on phones); page ground is the void
  tone; the square world centres and fits whole at 390 px wide.

## QA log

- Rendered with node render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png). All render cleanly in silence.
- thumb.png rendered twice and cmp-compared byte-identical (after the mist
  fix below, re-rendered and compared again: identical). Duplicate deleted.
- Desktop read: black room, tunnel of seven nested thin white frames
  receding to centre, each rotated a few degrees off the last (never
  aligned), three white lens discs on hair-thin vertical wires at different
  depths, soft mist patches drifting low in the frame. No colour anywhere.
- Mobile read: the whole tunnel fits inside the 390 px width, discs and
  wires legible, nothing clipped; void-tone letterbox above and below reads
  as room.
- Fix round: at the first read the mist was imperceptible (5 layers at 0.05
  alpha of #0C0E12 over #030304 is a 2 to 3 level lift). Layer alpha raised
  to 0.085; mist now reads as soft tonal patches while staying faint. All
  sizes re-rendered, determinism re-verified.
- Hygiene greps on index.html: clean of Date.now, gradients, shadowBlur,
  ctx.filter, createElement, getUserMedia, external URLs, em dashes. Zero
  visible text besides the title element.

## Deviations

- Frame count fixed at 7, inside the specced 5 to 8 range.
- Drag tilt reads the horizontal drag component only: the lens-axis tilt is
  an in-plane rotation about the pivot in this rendering, and horizontal
  drag is its natural handle.
- The prompt pitches each frame's hum "by its depth"; depth is not a
  separate variable in the model, so pitch is mapped from frame size, which
  is the depth ordering (largest is nearest, lowest hum).
- One of the three lens discs lands on the outer frame's top edge line at
  frame one (its owner's pivot sits close to that edge at this phase). It
  reads as a source mounted at that depth plane, so it was kept.
