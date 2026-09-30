# №8949 · Ten Times Exact (2026-07-12)

Seed: 244 (Ten Times Exact, from the Deutsch speech-to-song study)

Concept: ten exact repetitions of one spoken phrase flip it into song in
the listener's head. The piece renders one speech-like motif (8 syllables,
formant-filtered sawtooth with a fixed prosody contour) into a single
audio buffer, then plays that same buffer ten times, byte for byte. Across
the ten loops the visuals quantize from a smooth pitch contour into stepped
notation on a staff. The audio never changes; a buffer checksum displayed
on every loop proves it.

Technique notes:
- OfflineAudioContext renders the motif once: sawtooth oscillators with
  per-syllable F0 from a fixed prosody array, parallel bandpass formants
  (F1/F2 per syllable), short attack/release envelopes.
- Ten BufferSourceNodes scheduled back to back, all sharing the one buffer.
  onended advances the loop counter.
- Contour model (160 samples of the known prosody) drawn with decreasing
  step count and increasing semitone snap as the loop index rises; staff
  lines and note heads fade in with the quantization factor.
- FNV-1a checksum over 4000 buffer samples, shown as "buffer cbb2bf61".
- Tap/click starts (AudioContext gesture requirement); tap replays after
  the tenth loop.
- QA: desktop 1280x800 and mobile 390x844 inspected, zero console/page
  exceptions. Thumbnail captured mid-run (loop 6/10) at 1280x720.
