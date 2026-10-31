# No.566 "Hazlo Como en Francia"

EXPANSION #68 teresa-ferreiro, prompt TF6 (The Baguette Tribunal). A 6-panel
housing-crisis carousel: one panel at a time, tap to advance, Spanish
throughout, hand-lettered wobble throughout.

## Concept

Panels 1-4 are a four-step guide, "CÓMO LUCHAR POR tus derechos", in one
split layout that never changes: on the left a woman lays out one reasoned
step per panel; on the right the same man ignores the argument entirely and
attacks her appearance, each insult dumber than the last. She stays composed;
he never wins. Panel 5 cuts to "FRANCIA EN 1936", where the same man is
outraged by the price of a baguette, drawn golden and beautiful because it is
the sacred object. Panel 6 gives the punchline: the same man again, now
gleeful, working a guillotine amid flat flames under the caption "HAZLO COMO
EN FRANCIA! (del 36)". Tapping the guillotine drops the blade and the
baguette on the lunette splits in two.

## Construction

- Single self-contained index.html, canvas 2D, no external assets, no audio.
- Design space 1080x1440 (portrait). Canvas sized from the Visual Viewport
  API with resize listeners on visualViewport and window; canvas.style
  width/height pinned in px inside draw() every frame. Phone detection via
  window.screen (min dimension < 700px), aspect fallback only; on phones the
  portrait stage spans the full width, page ground is the banner cream.
- Strict palette, flat fills, no gradients: vivienda teal #2E8B8B, banner
  cream #F5EEDA, guillotine steel #8A8A8A, revolution red #B23A3A, baguette
  gold #D9A441, ink #141414.
- Panels are wobbly hand-drawn frames (seeded jitter rects). Headings use
  per-letter seeded jitter ("hand-lettered"). One parametric woman (teal
  dress, ink bun, level brows, straight mouth, papers in hand) and one
  parametric man (steel shirt, ink hair cap) with three moods: shrug
  (panels 1-4, eyes slid away, hand waved off), rage (panel 5, fist up,
  shouting mouth), glee (panel 6, arched brows, wide grin, hand on the rope).
  The man is the same character in panels 1-6: same face, hair and shirt.
- Panel 5 sepia is built only from palette colors: a gold wash at full
  strength under a cream wash at 55% alpha. The grain is a precomputed
  seeded field of 620 specks (mulberry32, seed 566055) drawn directly each
  frame (the QA renderer has no offscreen canvas); dragging rotates/offsets
  the field around the panel center and it decays back to rest after release.
- Panel 6 flames are flat teardrop shapes in red and gold on a red ground,
  flickering as a 2-frame height swap on a shared phase. The blade drop is
  driven by time since the guillotine tap: blade falls over 0.45s, the
  baguette halves rotate apart in the last quarter, and a decaying shake
  (the crowd roar) runs 0.45-0.9s. A second tap on the guillotine restores
  the blade and the whole baguette. Leaving panel 6 also resets it.
- Interaction: tap advances (panel 6 wraps to panel 1; carousel navigation,
  not click-to-reload). On panel 6 a tap inside the guillotine zone triggers
  the drop/reset instead of advancing; a tap elsewhere advances. On panel 5,
  horizontal drag swirls the grain. Footer carries only the "tap" hint and
  the n/6 counter.
- Determinism: frame one is the synchronous draw at constant PHASE0 = 2.1
  showing panel 1 fully composed (blade state, grain and panel index are
  user-driven only). The rAF loop is typeof-guarded and anchored as
  PHASE0 + elapsed since load; no Date.now anywhere. Ambient motion uses
  integer-ratio periods (4s figure bobs, 2s flame swap) off the same clock.

### Panel texts (all eight guide texts, verbatim as built)

Header (panels 1-4): "CÓMO LUCHAR POR / tus derechos", with a "PASO n DE 4"
strip on her banner and zone labels "ELLA EXPONE" / "ÉL, A LO SUYO".

Her arguments (left, one per panel):
1. "Las SOCIMI compran barrios enteros y apenas pagan impuestos por ello."
2. "Cada subida del alquiler expulsa a vecinos de toda la vida."
3. "Hay que limitar por ley la compra masiva de vivienda para especular."
4. "Si una vía se cierra, abrimos otra: organización y presión vecinal."

His insults (right, one per panel, escalating):
1. "Ya, ya... ¿y por qué no te depilas las axilas, para empezar?"
2. "Uf... ¿ese olor a pachulí viene de ti o de una tiendecita?"
3. "Con pantalones de cáñamo no te toma en serio ni el banco."
4. "Tú eres una comunista progresista de Chanel."

Panel 5: header card "FRANCIA EN 1936"; his bubble "¿¡2,10 por una
baguette!? ¡Esto es un atraco!"; price tag on the baguette "2,10".
Panel 6: caption "HAZLO COMO EN FRANCIA! (del 36)".

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and cmp-compared:
  byte-identical. Second render deleted.
- Read-back of desktop/mobile/thumb: panel 1 shows the teal guide header,
  her "PASO 1 DE 4" banner with the SOCIMI argument, the composed woman
  with her papers, the divider, the dismissive man and his first insult
  bubble ("...depilas las axilas..."). Nothing clipped on mobile; the
  footer "tap" hint and "1/6" counter sit correctly at both sizes.
- Panels 5 and 6 additionally verified via throwaway preset-index renders
  (deleted after QA): panel 5 shows the sepia card, the outraged man, the
  raised golden baguette with its "2,10" tag and grain confined to the
  panel; panel 6 shows the raised blade, whole baguette, gleeful man on
  the rope and the caption band; a dropped-state preset shows the blade
  down and the baguette in two rotated halves.
- Fixes during QA: (1) the step chip initially overlapped the "ÉL, A LO
  SUYO" label; it moved into the teal strip of her banner as "PASO n DE 4".
  (2) The panel functions clipped without saving, so their closing restore
  popped the main draw transform and the frame, footer and panel-5 grain
  rendered unscaled (frame at raw coordinates, grain specks across the
  whole page). Each clip is now wrapped in its own save/restore; frame,
  footer and grain sit correctly at every size, re-verified by read-back.

## Deviations

- The prompt's panel 1-4 interaction note also says "TAP panels 1-4 to
  cycle the woman's argument vs his insult"; the same brief's interaction
  summary says tapping panels 1-4 advances only, cycling nothing extra.
  The summary reading was built: each guide panel has exactly one argument
  and one insult, and tap advances the carousel.
- Sepia for panel 5 is a layered wash of the two lightest palette colors
  (gold + cream) rather than a dedicated sepia hex, because the palette is
  strict and names no sepia.
- The guillotine tap toggles: after a drop, tapping the guillotine again
  restores the raised blade and whole baguette, so the gag can be replayed
  without leaving the panel. The prompt specifies the drop only.
- Panel 5's cobble arcs and panel 6's platform are drawn in ink at reduced
  alpha / solid ink; no extra colors were introduced.
