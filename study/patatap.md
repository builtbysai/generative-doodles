# Patatap (Jono Brandel + Lullatone): "portable animation and sound kit"

**Site:** https://www.patatap.com/
**Author:** Jono Brandel (animations, code), sounds by Lullatone (Japanese
duo Shawn James Seymour and Yoshimi Tomida). Live since 2014, repo
github.com/jonobr1/patatap (MIT, main commit 4189468, 314 commits).
**Status:** 2026-09-24, deep. Full animation source read (all 23 files in
src/animations/ plus index.js, palette.js, common.js, sound.js), three
archetypes re-derived in plain canvas and frames visually inspected with
zero console errors. Live site booted (all 26 sounds buffered, lobby
dismissed), but key triggering was not possible in the headless harness:
CDP Input.dispatchKey events never reached the page listeners and the
bundle exposes no globals, so the live animations themselves were not seen
on patatap.com. The re-renders are built from the actual authored code.

## The architecture: an instrument, not a page

The whole app is one idea: a strict animation contract plus a sound
buffer per animation. `register(hash, animation)` requires every animation
to expose start, update, clear, resize, playing, hash, name, and sounds.
26 keyboard keys map to 23 animation files through keycode hashes (Q row
is hash row 0, A row is row 1: Q is '0,0', A is '1,0', and so on).

The trigger path is ruthlessly simple: if the animation is already
playing, clear() it first (no overlap garbage), then start(). start()
fires the sound with `animation.sound.stop().play()` and begins the
in-tween. Every animation is a chained pair of TWEEN.js tweens: an attack
(animate_in) and a decay (animate_out), and onComplete of the last stage
calls reset(), which re-randomizes the parameters and rebuilds the
tweens. Nothing is ever drawn the same way twice. As Brandel put it in an
interview, the animations are "programmed, rather than drawn, so they
vary slightly with each iteration."

All timing derives from one base unit: `duration = 1000` in common.js.
Every tween is a fraction or multiple of it (strike draws in 0.1,
erases in 0.35; squiggle draws in 0.5, erases in 0.5). Twenty-three
unrelated motifs share one pulse, which is why mashing keys feels
musical instead of chaotic.

## The variation engine

reset() is where the freshness lives. Every trigger re-rolls the
parameters: bubbles picks a random direction and ring rotation; strike
picks a random chord distance, angle, and line width; ufo picks a random
quadrant to drop from; squiggle picks a random lobe count (phi 1 to 7)
and a random flip; spiral picks a random rotation; moon picks a random
rotation; prisms snaps to a random quarter turn. The motif is fixed, the
pose is new. This is the single most portable idea in the codebase: build
the motif once, randomize the pose on every trigger.

## Palette roles and the spacebar macro

Six sound sets (Grey, White, Orange, Blue, Cream, Purple), each with its
own folder of 26 MP3s (assets/{A..F}/{animation-name}.mp3) and its own
palette of 7 named roles: background, middleground, foreground,
highlight, accent, white, black, plus an isDark flag. Animations never
reference a fixed color, only roles (colors.black, colors.accent).

Pressing space advances palette.current, which does two things at once:
it swaps every animation's sound buffer to the next folder, and it tweens
all 7 color roles toward the new set with exponential easing
(drag = 0.125) while the update() hooks repaint live animations
mid-flight. One keypress changes the entire instrument's character,
sound and color together, with a smooth crossfade. Lullatone designed
each set as 13 melodic plus 13 rhythmic sounds, deliberately chosen not
to go muddy when mashed.

## Technique vocabulary (the 23 animations)

- strike: one chord across the screen, Circular.In draw-on (ending 0 to
  1), Circular.Out erase (beginning 0 to 1). Line width random 3 to 10.
- bubbles: 24 dots cascade around a ring, each dot's in-tween chained to
  the previous dot's completion (durations shrink per dot), then a
  second cascade orbits them out.
- squiggle: 200-point sine path, phi lobes, Sinusoidal draw-on and
  erase, random flip.
- spiral (dotted-spiral): 120 two-point segment lines forming a spiral,
  lines revealed progressively while the group rotates and scales 8x
  with Circular.In. Line width tapers by a sqrt curve.
- zigzag: 120-point open path, phi = 6 zigzag.
- ufo: big accent circle drops from off-screen to center (Circular.Out),
  then scales to zero.
- pistons: three animation variants with 1, 5, or 9 stacked rectangles,
  optionally rotated 90 degrees, revealed by ending/beginning.
- suspension: 16 circles fly from center to random polar destinations,
  Sinusoidal.Out.
- moon: 64-point closed blob, random rotation, foreground fill.
- corona: chained in/out cascades like bubbles.
- confetti: spawn from a random screen-edge quadrant.
- clay: spawn at one of 8 positions.
- glimmer: circles between inner and outer radii.
- prisms: group rotation snapped to random quarter turn.
- flashes: strobe, shape.visible toggles randomly on update.
- splits, timer, veil, wipe, change: single-gesture reveals and wipes.

Everything is screen-normalized: sizes derive from min_dimension, groups
are translated to center, resize() re-centers. The draw-on trick is
Two.js paths' beginning/ending properties, the classic stroke-reveal.

## Palette and composition

Flat colors, no gradients, bold geometry, full-screen single gestures
dead center. Each palette set is a complete mood: cream with red accent,
dark purple with neon foreground, flat orange, deep blue. The discipline
is the role system: 6 sets times 23 animations is 138 combinations and
every one of them reads, because the roles, not the colors, carry the
composition.

## What makes it sing

The instrument model. A uniform trigger contract, one shared time unit,
pose randomization on every press, and visual lifespans roughly matched
to each sound's envelope. Latency is near zero: keydown to motion and
sound in the same frame. And the spacebar macro: one gesture that
re-voices the whole instrument is a better idea than any single motif.

## Avoid-list notes

flashes is literal strobing (visible toggled randomly per frame). It
works in the kit because it is one key among 26, but do not build a piece
around photosensitive flicker without a warning and a toggle. Also: the
motifs alone are almost trivially simple. The craft is in the system
around them (contract, timing unit, variation, roles). Copying a single
Patatap animation without the system is just a screensaver.

## Cross-links

The pose-randomization engine pairs with the Snow Esamosc / viewyonder /
takawo study's variation discipline (same motif, new pose, every loop).
The beginning/ending stroke-reveal is the same mechanism as the orbit
diagram work on the Rubik's cube. The palette-role system is the
compositional cousin of meodai's poline (relationships, not choices).
