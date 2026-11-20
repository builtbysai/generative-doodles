# №1924 Mouth-Clicking in the Philharmonie

## Prompt

LK5 / PP1171, #251 lauren-kinsella, from TASKS.md (verbatim build spec):
Four singers stand in a circle on a large wooden disc, a towering
red-lit concert hall curving around them. Their voices are drawn as
colored breath-lines passing a melody around the circle: each singer
catches it, ornaments it, passes it on. Tap anywhere and a small
mouth-clicking voice joins the rim: a tiny percussion sprite that
clicks along for a while, then falls quiet. The circle absorbs the
clicks; with each added voice the piece grows warmer. Palette: hall
red and wood gold; the four voices in pink floral, sage, cream and
slate; the click-sprites in bright childlike yellow. Composition: the
wooden disc fills the lower two-thirds; the red acoustic curve arcs
above; click-sprites accumulate along the rim like fireflies.
Motion/interaction: TAP to add a mouth-clicking voice. No other
interaction. Technical approach: four voice agents passing a melody
token with ornament rules; tap spawns a click agent with a lifetime
and a simple click pattern that phase-locks to the melody; sprite
count capped so the four voices always lead. What to avoid: no
click-to-reload; do not let the clicks overwhelm the four voices.
The clicks are guests, not the band.

## Driver

One glowing melody token travels a 16 second circle past four robed
singers, lighting the breath-line arc it crosses and opening ornament
curls over the singer holding it, while taps add yellow click-sprites
to the disc rim that pulse on a 2 second beat and fade after 12 seconds.

## Palette

The study file studies/lauren-kinsella.md does not exist in the repo,
so the hex values below are hand-picked from the prompt's named colors.
Hall red: #2a0a0c ground, #8f1d22 body, #b3272e lit, #5c1013 shadow.
Wood gold: #a97c2f body, #c99a4a light, #7a5a22 dark. Voices: pink
floral #e58aa8, sage #9caf88, cream #f2e6c8, slate #6e7f8a.
Click-sprites: bright childlike yellow #ffd23f. Title ink #f5ead2,
date line #d9a86c.

## Determinism

FIRST_T = 7. At t = 7 the token is a quarter of the way around the
circle, leaving the pink singer for the sage singer, with the cream
singer's ornament curls still open from the previous pass (the token
is nearest the cream singer at this phase). Frame one is a pure
function of t: token, breath-lines, ornaments, hall wash and disc
grain are all fixed, and no click-sprite exists before a tap. Seeded
PRNG mulberry32(seed = 1924) fixes the disc grain; each tap's rim
jitter comes from mulberry32(1924 + tap count x 7919). Re-rendered
desktop frame twice: identical md5 69cf4d65907554940a3cc31e382e6e98.

## Interaction probe

Tap probe (node harness, /tmp/probe-1924.js): pointerdown at the
right rim, then one animation frame 1 s later. Default 720x720 render
md5 a1d3b1e274482a722389a5242c1d70e4; probe render md5
f38c6a35ef8039d9478c641f1329dc7e. Visually confirmed: a bright yellow
click-sprite with tick rays sits on the right rim of the disc in the
probe frame, and the hall reads slightly warmer. Tap adds a sprite;
it never reloads.

## Audio

Visual-only, no WebAudio. Watch/tap pieces cannot autoplay sound, and
the prompt asks for a visual piece, so the clicks are drawn, not heard.

## House rules

Visual Viewport sizing with resize on visualViewport and window;
canvas element pinned in draw() via style width/height in px; phone
detection via window.screen (min dimension under 700px) with aspect
fallback (h > w*1.15); field-like composition full-bleed on phones,
square on desktop; one synchronous frame at load; requestAnimationFrame
guarded with a typeof check. Flicker safety: all motion runs at or
under 0.5 Hz; prefers-reduced-motion freezes at the first frame.
No em dashes in visible copy. No click-to-reload. Title/date plate
drawn on canvas: "Mouth-Clicking in the Philharmonie", "№1924 ·
2007 · 04 · 19". Gallery note cue: "Tap to add a mouth-clicking
voice."

## QA

Rendered the actual script with node render-piece.js at 1280x900
desktop, 390x844 mobile, 720x720 thumb; inspected all three.
Fix rounds: 1. The first pass read clean except the seeded wood knots
drew as floating rings; toned them from alpha 0.5 / radius 0.012H to
alpha 0.32 / radius 0.009H and re-rendered all three sizes. thumb.png
is byte-identical to the 720x720 render (md5
a1d3b1e274482a722389a5242c1d70e4).

## Deviations from the prompt

None structural. The singers are abstract robed figures with open
mouths rather than literal portraits, which fits the series taste.
The hall shell is drawn as five concentric red arcs rather than a
full architectural hall, since the disc fills the lower two-thirds
and the arcs carry the towering curve.

## Known warts

The ornament curls read as three small open "C" shapes above the
holding singer rather than full spirals; they are legible as
ornament but modest. The four singers look a little like chess
pawns at thumb size; their voice colors and the open mouths carry
the reading. On tall phones the disc becomes a tall ellipse, which
is the intended full-bleed field treatment, but the singers sit
farther apart vertically than on desktop.
