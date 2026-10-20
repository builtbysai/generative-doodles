# No.388 Vulnerable — process

## Concept

After Maryna Lagereva's (@maryna.lagereva) conservation
cards in her @forplanetocean register: a watercolor
species card where the art and the data are one object.
A yelkouan shearwater glides over a blue wash sea, its
pale reflection rippling below, ink underdrawing
showing through the paint; beneath the vignette, her
signature data strip carries a five-band
conservation-status bar with Vulnerable lit in orange
and one line of species text. Watch-only: a card to
read and watch.

Palette, closed: sky #C9DCEC, sea wash #6FA8C9, pooled
edges #4E87A8, bird browns #7A5C3E, ink underdrawing
#2E2A26, reflection #A9C8DC at 0.5 alpha, strip slate
#4A5A6A, highlight #E8862E. Flat colour only; the
watercolor is faked with stacked translucent fills,
never gradients.

Designed text (the batch text exception: the text IS
the artwork): the five segment labels LC, NT, VU, EN,
CR and the fact line "Puffinus yelkouan - a
burrow-nesting shearwater of the Mediterranean,
declining." (fly's authored line in her register,
replaceable), drawn on the canvas in a serif face.
Labels are pale on the slate bands and ink on the lit
VU band; the fact line is pale on the slate strip so
it stays readable against the strip ground.

## Construction

- One canvas, design space 1280x900, centred fit: the
  card keeps its shape at any aspect and the page
  ground takes the card's own slate. Sizing comes
  from the Visual Viewport API with resize listeners
  on both visualViewport and window; the canvas
  element is pinned by style width/height every
  frame; phone detection uses the window.screen
  physical size with the tall-aspect fallback.
- Card: 1100x780 centred in the design space, clipped
  to a 12px rounded rect with an ink border. The
  vignette is the top 70% (546px): sky above the
  horizon at y 400, sea below it, the bird in the
  upper third. The status strip is the bottom 30%.
- Watercolor, per the batch adaptation flag: stacked
  translucent FLAT fills with darker pooled-edge
  strokes. The sky is sky colour at 0.82 over the
  pale base plus five seeded flat ellipse pools of
  sky at low alpha; the sea is a full wash plus four
  seeded pools alternating the pooled blue and the
  pale reflection colour at 0.10-0.20 alpha. Pooled
  edges: a 5px pooled stroke on the horizon and a 3px
  stroke at the sea's lower edge, their alphas
  breathing on the 12s bloom cycle. Grain is a fixed
  table of 380 dots (asserted) in ink at 0.06 alpha
  over the whole vignette, baked at load from a
  fixed-seed LCG, never re-seeded per frame.
- Bird: layered bezier shapes traced by shared path
  functions (two swept wings, tail fan, body, pale
  belly patch, beak, eye). The flap interpolates the
  wing control points and tips between raised and
  lowered poses: tip travel about 92px, one whole
  rise-fall per 6s. An ink underdrawing pass draws
  the same shapes in solid ink at 0.38 alpha, offset
  (3, 3.5), so the ink shows past the paint; the
  brown pass adds its own ink outline at 0.5 alpha.
  A gentle body bob rides the same 6s cycle.
- Reflection, per the flag: no sprite, no offscreen
  canvas. The bird's own path functions are redrawn
  under a flipped transform about the horizon with
  the 0.55 vertical squash a water surface gives a
  reflection, in five horizontal bands across the
  sea; each band is sine-displaced sideways on the
  flap cycle (per-band phase) and fades as it deepens
  (alpha 0.55 down to 0.35). Fourteen seeded ripple
  strokes slide on the bloom cycle over the top.
- Status bar: exactly five segments asserted (LC,
  NT, VU, EN, CR), 196px each on an ink bed at 0.30
  alpha over the slate strip. VU is filled #E8862E
  and pulses once per loop: a halo rect and a pale
  sheen follow a 36s sine.
- Loop: 36 seconds. It holds 6 whole wing flaps of
  6s, 3 whole wash blooms of 12s and 1 whole VU pulse
  of 36s, so the loop is seamless.
- Determinism: the first frame is drawn synchronously
  at the constant phase T = 9s: the flap sine sits at
  its neutral crossing (wings mid-glide), the VU
  pulse is at half strength and the bloom mid-pulse.
  The animation clock advances from that anchor in
  fixed 1/60 ticks accumulated from rAF timestamps;
  rAF is typeof-guarded. Frame one never reads a
  wall clock. No pointer handlers exist: watch-only.

## QA log

- Rendered with the house node-canvas renderer at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png)
  and 720x720 (thumb.png).
- First pass caught two faults, both fixed and
  re-rendered: (1) the reflection was mirrored about
  the horizon at full height, which pushed the wing
  reflections below the sea band where the card clip
  cut them off, leaving only a faint smudge of the
  body; the reflection now carries the 0.55 vertical
  squash and the whole bird mirrors visibly inside
  the sea. (2) The sea wash pools were drawn in the
  sea colour over the sea base and were invisible;
  they now alternate pooled blue and pale at low
  alpha and read as wash variation. The near wing's
  trailing control point was also raised so the wing
  meets the body without a notch.
- Desktop: card centred on its slate ground, shearwater
  with long swept wings and visible ink underdrawing,
  pale squashed reflection rippling in bands below
  the horizon, status bar with VU lit orange and the
  fact line legible in italic serif.
- Thumb: bird, sea, reflection, bar and fact line all
  read at gallery size.
- Mobile: the card keeps its shape centred on the
  continuous slate ground; bar labels and fact line
  stay legible, no letterbox colour break.
- Thumb rendered twice from the shipped script:
  byte-identical.
- Grep-verified: no gradients, no shadowBlur, no
  offscreen canvas, no Math.random, no Date.now, no
  em dashes, no absolute URLs.
