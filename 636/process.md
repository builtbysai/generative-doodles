# №1977 One Hard Source

Driver: three figure agents sweep across a pitch black frame on looping gesture cycles, and each crossing of the single central bright plane flares the frame toward white before it falls back into dark.

- FIRST_T: 9.3 s. Cycle length: 32 s.
- Interaction: watch-only. No pointer input; the timing of the crossings is the timing of the piece. Hint reads "Watch bodies find the light."
- Gallery date: 2007 · 06 · 11 (shown under the caption).
- Palette: pitch black ground, blown warm white plane, skin in hard highlight, pale gold flare.
- Technical approach: dark scene, one directional source shown only as its effect (the bright plane and the flare). Figure agents on looping gesture cycles; crossing factor is a Gaussian of distance from plane center and drives both how lit the figure is and the flare intensity. Exposure wash is keyed to the brightest pixel: flare above 0.55 pushes a warm white wash over the whole frame, up to 0.62 alpha at peak flare. Bloom is a single radial gradient centered on the brightest crossing, plus a warm core.
- Audio: none. The prompt implies no sound; no WebAudio is used.

## Probe results

Rendered with node-canvas render-piece.js from the actual script:
- t = 9.3 (FIRST_T), 1280x900 desktop: md5 69311d226dbf07828dd86a48dcb43930. Figure mid-crossing in the plane, arm thrown up, glass glinting, bloom halo visible.
- t = 29.3 (FIRST_T + 20 s), 1280x900 desktop: md5 6aec786604d59b99aadc2b7d6e538d8a. Visibly different: the crossing figure has moved to the plane edge, a second figure crosses at the right in shadow, and the exposure wash has lifted the whole frame toward gray.
- 390x844 mobile and 720x720 thumb renders inspected; thumb.png is byte-identical to the 720x720 render (md5 9abb5b1da2df1f7745d39a6c5f57a509).

## Deviations from the prompt

- None material. The source itself is never drawn as an object, only the plane and the flare. The scene is never lit evenly: shadow figures stay near black and only the plane and the crossing figure blow out.
- The figures are deliberately abstract (torso slab, head circle, raised arm line, glass block) rather than naturalistic bodies, in keeping with the series house style.

## Known warts

- The bloom halo reads as a soft disc with a faint edge where the radial gradient ends against the bright plane.
- The hair cap covers the top half of each head, so a lit head reads as half dark, half skin; this is intended as hair but can read as a shadowed face.
- At low flare moments the frame is very dark by design; shadow figures are barely visible, which is the point of the piece but means some frames look almost empty.
