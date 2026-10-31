# No.874 "Somewhere in Taipei"

Study #107 xu-jared, PP35 "Underpass Pulsation".

## Concept

Her Outer Pulsation series: monthly guerrilla noise gigs in Taipei's
underpasses and overpasses since 2019, some 43 editions, the concrete as the
hall. The piece is an underpass you can play. A long concrete vault recedes
to a vanishing point; fourteen pillars march down its sides. Dragging across
the vault strikes the concrete: each pillar answers with its own resonance,
bright and short when struck fast, deep and dwelling when struck slow. A
full pass across all fourteen pillars is one gig, and the gig is archived:
one small glyph joins the row on the left wall, permanently for the session.
Play continuously for about three minutes and the piece ends the gig itself,
fading quiet over ten seconds the way a tolerated gig ends when tolerance
runs out, then reboots dim for the next edition. There is no score, no
target, no stage, no crowd: only concrete, pillars, sodium light, and the
ghosts of editions past. No visible text anywhere except the document title.

Palette, strict: concrete black #141310; sodium #FFB000; pillar edge
#3A372E; glyph green #33FF66; strike flash #E8E8E0.

## Construction

- Single self-contained canvas 2D page. Canvas sized from the Visual
  Viewport API with resize listeners on both visualViewport and window;
  canvas.style.width/height are pinned in px inside draw() every frame.
  Phone detection reads window.screen physical size (min dimension under
  700px), with aspect h > w*1.15 as fallback only.
- Vault model. The vanishing point sits at (0.5W, 0.47H). Depth is an
  exponential scale s = 0.16^(depth/6) for depth 0 (nearest) to 6
  (farthest): pillar centers, heights, widths, arch rings, and convergence
  lines are all lerps between the near frame and the vanishing point at
  that scale, so the vault is one perspective rule applied fourteen times.
  Pillars are drawn far to near with a capital band, a base band, a flat
  sodium floor pool at each base, and a sodium lamp glow on each face; the
  pools breathe slowly on the shared clock.
- Resonator model. Every pillar owns one frequency from its depth: 42, 52,
  63, 75, 88, 100, 112 Hz (nearest to farthest, the right side detuned by
  1.03), inside the specced 40-120 Hz band. A strike plays a noise burst
  through a bandpass at that frequency; drag speed sets the strike:
  strength = clamp(0.35 + speed*0.35) and the envelope tau runs from 1.1 s
  (slow, deep, dwelling) to 0.3 s (fast, bright, tight), with the filter Q
  and burst playback rate following the same strength. The vault's concrete
  is a convolver whose 2.5 s impulse is synthesized in code at arm time:
  seeded noise through a one-pole lowpass under a power decay, dark and
  slightly metallic, no external samples.
- Recorded-event model. Strikes are stored events {side, depth, t0,
  strength, tau}; the pillar flash is strength * exp(-age/tau) and the
  resonance ring expands on the same envelope. Drags are stored as time
  intervals; taps, double-taps, pass completions, and gig-clock resets are
  stored as time points. Every frame, including frame one, is a closed-form
  function of these records and t. No state is integrated frame to frame.
- The gig clock (police tolerance). A pure walk over the recorded drag
  intervals accumulates active play; resets zero it; when it reaches 180 s
  the walk derives a fade (10 s down to 12% brightness), archives that
  edition at the fade's end, and reboots at 35% brightness recovering over
  20 s. Accumulation pauses during a fade. Because the fade times are
  derived by the walk rather than stored, the brightness and the automatic
  archives at any t are reproducible from the drag record alone. The audio
  master ducks with the same brightness value.
- Glyphs, not numerals. The prompt's counter (PLAYS, WEAR-style honesty by
  counting) collides with the gallery's no-visible-text rule, so the count
  lives in accumulation instead: each edition is a small abstract glyph, a
  seeded polyline motif (mulberry32, seed 874000 + edition*131: 3-5
  segments in a unit box, an optional terminal dot, an occasional ring).
  The wall is pre-seeded with six archived editions (31, 33, 36, 38, 40,
  43) and four older ghosts are pinned to pillars (editions 4, 9, 25, 41,
  pulsing faintly). New archives start at edition 44. The archive stacks up
  the left wall, newest lowest, capped at 14 visible; past the cap the
  oldest visible glyphs fade first (alpha 0.22, then 0.42) as the wall
  fills. A completed gig also breathes one green ring out of the vanishing
  point, the only celebration the piece allows itself.
- Interaction mapping. Pointer-down inside a pillar's hit zone strikes it
  (strength 0.55); moving into a new pillar's zone during a drag strikes it
  at the drag's current speed. Strikes during a drag fill the pass set;
  all fourteen completes the gig. A tap anywhere strikes the nearest pillar
  as a test tone (not counted toward a pass). A double-tap archives the
  current edition and starts a fresh one immediately, resetting the pass
  set and the gig clock. Double-tap is detected on the second pointer-down
  against the last recorded tap, following the house pattern.
- Audio. Lazily created on the first pointer-down, typeof-guarded
  throughout; the QA renderer has no AudioContext and the piece renders in
  total silence. One shared noise buffer feeds every resonator; the master
  gain follows the gig clock's brightness.
- Determinism. Frame one is the synchronous draw(0) at load: the vault at
  rest, pillars marching to the vanishing point, sodium pools dim, four
  pillar glyphs at their t=0 pulse phases, six archive glyphs on the left
  wall. The clock is elapsed time since load via performance.now; the first
  frame never reads it. No Date.now, no Math.random anywhere: all
  randomness is mulberry32 seeded from constants. No gradients, no
  shadowBlur, no ctx.filter, no offscreen canvas. The rAF loop is
  typeof-guarded.

## QA log

- Rendered with the house node-canvas renderer at 1280x900 (qa-desktop),
  390x844 (qa-mobile), and 720x720 (thumb). The piece runs cleanly in
  silence: no AudioContext in the harness, all audio calls guarded.
- Determinism: thumb rendered twice and byte-compared with cmp:
  identical. Duplicate render deleted.
- Read-back: desktop and thumb show the dark perspective vault, fourteen
  pillars converging on the central vanishing point under arch rings, dim
  amber floor pools and lamp glows, the six-glyph archive stack on the
  left wall, and the pillar glyphs in phosphor green (one caught at the
  bottom of its pulse, near-invisible, as designed). Mobile holds the same
  composition in the tall frame, vault centered, nothing clipped.

Deviations: one, recorded above: the edition counter is glyphs, not
numerals, per the gallery no-text rule; the counting is honest in the
accumulation instead. Everything else follows the brief, including the
glyphs-not-numerals treatment the brief itself specified.
