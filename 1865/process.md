# No.1865 The Stool of Objects

## Driver

Preparation. Ordinary objects laid on strings change what the strings can say. The felt phenomenon is a dead-quiet booth where one small placement rewires the timbre. The mechanism is the piece: drag an object from the stool onto the string zone and the voice and the drawn string behavior change deterministically; drag it back and the clean guitar returns. Nothing else happens. The mic listens.

## Prompt

FN2, PP1112, study #244 francesca-naibo. A dead-quiet red-walled recording booth. A condenser microphone with a pop filter hangs over an empty stool. On the stool: pencils, a bent wire loop, small stones, a coin, a clothespin. When an object is placed on the strings of the off-frame guitar, the sound changes timbre entirely: the pencils make rattling harmonics, the wire a metallic bow, the stones dull thuds. The mic listens; nothing else happens. Palette: booth red, mic black, pencil yellow, wire silver, stone gray, paper white. Composition: the stool is center, the mic hangs from upper frame, the guitar body intrudes only as a curved edge from the right. Motion-interaction: DRAG EARNED. Drag an object from the stool onto the string zone to prepare the guitar, drag it back to unprepare it. Each object is a timbre switch, and the piece is the catalog of what objects do to strings. Never click-to-reload.

## Build

2D canvas with WebAudio. A base plucked-string voice (triangle 110 Hz plus a 220 Hz partial, 4 second pluck cycle) repeats on its own so the booth is never fully silent, but the voice stays clean until an object is placed. Five draggable objects rest on the stool: pencils, wire loop, stones, coin, clothespin. Each is a timbre switch with a fixed slot on the string zone:

- pencils: bandpassed noise burst at 2400 Hz, rattling harmonics
- wire loop: inharmonic partials at 303.6 and 594 Hz, metallic bow
- stones: lowpass at 420 Hz with a shortened decay, dull thuds
- coin: bright 1318 Hz ping
- clothespin: 55 Hz thump with the base voice damped, damped thud

Prepared objects are drawn resting across the strings and the strings kink toward them at the contact point. Removing all objects returns the clean guitar. A tap on the string zone plucks immediately. The bottom right plate reads the current voice ("voice: clean guitar" or the prepared list). Real WebAudio only starts lazily inside the first pointer gesture; the piece is silent before that. Pointer events throughout, so objects drag on touch.

## Fixed phase

Frame one t = 1.2 s. The first pluck fires at t = 0, so frame one shows the strings 1.2 s into their decay, amplitude exp(-1.2 x 1.7) = 0.13. No wall clock, no Date, no unseeded Math.random. All scatter (wall seams, noise buffer) comes from mulberry32 seeded 1865.

## House rules

Visual Viewport sizing with resize listened to on visualViewport and window; canvas element pinned in draw() via canvas.style.width/height in px; phone detection via window.screen (min dimension under 700 px) with aspect fallback (h > w x 1.15); field-like composition full-bleed on phones, square on desktop. One synchronous frame at load; every requestAnimationFrame call guarded by a typeof check. Reduced-motion support: the loop does not run. No click-to-reload. No em dashes in visible copy.

## Gallery

Title: The Stool of Objects
Date: 2007 · 02 · 19
Note: A red recording booth, a mic over an empty stool, and a handful of small objects that retune the guitar when laid on its strings. Drag an object onto the strings to prepare the guitar.

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb. All three inspected. Fix round: objects shrunk from 0.052 to 0.044 of the field unit and respread across the stool after the first render showed the pencil, wire, and stones overlapping; voice plate now stacks above the hint plate on phones after the first mobile render dropped it for lack of side-by-side room. Final renders: stool objects distinct at all sizes, mic, strings, and guitar body read clearly, plates legible, no clipping, no doubled canvas. thumb.png is the 720x720 render of the final script, md5 4e1bb64d69c1e51808ac56ee6b8fee12.

## Deviations

One pencil instead of a pair of pencils, so five distinct objects fit the stool seat without overlap; the prompt's "pencils" still names the object and its timbre. The coin is drawn in a pale gold (#D9C98F) rather than silver so it reads apart from the silver wire loop. The pluck cycle repeats every 4 seconds on its own, a small addition so the prepared voice can be heard without tapping; tapping the strings still plucks at once.
