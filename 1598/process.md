# №1598 The Leaf Decides

EXPANSION #210 newyellow, prompt PP845 / NY7. Eight lotus-pad leaves on thin stems rise from the bottom edge on black, and each leaf's color is decided by its tilt: pink when it faces the light, deep blue when it turns away.
Gallery date: 2006 · 05 · 28 (formula 2002-01-10 + 1599 days).

## Mechanism

On black #050507, eight stems rise from the bottom edge, each a dim violet #4A3A6A quadratic curve with a slow seeded sway, topped with a translucent funnel-shaped leaf about 15 percent of the frame across. Heights are staggered (leaf centers from 27 to 70 percent of composition height) and each leaf sits at its own in-plane roll.

Each leaf is a disc mesh: a radial gradient from a dark throat at the stem attachment through its computed color to a lighter rim, with 8 to 10 seeded rib strokes from center to rim and a white #F5F5F2 edge-light arc on the side facing the light. The disc is drawn as an ellipse whose minor axis is the radius times |cos(phi)|, so a leaf tilting away foreshortens into a sliver and a leaf facing the viewer opens into a full disc.

The driver is one sentence: each leaf carries a tilt angle phi, its normal's facing is (cos(phi minus LIGHT) + 1) / 2, and its color is the mix of deep blue #4A7AE8 and pink #E87AA8 by that facing, passing through violet #8A4AE8 at the midpoint, so color is a pure function of tilt and the flip happens exactly when the normal crosses the light angle.

Tilt changes only on a slow seeded schedule: each leaf has authored re-tilt events every 26 to 46 seconds, alternating between front targets (near the light angle) and back targets (about 2 radians away), eased over 7 seconds with a smoothstep, plus a small slow sinusoidal sway. No pointer interaction of any kind; the piece is watch-only.

## Interaction

None. Watch-only by the prompt. No pointer handlers are registered.

## Palette

Black ground #050507; leaves pink #E87AA8, deep blue #4A7AE8, violet #8A4AE8, edge light white #F5F5F2; stems dim violet #4A3A6A. Nothing else except low-alpha off-white for the title, date and hint text.

## Determinism

First frame is drawn synchronously at a constant phase of 20.0 seconds. The rAF loop is anchored as phase plus elapsed-since-load. All leaf positions, tilts, re-tilt events, sway phases and rib counts come from fixed-seed mulberry32 generators. No Math.random, no Date.now, no wall-clock input anywhere. Reduced-motion preference renders the static first frame only.

## Deviations from the prompt

- None in the mechanism. The hint line is drawn on the canvas in low-alpha off-white (the convention from recent pieces), since the spec palette has no text tone.
- The funnel reads through a radial gradient plus ribs plus a lit rim arc rather than a literal 3D cone: the disc mesh with foreshortening carries the front/back logic in 2D.

## Proposed gallery note

"Watch only. Leaves turn pink or blue as they tilt."

## QA

Rendered from the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb. All three inspected: eight translucent funnel leaves with visible ribs and lit rims on dim violet stems, six pink and two blue at frame one, stems reaching the bottom edge, no clipping on mobile, title/date/hint legible on all three. Thumb is the 720x720 render.

A node harness confirmed the mechanism: facings at t=20 are 0.22, 1.00, 0.95, 0.99, 0.98, 1.00, 0.92, 0.19 (two blue, six pink); by t=120 six of eight leaves have crossed the 0.5 facing line and flipped color versus frame one (leaf 1: 1.00 to 0.25, leaf 2: 0.95 to 0.29, leaf 3: 0.99 to 0.31, leaf 4: 0.98 to 0.13, leaf 6: 0.92 to 0.17, leaf 7: 0.19 to 0.56). A render at t=90 shows the flip visually: the leftmost leaf that was blue and edge-on at frame one is now pink and round, the rightmost leaf is a thin violet sliver mid-flip, and the second leaf sits violet in transition. Two fresh first-frame renders are byte-identical, and the script contains no Math.random or Date.now.

Fix rounds: none. The first build passed visual inspection and the flip probe on the first attempt.
