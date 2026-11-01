# №1322 "Eagle Creek, Thursday Night" (sadie-barnette SB3, PP489)

## Source

Barnette's The New Eagle Creek Saloon (2019-ongoing): pink neon sign,
holographic bartop with embedded crushed beer cans and glitter-coated
telephones, glittering speakers, holographic couches; "A friendly place,
with a funky bass, for every race"; activated by DJs and Thursday happy
hours. The piece is seductive first, meaningful second: the room is mostly
dim, and the neon and glitter carry the light.

## Frame one (t = 0, boot flag)

A dim bar interior, full-bleed. Back wall: dark field with faint vertical
paneling, six archival-photo rects (blurred-blob abstractions in muted
tones, never faces) scattered at varied scales and slight rotations.
Midground: two holographic couches (magenta seat plus darker backrest,
flat-alpha sheen bands) and two speakers flanking the sign. Centered
upper third: the pink neon sign "EAGLE CREEK" in layered flat-alpha glow
(no shadowBlur), with a small halo band behind it. A slow-turning disco
shimmer radiates faint streaks from upper center. Foreground: the
holographic bartop sweeps the lower third in perspective, hue-cycling
flat-alpha silver-pink and mint bands over a deeper pink base, with
jagged aluminum crushed-can glyphs embedded in it and a glitter-coated
telephone (dark handset trapezoid, magenta ear cups, gold glitter dots)
at right. Gold glitter dots the room.

## Mechanics (all closed-form over piece time and recorded events)

- Rhythm pulse, 1.2 s period: beat envelope exp(-phase/0.35) drives the
  neon flare (alpha 0.25 to 0.80), the glitter field brightness, and the
  speaker-face glitter. The room never goes fully bright.
- Tap (never click-to-reload) triggers a "Thursday-night set": for 30 s
  the pulse quickens to 0.6 s, the neon flare strengthens, and a glitter
  storm rises through the room (90 sprites, easing in over 2 s, easing
  out over the last 4 s), then settles.
- Drag pans the viewpoint: recorded drag segments decay with tau 2.5 s,
  clamped to +/-30 px, applied with parallax (back wall 0.3, midground
  0.5, bartop 1.0); release returns to rest.
- Disco shimmer rotates at 0.12 rad/s; bartop hue bands breathe on
  independent sines.

## Adaptations

- Holographic surfaces are hue-cycled flat-alpha shapes, never gradients
  (the QA renderer cannot render gradients reliably).
- Neon glow is layered flat-alpha fillText passes, never shadowBlur.
- Photo rects and speakers are sized from min(W,H) so portrait phones
  keep photographic proportions instead of pole-thin speakers and
  tall-narrow rects.
- The neon sign text "EAGLE CREEK" is prompt-specced content, verbatim;
  no other visible text except the title element.
- All layout, glitter, cans, and storm sprites come from a seeded
  mulberry32 stream (seed 1322000), never Math.random. Frame one is
  drawn synchronously at exactly t = 0 via a boot flag; the clock starts
  only with the rAF loop (plain function declaration behind a typeof
  guard).

## Fix rounds

1. Couches first read as flat discs: added a darker backrest ellipse
   rising behind each seat so they read as upholstered seating.
2. Mobile speakers were pole-thin and photo rects tall-narrow: both
   re-keyed from min(W,H).
3. Bartop first read washed-out: base deepened to #C98AB0 and band
   alphas lowered; neon halo ellipse shrunk and dimmed.

## QA

Rendered with node-canvas at 1280x900 desktop, 390x844 mobile, 720x720
thumb; all three inspected. Thumb rendered three times plus a final
re-verification, all cmp byte-identical. Token scan clean of Math.random
(use is only a comment stating it is not used), createElement,
AudioContext, getUserMedia, gradients, shadowBlur, and filters.
Silent: no audio of any kind.

- index.html md5: f8ffee793523a674adb55fb18502a29b
