# No.843 "Peel Slowly and See" (EXPANSION #103 lou-reed, PP4)

## Concept

The 1967 debut cover instruction turned into a mechanism, built on an original form rather than the literal fruit. A bold two-color screen-printed plate sits on a white ground: a large disc split into a black cap and a yellow lower half, ringed in black, cut by a heavy black band with a small yellow block seated in it. In the top-right corner, small black caps: "PEEL SLOWLY AND SEE". At the plate's bottom-right corner, a dog-ear peel tab (yellow base triangle, ground-colored folded flap). Dragging peels the printed layer back along the drag path and reveals a second, fully composed artwork underneath in pink and black. What is peeled stays peeled. A long-press (about 800 ms without moving) restores the sheet and brings up the next hidden artwork. No sound. The only visible text is the specced instruction.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets, no offscreen canvas, no gradients, no shadowBlur, no ctx.filter. Palette is strict: ground #FAFAF7, yellow #E8B400, black #111111, pink #F4A7B9.
- Geometry lives in stage units (1 unit = min(viewport width, height) in px, origin at canvas center), so the piece is resolution independent and deterministic at any size. The print plate is a square of half-size 0.37 units.
- Canvas size comes from the Visual Viewport API with resize listeners on both visualViewport and window; draw() pins canvas.style.width/height in px every frame. Phone detection uses window.screen physical size (min dimension < 700px), with aspect h > w*1.15 as fallback only. The plate is a centered geometric form, so the page ground simply takes the piece's own ground color.
- Peel-mask model: every drag is recorded as a list of segments in stage units. The reveal mask is the union of capsules (radius 0.088 units) around those segments, built fresh as canvas path geometry each frame and used as a clip; the hidden artwork is drawn over the top artwork through plate-clip intersect mask-clip. No pixel buffers are kept, so the revealed region is exact at any viewport size. The first recorded stroke is anchored at the tab corner (0.37, 0.37), so every peel visibly starts at the tab and grows along the visitor's path. Peel state persists for the life of the page; partial peels stay partial; there is no reset button.
- Torn edge: both sides of every recorded segment are restroked as jittered polylines whose offsets come from mulberry32 seeded per segment and side, so the tear pattern is a fixed, closed-form function of the recorded path. A jagged seeded cap rings the peel head. A curling fold strip (a ground-colored quad with a black outline and one inner crease line) is drawn at the head, aligned to the last segment's direction. All of it is derived from the segment list at draw time; nothing is frame-integrated.
- The three hidden artworks (cycled by long-press restore, in order):
  1. Starburst: black field, twelve pink rays radiating from center, pink ring with a black heart.
  2. Rings: pink field, seven concentric alternating black and pink rings centered slightly above middle.
  3. Scale field: ground field of pink scallop discs in offset rows, one black accent disc, black base band.
  Each is a complete composition, not a gag image, and each is a pure function of the plate rectangle.
- Determinism: frame one is the synchronous draw at load with an empty segment list (fully unpeeled, tab showing). No Date.now anywhere; no Math.random; the only randomness is the seeded mulberry32 jitter in the torn edges. requestAnimationFrame, when present, only redraws the same closed-form state.

## QA log

- Rendered with ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). All three read back: white ground, bold yellow and black form centered in a hairline plate, "PEEL SLOWLY AND SEE" small at top-right, peel tab at the plate's bottom-right corner, nothing clipped on mobile.
- Determinism gate: thumb.png rendered twice and byte-compared with cmp: identical. Duplicate deleted.
- Half-peel verification: three throwaway copies with a simulated drag path injected into the state (a six-segment sweep anchored at the tab corner) were rendered in /tmp, one per hidden artwork, read back, and deleted. The pink starburst, rings, and scale field all read as real compositions through the peel; the torn edges trace the trail and the fold strip reads as a lifted curl at the head.
- Mask geometry audit: because the revealed swath looked broad on first read-back, a pixel-level test was run on a mask-only render. Seven sample points at distances of 87 to 287 px from the recorded path (mask radius 63 px at 720 wide) were all non-pink, and an on-trail point was pink. The mask is exactly the capsule union specified; the trail width (0.176 units) is the design value.
- One fix round: the first tab build had the folded flap spilling past the plate corner; rebuilt as a contained dog-ear (yellow base triangle with the ground-colored flap folded inside it) and re-rendered at all sizes; byte-compare re-run green.
- Deviations: none from the brief. Two recorded choices: (1) the reveal draws the hidden artwork over the top artwork through the mask clip instead of cutting a hole in the top layer, which is visually identical and avoids any offscreen surface; (2) a long-press restore advances to the next hidden artwork rather than restoring the same one, so repeat visits keep finding a new second picture.
