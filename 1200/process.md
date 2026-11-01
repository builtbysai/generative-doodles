# №1200 — Digital Alzheimer's

Evan Meaney study block EV1 (PP359), after Meaney's essay on bit-rot:
"Everything on our hard drives is slowly forgetting itself… In this form
of digital Alzheimer's, a zero will forget that it is supposed to be one."

## The image

One picture, full-bleed, drawn flat like a home movie: a standing figure
(skin #C8A080, red shirt, blue pants) against a saturated blue sky
(#1B4FD8 at the top, lightening toward the horizon), a pale sun, a small
house with a brown roof at the right, bushes, and a green ground strip.
No photograph, no text, no progress bar, no panel of instruments.

## The forgetting

- The image is **clear for exactly 10 seconds**.
- Then decay advances in **discrete events**, never continuously and
  never at regular intervals: a seeded schedule (mulberry32) fires a
  shear every 8–15 s from t = 10 s to t ≈ 170 s. Each event displaces a
  horizontal band of 3–9 slices sideways by an offset that grows with
  the event index (up to ±8.3% of the frame width). Offsets **persist** —
  the piece never remembers, never resets.
- The scene is drawn in **56 horizontal slices**; each slice is clipped
  and translated by the sum of all event offsets covering it, so a shear
  is structural, not an overlay. Where a slice's displacement exceeds
  4 px, the foreground objects are drawn twice more in magenta #FF2B8D
  and cyan #00E5FF at ±3 px — the chroma fringe rings the displaced
  blocks. Sky and ground rects are drawn 3× wide so the field itself
  stays edge-to-edge while objects shear away.
- A **magenta chew band** (~9% of the height) drifts slowly down the
  frame over the 3 minutes; slices inside it get hash-stepped jitter
  (re-hashed every 0.3 s) and a 25% magenta wash.
- Skin tones mix toward gray by t = 150 s; the whole palette deepens
  toward #0A1E5E / ghost blue #14306B. In the final minute a slow global
  smear (per-row sine drift) pulls the remains apart, and from t = 150 s
  the figure's opacity sinks to 25%.
- Render time clamps at 185 s: the end state — a blue field with
  smear-ghosts where the figure and house used to be — **holds forever**.

## Interaction

Dragging is a **bad sector**: pointer samples are recorded permanently
(cap 200), and rows near a touch shear further in the drag direction,
growing over 4 s and never recovering. The viewer can hasten the
forgetting where they touch; they cannot heal anything.

## Determinism / house rules

- Synchronous first frame at the fixed phase **T0 = 8 s** — the image
  still whole, two seconds before the first shear. The rAF loop (typeof
  guarded) is anchored at load + elapsed; there is no wall-clock state
  in the image.
- Canvas sized from the Visual Viewport API with resize listeners on
  both visualViewport and window; canvas CSS size pinned in draw();
  phone detection via `window.screen` (min dimension < 700 px) with the
  aspect fallback — the piece is full-bleed at every size.
- Seeded hashes / mulberry32 only. No gradients, no `ctx.filter`, no
  shadowBlur, no `createElement`, no ImageData or offscreen canvas, no
  audio, no microphone. Every arc is its own path with a `moveTo`.
- Silent by design; the decay is watched, not heard.

## QA

Rendered with the house node-canvas renderer at 1280×800, 390×844 and
720×720. The 720×720 thumb was rendered twice and `cmp`-verified
byte-identical. Off-phase test renders (temporary T0 edits, discarded)
confirm the arc: at 70 s several bands are sheared with magenta/cyan
fringes and the chew band crossing the figure's head, yet the figure is
still unmistakably a person in front of a house; at 170 s only
horizontal smear-ghosts remain on the deepened blue field.
