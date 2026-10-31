# No.588 — Manivela

EXPANSION #71 julia-barata, prompt block 4 "Cinegraf" (verified verbatim from TASKS.md).

## Concept

Her hand-cranked Cinegraf proto-animation: the reader is the projectionist. A kraft Cinegraf viewer sits center stage with a strip of translucent tracing paper running through it, sprocket holes along both edges. In the gate, one frame of a tiny hand-drawn film shows opaque; the frames either side show through the paper as 25% onion-skin ghosts. The film, after her Tindergraf satire, is a figure swiping through phones that turn into birds and fly off.

There is no play button, no timeline, no autoplay, ever. The only control is the crank on the viewer's right side: drag it in circles and the film advances at the speed of your hand; stop and it stops dead mid-frame; crank backwards and it runs in reverse. No sound.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets. Scene composed in a 1000x1000 stage, scaled to fit and centered; page ground is the tracing-paper tone #F5F0E6.
- Strict palette: ink #1A1A1A, translucent paper #F5F0E6, flat red #D42B1E (birds and phone screens only), kraft #C8A97E (viewer body and crank barrel).
- Film strip: paper band with two sprocket rows (holes scroll with the film, offset mod 60). Seven frame slots are drawn around the gate, all as 25% ghosts; the kraft viewer body is then drawn as four panels around the gate opening, and the parked frame is redrawn opaque, clipped to the gate.
- Frame position is pure interaction state: `crankAngle` accumulates unwrapped pointer-angle deltas around the crank hub; displayed frame = round(crankAngle / 2π × 3), so one full crank turn advances 3 frames. The frame index is quantized, never interpolated: the strip jumps frame to frame with hand-drawn steppiness, exactly as specced. The rAF loop (typeof-guarded) only repaints; nothing in the picture is time-driven.
- Crank grab radius 150 stage units (180 on phones); dragging anywhere else does nothing. Crank knob rests pointing up.
- Paper grain: 260 precomputed speckles from mulberry32 seed 588001, drawn directly each frame. Per-frame hand-drawn wobble: seeded offsets/rotation per frame index (seed 588002).
- House rules: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas pinned in px inside draw(); phone detection via window.screen (min dimension < 700px) with aspect fallback (h > w*1.15), used only to widen the crank grab radius; no microphone, no audio; no Date.now anywhere; first frame is one synchronous draw.

### Frame sequence (9 frames, looping)

0. Figure holds a phone up, red screen, heart spark on the glass.
1. The swipe: arm swings, motion lines at the thumb.
2. The screen cracks open: a bird silhouette forms inside the phone, wing and head sprouting (morph 45%).
3. Phone half-bird: wing swept up, beak out, tail fanning (morph 80%).
4. The bird leaves the hand; figure's arm still raised, head tilting up.
5. Bird in flight up-right, wings down; figure watches.
6. A second, smaller bird joins; figure waves.
7. Three birds in a loose scatter; figure waves.
8. One tiny distant bird remains; figure shrugs with both arms up, ready to pick up the next phone (loops to 0).

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice, `cmp` byte-compared: identical; second render deleted. First frame is the synchronous draw with the film parked on frame 0, ghosts either side, crank at rest.
- Read-back fixes: first pass had the flight birds in frames 5-8 high enough to poke above the strip's top edge, and the crank floated detached beside the viewer. Birds were lowered into the band, the viewer narrowed (416 wide) so the immediate neighbour frames peek out from behind it, and the crank moved in so its mount plate overlaps the viewer's right edge. Re-rendered all sizes and re-passed the byte-compare after the fixes.
- Mobile read-back: viewer keeps its shape, gate and figure legible, crank reachable at the right edge, "drag" hint under the crank, nothing clipped.

## Deviations

- The viewer carries the word "CINEGRAF" lettered on its top panel. The prompt names the device and centres the composition on it; the lettering is set in plain ink caps as part of the drawn object, not UI. No other text exists except the small "drag" hint by the crank.
- Gear ratio is a construction choice: one crank revolution = 3 frames (the prompt fixes the mechanism, not the ratio). It keeps a full 9-frame loop at three turns of the crank.
- Frame 8's shrug (both arms up) is the loop seam back to frame 0's fresh phone; the prompt's sequence is "phones turn into birds", and the empty-handed beat is what makes the loop read as her swipe-satire cycle rather than a single phone's story.
