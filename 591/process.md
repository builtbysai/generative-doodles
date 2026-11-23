# №1828 Water Drip Drum, process notes

Source: TASKS.md prompt block ellen-fullman EF5 (PP1075), cron expansion study #239.
Number 1828, title "Water Drip Drum", gallery date "2007 · 01 · 13" (formula date 2002-01-10 + 1829 days).

## What was built

A near-black room with an amplified aluminum pan centered low. Water drips fall
from above the frame at irregular, seeded intervals; each impact opens concentric
ripple rings on the pan surface. A dark pedal silhouette sits at the lower right
edge and tips at slow, deliberate intervals on a 26 s cycle; the pitch of every
following drip slides with the pedal angle, and the ring spacing follows the
pitch (higher pitch, tighter rings). A Long String drone bed hums underneath the
sound model. Watch only. No input except a small sound toggle, default off.

## Build

- Single self-contained index.html, one inline script, drawn from the house-rule
  template (build-1818-1822/1822). Visual Viewport sizing with resize listened
  to on both visualViewport and window; canvas pinned in draw() via
  canvas.style.width/height in px; phone detection via window.screen with the
  aspect fallback. Centered field: full-bleed on phones, square on desktop.
- Drip schedule: mulberry32 seed 1828, 48 drips, intervals 1.4 to 3.2 s, impact
  points seeded near the pan center. Fall time 0.9 s, accelerating drop.
- Rings: radius grows at rx * 0.22 / pitch per second, clipped to the water
  surface, fading as they reach the pan edge; each ring carries a fainter echo
  ring and a brief splash crown just after impact.
- Pedal: 26 s cycle, 8 s tip (2 s ramp in, 4 s hold, 2 s release). Pitch factor
  1 + 0.45 * pedal angle at impact. A thin tick beside the pedal slides with
  the tip.
- Sound: closed-form model only. WebAudio starts lazily inside the first tap
  on the sound toggle, never autoplay. Ping is a sine with a pitch envelope
  (620 Hz * pitch, sliding down to 55 percent over 0.5 s); drone is two detuned
  55 Hz sines at low level. Fully legible silent.
- Flicker is far below 14 Hz by construction (slow drips and rings only).
  prefers-reduced-motion slows the clock to 0.05x.
- Plates drawn on canvas: title and date top left, "Watch only." bottom left,
  "Sound: off" toggle bottom right. No em dashes anywhere in visible copy.

## Deviations from the prompt

None material. The pedal is drawn as a small dark lever with a pivot at the
lower right edge plus a faint sliding tick, rather than a literal foot pedal,
so it stays a silhouette "like a secret" at the frame edge. The drip source is
implied only by the falling drop entering from above the frame, per spec.

## Probe results (frame one)

- Fixed phase t = 13.9349 s, 0.35 s before the sixth drip lands.
- Ring count at frame one: 2 (radii about 0.27 and 0.71 of pan radius, both
  mid-expansion). Next drip in 0.35 s. Pedal angle at frame one: 0 (at rest
  between tips). Drip count in schedule: 48.
- First version had frame one at the fifth drip with only 1 ring; the frame
  time was moved to the sixth drip and ring speed slowed from 0.30 to 0.22
  of pan radius per second so two rings are visible at frame one.
- QA: desktop 1280x900, mobile 390x844, thumb 720x720 all rendered from the
  actual script and inspected. No clipped plates, no empty areas, pan and
  rings legible at all sizes.
- Determinism: thumb rendered twice, md5s identical; thumb.png is byte-identical
  to a fresh 720x720 render of the final script.
- No em dashes in index.html or process.md.
