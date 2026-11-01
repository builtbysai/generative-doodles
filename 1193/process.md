# №1193 — Yawl

joncates study block JC2. The glitch-dialect text ritual as a broadcast that
cannot hold its own signal: one line of text, alone on a black field, types
itself, corrupts into leet, holds, re-forms. Text is the artwork here — the
dialect engine is the mechanism.

## The line

A single centered line of bold monospace in phosphor amber (#FFB000) on
#0A0A0A. Never more than one line. It cycles five phrase seeds, verbatim:

1. `goodMorn'NN Out West yawl`
2. `the cowgirl gatherer'd her wits err`
3. `glitch◆school`
4. `yawl come back inn the snow`
5. `err on the side of the signal`

Each letter is drawn individually at its own monospace cell, so corruption,
jitter and smear act per letter. Font size starts at 7% of the smaller
viewport dimension and shrinks until the longest phrase fits 94% of the
width, so the line holds on a phone.

## State machine (90 s seamless loop)

Five phrase slots of 16 s (80 s), then a 10 s tail that holds the last
phrase. Each slot runs the same score, in slot-local time:

- **0–3.5 s TYPE** — letters land one at a time (one per 0.14 s, compressed
  per phrase so even the 35-letter line finishes inside the window), with a
  blinking block cursor at the writing edge.
- **3.5–6 s HOLD** — the clean line, still.
- **6–9 s CORRUPT** — letters flip one by one to leet/dialect substitutions
  in cyan (#00E5FF) or magenta (#FF2BD1): o→0, e→3 or ¡, i→¡, a→4 or æ,
  l→1 or ┼, t→7 or †, s→5 or §, w→◆, n→ñ, and a hash-picked glyph pool for
  the rest. Flipped letters stutter ±1.5 px at 8 Hz.
- **9–12 s CORRUPTED HOLD** — the dialect sits there, decipherable.
- **12–14 s RE-FORM** — letters flip back in reverse order.
- **14–16 s HOLD** — clean again, then the next phrase types.

The corruption map is precomputed per phrase from seeded integer hashes:
exactly ⌊35%⌋ of the letters (letters only — spaces, the dialect apostrophe
and the ◆ sigil never flip) are corruptible, ranked by hash. Rank decides
flip order; rank 0 flips first and is the slot's single error-red (#FF2B2B)
letter. At most about a third of the line ever changes, so the corruption
stays a dialect, not mush.

## Sweeps

Twice per loop (t = 40 s and t = 82 s, 1.1 s each) a green scanline band
(#33FF66) descends across the line. Under it every letter jitters in x and y
by hash steps under a sine envelope — the tracking fails — and then the
phrase re-types from zero and holds clean until its slot ends (the 40 s
sweep interrupts phrase 3 mid-corruption; the 82 s sweep hits the tail's
held last phrase).

## Interaction

Watch-only, plus one degradation: dragging is a bad tracking head. Pointer
velocity becomes a horizontal smear, gaussian-weighted around the finger,
with ghost echoes of each letter at ±30% of its offset; on release the
smear snaps back with an exponential decay (τ ≈ 0.22 s). The viewer can
degrade the line, never edit it. No keyboard, no input field. Silent by
design — no audio code at all.

## Determinism

The first frame is drawn synchronously at the fixed phase T0 = 8.2 s: slot
0 mid-corruption, six of phrase 1's seven corruptible letters flipped
including the red one, line fully typed and legible. The rAF loop (typeof-
guarded) is anchored as T0 + elapsed since load. All variation comes from
seeded integer hashes — no Math.random, no wall-clock content. Canvas is
sized from the Visual Viewport API with resize listeners on both
visualViewport and window, CSS size pinned in px, phone detected via
window.screen (min dimension < 700) with an aspect fallback.
