# No.534 "Bad Reputation" (EXPANSION #64 naida-mazzenga, prompt NM6)

## Concept

Her MALA FAMA myth-busting as an interactive comic. Three horizontal
bands tell one correction. Top: the fairy-tale lie, a huge snarling
wolf silhouette looming over a tiny red-hooded figure under a
blood-red moon. Middle: the truth, the same wolf as a calm grey
animal trotting with her pack through green hills. Bottom: a fact
strip of three small diagrams (pack, pups, howl). Between the stage
and the facts, a banner asks, in Catalan: "Els contes els han donat
mala fama, pero els coneixem de veritat?" Dragging horizontally wipes
the lie away to reveal the truth underneath, and the fact strip fades
in last. Drag-only; no tap, no reload.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets.
  Design space 1080x1080, square stage centred via the Visual
  Viewport API (resize listeners on visualViewport and window);
  canvas pinned in px inside draw() every frame. Phone detection via
  window.screen (min dimension < 700px) with the aspect fallback;
  the composition is the same centred square on every device and the
  page ground is the lie panel's near-black.
- Layout call (recorded per the brief): the prompt's three stacked
  panels become a shared stage plus two strips. The lie and the truth
  occupy the same stage (y 0-700, the upper two-thirds); the truth is
  drawn first and the lie on top of it, clipped by the wipe, so one
  horizontal drag scrubs a vertical bone-edged wipe across both
  scenes at once instead of sliding one band over another. The banner
  strip (y 700-792, bone ground, ink text) sits directly under the
  stage, between the two scenes and the facts, as the prompt places
  it between panels 1 and 2. The fact strip (y 792-1080, cream
  ground) holds the three diagram cells. At rest (wipe = 0) the lie
  covers the stage and the fact strip sits at 0.5 alpha, a dimmed
  preview; it fades to full over the last quarter of the wipe
  (smoothstep from wipe 0.75 to 1.0), so the facts literally arrive
  last.
- One wolf, drawn once: `drawWolf` is a parametric silhouette (single
  filled body/head/tail path plus tapered-stroke legs) reused at
  every scale and palette: ink at 4.6x with hackles, bone teeth and a
  red eye for the lie; grey at 1.85/1.5/1.25x for the trotting pack;
  grey at diagram scale in the fact strip. The lie wolf is flipped
  (dir -1) to face left, so its head looms over the tiny figure.
- Lie scene: near-black #141414 sky with seeded bone stars, a huge
  blood-red #8E1B1B moon behind the wolf's head, jagged pines in
  blood red, a dark red ground band, the giant wolf in ink, and the
  tiny figure as a blood-red hood and cloak with a bone face. Flat
  fills only; no gore, and the wolf is clearly the storybook version,
  all teeth and hackles against the moon.
- Truth scene: sky #7EC8E3 with a cream sun and flat clouds, two
  hill bands in #4E9A3D (the far one at 0.55 alpha), seeded grass
  tufts, and the pack mid-trot (legs swing and bodies bob on the
  loop phase). Nothing preachy; the contrast does the work.
- Fact strip labels (Catalan, one line each, warm not preachy):
  pack: "Viu en grup, mai sola"; pups: "Cria els cadells amb cura";
  howl: "Udola per cridar la colla". The howl cell raises the wolf's
  snout (a slight rotation of the same silhouette) with three ink
  sound arcs.
- Interaction: pointer and touch drag anywhere on the canvas sets a
  target wipe from the horizontal position; the wipe eases toward it
  in the rAF loop and stays where it is left (drag back to restore
  the lie). A subtle lowercase "drag" hint sits at the stage's
  bottom-right corner, in bone at 0.55 alpha. Nothing else.
- Determinism: frame one is drawn synchronously in the rest state at
  the constant phase PHASE0 = 1.2s (wipe 0, facts at rest alpha,
  pack at a fixed mid-stride phase). The rAF loop is typeof-guarded
  and anchored as PHASE0 + elapsed since the first frame; no
  Date.now() anywhere. Fixed seed: mulberry32 534064 (stars, tufts).

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js index.html`:
  qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png
  (720x720).
- Determinism: thumb.png rendered twice and `cmp` byte-compared:
  identical, re-verified after the fix pass; duplicate render
  deleted.
- Visual read-back: desktop and thumb show the dark lie scene with
  the giant wolf's head, ear, red eye, bone teeth and spiky hackles
  reading against the blood-red moon, the tiny red-hooded figure
  under its nose, red pines at the edges, the banner question
  legible on one line, and the fact strip's three grey diagrams with
  their Catalan labels readable at rest alpha. Mobile letterboxes
  the square on the near-black ground, composition unchanged,
  nothing clipped.
- Fix during QA: the first pass drew the wolf facing right at 5.3x,
  centred mid-stage, so its head and rear ran off the moon into the
  black sky and vanished; only floating teeth, an eye and a sawtooth
  of hackles read. Flipped the wolf to face left, scaled it to 4.6x
  and centred the moon behind its head so the storytelling parts
  (head, eye, teeth, jaw, hackles) all read against the red disc;
  the body fading into the night at the right is the fairy-tale
  read. The pines also moved from ink (invisible on the ink sky) to
  blood red, and the howl arcs were pulled closer to the snout.
- Deviations from the prompt: (1) the layout call above: panels 1
  and 2 share one stage as stacked full scenes rather than two
  separate bands, per the brief's instruction to keep the wipe
  faithful and simple; the banner and fact strip keep their specced
  positions relative to the pair. (2) The banner's punctuation: the
  prompt writes the question with an em dash; house style uses a
  comma instead, so it reads "Els contes els han donat mala fama,
  pero els coneixem de veritat?" (3) The fact strip is visible at
  rest at 0.5 alpha rather than fully hidden, so the piece reads as
  a complete comic before any drag; it still fades in last, to full,
  as the wipe completes.
