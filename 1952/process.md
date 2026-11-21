# №1952 The Moor Is the Score

Prompt block: TC1 / PP1199, study #255 tom-challenger.

Driver, in one sentence: an antique hand-colored map fills the frame with contour lines, a packhorse track, a church, and a red internet cable, and the lines slowly lift off the paper as glowing playable curves while three small cursor-performers travel the routes sounding tones, so dragging a route plays the score by traveling it.

## Palette

Named colors from the prompt, hand-picked hexes: parchment #e9dcbd with darker parchment #dccda4 and ground #b3a077; brown map ink #4a3f2a with softer ink #6d5c3d; hand-color green #5a7a3a, ochre #b07f2e, blue #4a6a8a; phosphor white #f5f7ff for lifted lines; red-pen red #c22a1e with lit red #e0402e for the cable; hint pill #4a3f2a with parchment text.

## Mechanism

- Map: parchment ground with faint fiber grain and a darker edge, soft hand-color washes (green moor, ochre field, blue water), seven seeded wobbly contour rings around the hill with the height mark 432, a church drawn in ink with a tower, nave, pitched roof, door, and label, a compass rose bottom-left, and a 1 mile scale bar bottom-right. Field-like composition: full-bleed on phones, square on desktop.
- Sites: three named sites take turns as the map, one every 180 seconds, each with its own hill, church position, track, and cable: Thieves Clough Bridge, Redbrook Pump House, Worlow Quarry. The current site name is drawn top-right. At FIRST_T the site is Thieves Clough Bridge.
- Lifted lines: the contour route, the track, and the cable each keep a line on the paper and a lifted glowing copy above it. Contours lift 5 plus or minus 3 px on a slow sine, the track 4 plus or minus 2.5 px, the cable 7 plus or minus 3.5 px. The middle contour rings shimmer faint phosphor. The track is a dashed ochre line on the paper with a phosphor dashed lift; the cable is a red-pen line on the paper with a lit red lift and small red square nodes where it changes direction.
- Performers: one glowing dot per route, each with an expanding tone ring and a short stem that rises and falls with the tone. The contour performer loops its closed ring at 0.022 of the route per second; the track and cable performers ping-pong their open routes at 0.016 and 0.020 per second.
- Interaction: pointer down near a route picks it up, dragging moves the performer along the route to the pointer (snapped to the nearest sampled point), and release re-bases travel so the performer continues on its own from the dragged position. No click-to-reload; drag never reloads. No turn-by-turn UI, no GPS pins.
- Audio: visual only, no WebAudio. The tones are a closed-form visual sound model (expanding tone rings and stems), per the Franke audio rule.

## Determinism

- FIRST_T = 8. At t = 8 the site is Thieves Clough Bridge, the contours have lifted a little, the contour performer is a quarter round its loop, the track performer is past the first bend near the church, and the cable performer is near its second node, so the piece reads at once.
- Seeded PRNG mulberry32(1952), fresh instances per draw from the piece number and fixed salts; every frame is a pure function of t plus the travel bases, which only change through interaction, so frame one is fully reproducible.
- Motion is slow: lifts on a sine of about 0.035 Hz, performers at about 0.02 of a route per second, tone rings at 0.5 Hz, all well under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.
- QA hooks: location.search reads ?t=<seconds> to set the virtual clock at load, ?site=<0..2> to force a site at load, and ?seed= to vary the texture seed. window.__draw drives draw() with a virtual clock, and window.__piece1952 exposes dragStart(nx, ny, t), dragMove(nx, ny, t), dragEnd(t), site(t), performer(i, t), routeU(i, t), redraw(t), and firstT.

## Acceptance criteria, as numbers

- Frame one: t = 8, site Thieves Clough Bridge, contour performer u 0.25, track performer u 0.30, cable performer u 0.45. Second 720x720 render byte-identical to thumb.png, md5 621bffe906e069cb9373361b05db8707.
- Time probe: __draw(12) at 720x720, md5 d932e8da36a4fef50d9f786c7f064bf0, different from frame one.
- Drag probe A: dragStart on the contour performer at t = 8, dragMove to (0.90, 0.36), performer snaps to (0.9096, 0.36), md5 5bc4e9372ace207fb72e38fda33da679, different from frame one; the render shows the white contour performer at the right edge of its loop.
- Drag probe B: same drag to (0.34, 0.36), performer snaps to (0.3576, 0.36), md5 342370b01b25d74c0bca0d0554e4e03a, different from drag A and from frame one.
- Site probe: __draw(190) at 720x720, site Redbrook Pump House, md5 b9df48c1e9e033d289c934d06c3cf329, different from frame one; the render shows a new hill, church, track, and cable layout.
- Release probe: drag the cable performer to (0.92, 0.92), dragEnd at t = 8, performer at (0.6819, 0.5565) by t = 8.5, md5 75c370ad9c4b8c355893513b3e9e680a, travel continuing from the dragged position.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. Plates legible, no collisions, hint readable on its dark pill on all sizes, map full-bleed on the phone and square on desktop, church and track readable, red cable glowing against the parchment, three performers visible with tone rings at frame one.
- Drag probe render inspected: the contour performer sits at the dragged side of its loop. Site probe render inspected: Redbrook Pump House reads as a new map with its own hill and track.
- No em dashes in visible copy or in this file.

## Fix rounds

1. First render showed the packhorse track as a white dashed line only: the ochre dashed line was drawn at the same lift as its phosphor copy and was covered. The ochre dashed line now stays on the paper at lift 0 with the phosphor dashed lift above it, and the cable gained a red-pen line on the paper under its lit lift, so both routes read as lines on the map that have lifted, not as floating strokes.
2. First render showed the contour route's paper shadow as a heavy dark loop doubling ring 3. Its alpha dropped from 0.35 to 0.25, so the lifted white loop reads cleanly over the contour.

## Deviations from the prompt

- The prompt names no timings, counts, or positions. The site period of 180 seconds, the lift amounts, the performer speeds (0.022, 0.016, 0.020 of a route per second), the opening performer positions, the height mark 432, the compass rose, and the 1 mile scale bar are invented staging for the named mechanism, so frame one already reads as a performance underway.
- The prompt calls for small cursor-performers sounding tones as they travel. The piece realizes the tones as a closed-form visual sound model with no WebAudio, per the Franke audio rule; the visible behavior matches the prompt (expanding tone rings and stems at each performer) without sound.
- The prompt says the site cycles every few minutes with a new map. The piece cycles every three minutes, and each site re-seeds the contours, hill, church, track, and cable, so the map genuinely changes.

## Known warts

- The outer contour rings are large and sweep across the whole sheet, crossing near the site name top-right; they read as moor contours, but the top-right corner is busy at thumb size.
- On the phone render the track performer sits on the church label at frame one, partly covering the word church.
- The lifted contour loop and ring 3 share the same seeded shape, so the white loop runs exactly over the dark contour; the reduced paper shadow keeps it readable, but the two lines are one shape, not two.
- The tone stems are small and can be missed at thumb size; the tone rings carry the sounding mark more clearly.
