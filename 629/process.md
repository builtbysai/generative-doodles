# No.629 "Lift the Flap"

EXPANSION #76 soledad-romero, prompt block 5 "Levanta la Solapa" (SUPERPODERES board books).

## Concept

Soledad Romero's SUPERPODERES flap books as a touch piece: a 3x3 grid of chunky board tiles on warm cream. Every tile face carries one flat folk creature (octopus, cat, chameleon, owl, firefly, axolotl, snail, bat, frog, in that fixed order). The creature is printed on a paper flap hinged at the tile's top edge. Tap a tile and the flap folds up with a fake-3D lift, revealing the creature's hidden superpower drawn underneath as a working mechanism. Tap again and the flap folds shut. Flaps are independent and several can stay open; a drag does nothing, exactly as the prompt specifies.

The nine mechanisms, one per creature:
- Octopus, camouflage: a 6x6 dot field whose radii ripple outward in waves, in purple with seeded amber accent dots.
- Cat, whisker sensors: concentric arc fans expanding from the muzzle point in four directions, fading as they grow.
- Chameleon, tongue target-lock: a spiral target; the tongue zips out in four visible steps, holds, and retracts.
- Owl, night vision: concentric sight rings that light in sequence, cross ticks, and two gold prey dots blinking at seeded positions.
- Firefly, pulse lamp: a lamp circle pulsing on a sine, drawn as layered translucent gold discs (no shadowBlur), inside a black socket ring.
- Axolotl, regeneration: a tail that holds whole, breaks into scattered dots, and regrows, looping; gold fin dots return as it heals.
- Snail, shell radar: an amber spiral shell with a gold sonar wedge sweeping around it and an expanding ping ring.
- Bat, echolocation: rings expanding from an emitter point; where they pass the two obstacle blocks, purple echo arcs collapse back.
- Frog, spring legs: two coil springs compressing and releasing under a green platform, with a hop arc and a dot riding the launch.

Only one mechanism animates at a time: the most recently opened tile's. Other open tiles hold their mechanism's last frame, because each mechanism's clock only advances while it is the active one and its flap is fully open.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets, no audio, no visible text besides the title.
- Sizing from the Visual Viewport API with resize listeners on both visualViewport and window; the canvas style width and height are pinned in px inside draw() every frame. Phone detection via window.screen (min dimension under 700 px), aspect fallback only; the grid refits the phone frame with the same chunky proportions, and the page ground is the board cream.
- Palette: ground and cavity in board cream #F0E6D2 (cavity uses the slightly darker #E9DCC0 so a revealed base reads as an inside surface), tile faces a touch lighter at #F8F1E0, paper edge #D9C9A6, flap free edge white #FFFFFF.
- Ink assignment (construction note): the prompt lists six inks for nine creatures. The five creatures it names inks for take them: octopus purple #7A4E8C, cat amber #C9862E, chameleon green #6A9A5B, owl brown #6B4A2E, firefly gold #E8B93B. The remaining four are built on ink black #1C1A16: axolotl, snail and bat are black outlines each with one family accent drawn from the listed inks (axolotl gold gills, snail amber shell, bat purple wings), and the frog takes the sixth listed ink, chameleon green #6A9A5B, as its body fill so the grid keeps a green presence in the bottom row. Each mechanism uses its own creature's ink plus its accent.
- Flap fake 3D: each tile's base (cavity plus mechanism, clipped to the tile interior) is drawn in a first pass; flaps are drawn in a second pass. The flap is a quad from its top hinge to hingeY + flapH * cos(theta), theta easing from 0 to 105 degrees over about 0.6 s opening and 0.5 s closing. The creature rides the flap front under the same vertical projection (scale 1, cos(theta) about the hinge), so it squashes and flips as the flap folds back. The flap's free edge carries a white band whose thickness grows with sin(theta), the paper's thickness catching the light. A translucent shadow fills the cavity in proportion to sin(theta). The mechanism is drawn under the flap at all times and is simply covered while the flap is closed, so nothing of it is ever visible before its flap opens.
- Determinism: frame one is a synchronous draw at t = 0 with all nine flaps closed and every mechanism phase at 0. Nothing is derived from Date.now(); the rAF loop is typeof-guarded and anchored to elapsed time since load. All seeded detail (octopus accent dots, owl prey positions, axolotl scatter offsets) comes from mulberry32 with fixed seeds. No offscreen canvas, no filters, no shadowBlur.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp; identical. Second render deleted.
- Desktop read-back: 3x3 cream grid, nine distinct creatures (purple octopus, amber cat with whiskers, green chameleon on its branch, brown owl with cream face discs, gold firefly with pale wings and black head, black-outline axolotl with gold gills, black-outline snail with amber spiral shell, purple-winged black bat, green frog), all flaps closed, no text, nothing clipped.
- Mobile read-back (390x844): grid refits the narrow frame, tiles stay chunky and square, all nine creatures legible, nothing clipped.
- Thumb read-back (720x720): same composition as desktop, all closed.
- Forced open-flap check: a throwaway copy in /tmp with window.__forceOpen = 4 and window.__forcePhase = 1.6 injected (inert QA hooks; undefined in normal use) rendered at 1280x900. It showed the firefly flap folded fully back above its tile with the creature squashed and flipped by the projection, the white paper edge bright along the fold, the cavity shaded deeper, and the pulse lamp mechanism revealed at the tile center: layered gold glow discs inside a black socket ring. The other eight tiles stayed closed. Throwaway copy and render read, then deleted.

## Deviations

- Ink assignment for the four creatures the prompt does not ink: see the construction note above. Reason: the prompt lists six inks for nine creatures; black outlines with one listed-ink accent each keeps all nine inside the given palette with no new colors.
- Flap fold is capped at 105 degrees rather than a full 110, and the grid gap is a generous 0.2 of a tile, so a folded-back flap and its creature stay inside the gap above their own tile instead of painting over the tile above. The lift still reads as a full fold-back with the paper edge showing.
- The mechanism layer is drawn continuously beneath its flap rather than generated at tap time; it is invisible while closed because the opaque flap covers the whole tile. This keeps frame one and every closed state pixel-stable for the determinism gate.
