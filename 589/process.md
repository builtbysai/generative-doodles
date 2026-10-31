# №589 — La Velocidad del Habla

EXPANSION #71 julia-barata, prompt block 5 "Memoria Dibujada" (verified verbatim from TASKS.md).

## Concept

Julia Barata's live-memory practice: she sits across from a stranger and draws their
memories as they are told, graphic recording "a la velocidad del habla y del marcador"
(at the speed of speech and of the marker). The piece stages that listening situation:
an empty chair faces the viewer on bare paper, and a stranger's memory accumulates
around it, one fragment per tap, drawn stroke-by-stroke at speech speed (about two
seconds each). The fragments land in abolished-panel flow: no boxes, no gutters, just
spatial drift around the chair. Down the left margin, a hand-lettered running list
names each fragment as it lands. The piece never completes and never erases: when
the ten fragments are in, it simply rests, accumulated. Landed fragments can be
dragged to nudge them, because memories are rearrangeable; the margin list stays.

Palette is her strict register: ink black #1A1A1A, paper #FAF7F0, and exactly one
flat red #D42B1E, spent on a single fragment.

## Construction

Single self-contained canvas piece on a 1000x1000 stage, following the batch house
pattern (Visual Viewport sizing with resize listeners on visualViewport and window,
canvas pinned in px inside draw(), phone detection via window.screen with aspect
fallback, mulberry32 seeded RNG 589071, one synchronous first frame at fixed
PHASE0 = 0, rAF typeof-guarded and anchored as PHASE0 + elapsed).

- The chair is drawn once as a fixed stroke set: front-on, ladder-back, seat
  trapezoid projecting toward the viewer, splayed front legs with a rung. It is
  present from frame one (the listening state) and never moves.
- Each fragment is a parametric micro-drawing built at load as an ordered stroke
  list (seeded jitter applied once, so lengths and the completed image are fixed).
  Stroke-order replay with a length budget animates the deposit; duration is the
  fragment's total stroke length / 950, clamped to 1.5–2.3 s.
- Placement slots are fixed points ringing the chair (upper field, both flanks,
  lower corners), checked against the chair's bounding area so nothing overlaps it.
- The margin list wraps each phrase with measureText into at most two hand-lettered
  lines in a 222-unit margin, one slot per fragment, in deposit order.

Fragment library (deposit order):
1. "la cocina de mi abuela" — stove with oven and burners, lidded pot with two
   steam curls, cross-framed window, hanging spoon.
2. "el río" — bank curve, three wavy water bands, reed clusters, a stone, one
   gull tick.
3. "un perro amarillo" — dog in profile: ellipse body, head with long snout,
   floppy ear, four legs, tail curving up. The session's ONE red fragment, drawn
   entirely in flat red #D42B1E.
4. "la casa de la esquina" — front and side walls sharing a corner post, pitched
   roof, chimney, door, two windows.
5. "un barco" — hull on a bezier keel, mast, two sails, flag, porthole, two
   water lines.
6. "el árbol del patio" — trunk and branches, three overlapping scribble-canopy
   circles, three falling leaves.
7. "la bicicleta roja" — two wheels, diamond frame, seat, handlebar, pedal
   circle. Ink only (see Deviations).
8. "mi padre con sombrero" — brim and crown first, then head, torso, arms, one
   hand on a cane, legs and shoe ticks.
9. "la escuela" — schoolhouse with pitched roof, flag on a pole, door, two
   windows, step.
10. "una carta" — envelope with flap diagonals, stamp with inner frame, postmark
    circle, two illegible scribble address lines (gesture strokes, never letters).

Interaction: tap deposits the next fragment (taps are ignored while the hand is
mid-fragment, and after the tenth). Drag on a landed fragment nudges it (clamped
to ±130 stage units); the margin list does not move. No erase, no restart, no
click-to-reload anywhere. A small lowercase "tap" hint sits bottom-right and
disappears once all ten fragments have landed.

## QA log

Renderer: node ~/workspace/tools/render-piece.js (node-canvas; no rAF, no
AudioContext, no document.createElement in the environment, none used).

- qa-desktop.png (1280x900): frame one is the listening state: the empty chair
  front-on in the lower-center field, empty left margin, paper speckle, "tap"
  hint bottom-right. Nothing clipped.
- qa-mobile.png (390x844): the square stage letterboxes centered in the portrait
  view; chair fully visible, hint present, nothing clipped.
- thumb.png (720x720): same frame one at gallery size.
- Determinism: thumb.png rendered twice and cmp byte-compared: identical. A
  third render after a comment-only edit (em dashes removed from code comments)
  also matched byte-for-byte.
- Mid-accumulation check: throwaway copy with PRESET = 5 rendered at 1280x900:
  cocina, río, red dog, casa and barco in place around the chair, first five
  phrases listed in the margin (two wrapping to two lines, no collisions).
  Deleted after inspection.
- Full-accumulation check: throwaway copy with PRESET = 10 rendered at 1280x900:
  all ten fragments read clearly (kitchen, river, tree, father with hat, school,
  corner house, red dog, bicycle, boat, envelope), none overlapping the chair,
  the carta resting clear of the chair's left leg; margin list complete with all
  ten phrases. Deleted after inspection.
- Fix during QA: the first chair build read as a stacked tower (seat trapezoid
  too shallow, hidden back-leg strokes gridding the legs). Seat front edge
  widened and dropped (490–750 at y 762), front legs splayed outward, back-leg
  hints removed, rung lowered. The dog's head was also reworked (lower head,
  longer snout, two-stroke floppy ear) after the first build read as a blob.
  All renders re-run after the fixes.
- Grep checks: zero Date.now, zero document.createElement, zero AudioContext,
  zero external URLs, zero em dashes anywhere in the file.

## Deviations

- Typed input: the prompt allows the viewer to type a phrase OR pick one. The
  gallery ships the pick-from-list version the prompt also allows: taps deposit
  the next fragment from the fixed library of ten, in order. No text field, which
  also keeps the piece fully self-contained and keyboard-free on phones.
- "un perro amarillo" carries the red. The prompt reserves flat red for exactly
  one fragment per session, "the one that hurts or glows". A yellow dog is
  impossible in her B/W + red world, so the dog is drawn entirely in red ink:
  the contradiction is the glow. It is the only red anywhere in the piece,
  including the margin list, which stays ink.
- "la bicicleta roja" stays ink. Its name says red, but the red budget is already
  spent on the dog, and the prompt's rule is exactly one red fragment. The spoken
  name and the drawn color disagreeing is in her register; recorded here rather
  than silently recolored.
- Fragment count is ten, not the prompt's library of 24: the brief for this
  piece fixes a library of ten named fragments, which is what ships.
- A QA-only PRESET constant (0 in the shipped file) exists so a throwaway copy
  can open mid- or fully-accumulated for render checks; it is not reachable from
  any in-piece control.
