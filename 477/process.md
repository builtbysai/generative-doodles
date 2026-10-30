# No.477 Fire, Rain

EXPANSION #57 julandthefox (Giulia Neri), prompt GN5. Sometimes we must be fire, sometimes we must be rain.

## Concept

Two simplified closed-eye figures stand facing each other on a flat dusty-blue field. The left figure wears rain: a cream dress scattered with blue raindrops. The right figure wears fire: a dark dress whose lower half is wreathed in stylized red and orange flame tongues. Neither face changes. The drawing happens at the boundary: drag either figure toward the other and, where they come close, the patterns cross. Raindrops appear inside the flame area; flame tongues lick onto the cream dress. Pull them apart and the borrowed patterns only slowly fade back. The contact is the piece.

## Construction

Single self-contained index.html, canvas 2D, no external assets, no audio.

- Palette, the prompt colors only: ground #7FA8B8, cream #F2EDE0, skin #EBC9A8, raindrop blue #5B8CB0, flame red #D61F26, flame orange #E8912D, hair and dark dress #3B2A24. Ground shadows and grain are those same hues at low alpha, so no extra color appears.
- Canvas sizing follows the Visual Viewport API with resize listeners on visualViewport and window; draw() pins canvas.style.width/height in px every frame. Phone detection uses window.screen (min dimension < 700), aspect h > w*1.15 as fallback only. The page ground is the dusty blue.
- Figures: one shared geometry, a slim A-line dress (half-width growing from 0.105 to 0.170 of figure height, shoulder to hem), a dark bob of hair, a skin-toned face (#EBC9A8) turned slightly toward the other figure, a straight fringe, and two short closed-eye arcs. Arms rest along the dress sides, tucked flush with the silhouette. Figure height is 55% of frame height on desktop; figures stand about 35% and 65% across, top third of the frame empty.
- Patterns are JS data, redrawn every frame and clipped to the dress path. Raindrops are seeded teardrop sprites scattered over the cream dress (position stored as a fraction of the local dress width, so the pattern hugs the A-line). Flames are seeded tongues along the fire figure's hem, each drawn as two layered wavy teardrops, red outer and orange inner, flickering on elapsed time (tip lean and height on per-sprite sine phases).
- Contact blend: a contact value is computed from the gap between the figures' hems. Near the shared edge, each figure carries a second seeded sprite set of the other figure's pattern: small flame tongues on the rain figure's right side, raindrops inside the fire figure's flame zone on its left. Their alpha scales with contact and with depth into the strip, so the bleed is mutual and graded, never a hard swap. Contact eases in at 0.07 per frame and out at 0.03, so patterns revert slowly when the figures are pulled apart.
- Interaction: pointerdown near a figure grabs it; it eases horizontally after the pointer, clamped to the frame and to a minimum separation so the figures can press close but never pass through each other. A double tap (or dblclick) reseeds: the seed advances and all four sprite sets regenerate with a slightly varied density. No click-to-reload anywhere. The only text is a quiet lowercase "drag" in the lower-left corner, cream at 0.5 alpha.
- Grain: a precomputed seeded dot array (mulberry32, seed 9777), alternating cream and hair-brown dots at 0.03 to 0.065 alpha, drawn identically every frame over the whole picture.
- Determinism: the first frame is drawn synchronously at load in a constant state: figures at home, apart, patterns pure, flames at phase zero. Home positions are computed from the figure size so the hems start a clear bleed-range apart on any aspect, never mid-bleed. requestAnimationFrame is typeof-guarded; the piece renders fully with no rAF, no AudioContext, no document.createElement, no offscreen canvas.

## QA log

Rendered with node ~/workspace/tools/render-piece.js (node-canvas) at three sizes:

- qa-desktop.png (1280x900): two closed-eye figures read clearly, facing each other across a center gap. Rain figure cream with blue drops over the whole dress; fire figure dark above, wreathed in red and orange tongues across its lower half. Top third empty dusty blue. Hint "drag" subtle in the corner. Nothing clipped.
- thumb.png (720x720): same read at thumbnail size; drops, flames, faces and closed eyes all still legible. Rendered twice and byte-compared with cmp: identical. Second render deleted.
- qa-mobile.png (390x844): portrait layout holds; figures stand at the left and right thirds with the gap between them, patterns pure, flames contained to the lower half, hint visible, nothing clipped.

Iterations: the first arm build ended outside the dress silhouette and read as side bumps; the arm endpoints were tucked inside the dress edge so the arms rest flush. A later pass corrected the faces and necks from cream to the specified skin tone #EBC9A8 and lengthened the flame tongues (0.19 to 0.40 of figure height) so the fire clearly fills the lower half of its dress. All renders were regenerated and determinism re-verified after each change; the final thumb byte-compare passed.

Deviations from the prompt, recorded:

- Faces and necks use the study skin tone #EBC9A8 exactly as specified in the brief palette, distinct from the cream dress so the closed eyes read against both hair and dress.
- On phones the figure height scales from the short side (0.95 of it) instead of 55% of frame height, and home positions are computed from figure size so the pair always loads apart with pure patterns. On desktop the homes land at the specified 35% and 65%; on a tall phone they sit wider apart, which the narrower frame requires to keep both figures whole and separated.
- Flame flicker runs on elapsed time since load; the synchronous first frame is drawn at flicker phase zero, so the load frame is constant and the determinism gate holds.
