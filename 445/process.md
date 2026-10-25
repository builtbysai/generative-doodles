# No.445 Word Shadow

## Concept
Typography as backdrop, after Maite Léon's BELL-PEPPER (2023). One glossy
subject stands centred like a product shot in front of a wall made of its
own name: a single giant word in one heavy grotesque, tone-on-tone just
darker than the ground, letters cropped by the frame edges top, bottom and
sides. The word always names the subject. Paper grain over everything;
no other text anywhere.

Fixed authored pair table, index 0 at load:
1. "LEMON" + glossy lemon — pink ground #E8B4C8, letters #D98CB3, lemon
   #F5D90A, gloss #FFF3B0, shadow #B8860B.
2. "TASSE" + glossy teacup — teal ground #9BD1D1, letters #7FBFBF, cup
   deep plum #5B2A4A with in-family gloss (light plum #8A4A72, dark plum
   #3E1C32, pale gloss #EFC3DC, all authored in-family).
3. "PAS" + glossy shoe — pink ground family (the pair-1 pink, per the
   prompt's "pink ground family"), shoe deep plum #5B2A4A, same gloss
   family as the cup.

## Construction
Single self-contained index.html, canvas 2D only, no external assets.
Canvas sized from the Visual Viewport API (visualViewport + window resize
listeners); canvas.style.width/height pinned in px every frame. Phone
detection via window.screen min dimension < 700 (aspect h > w*1.15
fallback only); the subject is sized from frame height with a width cap,
so it keeps its shape on phones while the ground fills the viewport.

- Word layer: canvas fillText at weight 900, font size 1.18 x frame
  height with a 1.25 vertical stretch, so cap height overflows the frame
  and letters crop top and bottom; initial offset puts roughly two
  letterforms across the width. No outlines on the letters. The layer
  drifts 10px left/right on a 24s sine cycle.
- Subject: 45% of frame height, centred, bobbing 4px on a 6s cycle.
  Lemon: bezier body with a vertical gloss gradient (gloss #FFF3B0 to
  lemon #F5D90A to shadow #B8860B), clipped radial specular, crisp
  highlight dot, authored pore dots, tip nubs. Teacup: gradient bowl
  with clipped gloss streak, handle behind the bowl, rim and tea
  ellipses, saucer. Shoe: pump profile path with gradient fill, clipped
  vamp gloss, ankle opening, sole line. Reflection: the same subject
  painter replayed under a vertical flip transform at alpha 0.15,
  squashed to 0.55, then faded into the ground with a ground-colour
  gradient; a soft contact shadow sits on the reflection axis.
- Paper grain: 2,400 speckles from a fixed-seed LCG table (positions,
  sizes, tone, alpha authored once), drawn over everything each frame.
- Interaction: DRAG slides the word layer horizontally only (clamped;
  subject fixed, different cropped letterforms reveal). DOUBLE-TAP
  (two quick low-movement taps within 380ms, pointer/touch double-fire
  guarded) cycles the pair table and resets the drag offset. No
  click-to-reload.
- Determinism: frame one is drawn synchronously at the constant loop
  phase T = 3.0s; the rAF loop is anchored as T0 + elapsed-since-load
  and guarded by a typeof check. No offscreen canvases, no sprites, no
  document.createElement; all gradients drawn directly per frame.

## QA log
- Rendered thumb twice at 720x720 with render-piece.js; cmp reports the
  two renders byte-identical. Final thumb.png is that render.
- Inspected the 720x720 render: giant cropped tone-on-tone letterforms
  behind the lemon (the M of LEMON dominating, cropped on all sides),
  glossy lemon centred at 45% height with specular highlight, pores and
  tip nubs, flipped faded reflection beneath, grain visible over all.
  First pass had a hard horizontal edge where the reflection fade began;
  the fade gradient now starts at alpha 0 and the edge is gone (verified
  in the re-render).
- Rendered once at 390x844 (phone): lemon intact and centred, letter
  fragments crop dramatically at the frame edges as specced, reflection
  clean, no banding. Composition holds at phone width.
- Not pushed; build only, per brief.
