# №518 — Bus of Faces

EXPANSION #62 giulia-pastorino, prompt GP6. After her "Quando sarò grande" school bus.

## Concept

One giant yellow school bus rolls slowly across a cream ground, forever, passing a dark green crayon edge. Every window holds a tiny passenger face drawn from Pastorino's four-variant grammar: two dot eyes with a smile, one big eye with a flat mouth, sleepy arc eyes, or a surprised O mouth. No two neighbouring windows ever show the same face. Down the body, big hand-drawn crayon letters spell one invented word, **ZUVIK**, each letter in a different colour, with a ribbon squiggle running underneath. Touch a window and that face leans out and looks around for two seconds before settling back. Double-tap reseeds: a new invented word and a new set of faces.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no audio, no microphone.
- Palette is exactly the prompt's: bus yellow #F2B705, cream #F7F2E4, green edge #2A6B3A, wheels dark grey #3A3A3A, letters from #E6392B / #2B4FB0 / #F0608E / #2AA6A0 / #8A5FB0. Flat fills only, no gradients anywhere. Crayon texture is precomputed seeded hatch/speck arrays (ground grain, body grain, green hatch) drawn directly each frame, since the QA renderer has no offscreen canvas.
- The bus is a rounded-rect body, 75% of the stage wide, with five windows and exactly three wheels. Each wheel hub is a 6-ray asterisk that rotates with the distance travelled, so the roll and the hub spin stay locked together.
- Letters are hand-drawn glyph paths (unit-box polylines with slight wobble), stroked twice with a small offset for crayon body, with per-letter seeded jitter and rotation. Letters sit in a band below the windows and never overlap them.
- Invented words come from a pre-vetted list of 5-letter coinages (ZUVIK, FRULO, TOZMI, KUDRA, PELVO, NARZU, BAVEN, WODEF) so a reseed can never spell a real word; the shipped seed 518006 spells ZUVIK. Five letters means all five letter colours are used exactly once per word.
- Faces are chosen with a seeded generator that forbids equal neighbours. Each face blinks on its own timer; blink phases are computed so every eye is open in frame one. The sleepy variant is already closed-eyed, so it does not blink.
- Motion: the bus crosses on a 42-second cycle and wraps seamlessly (drawn at three offsets so the wrap has no pop). It never stops. A window touch hit-tests both wrap copies; the leaning face is drawn unclipped over the frame with a 2.4s envelope (out in 0.25s, look-around wiggle, back by 2.4s).
- House rules: canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas pinned in px inside draw(); phone detection via window.screen physical size (min dimension < 700px) with aspect fallback; square composition keeps its shape on phones over the cream ground.
- Determinism: frame one is drawn synchronously at the constant phase PHASE0 = PERIOD/2, the moment the bus sits centred and fully in frame, all faces at rest. The rAF loop (typeof-guarded) is anchored as PHASE0 + elapsed; no clock value feeds frame one. Seeded RNG is mulberry32 throughout.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and `cmp` byte-compared — identical. Re-verified after the seed change; the second render was deleted.
- Desktop/thumb read-back: yellow bus centred on cream, green crayon edge at the right; five windows, each with exactly one face (sleepy, one-eye, two-dot smile, sleepy, one-eye — all neighbours different); ZUVIK in blue, teal, red, violet, pink along the body, clear of the windows, teal ribbon squiggle beneath; three wheels with 6-ray asterisk hubs; nothing clipped.
- Mobile read-back: square stage letterboxed on the cream ground, whole bus in frame, letters and faces legible, only the intended full-bleed green edge touches the frame side.
- First candidate seed spelled WODEF (also invented, but not the documented word); seed was changed to 518006 so the shipped piece spells ZUVIK as recorded here.

## Deviations

- The word list is a fixed vetted pool rather than freely generated letter strings. Reason: a free generator could eventually spell a real word in some language on a reseed, and the prompt forbids real words; the pool keeps every reseed safe while still giving a new word per double-tap.
- The bus carries five windows on every seed (the prompt allows 4-6). Reason: five windows pair exactly with the five-letter words and five letter colours, keeping the composition balanced at all sizes.
