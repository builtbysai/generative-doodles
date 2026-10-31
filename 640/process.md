# No.640 - Un Lobo le Canta a la Luna

EXPANSION #77 seba-ilabaca, prompt block 8 "The Geometry of the Wolf". His pop-up geometry book (MIENTRAS UN LOBO LE CANTA A LA LUNA) as pure form.

## Concept

A night scene built only from his geometric vocabulary, tenderly hand-wobbled: triangular mountains, a perfect circle moon, a straight horizon line with ants marching on it, and a wolf silhouette howling from a foreground ridge. The geometry is the lesson and the beauty. Every 40 seconds (or on tap) the scene briefly "teaches": faint rust construction geometry draws itself on - the moon's guide circle, the triangles' apex-to-base lines, a doubled line proving the horizon's straightness - then fades, leaving the finished scene. Primitives only, wobble held to 1-3%, no text anywhere: the forms teach.

## Construction

- Palette (strict, nothing else): night ink #1B2430 (sky and ground), moon bone #EDE6D2, mountain blue #27405E, wolf/ant black #14110D, construction rust #B4572E (lesson overlay only, at 15% opacity).
- All geometry is precomputed once from mulberry32 (seed 640077): moon outline from 48 radius factors at +-1.5%, two seeded triangle ranges (far at 55% alpha, near full), a jittered ridge polygon, jittered wolf part polygons, eight ants with seeded starts, directions and march speeds.
- Mountain heights are fractions of the smaller viewport dimension, not of height, so the tall phone frame does not stretch the triangles into spires (see Deviations).
- The moon is a 48-point wobbled circle; its glow is seven layered translucent bone discs with quadratically growing radii and alpha falling outward (outer edge step nearly zero), pulsing very slowly on the anchored clock. No shadowBlur, no filters, no offscreen canvas.
- The wolf is assembled from filled polygons (four legs, hanging tail, body, neck, head with an open howling muzzle notch, two ear triangles) in local units, scaled about its ground point; breathing is a subtle anisotropic scale (1.02 vertical) at a 5.2 s period, so frame one at t=0 catches it exactly mid-breath (sine zero).
- Ants are pure functions of anchored elapsed time plus drag impulses. Each impulse contributes an analytic decaying offset, dv * tau * (1 - exp(-(t - t0)/tau)) with tau = 0.8 s, so a stir scatters them along the line and they regroup to their march speeds in about 2 s. Ants wrap around the line ends and can never leave the line (their y is locked to the horizon).
- Lesson timeline (9 s window): draw-on over 3 s (each element staggered: moon guide first, then mountain lines, then the horizon double), hold 4 s, fade over 2 s. Grid starts at t = 31 s and every 40 s after. A tap sets a new start only when no lesson is currently visible; a tap during a lesson does nothing, per the brief's choice.
- Interaction: tap = lesson on demand; horizontal drag = stir the ants near the drag path (impulse scaled by drag velocity and proximity, capped, max 6 stored per ant). Watch-only otherwise.
- House rules: Visual Viewport sizing with resize listeners on visualViewport and window; canvas style width/height pinned in px inside draw(); phone detection via window.screen min dimension under 700 px with aspect fallback; frame one is the synchronous draw at t=0; the rAF loop is typeof-guarded and anchored to its first timestamp; no Date.now, no Math.random, no createElement, no AudioContext, no external assets, no visible text beyond the title element.
- QA hook: a `?seed=lesson` query forces the lesson clock to its mid-hold instant for verification renders only; production loads have no query string and are unaffected.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). Thumb rendered twice and cmp byte-compared: identical, re-verified after every fix round; second renders deleted.
- Frame one read-back (all three sizes): blue triangle ranges across the middle, bone circle moon upper right with a soft glow, thin bone horizon line across the lower third with eight tiny ants on it, black ridge in the foreground and the wolf standing on its crest, head raised mid-howl toward the moon, ears and open muzzle reading clearly even at thumbnail scale. Nothing clipped on mobile.
- Forced lesson check (throwaway /tmp render via the seed hook, read back, then deleted): dashed rust guide circle around the moon with center point marker and radius line; dashed apex-to-base lines with point markers at apexes and feet on the near mountains; dashed doubled line just above the horizon with end markers; all faint at the specced 15%.
- Fix rounds during QA: (1) the wolf's outer feet hovered about 14 px above the ridge slope (the ridge apex was a single point under a four-legged stance) - the ridge was re-cut with a level crest plateau and the wolf planted on it; (2) mountain heights were height-fractions, which stretched the triangles into thin spires on the 390x844 frame - heights are now smaller-dimension fractions, desktop composition unchanged; (3) the moon glow first rendered as three hard concentric rings - rebuilt as seven layers with falling alpha; (4) the wolf muzzle was lengthened and the mouth notch deepened so the howl reads at thumbnail scale.

## Deviations

- Mountain heights measured against the smaller viewport dimension rather than height: a construction choice for the phone frame, recorded above; the desktop frame (where the smaller dimension is the height) is pixel-identical to the straightforward reading of the brief.
- The ridge is drawn as a flattened mound with a level crest instead of a single-apex wide triangle: the prompt allows "a low wide triangle/flattened mound", and the crest is what lets all four of the wolf's feet stand on it.
- One grep hit for a banned-API name is a code comment noting the absence of shadowBlur; the API is never used.
