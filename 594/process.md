# №594 — 1+1=2

EXPANSION #72 clara-lagos, prompt block 2 "De a Una".

## Concept

Her kid-logic engine, taken verbatim from her own strip. An adult states a
sensible rule; the child answers with airtight literal logic; the last panel is
gentle slapstick, and the mother is always the butt of the joke, never the
child. Four hand-ruled panels on notebook paper:

1. The mother, carrying a tray with a glass and a cloth, states the rule:
   "Noah, llevá las cosas de a una."
2. Noah, a small glass in each raised hand, shirt the strip's only blue:
   "Sí, lo que pasa es que tengo dos manos."
3. Noah walks very carefully, glasses held wide and level, doing the maths
   out loud: "1+1=2." The mother watches, arms crossed.
4. The mother flat on her back, X eyes, dizzy stars, and the sound effect
   lettered big across the panel: "¡Pua!"

The strip reads at the viewer's pace. Panel 1 arrives inked; panels 2 to 4
wait as faint pencil ghosts. Each tap inks the next panel in, stroke by
stroke. Once the strip is fully read, a tap lands the "¡Pua!" again with a
small shake of panel 4. Holding panel 2 makes Noah lift his two glasses
higher, insisting. Between taps the characters breathe, waiting. Nothing
autoplays, nothing advances on its own, and there are never more than four
panels.

Palette is strict: ink #1A1A1A, paper #FAF7F0, soft blue #3E6FA8 on Noah's
shirt only (panels 2 and 3). In ghost state the shirt is pencil-faint ink
like everything else; the blue exists only once a panel is inked.

## Construction

- Single self-contained canvas piece, built on the batch's shared
  boilerplate: Visual Viewport sizing with resize listeners on
  visualViewport and window, canvas CSS size pinned in px inside draw()
  every frame, phone detection via window.screen (min dimension < 700px)
  with the aspect fallback, a 1000x1000 stage letterboxed into the view.
- All linework is precomputed stroke data: polylines jittered once at build
  time from a fixed mulberry32 seed (594072), so the notebook wobble is
  identical on every load and never flickers. Panel inking reuses the
  stroke-length budget renderer: a panel's progress value reveals its
  strokes in order over 0.9 seconds. Fills, faces, and bubble text fade in
  behind the last strokes (progress past 0.55).
- Panel 2's arms and glasses are the one dynamic drawing: the arm curves
  and glass outlines are computed per frame from the current lift value,
  with a fixed precomputed wobble array, so they rise smoothly while the
  panel is held without ever calling the RNG during draw.
- Frame one is one synchronous draw at PHASE0 = 0: panel 1 fully inked,
  panels 2 to 4 ghosts, breathing offset at its fixed phase. The rAF loop
  is typeof-guarded and anchored as PHASE0 + elapsed; no Date.now()
  anywhere. Breathing is a 3.4s sine bob, phase-offset per panel.
- The "¡Pua!" shake is a decaying sine offset applied to panel 4's contents
  plus a pulse on the lettering scale, triggered when panel 4 finishes
  inking and again on any later tap.
- Paper grain is precomputed seeded speckle data drawn directly; the faint
  ruled lines are seeded data too. No offscreen canvas, no filters, no
  external assets, no audio, no microphone.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), and 720x720 (thumb.png).
- thumb.png rendered twice and byte-compared with cmp: identical. The
  second render was deleted.
- Read-back, desktop and thumb: panel 1 inked, mother at her tray, bubble
  "Noah, llevá las cosas de a una." with its tail reaching her head; panel 2
  ghost shows Noah with both glasses raised and his bubble; panel 3 ghost
  shows the careful walk, both glasses, and the watching mother; panel 4
  ghost shows the fallen mother, X eyes, dizzy stars, and the big "¡Pua!".
  Ghost shirts read as faint ink only, no blue anywhere in frame one.
- Read-back, mobile: all four panels fit the 390px width in one row,
  wobble borders intact, nothing clipped, "tap" hint legible.
- Fix during QA: panel 2's bubble outline was skipped in ghost mode (its
  text floated without a bubble). The bubble strokes are now drawn in
  every mode, with the panel alpha doing the fading. Re-rendered and
  re-verified after the fix, determinism re-checked.

## Deviations

- None from the prompt block. Construction choices inside the brief:
  panel 1 starts inked rather than ghosted, so frame one reads as a strip
  already begun (the brief fixes the frame as "panel 1 fully inked,
  panels 2-4 ghosts"); the drag on panel 2 is implemented as press-and-
  hold anywhere on the panel, which raises both glasses together, since
  the two glasses are the gesture.
