# No.389 Too Small to Matter — process

## Concept

After Maryna Lagereva's (@maryna.lagereva) @forplanetocean
micro-fiction, "Stories of Tiny Marine Life": a pale sea spirit
kneels on a dark seabed beside a tiny glowing flabellina, and
her four-line dialogue runs as caption cards along the bottom.
The spirit is serene, closed-eyed, one arm reaching gently
toward the little nudibranch; the flabellina's cerata stand
like streamers over a stepped halo of light. Tap advances the
conversation, four beats and back to the first; the scene
itself never reloads.

The dialogue, verbatim, designed text as the artwork under the
batch's text exception (the only text in the piece): "Who are
you?" / "I'm no one important... I'm too small to matter." /
"You shimmer like sunlight in deep water." / "For the first
time, it believed her."

Palette, closed: deep sea #123F4C, light rays #2A6B7A at 0.3
alpha, spirit pale #EAF4F0, flabellina #8E5FA8, glow #C9A0DC,
sand #3A5A5E. Flat colour only.

## Construction

- One canvas, design space 1280x900, centred fit, page ground
  in the deep sea tone so the scene sits in its own water at
  any aspect. Sizing comes from the Visual Viewport API with
  resize listeners on both visualViewport and window; the
  canvas element is pinned by style width/height every frame;
  phone detection uses the window.screen physical size with
  the tall-aspect fallback.
- Spirit: a soft bezier silhouette in the left third, head at
  (348, 292) with two closed-eye arcs and a small mouth inked
  in the deep sea tone. The body sweeps down to a folded knee
  mound resting on the sand (a forward bulge at the front edge
  and a faint ground-tone crease where the legs fold). Hair is
  exactly 7 strands rooted around the back of the head, each a
  quadratic curve whose tip and control sway on a 25s cycle;
  strand lengths cascade by root height so the fall fans
  instead of bunching. One arm sags in a two-segment curve
  from the shoulder toward the flabellina.
- Flabellina: right third, resting on the sand at (908, 706).
  Per the batch adaptation flag the glow is three stepped flat
  alpha ellipses in the glow tone (alphas 0.07 / 0.13 / 0.20,
  radii 190x74 down to 98x38), never a blur. Body is a tapered
  bezier ellipse; cerata are exactly 8 curved spikes along the
  back with glow-tone tips, waving on a 10s cycle with
  staggered phases; two rhinophores curl at the head end.
- Light rays: exactly 5 flat shafts from the top at alpha 0.3
  in the ray tone, each shifting sideways on the whole 50s
  cycle with its own seeded phase. Seabed: a gently curved
  sand band with five still pebbles at low ground-tone alpha.
- Motes: exactly 40 plankton motes, asserted. Each owns a
  phase and a whole rise count per loop (1 or 2), so over 50s
  every mote completes only whole rises (from near the sand,
  y 800, up to y 40) and wraps seamlessly; the sideways wobble
  runs on the same whole-cycle count.
- Caption: one line centred in a flat translucent panel (ray
  tone at 0.28 alpha) along the bottom, drawn on the canvas
  in a large serif (40px Georgia, auto-shrunk per line to fit
  the card). TAP (press and release within 28 design px and
  0.8s of the piece clock, client coords converted through
  the stored centred-fit transform) sets the previous beat,
  advances the index modulo 4, and restarts a 0.7s crossfade
  advanced in fixed ticks inside step(): the outgoing line
  fades out as the incoming line fades in. Beats change only
  on tap; frame one shows beat 1 at full fade.
- Loop: 50 seconds, ambient and seamless. It holds 2 whole
  hair-sway cycles of 25s, 5 whole cerata waves of 10s, 1
  whole ray shift, and whole mote rises throughout.
- Determinism: the first frame is drawn synchronously at the
  constant phase T = 13.75s (hair mid-sway, rays mid-shift,
  motes spread through their rises), beat 1 showing. The
  animation clock advances from that anchor in fixed 1/60
  ticks accumulated from rAF timestamps; rAF is
  typeof-guarded. Frame one never reads a wall clock. All
  scatter comes from a fixed-seed LCG baked at load.

## QA log

- Rendered with the house node-canvas renderer at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png). The renderer confirms the pointerdown and
  pointerup listeners register alongside the resize
  listeners.
- Desktop: spirit kneeling left with cascading hair, serene
  closed-eye face and the reaching arm; flabellina right on
  the sand inside its stepped glow, cerata up; five ray
  shafts, sparse motes, caption card reading "Who are you?"
  in a clear serif.
- First pass fixes: the hair bunched into a single ribbon on
  one side of the head, so strand lengths and drift were made
  to cascade by root height and the fall now fans; the body
  read as a standing column, so the front edge gained a
  folded-knee bulge and a crease line at the base; the arm
  ran too long and straight, so it was re-shouldered and
  given a sagging two-segment curve. All renders redone after
  the fixes.
- Thumb: spirit, glow and caption all read at gallery size on
  the continuous deep sea ground.
- Mobile: centred fit keeps the whole vignette in frame,
  caption legible, ground continuous above and below.
- Thumb rendered twice from the shipped script:
  byte-identical.
- Grep-verified in the piece script: no gradients, no
  shadowBlur, no offscreen canvas, no Math.random, no
  Date.now, no em dashes, no absolute URLs. The palette
  holds only the specced hexes (deep sea, ray, pale, the
  flabellina purple and its glow tone, sand), each used
  flat or at flat alpha steps.
