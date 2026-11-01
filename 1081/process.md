# Two Time Continuums

## Concept

No.1081 takes Syn's split-timeline wall literally: one room, two moments. The same generative scene — ten performer silhouettes adrift over a dark field — is rendered twice in the same frame, the left half at the current phase over a blue-slate tint, the right half six seconds earlier over a plum tint. Between them stands a solid black wall-barrier with a single rectangular portal cut through it, framed in hard light gray, the only bright object in the piece. Through the portal each side sees the other timeline: the left part of the window shows the delayed scene, the right part the current one, so a figure can be caught mid-passage, out of phase with itself.

The barrier is not fixed. It slides slowly across the frame on a 45-second sine, ±15% of the stage width, changing which timeline owns the room. It never jumps and never cuts; the divider's drift is the only motion besides the figures themselves. The piece is watch-only: no interaction, no text, no sound. The six seconds are the subject.

Frame one is fixed at 24 seconds into the loop: the divider sits near center, five figures hold the left timeline and four the right, and the lower body of a tenth figure is visible through the portal, standing in the delayed timeline inside the window.

## Construction

The scene is a closed-form function of time. Ten figures are generated from a seeded Mulberry32 stream (base position, depth scale, alpha, drift amplitudes, sway and stride rates). Each figure's position is a sum of sines whose periods all divide the 45-second loop, with a sine-driven body lean and counter-swinging legs and arms, so `sceneAt(t)` and `sceneAt(t - 6)` are the same world at two phases and the whole piece loops seamlessly. Nothing is frame-integrated and no frame history is kept: the six-second delay is produced by evaluating the same function at an earlier phase, not by buffering frames.

Each frame draws the scene four times with canvas clip regions: the left half at phase t over the "now" tint, the right half at phase t − 6 over the "ago" tint, then the portal interior twice more with the timelines swapped. The wall-barrier is drawn over the fields as a solid near-black band, assembled from the rectangles above, below, and beside the portal so the window is genuinely cut through it, with two dim seam lines and edge strokes in the scene gray. The portal frame is a single hard stroke of #E8E8E6 with a fainter offset echo. The room itself — three faint strata lines and a low floor band in flat-alpha scene gray — is identical in both timelines, so only the figures betray the six seconds between the halves.

The palette is exactly the prompt's: tints #16202E and #1E1428 (the darker one doubles as the page ground outside the square stage), figures #D7DCE6 at depth-scaled alpha, scene gray #8B93A3, portal frame #E8E8E6. No gradients, filters, shadow blur, offscreen canvases, or element creation anywhere; glows are not used at all — the frame's hardness is the point.

The canvas uses Visual Viewport dimensions with resize listeners on both the Visual Viewport and window, pins its CSS pixel size during setup and drawing, and detects phones from the physical screen size with an aspect fallback. On a phone the square stage sits centered on the plum ground and the divider/portal composition is unchanged. The animation loop is guarded when requestAnimationFrame is unavailable, and the synchronous first frame is drawn at the fixed 24-second phase, so frame one never depends on wall-clock or setup time. The piece is silent: no audio is specced and none is created.

## QA log

Rendered with `node ~/workspace/tools/render-piece.js`:

- Desktop: 1280 x 800, saved as `qa-desktop.png`.
- Mobile: 390 x 844, saved as `qa-mobile.png`.
- Thumbnail: 720 x 720, saved as `thumb.png`.

The desktop frame shows the dark field split by the black barrier band: blue-slate left, plum right, pale figures at visibly different phases in each half (five left, four right, one clipped by the barrier's right edge mid-crossing), faint strata lines running through both halves, and the hard light-gray portal at center with the two tints swapped inside it and a figure's lower body standing in the delayed timeline within the window. The mobile frame keeps the square stage centered and full-width on the plum ground with the same composition, nothing clipped. The first phase tried (20 s) left the portal empty; the phase was moved to 24 s so a figure stands in the window at frame one, with the divider still near center. No text appears in any render beyond the document title.

Determinism was checked by rendering the 720 x 720 frame twice and comparing the files byte for byte. They matched (`cmp` clean). The duplicate was deleted.

Hygiene checks found no date-derived frame state, external assets, absolute URLs, visible text beyond the document title, gradients, shadow blur, canvas filters, offscreen canvas creation, element creation, audio, or microphone access.
