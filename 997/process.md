# No.997 — No Extant Tools

Study #122 satoshi-horii, PP158 "From Scratch": the render pipeline itself as the artwork. No frameworks, no fake terminal: four visible stages, and the signal really flows through all of them.

## Concept

A dark console holds four stacked bands: INPUT, RULES, GEOMETRY, FEEDBACK, each tagged in tiny gray mono (the only text in the piece besides the title, per the prompt). A jittery cyan signal enters at the top, is bent by three hand-drawn rule blocks (quantize, delay, fold), becomes a yellow jointed creature, and the creature's history is mixed back into the input as magenta echoes, so the loop visibly closes: after the first seconds the INPUT line itself carries a magenta undertow. Occasionally a stage glitches, briefly: a block flickers white, the creature freezes mid-pose, the input line tears.

## Construction

- Signal model: 128 samples per band, all pure functions of piece time t and a seeded parameter set (mulberry32). Raw input = value noise (deterministic lattice hash) plus a sine and a fine noise layer, clamped to [-1, 1].
- Feedback, honestly wired: echo(i, t) = 0.30 x the ruled signal evaluated at t - 3.0 s. The effective input is raw + echo once t > 3.2 s, and the echo component is also drawn on its own in magenta under the INPUT line, so the visitor can see exactly what the loop is adding.
- RULES: the waveform is drawn in four segments through three blocks. Stage functions are applied for real: quantize rounds to P.qSteps levels (the line visibly steps after block one), delay resamples the quantized stream P.delay samples back, fold mirrors the value at the ±P.fold ceiling. Each block carries a shape glyph (steps / shifted echo / mirrored peak), never a word.
- GEOMETRY: a seven-joint chain whose link angles accumulate ruled-signal probes at seven sample indices, plus two side limbs driven by other probes. The root drifts with two more probes and clamps inside the band, so at extremes the creature presses against its band edges.
- FEEDBACK band: the effective input in cyan over two magenta ghosts of the ruled signal at t - 2.2 s and t - 4.4 s (alpha 0.40 / 0.20): the geometry's own past, riding under the present.
- Glitches: a seeded schedule (first at 19.3 s, then every 17-29 s, 0.4 s each). During a glitch one rule block flickers white at 30 Hz, the creature's pose time freezes at the glitch start, and the INPUT waveform tears (samples 40-63 offset by 4 px).
- Interaction: tap a band to solo it for 10 s (expanded full-height; in RULES solo each block also draws its transfer curve inside itself). Drag across a rule block rewrites its parameter live (quantize levels 2-10, delay 0-24 samples, fold ceiling 0.25-0.95) and everything downstream bends immediately. Double-tap reseeds the whole pipeline.
- Audio: lazy, created on first pointer interaction, fully typeof-guarded and wrapped in try/catch. Simplified per the brief: a quiet band-passed noise bed (the raw input/rules voice), a triangle melodic line whose pitch tracks the creature's drive probe, and that line returned through a feedback delay (the FEEDBACK stage made audible).
- Determinism: frame one is the synchronous draw at fixed T0 = 9 s; the rAF loop (typeof-guarded) continues from that offset. No Date.now, no gradients, no shadowBlur, no ctx.filter, no offscreen canvas. Canvas size comes from the Visual Viewport API with resize listeners on both visualViewport and window; draw() pins canvas.style.width/height in px every frame. Phone detection uses window.screen's smaller dimension (< 700 px), with the h > w x 1.15 aspect rule only as fallback when screen metrics are absent. Page ground is the console tone; the four-band stack is kept on phones with thinner bands and smaller tags.

## QA log

- Rendered with the house node-canvas renderer at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). Script runs clean in silence (no AudioContext in the harness; all audio paths guarded).
- Determinism: thumb.png rendered twice and compared with cmp: byte-identical. Duplicate deleted.
- Desktop read-back: tags INPUT / RULES / GEOMETRY / FEEDBACK legible at left; INPUT shows the smooth cyan waveform with the flatter magenta echo under it; RULES threads the waveform through three gray blocks with glyphs, stepped after the quantize block; GEOMETRY holds the yellow jointed creature mid-pose with head dot and limbs; FEEDBACK shows cyan over two stepped magenta echo layers; connectors with arrowheads carry the eye down the stack.
- Mobile read-back: same system compressed; all four bands and tags legible, blocks and glyphs whole, creature inside its band, nothing clipped.
- Deviations: (1) The audio is the brief-sanctioned simplification (noise bed + melodic line + delayed echo) rather than four distinct per-stage voices. (2) The feedback echo is sourced from the ruled signal computed off the raw input (first-order), not from a recursively fed output; a fully recursive loop has no closed form, and this keeps every frame a pure function of t while the loop still genuinely alters the input, the rules, and the creature. (3) Solo mode hides the other bands' tags rather than shrinking them, so the soloed machinery gets the full frame height the prompt asks for.
