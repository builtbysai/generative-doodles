# No.847 — The Static Stare

EXPANSION #103 lou-reed, PP8. After Warhol's Screen Tests (1966): four
minutes, one shot, nothing happens. Watch-only; watching is the interaction.

## Concept

An original procedural face fills the frame, slightly off-center, in strict
black and white. Half the face falls to black shadow. The eyes are open and
look straight out, and they never close — for as long as anyone watches.
There is no event, no payoff, no gotcha. The stillness is the content, and
the discipline of the sitter is the piece.

## Construction

Single self-contained `index.html`, canvas 2D only, palette restricted to
#0A0A0A and #F4F4F2; every grey is an alpha mix of those two.

Face, built from layered flat shapes in a face-local coordinate system
(origin at face center, width 1, height 1.28, with a 1.06 vertical stretch
so the proportions read as a portrait rather than a mask):

- Neck trapezoid (dim) behind a 22-point skull/face base polygon.
- Hair mass with a shaped hairline; modelling planes as alpha overlays
  (temple shade, forehead light, brow-shelf shadow, socket shade, cheek
  planes); brow wedges; nose (bridge light strip, side shadow wedge,
  under-nose shadow, elliptical nostrils, one nasolabial fold); a flat,
  closed, unsmiling mouth line with lower-lip light and under-lip shadow;
  chin/jaw shading.
- Eyes: almond whites, centered irises looking straight out, specular dot,
  upper lid line, lid fold, lower lid line.
- The shadow: a two-step black overlay (a 0.45-alpha soft step, then a
  0.93-alpha mass) whose boundary runs just right of the nose. The
  shadow-side eye is redrawn faintly (0.14-alpha almond, 0.35-alpha
  specular) so the stare continues out of the dark; the shadow-side mouth
  is simply lost to the black, as in the films.

Micro-motion, all closed-form functions of elapsed time t (no state, no
integration):

- Breathing: whole-face scale 1 + 0.004·sin(2πt/14), about a half-percent.
- Shadow drift: the boundary creeps by 0.010 face-units on a smooth
  480-second cosine cycle (0 → max → 0), a few pixels over minutes.
- Jaw shift: one shift of 0.004 face-units, easing in over t = 16–24 s of
  the take and easing back out over t = 205–225 s, applied to the mouth
  group only.
- The take is 240 s; after four minutes the micro-motion simply continues
  (blink schedule and jaw read t mod 240; breathing and drift are
  continuous across the boundary).

The never-blink schedule: blink moments are generated once at load from a
mulberry32 generator with fixed seed 847103 — the first at ~9–17 s, then
every 20–40 s within the take. At each scheduled moment the upper lid drops
~0.0028 face-units (about 2 px) and recovers inside 0.22 s with a small
high-frequency tremor term: the eyelid tenses, and the blink does not
happen. There is no code path that closes the eye.

House rules: canvas sized from the Visual Viewport API with resize
listeners on both visualViewport and window; canvas style width/height
pinned in px inside draw(); phone detection via window.screen (min
dimension < 700) with aspect fallback, used only for a small vertical
centering adjustment. Frame one is the synchronous draw(0) at load; the
rAF loop is typeof-guarded and clocked from performance.now(), never
Date.now(). No gradients, no shadowBlur, no ctx.filter, no offscreen
canvas, no audio, no microphone, no visible text besides the title.

## QA log

Rendered with `node ~/workspace/tools/render-piece.js`:

- qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png (720x720)
  all render the frame-one state: face at rest, eyes open, half-shadow
  settled.
- Determinism: thumb.png rendered twice and byte-compared with cmp —
  identical. Re-verified after the framing pass; duplicate deleted.
- Read-back: desktop and thumb show a stark poster-flat portrait, lit left
  half with a readable eye, nose, and mouth; the right half falls to black
  with the dim second eye still staring out. It reads as a portrait study,
  not a cartoon and not a horror mask. Mobile holds the full face width
  with the neck falling into black below.
- Framing pass: the first render's face read slightly squat, so a 1.06
  vertical stretch was applied to the face transform and the frame-fit
  factor adjusted; renders re-done and determinism re-verified.

## Deviations

- None from the brief. Two construction choices worth noting: the jaw
  shift is applied to the mouth group only (a full lower-face morph would
  need outline morphing; at 0.4% of face height the mouth-group shift
  carries the effect), and the shadow drift runs on a smooth 480 s cosine
  rather than a 240 s ramp so the boundary never jumps at the take loop.
