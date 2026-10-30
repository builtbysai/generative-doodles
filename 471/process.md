# No.471 Moon Reader

EXPANSION #56 andrea-ucini, prompt UC7.

## Concept

His "Taking a Break" astronaut as a tranquil watch-only loop. A lone
astronaut sits on the gray curve of the moon at the lower left, reading a
small red book. Above him a star-filled black sky, and hanging in the
upper right the Earth, blue and bright. The red book is the only warm
colour in the void. Solitude is the subject: the figure stays small and
the sky stays enormous. No flag, no spacecraft, no second figure, no
interaction of any kind.

## Construction

- Single self-contained index.html, canvas 2D, exactly the prompt palette:
  sky #05070F, stars #FFFFFF, moon #9A9A96 with crater shadows #7A7A76,
  suit #E8E6E0 with visor #2B4A7A, book #D9261C, Earth #2B5FE3 with cloud
  swirls #FFFFFF and landmass #4E7A4E. The crater grey doubles for the
  backpack panel, boot soles and the contact shadow, so no colour outside
  the palette is introduced.
- Composition: the moon is the top of one huge circle whose crest sits at
  80% of frame height, a low curve across the bottom with seeded crater
  ellipses clipped inside it. The astronaut is about 20% of frame height,
  seated on that curve at the left with his seat point solved from the
  circle equation, so he rests on the surface at any aspect. Earth hangs
  at upper right at about 19% of the smaller frame dimension, with a faint
  halo in its own sea colour.
- The astronaut is built from stroked shapes in Ucini's flat economy:
  bent legs with grey-soled boots flat on the ground, a rounded backpack
  behind a leaning torso, two arms reaching down to the book, and a round
  helmet with a dark visor and a small glint. The helmet nods on a 20s
  cycle, dipped toward the book as the page turns.
- The book is drawn open with a vertical spine: two red cover leaves,
  white page blocks well inset so the red frames them, and one turning
  page, a white quad hinged on the spine whose free edge sweeps from the
  right page to the left over 1.6s once every 20s. At the first-frame
  pre-roll it is caught mid-flip.
- Earth: static green landmass blobs on the blue disc, with four seeded
  cloud groups drawn as overlapping white ellipses that drift sideways
  inside a clip and wrap; one full wrap takes the whole 60s loop, so the
  drift is seamless.
- Motion is a seamless 60s watch-only loop with no interaction at all:
  cloud drift on 60s, page turn and helmet nod on 20s, and every star
  twinkles on a period drawn from 5, 6, 7.5, 10, 12, 15, 20 and 30
  seconds. Every period divides 60, so the loop boundary is exact. No UI,
  no text, no hint, no audio.
- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas.style.width/height pinned in draw()
  every frame. Phone detection via window.screen (min dimension under
  700px) with the h > w*1.15 aspect fallback; the composition keeps its
  shape on phones, the figure gets a slight legibility bump on small
  screens, and the page ground is the sky colour #05070F.
- Determinism: the first frame is drawn synchronously at a constant loop
  phase (t = 25s pre-roll baked in: page mid-turn at 0.375 of its flip,
  helmet dipped, clouds part-drifted, stars at developed twinkle phases).
  The animation loop, when running, is anchored as that fixed offset plus
  elapsed time since load, and requestAnimationFrame is typeof-guarded
  so the node QA renderer draws the same frame. All load-time layout
  (stars, craters, cloud groups) uses a seeded mulberry32 RNG; no
  Math.random anywhere.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb rendered twice and byte-compared with cmp,
  identical, after the final fix. Second render deleted after the check.
- Desktop and thumb: the astronaut reads instantly as a seated figure in
  a white suit, backpack behind, dark visor turned down to the book; the
  red book is unmistakable in his hands with the turning page caught
  mid-flip; Earth blue and bright in the upper right with green land and
  white cloud swirls; craters scattered along the moon curve.
- Mobile: composition keeps its shape in portrait; astronaut, book and
  Earth all legible, nothing clipped; page ground matches the sky.
- Fix during QA: the first render's book read mostly white, the red
  cover reduced to a rim. The page blocks were inset further so the red
  cover frames them on all sides, and the turning page gained a faint
  edge line so the flip reads against the white page beneath it. All
  renders were regenerated and the determinism gate re-passed after the
  fix.
- Deviations from the prompt letter: none. Two interpretation notes:
  Earth's rotation is carried by the drifting cloud swirls only, with
  the landmasses held fixed, which is the prompt's own parenthetical;
  and the backpack panel, boot soles and contact shadow reuse the
  crater-shadow grey rather than adding a new tone.
