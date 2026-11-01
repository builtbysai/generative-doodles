# №1481 "Reorder, and the Meaning Reverses" (ioana-wieder IW2, PP728)

## What it is

Three abstract scenes in a row, each a small charcoal-framed panel, on a wood
table ground: a room of seated figures (cream interior), a broadcast screen of
suited figures (teal interior), a monitor wall (brick interior). Below them, a
final card panel, centered. In the starting order the final card shows a calm
grey disc; reordered into exactly one order, it shows a scarlet disc.

## Palette (exactly the prompt's colors, no others)

Frames charcoal #2a2a30; scenes cream #e8e0d0, teal #2e6f6a, brick #a8674a;
calm disc grey #b8bcc0; reversed disc scarlet #c1272d; table wood #8a6a48.
Figure heads use the calm grey, bodies use teal, brick, and charcoal, so no
color outside the prompt palette appears anywhere.

## Motion

Watch-first with drag-to-reorder. The scenes play in loop in their current
order:

- Room (12 s loop): three seated figures; the speaker cycles every 4 s, head
  tilting on a sine and mouth line shifting, listeners tilting a few degrees
  toward the speaker.
- Broadcast (4 s loop): four suited figures; mouth lines open and close on
  2 s beats.
- Monitor wall (6 s loop): three monitors; screens cycle cream/grey/teal and
  abstract blocks flicker every 2 s.

All scene periods divide 12 s, so the whole piece closes exactly at t = 12
(verified: t = 12 and t = 24 vs t = 0 are 0 px).

Dragging a scene panel left or right swaps it with its neighbor the moment
the dragged center crosses the neighbor's slot center; the scene frames follow
the strips. The final card's disc is a function of the order array: exactly
[ broadcast, room, monitor ] yields scarlet, all other orders grey. The disc
changes through a short 0.8 s color morph from the displayed color at swap
time toward the new target, so it never jumps. Drag never edits a scene's
contents, never deletes a scene, never restarts any scene. Never
click-to-reload. No text labels on scenes, no "correct order" hint, no text
anywhere except `<title>`.

## Adaptations

- Scenes as an order array of looping sprites; final disc state as a function
  of the order array; drag maps pointer x to order permutation; disc
  transition as a short color morph. All as specced.
- The disc morph interpolates from the color actually displayed at swap time
  (captured before the order mutation), so a second swap mid-morph continues
  smoothly instead of jumping back to a settled endpoint.
- Figure heads use the calm grey rather than a skin tone, because the prompt
  palette carries no skin color; bodies use the palette's teal, brick, and
  charcoal.
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing. Dots are
  own-beginPath arcs with a moveTo first (node-canvas quirks). All randomness
  from a seeded mulberry32 PRNG (seed 1481000), never Math.random.
- Frame one = draw(0) via a boot flag; the clock starts only with the rAF
  loop, which is a plain function declaration behind a typeof guard.

## Verification (forced-time probe harness, vm-isolated instance, real
node-canvas, piece driven via window.__piece; harness at tmp/probe1481.js)

- Rendered at 1280x900, 390x844, and 720x720 and inspected all three.
  Desktop frame one: three framed panels in a row (room, broadcast, monitor
  wall) and the final card centered below with a grey disc. Mobile keeps the
  same full-bleed row composition with no clipping. No visible text.
- Thumb byte-identical across repeated renders, including a final re-verify.
- t = 0 redraw 0 px; fresh instance vs first at t = 0 = 0 px; t = 12 and
  t = 24 vs t = 0 = 0 px (loop closes exactly); t = 0 vs t = 3 differs by
  41,618 px (scenes alive).
- Frame-one card: 7,264 grey px, 0 scarlet px.
- Right drag on the room panel past the neighbor center: order becomes
  [1,0,2], scarlet true; at t = 5.6 (0.4 s into the morph) the disc is an
  intermediate blend (7,462 mid-tone px, 0 grey, 0 scarlet); settled at
  t = 6.5 with 7,232 scarlet px, 0 grey px.
- Room scene content unchanged by reorder: at integer-aligned geometry
  (1000x900) the swapped room crop matches a fresh instance's room crop at
  the same t exactly (0 px). At 1280 wide the same comparison differed by
  1,951 px, which is subpixel rasterization from fractional slot offsets
  (slot x 51.2 vs 460.8), not a content change; the integer-aligned run
  confirms the scene itself is untouched.
- Left drag restores order [0,1,2] and the disc morphs back to grey (7,264
  grey px, 0 scarlet px).
- Swapping the other pair gives order [0,2,1], which stays grey (7,264 grey
  px, 0 scarlet px), confirming only the one specific order yields scarlet.
- Token scan clean (the single Math.random hit is the code comment "never
  Math.random", not a call).

## Fix rounds

None needed. One bookkeeping fix during the build (before QA renders): the
disc-morph state was first captured from a stale variable; it now captures
the displayed disc color at swap time, before the order mutation.
