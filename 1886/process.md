# №1886 Locking In (MG7, PP1133, study #246 maddalena-ghezzi)

## What it is
Two pendulums hang side by side from a single dark beam in a black
room, each trailing a ribbon of its recent motion, one deep blue, one
warm amber. They start out of phase, swinging at slightly different
tempos. Over about a minute the ribbons braid: the tempos converge,
the swings synchronize, the two ribbons merge into one braided band
with gold between them, and a shared beat sounds, one soft wooden
tick per crossing. It holds, breathing slightly, for as long as
nobody touches it. A small cream plaque at the base reads "finding
the beat that works".

## Mechanism
- Two phase oscillators with Kuramoto-style coupling. Natural
  periods about 2.20 s and 2.40 s (omega 2.856 and 2.618 rad/s).
  Coupling grows over the first minute and strengthens further as
  the phase difference falls: K = (0.04 + 0.30 * smooth(t/50)) *
  (1 + 1.2 * max(0, 1 - |diff|/0.8)). The lock is a felt phenomenon:
  two tempos drifting, then finding one beat. At the fixed frame-one
  phase the difference is 0.213 rad and the lock already holds.
- Swing amplitude breathes slightly: AMP * (1 + 0.05 * sin(t*0.15)).
- Ribbons: each bob leaves a 72-sample trail (about 3.6 s of motion),
  drawn as tapering filled quad strips (never stroked polylines, which
  read as beads at speed) with additive blending where they overlap.
  The two pendulums hang close together (pivots 0.09 U apart), so
  when the lock holds their ribbons lie nearly on top of each other.
- Braid: while locked, a gold band runs along the midpoint path
  between the two ribbons, newest first and fading back. When the
  lock breaks, the band is gone and the ribbons part.
- Beat: one soft wooden tick (triangle oscillator, 170 Hz, 0.09 s
  decay) per center crossing of either pendulum, only while the lock
  holds. No BPM readout, no banner, nothing announced.

## Palette (hand-picked; the study file studies/maddalena-ghezzi.md does not
exist in the repo, so these hexes are chosen from the prompt's named colors)
- Room black: #0D0D0F (base), #141419 (glow), beam #1C1C20 with #2A2A30 edge
- Pendulum brass: #B08D3E, deep #7A5F28, light #D9B45C
- Ribbon deep blue: #1F3A6E, light #3E63A8
- Ribbon warm amber: #D98A2B, light #F0A94E
- Braid gold: #C9A227, deep #9A7B1A
- Plaque cream: #EFE6D0, dim #C9BFA4, ink #1E1710
- Plates: #141416 ground, gold rule, #EFE6D0 title ink, #D8B878 hint ink

## Interaction
DRAG EARNED. Drag either pendulum to disturb the lock: the bob
follows the pointer while held, and on release a phase kick (the
held angle plus 0.7 rad in the drag direction) is injected into that
oscillator and the coupling is broken, rebuilding over about 30 s.
The braid unravels, the tempos split, and then, on their own, they
find each other again. Never click-to-reload; taps elsewhere do
nothing. A visible "Sound: off / on" plate sits bottom right; tapping
it toggles sound. Default silent. Real WebAudio is created lazily
inside the first pointer gesture only, never on load, never autoplay.

## Sound (closed-form model)
A soft wooden tick per crossing while locked, from the oscillator
clock, not the wall clock. The tick is a triangle oscillator at
170 Hz with a fast exponential decay.

## Frame one (determinism)
Fixed phase t = 35 s: mid-convergence, phase difference 0.213 rad,
lock holding, braid partly formed (gold band over the recent part of
the trail). The run-up from t = 0 is integrated with fixed 0.025 s
substeps, so frame one is a pure function of the constants, never of
the wall clock. No Date, no Math.random in frame one. Thumb renders
are byte-identical across independent runs (md5 verified).

## House rules
Visual Viewport sizing with resize on visualViewport and window;
canvas pinned in draw() via canvas.style.width/height in px; phone
detection via window.screen (min dimension under 700 px) with aspect
h > w*1.15 fallback; centered geometric piece, square kept on
desktop and phone, page ground set to the piece's own room black;
one synchronous frame at load; requestAnimationFrame guarded by a
typeof check; prefers-reduced-motion respected (static frame one, no
loop); all motion well under 14 Hz (pendulums about 0.45 Hz).

## Gallery
- Date: 2007 · 03 · 12 (formula 2002-01-10 + (N+1) days)
- Note: "Two pendulums swing out of phase until their ribbons braid into one gold band and a shared beat sounds. Drag a pendulum to break the lock."

## Deviations from the prompt
The prompt says the two pendulums hang "side by side"; they hang
close together (pivots 0.09 U apart) rather than far apart, so that
when locked their ribbons genuinely lie on top of each other and the
braid reads as one merged band instead of two parallel arcs. The
re-lock after a drag takes about 20 to 30 seconds (coupling rebuilds
over 30 s), inside the prompt's 20 to 40 second range. The study
file was absent, so palette hexes were hand-picked and are recorded
above.

## QA
Rendered the actual script with node render-piece.js at 1280x900
desktop, 390x844 mobile and 720x720 thumb; all three inspected
visually. Three fix rounds: (1) a double toFixed on the ribbon alpha
crashed the first render, fixed to a single numeric alpha; (2) stroked
ribbon polylines read as beads at speed, redrawn as tapering filled
quad strips; (3) the braid was tried as spatial-proximity gold, then
as gold rungs tying the ribbons, then as a midpoint band with the
pivots far apart, each reading as a stray mark or a wire harp; the
pivots were moved close together (0.09 U apart) and the braid became
a gold band between two nearly coincident ribbons, which reads as one
merged band. After each fix all three sizes were re-rendered and
re-inspected. Drag verified with a probe harness dispatching synthetic
pointer events through the registered canvas listeners: the blue bob
followed the pointer while held (pixels changed), release injected a
phase kick (difference 0.213 to -0.737, lock broken), and a 1.2 rad
kick re-locked over about 20 to 30 seconds (unlocked at +10 s and
+15 s, locked again by +20 s, settled 0.143 by +30 s). Thumb
re-rendered independently and confirmed byte-identical (md5
adf793cd5abeadf6b9e9e054a8436884).
