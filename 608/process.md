# No.608 "Flat-Lay Bestiary"

EXPANSION #73 paz-tamburrini, prompt block 8 "Paseos de Papel". Her exhibition flyer as a living flat-lay.

## Concept

A pink textured-paper ground, full-bleed, holds a fixed set of eight cut-paper creatures in balanced disorder, the way pieces are arranged on her "Paseos de papel" flyer. Nothing new ever appears and nothing leaves. Every few seconds one creature hops to a nearby spot in three stepped frames, as if a hand keeps rearranging the lay just out of frame. Dragging stirs the lay: nearby creatures scatter a little and resettle. Tapping a creature makes it hop once in place. The flat-lay itself never rotates and no creature ever glides; all motion is stepped hops.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets.
- Palette, strict: pink paper #F2D8D5, ink black #1A1A1A, paper white #FAF7F0, gray #9A9A98, orange #E09A5A spent exactly once, on the bird's beak. The blob's small beak is gray so the orange stays unique.
- Paper texture is data, not a fill: 16 soft tonal patches (translucent paper-white / gray ellipses), 700 short fibre strokes and 500 speckles, all laid out once from a seeded mulberry32 stream and redrawn each frame. No offscreen canvas, no ctx.filter.
- The fixed set of eight creatures, each drawn as flat cut paper with a flat translucent ink silhouette offset down-right as its edge shadow:
  1. Hedgehog, ink, large, facing right (spike-dome path, paper eye).
  2. Bird, ink body with paper belly, orange beak, thin ink legs.
  3. Teardrop, paper white with a small ink seed dot (abstract shape).
  4. Round blob bird, paper white, gray wing, gray beak, ink eye.
  5. Elephant, gray, paper-tinted ear, ink eye.
  6. Hedgehog, ink, smaller, facing left.
  7. Arch, gray (abstract shape, real see-through arch opening).
  8. Crescent, ink (abstract shape).
- Hop engine: a hop lasts exactly 3 frames of 150 ms. Position is sampled only at t = 0, 0.5, 1 of the hop, so motion reads as lift, arc, land, with a brief squash (scale 1.08 x 0.86) on landing. Idle hops are scheduled off the anchored elapsed clock (first at 2.6 s, then every ~2.4-4.3 s) with creature and offset chosen from a seeded RNG stream; targets are clamped inside generous margins and offsets are small, so creatures stay in the lay and never overlap more than slightly.
- Drag stir: while dragging, the first creature found within 20% of the min dimension from the finger hops a short seeded distance away from it; one stir hop at a time keeps the stepped rhythm legible.
- Tap: a short, unmoved press on a creature starts a higher hop in place.
- Determinism: frame one is drawn synchronously at load with every creature at its composed home position and no hop in progress. Nothing is derived from Date.now() or Math.random; all randomness comes from mulberry32 streams with fixed seeds (608073 texture, +17 hops, +41 stir). requestAnimationFrame is typeof-guarded and anchored to the load timestamp.
- Viewport: canvas size comes from the Visual Viewport API with resize listeners on both visualViewport and window; canvas.style.width/height are pinned in px inside draw() every frame. Phone detection uses window.screen physical size (min dimension < 700px), with the aspect test h > w*1.15 only as fallback. The flat-lay fills phone frames edge to edge with its margins intact, and the page ground is the same pink.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp; second render deleted after the check.
- Visual readback of all three renders: pink reads as textured paper (patches, fibres, speckles visible), eight cutouts present with edge shadows, orange only on the bird's beak, nothing clipped on mobile, margins intact.
- Fix round after first readback: the crescent's first two-arc path filled as a lumpy blob, so it was rebuilt as a true two-circle crescent traced through the circles' intersection points; the tonal patches were also softened (alpha 0.025-0.06) so the patchiness stays slight. All renders redone and the determinism byte-compare re-passed after the fix.
