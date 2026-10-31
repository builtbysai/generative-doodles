# No.677 — Cuatro Elementos

EXPANSION #82 clemente-mckay (Clemente McKay, @clemity_), prompt block 5 "Cuatro Elementos", taken verbatim from TASKS.md.

## Concept

Clemente McKay's doctrine as a living cycle, in his own sentence: the ceramic is earth and fire, because the clay needs fire to take form; water circulates inside it, and in turn activates the air that makes the instrument work. The piece is a kiln diagram, not a mandala: a thin ring on a dark ground carries four stations (tierra at top, fuego at right, agua at bottom, aire at left), each a small flat icon with its one-word label, and at the center a single form that passes through the four states in step with whichever station is active. Earth is fired, water circulates, air is activated, and the cycle returns to earth. The only visible text in the piece is the four station labels the prompt specifies: tierra / fuego / agua / aire.

Palette, strict and complete: clay #8A4A2B, kiln glow #E2722B, ember #C22E1E, water #2E5F6B, air line #CFE4E4, ground #0F0C0A.

## Construction

**The four-state morph.** The center form is one closed outline interpolated point by point between two authored silhouettes with identical point count and winding (start bottom-left, up the left side, over the top, down the right side, back along the base): a wide matte MOUND (28 points, dome profile generated as a sine-power arc over a flat base) and a globular VESSEL (28 points, hand-set: body bulge, neck, flared rim). Tierra and fuego share the mound; agua and aire share the vessel. On top of the silhouette morph, three interior parameters carry the element identities:

- `glow` (fuego): two flat nested ellipses inside the mound, kiln orange over ember red, pulsing on a 3.2 s sine, drawn over the clay body so the heat reads as living inside the silhouette; 16 seeded ember specks rise off the mound, each a pure function of time (seeded x-offset, speed, phase, drift from a mulberry32 table), fading as they climb. No shadowBlur anywhere; the glow is layered flat shapes per house rule.
- `water` (agua): a resting water pool (flat ellipse) low in the vessel, plus a dashed elliptical circuit inside the body whose `lineDashOffset` advances with time, so the water visibly circulates along an interior loop.
- `breath` (aire): three smooth breath curves leave the vessel mouth and curl outward (growth and alpha breathing on slow sines), with two resonance rings expanding from the mouth and fading, the vessel singing.

**Cycle timing and lockstep.** The loop is 48 s: four 12 s spans, each element holding 10 s and morphing to the next over 2 s (smoothstep). A single `cycleState(t)` computes, from one eased transition amount, every parameter (`vessel`, `glow`, `water`, `breath`) and every station's presence weight, so the ring and the center form can never drift apart. The active station enlarges (up to ~1.28x) and brightens with the same weights; inactive stations sit small and dim. Frame one is the cycle start: tierra active, the center a plain matte mound on its kiln baseline.

**Interaction.** Watch-only by default. A horizontal drag adds a phase offset (0.02 s of cycle per pixel) so the visitor can spin the cycle and explore the order by hand; dragging is silent exploration. Pointer handlers also serve as the audio unlock gesture (below).

**Audio, and the gesture-gating deviation.** The prompt asks for one soft breathy tone during the aire phase, once per cycle, never on drag. Browsers forbid audible autoplay before a user gesture, so the literal reading is impossible for a watch-only piece; the piece takes the closest browser-safe reading:

- A WebAudio context is created lazily inside the first pointer handler (typeof-guarded, try/catch throughout), never at load.
- The tone (band-passed noise, frequency sweeping 480 to 880 to 420 Hz, ~4 s swell to 0.11 gain) fires only when the breath parameter crosses 0.9 rising on the automatic cycle, at most once per cycle, and is suppressed while dragging and for 12 s after any drag ends, so a hand-spun arrival at aire never sounds.
- If audio was never unlocked, the aire phase is visual only; nothing errors and nothing attempts to autoplay. In the headless QA renderer (no AudioContext) the audio path is fully inert.

This gating is a deviation from the prompt's literal text, forced by autoplay policy; the once-per-cycle, aire-only, never-on-drag character of the sound is preserved exactly.

**Determinism.** Frame one is an explicit synchronous `draw(0)`; nothing anywhere reads Date.now(). The animation loop (requestAnimationFrame, typeof-guarded) runs on an anchored performance clock plus the visitor's recorded drag offset; ember, water, and breath animations are closed-form phase functions of that time. A `?seed=t<seconds>` hook forces a fixed cycle time for headless QA renders. Canvas sizing follows the house rules: Visual Viewport API with resize listeners on both visualViewport and window, canvas CSS size pinned in px inside draw(), phone detection via window.screen (min dimension < 700) with aspect fallback only, composition refit as a centered square so the ring and labels stay whole on a 390-wide phone.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` (node-canvas, no rAF, no AudioContext, no document.createElement): qa-desktop.png 1280x900, qa-mobile.png 390x844, thumb.png 720x720. The script runs clean headlessly; audio and rAF paths stay inert.
- Determinism gate: thumb.png rendered twice and `cmp` compared: byte-identical. The duplicate was deleted.
- Frame one read back at all three sizes: dark ground, thin ring, four labeled stations with tierra enlarged and bright at top, fuego right, agua bottom, aire left, the matte clay mound centered on its baseline. Mobile refits the whole ring with nothing clipped and labels legible.
- The other three states verified through the seed hook (renders kept out of the piece directory): t=18 fuego (pulsing kiln core inside the mound, ember specks rising, fuego station active with ember ticks), t=30 agua (vessel silhouette, dashed circulation loop and water pool inside, agua station active), t=42 aire (vessel with breath curves curling from the mouth and a resonance ring expanding, aire station active and enlarged).
- Text audit: the only strings drawn are the four station labels; the only other text is the document title.
- Deviations recorded: (1) gesture-gated aire tone, for autoplay policy, detailed under Construction; (2) the fuego glow is drawn as flat layered ellipses over the clay body (sized to stay inside the silhouette) rather than as a clipped interior, because the renderer has no reliable clip discipline across the morph; visually it reads as heat within the mound and keeps the palette strict.
