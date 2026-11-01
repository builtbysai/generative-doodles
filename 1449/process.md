# №1449 "Hundred Beauties, One Contour" (tabea-blumenschein TB2, PP680)

## What it is

A slow parade of androgynous beauties crossing the frame one at a time. Every
figure shares one strong black contour and one simplified standing silhouette;
only the outfit and attributes change: a pirate queen in a crimson bodice with
tattooed arms, a gold hoop earring, a wide black hat, and a drooping cigarette;
an empress in a fiery scarlet robe covered in big black spiders, ringed at the
base by turbaned skulls; a sailor in a navy-and-white striped top with a heart
tattoo on one arm and an anchor tattoo on the other. The ground is constant
paper #f2ead8; only the figure changes. The costume is the body: no wearer
beyond the outfit, no crowd, never two figures at once.

## Motion

Closed-form parade, one 7.5 s slot per figure, 22.5 s cycle: enter from the left
(1.2 s, eased), tableau hold (~3 s, the eye reads the outfit first), one small
precise gesture (1.5 s, sine in/out), exit to the right (1.8 s, eased). The
pirate queen's hand lifts the cigarette toward her mouth; the empress turns her
head; the sailor flexes an arm. Frame one sits at the tableau start of the
pirate queen (phase-shifted slot start), so the thumb shows a complete figure.

## Interaction (drag only, never click-to-reload)

- Drag sideways on empty ground: scrubs the parade — horizontal drag distance
  converts to parade-time boost (0.02 s per px, committed on release), so the
  parade hurries forward (or backward) but never jumps to a random figure.
- Drag on a figure: pauses its exit — the parade clock freezes at the grabbed
  moment and resumes from exactly that point on release, so attributes can be
  read at leisure.

Both are closed-form functions of the recorded drag list plus piece time, never
frame-integrated state.

## Adaptations

- Figures as contour paths with flat fills and attribute layers (tattoos, bodice
  lacing, spiders, skulls as small repeated shapes); parade as a timed queue
  with hold-then-move phases; drag scrubs parade speed, never jumps.
- The pirate queen's bodice is a flat costume shape; all three figures are
  stylized, non-sexualized, never photorealistic; no visible text besides
  `<title>`.
- Silent by design (no AudioContext at all). No offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing.
- Fading alphas rounded to 4 decimals; dots as filled rects or own-beginPath
  arcs (node-canvas quirks). All randomness from mulberry32 (seed 1449000),
  never Math.random. Frame one = draw(0) via boot flag; rAF loop is a plain
  function declaration behind a typeof guard. Canvas sized from the Visual
  Viewport API with resize listeners; canvas pinned in px in draw(); phone
  detection via window.screen physical size (min dimension < 700 px) with the
  aspect fallback; centered composition keeps its shape on phones.

## Verification

- Rendered at 1280x900, 390x844, 720x720; all three inspected. Thumb
  byte-identical across repeated renders (including after the fix below).
- Forced-time probe harness (vm-isolated instance, stubbed rAF driving the
  piece's own loop, pointer events to its own listeners): two fresh instances
  byte-identical at t = 0; frame one holds crimson bodice 31,815 px with zero
  scarlet and zero navy; t = 0 vs t = 22.5 differs by 0 px (loop closes
  exactly); t = 7.5 shows the empress (scarlet 103,327 px, spider black
  7,780 px, turban teal 3,664 px); t = 15 shows the sailor (navy 24,681 px,
  scarlet 0); tableau vs gesture at the same figure differs by 6,894 px (the
  hand lifts the cigarette); a +300 px scrub drag advances the parade ~6 s
  (figure 0 tableau to figure 1 tableau); a drag on the figure freezes the
  parade (state at t = 5 equals state at t = 2) and release resumes from the
  frozen point; enter/exit boundaries show exactly one figure on stage.
- Token scan clean: no Math.random, AudioContext, getUserMedia, createElement,
  Path2D, shadowBlur, gradients, fillText/strokeText, or localStorage.

## Fix rounds (1)

- Pause bug caught by the probe: `onDown` set `paused = true` before computing
  `pauseParade = paradeTime(t)`, and `paradeTime` returns the stored
  `pauseParade` while paused — so the freeze captured the stale initial value
  (0) instead of the grabbed moment. Fixed by capturing `pauseParade` before
  setting `paused`. All renders re-done after the fix; frame one unchanged
  (thumb still byte-identical).
