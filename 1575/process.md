# No.1575 "My Loving Processing Must Get Over It" — SB8, PP822, #207 senbaku-deconbatch

Gallery date: 2006 · 05 · 05. Interaction cue: "Drag up to blur, down to sharpen."

## Spec (verbatim prompt, from TASKS.md)

Near-black ground; a bloom of soft glowing orbs built the poor way — a
dozen transparent layers, each holding flat random circles, each layer
blurred by a different radius, composited into a luminous cloudy mass.
Orbs have soft halos, not hard edges; some wear faint colored shadows (her
colored-shadow discovery). Palette: black ground #0D0B14; orbs warm white
#F2EDE4, pale amber #D9A441, faint teal #2E7D74 halos. Nothing else.
Composition: bloom centered, ~65%, dissolving into black at edges.
Motion/interaction: drag vertically anywhere and the per-layer blur radii
scale live under your finger — drag up to defocus into fog, drag down to
sharpen toward flat circles (blur radius IS the instrument). Watch-only
otherwise, orbs drifting slowly. Technical: N offscreen layers, each with
flat circles; per-drag blur radius_i * dragFactor; composite with
'lighter'. Colored shadows: draw each blurred layer twice, once tinted,
offset a few px. CRITICAL: implement the poor-man's stack, NOT a real
bloom shader and NOT drawingContext.filter / ctx.filter (forbidden — the
piece is ABOUT the stack). Implement blur as downscale-upscale: render
each layer's flat circles to a small offscreen canvas and drawImage it
scaled up with image smoothing (soft blur by resampling), with the
downscale factor driven by dragFactor; or concentric low-alpha rings per
circle. Either is fine as long as no filter API and no shader is used. At
rest (dragFactor 1) orbs must read soft, never hard-edged. Avoid:
hard-edged circles at rest; decorative gradients.

## Build

- Seeded PRNG (mulberry32, seed 1575). Six transparent layers, blur bases
  0.5 / 0.7 / 1.0 / 1.3 / 1.7 / 2.2, holding 14 orbs total (3, 3, 2, 2, 2,
  2 per layer). Orb centers in the central ~65% of the frame (unit
  coordinates, spread radius 0.22), radii 0.035..0.09 of minDim. Colors:
  mostly warm white, some pale amber; shadows teal or amber.
- Blur is the concentric-rings implementation the prompt allows: each orb
  is 16 concentric flat discs, outermost faintest, innermost brightest,
  radius r*(1 + B*(1 - f)) where B is the layer blur times dragFactor and
  f runs 0 (outer) to 1 (inner), alpha 0.045*(0.25 + 0.75*f). No ctx.filter
  anywhere, no shader, no gradient: the stack IS the blur. Layers are
  composited with 'lighter' into the cloudy mass. At rest the halo spread
  is wide enough that no hard edge survives.
- Colored shadows: each orb's ring stack is drawn twice, first tinted
  (teal or amber) offset (+4u, +3u) at half strength, then the orb itself.
- Drag: pointerdown records start Y and start factor; pointermove sets
  dragFactor = clamp(startFactor + (downY - y)/220, 0.3, 3.5) and redraws
  live. Drag up defocuses into fog (factor to 3.5), drag down sharpens
  toward flat circles (factor to 0.3). The factor persists after release.
- Drift: orb centers drift on a Lissajous pair (whole cycles of the 24 s
  loop), amplitude 0.006..0.016 of minDim, so the bloom moves slowly when
  untouched.
- House rules: Visual Viewport sizing with resize listened to on both
  visualViewport and window; canvas pinned in draw() via
  canvas.style.width/height in px; phone detection via window.screen
  (min dimension under 700 px) with aspect fallback; centered bloom keeps
  its shape, page ground is the piece's own near-black, hint chip warm
  white with near-black text. One synchronous frame at load; every
  requestAnimationFrame call guarded by a typeof check. No em dashes in
  visible copy. No click-to-reload.

## QA

Rendered from the actual script with node
~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile,
and 720x720 thumb; all three inspected visually.

- Fix round 1 (blown-out bloom): first build used 10 rings at alpha
  0.085, blur bases up to 3.4, radii up to 0.13 of minDim: the bloom
  saturated to a giant white mass with visible ring banding and no
  individual orbs. Changed to 16 rings at alpha 0.045, blur bases
  0.5..2.2, radii 0.035..0.09, spread radius 0.22, shadow pass at half
  strength. Re-rendered: distinct soft orbs in warm white, amber, and
  faint teal, dissolving into black at the edges; the remaining faint
  ring steps are the flat layers showing, which is the point of the piece.
- Probe (probe-1572-1575.js, hand-driven rAF clock, piece's own pointer
  listeners): frame one deterministic, 0 differing bytes across two t=0
  draws at 1280x900; 6 layers, 14 orbs; 697,570 bytes changed t=0 -> t=6
  (slow drift); drag up 220 px sets dragFactor 2.0 with 1,463,349 bytes
  changed (defocus into fog); drag down 220 px returns dragFactor to 1.0
  with 1,471,528 bytes changed (sharpen back); thumb re-render
  byte-identical (md5 dbbe93c1b6b1dc8611f85b11d9bc50bc).

## Deviations

One implementation choice, allowed by the prompt: blur is built from
concentric low-alpha rings per circle, not from offscreen downscale-upscale
canvases. The prompt names both as acceptable. Rings were chosen because
they render identically in the node-canvas QA harness and in the browser
(the harness has no offscreen canvas creation), so the gated renders are
the actual shipped behavior. No filter API and no shader is used anywhere.
