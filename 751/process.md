# No.751 Dissolve Wall

EXPANSION #91 james-turrell, prompt block 8 "Dissolve Wall". After Turrell's
Dissolve (Curved Glass) at MASS MoCA's "Into the Light" (2017).

## Concept

A dark wall, and in it a wide rounded aperture. Behind curved glass, an LED
program breathes color so slowly that the wall around the aperture picks up
the tint and the whole room seems to change temperature. No visible fixtures,
no reflections, no text: the apparatus stays hidden and the wall simply
breathes. Watch-only; the viewer commits time.

## Construction

- Strict palette, nothing else is ever drawn: wall #232326, aperture rim
  #101012, and the five program colors in sequence: deep blue #2A4AE8, cyan
  #3AD8E8, magenta #E04AD0, amber #F0A840, deep red #B82828.
- The aperture is one organic blob shape, defined once in unit space from a
  seeded mulberry32 stream (seed 75191): 10 anchor points with seeded radius
  jitter (0.85 to 1.13) and slight angular jitter, y squashed by 0.72 so the
  shape is always wider than tall, drawn as a smooth closed curve through
  midpoint quadratics. The same path, scaled, serves every layer, so rim,
  glass, shading bands, and bleed are concentric copies of one hand-cut
  opening. One fix round during QA: the first seed read as a near-perfect
  ellipse, so the jitter was widened until the outline read hand-cut.
- Curved glass, without gradients or reflections: the aperture is filled
  with the rim color as a dark base, then the program color at alpha 0.94,
  then five concentric inset bands (scale 0.96 down to 0.72) of the program
  color at alpha 0.13 each. The bands accumulate toward the center, so the
  middle of the glass sits fuller and brighter while the edges stay thinner
  against the dark base: a barrel curve of light. Two inner-shadow strokes
  of the rim color (alpha 0.55 and 0.22, scaled 0.99 and 0.955) press the
  edge back in. No highlight streaks, nothing photographic.
- Color bleed: six layered copies of the blob at scales 1.36 to 3.10, filled
  with the current program color at alphas 0.012 to 0.052, tint the wall
  around the aperture. The steps are fine enough to read as one soft pool of
  tint spilling past the frame edges. The bleed color is the same closed-form
  program color, so wall and glass always breathe together.
- Program (closed form in loop time t): a 240 s seamless loop of five 48 s
  segments, one per color: a 40 s hold at the anchor, then an 8 s smoothstep
  crossfade to the next; the last fade returns deep red to deep blue, closing
  the loop. Frame one is the synchronous draw at t = 0: deep blue at hold
  start, bleed matching.
- Sizing: canvas from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas.style.width/height pinned in px inside
  draw() every frame; devicePixelRatio applied to the backing store only.
  Phone detection via window.screen (min dimension under 700 px), aspect
  h > w * 1.15 as fallback only; on phones the aperture takes 0.40 of width
  and 0.115 of height, keeping it wide and low in the tall frame.
- Determinism: program color, bleed, and shading are pure functions of loop
  time; the blob is fixed at load from the seed. Nothing is derived from
  Date.now() and there is no Math.random. The rAF loop, where present, is
  anchored at its first callback timestamp plus elapsed time and is
  typeof-guarded; the QA renderer has no rAF, so QA renders are exactly the
  synchronous frame. An inert QA hook (?seed=tNN, house convention) offsets
  the start time for state-forced checks; without it the piece starts at 0.
- No audio, no microphone, no interaction handlers: watch-only.

## Deviations

- Preview-cycle compression (sanctioned by the prompt itself): the original
  program runs an hour, each color holding 8 to 10 minutes. The prompt
  explicitly offers a compressed preview cycle with the identical mechanism,
  so the piece ships a 4-minute loop: 40 s holds with 8 s crossfades between
  the same five colors in the same order. The honesty note about the
  compression belongs in the gallery note, not on the piece, since the piece
  carries no text.
- Glass shading by layered alpha bands instead of the prompt's barrel
  distortion offset map: the renderer has no offscreen sampling, and the
  house rule bans gradients; concentric inset bands of the program color
  over the dark rim base give the same curved-depth read with palette colors
  only.

## QA log

Renderer: node ~/workspace/tools/render-piece.js (node-canvas), 2026-10-31.

- qa-desktop.png (1280x900): dark wall, wide hand-cut aperture glowing deep
  blue, darker glass edge and fuller center, blue bleed pooling softly on
  the wall and spilling past the frame. Read back and passed after one fix
  round (see Construction: wider blob jitter, finer bleed steps, lower
  phone aperture).
- qa-mobile.png (390x844): same composition in the tall frame; aperture
  wide and low, nothing clipped, bleed contained.
- thumb.png (720x720): same read at square size.
- Determinism: thumb.png rendered twice, cmp byte-compare identical; the
  duplicate was deleted. Re-verified after the fix round.
- State-forced check (throwaway render via ?seed=t116, read back, deleted):
  mid magenta hold: aperture and bleed both magenta, glass shading and rim
  intact. Correct.
- Grep audit of index.html: no Date.now, no Math.random, no createElement,
  no AudioContext, no gradients, no shadowBlur, no external URLs, no em
  dashes. No text in the piece besides the title.
