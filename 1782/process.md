# No.1782 Singing Amongst the Weeds (SV7, PP1029)

Completes EXPANSION #233 stephen-vitiello with No.1781 and No.1783. Gallery date: 2006 · 11 · 28.
Gallery note: "Bright pulses travel milkweed stems as the temperature drifts from cool blue to warm amber chapters. Watch only."

## Build

Canvas 2D only, no WebGL, no DOM text, no animation loop state.
Template: live No.1780 index.html, fetched fresh at build (the 2026-11-14 18:45 run's staged copy, verified live as Self-Playing Pendulum).

- Macro milkweed field filling the frame: deep leaf-green ground (#14231a page, #1c3020 to #0f1c10 gradient in-field) with five large out-of-focus leaf masses and faint pale bokeh flecks for shallow depth of field. Field-like composition: square field centred on desktop, full-bleed on phones, page ground set to the piece's own green.
- Six stems as cubic beziers crossing diagonally, each drawn as three strokes (dark under-stroke #24401f, mid green #4a6b35, thin light edge rgba(139,171,102,0.55)) with small green buds at u = 0.22, 0.45, 0.68, 0.86.
- Eight blossom clusters in soft pink-white, drawn only as layered radial washes plus tiny soft dots with pale amber centres, no hard edges, so they stay soft at the frame edges. No drawn petals, no insects.
- Palette hand-picked from the prompt's named colors: leaf green, blossom pink-white (#f3e2e6), cool chapter blue, warm amber, near-white pulse points (#fbf8ef). No study file exists for stephen-vitiello, so no study hexes were available to copy.
- Pulses: near-white cores with a soft glow, a short fading trail, and a small expanding ripple ring (radius 0.012 to 0.036 of the field side, alpha fading 0.35 to 0). Births are fixed authored events from the chapter table, never Math.random at runtime.
- Chapters: four 240 second chapters on a 960 second cycle, grade lerped over 30 seconds at each boundary. The temperature caption is drawn on canvas in a small plate at bottom right and announces the current chapter.
- Interaction: watch-only. A tap does nothing visible and never reloads; a pointerdown starts one very quiet high tick (2400 Hz sine, gain 0.015, 0.25 s) lazily inside the gesture. The piece works fully muted and never autoplays audio.
- Frame one: fixed phase t = 60 s, chapter I cool blue, warmth 0.000, temperature 14 degrees, 8 pulses alive mid-stem.

## Chapter table

| Chapter | Time (s) | Name | Temp | Pulse period | Pulse travel | Warmth |
|---|---|---|---|---|---|---|
| I | 0-240 | cool blue | 14 deg | 14 s | 18 s | 0.00 |
| II | 240-480 | warming | 19 deg | 9 s | 14 s | 0.45 |
| III | 480-720 | amber | 26 deg | 4 s | 11 s | 1.00 |
| IV | 720-960 | cooling | 18 deg | 11 s | 16 s | 0.35 |

Warmth and shown temperature lerp with a smoothstep over the first 30 s of each chapter from the previous chapter's values. The cycle repeats every 960 s. Chapter III pairs stems (0,1), (2,3), (4,5) with shared birth offsets for call-and-response bursts.

## Stem paths (fractions of the field, cubic p0/c1/c2/p1)

- S0: (-0.05, 0.88) / (0.18, 0.55) / (0.32, 0.30) / (0.55, -0.05)
- S1: (0.12, 1.05) / (0.30, 0.72) / (0.48, 0.40) / (0.72, 0.02)
- S2: (0.42, 1.04) / (0.60, 0.78) / (0.78, 0.58) / (1.05, 0.32)
- S3: (-0.05, 0.42) / (0.22, 0.55) / (0.40, 0.72) / (0.62, 0.98)
- S4: (0.28, -0.05) / (0.42, 0.22) / (0.60, 0.42) / (0.92, 0.58)
- S5: (0.06, 0.12) / (0.18, 0.42) / (0.30, 0.68) / (0.48, 1.05)

Blossom clusters at the end of S0, S1, S2, S4, S3, plus mid-stem clusters at S1 u = 0.55, S5 u = 0.62, S0 u = 0.30.

## Pulse schedule at frame one (t = 60 s, chapter I, period 14 s, travel 18 s)

Birth offsets per stem in chapter I: [2, 6, 10, 4, 8, 12] seconds. Pulses alive at t = 60 s, 8 total:

| Stem | Birth (s) | Age (s) | u along stem |
|---|---|---|---|
| S0 | 44 | 16 | 0.89 |
| S0 | 58 | 2 | 0.11 |
| S1 | 48 | 12 | 0.67 |
| S2 | 52 | 8 | 0.44 |
| S3 | 46 | 14 | 0.78 |
| S3 | 60 | 0 | 0.00 |
| S4 | 50 | 10 | 0.56 |
| S5 | 54 | 6 | 0.33 |

Verified by probe: t = 60 gives chapter 0, warmth 0.000, 8 pulses at exactly these positions; t = 300 gives chapter 1, warmth 0.450, 10 pulses; t = 500 gives chapter 2, warmth 0.857 (mid-transition), 18 pulses with paired stems sharing u values (call-and-response); t = 800 gives chapter 3, warmth 0.350, 10 pulses.

## Deviations and interpretations

- The prompt calls for a DOM temperature caption and a background temperature grade lerped over long timescales. Per the spec adaptation flag, the caption is drawn on canvas in a plate at bottom right, and the grade is a closed-form function of piece time from the fixed chapter table, so frame one stays byte-comparable.
- The prompt's "chance" pulse patterning is replaced by the fixed authored chapter table: pulse births, rate and density per chapter come from the table, not Math.random at runtime. The pattern still differs per chapter (sparse slow in cool blue, dense paired bursts in amber).
- The first draft drew blossoms as star florets with four-stroke petals; they read as crisp asterisk scribbles, too literal against the soft macro look. Replaced with soft radial washes plus tiny soft dots only.
- The first draft's pulse rings were too large (radius to 0.062 of the field side) and too many: a previous-cycle bug counted chapter IV births past the cycle boundary, giving 14 pulses at frame one. Fixed the boundary cap (births stop at the chapter end) and shrank the rings to 0.036 maximum radius with lower alpha. Frame one now has exactly the 8 authored pulses.
- Reduced motion: the animation loop does not start, so the piece rests at the fixed frame one.

## House rules

Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned in draw() via style.width/height in px; phone detection via window.screen (min dimension under 700 px) with aspect fallback (h > w * 1.15); field-like composition, square field on desktop and full-bleed on phones, with the page ground set to the piece's own deep green and the hint ink pale to match; one synchronous frame at load; requestAnimationFrame guarded with a typeof check; deterministic fixed-phase first frame with no Date.now or Math.random anywhere in the script; watch-only, never click-to-reload; no AI-signature copy; no em dashes anywhere in this file.

## Title check

Checked against live pieces.json fetched via the git blob API (1,981 entries, sha 85bbecb984c3775bda3b131de4ea8b6f7183d80a): no existing entry titled "Singing Amongst the Weeds". No collision; shipped verbatim per the spec.

## QA

Rendered from the actual script with node ~/workspace/tools/render-piece.js:

- Desktop 1280x900: deep green macro field, six diagonal stems crossing the square field, eight small near-white pulses with faint rings mid-stem, soft pink-white blossom clusters at the stem ends and edges, title plate "Singing Amongst the Weeds / 2006 · 11 · 28" top left, "Watch only." bottom left, "chapter I · cool blue · 14°" bottom right. All plates fully legible, nothing clipped.
- Mobile 390x844: full-bleed vertical composition, same stems, pulses and blossoms, plates legible, caption plate clear of the hint plate. Blossoms at the frame edges are softly cut, as specced.
- Thumb 720x720: same composition as desktop, stems and pulses readable at small size. This render is thumb.png.

Fix round: blossom florets softened from drawn petals to dots; pulse rings shrunk and previous-cycle birth bug fixed (14 pulses down to the authored 8 at frame one); chapter-boundary birth cap added after the probe showed ghost pulses from earlier chapters bleeding into later ones (37 pulses at t = 500, now the authored 18). All three sizes re-rendered and re-inspected after the fix.
