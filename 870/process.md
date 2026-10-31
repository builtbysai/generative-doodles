# No.870 "Whose Space-Time"

Study #106 lim-giong, PP31 "Enter the Character". Lim Giong's scoring method: enter the psychological state of a character, the space-time of a story, and let that state tune everything. Three characters, three space-times, one mark field. The characters never appear as figures or faces; they are climates the world passes through.

## Concept

Four hundred small marks (dots and dashes) drift on shared black #020203. You are always inside exactly one state, and the state re-tunes everything at once: mark colour, drift speed, field density, mark alpha, dart, and breathing.

- Prisoner: cold iron #2E3A44, slow heavy drift, full density, marks gathered into tight slow currents.
- Drifter: temple gold #E8A020, fast skittish drift, sparse field, a perpendicular dart wiggle so paths never run straight.
- Dreamer: dusk violet #5C4D6E, slow drift, faint marks that breathe in and out as they go.
- Released (neutral): the field at its lowest energy, marks dimmed toward a grey-violet.

Three sigils rest along the bottom edge: a bar for the Prisoner, a zigzag for the Drifter, a circle for the Dreamer. They are quiet marks in the world, drawn in their state colours, brighter for the state you are inside, never framed as buttons. Tap near one and the whole piece cross-dissolves into that space-time over about four seconds. Double-tap the open field and the character is released back to neutral. Dragging feels different in each world: Prisoner drags lag with heavy inertia, Drifter drags scatter nearby marks, Dreamer drags leave a dissolving wake that briefly lifts the marks along the path.

Sound starts only on the first gesture: a low two-sine drone follows the Prisoner weight, sparse bright pings follow the Drifter weight, slow dissolving tones follow the Dreamer weight, all crossfading with the visual dissolve.

## Construction

- State is a weight vector over [neutral, Prisoner, Drifter, Dreamer]. Every tunable (colour RGB, speed, density, alpha, dart, breath) is the weighted sum of per-state constants, so entering a character is one eased interpolation of the entire world. Transitions use smootherstep over 4 s and are recorded as events {t0, from, to}; the weight at any time is a closed-form function of the event list.
- Mark drift is also closed-form: each weight component is integrated analytically over the recorded segments (the integral of smootherstep is u^6 - 3u^5 + 2.5u^4), giving a drift distance D(t) that the whole state history feeds. A mark's position is its seeded base plus its direction times D(t), plus small wander harmonics, plus the Drifter dart term whose phase runs on D itself.
- Density is per-mark: each mark carries a seeded threshold and is visible in proportion to how far the current density passes it, so sparse states thin the field instead of shrinking it.
- Opening state choice: the piece opens inside the Prisoner, settled, so frame one is a dense cold-iron field with currents, and the first thing a visitor does is choose to leave or stay. Recorded here because the brief leaves the opening state open.
- Neutral tone derivation: the released colour is the Dreamer colour scaled toward black (about 0.46), landing on a dim grey-violet in the #2A2530 family. It is computed from the Dreamer constant in code, so no fifth hue exists anywhere in the piece.
- Tap disambiguation choice: a tap that lands on a sigil always enters that character and never counts toward the release double-tap; release is a double-tap on the open field. This keeps entering reliable, since the sigils sit where a second tap would otherwise land.
- The Prisoner sigil is drawn as a double bar (two short parallel strokes) so it reads at small sizes; it is still a bar, not an icon.
- Drag behaviour is blended by the current weights, like everything else: mid-dissolve, a drag is part Prisoner carry, part whatever it is dissolving toward.
- House rules: canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas pinned in px inside draw(); phone detection via window.screen (min dimension under 700 px) with the h > w * 1.15 aspect fallback; frame one is the synchronous draw(0), no Date.now anywhere; seeded mulberry32 RNG; no gradients, no shadowBlur, no ctx.filter, no offscreen canvas; requestAnimationFrame typeof-guarded; AudioContext created lazily inside the first pointer gesture and fully typeof-guarded and try/caught, so the piece renders complete in silence.

## QA log

- Rendered with the house node-canvas renderer (no rAF, no AudioContext in the harness): qa-desktop.png at 1280x900, qa-mobile.png at 390x844, thumb.png at 720x720. All three render cleanly in silence.
- Determinism gate: thumb.png rendered twice and byte-compared with cmp, identical. The duplicate render was deleted.
- Read-back: desktop and thumb show the dense cold-iron mark field on black with visible gathered currents, and the three sigils along the bottom edge in iron (bar), gold (zigzag), and violet (circle), the bar brightest as the active state. Mobile holds the same composition in the tall frame, sigils reachable at the bottom, nothing clipped.
- Palette scan: only #020203, #2E3A44, #E8A020, #5C4D6E, and the derived dimmed-Dreamer neutral appear. No visible text besides the title. No em dashes.
