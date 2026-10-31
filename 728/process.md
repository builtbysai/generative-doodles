# No.728 The Key

## Concept

Paul Ramirez Jonas, Key to the City (2010): a master key that opens 24 locks
scattered across a city, bestowed hand to hand - 24,000 keys given away, each
gift a small civic ceremony. The piece rebuilds that ceremony as a flat
night-city diagram. A brass key waits at a kiosk. You drag it onto one of the
wandering white citizens and give it away; the ledger strip at the right edge
writes down a reason for the gift. Whoever holds a key can open any of the 24
locked doors: tap a door and the nearest holder's key flies to it, the door
swings open, and a small label says what was behind it (a garden gate, a
museum door, an ice-cream counter, a bathroom). Holders also pass their keys
onward on their own, so the relay of giving continues without you, each
hand-off entered in the same ledger. The toll is the artist's rule: you must
give to receive.

## Construction

- Single self-contained canvas piece, no assets. Strict palette: night
  #0B1026, blocks #141B3D, brass #C9A227 with dark edge #7A5E1A, doors
  #2A3358, ledger paper #F5F1E6, ink #1A1A1A, figures #F5F5F0.
- World: a 6x6 block grid with the two bottom-center cells left open as a
  plaza for the kiosk. A seeded shuffle (mulberry32) picks 24 of the 34
  remaining cells for doors and assigns each door one of the 24 authored site
  labels, so layout choices are size-independent indices; pixel positions are
  derived from them at layout time.
- Citizens: 7 white silhouettes. Each wanders a closed-form Lissajous loop
  around a seeded home point, integer frequencies over a 90 s period, so
  position is a pure function of time - a pacing loop at a street corner
  rather than a steering simulation.
- Keys: flat brass (ring, shaft, two teeth, dark-edge underlay, one pale
  highlight line along the shaft; no gradients). A key is in one of four
  states: tray (resting on the kiosk counter, max 3), drag (following the
  pointer), held (riding at a citizen's side), busy (in a flight animation).
- Event model: all change is recorded events plus time-derived animation.
  - Drag bestowal: pointer down near a tray key picks it up; on drop, the
    nearest citizen within 40 px receives it and a ledger line is added with
    a reason drawn from the seeded content stream (16 authored reasons). A
    drop that reaches nobody returns the key to the tray.
  - Tap kiosk: mints a fresh tray key (tray capped at 3; keys never
    auto-mint).
  - Tap door: if any citizen holds a free key, the nearest holder's key
    flies to the door (0.45 s), the door swings on its left hinge as a skewed
    quad over the next 0.85 s revealing a paper interior, a paper label chip
    fades in beside it with the site's two lines, and the key flies home.
    With no key in circulation the door only jiggles in its frame.
  - Relay: every 13-27 s (seeded stream), if a holder and a non-holder both
    exist, a holder passes their key to a non-holder along a small arc;
    completion adds a relay line to the ledger ("passed hand to hand", and
    three variants). The ledger keeps the newest 16 entries, oldest shown
    fading toward 0.35 alpha, each entry drawn with a tiny key bullet and
    word-wrapped ink text.
- Time: frame one is the synchronous draw at t = 0 (city, 24 closed doors,
  7 citizens at their loop starts, one key on the counter, empty ledger).
  The rAF loop (typeof-guarded) anchors later frames to its first timestamp;
  nothing is derived from Date.now(). An inert ?seed=tNN hook forces the
  draw time for QA renders only.
- Sizing: Visual Viewport API with resize listeners on visualViewport and
  window; canvas style pinned in px inside draw(). Phone detection via
  window.screen (min dimension < 700 px) with aspect fallback; on phones the
  ledger narrows to 30% of the width with a smaller font and stays readable.

## QA log

- Rendered with the house node-canvas renderer at 1280x900 (desktop),
  390x844 (mobile), 720x720 (thumb). Frame one verified by eye: night grid
  of blocks, 24 brass-framed doors, 7 white citizens mid-loop, kiosk at
  bottom center with one brass key on its counter, empty paper ledger strip
  at the right edge; on mobile nothing is clipped and the ledger remains
  legible.
- Determinism: thumb rendered twice and byte-compared with cmp; identical.
  Interaction paths (drag bestowal, door opening, relay) were exercised by
  reading the state machine against the code paths; they cannot fire in the
  headless renderer (no pointer events, no rAF), which is exactly why frame
  one is guaranteed event-free.

## Deviations

- Citizen wander is a closed-form Lissajous pacing loop around a home corner
  instead of free seek/wander steering: integrated agent state would break
  the series' determinism gate, and the prompt only requires that figures
  wander on their own.
- The relay schedule is generated at runtime from a seeded interval stream
  rather than precomputed: who can give and who can receive depends on the
  visitor's own bestowals, which no fixed schedule can know in advance. Given
  the same event history, the stream makes the same choices.
- An opened door's site label is drawn on a paper chip beside the door
  rather than inside the doorway: at 24-door scale the interior is too small
  for two legible lines, and the chip keeps the palette (paper + ink) exact.
- A tapped door with no key in circulation jiggles instead of opening; the
  prompt does not specify the empty-handed case, and the jiggle keeps the
  toll rule legible: no key, no entry.
