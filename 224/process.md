# No.414 Pattern Walker

EXPANSION #44 (yeti-iglesias), prompt YETI6. Gallery date 2003 · 03 · 01.

## Concept

After Yeti Iglesias's pattern-stacked garment mechanism (Self-care /
"Read a little relax a lot", Sweetemberdays26 prompt 2, 2026-09-21): a girl
walks right, mid-stride, across a peachy-cream ground - long black hair in
a bun, an orange polka-dot top, olive pants with pink stripes, an olive
scalloped tote with an orange cat face bouncing at her shoulder, and a pink
book with a mushroom on its cover held up in front of her. Autumn leaves
fall around her continuously. WATCH-ONLY: the walk is the piece, no
interaction at all.

The only lettering is her hand-lettered "Yeti" signature, stroke paths
only, bottom right (the set's designed-text exception).

## Construction

One canvas, flat colour only, design space 1280x900, CENTRED fit (page
ground in the piece's peachy cream). Palette closed at the prompt's hexes:
ground #FCE8D5; hair #1A1A1A; skin #D97B4F; top #F26A1B with dots #FF9ECF;
pants #6B7A2A with stripes #FF9ECF; tote #8A9A33 with cat face #F26A1B;
book #FF9ECF with mushroom cap #F26A1B; leaves #E08A2E and #6BAE6B.

- Loop: 24s, seamless. The walk cycle is the prompt's 8 KEYFRAMES resolved
  as 8 keyframe rows per joint (near/far thigh, near/far knee bend, body
  bob, far upper arm, far forearm, near upper arm, near forearm),
  interpolated with a smoothstep between neighbouring keyframes across a
  2s stride, 12 strides per loop - so the loop seam is a stride seam and
  no joint ever jumps at the wrap.
- Keyframe treatment: thighs swing in opposite phase (+/-0.55 rad at the
  contact keyframes); the knee bend trails the thigh and peaks mid-swing
  (0.85 rad) as the leg comes through; the body bob rises twice per stride
  (one rise over each step, 6px); the far arm counter-swings against the
  far leg. The near arm carries the book, so instead of a free swing it is
  keyframed raised (upper arm about +0.74 rad, forearm bent up +1.42 rad)
  with a gentle counter-bob against the body bob; the book is placed from
  the near hand's forward kinematics each frame, so it never leaves her
  hand.
- Patterns stay glued to their garments: every frame, each garment shape
  is drawn on the one canvas, clipped to, and its pattern drawn inside the
  clip under that limb's own transform - the polka-dot grid inside the
  torso path (which rides the bob), and the pink pants stripes inside each
  thigh and shin segment shape (drawn in segment-local coords under the
  segment's rotation). Never an offscreen pattern layer, never a pattern
  in screen space.
- Figure: articulated parts - torso, head with hair cap and side lock,
  bun, upper/lower arms, upper/lower legs, bare ankles and black shoes.
  The long hair mass and bun rotate about the neck by a bounce sine at two
  whole cycles per stride.
- Tote: a shoulder pendulum whose phase lags the stride by exactly 2 of
  the 8 keyframes (a quarter stride) - the prompt's 2-frame lag made
  exact. The bag hangs back-down from the far shoulder on a fixed offset
  swung by the lagged angle, clear of the legs; scalloped top edge (5
  arcs) and the orange cat face (head, ears, eyes, nose, whiskers) drawn
  in bag-local coords under the pendulum rotation.
- Leaves: exactly 24 (asserted), a fixed seeded table. Each leaf falls a
  whole number of field heights per loop (k = 1 or 2; the field height
  includes the wrap margin, 984 design px), sways on a whole number of
  cycles per loop (2-5) and tumbles on a whole number of cycles per loop
  (1-3), so every leaf is exactly home at the seam. Half the table draws
  behind the walker, half in front.
- Grain: exactly 420 fixed speckle dots (asserted), leaf-orange and olive
  at flat alpha steps, drawn last in table order over everything.
- Determinism: frame one is drawn synchronously at the CONSTANT phase
  T = 6.75s. 6.75 mod 2 = 0.75 puts the stride exactly on keyframe 3:
  near leg swinging back through passing, far leg forward, body bob at
  -3, and the tote - sampled at the lagged keyframe 1 - mid-bounce. The
  rAF loop, typeof-guarded, is anchored there and advances in fixed 1/60
  ticks. Frame one is never drawn from Date.now() minus an offset.
- House rules: Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned every frame via style
  width/height in px; phone detection via window.screen min dimension
  below 700px with aspect fallback (h > w*1.15).
- No offscreen canvas, no gradients, no shadowBlur, no filters, no
  Math.random, no Date.now, no absolute URLs, no em dashes. All marks are
  JS data drawn directly on the one canvas each frame.

## QA log

- Rendered with the house renderer (node-canvas) at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Thumb rendered twice from the shipped script: byte-identical
  (md5 bff0cc3d...).
- Desktop: girl centred mid-stride on cream, polka dots and pants stripes
  reading as glued patterns, mushroom book up in front, tote at her back
  with the cat face readable, leaves front and back, signature reads
  "Yeti" bottom right.
- Thumb: centred fit keeps the whole figure in frame; walker, book, tote
  and signature all read at gallery size.
- Mobile: centred fit holds the whole scene small but complete on
  continuous peachy cream; cat face, stripes and signature legible.
- First-pass fixes: the tote first hung straight down from the shoulder
  behind the torso hem, where the legs crossed it and the cat face was
  unreadable; it was moved to a back-down offset from the shoulder and
  drawn over the torso's back edge (strap over the shoulder, hair over
  the strap), which cleared the face and made the scalloped top edge read
  as the bag's rim.
- Assertions verified at load by construction: loop 24s, leaves 24,
  grain 420. A failed count throws rather than shipping a wrong
  enumeration.
