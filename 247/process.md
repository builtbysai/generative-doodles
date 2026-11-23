# No.482 Blue Garden

EXPANSION #58 giuliadallara (Giulia Dall'Ara), prompt GD2.

## Concept

Giulia Dall'Ara's "La darsena" mural, her "un giardino in blu", as a generative underwater garden: a row of tall arched niches, like chapel arches, stand in deep blue water. Inside each niche a single orange-red coral branch or flower-vase form rises from the floor, small striped fish drift across the mid water, and dot details scatter and pulse. Cream arch frames and mullions divide the niches, and a thin checkerboard strip runs along the base. Still, ceremonial, flat: hard edges, flat fills, no text, no hint.

## Construction

Single self-contained index.html, canvas 2D, no external assets, no audio, no interaction of any kind.

- Palette, exactly four colors: deep navy #232B8F (water inside the arches and the page ground), periwinkle #7C86E8, orange-red #E14E2B, cream #F5EEDC. Flat fills only; nothing is blended or shaded.
- Canvas sizing follows the Visual Viewport API with resize listeners on visualViewport and window; draw() pins canvas.style.width/height in px every frame. Phone detection uses window.screen (min dimension < 700), aspect h > w*1.15 as fallback only.
- Arches: the count adapts to aspect, 3 across below 0.75 (phones), 4 below 1.15 (square), 5 above that (desktop), always inside the brief's 3-5 range. Each arch is a canvas path, a rectangle with a semicircular top (radius half the arch width). The outer path is filled cream as the frame and mullion; the inner path, inset by the frame thickness (8.5% of arch width, clamped 6..14 px), is filled navy, then set as the clip for everything that lives inside that arch.
- The one central botanical form per arch cycles by arch index: bare coral rising from the arch floor, coral from a cream vase, coral from a periwinkle vase. The vase is a flat ceremonial vessel (contrasting band, three navy dots) whose height is tied to the arch width (0.78 of it, capped at 0.21 of the inner height) so it stays squat on tall phones; the coral table is translated at draw time so its roots sit just inside the vase neck, or on the floor for the bare form.
- Coral: seeded recursive binary branching (mulberry32, seed 482), generated once into a segment table in normalized arch coordinates: depth 5, per-branch spread 0.42 to 0.75 radians, length shrink 0.72 to 0.85 per generation, stroke width tapering by 0.80 per generation from 4.2% of the inner arch width. Because an arch is far taller than wide, the horizontal step of each branch is amplified by a factor of 2.0; without it the fan collapses into near-vertical reeds in pixel space. Branches that drift past 16% or 84% of the width are steered back toward the middle. Terminal tips carry dots: small periwinkle or cream dots, with about a third grown into flat flowers (periwinkle or cream disc with an orange-red center).
- Fish: exactly 2, 3 or 4 per arch, seeded. Each fish is an ellipse body plus a triangle tail plus three stripe bars clipped inside the body silhouette and a navy eye; bodies are periwinkle, cream or orange-red with contrasting stripes. Fish are assigned stratified lanes: their crossing positions and their depths (a band from 14% to 52% of the inner height) are each seeded shuffles of slot orders, so no two fish in an arch share a lane. Each fish's loop phase is back-solved from its lane position and its own length (the safe crossing window 1.15 * lenF / (1 + 1.3 * lenF), lenF 0.30 to 0.46 of the inner width), so at the constant first frame every fish is fully inside its arch, mid crossing.
- Dots: 14 to 19 scattered dots per arch in periwinkle, cream and orange-red, clipped to the arch with everything else.
- Checkerboard strip: two rows of alternating cream and periwinkle squares spanning the arch row's width along the base, under a thin cream rule.
- Motion: watch-only pure loop of 24 seconds, and every period divides it. Fish cross their arch in 12s or 24s on horizontal sine paths (bob period 6s), with a 2s tail wag (rotation at the tail joint plus a slight body roll). Coral sways almost imperceptibly on a 12s period: the whole form bends around its base by at most 0.016 radians, scaled per segment. Dots pulse faintly by radius on a 6s period (factor 0.78 to 1.08). No interaction, no hint, nothing reloads.
- Determinism: the first frame is drawn synchronously at load at the constant loop phase t = 11s: fish mid crossing in their lanes, coral mid sway, dots mid pulse. requestAnimationFrame is typeof-guarded and anchored as the fixed offset plus elapsed time, wrapped by the 24s loop. No Date.now() anywhere, no AudioContext, no document.createElement, no offscreen canvas. All scene tables derive from the fixed seed alone.

## QA log

Rendered with node ~/workspace/tools/render-piece.js (node-canvas) at three sizes:

- qa-desktop.png (1280x900): five cream-framed arches read instantly as chapel niches on flat navy. One fanned coral or vase form per arch, every striped fish fully inside its arch and in its own lane in the upper and mid water, scattered dots throughout, and the two-row cream and periwinkle checkerboard along the base.
- thumb.png (720x720): four arches; the niches, corals, vases, fish and checker strip all hold at thumbnail size. Rendered twice and byte-compared with cmp: identical. Second render deleted.
- qa-mobile.png (390x844): three tall arches; vases keep their squat profile, fish stay whole and legible, corals narrow with the arches but still fan, checker strip intact, nothing of the composition clipped. Coral branch tips that reach an arch edge are cut by the arch clip itself, as specified.

Iterations: the first build drew the coral as a tight bundle of near-vertical reeds (branch spread computed in normalized coordinates collapses in pixel space on tall arches) and stretched the vases on the phone aspect (vase height was a fraction of arch height). Fixes: horizontal branch step amplified by 2.0, spread widened, depth raised to 5, stroke taper softened; vase height retied to arch width with a height cap, and the coral translated to root in the vase neck. The second build's fish phases put several fish half-clipped at the arch edges at t = 11s and let two fish in one arch overlap into a garbled stripe mass; fixes: fish moved to stratified shuffled lanes for both crossing position and depth, and each phase back-solved through a per-length safe window so every fish is fully inside at the first frame. All renders were regenerated and determinism re-verified after each change; the final thumb byte-compare passed.

Deviations from the brief, recorded:

- None on palette, composition, motion or interaction. The fish-lane stratification and the back-solved phases are construction choices inside the brief's terms (2-4 fish per arch, looping paths, deterministic first frame); they only decide where in its arch each fish is found at t = 11s.
