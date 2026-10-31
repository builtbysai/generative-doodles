# No.762 Corner Play

EXPANSION #93 larry-bell, prompt block 3 "Corner Play" (TASKS.md, verified verbatim).

## Concept

Three coated-glass faces meet at one corner and fill the frame edge to edge. There is no object, only the corner. The faces stay pale and ghostly; the corner seam is the star: a luminous line where the coating densities stack, burning gold where the light concentrates and falling to violet at its far ends. It nods to Bell's childhood corner and to the luminous edges of his coated panes. The white gallery context never leaves: no dark mood, no neon, one bright seam only.

## Construction

- Geometry: the corner point sits at the lower-right golden point (0.62W, 0.68H) and never moves. Three seams run from it to the frame: the main diagonal to the top-left corner, a secondary seam to the right edge (0.18H), and a secondary seam to the bottom edge (0.18W). The three seams partition the frame into three polygon faces, like an unfolded cube corner seen from inside.
- Faces: filled with the face field #DCD8CE, each lifted by a different fixed wash of the void tone #F5F3EF so the three planes separate, then tinted with a whisper of gold or violet (alpha 0.03 to 0.06) cycling on slow per-face phases: the faint interference shift of coated glass. Nothing on the faces ever gets louder than that.
- Seam and hotspot: each seam is drawn in 72 segments and three layered passes (wide faint halo, mid glow, thin core), all in palette colors only. Per segment, brightness follows a base profile that is strongest at the corner and decays toward the far end, plus a gaussian hotspot that travels the main seam. Segment color is a lerp from violet #6E6398 at the far ends to gold #D8A848 where the base profile and the hotspot live. The hotspot position is a closed form of the orbit phase: s = 0.5 - 0.5*cos(phase), so it sits at the corner at t=0, rides to the far end at mid-orbit (90 s), and returns by 180 s. A global ignite envelope dims and swells the seams on the same cycle. The secondary seams are drawn first at roughly 40 percent strength as dimmer echoes, with their hotspots trailing the main one. A small gold knot at the corner point swells as the hotspot passes through it.
- Drag: pointer drag records samples into a drag log; the azimuth offset at any time t is a closed-form function of that log (held value while dragging, exponential ease-back with a 2.5 s constant after release). The offset shifts the hotspot positions along the seams. The corner and faces are never dragged.
- Sizing: canvas from the Visual Viewport API with resize listeners on visualViewport and window; canvas style width and height are pinned in px inside draw(). Phone detection via window.screen physical size (min dimension under 700px) with the h > w*1.15 aspect fallback. The corner keeps its proportional golden-point position at every size; the page ground is the void tone.

## QA log

- Renders via render-piece.js: qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png (720x720).
- Determinism: frame one is the synchronous draw at orbit t=0; Date.now is never used. thumb.png rendered twice back to back and cmp compared byte-identical; the duplicate was deleted.
- First pass read back too faint: the seam all but vanished past the corner knot. Raised the seam's baseline intensity and corner-weighted gold mix, and the core pass alpha, then re-rendered all three sizes. Final read-back: three pale faces separating cleanly (warm top and left, cooler lower right), one continuous diagonal seam running gold at the corner knot out to a soft violet at the top-left end, the two secondary seams as faint echoes, nothing clipped on mobile.
- No audio, no microphone, no external assets, no visible text beyond the title.

## Deviations

- None from the prompt's substance. The light orbit, drag azimuth, traveling hotspot, and gold-to-violet seam are all as specced; glow is built from layered alpha strokes at studio scale rather than any bloom filter, per house rendering limits.
