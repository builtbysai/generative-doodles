# No.718 — Moor

EXPANSION #87 janine-antoni, prompt block 7 "Moor". Antoni learned ropemaking
to build Moor (2001), a 256-foot rope braided from objects gifted by friends
and family. Here the rope braids itself across a dark frame, and its strands
are not fiber: they carry a stream of gifted tokens, abstract glyphs that fly
in from the edges of the canvas and settle into the weave.

## Concept

A quadratic-bezier spine runs diagonally from the lower-left to the
upper-right of the frame. Around it, three strands twist into a braid. At
seeded intervals along each strand sit tokens in four abstract kinds, each
with its own tone: flower (a small cluster of circles, pink), bead (a single
circle, blue), light (a spark diamond, pale gold), cord (a short lozenge,
dark slate). Nothing is drawn literally: no flowers, no rosaries, no string
lights, only color-shape glyphs riding the braid.

The 60-second loop: the finished rope grows from a short starter stretch
(the frame-one state) over 40 seconds; tokens stream in from the canvas
edges and land on their slots just before the growth front arrives; the
complete rope holds and sways for 8 seconds; then it unbraids from the far
end over 9 seconds, its loosened tokens drifting off and fading; a short
rest, and the next cycle grows a freshly seeded rope. A tap sends a burst
of extra tokens streaming in toward the finished rope. Watch-only apart
from that; no drag, never a reload.

## Construction

Braid math. The spine is a quadratic bezier with fixed endpoints
(0.06W, 0.88H) and (0.94W, 0.12H). Sway is applied at the control point
only: two slow sines (periods 17 s and 13 s, amplitudes about 1-1.4% of the
smaller frame dimension), so the whole rope breathes as one body and every
derived point stays a closed form of time. The tangent at any spine
parameter s comes from a finite difference of the same swayed bezier, and
the unit normal follows. Strand k (k = 0, 1, 2) sits at

  point(s) = spine(s) + normal(s) * A * sin(14 * 2pi * s + k * 2pi/3)

with A = 1.6% of the smaller dimension: fourteen full twists along the
spine, the three strands 120 degrees apart in phase. The cosine of the same
phase is kept as a depth proxy: strand segments are stroked back-to-front
in depth order with alpha rising toward the viewer (0.62 to 1.0), all in
the single braid tone, which is what makes the over-under weave read
without any extra color.

Growth is a closed-form length function of cycle time: ease-in-out from
L0 = 0.10 to 1.0 across 0-40 s, hold to 48 s, ease-in-out retract to L0
across 48-57 s, rest to 60 s. Because the growth branch is monotonic, each
token's deposit moment is recovered by bisection inversion of that curve.

Token flight model. Each cycle's schedule is generated from mulberry32
seeded by the cycle index: per strand, slots start near s = 0.035 and step
0.048-0.078 with jitter, up to about sixty tokens per rope. A token's
flight starts one flight-duration (1.0-1.5 s) before the front reaches its
slot; slots inside the starter stretch have negative start times, so they
are already embedded at frame one. In flight, a token eases (cubic
ease-out) from a seeded point on a random canvas edge to its deposit point,
which is evaluated live on the swaying strand, with a slight perpendicular
bow at mid-flight; it fades and grows in as it travels, then rides the
strand exactly. During unbraid, a token whose slot lies past the
retracting front drifts outward along a seeded direction, shrinks, and
fades across an 0.08-wide band of s behind the front.

Tap bursts are the only mutable state, and only as recorded events: a
pointerdown generates 9-12 tokens from a stream seeded by burst count and
cycle, slotted along the rope as finished at the tap moment, flying in
over the next second or so. Bursts are drawn only within the cycle they
were tapped in.

Frame one is the synchronous draw at cycle t = 0: starter braid, its first
tokens embedded, everything else derived from the anchored clock
(elapsed-since-load), never from a wall clock. An inert ?seed=tNN hook
pins the first frame to a fixed phase for QA only.

Deviations: none from the prompt's substance. Two implementation notes:
(1) the prompt's "simple steering" token flight is realized as the
closed-form eased path above, since integrated steering state would break
the series determinism gate; the visible behavior (tokens arriving from
the edges and depositing at the growing end) is unchanged. (2) Strand
shading is alpha variation of the single specced braid tone, used to read
the weave's over-under structure.

## QA log

Renderer: node ~/workspace/tools/render-piece.js (node-canvas, no rAF, no
AudioContext, no offscreen canvas).

- qa-desktop.png (1280x900), frame one: dark ground; at the lower-left,
  the short starter braid with its first tokens embedded (a pink flower
  cluster, a pale spark). Rest of the spine not yet grown, as specced.
- qa-mobile.png (390x844): same starter segment at the lower-left, phone
  rule engaged via window.screen, nothing clipped; the diagonal keeps its
  corner-to-corner run, steeper in the tall frame.
- thumb.png (720x720): same frame-one state at square size.
- Forced mid-growth render (?seed=t30, 1280x900, throwaway, read back
  then deleted): rope about 87% grown along the diagonal, weave reading
  clearly, all four token kinds embedded along the strands, and two
  tokens caught in flight at the right edge (a spark near the top, a
  flower cluster mid-frame) on their way to the growing end.
- Forced unbraid render (?seed=t52, throwaway, read back then deleted):
  rope retracted from the far end; two bead tokens past the front
  dispersing and fading as designed.
- Determinism: thumb.png rendered twice and cmp byte-compared identical;
  the duplicate was deleted. Grep audit of index.html: no Date.now, no
  Math.random, no createElement, no AudioContext, no shadowBlur, no
  external URLs, no em dashes. Visual Viewport sizing with resize
  listeners on visualViewport and window; canvas pinned in px inside
  draw(); strict five-color palette (background, braid, four token tones).
