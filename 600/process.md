# Galleria Dolly, №1876 (SM5, PP1123, study #245 simone-massaron)

## Spec
A slow, endless forward dolly down a black and white galleria. Repeating
arch bays flow past toward a bright vanishing point that never arrives.
Arches regenerate procedurally with slight variation: keystones,
shopfronts, pigeons. High contrast light shafts rake across the stone and
shadows crawl slowly as the dolly advances. The bright exit breathes
slightly, but the camera never reaches it.

## Palette
Silver gelatin black and white only: deep blacks (#0A0A0A, #101010),
paper whites (#F5F5F5, #E5E5E5), and nine greys between (#1A1A1A,
#232323, #2E2E2E, #4A4A4A, #6E6E6E, #8A8A8A, #949494, #BFBFBF,
#111111 for plate ink). No color anywhere.

## Motion and interaction
Watch only. The dolly advances at a constant 0.22 bays per second and
never changes speed; bays recycle behind the camera, so the tunnel has
no end. Light shafts drift on a slow independent clock (0.05 to 0.07 Hz
terms) and the exit glow breathes on a 0.4 rad/s sine. No click, no drag,
no reload. Reduced motion freezes at the fixed first frame.

## Technical approach
2D canvas. A procedural arch bay generator (pier, arch, vault, shopfront,
skylight, keystone, pigeons) is drawn through a one point perspective
projection with the vanishing point dead center, slightly above middle
(0.44 of field height). Bays are drawn far to near so near piers occlude
far ones. Per bay variation comes from mulberry32 seeded with the
absolute bay index, so a bay keeps its character as it recycles. Frame
one is deterministic: fixed phase t = 9.0 s, dolly mid bay, seeded RNG
only, no Date.now or Math.random.

## Deviations from the prompt
None. One presentation note: the nearest bay's skylight reads as a large
pale window high in the vault at frame one, which is the correct
perspective of a skylight one bay ahead; it settles as the dolly moves.

## QA
Rendered the actual script with node render-piece.js at 1280x900,
390x844, and 720x720 and inspected all three. Desktop: endless
perspective reads, arches and shafts visible, plates legible, ground
outside the square clean. Mobile: full bleed galleria, plates legible and
unclipped. Thumb: clear at small size. One fix round: light shafts and
the floor trapezoid spilled past the desktop square onto the ground;
the scene is now clipped to the field rect (plates drawn unclipped after)
and pixel sampling confirms the ground is clean.
