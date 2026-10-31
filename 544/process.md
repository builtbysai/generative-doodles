# No.544 Breaking Point

EXPANSION #65 nadia-hafid, prompt NH8. "Cuando esta a punto de explotar
vemos como la ira se va dibujando en sus rostros": when a character is about
to explode, the anger draws itself onto their face.

## Concept

A 4x3 grid of twelve large symbol-faces, full-bleed with thin black gutters,
on alternating dusty blue and terracotta grounds. Every face is the same
parametric mask (dot eyes, one line mouth, a flat hair cap) with seeded
variations: three skin tones, eight hair-cap shapes, black or white hair,
slightly different eye spacing and head proportions. All twelve share one
calm breath sine, so the grid feels alive but calm, and eleven faces stay
blank at all times.

Tap a face and its anger draws itself in, over a six-second beat: eyebrows
slash in, the mouth tightens to a hard line, a forehead vein ticks twice,
the whole face tints one step darker, then it exhales and returns to blank.
Only one face may be angry at a time; tapping another face transfers the
break. The anger is minimal and brief by design: three strokes and a tint,
then gone. No cartoon rage, no steam, no red faces, no shouting mouths, no
sound. A subtle lowercase "tap" sits in the bottom-right corner.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets.
- Strict palette, nothing else: grounds dusty blue #A8C8CC and terracotta
  #D89A80 alternating checkerboard; skins #EFD9C4 / #E8B48F / #C98A6B;
  hair and anger marks black #161616 or white. Flat fills only; no
  gradients anywhere. Following Hafid's own "no glazes or textures" rule,
  there is deliberately no grain layer.
- Design space 1080x1080. Cells 270x360; heads are ellipses (rx 76-86,
  ry 98-110) centred in their cells. Face parameters come from mulberry32
  with fixed seed 544065, generated once at load.
- Breath: every face scales by 1 + 0.010 * sin(2*pi*t/7) around its own
  centre, one shared phase for the whole grid.
- Beat timeline (beat-local seconds, staged overlay on the tapped face):
  - 0.0-0.7: eyebrows draw in as two slashes, inner ends dropping toward
    the centre (line length driven by the ramp).
  - 0.7-1.5: mouth tightens: length 34 -> 20, line width 5 -> 8.5.
  - 1.7 and 2.6: forehead vein ticks twice; a small bent vessel at the
    temple scales with a two-bump sine envelope, visible 1.5-3.6.
  - 2.3-3.3: tint fades in one step darker (next palette skin tone at
    alpha 0.9), holds, then releases 4.6-6.0.
  - 4.6-5.6: shared exhale ramp returns brows and mouth to blank.
  - At 6.0 the beat ends and the face is blank again.
  Tapping the angry face restarts its beat; tapping any other face ends
  the current beat at once and starts the new one. Tap handling is on
  pointerdown/touchstart with a 400ms dedupe so one physical tap cannot
  register twice.
- Sizing from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas.style width/height pinned in px inside
  draw(). Phone detection via window.screen physical size (min dimension
  under 700px), aspect ratio only as fallback; on phones the square stage
  takes the full width, page ground dusty blue.
- Determinism: the first frame is drawn synchronously at the constant
  phase PHASE0 = 1.3 (breath mid-swing), with all faces blank and no beat
  active. The animation loop is typeof-guarded and anchored as
  PHASE0 + elapsed since the first rAF timestamp, never derived from
  Date.now().

## QA log

- Rendered with render-piece.js (node-canvas) at 1280x900, 390x844 and
  720x720.
- thumb.png rendered twice and byte-compared with cmp: identical after
  each fix pass; the second render was deleted each time.
- First pass read-back: two hair variants hid the eyes. The side sweep's
  lower edge dipped to eye level on one side, and the bob's side panels
  hung to below the eye line; since the eye dots are ink on ink hair,
  they vanished. Sweep endpoints raised (lowest point now cy - 0.30*ry)
  and the bob's panels shortened to end at cy - 0.12*ry with a scooped
  lower edge; re-rendered.
- Final desktop and thumb: 4x3 grid, alternating blue/terracotta grounds,
  twelve large calm symbol-faces, all blank, dot eyes and line mouths
  visible on every face, hair caps varied (fringe, curls, twin puffs,
  bob, bun, sweep, in black and white), thin black gutters,
  "tap" hint bottom-right, nothing clipped.
- Final mobile: grid spans the full 390px width, stage centred on the
  dusty blue ground, all twelve faces whole and legible, nothing clipped.

## Deviations

- The prompt lists a "bald band" style only implicitly ("flat hair caps in
  varied shapes"); the eight seeded variants are flat cap, side sweep,
  bun, bob, curls, zigzag fringe, a thin bald band arc, and twin puffs.
  With seed 544065 the dealt hand is fringe x4, curls x2, twin puffs x2,
  bob x2, bun x1, sweep x1; the flat cap and bald band exist in the rig
  but were not dealt this seed. Recorded rather than reseeding, since the
  grid still reads as twelve distinct faces.
- The darkest skin tone (#C98A6B) has no darker palette tone to step to,
  so its tint step is the palette's own black #161616 at alpha 0.18
  instead of a skin tone at alpha 0.9. Still one flat step darker, still
  inside the strict palette.
- Transfer behaviour: the prompt says tapping another face "transfers the
  break"; the interrupted face returns to blank immediately rather than
  playing out its exhale, so exactly one face is ever mid-beat.
