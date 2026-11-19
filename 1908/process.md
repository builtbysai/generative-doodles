# №1908 Mobile Equilibrium

Spec: TASKS.md prompt block MB5, PP1155, study #249 michele-bonifati.
Gallery date: 2007 · 04 · 03 (formula 2002-01-10 + 1909 days).
Pieces.json note will end "Watch the mobile find balance."

## Driver

A trio with no bass hangs in the dark and keeps almost finding its balance, then losing it again.

## Mechanism

A Calder mobile on a 2D canvas. A main beam hangs from a single wire
from the top edge; drums hang from its left end, a tenor sax from its
right end, and a sub-bar hangs from the beam center carrying a guitar
on its left end and a small drum machine on its right. Each hanging
element is a pendulum with its own slow swing frequency, and the beam
tilt is a slow sine swing plus a decaying kick from each freedom
impulse. A tension parameter oscillates slowly: while it favors the
written pattern, amber dots sequence along the beam and the drum
machine pads step in time; every 17 seconds a freedom impulse strikes
one agent in rotation (drums, sax, guitar, drum machine), throws a
sudden white flash with short rays at that agent, and kicks the beam
tilt. The mobile never settles: it levels, tilts, swings, and finds a
new temporary balance. The space between the figures is kept empty on
purpose. Watch only: no pointer, touch, or key handlers exist, and
there is no audio of any kind in the piece. No gravity slider, no
added weight, no stabilization, no metronome.

## First frame

FIRST_T = 23 s. Frame one is a pure function of t, so it is
reproducible. At t = 23 the latest freedom impulse struck 1.5 s ago
at t = 21.5 s, at the tenor sax, so its white flash is still half
bright (alpha 0.45). The beam is tilted about 0.22 rad by the impulse
kick plus the slow swing. The three agents hang at different heights:
drums high left, sax mid right, guitar low center, with the small drum
machine between them. Tension favors the written pattern at this
moment, so the amber sequence dots are lit along the beam.

## Deviations from the prompt

None. The drum machine is drawn as a small pad box on the sub-bar,
as the prompt places it beside the three figures. Sound is visual
only, as required for a watch-only piece.

## House rules

Visual Viewport sizing with resize listened to on visualViewport and
window; canvas pinned in draw() via canvas.style.width and height in
px; phone detection via window.screen (min dimension under 700 px)
with aspect fallback (h > w * 1.15); full-bleed on phones, square
stage on desktop with the page ground set to the piece's own black.
One synchronous frame at load; requestAnimationFrame guarded by a
typeof check. Flicker is bounded by construction: flashes are slow
3 s envelopes, never strobing. Reduced-motion preference stops the
loop and holds the first frame.
