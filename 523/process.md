# No.523 "Two Heads, One Flower" (EXPANSION #63 giulia-conoscenti, GC3)

## Concept

Two dark-brown heads in strict horizontal mirror profile, lips almost
touching at canvas center on a plain white ground. Each head is crowned
with an oversized flame-flower (tall red flame petals behind big green
leaves) that rises past the top edge. White and red tattoo-swirls
decorate the scalps; a small gold hoop earring is the only small
detail. Profiles stay mask-like: a single silhouette, no eyes, no
blush, no shading. Palette is exactly the prompt's: head brown
#3B1F16, flame red #E6392B, leaf green #3FA34D, gold #D9A441, swirl
white #FFFFFF (plus red swirls), ground #FFFFFF. Flat fills only.

Loop and interaction: petals sway on sine phases, the scalp swirls
rotate slowly in alternating directions, and dragging horizontally
leans both heads toward or away from each other around their neck
bases. The lean is applied as the same local rotation inside the
mirrored transform, so the mirror is exact at every instant, mid-drag
included; the flowers trail the lean on a looser spring and settle
back when the drag ends. At full inward lean the lips meet; at rest
they hover just apart. One subtle lowercase hint: "drag", bottom-left.

## Construction

Single self-contained index.html, canvas 2D, no external assets.

- One side is authored once as vector geometry: the head is a single
  bezier silhouette (back of skull, forehead, brow hollow, nose, lips
  with a mouth notch, chin, jaw, neck, flat bust cut at the bottom).
  The other head is the same draw call wrapped in translate(1,0) +
  scale(-1,1), so symmetry is structural, not tuned.
- The flame-flower is drawn before the head so the crown seats behind
  the scalp line: five flame petals (bezier teardrops with a curved
  tip, centre petal tallest at 0.445 of stage so the tips break the
  top edge) behind three pointed-oval leaves. Petals and leaves sway
  individually on phased sines around the flower base.
- Swirls are Archimedean spirals (2.2 turns) stroked in white and
  red, clipped to the head path, each rotating about its own centre
  at 0.22 rad/s with alternating directions and seeded phases. The
  gold hoop hangs from a gold stud at the ear position.
- Grain: the prompt's gouache tooth is a precomputed seeded speck
  array (mulberry32, fixed seed 523063): faint warm dust over the
  ground and light/dark tooth inside the head silhouette, drawn
  directly every frame. No offscreen canvas (the QA renderer has
  none), no gradients anywhere.
- House rules: Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas element pinned via
  canvas.style.width/height in px inside draw(); phone detection via
  window.screen (min dimension < 700px) with aspect fallback
  (h > w*1.15), used to thicken detail strokes on phones; square
  stage centred with letterbox, page ground white, so the
  composition keeps its shape on phones.
- Determinism: frame one is drawn synchronously by the initial
  resize() at the constant phase PHASE0 = 1.6s with lean and flower
  springs at rest. Nothing in frame one derives from Date.now() or
  any clock. The rAF loop is typeof-guarded and advances simT by
  clamped timestamp deltas; springs (lean k=110 c=15; flower lag
  k=42 c=8.5) integrate from that same simT.

## QA log

Renderer: node ~/workspace/tools/render-piece.js (node-canvas shim,
no rAF, no AudioContext, no document.createElement, no offscreen
canvas).

- qa-desktop.png (1280x900): mirrored brown profiles nearly kissing
  at exact centre; flame crowns break the top edge; five scalp
  swirls per head, alternating white/red; gold stud + hoop read
  clearly; "drag" hint visible bottom-left, subtle.
- qa-mobile.png (390x844): square stage centred on the white ground,
  composition keeps its shape; only the intended flower bleed at the
  stage top; nothing else clipped.
- thumb.png (720x720): same read at thumbnail size; swirls, hoops
  and the lip gap all legible.
- Determinism gate: thumb rendered twice and byte-compared with cmp:
  identical. The duplicate render was deleted.
- Fix pass 1: the first nose read as a long beak (forehead and nose
  formed one diagonal). Brow hollow deepened, nose shortened and
  rounded; re-rendered and re-verified.
- Fix pass 2: the "drag" hint was first drawn inside the scaled stage
  transform with a device-space font size, which blew it off-canvas
  (and tripped a Pango size warning). It is now drawn after the stage
  transform is restored, in device coordinates like the sibling
  pieces. Re-rendered and re-verified.
- Compliance greps: zero URLs, zero gradient calls, zero Date.now,
  zero em dashes in the piece. No microphone, no audio.

## Deviations

- No eye is drawn. The prompt names the hoop earrings as "the only
  small detail" and requires mask-like profiles, so the faces carry
  silhouette, swirls and hoop only.
- Grain is drawn from precomputed seeded arrays instead of a
  pre-rendered grain canvas, per the house adaptation for the QA
  renderer's missing offscreen canvas.
- At rest the lips sit about 0.07 of stage apart rather than a hair
  from touching, so the drag has visible work to do: a full inward
  lean closes the gap completely.
