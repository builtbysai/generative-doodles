# №1805 Send In Sounds (SC6, PP1052)

EXPANSION #236 robin-rimbaud. Gallery date 2006 · 12 · 21.
Gallery note: "Draw once; the field takes your mark and keeps only its echo. Draw to give."

## Driver

One mark given once, transformed until unrecognizable, absorbed into a field that keeps only anonymous traces.

## Build

Source: TASKS.md, robin-rimbaud #236, SC6/PP1052, mechanism 5,
public-participation collage. A dark blue-black installation field, mostly
quiet: sixteen seeded ambient drifters (filled blobs and thin rings) move
on closed-form sine paths with slow pulses, and twelve seeded anonymous
traces, stretched random walks in cool slate, lie across the field as the
settled remains of past contributions. The one-time input zone is a small
rectangle in the lower right corner, marked only by a thin line and the
words "draw once". Pointer down inside the zone starts a mark, drawn live
in a pale tone and clipped to the zone; on release the mark is absorbed
and never drawn again. The operator chain: points re-centred, stretched
2.2x wide around their own centre, folded into three offset layers
(middle fold strongest), cooled to uniform slate, and added to the field
as an anonymous trace with a 240 s decay toward a faint floor. The zone
then fades away over 2 s. One contribution per visit: after it is given,
further pointer input in the zone is ignored. No undo, no replay, no
counter, no names.

Template: live №1804 index.html, fetched fresh and mirrored for sizing,
plates, probe, and the fixed-phase first frame.

## Frame one (fixed phase t = 60 s)

Verified from the shipped script: twelve anonymous traces are already
old (born 2 to 17 minutes before frame one, alphas settled toward the
0.10 floor), sixteen drifters are mid-drift on periods of 48 to 144 s,
and the input zone sits open in the lower right corner with "draw once"
legible. The field reads as a dark quiet field with drifting shapes; the
traces are faint angular streaks, none of them readable as a mark anyone
made.

## Deviations from the prompt

1. Persistence is a count only. The prompt says the field carries traces
   of every past contribution; a returning visit renders up to twelve
   extra anonymous traces seeded from a stored count (key
   send-in-sounds-count), never a stored mark. The count read and write
   are guarded with typeof checks and try/catch, so the QA harness
   without localStorage renders the base twelve traces. Within a single
   visit, the viewer's own contribution joins the field as a trace with
   its own long decay, as specced.
2. The hint plate reads "Draw once; the field keeps only the echo."
   instead of the longer gallery note, so it fits on phones; the full
   gallery note is unchanged.
3. Field content is clipped to the field rect on desktop, so stretched
   traces never spill onto the page ground.

## Acceptance criteria

1. Frame one is deterministic: fixed phase t = 60 s, seeded PRNG
   mulberry32(1805) for traces and mulberry32(91805) for drifters, no
   unseeded randomness or wall clock in frame one.
2. The field is a dark blue-black ground with slow ambient drifters and
   twelve faint anonymous slate traces at frame one.
3. The input zone is small, in the lower right corner, marked only by a
   thin line and "draw once", visible at frame one on desktop and phone.
4. Drawing in the zone shows the live mark in a pale tone clipped to the
   zone; on release the mark is never shown again in its original form.
5. The absorbed mark re-enters the field stretched 2.2x, folded in three
   layers, cooled to uniform slate, with a 240 s decay to a faint floor.
6. The zone fades away over 2 s after the contribution; only one
   contribution per visit is accepted.
7. No counter, no names, no undo, no click-to-reload, no audio.
8. Flicker at or below 14 Hz by construction: the fastest motion is a
   14 s pulse period; all drift periods are 48 s or longer.
9. prefers-reduced-motion renders a static frame; requestAnimationFrame
   is guarded with a typeof check.
10. Title plate "Send In Sounds" and date "2006 · 12 · 21" top left,
    hint plate bottom left, legible at 1280x900, 390x844, and 720x720.

## QA

Rendered from the actual shipped script with node-canvas
(~/workspace/tools/render-piece.js):

- Desktop 1280x900: square field centred on the blue-black ground.
  Faint slate traces and drifting blobs/rings across the field, all
  clipped inside the square. Title and date plates top left, "draw
  once" zone lower right, hint plate bottom left, no overlaps.
- Mobile 390x844: full-bleed portrait field, same scene, plates
  legible, hint plate fits inside the viewport, zone legible lower
  right.
- Thumb 720x720: square field, same composition as desktop, plates
  legible.

One fix round: the first render showed a stretched trace bleeding past
the square field edge onto the page ground on desktop, and the hint
plate overflowed the right edge on phones. Added a field clip to
drawField and shortened the hint text, then re-gated all three sizes.
Final files re-rendered after the edit.
