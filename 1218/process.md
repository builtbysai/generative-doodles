# №1218 — Splice Lines

Clint Enns study block CE3, after Kurt Kren's *Splice Lines*: "the violence of
Otto Muehl's performance is removed, replaced by a different form of
violence — that of the 'cut.'" A film made only of cuts. There is no content
between the splices; the splices are the content.

## How it works

- **The loop.** 47 seconds (his runtime, 0:47), frame-quantized at 24 fps —
  1128 frames per cycle. All timing runs on integer frame indices
  (`F = floor(local × 24)`), so flashes land exactly on frame boundaries.
- **The schedule.** A seeded generator (mulberry32, seed 7932) lays out the
  cycle once: **5 clusters, 26 splices** — 21 white flashes and 5 scratch
  bursts. Clusters hold 3–7 splices at 0.18–0.50 s gaps; between clusters the
  leader runs black for ~4.8–10.1 s. Cluster frame ranges: 51–84, 247–273,
  388–419, 601–645, 888–925. Irregular on purpose: the clusters hit like a
  metronome with a limp.
- **A splice.** A flash fills the frame white for 1–3 frames. On its *first*
  white frame only, the global frame counter (`floor(t × 24)`, zero-padded)
  appears in leader gray near the centre, and 6 of the 21 flashes (~1 in 4)
  also carry a tape mark: an orange diagonal band across one corner plus a
  short orange splice line under the number. A scratch burst instead holds 3
  frames of dense scratch lines (44 per frame, re-hashed each frame) on black
  — damaged leader, no white.
- **Between cuts.** Pure black leader (#050505) with 8 scratch lines drifting
  at 0.5–2 px/s, slight tilts, slowly breathing alpha, plus sparse dust specks
  re-hashed in 0.7 s steps. Nothing else ever appears.
- **Visitor splices (absorption rule).** Completing a drag adds a cut at the
  release point. It fires immediately — fullscreen white flash for 2 frames,
  frame number and a small orange tape band at the point — and is then
  absorbed into the rhythm: the stored splice re-fires at the same
  cycle-local frame in every later cycle, numbered with that occurrence's
  global frame count. The list is capped at 64; the oldest drop off. No undo,
  no reset: the film only ever gains cuts.
- **Frame one.** T0 = 400.5/24 ≈ 16.6875 s — the exact middle of frame 400,
  the first white frame of splice #10 (cluster 3, a 3-frame flash) which
  carries a tape mark in corner 1 (top right). The thumbnail therefore shows
  the piece mid-cut: white field, gray counter "0400", orange splice line,
  orange tape band across the top-right corner. After load, time continues
  from T0 (anchored phase + elapsed).

## House rules

Sizing comes from the Visual Viewport API with resize listeners on both the
visual viewport and the window; the canvas CSS size is pinned in draw().
Phones are detected via `window.screen` physical size (min dimension
< 700 px) with an aspect fallback (h > w × 1.15). The first frame is drawn
synchronously at the fixed phase; the rAF loop is typeof-guarded and anchored
as phase + elapsed. Seeded hashes only — no Math.random. Silent. No
gradients, no ctx.filter, no shadowBlur, no createElement, no
ImageData/offscreen canvas, no microphone.
