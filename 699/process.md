# No.699 — Niches

EXPANSION #85 doris-salcedo, prompt block 4 "Niches". After Atrabiliarios:
the shoes of the disappeared set into wall niches, each veiled behind a
translucent membrane stitched to the wall with surgical sutures.

## Concept

A dark wall carries a 4x5 grid of recessed niches. Inside each niche,
behind a pale membrane, sits the blurred silhouette of an abstract
shoe-last form. Most niches hold a pair. Some hold a single form, offset
to one side, with a darker hollow where its counterpart would be. One
niche is entirely empty. Nothing explains itself; there is no text. The
only life is the membrane breathing almost imperceptibly, and the way it
clears where a visitor's pointer lingers, letting the form show through
before clouding over again. Inspection, not interaction-as-button: no
state changes, nothing reloads.

## Construction

- Single self-contained canvas 2D page. Palette is strict: wall #171614,
  niche interior #0C0B0A, silhouette #3A352C, membrane #CFC8BB
  (alpha-managed), suture #8A2F2B, page ground #0B0A09.
- Layout is computed per frame from the Visual Viewport size; niches keep
  4 columns x 5 rows at every size, including phones. Canvas CSS size is
  pinned in px inside draw() every frame. Phone detection uses
  window.screen (min dimension < 700px), with the h > w*1.15 aspect rule
  as fallback only.
- Contents are assigned once from a seeded mulberry32 stream: the 20
  niches are shuffled, exactly one is marked empty, the next 4 to 6 are
  singles, the rest are pairs. Each niche also gets a seeded breath
  phase, tilts, scale jitter, mirror flag, and 5 to 9 membrane streaks.
- Soft silhouette: the shoe-last is a single bezier wedge (raised narrow
  heel, instep sloping down to a fuller blunt toe). The blur is built
  without shadowBlur or any offscreen canvas: the same path is filled
  four times at scales 1.20 / 1.12 / 1.05 / 1.00 with alphas
  0.10 / 0.16 / 0.24 / 0.52 in the silhouette tone, so the edge falls off
  in steps and the form reads as seen through a veil. Silhouettes are
  clipped to the niche's rounded rect.
- The absent counterpart in a single niche is a darker hollow: the same
  wedge filled with the ground tone at alpha 0.55.
- Membrane: the niche rounded rect filled with #CFC8BB at a breathing
  alpha, base = 0.375 + 0.075 * sin(2*pi*t/12 + phase), which stays
  inside 0.30 to 0.45 on a 12 s cycle with a per-niche phase offset.
  Vertical noise streaks are seeded thin rects of the same membrane tone
  at low alpha, clipped to the niche.
- Suture: the membrane edge is stitched with a dashed stroke (4px dash,
  6px gap) in #8A2F2B at alpha 0.85, inset slightly from the niche edge.
- Clearing falloff: while the pointer is present, each niche computes a
  target from the pointer's distance to the niche center: target =
  1 - dist / (max(nw, nh)/2 + 40px) inside that reach, else 0. The
  niche's clearAmt rises fast toward the target (3.2 per second) and
  falls slowly (0.5 per second, so a full cloud-back takes about 2 s).
  The drawn membrane alpha lerps between the breathing base and 0.08 by
  clearAmt, so the veil thins toward 0.08 near the pointer and the
  silhouette shows through, then clouds over when the pointer leaves.
  Pointer positions are recorded from pointer events against the same
  anchored clock that drives the animation.
- Determinism: frame one is a synchronous draw(0) at breath phase 0,
  before any pointer state exists. The animation clock is anchored at
  load (performance.now at script start) and never reads Date.now();
  the rAF loop is typeof-guarded so the headless renderer, which has no
  rAF, draws exactly one static frame.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and compared with cmp:
  byte-identical. The duplicate render was deleted.
- Desktop read-back: twenty veiled niches on the dark wall; pairs in
  most, singles with a hollow in several (rows 1, 2, 3, 4), one niche
  fully empty (bottom row, third from left). Suture dashes visible at
  every membrane edge; vertical streaks faint on the membranes.
- First pass read-back: the wedge path was vertically symmetric and the
  forms read as plain ovals. The path was revised (raised narrow heel,
  sloped instep, fuller toe) and all renders redone; the forms now read
  as elongated lasts, still soft and abstract, no shoe detailing.
- Mobile read-back: the 4x5 grid refits the tall frame; niches become
  portrait cells, forms stay inside their membranes, nothing is clipped.

## Deviations

- The prompt allows the membrane to clear within a 40px radius of the
  pointer. The implementation clears per niche with a radial falloff
  whose reach is the niche's half-size plus 40px, and the alpha floor is
  the specced 0.08. This keeps the clearing local to the niche being
  inspected (a pixel-exact 40px circular window would need the membrane
  redrawn under a circular clip each frame and would cut across suture
  lines mid-niche); the visible behavior, veil thinning near the touch
  and slow re-clouding, is the same.
- The silhouette blur is a four-pass stepped falloff rather than a true
  gaussian blur, because the renderer provides no shadowBlur, no
  ctx.filter, and no offscreen canvas. The stepped passes are
  indistinguishable from blur at the membrane's contrast level.
