# No.769 White Light Field

EXPANSION #94 mary-corse, prompt block 2 "White Light Field".
Mary Corse's White Light paintings (1968): acrylic loaded with glass
microspheres, so the surface retroreflects. It looks almost flat until
the light catches it, and then the gestural brushwork shows through
from inside the surface. This piece rebuilds that mechanism: the light
does not fall on the painting, it lives in it.

## Concept

Seven vertical bands fill the frame edge to edge, whites and warm
grays, silver and taupe, one dominant center field. Each band carries
two buried layers, a microsphere grain field and a set of horizontal
brushstrokes, and both layers are invisible until the band's flare
reaches them. A virtual light sweeps slowly across the field on a
30-second cycle and the bands ignite one after another, warm gold at
the peak, grain and brushwork condensing out of the brightness, then
going quiet again as the light moves on. Dragging takes the light
azimuth into the visitor's hand; on release the sweep resumes from
the dragged position. A tap does nothing. There is no metallic shine
and no mirror: the flare is a warm lift, never a reflection.

## Construction

- Single self-contained index.html, canvas 2D, no external assets.
  Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas.style.width/height pinned in px
  inside draw() every frame. Phone detection via window.screen
  (min dimension under 700px), aspect fallback only. Bands stay
  vertical and full-bleed at every size; page ground is the palette
  ground #F2F0EB.
- Palette (strict): #F7F5F0, #EFEDE6, silver #C9CBCB, taupe #B9B2A6,
  warm gold flare #F4E8C8, ground #F2F0EB. Nothing else.
- Bands: widths [0.11, 0.12, 0.13, 0.28, 0.13, 0.12, 0.11], the wide
  center band dominant. Quiet base variation comes from alternating
  the two whites at partial alpha over ground, plus a whisper of
  silver (alpha 0.10) in every band so no band reads as a flat solid,
  and a hairline taupe seam at each boundary.
- Flare lobe: each band has a fixed view angle theta, spread
  [-1.26, -0.84, -0.42, 0, 0.42, 0.84, 1.26] radians, and a weight
  (center 1.00 falling to 0.60 at the edges). Flare is exactly the
  specced form: pow(max(0, cos(theta - light)), 24) * weight + 0.05,
  clamped to 1. The exponent 24 makes the lobe tight, so at any
  moment one band is lit and its neighbors are already falling off.
- Idle sweep: light(t) = anchorAz + 1.35 * sin(2 pi (t - anchorT) /
  30). The amplitude 1.35 rad slightly exceeds the theta spread, so
  the sweep dwells a beat past each end band before returning. At
  t = 0 the anchor is azimuth 0, which is the center band's theta,
  so frame one opens with the center field at full flare and the
  sequence mid-ignition.
- Drag: pointerdown records the current azimuth and pointer x;
  pointermove sets azimuth = start + (dx / W) * 2 pi * 0.45. While
  dragging, the sweep is suspended. On release the anchor is reset
  to the dragged azimuth at the current t, and the sinusoid resumes
  from there. Tap is inert by design.
- Reveal construction, grain: per band, 430 precomputed speckle dots
  (620 in the center band) from mulberry32 streams seeded per band.
  Each dot has a normalized position, a size, an alpha, a palette
  tone (silver, taupe, or white), and its own flare threshold drawn
  from [0, 0.85]. At draw time a dot's alpha is scaled by
  clamp((flare - threshold) / (1 - threshold)), so beads appear one
  density class at a time as the flare climbs, densest at the peak.
  No per-pixel ImageData anywhere; dots are plain fillRect calls.
- Reveal construction, brushwork: per band, 26 precomputed horizontal
  strokes (34 in the center band), each with y, height, inset, length,
  alpha, and a slight vertical wobble, drawn as two stacked slices for
  a hand-dragged edge. Stroke visibility is a smoothstep gate,
  smooth01((flare - 0.38) / 0.45), so brushwork only emerges in
  strong flare, per the prompt's "visible at flare > 0.4" intent.
  Taupe strokes read as the shadow of the gesture, white strokes as
  its crest.
- Flare wash: over the band base, gold at alpha flare * 0.52 and
  white at flare * 0.22. This is what warms the lit band; the color
  comes from the palette gold, not from any shading model.
- Determinism: frame one is the synchronous draw(0) at load. No
  Date.now(), no wall clock anywhere; the animation phase is elapsed
  time since the first rAF timestamp, drag state is recorded events,
  and flare is a closed-form function of (drag offset, t). All grain
  and stroke data is seeded at load. rAF is typeof-guarded; with no
  rAF the piece rests on frame one. No audio, no microphone.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js:
  qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png
  (720x720).
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. The duplicate was deleted.
- Desktop read-back: seven pale vertical bands; the wide center band
  is clearly warmed to the gold flare tone with horizontal brushwork
  stripes and fine speckle visible inside it; flanking bands are
  quiet, near-flat whites and grays; seams are hairlines only.
- Thumb read-back: same read at square size; center column lit,
  strokes and grain legible, nothing clipped.
- Mobile read-back (390x844): all seven bands present and vertical,
  center band lit with strokes visible, nothing clipped; page ground
  matches the palette ground.
- Deviations: none. Two construction notes, not deviations: the
  prompt's per-pixel grain field is realized as precomputed dot
  fields because the QA renderer has no ImageData pipeline, and the
  flare's gold lift is a flat palette wash because the house rule
  forbids gradients; the lobe math and reveal behavior are the
  prompt's own.
