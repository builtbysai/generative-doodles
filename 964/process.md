# No.964 — 24 HOUR HOST

Study #118 lauren-lee-mccarthy, PP125 ("24 HOUR HOST", 2019): an unseen AI
analyzed party guests in real time and whispered directions to a host
through an earpiece. Here the party is eight pastel dots in a circular
room, a pale host at the exact center, and the AI is never drawn — only
its scan line and its pairing arrows ever appear.

## Concept

The choreography is the portrait. A ~90-second cycle runs forever:
guests drift, a cyan scan line sweeps the room, white arrows arc out and
the guests converge into constellations, they hold and bob while the
host's red earpiece pulses with fresh whispered directions, then they
disperse and drift again. No faces, no avatars, no figure for the AI —
hidden steering made visible only as light: a sweep and a set of arrows.

Interactions follow the prompt. Tap triggers a pairing round now.
Drag draws your own scan line: guests within a band of the line are
paired among themselves by proximity, and for ten seconds the host's
earpiece pulses cyan instead of red — the conceit being that for those
ten seconds you hold the earpiece and the host is taking orders from
you. Double-tap reseeds a new party with new temperaments.

Sound is a quiet party bed (looped filtered noise murmur plus a low
pulse), a rising sweep tone for each scan, and paired chimes when a
pairing round is computed. The context is created lazily inside the
first visitor gesture and every call is typeof-guarded; the piece is
silent in headless QA.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets.
- World is unit-space: the room is the unit circle, guests live in
  [-1, 1]; drawing scales by R = 0.44 x min(viewport w, h) around the
  frame center, so the room scales to the smaller dimension on phones.
- Fixed-timestep simulation at 120 Hz. Guest motion:
  - Drift: per-guest seeded wander — heading integrates two incommensurate
    sine wobbles, velocity steers toward heading x speed (0.10–0.16 u/s),
    soft wall reflection at radius 0.90.
  - Pair: steering toward the assigned constellation point with an
    arrive profile (speed scales down inside 0.22 u). Hold: the target
    is offset by a small per-guest sinusoidal bob. Disperse: targets are
    dropped, headings get a seeded scatter, drift resumes.
- Cycle (90 s): DRIFT 0–30, SCAN 30–33 (cyan line crosses the room's
  chord left to right at alpha 0.3), PAIR 33–43, HOLD 43–63,
  DISPERSE 63–90, then wrap.
- Pairing is computed in the step where cycle time crosses 33 s.
  Groupings come from a seeded pattern table ([3,3,2], [2,2,4], [2,3,3],
  [4,4], [2,2,2,2], [3,2,3]) applied to guests sorted by descending
  sociability, so high-sociability guests anchor the larger clusters;
  cluster centers are seeded points within radius 0.48 with a minimum
  separation retry, members sit on a small 0.085 ring around the center.
- Arrows are quadratic curves from each guest to its target with a
  perpendicular bow, an arrowhead, and a bright pulse dot travelling the
  curve; alpha scales with the fraction of the pairing distance still
  to travel, so arrows fade as their guest arrives.
- The earpiece is a dot on the host at radius max(2px, 0.0045 x frame),
  rendered at a low idle pulse, swelling for 3 s whenever orders arrive
  (scan start and hold start). It is #FF3B3B, turning #4FD6FF while a
  visitor's drag-pairing holds (10 s).
- Events (tap, double-tap, drag) are recorded with sim-step timestamps
  and consumed in step order inside `step()`. A drag selects guests
  within 0.18 u of the drawn polyline and clusters them greedily by
  proximity into pairs/triples; that grouping pre-empts the next
  pairing computation, and unselected guests simply keep drifting
  through that round.
- Determinism: all randomness flows from one mulberry32 stream drawn
  only inside init/step, never in `draw()`. Frame one is the synchronous
  draw after exactly 4200 pre-roll steps (35 s), which lands 2 s into
  the first PAIR phase: scan done, arrows out, guests mid-convergence.
  No `Date.now`, no gradients, no shadowBlur, no ctx.filter, no
  offscreen canvas. The rAF loop is typeof-guarded and caps catch-up at
  30 steps per frame. Canvas is sized from the Visual Viewport API with
  resize listeners on both visualViewport and window, and `draw()` pins
  `canvas.style.width/height` in px every frame. Phone detection uses
  `window.screen` min dimension < 700, with the h > w x 1.15 aspect
  test as fallback only.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` (node-canvas,
  no rAF / no AudioContext: the piece renders its deterministic frame
  one synchronously and stays silent):
  - `qa-desktop.png` (1280x900): dark #0B0C10 ground, faint rim circle,
    eight pastel guests mid-convergence along white arcing arrows
    toward spread cluster points, pale host dead center with the small
    red earpiece speck visible on its upper right.
  - `qa-mobile.png` (390x844): phone path taken; the room circle scales
    to the 390-wide frame's smaller dimension and centers vertically,
    same pairing moment, nothing clipped.
  - `thumb.png` (720x720): same composition as desktop at gallery size.
- Determinism: thumb rendered twice and compared with `cmp` —
  byte-identical; the duplicate was deleted.
- Deviations:
  - The host's body color is not in the prompt's palette; the prompt
    names the host only via the earpiece. The host is drawn in a
    neutral pale #F5F2EA so the red 2 px earpiece reads against it.
    Recorded here as a derived neutral, the minimal reading.
  - PAIR is 10 s rather than the prompt's ~8 s convergence: with the
    arrive profile, 10 s lets the farthest guests visibly complete the
    trip across the room before HOLD; the rhythm of the cycle is
    unchanged.
  - Guests not selected by a visitor's drag receive no arrows that
    round (they are simply not paired by your scan); this keeps the
    drag's authorship legible instead of silently re-pairing everyone.
  - The drag scan line itself is drawn while dragging (cyan, alpha
    0.55) so the visitor can see the instrument they are holding; the
    AI's own scan line remains the only other line ever drawn.
