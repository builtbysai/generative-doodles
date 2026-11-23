# No.828 "Four Square" — EXPANSION #101 tony-conrad, PP5

## Concept

Tony Conrad's *Four Square* (1971) ran four projectors, each strobing its own
black/white block map, phase-locked at the corners of a square. Left running,
the panels drift apart and beat against each other like four near-unison drone
strings; at intervals they align and the four screens flash as one field.

This rebuild is one canvas with four viewports in a 2x2 grid, hairline #222222
dividers, and the specced tiny numerals 1-4 at the outer corners. Nothing else
is drawn: palette is strictly #000000, #FFFFFF, #222222. There is no sound.

A conductor runs the piece: on a fixed 90-second cycle the panels drift freely,
ease into sync, hold as one field, then are released to drift again. Dragging
across a panel pushes that panel's phase, so a viewer can force an alignment
or break one. Double-tap reseeds all four block maps. A reduced-motion mode
(prefers-reduced-motion, or a tap in the top-right corner zone) replaces the
strobing with slow 0.2 Hz fades.

## Construction

**Block maps.** Each panel runs a block map of 6 alternating segments
(segment 0 is black) whose lengths are fractions of one map cycle. Fractions
are drawn from a seeded mulberry32 stream in [0.145, 0.19], normalised, and
resampled until the smallest normalised fraction is at least 0.14. Panel rates
are 0.90 / 0.80 / 1.05 / 1.20 map cycles per second (panel 1 is the master),
each with a seeded jitter of 0.94-1.06 clamped to [0.70, 1.22]. Panels differ
in fractions, rate, and starting phase (opening phases 0, 0.22, 0.47, 0.72).

**Frequency cap, by construction.** A colour change happens when the phase
crosses a segment boundary, so the fastest possible alternation rate is
max rate / min fraction = 1.22 / 0.14 = 8.7 changes per second. The
conductor's phase pull adds at most ~0.05 cycles/s of extra phase velocity,
and drag nudges are discrete phase steps, not a sustained rate. Every panel
therefore stays under the 12 Hz design band and the study's 14 Hz ceiling at
all times, in every state (drift, sync, nudged).

**Conductor model.** Let k(t) be a fixed function of segment-local time on a
90 s cycle: 0 during drift (0-55 s), a smoothstep rise (55-70 s), 1 during the
hold (70-78 s), and a smoothstep fall (78-90 s). Its integral is analytic
(smoothstep integrates to u^3 - u^4/2; one full cycle integrates to 21.5 s).
Panel phase is closed-form:

- base_i(t) = rate_i * t + (rate_master - rate_i) * kInt(t) + delta_i
  + sum of that panel's recorded nudge offsets up to t.
- For non-master panels, phase_i(t) = base_i(t) + k(t) * pull_i, where pull_i
  is the wrapped phase difference between master and panel evaluated at the
  end of the current cycle's rise (t = 90w + 70). Locking the target at the
  end of the rise means that when k reaches 1 the panel's phase is congruent
  to the master's mod 1, and since both then run at the master rate, the sync
  is exact through the whole hold.
- Segment fractions blend the same way: f_i(t) = f_i + k(t) * (f_master - f_i),
  so at full sync all four panels share the master's map, rate, and phase and
  flash as a single field. Fraction minima are preserved under the blend
  (a convex combination of two valid maps), so the frequency cap holds during
  transitions too.

**Determinism.** Frame one is a synchronous draw(0) at load; the rAF loop is
anchored as elapsed-since-load after that. Nothing in the drawing path reads
Date.now() or Math.random(). All state is a closed-form function of
segment-local time plus the recorded event list (nudge events, reseed
segments). A reseed starts a new segment with its own seeded maps and its own
conductor clock. The QA renderer has no rAF, so it captures exactly frame one:
panel 1 black, panel 2 white, panel 3 white, panel 4 black, the seeded drift
state, numerals legible.

**House rules.** Canvas size comes from the Visual Viewport API with resize
listeners on both visualViewport and window; canvas.style.width/height are
pinned in px inside draw() every frame. Phone detection uses window.screen
(min dimension < 700 px) with the h > w*1.15 aspect as fallback only; the grid
stays square and whole at every size (96% of the short side on phones, 92%
otherwise), page ground is the piece's black. No gradients, no shadowBlur, no
ctx.filter, no offscreen canvas. rAF is typeof-guarded.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with cmp —
  identical; the second render was deleted.
- Read-back, desktop: 2x2 grid filling the frame height, panels in a mixed
  checkerboard state (black, white, white, black), #222222 hairlines visible
  at the cross, numerals 1-4 small at the outer corners and legible on both
  black and white panels (white type over a black underlay offset).
- Read-back, mobile: grid spans the full width and sits whole in the tall
  frame, numerals legible, nothing clipped.
- Read-back, thumb: same mixed state at 720x720; numerals small but readable.

## Deviations

- **Shared segment count.** All four maps use 6 alternating segments; the
  panels' individuality lives in their fractions, rates, and phases. A single
  segment count is what lets the conductor ease fractions, rate, and phase
  into the master's simultaneously and reach a true one-field sync with
  discrete black/white panels (no crossfade, no grey). Recorded as a
  construction choice, not a content change.
- **Reduced-motion fade passes through grey.** The fade is white at variable
  alpha over black, so mid-fade pixels are grey values. The palette tones
  themselves are unchanged; grey exists only as the transitional blend the
  reduced-motion requirement calls for. The toggle has no visible chrome
  (corner-zone tap, plus prefers-reduced-motion) to keep the piece free of UI.
- **Conductor restarts per reseed.** A double-tap reseed begins a new segment
  whose conductor cycle starts at its own t=0, keeping every drawn quantity
  a closed-form function of segment-local time and the recorded events.
