# No.427 Self-Care Waltz

## Concept

After Yael Hofri's Sweetemberdays26 Prompt 2: a woman dancing
barefoot at home at night, pink headphones on, a glass of red wine
raised, houseplants framing the room, two cats asleep on a magenta
rug in the lamplight. Warm, cozy and still around the dance. Music
notes rise from her headphones and fade; the cats do not stir except
for a single tail flick each per loop. No text anywhere: the notes
are glyph shapes only.

## Construction

One canvas, design space 1280x900, full-bleed cover-fit. Flat colour
only; no gradients, no shadowBlur, no offscreen canvas anywhere.

- Palette, closed: dusk purple walls #3E2A4F; lamp glow #F7D354;
  headphones #F06A8A; dress #D94F6B; plants #4E7A3A; cats #C9A24B
  and #8A6A2E; rug #E84393 with pattern #F6D7DE; wine #7A1E2B.
  Nothing else.
- Palette resolution (documented per spec): the YAE3 palette names
  no skin or hair colour, so both are resolved from inside the
  palette. Skin is the rug's pale pink #F6D7DE; hair is the deep
  wine #7A1E2B, which also fills the raised glass, tints the lamp
  stand and plant pots, and draws the facial lines. No colour from
  outside the palette is introduced.
- The lamp glow is one flat stepped pool, per the batch glow flag:
  three concentric flat-alpha ellipses of #F7D354 (alpha 0.06 /
  0.10 / 0.16) on the floor around the rug, plus two stepped halo
  ellipses behind the lamp's solid glow-yellow shade. Stepped flat
  shapes only, never a gradient.
- Layout: dancer centred at half the frame height, mid-twirl with
  one leg lifted, wine glass in the raised hand, headphone band
  across the hair. Cats bottom-left on the rug, curled in comma
  shapes. Potted plants frame the left and right edges; a floor
  lamp stands behind the left plant. The rug is a magenta ellipse
  with a pale ring stroke, a ring of small diamonds and a centre
  medallion.
- Motion, WATCH-ONLY 14s seamless loop, zero interaction:
  - Figure sway on a 2s cycle (7 per loop) at 4 degrees, the whole
    figure rotating about the pivot at her feet.
  - Hair and dress hem lag the sway by a fixed 0.3s phase: the hair
    mass rotates about the neck by the lagged angle, and the hem
    corners shift by the lagged sine, so both trail the body.
  - Exactly 7 music-note glyphs (asserted), each completing one
    rise per loop from a headphone cup on staggered 2s offsets,
    fading in over the first 12 percent and fully out by 85
    percent of its rise, so nothing ever clips the top of the
    frame and the stream wraps seamlessly.
  - The two cats' tails flick at fixed slots, 3.2s and 10.2s (the
    prompt's 7s cadence made exact, one flick per cat per loop):
    the tail's tip segment rotates through a damped three-beat
    wiggle over 0.9s. The bodies never move; stillness is the
    point.
  - Plants, lamp and rug are static.
- Cats: a comma curl built from a round body, a tail arc hugging
  just outside the body (radius 1.05r, so the wrap reads), a tucked
  head with two ears, one closed sleeping eye and a nose dot;
  faint stripes in the other cat's colour.
- Determinism: frame one is drawn synchronously at the constant
  phase T = 5.3s (mid-sway, notes rising, both tails at rest); the
  clock is anchored there and advances in fixed 1/60 ticks from
  the rAF timestamp, typeof-guarded. Frame one never comes from a
  wall clock, so the thumbnail reproduces byte-identically.
- House rules: Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned via style width/height
  in px every frame; phone detection via window.screen (min
  dimension under 700px, aspect fallback). No pointer handlers at
  all. Fixed data only, no Math.random at draw time, no em dashes,
  no absolute URLs.
- QA probe (house seed pattern, not shipped behaviour): ?seed=flick
  starts the clock at T = 3.65s, mid tail-flick, so the flick and
  the opposite sway extreme can be render-checked.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png) and 720x720 (thumb.png). Thumb rendered
  twice from the shipped script: byte-identical
  (md5 cb1f5d35...).
- Desktop: the dancer reads at a glance, headphones and raised
  wine glass clear, notes rising on both sides, hair mass and hem
  visibly trailing the sway. The lamp's stepped halo and the floor
  pool read as flat lamplight; plants frame both edges; both cats
  sit curled on the rug with their tail wraps and sleeping faces
  legible.
- Probe: ?seed=flick shows the sway at its opposite extreme with
  the hem swung the other way and the first cat's tail tip rotated
  into its flick; the scene stays clean.
- Fixes during QA: the tail wrap first sat at the body's own
  radius and vanished behind it; it now hugs just outside the body
  so the comma curl reads. The note rise first ran 308px with a
  late fade, so the highest notes clipped the top edge mid-glyph;
  the rise is now 215px and each note is fully faded by 85 percent
  of its rise.
- Mobile: cover-fit centre-crops the room on a portrait phone; the
  dancer stays whole and centred, the rug band and the nearer cat
  remain in frame, which is the house behaviour for a full-bleed
  field piece.
- Palette verified closed against the spec: the nine YAE3 colours
  only, with skin and hair resolved from inside the palette as
  documented above.
