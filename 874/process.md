# №874 The Slow Release

SOA4 / PP1274, study #264 sheldon-omar-abba. Gallery date 2004 · 06 · 03 (formula 2002-01-10 + 875 days). Interaction: watch-only. Gallery note cue: "Watch the slow release."

## Driver

A feed where each frame arrives with two dates: shot in 2019, released in 2025. The caption states both openly. The images age in the dark and surface like letters. The delay is the medium, and skipping ahead would collapse it, so the piece is watch-only.

## Mechanism

An archive queue of five frames, oldest first, one frame at a time. Each frame is a drawn print with its own memory-color wash, a fixed capture date and release date, and a dust load that falls as the shots get newer: 110 specks on the February 2019 shot, 88, 70, 50, then 32 on the December 2019 shot, with a few long scratches on the older frames only.

The cycle is 60 s: five 12 s slots. Each frame crossfades in over the first 3 s of its slot, holds, then yields to the next. The crossfade is about 0.08 Hz, far below the 14 Hz limit by construction. All motion is a closed-form function of cycle phase: lamp glow breathes, the walker steps, the tree sways, the boat rocks, steam curls. Reduced motion stops the loop and holds the first frame.

The five frames, in queue order:

1. The Window, shot 2019 · 02, released 2025 · 01. Sepia room, bright window, a chair in profile facing the light.
2. The Street, shot 2019 · 05, released 2025 · 04. Teal dusk, lit windows on two blocks, one lamp, one walker.
3. The Garden, shot 2019 · 07, released 2025 · 06. Rose hedge bands, a pale path, a tree, scattered flowers.
4. The Sea, shot 2019 · 09, released 2025 · 09. Blue grey sky, low sun, a small sailboat, glints on the water.
5. The Table, shot 2019 · 12, released 2025 · 12. Warm interior, two letters on a table, a cup with steam, a shaft of light.

The date pair is a small fixed element beneath the print, in quiet white, and crossfades with its own frame so the dates never claim the wrong image. The caption plate (No.874, title, gallery date) and the hint sit in the canvas draw, not in DOM overlays.

## Interaction

Watch-only. There is no tap, drag, or skip. The release cadence is the fiction of years compressed to minutes: five releases across one 60 s cycle, one every 12 s.

## House rules

Visual Viewport sizing with resize listened to on visualViewport and window. Canvas element pinned in draw() via canvas.style.width/height in px. Phone detection via window.screen (min dimension under 700 px) with aspect fallback (h > w*1.15). Field-like composition: full-bleed on phones, square on desktop, the print and its date pair centered vertically as one block on the dark ground (#141210). One synchronous frame at load; requestAnimationFrame guarded with a typeof check. Deterministic first frame: fixed phase, seeded tables only, no wall clock, no unseeded random. No click-to-reload. No WebAudio. No em dashes in visible copy.

## QA gate

Rendered the actual script with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 for thumb.png; all three inspected visually. Time probes at 720x720: t=3 vs t=15 28.58% pixels differ, t=15 vs t=27 28.51%, t=27 vs t=39 28.54%, t=39 vs t=51 28.55%, t=51 vs t=3 28.55%; mid-fade t=13.5 differs 31.61% from both neighbors, confirming the crossfade; loop seam t=3 vs t=63 0.00% pixels differ, byte-identical md5. FIRST_T 3 s, cycle 60 s.

Fix rounds: 2. Round 1: the chair read as a hanging bracket, and the print sat high with a large dark void below; rebuilt the chair as a proper profile (back above the seat, two legs to the floor) and centered the print plus date pair vertically as one block. Round 2: the street windows floated in the sky above the buildings; constrained them to the two building faces (y 0.54-0.82). Both rounds re-rendered and re-inspected; the thumb md5 was unchanged by round 2 (frame 0 does not use the window table) and the desktop re-render after round 2 is byte-identical to the inspected one.

Thumb md5: bc8396c2a2fa802b69211a47fc8731a4.

## Deviations from the prompt

None material. Visual-only per the Franke audio rule. The five scenes (window, street, garden, sea, table) are invented staging in the study's register; the prompt names the mechanism, not the subjects. The fiction's years are compressed to a 60 s cycle with one release every 12 s, as the prompt directs.

## Minor known warts

The chair back grazes the window frame edge on desktop. On tall phones the centered print leaves dark ground above and below, by design. Garden flowers read a little like confetti on the lawn, and one flower dot lands on the path. The table letters are mostly blank envelopes with faint ruled lines. Dust is subtle at thumb size.
