# No.511 Minotauro

EXPANSION #61 alice-piaggio, prompt AP7. Source: her risograph Minotauro
(BCBF 2026 winner) - one huge black minotaur mass in exactly three inks.

## Concept

A single sweeping black silhouette does all the work: head and arched back
in one bezier mass that touches the top and left edges of a white ground,
body running diagonally toward the bottom-right. Yellow crescent horns
break the top edge. The face is small and flat against the mass: a hot-pink
snout with black nostrils, tiny pink-ringed eyes with white centres. Both
bent legs end in hot-pink boots with dotted white straps, and a black arm
reaches down so a hoof grips the top corner of a white envelope purse
(thin black outline, flap lines, clasp dot) at the bottom-right, 1/5 of
the canvas width. A thin tail with a tuft hangs off the haunch. Palette is
exactly three inks plus the white ground: black #111111, yellow #F2D800,
hot pink #F23D8A, white #FFFFFF. Flat fills only, no gradients.

Watch-only ambient loop, all phase-shifted sines so it loops seamlessly:
the creature breathes (scale 0.99 to 1.01 about the body pivot on a 7.3s
cycle), the horns sway at their bases, the misregistration offsets drift
(yellow layer +3px, pink layer -3px at 1080 scale, each wandering about
2px on its own slow sine - the riso print feel), and every 5s the snout
snorts two expanding pink ring puffs from the nostrils, staggered and
fading. Double-tap (or double-click) reseeds: new horn curves, new boot
positions, new strap-row count, new snout expression, new grain. Never a
page reload.

## Construction

Single self-contained index.html, canvas 2D, no external assets.

- Seeded layout via mulberry32. The seed comes from ?seed= in the URL
  when present, otherwise a fixed default (51107), so every viewer sees
  the same first beast. Layout precomputes: horn tip/bow jitter, boot
  x-shift, strap rows (2 or 3), snout expression (0 arc mouth, 1 flat
  mouth, 2 open oval mouth, each with its nostril size), tail curl, and
  the grain array.
- Mass: one bezier path (crown, arched back, haunch, two bent legs,
  belly, chest, jaw, muzzle bulge that crosses the left edge). Horns are
  tapered crescent paths rotated about their bases for sway. Boots are
  a single boot path drawn twice, with white strap dots. Purse is a
  rotated rect with flap strokes; the gripping hoof is a black disc
  drawn over its corner.
- Misregistration is applied as per-layer translation: horns ride the
  yellow offset, snout and boots ride the pink offset.
- Canvas size comes from the Visual Viewport API with resize listeners
  on visualViewport and window; draw() pins canvas.style.width/height
  in px every frame. Phone detection uses window.screen physical size
  (min dimension under 700px) with aspect h > w*1.15 as fallback. The
  square composition letterboxes on any screen and the page ground is
  the piece's white.

Deviations, with reasons:

- Riso grain: the prompt calls for a grain overlay. House renderer
  limits (no document.createElement, no offscreen canvas) rule out a
  pre-rendered grain canvas, so the grain is a precomputed seeded array
  of 850 tiny specks in the three inks at low alpha, drawn directly
  every frame. Same static print texture, same palette.
- Horns are drawn over the crown rather than behind the mass. First QA
  pass drew them behind the silhouette and the rear horn sank into the
  arched back until only a sliver showed; drawing them over the mass
  with bases tucked inside the silhouette keeps both crescents fully
  readable, in her flat poster manner.

## QA log

Rendered with node ~/workspace/tools/render-piece.js (no rAF, no
AudioContext, no createElement in the harness, as required).

- qa-desktop.png (1280x900): black mass fills the square stage, touching
  top and left edges; both yellow horns read as full crescents breaking
  the top edge; pink snout, nostrils, flat mouth (seed rolled expression
  1) and pink-ringed eyes read at a glance; pink boots with three rows
  of white strap dots; envelope purse at bottom-right with the hoof on
  its corner; tail and tuft on the right edge.
- thumb.png (720x720): same read at gallery size.
- qa-mobile.png (390x844): square stage centred on white, composition
  keeps its shape, purse fully in frame, nothing clipped except the
  intended edge bleeds (mass at left edge, horns at top).
- Fix during QA: horns moved from behind the mass to over the crown
  (see Deviations); all sizes re-rendered and the determinism gate
  re-passed on the final build.
- Determinism: first frame is the synchronous draw at constant phase
  PHASE0 = 4.1s (breath mid-scale, snort cycle at rest at phase 0.82,
  misregistration at fixed drift values). No Date.now anywhere; the rAF
  loop is typeof-guarded and anchored as PHASE0 + elapsed. thumb.png
  rendered twice and cmp byte-compared: identical.
- Palette audit: programmatic hue scan of all three renders - every
  saturated pixel falls in the pink or yellow ink family; the rest are
  neutral (black/white and their anti-aliased blends). Zero off-palette
  hues. No gradients used anywhere.
