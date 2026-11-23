# №1724 Nested Glass  -  process notes

Driver: ten concentric translucent rose squares breathe scale and alpha out of phase over a dark center, a quiet optical pulse with no rotation.

## Spec
- Piece: №1724, zach-bodtorf PP971 / ZB5, EXPANSION #226.
- Gallery date: 2006 · 10 · 01 (formula 2002-01-10 + 1725 days).
- Hint plate: "Watch the squares breathe."
- Interaction: watch-only seamless loop. No pointer interaction, no click-to-reload, no rotation anywhere.

## Acceptance criteria (numbers)
- Square count: 10 concentric filled squares, outer to inner.
- Breath period: 16 s, seamless loop (phaseT = (3.0 + clockT) % 16).
- Phase offsets: square i phase = TAU * (t / 16 + i / 10), i = 0..9, evenly staggered across the cycle so the squares breathe out of phase.
- Scale breath: half-size = base * (1 + 0.08 * sin(phase)), i.e. +/-8% around base.
- Base half-sizes: largest 0.46 of stage width, innermost 0.055, evenly spaced (step 0.405 / 9).
- Alpha breath: 0.26 + 0.16 * sin(phase + PI/2), i.e. range 0.10 to 0.42, a quarter-cycle out of phase with the scale breath.
- Frame-one phase: t = 3.0 s of the 16 s period (fixed, deterministic; no randomness, no wall clock).
- Stage: centered square, 0.92 * min(VW, VH) on every screen (centered geometric piece; square shape kept on phones too).

## Palette (hexes hand-picked)
The prompt named colors only (rose, blush, deep charcoal) and the study file studies/zach-bodtorf.md (f14) does not exist in the repo, so hexes were hand-picked from the named colors:
- Ground (deep charcoal): #221E1C
- Dark center panel: #171414
- Plate: #141110, plate line rgba(232,160,168,0.55), title ink #F5E9E6, hint ink #E8A0A8
- Rose ramp, outer to inner: #A63D52, #B94E64, #C25A6E, #CF6E80, #D97B8C, #E08A99, #E8A0A8, #EDB3B8, #F2C4C9, #F6D6D9

## Deviations from the prompt
- Palette hexes hand-picked (study file missing, see above); no other deviation. Prompt calls for 8-12 squares; 10 chosen. Prompt's "dark center" realized as a darker center panel (#171414) behind the stack, inside the charcoal ground.
- Template: №1719 index.html (house plate layout, Visual Viewport sizing, rAF guard, fixed-phase frame one), adapted to the charcoal ground with light hint ink per the centered-geometric rule. №1719's drag-to-tilt interaction was dropped: this piece is watch-only per the prompt.

## House rules applied
- Visual Viewport sizing; resize listeners on both visualViewport and window.
- Canvas element pinned in draw() via canvas.style.width/height in px.
- Phone detection via window.screen (min dimension < 700px) with aspect fallback (h > w * 1.15).
- Centered geometric composition: square stage on all screens, page ground is the piece's own charcoal, hint ink light on dark.
- One synchronous frame at load; requestAnimationFrame guarded with typeof check.
- Deterministic fixed-phase first frame; verified by re-rendering the desktop frame twice with identical md5.
- No em dashes in visible copy; no AI-signature copy; no autoplay audio (none).

## QA
- Rendered with node ~/workspace/tools/render-piece.js from the actual script at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three renders visually inspected.
- Desktop: 10 nested squares clearly layered, translucent stacking visible (inner squares brighter), generous dark margins, plates legible.
- Mobile: square stage centered, shape kept, plates legible.
- Thumb: 720x720 render output, nesting and plates legible.
- Determinism: two desktop renders byte-identical (md5 759b313411cdef7b986a27a1d0cad70d).
- Flicker safety: slow 16 s breathing only, alpha range 0.10-0.42, no strobing.

## Files
- index.html (md5 2f99ae7c24d2442bef97eb35dda2582a)
- thumb.png 720x720 (md5 b2c3f90d3d93e80963d261b955672ab3)
- process.md (this file)
