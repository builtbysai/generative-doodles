# №1820 The Giant Tesla Coil

## Prompt (TASKS.md, AD5, PP1067, study #238 arnold-dreyblatt)

Title: The Giant Tesla Coil. Visual description: A huge white cylindrical machine fills the frame, its inner surface lined with magnetic field lines. Rotating radio frequencies gradually realign the field; the machine's signals split into three visible streams flowing outward: one ordered by pitch, one by rhythm, one by density. The streams sort themselves into columns like a ledger. Palette: clinical white, scanner-room cyan, signal streams in amber, red, and green. Composition: the machine as a looming tube in the center; the three streams exit left to right. Motion-interaction: watch-only. Field lines breathe and re-align; streams pulse at different rates. No input. Technical approach: particle system for field lines with a rotating frequency parameter; sorting bins visualized as three columns that fill and drain. What to avoid: no body scans, no patient imagery, no hospital narrative; the machine is the subject, not what it scans.

## Driver

A turning field that sorts itself into three ledger columns (pitch, rhythm, density).

## Build

- Single self-contained index.html. One master clock, phaseT in seconds, drives the field rotation, the stream pulses, and the column fill levels, so nothing can drift apart.
- Machine: a looming white cylinder, center-left, 0.40 S wide and 0.66 S tall, with a shaded body, top and bottom rim ellipses, casing bands, rivets, and a plinth shadow. The bore is a dark cyan ellipse in the upper half with a glowing core.
- Field lines: 12 rotating spokes inside the bore plus 3 concentric rings that breathe. Spoke angle is 0.12 rad per second of phaseT (the rotating frequency parameter); ring radius breathes at 0.25 Hz. No body scans, no patient imagery, no hospital narrative; the machine is the subject.
- Streams: exactly three, each 26 particles on a quadratic path from the machine edge to the top of its ledger column, flowing left to right. Amber PITCH pulses at 0.8 Hz and flows at 0.16 per second; red RHYTHM pulses at 0.5 Hz and flows at 0.11 per second; green DENSITY pulses at 1.25 Hz and flows at 0.22 per second. Each stream has its own pulse rate, asserted in the STREAMS table. Particle positions are a pure function of phaseT and fixed seeded offsets (mulberry32(1820)), never accumulated randomness.
- Columns: exactly three ledger columns at the right, one per stream, with tick lines, a fill level, a level line, and sorted blocks inside the fill. Fill levels fill and drain on their own periods: amber 9 s, red 13 s, green 7 s, with fixed phase offsets. At frame one (t = 60 s) the levels read amber low, red mid, green high.
- Palette: clinical white ground #EFF3F3, machine white #F7FAFA with cyan shade #D7E8EA and line #7FB3BC, bore #0E3A40 with bright cyan field lines #59C2D1, scanner cyan #2FA8BC, amber #E8A33D, red #D64541, green #3FA66A, ink #16323A.
- Watch-only, no input handlers. Flicker is nil by construction: the fastest periodic motion is the 1.25 Hz green pulse. prefers-reduced-motion renders the still frame one.
- Frame one is fixed phase t = 60 s: spokes rotated 7.2 rad, rings mid-breath, streams partway along their paths, columns at amber low, red mid, green high. Deterministic, seeded PRNG only.
- Plates: title plate "The Giant Tesla Coil" with date "2007 · 01 · 05" top left, hint plate "Watch only." bottom left. Page ground is the piece's own clinical white; centered geometry kept, full-bleed field treatment not applicable.
- House rules: Visual Viewport sizing with resize listeners on visualViewport and window; canvas pinned in draw() via canvas.style.width/height in px; phone detection via window.screen (min dimension under 700 px) with aspect fallback; one synchronous frame at load; requestAnimationFrame guarded by a typeof check.

## Deviations from the prompt

None material. Two clarifications: the prompt says the streams "exit left to right" and the columns are "like a ledger" without fixing their layout; this build places the machine center-left, the streams flowing left to right into the tops of three vertical ledger columns at the right, each column carrying its stream's name vertically in dark ink so it reads over both the white ground and the colored fill at any fill level. The prompt's "particle system for field lines" is implemented as 12 rotating spokes plus 3 breathing rings inside the bore, with the stream particles as a second particle system.

## QA

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually.
- Round 1: the three column headers drawn horizontally above the narrow columns collided into one run ("PITCH RHYTHM DENSITY"), and the stream labels at the machine edge sat under passing particles. Fixed by moving the column names to vertical dark-ink labels inside the columns (drawn last, after the fill) and giving each stream label a ground-colored backing rect.
- Round 2: re-rendered all three sizes and inspected again. Desktop, mobile, and thumb all read: white looming tube with a dark bore and cyan field lines, three distinct streams (amber, red, green) flowing left to right, three ledger columns with vertical labels and different fill levels, plates legible, nothing clipped, no overlap.
- Determinism gate: thumb.png rendered twice independently, md5 identical (9c5385fd4b519799dd13f1f0ca85fc9f).
- No em dashes in visible copy. No AI-signature copy.

## Gallery

- Title: The Giant Tesla Coil
- Date: 2007 · 01 · 05
- Note: "Three streams sort themselves from the turning field. Watch only."
