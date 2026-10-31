# No.848: Gesture Scrubs the Buffer

EXPANSION #104 laurie-anderson, PP9 "The Tapebow". Anderson's 1977 tape-bow
violin replaced horsehair with a strip of prerecorded magnetic tape and the
strings with a playback head, so the bowing gesture itself became playback:
speed and direction of the bow are speed and direction of the recording.

## Concept

A dark stage. One long graphite tape strip runs across the mid-line carrying
a single recorded sentence rendered as a chalk waveform glyph. A slim
bow-handle stands at the strip's left end, its contact point glowing rosin
amber. The visitor drags the handle along the strip and the gesture scrubs
the sentence: the waveform stretches or compresses around the playhead, a
spotlit read-window tracks the span currently "sounding", and dragging
across the strip bends the pitch. The visitor controls playback only, never
content: the sentence cannot be edited, only played.

The recorded sentences (fixed content):

- Sentence 1: "I want to tell you a story about a story."
- Sentence 2: "This is the picture of a man and a woman, talking."

TAP toggles between the two recorded sentences. DOUBLE-TAP reseeds the strip
from a small pool of original deadpan lines in Anderson's register:

- "Here is a picture of the sky. The sky is also a picture."
- "He said: say something. So I said: something."
- "This is the sound of one hand. It is not clapping."
- "Once there was a man who collected Tuesdays."
- "The dog is dreaming. The dog is the only one who knows."

## Construction

Single self-contained canvas 2D page, strict five-tone palette (stage black
#0A0A0A, spotlight white #F5F2EA, tape graphite #2A2A2C, waveform chalk
#EDE8DC, rosin amber #C98A2B). No audio, no microphone.

FULLY VISUAL CHOICE: the prompt sanctions two builds, a WebAudio buffer
scrubbed by playbackRate, or "a fully visual version: the waveform glyph
stretches/compresses as the handle moves." This build is the fully visual
version. The gallery pieces are silent, and the QA renderer has no
AudioContext, so the scrub is expressed entirely in the waveform's geometry.
No sound code exists in the piece.

Waveform: each sentence gets a seeded speech envelope (mulberry32 keyed by a
hash of the sentence text plus a generation counter). One Gaussian bump per
syllable-ish unit of each word, laid out in proportion to word length, shaped
by a smooth seeded value-noise curve. The glyph is a fine carrier sine whose
amplitude follows that envelope; the envelope is data, regenerated only when
the sentence changes.

Warp model: pointer drags are recorded as samples (time, strip position,
perpendicular offset). Everything drawn is a closed-form function of those
samples and the piece clock:

- Velocity v is a smoothed derivative of the recorded positions while
  dragging, and decays as v * exp(-dt / 0.45) after release.
- Stretch s = clamp(1 + 1.6v, 0.30, 3.20). Each display column samples the
  source at srcU = p + (dispU - p) / s around the playhead p, so a fast
  forward bow stretches the wave thin around the contact point, a reverse
  bow compresses it, and a backward scrub (v < 0) also mirrors the wave and
  dims it, the reversed shading. Amplitude relaxes by 1 / sqrt(s) while
  stretched.
- Pitch bend: the perpendicular offset q (pointer distance from the strip
  centerline, normalized) maps to pitch = clamp(1 + 0.9q, 0.30, 2.20), which
  scales the carrier frequency and adjusts amplitude by 1 / sqrt(pitch). q
  decays as exp(-dt / 0.60) after release.
- Read window: a spotlight band of half-width 0.030 + 0.055 * min(1.4, |v|)
  around the playhead with amber edge lines; columns inside it draw in
  spotlight white at higher alpha.
- A rosin trace of fading amber dots follows the last 0.6 s of drag path.
- Idle state is a very slow tape shimmer: the carrier phase advances as
  1.4 * t, a closed-form function of t only.

Interaction details: a press shorter than 0.30 s with under 7 px of travel
is a tap; the sentence toggle is deferred 320 ms so a second tap inside
0.35 s cancels it and reseeds instead. Dragging anywhere moves the handle to
the pointer; the handle is the playhead.

House mechanics: canvas sized from the Visual Viewport API with resize
listeners on both visualViewport and window; draw() pins canvas.style
width/height in px every frame; phone detection via window.screen physical
size (min dimension < 700 px) with the h > w * 1.15 aspect fallback only;
the contact glow is layered flat-alpha discs, no gradients, no shadowBlur,
no ctx.filter, no offscreen canvas. Frame one is the synchronous draw(0) at
rest: handle at the left end, contact glowing, sentence 1's waveform
unstretched, sentence in small chalk type under the strip. Animation runs
through a typeof-guarded requestAnimationFrame loop anchored to a
performance.now start stamp; no Date.now anywhere.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). All three
  read back: black stage, graphite strip with chalk waveform, bow-handle at
  the left end with amber contact glow, sentence in chalk type below the
  strip, read-window edges visible at the handle. Nothing clipped on mobile;
  the long sentence fits one line at every size (font auto-fits by
  measureText).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp:
  identical. The duplicate render was deleted. Re-verified after the tuning
  pass below; still identical.
- Tuning pass: the first mobile render aliased the 110-cycle carrier into
  isolated full-height spikes (about 1.6 samples per cycle at phone width)
  and the envelope tailed off early. Carrier reduced to 84 cycles, each
  column now averages the carrier across its own source span, and the
  envelope layout widened (start 0.028, usable span 0.95). Re-rendered all
  sizes; spikes gone, waveform reads as one continuous speech glyph.
- Deviations: (1) fully visual build instead of the WebAudio buffer version,
  the prompt's own sanctioned alternative, for the reasons above; (2) tap
  toggles strictly between the two recorded sentences, while double-tap
  reseeds from the printed pool, so the two recorded lines always remain the
  tap pair; (3) dragging anywhere on the stage bows (the handle follows the
  pointer) rather than requiring a grab exactly on the grip, which keeps the
  gesture usable on phone screens.
