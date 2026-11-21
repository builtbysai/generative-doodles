# №1949 Three Hours Cut to Forty-Two

Prompt block: LR6 / PP1196, study #254 lucy-railton.

Driver, in one sentence: a long tape strip scrolls slowly across a dark brown field with a thin white playhead at its centre, kept passages glowing warm gold while the cut sections sit cold grey and dark, the wandering bowed tone trace above and below the strip blooming gold while the current passage is kept, and a tap forces the invisible editor to judge the moment under the playhead, so the piece feels like selection itself is the composition, not like a tape being played.

## Palette

Named colors from the prompt, hand-picked hexes: tape dark brown #2a1d12 with shadow #1f150c and edge #4a3520; kept passages in warm gold #d9a441, bright core #f2c14e, deep #a97b22; cut sections in cold grey #5a6066 over #33383d, evaluated discards near black #14161a; the playhead a thin white line #f5f2ea; the field a dark brown gradient #1c130a to #120c06; plate ink warm off white #efe6d0; the hint pill warm gold #d9a441 with dark ink #171009.

## Mechanism

- Tape: the strip runs horizontally across the middle, height 0.17 H, centred at 0.52 H, scrolling at W/90 px per second of material time so new material enters from the right and passes the playhead at centre. Each segment holds 6 seconds of material. Sprocket holes run along the top and bottom edges of the tape.
- Editorial rule: each segment k has a hidden quality, the first draw of mulberry32(1949*1000 + k*7919). A segment is kept when that hash is under 0.2333, the 42 of 180 minutes ratio, about 23 percent of the material. Kept segments render as a vertical gold gradient with a bright core band; cut segments render cold grey with a grey top edge; segments before the stream starts are unrecorded leader, dark and empty.
- Improvisation: the bowed tone is a closed-form sum of slow sines, 0.045, 0.07, and 0.023 Hz, a pure function of material time, drawn as a wandering trace above the strip and a phase-shifted mirror below it. The trace is gold while the current passage is kept and cold grey while it is cut.
- Bloom: the field above and below the strip shows the current kept passage blooming as twelve soft radial gold glows on each side, seeded per current segment. While the current passage is cut the bloom is faint cold grey.
- Interaction, tap: pointerdown evaluates the segment under the playhead at that moment against the hidden rule and records the decision permanently. A kept decision marks its segment with a bright white edge and flares the bloom for 2.5 seconds; a discard decision turns its segment near black with a thin grey slash and collapses the bloom for 2.5 seconds. The stream never restarts and never reloads; a tap is the editorial cut, not a reseed.
- Ratio counter: small in the bottom-right corner, above the hint. Material in is the stream clock; material out is the kept segments so far plus the kept part of the current one; the second line gives the kept share against the session target, 3:00:00 in, 0:42:00 out.
- Audio: visual only, no WebAudio. The prompt's bowed-tone improvisation and editorial engine are realized as a closed-form visual sound model, per the Franke audio rule. No click-to-reload; tap never reloads.

## Determinism

- FIRST_T = 48. At t = 48 the tape is mid-scroll, the current passage (segment 8) is kept and blooming in gold, kept segments 0 and 8 are lit on the strip, the counter reads IN 0:00:48, OUT 0:00:06, KEPT 22 percent. The playhead sits at the centre of the strip.
- Seeded PRNG mulberry32(1949), fresh instances per draw from the piece number and segment index; every frame is a pure function of t plus the tap decisions, which start empty, so frame one is fully reproducible. Tap decisions are the only state, and they only exist after interaction.
- Tape scroll is W/90 px per second, tone wander at 0.023 to 0.07 Hz, bloom static per segment with a slow flare decay, all under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.
- QA hooks: location.search reads ?t=<seconds> to render at an arbitrary time, ?tap=<n> to simulate n tap cut decisions at load (one per second from the start time, so each evaluates a later moment as the tape scrolls), and ?seed= to vary the texture seed. window.__draw drives draw() with a virtual clock, and window.__piece1949 exposes kept(k), hash(k), decision(k), tapAt(t), tapCount(), ratio(t), redraw(t), firstT, and startT.

## Acceptance criteria, as numbers

- Frame one: t = 48, no decisions, segment 8 kept and blooming, counter IN 0:00:48, OUT 0:00:06, KEPT 22 percent. Second 720x720 render byte-identical to thumb.png, md5 7a610de5a993d379763eddbb54015715.
- Kept segments among 0 to 21: 0, 8, 13, 19, 20, 21. Kept share among segments 0 to 8 is 2 of 9, 22 percent; among 0 to 10 it is 2 of 11, 18 percent.
- Time probe: ?t=60, md5 2cdab5ea7b58b3fd753ecb8d42dfbd6a, different from frame one; ratio at t = 60 is IN 0:01:00, OUT 0:00:12, KEPT 18 percent. The tape has scrolled and segment 13 is now lit on the right.
- Tap-keep probe: ?t=48&tap=1, md5 80671c091ec5752e7a8b221936e02854, different from frame one; decision on segment 8 is kept at t = 48, the segment carries a bright white edge and the bloom flares.
- Tap-discard probe: ?t=54&tap=1, md5 85f843cca2fb0f9255ab847d0797ddea; decision on segment 9 is discard at t = 54, the segment under the playhead is near black with a grey slash, the tone trace turns cold grey, the bloom collapses, counter IN 0:00:54, OUT 0:00:12, KEPT 20 percent.
- Tap-3 probe: ?t=48&tap=3, md5 6968405041a8c2b829b8723e7a067a6d; all three taps land on segment 8 (t = 48, 49, 50 all fall inside the 6 second segment), the last decision recorded at t = 50.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. Plates legible, no collisions, hint readable on its gold pill on all sizes, field full-bleed on the phone and square on desktop, the tape mid-scroll with kept gold and cut grey segments, the playhead centred, the counter legible above the hint.
- Tap-keep frame inspected: the kept segment under the playhead carries a bright white edge and the bloom flares gold around it.
- Tap-discard frame inspected: the segment under the playhead goes near black with a grey slash, the tone trace turns cold grey, the bloom collapses to a faint grey wash.
- No em dashes in visible copy or in this file.

## Fix rounds

1. The first mobile render showed the tone trace as jagged spikes: the 0.11 Hz term at the phone scroll rate gave a 39 px wavelength sampled every 6 px. The fast term is now 0.07 Hz at 0.25 amplitude, the trace is sampled every 3 px, and the amplitude is 0.09 H. Re-rendered and re-gated; the trace reads as a slow wandering bowed line on mobile and desktop.
2. The first bloom read as flat brown discs with hard overlapping edges. The bloom is now drawn with per-circle radial gradients fading to transparent, so it reads as a soft glow rather than a stack of discs. Re-rendered and re-gated; the thumb md5 changed and the staged copy was refreshed to match.
3. The code comment on the first frame misstated the counter as OUT 0:00:12; the counter logic is correct (completed kept segments only, so OUT 0:00:06 at t = 48) and the comment was corrected to match the rendered frame.

## Deviations from the prompt

- The prompt calls for a continuous generative improvisation and an editorial algorithm selecting windows by a hidden quality rule. The improvisation is a closed-form wandering tone, not a sounding agent, and the hidden quality rule is a seeded hash threshold of 0.2333, the 42 of 180 ratio; the visible behavior matches the prompt (scrolling tape, kept passages lit, cut sections dark, tap forces a cut decision) without sound, per the Franke audio rule.
- The prompt names no segment length, scroll rate, or counter format. The 6 second segments, W/90 px per second scroll, sprocket holes, and the live IN/OUT/KEPT counter with the 3:00:00 in, 0:42:00 out target line are invented staging for the named mechanism, so the ratio is visible and the tape reads as tape.
- The bloom is drawn as soft radial glows rather than any literal acoustic image; it reads as the kept passage opening up in the field, not as a waveform display.

## Known warts

- Three consecutive taps within one 6 second segment all evaluate the same segment, so rapid tapping can look like one decision; the decision is recorded once per segment and the flare restarts, but the tape does not gain three new marks.
- The kept share in the counter swings early (22 percent at t = 48, 18 percent at t = 60) because it is computed over the few segments seen so far; it settles toward 23 percent only over a long stream.
- At frame one the leftmost kept segment is cut off by the left edge of the frame, so its gold reads as a partial band rather than a whole passage.
- The discard slash is a single diagonal line across the segment; on a narrow phone segment it is short and easy to miss next to the near-black fill.
