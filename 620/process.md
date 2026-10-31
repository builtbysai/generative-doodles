# No.620 "From the Rotting Body, Flowers"

EXPANSION #75 mariona-cabassa (theinvisiblecircle), prompt block 4 "De Mi Cuerpo, Flores".

## Concept

Her book-of-death doctrine as a growth cycle: "From my rotting body, flowers will bloom." A clean white skeleton lies in profile repose across the center of a mint-green ground, a small bone-white moon in the top-left corner. Flora erupts radially from the figure in all directions and the whole piece cycles forever through four phases: bare bones with moss dots, rising shoots, full bloom, and petal fall, then bare again. No gore, no text; the bones are flat, iconic, botanical.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets. Strict six-color palette: mint #BFE3D0, bone #F2EFE6, shoot green #6A9A5B, bloom pink #E87B9C, bloom yellow #F2C14E, night accent #2B3A67.
- The skeleton is drawn procedurally in a 520-unit design space (cranium with mint eye socket, nose gap and teeth lines; nested ellipse-arc ribcage; vertebrae; pelvis; resting arms; extended legs) and is always drawn AFTER the flora, so the figure stays recognizable at every phase by construction.
- Flora: 60 seeded plants (mulberry32, seed 620075) generated once as data: flowering stems, coral fronds, and three-flower sprigs. Base points hug the body line; directions point outward; each plant carries a stagger offset, sway phase, petal count, and per-petal fall thresholds/spins/drifts drawn from the same seeded stream.
- Phase system: a global cycle parameter u in [0,1) over 48 seconds. Phase keyframes: bare [0, .20), shoots [.20, .46), bloom [.46, .72), fall [.72, 1). Per-plant growth = smoothstep rise during shoots (staggered, center plants first) held through bloom, then a shrink to a stub late in fall. Bloom openness = smoothstep rise during bloom, easing closed during fall. Falling petals are analytic: each petal detaches at its seeded threshold u and its position is a pure function of (u - threshold), so the fall is deterministic and stateless. Exactly three night flowers: three stem-type plants (one blossom each) are assigned the indigo accent; all other blossoms are pink or gold.
- Interactions: double-tap advances u to the next phase keyframe with a 0.9 s eased jump (offset-based, so the cycle continues seamlessly afterward). Drag sets a wind value that bends all flora and drifts falling petals, decaying exponentially once released. Single tap does nothing. No click-to-reload anywhere.
- Determinism: frame one is drawn synchronously at the fixed cycle value U0 = 0.355 (shoots just begun, first stems rising around the ribcage and skull). The rAF loop (typeof-guarded) is anchored as U0 + elapsed-since-load. No Date.now, no Math.random; all variation comes from the seeded streams.
- House rules: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas.style.width/height pinned in px inside draw(); phone detection via window.screen physical size (min dimension < 700 px) with aspect fallback (h > w*1.15); on phones the figure stays horizontal and centered at 88% of width and the page ground is the mint.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice, byte-compared with cmp: identical; second render deleted. Re-verified after every fix round.
- Frame one read-back: white skeleton lying across the mint, skull with calm eye socket at left, ribcage and legs clear, green shoots rising radially around it, bone moon in the top-left corner. Mobile: figure horizontal and centered, flora radiating, nothing clipped.
- Phase verification with state-forced throwaway copies in /tmp (U0 swapped, rendered, read, then deleted):
  - Phase 1 (u=0.10): bones alone on the mint with only the seeded moss dots hugging them; moon present; figure fully recognizable.
  - Phase 3 (u=0.58): full radial eruption, stems and fronds reaching toward the edges, pink and gold folk blossoms open, exactly three small indigo night flowers, skeleton still drawn clean on top.
  - Phase 4 (u=0.85): flowers shedding; detached petals visible as loose pink/gold ovals drifting below the blossoms, stems still up but beginning their shrink, figure unchanged and readable.
- Fixes during QA: first frame-one pass was too sparse (thin stems, tiny leaves, late shoots), so U0 moved 0.30 to 0.355 within phase 2, stem weight and leaf size raised, plant lengths lengthened, figure scale raised. Night-accent picks were restricted to stem-type plants after a sprig pick produced a cluster of indigo blossoms instead of single night flowers.

## Deviations

- None from the prompt. The prompt allows "a small skeleton, or a sleeping fox; pick one per session": this build picks the skeleton, fixed for the session and every session (the seed is fixed), which keeps frame one deterministic and the figure constant as required.
