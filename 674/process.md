# №8956 — Retune (2026-07-19)

Seed 257 (Retune the Instrument).

Concept: shift the coordinate system slightly, apply the dumbest rule,
and the output looks exact in a way the rule cannot explain. Two sets of
concentric circles are drawn from centers a few pixels apart, plus a dot
grid in a slightly sheared system. The interference between the layers,
the moire, draws rosettes and hyperbolic fringes that no single layer
contains. Dragging retunes shift and shear live (readout in px and
degrees); left alone, the instrument breathes on its own slow rhythm.
Tap for a new instrument.

Technique: raw canvas 2D, indigo and rust circle layers with a sheared
olive dot grid on paper. Shift and shear ease toward targets each frame.

QA: rendered and inspected at 1280x800 and 390x844; zero console/page
errors via cdp_exceptions.py at both viewports.
