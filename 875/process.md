# №875 Pay Phone Portal

SOA5 / PP1275, study #264 sheldon-omar-abba. Gallery date 2004 · 06 · 04.
Interaction: tap-earned portal hop. Hint: "Tap to step to the next phone."

## Driver

A dead pay phone on a city corner at dusk, its booth holding a
photograph behind the glass that glows faintly while the street
goes on around it. The phone is the frame and the neighborhood is
the gallery. Street life drifts past and headlights sweep the
brick, but the photograph inside stays. A tap steps through the
portal to the next dead phone in the city, because the mechanism
is momentary portals and the city is the network.

## Mechanism

One viewer position, three phone-booth scenes sharing it. The
block is the same everywhere: dusk sky, far rooftops with a few
lit windows, a red brick wall, sidewalk slabs, kerb, street with
a dashed centre line. The booth stands centred at bus-stop
height: metal grey posts, a TELEPHONE sign band, a dark interior,
a phone box with dial, handset and cord, a shelf with a tattered
directory, and a dent in the lower post. The booth is never
repaired.

Each node changes what is inside the frame and around it:

- Girard / Lawrence: the photograph is a seascape, gold sun over
  a blue sea with a small sailboat; the wall carries a corner
  store awning and a lit shop window.
- 13th and Market: the photograph is a mountain sunset, purple
  ridges under an orange sun; a streetlamp stands by the wall,
  its cone of warm light on the brick.
- Girard / Marshall: the photograph is a forest path, green
  canopy with a pale path and a shaft of light; the wall carries
  a faded painted FRESH BREAD sign.

The node name is carried by the green street signs on the bus
stop pole, one line per street, so the hop is legible in the
scene itself.

## Motion

A 60 second cycle, closed-form, fixed phase. FIRST_T is 5 s.
Three pedestrian silhouettes drift along the sidewalk on whole
crossings per cycle, so each is back where it started at the
seam. One car passes per cycle, headlights on, throwing a warm
wash ahead of it onto the wall and booth; it is fully off-screen
at both ends of its pass, so the loop is seamless. The
photograph's glow breathes once per cycle. No flicker above
0.1 Hz anywhere; reduced motion holds the first frame and makes
taps instant.

## Interaction

Tap steps through the portal to the next dead phone, in order:
Girard / Lawrence, then 13th and Market, then Girard /
Marshall, then back to the start. The hop is a 0.9 s warm bloom
out of the photograph; the node swaps at the midpoint, when the
glow is brightest. A tap mid-transition is ignored, so the hop
has to finish before the next one starts. With reduced motion
the hop is an instant swap with no bloom. Never click-to-reload.

## QA

Rendered with node-canvas from the actual script at 1280x900
desktop, 390x844 mobile, and 720x720 for thumb.png; all three
inspected visually. Tap walk probed in code: node 0 to 1 to 2
and wrapping back to 0, mid-transition tap ignored, each settled
node distinct (about 35% of pixels differ between nodes, mostly
wall tone, photograph, and signs), node 0 re-set at t=5
reproduces the first frame exactly (0.00%). Loop seam: t=5 vs
t=65 and t=20 vs t=80 both 0.00% different. Motion present:
t=5 vs t=20 differ 5.21%.

Fix rounds: 1. The bus-stop pole overlapped the booth edge on
phones, and CORNER STORE clipped out of its awning; the pole
steps to the right edge on phones, the awning reads STORE on
narrow stages, and the streetlamp steps left on phones so it
never meets the pole. 2. A tap whose clock jumped past the end
of the transition could strand a pending node swap; the swap now
uses the raw transition progress, so a long frame gap can never
lose the hop.

## Deviations

Visual only, per the Franke audio rule; no WebAudio. The three
photographs, the corner store, the streetlamp, and the painted
bread sign are invented staging in the prompt's register: the
prompt names the photograph, the curb, the brick wall, and the
bus stop, and leaves their particulars open.

## Minor known warts

- The headlight beam reads as a flat warm triangle at desktop
  size; the car itself is a simple dark sedan silhouette.
- The lit shop window at Girard / Lawrence is a plain warm slab
  with no goods visible inside.
- The forest photograph's light shaft is a pale triangle that
  can read as a path edge at thumb size.
- On tall phones the booth dominates the frame and the street
  below it is a narrow band, which is the prompt's composition.
- The dent in the booth post reads as a small dark dot at thumb
  size.
