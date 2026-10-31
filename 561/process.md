# №561 "O Xa Chegou" — EXPANSION #68 teresa-ferreiro, prompt TF1

## Concept

A 7-panel tap-advanced carousel restaging Ferreiro's influencer-vs-tavern gag
("O XA CHEGOU! II"). A glossy foodie influencer vlogs her hype about a
"traditional restaurant, packed with locals, totally off-guidebook" for four
panels, alternating colour and black-and-white. Panel 5 cuts to the Galician
tavern owner: heavy-lidded, unmoved, bored rather than mean. She tries her one
English line, then Spanish; he squints. Panel 6 is a single huge word,
"NADA.", on a full black-and-white panel: on arrival the screen shakes once
and the colour drains out of the banner and counter. Panel 7 is a mock review
card quoting the same "Nada." under a five-star row; dragging on it empties
the stars one by one. The joke is the absence of the meal: no food is drawn
anywhere.

## Construction

- Single self-contained `index.html`, canvas 2D, design space 1080×1440
  (portrait). One panel visible at a time inside a wobbly hand-drawn frame
  (jitter points derived from a fixed mulberry32 seed, identical every frame).
- Chrome: shouty all-caps banner "O XA CHEGOU! II" in per-letter jittered
  type; footer carries the only UI, a subtle "tap" hint ("drag" on panel 7)
  and the panel counter "1/7".
- Panels 1–4 share one vlog scene: wood/grey plank wall, counter, two ink
  "locals" seen from behind, and a front-camera rounded frame with a pink
  glow border (colour panels) or plain white border (B/W panels), live dot,
  bobbing hearts. She is all gloss: shut happy eyes, open smile, phone in
  hand. B/W panels swap pink for white/grey throughout.
- Panel 5: the owner behind his counter, apron white over a wood shirt, arms
  ink-edged so they read against the wood wall, hands resting on the counter.
  His squint is parametric: heavy lids whose droop breathes slowly
  (0.72 + 0.10·sin) but never opens and never winks. A shelf of plain glasses
  is the only dressing. The influencer stands at the left edge, phone up.
- Panel 6: "NADA." at 296px on cold grey; entering it stamps the shake clock
  (0.7 s decaying sine offset applied to the whole stage) and drains the
  banner band and counter to grey.
- Panel 7: drawn review card (no real review UI): grey avatar, "La
  influencer", "Reseña verificada", five stars, the quote «Nada.», and the
  lines "Sin menú. Sin comida." / "Solo eso: nada."
- Interaction: TAP advances panels, wrapping 7 → 1 (carousel navigation, not
  click-to-reload). Tap fires on pointer release so panel 7 can tell a tap
  from a drag: accumulated downward drag there empties one star per 90 design
  units, resetting to five on entry.
- House rules: Visual Viewport sizing with resize listeners on both
  visualViewport and window; canvas pinned in px inside draw(); phone
  detection via window.screen min dimension < 700 with aspect fallback, the
  portrait stage spanning full phone width on the paper-cream ground; strict
  six-colour palette (wood #7A5230, pink #F2A7C3, apron white #F5F5F5, ink
  #141414, paper cream #F5EEDA, cold grey #9A9A9A); flat fills, no gradients;
  no audio, no mic, no external assets.

### Panel texts (all in-piece text, verbatim as drawn)

- Banner: "O XA CHEGOU! II"
- Panel 1 (colour): "¡Chicos! Un restaurante / tradicional, llenísimo / de gente de aquí..."
- Panel 2 (B/W): "Y totalmente fuera / de las guías, ¿eh? / Un secreto..."
- Panel 3 (colour): "Comida de la abuela, / auténtica de verdad, / como la de antes."
- Panel 4 (B/W): "Mirad qué ambiente... / ¡Esto sí que es / lo real, lo real!"
- Panel 5, her first bubble: "Excuse me?" — her second bubble: "Perdone... ¿tienen / menú del día?"
- Panel 6: "NADA."
- Panel 7: "La influencer" / "Reseña verificada" / «Nada.» / "Sin menú. Sin comida." / "Solo eso: nada." / "1 de 1 reseñas"

## QA log

- Rendered with `render-piece.js` at 1280×900 (qa-desktop.png), 390×844
  (qa-mobile.png), 720×720 (thumb.png). Thumb rendered twice and
  byte-compared with `cmp`: identical. Second render deleted.
- Frame one is the synchronous draw at constant PHASE0 = 1.8 with panel 1
  fully composed (no shake, no drain). rAF typeof-guarded, anchored as
  PHASE0 + elapsed; grep confirms zero `Date.now` and zero gradient calls.
- Read back the desktop and mobile renders: banner, pink vlog frame with
  glow, influencer, hearts, phone, patter bubble, counter and "1/7" all
  present; nothing clipped on mobile.
- Because the QA renderer only ever shows panel 1, panels 2, 5, 6 and 7 were
  additionally verified from throwaway copies with the panel index preset
  (files kept in /tmp, not shipped). Panels 3 and 4 use the same vlog
  renderer as 1 and 2 with different text/colour flags.
- Fixes during QA: (1) the two locals were first drawn ink-on-ink against the
  counter front and invisible; moved up so their heads sit above the counter
  line against the wall. (2) Panel 5: the influencer's head floated above her
  shoulders (neck added); the owner's arms and shirt were wood-on-wood
  invisible (ink edges added, hands drawn resting on the counter); a stray
  hair arc on the owner's head removed.

## Deviations

- Her panel 1–4 vlog patter is written for this piece in Spanish. The prompt
  quotes her hype only as an English paraphrase and bans English except her
  failed "Excuse me?" line, so the patter lines above are the construction,
  recorded here in full.
- Her panel 5 Spanish line, "Perdone... ¿tienen menú del día?", is likewise
  constructed: the prompt specifies the switch to Spanish and a polite
  request, quoting only "Excuse me?" and "NADA." verbatim.
- Tap fires on pointer release rather than pointer down, so that panel 7 can
  distinguish a tap from a star-dropping drag. Carousel feel is unchanged.
- The colour drain on panel 6 covers the panel, banner and counter; the
  footer hint/counter also switch to grey there. Panel 7 returns to colour.
