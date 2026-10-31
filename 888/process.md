# No.888 — Every Tiny Grain

Study #109 klsr.av, PP49 "The Light Blade".

## Concept

One luminous event on near-black: a tall refracted-light column rising at center, violet with a hot white core and chromatic pink fringing along its bright edges, caustic sparkles drifting inside it. The column morphs slowly, its brightness breathes on a slow swell-and-recede rhythm, and on a roughly forty-second loop the bloom swells past a threshold, dissolves into a diffuse horizontal smear, and rebuilds. Everything else is restraint: no second column, no color beyond the iridescent fringe, no UI beyond a thin unlabeled breath meter along the bottom edge.

Interaction follows the Klsr rule that the transient is the bloom. Dragging bends the blade toward the finger and intensifies the fringing; fast drags flare it. A tap strikes one sharp bloom pulse. A double-tap holds the bloom frozen at peak brightness for three seconds. Sound starts only on the first gesture: a deep low drone whose gain is the same brightness number the visuals use, plus a granular shimmer that scales with it.

## Construction

Single self-contained `index.html`, canvas 2D, no external assets. Palette is exactly the five specced tones: ground #040405, blade violet #8A5CFF, core white #FFFFFF, fringe pink #FF7AB8, sparkle #D8F6FF.

- **Blade model.** The column is drawn as 260 horizontal row slices. Each row's center is displaced by a seeded three-sine morph (slow, small amplitude) plus the bend offset, which leans the top of the blade most, like a blade flexing from its base. Row half-width carries a gentle waist shape and swells with brightness. Soft falloff is built from eight nested flat-alpha passes, wide faint violet through to a narrow near-opaque white core.
- **Breath and bloom.** Brightness is a closed-form function of time and recorded events: a breath LFO (period 18 s, phase-set so frame one sits at about 0.62 on the swell) plus decaying exponential pulses from taps and drag flares, clamped to [0.05, 1.25]. Double-tap holds record a frozen brightness value for a 3 s window that overrides the live value. The drone gain and the meter fill both read this same number.
- **Dissolve.** A 40 s cycle drives a dissolve amount: zero for most of the cycle, a smooth sine bump in the final quarter. During the bump the true blade fades while four analytic ghost copies are drawn behind it, each stretched wider horizontally and fainter, so the column smears sideways and then rebuilds as the bump falls.
- **Bend.** Drag positions become bend-target keys. Bend at any time folds those keys with an exponential approach (tau 0.55 s), so the lean follows the finger with lag and exhales back to vertical on release, when a zero target key is recorded. Fringing intensity grows with absolute bend and with brightness above the resting swell.
- **Sparkles.** Sixty caustic points with seeded positions inside the column's local coordinates; they drift on slow seeded sines, ride the column's morph and width so they stay inside it, and twinkle on seeded phases. The brightest few get a small cross glint.
- **Sound.** Lazily created on the first pointerdown, fully typeof-guarded. Two detuned low sines (46 Hz, 69.3 Hz) feed a drone gain set from brightness each frame; a looped seeded noise buffer through a bandpass feeds a shimmer gain scaled by brightness and a slow twinkle product. A compressor guards the output when available. The visuals never read audio state, so the piece renders identically in total silence.
- **House mechanics.** Canvas size comes from the Visual Viewport API with resize listeners on both visualViewport and window; the canvas CSS size is pinned in px on every draw. Phone detection uses window.screen's physical minimum dimension (< 700 px) with the tall-aspect route as a secondary path; phones get a wider column share (0.58 vs 0.40). All randomness comes from a mulberry32 seeded stream. requestAnimationFrame is typeof-guarded; frame one is a synchronous draw at t = 0.

## Adaptations and deviations

- **Gradient adaptation (as briefed).** The renderer has no reliable canvas gradients, so the blade's soft falloff is approximated by nested flat-alpha strips: eight width/alpha passes per row slice. Row count was raised to 260 with overlapping row heights during QA so the strip construction reads as a smooth glow rather than banding.
- **Fringe placement.** The prompt calls for the column drawn 3x with small offsets for the chromatic fringe. This build draws two pink fringe passes: one offset pair at the blade's outer edge, and one offset pair hugging the white core, since fringing reads strongest along the brightest edges. Offsets and alpha scale with the fringe intensity value.
- **No AnalyserNode.** The prompt's coupling of audio low-band gain to brightness is realized as one shared closed-form brightness value computed by the piece and applied to both the drawing and the drone gain, rather than measured back from the audio graph. Same number, both senses; the visual side stays deterministic and silent-safe.
- **Dissolve ghosts.** The feedback-smear dissolve is analytic (precomputed stretched copies) instead of a canvas self-draw, keeping every frame a pure function of time and recorded events.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png). Script ran cleanly in the harness with no audio present; all listeners registered (visualViewport resize, window resize, pointer handlers).
- Determinism: thumb.png rendered twice and byte-compared with `cmp` — identical, both before and after the QA tuning round. The duplicate render was deleted.
- Read-back, first round: column, white core, sparkles, and meter all correct, but horizontal row banding was visible at 110 rows and the pink fringe was too faint. Fixed by raising rows to 260 with overlapped row heights and strengthening the fringe (outer pass alpha up, plus the added core-edge fringe pass).
- Read-back, final: a violet-white light column centered on near-black at all three sizes, pink fringing tinting the falloff edges, faint ice sparkles inside the column, and the thin breath meter along the bottom filled to roughly 60 percent. On mobile the column takes the wider phone share and stays centered with nothing clipped.
