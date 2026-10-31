# No.562 — Hombre de Alto Valor

EXPANSION #68 teresa-ferreiro, prompt TF2 (Pacheco). A 10-panel black-and-white
carousel satirizing a manosphere muscleman whose monologue inflates panel by
panel, collapses into one small-hours panel, and ends on the question the whole
act was holding back.

## Concept

One panel at a time fills the stage, comic-carousel style, preceded by her
caption card. Pacheco (parametric muscleman: ink hair cap, sunglasses, red
shirt, black shorts, protein shaker) shouts his script while his flex pose and
his speech bubbles physically grow from panel 1 to panel 7. Panel 8 inverts
everything: a big ink-dark panel, Pacheco small and alone at night in his
"JUST DOO DOO" shirt with one small bubble. Panel 9 is a silent spotlight
portrait. Panel 10 hands him the existential bill. He is never sympathetic,
never redeemed, and never winks; the satire is carried by scale and by her
verbatim words.

Strict palette: ink #141414, paper #F5F0E6, protein tan #D9B98C (the shaker),
gym grey #B9B9B9 (equipment, starburst, spotlight, moon), shirt red #D93A2B —
the only saturated color, confined to his shirt in every panel. Flat fills
only, no gradients.

## Panel texts

- Card 0 (caption, verbatim): "Estoicismo 🗿, fuerza 💪🏼, individualidad 🐺, trabajar 24 horas y 8 días a la semana 📈, lamer bota 👅👢"
- Panel 1: "ME LLAMO PACHECO. SOY UN HOMBRE DE ALTO VALOR. VOY AL GYM TODOS LOS DÍAS."
- Panel 2: "LA ATENCIÓN MASCULINA LO ES TODO. NO SOY GAY, EH!"
- Panel 3 (childhood-neglect confession, written for this piece in his voice — the prompt describes this beat without quoting a line): "MI PADRE JAMÁS ME ABRAZÓ. LLORÉ UNA VEZ Y ME MANDÓ AL GYM."
- Panel 4: "ESCAPADO DE LA MATRIX"
- Panel 5: "CAMARERO DE ELON MUSK Y DONALD TRUMP"
- Panel 6: "MORIRÉ EN UNA PUTA CUNETA! COMO UN HOMBRE!"
- Panel 7 (second written line, same reason as panel 3; the prompt's quoted lines cover panels 1, 2, 4, 5, 6 of the 2–7 escalation): "EL DOLOR ES TEMPORAL. EL VALOR ES ETERNO."
- Panel 8: "ESTOY TAN SOLO" (shirt reads "JUST DOO DOO")
- Panel 9: silent
- Panel 10: "SI DEJO DE IR AL GIMNASIO... ¿DEJO DE TENER VALOR COMO SER HUMANO?"

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets. Design
  space 1000×1000; the square stage is centered on desktop and spans the full
  width on phones (phone detection via `window.screen` min dimension < 700,
  aspect fallback). Canvas sized from the Visual Viewport API with resize
  listeners on both `visualViewport` and `window`; canvas CSS size pinned in
  px inside `draw()` every frame.
- Pacheco is one parametric rig (feet-anchored local space): thick-stroked
  limbs (ink underlay, paper top), red trapezoid shirt with pec lines, ink
  shorts, hair cap, sunglasses with paper shine dashes, shout/flat mouth
  states, and poses flex / down / cross. The tan shaker is a separate prop
  anchored to his raised fist (panels 1–7) or lowered hand (panel 10).
- Escalation is parametric: body scale 0.60 → 1.23 and bubble font 30 → 51
  across panels 1–7, plus a grey starburst behind him whose ray count grows
  with the panel number. Bubbles are a single combined rounded-rect-plus-tail
  path with a flat ink offset shadow; text is word-wrapped by measurement.
- Panel frames are wobbly (seeded per-element jitter via a stable hash, so
  the wobble never animates). A paper counter tag ("n / 10") sits inside the
  bottom-left of the frame; the "tap" hint sits inside the bottom-right,
  ink on light panels, paper on the two dark panels.
- Interaction: tap advances (card 0 → 1 → … → 10 → card 0; carousel
  navigation, not click-to-reload). On panel 7, dragging down pulls the
  darkness in and shrinks him with the drag (release past 55% commits to
  panel 8; release earlier and the darkness springs back). A plain tap on
  panel 7 also advances, running the same 0.9 s shrink-into-darkness
  transition. Idle motion is a barely-there breathing scale only.
- Determinism: frame one is drawn synchronously at load at the constant
  phase PHASE0 = 0.9 (caption card, fully composed, no transition in
  flight). The rAF loop is `typeof`-guarded and anchored as
  PHASE0 + elapsed; no `Date.now()` anywhere. Seeded RNG (mulberry32,
  seed 562068) plus hash-based jitter. No audio, no microphone.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280×900
  (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png).
- Determinism gate: thumb.png rendered twice and `cmp` byte-compared —
  identical. Second render deleted.
- Read-backs: caption card legible at all three sizes; words exact; the
  caption's emoji render in the QA renderer as flat monochrome glyphs
  (moai, flexed arm, wolf, chart, tongue, boot) — not tofu boxes — so they
  were kept verbatim from the prompt rather than replaced or omitted
  (in a full browser they render as standard color emoji). No stray color
  on the card; nothing clipped on mobile.
- Every panel was additionally spot-rendered by presetting the carousel
  state in throwaway copies (deleted after QA): panel 1 (small Pacheco,
  shaker raised, verbatim bubble), panel 6–7 (near full-frame flex, bubbles
  inflated), panel 8 (dark panel, small Pacheco, "JUST DOO DOO" shirt,
  small "ESTOY TAN SOLO" bubble, grey crescent moon), panel 9 (flat grey
  spotlight cone, arms crossed, silent), panel 10 (lowered shaker, verbatim
  closing question).
- Fixes made during QA: (1) the bubble tail was first built as a separate
  triangle with a painted seam, which showed as a bar on the dark panel —
  rebuilt as one combined bubble-plus-tail path; (2) the counter and hint
  first sat in the outer margin, where the wobbly frame line crossed them —
  both moved inside the frame (counter as a paper tag, hint scene-colored);
  (3) the right-hand floor dumbbell was dropped so it could never collide
  with the relocated hint.

## Deviations

- Panels 3 and 7 carry lines written for this piece (listed above): the
  prompt quotes verbatim lines for the other escalation panels but only
  describes the childhood-neglect confession and leaves one escalation slot
  unquoted. Both written lines stay in his voice and in the satire's terms.
- The red shirt is worn in all panels, not only panel 8: the palette names
  exactly one saturated color ("shirt red") and panel 8's distinction is
  the "JUST DOO DOO" lettering, which only it carries.
- The panel 7 → 8 drag-down is the specced gesture and is fully
  implemented; a tap on panel 7 triggers the same collapse transition, as
  the brief allows, so the carousel never dead-ends for tap-only users.
- The caption card adds one drawn dumbbell under the text (shapes only, no
  added words).
