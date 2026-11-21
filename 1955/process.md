# №1955 Plug In, Plug Out

Prompt block: TC4 / PP1202, study #255 tom-challenger.

Driver, in one sentence: a brass socket rack holds four voices patched into six seats while four cream notation cards loop above it, and dragging a voice cable to another socket re-voices the motif in a new timbre while dragging a voice out silences its seat without ever stopping the loop, so the piece feels like a band that keeps playing through every change of players.

## Palette

Named colors from the prompt, hand-picked hexes: brass #c9a85a with dark brass #8a6d2f and bright brass #e8cf8f; patch-bay black #17161a to #0c0b0e with rack panel #201f24 and panel line #35343a; card cream #f2ead6 with card ink #2a2620; cable red #d92b1f (tenor), yellow #e8b90a (trumpet), green #1f9e4d (bass), and brass for drums; plate ink cream #f2ead6 with muted ink #9a938a; hint pill card cream with dark ink #221f1a.

## Mechanism

- Rack: a dark panel with a brass frame and four corner screws, spanning x 0.05 to 0.95 and y 0.40 to 0.62, holding six brass sockets in a row at y 0.50. Each socket is a brass ring around a dark hole with a small LED above it (lit in the plugged voice's color, dim grey when empty) and a seat number 1 to 6 below it.
- Motif cards: four cream cards above the rack (I, II, III, IV), each with three staff lines and six note heads, one per socket seat, colored by the voice plugged into that seat and hollow when the seat is a rest. The note positions are seeded per card and never move; only their colors follow the patch, so the pattern persists while the players change. The active card wears a brass border and a small play triangle below it.
- Loop: the motif loop is 8 s, one card per 2 s, with a thin brass progress bar under the cards filling across the loop. The active card's notes pulse gently.
- Voices: four modules below the rack (TENOR, TRUMPET, BASS, DRUMS), each with a colored dot, a name, and a seat tag. Cables arc from each module up to its socket plug, bowing sideways like hanging patch cords. An unplugged voice reads dim with a hollow dot and a "silent" tag, and its cable droops from the module to a dangling plug just below the rack.
- Patching: drag a voice from its socket plug or its module. Dropping on a socket plugs it there; dropping on an occupied socket swaps the two voices; dropping anywhere else unplugs it and silences its seat. The loop never stops: an empty seat is a rest, never a stop. The top-right plate counts plugged voices.
- Audio: visual only, no WebAudio. The voices are a closed-form visual sound model, per the Franke audio rule. No click-to-reload; drag never reloads.

## Determinism

- FIRST_T = 8. The 8 s loop is at its start, so card I is active and the loop bar is empty, and the opening patch is tenor in socket 1, trumpet in socket 2, bass in socket 4, drums in socket 5, with sockets 3 and 6 empty. All four voices plugged, two seats resting, so the piece reads at once and the empty seats show the patch is changeable.
- Seeded PRNG mulberry32(1955), fresh instances per draw from the piece number and a fixed salt; every frame is a pure function of t plus the patch state, which only changes through interaction, so frame one is fully reproducible.
- Motion is slow: one card change every 2 s and a gentle note pulse at about 0.35 Hz, all well under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.
- QA hooks: location.search reads ?t=<seconds> to set the virtual clock at load, ?plug=<voice>:<socket> to plug a voice into a socket (1 to 6) at load, ?unplug=<voice> to unplug a voice at load, and ?seed= to vary the texture seed. window.__draw drives draw() with a virtual clock, and window.__piece1955 exposes plug(name, socketIdx), unplug(name), place(name, x, y), socketOf(name), pluggedCount(), activeCard(t), redraw(t), and firstT.

## Acceptance criteria, as numbers

- Frame one: t = 8, active card I (index 0), loop bar empty, pluggedCount 4, tenor socket 0, trumpet socket 1, bass socket 3, drums socket 4. Second 720x720 render byte-identical to thumb.png, md5 fcb79a82d1bccdaeb904dfd5cabf6de5.
- Time probe: ?t=10 at 720x720, md5 7404c909a0836efa7e869f0ac96c5c4d, different from frame one; render shows card II active with the brass border and the loop bar one quarter filled.
- Plug probe: ?plug=bass:3 at 720x720, md5 63629039d069bf8d20cb7f9e98113cba, different from frame one; bass moves from seat 4 to seat 3, socket 4 goes empty, card notes recolor.
- Unplug probe: ?unplug=drums at 720x720, md5 9e2067d91c6ef1fb5f4c6ce343e0f436, different from frame one; render shows socket 5 empty, seat 5 notes hollow on all cards, DRUMS module dimmed with a "silent" tag, the plate reading "3 of 4 voices plugged", and the brass cable drooping to a dangling plug below the rack. The loop and the other three voices are unchanged.
- Swap probe: ?plug=tenor:2 at 720x720, md5 c90a1306ca5b1bd8eb6e62b5df4787fd, different from frame one; tenor moves to seat 2 and trumpet to seat 1, the red and yellow cables cross, and the card notes at seats 1 and 2 swap colors.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. Plates legible, no collisions, hint readable on its pill on all sizes, rack full-bleed on the phone and square on desktop, all four cards legible with colored notes and hollow rests at seats 3 and 6, all six sockets visible with LEDs, cables arcing cleanly from modules to plugs.
- Unplug probe render inspected: socket 5 empty, DRUMS silent, loose cable dangling, loop still running.
- Swap probe render inspected: cables cross, card notes recolored, seat tags updated.
- Time probe render inspected: card II active, loop bar one quarter filled.
- No em dashes in visible copy or in this file.

## Fix rounds

1. First mobile render showed "TRUMPET" overflowing its module, clipped at the right edge. The module layout now puts the colored dot at the top-left corner and centers the name and seat tag, with the name font scaled to the module width (9 px on the phone, 13 px on desktop), so the longest name fits at every size. Re-rendered all three sizes and re-gated.
2. First probe run used a probe script that read the query string from the wrong argv slot, so every probe render came back byte-identical to frame one. The script was corrected to read the query argument, and all four probes re-ran with distinct md5s and visually confirmed state changes.

## Deviations from the prompt

- The prompt names four voices and six implied seats only through the rack; the opening patch (tenor 1, trumpet 2, bass 4, drums 5, seats 3 and 6 empty), the four motif cards (I to IV), the 8 s loop with one card per 2 s, the seeded note positions, the seat numbers, the LED dots, and the swap-on-occupied-socket behavior are invented staging for the named mechanism, so frame one already reads as a band playing.
- The prompt calls for cable colors red, yellow, and green for four voices. Drums takes the brass cable color, which is in the palette and keeps the four cables distinct.
- The prompt calls for real timbres when a voice plugs in. The piece realizes all four voices as a closed-form visual sound model with no WebAudio, per the Franke audio rule; the visible behavior matches the prompt (note colors follow the patch, rests mark silent seats) without sound.
- The prompt forbids a fixed-lineup UI. There is none: no lineup list or fixed assignment is shown, only the rack, the cards, and the modules, and every voice can move to any seat or out.

## Known warts

- The drums plug and socket are both brass, so the plug in socket 5 is lower contrast than the red, yellow, and green plugs; the brass cable and the lit LED carry the identification.
- On the phone the cards are tall and narrow and the note heads are small, though still legible; the rack and sockets carry the thumb.
- The loose cable of an unplugged voice ends just below the rack edge, so at thumb size the dangling plug can read as a small brass dot rather than a plug until the module below is noticed.
- The loop bar sits empty at frame one because FIRST_T = 8 is the loop start; it only shows progress once the loop runs.
