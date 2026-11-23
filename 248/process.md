# No.484 The Embrace

EXPANSION #58 giuliadallara (Giulia Dall'Ara), prompt GD4.

## Concept

Giulia Dall'Ara's Pastor Fido central scene as a generative frieze: flat, tender, ceremonial. At center-left, two simplified figures are locked in an embrace at large scale, one in rust red, one in cream with a lavender polka-dot skirt, backed by dark green foliage. To the right, a row of three standing hat figures watches in a line. A small framed face icon floats upper-left of the pair, a crescent moon hangs in a lavender sky wedge at top-right, and a scallop band runs along the bottom edge. Watch-only: the pair breathes, the moon glow waxes and wanes, the hat figures sway in sequence. No interaction, no hint, nothing reloads.

## Construction

Single self-contained index.html, canvas 2D, no external assets, no audio, no microphone.

- Palette: near-black green #0E2A24 (page ground), rust #C8431F, lavender #B9A8E0, sage #9DC49A, cream #F4EBD3. The foliage adds two darker green tones from the same family (#12362C, #1E4D3E) for depth, as the brief allows. Hair caps are sage on the rust figure and rust on the cream figure (with a matching rust bun), because a near-black green cap would vanish against the near-black green ground and the heads read as truncated in the first build.
- Canvas sizing follows the Visual Viewport API with resize listeners on visualViewport and window; draw() pins canvas.style.width/height in px every frame. Phone detection uses window.screen (min dimension < 700), aspect h > w*1.15 as fallback only. The page ground is the near-black green.
- Layout: the pair occupies the left 45 percent at large scale (height P = min(H*0.64, W*0.92); on phones P = min(H*0.55, W*0.82) so the hat row keeps its room, and the pair center shifts right only as far as needed to keep the rust robe on screen). The hat row stands along the right edge at 0.54 pair-heights, the framed icon sits upper-left, the moon inside the wedge at top-right, and every figure stands on the scallop band line.
- The pair: bodies are simple robe masses (bell shapes with a domed shoulder line), heads are cream circles leaning toward each other. Faces are nearly blank: one heavy brow line and a minimal nose mark, drawn in the deep green. The embrace is two overlapping torso masses plus two interlocking arm arcs with round caps: the rust arm wraps across the cream figure, the cream arm wraps back across the rust figure, crossing at the pair's center. The cream figure's skirt is a lavender bell from the waist, clipped, with cream polka dots in offset seeded rows.
- Foliage: eight monstera-ish leaves (pointed oval blades with a center vein and one or two deep-green holes) at explicit seeded positions forming a canopy over and behind the couple, in sage and the two darker greens.
- Sky wedge: a flat lavender diagonal field across the top-right holding nine seeded cream stars (any star falling below the wedge's diagonal edge is skipped) and the moon. The moon is a cream disc cut by a lavender offset disc into a crescent, over a soft cream halo.
- Framed face icon: a cream-framed square, slightly rotated, with a lavender field, a small cream face circle, brow line and nose mark.
- Scallop band: a sage strip along the bottom edge whose top edge is a row of scallop bumps spanning the full width, each bump holding a small cream dot. It is drawn before the figures so they stand in front of it.
- Hat figures: three standing robe figures in sage, cream and rust with cream heads, nearly blank faces, and wide-brim hats (flat brim ellipse plus dome) in rust, deep green and lavender. Seeded height and width variation per figure (mulberry32, seed 484).
- Motion: the loop is 24 seconds and every period divides it. The pair breathes on a 6s cycle (scale 1 plus/minus 0.016 about the pair's base). The moon runs a 12s glow cycle: halo alpha and radius swell and the crescent cutout drifts slightly, so the moon faintly waxes and wanes. The hat figures sway on an 8s cycle, rotating about their bases with phases stepped by a third of a cycle each, so the sway travels down the row like a slow wave. All motion is a pure function of loop time.
- Determinism: all scene jitter (leaves, stars, skirt dots, hat variation) is precomputed once from the seed. The first frame is drawn synchronously at load at the constant loop phase t = 8s: the pair at mid-breath on its 6s cycle, the hat figures spread across their sway wave, the moon glow developed. requestAnimationFrame is typeof-guarded and anchored as the fixed offset plus elapsed time, wrapped by the 24s loop. No Date.now() in any frame path, no AudioContext, no document.createElement, no offscreen canvas.

## QA log

Rendered with node ~/workspace/tools/render-piece.js (node-canvas) at three sizes:

- qa-desktop.png (1280x900): the embracing pair reads instantly at left, rust and cream robe masses interlocked by the two crossing arm arcs, heads leaning together with sage and rust hair caps; foliage canopy behind them; three hat figures in a row at right, each tilted at a different point of the sway wave; crescent moon with halo in the lavender wedge top-right; framed face icon upper-left; scallop band with cream dots along the bottom.
- thumb.png (720x720): same read at thumbnail size; pair, skirt dots, hat row, moon and icon all hold. Rendered twice and byte-compared with cmp: identical. Second render deleted.
- qa-mobile.png (390x844): portrait layout holds; the pair stays large at left with no clipping, the hat row separates along the right edge (brims and robes crowd slightly, crowd-like, faces still visible), moon and icon in the top corners, scallop band full width at the bottom.

Iterations: the first build failed the visual check three ways. (1) The hair caps were filled in the near-black green, invisible against the ground, so both heads read as truncated bowls; fixed with sage and rust caps from the palette. (2) An extra arc drawn as part of the rust arm rendered as a solid rust dome across the cream figure's chest; removed, leaving the two quadratic arm arcs as the interlock. (3) The foliage fan, placed by polar offsets, landed mostly off-frame left and behind the bodies, and on mobile the pair overlapped the hat row, merging the first two hat figures. Foliage was rebuilt on explicit pair-relative positions as a canopy, and phones got a width-based pair scale, a guarded pair center, and a wider hat spacing. All renders were regenerated and determinism re-verified after each change; the final thumb byte-compare passed.

Deviations from the brief, recorded:

- The hat row is fixed at three figures; the brief allows two to four.
- Foliage uses two darker green tones (#12362C, #1E4D3E) alongside sage and the ground green, per the brief's "darker green tones from the palette family".
- Hair caps are sage and rust rather than a dark tone, for the legibility reason given in Construction; both colors are in the brief's palette.
- Two canopy leaves are cropped by the left frame edge by design, entering the frieze from off-frame; every figure, the icon, the moon and the band are whole on all three renders.
