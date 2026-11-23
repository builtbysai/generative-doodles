# No.844 "The Locked Groove" — EXPANSION #103 lou-reed, PP5

## Concept

The locked groove at the end of Metal Machine Music's fourth side: a 1.8-second
loop cut so the needle never leaves it, the record's ending replaced by a
gesture that repeats forever. This piece stages the WLWH ghost-skull treatment
as its subject: one barely visible effigy form on a nearly-black field, an
image you have to look twice for. The form gathers out of the black over a
12-second arc, reaches its final state, and then locks: the last 1.8 seconds
become the whole future of the piece. A small infinity glyph sits bottom-right
like the side-4 label. Watch-only; no interaction, no hint text, no sound.
The lock is terminal by design: no outro, no fade, no resolution, and nothing
that resembles a loading spinner.

## Construction

Single self-contained `index.html`, canvas 2D only, no external assets.
Palette is strict, three tones only: black #0B0B0D (field), form #1A1A1E,
highlight #2E2E34. Every intermediate tone is a palette-internal mix of these.

The effigy is an original abstract form (no Reed imagery): a skull dome with a
slightly wobbled crown arc, two hollow eye sockets and a nose notch carved
back to the field black, and a jaw bar with five teeth slits. Small fixed
irregularities (crown radius wobble, slit offsets) come from a seeded
mulberry32 RNG (seed 844005), computed once at load.

Timeline, all closed-form functions of the piece clock t:

- ARC, 0 to 12 s. Each part gathers with its own smootherstep window, its
  colour mixing from black to its final tone: dome 0 to 7 s, jaw 3 to 10 s,
  highlight edge 6 to 12 s, so the highlight arrives last. The highlight mixes
  from the form tone toward the highlight tone, so at partial gather it reads
  as a brightening edge rather than a dark seam.
- LOCK, from 12 s on. A pure periodic breath, period exactly 1.8 s:
  b = 0.5 − 0.5·cos(2π · ((t − 12) mod 1.8) / 1.8). The dome mixes up to 10%
  toward the highlight and the jaw up to 6% with b; the highlight edge's alpha
  runs 0.55 to 1.0 and its stroke swells slightly at the peak. After 12 s no
  other quantity in the piece ever changes.

Frame one is anchored inside the arc at t = 8 s (T0): the synchronous first
draw is draw(8), and the rAF loop continues from 8 s plus elapsed time, never
from Date.now(). At that anchor the dome is fully gathered, the jaw is most of
the way in, and the highlight edge is partially arrived. Live visitors see the
remaining 4 s of the arc and then the lock engages.

The infinity glyph is treated as a printed label, not part of the gathering
form: full highlight tone from frame one, unchanged forever, like ink on the
record label.

House rules honoured: canvas sized from the Visual Viewport API with resize
listeners on visualViewport and window; canvas CSS size pinned in px inside
draw() every frame; phone detection via window.screen physical size (min
dimension < 700 px) with aspect h > w·1.15 as fallback only (the composition
is centred and scale-relative, so no phone-specific branch is needed); no
gradients, no shadowBlur, no ctx.filter, no offscreen canvas; rAF
typeof-guarded; no audio, no microphone, no interaction handlers at all.

## QA log

- Rendered with ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png), 720x720 (thumb.png). Script runs cleanly in the
  harness (no rAF, no AudioContext in that environment; none needed).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp:
  identical. Repeated after the highlight fix below; identical again. The
  duplicate render was deleted both times.
- Read-back of all three sizes: near-black field; the effigy sits low-center
  with crown arc, two hollow sockets, nose notch, and slitted jaw bar all
  findable on a second look; the infinity glyph is small and quiet at
  bottom-right. On mobile the form scales with min(W, H) and stays low-center
  with nothing clipped.
- Fix during QA: the first build mixed the highlight edge from black, so at
  the frame-one anchor it read as a dark seam across the dome instead of a
  partially arrived highlight. Changed to mix from the form tone; re-rendered
  all sizes and re-ran the byte-compare (identical). Recorded here as the one
  deviation from the literal construction notes: an implementation correction,
  not a design change.

## Deviations

- Frame one anchored at t = 8 s inside the arc, per the brief (a first frame
  inside the lock is impossible since the lock only exists after the arc).
- The infinity glyph does not gather with the form; it is constant from frame
  one, as a printed label would be. Reason recorded above.
- Highlight gather path runs form tone to highlight tone rather than black to
  highlight tone (see QA log).
