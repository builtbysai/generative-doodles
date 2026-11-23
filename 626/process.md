# №1967 Green Room, 4-Track

CW8 / PP1214, study #256 caius-williams, completing EXPANSION #256.
Gallery date: 2007 · 06 · 01. Gallery note: "A quiet rehearsal
room where short bass fragments loop on the 4-track and are punched
over, the work continuing without a player. Watch the reels turn."

## What it is

A quiet rehearsal room against a quilted padded soundproof wall.
A double bass leans left against the wall, a covered piano stands
draped at the back right, a small table centre-right holds a cream
4-track cassette recorder, cables snake on the floor, a backpack
sits by the wall, and a red rug anchors the foreground. The
recorder's reels turn; three short solo bass fragments loop on
tracks 1 to 3 and are occasionally punched over with a new take.
Track 4 is spare and stays dark. The room is empty; the work
continues without a player. No people, no performance.

## Palette

- Padded-wall gray #8f9296 (ground, page ground), quilt lines
  #7e8185, highlight #9aa0a3
- Floor warm gray brown #6f6a63
- Rug red #a33327, border deep red #7e2418
- Cassette cream #efe6d0, shadow #d9cdb2
- VU LEDs warm orange #ff8c2e, hot segment #ffb347
- Double bass dark brown #4a3423, highlight #6b4a2f
- Table wood #5a4632, piano cover sage gray #7c8272, backpack
  dark olive #4c4a38, ink #1f1d1a, record lamp red #c22e1f

## Interaction

Watch-only. There is nothing to tap. The fragments loop and punch
over on their own closed-form schedule: reels turn, VU meters
breathe with the bass lines, the REC and PUNCH lamps light during
a punch window, the tape counter counts, and each track's take
counter climbs when its fragment is punched over. Motion is all on
multi second timescales, well under the 14 Hz ceiling.
prefers-reduced-motion renders a still frame. No audio: the
fragments are visual track states only, per the Franke audio rule.

## Determinism

FIRST_T = 14 s. At t = 14 the room is mid-session: track 3 was
punched over at t = 12, so its new take is 2 s in, its PUNCH lamp
still lit, its take counter already reading 2, and its VU meter
running the fresh take. Tracks 1 and 2 are mid-loop on older
takes (take 2 and take 1). The reels have turned 14 s from the
start. Every element is a pure function of the clock: seeded
note positions, the fixed punch schedule, and the take-up reel
angle, which gains a fixed extra turn during each punch window.
QA hooks: window.__draw(t), window.__piece1967 with vu(tr, t),
take(tr, t), punch(t), redraw(t), firstT. Query params: ?t= sets
the virtual clock, ?seed= is an alias for it.

## Fragment loop schedule and punch-in times

Loop lengths: track 1, 7 s (5 notes); track 2, 9 s (6 notes);
track 3, 11 s (7 notes). Each fragment is a fixed set of seeded
note positions inside its loop; the VU level is the sum of
gaussian note envelopes at the loop phase, measured from the last
punch on that track, so a punch restarts the fragment from its
beginning and the new take is visible in the meter pattern.
Punch-in schedule: punches at t = 4 (track 1), 12 (track 3),
21 (track 2), 30 (track 1), 38 (track 3), 47 (track 2), then
alternating 8 / 9 s steps cycling tracks 1, 3, 2 out to t = 600.
Each punch lasts 3 s. Take numbers start at 1 and climb per
track at each of its punches.

## Probes

Seeded probe harness /tmp/probe-1967.js (loads the actual script
in the render-piece node-canvas shim):

- Frame one (t=14): punch active on track 3, takes 2/1/2, VU
  levels 0.83, 0.62, 1.00, 0.00; md5 f8f399baaf37970b0c695eaf9749c62d,
  identical to thumb.png, re-rendered twice with identical md5.
- Punch-in confirmed: at t=11 no punch, takes 2/1/1; at t=12
  punch on track 3, takes 2/1/2; at t=15 the window has closed
  (punch 0) while the take counter stays at 2. Later punches
  land on track 2 at t=21 and track 1 at t=30, each climbing
  that track's take counter.
- Frames differ over time: md5 at t=11, 13, 14, 16, 20 are all
  distinct, reels and VU meters moving; track 4 VU reads 0.00
  at every probed time.

## QA renders

node ~/workspace/tools/render-piece.js at 1280x900 desktop,
390x844 mobile, 720x720 thumb. All three inspected visually.
Thumb md5 f8f399baaf37970b0c695eaf9749c62d, re-rendered after the
final fix with identical md5, deterministic frame one confirmed.

## Fix rounds

1. First build rendered clean on desktop and thumb, but on the
   tall mobile sheet the bass shrank to two small balls with a
   thin white-looking neck, and the recorder's track labels ran
   together while PUNCH overflowed the recorder's right edge.
   Fix: on phones the bass is sized from the width (0.30W wide,
   0.95W tall) and the table and recorder run wider; track
   labels use the compact "T1·2" form (track 1, take 2) sized
   to the recorder width; REC and PUNCH lamps sit at the right
   with their labels right-aligned to their left, so nothing
   overflows. Re-rendered and re-gated after the fix; desktop
   and thumb confirmed clean.

## Deviations from the prompt

None material. The prompt prescribes the bass, covered piano,
table with 4-track, cables, backpack, red rug, looping fragments
with punch-overs, watch-only, and no people; all are present.
The piano is partly behind the recorder at the back right, so
only its draped shape and cloth folds show. Track labels use
the compact "T1·2" form instead of "T1 TK2" so they fit the
recorder at every size. A small framed print is not present;
the quilted wall carries the wall interest instead.

## Known warts

- The bass body is two overlapping ellipses, so the waist reads
  as a pinch rather than a carved curve; the f-holes are simple
  curved strokes and sit a little high on the lower bout.
- The VU meters clamp at full scale (1.00) when a loud note
  lands during a punch boost; the top segment saturates rather
  than peaking smoothly.
- On phones the covered piano is cropped hard at the right edge
  behind the widened recorder; its lid seam is the main read.
- The endpin is a single straight stroke and meets the floor at
  a slight angle from the lean, not perfectly vertical.
