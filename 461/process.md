# №461 Red Dress (EXPANSION #55 paul-blow, prompt PB5)

## Concept
Bottleneck poster grammar in the "Dial M for Murder" vein, an original
scene with no Hitchcock likeness or film still: a dark-blue interior, one
figure in a vivid red dress standing full height at the left third, a
telephone on a small pedestal table at the right, and venetian-blind light
raking across the whole scene. The red dress is the single sharp accent
against deep shadow. Watch-only film-noir loop, no hint text.

## Construction
- Single self-contained index.html, canvas 2D only, no external assets.
- Palette held to the five prompt colors and nothing else: interior deep
  blue #1B2A4A, shadows #0E1830, dress red #D9261C, skin pale #F2D8C9,
  black #0A0A0F. The light bars are the pale tone laid down at low alpha
  (rgba(242,216,201,...)), so no sixth color enters the piece.
- Sizing from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas.style.width/height pinned in draw();
  phone detection via window.screen (min dimension under 700px) with the
  aspect h > w*1.15 fallback. Poster framing is full-bleed at every size;
  the page ground is the piece's own deep blue.
- Scene, all flat vector shapes, no gradients on any figure: deep-blue
  wall, a tall shadow panel behind the figure, a shadow floor band with a
  black baseboard line, a black-framed window upper right whose venetian
  slats sit at the same slant as the light. The figure is one flat dress
  shape (bodice and flaring skirt in a single path) with a black waist
  band, pale flat arms (left hanging, right bent to the waist), a pale
  neck and face left featureless, black bob hair with a side-swept fringe
  and a small bun, and black shoe tips under the hem. The telephone is a
  black silhouette (trapezoid base, blue dial disc, cradle posts, handset)
  with a drooping cord, on a black pedestal table.
- The 60-second loop: light bars are masked gradient stripes rotated
  about 6 degrees, translating one full band period per loop so the drift
  cycles seamlessly over the whole canvas, figure included; the dress hem
  sways once per loop (one sine cycle per 60s, amplitude growing toward
  the hem); the phone shivers with a 2px x-jitter for 0.5s at a ring
  point fixed by the seed (mulberry32 seed 461, ring at 30.65s into the
  loop), then stills.
- Tap reseeds the accent: red #D9261C to gold #D9A441 to acid green
  #B8D93C and back. Watch-only otherwise; no text in the piece.
- Determinism: first frame drawn synchronously at constant loop phase
  t = 18s (bars mid-drift, hem mid-sway, phone still, accent red); the
  rAF loop is anchored as phase + elapsed-since-load (performance.now,
  never Date.now()); rAF guarded by a typeof check; all layout from fixed
  constants and the one seeded value above; no offscreen canvases, no
  document.createElement, no audio, no microphone.

## QA log
- Rendered with node ~/workspace/tools/render-piece.js at 720x720 twice:
  thumb.png md5 7b0ec313ff6a7f6307e89dedc7e6ecdb both runs,
  byte-identical. Determinism gate passed.
- Rendered at 1280x900 desktop and 390x844 mobile and inspected both.
  Desktop: figure left-third and full height, red dress the single sharp
  accent against the shadow panel, blind window upper right, telephone
  legible on its table at the right, soft light bars raking across the
  whole scene including the figure, poster feel throughout. Mobile:
  full-bleed, same scene, figure tall and narrow but unclipped, window,
  table, and phone all intact and legible.
- Fixes found during QA and applied: (1) the first hair construction
  swept a black fall diagonally across the face, leaving only a pale
  sliver; rebuilt as a behind-the-head hair mass (drawn before the dress)
  plus a fringe cap arc, so the face reads clean and pale under a black
  bob. (2) The handset floated too far above the phone base, leaving a
  wide wall-blue gap that read as a glowing strip; posts and handset
  lowered so the phone sits tight. (3) The cord drooped too far below
  the table edge and read as a stray hook; shortened to end just under
  the tabletop.
- Deviations from the prompt letter: none of substance. The light is
  mixed from the palette's pale tone at low alpha rather than introduced
  as a separate light color, to honor the "nothing else" palette rule.
- Nothing pushed to any repo, per the build brief.
