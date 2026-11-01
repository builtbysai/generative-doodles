# №1460 "The Bilderpartitur" (ulrike-ottinger UO5, PP707)

## What it is

A cork board of black-and-white photograph cards, webbed with red yarn, with
three advent-calendar cutout windows whose kraft-dark doors open to reveal a
second image beneath. The tableau is held: nothing moves on its own. The
visitor explores by dragging cards and opening windows.

## Frame one

Kraft board (#b09a7a) filling the frame with a faint seeded cork-dot texture.
Nine cards in a loose 3×3 grid, some overlapping: costumed figures (standing
and arms-raised), two junks, two streets, a mask, a trophy — all greyscale
silhouettes (black #141414, white #f2f2f2, grey #8a8a8a) on white or grey card
grounds with a white print margin. Fourteen red yarn curves (#c1272d) web
between the cards, pinned with small red dots where they meet card edges.
Three kraft-dark (#8a7358) cutout doors with handles sit scattered among the
cards, all closed at frame one. No visible text except `<title>`.

## Motion / interaction

- Drag a card: it follows the finger and its yarn re-routes live (curves are
  recomputed every frame from the cards' current anchor points). The dragged
  card draws on top while held. Drag never resets the board layout: card
  positions live in the cards array and nothing ever re-seeds or re-lays them.
- Tap a cutout window: its door swings on its left hinge over 0.5 s (eased,
  closed-form over the recorded toggle event) to reveal a second greyscale
  image beneath (mask, trophy, junk). Tapping again closes it. Opening a
  window never shuffles the cards.
- Never click-to-restart, never click-to-reload, never a solved or completed
  web state.

## Adaptations

- Cards as greyscale silhouette rectangles (no real photographs); yarn as
  quadratic curves recomputed per frame from rect-border anchor points, with
  a seeded sag per pair; windows as hinge-animated rectangles (door width
  shrinks from the hinge edge, with a riding edge line and handle).
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing.
- Fading alphas are literal fixed decimals; dots are own-beginPath arcs with
  a moveTo first, or filled rects (node-canvas quirks). Cork dots use a
  literal rgba string, never a computed alpha.
- Determinism: frame one = draw(0) via boot flag; the rAF loop is a plain
  function declaration behind a typeof guard; all layout, yarn sag, cork
  dots, and window spots come from one mulberry32 stream (seed 1460000),
  never Math.random; hinge animation is a closed-form function of recorded
  toggle events and piece time, never frame-integrated state.
- Viewport: size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw(); phone detection via
  window.screen physical size (min dimension < 700 px) with aspect fallback;
  the board is full-bleed on phones. Card and window rects are clamped to
  the frame so no element is ever clipped at any aspect ratio.

## Verification (forced-time probe harness, tmp/probe1460.js)

Vm-isolated instance, stubbed rAF driving the piece's own loop, pointer
events through its own listeners (window.__piece exposes draw, cards, wins,
cardRect, winRect, doorProgress for probing):

- t = 0 redraw pixel-identical; renders byte-identical across repeated
  render-piece.js runs; thumb byte-identical.
- Red yarn 7,218 px at t = 0; after dragging card 0 by (+80, +40) px the card
  moved exactly 80, 40 and yarn re-routed (6,590 px).
- Card 8 (shares no yarn pair with card 0) pixel-identical before/after the
  drag, and again after both window toggles: drag never resets the layout,
  opening a window never shuffles the cards.
- Window 0: door-coloured px 22,436 closed → 5,048 open (border ring only);
  black silhouette px 814 closed → 6,647 open (second image revealed);
  re-tap restores 22,436 (closed again).
- Palette scan: 0 saturated green/blue-dominant pixels anywhere (red yarn
  is the only colour; antialiased yarn edges keep red dominant).
- Token scan: the only Math.random / Path2D / shadowBlur hits are comments
  stating they are never used.

## Fix rounds (2)

1. First renders clipped the top and bottom card rows at the frame edge on
   desktop (tall cards + jitter pushed them past the border). Card and
   window rects are now clamped to the frame in cardRect/winRect; all
   renders re-done after the fix.
2. First renders hid street doors/windows and mask eyes: the detail colour
   was chosen against the card ground instead of against the silhouette
   colour, so white details vanished on white silhouettes. Detail is now
   chosen against the silhouette (grey on black, black on white); all
   renders re-done after the fix.
