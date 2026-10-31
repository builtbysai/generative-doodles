# No.772 Portal Arch

EXPANSION #94 mary-corse, prompt block 5 "Portal Arch".

## Concept

A single white arch on a black field, built the way Corse builds hers:
like a post and lintel made from one shortened band, two straight posts
and a shallow arc where they meet at the top. The arch is a glass
microsphere field, so it does not hold a fixed brightness: it answers the
viewer's body. Approach and the band fills with light, warms toward its
flare tint, and the empty opening starts to glow from within, like a
doorway filling with light. Retreat and everything dies back until only a
pale outline stands in the black. Untouched, the distance drifts slowly
in and out on its own, so the arch breathes between the two states. No
gothic point, no scene behind the door: post, lintel, light.

## Construction

- Palette, strict: arch #F5F4F0, flare white #FFFDF4, field #101012,
  arch edge shadow #2A2A2E, flare tint #F4E8C8. Nothing outside these
  five anchors is drawn; every intermediate tone is a mix of them.
- The band: one continuous outline path in units of the arch height S.
  Total width 0.58 S (taller than wide, human-scaled), band thickness
  0.085 S, post centerlines at plus/minus 0.2475 S, chord (spring) height
  0.8647 S. The top is a circular arc of radius 0.3765 S with a shallow
  sagitta of 0.0928 S, center at height 0.5810 S. The outline runs up the
  left post's outer edge, samples the outer arc (44 segments), down the
  right post, across the base, up the inner right post, samples the
  inner arc back, and down the inner left post: posts and lintel are a
  single stroke, never assembled pieces.
- Layout: S = min(0.74 H, 0.84 W / 0.58), centered, base at 0.875 H, so
  the arch keeps its proportion and its generous black margins on
  desktop, square, and phone frames alike. A quiet ellipse of the edge
  tone under the base grounds the posts.
- Approach and brightness: distance d in [0,1], 0 near and 1 far.
  d(t) = 0.5 + 0.38 sin(2 pi t / 25 s) idle drift, plus a drag offset.
  Approach a = 1 - d drives everything: fill color mixes from #F5F4F0
  through the warm tint toward #FFFDF4 with a squared; fill alpha is
  0.08 + 0.90 a^1.2, so at far the band nearly vanishes while a pale
  outline stroke (alpha rising as a falls) keeps the ghost standing.
  The edge shadow is a wide stroke of #2A2A2E laid under the fill, so a
  thin dark rim separates the white band from the black field at every
  distance.
- The glow: strength g = smoothstep of a above 0.35, raised to 1.5. The
  opening (inner post edges, inner arc, base) becomes a clip path, and
  inside it 30 concentric ellipses of the flare/tint mix are stacked,
  outer layers fainter, radius growing with g, plus a warm spill ellipse
  on the ground inside the doorway. A halo pass redraws the outline
  scaled 1.05 about the base center in tint at 0.05 g, light bleeding
  off the band when near.
- Microsphere grain: 2,600 points from a fixed mulberry32 stream
  (seed 7720501), placed parametrically in unit space, along the posts
  (offset across the band thickness) and along the arc (radial offset),
  about a fifth of them warm-tinted. Drawn clipped to the band, their
  alpha rides on a brightness curve (smoothstep of a above 0.12), so the
  beads appear only where the light is, Corse's retroreflective rule.
- Motion, all closed-form: drag is vertical only. Drag up approaches,
  drag down retreats; one viewport height of travel covers the full
  range, the offset clamped to plus/minus 0.55. On release the recorded
  offset decays as relOff times exp(-(t - relT) / 2.8 s), easing back
  into the 25 s drift. A tap changes nothing. Pointer samples are
  recorded with frame-clock times; no state is integrated per frame, so
  any t reproduces exactly.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas CSS size pinned in px
  in draw(); phone detection via window.screen min dimension under
  700 px with the aspect fallback; page ground is the field tone. No
  visible text except the title. No audio, no microphone. rAF is
  typeof-guarded; frame one is the synchronous draw at t = 0 (d = 0.5,
  mid approach) and is never derived from Date.now() (the string appears
  only in a code comment).

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and cmp byte-compared identical;
  the duplicate was deleted, and the compare was re-run green after each
  fix round.
- Read-backs: desktop and thumb show the band centered on the black
  field, posts straight, arc shallow, grain reading across the band,
  and a soft first glow at the center of the opening at frame one.
  Mobile keeps the whole arch inside the tall frame with margins on
  every side, nothing clipped.
- Forced-state checks via the house ?seed=tNN hook: t = 18.75 s (near,
  d about 0.12) renders the band flared near-white with warm grain, the
  opening filled with diffuse light, a warm spill at the base, and a
  faint halo off the band. t = 6.25 s (far, d about 0.88) renders the
  band at whisper alpha with the grain gone and only the pale outline
  stroke standing. Both throwaway renders were deleted.
- Fix round 1: the opening glow, first built from 7 equal-alpha ellipse
  layers, read as visible concentric rings. Rebuilt as 11 layers with
  outward-fading alpha; all renders redone.
- Fix round 2: at the near state the rings still stepped visibly and
  the glow read as a separate oval target. Rebuilt as 30 layers with a
  wider radius (0.45 + 0.95 g of the opening half-width), then the
  constant term raised slightly so frame one's mid approach keeps a
  visible first glow. All renders redone and the byte-compare re-run
  green after the fix.

## Deviations

- The prompt calls for a soft white radial gradient inside the opening;
  per the house no-gradient rule it is built from 30 layered alpha
  ellipses instead. Same falloff, same read, recorded here.
- The prompt leaves the idle drift's phase open; the drift is phased so
  t = 0 sits at mid approach (d = 0.5), as the piece's frame-one spec
  requires: arch clearly lit, opening beginning to glow, not yet at
  full flare.
