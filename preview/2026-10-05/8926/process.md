# №8926 — Spectrogram - process notes

## Concept
FUTURE_PIECES.md seed 95 ("Spectrogram Instrument": PIXELSYNTH grown up). Draw a
picture, hear it as a looping chord: x is time, y is pitch, brightness is
loudness, a bank of WebAudio oscillators under the hood. Success: a drawn
diagonal sounds like a glissando and reads as one on the screen. The DRAWING IS
THE SCORE. Deliberately distinct from №8991 (keyboard of print motifs) and
№9011 (audio-reactive agents): here the user composes the music by drawing it.

## Construction
- Single self-contained index.html, no libraries, canvas 2D + WebAudio.
- Score model: a 144x192 column-energy grid (time x pitch) is the source of
  truth, updated on every draw/erase stamp. Two offscreen layers (crisp stroke
  + wide soft glow) are painted per stroke and rebuilt from the grid on resize,
  so the drawing survives viewport changes.
- Playhead loops left to right every 4000 ms. Each frame, the current column's
  energy is quantized per note; up to 24 voice slots (triangle osc + gain each)
  take the loudest notes. Pitch: log-mapped, quantized to A minor pentatonic
  A2..A5 (110 Hz base, 16 degrees). Amplitude from cell energy.
- Click-free audio: oscillators run continuously; only gains/frequencies move
  via setTargetAtTime (tc ~0.02-0.025). Master chain: voice bus -> lowpass
  3.4 kHz -> compressor -> destination, plus a 0.27 s feedback delay send for
  space. Tab-hide mutes all voices (no stuck drone).
- Audio starts OFF; no AudioContext exists until a user gesture. The "sound
  off/on" button is prominent in the footer; the first canvas stroke also
  enables sound (an explicit tap gesture). Visuals run fully with sound off:
  sweeping playhead, pitch ruler, glowing strokes.
- Left edge: pentatonic pitch ruler (A/C/D/E/G labels, A2..A5). Sounding notes
  glow as dots on the playhead, radius by amplitude.
- Controls: sound on/off, new score (seeded regenerate), eraser toggle, clear.
  Seed shown as "score № NNNN". Interaction convention for this interactive
  toy: canvas taps draw (they never regenerate); the "new score" button is the
  dedicated regenerate control.
- Default state: seeded demo composition (seed 8926): ascending glissando
  diagonal, arpeggio staircase, chord stacks, one lyrical line (melody arc or
  descending answer, never both), bass line, sparse high sparkles. "new score"
  mints a fresh seeded composition (mulberry32).
- No em dashes in title/copy, no date strings, no absolute URLs, viewport meta
  present, theme-color set. Fits 1280x800 and 390x844 with no scroll/overflow
  (flex column, 100dvh, wrapping footer, compact mobile header).

## Seeds tried
- 8926 (default, kept): melody-arc variant; diagonal + staircase + arc + 2-3
  chord stacks + bass + sparkles. Reads clean, strong glissando signature.
- 4173: descending-answer variant; dramatic X of the two diagonals, very clean.
  Runner-up; the arc version won as default because the diagonal stays the
  undisputed signature gesture.
- 12047: render attempted via the eval harness before the seed-page workaround;
  superseded (see below). Not judged.
- Random seeds via "new score" (e.g. 45372 in the click test): compositions stay
  musical across seeds (quantized gestures, bounded density).

## Variants
- v1: per-segment stroke painting (each polyline pair stroked separately),
  dense composition (arc AND descending diagonal, up to 4 chord stacks,
  width 7-12). Problems on inspection: translucent glow passes beaded at every
  joint (pearl-string look on curves), and the composition was visual mush -
  too many wide glowing gestures colliding.
- v2 (final): polylines painted as ONE path per layer (beading gone); thinner
  strokes (5.5-8.5); composition thinned (arc XOR descending diagonal, 2-3
  chord stacks); setPointerCapture wrapped in try/catch (synthetic-event
  safety); debug hook gained live maxGain for the voice-drive check.

## Screenshots (all viewed at full size)
- /tmp/8926_v1_desktop.png - v1 desktop: beading + clutter visible, rejected.
- /tmp/8926_v1_mobile.png - v1 mobile 390x844: layout OK (no overflow, buttons
  wrap, hint hidden), same v1 drawing flaws.
- /tmp/8926_v2_desktop.png - v2 desktop: smooth strokes, legible gestures,
  playhead mid-sweep with sounding dots. Approved.
- /tmp/8926_seed_a.png - seed 4173 comparison render.
- /tmp/8926_thumb_src.png - thumb candidate, playhead at ~83%.
- /tmp/8926_thumb_src2.png - thumb candidate, playhead at ~62% with dots lit
  on chord stack, arc, and diagonal. Chosen as thumb.png.

## QA
- cdp_exceptions.py (Runtime enabled before navigation, continuous collection):
  desktop 1280x800: OK, exit 0, no exceptions/errors.
  mobile 390x844: OK, exit 0, no exceptions/errors.
  Both with audio off, as required.
- Audio smoke test (/tmp/8926_audio_test.py, CDP clicks on port 9343,
  --autoplay-policy=no-user-gesture-required):
  initial state soundOn=false, ctxState "none" (no AudioContext before gesture):
  PASS. Sound button click -> ctxState "running", 24 voices: PASS. Synthetic
  pointer stroke registers in grid (gridMax 1): PASS. Eraser toggle, clear
  (gridMax 0), new score (seed 45372, gridMax 1): PASS. Sound off/on toggle
  cycle: PASS. Zero exceptions/console errors throughout: PASS.
- Voice-drive check: sampled __spectrogram.debug().maxGain over a full 4 s
  loop after enabling sound: [0.05, 0, 0.0358, 0.0583, 0.0377, 0.069] - voices
  audibly engage and release as the playhead crosses strokes (the 0 sample is a
  sparse column): PASS.
- Note on the eval harness: cdp_shot_eval.py navigates to file:///tmp/seed.html
  first; it must exist or the location.href hop never happens (first two seed
  renders hit ERR_FILE_NOT_FOUND until /tmp/seed.html was created). Test-only
  issue, not a page bug.

## Why v2 won
v1 failed the quality bar on pixels: beaded strokes and a cluttered default
score. Rather than re-seeding around the flaw, v2 changed the approach -
single-path polyline painting (structural fix for the beading) and a thinned,
either/or composition grammar (arc XOR descending answer). The final render
was judged at full size on desktop and mobile: the glissando diagonal reads
instantly, the staircase/chords/arc are each legible, the playhead and lit
sounding notes make the time axis readable, and the layout holds at 390px.
Audio verified end to end with zero console errors. Shipped as final, not
rejected.
