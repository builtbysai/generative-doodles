# No.467 Morning Abduction

EXPANSION #56 andrea-ucini, prompt UC3. His moka-pot UFO, rebuilt as a seamless night loop.

## Concept

A dark star-speckled sky with no ground and nothing else in it. A classic flying saucer hovers top-center, drifting slowly side to side, and pours a wide bright beam down the frame. Suspended in the beam at 60% of the frame height is the black silhouette of a moka pot, bobbing gently and rolling a few degrees as it rises. The most Italian object in the universe, being stolen by aliens. One pot, one beam, one joke.

Palette, only: sky #0B1026, stars #FFFFFF, saucer hull #3A3F4A with lit rim #8A93A5 and dome #BFD6E4, beam #FFF7E0 (0.35 alpha at the top, fading down), moka pot silhouette #141414.

## Construction

- Single self-contained index.html, canvas 2D, no assets, no audio, no text, no hint.
- Canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas.style.width/height pinned in px inside draw() every frame. Phone detection via window.screen (min dimension under 700px) with the aspect fallback; the composition is built from a unit based on the smaller dimension so it keeps its shape in portrait, and the page ground is the sky color.
- Loop: 36 seconds, seamless. The saucer drifts on an 18s sine; the beam sways on a 12s sine; the pot bobs on a 6s sine and rolls plus/minus 5 degrees on a 12s sine. Star twinkle cycles are drawn from 4, 4.5, 6, and 7.2 seconds, all divisors of 36, so every cycle closes exactly at the loop boundary.
- Star field: 84 stars, positions, radii, twinkle cycles, and phases all from a mulberry32 seeded stream (fixed seed 46703). Sparse and small, alpha pulsing on each star's own cycle.
- Saucer: pale dome arc over a dark hull ellipse, a bright rim stroked along the lower arc, and a dark underside core. The beam and pot are drawn as one group rotated around the saucer center: beam first (a trapezoid widening downward, filled with a vertical gradient of the beam color, alpha 0.35 at the top falling to 0.07 at the base), then the pot translated down the beam axis to the 60% height line with its bob and roll applied. The saucer is drawn last so the beam reads as pouring out of it.
- Moka pot: a single silhouette path, lid with stem and knob, flared upper chamber, pinched waist, faceted octagonal lower chamber, a small angular spout wedge on the left, and a thick curved handle loop on the right whose roots the body covers.
- Interaction: drag nudges the saucer. While the pointer is down, target offset and lean are computed from the pointer's distance to the saucer's drifting anchor and chased by damped springs (stiff for the hull, slower for the beam angle, so the beam trails the lean with visible lag). On release the targets return to zero and everything settles back onto the ambient loop. Never click-to-reload.
- Determinism: the first frame is drawn synchronously at exactly PHASE0 (9s, a quarter into the loop: saucer drifted off-center, beam swayed, pot mid-bob and mid-roll). The rAF loop, when present, is anchored as PHASE0 + elapsed since load; rAF is typeof-guarded so the node QA renderer draws the same first frame.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice, cmp byte-identical. Pass.
- First pass fixes: the beam ran too long and too wide (it swallowed the lower third of the frame), the lid knob floated detached above the lid, and the handle loop was oversized and read as a mug ring. Shortened and narrowed the beam so it ends just under the pot, shrank the pot slightly, extended the knob stem into the lid, tightened the spout, and pulled the handle in close to the body. Re-rendered all three sizes after the fix.
- Desktop: saucer reads instantly top-center, dome and lit rim clear; beam a bright trapezoid against the dark; pot silhouette centered in the beam with knob, spout, and handle all legible; stars sparse.
- Thumb: same read at 720x720; pot and beam proportions hold.
- Mobile (390x844): composition keeps its shape in portrait, saucer and pot legible, beam trapezoid unbroken, nothing clipped.

## Deviations

- None from the prompt's letter. Two implementation choices worth recording: twinkle cycles are restricted to divisors of the 36s loop (4, 4.5, 6, 7.2s, all inside the specified 4-8s range) so the loop is truly seamless, and on narrow phone screens the composition unit is scaled by up to 1.15x so the pot stays legible in portrait without changing any proportions.
