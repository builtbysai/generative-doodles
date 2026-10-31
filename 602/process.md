# No.602 "Five Scenes, One Turn"

EXPANSION #73 paz-tamburrini, prompt block 2 "Libro Calesita". Her carousel book rebuilt as a rotating paper machine: five cut-paper scenes stand as vertical panels around a center spine, and the whole book turns.

## Concept

A calesita (carousel book) is a book that opens into a star and reads by turning. The piece puts that object alone on plain paper, no environment: five scenes in fixed order (hedgehog, bird, seed garden, moon, house) hinged around a center spine on an oval base platform, with a top ring and finial so the fold geometry reads from a slight top-down tilt. Everything is flat cut paper: layered silhouettes, offset card edges for paper thickness, translucent contact shadows, and perforations drawn as punched holes (page-colored dots with a small lip shadow), never as printed dots.

Palette is strict: paper cream #F5F0E6, ink black #1A1A1A, mid gray #9A9A98. The cutout pink #F2D8D5 is spent once, on the house roof; the soft orange #E09A5A once, on the bird's beak.

Interaction, per the prompt and the rethink rule (this piece is a system to explore): drag horizontally rotates the carousel with momentum, capped so it cannot spin fast; on release it settles to the nearest panel-forward position with stepped easing, her stopmotion grammar. Tap a panel and it swings open a few degrees and falls back, its interior planes separating as it opens. Left alone for a while it turns very slowly on its own. The scene order never changes and there is no click-to-reload.

## Construction

- Single self-contained index.html, canvas 2D only. Stage 1000x700, letterboxed via a view transform computed in resize(); canvas sized from the Visual Viewport API with resize listeners on visualViewport and window, and canvas.style.width/height pinned in px inside draw().
- Pseudo-3D, no rendering tricks: each panel sits on an ellipse (center 500, radius 196) at angle rot + i*72 degrees. Screen x comes from sin, depth from cos; panel width compresses by |cos|; panels are painted in ascending depth order each frame, with the gray center spine and hub inserted between the back panels and the front panels. Back panels show their card backs (stacked edges, faint gray medallion, crease line). Far panels ride a few px higher for the top-down tilt.
- Each scene is drawn twice per frame: a contact-shadow pass (all fills become translucent ink, offset down-right) and a true-color pass. The two passes separate slightly while a panel is swinging, which is what shows the layered interior. Scenes are fixed geometry, no per-frame randomness; paper grain and fiber flecks are precomputed at load from mulberry32 with a fixed seed.
- Phone detection uses window.screen physical size (min dimension < 700px) with the aspect fallback; on phones the carousel keeps its shape inside the letterbox and the hint type steps up a size.
- Determinism: frame one is a synchronous draw at rotation 0, PHASE0 + elapsed anchoring for the rAF loop, rAF typeof-guarded (the QA renderer has none). No Date.now, no offscreen canvas, no filters, no audio, no external assets.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and cmp byte-compared, identical both rounds (before and after the fix pass); the second render was deleted each time.
- Read-back, round 1: hedgehog panel front and fully readable, pink roof and orange beak landing on the correct side panels, folds and platform reading. Two defects found: the house window was filled pink (a second spend of the one pink) and the scenes sat small in the lower half of each tall panel.
- Fixes: window fill changed to paper with an ink cross; scene group scaled 1.15x and seated 20 units up from the panel base. Re-rendered all three sizes and re-verified byte-identity.
- Read-back, round 2: hedgehog bold with punched perforations along the hill; bird compressed on its side panel with the beak legible; house roof the only pink in the frame, its roofline perforations reading as holes; mobile keeps the whole carousel inside the 390 width with nothing clipped and the hint legible.
- Grep verified: zero Date.now, zero document.createElement, zero AudioContext, zero external URLs, zero em dashes in the file.

## Deviations

- Back panels show plain card backs rather than dimmed mirrored scenes. Reason: a carousel book's far panels present their backs to the viewer; a mirrored scene would read as a printing error, and the brief has the back panels "mostly hidden behind the center fold". The spine, platform shadows and the slivers of back card at the flanks carry the depth instead.
- The top ring and finial are drawn as simple ink ellipse and hub rather than as five separate panel-top caps. Reason: at gallery scale a single ring communicates the top-down fold geometry without adding five more projected quads of visual noise.
- Idle rotation begins after 6 seconds untouched and runs at 0.045 rad/s. Reason: the prompt asks for a slow idle turn, but the machine must read as settled, panel-forward, on arrival; the delay keeps frame one and the first impression still.
