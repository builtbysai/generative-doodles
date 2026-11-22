# №1964 Fingerprint Edition

CW5 / PP1211, study #256 caius-williams, opening the caius-williams block.
Gallery date: 2007 · 05 · 29. Gallery note: "Fingerprint dots multiply
and smear with every pull of the print, the edition degrading as it
grows. Tap to pull a print."

## What it is

A white ground with vertical side text like the Zheng Hao tape cover.
The centre field is irregular fingerprint dots of varying opacity,
laid along broken whorl rings, slowly multiplying. Each new printing
adds dots but also smears the old ones: the edition degrades as it
grows, photocopy style. Tap pulls a print: a new stamp cluster lands
while old dots fade and smear, and the edition number climbs. The
sheet keeps its history. No clean prints, no vector perfect dots;
each dot carries a small offset second blob so none is perfectly round.

## Palette

- Paper white #f7f5f0 (ground, page ground)
- Ink black #1a1a1a (dots, title, hint)
- Ink gray #6b6b6b (sub plate, side text second line)
- Pencil gray #9a9a92 (smear edges, gray dots, ridges)
- Smear gray #b8b5ac (smear tails)
- Faint ridge gray #d8d5cc (alternate ridges)

## Interaction

Tap (pointerdown on the canvas) is the printing pull, not a reseed.
Each tap increments the pull count, records the pull time, adds one
stamp cluster of whorl ring dots, and redraws at the current time.
The edition counter reads EDITION n / 25 and climbs from 3; it stops
at 25. Between pulls the field still multiplies slowly: 220 ambient
dots are born on a seeded schedule across the first 48 seconds, and
old dots decay toward a 0.45 opacity floor while their smear tails
grow and their positions drift. Motion is all on multi second
timescales, well under the 14 Hz ceiling. prefers-reduced-motion
renders a still frame. No audio.

## Determinism

FIRST_T = 9 s. At t = 9 the sheet already carries three pulled prints
(edition 3), born at 0, 3 and 6 s, so frame one shows a lived-in
field: three stamp clusters overlaid, the earliest already smearing,
plus the ambient dots born before 9 s. The edition counter at frame
one is the fixed number 3, never random. Every dot is a pure function
of its seeded print index and the clock, except live pull times,
which are recorded state. QA hooks: window.__draw(t),
window.__piece1964 with edition(), pulls(), pull(), redraw(t),
firstT. Query params: ?t= sets the virtual clock, ?seed= is an alias
for it, ?pulls=n sets extra prints pulled at load (index births are
capped at the load clock so a seeded print is always on the sheet).

## Probes

Seeded probe harness /tmp/probe-1964.js (loads the actual script in
the render-piece node-canvas shim):

- Frame one (t=9, pulls=0): edition 3, dark pixel count 195443,
  md5 84be8f7fc5b95ee656d59520a4ac760b, identical to thumb.png.
- Tap probe at t=9: edition 3 to 4 to 5 across two pulls, buffer
  md5 changes at each pull (edition plate updates immediately).
- Seeded ?pulls=2 at t=9: edition 5, md5 identical to the live
  two-pull buffer, proving the probe path and the live path agree.
- Advanced clock probe: two pulls at t=9, drawn at t=12 (new
  clusters fade in over 1.5 s): 198506 dark pixels vs 195399 for
  the no-pull frame at t=12, proving the stamp clusters land.
- Frame changes over time: no-pull md5 at t=12 differs from t=9,
  ambient multiplication confirmed.

## QA renders

node ~/workspace/tools/render-piece.js at 1280x900 desktop,
390x844 mobile, 720x720 thumb. All three inspected visually.
Thumb md5 84be8f7fc5b95ee656d59520a4ac760b, re-rendered twice with
identical md5, deterministic frame one confirmed.

## Fix rounds

1. First build rendered clean on desktop and thumb, but the dot
   field sat small in the middle of the tall mobile sheet
   (radius from the short side). Fix: on phones the field radius
   is sized from the width (0.38W) instead of min(W,H).
2. Re-render showed a few dots spilling past the right edge of the
   plate frame on mobile. Fix: on phones the field centre moves
   to 0.52W and radius to 0.36W, keeping the whorl inside the
   frame. Re-rendered and re-gated after each fix; thumb md5
   unchanged by both (desktop path untouched).

## Deviations from the prompt

None material. The prompt prescribes the side text, dot field,
edition number, tap pull and degradation; all are present. The
edition is capped at 25 (EDITION n / 25) as a small-print run
convention; the prompt does not name a limit. A faint hairline
plate frame marks the sheet edge; it is presentation, not art.

## Known warts

- At the exact instant of a tap the new cluster is at fade-in 0,
  so the stamp visibly arrives over the next 1.5 s rather than
  landing instantly. This reads as ink soaking in and is kept.
- On desktop the whorl rings are faint at thumbnail scale; the
  dots carry the fingerprint read instead.
- A few ambient dots sit just outside the outermost ridge circle;
  this is intentional scatter, not a bug.
