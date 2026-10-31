# No.849 — Greek Chorus

EXPANSION #104 laurie-anderson, PP10 "The 1,246 Ha's". The "O Superman" mechanism: one looped syllable on a metronome, an accumulating chorus of its own echoes, two alternating near-black chords, and a deadpan litany scrolling underneath.

## Concept

A black field. At center, one large thin "Ha" in chalk white, pulsing on a rock-steady 84 BPM metronome that never varies — the loop is the floor, not the solo. Every pulse spawns a faint echo-ghost of the glyph that drifts outward and fades over 24 beats, so a pool of about 24 ghosts is always accumulating around the center: the vocoder's Greek chorus, one voice becoming many. The background alternates between two near-black shades on alternate beats — the track's two chords, rendered as tint. Across the lower third, a deadpan litany advances one phrase every 16 pulses. Dragging horizontally disturbs the chorus (tighter or looser ghost orbits); they never stop. A tap advances the litany early; a double-tap reseeds it. Sound, only after the first tap: a short abstract synthesized "ha" burst and two alternating low bass notes per beat.

## The litany (original phrases, written for this piece in her register)

1. This is the sound of one syllable, keeping time.
2. You are listening to a machine that learned to laugh politely.
3. Nobody is on the line. The line is on.
4. Hold still. The chorus is counting you.
5. A laugh, repeated, becomes a kind of weather.
6. The message repeats because the message is the repetition.
7. Somewhere behind you, a door is deciding whether to close.
8. Say it once and it is a joke. Say it forever and it is a law.

## Construction

- **Metronome model.** Period = 60/84 s, fixed. Beat index = floor(t / PERIOD); beat phase = (t mod PERIOD) / PERIOD. The main glyph's swell is 1 + 0.16·exp(−5.5·phase), a brief pulse-decay per beat. The period has no code path that changes it.
- **Ghost model.** Each ghost is a closed-form function of its spawn beat and t. A per-beat mulberry32 seed (seeded from the beat index) fixes its angle, slow tangential spin, radial speed (0.55–1.05), and size (0.26–0.42 of the main glyph's scale). Age is measured in beats; radius = 0.46·min(W,H)·(1 − (1 − age/24)^1.6)·speed·tightness, alpha = (1 − age/24)^1.7 · 0.85. Ghosts from beats before t = 0 are included, so frame one already has the chorus drifting.
- **Tightness.** Horizontal drags record {time, target} samples (target = 1 + dragDx/width·1.8, clamped 0.5–1.7; left tightens, right loosens). tightnessAt(t) evaluates the samples as a piecewise exponential relaxation (tau 0.25 s) — a pure function of the recorded samples and t.
- **Litany state.** Index = (floor(beat/16) + tap advances) mod 8, looked up in the order for the current reseed epoch (epoch 0 is the written order; each double-tap increments the epoch and applies a seeded shuffle). Raw tap times are recorded; a pair within 0.30 s is derived as a double-tap (reseed), a lone tap as an advance effective 0.28 s later — all derived closed-form from the recorded list.
- **Frame one.** draw(0) runs synchronously at load: beat 0, the Ha at full swell, six-plus ghosts already mid-drift at seeded ages, the first litany phrase in place. The animation clock is elapsed time since load (performance timestamp via requestAnimationFrame), never a wall-clock date; all state derives from elapsed t plus recorded events.
- **Audio.** Created lazily inside the first pointer gesture; every AudioContext use is typeof-guarded. Per beat, once audio exists: a sawtooth burst through a bandpass sweeping 950→480 Hz (0.2 s, gain 0.10) as the abstract "ha", plus a sine bass note alternating 55 Hz / 49 Hz on alternate beats (0.55 s decay, gain 0.14), both through a DynamicsCompressor limiter. Nothing plays before the first gesture; the visual runs silent without it.
- **House rules.** Single self-contained file, canvas 2D only, no external assets. Canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas.style.width/height pinned in px inside draw(). Phone detection via window.screen min dimension < 700 with aspect fallback (h > w·1.15). No gradients, no shadowBlur, no ctx.filter, no offscreen canvas. Strict four-tone palette: #0B0B0B, #111114, #E8E4DA, #3A3A40. Visible text is only the specced "Ha" glyphs and litany.

## QA log

- Rendered with render-piece.js at 1280×900 (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png). The piece rendered cleanly in silence (the harness has no AudioContext), confirming the guards.
- Determinism: thumb.png rendered twice and byte-compared with cmp — identical. The duplicate was deleted.
- Read-back: desktop and thumb show the near-black field, one large thin chalk "Ha" at center mid-swell, a cloud of faint "Ha" ghosts radiating outward, and the first litany line across the lower third. Mobile holds the same composition centered in the tall frame; the litany line fits on one line, nothing clipped.
- Deviations: none of substance. Two recorded choices: (1) ghosts from the 24 beats preceding t = 0 are drawn so frame one opens mid-chorus as specced (5–6 clearly visible, the rest near-faded); (2) the audio "ha" is an abstract bandpassed saw burst rather than a vocal sample, per the brief's synthesized-syllable option, kept quiet under the limiter.
