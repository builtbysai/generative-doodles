# The Stage Plot Is a Collage (№1857, CK2, PP1104)

Driver: a white sheet of paper, slightly crooked on the desk, is the whole
stage plot, and the plan itself is rehearsing on it.

## Mechanism

A 2D canvas draws one slightly rotated paper sheet that fills the frame
(full-bleed on phones, a centered square on desktop). On the sheet sits a
hand-cut bubblegum-pink paper grand piano with a white keyboard, four
abstract paper cutout performers (MEL, CARLA, EDDY, GRACE) seated on small
paper chairs, pink sticky name labels, yellow tape strips, and a
hand-lettered title along the top. The performers shuffle with slow sine
sidesteps, lean into bows on a five-second cycle, and change chairs whenever
a tape-strip event lands (every 45 seconds, first at t = 15 s); the strip
that lands with the new arrangement is drawn lifted and brighter. All
motion is a pure function of a fixed phase, FRAME_T = 60.0 s, with a seeded
mulberry32 PRNG (seed 1857) for paper grain, tape placement, and letter
wobble, so frame one is deterministic: mid-shuffle, mid-bow, a tape strip
just landed.

## Palette

Hand-picked from the prompt's named colors, since the reference study file
studies/carla-kihlstedt.md does not exist in the repo: paper white #FBF8F2,
bubblegum pink #F2A0C4, pink deep #D96A9B, soft pink #F7C6DA, sticky-note
yellow #F7D54D, yellow deep #E3B93A, ballpoint blue-black #23304F, tape
cream #F0E6C8, desk ground #E8E0D0, chair cream #F5ECD4.

## Audio

WebAudio only, built lazily inside the first user gesture, never autoplay.
Each performer is a voice: MEL and GRACE are plucked strings (triangle
pairs with fast tremolo), CARLA is a bowed pad (detuned sawtooths through a
lowpass), EDDY is a breathy wind (looped noise through a bandpass). Seat
position maps to stereo pan and delay, so re-seating a performer re-mixes
the piece. A sound on/off plate sits at bottom right.

## Interaction

Drag a paper performer to a new seat and the ensemble rearranges around
them: the dragged performer takes the nearest chair, the displaced
performer takes the vacated one, and the music re-seats itself to match.
Never click-to-reload. Reduced-motion preference renders a still frame.

## Deviations

- The reference study file studies/carla-kihlstedt.md does not exist in the
  repo (404), so all hexes were hand-picked from the prompt's named colors
  and are recorded above.
- Tape-strip arrangement changes land every 45 seconds rather than every
  few minutes, so the re-seating is visible within a normal viewing session.
- The voices are continuous WebAudio models (oscillators and filtered
  noise) rather than sampled plucked, bowed, and wind instruments.
- The piano carries a small yellow PIANO label, a detail added to keep the
  cutout readable as a piano at thumbnail size.

## QA

Rendered the actual script with node render-piece.js at 1280x900 desktop,
390x844 mobile, and 720x720 thumb, and read all three renders. One fix
round: the top tape strips covered the end of the hand-lettered sheet
title, the title plate overlapped the sheet title on mobile, and the name
labels sat over the performers' heads; the tapes moved to the sheet
corners, the sheet title moved lower, and the labels moved beside the
figures. Re-rendered after the fix and verified all three sizes clean.
thumb.png is the 720x720 render of the final index.html.

A white sheet rehearses its own stage plot, pink piano and four paper
performers shuffling, bowing, and changing chairs as tape strips land.
Drag a performer to a new seat.
