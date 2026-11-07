# №1605 Perfect Symmetry (AW6, aluan-wang #211, PP852)

Driver: one seeded signal drives both the picture and the sound, so the bands are the score and the tone is the image.

## What was built

A black stage (#08080C) with a faint grid (#1A1A24) and five horizontal staves filling 60 percent of the frame height, centered, full bleed on desktop and phone alike. Each band is one voice of a single seeded signal (layered sines plus deterministic noise, mulberry32 seed 1605001, fixed phase 20.0): band width is the amplitude envelope, fold count (2 to 7) is the spectral centroid, and a bright tone line with one bead per fold runs down the middle of each band. Colors cycle signal yellow #FFD23F, cyan #00E5FF, magenta #FF3D7F. A thin playhead sweeps a 12 second cycle. Watch-only visuals, always. Audio starts muted; one tap anywhere lazily creates a WebAudio context (oscillators at 110, 165, 220, 275, 330 Hz, the same ratios and seeded phases as the visuals, through a lowpass filter) and a further tap suspends it again. The tap toggles only the audio context; the visuals never change on tap. No visible audio UI, no buttons, no sliders. Title, gallery date 2006 · 06 · 04, and the hint "Tap once to hear it." are rendered on the page.

## Fix rounds

1. First render: composition, legibility, and phone presentation were good, but the fold beads were computed at (f + 0.5) / folds, which lands them on the band centerline instead of on the wave, so most were hidden under the tone line. Fixed to true crest positions derived from the wave phase.
2. Second render: beads sat on the line but alternated crest and trough by mistake, so half of them floated off the line. Fixed to a constant crest offset.
3. Third render: beads sat on the line on every band, but the top yellow band's beads (radius 3) were swallowed by its thicker tone line. Enlarged beads to radius 5 and re-rendered. Desktop, mobile, and thumb all verified good after this round.

## Deviations from the prompt

- Full bleed on desktop as well as phone: the prompt specifies a full-bleed composition, so the staves span the whole viewport width instead of the house rule's square-on-desktop default for centered pieces.
- Audio is five fixed oscillators (110 to 330 Hz) through one lowpass filter rather than a continuously resynthesized envelope follower; the oscillators share the visuals' seeded phases and frequency ratios, so picture and sound still come from the same signal, but the audible tone does not track the per-frame amplitude envelope.
- The playhead and the faint grid are additive framing: the grid is in the prompt palette, and the playhead marks where the score is now. Neither is a scored parameter.

## QA

- Rendered from the actual script with node-canvas at 1280x900, 390x844, and 720x720; all three inspected visually.
- Determinism: thumb rendered twice, md5 identical (f284696117310d16671bfca3324c0751).
- No Math.random, no Date.now, no shadowBlur, no gradients, no em dashes in visible copy. Every AudioContext reference is typeof-guarded; node-canvas QA (no AudioContext) renders cleanly.
- Gallery note: "Five bands play one seeded signal. Width is amplitude, folds are harmonics. Tap once to hear it."
