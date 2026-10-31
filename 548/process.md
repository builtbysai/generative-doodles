# No.548 — The Held Thing

EXPANSION #66 cristina-daura, prompt CD4 ("Wallpaper World"). Watch-only.

## Concept

Daura's portrait mechanism: a large calm profile grounds the fantasy, and
the tiny thing held in the hand is the dream. Per the brief, this build
takes the w06 pairing — a woman with a black bob holding a small decorated
cup, against black-leaf wallpaper on vermilion (the w08 pagoda/dragon
pairing is the alternate the prompt names; the cup was chosen so the held
world stays small and domestic against the strident ground).

A white-skinned woman in profile, head cropped by the top edge, fills the
left of the frame. Her forearm rises from the bottom edge at center and
holds a tiny white cup with a blue band, dot row, and handle — 90 units in
the 1080 design space, under 12% of canvas height, so the scale contrast
does the work. Flat white smoke curls rise from the cup. No text, no UI,
no hint.

Strict palette, nothing else: vermilion #D93A2B, wallpaper black #1A1A1A,
skin white #FFFFFF, hair black #111111, cup blue #1B6FD6. Flat fills only,
no gradients anywhere.

## Construction

- Single self-contained `index.html`, canvas 2D, 1080-unit design space,
  square stage centered via the Visual Viewport API (resize listeners on
  visualViewport and window); the composition keeps its shape on phones
  and the page ground is the vermilion. Canvas CSS size is pinned in px
  inside every draw. Phone detection follows the house rule (window.screen
  min dimension < 700px, aspect fallback), though the layout is identical
  either way.
- Wallpaper: one tile function (two black leaves with vermilion vein cuts
  and a dot) drawn on an offset grid, clipped to the stage. The offset
  crawls one tile per 24s loop with wrap, so the crawl is seamless. A
  fixed mulberry32 seed (548066) fixes a small permanent jitter on leaf
  rotations.
- Figure: flat shape layers — torso, hair silhouette, then the white face
  profile (forehead, nose, lips, chin) laid over the hair's front, with a
  single closed-eye curve as the only feature. Breathing is a 2px shoulder
  rise on a 4s cycle (6 breaths per loop, integer ratio).
- Cup and hand: forearm column from the bottom edge, a palm ellipse with
  three finger bumps, saucer, and the patterned cup; the blue band and dot
  row are clipped to the cup body.
- Smoke: five flat white discs on an 8s sub-loop (3 per 24s loop, integer
  ratio), rising 235 units from the cup mouth with a growing sine sway and
  radius, wrapping seamlessly.
- Determinism: the first frame is drawn synchronously at the constant
  phase PHASE0 = 0 (wallpaper offset 0, smoke puffs at fixed positions).
  The rAF loop is typeof-guarded and anchored as PHASE0 + elapsed since
  load; frame one never comes from Date.now().

## QA log

- Rendered with render-piece.js: qa-desktop.png (1280x900),
  qa-mobile.png (390x844), thumb.png (720x720).
- Thumb rendered twice and byte-compared with cmp: identical. Second
  render deleted.
- First pass fixes: (1) the wallpaper tiles spilled past the stage into
  the letterbox — the scene is now clipped to the square stage and the
  whole canvas is filled with the vermilion ground first, so the
  letterbox reads as page ground at every size; (2) the face's jaw return
  drew a long pointed spike at the neck — reworked into a rounded jaw
  that flows into the torso.
- Final read-back: desktop and thumb show the white profile with black
  bob over the black-leaf vermilion wallpaper, the tiny blue-patterned cup
  held at center with white smoke curls rising; mobile shows the full
  square composition centered on the vermilion ground, nothing clipped.
- No microphone, no audio, no external assets, no interaction.

## Deviations

- Pairing: the prompt offers two pairings (w06 cup/leaves, w08
  pagoda/dragons); the brief fixed w06, so only the cup and leaf
  wallpaper appear.
- Smoke colour: the strict palette names no smoke colour, so the curls
  use the palette's own white (the skin/cup white) as flat discs rather
  than introducing a grey.
- No grain layer: the prompt's technical note for this piece does not
  call for grain and Daura's mode here is clean flat fill, so none is
  drawn.
