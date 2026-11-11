# №1695 - Please Respond, Ten Hands

Driver: one algorithm passed hand to hand, each author bending it without ever starting over.

- Prompt: MK8, mpkoz PP942, EXPANSION #222. The evolving-codebase mechanism: one dense grid field runs continuously; every 60 seconds a new hand takes over and the same field visibly mutates under a new rule, cycling through ten distinct hands, each applied on top of the previous state rather than restarting. A thin timeline along the bottom edge shows ten ticks, the active tick lit.
- Date: 2006 · 09 · 02 (formula date 2002-01-10 + 1696 days).
- Gallery note: "One field, ten hands, each bending the same algorithm. Watch only."

## Build

- Canvas 2D only. One field simulation with a rule parameter struct; each hand is a preset that lerps the params (grid jitter, slant angle, extrusion depth, erosion rate, annotation density, plus wave, scatter, ring, drift, color-break). Handoffs interpolate presets over 5 s with a smoothstep; there is no hard cut and the field never restarts.
- Field: a dense grid of small dash marks filling the frame edge to edge, cell 28 px (about 46 x 33 marks at 1280x900, 26 x 26 at 720x720). Every mark's offsets, size, phase, and erosion/annotation/color seeds come from one mulberry32 stream, seed 942. Field state at any time is a pure function of piece-time t: jitter, scatter, wave, ring pull, and drift are all closed-form functions of t and the seeded per-mark values. Nothing accumulates frame to frame, so frame one is deterministic.
- The ten hands (rule params, palettes):
  1. grid order: jitter 0, slant 0, all else 0, markLen 0.42; mustard #D9A441 on cream #F2E8D5.
  2. slant: slant 0.62 rad, jitter 0.06, colorBreak 0.08, markLen 0.55; teal #2E8C8A on white #F4F1EA.
  3. extrusion: extrude 1.00 (dim offset copy behind each mark), slant 0.20, markLen 0.48; rust #B4502E on charcoal #3A3A38.
  4. erosion: erosion 0.55 (seeded marks fade to alpha 0.22 stubs), jitter 0.16, scatter 0.10; cobalt #2E4FA3 on paper #EDE6D6.
  5. annotation: annot 0.85 (seeded plus-sign crosses beside marks), jitter 0.05; mustard #D9A441 on cream #F2E8D5.
  6. color-break: colorBreak 0.45 (nearly half the marks take the accent), slant 0.30, wave 0.15; cobalt #2E4FA3 broken by rust #B4502E.
  7. wave: wave 1.00 (travelling sine across the field, 60 s period), markLen 0.46; teal #2E8C8A on white #F4F1EA.
  8. scatter: scatter 1.00, jitter 0.60, slant 0.35, erosion 0.10; rust #B4502E on paper #EDE6D6.
  9. ring: ring 1.00 (marks pulled toward the nearest of seven concentric rings), annot 0.15; cobalt #2E4FA3 on paper #EDE6D6.
  10. drift: drift 1.00 (slow steady slide breathing with the 60 s period), wave 0.40, annot 0.30, slant 0.15; mustard #D9A441 on cream #F2E8D5.
- Palettes stay inside the prompt's register (mustard/cream, teal/white, rust/charcoal, cobalt/paper); palettes themselves lerp between hands during the 5 s morph, so a handoff is a visible rule change, not a cut. The hands are never named on screen.
- Timeline: a single 2 px line along the very bottom edge with ten ticks (2 px wide, 10 px tall); dim grey ticks, active tick white. No other UI, no text beyond the plates.
- Composition: field full-bleed on desktop and phones; ground off-black #111214. Watch-only; no pointer interaction.
- House rules: Visual Viewport sizing with resize on visualViewport and window; canvas pinned in draw() via style.width/height in px; phone detection via window.screen (min dimension under 700 px) with aspect fallback; one synchronous frame at load; requestAnimationFrame guarded with typeof checks; fixed-phase first frame at t = 30 (mid-way through hand 1, grid order, first tick lit); seeded RNG only, no Date.now()/Math.random() in the frame-one path; no em dashes in visible copy; never click-to-reload.
- Flicker safety: all motion is slow (60 s hand period, 5 s morphs, gentle breathing); nothing strobes.

## Acceptance numbers

- Field cell: 28 px; about 1,518 marks at 1280x900.
- Hand period: 60 s; ten hands; full cycle 600 s.
- Morph duration: 5 s per handoff, smoothstep lerp of all rule params and both palette colors.
- Frame-one phase: t = 30 s (hand 1, grid order, morph weight 0, first timeline tick lit).

## Deviations

- The prompt names six hands explicitly (grid order, slant, extrusion, erosion, annotation, color-break) and leaves the rest open; the four additional hands (wave, scatter, ring, drift) are defined here, each with its own rule params and palette from the prompt's register.
- The hint plate sits 26 px above the bottom edge (instead of the usual 12 px) so it clears the timeline line and ticks at the very bottom.
- Mark length breathes gently (plus/minus 12 percent over the 60 s hand period) so the field reads as alive within a hand, not frozen between handoffs; the breathing is a closed-form function of t and the seeded phase, so determinism is preserved.
