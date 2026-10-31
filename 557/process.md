# No.557 Es Aquí

EXPANSION #67 roberta-vazquez, prompt RV5 (Satanás' Reserved Seat).
Her joke, staged as a showman's reveal: Satanás keeps a very special
seat reserved for people who call you "qué loca estás" for no reason,
and he cannot wait to show you where it is.

## Concept

A saturated, jolly hell in flat marker fills. Across the top, a pale
yellow caption box carries the full hand-lettered Spanish caption:
"¿Sabías que… Satanás tiene un lugar reservado para la gente que te
dice 'qué loca estás' sin ningún motivo?" Below it, on the yellow
ground, a grinning red devil with bat wings, curved bone horns and a
goatee gestures grandly like a game-show host. His reserved seat is a
black spiked chair at right, oozing blood red down its cushion and
pooling on the floor. A green cobra rears between them, a cracked
bone-white skull sits at the devil's feet, flat flames frame the left,
right and bottom edges, and purple smoke curls above. The devil stays
jolly, never scary. No English anywhere; the only other copy is a
subtle lowercase "tap" in the bottom-right corner.

Watch and tap. Flames flicker on a seamless 3-frame swap cycle. Tap
the spiked chair and the devil turns, points at it, and a bubble pops
"¡ES AQUÍ!" with a small flame burst. Tap the cobra and it hisses,
tongue flicking in a 3-frame loop. Tap the skull and its jaw clacks
once. Never click-to-reload.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets.
- Strict palette, nothing else: devil red #D93A2B, flame orange
  #F07B2E, smoke purple #6A4A6A, ground yellow #F2E35A, snake green
  #4EA85A, ink black #1A1A1A, blood red #C02A2A, caption pale yellow
  #F7E9A0, bone white #F2EDE0. Flat fills only; no gradients anywhere.
- Design space 810x1080 (portrait). Caption box occupies the top
  ~18%; the scene plays below on the ground yellow, which is also the
  page ground, so the letterbox is invisible.
- Hand lettering: the caption and the bubble are laid out letter by
  letter at load (word wrap by measureText, then per-letter rotation
  and baseline jitter from a fixed seed), so the wobble is identical
  every frame and every load. Caption font size is chosen from a fixed
  ladder (33 down to 25px) as the largest that wraps to three lines
  inside the box; it lands at 29px in the QA renderer. Boxes are
  jittered-rectangle paths from fixed seeds.
- Devil rig: black bat wings with scalloped lower edges spread behind
  a plump red torso (blood-red belly), raised waving arm swaying on
  the shared clock, presenting arm that blends to a pointing pose,
  head group that tilts toward the chair while pointing. Bone horns,
  bone grin with tooth divisions, ink goatee, hooves, spade tail
  curling up behind him, pupils fixed on the chair.
- Chair: black slab back with a blood-red cushion panel, five spikes
  on top and three out of each side drawn as one silhouette, blood
  drips of seeded lengths off the seat front and cushion, and a blood
  pool at the base.
- Cobra: two coils, a rising S body drawn as two-pass ink-outlined
  strokes with a bone belly stripe, a wide speckled hood, and the head
  riding clear above the hood's top edge. Tongue exists only during
  the hiss, its length cycling [10, 24, 15] on a 0.12 s frame clock.
- Skull: single-path cranium with a crack, ink sockets and nose, and
  a separate jaw group whose offset is one sine half-wave over 0.45 s
  per tap: one clack.
- Flames: seeded set along the bottom (pointing up) and both sides
  (rotated to point inward), each a two-layer flat teardrop (orange
  shell, devil-red core). The flicker frame is floor(t / 0.4 + phase)
  mod 3, swapping height and lean from fixed tables, so the whole
  frame of flames is a pure function of t on the 12 s loop clock.
- Smoke: two seeded puff columns (eight puffs above the chair, five
  above the devil) rising on a 6 s cycle with sine wobble and a slow
  sideways drift, alpha fading as they climb; drawn at reduced
  globalAlpha over the ground, which is how the purple reads as smoke
  without leaving the palette.
- Interaction state is three timestamps on the animation clock
  (point / hiss / clack). All three start at -1e9, so frame one has no
  bubble, no tongue and a shut jaw. Taps are hit-tested in design
  space against fixed zones (chair, snake, skull), with a 350 ms
  guard so pointerdown and touchstart cannot double-fire one tap.
- Sizing from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas.style width/height pinned in px
  inside draw(). Phone detection via window.screen physical size
  (min dimension under 700px), aspect ratio only as fallback; on
  phones the portrait stage spans the full width, page ground yellow.
- Determinism: the first frame is drawn synchronously at the constant
  phase PHASE0 = 3.0 (devil mid-bob with his presenting palm open,
  flames mid-flicker, smoke mid-rise). The animation loop is
  typeof-guarded and anchored as PHASE0 + elapsed since the first
  rAF timestamp, never derived from Date.now(). All randomness is
  mulberry32 with fixed seeds, consumed once at load.

## QA log

- Rendered with render-piece.js (node-canvas) at 1280x900, 390x844
  and 720x720.
- thumb.png rendered twice and byte-compared with cmp: identical
  after each pass; the second render was deleted each time.
- First pass read-back: caption complete and legible on three lines,
  devil, chair, skull, flames and smoke all reading, but two faults:
  the cobra read as a green lollipop (hood too round, head buried in
  it, and two stroked hood arcs read as a smile), and the devil's tail
  spade landed on the skull like a red arrow. Fixed by rebuilding the
  cobra (wider speckled hood, head riding clear above it, arcs
  removed), rerouting the tail to curl up behind the devil, shifting
  the skull left, shortening the presenting arm's rest position so the
  paw clears the hood, and thickening the horns; re-rendered.
- Final desktop and thumb: pale caption box with the full Spanish
  caption in wobbly letters; jolly devil waving with one arm and
  presenting with the other, wings spread, grin and goatee on; spiked
  black chair with blood cushion, drips and pool; hooded cobra on its
  coils; cracked skull at the devil's feet; flat two-tone flames
  framing both sides and the bottom; purple smoke curling up in two
  columns; "tap" hint bottom-right; nothing clipped.
- Final mobile: portrait stage spans the full 390px width, centred on
  the yellow ground; caption, cast, flames and hint all whole and
  legible, nothing clipped.
- Grep audit: zero Date.now, zero gradient calls, zero URLs, no audio
  or microphone, no em dashes in visible copy (caption, "¡ES AQUÍ!",
  "tap").

## Deviations

- The ellipsis in the caption is the prompt's own "…" character,
  kept verbatim; at caption size the renderer's font draws it close
  to three dots, which matches hand-lettered usage.
- Smoke is drawn with globalAlpha over the ground rather than as a
  solid shape: solid purple blobs read as balloons next to the flat
  cast, and alpha over the ground keeps the smoke inside the strict
  palette while reading as smoke. The scorch shadows under the cast
  use the same treatment.
- The bubble's tail and the devil's pointing finger both aim at the
  chair from the left rather than the bubble sitting over the chair:
  the bubble must not cover the seat it announces, and the prompt's
  gag is the devil's gesture, so the bubble stays by his head.
- The skull's jaw uses ctx.roundRect when available with a plain
  rect fallback, since the QA renderer and older browsers differ;
  the fallback path was exercised in review of the code, and the
  rendered jaw is identical in the QA environment either way.
