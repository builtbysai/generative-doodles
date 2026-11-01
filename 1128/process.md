# №1128 — Last Clock

Jussi Ängeslevä study block JA1: *Last Clock* (2002, with Ross Cooper), the
slit-camera clock that archives time into its own face.

## Idea

A clock with no hands and no numerals. Each hand is replaced by a ring of
1-pixel-wide vertical slices captured from a live procedural "video feed" by
the slit-scan technique: the outer ring holds the last minute, the middle ring
the last hour, the inner ring the last 12 hours. The newest slice is vivid
near-white; as slices age they decay through cool grays toward a faint blue
ghost, so the face slowly becomes a mandala of archived time. One amber
pointer marks the current instant at the top.

## Implementation

- The "video feed" is a pure function, never a buffer of pixels: two seeded
  fbm value-noise layers flow at different rates and scales, and three soft
  shapes drift through the frame on slow Lissajous paths. A slice is the
  column profile of that scene at a capture time, so any slice can be
  re-derived exactly at any moment — scrubbing the archive is lossless.
- Archive time runs at 60×: the full 12-hour archive accumulates over a
  12-minute viewing loop. Each ring is drawn as 360 thin annular wedges
  (240 on phones); wedge age maps to palette (near-white → #6A7684 →
  #2C3A48), and each wedge is split into 4–6 radial samples of the slice
  profile, so the rings read as wrapped strips of the time-image.
- The archive is pre-filled by construction — slice state is a pure function
  of archive time — so the mandala is fully formed on the first frame,
  deterministically, at a fixed phase.
- A faint vertical grain (the slit direction) is laid over the face inside a
  circular clip; a thin dark-bronze bezel rings the disc.

## Interaction

- **Drag** the face to scrub the archive: the rings rewind and replay their
  stored slices under the finger. On release the offset decays back to the
  live archive over ~3 s (closed-form exponential).
- **Double-tap** reseeds the procedural feed — a new scene, a new archive.
- Never click-to-reload; the piece otherwise runs entirely on its own.

## House rules

Visual Viewport sizing with resize listeners on both the viewport and the
window; canvas CSS size pinned in `fit()`; phone detection via
`window.screen` (min dimension < 700) with an aspect fallback; synchronous
first frame at fixed phase T0 = 26 s; `requestAnimationFrame` guarded by a
`typeof` check and anchored at phase + elapsed. No gradients, no
`ctx.filter`, no shadowBlur, no offscreen canvas, no `createElement`, no
microphone, no audio. No numerals, ticks, or text anywhere except the
`<title>`.

## QA

Rendered with the house renderer at 1280×800 (desktop), 390×844 (mobile),
and 720×720 (thumb). Frame one shows the fully formed mandala: three
concentric slice-rings in whites, grays, and faint blues on the charcoal
face, the amber pointer at the top, the bronze bezel around it. Thumb
rendered twice and byte-compared with `cmp`: **byte-identical**; the
duplicate was deleted.
