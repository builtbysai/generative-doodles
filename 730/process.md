# No.730 The Notary

EXPANSION #89 paul-ramirez-jonas, prompt block 3 "The Notary", after
Alternative Facts (2017, New Museum): tell a lie, he notarizes it true,
pay with a gold-plated coin, two documents.

## Concept

A desk seen from above, felt green wall to wall. At the left, a blank
document. At the top, a heavy notary stamp hangs on a spring arm. At
the right, a silver coin rests in a dish. Along the bottom edge, the
dark slot of an archive drawer, and beside it the growing pile of
everything the desk has already certified.

The piece runs on tolls, in the artist's sense: you must give to
receive, and each stage of the ritual costs one deliberate tap. Tap
the document and a lie types itself out, letter by letter, in
typewriter monospace. There is no keyboard and no text entry; the lie
is drawn from a seeded list of twelve harmless ones ("I was never
late", "The fish was this big", "I already paid you back"). Tap the
stamp and it slams down on a spring curve, the frame shudders once,
and TRUE lands across the lie in red, boxed in a double rule. The
stamp is the fee collector's signal: at the same moment, the silver
coin in the dish begins to gold-plate. Tap the dish when the change
finishes and two certification documents print: one slides away into
the archive drawer, one slides down toward you, enlarged, yours.

The drawer remembers. Every completed cycle files its lie into a
visible stack of sheets on the desk, newest on top, its miniature
TRUE already stamped. Tap the stack and the newest filing opens full
size over the dimmed desk; tap the sheet to walk back through the
older certifications, tap outside to close. The stack is the ledger
of the piece: participation, accumulated and inspectable.

## Construction

Single self-contained canvas 2D piece, no assets, no audio. Strict
palette: felt #2E4B3F, paper #F7F3E8, ink #1C1C1C, stamp red #C0392B,
coin silver #C0C5CE, coin gold #D4A017, bubble pale gold #F0D878.
Shading is done only with globalAlpha over those tones. The only text
in the piece is the specced content: the seeded lies, the TRUE stamp,
and the same two on the miniaturized and flipped documents.

State machine: blank -> typing -> typed -> slamming -> plating ->
plated -> printing -> blank. The machine is driven entirely by
recorded tap timestamps (performance.now at pointerdown); every
animated quantity is a closed-form function of the time since the
relevant tap, so any state can be recomputed from scratch on any
frame and frame one is simply the blank state drawn synchronously at
load (draw(0) after the initial resize; never derived from a live
clock reading of an animation phase). Out-of-turn taps do nothing:
the stamp cannot fall on a blank page, the dish cannot print an
unplated coin. The lie order is a mulberry32-shuffled permutation of
the twelve lies, reshuffled with a bumped seed each time the list
runs out, so no two consecutive cycles repeat a lie and the whole
sequence is reproducible from the base seed 73089.

Typing: characters revealed at 0.085 s per character, wrapped by word
with live measureText into the document's text column, with a
blinking carriage block at the write head (blink phase is a function
of the same clock, so it is part of the deterministic scene).

Slam: a piecewise curve over 0.6 s (fast quadratic descent to impact
at 0.16 s, a hold at full press to 45 percent, an ease-out return).
The stamp head lerps from its hover point above the desk to the
document's stamp target as the curve rises, its tilt straightening
into the press; the TRUE imprint and a decaying frame shake (two
detuned sines scaled by time since impact) both key off the impact
moment, not off the tap.

Plating model: progress p runs 0 to 1 over exactly 6 s from the end
of the slam. The coin's face color is a per-channel RGB lerp from
#C0C5CE to #D4A017 shaped by an ease-in-out of p: a slow chemical
change, deliberately unspectacular, with no highlight flash anywhere.
A gold rim arc creeps around the coin's edge in proportion to p, so
the extent of the change is legible at a glance. The fizz is 40
bubble particles whose parameters (phase offset, speed, start angle
and radius, size) come from one mulberry32 stream; each bubble's
position and alpha are pure functions of p, rising from the coin's
lower half to above its top with a small sinusoidal wobble, present
only while 0 < p < 1. The bubbles are pale gold at low alpha: effervescence, not casino sparkle.

Printing: over 2.4 s, two mini-documents (the lie plus its TRUE,
re-rendered at small scale by the same wrap and stamp code) start as
half-size duplicates on the document and slide on an ease-in-out of
the first 1.2 s: one shrinks toward the drawer slot and is filed,
one grows toward full size as it slides down-frame toward the
viewer, coming to rest in the open desk below the document. They
rest for the second half of the phase, then the cycle closes:
the lie is pushed onto the archive array, the lie pointer advances,
and the desk returns to blank with the stack one sheet taller.

Archive and flip view: the filed stack is drawn as up to 14 offset
paper sheets beside the drawer slot, the newest carrying a miniature
TRUE. The flip view dims the desk with ink at 0.45 alpha and centers
the selected filing at readable size, with a row of position dots
along its bottom edge (one per filing, current filled). It opens on
the newest filing; sheet taps step toward the oldest and past it the
view closes; a tap outside the sheet closes it at once.

Sizing: canvas comes from the Visual Viewport API with resize
listeners on both visualViewport and window; draw() pins the canvas
CSS size in px every frame. Phone detection uses window.screen's
smaller dimension (< 700 px) with the aspect fallback h > w * 1.15.
The phone layout restacks the desk vertically (document top, dish
mid-frame, drawer along the bottom) while the stamp's hover and slam
target are recomputed from the same layout function, so the press
still lands on the document.

QA support: an inert ?seed=tNN hook (read once from location.search,
no effect in the gallery) replays a fixed scripted timeline
(typing under way by 2 s, slam at 4 s, plating 4.6 to 10.6 s, print
at 11.2 s) so the developed states can be rendered and inspected
headlessly, in the manner of the neighboring pieces.

## QA log

- Rendered with the house renderer (node-canvas, no
  requestAnimationFrame, no AudioContext, no createElement, no
  offscreen canvas, no ctx.filter): qa-desktop.png 1280x900,
  qa-mobile.png 390x844, thumb.png 720x720.
- Determinism: thumb.png rendered twice and byte-compared with cmp;
  identical. Frame one is the synchronous blank-desk draw; the scene
  at blank state depends on no clock value.
- Frame one read-back: green felt desk, blank ruled document at the
  left with paper shadow, stamp hanging from its top bar at center
  top with the red seal face showing as a thin line, silver coin in
  its dish at the right, empty drawer slot along the bottom, no
  stack (nothing filed yet), no text anywhere except the title.
- Forced-state read-backs via the seed hook: t=3 shows the first lie
  fully typed on the document; t=7.5 shows TRUE stamped across the
  lie and the coin roughly half-plated with its rim arc partway
  round and bubbles rising; t=12 shows the two certification copies
  mid-slide, one shrinking toward the drawer, one grown toward the
  viewer.
- Mobile read-back: the phone layout engages at 390 wide (screen
  rule), document across the top, dish centered below it, drawer
  slot along the bottom edge; nothing clipped.
- Grep audit: no Date.now, no Math.random (mulberry32 only), no
  createElement, no AudioContext, no gradients, no external URLs,
  no em dashes anywhere including the lie list.

## Deviations

- The spring arm is drawn as a top bar, pivot, and single link to
  the stamp body rather than a literal coil spring: at gallery scale
  the coil read as noise, and the prompt fixes the stamp's position
  and action, not the arm's mechanism. The slam's spring character
  is carried by the piecewise press curve instead.
- The archive stack sits on the desk just above the drawer slot
  instead of inside the drawer: the prompt requires the accumulated
  filings to be visible and tappable, and a stack inside a closed
  drawer could be neither. The filed copy still slides into the
  slot; the pile beside it is the visible count of what went in.
- The flip view walks newest to oldest and closes past the oldest
  rather than wrapping: a deliberate end to the ledger, matching
  the one-directional accumulation of the archive.
