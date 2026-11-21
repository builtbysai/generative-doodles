# №1935 The Arrangement Grid

Prompt block: CH8 / PP1182, study #252 chris-hyson.

Driver, in one sentence: a DAW timeline of one fermenting mix, 2017 to 2023, where a pale white playhead dragged across the years lights up the arrangement as it stood then, with stems present, muted, or absent, and the latest year still labeled a mix in progress.

## Palette

The study file studies/chris-hyson.md does not exist in the repo, so hex values are hand-picked from the prompt's named colors: DAW dark grey ground #24262a with lane ground #282b2f, piano ice blue #8fc3e8 with border #b7d9f2, drum charcoal #5c6067 with border #8b8e95 (lightened from true charcoal so it reads on the dark ground), vocal warm gold #d9a441 with border #eec27a, synth deep teal #21756d with border #3f9a90, playhead pale white #f2f0e8, plate ink bone #e8e6df with muted ink #9a978c.

## Mechanism

- Year-keyed arrangement model. Each stem carries a state keyframe per integer year 2017 to 2023 (1 present, 0.35 muted, 0 absent), interpolated linearly between years so the mix cross-fades while scrubbing instead of snapping to a beat:
  - piano figure: 1, 1, 0.35, 1, 0.35, 1, 1
  - drum loop: 1, 0.35, 1, 1, 1, 0.35, 1
  - vocal: 0, 0, 1, 0.35, 1, 1, 0.35
  - synth bed: 0, 0, 0, 0, 1, 1, 1
- Clips are regions with year spans (piano 5, drum 5, vocal 4, synth 2). A clip is live while the playhead year falls inside its span, fading in and out over 0.12 years at each edge; outside its span it stays visible as a faint ghost at 0.09 alpha, so the whole timeline reads as a DAW while the playhead's year lights up the live arrangement. Clips sharing a group number reuse the same waveform pattern: the region was duplicated, not re-recorded (piano clips 1 and 3, drum clips 1 and 3, vocal clips 1 and 3, both synth clips).
- Live clips carry waveform ticks inside, shimmering slowly with t, and drift vertically by a slow sine of t (under 2 px) with a fixed phase per clip, so no two visits look identical. Muted live clips get a diagonal hatch so the mute reads even where the color is dim.
- Lane labels name each stem with its origin year in small type (piano figure 2015, drum loop 2017, vocal 2019, synth bed 2021). A state dot beside each label shows the stem's state at the playhead year: filled when present, dimmed when muted, hollow when absent.
- Year ticks 2017 to 2023 run along the top edge of the grid. The readout at top right always shows the playhead year plus "mix in progress": the latest year is never a finished state.
- Interaction: drag horizontally anywhere on the canvas to scrub; the playhead maps drag x to a year in 2017 to 2023. No click-to-reload, no other interaction.
- Audio: visual only, no WebAudio. A drag-to-scrub piece cannot autoplay sound, and the prompt's reward is revisiting the ferment, not hearing a soundtrack.

## Determinism

- FIRST_T = 12. Fixed phase state at frame one: t = 12, playhead at year 2020, mid-ferment. At 2020 the piano and drum are present, the vocal is muted, and the synth bed has not arrived yet, so all three stem states read at frame one. The piano clip 2019.7 to 2021.2, the drum clip 2019.4 to 2020.6, and the vocal clips 2019 to 2020.1 (live) and 2020.1 to 2021.3 (fading in) are the live arrangement.
- Seeded PRNG mulberry32(1935) for clip drift phases and waveform patterns. Every frame is a pure function of t and the playhead year.
- All motion runs under 1 Hz, well under the 14 Hz ceiling. prefers-reduced-motion freezes the drift at the first frame; dragging still scrubs.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. No clipped text, no plate collisions, year ticks clear of the title plate, stem labels legible at thumb size, hint legible on all three sizes.
- Interaction probe via query params: ?year=2017 renders the frame with the playhead at 2017 (render-piece.js passes its seed argument as ?seed=, and a four-digit seed in 2017 to 2023 is read as the probe year too). Probe renders at 1280x900: default (2020) md5 937076e1ab2481534dcc35390c1cbe08, ?year=2017 md5 2ebe96f558392fb51484b20fd8de8c92, ?year=2023 md5 a65e021b4252b229cb6429c870131fb8. The probes differ from the default and from each other, so the drag changes pixels; the 2017 probe shows only piano and drum live, the 2023 probe shows all four stems live with the vocal still muted and the readout still "mix in progress".
- Determinism: a second 720x720 render is byte-identical to thumb.png (md5 ded42c469fab79833f981a58e0304e4b).
- No em dashes in visible copy or in this file.

## Fix rounds

1. First render: the playhead line started at the top of the header and struck through the year label under it ("2020" with a white line through the middle). Moved the line to start at the ruler itself and put the handle triangle on the ruler, so no year label is ever crossed. Clean on all three sizes after this round.

## Deviations from the prompt

- The prompt names the stems with origin years 2015, 2017, 2019, 2021 while the timeline runs 2017 to 2023; the piano figure therefore predates the visible timeline, and its first clip starts at 2017 as the earliest visible region.
- Ghost clips for regions outside the playhead year are an invented staging device: the prompt says regions are "left alone for months" and the grid is the canvas, so the faint ghosts keep the full timeline visible while the playhead's year stays the live arrangement.
- The state dots, the "one fermenting mix" sub-line, and the muted hatch are added as legible labels for the stem states; the prompt does not ask for them, but they make the scrub readable at frame one.

## Known warts

- The drum charcoal clips read darker than the other stems by design; on the dark ground they are the quietest blocks, and their border is what separates them from the ghost clips.
- At 2020 the second vocal clip (2020.1 to 2021.3) is only just fading in, so it reads dimmer than its neighbor; that is the handoff between regions, not a rendering fault.
- On phones the clip region is about 290 px wide for six years, so the narrowest clips are about 35 px wide; their waveform ticks are sparse but still legible.
