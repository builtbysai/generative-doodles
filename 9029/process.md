# №9029 · Proved Unison — process notes

## Seed
262 "Proved Unison" (from the Tenney Spectral CANON study).

## Concept
A visual canon: 24 streams enter on the closed-form schedule entry_j = K·log2(j),
each accelerating on its own curve, and all 24 land at the right edge at exactly
the same instant. The synchronism is exact by construction, not staged: every
stream maps its entry time to x=0 and the cycle end to x=W, so the unison is
proved by the equation. New streams bloom in at their entry tick; at the landing
the piece flashes a radiant chord and holds the word UNISON before re-seeding
with a fresh palette and acceleration exponent.

## Technique
Raw canvas 2D, requestAnimationFrame. Seeded RNG (mulberry32, ?seed= supported).
Per-stream phase = ((t - e_j)/(C - e_j))^gamma, gamma seeded 1.9-3.0. Trails are
short per-stream polylines with quadratic alpha falloff; heads drawn with
shadowBlur bloom. Click re-seeds.
