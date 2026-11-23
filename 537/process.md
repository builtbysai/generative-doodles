# №1669 "Painting, Pixel 48000" (JV6, EXPANSION #219 jos-vromans)

- Date: 2006 · 08 · 07 (formula: 2002-01-10 + 1670 days)
- Prompt: Jos Vromans, 2023 Math Painting method as performance. A white canvas
  addressed pixel by pixel; where the pixels land, strokes grow into a vertical
  herringbone of textured brushstrokes in muted grey, maroon and ochre, edges
  ragged like watercolor. The painting builds itself top down, then fades and a
  new herringbone with different parameters begins.
- Gallery note: "A machine paints itself top down, herringbone strokes in grey,
  maroon and ochre. Watch only."

## Build

- Single self-contained `index.html` (canvas 2D, no images, no gradients),
  built from the live №1667 template, following the house rules in
  BATCH-1668-1672-SPEC.md.
- Herringbone from two mirrored directional fields: strokes on the left half
  lean left, on the right half lean right (23-30 degrees from vertical, varied
  per cycle), forming a chevron across the center axis.
- 1,406 strokes per cycle (cycle 0), placed row-major top down on a jittered
  grid. Each stroke is a 9-segment polygon with ragged edges from a seeded
  noise table, tapered at the tips, in grey #8A8A86 (about 55%), maroon
  #7A2E2E (about 25%), ochre #C99A3C (about 20%). No other colors.
- Cycle: 75 s build, 8 s hold, 10 s fade to paper white, then a new cycle
  with fresh parameters (angle, spacing, palette weights) from a seeded RNG.
  Strokes appear one at a time at about 19 per second, each growing in over
  its own step, so individual strokes register.
- Painting area is the top 80% of the frame; the bottom 20% stays paper white
  as the margin where the next stroke is about to land. Sparse fixed paper
  speckle (alpha 0.02-0.06) under the strokes.
- Frame one is a fixed developed state: t = 30 s, 40% of the painting built.
  All geometry comes from mulberry32 seeds (1669 for speckle, per-cycle seeds
  for fields); no Date.now() or Math.random() touches frame one.
- Watch only, no interaction, no click-to-reload. Title/date plate and
  "Watch only." hint drawn on canvas in a dark plate on the paper ground.
- Visual Viewport sizing with resize on visualViewport and window; canvas
  pinned in draw(); phone detection via window.screen with aspect fallback;
  one synchronous frame at load; requestAnimationFrame guarded by typeof.

## Deviations from the prompt

- None of substance. The "pixel-addressed canvas (ImageData)" mechanism in
  the prompt is approximated: strokes are grown from a seeded directional
  field and revealed in top-down order rather than through a literal
  per-pixel ImageData pass, which would be unreadable at doodle scale. The
  visible behavior (top-down placement, ragged brushwork, fade and restart)
  matches the prompt.

## QA

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 desktop,
  390x844 mobile, 720x720 thumb (thumb.png IS the 720x720 render). All three
  inspected visually.
- First gate failed: strokes read as scattered diamonds (ragged edge amplitude
  too high, taper pinched to points, strokes too short). Fixed by lengthening
  strokes (3.0-4.0x row spacing), narrowing them, cutting edge jitter from
  1.7 to 0.9, and softening the taper (0.6 + 0.4 sin). Re-gated after the fix.
- Desktop (1280x900): herringbone chevron clear across the center, ragged
  grey/maroon/ochre brushstrokes, painted front at 40% of the painting area,
  white paper below, title plate and "Watch only." legible.
- Mobile (390x844): same, full-bleed, chevron apex crisp at center.
- Thumb (720x720): same composition, plates legible.
- Full-cycle probe (node, __probe.drawAt): t=30 deterministic across two
  draws (byte-identical); t=0, t=80 (full build), t=88 (fade start), t=95
  (faded), t=120 (cycle 2, new parameters) all differ from each other as
  expected. The t=80 frame shows the completed herringbone filling the top
  80% with the white margin below.
- No em dashes in visible copy. No AI-signature copy.
