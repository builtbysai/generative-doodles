# №846 The Red Poncho

- Title: The Red Poncho
- Prompt code: SN8 / PP1246
- Study: #260 syd-nuku
- Gallery date: 2004-05-06, shown as "2004 · 05 · 06"
- Interaction cue: Tap at the fork to choose a path.
- Renumber note: this piece was briefed as №1999 and renumbered to №846 by Hans on 2026-11-23 ("Renumber gallery 1-843"). Built directly as №846; no №1999 files were ever staged.

## What the piece does

A lush green hillside garden fills the whole frame, pale at the top where the light falls and deepening toward the bottom. A pale path runs down through it with stepping stones, and forks once mid-frame into a left branch and a right branch. A small figure in a bright red poncho walks down the path, small against the green, hood up, face a plain pale oval. It walks steadily, pauses at the fork, and then continues down whichever branch the visitor taps. The garden ahead re-seeds along the chosen branch, so the lower garden is a different garden on the left than on the right. After the figure reaches the bottom it stands a moment, fades out, and the walk begins again from the top. The mood stays painterly and fairytale-plain: no dark-fantasy mood, no endless loop without the choice.

## FIRST_T and cycle

- FIRST_T = 8 s, CYCLE = 40 s.
- 0 to 14 s: the figure walks the upper path to the fork, fading in over the first 2 s.
- 14 to 20 s: the figure pauses at the fork. A soft ring breathes around the fork and two pale dots mark the heads of the branches. This is the tap window.
- 20 to 34 s: the figure walks the chosen branch to the bottom.
- 34 to 38 s: the figure stands at the bottom. 38 to 40 s: it fades out. The next cycle fades it back in at the top.
- At t = 8 the figure is a third of the way down the upper path (x about 0.51, y about 0.29), the fork ahead of it, so the first frame shows the walk, the garden, and the choice to come.
- With no tap, the default branch alternates by cycle: even cycles go left, odd cycles go right, so the walk never stalls waiting for input.
- No wall clock or Date enters the animation state. All randomness is seeded (mulberry32, hash1 value noise). The lower garden seed is SEED + 101 for the left branch and SEED + 202 for the right, so the re-seed is deterministic given the chosen branch.

## Interaction

TAP at the fork chooses left or right. During the pause window (14 to 20 s) a tap anywhere left of the fork takes the left branch, anywhere right of it takes the right branch. The figure continues down the chosen path and the garden ahead regenerates on the new branch. A tap outside the pause window is ignored. The hint text changes during the pause to "Tap left or right to choose the path." Never click-to-reload. No audio.

## Technical

- Path graph: three cubic Bezier segments (upper, left branch, right branch) sharing the fork point. Each segment is drawn as a filled ribbon whose half width grows with depth, so the path reads as near at the bottom and far at the top. Stepping stones run down each segment.
- Garden: a vertical gradient plus three rolling hill bands in greens of increasing depth, then trees, bushes, flowers and grass tufts placed by seeded RNG and kept off the path by a distance test against sampled path points. The upper garden uses the base seed; the lower garden is seeded from the chosen branch.
- Figure: procedural walking sprite. Bell poncho in bright red with fold lines and a lighter hem trim, hood and pale face, two dark legs swinging with the walk phase, a soft contact shadow, a gentle bob while walking and an idle sway while paused.
- House rules: Visual Viewport sizing with resize listened to on visualViewport and window, canvas element pinned in draw() via canvas.style.width and height in px, phone detection via window.screen (min dimension under 700px) with aspect fallback (h greater than w times 1.15). Field-like composition: full-bleed on phones, square on desktop. One synchronous frame at load, requestAnimationFrame guarded with a typeof check. prefers-reduced-motion leaves the first frame still. Flicker is far below 14 Hz by construction: the fastest modulation is the fork pulse at about a 2 s period and the walk bob at about 1.1 Hz.

## QA hook

- `?t=<seconds>` or `?seed=<seconds>` sets the virtual clock at load.
- `window.__draw(t)` redraws at a virtual time.
- `window.__piece846` exposes firstT, cycle, figure(t), branch(), tap(nx, ny, t) and redraw(t).

## Deviations from the prompt

None material. The figure's face is a plain pale oval with no features, in keeping with the fairytale-plain register. When no tap is made the walk takes a deterministic default branch that alternates by cycle, so the piece never waits forever for input; the prompt's "walk looping forever without the choice" is avoided because every cycle contains exactly one fork pause and one chosen branch.

## Probes

All renders from the actual script with node ~/workspace/tools/render-piece.js, plus the probe846.js script in the batch folder, which drives the real pointerdown handler and redraws at a virtual time. Times are the ?seed= probe clock.

- render-desktop.png, 1280x900, seed 8: md5 9060f950312ee7cdb485732c53ac9d1d
- render-mobile.png, 390x844, seed 8: md5 bc9c980ca58151007e0328e27270abbf
- thumb.png, 720x720, seed 8: md5 bbb343038ff466799dbeddcf8499c90e
- Thumb determinism: thumb.png rendered twice, both md5 bbb343038ff466799dbeddcf8499c90e, identical.
- probe-t8.png, 1280x900, seed 8: figure at (0.5142, 0.2878), walking, alpha 1. First frame confirmed.
- probe-t16.png, 1280x900, seed 16: md5 3062b1c533ea0417a930eeea742fce9a. Figure at the fork (0.50, 0.52), paused, alpha 1, pulse ring and branch dots visible, hint reads "Tap left or right to choose the path."
- probe-t27-left.png, 1280x900, seed 27, no tap: md5 b83574d8626d17ecd491afbd3c94ed97. Figure at (0.37, 0.7488) on the left branch, walking. The figure advanced from y 0.29 at t = 8 to y 0.75 at t = 27, confirming motion.
- probe-tap-right.png, 1280x900, seed 16, tap at (0.8, 0.5) during the pause, redrawn at 27: md5 c7ba50113c686a934d84ca38a9a73bc6. Branch "right", figure at (0.63, 0.7488) on the right branch, and the lower garden visibly differs from the default-left render, confirming the branch re-seed.
- probe-tap-early.png, 1280x900, seed 8, tap at (0.8, 0.5) outside the pause window, redrawn at 27: md5 4c0256163dc74b853697e5893b496661. Branch stayed "left", figure at (0.37, 0.7488). The early tap was ignored, as specified.
- probe-t36.png, 1280x900, seed 36: figure at the bottom (0.24, 1.03), standing, alpha 1.
- probe-t39.png, 1280x900, seed 39: figure at the bottom, alpha 0.5, fading out before the cycle restarts.
- All three sizes and all probes were visually inspected.

## Fix rounds

- Round 0, first build: garden read well overall, but the hill band edges were too straight and horizontal, reading as stripes, and a few bush blobs touched the path edge.
- Round 1: hill band wobble amplitude raised (0.030 to 0.052) at a lower frequency, bush clearance from the path raised (W times 0.03 to W times 0.05), and the largest bush circles shrunk slightly. Re-gated after the edit: thumb re-rendered twice, both md5 bbb343038ff466799dbeddcf8499c90e, and the tap and motion probes re-run with the same results.

## Known warts

- Where the three path ribbons meet, the fork reads as a slightly flat pale wedge at a glance. It still reads as a fork, and the stepping stones carry the eye through it.
- The figure's legs are two thin dark strokes; at thumb size they are barely more than a line under the poncho.
- On the tall phone stage the green triangle between the two branches is sparse, since garden elements are kept off both branches.
- The cycle restart is a dissolve: the figure fades out at the bottom and fades back in at the top, rather than walking continuously.
- The trees are simple lollipop canopies, deliberately plain, in keeping with the fairytale register.
