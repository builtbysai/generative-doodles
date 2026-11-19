# Two Journeys at Once (No.1894)

## Source

TASKS.md prompt block BA7, PP1141, study #247 beatrice-arrigoni.
Gallery date 2007 · 03 · 20 (formula date 2002-01-10 + 1895 days).
The study file studies/beatrice-arrigoni.md does not exist in the
muse-soul repo, so hexes were hand-picked from the prompt's named
colors, as with the #246 builds.

## Driver

Two clocks, one theme; the mountain path and the history trace take
turns holding the frame, and a shared word is the cut between them.

## Mechanism

Two independent timeline engines share one split screen. The
mountain engine is a path walker: a seeded seven-switchback route
in indigo crosses faint contour arcs, with a ghost of the whole
route behind it and a filled ink dot with a thin ring marking the
walker's position. One full traverse takes about 45 seconds. The
history engine is an event scatter: fourteen events, one per cell
of a jittered 4 by 4 grid, each a chalk-red dot with a year above
(1943, 1944, or 1945) and a generic place word below (valley,
ridge, pass, village), joined in order by a faint red trace drawn
progressively. Each event appears and fades on its own slow pulse.
The two engines keep their own clocks: the mountain clock runs at
real time, the history clock runs at 0.85 speed with a 3 second
offset.

The intercut runs on a 48 second cycle. The mountain timeline
holds the frame for 14 seconds, dissolves over 8 seconds, the
history timeline holds for 16 seconds, then returns over 8 seconds.
The dominant timeline takes two thirds of the frame and the other
a third, with the seam sliding between the two widths and a soft
black gradient band marking it. The split is vertical on desktop
and horizontal on phones. A cue-word bus cycles the shared words
pass, ridge, night, road every 12 seconds, each word fading in and
out on the seam. Each dissolve is centered on a cue-word peak
(t = 18 and t = 42), so the shared word is the cut between the
timelines.

## Frame one phase

Fixed phase t = 9 seconds, seed 1894. The mountain timeline is
dominant at two thirds, the walker about a fifth of the way along
the second switchback, and the cue word "pass" is fading out at
about 0.7 alpha on the seam. No wall clock or random seed at frame
one; all randomness is seeded from 1894.

## Interaction

WATCH ONLY. No scrubber, no timeline control, no tap action.
Editing the intercut would make it a video player. Hint plate
reads "Watch two timelines share one theme." Sound: WebAudio is
omitted; a watch-only piece cannot autoplay audio.

## Palette

Only the four named hexes are used, plus low-alpha versions of
them. Ground #D8D2C4, mountain ink indigo #2E3A67, history trace
chalk red #B03A2E, shared cue words and plates black #141414.
Nothing else.

## Technical

2D canvas, self-contained, no external assets. Visual Viewport
sizing with resize listened to on visualViewport and window; canvas
element pinned in draw() via canvas.style.width and height in px;
phone detection via window.screen (min dimension under 700px) with
aspect fallback (h > w*1.15); field-like composition full-bleed on
phones, centered square on desktop, page ground set to the piece's
own paper-warm grey. One synchronous frame is drawn at load and
requestAnimationFrame calls are guarded with a typeof check so
node-canvas QA works. Flicker stays at or below 14 Hz by
construction: the fastest oscillation is the 0.35 rad/s event
pulse, well under the limit. prefers-reduced-motion freezes at
frame one.

A QA hook only: ?t=SECONDS or ?seed=N in the URL jumps the clock
to a later phase for rendering checks. No link in the piece uses it.

## Deviations from the prompt

None. The history trace uses only the years 1943, 1944, 1945 and
the generic place words valley, ridge, pass, village; no proper
names of real people or real places appear. No documentary
captions, no timeline scrubber, no map pins, no voiceover.

## QA

Rendered from the actual script with node-canvas and inspected
visually: desktop 1280x900, mobile 390x844, thumb 720x720, all at
frame one, plus t = 18, t = 24 and t = 36 to check the intercut.
First pass found the history events piled up and overlapping: the
original free random scatter stacked several year and place labels
on top of each other in all three renders. Fixed by placing one
event per cell of a jittered 4 by 4 grid with wider panel margins,
then re-rendered all three sizes. Second pass found the cue word
missing at the crossfade midpoint, because the 12 second cue pulse
peaked between the dissolves. Fixed by centering each dissolve on
a cue-word peak (t = 18 and t = 42) and re-rendered. Final gate:
frame one clean on desktop, mobile and thumb, mountain dominant
with the walker visible and the cue word "pass" mid-fade; t = 18
shows the seam at half width with "ridge" at full strength; t = 36
shows the history timeline dominant at two thirds with the
mountain dimmed in its third. No clipping, no overlapped labels,
text readable on mobile. No em dashes in visible copy.
