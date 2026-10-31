# No.898 - Coll/[i]s/io.'n

Study #110 sakrmusic, PP59 "Urchin Crystal".

## Concept

A white spiky urchin on deep black, after Sakr's "Coll/[i]s/io.'n No.11": one creature with two polarity states. In the dark state it is a spore, a dark core with short dim spikes retreated to the middle third. In the bright state the core glows bluish-white and the spikes explode to the edges. A slow breath carries it between the two, and single hard snaps punch it from one pole to the other. The life of the piece is the flinch: drag across it and the spikes near your finger bend away and regrow. It is never a decorative mandala, because the spikes are never equal and never still: every one of the 360 spikes has its own seeded length, its own writhe, its own shade.

Interactions: drag disturbs (spikes bend away and regrow over about 2 s; fast drags excite the creature toward the bright state). Tap strikes one instant polarity punch, subject to the snap rate limit. Double-tap holds the bright state for 4 s, then it collapses back. Sound starts on the first gesture only: a low sub heartbeat whose rate follows the breath, a granular shimmer whose density is the expansion itself, and a glassy crack on each strike.

## Construction

Single self-contained index.html, canvas 2D, no external assets. Palette is strict: ground #030304, spikes #EDEDED, core glow #CFE8FF, dark core #1A1A1C, spike shade #9A9AA0. No visible text anywhere; the title lives only in the document title.

Viewport: canvas size comes from the Visual Viewport API with resize listeners on both visualViewport and window; draw() pins canvas.style.width/height in px every frame. Phone detection uses window.screen physical size (min dimension under 700 px), with the aspect ratio h > w*1.15 as fallback only. The urchin is centered and sized from the smaller frame dimension at every size.

### The E model

E (expansion, 0 to 1) is a closed-form function of seeded schedules, recorded gesture events, and t. Nothing in the picture is integrated frame to frame.

- Base breath: a 26 s LFO, E_lfo(t) = 0.5 + 0.5 * sin(2*pi*t/26 + PHI0), with PHI0 = asin(-0.1) chosen so frame one lands at E = 0.45 exactly, on the rise.
- Auto snaps: a deterministic schedule generated once from a seeded mulberry32 stream, first snap at 5-9 s, gaps of 6-19 s after that. Each accepted snap mirrors the LFO (E becomes 1 - E) with a hard cut, no fade.
- Rate limit: at most one snap per 2.5 s, enforced structurally. snapCount(t) scans the merged auto-snap and tap-snap lists in time order and ignores any snap that falls inside 2.5 s after the previously accepted one, so the limit holds for every combination of scheduled and visitor snaps, forever.
- Tap strikes: a tap is deferred 0.33 s so a second tap can pre-empt it (house double-tap pattern); the committed tap time enters the same snap scan. The glassy crack sounds only when the scan accepts the snap.
- Double-tap hold: E is pinned at 0.97 for 4 s, then collapses back to the pulse value with a fast 0.18 s exponential over a 0.6 s window.
- Fast drags: each fast move records an excitation event; excitation decays with tau 1.1 s and pushes E toward 1 in proportion to the remaining headroom, so a violent drag fires the bright state and a gentle one only warms it.

### The spikes

360 spikes, all parameters drawn once from a seeded mulberry32 stream: base angle, length factor 0.42 to 1.12 (never equal), shade factor, 3 to 5 polyline segments, per-segment perpendicular jitter, two writhe frequencies (0.03-0.21 Hz) with seeded phases, a sway amplitude, and a curl sign. Length scale runs from 0.14 of the frame's smaller dimension at E = 0 (the middle-third retreat) to 0.50 at E = 1 (edge to edge), multiplied per spike by its length factor and its writhe, a slow two-sine breathing that is a pure function of (spike, t). Spikes are drawn in two passes, shade spikes in #9A9AA0 first, bright spikes in #EDEDED second, alpha scaled by E and the spike's own shade factor.

Tendrils are not a layer: when E passes 0.62, spikes with length factor above 0.80 grow two extra points beyond their own tips, continuing the same polyline with a seeded curl, their reach proportional to how far E is past the threshold. They emerge from the spikes because they are the spikes.

The flinch is closed-form too. Drag points are recorded with timestamps; bend for a spike is a sum over those points of a gaussian in angular and radial distance times an exponential age decay (tau 0.8 s, so the regrow reads over about 2 s), directed away from the finger and applied along the spike with a frac^1.5 profile so the base stays anchored and the tip travels.

The core: glow is layered flat-alpha discs of #CFE8FF (no gradients anywhere in the piece), subtle at E = 0.45 and strong only near E = 1. The dark spore disc (#1A1A1C) sits on top and shrinks slightly as E rises, and a hot center point scales its alpha with E.

### Audio

Lazy AudioContext created inside the first pointerdown, typeof-guarded at every step; the piece renders complete in total silence. A 52 Hz sine thump is the heartbeat, its interval following the same E the visuals use (1.7 s apart at E = 0, 0.85 s at E = 1) and its gain rising with E. Granular shimmer is short band-passed noise grains spawned with probability proportional to E per frame, so density literally is E. A strike plays one shaped noise crack plus a falling sine ping. No microphone, no AnalyserNode; the visuals never read the audio back.

### Determinism

Frame one is the synchronous draw(0) executed at load, before any animation frame. No Date.now anywhere; the live clock is performance.now minus a load stamp and never feeds frame one. All drawn state at t = 0 derives from the seeded streams and the closed-form E model with empty event lists.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js (node-canvas harness, no requestAnimationFrame, no AudioContext): 1280x900 qa-desktop.png, 390x844 qa-mobile.png, 720x720 thumb.png. The piece rendered cleanly and silently in the harness; all listeners registered (visualViewport resize, window resize, pointer handlers).
- Determinism gate: thumb.png rendered twice and cmp byte-compared, identical. The duplicate render was deleted.
- Read-back, desktop and thumb: deep black #030304 field; one urchin centered; 360 white and grey spikes with clearly varied lengths reaching mid-frame at E = 0.45; segment jitter and writhe read as hand-drawn irregularity, not a mandala; the core reads pale blue-grey and warming inside the dark spore disc, no glow blowout; nothing else in the frame.
- Read-back, mobile (390x844, phone path via screen size): urchin centered on the smaller dimension, fully inside the tall frame, nothing clipped.
- Palette audit: only the five specced tones are used. Text audit: no visible text; the only text is the document title, exactly "Coll/[i]s/io.'n".

## Deviations

- Core glow is layered flat-alpha discs rather than a radial gradient, per the house renderer rules (the QA harness has no reliable gradient support on this path and gradients are banned by the brief). The layered discs read as the same soft halo at every size.
- Tap strikes commit 0.33 s after the tap (the established house disambiguation window) so a double-tap can convert the strike into the bright hold; the snap, the crack, and the polarity flip all happen at the commit instant and stay in step.
- The auto-snap schedule uses 6-19 s gaps, wider than the 2.5 s floor: "occasional" snaps, with the 2.5 s limit enforced in the counting function itself rather than only in the schedule, so visitor taps can never break it either.
- Tendrils are gated to the longest fifth of spikes (length factor above 0.80) instead of all spikes at high E; on every spike they read as a second, decorative layer, which the prompt forbids. Gated to the long spikes, they read as those spikes outgrowing themselves.
