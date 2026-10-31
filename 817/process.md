# No.817 "Dots (Don't Tell)"

EXPANSION #100 rhys-chatham, PP2. The dot system from Guitar Trio: the inlay dots on a guitar neck are the score, and the secret is which partials live at each one.

## Concept

A guitar neck seen from directly above on near-black, running diagonal from lower-left (nut) to upper-right (body). The board carries strings and fret wires but no numbers and no labels; the only marks are the two ivory inlay dots at the 12th and 15th frets, glowing softly. Strikes land on the nodes and bloom into concentric harmonic rings that expand and fade over 2.5 seconds. A slow seeded riff plays the nodes underneath everything, the visual form of the low continuous strum. Dragging scrubs a play-head along the neck; arriving at a node strikes it. Double-tap reseeds the riff, the prompt's own specced mechanic. The piece is silent, as all gallery pieces are; the strum is rendered as light, not sound.

## Construction

Single self-contained `index.html`, canvas 2D. Canvas size comes from the Visual Viewport API with resize listeners on both `visualViewport` and `window`; `draw()` pins `canvas.style.width/height` in px every frame. Phone detection uses `window.screen` physical size (min dimension < 700px) with the aspect fallback (h > w*1.15) only if screen data is missing; on phones the board widens slightly so the neck stays whole and diagonal.

Node/partial model. Four nodes sit along the played length at the prompt's string-length fractions: 7th at 1/2, 12th at 2/3, 15th at 3/4, 19th at 4/5. Each node owns a partial set drawn from the prompt's 2, 3, 5, 7: 7th [2, 3], 12th [2, 3, 5, 7], 15th [3, 5, 7], 19th [2, 3, 5]. A strike spawns one ring per partial in its node's set: ring radius is proportional to 1/partial (the partial-2 ring travels farthest, at 0.34 of the smaller viewport dimension) expanding with an easeOutCubic over the 2.5 s bloom; ring alpha is proportional to 1/partial squared (capped by a 4/p^2 normalisation so the partial-2 ring leads), shaped by a fast attack and long decay envelope. The struck node also flashes a small gold core, and the inlay dots at struck nodes brighten in proportion to the youngest live strike on them. Rings are closed-form in (strike time, t): nothing is integrated frame to frame.

The riff. Strikes are generated deterministically per (seed, cycle) by mulberry32: a 9.6 s cycle on a 0.8 s grid, each step striking a seeded node with probability 0.42. Cycle 0 is hand-phased so its first strike is the 12th node at t = -0.35 s, which puts frame one 0.35 s into that bloom, the rings already open around the glowing 12th dot. Double-tap pushes a new riff segment with a fresh seed anchored at the tap time; rendering walks the segment list, so old and new patterns never blend. Drag strikes are recorded as {t, node} events and rendered by the same closed-form path as riff strikes.

Palette is strict: fretboard #241A10, dots #E8E0CC, rings #EAC887, background #08080A. The only derived tones are the string lines (#695C4B, dots mixed ~35% over board) and fret wires (#90826F, dots mixed ~55% over board), both inside the board family. Dot glow is built from layered flat-alpha circles; no gradients, no shadowBlur, no ctx.filter, no offscreen canvas anywhere. No visible text except the `<title>`. No microphone, no audio.

Frame one is the synchronous draw at t = 0; the piece clock starts at load and `Date.now()` is never used for drawing state. The rAF loop is typeof-guarded; where rAF is absent the synchronous first frame stands.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. Duplicate deleted.
- Desktop/thumb read-back: dark diagonal neck on near-black, six string lines, fret wires, two ivory dots glowing at the 12th and 15th, gold concentric rings blooming around the 12th dot with fainter inner rings for the higher partials. No numbers or labels anywhere.
- Mobile read-back: the neck stays diagonal and fully inside the frame, dots and rings legible, nothing clipped.
- Fix round 1: removed small side-tick markers initially drawn at the 7th and 19th nodes. The prompt rules that the dots are the only marks; the unmarked nodes now announce themselves only when struck, by their rings. Re-rendered all three sizes; determinism re-verified after the change.

## Deviations

- Silent gallery: the prompt's underlying strum loop is visual only. No audio is emitted, per the standing gallery rule; the riff of node strikes stands in for the strum.
- Frame-one phase: the opening strike is placed at t = -0.35 s rather than exactly t = 0 so the synchronous first frame shows the bloom open at the 12th node instead of a zero-radius point. The phase is a fixed constant, not a clock read, so the determinism gate holds.
- Earlier build drafts carried side ticks at the 7th/19th nodes; removed in QA (see fix round 1) to keep the dots as the only marks.
