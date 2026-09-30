# №8957 — Hover (2026-07-20)

Seed 256 (Threshold Hover).

Concept: marks at the visibility boundary on a low drone-like ground.
About a thousand short curved ticks, clustered in soft drifts over large
barely-there tonal blotches. Each mark breathes in and out of visibility
on its own slow rhythm, so the eye flips between reading figure and
reading field, and the flip is the piece. The pointer is a steady hand:
marks near it gain contrast and hold still. Tap for a new field.

Technique: raw canvas 2D. Marks follow a slow orientation field;
alpha = base + amp*sin(t*speed+phase) keeps each mark hovering near
threshold; pointer proximity adds a gaussian contrast boost. Drone ground
is drifting radial-gradient blotches at 5-10% alpha.

QA: rendered and inspected at 1280x800 and 390x844; zero console/page
errors via cdp_exceptions.py at both viewports.
