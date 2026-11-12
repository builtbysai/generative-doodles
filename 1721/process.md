# №1721 Rose Wind  -  process notes

Driver: a few slow drifting vortices are the weather; streamlines advected through them bunch into ridges and thin into calm lanes; drag stirs a local vortex.

## Spec
- Title: Rose Wind. Study: zach-bodtorf (EXPANSION #226, PP968/ZB2). Gallery date: 2006 · 09 · 28 (formula 2002-01-10 + 1722 days).
- Visual: dense red/yellow streamlines advected continuously over a dusty-rose band on cream; the field morphs slowly as if weather systems pass through the frame; lines bunch into ridges and thin into calm lanes.
- Composition: horizontal band across the middle third, generous calm cream above and below.
- Interaction: drag to disturb the wind (drag stirs a local vortex); otherwise the wind morphs on its own.

## Acceptance criteria (numbers)
- Vortices: 5, drifting on closed-form Lissajous paths, strengths alternating +/- (0.55 to 1.25), radii 0.11 to 0.21 of stage width.
- Streamlines: 110, re-integrated every frame from fixed seeds (62% clustered around 4 seeded cluster centres, 10% faint margin wisps); length 40 to 200 integration steps (band lines), margin wisps capped at 26 steps at 22% alpha.
- Morph period: 24 s; frame-one phase t = 3.0 s.
- Drag: pointerdown sets a local vortex of strength 2.4 at the pointer; dragging raises it to at most 2.6; on release it decays with a 1.5 s time constant. Drag vortex is 0 at frame one.
- Frame one is deterministic: seeded PRNG mulberry32(1721), fixed phase t = 3.0 s, no Math.random and no wall clock in frame one. Two renders of the same size are byte-identical.

## Palette (hexes hand-picked from the prompt's named colors)
- Ground cream: #F4EDDF
- Dusty-rose band: #DCA9A2 (top) / #C98A8A (mid) / #D6A39C (bottom), feathered into the cream at both edges
- Streamlines: crimson #A4161A, #C1272D, deep crimson #7F0E14; amber #E08A1E, golden yellow #F2B705, burnt amber #D96C2B
- Plates: dark rose-brown #2B1A1A, line rgba(214,140,120,0.55), title ink #F4EDDF, hint ink #E9A86A

## Technical
- Canvas 2D only, self-contained index.html. Vector field: eastward base flow plus swirl from the 5 drifting vortices plus a slow sinusoidal weather sway; streamlines integrated forward with normalized steps.
- House rules: Visual Viewport sizing with resize listeners on both visualViewport and window; canvas pinned in draw() via canvas.style.width/height in px; phone detection via window.screen (min dimension under 700 px) with aspect fallback (h > w * 1.15); field-like composition, full-bleed on phones, square on desktop; one synchronous frame at load; requestAnimationFrame guarded by typeof check; reduced-motion respected (no loop when reduced); no click-to-reload; no em dashes in visible copy; no autoplay audio (none here); flicker safe by construction (slow 24 s morph, no strobing).
- QA: rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three inspected visually. Two fix rounds: margin wisps shortened and faded, then band streamlines bounded to just outside the band so they stop reading as stray hairs in the calm cream. Final renders pass: band reads as a band, ridges and calm lanes visible, varied streamline lengths, plates not colliding.

## Deviations from the prompt
- Canvas 2D instead of p5.js (node-canvas QA has no p5); the vector-field approach is unchanged.
- No audio-slice modulation: the prompt's "audio-slice modulation" is a sound-model element and this piece has no audio; the slow morph comes from the drifting vortices and the sinusoidal weather sway instead.
- studies/zach-bodtorf.md does not exist in the repo, so palette hexes were hand-picked from the prompt's named colors (dusty rose, crimson, amber, cream) and are recorded above.
- Margin wisps added (10% of streamlines, short and faint) so the calm cream is not entirely empty; band streamlines are bounded to a small zone around the band.
