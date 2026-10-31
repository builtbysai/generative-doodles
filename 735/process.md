# No.735 The Well

EXPANSION #89 paul-ramirez-jonas, prompt block 8 "The Well", after Well (2008): a bottomless cup, a dropped coin, a wish; the gestures of desiring, saving, donating.

## Concept

A paper coffee cup with no bottom floats over a dark circular well of water on a near-black ground. Tap anywhere and a gold coin falls through the cup, rings the water, and is quietly assigned to one of three ledgers along the bottom: DESIRING, SAVING, DONATING. Each coin leaves a small glint on the water, so the wish field deepens coin by coin. Drag across the water to stir it. Tap a ledger plaque and its count is rendered as a field of tiny coin icons. No sparkles, no stars, no jackpot: the mood is quiet and ritual, the cup stark and diagrammatic.

## Construction

Single self-contained canvas 2D page, strict palette: background #0A0A0C, cup paper #F5F1E6, cup band #8A6544, water #0E2A4A, ripple rings #4A7FB5, coins #D4A017, ledger text #F5F5F0 on plaques #14161C. The only text is the three specced ledger labels and their counts, plus the page title.

Canvas size comes from the Visual Viewport API with resize listeners on both visualViewport and window; the canvas element is pinned in draw() via canvas.style.width/height in px each frame. Phone detection uses window.screen physical size (min dimension under 700px) with the aspect fallback (h > w*1.15); on phones the well widens relative to the frame and the cup, well, and plaques refit.

Coin and ripple model (closed-form): coins and ripples are recorded events in arrays; nothing integrates state. A coin event stores its spawn time t0 and seeded parameters drawn from one mulberry32 stream (wobble phase and frequency, horizontal offset, glint angle and radius inside the well, fall duration 0.95 to 1.2 s). Its position at time t is a pure function: vertical progress u = (t - t0) / fallDur eased as u squared for a gravity-like acceleration from above the cup rim to its water point, with a decaying sinusoidal wobble across the fall. Falling coins are drawn before the cup, so the cup walls hide the coin mid-passage: it is visible entering the dark top opening and exiting the open bottom rim, which is stroked only, with no fill, because the cup has no bottom. At u = 1 the coin is gone and its glint appears: a small gold arc at the coin's seeded position on the water. Glints persist, capped at the most recent 200. Landing spawns a ripple event at the glint point (expanding double ring, alpha fading over 2.2 s, clipped to the well circle); drag samples over the water spawn smaller, shorter stir ripples, throttled to one per 70 ms of pointer travel.

Ledger weighting: each coin's ledger is drawn from the same seeded stream at drop time, weighted DESIRING 50%, SAVING 30%, DONATING 20%. The tick lands when the coin lands: the plaque plays a small stamp pulse (a 0.45 s scale bump keyed to the landing time). Tapping a plaque toggles an overlay panel above the plaques that draws that ledger's count as a grid of tiny gold coin discs; tapping it again, or tapping elsewhere, dismisses it (a tap elsewhere with the overlay closed drops a coin instead).

Determinism: frame one is the synchronous draw at t = 0 before any event can exist: cup floating over the empty dark well, ledgers at zero, no glints, no ripples. All later frames are functions of the recorded event list and elapsed time only; there are no wall-clock reads in the drawing path, and the animation loop is requestAnimationFrame guarded by a typeof check so headless rendering stops cleanly at frame one.

## QA log

Rendered with node ~/workspace/tools/render-piece.js from the actual script:

- qa-desktop.png at 1280x900: bottomless paper cup (dark open top ellipse, thin brown band, open bottom rim) floating over a dark blue well circle; three plaques along the bottom read DESIRING 0, SAVING 0, DONATING 0.
- qa-mobile.png at 390x844: same composition refit to the tall phone frame, well widened, nothing clipped.
- thumb.png at 720x720, rendered twice and byte-compared with cmp: identical (see build notes; second render deleted after comparison).

## Deviations

- The coin's ledger is assigned by the seeded stream at the moment of the tap, but the plaque's stamp pulse and count display are keyed to the landing moment, so the tick reads as caused by the splash rather than the tap. The prompt does not fix the assignment instant; the weighting is unchanged.
- The prompt says tap the cup (or anywhere) to drop a coin; taps on a ledger plaque are reserved for the count view the same prompt specifies, so a plaque tap never drops a coin. This resolves the overlap in favor of both specified behaviors.
- Drag stirring spawns ripples only while the pointer is over the water, so a drag that crosses the cup or plaques does not leave stray rings outside the well; ripples are additionally clipped to the well circle when drawn.
