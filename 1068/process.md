# No.1068 "The Figure Eight" (study #131 yoichi-sakamoto, YS5 / PP229, particles 2011)

## Concept

The rail is the world. A figure-eight circuit fills the frame edge to edge, drawn as hardware: two steel-thin rails on sleepers. Sixteen LED balls roll on it at one constant machined speed, in both directions, and they have no color of their own: each of the seven segments between checkpoints holds a state (red, amber, blue, green, or dim), and a ball takes the state of the segment it is in, switching the instant it crosses a checkpoint, exactly the per-segment luminescence switching of the 2011 particles rail. When a ball crosses a checkpoint the diamond flashes white and decays: a single earned pulse, never a strobe train. The visitor is the in-venue terminal of 2011: drag across a segment to step its state, tap a checkpoint to flip the segment after it, double-tap for a new rail.

## Construction

- Rail curve: Lissajous 1:2 base, q(u) = m(u) * (sin u, 0.5 sin 2u), with radial modulation m(u) = 1 + 0.12 sin(3u + 0.7) + 0.05 sin(5u), so the lobes swell and pinch like a spiral tightening around the single central crossing. The curve is scaled independently in x and y so it bleeds to the frame edges at any aspect.
- Arc-length model: a 4096-sample table of the drawn curve (device px, rebuilt on resize) gives cumulative lengths, tangents and normals. All kinematics run in arc length, so ball speed is constant in px/s at any size. Balls traverse the whole circuit in 11 s; the 55 s loop is exactly 5 traversals, so positions, entry times and flash ages all close seamlessly.
- Balls: 16, phases stratified around the circuit with seeded jitter, direction seeded per ball (about 42% counter-moving). A ball's carried state is the state of its current segment evaluated at its entry time, both computed in closed form from the unwrapped arc coordinate A(t) = phase + dir * v * t (entry time solves A(t') = the boundary behind it). Overrides therefore change the next balls entering a segment, not the ones already inside it, per the prompt's wording.
- Segments and checkpoints: 7 checkpoints at equal arc intervals, 7 segments between them. Base segment states are a seeded shuffle of [red, amber, blue, green, red, blue, dim], so all four hues are always in play and at most one segment is dim. A dim segment's balls render as dark rail-colored beads (the strict palette has no fifth hue; the bead is the rail tone lifted off the void).
- Checkpoint flashes: the most recent pass age per checkpoint is analytic (min over balls of time since their arc coordinate last crossed the checkpoint). Flash alpha is 0.8 * (1 - age/0.45)^2, so only just-passed checkpoints glow, briefly.
- Interaction as recorded events: drag crossing into a new segment pushes a {t, seg, state, seed} override stepping that segment to the next state in the cycle; tap within 46 px of a checkpoint flips the following segment; double-tap reseeds (new fleet derivation, overrides keyed to the old seed stop applying). Draw is a pure function of piece time plus these event lists.
- Sizing: Visual Viewport API with resize listeners on visualViewport and window; canvas style width/height pinned in px inside draw(); phone detection via window.screen min dimension < 700 with the h > w*1.15 aspect fallback.
- Audio: lazy AudioContext created on first pointerdown, typeof-guarded, never autoplays. Checkpoint ticks are soft 1750 Hz triangle blips detected inside the rAF loop as flash-age resets between frames (at most one per frame); state changes get a two-note confirmation (660 then 880 Hz). Silent in the QA renderer, where the context never exists.
- Determinism: frame one is the synchronous draw at fixed phase T0 = 19 s. No Date.now anywhere; piece time in the browser is T0 plus elapsed since the first rAF timestamp. No gradients, no shadowBlur, no ctx.filter, no offscreen canvas; ball glow is layered alpha discs. The rAF loop is typeof-guarded and replay is capped by the closed-form state functions.

## QA log

- Rendered with node render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png); all rendered cleanly in silence.
- Determinism: thumb.png rendered twice and cmp-compared byte-identical after the final seed fix.
- Frame-one tuning: the first seed (1068001) put the freshest checkpoint pass 0.34 s before frame one, which the squared decay renders invisible (alpha about 0.02). An offline probe of the pass-age math (arc length cancels, ages are pure phase arithmetic) scanned seeds for 1-2 checkpoints with pass age under 0.30 s at t = 19 and no third under 0.45 s. Seed 1068045 gives ages 0.013 s and 0.100 s (the rest 0.47 s and up). Re-rendered: the thumb and desktop frames show one bright white flash diamond on the lower-left diagonal and a second flash riding under a blue ball on the right descent.
- Read-back: desktop and thumb show the eight full-bleed with two rails and sleeper ties, balls in discrete red, amber, blue and green with dark beads in the dim segment, long unlit rail stretches, checkpoint diamonds small and sparse. Mobile (390x844) shows the whole tall eight inside the width, balls and the flash diamond legible, nothing clipped.
- Hygiene greps clean: no Date.now, createElement, gradients, shadowBlur, filter, getUserMedia, offscreen canvas, or em dashes; the only text is the title element.

## Deviations

- Base seed selected by probe (recorded above) instead of taken blind: frame one needed a checkpoint caught mid-flash, and with 112 passes per 11 s circuit the decay window makes an unprobed seed a coin flip between zero visible flashes and a crowd of them.
- The drag terminal steps a crossed segment to the next state in the fixed cycle rather than opening a color choice: one gesture, one deterministic recorded command, in keeping with the 2011 in-venue terminals that sent discrete blink/color commands.
- Audio ticks are detected from age resets in the animation loop instead of scheduled from the pass table: the pass table is exact, but a tick only matters in the live loop, and only after a visitor gesture has created the audio context.
