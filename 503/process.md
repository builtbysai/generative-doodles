# No.503 Snowfall Report

EXPANSION #60 giulia-tassi, prompt GT7.

## Concept

Her Arianna Fontana victory mechanism (2022) as a watch-only loop: a
single frozen moment of triumph, kept gently alive. A deep-blue suited
skater seen from below, boots large and low in the frame, holds a
tricolour flag overhead on a pole gripped in both hands. Around her on
the cornflower ground hang large white outlined snowflakes, each
turning slowly at its own rate; grey-blue dash clusters texture the
ground line. Nothing happens but the weather and the flag: the cloth
ripples, the skater bobs a breath, the dashes pulse in a travelling
wave, and the moment never ends.

## Construction

- Single self-contained index.html, canvas 2D, exactly the prompt
  palette: cornflower #5E79D0, suit #2D2DB3, white #FFFFFF, skin
  #F8F5F0, flag green #007C58, flag red #FE0000, snow-dash #B9C6D4.
  Flat fills only; no gradients anywhere.
- Composition: portrait logic held at every size by a centred stage
  column (horizontal extents key off U = min(W, H x 0.66)), so the
  figure keeps its proportions on landscape frames and phones alike.
  The figure stands centred at ~70% of frame height: foreshortened
  tapered-quad legs splay from the hips to chunky boots with pale
  blades at 0.86H, torso between, arms raised in two segments to
  grips on the pole. Flag and figure together span 0.06H to 0.87H.
- Face in her grammar: skin disc, flat navy hair block as a cap over
  the top of the head, two arc eyes, an L-line nose and a short-curve
  smile, all linework in the suit colour.
- Flag: a subdivided mesh (18 x 5 cells) hung from a slightly rising
  pole, three vertical bands (green, white, red) as flat fills on the
  mesh. A travelling sine displaces the cloth along its normal,
  growing toward the free edge, on a seamless 8s loop.
- Crest: an invented shield glyph on the chest, tricolour vertical
  bands under a navy chief carrying a small white star. It is not the
  CONI crest or any real badge.
- Snowflakes: seven, seeded (mulberry32, seed 503607) into side and
  corner zones with seeded jitter, sizes and rotation rates. Each is
  six stroked branches with two pairs of chevron barbs, outline only,
  never filled, lineWidth 5 at 1080px scale. Centres are clamped
  inside the frame and zones keep every flake clear of the face.
- Dash clusters: six seeded clusters of short grey-blue dashes,
  confined to the bottom 15% around the ground line; their alpha
  pulses on a 6s travelling wave keyed to cluster position.
- Motion is watch-only, all phase-shifted sines: flag ripple 8s,
  skater bob +/-0.8% of frame height on an 8s period, flake rotation
  at seeded rates of 0.05-0.15 rad/s, dash pulse 6s. No interaction,
  no hint text, no text in the piece at all.
- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas.style.width/height pinned in
  draw() every frame. Phone detection via window.screen (min
  dimension under 700px) with the h > w*1.15 aspect fallback; the
  stage logic is the same at every size.
- Determinism: the first frame is drawn synchronously at a constant
  loop phase (t = 3.2s pre-roll: flag mid-ripple, flakes at their
  seeded base angles plus 3.2s of rotation). The animation loop, when
  running, is anchored as that fixed offset plus elapsed time since
  load, and requestAnimationFrame is typeof-guarded so the node QA
  renderer draws the same frame. All layout comes from the seeded
  RNG; no Math.random, no Date.now(), no offscreen canvas.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb rendered twice and byte-compared with cmp,
  identical, re-verified after the fix pass. Second render deleted
  after each check.
- Desktop and thumb: the victory pose reads at once, flag overhead in
  three clean bands with a wavy free edge, outlined snowflakes around
  (outline only, none near the face), crest legible on the chest,
  dash clusters only along the bottom, blades pale under the boots.
- Mobile: portrait composition keeps its shape, figure complete,
  flakes inside the frame, nothing clipped.
- One fix pass after the first renders:
  - The flag's fly end and pole finial ran off the right edge at
    390px wide. The pole span was narrowed from 0.46 to 0.44 of the
    stage and the finial overhang shortened; the whole flag now sits
    inside the frame on phones.
  - The crest's navy chief and outline vanished against the navy
    suit, leaving the star floating above the bands. The shield now
    carries a white keyline outline, so chief, star and bands read
    as one badge.
  - Thin ground-coloured seams showed at the knees where the tapered
    limb segments meet at an angle; small suit-coloured joint discs
    now plug the knees and elbows.
  - The two top-left flake zones crowded each other at phone width;
    one zone moved right and flake radius is capped at 11% of frame
    width.
- Deviations from the prompt letter: the crest outline is white
  rather than navy (recorded above: a navy outline is invisible on
  the navy suit, and the chief stays navy inside the keyline). Crest
  width is 10% of the smaller frame dimension against the specified
  ~8% of canvas, measured that way so the badge keeps its proportion
  on wide landscape frames. The bob is +/-0.8% of frame height, about
  +/-2% of the flag-to-boots span's lower body mass; read on screen
  as the specified gentle breathing rather than a bounce.
