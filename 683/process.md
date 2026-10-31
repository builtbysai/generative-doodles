# No.683 — Fifty Instruments, No Solo

EXPANSION #83 lachimuchina, prompt block 3 ("Fifty Instruments No Solo").

## Concept

La Chimuchina's founding rule is no protagonism: an ensemble of some fifty
instruments where no voice leads and the texture itself is the music. This
piece is that rule drawn as a swarm. Fifty small agents drift on a deep black
field, denser toward the center and thinning to the edges, in five motion
families of ten. No agent is larger, brighter, or whiter than any other;
nobody solos. The swarm breathes on a slow master cycle, families swelling
and receding in staggered phases like sections of an ensemble entering and
leaving. It is watch-only: a drag is weather passing through the swarm,
which parts around the pointer and rejoins behind it. Nothing is selectable,
nothing reloads, there is no text on the canvas, and there is no sound.

Palette, strict: ember #E08A4C, clay #A4552F, stone mauve #A66A6B,
water blue #5B8FA6, bone #E4D3B8, ground #0B0B0C. Family colors are used
muted, alpha-managed; no white anywhere.

## Construction

Single self-contained index.html, canvas 2D, no assets, no audio, no
microphone. All fifty agents are generated from one mulberry32 seeded RNG
(seed 683001).

The five grammars, ten agents each:

- Blowers (ember): each rides a small slow elliptical orbit around its home
  point and is drawn as a short arc tangent to its travel, like a breath
  curving past.
- Strikers (clay): each darts radially, oscillating in and out along its own
  ray from the center, drawn as a short radial line whose length follows the
  dart's speed.
- Rattlers (stone mauve): each stays at home and tremors, the sum of two
  fast seeded sines per axis; drawn as a dot with two fainter ghost dots a
  breath behind, so the jitter itself is the mark.
- Shakers (water blue): each swings on a short pendulum arm from a pivot
  above its home; drawn as a dot with the swing's path traced faintly behind
  it.
- Singers (bone): each drifts slowly in a small circle while bobbing on a
  sine weave across its heading; drawn as a plain dot whose long trail
  (3 s) carries the weave.

Homes are center-weighted (radius drawn to the power 1.6, capped at 0.44 of
the field), which gathers the mass mid-field and thins it at the edges.

Breathing: a 60 s master cycle. Each family runs on its own warped clock,
the analytic integral of a rate 1 + 0.45 sin(2πt/60 − φ), with φ staggered
by family (f × 2π/5), so each family's motion literally speeds and slows in
turn; the same phase drives family brightness (activity 0.62 + 0.38 of a
shifted sine). Sections enter and leave, but all fifty agents are always
present and equally weighted.

Trails are per-agent history polylines: each frame, an agent's positions at
past times are recomputed and stroked segment by segment with falling alpha
(blowers 1.2 s, strikers 0.45 s, shakers 1.0 s, singers 3.0 s; rattlers get
the ghost smear instead). Motion stays texture, never spaghetti.

Drag weather: pointer events are recorded with anchored times. While
dragging, agents inside a 0.30-unit radius of the pointer are pushed away
with a smooth falloff; on release the push decays exponentially (τ ≈ 0.8 s)
and the swarm rejoins. The displacement is a pure function of the recorded
events, so replays are exact.

House rules honored: canvas sized from the Visual Viewport API with resize
listeners on both visualViewport and window; canvas pinned in CSS pixels
inside draw(); phone detection via window.screen physical size (min
dimension < 700 px) with the h > w × 1.15 aspect fallback only; on phones
the field-like composition goes full-bleed over the whole viewport, and the
page ground is the piece's own ground color; requestAnimationFrame is
typeof-guarded and the loop clock anchors to a load-time performance.now()
offset. No Date.now() anywhere.

### Deviations

- Parametric motion instead of integrated flocking. Agent positions are
  pure functions of time rather than a velocity-integrated flocking
  simulation, and the weak cohesion is realized through center-weighted
  homes plus bounded excursions instead of neighbor forces. Reason: the
  determinism gate requires an exact synchronous first frame and exact
  trails behind it; pure functions give both with no integration state to
  drift, and the visual result (one coherent, center-gathered mass) is the
  cohesion the prompt asks for.
- Trails are recomputed history polylines rather than a translucent-black
  overlay fade. Reason: the QA renderer has no offscreen canvas and no
  frame history, and an overlay fade would make every frame depend on all
  previous frames, breaking byte-exact determinism.
- The shaker swing path is stroked at reduced alpha (0.16 of head alpha)
  and the striker trail was shortened from 0.7 s to 0.45 s after the first
  QA read, where those two marks outweighed the other families. Reason:
  the no-protagonism rule applies inside the drawing too; no family's mark
  may dominate.

## QA log

Renderer: node ~/workspace/tools/render-piece.js (node-canvas, no
requestAnimationFrame, no AudioContext), so the renders are the synchronous
first frame at master phase 0.

- qa-desktop.png (1280×900): the square composition letterboxed and
  centered; all five families intermixed, ember arcs, clay darts, mauve
  rattler dots, blue shaker dots on faint swing arcs, bone singer dots with
  wavy dotted trails; density clearly center-weighted, edges sparse, no
  hero mark.
- qa-mobile.png (390×844): phone rule triggered (screen min 390 < 700);
  the field stretches full-bleed over the tall viewport, all families
  present and spread through the frame, nothing clipped.
- thumb.png (720×720): the full swarm in the square frame, same read as
  desktop.
- Determinism: thumb rendered twice and compared with cmp: byte-identical;
  the second render was deleted. Re-verified after the shaker/striker
  balance fix above, byte-identical again.
- A ?seed=t<seconds> hook forces a fixed frame time so later master phases
  can be rendered headlessly; with no seed the piece draws t = 0 first and
  animates from the anchored clock.
