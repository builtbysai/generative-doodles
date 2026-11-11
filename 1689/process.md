# №1689 — It Is in the Room

- **Prompt:** MK2, mpkoz PP936, EXPANSION #222. A realtime 3D "video sculpture"
  inside a framed display on a wall: a tall glass-fronted box holding a slowly
  morphing hexagonal column of blue waves, on a white pedestal inside the frame.
  The sculpture's key light matches the room's time of day (6500K cool morning
  to 3200K warm evening); every few minutes the wave field inverts, then
  settles back. Small caption card bottom right reading "after mpkoz". Watch only.
- **Date:** 2006 · 08 · 27 (formula: 2002-01-10 + 1690 days)
- **Palette:** wave column deep ocean blue #1E4A7A to foam white #EDEFF2; frame
  matte black; wall warm off-white #EFE9DC; pedestal white.
- **Gallery note:** "A wave column in a glass box, lit by the room's own day. Watch only."

## Build

- Canvas 2D only, per the prompt: the column is a 2D displaced-cylinder
  projection. 44 horizontal sine-wave bands across a front face, shaded left
  facet, lit right facet, and a light hexagonal top cap. Band colors interpolate
  deep blue to foam white from a two-component traveling sine field; thin foam
  crest lines travel across each band; the column silhouette is displaced by the
  same field.
- Day cycle: 24 minutes (1440 s). Kelvin follows 4850 + 1650*cos(2*pi*t/1440):
  6500K at t = 0, 3200K at t = 720, back to 6500K at t = 1440. Kelvin converts
  to RGB (Tanner Helland approximation) and tints the wall, pedestal, box back
  panel, wave colors, and a top-left directional wash, so the whole room warms
  as the day goes on.
- Inversion: every 180 s the wave field phase-shifts by pi over 15 s, holds 30 s,
  and settles back over 15 s. Implemented as a phase shift rather than an
  amplitude flip, so the field stays fully visible mid-inversion.
- Glass reflections: one static diagonal white gradient plus a fixed edge
  highlight over the box front. Never animated, no noise.
- Frame one: t = 367.5 (mid-inversion, env 0.5, light about 4800K mid-morning),
  wave column mid-morph so it reads at first paint.
- House rules: Visual Viewport sizing with resize on visualViewport and window;
  canvas pinned in draw(); phone detection via window.screen with aspect
  fallback; centered square field on desktop and phone with the page ground set
  to the wall color; one synchronous frame at load; rAF guarded by typeof;
  seeded/deterministic only, no Date.now() or Math.random(); title, date, and
  "Watch only." hint plates on canvas; no em dashes in visible copy; no
  click-to-reload; reduced-motion support (static frame one).
- Template: live №1687 index.html (fetched via fetch-blob.py), plates and
  sizing structure adapted from it.

## Deviations

- The column is 0.58 of the box width (prompt gives no width); the caption card
  is 72 px wide with 9 px type on phones so it clears the column's right edge
  at 390 px width. On desktop the card is max(96 px, 0.24 of inner width).
- Inversion is a smooth pi phase shift of the sine field (see Build), not a
  hard sign flip, so peaks become troughs continuously and the column never
  goes flat mid-inversion.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop,
  390x844 mobile, 720x720 thumb; all three inspected.
- Desktop: matte black frame centered with gallery margins, wall filling the
  frame, glass box on a white pedestal, hexagonal blue-wave column with foam
  crest lines and a light top cap, caption card "after mpkoz" bottom right,
  title/date plate top left, "Watch only." plate bottom left. Reads as intended.
- Mobile: same composition centered, frame keeps its shape, caption card clears
  the column, plates clear the frame. Reads as intended.
- Thumb (720x720): same as desktop, legible.
- Determinism: two independent frame-one renders byte-identical
  (md5 7dc6fb54536cdc76299919ee2ee6e9d9), matching the gated desktop render.
- Probe checks: kelvin 6500 at t = 0, 4796 at frame one, 3200 at t = 720,
  6500 at t = 1440; inversion env 0 at t = 0, 0.5 at 7.5 s, 1 at 30 s,
  0.5 at 52.5 s, 0 at 100 s. Evening render (t = 720) inspected: wall and
  pedestal visibly warmer, wave bands inverted versus frame one.
- Pixel sampling (desktop frame one): column center spans deep blue
  (85,115,149) to foam (234,233,235) across bands; morning wall (242,236,225)
  vs evening wall (242,225,204) confirms the light shift.
- Flicker safety: only slow sines (26 s and 17 s wave periods, 24-minute day
  cycle, 3-minute inversion); nothing strobes above 14 Hz by construction.
- Fix round: first gate caught the column rendering all white. Cause: band
  colors were built as tintHex(mixHex(...)), but mixHex returns an rgb() string
  which tintHex cannot parse (hexRgb on "rgb(...)" yields NaN), so canvas kept
  the previous white fillStyle. Fixed with a mixTint array path; re-gated all
  three sizes after the fix, plus the phone caption-card clearance fix.
- Re-gated after the final edit: desktop, mobile, and thumb re-rendered and
  re-inspected; md5s below are from the final files.

## Files

- index.html md5: ed4f5579ef0f5aead68f6d326a28d05a
- thumb.png md5: 484b578560b9f43871701c4e18fb99e5
