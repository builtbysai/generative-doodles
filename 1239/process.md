# №1239 — Nothing To See Here

Christina Battle study block CB8 (PP398), after Nothing To See Here
(2013–2016), Battle + Adán De La Garza's Denver screening series — a home
for sound, performance, media installation, film and video that paid its
artists and filled a void. The piece is the room the series happened in:
you sit in the dark, a projector runs curated programs on the back wall,
and the wall text speaks in their curatorial voice.

## The room

A procedural exhibition room in near-black (#0B0B0D): back-wall and side
planes, a floor with a flat light-spill from the screen, a beam cone from
a small projector housing above and behind the viewer (flat alpha
polygon, seeded dust motes drifting in it, alpha stepping on a slow hash
clock), and two audience head silhouettes along the bottom edge — the
room has people in it, quietly. The projection surface is a keystone
polygon (top edge 2% narrower than the bottom). On portrait phones the
screen stacks above the placard card; nothing is hidden.

## The program

A 154-second cycle. Each program is preceded by a 3-second academy
leader — white ring and crosshair, a rotating sweep, the count 3·2·1 in
countdown red (#C23B2E), gate-weave jitter on a 12 fps step clock — and
announced on the chalk placard beside the screen (during leader it reads
NEXT PROGRAM). Programs are given their full time; nothing cuts away.

1. **Found Photographs** (36 s) — a silent film of found 35mm-style
   snapshots: nine sepia stills (beach, birthday table, a dog, a mountain
   road, a kitchen, in hashed variants), each held 4 s and changed with a
   clunk cut — a one-step white flash on the 12 fps grid. Flat sepia
   shapes, print border, corner vignettes, a small date stamp per still.
2. **Sound First** (36 s) — green (#5FA88A) waveforms on black blooming
   into geometry in 6-second phrases: a single line, a stack of five, a
   waveform closing into a ring, a grid of pulses, mirrored lines
   forming a leaf, ring and line together. All stepped at 12 fps.
3. **Video Syndrome** (40 s) — a lo-fi band (singer at a mic stand,
   guitarist, drummer) as near-black silhouettes with one colour rim
   each, on a blocky three-panel VHS stage with scanlines and light
   cones. A "PLAY" marker sits in the corner for the first 3 s. Every
   7 s the image melts for 1.2 s: horizontal slice bands redraw the
   figures displaced downward in pink/green ghosts while a tracking bar
   with speckle noise sweeps the frame — computed shape-level datamosh,
   no pixel buffer.
4. **Protest Etiquette** (30 s) — a one-minute etiquette flash
   compressed: six 5-second placard frames, chalk pictograms with a
   caption each — ear / "listen first", slashed eye / "no photographs",
   hands together / "hold space", microphone / "pass the mic", open
   palms / "hold space", ear / "listen first" — separated by one-step
   black blinks.

**Wall text** (one line per program, on the placard): Found Photographs —
"found, not taken"; Sound First — "sound first"; Video Syndrome —
"underrepresented mediums welcome"; Protest Etiquette — "pay what you
can".

## Interaction

The visitor is the projectionist's assistant, never a channel-surfer.
Swipe left for the next reel, right for the previous (or to restart the
current one if it has barely begun): the skip lands on the target
program's leader, so every program still enters through its countdown.
Double-tap reseeds the program order (a seeded Fisher–Yates permutation;
salt 0 is the canonical order above). All state is event-based — a jump
offset on the piece clock plus the reseed salt — so the first frame is a
pure function of the schedule.

## Determinism and house notes

T0 = 11 s: cycle position inside program 1 at local 8 s, exactly on a
snapshot change, so frame one shows still №3 — the dog by the fence —
with the beam lit, the placard reading "PROGRAM / Found Photographs /
found, not taken", and the audience in place. The first frame is drawn
synchronously at T0; the rAF loop is typeof-guarded and anchored at
T0 + elapsed. Seeded integer hashes only.

House adaptation, stated plainly: the prompt allows optional subtle
audio; the piece ships silent. The "sound first" program is about
waveforms as image, and no audio API exists anywhere in the file.
Everything else follows the house rules — canvas sized from the Visual
Viewport API with resize listeners, CSS size pinned in draw(), phone
detection from window.screen with an aspect fallback, flat fills only,
no pixel buffers, no element creation.
