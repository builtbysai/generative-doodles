# №1495 "Curiosity and Benevolence" — nadja-ringart NR8 (PP742)

## Prompt
An open field in cream. Two abstract figures start at opposite edges: one in
blue, one in brick. Between them, a low table holds a small gold disc. The
figures walk toward the table slowly, never hurrying, and when both arrive
they sit — one at each side — and the disc glows softly. The scene holds,
then the figures stand, walk back to their edges, and the loop begins again.
Palette: field cream #e8e0d0; figures' clothes blue #4a5a7a and brick
#a8674a; table wood #8a6a48; disc gold #d9a441; skin #f2ead8. No other color.
Drag either figure sideways speeds or slows that figure's walk only;
releasing resumes the automatic pace. The loop never rushes, never skips the
sitting, never ends with one figure alone at the table. Drag never makes a
figure run and never restarts the scene.

## Study rules applied
THE SOCIOLOGIST'S CUT. Never click-to-restart, never click-to-reload, never
photorealism, never decorative gradients, never text. No visible text except
`<title>`. Fully silent (no AudioContext at all). Abstracted figures only,
no likenesses, no real names, no readable text, no nudity, no violence.

## Implementation
- 48 s loop, all state from loop-local time (t mod 48): approach 0–16 s,
  sit 16–28 s, return 28–44 s, hold 44–48 s. Every animation sine runs on
  loop-local time (the №1482 lesson applied pre-emptively), so the loop
  closes exactly.
- Figures as sprites with x interpolation toward the table and a seated
  state (torso + horizontal thigh + vertical shin when seated; torso + two
  legs + progress-tied bob when walking; bob is zero at both walk ends, so
  no jump at phase boundaries).
- Per-figure walk clocks: approach distance integrates the figure's drag
  rate segments over [0, 28] (approach plus sitting-window catch-up),
  capped at 16; return distance integrates over [28, 44], capped at 16.
  Drag rate = clamp(1 + dx/300, 0.25, 2) — a figure can never run. Drags
  belong to the loop iteration in which they were made (history clears on
  loop wrap). Drags starting off a figure are ignored.
- Glow: layered flat-alpha discs (alphas 0.06 / 0.12 / 0.25, rounded to 4
  decimals), never a canvas gradient — the study standard forbids
  decorative gradients, so the radial alpha ramp is flat-alpha discs only.
  Glow is gated on BOTH figures seated and fades in over 1 s after the
  later arrival; a slow-dragged figure keeps the glow off (verified: left
  seated + right not seated → glow 0 at t = 20).
- Hold window [44, 48] eases each figure from its return position to its
  edge, so the loop closes exactly whatever drags did.
- House rules: canvas size from Visual Viewport API; canvas pinned in
  draw(); phone detection via window.screen physical size (min dimension
  < 700 px) with aspect fallback; centered composition keeps its shape,
  page ground takes the field cream; frame one = draw(0) via boot flag,
  clock starts only with the rAF loop (plain function declaration behind a
  typeof guard); seeded mulberry32 PRNG (seed 1495000), never Math.random;
  dots as own-beginPath arcs with moveTo first (node-canvas quirks).

## Verification (forced-time probe, tmp/probe1495.js; vm-isolated instance,
real node-canvas, piece driven via window.__piece)
- t = 0 redraw 0 px; fresh instance t = 0 identical; t = 48 vs t = 0 = 0 px;
  t = 96 vs t = 0 = 0 px (loop closes exactly).
- States: t = 0 figures at edges (76.8 / 1203.2), not seated, glow 0;
  t = 8 walking inward (218.4 / 1061.6); t = 20 both seated at table sides
  (360.0 / 920.0), glow 1, goldish pixels 1356 vs 392 at t = 0 (halo on);
  t = 36 returning (218.4 / 1061.6), glow 0; t = 46 back at edges.
- Drag fast (+300 px) on left only: left 270.4 vs 166.4 undragged at t = 6,
  right unchanged (1113.6 = 1113.6). Rate cap: +900 px drag gives the
  identical 270.4 (both clamp to 2x). Slow drag on right only: at t = 20
  left seated, right not seated, glow 0. Table drag ignored (positions
  unchanged). After release the walk continues from the dragged position
  (t = 10 leftX 347.9).
- Mid-loop render at t = 20 inspected (tmp/midloop.png): both figures
  seated at the table sides, gold disc glowing softly with layered halo,
  no text, generous empty space.
- Token scan clean: no fillText, AudioContext, getUserMedia, createElement,
  Path2D, gradients, or shadowBlur; the single "Math.random" hit is the
  code comment stating it is never used.
- Renders inspected at 1280×900, 390×844, 720×720; thumb byte-identical
  across repeated renders including a final re-verify. No fix rounds needed.
- md5 of index.html: 3aaf90a7bf5d4c5202e2322a89b0bf3e

## Files
- index.html — self-contained, no external assets
- process.md — this file
- thumb.png (720×720), qa-desktop.png (1280×900), qa-mobile.png (390×844)
- tmp/probe1495.js, tmp/midloop.js, tmp/midloop.png
