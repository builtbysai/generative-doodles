# No.687 "Marea Roja"

EXPANSION #83 lachimuchina, prompt block 7 "Marea Roja" (verified verbatim from TASKS.md).

## Concept

La Chimuchina's MAREA ROJA as a living red tide: a dark sea field overtaken by a blooming tide of plankton. Thousands of tiny red cells drift in slow gyres and cluster into swirling bloom patches that pulse with a slow bioluminescent rhythm. The bloom breathes as one body: patches seed, grow, glow, dim and disperse, leaving the water dark again before the next bloom. It is kept planktonic and luminous throughout, a bloom and not a wound: no fish, no boats, no horizon line, no text, no UI.

The piece is watch-only at base. Dragging stirs the water: cells near the drag scatter, and the bloom reforms around the disturbance as the gyre field reasserts itself.

## Construction

Single self-contained `index.html`, canvas 2D, no external assets, no audio, no microphone. Strict six-color palette: bloom red #C8321E, bloom ember #E0602A, bloom deep #7A1F14, sea night #0D1517 (also the page ground), sea depth #16211F, bloom glow #F2A35E. Brightness is carried by color tiers and alpha only; there is no blur, shadow or gradient anywhere. The brightest cells draw a wide, faint halo dot in the glow tone under a solid glow core, which is as close to luminescence as flat tiers get.

Gyre field. The field is isotropic: one unit is the smaller viewport dimension and the field rectangle covers the whole viewport, so the sea is full-bleed at any aspect, phones included. Seven gyres are placed by seeded rejection sampling (mulberry32, base seed 687001) at fractional positions with a minimum separation of 0.44 units, each with a seeded radius (0.17 to 0.30 units), rotation direction, whole number of revolutions per cycle (2 or 3), and a light level (0.85 to 1.00). The sea depth tone is laid down as three nested flat discs of rising alpha around each gyre, a feathered depth patch without gradients. Because the layout is a deterministic function of the aspect, it rebuilds identically on resize.

Cells. 3,200 cells: 2,900 bound to gyres (assigned in proportion to gyre area, radius drawn from a core-heavy mixture so patches have dense hearts and thinner arms) and 300 free drifters on slow Lissajous paths. Every position is a closed-form function of the cycle time. A bound cell orbits its gyre with an angular speed that is a whole number of revolutions per 60 s cycle, larger toward the core, so the patch shears into a swirl and every orbit closes exactly at the cycle wrap. Its radius breathes on whole-cycle frequencies and a small epicycle wobbles the path. Local density for lighting is the analytic falloff exp(-(r / 0.6R)^2) from the cell's own gyre, so brightness follows patch structure without any neighbor search.

Bloom cycle. The master cycle is 60 s. An envelope keyed over the cycle phase u drives the bloom: seeding (u 0 to 0.15, envelope 0.12 to 0.35), growth (to u 0.45, 0.95), peak glow (u 0.52, 1.00), dispersal (to u 0.85, 0.15), dark water (back to 0.12 at the wrap; first and last keys match, so the loop is seamless). A 20 s breath (three per cycle) multiplies the light of every patch together, as the prompt's global pulse requires. Each cell carries a seeded vigor; the envelope must pass the cell's vigor threshold before it fades in, and it fades out as the envelope falls back, so growth and dispersal are changes in population, not just dimming. A spread factor, a pure sine over the cycle, pulls cells toward the gyre cores while the bloom gathers (down to 0.70) and lets them drift wide as it disperses (up to 1.30). Cell light is gyre level times density falloff times breath times vigor, mapped to four tiers: deep below 0.28, red below 0.55, ember below 0.80, glow above.

Frame-one phase. The loop is anchored with an offset of +21 s, so frame one sits at cycle u = 0.35, inside the growth stage: envelope about 0.79, breath about 0.85, spread about 0.76 pulling the patches tight. The first frame is therefore a developed bloom mid-rise, patches out with softly glowing cores and the sea still dark around them, neither empty water nor the peak.

Interaction. Pointer down and drag record stir points with anchored elapsed times (throttled, capped at 18). A stir displaces nearby cells radially outward with a tangential lean, gaussian falloff over 0.22 units, peak displacement 0.16 units; the displacement envelope is a sine over 5 s, so it returns to exactly zero and the cells settle back onto their gyre paths: the bloom reforms around the disturbance. No click or tap action exists, and nothing reloads.

House rules. Canvas size comes from the Visual Viewport API with resize listeners on visualViewport and window; canvas.style.width/height are pinned in px inside draw(). Phone detection uses window.screen physical size (min dimension < 700px) with the aspect fallback; phones get the full-bleed field and slightly larger dots. Seeded RNG only (mulberry32). The animation loop is typeof-guarded on requestAnimationFrame.

Determinism. Frame one is an explicit synchronous draw at t = 0. All cell positions, the envelope, the breath and the spread are pure functions of the anchored elapsed time (performance.now minus a load anchor); no wall-clock call appears in the logic. Stir history is the only state, and it is empty in frame one.

Deviations. (1) Gyre advection is realized as closed-form orbits around seeded gyre centers rather than particles integrated through a noise velocity field. Reason: the determinism gate requires frame one and every forced-time render to be exactly reproducible, and closed-form orbits with whole-cycle frequencies make the full 60 s cycle periodic by construction; the visual result (differential rotation shearing each patch into a swirl, density concentrated at gyre cores) is the behavior the prompt asks the field for. (2) The QA hook (?seed=tN) used to inspect later cycle stages is inert in normal viewing, following the batch convention.

## QA log

Rendered with node ~/workspace/tools/render-piece.js (node-canvas harness, no rAF, no audio):

- qa-desktop.png (1280x900): full-bleed dark sea; five bloom patches clearly developed with bright ember and glow cores, red mid-tones and deep fringes, sparse dim drifters between them, depth patches barely visible under the gyres. Nothing clipped, no text.
- thumb.png (720x720): same composition at gallery size; four to five patches read clearly, cores softly glowing, sea dark around them.
- qa-mobile.png (390x844): phone detection engaged via window.screen; the field refits full-bleed to the tall frame, six patches distributed down its length, nothing clipped.
- Determinism: thumb.png rendered twice and compared with cmp: byte-identical. Second render deleted.
- Forced-stage checks (rendered to /tmp via the ?seed hook, inspected, deleted): t=10 (cycle u about 0.52, peak) shows the fullest field, every vigor threshold passed, patches at their widest; t=33 (cycle u = 0.90, dark water) shows only sparse seed specks at the gyre cores, confirming the dispersal and dark stages.
- Fix round during QA: the first thumb render threw because a square viewport left the field dimensions at their initial values and the field was never built; the initial dimensions are now zero so the first resize always builds the field. All renders redone after the fix and the byte-compare re-run.
- Compliance sweep: no Date.now or Math.random calls (one prose comment names the determinism rule), no createElement, no AudioContext, no external URLs, no em dashes, no visible text besides the title.
