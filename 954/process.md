# No.954 "Omnia" (study #117 reas, PP115 "Watercolor to Agents")

## Concept

A small watercolor painting is translated into a score for software agents, after Reas's Omnia Ex Natura. The painting comes first: a soft wash of seeded blooms in muted botanical hues (sage, umber, slate, rose, moss) on paper, pigment pooling darker at each bloom's rim, bare paper at the deckle edge. The wash never changes while it is being read. Two hundred reader agents hatch from the darkest pools and wander the painting, and the wash is their terrain: dark pigment is viscous and slows them to a creep, pale wash lets them hurry. Every half second or so each agent sets down a fine ink dot whose color samples the wash beneath it, darkened toward pool ink. Over minutes a second image accretes on top of the first: an ink-dotted cartography of the watercolor, drawn by the reading itself.

Interaction: a tap rains twelve new readers from the nearest pool; a drag stirs the wash, pressing temporary dark bumps into the terrain that relax away over about a minute while the agents re-route through the changed viscosity; a double-tap washes the ink out and blooms a new painting in over twenty seconds. Sound, on first gesture only: a low paper-and-water noise bed, sparse high ticks sampled from dot deposits (pitch falls as the wash beneath darkens), and a soft low bloom swell when readers hatch.

## Construction

House adaptation (the load-bearing one): the prompt's wash was specified as an offscreen-canvas gradient painting stored as ImageData terrain. That does not survive this gallery's renderer, which has no offscreen canvas and unreliable gradients. The wash here is an ANALYTIC FIELD instead. A painting is 5 to 7 seeded metaball blooms, each with a center, radius, palette hue and strength. A closed-form function `fieldCore(x, y)` returns color, coverage and darkness at any point: interior falloff from each bloom, a gaussian rim ring near each bloom's edge where darkness peaks and the color is pulled toward the pool tone (the pooling), a low value-noise mottle, and a deckle falloff that returns the field to bare paper at the sheet's shore. The renderer samples that function into a precomputed grid of flat cells (cell 6 to 10 px by frame size, each cell averaging a 2x2 sub-sample of the field so neighbours meet softly, cells drawn with a slight overlap). The agents sample the same analytic function directly for their speed, so terrain and image are one function, never two copies. Drag bumps are extra analytic terms added to the same function; the renderer re-evaluates only the cells under live bumps each frame, and the agents feel the bumps through the same sampling. On a painting change the two fields crossfade (the old grid under, the new grid at easing alpha; agent darkness blends both fields during the fade).

- Sim: fixed timestep 120 Hz; frame one is the synchronous draw after exactly 3000 pre-roll steps (25 s). No wall-clock value feeds any drawn state; gesture timing uses `performance.now()` only to tell a tap from a double-tap.
- Agents: 200 on desktop, 140 on phones (recorded deviation, per the brief's allowance). They hatch at pool points precomputed on the bloom rims, trickling in over the first 10 s, live 60 to 140 s each, and are replaced at pools as they die or wander off the sheet. Speed = lerp(30, 6, darkness) px/s scaled by frame size. Steering is smooth seeded value-noise wander plus a gentle pull back inside the shore near the edges.
- Ink: dots are stored data {x, y, r, color, born, generation}, capped at 9,000 (oldest dropped past the cap), living 240 s with a fade across the last minute. A new painting washes the previous generation's dots out over 5 s.
- Paper grain: a seeded static speckle drawn over everything.
- Palette is strict: paper #F5F1E6, the five wash hues, pool #3A4038; ink colors are sampled wash mixed halfway to pool, the one derived family the brief allows.
- Canvas sized from the Visual Viewport API with resize listeners on both visualViewport and window; canvas CSS size pinned in px inside draw() every frame; phone detection via window.screen physical size with the aspect fallback only. No gradients, no shadowBlur, no ctx.filter, no offscreen canvas anywhere (grep-verified zero hits). Audio is lazy, created inside the first pointerdown, and fully typeof/try guarded; the piece renders complete in silence.
- On tall frames the bloom radii stretch by up to 1.5x (factor from aspect, clamped 0.95 to 1.5, recorded deviation) so the painting fills its sheet instead of crowding the top.

Recorded choices and small deviations:
- Rain-hatch readers get shortened lifespans (0.55x) so a tap does not permanently swell the population; a hard cap at target + 40 trims the oldest.
- A single tap's rain is confirmed after a 340 ms settle so a double-tap can pre-empt it and go straight to a new painting.
- Drag bumps only darken (the brief allowed darkening or lightening; darkening is the legible stir, since it visibly slows the readers crossing it).

## QA log

Renderer: `node ~/workspace/tools/render-piece.js` (node-canvas), which paints the single synchronous frame.

- qa-desktop.png (1280x900): paper sheet filled by one continuous wash: sage, slate and rose blooms blending on the left with umber shadows, a large moss bloom on the right with a rose-umber core and a distinctly darker pooled rim ring. Ink dots wander the whole painting in fine dotted trails, denser and darker over the pools, with one trail escaping onto the bare paper at lower right. Deckle shore of plain paper at the edges. Nothing clipped, no text.
- thumb.png (720x720): the same painting squared; rim pooling and the ink cartography read clearly at gallery size.
- qa-mobile.png (390x844): the wash fills the tall sheet to about 85% of its height after the radius-stretch fix (the first mobile render crowded the top half); 140 readers; nothing clipped.
- Fix round 1: the first grid (cells ~9 to 10 px, center-sampled) read as hard mosaic at the rim rings. Cells were shrunk (divisor 95 to 120, clamp 6 to 10) and each cell now averages 2x2 sub-samples of the field; the wash reads soft while staying flat-cell flat.
- Fix round 2: mobile composition (above).
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. Duplicate render deleted.
- Render time: about 0.9 s per size in the harness, pre-roll included.
- Silence: no audio is created without a visitor gesture; all three QA renders completed with no audio context.
