# №1276 "She Arose" (suchitra-mattai SM5, PP435)

## Prompt
Mattai's *she arose (from a pool of tears)* (2024): a female figure at the
center of a circular pool of braided worn-sari ropes radiating outward, arms
raised, in a state of becoming. Palette: sari cobalt #1F4E79, magenta
#C2185B, marigold #E8A020, ivory #F0E7D3, shadow #1B1712, background deep
plum #241A26. Vertical; figure centered, head above middle; braids trail off
beyond the frame at the edges; no floor line. The figure breathes; drag
upward and she rises, drag downward and she sinks.

## Critical constraint reading
The prompt forbids a literal body mesh: "the figure exists only in braid
density; no face." This piece honors that literally. There is no body
silhouette, no limbs drawn as limbs, no face. What reads as a dancer is a
density effect: nine interweaving near-vertical braids spread across a wide
column at center, two fanning bundles of diagonal braid streams rising from
a wide shoulder band, and a small off-center tangle of partial braid loops
where a head would be. Remove the density and there is no figure at all;
that is the point. The first pass drew a thin column with a circle head and
read as a stick figure, so the column was widened to nine braids, the arms
were fanned from a spread shoulder band with bowed waves, and the head
became jittered partial arcs instead of concentric circles.

## Mechanics (all closed-form over piece time and recorded events)
- Breathe: ring radii scale by 1 + 0.028 * sin(2*pi*t/7); the braid field
  expands and contracts on a 7 s cycle. Frame one is t = 0, constant phase.
- Pool: concentric rings of three crossing ribbons each (different lobe
  counts per ribbon, seeded phases), radiating past the frame edges.
- Drag: vertical drag only. While dragging, the figure shift equals the drag
  dy, clamped to +/-0.24 * H (negative = risen). On release the shift decays
  as exp(-dt/1.4) back to rest. Rising stretches the pool downward below
  center (braids streaming down like hair in water); sinking gathers the
  rings. Verified through the piece's own pointer handlers: a 120 px drag up
  moved the center column's median up, a 120 px drag down moved it down.
- No tap action, no text except the title, no audio anywhere.

## House adaptations
- No typed input, no audio, no gradients, no filters, no shadowBlur, no
  offscreen canvas, no unseeded randomness (integer-hash seeds only).
- Visual Viewport sizing with resize listeners on visualViewport and
  window; canvas pinned in draw(); phone detection via window.screen with
  aspect fallback; field composition is full-bleed at every size, so the
  phone read matches desktop.
- Deterministic first frame: t = 0 at load; the rAF loop is anchored as
  offset + elapsed-since-load; event state is a closed-form function of
  recorded drag events and t.

## QA
Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop,
390x844 mobile, and 720x720 thumb; all three inspected. Thumb rendered
twice, cmp byte-identical. Token scan clean of Math.random,
createElement, AudioContext, getUserMedia, gradients, shadowBlur,
offscreen canvas, and pixel buffers.
