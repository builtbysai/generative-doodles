# No.702 Disremembered

EXPANSION #85 doris-salcedo, prompt block 7. A tunic woven from raw-silk threads, pierced through by thousands of tiny blackened needles, hanging from a single nail against a dark wall.

## Concept

The garment hangs heavy and barely moves. From a distance it reads as a pale hanging cloth; up close it is a field of sharp points. The needles are matte blackened steel, never wounds, never blood: the mood is quiet menace, not horror. Nothing moves except the slow sway and the rare needle that catches the light, like dust catching sun.

## Construction

- Palette is strict: silk #B8A88A, needles #1F1F1F, glints #F2EFE8, wall #0E0D0C, nail #3A3A3A. No other colors, no text anywhere except the document title.
- All randomness comes from a mulberry32 seeded RNG. No Math.random, no Date.now. The needle layout and glint schedule derive entirely from the epoch seed (base seed 70285, advanced per tap).
- The garment is defined in normalized local coordinates: v runs 0 at the neck to 1 at the hem, u runs across a width profile (narrow at the neck, sloping out to the shoulders, then a near-straight body with a slight taper). Because every element is stored in these coordinates, resizing the canvas only remaps points; nothing is ever re-rolled.
- Silk: 104 to 118 horizontal thread lines (count seeded within the specced 90-120), each a 1px quadratic with a slight seeded sag and a seeded alpha between 0.34 and 0.60. A faint fill of the same silk color at alpha 0.10 gives the cloth a body so the needles read as marks inside a pale field rather than marks on the wall.
- Needle cluster placement: 6 to 8 cluster centers are seeded inside the garment, each with a radius (0.07 to 0.20 in v units) and a weight. 72% of the 2,500 needles are assigned to a cluster chosen by weight, then positioned with a soft triangular falloff around the center (average of three uniform draws), resampled up to 8 times to stay inside the silhouette. The remaining 28% scatter sparsely across the whole garment. Each needle is a 3 to 5px dash at a seeded angle. The result is a few dense dark patches in the cloth with a thin field elsewhere.
- Sway: the whole garment group rotates about the nail point by sin(t) times 1.5 degrees with a 9 second period, closed-form. The nail itself is drawn outside the rotated group.
- Glint schedule: glints are not rolled per frame. At layout time a schedule is precomputed over a 90 second period: candidate times step forward by seeded gaps of 0.12 to 0.67 seconds, and each candidate is accepted with probability 0.30 + 0.70 times the absolute sway speed at that moment, so glints gather while the garment is actually moving and thin out at the turn of the swing. Each accepted event stores a needle index, a start time, and a duration of 0.10 to 0.16 seconds (roughly a 3-frame flash at the frame rates that matter). At draw time the envelope is sin(pi times phase), a pure function of t. The first event starts at t = 0.4 or later, so frame one has no glint.
- Frame one is a synchronous draw at t = 0: sway angle exactly 0, needle field dark. The animation clock starts from the first rAF timestamp, and rAF is typeof-guarded so the QA renderer (which has no rAF) stops after frame one.
- Tap (pointerdown) advances the epoch and rebuilds the needle clusters and glint schedule from the new seed. It never reloads the page.
- Sizing uses the Visual Viewport API with resize listeners on both visualViewport and window; draw() pins canvas.style.width and height in px on every frame. Phone detection uses window.screen physical size (min dimension under 700px) with the aspect fallback h > w * 1.15; on phones the tunic keeps its proportion and stays hung from top center, and the page ground is the wall color.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png). All three show the pale thread-woven tunic hanging from the nail on the dark wall; the needle clusters read as darker dense patches inside the cloth; no glint appears in frame one; nothing is clipped on mobile.
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical. The second render was deleted.
- No audio, no microphone, no external assets, no absolute URLs, no date strings.

## Deviations

- The cloth carries a very faint flat fill (silk color at alpha 0.10) under the thread lines. Reason: with lines alone spaced about 4px apart, most needles would fall on bare wall-dark gaps and the garment would not read as a pierced cloth; the fill is the same palette color and keeps the threads as the visible weave.
- Glint duration is 0.10 to 0.16 seconds rather than a literal 3 frames, because frame duration varies by display; the envelope shape (fast in, fast out) is preserved.
