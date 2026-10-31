# No.743 Dream Blots

EXPANSION #90 spencer-finch, prompt block 8. After Finch's 102 dream-color
blots (2002): symmetric Rorschach blots, each in a single color that existed
only in a dream, captioned "dream color, unverified".

## Concept

One large blot at a time on aged paper #ECE5D3, drawn in exactly one of the
six specced dream tones (dusty rose #C98A8A, deep teal #2E6B66, ochre
#C99A3C, slate violet #6B5B8A, moss #7A8A4A, ember #C25E3C). The blot draws
itself by mirror-fold, holds, fades, and the next dream arrives. No reading
of what any blot resembles is offered anywhere: it is a color, nothing more.
The only text on the piece is the specced caption.

## Construction

- Blot: a seeded set of 7-10 overlapping ellipses generated for the LEFT
  half only, from a mulberry32 stream keyed to the absolute blot index.
  Two larger masses anchor the fold; the rest scatter smaller. Each
  outline is a 56-point polygon whose radius is perturbed by three seeded
  harmonics (2, 3, and 5 cycles, amplitudes 0.03-0.08, 0.02-0.06,
  0.01-0.04), so no outline is a perfect ellipse: the wobble is the proof
  it was dreamt. Outlines are precomputed once per blot.
- Mirror: the right half is never generated. It is the computed left point
  list reflected across the fold line (x to -x, reversed winding), so the
  symmetry is exact by construction.
- Reveal model (12 s cycle, all closed-form in cycle time): left ellipses
  appear in a seeded rank order, each growing from 0.55 scale over 0.6 s
  with an ink-bleed edge jitter (deterministic radial sine offset) whose
  amplitude decays to zero as the ellipse completes. The ellipse nearest
  the fold is swapped into rank 0, so the first ink touches at the fold.
  At 3.1-4.1 s the right half unfolds from the fold (horizontal fold
  progress 0 to 1, slight per-rank stagger). Hold 4.1-10.1 s, complete and
  still. Fade 10.1-11.4 s, then bare paper to 12 s.
- Dream sequence: fixed for the run. The six tones are shuffled once from
  the base seed and two seeded repeats are inserted, giving an 8-step
  order: slate violet, deep teal, dusty rose, ember, ochre, deep teal,
  moss, dusty rose. Blot shapes keep varying past the eighth blot (seeded
  per index); only the color order repeats.
- Interaction: watch-only, plus a double-tap that skips to the next dream.
  Skips are recorded events (an index offset plus a new cycle origin);
  single taps do nothing, and there is no reseed.
- Caption: drawn in the active blot's own color (no off-palette ink), and
  its alpha ramps from faint (0.25) to full (0.75) across the reveal so
  frame one stays a first-touch state while the completed scene carries a
  legible caption.
- House rules: Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned in px inside draw(); phone
  detection via window.screen (min dimension under 700) with aspect
  fallback (h > w*1.15); the blot scales to the smaller dimension and the
  page ground is the paper tone. Frame one is the synchronous draw at
  t = 0; all animation state derives from the seed, recorded skip events,
  and elapsed time. No wall-clock reads, no unseeded randomness, no audio.

## QA log

- Renders: qa-desktop.png 1280x900, qa-mobile.png 390x844, thumb.png
  720x720, all from the piece's actual script via render-piece.js.
- Frame one (all sizes): aged paper, the rank-0 ellipse mid-reveal at the
  center (slate violet at reveal alpha, reading as the first ink just
  touching), faint caption at the bottom. Mobile reflows cleanly, nothing
  clipped.
- Determinism: thumb.png rendered twice and cmp byte-compared identical,
  re-verified after the caption fix round.
- Hold state (forced render via the inert ?seed=t7 hook, throwaway,
  deleted after inspection): a complete slate violet blot, both halves
  full, caption legible. Flip-compare of that render, caption band
  excluded: 108 of 475,200 pixels differ beyond 8/255 (0.023% of the
  region, 0.10% of ink pixels), antialiasing edge residue only; the
  mirrored geometry is exact, same class as the No.671 precedent.
- Fix round: the first frame-one read-back had the caption at full alpha
  outweighing the first ink touch. Caption alpha now ramps with the
  reveal (see Construction); renders redone and determinism re-verified.
  Blot geometry, palette, and timing were untouched, and the symmetry
  result is unchanged.
- Grep audit clean: no Date.now, no Math.random, no createElement, no
  AudioContext, no external URLs, no em dashes. No gradients, no
  shadowBlur; the wobble does all the softening.
- Deviations: none from the prompt's substance. The 8-step color sequence
  choice (shuffled six plus two seeded repeats, recorded above) is the
  option the brief left open. Paper grain was omitted rather than
  introduced off-palette.
