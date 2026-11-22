# №1979 The Bread Session (CR4 / PP1226, EXPANSION #258 ciara-reddy)

Driver: a bare concrete room, a white radiator, and a crouching figure in headphones listening deadpan to a loaf of bread wired into the headphones, shot straight like a product photo.

FIRST_T: 3 s. Cycle length: 12 s (listening nod 6 s, breath 12 s, cable sway 4 s). Frame one is a pure function of FIRST_T and the fixed seed 1979; no wall clock and no unseeded random at frame one.

Interaction: tap to re-stage the set. Each tap swaps the absurd object to the next pair in a deterministic cycle (bread, shoe with telephone cord, melon with guitar lead, then bread again) and the figure re-poses around it over a 0.8 s ease. Never click-to-reload; the tap is the art department re-dressing the set.

Probe results (node-canvas, 720x720, virtual clock t = 3, settled frame drawn at t = 4.5):
- Load: stage 0 bread, pose crouch 0.60, lean 0.32, tilt 0.10. Render md5 0e50723e49798b063912bfdf5b45a06d.
- After one tap: stage 1 shoe, settled pose crouch 0.90, lean 0.48, tilt 0.20, coiled telephone cord visible. Render md5 34989e090e373327069c2033b86e043e.
- After a second tap: stage 2 melon, settled pose crouch 0.35, lean 0.22, tilt 0.04, thick guitar lead visible. Render md5 f7ddd30cdc8d67d7ca762923d4d2ce0b.
- All three renders differ; the tap cycle is deterministic and returns to bread on the third tap.

Deviations from the prompt: none in the scene. Visual-only audio: the headphones and bread imply sound, but the piece ships no audio. Per the Franke rule the visuals run on a closed-form sound model (the nod, breath, and cable sway are periodic functions of the virtual clock), and real WebAudio would only ever start lazily inside a gesture; visual-only is acceptable here.

Known warts:
- The guitar plug at the melon end is small and mostly hidden behind the thick lead; the lead itself carries the read.
- The headphone band reads slightly halo-like from behind the head at some phases, but the ear cup and band stay legible.
- The figure's back arm is mostly hidden behind the torso; only the hand on the back knee shows.
- On phones the square scene sits centered on the wall-color page ground rather than filling the screen, per the centered-scene house rule, so there is wall-colored space above and below the room.

Fix rounds: 1. The first build read as standing bent over rather than crouching, the floor stains were too strong, and the phone render stretched the scene vertically; the crouch was deepened (front knee forward and below the hip), the stains were toned down, and phones now keep the square scene on the wall-color ground.
