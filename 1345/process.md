# №1345 "The Strongman's Mirror" — process notes

## Source
eric-gottesman EG2 (PP568), from the hank-willis-thomas NEXT-STUDY chain.
Grounded in the study's doubling mechanism (the strongman sees his enemy in
the mirror; Colonel's Mirror 2017; Cedar-Riverside strongman-mirror billboard).

## What it is
Two headless bust silhouettes face each other across a vertical mirror line
on a near-black ground (#14161B). Left figure: dark uniform tones (#23262E)
with a crimson sash diagonal (#A02C2C). Right figure: pale, white-gold
(#EDE8DA) with a muted shadow edge (#8A8474). Heads are cropped out of the
frame top on purpose: identity lives in the torso and sash. A faint horizontal
band behind the pair suggests the novel's "colonel's mirror" scene, nothing else.

## Mechanics
- 18 s loop, closed-form over piece time: figures stable 0–5 s, mirror line
  brightens 5–7 s, identity crossfade 7–13 s (palettes swap across the line
  with a 1 px traveling wave; the left figure swaps slightly ahead of the
  right), held swapped 13–16 s, crossfade back 16–18 s.
- Identity swap is a palette lerp driven by a single t parameter. Both figures
  are drawn from ONE skeleton path (shoulder/torso curves traced on the
  context); palette is applied per side. The sash travels with the dark
  identity: after the swap it sits on the right figure.
- Drag variant: dragging the mirror line left/right shifts the swap boundary
  (clamped to ±30% of width). The minority figure dissolves into horizontal
  static scanlines — seeded line noise clipped to the figure silhouette,
  density proportional to displacement — until it is pure noise at the
  extreme, then reforms on release as the boundary eases back to center
  (exponential decay). The mirror line dims but never vanishes.
- Never click-to-reload. No faces, no real uniforms or insignia, no flags,
  no readable medals, no portraits of real people. Silent: no audio.

## Determinism
Frame one is drawn synchronously at exactly t = 0 via a boot flag (figures
stable, pre-swap); the clock starts only with the rAF loop, which is a plain
function declaration behind a typeof guard. All variation comes from seeded
mulberry32 streams (static noise seed 1345000); no Math.random anywhere.
Resize redraws at the current piece time, never restarting.

## Adaptations
- Mirror-line glow and the traveling wave are flat-alpha shapes; no gradients.
- No Path2D: the QA renderer's node-canvas build does not define it, so the
  bust skeleton is traced directly on the context (beginPath per use, with
  save/clip for the sash and the static dissolve).
- rAF loop written as a plain function declaration (the №1278 lesson: a named
  function expression followed by requestAnimationFrame throws ReferenceError
  in a real browser but is invisible to node-canvas).

## Fix rounds
1. First rAF kickoff used a discarded named function expression (referenced
   but never assigned) — rewritten as a plain function declaration before
   rendering.
2. First render crashed in the QA renderer: Path2D undefined — bust path
   restructured to trace directly on the context.
3. First render's wide neck (0.30 of figure width) with a smooth shoulder dome
   read as two bottles — neck narrowed to 0.20 of width with a sharper
   shoulder flare, so the pair reads as headless busts.

## Verification
Rendered at 1280×900 desktop, 390×844 mobile, 720×720 thumb; all three
inspected. Forced-time probes on discarded temp copies confirmed the loop:
t = 10 mid-crossfade (both figures passing through a shared mid-tone, as a
two-way palette lerp must); t = 14.5 held swapped (left pale #EDE8DA, right
dark #23262E, sash on the right figure at 138,43,44). Thumb rendered three
times plus a final re-verification — all cmp byte-identical.
Final index.html md5: c919d298fe93890dc7eba78f443f5770.
