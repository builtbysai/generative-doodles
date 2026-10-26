# №456 Multispecies Square (EXPANSION #52, prompt FM8)

## Concept
Her "Vers une cite multi-speciste": one green city square in a single light.
A big tree with a treehouse anchors the left third, ivy-covered Haussmann
buildings form the backdrop across the top, and a sand path curves from the
bottom-right corner up toward the tree. Inside the square, a dozen small
believable behaviors run at once: four geese peck and waddle on waypoint
loops, a piglet trots the path, two kids bob on stilts, a jogger loops the
path, and two grandmothers sway on a bench. No gags, no speech bubbles,
no scoring, no text of any kind in the piece.

## Construction
- Single self-contained index.html, canvas 2D only, no external assets.
- Sizing from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas.style.width/height pinned in draw();
  phone detection via window.screen (min dimension under 700px) with the
  aspect h > w*1.15 fallback. Field-like landscape composition: full-bleed
  on phones, a centered 4:3 landscape frame on desktop over the peach
  sky-wash page ground.
- Determinism: first frame drawn synchronously at constant loop phase 1.5;
  the rAF loop is anchored as phase + elapsed-since-load (performance.now,
  never Date.now()); rAF guarded by a typeof check; no offscreen canvases,
  no document.createElement; background and agents painted directly each
  frame from fixed data.
- Depth via three ground bands (far, mid, near greens) with agent scales
  0.70 / 1.00 / 1.20-1.35 by band. Agents are state machines on fixed
  phases: geese follow closed waypoint loops with periodic head-dip
  pecking and waddle rock; the piglet trots the bezier path back and forth;
  stilt kids bob and sway; the jogger loops the path with a parallel
  return leg; grandmothers sway on the bench.
- Interaction: drag is a gentle disturbance only. Geese within 20% of frame
  width of the fingertip scatter away and decay back onto their waypoints;
  the piglet follows the fingertip briefly (weight fading over 2s) then
  returns to the path. Never click-to-reload; no in-piece UI or hint text.

## QA log
- Rendered with node ~/workspace/tools/render-piece.js at 720x720 twice:
  thumb.png md5 08227addd97636550831a6d4253d8907 both runs,
  byte-identical. Determinism gate passed.
- Rendered at 1280x900 desktop and 390x844 mobile and inspected both.
  Desktop: tree left-third with treehouse and ladder, curving path from
  the bottom-right, four ivy-covered buildings as backdrop, all agents
  visible and legible (4 geese, piglet, 2 stilt kids, jogger, 2
  grandmothers on the bench). Mobile: full-bleed, same scene, all agents
  visible, treehouse and path intact.
- Fixes found during QA and applied: (1) first build drew agents at
  sub-pixel size because agent scale lacked the frame width factor; fixed
  with a frame-width agent scale, then re-rendered and re-inspected.
  (2) First-frame coincidences put a goose over a stilt kid's head and
  stacked the piglet and jogger clipped at the bottom-right corner; fixed
  by moving the path end inside the frame, shifting one goose phase, and
  offsetting the jogger's loop phase. (3) Canopy and ivy ellipses were
  stretched on portrait phones; fixed to frame-width radii.
- Nothing pushed to any repo, per the build brief.
