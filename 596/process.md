# No.596 — "Inesperadamente"

EXPANSION #72 clara-lagos, prompt block 4, "La Segunda Parte" (verified verbatim from TASKS.md).

## Concept

Clara Lagos's comic-to-reality bridge. A hand-drawn strip plants an intention, and then the strip continues past its own punchline into lived life, where the proof is photographic. Four panels in a row, one framing rhythm, revealed one at a time by tapping:

1. **Drawn (ink).** A woman kneels by a door, finds berries on a small bush. Bubble: "¡Un tesoro!" Her apron carries the study's one soft blue.
2. **Drawn (ink).** Three jars on a windowsill, seeds in soil, a blue ribbon on the middle jar. Bubble: "Las pongo acá a ver qué pasa."
3. **Still phase.** The same seedlings, months later, grown tall in white milk bags.
4. **Still phase.** More seedlings in repurposed plastic bottles, and a blue-banded butterfly settled on a tall stem.

Between panels 2 and 3 sits a small hand-lettered "segunda parte..." — the hinge of the piece. The phase boundary is a hard cut: no dissolve, no blend. Drawing stays drawing; the still phase stays still.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets. Square 1000-unit stage, letterboxed; four 200×560 panels at x = 31 / 245 / 555 / 769, the marker zone between panels 2 and 3.
- **Drawn phase** (panels 1–2): ink #1A1A1A on paper #FAF7F0, soft blue #3E6FA8 spent only on the apron and the jar ribbon. Wobbly hand-ruled borders from seeded jitter paths. The panels breathe very faintly (scale 1 ± 0.004, fixed-phase anchored), and dragging across a revealed drawn panel stirs its vegetation (the panel-1 berry bush, the panel-2 jars) with a decaying wobble.
- **Still phase** (panels 3–4): quiet flat color — leaf greens #4A6741 / #7A9A63 / #97B47E, milk-bag white #F2F0EA, soil #6B4A2F, translucent bottle blue-grey, pale daylight ground. These panels are drawn from fixed seeds with **no time-dependent term at all**: no breathing transform, no wobble, and pointer drag over them is ignored entirely. Reality is still.
- **The butterfly** is the single sanctioned motion in the still phase, and only on tap: tapping it lifts it into one small loop (1800 ms, parametric circle returning exactly to its perch) with fast wing-flap, then it resettles and is still again. At rest its wings sit at a fixed open angle.
- **Reveals:** panel 1 is open at load. Panels 2–4 wait under plain paper slips hand-lettered 2, 3, 4 (with tape strips and offset shadows). A tap anywhere advances exactly one panel, in order; there is no way to skip to the end. After panel 4, taps do nothing except on the butterfly. Never click-to-reload.
- Frame one is one synchronous draw at a constant phase (PHASE0 = 0): panel 1 complete, slips over 2–4, the "segunda parte..." marker in place, "tap" hinted lowercase in the corner. All animation is anchored as PHASE0 + elapsed-since-load; frame one is never derived from `Date.now()`. rAF is typeof-guarded; all randomness is mulberry32 with fixed seeds.
- House rules honored: Visual Viewport sizing with resize listeners on both visualViewport and window, canvas CSS size pinned in px inside `draw()`, phone detection via `window.screen` (min dimension < 700 px) with aspect fallback, no microphone, no audio.

## Deviations

- **Photo-phase stand-in (required by the gallery format):** panels 3–4 in Clara Lagos's original are real photographs. A gallery piece is one self-contained HTML file with no external images, so the "photographs" are rendered in-canvas as flat, quiet, full-color procedural stills — milk bags, bottle planters, seedlings — in the same compositions. The concept survives the substitution because the piece's rule is about *stillness and phase*, not about photographic texture: the drawn half moves and wobbles; the still half is frozen solid and ignores drag. This is recorded here rather than hidden.
- The middle jar's blue ribbon is the drawn phase's second spend of the soft blue (the brief reserves blue for the phase; the apron is the first spend). Small, and inside the same discipline.
- Panel 2 adds a small watering can below the sill (unnamed in the brief) as a quiet waiting prop in the same ink register; no palette or mechanism change.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js`:
  - `qa-desktop.png` (1280×900): panel 1 inked and complete — woman kneeling by the panelled door, blue apron, berry bush at her hand, "¡Un tesoro!" bubble with tail toward her; slips numbered 2, 3, 4 with tape and shadows; "segunda parte..." lettered between slips 2 and 3; "tap" hint bottom-right, subtle. Nothing clipped.
  - `qa-mobile.png` (390×844): whole stage fits the phone width, all four panel slots legible, bubble text readable, marker present, nothing clipped.
  - `thumb.png` (720×720): same resting composition as desktop.
- Determinism gate: `thumb.png` rendered twice and byte-compared with `cmp` — identical; second render deleted. Re-run after a small fix round (mouth arc corrected from a frown to the discovery smile; bubble tails lengthened toward the speakers) — identical again.
- Full sequence verified with a throwaway all-revealed preset copy (`revealed = 4`, rendered at 1280×900, inspected, then deleted): panel 2 shows the window, three soil-filled jars with pale seeds, blue ribbon, watering can, and the two-line bubble fitting its box; panel 3 shows three grown seedlings in folded-top milk bags under a pale sun; panel 4 shows two translucent bottle planters and the tall stem with the blue-banded butterfly perched at its top. The drawn/still contrast reads at a glance.
