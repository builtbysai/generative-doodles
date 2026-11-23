# No.637 "Una Tarde de Verano" — EXPANSION #77 seba-ilabaca, block 5 "Garden Hours"

## Concept

Ilabaca's garden-scale vignettes as a sketchbook of small night pages. Each page is
mostly empty dark: a thin hand-drawn border, one wobbly ground line, one small
subject and one plant element in the lower-center third. Negative space is the
point; nothing ever fills the screen and nothing is announced with text.

The book opens with three pages, in order:

1. The mouse and the tulip — a small gray mouse beside a three-petal tulip.
2. The cicada — a segmented shell clinging to a twig, folded wings behind.
3. The owl at sunset — a round owl on a branch in front of a low gray moon.

Drag sideways to turn pages (both directions, wrapping). Double-tap draws a new
vignette in the same grammar from a reserve list (chick, fox kit, beetle) and
inserts it as the current page; the book grows to six pages, after which further
double-taps redraw the last inserted page as the next reserve subject.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets, no text
  anywhere except the `<title>`.
- Palette is strict, the seven specced colors only: ground `#10151C`, sketch ink
  `#2A3340`, tulip petal `#C76B5E`, mouse gray `#8A8F96`, cicada shell `#B09A72`,
  owl feather `#4A5462`, haiku-gray moon `#D9D4C5` (also owl face and eyes' disc,
  chick down, fox muzzle and tail tip, wing translucency).
- Page model: a page is `{kind, seed, borderOff[144], groundOff[25], inserted}`.
  All wobble and layout variation derives from the page's own mulberry32 seed, so
  every page is a stable, reproducible drawing. Border offsets get a circular
  3-tap smoothing pass so the wobble reads as a hand line rather than a zigzag.
- Border: the rect perimeter is walked in 144 samples, each pushed along its
  normal by the seeded offset. Ground: a 25-sample wobbly line with a soft ink
  wash band under it (alpha 0.22).
- Subjects are parametric silhouette programs drawn small (scene width ~0.34 of
  the page's short side) sitting on the ground line at 70% page height:
  mouse (ellipse body, round ears, curled tail, tulip of three bezier petals),
  cicada (stacked segment arcs on a shell ellipse, head lifted clear, translucent
  wing wedges, legs reaching to a twig that stands visibly beside it),
  owl (body disc, ear tufts, moon-pale face disc, branch, low moon behind),
  chick (moon-down body and head, ink beak and legs, grass tuft),
  fox kit (feather-gray body, moon muzzle and tail tip, ink sprig),
  beetle (shell body with wing-case split, ink head and antennae, ink leaf).
- Micro-motion, all pure functions of the anchored elapsed clock:
  mouse nose twitch (a `sin^12` bob) and tail-tip sway; cicada tremor bursts
  (high-frequency sine gated by a slow `sin^8` envelope); owl blink (eyes shut
  for 0.2 s in every 7 s); chick peck (a 0.55 s dip inside a 2.9 s cycle);
  fox kit ear flick (inside a 4.3 s cycle); beetle antenna sway.
- Page turns: a fractional display offset eases toward the target page
  (smoothstep, 0.45 s); pages render modulo the book length so turns wrap
  seamlessly (owl back to mouse). While dragging, the offset follows the finger.
  Each page is clipped to its own vertical strip while sliding so a neighbour's
  border cannot bleed across the frame at rest. The curl shading at the incoming
  page's leading edge is ten layered translucent bands whose strength follows
  the turn's progress.
- Interaction timing runs on the same anchored clock (`elapsed` from the rAF
  loop), never on wall time: drag past 16% of page width turns; a quick tap
  under 0.35 s counts toward double-tap (0.38 s window).
- House rules: canvas sized from the Visual Viewport API with resize listeners
  on both `visualViewport` and `window`; `canvas.style.width/height` pinned in
  px inside `draw()`; phone detection via `window.screen` min dimension < 700
  with the `h > w*1.15` aspect fallback only when screen size is unavailable;
  on phones the margins tighten and the subject scale rises slightly (x1.06) so
  the vignette stays legible while still small in vast dark.
- Determinism: frame one is the synchronous `draw(0)` — page 1, mouse and
  tulip, all micro-motion at phase 0. The rAF loop is `typeof`-guarded and
  anchored to its first timestamp. No `Date.now`, no `Math.random`, no
  `document.createElement`, no offscreen canvas, no `ctx.filter`, no audio.
- QA hook: `?seed=page2` / `?seed=page3` start the book on the cicada / owl
  page; `?seed=chick|foxkit|beetle` starts with that reserve page inserted.
  Production loads carry no query string and are unaffected.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb rendered twice, `cmp` byte-identical, second render
  deleted. Re-verified after each fix round.
- Read back desktop, mobile, thumb: one wobbly border, the small gray mouse and
  red tulip low in a vast dark page, ground wash subtle, nothing clipped on
  mobile, no text.
- Fix round 1: neighbouring pages' borders bled into the frame edges at rest
  (their top/bottom edges cross the screen at offset ±1 page width). Fixed by
  drawing neighbours only while a turn is in progress and clipping each sliding
  page to its own strip. Border zigzag also softened with the smoothing pass,
  and the ground wash lightened (alpha 0.30 to 0.22, band 0.045 to 0.024 of
  page height) so it reads as a wash, not a shelf.
- Forced page checks (throwaway renders in /tmp via the seed hook, read back,
  then deleted):
  - Page 2, cicada: after fix round 2 it reads clearly — segmented tan shell
    with lifted head and eyes, legs visibly reaching to the twig beside it,
    leaves at the twig top, one translucent wing wedge showing. (First version
    hid the twig and legs behind the shell and read as a floating grub; the
    twig was moved clear to the side, legs drawn over the shell reaching to it,
    wings enlarged and lightened.)
  - Page 3, owl: round feather-gray owl with moon-pale face, open eyes, ear
    tufts, perched on its branch line in front of the low moon disc. Passes.
  - Reserve pages chick, fox kit, beetle: each reads as its subject in the same
    grammar with its plant element (grass tuft, sprig, leaf). Passes.

## Deviations

- The strict palette has no fox or chick color of its own: the fox kit is drawn
  in owl-feather gray with moon muzzle and tail tip, the chick in moon down with
  an ink beak, exactly as the brief's palette note allows ("haiku-gray moon,
  also eyes, chick down may use it"). No new hues introduced.
- The page-curl shading is drawn as layered translucent black bands (a shading
  device only, alpha <= 0.16); all drawn shapes themselves use palette colors.
- Double-tap at the six-page cap redraws the most recently inserted page rather
  than refusing, per the brief's replacement rule; the three launch pages are
  never replaced.
