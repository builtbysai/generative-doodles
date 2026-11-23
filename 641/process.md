# №1982 Elevated Snapshot

CR7 / PP1229, study #258 ciara-reddy, completing the study. Gallery date 2007-06-16, shown as "2007 · 06 · 16". Interaction cue: tap for the next snapshot.

## What the piece does

Three found arrangements, seen straight down or dead straight, the way a phone snapshot sees them. Tap to drop to the next one; the camera gives a small settling bounce like a hand lowering a phone. The tap turns the page of a contact sheet. Never click to reload.

- Arrangement 0, the bin: straight down into a trash bin. Dark interior, three tulips laid across it by chance (red, yellow, pink), a tipped coffee cup with a ring stain, crumpled paper balls, a bottle cap, a straw. The yellow tulip trembles slowly.
- Arrangement 1, the sheep: dead straight over a green field with mowing bands. A sheep stands under a warning sign on a post; the sign warns of falling rocks, which is the wrong sign for a sheep. The sheep blinks every 4 seconds.
- Arrangement 2, the match: a television fills the frame. Inside the screen a football pitch with ten blurred players in red and blue drifting slowly and a white ball near the center. The sponsor boards top and bottom (MUSE, FLY, SAI, №1982, DOODLES) are razor sharp. The screen flickers faintly at about 5 Hz.

## FIRST_T

FIRST_T = 2 s. Arrangement 0 (the bin) is showing, the yellow tulip mid tremble, so the first frame is a plain overhead bin interior with tulips and a cup. The frame is a pure function of the virtual clock plus tap state; no wall clock, no Date, no unseeded Math.random anywhere in the script. All scattered positions come from mulberry32 with fixed seeds.

## Interaction

Tap (pointerdown) advances to the next arrangement in the fixed order bin, sheep, match, bin. On tap, lastTapT is set to the current virtual time and the new arrangement drops in with a damped-cosine settling bounce: offset -0.16H times exp(-3.2 tau) times cos(6.5 tau), with a matching 4 percent scale pulse, settling in about 1.4 s. The bounce transform applies to the scene only; the caption and hint plates stay put. In reduced-motion mode there is no automatic loop and no bounce; a tap still advances the arrangement and redraws immediately.

## Deviations from the prompt

None visual. Two technical notes: the players' blur is faked with three offset translucent discs per player instead of a real blur pass, so the sponsor boards stay sharp while the kits smear; the screen flicker is a faint white overlay at about 5 Hz rather than a brightness change of the whole screen buffer. Both read as specified.

## Probes

Rendered with node ~/workspace/tools/render-piece.js from the actual script. The render tool passes its probe value as ?seed=, so in this piece ?seed= (and ?arr=) selects the arrangement 0, 1 or 2, and ?t= sets the virtual clock. QA hooks: window.__draw(t), window.__piece1982 with arrangement(), setArr(n), tap(), state(t).

- t = 2, desktop 1280x900, mobile 390x844, thumb 720x720 (seed 0, bin): bin interior with three tulips, cup, paper, cap, straw; caption and hint legible on all three sizes, no clipping. Clean.
- seed 1, sheep: green field, sheep with black head and blinking eye, yellow falling-rocks sign fully in frame, post and shadow all legible.
- seed 2, match: pitch with blurred red and blue players, white ball, sharp sponsor boards top and bottom, bezel and standby dot. The caption plate sits slightly over the top-left board and reads as a broadcast graphic.
- Tap cycle, via a node harness (/tmp/bounce-probe-cr7.js): initial bin, after 1 tap sheep, after 2 taps match, after 3 taps bin again. Mid-bounce render at t = 2.25 (tau 0.25) shows the sheep scene dropped in low with the bounce offset; the settled render at t = 4 matches the seed-1 probe byte for byte.
- Blink probe (/tmp/blink-probe-cr7.js): sheep at t = 3.95 renders the eye shut to a thin line; md5 differs from the open-eye render, confirming the blink.
- Determinism: thumb.png rendered twice from the actual script, md5 identical both times: 097ec3c3148da411e9fa4a2b50528bd3.

## Fix rounds

One fix round, after the first render pass.

- The warning sign triangle was clipped at the top edge of the stage (its apex sat above the frame). Lowered the post top from cy - 0.42S to cy - 0.36S; the sign is now fully in frame. Verified in the re-rendered sheep probe.
- The caption plate overlapped the top sponsor board in the match scene by about 9 px. Moved the plate up from H * 0.035 to H * 0.02; it now sits mostly over the bezel and reads as a broadcast graphic. Verified in the re-rendered match probe.

## Known warts

Minor notes, none open. The straw lies across the yellow tulip head, which is a chance arrangement but can read at first glance as the tulip being cut. On phones the bin circle sits centered in a tall full-bleed stage with dark ground above and below, which is the honest snapshot framing but leaves the composition small on a tall screen. The falling-rocks pictogram reads as black diamonds at thumb size; the joke lands through the sign-plus-sheep pairing rather than the pictogram detail.
