# No.391 What Does This Bean Become?

## Concept

Maryna Lagereva's interactive constraint game (EXPANSION #41, prompt
ML7): one ink bean on watercolor paper that refuses to stay a bean.
Each tap metamorphoses it one stage, bean -> creature -> scene, always
through a 1.2s morph and never an instant swap; after the scene, the
next tap grows a fresh bean from the next transformation in the table.
Double-tap skips straight to a fresh bean. Six transformations, three
observed from her playbook (acorn -> Napoleon, rabbit -> borscht bowl,
egg -> chick) and three authored in her register (mushroom cottage,
snail garden, cloud and umbrella). A small serif stage caption beneath
the blob is the piece's only text, designed text under the batch's
text exception.

## Construction

- One canvas, design space 1280x900, centred fit, page ground in the
  paper tone #F7F2E9. Palette closed: ink #3A2E2A plus one watercolor
  fill per transformation (pumpkin #D97B29, plum #7A3B5C, sage
  #8A9B6E, borscht red #A63A4A). Flat colour only; no offscreen canvas,
  no gradients, no filters, no shadowBlur.
- The blob is a closed bezier curve smoothed through 8 control points
  at fixed angles. Every stage of every transformation is an authored
  radius set; each transformation's bean is the base bean with a
  baked fixed-seed jitter (LCG seed 391). Counts asserted at load:
  exactly 6 transformations, exactly 18 captions.
- Morph: on tap, the 8 points interpolate from the current set to the
  target set over 1.2s with easeInOut, advanced in fixed 1/60 ticks.
  The watercolor fill blooms in behind the ink as stepped flat alpha
  (alpha quantised to sixths, crossfading out of the old colour and
  into the new); the bean stage wears no fill. Accessories are ink
  path data per stage (tricorn and epaulettes, bowl rim and spoon,
  shell crack and chick beak, door and window, spiral and flower
  stems, rain dashes and umbrella): the outgoing set fades across the
  first half of the morph, the incoming set across the second half.
  A "grow" transition to a new bean runs the same morph with a
  shrink-and-regrow scale dip about the centre. Captions crossfade at
  the morph midpoint. Taps are press-and-release within 28 design px
  and 0.8s of the piece clock, coordinates converted through the
  stored centred-fit transform; a second tap within 0.5s is the
  double-tap.
- Determinism: frame one is drawn synchronously at the constant phase
  anchor T = 4.25s, transformation 1 stage 1 (the bean) complete with
  its caption at rest; the clock advances from that anchor in fixed
  ticks and frame one never reads a wall clock. No ambient loop: the
  stillness between taps is the design; all motion is the 1.2s morph.

### Transformation table and captions

1. bean -> acorn -> Napoleon (pumpkin)
   - "stage 1: just a bean"
   - "stage 2: the acorn dreams"
   - "stage 3: Napoleon, obviously"
2. bean -> rabbit -> rabbit swimming in a borscht bowl (borscht red)
   - "stage 1: still just a bean"
   - "stage 2: a rabbit, ears first"
   - "stage 3: swimming in the borscht"
3. bean -> egg -> chick hatching (plum)
   - "stage 1: a bean, holding its breath"
   - "stage 2: an egg, mostly"
   - "stage 3: the chick has opinions"
4. bean -> mushroom -> mushroom cottage, door and window (pumpkin)
   - "stage 1: a bean, underground"
   - "stage 2: a mushroom moves in"
   - "stage 3: home, with a door"
5. bean -> snail -> snail carrying a flower garden (sage)
   - "stage 1: a bean, in no hurry"
   - "stage 2: a snail, house included"
   - "stage 3: the garden comes along"
6. bean -> cloud -> cloud raining on a sprouted umbrella (plum)
   - "stage 1: a bean, looking up"
   - "stage 2: a cloud, passing through"
   - "stage 3: rain, met prepared"

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png) and 720x720 (thumb.png). Frame one: the
  plain ink bean centred on continuous paper with "stage 1: just a
  bean" beneath; mobile keeps the whole vignette in frame under
  centred fit, caption legible, no ground break.
- Thumb rendered twice from the final script: byte-identical
  (md5 191707404d39e6cad977913d885d5d45).
- Stage probes (temporary state-pinned copies, not shipped): all six
  stage-3 scenes and the acorn and mushroom stage 2s inspected. The
  Napoleon wears his tricorn over the acorn cap with sash and medal;
  the rabbit's head and ears clear the borscht rim beside the spoon;
  the chick sits in its jagged shell cup with the top fragment tilted
  above; the cottage door, round window, chimney and stones read at
  once; the snail's spiral, eye stalks and three shell flowers read;
  the cloud's flat bottom, rain and sprouted umbrella read.
- Morph probes at p = 0.5 (also temporary): a stage morph shows the
  points mid-interpolation with the fill blooming stepped; a grow
  morph shows the old shape collapsed to a seed before the new bean.
- Fixes during QA: the umbrella in scene 6 sat low enough for its
  handle to touch the caption line; raised 20px. Caption crossfade
  windows tightened to meet at the morph midpoint so the line never
  fully vanishes mid-morph. All renders redone afterwards and the
  thumb re-verified byte-identical.
- Grep audit clean: no Date.now, no Math.random (the LCG is seeded
  and baked), no shadowBlur, no gradients, no offscreen canvas, no
  em dashes, no absolute URLs.
