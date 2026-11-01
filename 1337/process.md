# №1337 "Flash Reveal" (hank-willis-thomas HT2, PP512)

## What it is

A near-black panel, almost blank, hanging in darkness. You can barely make
out a faint white-on-white texture, like breath on glass. A small
camera-flash icon pulses at the lower right. When the flash fires, the panel
explodes into color: a procedurally drawn archival street scene in full
saturation — a crowd, a march, muted 1960s coats, one vivid yellow protest
sign — rendered as if lit by a strobe, then dying back to near-black as the
flash decays. The revelation is always partial, always brief, always yours.

Grounded in the Retroreflectives (Black Survival Guide, 2019): "if you take
a flash photograph a latent image is exposed." The viewer becomes the
photographer; the flash completes the picture.

## Frame one (t = 0, boot flag)

Genuinely near-blank: panel #0D0C0B, faint seeded speckle and breath arcs
in #1E1C1A, pulsing white bolt icon bottom-right. No latent image visible.
The viewer must doubt anything is there.

## Mechanics

- TAP AND HOLD = the flash bulb. While held, the latent image stays lit
  through a radial mask centered on the tap point, with hard light-falloff
  built from 24 concentric flat-alpha discs (outer rings faint, core full)
  plus a slight overexposure disc at the core. Release and it decays over
  ~2 s (radius and alpha shrink together).
- Drag is disabled: pointer movement never changes the flash; only
  pointerdown sets the flash point and pointerup starts the decay.
- Watch-only ambient: every 25 s, one brief half-flash flickers at the
  center (0.8 s triangle envelope, half radius, half alpha), teasing the
  surface, never fully revealing. Never a flash train.
- The revealed image is ALWAYS the same composition: fixed seeded layout
  (mulberry32 seed 1337000) — buildings, asphalt street, 46 flat figures in
  muted 1960s coat tones, one yellow #E8B53A sign held high left of center.
  Where the flash fires decides which details it catches.
- Never click-to-reload; no permanent reveal button; no UI chrome beyond
  the pulsing flash icon. The dark state is quiet, not sinister.

## Adaptations

- Flash mask as concentric flat-alpha discs: NO radial gradient anywhere.
- Latent image procedurally drawn, painterly-flat, never a real historical
  photograph and never photoreal.
- Flash icon is shapes only (a bolt polygon); no text anywhere except
  `<title>`.

## Determinism

Frame one draws synchronously at exactly t = 0 via a boot flag; the clock
starts only with the rAF loop (plain function declaration behind a typeof
guard). Dark state, ambient flicker phase, flash mask, and decay are
closed-form functions of piece time and recorded tap-hold events. All
variation comes from seeded mulberry32 streams; no Math.random anywhere.

## House rules

Visual Viewport sizing with resize listeners on visualViewport and window;
canvas pinned in draw() via canvas.style.width/height in px; phone
detection via window.screen physical size (min dimension < 700 px) with
aspect fallback; field-like composition full-bleed on phones, page ground
#0D0C0B. One synchronous developed frame at load. No AudioContext, no
document.createElement, no WebGL, no offscreen canvas, no ctx.filter, no
shadowBlur, no gradients, no getUserMedia. Dots drawn as paired arcs/rects
with moveTo before every batched arc.

## QA

Rendered with node-canvas at 1280x900 desktop, 390x844 mobile, 720x720
thumb; all three inspected. Desktop and mobile both read as a near-blank
dark panel with faint breath arcs and the pulsing bolt icon. A forced-flash
probe (temporary copy, discarded) confirmed the reveal: radial burst from
the tap point, crowd scene in muted tones, yellow sign accent, overexposed
core. Fix round: the falloff ring count was raised from 12 to 24 after the
probe showed visible concentric banding at the mask edge. Thumb rendered
three times plus a final re-verification after process.md was written, all
`cmp` byte-identical.

## Palette

Dark state #0D0C0B / #1E1C1A; flash white #FFFDF5; street asphalt #3A3A3C;
coats #5C4A3A / #2E4A5A / #7A2E2E; sign yellow #E8B53A; skin #8A5A3B.
