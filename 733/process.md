# The Wrong Bell

No.733, EXPANSION #89 paul-ramirez-jonas, prompt block 6 "The Wrong Bell".

## Concept

After Let Freedom Ring (2023, National Mall): an arched bell tower in flat silhouette at night, seven brass bells hung in a row under the arch, and off to the right a separate, larger copper bell on its own post, inscribed with short phrases celebrating freedom. The seven bells ring the opening phrase of "My Country, 'Tis of Thee" in sequence, each swinging and flashing in turn. The phrase never completes itself. When the seven are done, the big bell sways and glows softly, offered. The viewer taps it and it swings harder than any of the others and sounds the final note deliberately out of tune. Hold the tap and the wrong ring returns, prouder. The finale never auto-rings; the viewer must complete the anthem. After the ring decays, the loop restarts. No flag literalism, no fireworks, no concert-hall tuning anywhere.

## Construction

- Scene: sky #101828, ground band #1A2233, tower and mounts in silhouette #05070D. The arch is a thick stroked quadratic over two pillars with a hang beam; the seven bells (brass #C9A227) hang from the beam across the left two thirds. The big bell (copper #B87333) hangs from its own upright post and arm at the right, visibly apart from the tower. Inscriptions (LET FREEDOM RING / LAND OF LIBERTY / FROM EVERY MOUNTAINSIDE / LET IT RESOUND) are lettered on its body in #F5F1E6, shrunk to fit the local bell width, and rotate with the bell.
- Phrase: seven notes on the contour 1 1 2 3 3 2 3 in C (261.63, 261.63, 293.66, 329.63, 329.63, 293.66, 329.63 Hz), an approximation of the familiar contour with no exact transcription claimed. Ring times are fixed at 1.2 s plus 1.55 s steps; each bell's swing is a closed-form decaying pendulum (0.30 rad, 0.85 Hz, 3.0 s decay) and its flash a closed-form decay that swaps the bell to the flash tone #F0D878 at full strength, with a layered-alpha glow behind it.
- Each of the seven bells carries a small seeded intonation offset (mulberry32, fixed seed, within plus or minus 8 cents) and a slight size variation: pleasant, never perfect, because the piece is about the flaw.
- Offer state: from 13.0 s into the cycle, the big bell sways gently (0.05 rad, 2.6 s period) behind a soft pulsing glow. The state holds indefinitely until tapped.
- Finale: a tap on the big bell during the offer starts the finale. The bell swings at 0.48 rad with a 3.4 s decay and flashes. If the tap is still held 0.45 s in, a second, prouder swing and strike are added (recorded as the proud event). At 5.5 s the cycle resets.
- Audio design (gesture-gated): the AudioContext is created lazily inside the visitor's first pointer gesture and nowhere else, via a typeof-guarded lookup of window.AudioContext / webkitAudioContext wrapped in try/catch. The seven bells' sequence rings are visual only until a gesture unlocks audio; the ring scheduler then strikes each bell as the loop crosses its ring time (sine fundamental plus 2.02, 2.74 and 5.40 partials, decaying envelopes, each bell at its seeded intonation offset). The big bell's tap is itself a gesture, so the wrong note always sounds: the expected final pitch F3 (174.61 Hz) detuned by -35 cents, plus a second oscillator 9 cents above the detuned fundamental producing a slow beat, plus detuned 2.0 and 2.74 partials; 5 s decay, 7 s and louder for the proud hold.
- Determinism: frame one is the synchronous draw at cycle t=0 with all bells still and no events recorded. All swing, flash, glow and state values are closed-form functions of (time since cycle start, recorded tap events). No Date.now, no Math.random, no offscreen canvas, no document.createElement. requestAnimationFrame is typeof-guarded; the QA renderer runs the piece as a still.
- Sizing: canvas from the Visual Viewport API with resize listeners on visualViewport and window; canvas pinned in px inside draw(); phone detection via window.screen (min dimension under 700 px) with aspect fallback only; the arch, bell row and big bell refit proportionally and the page ground is the sky tone.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png). Thumb rendered twice and cmp byte-compared identical; the duplicate was deleted.
- Frame one read back at all three sizes: night tower silhouette with arch, beam and pillars; seven still brass bells in a row; the larger copper bell at the right on its own post with all four inscription bands legible on desktop and thumb; nothing clipped on mobile (bells and inscriptions scale down, arch steepens, ground band intact).
- Forced-state checks via the inert ?seed=tNN hook (throwaway renders, read back, then deleted): t=6 shows the fourth bell mid-swing in full flash tone with a layered glow and earlier bells in residual swing; t=16 shows the offer state, big bell tilted in its sway inside the soft pulsing glow, inscriptions riding the bell.
- Grep audit clean: no Date.now / Math.random / createElement / external URLs / em dashes. AudioContext appears only as the guarded constructor lookup inside ensureAudio.

## Deviations

- The prompt's "about 24 s" loop is realized as a 13 s sequence plus an offer state that holds until the viewer taps, since the prompt also requires that the finale never auto-ring; the cycle length is therefore set by the viewer, and the 24 s figure holds for a prompt tap.
- The seven bells' rings are silent flashes until the visitor's first gesture unlocks audio (house gesture-gating rule for loop-triggered sound). The finale is tap-triggered, so it always sounds.
- The expected final pitch is set to F3, the note the phrase leans toward, lowered an octave class for the larger bell's size; the -35 cent detune and beating partner follow the prompt's model.
