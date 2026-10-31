# №590 — Río y Llanto

EXPANSION #71 julia-barata, prompt block 6, "La Joya es la Contradicción".

## Concept

Barata's jewel: "para mí la joya es la contradicción." One large central figure holds a feeling and its opposite at the same time: laughing with X-eyes and a wide open mouth while ink tears stream down both cheeks. The humor register (the "jajaja" speech bubble, motion lines, a bouncing rubber duck at the figure's feet, the flung-up arm) and the pain register (the tears, a red wound-shape on the chest with red drips, a diluted-ink wash pooling behind the body) are interwoven on the same body, never split into halves. No explanatory text, no moral: absurd and tender. The only words in the piece are the joke bubble and the small "drag · tap" hint.

Palette, strict: ink #1A1A1A, paper #FAF7F0, flat red #D42B1E. Red is spent only where the prompt puts the pain: the wound shape, its drips, and one accent droplet in each tear stream.

## Construction

Single self-contained canvas piece in a 1000×1000 unit stage, fitted with min(W,H) and centered, so the figure keeps its scale on phones. Viewport sizing follows the house rules (Visual Viewport API with resize listeners on both visualViewport and window; canvas CSS size pinned in px inside draw() every frame; phone detection via window.screen min dimension < 700 with the h > w*1.15 aspect fallback only; page ground is the paper color).

The contradiction engine: two registers, humor and dolor, driven by one balance value h.

- Off the tap beat, dolor = 1 − h and h is hard-clamped to [0.25, 0.75], so min(humor, dolor) ≥ 0.25 at all times: the opposite register can thin (fewer, fainter tears; a smaller duck bounce) but never disappears.
- Vertical drag moves h directly (up = humor leads, down = dolor leads), still inside the [0.25, 0.75] clamp while dragging.
- On release, the resting point is clamped again into [0.3, 0.7] and the balance eases back to it: it settles at a contradiction, never at an extreme.
- Watch-only, the balance sways slowly (±0.05 sine) around the resting point.
- Tap on the figure fires a 0.8 s beat in which both registers pin to 1 at once: full laugh AND full cry, with a fast shoulder shake, then it settles back to the resting balance.

Register mappings: tear stream length, droplet size and streak alpha scale with dolor; the wound radius and alpha and its drip lengths scale with dolor; the wash alpha scales with dolor; the duck's bounce height and rate, the motion-line length and alpha, the bubble scale and alpha, the mouth's openness and the arm wave scale with humor. The mouth never stops laughing and the tears never fully stop: at h = 0.75 the tear alpha floor is still 0.30 with the streaks visible.

Determinism: all marks that could jitter (wash blobs, head-outline wobble ring, hair strokes, tear offsets, motion lines) are precomputed once from mulberry32 streams with fixed seeds. Frame one is drawn synchronously at PHASE0 = 0 with h = 0.5, the centered contradiction. The animation loop is typeof-guarded requestAnimationFrame anchored as PHASE0 + elapsed since load; performance.now measures elapsed only and Date.now is never used. No offscreen canvas, no ctx.filter (the wash is precomputed translucent ink ellipses drawn directly), no document.createElement, no AudioContext, no microphone, no audio.

## QA log

- Rendered with ~/workspace/tools/render-piece.js: qa-desktop.png (1280×900), qa-mobile.png (390×844), thumb.png (720×720).
- Determinism gate: thumb.png rendered twice and byte-compared with cmp: identical. Second render deleted.
- Grep checks on index.html: zero Date.now, zero document.createElement, zero AudioContext, zero ctx.filter, zero external URLs, zero em dashes in visible copy.
- Read-backs: desktop and thumb show the full contradiction in one frame: X eyes, open laughing mouth, tear streaks with a red accent droplet, red wound with two drips on the chest, "jajaja" bubble upper left, motion ticks by the head, ink duck at the feet, hint bottom right. Mobile (390 wide) shows the whole stage unclipped, figure at full width scale, bubble and duck legible.
- One fix round during QA: the first wash pass pooled too wide and too dark (a grey backdrop rather than diluted ink), so blob spread, radii and base alpha were reduced and the alpha curve re-weighted toward dolor; tear droplet base size was raised so the streams read at thumbnail size. Re-rendered and re-verified after the fix, determinism gate re-passed.

## Deviations

- The rubber duck is drawn in ink and paper only, not yellow. The palette is strict (three colors) and the prompt reserves red for the pain register, so the duck gets no color of its own; its absurdity carries by placement and bounce instead. Reason: palette discipline outranks the literal rubber-duck yellow, which the prompt never names.
- The "heavy wash" is rendered as layered translucent ink ellipses (precomputed blob data) rather than brushed stroke texture, because the QA renderer has no ctx.filter and house rules require texture as precomputed data drawn directly. It still thickens visibly as dolor leads.
- Bubble text uses a casual font stack ('Segoe Print', 'Comic Sans MS', 'Chalkboard SE', cursive) with a slight rotation for the hand-lettered read; systems without those fonts fall back to cursive/sans. No other text exists in the piece beyond the hint.
