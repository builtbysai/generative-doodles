# №1951 Sweets as Score

Prompt block: LR8 / PP1198, study #254 lucy-railton.

Driver, in one sentence: a stark white tabletop in a dim room holds a fan already breathing and a small synth already droning while a whip and two foil sweets wait along the edges, and dragging an object onto the surface earns it a voice while dragging a sweet to the center ring begins the next movement and grows the pile of unwrapped sweets, so the table feels like a score being performed rather than a still life.

## Palette

Named colors from the prompt, hand-picked hexes: table white #f7f5ef with edge shadow #e4e1d6; dim neutral room #454542 to #2e2e2c; soft grey object shadows #b9b7ae and #8f8d84; plate ink #2b2b28 with muted ink #6f6d66; sweet foil in bright red #d9261c, green #1f9e4d, orange #e8700a; whip near-black #1f1e1c; synth body #232320 with bone-white keys #f2efe6; hint pill #e4e1d6.

## Mechanism

- Table: a white trapezoid seen from above at a slight angle, far edge narrower (x 0.10 to 0.90 at y 0.12), near edge meeting the frame, with a soft dark shadow along the far edge. The dim room shows around the top and sides. Field-like composition: full-bleed on phones, square on desktop.
- Voices, one agent per object type: the fan breathes, a soft grey wash swelling and fading on a breath period of 4.6 s at movement 1, with its ribs opening and closing on the same breath; the synth holds a drone, three concentric rings expanding at 6 px/s and fading, spaced 15 px at movement 1; the whip flicks a sharp transient, a curved stroke flashing from the lash tip and fading within 0.5 s on a seeded schedule starting at t = 3, every 5.3 s at movement 1.
- Placement: objects start along the table's edges (whip left edge, red and orange sweets bottom edge). Dragging a fan, whip, or synth onto the table surface places it and starts its voice; a placed voice can be picked up and moved again. At most three voices, so the table stays rigorous, never chaotic.
- Movements: dragging a sweet to the center ring eats it and begins the next movement, up to movement 4 (three sweets). Each movement re-tunes the ensemble: breath period shortens by 0.3 s per movement, ring spacing widens by 3.5 px, flick interval shortens by 0.4 s. The unwrapped pile left of the center ring grows by one crumpled wrapper and one round sweet per movement played, and four movement dots under the ring fill in as movements are played. A sweet dropped off-center returns to the tray, uneaten.
- Audio: visual only, no WebAudio. The voices are a closed-form visual sound model, per the Franke audio rule. No click-to-reload; drag never reloads.

## Determinism

- FIRST_T = 9. At t = 9 the fan and synth are already placed and voicing, the green sweet has been eaten so movement 2 is underway, the pile holds one unwrapped sweet, and the whip and the red and orange sweets wait in the edge tray. The fan breath is mid-exhale and the synth ring is open, so the piece reads at once.
- Seeded PRNG mulberry32(1951), fresh instances per draw from the piece number and a fixed salt; every frame is a pure function of t plus the placement and movement state, which only changes through interaction, so frame one is fully reproducible.
- Motion is slow: fan breath about 0.22 Hz, synth rings drifting at 6 px/s, whip flicks on a 5 s schedule, all well under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.
- QA hooks: location.search reads ?t=<seconds> to set the virtual clock at load, ?place=<object>:<x>:<y> to place one object at load with normalized coordinates (whip, fan, synth, or sweet, which eats the next uneaten sweet when dropped in the center zone), and ?seed= to vary the texture seed. window.__draw drives draw() with a virtual clock, and window.__piece1951 exposes place(type, x, y), movement(), eaten(), placedCount(), breathPeriod(), ringSpacing(), redraw(t), and firstT.

## Acceptance criteria, as numbers

- Frame one: t = 9, movement 2, eaten 1, two voices placed (fan, synth), whip and two sweets in the tray. Second 720x720 render byte-identical to thumb.png, md5 8b7521a65ffb9ec6976a26dac76ac1ca.
- Time probe: ?t=12 at 720x720, md5 7d53aefe6c8ef76109dea5b6e09ec183, different from frame one.
- Whip placement probe: ?place=whip:0.45:0.5, placedCount 3, movement still 2, md5 e69d17ae43a3ffa21d74f83b91842fb7, different from frame one.
- Sweet-to-center probe: ?place=sweet:0.5:0.55, movement 2 to 3, eaten 1 to 2, breath period 4.3 s to 4.0 s, ring spacing 18.5 px to 22 px, md5 be397c92e5f57da1a0e50f565b04ad1d, different from frame one; the render shows the red sweet gone from the tray, the pile grown to two wrappers, three movement dots filled, and visibly wider drone rings.
- Sweet off-center probe: ?place=sweet:0.3:0.3, movement stays 2, eaten stays 1, md5 8b7521a65ffb9ec6976a26dac76ac1ca, identical to frame one, the sweet returns to the tray.
- Re-tune values by movement: movement 1 breath 4.6 s, ring 15 px, flick 5.3 s; movement 2 breath 4.3 s, ring 18.5 px, flick 4.9 s; movement 3 breath 4.0 s, ring 22 px, flick 4.5 s; movement 4 breath 3.7 s, ring 25.5 px, flick 4.1 s.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. Plates legible, no collisions, hint readable on its pill on all sizes, table full-bleed on the phone and square on desktop, fan breath wash and synth drone rings visible at frame one, whip waiting on the left edge, red and orange sweets along the bottom edge, pile of one unwrapped sweet beside the center ring, movement dots showing 2 of 4 filled.
- Movement-3 probe render inspected: pile grown, red sweet gone, drone rings wider, plate reads Movement 3 of 4.
- No em dashes in visible copy or in this file.

## Fix rounds

1. First render showed the center ring as a tall narrow oval on the phone (radii scaled by W and H separately). Center ring radii now scale by min(W, H) and the center hit test uses the same radii, so the ring stays round on phones and the drop zone matches the drawn ring.
2. The ?place= hook was applied before resize(), when W and H were still 0, so the new center hit test divided by zero and a sweet-to-center probe silently failed (movement stayed 2). The hook now applies after resize() and before the first frame. Re-probed: sweet-to-center advances to movement 3, off-center still returns to the tray.
3. Parent fix round: the top plates were drawn in near-black ink on the dark room above the table and were barely legible. Added a warm off-white plate ink (#efece2) for the title, date, descriptor, and movement lines; the hint pill keeps dark ink on the white table. Thumb re-rendered and re-gated byte-identical (md5 89f6312a686e53c65288101f6a57719b).

## Deviations from the prompt

- The prompt names no timings, counts, or tray positions. The opening state (fan and synth placed, green sweet eaten, movement 2), the breath period 4.6 s, ring spacing 15 px, flick interval 5.3 s, the re-tune steps per movement, the four-movement cap, and the tray slots are invented staging for the named mechanism, so frame one already reads as a performance underway.
- The prompt calls for a fan, a horsehair whip, a small synth, and foil sweets as improvisation prompts with real timbres. The piece realizes all four as a closed-form visual sound model with no WebAudio, per the Franke audio rule; the visible behavior matches the prompt (breath wash, sharp transient, drone ring, movement marker) without sound.
- The synth is drawn as a small dark body with bone-white keys and one knob rather than a specific historical instrument; the fan is a folding fan of nine ribs.

## Known warts

- The whip waiting on the left edge sits half over the table rim, its shadow spilling onto the dim room; it reads as waiting on the edge, but the shadow is cut by the table boundary.
- The unwrapped pile is small (one wrapper and one dot at frame one) and can be missed at thumb size; the movement dots carry the count more clearly.
- At movement 4 the drone rings are at their widest and can overlap the fan's breath wash when the synth is placed near the fan; the rings are faint enough that they read as overlapping voices, not clutter.
- The table is intentionally near-empty at frame one, so the thumb reads as mostly white with a few objects; the piece only shows its character once the visitor starts placing objects.
