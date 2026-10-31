# No.815 "The Mouth" — EXPANSION #99 jacob-kassay, block 8

## Concept

From Kassay's Mister Fahrenheit painting: a head-sized mouth, open wide like a
comedy caricature, filled with brass teeth, hung at eye level on a dark wall.
The piece reproduces the painting at close range: the mouth fills the frame
edge to edge, wall showing only as slivers. It performs a slow silent laugh
on a 16 second loop: open, hold, close, hold. "It appears to laugh — if only
we knew the joke." Flat paint and caricature line throughout: no face, no
eyes, no sound, no photorealism.

## Construction

- Single self-contained `index.html`, canvas 2D only. Palette is strict:
  brass teeth `#B08D3C`, mouth interior `#2A0D0A`, lips `#7A3B2A`, wall
  `#161616`. The only derived tones are mixes inside that family: the lip
  fill is the lip tone mixed 0.18 toward the interior, and the lip edge line
  is the lip tone mixed 0.42 toward the interior. No gradients, no
  shadowBlur, no `ctx.filter`, no offscreen canvas.
- Lips: one outer bezier path (two upper humps with a shallow cupid's-bow
  dip, one full lower arc) filled flat, stroked with the deeper edge mix.
  The lower lip and the mouth corners drop as the open parameter rises, so
  the jaw reads as dropping rather than the whole shape merely scaling.
- Interior: an almond opening bounded by two quadratic curves (top arch,
  much deeper bottom arch). Its area is the interior's darkening mechanism:
  as the mouth closes the dark field narrows to a sliver, so the interior
  goes dark by closure, with no color change.
- Teeth: 9 upper and 8 lower flat brass rectangles hung from / standing on
  the opening's edge curves, clipped to the opening path, so they flash into
  view only as the mouth opens. Count is fixed. Per-tooth jitter (width,
  length, rotation within about ±1.4 degrees) is precomputed from a seeded
  mulberry32 stream, so the teeth are identical on every frame and visit.
- Laugh cycle: 16 s, closed form. Open 0–3.2 s (easeInOut, open parameter
  0.06 → 1.0), hold open 3.2–7.2 s, close 7.2–10.4 s, hold closed
  10.4–16 s, seamless.
- Tap reseed (the prompt's own mechanic): each tap records `{time, openness
  before, cumulative jump}`. A tap advances the cycle by a fixed 5.37 s, so
  successive taps land at different points in the laugh; the displayed
  openness then settles from its pre-tap value to the new cycle value over
  0.35 s with a smoothstep. The open parameter is therefore a closed-form
  function of (loop time, recorded tap list) — no frame-integrated state.
- Frame one is phased 2.56 s into the cycle (open parameter ≈ 0.90, late in
  the opening sweep): the laugh and both rows of teeth are already showing,
  since a closed-mouth first frame would hide the piece. Recorded here per
  the brief.
- Sizing follows the house rules: canvas from the Visual Viewport API with
  resize listeners on both `visualViewport` and `window`; canvas CSS size
  pinned in px inside `draw()` every frame; phone detection via
  `window.screen` physical size (min dimension < 700 px) with the
  `h > w*1.15` aspect fallback; page ground is the wall tone. On phones the
  mouth widens slightly (0.485 vs 0.47 half-width) so it still meets the
  frame edges in portrait.
- Determinism: the first frame is a synchronous `draw(0)` at the fixed
  phase; nothing is derived from `Date.now()`; the animation clock is
  anchored at load and the rAF loop is `typeof`-guarded (the QA renderer
  has no rAF, AudioContext, or `document.createElement`, and none is used).
  No audio, no microphone, no visible text beyond `<title>`.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and compared with `cmp` —
  byte-identical. The duplicate was deleted.
- Read-backs:
  - Desktop: dark wall with slivers on all sides; wide open mouth, flat
    reddish-brown lips with a darker edge line, dark interior band, brass
    teeth along both arcs with visible individual separations and slight
    jitter. No face, no other content.
  - Thumb: same composition at gallery size; the laugh reads immediately.
  - Mobile: mouth meets both side edges (edge-to-edge as specced for the
    close-standing view), teeth rows and interior intact, nothing essential
    clipped; wall slivers above and below.
- Deviations: none from the prompt's substance. Two recorded choices: the
  lip fill uses an in-family mix of the specced lip and interior tones
  (allowed by the brief), and frame one is phased mid-open as the brief
  directs.
