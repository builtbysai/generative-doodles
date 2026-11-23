# No.829 "Loose Connection" — EXPANSION #101 tony-conrad, PP6

## Concept

Conrad's 1973 rig: a camera on baby-carriage wheels rolling backward and
forward while rotating 360°, shooting only a few frames at intervals. The
piece rebuilds it as a virtual camera path through a generated street of
flat storefront forms. The camera executes two simultaneous parametric
motions — a linear dolly along the street and a continuous roll — but the
*record* is sparse: the display takes a new frame every 0.28 s and holds it
pixel-static until the next sample. The motion is smooth; the film of it
stutters. Untouched, a programmed score drives the rig (constant dolly and
roll terms, occasionally reversing, like his). Dragging takes the wheel;
double-tap reseeds the street. No sound, no photorealism: flat procedural
forms, signage as pure typography.

## Construction

- **Street.** Infinite in both directions. Lots of fixed length (13 units)
  line both sides of the street (facades on the planes x = ±7). Building
  parameters for lot `i` on a side are a pure function of
  `(streetSeed, side, i)` via a hashed mulberry32 stream: height, box depth,
  facade shade, window grid with per-window lit flags, shopfront, door
  position, awning, and a sign word drawn from a fixed pool of generic
  storefront words (HOTEL, CAFE, BAKERY, BOOKS, RADIO, SHOES, DRUGS, DELI,
  FLORIST, TAILOR, DINER, MUSIC). Because parameters are hashed per lot, no
  street data is stored and the camera can dolly forever.
- **Camera.** Pinhole projection (focal length 0.8 × min(viewport) on
  desktop, 1.3 × width on phones, camera height 2.3 units, near clamp
  0.7, far 130). The whole projected scene is rolled about the vanishing
  point by the camera's roll angle; sky and asphalt are drawn as oversized
  rects inside the rolled frame so the corners never open. Every quad
  (facade, end cap, roof, windows, door, shopfront, awning, sign band) is
  projected corner-by-corner from world coordinates, so perspective is
  exact per corner rather than interpolated. Sign words are drawn with
  fillText along the projected sign band's bottom edge, re-oriented so
  they read left-to-right on both sides of the street (the two facades
  mirror the u axis).
- **Score and segment model.** Camera state (dolly z, roll θ) is a
  closed-form function of a recorded segment list and t: each segment
  carries an opening state and constant (vz, ω), and state(t) integrates
  the segment containing t. Untouched, segments come from a cyclic
  six-segment programmed score (46 s cycle; net +36 units dolly and
  +0.226 rad roll per cycle, with backward and counter-roll segments
  inside it). Initial conditions z = 2.0, θ = −0.055 rad, so frame one is
  a sampled street view with the horizon tilted a few degrees.
- **Sample gate.** Display time is `floor(t / 0.28) × 0.28`; the scene is
  rendered at the camera state of that sampled instant only, and the draw
  is skipped until the next sample boundary (or a resize/reseed dirties
  it). Between samples the held frame is pixel-static.
- **Drag.** Pointer velocity is mapped to rig velocity (horizontal →
  dolly speed, clamped ±6 units/s; vertical → roll rate, clamped
  ±0.35 rad/s) and recorded as micro-segments of constant velocity,
  closed every 60 ms of movement, so the drag becomes part of the same
  closed-form segment list. On release the programmed score resumes from
  the state reached, at the next entry of the score cycle. A press that
  never moves past 6 px is a tap, not a drag; two taps within 0.35 s
  reseed the street (new seed per reseed, recorded as an event so the
  street shown is also a function of t).
- **Palette.** Strictly the four specced tones — storefront gray
  #D8D4CC, sign red #B33A2B, sky #AEC3CE, asphalt #4A4A48 — plus recorded
  mixes of them: facade = gray→asphalt by a per-building shade (0–0.32)
  with a distance fade toward sky (≤0.45); end caps a further 0.30 toward
  asphalt; roofs 0.30 toward sky; lit windows 0.45 toward sky, unlit 0.50
  toward asphalt; shopfront band 0.42 and door 0.62 toward asphalt; road
  0.14, sidewalks 0.38, centre dashes 0.55 toward gray; gray awnings 0.25
  toward asphalt, awning flap a further 0.18.
- **House rules.** Canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas pinned in px inside
  draw(); phone detection via window.screen (min dimension < 700) with
  the h > w×1.15 aspect fallback; the only visible text is the specced
  signage and the `<title>`; rAF typeof-guarded; frame one is the
  synchronous draw at t = 0 (sample 0) and never derives from Date.now().

## QA log

- Rendered with render-piece.js at 1280×900 (qa-desktop.png), 390×844
  (qa-mobile.png), 720×720 (thumb.png). Thumb rendered twice and
  byte-compared: identical (duplicate deleted).
- First render pass failed visually: every building drew red. Cause: the
  `mix()` helper only parsed hex colors, so any mix of a previous mix
  (which returns an `rgb()` string) produced NaN channels; the canvas
  silently kept the last valid fill, which was sign red. Fixed `mix()` to
  parse both hex and `rgb()` strings and re-rendered all frames.
- Read-backs after the fix: desktop and thumb show a flat procedural
  street receding to a vanishing point, horizon tilted ≈3°, gray facades
  with lit/unlit window grids, red sign bands with legible MUSIC, BOOKS
  and DELI, a red awning over a shopfront, pale sky above and asphalt
  with centre dashes below. Mobile holds the whole street in the tall
  frame with MUSIC and DELI still legible; nothing clipped wrongly.
- Sample-gate behaviour verified with a stubbed-rAF harness (since the QA
  renderer has no rAF): hashes of the canvas at t = 0, 0.10 and 0.27 are
  identical (held frame), and change at t = 0.30, 0.56 and 5.00 (new
  samples, camera advanced). The t = 0 hash matches thumb.png.
- Deviations from the letter of the prompt, with reasons:
  - Sample period fixed at 0.28 s (~3.6 fps): the prompt's "a few frames
    at intervals" needed one concrete gate; 0.28 s reads as Conrad-style
    stutter without freezing the roll.
  - Drag is quantised into 60 ms constant-velocity micro-segments rather
    than following the pointer continuously, so camera state stays a
    closed-form function of recorded events (house determinism rule).
  - The street is endless and lot-based instead of a finite block, so the
    score's net forward drift never runs out of city.
  - Signage words are invented generics, as the brief directed; the
    prompt's "signage as pure typography" is kept, no real brands.
