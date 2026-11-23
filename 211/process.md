# No.399 The Fox Lady

## Concept

After Anna Galitskaya's @yourfellowfox mascot brand:
one fox (pointed ears, big brush tail with a cream
tip, cream chest, round kidlit body, no realistic
anatomy) working her way through six professions on
near-black, each scene nothing but the fox large and
centred with three to five flat props and generous
dark margins. The scene engine is the piece: a fixed
rotation of jobs, changed only by double-tap, the
fox walking out of one profession and in to the next
while its props assemble around her.

Palette is closed at the five specced hexes: ground
#151312 (which doubles as the face ink), fox orange
#E07B39, cream #F5E8D0, set green #5C8A5A, star white
#F5F2EA. Everything is flat, or flat at stepped
alpha. No text, no scene titles, no UI.

## Construction

One canvas, design space 1280x900, centred fit with
the page ground in the ground tone. Sizing follows
the Visual Viewport with resize listeners on
visualViewport and window; the canvas is pinned in
px every frame; phone is detected from
window.screen physical size (min dimension < 700px)
with the aspect fallback, and phones get a larger
fox scale (1.32 against 1.15).

Scene table (fixed authored order, asserted at load
to be exactly six, librarian first and ice-skater
last; it cycles with no repeats until all six have
shown, then wraps):

1. librarian: two banks of tall book spines flanking
   the fox (widths, heights and colours baked from
   the fixed seed), cream-rimmed glasses, an open
   book with a green cover held in both paws.
2. baker: cream chef hat between the ears, a green
   tray of three cream rolls (each roll outlined in
   ground tone at flat alpha so cream reads against
   the cream chest), paws at the tray edges.
3. astronomer: 42 fixed stars (dots and four-point
   sparkles, baked from the seed), a green telescope
   on a tripod at her right, one paw raised to it.
4. gardener: two planted green pots flanking, a
   green watering can tipped at her right paw.
5. cellist: seated pose, a green cello at her right
   side on a cream endpin, left paw up the neck,
   right paw on the bow.
6. ice-skater: a flat ice ellipse with green pines
   framing, skate blades under both feet (one leg
   extended back), a green scarf trailing, arms out
   for balance.

Interaction: a double-tap (two taps within 0.4s of
the piece clock, small movement, short hold) starts
the change. The fox walks off right over 2s on a
two-frame leg cycle with a bobbing step while the
old scene's props fade out over the first second;
the scene index advances; the new fox walks in from
the left over 2s while the new props drop 36px and
fade in over the first second. Taps during a
transition are ignored. The piece never reloads.

Ambient life runs on a 14s loop per scene (asserted
LOOP = 14). The brush tail sways on a 7s sine around
its hip anchor. The right ear twitches at the fixed
5s and 11s slots (0.3s flick). Exactly one prop
animates per scene, as named in the prompt:
librarian book pages turn once per loop (a page
sweeps the spine in the 6.5s-7.7s window); baker
steam rises as three flat star-white curl arcs,
staggered, fading as they climb; astronomer
telescope tilts slowly on the loop, tracking an
invisible star; gardener watering can tips on a
squared-sine pour envelope and, while it is open,
eight dotted-water drops fall in a small arc from
the spout toward the right-hand pot; cellist bow
saws on a 2.8s cycle (five whole cycles per loop);
ice-skater fox glides in a small oval (70px across
the loop, 4px vertical on a 7s cycle) with a slight
lean and a swaying scarf.

Determinism: frame one is drawn synchronously at
the constant phase T = 5.3s (librarian complete,
tail at full sway, no twitch or page turn in
flight). The clock is anchored there and advances
only in fixed 1/60 ticks accumulated from rAF
timestamps; rAF use is typeof-guarded. All star and
spine data is baked at load from the fixed seed
399; nothing is picked at runtime.

## QA log

Rendered with the house node-canvas renderer:
qa-desktop.png (1280x900), qa-mobile.png (390x844),
thumb.png (720x720). The thumb was rendered twice
from the finished file and compared byte-identical.

Probe renders (temporary copies with the opening
scene index changed, not shipped) were made and
inspected for the other five scenes: baker,
astronomer, gardener, cellist, ice-skater.

Fixes during QA:
- The ice rink rim was first stroked as a circle
  (the round ring helper), which drew a huge white
  ring through the whole frame; it is now a true
  flat ellipse stroke at 0.30 alpha over the 0.10
  ice fill.
- The cello first sat small and low at the hip like
  a violin; it is scaled up 1.3x, raised, given an
  endpin to the ground, and the left arm re-aimed
  from beside the head to the cello scroll, with
  paws added at the bow hand and neck.
- The baker's cream rolls were invisible against the
  cream chest on a cream tray; the tray is now set
  green, lowered, and each roll carries a faint
  ground-tone outline; the steam starts just above
  the rolls and spreads wider so it reads as steam,
  and paws were added at the tray edges (and at the
  librarian's book) so the held props connect to the
  arms.
- The ice-skater's arms were swallowed by the body
  outline; they now reach past the silhouette with
  paw circles, and the scarf droops lower behind
  the neck.
- The chef hat sits between the ears, which poke
  through it with their cream inners; kept as drawn,
  it reads as a fox-ear chef hat.

Deviations from the spec: none. Ear twitch slots
are the spec's resolved 5s and 11s; per-scene prop
animation is exactly one per scene as named.
