# No.1567 "Code Is the Frame" (TW8, PP814)

Completes EXPANSION #206 shunsuke-takawo. Gallery date 2006 · 04 · 27.
Interaction cue: "Tap for a new day."

## Spec (verbatim from TASKS.md)

The piece shows its own making: a patterned torus (flat color segments,
teal/coral/gold on black, his 2023-09-14 code-in-frame post) rendered beside
a minimal code pane that types the actual drawing code live, line by line,
as the piece runs. Palette: black #0D0D12 ground; torus segments teal
#35B6AC, coral #E0654F, gold #E4B93C, cream #F2E8D5; code pane dim
green-grey monospace #9AB0A5. Composition: split frame, left 60% the 3D
form, right 40% the typing code pane, thin divider line. Motion/interaction:
watch-only. The torus rotates slowly; the code pane types the real sketch
source (the actual code running the piece) at reading speed, then holds,
then clears and retypes on a new seed; the loop is the day's practice. Tap:
advance to the next "day" (new seed, code retypes), tap-to-reseed where
refresh belongs. Technical: torus with per-segment flat colors; code pane =
the piece's own seed/config source rendered as typed text with a caret; keep
the typed code truthful to what's running (no fake code). Avoid: fake or
placeholder code; photorealistic 3D (flat segments only); hiding the pane.

## 2D adaptation

No WebGL in this environment (node-canvas QA). The torus is a parametric
tube (RING 0.68, TUBE 0.32, SEG_U 16, SEG_V 8) projected in canvas 2D:
rotate around Y by rotY(t), tilt around X by TILT 0.55, orthographic
projection, quads sorted by average depth and drawn far-to-near (painter's
algorithm). Segments are flat palette fills with a thin ground-colored seam
stroke; color index is (floor(iu/2) + floor(iv/2) + seed) % 4, so each day's
seed shifts the color assignment and a new day reads as a new torus.

## The typed code is truthful

The pane's 16 lines are built from the live config variables (SEED, RING,
TUBE, SEG_U, SEG_V, TILT, SPIN, PALETTE, rotY), not from a separate
hard-coded string: `var SEED = ' + (SEED + day) + ';'` and so on, and the
two rotY lines match the actual function verbatim. The pane types at
reading speed (total chars / 22 s), shows a blinking block caret while
typing, then holds for 8 s. Line numbers run 01-16 in dim green-grey.

## Day loop and tap

30 s per day: 22 s typing, 8 s hold, then the next day (seed = 814 + day).
Day state is a closed form of piece time plus recorded taps: each tap
(movement under 12 px on pointerup) starts a new day immediately, seed
increments, code retypes from the top. The torus rotation is a pure
function of piece time only, so taps never jump the form. No click-to-reload
anywhere.

## Determinism

Frame one is phase-shifted 9 s into the first day (PHASE = 9): torus at
rotY(9) = 0.8 rad, pane mid-typing (lines 1-8, caret inside "var SPIN").
All motion is a pure function of piece time plus recorded pointer events;
no wall clock, no unseeded Math.random. Two desktop renders are
byte-identical (md5 130f6e4ca883abf9240e2c3b0ef6c380 twice).

## Layout

Desktop (landscape): 60/40 split, thin cream divider, caption bottom-left
of the torus half. Portrait phones (h > w*1.15): stacked, torus on top
(55%), code pane below (45%), horizontal divider, both fully visible, no
clipping. House rules throughout: Visual Viewport sizing with resize
listened on both visualViewport and window, canvas pinned in draw() via
canvas.style.width/height in px, phone detection via window.screen (min
dimension < 700 px) with aspect fallback, one synchronous frame at load,
every requestAnimationFrame call typeof-guarded.

## Fix rounds

1. First build rendered the torus edge-on (a striped capsule, no hole):
   rotY started at 0.6 rad with SPIN 0.10, so at the 9 s phase shift the
   ring normal was nearly in-plane. Changed to base 0.35, SPIN 0.05, so
   frame one sits at 0.8 rad with the hole clearly visible; the torus still
   turns through edge-on over its slow rotation, as a rotating torus should.
2. The 1 px cream divider was painted over by the code pane's background
   fill (pane fill started at the same x). Divider is now drawn after the
   pane.
3. A cream seed dot on the outer rim floated just off the silhouette at
   the top (the rim point is not the silhouette top under tilt). Removed
   the dot and the now-unused mulberry32 helper; the day's seed shift in
   segment colors carries the new-day read instead.

## QA

Rendered from the actual script with node ~/workspace/tools/render-piece.js:
1280x900 desktop, 390x844 mobile, 720x720 thumb. All three inspected
visually: torus reads as a torus with a clear hole and flat segments;
code pane legible, truthful, caret visible mid-word; divider visible;
caption legible; no overflow, no clipping on mobile. Desktop re-render
byte-identical (determinism check passed).

## Files

- index.html (md5 18bf0acf4d204db7cf57adcc3cd0844b)
- thumb.png (720x720, md5 cca6353f76f0aad3304f5bacaf69a02c)
- process.md (this file)
