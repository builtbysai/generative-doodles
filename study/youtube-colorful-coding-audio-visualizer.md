# Colorful Coding: "Code an Audio Visualizer in p5js" (Coding Project #17)

**Video:** https://www.youtube.com/watch?v=uk96O7N1Yo0
**Author:** Colorful Coding (Instagram /colorfulcoding). Published 2021-02-28,
about 19 minutes. A from-scratch p5.js audio visualizer tutorial.
**Status:** 2026-09-25, deep. Description + chapter list read end to end, the
full p5.sound `src/fft.js` source read (analyze, waveform, getEnergy, band
ranges, smoothing semantics), and the complete recipe re-rendered in plain
canvas with a deterministic synthetic audio driver (a 100 BPM kick grid with
exponential decay envelopes standing in for real FFT data). Four frames
visually inspected at 1280x800 across one beat cycle: kick peak, decay,
next beat hit, calm.

## The recipe, chapter by chapter

0:48 Load the audio. `loadSound()` in preload, plus the gesture problem:
browsers block autoplay, so the video starts audio on a user gesture
(`userStartAudio()` / click to play). This is load-bearing in every real
deployment of this recipe. The sound never starts without the tap.

2:23 Waveform analysis. `fft.waveform()` returns the time-domain buffer,
amplitudes between -1 and 1, one sample per index. The video draws it first
as a plain line (`beginShape`, x from index, y from value): the raw
oscilloscope.

5:58 Wrap the waveform in a circle. This is the signature move and the one
that makes the genre recognizable. Map each waveform index to an angle
`i/N * TWO_PI` and each amplitude to a radius `base + value * scale`, then
draw one closed path. A boring line becomes a living ring. Radius scales
around 100-150px on a typical canvas. It reads as an organism because the
eye treats radial symmetry as a body: anything rhythmic becomes a pulse.

8:32 Create the particles. A pool of particles with angle, radial distance,
speed, size, color. Each frame their drift speed is multiplied by the
current band energy (bass energy in the video), and they respawn at the
center when they fly past the ring. Color is mapped from band or from
energy. The particles are not decoration: they are a second encoding of
the same audio, so the piece has two synchronized layers (ring = waveform,
particles = spectral energy).

13:57 Beat detection. The canonical community approach, and the video
follows it: keep a short history of bass energy (`fft.getEnergy("bass")`,
predefined range 20-140 Hz), maintain a rolling average, and fire when the
current value exceeds the average by a factor (commonly 1.3-1.4) with a
minimum time gap between beats (around 0.25s) so one kick is one beat. On
beat: spawn a burst, flash something, kick a scale parameter. My re-render
used exactly this: history of 43 frames, factor 1.32, 0.24s lockout. It
fired cleanly on the synthetic kick grid.

15:29 Responsive background. The background is not static. The video maps
bass energy to background brightness/tint, often drawn with a low alpha so
previous frames trail. This is what makes the whole screen feel like it
is breathing rather than just the ring. My re-render used a radial magenta
flash gradient with an exponential decay envelope (0.90 per frame), which
at the beat-hit frame read as a full-screen warm pulse fading to black.

## The machinery underneath (from the p5.sound source)

Worth knowing because it shapes what the visuals can honestly show:
`fft.analyze()` returns 1024 bins by default (0-255, byte frequency data),
and smoothing (default 0.8) is the Web Audio analyser's smoothingTimeConstant,
which means the spectrum is already temporally blurred before you ever see
it. `getEnergy()` is a plain average over bin indices mapped from Hz by
`index = round(freq / nyquist * bins)`. The named bands are fixed:
bass 20-140, lowMid 140-400, mid 400-2600, highMid 2600-5200, treble
5200-14000. There is nothing adaptive about it. If your track has no
sub-bass, your "bass" channel is lying. `waveform()` maps byte time-domain
data 0-255 onto -1..1, so silence sits at 0 only after the mapping, not in
the raw bytes.

## What the four inspected frames showed

Kick peak (f1): ring expanded and cyan, bass bars tall, particles still
bunched at center (they had only 1 frame of drift, a still-frame artifact,
not a recipe flaw). Decay (f18, bass=12): ring contracted to a tight
magenta circle, bass bars nearly flat, no flash, the system visibly at
rest. Next beat (f36, flash=1.00): full-screen magenta pulse, ring flared
cyan again, 14 burst particles spawned at the center. Calm (f54): flash
decay residue at 0.15, the burst particles had traveled outward and now
read as a scattered coral halo around the ring, ring tight magenta again.
The beat cycle reads as: inhale (flash + flare + burst), exhale (contract
+ drift outward + fade). The exhale is as important as the inhale; a
visualizer that only flares on beats looks like an alarm.

## What makes it sing

The ring is the whole genre in one trick: polar remapping turns a signal
into a creature. The two-layer encoding (waveform ring + energy particles)
gives the eye somewhere to rest (the ring's center) and somewhere to roam
(the drifting particles). Beat detection as a discrete event layer on top
of continuous energy gives the piece punctuation, which is what separates
a visualizer from a screensaver. Background response closes the loop: the
negative space participates, so loud feels loud everywhere.

## Overdone, and the avoid list

The exact combo (neon polar ring + spectrum bars + particles on black) is
the single most-tutorialized generative form on the internet. It is the
"hello world" of creative coding, which means it is invisible as a genre:
another cyan ring on black registers as nothing. Spectrum bars in
particular are chart junk in an art context; they explain instead of
singing. The video's own composition (ring centered, bars along the
bottom) is a dashboard, not a composition. Anything derived from this
should drop the bars, keep the polar idea, and find a second encoding
that is not particles (the seed list below goes this way).

## Technique takeaways for the sketchbook

1. Polar remapping of any 1D signal (not just audio: noise, sensor data,
   a hand-drawn curve) is a creature-maker. Cheap, always works.
2. Rolling-average thresholding is a general event detector: works on any
   streaming value to find "surprises" against a baseline. The lockout
   timer is what makes it musical instead of jittery.
3. Decay envelopes (flash *= 0.9) are how you give discrete events a body.
   Every beat visual should be an attack-decay pair, never a toggle.
4. Smoothing at the analyser level means your input is already lowpassed;
   visual responsiveness needs the raw event layer (beat detection),
   not just the smoothed energy.
