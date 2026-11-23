# №1097 — The Inside-Out Sun

onformative study block OF2 (PP258): Anima Iki (2015) as a piece. A giant sphere hangs in a dark room, wrapped in viscous green-violet metallic fluid, and it is the room's only light source — the walls wash purple with its breathing. A visitor (the pointer, dragged near) makes the fluid quicken and brighten toward them, the way the real sphere reacted to movement and noise.

## How it works

- **Fluid, closed-form.** The surface is a domain-warped fBm value-noise potential in disc coordinates (seeded hash noise, 3 octaves). Streamlines run along the perpendicular gradient of the potential — curl-like swirls of pure liquid, no landmasses, no planet. Two polar-grid layers are stroked per frame: a coarse, thick, low-alpha underlay for the viscous body, and a fine surface layer. Stroke color blends green `#1FD6A6` → bright `#3DF5C0` → violet `#7A4DFF` by local flow speed; the fastest points throw tiny `#CFFFEF` specular dots.
- **No gradients anywhere.** Glow, rim light, room wash and the floor reflection are layered flat-alpha circles, ellipses and arcs. The reflection below the floor line is a squashed, dim echo of the sphere's lower bands, alternating green and violet.
- **Breathing pulse.** A 4 s sine pulse drives glow radius, wash alpha and stroke brightness. Frame one (t = 10 s) catches it exactly mid-rise. The pulse is a pure function of t and the visitor state.
- **The visitor.** Dragging records the pointer position. Closeness is a closed-form function of the recorded events: a 0.6 s ramp-in scaled by proximity to the sphere, an exponential 2.5 s forgetting after release. Closeness quickens the flow time (×1 + 1.6·close), shortens the pulse period (4 s → ~2.1 s), and adds a Gaussian brightness/speed boost to streamlines near the pointer.
- **Determinism.** Frame one is drawn synchronously at the fixed phase t = 10 s: fluid mid-swirl with green and violet regions separated, pulse mid-rise, room washed purple, rig hint above, reflection below. The rAF loop is typeof-guarded and continues from that phase. No audio (none specced).
- **House rules.** Canvas sized from the Visual Viewport API with resize listeners on visualViewport and window, CSS size pinned in draw(), phone detection via `window.screen` (aspect fallback), the square stage centered so the sphere composition holds on phones, page ground = the room color `#0B0814`. No offscreen canvas, no `ctx.filter`, no shadowBlur, no `createElement`, no visible text beyond the `<title>`.

## QA

- `qa-desktop.png` (1280×800): dark purple-washed room, centered glowing sphere (~55% of frame) covered in green-violet liquid swirls with a bright rim, faint projector-rig hint above, soft banded floor reflection below.
- `qa-mobile.png` (390×844): square stage centered, sphere composition intact, nothing clipped.
- `thumb.png` (720×720) rendered twice and compared with `cmp`: **byte-identical**; the duplicate was deleted.
