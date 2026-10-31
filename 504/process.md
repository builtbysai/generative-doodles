# No.504 "Mural Cats" — EXPANSION #60 giulia-tassi, prompt GT8

## Concept

Giulia Tassi's "Gattilandia" mural register turned into an interactive wall. Seven cartoon cats float on a flat white wall among simple three-bump clouds and yarn balls with unraveling strings. Everything is drawn in one confident black outline weight; only three cats carry a flat accent fill (mustard, teal, tangerine), the rest stay line-only, exactly as a painted mural would ration its colour. The wall is mostly watch-only — cats blink, flick tails, strings sway — until a drag disturbs it: cats are spring-anchored, swing out and settle back with damped oscillation, tails lagging behind the motion. A double-tap reseeds the whole wall.

## Construction

- Single self-contained `index.html`, 2D canvas only, no external assets. Design space 1600×1000 (landscape wall), letterboxed on every screen so the composition keeps its shape; page ground is the wall white.
- Seeded RNG (mulberry32, seed 504008) builds the scene: cats take shuffled cells of a jittered 3×3 grid so faces never overlap; 7 cats at 35–100% of base size in two parametric poses (sitting, standing), each with seeded flip and tail phase. Exactly 3 cats get accent fills, assigned from {tangerine #E05435, teal #87CECA, mustard #E9A63B} without replacement. Clouds (4) sit in the upper field; yarn balls (4) are rejection-sampled clear of cat faces, cat bases, and each other.
- Cats are parametric line drawings in unit space: ellipse bodies, circle heads, triangle ears, dot eyes, tiny triangle nose, one-curve mouth, and always exactly 3 whisker dashes per side. Tails are quadratic curves whose tips sway with a lagged velocity term.
- Line weight is ~8 design px at full cat scale and eases down to ~5.7 px on the smallest cats so small faces stay legible; whiskers run at 0.72× that weight so the three-per-side fan never merges into a blob.
- Physics: per-cat spring (k=90, damping ratio ~0.42, underdamped) toward its anchor, or toward the pointer while grabbed; rotation springs toward a velocity-based tilt; tail lag lerps toward a velocity-based target.
- Idle schedule: in each 5.5 s window one seeded cat either blinks (eyes become short dashes for the first 5% of the window) or flicks its tail (wag frequency and amplitude swell on a sine envelope). Yarn strings sway on slow sines; clouds drift a few px.
- Interaction: pointer drag grabs the nearest cat in reach and pulls it; release lets the spring swing it home. Double-tap (two taps within 350 ms and 60 design px) reseeds the wall from a new derived seed.
- House rules: canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas CSS size pinned in px inside draw() every frame; phone detection via window.screen physical size (min dimension < 700) with aspect fallback; hint is the single lowercase word "drag" at low alpha, bottom-left.

## QA log

- Rendered with `render-piece.js` at 1280×900 (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png).
- Determinism gate: first frame is the synchronous draw at constant phase PHASE0 = 1.6 s (all cats at seeded anchors, springs at rest, all eyes open; frame one never derives from Date.now()). thumb.png rendered twice and `cmp` byte-compared: identical.
- Pass 1 fixes: the first layout formula pushed the bottom grid row past the design-space floor, clipping two cats at the frame edge; anchors now centre in their cells. Clouds were redrawn from overlapping arcs into three contiguous bumps on one baseline. Whisker dashes merged into solid wedges on small cats at full line weight; they now use a wider fan at reduced weight, and overall line weight scales gently with cat size.
- Pass 2 fix: a yarn ball could land just below a sitting cat and peek out between its paws; placement now also rejects spots near cat bases, and sitting-cat paws were given slightly more height so they read as paws at small scales.
- Final read-back: desktop and thumb show the full wall — 7 cats (3 coloured), 4 clouds, 4 yarn balls with strings, whiskers 3 per side everywhere, nothing clipped. Mobile keeps the landscape wall centred on white with every element in frame.

## Deviations

- None against the prompt. Two implementation choices: (1) line weight tapers slightly on the smallest cats (5.7 px vs 8 px) to keep faces legible — still a single bold mural weight per cat; (2) cats are filled with the wall white under their outlines so they occlude clouds and strings behind them cleanly, which keeps line-only cats reading as pure line work.
