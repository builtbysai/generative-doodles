# №1936 The Disrepair Console

Prompt block: KD1 / PP1183, study #253 kit-downes.

Driver, in one sentence: an organ console as a workbench where each draw stop is a living, faulty voice, and pulling a stop out lets its voice rise as faint staff-lines of light whose jitter plays the fault, with the broken mixture sputtering, the ripe clarinet drifting sharp, and the pedal reed cutting out on its own schedule, and nothing here is ever fixed.

## Palette

Hex values are hand-picked from the prompt's named colors: console mahogany #5b3a28 with shadow #432a1c and highlight #6e4a35, stop knobs bone white #e8e2d4, handwritten ink black #1c1713, fault annotations red pencil #a83a2c, fault list paper #efe8d3, church stone grey room #8a857c with darker stone #6f6a61, staff-lines of light #f2ead8, manual white keys #efe9dc with black keys #241a12.

## Mechanism

- Ten stops in two rows of five (GREAT: Principal 8, Mixture IV, Clarinet 8, Flute 4, Oboe 8; PEDAL: Trumpet 8, Pedal Reed 16, Gedackt 8, Vox Humana, Bourdon 16). Each stop is a voice agent with a fault behavior: none (clean), misfire (broken mixture), drift (ripe clarinet), dropout (intermittent pedal reed), waver (oboe, vox humana).
- Stop position comes from drag: pointerdown picks the nearest stop within 70 px, vertical drag pulls it out or pushes it back, level 0 retired to 1 fully in. Pull distance is 18 to 30 px by stage height. The knob slides down its rod as it is pulled, and its name and red fault note travel with it.
- Voices render as animated light staves above their stops: five faint horizontal lines that rise slowly and fade near the top of their travel, with a faint column of light under each staff. The fault is audible in the motion, rendered visually: misfire draws the staff in segments and drops some (sputter, 4 Hz step noise) with spiked jitter; drift slides the whole staff sharp on a slow sawtooth, up to 9 px; dropout gates the voice on a 5 s scheduler (on 3.2 s, off 1.8 s, soft edges); waver breathes slowly. Clean stops shimmer gently as continuous lines.
- At frame one the three faulted voices are already out (Mixture IV 0.70, Clarinet 8 0.85, Pedal Reed 16 0.60) plus a clean Flute 4 at 0.45 for contrast, so the sputter, the drift and the dropout all read immediately.
- The fault list hangs pinned above center: cream paper with a red pin, three handwritten faults in ink with red pencil annotations ("broken mixture, sputters, misfires", "very ripe clarinet, drifts sharp", "intermittent 16' pedal reed, cuts out on its own"), the worst fault underlined in red pencil, and "leave as found" at the foot.
- The console fills the lower two thirds: mahogany body with faint wood grain, two manuals of 14 white keys each with black keys in 2 and 3 groups, GREAT and PEDAL jamb labels at the left edge.
- Interaction cue: "Drag a stop out to pull it in. Push it back to retire it."
- Audio: visual only, no WebAudio built. The prompt's voices are rendered as light, not sound, per the Franke rule: no autoplay, no gesture-gated audio. This is a deliberate deviation, noted here.

## Determinism

- FIRST_T = 8. Fixed phase state at frame one: t = 8, mixture and clarinet out, pedal reed in an on-window of its dropout cycle (phase 4.5 puts (8 + 4.5) % 5 = 2.5, inside the 3.2 s on-window), flute out. Every fault is a pure function of t and the seeded PRNG mulberry32(1936); the sputter uses stepNoise, a deterministic function of a step index and a seed.
- All motion runs under 4 Hz (sputter steps at 4 Hz, staff rise at 0.055 Hz, waver at 0.9 Hz), well under the 14 Hz ceiling. prefers-reduced-motion freezes the motion at the first frame; dragging still re-registers stops.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. Title plate, date, and "Grüneberg organ, faults as found" clear; fault list legible with red annotations readable; console, stops, manuals, and hint all framed; no clipped text.
- Drag probe (/tmp/probe1936.js): evals the actual script, renders frame one (md5 decc2c3c0686d94c8558f4d1b54cf2fd at 828x828 stage), dispatches a real pointerdown on the retired Oboe 8 knob and a pointermove down the full pull distance through the captured listeners. After the drag md5 541dd5ed32b9d5f21fd601a784897806, frame changed: YES. The post-drag render shows Oboe 8 pulled down with a solid five-line staff rising above it and "trembles" in red under its name. Pushing the same stop back up returns md5 decc2c3c0686d94c8558f4d1b54cf2fd, identical to frame one.
- Query-param probes (?pull=N, also read as ?seed=N): default md5 decc2c3c0686d94c8558f4d1b54cf2fd, pull Trumpet 8 (seed 6) md5 ce5cb3c0363b9f3697c105ce2c0af95e, pull Principal 8 (seed 1) md5 8746e06d42a84a1775f9e48e29d8a6c2. The probes differ from the default and from each other, so pulling a stop changes pixels.
- Determinism: a second 720x720 render is byte-identical to thumb.png (md5 1710876626491fe4b946ebfcf28fa2f7).
- No em dashes in visible copy or in this file.

## Fix rounds

1. First render: the staves were drawn in segments for every stop, so clean voices read as dashed blocks, and the pedal reed was invisible at frame one (its dropout phase put t = 8 exactly at a cycle boundary, gate 0). Made non-misfire staves continuous lines, raised staff alpha from 0.55 to 0.8 and line width to 1.5, lengthened the rise, and moved the pedal reed phase from 2.0 to 4.5 so it is mid on-window at frame one. All four pulled voices now read at frame one.
2. First render: the PEDAL jamb label sat above the second row and struck through the Oboe 8 stop name on phones. Moved both jamb labels to the left edge, centered on their rows, and gave the stop grid its own margin (at least 52 px) so the labels clear the first column. Clean on all three sizes after this round.

## Deviations from the prompt

- The prompt names only three faulted stops; the other seven stops (Principal, Flute, Oboe, Trumpet, Gedackt, Vox Humana, Bourdon) and their clean or waver behaviors are invented to fill the two rows of the console, since a workbench console needs a full jamb. The three named faults are built exactly as specified.
- Audio is visual only, per the Franke rule; no WebAudio is built and no sound plays. The faults are rendered as jitter in the light staves, as the prompt's technical approach describes.
- The jamb rows are labeled GREAT and PEDAL as a loose grouping; the second row mixes pedal stops with manual stops, so the label is approximate rather than a strict division.
- The "leave as found" line on the fault list is added; the prompt forbids a fix control, and the line states that rule in the organist's own hand.

## Known warts

- The red fault notes under pulled stops ("sputters", "drifts sharp", "cuts out", "trembles") are small red type on mahogany; they read clearly on desktop and thumb but are faint at phone size, where the red on brown is low contrast.
- The pedal reed staff overlaps the mixture staff's column of light on desktop where the two stops share a column; the staves are at different heights, so they stay separable.
- On phones the stop names sit close under their knobs and the fault notes close under the names; nothing collides after the jamb-label fix, but the vertical rhythm is tight.

## Gallery note (proposed)

"An organ console as a workbench: pull the stops and the faulty voices rise as staff-lines of light, sputtering, drifting sharp, cutting out on their own schedule. Nothing here is fixed. Drag to pull a stop."
