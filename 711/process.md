# No.711 Homebound

EXPANSION #86 mona-hatoum, prompt block 8 "Homebound" (verified verbatim from TASKS.md).

## Concept

A dark room of familiar things, each reduced to a few outline strokes: a bed, a floor lamp, a cup on a table, a chair. Every object is wired into one network of sagging red wire that converges on a single small bulb hub hanging from the top of the frame. The room runs itself. Bright current pulses travel the wires continuously, and every ten to twenty seconds one object buzzes: it vibrates and glows for three seconds, then settles. The unease comes from the current, not from any staging: no detailed furniture, no horror cues, no text, no sound. Tapping a wire or an object sends one strong pulse out through the network from that point.

## Construction

Single self-contained `index.html`, canvas 2D, strict six-colour palette from the prompt (background #0E0E10, outlines #5A5A60, wire #8A1F16, pulse #FF5A3C, buzz #FF8A5C, floor line #1E1E22). The whole scene is laid out in a 1000x1000 design space and scaled by the smaller viewport dimension each frame, so the scattered layout survives any aspect ratio unchanged.

Network graph: six nodes (bed anchor, lamp shade, bulb hub, cup, table, chair) joined by seven wires: bed-lamp, lamp-hub, hub-cup, cup-table, hub-table, table-chair, bed-table. Each wire is a quadratic curve sampled at 65 points with a sag of 16% of its chord length plus a slight perpendicular bow; cumulative arc lengths are precomputed per frame so pulses ride true arc position. The hub is drawn as a small wire-toned ring with a pulse-toned core dot that breathes on a slow sine; a plain cord runs from the hub to the top edge.

Objects are stroke-primitive lists (lines plus one arc for the cup handle) in design coordinates: bed 10 strokes, lamp 6, cup 6, table 4, chair 7. They are drawn in the outline tone at rest.

Pulse model: base pulses are generated from a mulberry32 stream seeded 71186; each wire carries one pulse (two on wires longer than 300 design units), with a seeded phase, a speed of 70-120 units per second, and alternating direction. Position is a closed-form function of anchored time: phase plus elapsed travel, modulo wire length. Each pulse is drawn as a short arc-length segment in four layered strokes of falling width and rising alpha in the pulse tone, which reads as a soft glow without shadowBlur. Tap pulses are recorded events only: a tap near an object anchor emits a strong pulse from that node along every incident wire; a tap near a wire emits two strong pulses in both directions from the tapped arc position, plus delayed emissions from the nearer end node onto its other wires, with the delay set by the front's travel time to that node. Strong pulses travel at 300 units per second and are drawn brighter and thicker. Because tap pulses are pure functions of their recorded tap times, interaction never disturbs frame one.

Buzz model: a mulberry32 stream seeded 0xB022 prebuilds a schedule of buzz events, the first at 7-12 seconds, then one every 10-20 seconds, each naming one of the five objects for a 3-second buzz; the schedule loops with a period of about 900 seconds. While an object buzzes, its outline gets a sine-envelope glow in the buzz tone (two layered halo passes plus a bright core pass) and a 2-3 px jitter from fast seeded sine products; both are closed-form in time, so the buzz is identical on every visit at the same elapsed second.

Determinism: frame one is the synchronous draw at t=0 issued by the initial resize, before any clock is read; the animation loop (guarded by a typeof check on requestAnimationFrame) anchors elapsed time to a performance.now stamp taken after that boot draw. No Date calls, no Math.random, no date strings. Canvas size comes from the Visual Viewport API with resize listeners on both visualViewport and window, and draw() pins canvas.style width and height in px every frame. Phone detection uses window.screen physical size (min dimension under 700px) with the h > w*1.15 aspect fallback; the design-space layout needs no phone variant. No audio, no microphone.

## QA log

Rendered with ~/workspace/tools/render-piece.js (node-canvas):

- thumb.png at 720x720 rendered twice and byte-compared with cmp: identical. Determinism gate passed; the duplicate render was deleted.
- qa-desktop.png at 1280x900: bed with pillow at left, floor lamp, table with the cup on it, chair at right, bulb hub on its cord above centre, all seven red wires sagging between anchors, bright pulse segments visible mid-wire on the lamp-hub wire, the two hub drops, the bed-table run, and the table-chair run. Floor line present. Nothing clipped.
- qa-mobile.png at 390x844: the full room scaled to the phone width and centred vertically, every object and wire in frame, pulses still legible. Nothing clipped.
- No buzz is active at t=0, as specced; the first scheduled buzz fires at about 7 seconds.

Deviations: two, both forced by the renderer and the house rules, neither changing the prompt's substance. (1) All glows (pulse and buzz) are built from layered alpha strokes because the QA renderer has no shadowBlur and shadowBlur is banned in this series; the read is the same soft halo. (2) The bulb hub is given a short plain cord to the top edge so the convergence point reads as the hanging bulb node of the original installation; it uses only the specced wire tone. The prompt's "4-6 objects" is met with five (bed, lamp, cup, table, chair).
