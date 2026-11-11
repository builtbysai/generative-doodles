# №1705 "Totem of Soft Masses" (PP952, EXPANSION #224 aaron-penne)

Driver: five organic blobs stacked into a breathing totem, their near-black rims thickening where the blobs press together.

## Mechanism

Each blob is a polar-radius function: radius = R * breath * (1 + 0.105 * fbm + 0.045 * sin(2θ + phase)), where fbm is 3-octave seeded value noise (mulberry32(1705) lattice hash, smooth interpolation) sampled on the wrapped angle via (cos θ, sin θ) so the boundary closes seamlessly, plus a slow asymmetric sine. No blob is a circle or ellipse: the noise term alone swings radius by about plus or minus 10 percent with lumps at several scales. Blobs are drawn bottom to top in pink, violet, teal, pink, violet, with seeded radius, horizontal offset, drift, and breathing phase per blob. Centers are spaced at 0.72 * (r_i + r_j), so neighbors overlap by 28 percent of their combined radii, which is the pressure source.

The rim is a filled ring between the blob boundary and a pressure-thickened inner offset of the same boundary: rim width = 0.045 * R plus up to 0.105 * R * pressure * gaussian(angle to contact), where pressure is the overlap depth normalized by 0.30 * (r_i + r_j) and the gaussian (sigma 0.55 rad) centers on the direction to each touching neighbor. Rims are therefore thin on free edges and up to 3.5x thicker at contact points, reading as pressure, not decoration. Soft inner shading is a second inner offset (0.80 scale, darker shade of the blob color at alpha 0.22, shifted down-right) plus a pale highlight offset (0.55 scale, alpha 0.14, shifted up-left), both clipped to the blob outline.

Motion is watch-only. The whole stack leans about the base blob by lean(t) = 0.05 * sin(2π t / 48) + 0.018 * sin(2π t / 17.3 + 1.2), each blob drifts sideways a few px on its own slow period, and each boundary breathes on its own period, so the stack slowly leans and rebalances over a 48 s loop. Frame one is a fixed phase at t = 6.0 s, with the full stack visible and rims thick at the contacts. The loop wraps by modulo 48 s; drawAt(12), drawAt(30), and drawAt(47.9) all render without error.

House rules: single self-contained index.html, vanilla canvas 2D only, no external assets, nothing async at load. Visual Viewport sizing with resize listeners on both visualViewport and window; canvas element pinned in draw() via canvas.style.width/height in px; phone detection via window.screen (min dimension under 700 px) with aspect fallback (h > w * 1.15). Centered geometric composition: square stage on desktop, page ground is the piece's own warm off-white, hint color flipped to match. On phones the stack is sized against viewport height (min(VH * 0.94, VW * 2.05)) so the tall stack still fills most of the frame instead of shrinking to the narrow width. One synchronous frame at load; requestAnimationFrame guarded by a typeof check; seeded RNG only, no Math.random or Date.now in frame one. No click-to-reload. No em dashes in visible copy.

## Acceptance numbers (measured with window.__probe, desktop 1280x900)

- Blob count: 5 (probe blobCount() = 5 at both desktop and mobile sizes).
- Rim thickness at frame one (t = 6.0 s): base 4.47 px, max 15.55 px at contact points (3.5x base). Over the loop the max ranges 15.28 px (t = 0) to 15.91 px (t = 24); the minimum is always the 4.47 px base on free edges.
- Lean range over one 48 s loop: -0.0476 rad to +0.0558 rad (about -2.7 deg to +3.2 deg), so the stack visibly sways and rebalances without toppling.
- Frame one clock: t = 6.00 s exactly (probe clockT()).
- Determinism: two independent 720x720 thumb renders are byte-identical (md5 14319cb53e4ba5bcc17126817e6a4e72 both times).
- QA renders: node render-piece.js at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three read and visually inspected. Fix round 1: increased noise amplitude (0.085 to 0.105) and asymmetry (0.035 to 0.045) after the first desktop render read too circular, and sized the phone stack against viewport height after the first mobile render filled only about half the frame. After the fix round all three renders were re-gated: desktop shows the full stack centered in the square stage with thick contact rims; mobile fills most of the frame with no clipping and legible plates; thumb shows the full stack with title, date, and hint plates legible.

## Deviations from the prompt

- Palette hex values are hand-picked from the named colors, not the exact f00 values: the study file studies/aaron-penne.md does not exist in builtbysai/muse-soul (Contents API 404; the repo tree lists only seven study files, none for aaron-penne) and the path ~/workspace/muse-soul does not exist on this VM. Used: dusty pink #D48C9C / #D89AA6, violet #7E5AA2 / #8A63B0, teal #2E7F7B, near-black rim #241E22, warm off-white ground #F4EDE3.
- p5.js-to-2D substitution per the batch spec house rules (node-canvas has no p5.js/WebGL); the noise is implemented as seeded value-noise fbm in plain JS, as specified.
- Phone geometry sized against viewport height (see house rules above); the composition keeps its centered shape, it does not go full-bleed.

## Gallery note

"Soft blobs stack into a breathing totem. Watch the stack breathe."

Gallery entry: n 1705, title "Totem of Soft Masses", date "2006 · 09 · 12", note as above. Nothing was pushed to any repo; files are staged only.
