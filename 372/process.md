# №1093 "Card Cosmos" — Marco Tempest study block MT6 (PP254)

The TEDGlobal 2012 card cosmos as a pure piece. A deck of 52 cards —
52 weeks — floats on a dark stage. Each dealt card is an astronomical
instrument, not a game piece: its suit is a season tint, its number a
moon phase, and the active card carries the AR registration reticle of
Tempest's goggles act, implied by brackets alone. No felt, no chips,
no casino grammar anywhere.

## How it works

- **State is a list of deal events; everything else is closed-form.**
  A tap appends one event (time + deck cycle). Every card's position,
  scale, rotation and alpha is a pure function of t and that list: the
  newest card flies deck → centre over 0.8s with an ease-out, rests
  large as the active card, and when the next deal lands it glides to
  its arc slot over the same window while the arc re-indexes around it.
  The oldest arc card fades out in place as the window slides.
- **The calendar arc.** Twelve arc slots on a shallow curve across the
  upper frame, oldest at the left. Only the last twelve arc cards stay
  visible; the thirteenth deal starts the fade of the oldest, per the
  prompt's max-12 rule. Slots re-derive from the slot index and the
  current arc count, so re-indexing after each deal stays analytic.
- **The deck.** A seeded Fisher-Yates shuffle (mulberry32, seed fixed
  per cycle) of the full 52. When a cycle is exhausted the next tap
  reshuffles into the next cycle automatically. The piece ships with a
  seeded opening deal — cards out at t = 20, 22, 24 — so frame one is
  already mid-cosmos: in the opening shuffle the first three cards are
  the 2♣, the 4♦ and the 5♠, and the 5♠ is active.
- **The hologram.** The active card's face carries a season ring in its
  suit's tint (clubs spring green, hearts summer amber, diamonds autumn
  rust, spades winter blue) with twelve month ticks, a moon-phase disc
  for its rank (phase = rank/12 plus a slow 300s wax drift, terminator
  drawn as a true ellipse arc), and rank/suit instrument marks at both
  corners. The cyan reticle brackets the active card only, breathing
  gently; for 1.6s after each deal a scan line sweeps the face and the
  ring pulses — the shimmer is a function of time since the deal event.
- **Watch between taps.** Dealt cards drift a few units on seeded slow
  sines and the moons keep waxing. Nothing else moves. Tap is the deal
  and the only gesture; per the house rule it is a refresh where a
  refresh belongs, never a reload.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on
  both visualViewport and window; canvas CSS size pinned in draw();
  phone detection via window.screen physical size with aspect
  fallback; the dark stage is the page ground everywhere and the
  square composition holds at 390 wide.
- Determinism: the synchronous first frame is drawn at a fixed phase,
  t = 26s (opening deal complete, third card active and settled); the
  rAF loop, typeof-guarded, continues from that phase plus elapsed.
- No gradients, no offscreen canvas, no ctx.filter, no shadowBlur, no
  createElement, no audio (none specced), no microphone, no external
  assets. Visible text is limited to the cards' own rank/suit marks
  and the title.

## QA

- Rendered with the house renderer at 1280x800 (qa-desktop.png),
  390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Frame one: dark stage with faint star dust; two dealt cards fanned
  in the upper arc (2♣ with spring-green ring, 4♦ with autumn ring);
  the 5♠ large at centre with its winter-blue season ring, a waxing
  gibbous moon disc (dark sliver correctly on the left), rank/suit
  marks at both corners, and the cyan reticle brackets around it; the
  remaining deck fanned lower-centre, backs up with the cyan diamond
  motif. Mobile keeps the whole composition centred and unclipped.
- One refinement round: arc scale reduced and slot spacing widened so
  the fan overlap reads as a fan rather than a collision, and the moon
  disc's dark side given ink-tone contrast so the phase reads against
  the cream face.
- thumb.png rendered twice and compared with cmp: byte-identical.
  Duplicate deleted.
