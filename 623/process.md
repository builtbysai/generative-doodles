# No.623 — Draw a Card, Read the Forest

EXPANSION #75 mariona-cabassa / theinvisiblecircle, prompt block 7 "Oráculo del Bosque".

## Concept

Her forest oracle deck as a wordless reading. A dark green forest floor at
night holds a loose arc of twelve face-down cards, every back the same
symmetric gold mandala on deep green. Double-tap draws the next card: it
turns over with a stepped paper flip and flies to the face-up row above,
revealing a creature oracle in her folk style on aged paper inside a thin
gold border. No words anywhere; the meaning is in the creature and its
colors. A five-dot moon-phase indicator cycles quietly at the top. When
all twelve are drawn, the row rests, gathers into a stack, flips face
down, and the deck re-forms its arc with a new seeded deal. The reading
never hard-resets.

## Construction

**Deck model.** Twelve cards: six creature types (fox, owl, mushroom
ring, deer, snake, moon moth) × two variants. A deal is a Fisher-Yates
shuffle of the twelve combos on mulberry32(BASE_SEED + dealIndex ×
104729), so draw order is fixed per deal and reproducible. Each card
carries a creature seed for its internal details (belly dots, mushroom
placement) plus a main/accent pair assigned from her garden palette
(#E87B9C, #F2C14E, #6A9A5B, #1E4D8C, #E2725B) by type and variant, so the
two variants of a type never share a colorway. Faces: aged paper #EFE3C8,
double gold border ring, creature drawn from parametric flat-shape
generators. Backs: one `drawMandala` function with no seed input at all —
outer ring, twelve petals, twelve dots, inner ring, cross petals, centre
dot — so every back is byte-for-byte the same design.

**State machine.** idle → drawing (1.7 s: the middle arc card lifts,
arcs to its row slot, flip progress quantised to 8 steps with a shading
pass, face shown past the halfway step) → idle, or → rest when the
twelfth card lands (4.5 s) → gather (2.6 s: row glides to a centre stack,
then one shared flip value turns the whole row face down) → redeal
(1.8 s: a fresh deal's backs glide from the stack out into the arc) →
idle. Card positions are displayed values eased toward layout targets
each frame, so the arc and row re-flow smoothly as counts change. Row
cards shrink as the row fills so all twelve fit across.

**Interaction.** Double-tap (two pointerdowns within 380 ms, not on a
face-up card) draws. Tap a face-up card: its gold border brightens for
a beat and its creature animates — fox blinks, owl head tilts, mushroom
spores drift, deer ear flicks, snake undulation phase advances, moth
wings flutter. Drag fans the face-down arc wider (spread and rotation
scale with horizontal drag); on release it settles back. Watch-only:
face-down cards breathe at ±0.8 % scale on staggered phases; the moon
dots fill 2 → 3 → 4 → 5 → 1, one step per 10 s of the piece clock,
starting at exactly 2 filled. No click-to-reload anywhere.

**Determinism.** Frame one is the synchronous draw(0) at load: the full
undealt arc, no cards drawn, moon at 2 filled dots. The rAF loop is
typeof-guarded and anchored to its first callback; all animation is a
function of that elapsed clock. No Date.now, no Math.random; event
timing for double-tap uses the pointer event's own timeStamp only.

**House rules.** Canvas sized from the Visual Viewport API with resize
listeners on visualViewport and window; canvas.style.width/height
pinned in px inside draw(); phone detection via window.screen (min
dimension < 700) with aspect h > w*1.15 as fallback only; arc, row and
moon refit the phone frame (phone cards slightly narrower with a wider
span and stronger fan rotation so the arc stays readable at 390 px);
canvas 2D only, no offscreen canvas, no ctx.filter, no audio, no
external assets, no visible text besides the title.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb rendered twice, cmp byte-identical, re-verified
  after every fix round. Second render deleted.
- Read-back (frame one): desktop and thumb show the dark floor, the arc
  of twelve identical gold-mandala backs along the bottom third, moon
  indicator at exactly 2 filled dots, nothing clipped. Mobile shows the
  same arc as a readable fan across the 390 width.
- Drawn-card verification used the renderer's seed argument, which the
  piece reads from location.search (`?seed=drawnN`) to pre-place N
  cards face up instantly and deterministically; production loads carry
  no query string and are unaffected. Forced renders (in /tmp, read,
  then deleted): drawn3 showed mushroom ring, snake and fox face up
  with nine backs left in the arc; drawn6 added the deer, second fox
  variant and moth; drawn12 showed the complete deal — all six types in
  both variants, both owls reading clearly — with the row shrunk to fit
  twelve across, nothing clipped. A forced phone render (drawn3 at
  390x844) confirmed the row and arc coexist legibly on mobile.
- Fix round 1: phone arc overlapped too tightly (each card ~38 %
  visible); phone card width reduced, arc span widened to 94 % of the
  frame, fan rotation increased.
- Fix round 2: creatures rendered too small on the face (roughly a
  third of the card); creature scale raised from 0.34 × card width to
  0.5 × card width.
- Fix round 3: the mushroom ring read as scattered specks; ring
  tightened, cap radius and stem size raised, centre mushroom enlarged.
- Grep confirms zero Date.now / Math.random / createElement /
  AudioContext / ctx.filter in index.html.

## Deviations

- None from the prompt's prohibitions. Two construction notes: the
  prompt asks for the row to "slowly scroll" when long; instead the row
  cards shrink as the row fills, which keeps the whole reading visible
  at once and was verified at twelve cards — scrolling would hide
  already-drawn cards on a still gallery frame. The drawn card is taken
  from the middle of the arc rather than an end, so the arc closes
  symmetrically around the gap as cards leave it.
