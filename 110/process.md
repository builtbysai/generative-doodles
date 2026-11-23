# №118 Shiftweave - process

## Concept
From Lammetje's "Shift array + Vector point". Horizontal scanline bands in
signal red #D9042B, black #111111 and cream #F2E3C2, each row shifted
sideways by an offset array of sine plus noise, so the straight bands bend
into woven curves and chevrons. The chunk is the texture: the frame is
computed in visible 4px cells with no anti-aliased curves anywhere.

## Construction
- Canvas 2D with a full-frame ImageData buffer at device resolution,
  written through a Uint32 view in 4px blocks. Band colour follows the
  prompt's formula: a fixed rhythm (3 red, 1 black, 2 cream, with a seeded
  per-band variation) sampled at (x + shift) mod period against the band
  row, alternating segments offset by half the rhythm to make the weave.
- The shift array evolves slowly so the curves breathe and migrate.
  Vertical drag changes the shift amplitude (flat lines to deep waves),
  horizontal drag shifts the phase; on release the amplitude eases home
  and the slow evolution continues.
- Full-bleed at every size. House scaffold: Visual Viewport sizing,
  canvas pin, screen-based phone check, synchronous first frame, guarded
  requestAnimationFrame.

## QA log
- Rendered at 1280x900, 390x844 and 720x720 and inspected.
- Fix 1: the first segment width made the weave read as a fine
  checkerboard. Widened the segments and bands, after which the renders
  show clear woven band rows shearing into chevrons, strongest on mobile
  where the wave bends are unmistakable.
- Palette verified as exactly the three specified colours.
