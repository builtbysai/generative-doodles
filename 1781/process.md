# №1781 PP1028 (SV6) "Whether There Was a Bell", 2006 · 11 · 27

EXPANSION #233 stephen-vitiello, SV6 of 8. Built per BATCH-1781-1783-SPEC.md.
Template: live №1780 (Self-Playing Pendulum), fetched fresh 2026-11-14.

## What it is
A charcoal field holds 18 warm white speaker nodes in an irregular constellation
across the upper two-thirds. Six voice packets (2 muted amber, 2 muted teal,
2 muted rose) drift node to node along bowed paths, leaving fading trails.
Each reading lasts 90 seconds; then the chance algorithm re-deals the routes
and the plotter starts a fresh strip. Along the bottom, a paper strip carries
the cumulative ink score: every packet's actual travelled path, mapped into
the strip, with a thin plotter arm hanging from a rail to each packet's pen.
Watch-only; no click-to-reload. No text or subtitles in the artwork beyond
the standard title/date/hint plates.

## Frame one
Fixed phase at t = 60 s: reading 0, 60 s in. All six packets are mid-route
on leg 4 of 8, with four completed legs of trail behind each, and the paper
strip is partly drawn from the paths actually travelled in the first 60 s.
No pointer is present; the piece is watch-only.

## Node table (fractions of the field; y 0.08 to 0.62, strip top at 0.74)
| # | x | y | # | x | y | # | x | y |
|---|---|---|---|---|---|---|---|---|
| 0 | 0.10 | 0.15 | 6 | 0.87 | 0.16 | 12 | 0.30 | 0.40 |
| 1 | 0.23 | 0.08 | 7 | 0.93 | 0.30 | 13 | 0.16 | 0.32 |
| 2 | 0.36 | 0.18 | 8 | 0.81 | 0.32 | 14 | 0.09 | 0.50 |
| 3 | 0.48 | 0.09 | 9 | 0.68 | 0.27 | 15 | 0.27 | 0.60 |
| 4 | 0.62 | 0.17 | 10 | 0.56 | 0.38 | 16 | 0.50 | 0.62 |
| 5 | 0.74 | 0.08 | 11 | 0.43 | 0.31 | 17 | 0.73 | 0.58 |

## Route table, reading 0 (node indices into the table above; leg seconds)
| Packet | Colour | Nodes | Legs (s) | Total |
|---|---|---|---|---|
| P0 | amber | 1, 4, 9, 12, 15, 11, 5, 8, 3 | 12, 11, 13, 12, 14, 11, 13, 12 | 98 |
| P1 | amber | 6, 8, 10, 13, 14, 16, 17, 7, 2 | 11, 13, 12, 14, 11, 13, 12, 12 | 98 |
| P2 | teal | 0, 2, 5, 9, 14, 15, 17, 11, 4 | 13, 12, 14, 11, 13, 12, 14, 12 | 101 |
| P3 | teal | 7, 6, 3, 1, 0, 12, 16, 17, 8 | 12, 13, 11, 14, 12, 13, 12, 12 | 99 |
| P4 | rose | 3, 5, 8, 13, 10, 15, 17, 12, 1 | 12, 14, 11, 13, 12, 14, 13, 12 | 101 |
| P5 | rose | 4, 7, 9, 11, 14, 16, 13, 2, 5 | 13, 11, 14, 12, 13, 12, 14, 13 | 102 |

Readings 1 and up are re-dealt by a fixed seeded generator (mulberry32,
seed 7919 + reading * 131 + packet * 17): 9 nodes, 8 legs of 11-14 s each,
no immediate repeats. No Math.random() runs at load or during a reading;
frame one is byte-comparable.

## Packet positions at t = 60 s (field fractions; all on leg 4)
| Packet | Leg | From -> to | u | Position (x, y) |
|---|---|---|---|---|
| P0 amber | 4 | 15 -> 11 | 0.857 | (0.423, 0.327) |
| P1 amber | 4 | 14 -> 16 | 0.909 | (0.491, 0.616) |
| P2 teal | 4 | 14 -> 15 | 0.769 | (0.244, 0.590) |
| P3 teal | 4 | 0 -> 12 | 0.833 | (0.288, 0.379) |
| P4 rose | 4 | 10 -> 15 | 0.833 | (0.289, 0.581) |
| P5 rose | 4 | 14 -> 16 | 0.769 | (0.447, 0.596) |

## Plotter pen positions at t = 60 s (field fractions, strip coordinates)
Strip rect: x 0.03-0.97 of field width, y 0.74-0.96 of field height.
| Packet | Pen (x, y) |
|---|---|
| P0 amber | (0.428, 0.843) |
| P1 amber | (0.492, 0.918) |
| P2 teal | (0.259, 0.911) |
| P3 teal | (0.301, 0.856) |
| P4 rose | (0.302, 0.909) |
| P5 rose | (0.450, 0.912) |

Each pen hangs from the strip's top rail on a thin ink arm; the ink score
under it is the same travelled path the packet drew in the field, mapped
into the strip (node y 0.05-0.66 compressed to strip y 0.14-0.86).

## Deviations from the prompt
- No second canvas and no sprites, per the spec's adaptation flag: the
  plotter strip is a region of the main canvas, packets are closed-form
  functions of piece time on fixed authored routes, and each reading's
  re-deal comes from the fixed seeded route table above.
- Audio is optional and gesture-only: a pointerdown plays one soft airy
  noise burst (band-passed, low gain). The piece is watch-only and works
  fully muted; no autoplay, no voice synthesis.
- The hint plate sits top-right instead of bottom-left (as in the №1780
  template) so it never covers the paper score at the bottom of the field.
- Legs bow sideways by a fixed per-leg amount (alternating sign, 4.5% of
  leg length) so routes read as drifted paths rather than ruler lines.

## Title check
"Whether There Was a Bell" checked against live pieces.json (git blob API,
sha 85bbecb984c3775bda3b131de4ea8b6f7183d80a, 1,981 entries, 2026-11-14):
no verbatim-title collision. Ship verbatim.

## QA
Rendered with node ~/workspace/tools/render-piece.js from the actual script.
- Desktop 1280x900: charcoal field, 18 warm white nodes in an irregular
  constellation, amber/teal/rose trails crossing the field, six packet heads
  visible (four clustered low, two mid-field), paper strip along the bottom
  with a partly drawn ink score, ledger rules, rail, and six pen arms.
  Title plate top-left, "Watch only." plate top-right. No overlap of plates
  with nodes.
- Mobile 390x844: full-bleed field, same composition, plates fit, strip
  legible, no clipping.
- Thumb 720x720: same as desktop at square size; this render IS thumb.png.
- Determinism: desktop render repeated, md5 identical
  (70240160ebbf3af1c8543f4fd5397be2).
- No Date.now() in the script; the only Math.random() calls are inside the
  pointerdown noise-burst handler and never affect frame one. No em dashes
  in visible copy. requestAnimationFrame guarded with a typeof check;
  one synchronous frame draws at load.

## Gallery note
"Eighteen speaker nodes re-deal their voice routes every ninety seconds; a plotter scores each pass in ink. Watch only."
