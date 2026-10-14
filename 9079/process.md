# №9079 · Impasto

Inspired by Jason Anderson's palette-knife landscapes: the stained-glass
jigsaw composition from his restoration background, the thick impasto
laid down in decisive daubs, the way ridges of paint catch the light
as you move around the room.

## Technique

- **Jigsaw ground**: jittered grid of seed points, relaxed twice with Lloyd
  iteration, then Voronoi cells clipped by half-planes. The cells are the
  leading between panes of glass.
- **Landscape zones**: sky (ultramarine, cobalt, violet), a low sun band
  (tangerine, coral, rose), and sea-land (teal, emerald, ochre, umber),
  with a wavy boundary and occasional stray accents crossing zones.
- **Knife work**: each cell is filled flat, then 4-7 chunky blades are laid
  inside (clipped to the cell), each a rotated ellipse in a hue/lightness
  variant of the base, doubled with slight offsets for a rough edge.
  A dark lee-side shadow gives the paint its thickness.
- **Raking light**: every cell stores a ridge highlight along its knife
  direction. Each frame the highlight alpha is recomputed from the angle
  between the knife and a moving light source, so brightness slides across
  the surface like walking past the canvas. A soft sheen follows the light.

## Interaction

- Drag or move the pointer: the light swings toward you, ridges ignite
  where the knife faces the light.
- Idle: the light drifts on its own slow orbit.
- Double-tap: a new seed, another painting from the series.

Deterministic seed 9079, so the canonical state is stable. 60fps,
DPR capped at 2, full-bleed, touch-safe.
