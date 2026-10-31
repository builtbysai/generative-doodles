# No.763 Floating Volume

EXPANSION #93 larry-bell, prompt block 4 "Floating Volume" (verified verbatim from TASKS.md).

## Concept

A Larry Bell coated-glass cube hangs in the upper third of a white gallery, floating on the light between the floor and the work. The pedestal is effectively invisible. Beneath the cube, on the floor, a soft pool of colored light glows in whatever hue the cube's interference coating is currently throwing. Nothing supports the cube visibly; the weightlessness is the piece. The float is a pure sine, never a bounce, and there is no text, no UI, no furniture.

## Construction

- Room: flat background #F2F0EB, floor #EDEAE4 below a hairline floor line at 0.70 of the frame height (smoke at alpha 0.18), per the prompt's lower-third floor.
- Cube: isometric projection (all screen edges equal), three visible faces (front z=+1, right x=+1, top). Half-edge is 0.105 of the smaller frame dimension, so the composition holds its proportions on desktop, square, and phone frames.
- Interference model (shared with the sibling cube piece, No.760): each face carries a fixed phase; under the light azimuth theta, a face's thin-film parameter is the clamped sum of two offset sine waves of (theta minus phase), mapped through a seven-stop LUT across the strict palette (smoke, chrome, teal, violet, gold, chrome, smoke). Saturation peaks mid-band and both extremes wash toward chrome and smoke, so a face is never flat-painted color. Each face is then shaded toward smoke by a fixed orientation factor (top 1.00, right 0.90, front 0.80).
- Three light behaviors per face, layered inside a clip: a transmission wash (two shallow steps of a deeper film value over the lower body of the pane, so the deepening does not read as a hard line), a diagonal reflection streak in chrome whose position slides with theta, and an absorption band of smoke at the foot of the pane.
- Edge seams: all nine visible edges are stroked twice, a 5px glow pass at alpha 0.18 under a 1.6px core at alpha 0.75. Each seam takes its own thin-film value from the mean phase of its two faces, biased into the saturated zone, lightened 20 percent toward chrome.
- Glow pool: six layered ellipses of the dominant face hue (the face whose unshaded LUT color has the highest saturation that frame), radii stepping 1.00 down to 0.46 of the pool radius, alphas summing to the pool's 0.35 peak at center. Pool radius is 1.95 half-edges, slightly larger than the cube's footprint, at floor level below the cube.
- Float/pool coupling: one sine drives both. hn = sin(2 pi t / 12); the cube's center rises by hn times the amplitude (max(2px, 0.0032 of the smaller dimension), about +/-2px at the 720 reference). The same hn tightens the pool (radius factor 1 - 0.07 hn) and dims it (alpha factor 1 - 0.22 hn): higher float, tighter and dimmer pool; sinking cube, spreading and deepening pool. Both read off the same closed form, so they can never drift out of sync.
- Light orbit: theta advances over a 90 s cycle. Dragging horizontally retargets the azimuth offset; the cube itself is never dragged. Drag segments are recorded with frame-clock times and the offset at any t is a closed-form exponential ease toward the latest target (0.25 s constant), the house event model.
- Pedestal: a 2px vertical thread in smoke at alpha 0.03 from the cube's bottom corner to the pool, effectively invisible, drawn because the prompt allows exactly that and no more.
- Determinism: frame one is the synchronous draw at t=0 (float at mid-height, hn=0, pool at its neutral matching state, orbit at phase 0). Nothing is derived from Date.now(); all motion is a closed-form function of loop time plus recorded drag segments. rAF is typeof-guarded; an inert ?seed=tNN hook exists for QA renders only.

## QA log

- Renders: qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png (720x720), all from the actual script via render-piece.js.
- Determinism: thumb.png rendered twice back-to-back, cmp byte-identical (duplicate deleted), re-verified after the wash fix.
- Desktop/thumb read-back: interference cube floating upper-center (teal front, mauve-gold right, chrome top at t=0), reflection streaks on all faces, seams faintly glowing, floor line at the lower third, teal pool beneath matching the dominant face, pedestal thread invisible at reading distance. Nothing clipped.
- Mobile read-back: same composition in the tall frame via the window.screen phone path; cube and pool fully inside the frame, nothing clipped.
- Forced-state checks (throwaway renders via the seed hook, read back, then deleted): t=3 (float peak, hn=+1) shows the cube at its highest with the pool tightened and dimmed and re-hued to the then-dominant gold-brown face; t=33 (float trough, hn=-1) shows the cube sunk, faces cycled to gold/chrome/mauve, and the pool spread wider and deeper in the matching gold. The coupling and the 90 s hue cycle both verified.
- Fix round: the transmission wash originally landed as one 0.28-alpha step with a visibly hard horizontal edge across the side faces; split into two shallow steps (0.14 and 0.16 alpha) so the deepening reads as coating thickness. All renders redone and byte-compare re-run.
- Grep audit clean: no Date.now, Math.random, createElement, AudioContext, gradients, shadowBlur, external URLs, or em dashes.

## Deviations

- The prompt's "radial gradient ellipse" pool is built from six layered alpha ellipses, per the house no-gradient rule; the soft falloff read is the same.
- The prompt fixes no float amplitude in pixels beyond "+/-2px"; the amplitude scales very slightly with frame size (max(2px, 0.0032 of the smaller dimension)) so the float stays perceptible on large frames while remaining +/-2px at the 720 reference size.
- The sibling cube piece (No.760) was still in build when this piece was made, so the shared interference model was implemented here directly from the prompt block's own description (two offset sine waves of the view/light angle through an interference LUT), matching the specified mechanism rather than copying code.
