# Doodle №8998: Tennis Ball (2026-08-30)

**File:** `8998/index.html` (self-contained, vanilla canvas, no dependencies)

## Concept
A tiny raytraced room: one sphere resting on the floor of a five-sided box,
lit by three colored point lights with shadows, diffuse and Blinn-Phong
specular, rendered at 96x61 and upscaled pixelated. Below it, the companion
composition: concentric wobbling rings painted ONLY in colors sampled off
the sphere's lit skin, so every color is the same light in the same room.
Click relights the room and the whole piece re-resolves coherently.

## Technique synthesis (from study, not copied)
- **Real-time tiny raytracer** (meodai ray-color lineage): sphere + five
  planes with bounded limits, three seeded point lights, per-light shadow
  rays, distance attenuation, soft filmic-ish tonemap, gamma 2.2.
- **Palette as measurement, not choice**: ten surface points on the visible
  hemisphere are shaded through the same light rig, deduplicated by color
  distance (cap 7), and become the ring composition's only paints.
- **Restrained triads**: light hues are seeded as a 120-degree triad at
  moderate saturation, so rooms stay believable and palettes feel lit.

## Parameters
- Seeded PRNG (mulberry32), `?seed=` in URL or click to relight
- Default seed 899803: sage/cream/blue-gray room, 4-color palette

## Verification
- Zero console errors on load (desktop + 390px mobile); no overflow
- Rendered 3 seeds headless: complete rooms with correct shadows and light
  pools in all three; palette strip always matches the room's light
- Two real bugs fixed during iteration: (1) three of five wall planes had
  wrong-signed offsets, collapsing the render to flat gray; (2) the right
  wall's offset duplicated the left wall's plane, leaving a wedge of void;
  both fixed at the geometry source, verified per-pixel
