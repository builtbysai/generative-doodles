# №447 Radiant Still Life — process

## Concept
Per BATCH-446-448-SPEC.md (EXPANSION #51, maite-leon, prompt 7): her SPRITZ energy, kept calm. A single orange cocktail glass (martini coupe) centered on a turquoise paper-grain ground, behind it a field of dashed radiating light lines, twenty soft bokeh orbs drifting around it, and one calm eye watching from the top center. Calm, never creepy, no psychedelic overload: orbs soft and few, ground readable.

## Construction
- Self-contained single index.html, canvas 2D only, no external assets, no text or hint UI anywhere in the piece, no click action of any kind.
- House rules: Visual Viewport sizing with resize listeners on visualViewport and window; canvas.style.width/height pinned in draw() every frame; phone detection via window.screen min dimension < 700px with aspect fallback (centered-subject composition, so the subject keeps its shape and the page ground is the piece's own #1E8A9B at all sizes); one synchronous frame at load at a constant phase (PHASE0 = 1.5s, never Date.now()); rAF guarded by a typeof check; no offscreen canvases, no document.createElement, single script block.
- Ground #1E8A9B with a soft radial lift plus 900 seeded paper-grain dots drawn directly each frame.
- Exactly 24 dashed rays (#3AA6A0, seeded angles/lengths/dash patterns) emanating from behind the glass, rotating 2 degrees per 10s.
- Glass 60% of min-dimension height, centered: orange #E2571B coupe bowl with dark #7A2E0E shading wedge, stem and foot, white gloss highlight, rim line.
- Exactly 20 bokeh orbs (seeded positions, diameters 8-60px at 720 scale, palette #E94F7A / #F5D90A / #7FE0D4 / #B48AE0 / #F2F2F2) drawn as radial-gradient circles with alpha layering, no blend modes; 10 behind the glass, 10 in front so some overlap it; each drifts on a slow independent lissajous orbit.
- Eye 12% width at top center: white #F5F0E6, iris #2E6B4A, dark pupil, white glint, lid line. Blink every 9s: a 0.5s smooth scaleY collapse (brief, calm); eye is open in the first frame.
- Interaction: drag stirs the orb field (pointer velocity accumulates a stir offset, clamped, decaying 0.94 per frame so orbs spring back to their orbits on release). Watch-only ambient mode with no pointer. Never click-to-reload.

## QA log
- Rendered from the actual script with node ~/workspace/tools/render-piece.js.
- Thumb 720x720 rendered twice: both byte-identical, sha256 57f1794a2aa05be2ecc26fdde4f82db6691bd15bf31f802d062be43fd7a8adea (both runs).
- Desktop 1280x900 inspected: glass centered, 24 dashed rays radiating from behind the glass, eye top center open and calm, orbs soft and readable, several overlapping the glass edge. Correct.
- Mobile 390x844 inspected: subject keeps its shape, ground fills the frame, eye top center, glass centered with rays and orbs legible at the smaller size. Correct.
- Thumb 720x720 inspected: same composition, correct.
- No spec deviations. Nothing pushed, no repo touched, pieces.json untouched, per the build brief.
