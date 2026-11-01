# №1266 "Knot Seen" (sdk-forsale SF3, PP425) — process notes

## Prompt
Cords hang from the top edge like an exhibition wall. One by one, knots tie
themselves: parametric hanji knot diagrams (maedeup-style braids, butterfly
knots, chrysanthemum knots), each from a different seed, drawn as an animated
stroke along the curve, then swaying. The finished field is asymmetric,
hand-tied-feeling, crimson and hemp on ink-dark ground. Grounded in Lee's
*KNOT SEEN* (2026, Dumpling Diaspora collective) and *Life Knotting* (2026):
knot-tying as material and symbolic framework — connection, interdependence,
lineage, resilience.

Palette: cord crimson #B03A2E; natural hemp #C8B48A; hanji #EFE8D2;
background ink #1A1712.

## What was built
A portrait-fill field of hanging cords on ink-dark ground. Six knots hang at
frame one: five fully tied and swaying, one half-tied (its stroke 50% drawn),
so the tying action is visible from the first frame. Three knot families,
each one continuous seeded stroke path:

- Butterfly: two wing loops joined at a centre crossing, with a short
  dangling tail.
- Chrysanthemum: 5–7 petal loops radiating from the centre.
- Maedeup braid: a vertical stack of 4–5 alternating, taller loops with
  varied radii — irregular on purpose, never a symmetric mandala.

Each knot sways as a pendulum around its top anchor (seeded period 5–9 s,
amplitude 0.03–0.06 rad). New knots spawn at free anchors every 14 s from
t = 12 s, up to a 16-knot cap, so the field fills one knot at a time.

## Interaction (all closed-form over recorded events and piece time)
- Drag a knot downward: the cord stretches (up to 140 units) and the knot
  elongates slightly. On release it rebounds: the stretch decays
  exponentially and the knot re-ties over 2.5 s.
- Double-tap empty field: a new knot spawns at a free anchor and ties
  itself over 8 s.
- No click-to-reload anywhere. No visible text except the page title.

## House adaptations
- The prompt's "double-tap ties a new knot from a word you type" becomes a
  SEEDED generated knot: the piece picks the next braid variant, anchor, and
  cord length from its own seed sequence. A canvas piece takes no typed
  input, and the seeded variant keeps every knot reproducible.
- No gradients, filters, shadow blur, offscreen canvas, or audio. All
  randomness comes from an integer-hash seeded PRNG; frame one is a fixed
  phase (t = 0 state: five tied knots, one half-tied), and the animation
  loop is anchored as elapsed-since-load under a typeof-guarded
  requestAnimationFrame. Knots are stroked polylines (no batched arcs), so
  the node-canvas ellipse quirk does not apply.
- Visual Viewport sizing with resize listeners on visualViewport and
  window; canvas pinned in draw() via style width/height in px; phone
  detection via window.screen physical size with the aspect fallback.
  Portrait-fill composition goes full-bleed at every size; verified at
  390 wide.

## QA
- Rendered from the shipped script with node-canvas at 1280×900 desktop,
  390×844 mobile, and 720×720 thumb; all three inspected.
- Frame-one read (desktop and mobile): six cords at varied heights on
  ink-dark ground — butterfly, chrysanthemum, and braid families all
  visible, crimson and hemp, asymmetric, the sixth knot half-tied.
- Fix rounds: (1) the first render's braid loops read as plain rings, so
  the braid was rebuilt with taller loops, ±18% radius jitter, and wider
  alternation; (2) the initial six knots were assigned random families by
  the generator, so the family cycle is now forced — one of each family
  is guaranteed at frame one.
- Mechanics probed through the piece's own pointer handlers (temp harness,
  discarded): drag-release on knot 0 stretched its cord ~100 px and reset
  the stroke to re-tie start (knot-region ink 2000 → 701 px), and after
  3 s the knot was fully re-tied (2003 px, matching baseline); a
  double-tap spawned a seventh cord at a free anchor.
- Thumb rendered twice at 720×720 from the final index.html, `cmp`
  byte-identical.
- Token scan clean of unseeded randomness, element creation, pixel
  buffers/offscreen canvas, gradients, blur, and audio/mic APIs
  (requestAnimationFrame appears only behind its typeof guard).
- index.html md5: 423b782e034214c68ac82684639c06e9
