# No.514 The Type Is the Face

EXPANSION #62 giulia-pastorino, prompt GP2. Source: her "Se fossi Ugo"
cover (Corraini, Premio Andersen 2025), where the hand-lettered title in
concentric blue line-work IS the face.

## Concept

A big cream scalloped cloud sits centred on a yellow ground scattered
with a jittered black polka-dot field, a thick red ring framing the
cloud and a thin pink strip anchoring the bottom of the stage. Inside
the cloud, seven hand-drawn letters in concentric blue line-work (each
letter traced two to four times with slight offsets, the way her UGO
letters are drawn) are placed where facial features would sit. Below
the letters, her whole face grammar and nothing more: two plain black
dot eyes and one wavy nose-mouth line. The shipped letter set is
G E F / K L D / V C, an invented combination that spells no word in any
reading direction. Palette is exactly the six specced colours: yellow
#F2B705, ink #141414, cream #F7F2E4, blue #2B4FB0, red #E63E1B, pink
#F0608E. Flat fills only, no gradients.

Drag-to-disturb: the letters breathe gently (scale 0.98 to 1.02, each
on its own phase and period). Dragging a letter pushes it away from
home; on release a spring eases it back. A clamp keeps every letter
inside the cloud at all times, mid-drag and mid-spring. Double-tap (or
double-click) reseeds: a new letter set (still six to nine), new trace
counts and offsets, new dot pitch. Never a page reload. A single
lowercase "drag" hint sits in the top-left corner.

## Construction

Single self-contained index.html, canvas 2D, no external assets.

- Seeded layout via mulberry32. The seed comes from ?seed= in the URL
  when present, otherwise a fixed default (514003), so every viewer
  meets the same face first. Layout precomputes: dot pitch and the
  jittered dot grid, the letter set and per-letter trace passes,
  offsets, baked-in point wobble, sizes, rotations and breathing
  phases, plus two crayon speck arrays.
- Letters are hand-authored stroke glyphs (twenty-letter alphabet of
  polylines in a 100x100 box, arcs pre-flattened) drawn per trace pass
  with round caps and joins in the blue. They occupy fixed
  face-feature slots in the upper two-thirds of the cloud; the eyes
  and wavy mouth are drawn after them, below them.
- The cloud is a polar-radius scallop path (three sine harmonics,
  radius about 297 on the 1080 stage, so the cloud spans the central
  55 percent). The same radius function tests dot positions, so dots
  cover the ground only and never slip under the cloud or its ring;
  a small exclusion keeps the hint corner dot-free too.
- Springs: per-letter offset and velocity, stiffness 110, damping 13
  (slightly underdamped, so a released letter wobbles home), integrated
  in substeps of at most 1/240s from the rAF loop only.
- Canvas size comes from the Visual Viewport API with resize listeners
  on visualViewport and window; draw() pins canvas.style.width/height
  in px every frame. Phone detection uses window.screen physical size
  (min dimension under 700px) with aspect h > w*1.15 as fallback. The
  square stage letterboxes on any screen and the page ground is the
  piece's yellow.

Deviations, with reasons:

- Crayon texture: the prompt's oil-pastel/crayon feel would normally
  be a pre-rendered texture canvas. House renderer limits (no
  document.createElement, no offscreen canvas) rule that out, so the
  grain is two precomputed seeded speck arrays (ink at low alpha on
  the ground, ink and blue at low alpha clipped inside the cloud)
  drawn directly every frame. Same flat print texture, same palette.
- The shipped seed was chosen by inspection: the first candidate seed
  rolled a row reading ATF and another a row reading STO (a real
  Italian word), so the default seed is 514003, whose rows and columns
  spell nothing.

## QA log

Rendered with node ~/workspace/tools/render-piece.js (no rAF, no
AudioContext, no createElement in the harness, as required).

- qa-desktop.png (1280x900): yellow dotted field with clean clearance
  around the ring; cream scalloped cloud with the thick red ring;
  seven blue traced letters (G E F / K L D / V C) sitting as a face,
  clear of the cloud edge; dot eyes and wavy mouth below them; pink
  strip along the stage bottom; hint readable at top-left.
- thumb.png (720x720): same read at gallery size.
- qa-mobile.png (390x844): square stage centred on the yellow ground,
  composition keeps its shape, nothing clipped.
- Fixes during QA: letter size range cut (84-102 down to 68-82) and
  feature rows respaced after the first pass overlapped neighbouring
  glyphs; a dot-free exclusion added around the hint; default seed
  changed for the letter-set reason above. All sizes re-rendered and
  the determinism gate re-passed on the final build.
- Determinism: first frame is the synchronous draw at constant phase
  PHASE0 = 1.7s (letters home, springs at rest, breathing at a fixed
  phase). No Date.now anywhere; the rAF loop is typeof-guarded and
  anchored as PHASE0 + elapsed. thumb.png rendered twice and cmp
  byte-compared: identical.
