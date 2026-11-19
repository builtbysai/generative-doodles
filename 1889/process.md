# No.1889 The Parola-Canto Continuum

## Prompt
TASKS.md, study #247 beatrice-arrigoni, prompt block BA2 (PP1136): a continuous
waveform band runs the full width of the screen, morphing through four registered
states in sequence, speech, song, breath, noise. The band never stops to change
state; it melts from one into the next. Below the band a cursor word advances;
above it four state names glow in turn. The morph itself is the subject.
Interaction: watch only. No WebAudio.

## Driver
The timing map. A 40 second cycle gives each register 10 seconds, with a 4 second
crossfade centred on every boundary, so at any moment the band is either one pure
register or a two-way melt. The state weights are smoothstep envelopes of the
circular distance from each register centre, which guarantees the weights always
sum to 1 and the band never jumps.

## Mechanism
Four waveform generators, all pure functions of column index and phase time, are
sampled at 201 columns across the band and blended by the state weights:
speech is a jagged burst field (seeded hash refreshed at 7 Hz, gated by a slow
burst envelope); song is three layered sines, sustained and looping; breath is a
low-amplitude sine drawn again as three thin pale threads; noise is sparse
vertical ticks at fixed pseudo-random columns whose heights refresh at 8 Hz.
The blended centre line is stroked in the weight-blended register colour over a
soft filled ribbon of the same colour at low alpha, so a melt reads as both a
shape change and a colour change. A thin timing track with a travelling dot above
the state names shows the cycle position. The cursor word advances through ten
short invented words (velna, sorru, kellin, morath, tessiv, ondrel, faynor,
lussa, brenik, alvor) every 2.5 seconds with a 1 Hz caret. No real quoted poetry
or lyric lines are used anywhere.

## Frame one
Fixed phase t = 20 s, hard-coded. That is exactly the song to breath boundary,
so frame one shows a 50/50 melt: gold looping waves half dissolved into pale
breath threads, with SONG and BREATH glowing equally and the cursor word
"brenik". All randomness is seeded from 1889 (mulberry32 plus an integer hash);
no wall clock or random seed is read at frame one. The animation loop only
advances phase from that fixed start.

## Interaction
Watch only. There is no pointer handler, no mode selector, no click-to-reload,
and no audio: a watch-only piece cannot autoplay sound, so the prompt's
WebAudio element is omitted entirely.

## Deviations from the prompt
Canvas 2D stands in for the prompt's WebGL shader band. The four generators,
crossfade envelopes, timing map and label track are all implemented as
specified; only the rendering substrate changed, which does not alter the
visible behaviour.

## Safety
Fastest refresh in the piece is the noise tick height at 8 Hz and the speech
burst field at 7 Hz, both below the 14 Hz limit by construction. With
prefers-reduced-motion the animation loop never starts and the piece freezes
at the frame-one melt.
