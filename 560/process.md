# No.560 "Mundo Diminuto" — EXPANSION #67 roberta-vazquez, prompt RV8

## Concept

Pineápolis, Roberta Vázquez's Polly-Pocket-scale miniature world, as a flat
riso-print diorama. A tiny turquoise city radiates streets from a pink plaza
with a yellow star; a tram circles the ring road forever. Her black-and-white
character style pops against the flat turquoise, pink and purple grounds: a
green hairdresser frog works its salon on the west side, and a caped vampire
keeps watch from the tower roof on the east. A hand-lettered-style sign at the
south entrance reads PINEÁPOLIS. Glitter specks and riso grain sit over
everything, and a few shapes are printed with a 2px misregistration offset,
the colour slipping out from under the ink keyline the way a riso drum does.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets.
- Design space 1080 × 1080, world content placed on a wider field
  (roughly −260…1300) so the city can be panned.
- Strict nine-colour palette, flat fills only, no gradients:
  turquoise #4EC8B8, pink #F06AA8, purple #8A5AA8, butterfly blue #5A9AE0,
  ink #1A1A1A, white #FFFFFF, frog green #5AB85A, cape red #D93A2B,
  star yellow #F2D230.
- Three parallax planes: background (0.3×) holds twinkling four-point stars,
  toy clouds and five lissajous-path butterflies; mid (0.65×) holds the flat
  ground patches, six radiating streets, the ring road, background toy
  houses, lollipop trees and the tram; foreground (1.0×) holds the four hero
  buildings, the frog scene, the vampire, the entrance sign and the grain.
- Hero buildings: pink octagonal house with purple roof cap (misregistered
  print), purple five-point star building, white salon with pink roof and a
  scissors emblem instead of a word, white vampire tower with purple spire.
- Windows flicker on a deterministic schedule: each window has a fixed phase
  and is lit yellow or dark in a 3-step cycle of t, an integer-ratio function
  of the shared clock, so frame one is already composed.
- Tram: fixed elliptical circuit (the ring road), 26 s period, fixed phase
  offset 0.7 rad; at PHASE0 it sits at the bottom of the ring.
- Frog scene: the frog holds scissors aimed at the seated customer's hair.
  TAP the frog or customer: scissors snip for 1.4 s (two-frame open/close at
  7 Hz, yellow snip sparkles) and the customer's hairstyle advances through
  five styles (flat cap, spikes, pink puff, star tuft, single curl).
- Vampire: TAP it and it floats to the next rooftop in a fixed four-roof
  circuit (tower, octagon house, star building, salon), 1.8 s eased arc with
  120 units of lift; its red cape swishes slowly at rest and flutters fast in
  flight.
- DRAG pans all three planes at their parallax factors. The pan is clamped
  to ±170 design units and STAYS where it is released (no spring back), so a
  visitor can park the view on a corner of the city.
- Riso grain: 700 specks precomputed from the seeded RNG (mulberry32, seed
  560067), drawn directly each frame; about one in seven is a plus-shaped
  glitter speck that twinkles. Misregistration is a helper that fills a shape
  once at a (2.5, 1.5) offset in its own colour, then fills and ink-strokes
  it at the true position.
- Determinism: frame one is one synchronous draw at the constant phase
  PHASE0 = 4.0 s (tram mid-circuit at the ring's bottom, stars mid-twinkle,
  pan centred, vampire home, first hairstyle). The rAF loop is typeof-guarded
  and anchored as PHASE0 + elapsed since load; nothing is derived from
  Date.now(). All seeded fields are computed once at load from the fixed seed.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas CSS size pinned in px inside
  draw() every frame; phone detection via window.screen physical size
  (min dimension < 700 px) with the aspect fallback only; on phones the square
  stage spans the full width over the turquoise page ground. No audio, no
  microphone, no external requests.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js`:
  qa-desktop.png (1280×900), qa-mobile.png (390×844), thumb.png (720×720).
- Determinism gate: thumb.png rendered twice and `cmp` byte-compared,
  byte-identical; the second render was deleted.
- Desktop/thumb read-back: the turquoise city reads at once. Pink plaza with
  yellow star at centre, white ring road with the pink tram at its bottom,
  six radiating streets, pink octagon house lower left, purple star building
  upper right, salon with scissors emblem upper left, frog (green) snipping
  beside its white customer in the purple chair, vampire in ink suit and red
  cape standing on the tower roof lower right, PINEÁPOLIS sign across the
  bottom, butterflies and twinkling stars in the sky plane, grain everywhere.
- Mobile read-back: the whole square diorama spans the 390 px width, centred
  on the turquoise ground; sign text, frog, vampire and tram all legible,
  nothing clipped.
- Fixes during construction: the vampire rooftop list was re-measured
  against the drawn roof lines (tower base line, octagon cap top, star point,
  salon roof edge) so the figure lands exactly on each roof; the frog scene
  was moved off the tram ring (its first position sat on the track) and the
  scissors arm re-aimed so the blades meet the customer's hair.

## Deviations

- Pan behaviour: the prompt allowed either settle-back or stay; the pan
  STAYS where released (clamped), recorded here per the brief.
- The salon carries a scissors emblem rather than a text sign, so the only
  lettering in the piece is the specced PINEÁPOLIS sign.
- The sign's lettering uses a bold rounded system font (no external font
  assets are permitted); everything else is drawn shapes.
- Ground patches use the palette's pink and purple as flat colour fields in
  the mid plane, the riso way: they read as printed colour areas under the
  streets rather than as literal terrain.
