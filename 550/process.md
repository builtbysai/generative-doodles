# No.550 "Six Views" — EXPANSION #66 cristina-daura, prompt CD6

## Concept

One street told from several points of view, after Daura's panel-constellation
mechanism: six small pink panels ring one tall central panel, and the blue civic
tower on its yellow sky is the anchor every view is measured against. The pink
panels never show the tower. Two narrow blue flank panels with big yellow
flowers close the composition at the edges. Nothing moves except the story:
every six seconds exactly one pink panel wipes to a new vignette.

Palette, strict: panel pink #F2A0C0, figure yellow #FFD400, foliage blue
#2A5BD7, tower blue #1B3FCE, sky/flower yellow #FFD400, black #111111 for
gutters and outlines. Flat fills only, no gradients. No text anywhere except
the arguing panel's punctuation, no hint, watch-only.

## Construction

- 1080x1080 design space, square stage centred, page ground = panel pink.
  Sizing from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas CSS size pinned in px inside draw();
  phone detection via window.screen (min dimension < 700px), aspect
  h > w*1.15 as fallback only. On phones the stage spans the full width.
- Layout: margin 30, gutters 16 of black over a black gutter base. Column
  fractions 0.10 / 0.28 / 0.24 / 0.28 / 0.10: flower flank, pink column,
  tower, pink column, flower flank. Pink panels are 268x329 in local units;
  each scene is a function drawn in that local space under its own clip.
- Vignette grammar, six scene functions sharing street dressing (blue
  foliage blobs, a bench, a ground line): seated reader, dog, smoker on a
  bench, kid with a balloon, couple arguing, pigeon close-up.
- Swap scheduler: precomputed at load from mulberry32 seed 550066, the same
  stream that deals the initial set. Panels swap in a shuffled round robin
  (each panel changes once per six ticks); the incoming scene is the one
  absent longest, ties broken by the seed. 120 events are precomputed and
  assignmentAt(t) replays them, so any frame is a pure function of t and
  the whole piece is deterministic. A swap is a 0.4s flat wipe: the new
  scene is clipped to a growing left-hand slice over the old, with a black
  edge line; the tower and flower panels are never touched by the scheduler.
- Initial six vignettes (seed 550066, each scene dealt exactly once):
  left column top to bottom: couple arguing, seated reader, smoker on a
  bench. Right column top to bottom: pigeon close-up, kid with a balloon,
  dog.
- First frame is the synchronous draw at constant PHASE0 = 2.0s (initial
  set complete, no wipe in flight). The rAF loop is typeof-guarded and
  anchored as PHASE0 + elapsed; frame one never derives from Date.now().

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png). Thumb rendered twice and
  byte-compared with cmp: identical. Second render deleted.
- Desktop/thumb read-back: tall blue tower with dome, spire, yellow clock
  face and yellow windows on a yellow panel at centre; six pink vignettes
  in two columns of three; two narrow blue flank panels with two yellow
  flowers each; black gutters throughout; nothing clipped.
- Mobile read-back: the square stage spans the full 390px width, centred
  on the pink ground; all nine panels whole and legible, nothing clipped.
- Wipe check: a throwaway copy with PHASE0 = 6.2 rendered one panel
  (left-middle) mid-wipe, incoming smoker scene revealed from the left
  behind a black edge line, all other panels unchanged. Test files deleted.
- First QA pass fix: in the arguing panel the third speech bubble covered
  the left figure's head. Figures were lowered (heads at local y 172) and
  the three bubbles shrunk and raised into a zigzag that clears both heads;
  re-rendered at all three sizes and the determinism check re-run.

## Deviations

- Ink black #111111 carries the gutters and outlines, as in the sibling
  pieces of this study; the prompt names black for both without a hex.
- The arguing couple's speech is canvas-drawn punctuation ("...", "?!",
  "...") inside yellow bubbles. It is the only text in the piece, and it is
  the prompt's own device for that panel.
- The smoker's smoke curl is stroked in tower blue #1B3FCE: the strict
  palette has no white or grey, and a blue curl keeps the panel inside the
  palette while still reading as smoke against the pink.
- The prompt's two flank flower panels are drawn with two flowers each at
  different scales rather than one, so the tall narrow panels do not sit
  empty for their lower two-thirds.
