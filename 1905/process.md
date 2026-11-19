# №1905 Costumes

Spec: TASKS.md prompt block MB2 (PP1152), study #249 michele-bonifati.

Driver: the sound never settles into one ownership, so the eye keeps
waiting for the next tag to change hands. The quartet stands in a loose
arc on a warm grey studio floor, each player wearing a glowing costume
tag above their head like a name card: amber THEME-CARRIER, teal
ACCOMPANIST, violet NOISE-FLOOR. Every 150 seconds the tags rotate one
seat, announced by a soft chime ring above the group, and the swap
crossfades over 8 seconds. Each role is also a sound made visible:
the carrier draws an amber lead line that arcs toward the middle of
the room, the accompanist sits inside three soft teal pad bars, and
the noise-floor dissolves into a drifting cloud of violet granules.
Posture follows the role: the carrier leans in, the accompanist stands
upright with a slow sway, the noise-floor leans back and thins out.
Watch only. No role picker, no conductor mode, no pause button, no
countdown. Visual only, no WebAudio.

Determinism: FIRST_T = 20. Frame one is twelve seconds after the first
rotation's 8-second crossfade has finished, so the roles are settled
and each player wears exactly one tag: drums THEME-CARRIER, guitar
ACCOMPANIST, sax NOISE-FLOOR, trombone ACCOMPANIST. No chime ring is
visible at frame one, since no swap is in progress. The whole state is
a pure function of t, so frame one is byte-reproducible. The rotation
mechanism is unchanged: every 150 seconds the tags rotate one seat
with an 8-second crossfade, and the swap still happens on schedule.

Fix round: the first build showed the wrong quartet (bass and keys
instead of sax and trombone) and FIRST_T = 4 landed mid-crossfade, so
frame one showed two tags per player. Both fixed: the bass player is
now a sax player with a curved body, bell flare, and key dots, the
keys player is now a trombone player with a long slide and bell flare,
labels read drums, guitar, sax, trombone left to right, and FIRST_T
moved to 20 so frame one shows exactly one tag per player. The
bass/keys deviation is removed; the quartet is now the prompt's quartet
from MB1: guitar, sax, trombone, drums.

Deviations from the prompt: none in intent. Two choices the prompt
left open: the rotation period is 150 seconds, inside "every few
minutes", and since the quartet has four players but only three named
roles, the ACCOMPANIST tag is worn by two players at once and rotates
with the rest. The chime is a visual ring only, since the shipped
piece is visual-only.

House rules: Visual Viewport sizing with resize listened to on
visualViewport and window; canvas pinned in draw() via
canvas.style.width/height in px; phone detection via window.screen
(min dimension under 700px) with aspect fallback (h > w*1.15);
field-like composition, full-bleed on phones and square on desktop;
one synchronous frame at load; requestAnimationFrame guarded with a
typeof check. No em dashes in visible copy. Gallery date 2007 · 03 · 31.
Pieces.json note ends "Watch the roles rotate."

QA: rendered the actual script with node render-piece.js at 1280x900
desktop, 390x844 mobile, and 720x720 thumb. All three inspected after
the fix round: exactly four tags, one per player, all legible; sax and
trombone recognizable; no clipping, no overlap with the title plate,
composition holds on both sizes. thumb.png is the 720x720 render of
the new first frame.
