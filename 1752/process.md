# №1752 "Twine" (PP999, MF1, marcus-fischer) - build notes

Date: 2006 · 10 · 29 (formula date 2002-01-10 + 1753 days). Watch-only.
Spec: BATCH-1752-1756-SPEC.md (№1752 section). Template: live №1751 Beat Box
(/tmp/t1751.html), structure, sizing, plates, and guard patterns mirrored.

## What it is
Two tape reels opposed left and right on a near-black room tone. Both carry
the same looping motif as a traced path across the frame, but the spools turn
at incommensurate rates, so the motif arrives from each side with a slowly
changing offset, knotting and unknotting. Crossings bloom warm where the
traces meet. Two faint mic glow points sit low in the margins, where the room
"hears" the loops.

## Palette
- Ground #0E0B09 (near-black room tone)
- Warm tape brown #C9A06B / #A97C4F / #8A6A45 (left trace, reel rims, ticks)
- Oxide grey #8A857C / #5E5A53 (right trace, spokes, hubs)
- Bloom #E8C88F (crossing glows)
- Plates dark #171310 with tape-brown rule, title ink #DCC7A4, hint ink #9A8871

## Determinism / frame one
- Fixed phase t = 60.0 s. All motion is a closed-form function of piece time:
  reel angles 2*pi*t/P, trace phases 2*pi*t/P, crossings recomputed per frame
  from the pure trace functions. Seeded RNG (mulberry32, seed 1752) only.
  No Date.now(), no Math.random() affecting frame one.
- Period pair: left reel 24.0 s, right reel 24*sqrt(2) s (approx 33.94 s).
  Ratio is irrational, so the pair never aligns and the offset never repeats
  within a viewing session.
- Drift at frame one: phaseA - phaseB = 2*pi*60*(1/24 - 1/(24*sqrt(2)))
  = 4.601 rad, so the offset sits visibly mid-drift with several crossings
  blooming (six crossings counted at frame one via the probe).
- Motif: three harmonics (amplitudes 1.0 / 0.42 / 0.24, orders 1 / 2 / 3,
  seeded phases), normalized by 1.66; 3.25 loops across the span on desktop,
  2.5 on phones so the short span stays legible.
- Mic glow points: fixed seeded positions near (0.16, 0.82) and (0.84, 0.82)
  of the viewport, faint radial gradients, never moving.

## House rules
- Visual Viewport sizing; resize listened to on visualViewport and window.
- Canvas pinned in draw() via canvas.style.width/height in px.
- Phone detection via window.screen min dimension < 700px, aspect fallback
  h > w*1.15.
- One synchronous frame at load; requestAnimationFrame guarded by a typeof
  check; reduced-motion respected.
- No em dashes in visible copy; no AI-signature copy; never click-to-reload;
  watch-only (no pointer handlers at all).
- Title/date/hint plates drawn on canvas: "Twine", "2006 · 10 · 29",
  "Watch only."

## Deviations from the prompt
- None substantive. One responsive adaptation: on phones the reels are
  smaller (0.12 of min viewport dimension, max 64 px) and their centers are
  inset so both reels stay fully inside the frame, and the motif runs 2.5
  loops instead of 3.25. The first mobile render had both reels clipped at
  the frame edges; this fix was applied and re-gated.
- Plates are dark-on-dark (plate #171310) rather than the template's light
  plate, so the bright box does not break the near-black room tone; ink
  colors were flipped to match, per the house rule for centered pieces on a
  dark ground.

## QA
Rendered from the actual script with node ~/workspace/tools/render-piece.js
after the final edit (re-gated post-fix):
- 1280x900 desktop: reels opposed left/right, spokes at visibly different
  angles (left reel at 5*pi, right at ~4.81 rad), both traces crossing the
  full span with six warm bloom points, mic glows faint at lower left/right,
  plates legible, margins dark and empty. Pass.
- 390x844 mobile: both reels fully in frame, traces legible with bloom
  crossings, mics faint, plates legible, no clipping. Pass.
- 720x720 thumb: same composition, legible at thumbnail size; thumb.png IS
  this render. Pass.

## Files
- index.html (12,145 bytes; md5 cc9405c8608e4b20853dbbf545c2d4d9)
- process.md (this file)
- thumb.png (the 720x720 render)

Gallery note: "Two tape loops turn at incommensurate rates, knotting and
unknotting as the offset drifts. Watch only."
