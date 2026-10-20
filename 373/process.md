# No.373 Sunflower Suite

## Concept

After Olena Kovalova (al_kovalyova_design) and her collection
architecture: a fabric collection is not six unrelated prints but
one motif library shipped as a suite, a hero, a tossed secondary,
a geometric blender, a check, a line-art variant and a flight
field, all sharing the same DNA. The piece is that suite. Six
panels in a 3x2 grid, each running its own gentle loop:

1. Hero sunflower toss: bold sunflowers, petals #E8A93D and
   centres #5C4326 on cream #F5EFE2, with petal-dash accents.
2. Tossed owl and bird print on sage #8FB5AE, sepia #7A5C44.
3. Geometric petal blender on chocolate #3D2B1F, dashes #C98F2F.
4. Gingham check, #D9A441 on cream, built from flat bands with a
   mid tone #EBCB85 where a single band lies and the full gold
   where bands cross.
5. Line-art sunflower sketch, grey #6B6B6B on #F1EBDC: the hero
   sunflower redrawn as pure outline on stems.
6. Sepia bird flight field on cream, near birds in profile with
   flapping swept wings, far birds as small double arcs.

## Construction

One canvas, flat colour only, no gradients, no shadowBlur, no
offscreen canvas. All marks are drawn directly each frame from
fixed authored tables (flower, owl, bird and stem positions are
unit coords inside each panel box; sizes are fractions of the
box's smaller side).

One shared motif library serves all six layouts, asserted at
load (PANELS.length === 6):

- The sunflower petal path is filled for the hero toss and
  stroked for the sketch panel; the sketch flower reuses the
  same path for its stem leaves.
- The petal-dash is the hero's toss accent and the blender's
  whole grammar (a 6x5 grid, alternating diagonal rotations).
- The bird flies in the flight field and perches small among
  the owls; the owl is a sepia silhouette knocked out of the
  sage, eyes, beak and belly scallops in the ground colour.
- The check is drawn as flat rectangles: base cream, vertical
  and horizontal bands in the mid tone, crossings in full gold.

Each layout takes an absolute box, so the same functions serve
the grid cells, the expanded frame and the filmstrip miniatures
unchanged.

Motion: one shared seamless 24s master loop. Hero sunflowers
sway on 2 whole cycles, owls bob on 1, blender dashes pulse in
scale on 2 with a per-cell phase, the check drifts exactly one
56px band pitch per loop, sketch stems sway on 1 whole cycle,
flight birds cross exactly one field width per loop with wings
on 6 flap cycles. At rest, frame 24s is pixel-identical to
frame 0.

Interaction (tap and drag are kept separate by a 12 design px
movement threshold; taps are state changes only, never a
reload):

- Grid view: TAP a panel to expand it full-frame. The other
  five collapse to a filmstrip along the bottom edge, each cell
  a live miniature of its pattern, in suite order. The
  filmstrip is the only chrome and it is made of the patterns
  themselves: no labels, no dots, no text.
- Expanded view: TAP a filmstrip cell to switch the expanded
  pattern to that cell's pattern. TAP the expanded pattern
  itself to return to the suite grid. DRAG horizontally on the
  expanded pattern to scrub: the current pattern slides with
  the pointer and the neighbouring pattern enters from the
  side; on release past 22 percent of the frame width the
  neighbour takes over (wrapping around the six), otherwise the
  current pattern settles back. A drag that starts on the
  filmstrip does not scrub.

Determinism: the first frame is drawn synchronously at the
constant phase T = 7.3s, the suite grid with every panel
mid-loop, and the animation clock advances from that anchor in
fixed 1/60 ticks. No wall-clock phase anywhere, so the
thumbnail reproduces byte-identically from the shipped script.

Sizing: design space 1280x900, centred fit, page ground in the
suite cream #F5EFE2 in both views. Visual Viewport sizing with
resize listeners on visualViewport and window; canvas pinned
every frame via style width and height in px; phone detection
via window.screen physical size (min dimension under 700px)
with the aspect fallback. Pointer coords convert through the
stored fit transform (S, OX, OY).

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png) and 720x720 (thumb.png). All six
  panels read clearly at all three sizes; the mobile render is
  a clean centred fit on the cream ground.
- Thumb rendered twice and byte-compared: identical
  (determinism gate passed).
- Expanded state probed with a temporary copy (not shipped):
  hero expanded full-frame with the five other patterns live in
  the filmstrip, in suite order. Mid-scrub probed the same way
  (owl panel dragged 330px left): the blender enters from the
  right, both patterns clipped at the frame, filmstrip correct.
- Fixes during QA: the blender dashes were enlarged (0.34 to
  0.44 of the cell) so the blender reads at thumbnail size, and
  the sketch heads were reduced and respaced (radii 0.20/0.24/
  0.175 down to 0.130/0.150/0.115 of the panel) so the three
  line-art flowers stand separate instead of tangling.
- Hygiene: grep confirms no em dashes and no absolute URLs in
  the piece; exactly one canvas; rAF typeof-guarded.
