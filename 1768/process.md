# №1768 "The Threshold": process.md

## Driver

A black room with one light in it that you are not sure you saw. You stare, and after a while the dark stops being empty: there is a point, just barely brighter than the grain around it, breathing so slowly you cannot tell whether it changed or you did. Every few minutes it lets go of a single ring that widens and thins until the black takes it back. Nothing else ever happens, and that is the whole piece.

## Mechanism

Canvas 2D, absolute black ground (#000000). A seeded stipple of 6,000 one-pixel grain dots (mulberry32 seed 1768, fixed positions and alphas 0.015 to 0.060 in the one grey-green) forms the noise floor; it is drawn from a precomputed table every frame, never from per-frame random. The point sits at field (0.53, 0.47), slightly off-center, drawn as six concentric low-alpha bands plus a small core, never a canvas gradient object, so the falloff is a stepped radial glow in the single grey-green #8fae97. Its breath is a closed-form phase-modulated sine, breath(t) = 0.5 + 0.5 sin(2πt/23 + 0.9 sin(2πt/47 + 0.6) + 1.811), mapped to an intensity factor of 0.55 to 1.00, so the point never exceeds its authored ceiling and never brightens beyond the faint band it lives in. Rings come from a fixed authored schedule generated once from the same seed: births at 48 s, 228 s, 422 s, 656 s, 830 s, 992 s, then drifting gaps of 150 to 270 s. Each ring expands over a 30 s life to a maximum radius of 0.38 of the field's short side, fading before it reaches mid-screen, drawn as a thin stroke with alpha 0.16 times fade to the power 1.6 plus a fainter outer echo band. The simulation pre-runs 0 to 60 s in 1/30 s steps before the first draw, so frame one is a pure function of piece time. No Math.random and no Date.now anywhere in the visual state.

## Palette

Absolute black #000000, one grey-green light #8fae97, nothing else. Plates use the same grey-green dimmed to #6d7f72 at low alpha. No other color, no grid, no sound.

## Interaction

Watch-only. No pointer handlers, no click-to-reload, no drag. Reduced-motion preference is respected: the loop does not start when prefers-reduced-motion is set, leaving the fixed first frame.

## Frame-one phase

Fixed phase t = 60 s. The point is mid-breath on the rise: breath(60) = 0.5001, intensity factor 0.7751. One ring is mid-flight: born at 48 s, age 12 s of its 30 s life, radius 0.152 of the field's short side, alpha about 0.07 and falling. The grain is at its fixed seeded layout.

## Deviations from prompt

None in behavior. Two construction adaptations, both invisible in the result: the noise floor is a seeded stipple table rather than true per-pixel noise, so frame one stays byte-comparable; the point's radial falloff is concentric low-alpha filled circles rather than a gradient object, per the house rule against gradient objects. The title and date plates are text only, drawn on the canvas at very low alpha with no filled plate block, so they stay legible without fighting the near-black field.

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected by reading the PNGs. Desktop: vast black, faint grey-green point slightly off-center, one thin fading ring around it, grain barely perceptible, title and date dim but legible top-left, "Watch only." dim bottom-left. Mobile: full-bleed black, same point and ring, plates legible. Thumb (720x720): same read at small size. First build had the point at a breath trough at t = 60 (breath 0.0143); the phase offset 1.811 was added so frame one sits mid-breath, then all three sizes were re-rendered and re-inspected. Determinism: two independent 720x720 renders are byte-identical (md5 0f9d11e6d73b0a8a4b4eb17081a3b259). No em dashes in visible copy. Nothing pushed; parent gates and pushes.
