# No.489 Script Ground

EXPANSION #59 eugenio-bertozzi, prompt EB1.

## Concept

His "Charas CBD" lettering (2026) as a generative system: a sign that
repaints itself forever. One invented word in flowing monoline brush
script, white on a flat burnt-orange ground, with a long entry swash, a
long exit swash, and generous loops. Tiny letterspaced mono caps sit
top-center ("<WORD> 2026 x STUDIO") with a copyright-style line
bottom-center ("© <WORD> STUDIO"). Watch-only: the script draws itself
stroke by stroke, holds, fades, and redraws with a newly seeded word
every 45s. The rust colorway ships (the prompt's alternate black
colorway does not).

## Construction

- Single self-contained index.html, canvas 2D, exactly the prompt
  palette: rust ground #B44A1E, script #FFFFFF, mono #F5E9D6. Flat
  ground, no gradients, no decoration.
- Words come from a seeded syllable generator (onsets incl. soft
  clusters and the embedded pieces sol/mar/vel, vowels, rare codas),
  producing pronounceable 6-8 letter non-words; a blocklist rejects
  accidental real words (bruno, flora, drama, estival, ...). The word
  stream is driven by mulberry32 seeded per cycle, so every viewer
  sees the same sequence: solivra, glafri, diflol, nuluplu, maravo,
  velevra, ...
- Letterforms are parametric monoline skeletons: one continuous stroke
  per letter (baseline 0, x-height 1, ascender ~1.55, descender
  ~-0.55), joined into a single word-long stroke with baseline-swoop
  connectors, an entry swash and an exit swash. i dots and t crosses
  are extra strokes that appear when their letter completes. Paths are
  Catmull-Rom sampled; each letter instance gets seeded rotation,
  height and point jitter (feet kept near the baseline), plus a global
  0.09 script shear, so loops land uneven and the stroke wobbles like
  a hand, not a font.
- Brush feel: the stroke is drawn segment by segment with width
  modulated by direction (thick on downstrokes, thin on upstrokes)
  and tapered at both swash ends, round caps and joins throughout.
- Cycle (45s): draw-on 0-10s (length-proportional, letter by letter,
  with a gentle ease), hold 10-32s, fade 32-37s, empty ground 37-45s.
  The mono lines name the current word and fade with it.
- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas.style.width/height pinned in
  draw() every frame. Phone detection via window.screen (min
  dimension under 700px) with the h > w*1.15 aspect fallback; on
  phones the word takes 80% of width instead of 70%, and a height cap
  keeps ascenders and descenders inside the frame at any aspect.
  Page ground is the rust. No audio, no interaction handlers.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: first frame drawn synchronously at the constant
  pre-roll PHASE0 = 24s (mid-hold, word 0 "solivra" fully drawn);
  rAF is typeof-guarded and anchored as PHASE0 + elapsed since load,
  never Date.now(). thumb.png rendered twice and byte-compared with
  cmp: identical. Second render deleted.
- Read-back: desktop and thumb show the word as bold hand lettering
  with closed o and a ovals, a tall l loop, a floating i dot, entry
  and exit swashes sweeping to the edges, mono caps lines clear of
  the script. Mobile keeps the whole word and both mono lines in
  frame, nothing clipped.
- Iterations: the first pass read wide and fused (the s closed into
  a teardrop and the v/r cluster merged), so the s was redrawn as an
  open S-curve, the v valley deepened, the r shoulder softened,
  letter spacing opened from 0.05 to 0.09 units, the swashes were
  shortened, and the nominal stroke reduced; the final read is an
  exuberant looped sign hand in Bertozzi's register.
- Deviations: (1) This build replaces an earlier partial build found
  in the output dir, whose fixed word list contained the real word
  "estival" and which had no process.md. (2) The hold is 22s
  (10-32s of the cycle) rather than the prompt's approximate 20s, and
  the fixed pre-roll sits at 24s rather than 30s; both keep the first
  frame mid-hold with the word fully drawn. (3) Nominal stroke width
  is 2.55% of canvas width, modulated roughly 1.9-3.0% by stroke
  direction, a touch under the prompt's 3-4% band: at 3%+ nominal
  the counters of the o, a and s fused shut at sign scale, and open
  counters matter more to the lettering read.
