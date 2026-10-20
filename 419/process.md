# No.419 Funk My Life

EXPANSION #45 (kittyo.illustration), prompt KIT3. Gallery date 2003 · 03 · 06.

## Concept

After Kitty O'Rourke's 2022 #facetober retro-funk poster: a Black woman
with a huge afro, square mustard glasses and oversized flower earrings,
chin up and confident, set inside a light-pink gig-poster frame on a dark
plum ground. The words FUNK MY LIFE arch over her in big hand-lettered
caps, cream with a pink shadow; psychedelic dot flowers and swirls fill
the plum around her and the star dots twinkle. WATCH-ONLY: the loop is
the piece, no interaction at all.

No signature (she does not sign these pieces) and no text beyond the
poster lettering, per the set's text rule.

## Construction

One canvas, flat colour only, design space 1280x900, CENTRED fit (page
ground in the frame pink). Palette closed at the prompt's hexes: ground
#2A0E2E; star dots #FFE066; frame #FFC0E8; skin #6B3A1F; afro #1A1A1A
with highlight #7B2D8E; glasses #D9A419; earrings #FF4FA3 and #F26A1B;
top #2A9D8F; lettering #FFF6E8 with shadow #FF4FA3; pattern dots #FF9ECF /
#FFE066 / #7BCEEB. Black outlines (#1A1A1A) on every shape, her grammar
in this set.

- Loop: 30s, seamless. Everything periodic divides the loop.
- Lettering: per-letter PATH DATA. Each of the nine glyphs (F, U, N, K,
  M, Y, L, I, E) is a table of filled polygons in a unit box, hand-cut
  with slight wobbles. Every frame the title is laid out afresh along an
  arc (centre 640,975, radius 790), each letter translated onto the arc,
  rotated tangent to it plus a small fixed per-letter tilt, filled cream
  over a pink shadow offset, thin black outline. Never drawn once to an
  offscreen canvas, never a system font.
- Groove pulse: the whole title scales 1.0 to 1.03 about (640,330). The
  prompt's 4s pulse period is resolved to 8 whole cycles per 30s loop
  (3.75s, the nearest whole-cycle period) so the value is identical at
  the seam; documented here as the one numeric adaptation.
- Earrings: pendulums anchored at the ears, string plus a six-petal
  flower (pink with orange centre on the left, swapped on the right).
  Angle is a pure sine on the specced 2s period, 0.23 rad amplitude, the
  two in opposite phase: 15 whole cycles per loop each.
- Afro: one scalloped blob path (radius modulated by 14 lobes), filled
  black and stroked once, with purple highlight arcs inside the
  silhouette. The bounce is a barely-there squash about the chin pivot
  on 6 whole cycles per loop (scaleY 1.013, scaleX 0.994 at the peak).
- Figure: face ellipse with features set high (chin up), happy upward
  eye arcs, small nose curve, confident smile; square glasses as a black
  rim under a mustard frame with bridge and temples; teal top with a
  cream collar arc; neck and ears in the skin tone.
- Pattern field, all fixed tables drawn behind the figure: exactly 90
  star dots asserted (a quarter of them four-point sparkles), each
  twinkling on 2, 3 or 4 whole cycles per loop with a fixed phase;
  exactly 12 stroked spiral swirls asserted in pink and sky; exactly 8
  dot flowers asserted (centre dot plus a ring of 8) turning slowly on
  one whole cycle per loop.
- Frame: border 54px, 6% of the 900px short side. Pink band, black rims
  at the outer and inner edges drawn last so the border reads clean, and
  a thin pink pinstripe inside the plum.
- Determinism: frame one is drawn synchronously at the CONSTANT phase
  T = 7.3s. The earring pendulums sit at sin(2*pi*7.3/2) = -0.81 of full
  swing, one each way: earrings mid-swing, poster complete. The rAF
  loop, typeof-guarded, is anchored there and advances in fixed 1/60
  ticks. Frame one is never drawn from Date.now() minus an offset.
- House rules: Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned every frame via style
  width/height in px; phone detection via window.screen min dimension
  below 700px with aspect fallback (h > w*1.15).
- No offscreen canvas, no gradients, no shadowBlur, no filters, no
  Math.random, no Date.now, no absolute URLs, no em dashes. All marks
  are JS data drawn directly on the one canvas each frame.

## QA log

- Rendered with the house renderer (node-canvas) at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Thumb rendered twice from the shipped script: byte-identical
  (md5 a587e856...).
- Desktop: the title arches across the upper third and reads FUNK MY
  LIFE at a glance, every letter inside the frame; afro highlights sit
  inside the silhouette; glasses, upward eyes, smile and both flower
  earrings read clearly; swirls and dot flowers fill the plum without
  crowding the portrait.
- Thumb: centred fit keeps the whole poster in frame on the pink page
  ground; title, afro, glasses and earrings all read at gallery size.
- Mobile: centred fit holds the complete poster, small but whole, on
  continuous frame pink.
- First-pass fixes: the title at its first scale ran wide, the end
  letters (F and E) spilling across the inner frame rim; the glyph
  scale came down to 0.84 and the arc radius out to 790, which brought
  every letter inside the plum. The afro highlight arcs first floated
  above the head as stray purple rainbows; they were redrawn as arcs
  centred on the afro itself, inside the silhouette, where they read as
  sheen on the lobes.
- Assertions verified at load by construction: loop 30s, stars 90,
  swirls 12, dot flowers 8. A failed count throws rather than shipping
  a wrong enumeration.
