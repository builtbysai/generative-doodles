# No.668 — Trompetas de Caracol

EXPANSION #81 jose-perez-de-arce, prompt block 4 "Trompetas de Caracol".
His 1981 tinta china drawing of Cuasmal musicians' ceramic shell
trumpets, rebuilt as playable ink forms. No realistic shell rendering,
no autoplay or ambient sound, no text.

## Concept

On a sheet of paper, four or five large shell trumpets lie scattered:
each is a logarithmic spiral drawn in black ink, the tube thickening
steadily as it unwinds, ending in a flared mouth with a blush of pale
terracotta inside it. The largest lies lower-left. The shells are not
quite still: each drifts through one full rotation in ten minutes, far
too slowly to catch moving. Tap a shell and it sounds, a low breathy
tone whose pitch comes from the shell's size, while a ring expands
from its mouth and fades. Tap the empty paper and only a faint ring
answers, with no sound. Double-tap and the arrangement is reseeded:
new sizes, new scatter, still the largest lower-left.

## Construction

Single self-contained `index.html`, canvas 2D, no external assets.

**Shells.** Each shell is precomputed data in local units (outer
radius 1): 151 points along a logarithmic spiral of 2.6 to 3.0 turns,
radius growing from 0.055 at the core to 1 at the rim, with a faint
seeded radial wobble (two sine harmonics, seeded phase) so the line
reads hand-drawn rather than machine-true. Each point carries its
stroke width, growing from 0.030 to 0.235 of the outer radius, so the
tube thickens toward the mouth. At draw time the points are rotated
(base rotation plus the 600 s drift, direction seeded per shell),
scaled and translated; consecutive points are stroked as individual
round-capped segments so the width can taper continuously.

**The mouth.** The bell sits just past the spiral's outer end along
its tangent: an ellipse (0.37 by 0.175 of the outer radius, major axis
across the tangent) filled with the blush, an inner ellipse at 60%
filled with ink at 20% alpha for depth, the rim stroked in ink, and a
second inner ellipse stroked at 65% alpha. The blush appears nowhere
else in the piece.

**Arrangement.** Built from mulberry32 seeded by 668001 + generation
* 7919. The count is 4 or 5 shells, never more than 5. The largest
shell (radius 0.205 to 0.225 of S = min(W, H)) is anchored lower-left;
the rest (0.095 to 0.155 of S) are rejection-sampled into the frame
with a minimum separation of 1.45 times the summed radii, so shells
never touch. Positions are stored normalized and radii as fractions
of S, so any resize or phone frame refits the same arrangement; on
phones the radii gain a 10% boost.

**Pitch mapping.** Each shell's frequency is fixed at build time from
its size within the arrangement's own range: the largest shell sounds
110 Hz, the smallest 220 Hz, and the rest are log-interpolated between
(freq = 110 * 2^u, where u is the shell's normalized smallness). Size
is pitch, exactly as a real shell trumpet behaves.

**The tone.** A sine fundamental with a 45 ms attack and a 1.2 s
exponential decay, a breath of the fundamental an octave up at low
gain for 0.7 s, and band-passed noise (Q 1.1, centered on the
fundamental) decaying over 0.9 s: a blown, breathy shell note, never
a beep.

**Lazy audio guard.** No AudioContext exists at load and none is ever
created by the animation loop. The context is constructed inside
`ensureAudio()`, which is called only from the tap handler's sound
path, after a tap has actually landed on a shell. The constructor is
guarded three ways: `typeof AudioContext` / `window.webkitAudioContext`
lookup, a try/catch around construction, and a try/catch around the
whole voice graph, so on a platform with no WebAudio (including the
headless QA renderer) the tap still draws its ripple and the piece
simply stays silent. A suspended context is resumed on later taps.
Nothing autoplays; there is no ambient sound of any kind.

**Taps and double-taps.** A pointerdown records a pending tap. If a
second pointerdown arrives within 280 ms, the pending tap is
cancelled, the generation advances and the arrangement reseeds. If
the window passes, the tap fires: a hit test (distance to shell
center under 1.18 outer radii, nearest wins) sounds that shell and
pushes a strong ripple at its mouth's current world position; a miss
pushes a faint, silent ripple on the paper. Ripples are recorded
events with anchored times and are drawn as expanding ellipses
(strong: 1.7 s life, echo ring after 0.16 s; faint: 1.1 s), so replay
and rendering stay deterministic.

**Determinism.** Frame one is the synchronous draw at elapsed 0 from
the anchored `performance.now()` clock; nothing is ever derived from
`Date.now()`. All arrangement data, the noise buffer and every wobble
come from mulberry32. The rAF loop is typeof-guarded and the piece
renders its first frame with no rAF and no AudioContext present.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js`: 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Thumb rendered twice and byte-compared with `cmp`: identical. The
  second render was deleted.
- Desktop readback: four ink spiral trumpets on paper, mouths
  blushing, the largest lower-left, generous paper, nothing clipped.
  Mobile readback: the same arrangement refit to the tall frame,
  shells scaled to the narrow width, nothing clipped.
- Ripple path verified with a state-forced throwaway copy in /tmp
  (one strong ripple injected at t0 = 0, rendered at t = 0.6): two
  expanding elliptical rings sat on the largest shell's mouth, fading
  as specced. The throwaway copy and render were deleted.
- Grep confirms no `Date.now`, no `Math.random`, no
  `document.createElement`, no external URLs, no em dashes in the
  shipped file.

## Deviations

- A single tap's sound fires after a 280 ms window rather than
  instantly, so a double-tap can cancel it before it sounds; the tone
  is 1.2 s long and breathy, so the delay is inaudible as latency and
  the double-tap reseed stays clean. Recorded because the prompt does
  not specify tap timing.
- The mouth carries a 60% inner ellipse filled with ink at 20% alpha
  as its only shading: it suggests the bell's throat depth while
  staying inside the three-color palette and the ink-drawing register.
- The launch arrangement rolled 4 shells rather than the full 5; the
  seeded count is 4 or 5 per generation, inside the prompt's 3 to 5.
