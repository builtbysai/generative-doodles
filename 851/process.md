# No.851 "Flying Through the Lists"

EXPANSION #104 laurie-anderson, PP12 "Chalkroom Flight".

## Concept

Laurie Anderson's *Chalkroom* (with Hsin-Chien Huang): a black universe of white
hand-drawn words that the viewer flies through, words drifting past "like tufts
of dandelion, stars, or snow", the drawing "gritty and drippy and filled with
dust and dirt", never "brittle and bright". This piece is that flight as a
canvas loop: chalk word-glyphs fill a black volume, the viewpoint moves forward
forever, and words flown through are collected into a litany that accumulates
down the right edge of the screen, the way the *Chalkroom* collects its lists.

Word set (prompt-specced, her register): ANGELS OF ARTIFICE, SAY TO MYSELF,
OCEAN, SUGAR CANDY BABY, MONO TASKING, DEAR OLD ANDERS, THE MOON IS A, LISTEN.
Thirteen instances cycle through the eight phrases, so words recur the way they
do in the room.

Interactions: the flight never stops. DRAG steers (banks the field laterally,
choosing which words you pass through). Flying through a word collects it: a
brief ember flash at the crossing point, then the phrase joins the litany list
at the right edge, the newest entry in ember. TAP bursts the nearest word into
chalk dust. DOUBLE-TAP reseeds the field (new epoch, new layout, litany
cleared). Sound is a single soft pluck per collection, and only after the first
pointer gesture has created the AudioContext; nothing autoplays, there is no
microphone, and the piece is fully visual in silence.

## Construction

Single self-contained `index.html`, canvas 2D only, no external assets, no
offscreen canvas, no gradients, no shadowBlur, no ctx.filter. Strict palette:
absolute black #0A0A0A, chalk white #F2EFE8, chalk-dust grey #4A4A48, collected
ember #D8B25A (ember appears only in the collect flash and the litany's newest
line). The only visible text is the chalk words and the collected litany.

Projection model. Each word instance carries a world offset (wx, wy), a phase
p, and per-letter data (rotation, baseline offset, scale, drip length/bend),
all generated from a mulberry32 stream seeded per epoch. Depth is closed-form:
u(t) = frac(p + (t - tEpoch)/48s), d = 9.0 - u * 7.9, so a word travels from
far (d = 9) to near (d = 1.1) over one 48-second cycle and recycles by the
modulo, forever. Screen position projects the world offset with a softened
divisor, f = 0.52 * min(W,H) / d^0.82, while glyph size uses the true depth,
fontPx = min(W,H) * 0.235 / d, further scaled by a phrase-length factor so long
phrases stay proportionate. Alpha rises as words near. Frame-one composition is
anchored: a stratified phase ladder (shuffled by the seed) spreads the words
across all depths at t = 0, anchor points come from a loose grid so instances
do not pile up at center, and instance 2 (OCEAN) is pinned near (u = 0.855) at
the left edge as the large near word; a phase swap guarantees it is the only
near word in frame one. The collected list is empty at frame one.

Chalk rendering. No slick vector type: every word is drawn letter by letter,
each glyph with its own seeded rotation (up to about 6 degrees), baseline
offset, and scale (0.92-1.08), stroked in four passes: the main fill plus three
offset ghost passes at low alpha (the double-draw chalk trick, extended), so
edges stay rough. About one letter in five carries a drip: a thin bent stroke
hanging below the baseline ending in a small chalk bead. The font stack asks
for hand-lettered faces first ("Chalkboard SE", "Segoe Print", "Bradley Hand"),
falling back to cursive/sans where unavailable; the jitter and ghosting carry
the hand-drawn read regardless of which face answers. A sparse field of grey
dust specks drifts slowly through the volume for depth.

Collections as derived events. Nothing is frame-integrated. Steering is a
closed-form function of the recorded pointer samples: piecewise-linear between
samples during a drag, exponential decay (tau 1.4 s) after release. A word's
collection-plane crossing times are solved exactly, tc = tEpoch + (0.90 - p +
k) * 48 for each cycle k; at tc the word's projected position (using the steer
offset at tc) is tested against a center window of 0.30 * min(W,H). Crossings
inside the window are collections, in time order; a burst in the same cycle
before the crossing cancels that cycle's collection. Taps are derived from the
raw tap list at draw time: two taps within 0.32 s become a reseed (new epoch
seed, pending burst cancelled), otherwise a tap bursts the nearest live word at
the tap point, resolved deterministically against the same closed forms. Burst
dust is 26 motes per burst with hash-seeded angles and speeds, positions a
closed-form function of burst time. Because every state is recomputed from
(events, t), any frame is reproducible.

Audio. Lazy, typeof-guarded AudioContext created inside the first pointerdown.
The rAF loop watches the derived collection count; when it grows, one soft
triangle pluck sounds (pitch steps through a small set, gain 0.13, 0.42 s
decay). In the QA renderer there is no AudioContext and no requestAnimationFrame,
so the piece renders frame one in complete silence, as specced.

Viewport and determinism. Canvas size comes from the Visual Viewport API with
resize listeners on both visualViewport and window (never innerWidth alone);
draw() pins canvas.style.width/height in px every frame. Phone detection uses
window.screen's physical min dimension (< 700 px) with the h > w * 1.15 aspect
as fallback only. Frame one is the synchronous draw(0) with the seeded field;
no Date.now anywhere (the clock is performance.now elapsed since load, and
frame one does not depend on it). rAF is typeof-guarded.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). Clean run,
  no errors, silent (no AudioContext in the harness, as designed).
- Determinism gate: thumb.png rendered twice, `cmp` byte-compare IDENTICAL
  (duplicate deleted). Re-verified after each fix round below.
- Read-back, round 1: words piled into one central horizontal band at similar
  sizes; pure random phases put too many instances at mid-depth. Fixed with
  the stratified phase ladder, the anchor grid, smaller base font factor, and
  the phrase-length factor.
- Read-back, round 2: two large OCEAN instances dominated the left side, and
  far words collapsed into a muddy central knot. Fixed with the hero
  phase-swap (hero is the only near word at frame one) and the d^0.82 position
  divisor, which keeps far words spread while sizes stay true-perspective.
- Read-back, final (all three sizes): black void with chalk words at clearly
  separated depths — far words small, dim, spread across the field; mid words
  legible (ANGELS OF ARTIFICE with visible drips upper right, THE MOON IS A
  mid right, LISTEN lower mid); the hero OCEAN large at the left edge; per-
  letter jitter and ghost passes read as chalk, not clean type. Drips visible
  hanging from letters on the larger words. Collected list empty at frame one,
  as designed. Mobile (390x844): same volume holds; near words clip only by
  flying past the edges, nothing is wrongly cut; layout stays centered.

Deviations: none from the prompt's substance. Two recorded choices: (1) the
position projection uses d^0.82 instead of strict 1/d so the far field stays
distributed on a flat screen (size and alpha remain true to depth), and (2)
the prompt's read-back of the completed list ("read back in deadpan when
complete") is not voiced — gallery pieces do not speak unprompted; the only
sound is the specced per-word pluck, gesture-armed.
