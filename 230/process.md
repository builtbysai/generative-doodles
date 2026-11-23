# No.422 Fruit Fashion

## Concept

After Kitty O'Rourke's fruit-fusion series (kittyo.illustration,
EXPANSION #45 prompt KIT6): one full-bleed character per view, each
fusing a single fruit into fashion. The three authored looks rotate
in prompt order, never a runtime pick:

1. A woman in a watermelon-slice bucket hat holding a pear stamped
   FRESH, on hot pink, in a green top printed with watermelon slices.
2. A confident Black woman with a voluminous afro, red-lens
   sunglasses and a pink lemon-print dress, on lemon yellow, with
   lemon-drop earrings.
3. A woman with banana-pendant earrings, a yellow polka-dot
   headscarf and pink round sunglasses, a toucan perched on a fruit
   stack on her head, on tangerine, in a green banana-print top.

Tap slides the next look in from the right. Small fruit sprigs
drift in each ground's negative space. The only text is the FRESH
stamp on the first pear, the set's designed text; the set carries
no signature anywhere.

## Construction

One canvas, flat colour only, black outlines (#1A1A1A) on every
shape. Design space 1280x900, full-bleed cover fit from the Visual
Viewport, canvas pinned every frame, phone detection via
window.screen with aspect fallback. Pointer coordinates convert
through the stored fit transform (S, OX, OY).

Character rotation: a fixed table of exactly 3 authored characters
in prompt order. A tap sets `from` to the current character,
advances `cur` by one modulo 3, and starts the slide on the
anchored clock. The slide is an underdamped analytic spring
(zeta*omega 5.5, omega-d 10, settled by 1.1s) evaluated on fixed
ticks: the outgoing figure slides left by DW*p, the incoming
figure enters from the right at DW*(1-p), and the incoming ground
with its sprigs cross-fades over the outgoing scene at alpha p.
Taps during a slide are ignored, so the rotation can never land
mid-swap. Three taps return to character 1.

Ambient 28s loop, all motion on whole cycles of the loop: sprigs
drift on 1 or 2 cycles with per-sprig phase, the figure sways
2 degrees on 1 cycle about a pivot at its base, and each
character's earrings swing as pendulums on 4 cycles.

Determinism: frame one is drawn synchronously at the constant
phase T = 6.4s (character 1 complete, sprigs mid-drift, earrings
mid-swing); the animation clock is anchored there and advances in
fixed 1/60 ticks, never from Date.now(). Sprig tables (exactly 14
per ground) are baked at load from a fixed-seed LCG. A `?seed=char=N`
QA hook starts the piece settled on character N; default play is
unaffected.

Fruit recipes are path data drawn directly each frame:
watermelon slice (dome, rind band, seed dots), lemon (ellipse with
end nubs and a leaf), banana (crescent with a stem tip), pear
(bezier body with stem, leaf, and the FRESH stamp: red stamp band
plus the word in hand-lettered stroke paths, the same marker hand
as the rest of the set). Garment prints (slices, lemons, bananas)
are drawn clipped to the torso path on the one canvas; no
offscreen canvas, no gradients, no shadowBlur anywhere.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Thumb rendered twice from the shipped script: byte-identical.
- QA probes at char=1 and char=2 confirmed the other two authored
  characters render complete and on-palette. First-pass fixes from
  those probes: the afro was rebuilt from a scalloped path (which
  read as spikes) into a cluster of ink circles, the lemon sprigs
  lost their nub circles (which chopped the outline on the lemon
  ground), the banana sprigs were scaled down to sprig size, the
  toucan was reseated on the fruit stack, and the pear moved inward
  so more of it survives the phone cover crop.
- Palette checked closed against the spec: grounds #FF4FA3 /
  #FFE066 / #FF9500, watermelon #FF3B3B, rind #2E7D4F, banana
  #FFD832, skins #F1C9A5 / #8A5A3B / #C68A4A, hair #1A1A1A /
  #C0392B, sunglasses #E63329 / #FF9ECF, ink #1A1A1A. Nothing else.
