# №1237 — Seeds Are Meant to Disperse

Christina Battle study block CB6 (PP396), after her 2022 slow-care work *seeds are meant to disperse*: "Gardening is a labour of care, but it is also a labour of time... not all seeds will produce. Still, they carry the potential for life... gardening slows everything down."

A garden bed seen from above — soil rows, cultivated seedling rows, six seed-head plants — set in a pavement margin. Seeds release from the plants and drift on invisible wind. Some land on soil and sprout a season later; most land on pavement and do nothing. A small typewriter counter in the corner keeps the tally. It is a ledger, not a score: nothing celebrates when a seed germinates.

## Frame one (fixed phase T0 = 96 s, early summer)

Verified from the shipped schedule math at desktop layout: **dispersed 96, landed 82, on soil 18, germinated and showing 4; in flight 14 — 5 parachutes, 6 silk, 3 awns.** The counter reads `germinated 4 / dispersed 96`. (On the phone layout the bed is proportionally wider, more seeds land on soil, and the same instant reads `germinated 7 / dispersed 96` — the schedule is one function; only the geometry it lands on changes.) The season band along the top shows summer (gold) at full strength, the year tick just past the quarter mark. Cultivated seedling rows and the first wild sprouts are both up; dandelion clocks, milkweed pods and grass heads are all mid-release.

## Seed schedule and season model

Everything is a closed-form function of piece time and a seeded integer hash — no frame-integrated particles, no stored state, no unseeded randomness.

- **Releases.** Each of the six seed-head plants (2 dandelion, 2 milkweed, 2 grass, at hashed positions in the bed) releases on its own hashed interval stream. The base interval depends on the season at release time: spring 6.5 s, summer 5.0 s, **autumn 2.6 s (the great dispersal)**, winter 13.0 s, each jittered ×(0.7–1.3) by hash. State at any time t is derived by iterating the schedule from 0 to t — a few hundred seeds per year.
- **Flight.** Each seed's type comes from its plant, and its whole flight is analytic: duration and wind speed/direction from hashes (parachute 9–14 s slow float with a sine bob; milkweed silk 12–18 s long shallow glide with ribbon sway; grass awn 5–8 s quick tumbling fall), perpendicular bob/sway fading in and out over the flight, landing point computed at release. After landing, a seed is a static pale speck.
- **Germination.** A seed that lands inside the bed (and not on the gravel path strip) germinates with hash probability 0.35. Its speck becomes a two-leaf sprout at the next green-season boundary (spring or summer start) after landing — seeds that land in autumn wait out the winter. Marks accumulate across seasons for the whole session; the counter counts a germinated seed only once its sprout is actually showing.
- **Seasons.** One full year is 360 s: four 90 s seasons. Spring seedlings small and bright, summer full green, autumn yellowing with the release peak, winter a snow layer laid over the bed (marks faint beneath) and releases nearly stopping. The thin band along the top edge is the year itself: green / gold / rust / white quarters, the current season at full strength, a dark tick marking the year's progress.
- **Gust.** A slow drag of 80 px or more releases one gust — at most one per 30 seconds. A gust triples the wind for 3 seconds, applied as extra drift over the overlap between the gust window and each affected seed's flight, so even mid-flight seeds answer it. The viewer may assist dispersal, never command it.
- **Reseed.** Double-tap reseeds the wind patterns (a salt on the flight hashes of seeds released afterwards). Release times and past landings never change.

## House rules applied

Canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas CSS size pinned in draw(); phone detection via `window.screen` min dimension < 700 px with an aspect fallback — on phones the bed goes wider in its pavement (0.86 × 0.72 of frame vs 0.62 × 0.66). Synchronous first frame at the fixed phase T0 = 96 s; the rAF loop (typeof-guarded) anchors at T0 + elapsed. No gradients, no ctx.filter, no shadowBlur, no offscreen canvas, no ImageData, no microphone, no audio at all — the piece is silent. All dots are rects and every arc/line batch is moveTo-disciplined (node-canvas batching quirk). Palette strictly from the prompt: soil #5A4232, sprout green #6FA05A, seed silk #F2EAD8, pavement #9A958C, snow #EDEEF0, counter ink #3A3630, gold #D8A020 for the summer band.
