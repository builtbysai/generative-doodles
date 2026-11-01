# №1191 — Useful Radio (Duo)

Jeff Kolar study block JK8 (PP350), grounded in *Useful Radio* (2020), Kolar's
broadcast-ensemble work with Anna Friz, Joe Jeffers and Zeena Parkins:
"radio voices, citizen listening." The piece is silent — the radio is drawn,
not heard.

## The piece

Two voices face each other across a split screen. On the left, VOICE-K speaks
in the angular register: cyan (#00E5FF) straight-line bursts, five sharp
rectangles per phrase laid on a stave line, each capped with a white node dot.
On the right, VOICE-F answers in the organic register: a magenta (#FF2BD6)
blob that splits into five droplets along hashed directions, each droplet
dragging a fading arc and carrying a pale #FFD6F5 node. The backgrounds keep
the asymmetry — faint diagonal hatch behind K, faint drifting arcs behind F.

The exchange runs on a fixed 50-second score that loops: six exchanges at
base times 2, 8, 14, 26, 34, 40 seconds — three close together, one long
silence, two close — with each loop's start times jittered ±2 s by a
loop-index hash, so the stall lengths breathe without ever changing the
order. Even exchanges are led by K (2.2 s burst), odd exchanges by F
(2.6 s split); the answering phrase begins 0.4 s after the leader ends. One
rhythm array is hashed per exchange and shared by both phrases, so when F
leads, K's answering burst lengths literally mirror F's droplet sizes.
Marks persist and fade in stepped alpha over about seven seconds — nothing
is accumulated frame-to-frame; every mark is a closed-form function of its
birth time in the score.

Twice per loop a third presence crosses: the ghost voice. For 1.2 s around
loop times ~20.5 (the tail of the long silence) and ~45, gray #8A8A93 static
dashes scatter across the divider band, re-hashed every 0.1 s, and every
live mark on both sides stutters ±3 px. A broadcast-tower glyph in orange
(#FF6A00) straddles the divider at top center and throws an expanding pulse
ring at the start of every phrase, lead or answer. The footer carries the
work's own line: "radio voices, citizen listening."

The one interference: drag across the divider to tune it. The divider
fraction follows the drag (clamped to ±10% of the span) and both voices'
phrase elements stretch in proportion to the offset; on release the offset
springs back exponentially. Drag segments are recorded as events and the
offset is a closed-form function of that list and t. The exchange order is
never touchable.

## Relation to №1178

№1178 "neural goldberg (chatter)" built the Soliday version of two chattering
systems: a free-running, unscripted event stream with no loop point, where
counts cross-trigger and dropouts fall where they fall. This piece is the
Kolar re-voicing and differs by design: a written 50-second score that loops
verbatim (only its gaps jitter), a broadcast tower marking every phrase, the
ghost-static voice crossing the divider, asymmetric angular/organic
registers instead of two blob/line systems, and a tunable divider as the
single interference. Where №1178 never repeats, №1191 is a broadcast
schedule — it comes back around, slightly retimed, like a station ident.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on both
  `visualViewport` and `window`; CSS size pinned in `fit()` and re-pinned in
  `draw()`.
- Phone detection via `window.screen` (min dimension < 700) with aspect
  fallback; on portrait screens the split turns horizontal (K above, F
  below) and the tower stands on the divider at center.
- Determinism: the first frame is drawn synchronously at fixed phase
  T0 = 10.5 s (loop 0, exchange 1, F leading — droplets mid-split on the
  right, K's exchange-0 burst fading on the left, a tower ring
  mid-expansion). The rAF loop (typeof-guarded) is anchored as
  T0 + elapsed-since-load.
- Seeded hashes only (integer mix + mulberry32); no `Math.random`, no
  gradients, no `ctx.filter`, no shadowBlur, no `createElement`, no
  ImageData/offscreen canvas, no audio, no microphone.
- Silent by design.

## QA

Rendered with the house renderer at 1280×800 (desktop), 390×844 (mobile)
and 720×720 (thumb). The thumb was rendered twice and byte-compared with
`cmp` — identical; the duplicate was deleted.
