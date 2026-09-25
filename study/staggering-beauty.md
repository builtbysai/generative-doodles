# Staggering Beauty : George Brower (2012)

**Site:** http://www.staggeringbeauty.com/ (clones at staggeringbeauty.io)
**Author:** George Michael Brower, August 2012.
**Status:** 2026-09-25, deep on the technique. The live site timed out from
this session's network, so the current build was not pixel-inspected.
Behavior documented from the Useless Web wiki and contemporary accounts;
the full escalation loop re-rendered locally in plain canvas with a
deterministic scripted pointer (calm 0-3s, wiggle 3-7s, freakout 7-12s) and
frames visually inspected at 1280x800: rest state, strobing freakout with
dilated eyes and speed lines.

## What it is

A seizure warning, then a page with a black wormlike creature that has two
bright white eyes. The worm follows the cursor. Wiggle the cursor gently and
it wiggles along. Shake harder and it escalates: the eyes dilate, the worm
starts thrashing on its own, the background strobes through saturated
colors, flashy images pop in, and a loud, cheerful-then-creepy song plays.
It is the definitive jump-scare interaction toy, and it carries a real
photosensitivity warning for a reason.

## The technique

The body is the oldest trick in the book: chain-follow segments. Each
segment moves toward the previous one by a fixed step length, which gives
the whole creature a lagging, rubbery, wormlike lag for free. The eyes are
two white discs on the head segment, pupils drawn inside, and their radius
scales with a smoothed pointer-speed value. That speed value is the whole
game: it is an envelope follower on input. Below a threshold, the scene is a
calm pale page. Above it, the same number drives everything at once,
strobe background hue cycling at around 7 flashes per second, self-wiggle
added perpendicular to each segment's direction, speed lines, and image
popups. My re-render used a single energy value with a 0.06 smoothing
factor, and the mapping held up visually: calm at 0.01, full freakout at
0.98, with the eyes reading as the clearest tell because they scale
continuously through the whole range.

One honest observation from the re-render: at extreme input speed a
fixed-step chain collapses into a ball because each frame's pointer jump is
huge and every segment snaps straight at the head. The original avoids this
because the visitor's own wiggling is bounded by their wrist; the system
never sees teleport jumps. If you script or amplify the input, add a max
step or a cap on the head's per-frame travel or the creature balls up.

## What makes it sing

Two decisions. First, one input metric drives every output. The wiggle is
the score, the conductor, and the throttle, so the visitor learns the whole
instrument in about four seconds. Second, the escalation has three readable
stages rather than two: calm, excited (eyes widening, worm thrashing), and
seizure (strobe, noise, song). The middle stage is what makes people push
into the third. A single threshold would feel like a trap; the gradient
feels like a dare.

## Avoid-list

Do not ship strobing backgrounds or seizure-adjacent escalation without a
clear, upfront warning, and think hard before shipping it at all. The
technique worth stealing is the envelope-follower input and the
continuous single-metric mapping, not the flash-bang payoff. Also
overdone: the jump-scare reveal itself. In 2012 it was a prank; now it
reads as mean.

## Seeds

74. **Tide Worm** : the chain-follow creature and the single-metric
    escalation, but the metric is slowness: move the pointer very slowly
    and the worm unfurls into a long, graceful ribbon with soft bioluminescent
    bands; move fast and it knots itself into a tight ball and hides. The
    dare runs backwards. Success: a visitor discovers the calm state only
    by being calm, and the piece rewards the opposite of the usual input.
75. **Eye Garden** : a field of the eye-pair motif: dozens of small
    chain-follow sprouts, each with its own energy meter, each dilating its
    eyes as the pointer passes. No strobe, no noise, just a field of
    watchers that notice you. Success: sweeping the pointer across the field
    leaves a visible wake of widening eyes that relaxes back over seconds.
