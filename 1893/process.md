# The Chamber Swap (No.1893)

## Source

TASKS.md prompt block BA6, PP1140, study #247 beatrice-arrigoni.
Gallery date 2007 · 03 · 19 (formula date 2002-01-10 + 1894 days).
The study file studies/beatrice-arrigoni.md does not exist in the
muse-soul repo, so thread hexes were hand-picked from the prompt's
named colors, as with the #246 builds.

## Driver

Four threads share one chamber; leadership is a rotating foreground,
and the braid is the audible handoff made visible.

## Mechanism

Four thread agents run horizontally across the frame on slow
drifting lanes, each drawn in three passes (wide faint glow, mid
glow, full core) so the leader reads as a lit filament and the
followers as texture. A leader-rotation scheduler, seeded from 1893,
assigns the foreground voice to one thread at a time on irregular
tenures of 7 to 14 seconds. The leader draws at full brightness with
a bright bead at its right end; the other three draw at quarter
opacity with a slow shimmer. The last 2.5 seconds of each tenure is
a braid: the outgoing and incoming threads converge on their shared
center line at one of three marked exchange points (x 0.30, 0.55,
0.80, cycling per handoff) and wind around each other with an
amplitude of half their lane separation, crossing three times across
the window, while their brightness cross-fades. Outside the braid
window each thread returns to its own lane. Follower threads keep
their own slow drift and shimmer as texture behavior. Three slate
ticks with center diamonds mark the exchange points; the active
one brightens during a braid.

## Frame one phase

Fixed phase t = 18.5 seconds, mid-braid: copper is handing the lead
to ivory at the middle exchange point (x 0.55), both at about half
brightness and wound together, with brass and slate dim in their
lanes. No wall clock or random seed at frame one; all randomness is
seeded from 1893.

## Interaction

WATCH ONLY. No buttons, no solo or mute controls, no leader
selection. Choosing the leader would turn the piece into a solo
button. Taps do nothing. Hint plate reads "Watch the leader
change." Sound is omitted: WebAudio is not used, since a
watch-only piece cannot autoplay audio.

## Palette

Warm black ground #14100C. Threads: brass #C9A227, copper #B87333,
ivory #F2EAD8, slate #6B7A8A. Nothing else.

## Technical

2D canvas, self-contained, no external assets. Visual Viewport
sizing with resize listened to on visualViewport and window; canvas
element pinned in draw() via canvas.style.width and height in px;
phone detection via window.screen (min dimension under 700px) with
aspect fallback (h > w*1.15); field-like composition full-bleed on
phones, centered square on desktop, page ground set to the piece's
own warm black. One synchronous frame is drawn at load and
requestAnimationFrame calls are guarded with a typeof check so
node-canvas QA works. Flicker stays at or below 14 Hz by
construction: the fastest oscillation is the follower shimmer at
0.45 rad/s, well under the limit. prefers-reduced-motion freezes at
frame one.

A QA hook only: ?seed=N in the URL is read as a time in seconds.
No link in the piece uses it.

## Deviations from the prompt

None. The prompt's three to five voice-lines are realized as four
threads, one per named color.

## QA

Rendered from the actual script with node-canvas and inspected
visually: desktop 1280x900, mobile 390x844, thumb 720x720, all at
frame one. First pass showed the braid as a single sharp dip for
far-apart lane pairs, with kinked shoulders. Fixed by winding the
pair around their shared center line with amplitude set to half
their lane separation and a smoothstep braid envelope, so the pair
crosses three times with smooth shoulders. Re-gated after the fix:
frame one shows a clean three-crossing braid at the middle exchange
point with copper and ivory mid-crossfade; t = 30 shows copper
leading alone with a bright bead; t = 47 shows the far-apart brass
and slate pair braiding coherently. Mobile is full-bleed with no
clipping and the braid stays legible. No em dashes in visible copy.
