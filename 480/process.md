# No.480 "Calla Dive" - process

## Concept

EXPANSION #57 julandthefox / Giulia Neri, prompt GN8. Her swimmer piece as a
seamless dive loop, watch-only, 36 seconds. A giant white calla lily rises from
the bottom of a still grey-blue water field. A woman in a red swim cap hangs
arched high above the flower for a long, quiet approach, dives headfirst into
its throat, is gently swallowed as the petals close, and rests inside while the
mustard spadix pulses like a held breath. Then the loop wraps and she is arched
above the lily again. One idea, no UI, no text, no hint. No splash, no ripples,
no second diver, no fish: the stillness after the dive is the piece.

Palette: water #5B8CB0 deepening to #3D6B8A, petals #F7F4EC with shadow
#D8D2C0, spadix #D9A03F, swim cap #D61F26, skin #EBC9A8.

## Construction

Single self-contained index.html, 2D canvas only, no external assets.

- Geometry: lily centre at 55% of frame height. Lily width is
  min(70% of frame width, 88% of frame height); on phones (screen min
  dimension under 700px, aspect fallback h > w * 1.15) the width rule is
  min(82% of width, 88% of height) so the composition keeps its shape and
  presence on a tall screen. Lily height is 50% of frame height. Page ground
  is the water's top blue, #5B8CB0.
- Lily: three layered bezier shapes converging at one bottom point. The back
  petal is a tall hood rising to a distinct pointed tip that leans slightly;
  an inner shadow petal in #D8D2C0 gives the throat its depth; a front petal
  flap wraps across the throat and is drawn after the diver, so she
  disappears into the flower. The spadix is a mustard column at the centre of
  the throat with a radial-gradient glow. A translucent deep-blue stem sinks
  from the convergence point to the bottom edge. Petal curl is one parameter:
  key control points lerp between open and closed positions, plus a small
  deterministic breathing sway with a 12s period.
- Diver: a simplified arched figure built from stroked paths in local space,
  scaled and rotated as one group. Two legs with pointed feet rise at the
  back, the torso is a single quadratic arc, the suit band is sampled along
  that exact same quadratic so it always lies on her back, a short neck joins
  the shoulders to the head, and the head is simply the red swim cap circle
  with a small brim: no face detail. Her position follows a quadratic arc
  path from the hang point to the throat with an easeInOut, and her rotation
  opens from -0.14 rad to 0.52 rad as she dives.
- Timeline, all state a pure function of loop time p in [0, 36):
  - 0 to 23s: long still approach. She hangs arched above the lily, drifting
    only by sine terms with periods 36s and 18s.
  - 23 to 25s: the dive (2s), position along the arc, easeInOut.
  - 25 to 28s: swallowed (3s). She sinks by 46% of lily height behind the
    front petal while the curl parameter closes the petals; her alpha fades
    over the last half of the phase as she slips fully into the throat.
  - 28 to 36s: held breath (8s). Petals closed, diver hidden, spadix pulse
    strengthens (pulse period 4s).
  - 35 to 36s: the seam. The petals reopen and she fades back in at the hang
    position, so the state at 36s matches the state at 0s exactly and the
    wrap has no pop.
  Every period used (36, 18, 12, 4) divides 36s.
- Grain: 850 dots from a mulberry32 generator with fixed seed 480057,
  precomputed once at load as normalised positions, radii and alphas, drawn
  identically every frame at low alpha over the whole scene.
- Determinism: the first frame is drawn synchronously at the constant loop
  phase t = 24.0s, mid-dive (see Deviation 1). No wall clock is ever read for
  frame one. Animation, when requestAnimationFrame exists (typeof-guarded),
  is anchored as (24.0 + elapsed since first rAF timestamp) mod 36.
- Canvas sizing comes from the Visual Viewport API with resize listeners on
  both visualViewport and window; draw() pins canvas.style.width and height
  in px every frame. No microphone, no audio, no offscreen canvas.

## Deviations

1. First-frame phase: the brief offered t = 4s (just swallowed) or t = 1s
   (mid-dive, on its own suggested numbering). In this build's timeline the
   dive sits at 23 to 25s, so the equivalent mid-dive constant is t = 24.0s.
   Chosen because the thumbnail then shows everything at once: calla hood,
   mustard spadix, and the red-capped diver arched above the petals with her
   legs up, which reads instantly. Recorded here as required.
2. Seam handling: to keep the loop truly seamless at the wrap, the last
   second (35 to 36s) reopens the petals and fades the diver back in above
   the lily rather than cutting her back in. It reads as a dreamlike
   re-emergence and costs the held breath nothing.
3. Suit and stem colours: the brief gives no suit or stem colour, so both use
   the palette's deep water blue #3D6B8A (the stem at 55% alpha over the
   gradient) instead of introducing a green or a new colour.
4. The optional water wobble on edges was omitted. The water stays perfectly
   still, which the brief asks to protect; the grain alone gives the surface
   its texture.
5. Lily width is capped by frame height (88%) so the hood keeps calla
   proportions on wide screens; on the square thumbnail it spans exactly 70%
   of the width, and on desktop about 62%.

## QA log

Renderer: node ~/workspace/tools/render-piece.js on the final index.html.

- qa-desktop.png (1280x900): calm vertical water gradient, subtle grain.
  The calla reads instantly: pointed white hood tip leaning over a
  #D8D2C0 throat, mustard spadix standing at its centre, front petal flap
  wrapping below, stem sinking to the bottom edge. Mid-dive frame: the diver
  is arched headfirst at top centre, legs up with pointed feet, blue suit
  band on her back, red cap lowest, one arm reaching toward the throat, her
  head and arm just entering the front petal's rim. Nothing clipped.
- qa-mobile.png (390x844): same composition, taller and narrower as a phone
  frame makes it; hood, spadix, cap and legs all clear, nothing clipped, the
  lily still reads as a calla.
- thumb.png (720x720): the full idea in one square: white calla, mustard
  spadix, red cap, legs up, still blue water.
- Determinism: thumb.png rendered twice and compared with cmp: byte
  identical. The second render was deleted.
- Iteration notes: the first pass read as a wide bowl on desktop (hood tip
  lost in a smooth dome, lily too flat) and the suit band floated off the
  torso curve. Fixed by narrowing the hood behind a height cap, giving the
  back petal a distinct pointed tip, shrinking the inner throat, and sampling
  the suit band along the torso quadratic itself; then the lily height was
  raised to 50% of frame height. Re-rendered all three sizes and re-checked:
  the calla silhouette now carries the piece at every size.
