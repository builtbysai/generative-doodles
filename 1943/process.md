# №1943 The Organ Diary

Prompt block: KD8 / PP1190, study #253 kit-downes.

Driver, in one sentence: an open travel diary turns its own pages through four named organs, Grüneberg, Stadtcasino Basel, Laurenskerk and Cologne Dom, each spread a console sketch on the left page and a fault list in red pencil on the right, each fault visibly at work in its sketch and still sputtering as the page turns, until the last organ is reached and the diary closes and rests.

## Palette

The study file studies/kit-downes.md does not exist in the repo, so hex values are hand-picked from the prompt's named colors: diary paper cream #f2ead6, console sketches in ink #241f18 with soft ink #4a4238, faults in red pencil #b23a2a with soft red #c65a48, city and organ names in bold black #141210. Each spread is tinted by its city: Grüneberg plain cream #f2ead6, Basel cool #e8eae4, Laurenskerk cool slate cream #e9e8e1, Cologne warm #f6e4bd. A dropped mixture pipe is drawn in grey #8a8172. The closed diary cover is deep green cloth #2e3a30 with cream title #f2ead6. Plate ink is dark #241f18 on the light paper; the hint is the same ink at 0.85 alpha, and cream on the closed green cover.

## Mechanism

- Timeline 68 s, then rest. Each spread shows for 14 s, then a 3 s page curl to the next spread. Spreads 0 to 2 curl into the next spread; spread 3 (Cologne Dom) closes instead: the cover slides from the right edge over 3 s (65 to 68 s) and the closed diary rests after 68 s. It never loops back to the start.
- Spread layout: the open diary fills the frame. Left page: a small red diary date, then the console sketch. Right page: the organ name in bold black, a rule, three fault lines in red pencil italic, an ink italic note, and a small red "still:" line on spreads 2 to 4 noting the previous fault still at work. A tiny tint label sits at the bottom right of each right page ("neutral cream", "Basel cool", "cool slate", "Cologne warm"). The last spread also carries a small three-organ crawl map at the bottom of the right page: three dots joined by a dashed route, captioned "three-organ crawl", with no names on the dots.
- Faults, each a pure function of t and drawn live in the sketch:
  - Grüneberg, broken mixture: the middle three pipes of a nine-pipe rank drop out on their own 3 Hz hash (grey, shortened, red X at the top), with red flicker dots at the feet of the lit mixture pipes and one keyboard key held down on a slow rhythm. A red pencil ellipse circles the mixture rank.
  - Stadtcasino Basel, wind pressure games: a bellows box at the bottom breathes (its height follows a slow sine) with three zigzag folds inside; the seven pipes above the wind chest waver in height on a slow wind modulation; a smooth red pressure wave rides just above the tallest pipe top. A red pencil ellipse circles the bellows.
  - Laurenskerk, the 4-manual leviathan: a pipe tower behind four stacked manuals; a wave of depressed keys (grey, shifted down) travels the top manual, with a fainter echo on the second; a red bracket runs down the left of the stack and a red ellipse circles the top manual; a pedal board row sits at the bottom.
  - Cologne Dom, "the most magical environment": a pointed-arch facade with seven wavering pipes, a rose window with eight spokes above, a slow breathing halo of three concentric circles, and a red sparkle at the rose window that pulses with the shimmer.
- Fault persistence across page turns: during a curl the incoming spread is drawn underneath with its fault at work while the outgoing leaf narrows from the right edge to the spine, with a curl shadow and a bright leaf edge; in the second half of the curl the leaf settles onto the left page. For the first 2 s of each new spread a faint red echo of the previous spread's fault (crosses, a wavy line, or ripple ticks) lingers at the top right of the left page, fading out. The "still:" line on the right page names the same carryover in words.
- Interaction: watch only. A leftward drag of more than 50 px turns the page early by skipping the diary clock forward to the next curl (or to the closing, on the last spread); it never changes what is on the pages and never turns the diary back. A drag on the closed diary does nothing.
- Audio: visual only, no WebAudio.

## Determinism

- FIRST_T = 7. At t = 7 the diary is mid first spread (Grüneberg), the mixture rank mid sputter with one pipe dropped out and marked with a red X, and no page is turning.
- Seeded PRNG mulberry32(1943); pipe heights and paper flecks are fixed at load from the seed. Fault switching uses a deterministic integer hash. Every frame is a pure function of t plus the drag skip total, which is zero until a drag happens.
- All motion is slow (sputter switching at 3 Hz, bellows at about 0.07 Hz, shimmer at about 0.06 Hz), well under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.
- QA hooks: location.search reads ?seed= to vary the paper flecks, and ?sx= and ?sy= to place a small red pencil probe mark. window.__draw is exposed so a probe harness can drive draw() with a virtual clock, and window.__piece1943 exposes spreadAt, redraw, advancePage and firstT.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. Plates legible, no collisions, the mixture fault visibly at work in frame one (grey dropped pipe, red X, red flicker dots), the hint readable on all sizes, the diary full-bleed on the phone and square on desktop.
- Determinism: a second 720x720 render is byte-identical to thumb.png (md5 7a178ce2d0be47c4c1ede4e4f743bc65).
- Page advance probe (probe harness evals the actual script, calls window.__draw at chosen times): t=7 md5 7570cfb42daed74c5743f9e976fde530 (Grüneberg); t=7.5 md5 3da6f2c12afd6dd43e997096195b9613, a different sputter state, so the fault is alive; t=20 md5 071de0a3b383c9e8b43f3e30e0cf9e03 (Stadtcasino Basel, bellows and pressure wave); t=38 md5 6733954751b6a8e3b8b439f00cdc1550 (Laurenskerk, four manuals, rippling keys); t=55 md5 c1a6cdab20b50c17246f2a160efd71fb (Cologne Dom, rose window, halo, crawl map). A later-time render shows a different spread, as required.
- Fault overlap probe: t=14.75, mid-curl p=0.25, md5 4894a8dbe5212358466301109e9dd1ba, shows the outgoing Grüneberg leaf narrowing with its curl shadow and bright edge while the incoming Basel spread is already drawn underneath, and the red fault echo (two crosses) at the top right of the Basel left page. t=15.5, curl p=0.5, md5 17ca74ba38bbb0ae8294e7d29e9df618, shows the Basel spread fully in with the echo still visible. The previous spread's fault still sputters across the turn, in the drawing and in the echo.
- Closing probe: t=70 md5 43fcbb4b8b7389f25aadae55390e9222, the closed green cover with the title, number and date, a red pencil seal, and the hint "The diary is closed; it rests here."
- Drag probe (probe harness dispatches pointer events through the piece's own canvas listeners): at raw t=7 a leftward drag of 120 px moves the diary to curl p=0, md5 51c097b82737c02ab932c2d13c6c5bec, with the Basel spread underneath and the fault echo already visible. The drag turns the page early without changing the pages.
- No em dashes in visible copy or in this file.

## Fix rounds

1. The red pencil ellipse around the Grüneberg mixture rank was sized from page fractions, so on the phone it drew as a tall narrow balloon that did not fit the rank. All three red ellipses are now fitted to the content they circle: the mixture rank's actual pipe span and heights, the bellows box, and the top manual strip. Re-rendered; the ellipse encloses the rank on desktop, mobile and thumb.
2. The Basel bellows read as two disconnected wedges, a trapezoid floating over a thin sliver, and the red pressure wave floated high above the pipes, disconnected from them. The bellows are now one breathing box with three zigzag folds inside, and the pressure wave is a smooth sine riding just above the tallest pipe top. Re-rendered; the bellows and the wave read as one sketch.
3. The Basel pressure wave was first fixed to hug the pipe tops, but it snapped between pipe heights and drew as a stepped line. It is now a smooth sine above the tallest pipe top, swelling with the wind. Re-rendered; the wave is a clean red pencil line. Frame one md5 unchanged by fix rounds 2 and 3.

## Deviations from the prompt

- The prompt says the handwriting accumulates "dates, builders' names, three-organ crawl maps". No builders' names appear anywhere: none were named in the prompt and the fixed facts forbid inventing them. Dates do accumulate as diary-entry dates staged from the gallery date (8 May 2007 through 11 May 2007, one per spread), and the three-organ crawl map appears on the last spread.
- The prompt names no cities for Grüneberg or Laurenskerk, so those spreads are headed by the organ name alone; only Basel and Cologne carry city names, as named in the prompt. The city tints follow the prompt's examples (Basel cool, Cologne warm) with neutral cream for Grüneberg and cool slate for Laurenskerk.
- The prompt's fault wording is kept verbatim on the right pages ("broken mixture", "wind pressure games", "the 4-manual leviathan", "the most magical environment"). The extra fault lines, notes and the "still:" lines are staged elaborations of those named faults.
- The closing is staged as a cover sliding in from the right edge over 3 s rather than a full 3D book close; the cover, title, number and date are drawn on the canvas and the diary then rests closed.

## Known warts

- The lower half of each left page and much of each right page is empty paper, by the diary composition; the sketches sit in the upper half of their pages.
- On the phone the Grüneberg mixture ellipse is tall and narrow because the mixture pipes are tall and close together; it encloses the rank correctly but reads slimmer than on desktop.
- The curl shadow band is subtle in the second half of a curl, where the settling leaf is the same content as the page beneath it, so only the moving shadow and edge line mark the motion.
- The closed cover's diary shadow shows as a thin dark frame line on the right and bottom edges of the green cover.
