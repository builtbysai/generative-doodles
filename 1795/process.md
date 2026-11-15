# №1795 "The Parabolic Listener" (LE4, PP1042)

EXPANSION #235 lawrence-english. Date: 2006 · 12 · 11. Gallery note: "A dish gathers drifting motes into soft blooms. Drag to re-aim the dish."

## Build

A large parabolic dish sits in a near-black field, its mouth open to the right. Warm white motes drift right to left across the frame and bend toward the dish's focal point, where they bloom into brief soft amber flares. A second, smaller dish stands behind and above the main dish; a small dark siren tower silhouette stands at the far right edge. A thin feed arm runs from the dish centre to the focal point, and a support pole grounds the dish on a faint ground line.

Palette: near-black ground #0b0b0e, warm white motes #F2EAD8, amber focal blooms #E8A33D, faint steel rim light #9AA4B0. Title/date and hint plates are dark (#111114) with bone ink (#E8E2D2), flipped to match the near-black ground.

## Frame one (fixed phase, t = 60 s)

- Aim is 0 (pan 0, tilt 0), so the focal point is fixed at dish centre plus 0.62 R to the right.
- Motes: 170, fixed seeded population (mulberry32 seed 1795). Each mote has a seeded field position, size 0.7 to 2.4 px, drift speed 0.008 to 0.022 field widths per second right to left, vertical sway, and brightness. Position at time t is closed form: wrapped right-to-left drift plus sway, bent toward the current focus by a Gaussian falloff (sigma 1.6 R, max bend 0.55). Several motes are near the focus at frame one and render brighter and larger.
- Blooms: closed-form schedule, t0 = 58.8 + m * 6.4 + jitter (seeded, plus or minus 0.8 s), duration 3.0 s. At t = 60 s the m = 0 bloom is about 1.2 s into its fade: a soft amber bloom partway through fading, with a small bright core, centred just off the focal point. No other bloom is live at frame one.
- Dish geometry: main dish centre at field x + 0.34 W, y + 0.52 H, radius 0.30 W; second dish at centre plus 0.24 W, minus 0.17 H, radius 0.55 R, drawn at 0.45 opacity. Siren tower at field right edge minus 0.035 W, height 0.24 H, with a small horn at the top. Ground line at field y + 0.88 H.

## Interaction

Watch-first. Drag slowly re-aims the dish: pointer movement sets a bounded aim target (pan plus or minus 0.35 rad, tilt plus or minus 0.28 rad). The aim lerps toward the target at gain 0.5 per second, so the focal bloom follows with a soft lag and motes re-route to the new focus. No tap action, no click-to-reload.

## Deviations

None. No audio (the prompt offers none for this piece; the dish "does not make sound"). Canvas 2D only, so no WebGL substitution was needed. The bloom schedule is closed form rather than density triggered, per the spec's adaptation flag, which keeps frame one byte-comparable.

## QA

Rendered with node ~/workspace/tools/render-piece.js from the actual script:

- Desktop 1280x900: near-black field, main dish dominating the left two-thirds with steel rim light on the upper-left arc, second dish behind upper right, siren tower a small dark vertical at the far right edge, motes drifting right to left and clustering brighter near the focus, one soft amber bloom with a bright core at the focus, feed arm and support pole visible, title/date plate top left, hint plate bottom left. Pass.
- Mobile 390x844: full-bleed field, dish large and centred, second dish above, tower at the right edge, bloom and motes readable, plates legible. Pass.
- Thumb 720x720: same composition as desktop, dish and bloom clearly readable at small size. thumb.png IS the 720x720 render. Pass.
- Determinism: two desktop renders produce identical md5 (8f094fc639f0ba5c16539e9849512885). Frame one is closed form of t = 60 s with seeded RNG only; no Date.now or Math.random affects it. requestAnimationFrame calls are guarded with typeof checks.
- No em dashes in visible copy.
