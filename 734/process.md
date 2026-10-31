# No.734 Taylor Square

## Concept

Paul Ramirez Jonas, Taylor Square (2005, Cambridge MA): a small park kept
locked, and a public campaign that mailed out 5,000 copies of its key,
asking each holder to copy the key and pass it on, until the park could be
kept truly open. The piece rebuilds that campaign as a flat night diagram.
At the center of a dark neighborhood grid sits the park: grass, one bench,
one flagpole, a low fence, and a single locked gate on its south side,
padlock on. Tap the park and the first keys are mailed out to the nearest
houses. From there the keys copy themselves house to house, each copy
slightly mutated, and every house that holds a key lights its windows warm.
Tap any key-holding house to hurry a copy out of it. When every house in
the ring around the park holds a key, the padlock comes off, the gate
swings open and stays open, and the little figures who used to hop the
fence start walking in through the gate instead. Tap the open gate to
re-lock it and run the whole campaign again with fresh keys. The spread is
neighborly sharing, warm windows in the dark, nothing more alarming than
that.

## Construction

- Single self-contained canvas piece, no assets, no text anywhere but the
  title. Strict palette: night #0B1026, houses #1A2340 with lit windows
  #F0D878 (only in houses holding keys), park grass #1E4D3B, bench and
  flagpole and keys in brass #C9A227, fence #2A3358, gate-open glow
  #7BA05B, figures #F5F5F0.
- World: a 9x9 grid of house blocks (7x7 on phones) around a central 3x3
  park. The park is about a third of the grid's width. The ring is the 16
  houses immediately around the park; the gate condition reads only those.
- Key identity: a 5-bit mask. Bits 0-3 put teeth at four slots along the
  shaft, bit 4 runs the teeth long. The key icon is drawn from the mask
  (ring, shaft, teeth), so a key's identity is visible at a glance, in
  flight and again hung by the door of the house that holds it.
- The spread schedule is precomputed per epoch from a seeded stream
  (mulberry32), so the whole campaign is a timed event list:
  - The mailing: the five ring houses nearest the park center receive the
    first keys, flights staggered over about a second and a half, each
    with a freshly seeded mask.
  - The sharing: a simulation walks the frontier. A random keyed house
    with an unkeyed orthogonal neighbor copies its key to a random such
    neighbor every 0.55 to 1.7 seconds; each copy flips exactly one bit
    of the parent mask with probability 0.55 (a mask that would empty
    keeps its parent's bits), so lineages drift as they spread. Flights
    arc between houses over 0.8 seconds. The simulation runs until every
    house holds a key.
  - The gate time is derived, not scripted: it is the moment the last
    ring house's earliest delivery lands. Bursts can bring it earlier.
- Event model: everything on screen is a pure function of the event list
  plus time. A house is keyed when its earliest delivery event (schedule
  or burst) has arrived; windows fade warm over the half second after
  arrival, and a small brass ring pulses at the door. A flight is drawn
  only if it is the delivery that actually keys its target house.
  - Tap the park: sends the mailing (once per epoch).
  - Tap a key-holding house: forces a copy burst, up to two flights to
    neighbors whose scheduled delivery is still more than a flight away,
    masks mutated from that house's own key via a seeded runtime stream.
  - Tap the gate once it has opened: re-locks the park, advances the
    epoch (new seed, new layout of masks and timings) and immediately
    restarts the spread.
- Figures: five white silhouettes walk a closed-form ping-pong path from
  the south street into the park and back. The crossing point is the
  piece's behavioral tell: while the gate is shut it sits at each
  figure's own seeded fence point and the figure hops as it crosses;
  as the gate swings open over 2.6 seconds the crossing point slides to
  the gate and the hop fades out, so the same walkers visibly change
  their habit the moment the park becomes truly open.
- Park furniture: brass bench (seat, back, legs), brass flagpole with a
  small flag that flutters on a sine, fence of posts and paired rails
  with the south side split by the gate gap. The gate is a framed panel
  hinged at its west jamb, swinging into the park; while shut it carries
  a small brass padlock. When it opens, two soft ellipses of the glow
  color pool on the grass inside the gate (layered alpha shapes, no
  shadowBlur, no gradients anywhere).
- Time: frame one is the synchronous draw at t = 0 (night grid, unlit
  windows, locked gate with padlock, five figures on their paths, no
  keys yet). The rAF loop (typeof-guarded) anchors later frames to its
  first timestamp; nothing is derived from Date.now() and there is no
  Math.random. An inert ?seed=tNN hook forces the draw time for QA
  renders only, and in that mode the epoch is armed from t = 0 so a
  forced render can show the spread under way.
- Sizing: Visual Viewport API with resize listeners on visualViewport
  and window; canvas style pinned in px inside draw(). Phone detection
  via window.screen (min dimension < 700 px) with aspect fallback; on
  phones the grid refits to 7x7 with the same park, ring and rules.

## QA log

- Rendered with the house node-canvas renderer at 1280x900 (desktop),
  390x844 (mobile), 720x720 (thumb). Frame one verified by eye: night
  grid of houses with dark windows, central grass park with bench and
  flagpole, fence with padlocked gate on the south side, five figures
  walking the south street; nothing clipped on mobile.
- Late state verified with a forced ?seed=t120 throwaway render (read
  back, then deleted): the whole grid's windows lit warm, a small brass
  key hung by nearly every door, the padlock gone, the gate swung fully
  open with its green glow pooled inside, figures crossing at the gate.
- Determinism: thumb rendered twice and byte-compared with cmp;
  identical. Interaction paths (mailing tap, house bursts, gate
  re-lock) cannot fire in the headless renderer (no pointer events, no
  rAF), which is exactly why frame one is guaranteed event-free; they
  were verified by reading the event code paths.

## Deviations

- The prompt's 5,000 mailed keys are rendered as a five-house mailing
  with a small fountain flourish of keys at the flagpole: 5,000 literal
  icons would be noise at this scale, and five is the number the
  schedule's first wave can make legible. The count in the original work
  is honored in spirit: the mailing is only the start; the copies do the
  rest.
- The contagion runs on a precomputed seeded schedule rather than
  per-frame probability rolls, and visitor bursts are appended as
  recorded events: integrated rolls would break the series' determinism
  gate, and with a recorded event list the whole state stays a pure
  function of time.
- Figures keep to the south street and cross only at the south fence or
  the gate, rather than wandering the whole neighborhood: their paths
  stay closed-form, and the fence-hop to gate-entry flip, the behavioral
  heart of the piece, stays in one readable place.
- If a resize crosses the phone/desktop boundary mid-epoch, the grid
  and schedule are rebuilt for the new size and the epoch re-arms from
  its original start time; recorded bursts do not survive that rebuild.
  A rare edge case, accepted rather than hidden.
