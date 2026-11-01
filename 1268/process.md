# №1268 "Complex Silence" (sdk-forsale SF5, PP427)

## Prompt

Sammy Seung-min Lee's *Complex Silence* (2026): a nine-foot microphone
that reverses its function, emitting only faint Korean soundscapes and
self-reflections instead of amplifying. Tapping near it makes it hush;
standing still for five seconds lets the soundscape swell.

## House adaptation: silent visual piece

The prompt's "faint soundscapes" ship as a SILENT visual piece. The
whisper fragments are drifting text only. There is no audio output of
any kind anywhere in the piece: no AudioContext, no audio element, no
microphone input. The "swell" is a visual density swell, and the "hush"
is a visual thinning and scattering. This is stated here so the silence
reads as a deliberate choice, not a missing feature.

## What the visitor sees

Frame one (fixed phase t = 0, verified at 1280x900, 390x844, 720x720):
a dark room (#141311) with two faint wall seams, a tall microphone
centered on a flat spotlight pool, its head near the top third. The head
is mic black (#1C1B1A) with a domed top, six silver grille lines
(#9AA0A6), a silver band near its base, a thin pole, and an elliptical
base. Two or three whisper fragments in bone italic (#E8DFC8) drift near
the grille at frame one; the rest of the field is empty and dark.

## Mechanics: the inverted response curve

All state is closed-form over elapsed time since load plus the recorded
tap list. Nothing is frame-integrated, so frame one is reproducible.

- Fragment cycle: 16 fragments from a curated bank of half-translated
  memories and mistranslated one-liners ("the rain in Seoul smells like
  home", "I left my name at the airport", "half of this sentence is
  missing"). Each has a seeded rise period (16-25 s), phase offset, size,
  lateral offset, and sway factor. A fragment rises from the grille to
  the top of the frame with a fade-in / hold / fade-out alpha envelope.
- Stillness: stillness(t) = t minus the last pointer activity (any
  pointerdown or pointermove). After 5 s of stillness the swell ramps
  over 10 s: swell01 = clamp((stillness - 5) / 10, 0, 1).
- Swell: the first 5 fragments are always present; fragments 6-16 fade
  in one by one with the swell, and the mic's sway amplitude grows from
  0.015 to 0.045 rad at a 9 s period. The mic sways like breath.
- Hush: each tap adds a decaying impulse, hushLevel = clamp(sum of
  exp(-(t - tapT) / 2.2), 0, 1). Hush multiplies fragment alpha by
  (0.25 + 0.75 * (1 - hush)), damps the sway by (1 - 0.85 * hush), and
  scatters fragments with a per-fragment decaying push
  (46 px lateral, 26 px upward, tau 2.5 s). Tap repeatedly and the room
  goes nearly quiet; leave it alone and the whispers return.
- No volume control, no volume meter, no loud payoff, no speech input,
  and no on-screen explanation of the inversion anywhere. The visitor
  discovers that tapping quiets and stillness swells by trying it.

## Forced-state verification (temp copies, discarded)

- Swell probe (lastActivity forced to -20 s, stillness 20 s): the grille
  area fills with a dense cluster of fragments, confirming the full
  16-fragment density ramp.
- Hush probe (one tap injected at t = 0): fragments visibly thin to
  quarter alpha and scatter off their rise paths, and the mic stands
  upright, confirming hush damping of both fragments and sway.

## QA

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (desktop), 390x844 (mobile), 720x720 (thumb); all three inspected.
  Mobile holds the same read: mic centered, head near the top third,
  fragments legible, page ground in the piece's own background color.
- Thumb rendered three times at 720x720; all byte-identical (cmp).
- Token scan clean of Math.random, createElement, AudioContext,
  getUserMedia, pixel buffers, offscreen canvas, gradients, filters,
  and shadowBlur (the single grep hit is a comment stating that no
  Math.random is used). requestAnimationFrame appears only behind
  typeof guards; one synchronous frame draws at load.
- Determinism: integer-hash seeds only; frame one is drawn at t = 0
  before the loop starts; the loop is anchored as offset plus
  elapsed-since-load, never an absolute clock.
- Dots and arcs: the mic base and dome use ellipse/arc paths with a
  moveTo before each, per the node-canvas quirk.
- Visible text is prompt-specced (the whisper fragments) and stays.
  No em dashes in visible copy.

## Files

- index.html (md5 47e73248e2d2966da11bd57232a61e6a) — self-contained, silent
- thumb.png (720x720)
- qa-desktop.png (1280x900), qa-mobile.png (390x844)
