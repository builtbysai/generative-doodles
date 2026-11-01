# No.1017 "Mask Law"

Study #125 yuta-asai, PP178 "The Glitch Obeys the Body" (Squarepusher "Terminal Slam" privacy camouflage). The glitch has a jurisdiction: the dancer's silhouette. Inside the body, datamosh corruption; outside, perfect black, not one pixel.

## Concept

A wireframe-free dancer: an articulated figure whose body is only a boundary. The silhouette is filled with glitch (macroblock shifts, RGB channel splits, quantization bands, all in cyan #00E5FF, red #FF2E4D, magenta #FF2EA6) and edged with a 2px white outline: the law made visible. The dance is seeded phrases of sharp isolations and slow rolls; the glitch tempo and density read the rig's joint velocities, so the body writes and the corruption reads. On phrase holds the body freezes and the outline dims to #8A8D84 while the glitch keeps living inside the still mask. Drag pulls the whole jurisdiction across the field on a spring; tap holds the mask for six seconds; double-tap cuts to a new phrase.

## Construction

- Rig: 16 joints from 12 pose components (spine, neck, four arm segments, four leg segments, root offsets) with absolute segment directions, forward kinematics, 10 authored dance poses. The timeline is a closed-form seeded segment list (mulberry32, seed 1017017): short sharp moves (0.7-1.2s), slow rolls (2.0-3.3s), and holds (~20 percent of segments, 1.6-2.8s) where the pose freezes. Poses interpolate with smootherstep and shortest-arc angle lerp. Joint energy is the mean joint speed sampled analytically at t and t+0.06; it drives glitch clock rate (8-12 Hz), block density, band washes, and split distance.
- Mask enforcement (the core mechanism): the silhouette is one canvas path of capsule subpaths (torso, neck, shoulder bar, hip bar, four arm capsules, four leg capsules) plus the head circle, every subpath wound in the same direction so the nonzero clip is exactly their union. Each frame has three passes: (1) the skeleton stroked 4px wider than the clip radius in the edge color alone, a seamless 2px rim with no internal seams; (2) ctx.save, trace silhouette, ctx.clip, then ALL glitch content (black interior fill, channel-split ghost strokes of an inner silhouette at 0.78 width in the three glitch colors with per-channel offsets, hash-clock macroblocks with displacement and in-band x-snapping, band washes); (3) ctx.restore. No glitch mark is ever drawn outside the clip. No offscreen canvas anywhere: the mask is a clip path, not a buffer.
- Glitch field: pure functions of integer hashes of (cell, band, step). Macroblock cells snap their x to a coarse 2-cell grid inside seeded quantization bands; some blocks displace by one cell; some draw double-size. All still clipped.
- Frame one: synchronous draw at fixed t = 13.5s, mid-transition from stand wide into strut T. The pose clock never derives from Date.now; animation advances it by rAF deltas only. Drag is a damped spring (k=60, c=11) on the rig root, integrated in the rAF loop from the seeded state (the sanctioned sim pattern for event state). Tap-hold freezes the pose clock while the piece clock and glitch clock run on.
- Viewport: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas.style width/height pinned in px every draw; phone detection via window.screen min dimension under 700px with aspect fallback (h > w*1.15); dancer scale min(H*0.88/2.15, W*0.60) so the figure stays whole at 390 wide.
- Audio: lazy AudioContext created on first pointerdown, all uses typeof-guarded and try-wrapped. Looped seeded noise through a bandpass (tearing, gain follows joint energy, near zero while held), a 54 Hz hum that rises while the mask holds, square-blip clicks on phrase edits and joint ticks at speed. Silent and complete under the QA renderer, which has no AudioContext.

## QA log

- Renders: qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png (720x720) via node ~/workspace/tools/render-piece.js. All render cleanly in silence; only listeners registered are resize and pointer handlers.
- Determinism: thumb.png rendered twice and cmp-compared byte-identical (duplicate deleted). Re-verified after the frame-one retime.
- Read-back: thumb and desktop show a centered dancer silhouette, white outline, interior dense with cyan, red and magenta macroblocks over channel-split ghosts, surrounding black completely clean. Mobile shows the same figure whole and centered, nothing clipped.
- Boundary scan: a flood fill from the image borders through near-black pixels (all channels under 48) marks the exterior; every strongly glitch-colored pixel (cyan/red/magenta classifier) was then checked for a 4-neighbor in the exterior. Result: 0 violations on all three renders (glitch pixel counts inside: thumb 21,319; desktop 29,390; mobile 11,519). The law holds in the shipped frames, not just in the code.
- Fix round: the first frame-one offset (t=9s) landed at the start of a roll-low segment and read as a crumpled diagonal; retimed to t=13.5s (mid stand-wide into strut T) after probing the seeded timeline segment table. No code change beyond the offset.

## Deviations

- Frame-one offset is 13.5s rather than the brief's suggested ~9s: at 9s the seeded timeline sits in a folded floor pose; 13.5s keeps the spec (mid-phrase, silhouette full of corruption) with a readable dancer. Recorded here per house rule.
- The channel-split ghosts are strokes of an inner silhouette (0.78 width) rather than copies of a rendered image: there is no image buffer by design (no offscreen canvas), so the split is applied to the body's own geometry, which is the only "image" the piece has.
- Audio timbres are approximate (bandpassed noise for tearing, sine hum, square clicks); every trigger and gain is a real rig event (energy, holds, phrase edits), and the tearing gain collapses while the body holds, as specced.
