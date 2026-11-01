# №1165 — Mavuel

Nick Briz study block NB6, after *Mavuel 11th* (2025) — Briz's
never-looping generative remix, an improvisation engine that leans on
a melody harder and harder until the tune has wandered somewhere
else. This piece keeps the engine and changes the tune: **the melody
is original**, a plain C-major arpeggio over I–vi–IV–V composed for
this piece as scale-degree data. Not a note of *Avril 14th* is
reproduced.

## The event stream is the piece

One seeded function, `eventAt(k)`, generates everything. Event *k* is
an eighth note at 92 BPM (~0.326 s). Its base pitch comes from the
chord of its bar (C, Am, F, G roots at MIDI 60/57/53/55) through a
fixed arpeggio pattern (root, fifth, third, fifth, root-up, fifth,
third, fifth); a companion `bassAt(bar)` sounds the chord root an
octave down at each bar line. What is actually performed is the base
event bent by the deviation factor at its moment:

- `D(t) = 0.95 · (1 − exp(−t/240))` — monotonic in playing time.
  D(60 s) ≈ 0.21, D(300 s) ≈ 0.68, asymptote 0.95.
- Pitch offset: a per-event seeded value rounded to semitones,
  scaled by `D · 5` — at one minute most notes are exact or a
  semitone out (tender, no harsh dissonance early); by five minutes
  offsets reach ±3–4 semitones and the melody is unrecognizable.
- Timing offset: seeded, scaled by `D · 0.16 s`, so the pulse itself
  starts to stagger as deviation grows.
- Dropouts: an event is silently dropped with probability `D · 0.20`
  — the texture thins as it drifts.
- Each event also carries a deviation amount (from D and its own
  offsets) that picks its color from a precomputed 24-step table
  between faithful gold `#FFD500` and drifted cyan `#00F0FF`.

Because D never decreases and every event is a pure function of
(seed, k), the performance **never loops**: no pass over the base
pattern ever sounds or looks like another. The score and the audio
scheduler read the *same* `eventAt`/`bassAt` functions, so picture
and sound cannot disagree.

## Score and interaction

- Two five-line systems (treble for MIDI ≥ 60, bass below) joined by
  a grand-staff connector, staves in `#3A2A5E` on dusk `#1A1033`
  with a faint seeded star field. Note-dots are tilted ellipses,
  each drawn as its own path; they scroll left past a fixed playhead
  at 32% of the score width, and the note currently sounding gets a
  flat white halo and outline (no shadowBlur, no gradients anywhere).
- The **deviation arc** across the top is a semicircular meter:
  background arc in staff color, progress arc swept to D(now) in
  D's own stepped color. Empty at the start, near-full and cyan
  after five minutes.
- **Starts on first tap** (autoplay policy). Before that, the piece
  sits complete and silent: the first phrase of the base melody in
  gold, arc at zero, "tap to begin" above the transport.
- **Transport** (bottom center) toggles play/pause. Pausing freezes
  the session clock, so it freezes deviation too — paused time does
  not count.
- **Tap the score** (or the "reseed" label at its corner) to reseed
  the deviation path: a new seed, the clock back to zero, the same
  base melody improvised a different way.

## Audio

WebAudio is created **lazily inside the first tap only** and is
`typeof`-guarded at every step; where it is unavailable (including
the QA renderer) the piece runs as a silent visual score. The pluck
is a triangle oscillator with a sine octave partial through a fast
exponential decay envelope (1.15 s arpeggio, 2.4 s bass) — a simple,
reliable music-box voice. A 90 ms lookahead scheduler walks the same
event indices the score draws, converting session time to context
time per note.

## Determinism and house rules

- The pre-start frame is drawn synchronously and is fixed: D = 0,
  the base phrase in gold at the playhead, empty arc, tap-to-begin
  shown; the thumb byte-compare passes on it. Post-start, the piece
  is a **session piece** by design — its state depends on when the
  visitor tapped and how long they have listened, like the clock
  pieces; there is no fixed later frame to byte-compare.
- All randomness is seeded mulberry32 keyed by string hashes of
  (seed, event index); no `Math.random` anywhere.
- Canvas size comes from the Visual Viewport API with resize
  listeners on both `visualViewport` and `window`;
  `canvas.style.width/height` are pinned in px on every draw.
  Phone detection via `window.screen` physical size (min dimension
  < 700 px) with the `h > w·1.15` aspect fallback; on phones the
  score scrolls slower, the staves tighten, and every element stays
  legible. The rAF loop is `typeof`-guarded.
- No gradients, no `ctx.filter`, no shadowBlur, no offscreen canvas,
  no ImageData, no `createElement`, no microphone. Visible text is
  only the specced affordances: "deviation", "reseed",
  "tap to begin", and the transport glyphs.
- QA: `thumb.png` rendered twice at 720×720 and byte-compared
  (`cmp` identical; the duplicate was deleted). Desktop (1280×800)
  and mobile (390×844) renders read by eye: staves with the gold
  first phrase across both systems, the empty deviation arc with
  its label, reseed at the corner, tap-to-begin above the play
  transport — all present and legible at both sizes.
