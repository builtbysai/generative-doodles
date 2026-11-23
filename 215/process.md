# No.403 Costume Triple - process

## Concept

After Nina Clausonet's Wonderful Winter Week rules
(nina-clausonet study, EXPANSION #43 prompt NINA3): a
dress-up generator built from her stable white-haired
closed-eye muse. Every deal draws one garment, one
animal and one thing from the prompt's three
lexicons. Following her own observed resolutions,
the animal is never drawn as an animal: it exists
only as a garment print (jaguar becomes a leopard
print, snow monkey becomes shag, lama becomes the
poncho weave). The thing exists only as an oversized
prop (festive headband becomes a giant fuchsia
polka-dot bow, Christmas mug becomes mug earrings,
presents become a bow-tie collar). One flat ground
per deal, mint or blush alternating, snowflake
sparkles on the ground, and her heavy paper grain
over everything. No text, no labels, no UI.

The prompt's seeded-RNG deal takes the house fixed
authored table treatment (the No.394 precedent):
six deals authored in advance, one per animal, in a
fixed order, dealt in sequence and wrapping. Nothing
is random at runtime.

## Construction

One self-contained canvas, design space 1280x900,
centred fit; the page ground takes the current
deal's ground colour and swaps with it. All marks
are JS data drawn directly each frame; no offscreen
canvas, no gradients, no filters, no shadowBlur.
Flat colour only.

The fixed authored deal table (frame one is entry
1, her observed deal):

| # | Garment | Animal, as print only | Thing, as prop only | Ground |
|---|---------|-----------------------|---------------------|--------|
| 1 | turtleneck | jaguar: 44 green rosettes and spots on dark teal #14524F | festive headband: giant fuchsia polka-dot bow | mint #43D3A2 |
| 2 | checkered coat | hedgehog: brown spike strokes over a brown-on-cream check | Christmas mug: red mug earrings | blush #F7D8C9 |
| 3 | knitted accessory (shaggy sweater) | snow monkey: rows of gray wavy shag strokes | star: red star hair ornament | mint |
| 4 | poncho | lama: cream poncho weave, red bands, fringed hem | presents: fuchsia bow-tie collar | blush |
| 5 | shawl | polar bear: 13 white bear-face blobs on cream, diagonal drape | candy cane: red/white striped cane tucked in the hair | mint |
| 6 | wool skirt | penguin: 15 penguin glyphs on the cream skirt, dark top, red waistband | Christmas card: red card with a star, held at the chest | blush |

Asserted counts, checked at load: exactly 6 deals,
44 rosettes, 13 bears, 15 penguins, 24 sparkles,
700 grain dots. Print tables are baked at load from
a fixed-seed LCG and rejection-tested against the
cloth silhouette, so they are identical on every
render and never change between frames.

The muse is one fixed recipe under all deals: white
hair mass with a scalloped fringe and side locks,
cream-pink skin, closed eyes, red lips, blush drawn
in the pop red at low alpha. The fixed muse slots
(skin #F2C9A8, hair #FFFFFF, ink #2B2620) sit
alongside the per-deal palette; lips and cheeks use
the deal family's pop red #E63329.

Interaction, per Hans's RETHINK rule: double-tap
deals, drag tilts, nothing else. A double-tap (two
taps within 0.4s of the piece clock) starts the
dressing wipe: over 0.7s on fixed 1/60 ticks the old
print slides down and off inside a clip-rect while
the new print slides in from the top, the ground
swaps at the wipe midpoint, the old prop fades and
drops, and the new prop pops in on an easeOutBack
bounce. Dragging tilts the whole portrait toward
the pointer (max 0.11 rad) on a spring; on release
the spring returns it and snaps to exactly upright.
Never click-to-reload; a single tap does nothing.

Ambient life runs on a 12s loop. Breathing scale
0.98-1.02 on one whole cycle of the loop. Her muse's
eyes stay closed, so the prompt's blink is kept as
a serene lash press at two fixed slots in the loop
(4.0s and 9.5s, 0.26s each): the closed-eye line
deepens and thickens briefly. The 24 snowflake
sparkles drift and twinkle only on whole cycles of
the loop, so the loop is seamless.

Grain follows the batch grain rule: exactly 700
speckle dots from a fixed table (ink at 0.05 alpha,
white at 0.08), drawn last, in table order, every
frame. Never a noise texture or overlay.

Determinism: frame one is drawn synchronously at
the constant phase T = 2.4s into the loop (breath
near full, sparkles mid-drift, first deal fully
dressed, no wipe, no blink). The animation clock is
anchored at that constant and advances in fixed
1/60 ticks accumulated from rAF timestamps, typeof
guarded; frame one is never derived from Date.now()
or any wall clock. Pointer coordinates convert
through the stored fit transform (S, OX, OY).
Sizing uses the Visual Viewport API with resize
listeners on visualViewport and window; the canvas
is pinned by style width/height every frame; phone
detection uses window.screen with the aspect
fallback.

Two QA hooks ride the query string the house
renderer passes (?seed=...): deal=N renders table
entry N at rest, wipe=1 renders a mid-wipe frame.
Default play is unaffected.

## QA log

Rendered with the house renderer
(node ~/workspace/tools/render-piece.js):

- qa-desktop.png (1280x900): frame one, deal 1.
  Giant fuchsia polka-dot bow over the scalloped
  fringe, closed-eye muse, jaguar rosette print on
  the dark teal turtleneck, ribbed collar, sparkles
  and grain reading across the mint ground.
- qa-mobile.png (390x844): centred fit, whole
  portrait in frame, page ground continuous mint.
- thumb.png (720x720): rendered twice from the
  shipped script; byte-identical (md5
  227c324cd3c3f49475b35eb167122b08).
- Probe renders (temporary, not shipped): deal 2
  (checkered hedgehog coat, mug earrings reading
  clearly at the ears), deal 3 (snow monkey shag
  sweater, red star ornament), deal 4 (lama poncho,
  fuchsia bow tie at the throat), deal 5 (polar
  bear shawl, candy cane), deal 6 (penguin skirt,
  held Christmas card), and a mid-wipe frame
  (deal 1 to deal 2 at 0.35s: coat above the wipe
  line, jaguar print below, ground already blush,
  old bow faded, new earrings popping in).

Fixes during QA: the turtleneck collar and the
knit neck rib were extended downward so no skin gap
opens between collar and chest; the penguin deal's
red waistband is now clipped to the garment
silhouette (it first stuck out past the cloth on
both sides); the candy cane gained a soft ink halo
stroke so its white stripes stay legible against
the white hair; the polar bear blobs gained small
ink nose dots so they read as bear faces rather
than plain paws.

Deviations: none from the spec or its adaptation
flag. The blink is realised as a closed-eye lash
press because the muse's eyes are closed by design;
this is recorded in the header comment and above.
