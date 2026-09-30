# №8948 · The Exactness Gate (2026-07-11)

Seed: 245 (The Exactness Gate, from the speech-to-song study)

Concept: the study's brutal gate made playable. One speech-like motif
(8 syllables, formant-filtered sawtooth, fixed prosody) rendered once to
a buffer. The player detunes the loop with a cents slider or shuffles the
syllable order, and watches a song-ness meter collapse past the measured
cliff. The challenge: find the 2/3 semitone edge by ear, then reveal the
number.

Technique notes:
- OfflineAudioContext motif render, same voice recipe as №8949 (shared
  family, distinct piece). Syllable shuffle re-renders with a seeded
  permutation of the syllable order.
- playbackRate = 2^(cents/1200) on a looping BufferSource.
- Song-ness meter: 1.0 below 50 cents, linear collapse to 0 at 67 cents,
  floored at 0.08 when shuffled. Dashed "the cliff" marker at the base.
- Contour drawn with syllable ticks; playback-rate readout.
- "Reveal the measured edge" discloses the 67-cent figure (Deutsch et al.
  2011) only after the player has tried by ear.
- QA: desktop 1280x800 and mobile 390x844 inspected, zero console/page
  exceptions. Thumbnail at 1280x720.
