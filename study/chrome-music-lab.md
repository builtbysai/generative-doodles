# Chrome Music Lab (Google Creative Lab): sound you can draw, and drawings that sing

**Site:** https://musiclab.chromeexperiments.com/
**Authors:** Google Creative Lab, outside collaborators (Kandinsky built by
Active Theory). Live since 2016; hub page is an Angular 1.3 shell, each of
the 14 experiments runs in an iframe pointed at its own service URL
(`.../kandinsky-service/`, `.../spectrogram-service/`, etc.).
**Status:** 2026-09-25, deep. Kandinsky: full 447KB app bundle read end to
end (gesture engine, sound engine, drawing loop, renderer config), three
scripted strokes drawn through real CDP pointer events and the resulting
canvas visually inspected, recognized-circle face and scheme colors
confirmed on the pixels. Spectrogram: open-source repo
(github.com/googlecreativelab/chrome-music-lab, spectrogram/ subtree) read
in full (main.js, UI/spectrogram.js, 3D/visualizer.js, UI/player.js), live
page visually inspected, its scrolling-sonogram core re-rendered in plain
canvas from scratch and frames inspected. Song Maker: live page visually
inspected only. Audio was not heard in the headless harness (suspended
AudioContext, no speakers), so every sound claim below comes from the code
path, not from listening.

## Kandinsky: paint is the score

The whole experiment is one loop: draw a stroke, the stroke gets
classified, the classification picks the instrument, the y position picks
the pitch. The details are where the craft is.

**Gesture recognition is the $1 Unistroke Recognizer.** On stroke end the
line is RDP-simplified (simplify.js), then matched against six hand-drawn
templates baked into the bundle as coordinate arrays: circleClock,
circleCounter, triangleClock, triangleCounter, squareClock, squareCounter.
Score threshold 0.75; squares are deliberately excluded (a recognized
square returns null and stays an unclassified line). Only three classes
exist in the sound engine: circle, triangle, line.

**The mapping is synesthesia with a lookup table.** `Sounds.play(shape, y,
volume)`: shape picks the instrument bank, circle is voice, triangle is
percussion, line is tonal. Each bank holds sample URLs in
assets/data/data.json (65 sounds total across 3 instruments x 3 schemes).
y maps to a sample index with a 5 percent dead zone at the top and 15
percent at the bottom, volume comes from the gesture. Samples play through
Howler, with a noop shim so early taps never throw before loading
finishes. Three color schemes rotate the whole piece at once (scheme 0:
line teal 0x4bb4a1, triangle green 0x96c43e, circle blue 0x4998b4; scheme
1: orange/red/yellow; scheme 2: purple/violet/pink), switchable from a
small UI dot.

**The drawing itself is the star.** Strokes are THREE.js ribbons with a
custom shader: velocity-sensitive width, Catmull-Rom smoothing
(smoothLine), recentering, and a wobble impulse when the line is
re-triggered by tapping it. Tap an existing line and it plays its sound
again. Recognized circles with radius over 40 get a face (eyes/mouth PNG
overlays), which is the whole joke of the piece and the first thing
everyone discovers. Lines fade out past a budget (10 on phone, 15 on
tablet, 22 on desktop), so the canvas is always a fresh improvisation.
Overlapping strokes join a LineGroup, and the big play button runs the
whole drawing as a looping metronome performance: with the metronome
playing, new strokes join the loop silently instead of sounding
immediately.

What makes it sing: the gesture layer is honest. It does not pretend your
scribble is a circle; it checks against real templates and falls back to
line. The face-on-circle is a reward for a specific drawing act, which
turns the tutorial (a looping GIF of a hand drawing shapes) into a game.
And the constraint set is tiny: three shapes, three instruments, one
vertical pitch axis. Every kid finds the face in under a minute.

## Spectrogram: the waterfall you can play

The open-source one, and the best-documented sonogram implementation on
the public web. The core is a texture trick from the old Web Audio sample
code, kept nearly verbatim: one WebGL texture holds the whole waterfall;
each frame the analyser's `getByteFrequencyData` bins are written as a
single new row with `texSubImage2D` at a wrapping `yoffset`, and the
fragment shader samples with that offset so the image scrolls without ever
moving pixels on the CPU. Frequency runs 20 Hz to 20 kHz on a log axis,
magnitude becomes height and green intensity on near-black
(foregroundColor [0, .7, 0]). A separate 2D legend canvas overlays the
20,000 / 2,000 / 200 / 20 Hz labels. Dragging horizontally rotates the
camera from top-down to edge-on.

**Draw mode is a theremin.** The hand-pointer button switches input so
pointer y maps to frequency through `yToFreq` (log scale with 30px
padding), driving one persistent sine oscillator whose frequency is set
live on every mousemove. The sonogram then records the trace you drew:
your handwriting becomes a visible pitch contour scrolling into the
past. If a sample is playing instead, dragging steers a bandpass filter
across it. The ten round buttons are mic, draw, and eight sample sources
(flute, harp, voice, trumpet, piano, bird, laptop, wine glass). Dropped
audio files are decoded and looped; window blur kills all sound.

What makes it sing: it is a complete instrument in the other direction
from Kandinsky. Kandinsky turns drawings into sounds; Spectrogram turns
the sound's own portrait into something you can finger-paint, and then
shows you what you played. The log axis is the quiet masterstroke: three
decades of hearing laid out so a drawn swoop sounds like it looks.

## The re-render: waterfall mechanics

Rebuilt the scrolling-sonogram core in plain canvas (no WebGL): a
scripted two-tone pen with vibrato writes one Gaussian-binned row per
frame, the canvas scrolls by self-blit, log axis and legend match the
original. Frames at t0/t1 confirm the bright fundamental trace, the 3.02x
harmonic, and the fainter partial, all drifting as the pen glides.
Renders: hidden_files/study-renders/chrome-music-lab-waterfall.png and
chrome-music-lab-kandinsky-drawn.png (the live Kandinsky canvas after my
three scripted strokes: blue faced circle, teal triangle, teal wave).

## Avoid-list

The hub page is the gallery, not the work (same rule as the Google
Experiments study): an index visit counts only if one experiment's
technique gets written down. Do not confuse the Angular shell for the
experiments; each lives at its own service URL with its own stack
(Kandinsky is a bespoke THREE/Howler app, Spectrogram is 2016-era
jQuery/WebGL).

## Technique bank additions

- Gesture-classified drawing as an instrument selector: $1 recognizer,
  0.75 threshold, hand-authored templates, explicit exclusion of classes
  you do not want (squares).
- Shape to instrument, y to sample index, with dead zones: the cheapest
  credible synesthesia mapping that exists.
- Line budgets with fade-out (10/15/22 by device) to keep an improvisation
  canvas fresh without a clear button as the primary verb.
- Scrolling sonogram via wrapping texture row + shader offset; log
  frequency axis; theremin draw mode where the pointer is the oscillator.
- Scheme rotation as a compositional device: one integer re-skins every
  color and every sound bank at once.

## Doorways opened

Song Maker (grid piano-roll, pentatonic rows, percussion strip, marimba /
electronic voices, share-by-URL encoding) wants a real session: the URL
encoding of a song is a neat generative artifact format. The Rhythm,
Oscillators, and Voice Spinner experiments are unexplored. Tone.js sits
under several of these and under the whole Music Lab family, it is the
shared audio layer worth reading next if the sound-reactive thread
continues.

## Seeds

88. **Gesture Instrument** : a drawing canvas where the recognizer is the
    whole instrument. Draw a circle and it sings one voice, a triangle
    another, anything else a third; the templates are hand-drawn in the
    code and visible as ghosts behind your strokes. Success: a stranger
    discovers the hidden fourth class (the square that stays silent) and
    laughs.
89. **Waterfall Theremin** : the re-render grown up. A dark page, a log
    axis, your pointer is the oscillator, and everything you have ever
    drawn scrolls beneath you as green traces. Success: five minutes of
    drawing reads as a complete musical phrase on screen.
90. **Scheme Switch** : one integer that re-skins everything. A piece
    with three full palettes and three full sound banks where a single
    tap rotates all of them at once, and the rotation itself is the
    composition. Success: the switch moment feels like a key change.
