# №1146 — Collapse of Signal

Rosa Menkman study block RM3: The Collapse of PAL (2010–11) — "Eulogy,
Obsequies, and Requiem for the blue plains of phosphor." A dying analog
broadcast, performed as a seamless 10-second loop. This is analog decay —
wobble, bleed, roll — never clean digital glitch.

## The piece

A 16:9 stage letterboxed on near-black holds a faint broadcast field:
1 px phosphor-blue (#2A4B8F) scanlines at 2 px pitch, their brightness a
broad abstract signal — dim sky, a horizon glow band, dark ground — with
per-segment grain. Nothing in the piece is drawn from an image; every row,
slice and edge is computed from the loop phase.

The cycle runs five acts, all envelope functions of phase:

- **Stable (0–3 s):** hold wobble is a 1–2 px drift; a black hum bar with a
  4 px stepped alpha edge climbs slowly up the screen.
- **Wobble (3–5 s):** the horizontal hold gives out — per-row sine offsets
  grow to ±16 px with a slow global drift, and chroma fringing widens.
- **Sync loss (5–6.5 s):** rows group into 16 px slices with seeded jumps
  up to ±52 px, the whole frame rolls exactly one stage height (so the
  loop wraps seamlessly), and a magenta (#FF00E5) tear band of jittered
  strips sweeps up through the picture. The ghost figure is torn into
  dotted fragments.
- **Ghost lock (6.5–8 s):** wobble collapses to ~0.4 px, the bar is gone,
  and the signal briefly locks: five concentric diamond outlines in signal
  white (#E8E8E8), built scanline-row by scanline-row so they tear and
  roll with the field, peak at alpha 0.5 with amber/blue chroma fringes
  ('lighter' passes offset ±2–5 px) standing off their edges.
- **Decay (8–10 s):** the diamond fades to a ghost of itself, amber
  (#B87A00) creeps into the lit phosphor, a fainter hum bar re-enters from
  the bottom, and overall brightness dips toward the loop seam before the
  broadcast re-acquires.

Watch-only: no pointer handlers, no tap behavior, no audio — per the
prompt and the house rule for this study.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas CSS size pinned in fit(), which runs
  at the top of every draw().
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect fallback (h > w * 1.15); the 16:9 stage letterboxes at every
  size, phones included.
- Determinism: frame one is drawn synchronously at the fixed phase
  T0 = 7.2 s — mid ghost-lock: diamond locked and fringed, wobble near
  zero, hum bar just out of frame. requestAnimationFrame is
  typeof-guarded and anchored to that phase plus elapsed time. No
  Math.random; all jitter comes from a seeded sine hash, and stage
  envelopes are keyframe tables continuous across the loop wrap.
- No canvas gradients, no ctx.filter, no shadowBlur, no offscreen canvas,
  no createElement, no self-drawImage, no microphone. No visible text
  except the <title>.
