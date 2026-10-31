# No.612 — The Reader Completes It

EXPANSION #74 adolfo-serra, prompt block 4 "Caperucita (Wordless Sequence)".
His wordless Little Red Riding Hood as a fixed five-scene sequence. No text,
captions, page numbers, or hint text anywhere in the piece; the viewer
completes the story.

## Concept

Five full-bleed ink-and-wash scenes on paper, in a fixed order, turned one at
a time by double-tap, like pages. The red of the hood is saved for a single
event in scene 4; everywhere else the palette is paper, forest ink, and wash
gray only. Between turns the scenes stay alive with a slow sway, and a single
tap makes the current scene breathe once.

Palette (strict): paper #EFE7D8, forest ink #2A3328, wash gray #8A8D84,
hood red #A4121C (scene 4 only).

## Construction

Single self-contained `index.html`, canvas 2D, no external assets.

- **Scenes** (fixed order, all procedural, all layout from mulberry32 seeded
  RNG with per-scene fixed seeds, so every frame is reproducible):
  1. **The Forest Path** — a winding paper path with wash stepping stones
     running from the foreground to a vanishing point between three rows of
     ink canopy trees receding in scale. At the end of the path stands a tiny
     hooded figure: ink cloak, hood drawn in plain paper with an ink outline.
     The red is deliberately not spent here.
  2. **The Grandmother's House** — a small paper house with ink roof and door
     among framing trees; the one window is filled with wash gray (the lit
     window). A curl of wash-gray smoke rises from the chimney, its drift
     driven by the same sway phase as the trees.
  3. **The Wolf's Shadow** — the wolf itself never appears. A huge wolf
     silhouette (pointed ears, long snout, legs, raised tail) is drawn across
     the diagonal path and the tree trunks at full-strength ink in two passes,
     while the forest is drawn translucent, so the shadow reads darker than
     the woods it falls on.
  4. **The Red Hood** — the single red event. A close view of the hood hanging
     from a thick ink branch: a red draped hood shape with an ink-dark
     opening, textured as fabric by a fine crosshatch clipped inside the
     cloth (ink lines at low alpha one way, paper lines the other), plus fold
     shading in deeper passes of the same red family. Nothing else in the
     scene is saturated.
  5. **The Dawn Clearing** — pale wash sky band, a plain paper dawn disc,
     five small birds drifting and flapping slowly, sparse trees at the
     edges, wash grass strokes, and the path leaving the forest. Calm.
- **Page turn**: double-tap (two pointerdowns within 350 ms) advances to the
  next scene (scene 5 wraps to scene 1; the order never changes). The turn is
  a stepped left-to-right mask wipe in 8 discrete time steps with a hard edge
  and an ink curl-shadow band riding the boundary. No crossfades anywhere.
- **Breath**: a single tap is held pending for 350 ms; if no second tap
  arrives it becomes a breath — a single sine swell (about 1.6 s) that
  amplifies the sway of trees, smoke, and branches, then subsides.
- **Watch-only motion**: trees lean about a degree on a slow sine, smoke
  curls, birds drift. Drag does nothing. Nothing reloads on click.
- **Sizing**: canvas sized from the Visual Viewport API with resize listeners
  on both `visualViewport` and `window`; canvas CSS size pinned in px inside
  `draw()` every frame. Phone detection via `window.screen` (min dimension
  under 700 px) with an aspect fallback (h > w * 1.15); on phones the tiny
  figure and the wolf are scaled up slightly. Scenes are full-bleed at every
  size; the page ground is the paper tone.
- **Determinism**: frame one is drawn synchronously at load — scene 1 at sway
  phase 0. The animation loop is `typeof requestAnimationFrame`-guarded and
  anchored to elapsed time since the first frame callback; frame one is never
  derived from `Date.now()`. No audio, no microphone, no offscreen canvas, no
  `ctx.filter`.

## QA log

Rendered with `node ~/workspace/tools/render-piece.js`:

- `qa-desktop.png` (1280x900), `qa-mobile.png` (390x844), `thumb.png`
  (720x720) — scene 1: winding path with stepping stones to the vanishing
  point, the tiny figure at its end with paper hood and ink cloak, dark
  canopy trees framing both sides, no red anywhere. Mobile is canopy-heavy
  (tall frame) but the path and figure remain legible; nothing clips badly.
- **Determinism gate**: `thumb.png` rendered twice and `cmp`-compared —
  byte-identical. Second render deleted.
- **Scenes 2–5 and the wipe** were verified with state-forced throwaway
  copies of `index.html` in /tmp (scene index / wipe state overridden by
  sed, rendered at 720x720, inspected, then deleted):
  - Scene 2: house with ink roof and door, wash-gray lit window with cross
    frame, path to the door, smoke circles rising from the chimney behind
    the right-hand trees.
  - Scene 3: the wolf shadow reads unmistakably (pointed ears, long snout)
    and sits visibly darker than the translucent forest, crossing trunks and
    the diagonal path.
  - Scene 4: the red hood close-up — red cloth with visible crosshatch weave,
    ink opening, hanging from the branch. Confirmed as the only red in the
    piece: scenes 1, 2, 3, and 5 contain no red.
  - Scene 5: dawn clearing with pale sky, paper dawn disc, five birds, path
    leaving between edge trees.
  - Wipe (forced at step 4 of 8): scene 2 revealed on the left half, scene 1
    on the right, hard stepped boundary with the curl-shadow band on it. No
    fade.

## Deviations

- The wolf's shadow achieves "darker than the forest" by opacity (forest at
  reduced alpha, shadow at full ink, drawn twice) rather than a fifth,
  darker color, to keep the palette at the four specified tones.
- The fabric weave uses low-alpha ink and paper lines over the red rather
  than extra red shades, for the same palette reason.
- Scene 2's chimney smoke partly overlaps the right-hand tree canopy in the
  first frame; it reads as smoke rising through the trees and was left as is.
