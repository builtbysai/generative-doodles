# №1430 "Songs for Birds That No Longer Sing" (wolfgang-muller WM7, PP653)

A dark listening room. One modelled bird, large, center-frame on a wood stand,
with the song it no longer sings drawn as a spectrogram arcing above and
around it like a halo that is also a score. Ten further birds wait dim in the
dark behind it; one bird is lit at a time, changing every cycle, so all
eleven get their turn.

## Frame one (t = 0, boot flag)

Dark room #141210 with faint seeded speckle. The lit bird (variant 0) sits
center-frame on its stand: clay body #b89a78 with seeded speckle, fabric wing
patch with stitch dashes, belly patch, three fanned white tail feathers, head
with beak and eye dot. A small witness-note paper rectangle leans at the
lower left, its marks lines only, never text. The spectrogram arc spans the
upper frame; at t = 0 only the faint score line and the playhead dot at the
arc's left end are present, and the gap (u 0.55–0.70) shows as a dotted gray
arc where no description survives. No visible text except `<title>`.

## Mechanics (all closed-form over piece time and recorded events)

- 30 s call cycle per bird; lit bird index = floor(t / 30) mod 11. Each of the
  11 variants differs in body scale, tail length, crest, wing shade, and belly
  patch (seeded per index).
- Call shape along the arc: rise (smoothstep, u 0–0.30), hold with a slight
  wobble (0.30–0.55), gap (0.55–0.70, no gold anywhere), fall (0.70–0.90), rest
  (0.90–1). The faint score line shows the whole call; the bright gold line
  shows only the played portion up to the playhead; the playhead dot is drawn
  only where the call exists, never inside the gap.
- The bird's head turns slightly toward the sound of itself: head tilt =
  0.22 * callAmp(p) * sin(2πp), tied to playback, never to frame state.
- Drag across the spectrogram arc scrubs the call: while dragging, the
  playhead freezes at the scrubbed position; on release the schedule
  re-anchors there and resumes. Scrubbing never lands inside the gap.
- Drag into the gap injects a guess-line: blue #5a7a9a, dashed, clearly
  marked as a guess, never passing as the real call. Guesses persist across
  cycle boundaries (stored history, never wiped).
- The absence stays absent: the gap is never filled with gold, the guess is
  never promoted to a real call, and no bird is ever rendered realistically.

## Adaptations

- Bird as a handmade-textured model (clay body + speckle, fabric wing patch
  with stitch dashes, paper belly patch, feather tail); call as a parametric
  spectrogram with a marked gap region; drag scrub = playback position, drag
  into gap = guess-line injector with distinct color and dashed rendering;
  bird rotation tied to playback; one-bird-at-a-time lighting schedule.
- Silent by design: the call is drawn, not heard. No AudioContext, no
  getUserMedia, no offscreen canvas, no gradients, no shadowBlur, no Path2D,
  no createElement, no fillText/strokeText anywhere.
- Node-canvas quirks: every fading alpha rounded to 4 decimals before
  stringifying; dots as filled rects or own-beginPath arcs.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas pinned in draw();
  phone detection via window.screen physical size (min dimension < 700px)
  with aspect h > w*1.15 fallback; centered composition, page ground is the
  piece's own #141210; checked at 390 wide (player stacks, no clipping).
- Determinism: frame one = draw(0) via boot flag, clock starts only with the
  rAF loop (plain function declaration behind a typeof guard); all randomness
  from mulberry32 (seed 1430000 + index·7919), never Math.random.

## Verification (forced-time probe harness, vm-isolated instance, stubbed rAF
driving the piece's own loop, pointer events to its own listeners)

- Two fresh instances byte-identical at t = 0; thumb byte-identical across
  repeated renders including a final re-verify after the last fix.
- Gold pixels near the top arc: 0 at t = 0 → 102 at t = 15 (call rises and the
  played portion brightens).
- Bird region differs by 12,124 px between t = 0 and t = 31 (lit bird changes
  every cycle).
- Scrub: gold at the scrub point 0 before → 77 while scrubbing (playhead
  frozen at the scrubbed arc position).
- Gap guess: blue pixels near the gap point 0 before → 20 after a gap drag,
  still 20 after a cycle change (guess persists).
- Playhead in gap: gold at the gap point = 0 at p = 0.62 (no dot inside the
  gap).

## Fix rounds

- Tail feathers first merged into a single white blob reading as a wing;
  spread and angled so three separate fanned feathers read. All renders
  re-done after the fix. (One probe-harness fix, not a piece fix: the harness
  first failed to anchor the rAF clock, making time-based probes read t = 0;
  fixed and all probes re-run passing.)
