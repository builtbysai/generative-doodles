# No.741 Goldberg Fixtures

EXPANSION #90 spencer-finch, prompt block 6 "Goldberg Fixtures": a row of vertical fluorescent fixtures lights in sequence as a two-voice generative melody plays. Each note's color comes from Newton's fixed note-to-color wheel, each note's duration sets how long its fixture glows, left-hand voice on the left, right-hand voice on the right. The light is the music; there is no audio.

## Concept

Fourteen tall thin fixtures stand in one row on near-black: seven for the left voice, seven for the right, one fixture per pitch class (C D E F G A B) in each bank. A slow generative two-voice melody, original to this piece, plays continuously. When a voice sounds a note, the fixture for that pitch class in its bank warms up in Newton's color for the note (C red, D orange, E yellow, F green, G blue, A indigo, B violet) and cools down after the note's duration ends, the way a real fluorescent tube warms and cools rather than snapping. Fixtures idle dark between notes. A small readout at the bottom names the current variation, 1 to 30, advancing at every phrase boundary. Tap a fixture and its voice takes the next phrase solo while the other bank rests.

## Construction

- Melody generator: per voice and per phrase, a mulberry32-seeded diatonic random walk over two octaves of the C-major scale. Steps are weighted stepwise (mostly plus or minus 1, sometimes 2, rarely 3, rarely a repeat) with range folding at the ends. Durations are drawn from 0.5 to 3 beats at one beat per second (about 60 bpm), filling a 32-beat phrase that opens with a half-beat of rest. A note's pitch class (degree mod 7) selects the fixture and the Newton color; its duration sets the hold time.
- Timeline: the performance is a chain of 32-second segments, one phrase per voice per segment. Segment k carries variation number (k mod 30) + 1; every 30 segments the phrase-seed cycle advances and the variation count restarts at 1. Segments are generated lazily in time order from per-segment seeds, so the brightness of every fixture at time t is a pure function of t plus the recorded tap events. No state is integrated frame to frame.
- Envelope: attack 0.08 s smoothstep warm-up, full hold for the note's duration, then a 0.6 s smoothstep cool-down. A fixture's brightness is the max over its currently sounding notes.
- Solo: a pointer tap hit-tests the fixture slots and records a solo event for that voice. The event is consumed by the first segment that starts after the tap; in that segment only the tapped voice's phrase plays.
- Rendering: canvas 2D only. Each fixture is a dark housing (#1A1C20) with end caps and a dark glass tube (#0B0C0E) that fills with the note color as brightness rises. Glow is three layered alpha strokes of the note color at increasing width and decreasing alpha behind the tube; no gradients and no shadowBlur anywhere, per the house rule. Palette is strict: the seven Newton colors, housing, and ground only; the readout is set in the E yellow at reduced alpha.
- Sizing: Visual Viewport API with resize listeners on visualViewport and window; the canvas style width and height are pinned in px inside draw(). Phone detection uses window.screen (min dimension under 700px) with the aspect fallback (h > w times 1.15); on phones all 14 fixtures stay in one row, thinner.
- Determinism: frame one is a synchronous draw at t = 0, during the opening half-beat rest, so the row is dark with the first note about to warm. Playback time comes only from requestAnimationFrame timestamps anchored at the first frame, and requestAnimationFrame is typeof-guarded. No Date.now, no Math.random, no audio, no external assets.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and cmp byte-compared; the two renders are identical. The duplicate was deleted.
- Desktop frame one: 14 dark vertical fixtures in one row on near-black, a wider gap splitting the two voice banks, readout "VARIATION 1 OF 30" at the bottom. Matches the specced frame one.
- Mobile frame one: all 14 fixtures present in one thinner row, nothing clipped, readout legible.
- Lit state verified with a state-forced throwaway render through the piece's inert ?seed=tNN hook (t = 6.3 s, mid-phrase): three fixtures glowing in Newton colors, an indigo A and a cooling violet B in the left bank and a full-brightness violet B in the right bank, each with layered halo. Colors match the note mapping exactly; no rainbow cycling. The throwaway render was deleted after inspection.
- Deviations: (1) Glow is built from layered alpha strokes instead of a gradient or shadowBlur, per the house rendering rule; the warm halo read is unchanged. (2) The variation readout reads "VARIATION N OF 30" rather than a bare number, to name what the number counts; it remains the only text in the piece besides the title. (3) The phrase grid runs at exactly one beat per second, fixing the prompt's approximate 60 bpm so the schedule stays a closed form.
