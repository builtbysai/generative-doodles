# №1341 "The Speech Bubble" — process notes

hank-willis-thomas HT6 (PP516). Grounded in The Truth Booth (Cause Collective:
Thomas + Sam Giarratani + Helen Banach; Rothko Chapel Houston Oct 2026):
"Step inside, take two minutes, and finish the sentence: 'The truth is...'"

## Frame one (t = 0, boot flag)
A dark plaza (#101418), full-bleed. ONE white speech bubble (#FDFBF6), centered,
occupying the middle two-thirds, drawn as a soft-edged bezier blob with a tapered
tail pointing down-left and a warm inner light near its lower curve. Two cables
(#3A3F45) run from the bubble's lower edge to the bottom of the frame, with
pulsing teal tether lights (#4E9B8E). Three text fragments are already mid-rise
below the bubble, in rotation order: "...the truth is, my grandmother...",
"...the truth is, I forgive...", "...the truth is, we were here first...".
Tiny ember dots drift upward near the fragments.

## Mechanics (all closed-form over piece time and recorded events)
- Breathing: the bubble scales 1.0 -> 1.03 on a continuous 6 s sine, independent
  of absorption.
- Ambient fragments: a seeded schedule spawns a fragment every 2.2-4.2 s; each
  rises from the bottom edge at a seeded speed and x position, swaying gently,
  and is absorbed at the bubble's lower curve: it scales down and fades over its
  last 60 px, and its absorption triggers a warm glow pulse on the bubble
  (exponential decay, tau 0.55 s). At most about 7 fragments are ever visible
  at once (cap is 12).
- Drag offering: a drag that starts in the bottom 35% of the screen and moves
  upward more than 30 px releases a NEW fragment at the release x position. It
  rises faster, is absorbed at the lower curve, and pulses the bubble. Release
  returns to ambient. No text input field, no speech-to-text: the piece supplies
  the fragments.
- The bubble never pops, deflates, or flies away. No human figures, no crowd
  silhouettes. Silent: no audio of any kind. Never click-to-reload.

## Adaptations
- Visible text is ONLY the three specced fragments (verbatim) plus <title>. The
  prompt's 40-fragment deck is reduced to the three specced examples in rotation;
  no additional fragments were invented.
- Glow is layered flat-alpha ellipses, never gradients. Bubble, tail, cables,
  and embers are flat shapes only.
- Frame one is deterministic: drawn synchronously at exactly t = 0 via a boot
  flag; the rAF clock starts only with the loop. All fragment timing, positions,
  and sway come from seeded mulberry32 streams (seeds 1341001/1341002), never
  Math.random. Drag-offered fragments cycle the three specced fragments in
  fixed order.

## Fix rounds
1. First render's outer glow stacked four flat-alpha rings into visible
   concentric bands filling the frame. Reduced to two low-alpha rings (1.60R at
   0.04, 1.25R at 0.05) so the glow reads soft.
2. First render's tail read as a thin detached spike. Rebuilt as a proper
   tapered wedge: two quadratic curves from the bubble's lower-left curve to a
   tip below-left and back.
3. First render showed no fragments at frame one (the ambient schedule starts
   at t = 0.5). Seeded three fragments with negative spawn times (-4.0, -2.4,
   -0.9 s) so frame one already shows fragments rising toward the bubble.

## QA
Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop,
390x844 mobile, 720x720 thumb; all three inspected. Thumb rendered three times
after the final edit and byte-compared (cmp) — all identical. Token scan clean:
no Math.random, createElement, AudioContext, getUserMedia, shadowBlur,
gradients, or offscreen canvas. rAF loop is a plain function declaration behind
a typeof guard. index.html md5: 1665bbc201422e0a7c2a6786bc0675d4.
