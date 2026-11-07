# №1592 — Where the Field Concentrates

Driver: a black field of hairline currents, and where the current bends hardest, glowing capsule loops gather out of the lines, hold, and dissolve.

## Mechanism

- One closed-form analytic flow field (layered sines of position and time, no noise tables) drives 800 particles in cyan, magenta, gold and warm white. Each particle keeps a 20-point trail, so the field reads as hairline currents.
- Curvature is measured live: at every fourth simulation step the turning rate of the field direction is sampled at each particle and accumulated into a 20x20 grid (with slow decay, so recent concentration wins). Loop seeds are picked from the strongest grid cells, with a margin from the frame edge and a minimum separation between loops. Nothing is placed at random and nothing is placed by a timer.
- Loops are stadium-shaped (capsule) rings, 3-5 nested hairlines per loop, each outline point hand-jittered from a per-loop seeded wobble table plus a slow deterministic sine breathing term. A loop gathers over 2s, holds ~20s, dissolves over 3s, then respawns from a fresh live grid measurement. Loops drift slowly along the field and stay aligned to it.
- Frame one is a fixed-phase clock at t = 12s: the piece warms up deterministically (720 fixed 1/60s steps) before drawing, so all 8 loops are mid-hold, gathered and legible in the thumb. Seeded mulberry32 only; no Math.random anywhere. Two thumb renders are byte-identical (md5 ac37ad18e2b4c75d421324e52a8fded3).
- Watch-only: no pointer listeners of any kind. The only listeners are the house-rule resize listeners on visualViewport and window.

## Deviations

- None from the visual spec. One fix round was needed: the first build drew long straight seam lines across the frame because particle trails spanned the toroidal wrap boundary. Fixed by restarting a particle's trail at its wrap point; re-rendered and re-inspected at all three sizes.
- Phone title set to 12px (from 13px) so title and date do not crowd each other at 390px wide.

## QA

- Rendered the actual script with render-piece.js at 1280x900 desktop (square 900x900 canvas per house rule), 390x844 mobile (full-bleed), and 720x720 thumb; all three inspected visually. Loops legible and gathered at frame one, hairlines flowing, no loop touching an edge, no blank frame, only title/date/hint text.
- Gallery note: "Neon capsules gather where the field bends hardest. Watch only."
