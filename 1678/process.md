# No.1678 "Seed Library, Crowded Room" (Tyler Hobbs TH7, PP925)

## Driver
One algorithm, many seeds; the seed is the artwork. A single
circle-packing algorithm grows concentric-ringed circles in one
orange hue on warm beige. Twelve curated seeds sit in a strip
along the bottom edge. Picking a seed regrows the main field from
that seed, rings expanding outward from the field centre over
about twenty seconds. Same rules, different dice.

## Build
- Single `index.html`, Canvas 2D, flat fills only. Palette:
  rings `#D97B2B` on beige `#EFE2CB`, field edge `#B06A24`,
  plates `#3D2A18`.
- Seed bank: 12 fixed seeds (167801, 167813, 167827, 167839,
  167851, 167863, 167877, 167889, 167903, 167917, 167929,
  167941). Each seed drives a mulberry32 PRNG that sets circle
  centres, radii, ring counts (2-5), ring offsets and centre
  dots, so every thumbnail is a genuinely different packing,
  not a colour variant. Circle counts per seed: 35-47.
- Circle packing: radii sorted large-first, rejection-placed
  with a gap, inside a 0.04 inset of the square field.
- Regrowth: closed-form function of time since selection.
  Growth fraction over 20 s; each circle reveals by distance
  from the field centre plus a small per-circle jitter, and
  each ring expands outward in turn (radius scaled by an
  eased per-ring fraction).
- Interaction: tap a thumbnail to regrow from that seed
  (pointer/touch, tap distinguished from drag). The strip
  scrolls by drag when it overflows (phones show about 5 of
  12); on wider screens the thumbnails shrink to fit all 12.
  No random seed on tap, never click-to-reload.
- Idle auto-advance: after 120 s with no tap and growth
  complete, the next seed is selected and regrows.
- Determinism: fixed default seed (first in the bank), fixed
  phase, no Date.now(), no unseeded Math.random(). Frame one
  is the default seed fully grown. Reduced-motion: growth is
  instant and auto-advance is off.
- House rules: Visual Viewport sizing, resize listened to on
  visualViewport and window; canvas pinned in draw() via
  style.width/height in px; phone detection via window.screen
  (min dimension under 700px) with aspect fallback; square
  field keeps its shape on phones, page ground is the piece's
  own beige, hint plate stacks under the title plate on phones
  so the two plates never collide; one synchronous frame at
  load; requestAnimationFrame guarded by a typeof check.
- Page structure follows the No.1677 template (dark plates,
  monospace title/date/hint, no text beyond title, date and
  hint, no em dashes, no AI-signature copy).

## Gallery
- Title: Seed Library, Crowded Room
- Date: 2006 · 08 · 16
- Note: "Tap a seed to regrow the field."

## Acceptance checks (all verified from the actual script)
- 12 visibly distinct thumbnail packings: yes, inspected in
  desktop, mobile and thumb renders; per-seed circle counts
  38, 40, 41, 45, 45, 35, 43, 38, 47, 45, 39, 37.
- Tap changes the main field to that seed's packing: probed
  via window.__probe selectSeed(5, 100); renders at t=110
  (mid-growth, growth 0.5) and t=125 (fully grown) show seed
  5's packing, distinct from the default.
- Regrowth completes in ~20 s: growthAt(100)=1 at rest,
  growthAt(110)=0.5 after a selection at t=100,
  growthAt(120)=1.
- Idle 2 min auto-advances: drawAt(230) after last tap at
  t=100 advanced to the next seed (7th thumbnail highlighted)
  and restarted regrowth from an empty field.
- First frame byte-reproducible: thumb.png rendered twice
  from the script, md5 identical (b41e8974701b4d683d020c973044eddc).
- Renders inspected: 1280x900 desktop (field clear of plates,
  dense ring field, 12 distinct thumbnails, hint readable),
  390x844 mobile (plates stacked without overlap, square
  field unclipped, strip scrollable), 720x720 thumb (all 12
  thumbnails visible, field dense).

## Deviations from the prompt
- Thumbnails shrink to fit all 12 on mid-size screens
  (720x720 thumb render) and the strip scrolls by drag on
  phones, where 12 full-size thumbnails cannot fit; the
  prompt caps visible thumbnails at 12 and this keeps that
  cap while keeping thumbnails legible.
- First fix round: the field originally ran under the title
  and hint plates and the mobile plates overlapped. Fixed by
  centring the field in the band between the plates and the
  strip, stacking the hint under the title on phones, and
  raising the target circle count from 26-39 to 34-47 for a
  denser field. Re-rendered and re-inspected after the fix.
