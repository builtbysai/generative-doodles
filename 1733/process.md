# №1733 "The Cover Is the Data" (PP980, greyfade GF6)

EXPANSION #227 greyfade, completing the study at №1735 with №1734-1735 built in parallel by other agents. Watch only.

## Prompt as built

A mint-green cover composition of vertical bars with thin white connecting lines and tiny numbered labels; the bars are drawn live from the piece's own generative state, so the cover is a rendering of the dataset the piece is currently playing. Bars massed center-right, connecting lines threading them, generous mint margin left. Every ~10 seconds the dataset advances one step and the bars redraw with a soft ease. Canvas 2D, monospace labels at 10-11px.

## Palette (hand-picked, no study file)

The study file studies/greyfade.md does not exist in the repo, so hexes were hand-picked from the prompt's named colors: mint ground #A9DDB8, white bars and hairlines #FFFFFF, tiny black monospace numerals #141414, dark green date/hint ink #1E5C38, white title and hint plates. No gradients.

## How it works

- 12 vertical bars, massed center-right (bar field starts at 36% of the cover width), generous mint margin left carrying a small PP980 / GREYFADE caption.
- Bar widths, heights, and the two-digit value label under each bar are closed-form functions of (bar index, dataset step): a sine hash, `frac(sin(i * 12.9898 + step * 78.233) * 43758.5453)`. No RNG, no wall clock, no Math.random anywhere in the frame.
- 8 dataset steps, cycling. Step = floor(simTime / 10) % 8. Within the first 1.2 s of each 10 s step, widths and heights ease from the old step to the new one with a smoothstep; the rest of the step is still, like a printed page.
- Thin white connecting lines: a polyline threading the bar tops, two horizontal hairlines across the bar field, and a baseline rule. White lines are visible in the gaps between bars and over the mint ground.
- A DATASET 01 / 08 marker sits top right of the bar field and counts up with each step.
- Watch only. No pointer handlers at all; nothing to tap or click, never click-to-reload.
- House rules: Visual Viewport sizing with resize on visualViewport and window; canvas pinned in draw() via canvas.style.width/height in px; phone detection via window.screen (min dimension under 700px) with aspect fallback; field-like composition full-bleed on phones, square cover (94% of the smaller viewport side) centered on desktop; one synchronous frame at load; requestAnimationFrame calls guarded by typeof checks; reduced-motion respected.
- Title/date/hint plates drawn on canvas: white plates, black title, dark green date "2006 · 10 · 10" and hint "Watch only. A new page every ten seconds."

## Frame one and dataset schedule (determinism)

Frame one is a fixed phase: simTime = 0, dataset step 1 of 8 fully settled (ease complete), the full 12-bar set and all labels visible. Step schedule: step k occupies simTime [10k, 10k + 10), ease during the first 1.2 s, then still until the next step. Steps cycle 1-8 and repeat. Verified by probe: drawAt(0) gives step 0, drawAt(10.5) gives step 1 with a visibly different bar set and values, and the two renders differ (md5 90d987da... vs e08a00a1...).

## Deviations from the prompt

- 12 bars instead of an unspecified count, chosen so the two-digit labels stay legible at mobile width (390 px).
- The cover frame is a thin white rule around the square on desktop and inset 10 px on phones, a small addition to sell the printed-cover read.
- The left margin carries a small PP980 / GREYFADE caption, in the manner of a cover credit line.

## QA

Rendered from the actual script with node ~/workspace/tools/render-piece.js:

- Desktop 1280x900: mint cover square centered, white bars massed center-right, polyline and hairlines threading them, all 12 numerals legible below the baseline, title/date plates top left, hint plate bottom left, DATASET 01 / 08 marker top right. No clipping, no plate collisions.
- Mobile 390x844: full-bleed mint, bars tall and narrow but intact, all 12 numerals legible, title plate fits, hint plate fits. No clipping.
- Thumb 720x720: same composition, clean at square size. thumb.png is this render.
- Probe render at t = 10.5 s: dataset step 2, bars and values visibly different, marker reads DATASET 02 / 08, transition mid-ease as designed.
- No em dashes in index.html or process.md. No AI-signature copy.

## Gallery

- Date: 2006 · 10 · 10 (formula date 2002-01-10 + 1734 days).
- Note: "A mint cover whose bars are drawn live from the dataset the piece is playing. Watch only."

## Template

Structure and house-rule code mirrored from live №1732 "The Score Follower" (fetched via fetch-blob.py), adapted to a watch-only piece: pointer handlers removed, pre-roll removed (frame one is already settled at simTime 0).
