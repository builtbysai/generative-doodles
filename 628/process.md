# No.628 - Eighty Teachings

EXPANSION #76 soledad-romero, prompt block 4 "Oráculo del Bosque" (TASKS.md).
Soledad Romero's 2026 forest oracle deck (EL ORACULO MAGICO DEL BOSQUE, 80
nature teachings) as an interactive piece. This is her oracle, not the
Cabassa deck of No.623: different backs (a single gold ring, not a mandala),
and a drawn card does not simply appear - it paints itself, stroke by stroke,
the way her illustrators' process videos do. No text anywhere: in her
doctrine the image carries the teaching.

## Concept

Twelve facedown cards rest in a row along the bottom of a dark forest
ground. Their backs are dark indigo with one gold ring and a small ring of
gold dots. Tap a card and it rises into the open upper space, turns over
with a stepped paper flip, and paints itself over about four seconds: a
pale wash first, then the creature's form in tapered brush strokes, then
the details, with a small brush dot riding whichever stroke is currently
being laid. Six species, each dealt twice with different seeds and one
accent swapped: fox, frog, seed, mushroom, owl, squirrel. Each carries its
teaching pictorially and wordlessly: the fox glances toward a forked path
drawn beside it (destiny), the frog sits under falling rain (tears), the
seed glows at its center (the present), the mushroom stands under a
crescent moon, the owl under stars, the squirrel holds its nut.

Drawn cards float in a loose constellation. Double-tap one and it sinks
back to the deck face down, its row slot refilling. Drag one and it stays
where it is dropped, floating gently. Painted creatures keep living:
the fox's ears flick, the frog's throat pulses, the seed's glow breathes,
the owl blinks, the squirrel's tail sways, spores drift up off the
mushroom cap. Undrawn backs breathe almost imperceptibly.

## Construction

Single self-contained index.html, canvas 2D only, no external assets, no
audio, no microphone. Canvas size comes from the Visual Viewport API with
resize listeners on visualViewport and window; draw() pins
canvas.style.width and height in px every frame. Phone detection uses
window.screen physical size (min dimension under 700px) with the aspect
fallback h > w * 1.15 only. On narrow frames the deck row refits to two
rows of six and the constellation to a 3-column grid; the page ground is
the forest tone.

Palette (strict): card back indigo #1A2440, ring gold #C98A2E, face ground
aged cream #F5F1E8. The ground is the back indigo darkened by half:
(26, 36, 64) scaled by 0.5 gives (13, 18, 32), #0D1220, with a seeded
field of faint gold and cream specks. Creature colors come only from the
prompt's per-card set: moss #5C8A4D, bark #6B4A2E, fox amber #C9862E, frog
green #6A9A5B, mushroom coral #E2725B, night blue #2B3A67, cream #F5F1E8
(the ring gold also appears inside two faces, as the owl's beak and the
mushroom's moon).

Stroke-playback model: every painting is precomputed data, never drawn
procedurally at runtime. For each card, makePainting(species, seed) builds
a list of strokes in face space (100 by 140 units): ribbons (tapered
polylines), dots, blobs (ellipses), a layered-alpha glow, and a crescent.
Strokes are grouped wash, then form, then detail; start times and
durations are assigned sequentially with 22 percent overlap, durations
proportional to stroke length, and the whole timeline is then scaled to
exactly PAINT_DUR = 4.0 seconds. Playback is a pure function of the
anchored elapsed clock: each stroke's local progress is
clamp((t - paintStart - start) / dur), ribbons are drawn up to that
arc-length fraction, blobs and dots ease out their scale, and the brush
dot is placed at the active stroke's current point. The seed for a card's
painting is its index combined with a deal round counter
(BASE_SEED * 1000 + index * 131 + round * 7919, mulberry32 throughout),
so a card that returns to the deck repaints as a fresh variant of the
same species next time it is drawn. The deck order itself is a seeded
Fisher-Yates shuffle of the six species doubled.

Determinism: frame one is the synchronous draw at t = 0, all twelve backs
down, constellation empty. Nothing is derived from Date.now(); the
requestAnimationFrame loop (typeof-guarded, since the QA renderer has no
rAF) is anchored to its first timestamp, and all idle motion (breathing,
ear flicks, throat pulse, glow, blink, tail sway, spore drift) is a pure
function of that anchored clock and each card's seeded phase. Card state
(rise 0.9 s with the flip scaleX quantised to eighths, painting, floating,
return 0.8 s) advances inside draw() from state start times, so any frame
is reproducible from the event history alone.

Interactions: pointer events where available (mouse and touch fallback).
Tap a facedown card to draw it. Double-tap a drawn card to return it.
Drag a drawn card to reposition it in the constellation. At most 12 cards
can be drawn; the draw path guards the cap by returning the oldest drawn
card first.

## QA log

Rendered with node ~/workspace/tools/render-piece.js (node-canvas):
- qa-desktop.png (1280x900): the full row of twelve indigo backs along the
  bottom, gold ring and dot ring on each, empty dark constellation space
  above, faint specks, nothing clipped.
- qa-mobile.png (390x844): deck refits to two rows of six at the bottom,
  backs fully legible, nothing clipped.
- thumb.png (720x720): single row of twelve backs; rendered twice and
  byte-compared with cmp - identical (determinism gate passed, re-verified
  after every fix round). Second render deleted.
- Forced painted-card checks (throwaway renders in /tmp via the piece's
  location.search hook, '?seed=showfox' and siblings, read and then
  deleted): all six species verified fully painted. Fox: amber body, plume
  tail, ears, eye, forked path at lower right. Frog: green body, eye
  stalks, cream throat, rain streaks above, puddle line. Seed: bark and
  amber seed body, glowing cream core, sprout and roots over a soil line.
  Mushroom: coral cap with cream spots, brown stem, small side mushroom,
  gold crescent, grass. Owl: night-blue body, cream face discs, blinking
  eyes, stars and a gold sparkle, branch. Squirrel: upright body, tail
  arcing up and over the head, nut held in front.

Fix rounds during QA:
1. The wash was first built as wide translucent ribbons; because a ribbon
   is stroked in overlapping segments, the alpha compounded and the wash
   rendered as bold stripes. Rebuilt as three single-pass flat ellipse
   dabs at alpha 0.12-0.14, which stay genuinely pale.
2. The fox's cream chest patch sat too low and read as a hanging egg;
   shrunk and raised into the body.
3. The frog's throat blob sat below the body's coverage and read as a
   detached cream hill; moved up into the body and the eye pupils enlarged.
4. The mushroom's cream stem was invisible on the cream face; the stem is
   now bark at 0.85 alpha, the cap enlarged, and the cap spots moved
   inside the dome (one had floated above it).
5. The squirrel's tail rendered as a detached amber club beside the body;
   its path now starts at the body's base, hugs the right side, and curls
   over the head. Feet are now flat blobs on a raised ground line instead
   of a stray diagonal stroke.

Deviations:
- The deck is exactly the twelve oracle cards, so the "13th draw" case in
  the prompt cannot occur by tapping (no facedown card remains once all
  twelve are drawn). The cap is still implemented in the draw path as a
  guard: if twelve cards are drawn, the oldest returns before a new draw
  proceeds. Double-tap returns keep the row refilled in normal play, so
  the deck never sits empty while cards are out.
- A drawn card's constellation position is a seeded jittered grid slot
  rather than free scatter, which keeps twelve drawn cards from
  overlapping; dragging still allows arbitrary placement afterwards.
- The QA location.search hook ('?seed=show<species>') exists only so the
  render tool can force one finished face for verification; production
  loads carry no query string and are unaffected.
