# №1221 — A Knight's Walk

Clint Enns study block CE6. Grounded in his Processing works that run
Oulipo constraints as generative engines: take an arbitrary formal rule,
obey it exactly, and let the work be whatever the rule produces. Here the
rule is the knight's tour. The knight walks; the board remembers — in
three different media, in the order it was visited.

## How it works

- **The tour.** A knight crosses an 8×8 board on pure black, one move per
  second. Board squares alternate #0A0A0A / #1A1A1A — no white square is
  ever shown. After 64 moves the board resets to bare and a new tour
  begins from a different corner.
- **Medium conversion.** Every square the knight leaves changes medium by
  age (moves since it was left): ages 1–9 are FILM GRAIN — gray #8A8A8A
  speckle whose pattern is re-hashed eight times a second, so it flickers;
  ages 10–23 are PIXEL BLOCKS, the square subdividing into a 4×4 grid of
  #306230 green block-noise; age 24 and older is ASCII, one stable glyph
  per square in #9BBC0F from the set @#%*+. The board fills with the three
  noises in visit order, oldest squares turning to text first.
- **The trail.** The last five squares the knight left glow neon: a flat
  #0F380F base with a #39FF6A fill over it, alpha stepping down with
  recency (0.46 → 0.12). Flat alpha fills only — no shadowBlur, no bloom.
- **The knight and the beat.** The knight is a pale #F0F0F0 horse-head
  silhouette. On each one-second beat it hops: during the first 0.18 s of
  the second it travels from the previous square to the new one on a sine
  arc lift. The move counter sits top-left in small monospace gray — at
  the first frame it reads 32.
- **Taking over.** Press on the knight and drag: the legal L-moves from
  its square pulse faintly while it is held. Drop on a legal square and
  the knight moves there; the square it left starts converting, and the
  auto-tour replans from the new square — a Warnsdorff walk over the
  squares not yet visited this cycle (24 deterministic tie-break seeds,
  longest path wins), falling back to greedy continuation when no full
  completion exists. Drop anywhere else and a red #C81E1E ripple rings
  the drop point for half a second; the knight stays. All piece state is
  a pure replay of the tour schedule plus the recorded drop events —
  nothing is frame-integrated.

## Tour provenance and verification

The four tours derive from ONE closed tour found at build time with a
seeded Warnsdorff search (mulberry32 tie-breaking): walking from square
0, seed 20 was the first seed in 1..200000 whose 64-step tour ends a
knight's move away from its start. That tour is embedded as data; the
other three are its 90° / 180° / 270° rotations (a rotation of a closed
tour is a closed tour, with a different start square). Every tour is
also re-verified in the page at load.

Base tour (square = rank×8 + file), as embedded:

    [0, 10, 16, 1, 11, 5, 15, 30, 47, 62, 52, 58, 48, 33, 50, 56,
     41, 24, 9, 3, 20, 14, 4, 21, 6, 23, 13, 7, 22, 39, 54, 60,
     45, 55, 38, 28, 18, 8, 2, 12, 27, 37, 31, 46, 63, 53, 43, 26,
     36, 51, 61, 44, 29, 35, 25, 19, 34, 40, 57, 42, 59, 49, 32, 17]

Verification output (Node, running the tour code):

    base:          len=64 unique=true allMovesLegal=true closed(last->first legal)=true valid=true
    tour0 identity  start=0:  len=64 unique=true allMovesLegal=true closed=true valid=true
    tour1 rot90     start=7:  len=64 unique=true allMovesLegal=true closed=true valid=true
    tour2 rot180    start=63: len=64 unique=true allMovesLegal=true closed=true valid=true
    tour3 rot270    start=56: len=64 unique=true allMovesLegal=true closed=true valid=true

Completion check (same run): interrupting tour0 at move 31 (knight on
square 60) and dropping the knight on the legal square 45, the
Warnsdorff completion covers 31 of 31 remaining squares — the resumed
tour still finishes the board.

## Determinism and house rules

- The first frame is drawn synchronously at the fixed phase T0 = 31.4 s:
  move 31 of tour 0, the knight settled on square 60 (the hop ended at
  31.18 s), 31 squares converted — 8 ASCII (ages 24–31), 14 pixel-block
  (ages 10–23), 9 film grain (ages 1–9) — the five-square neon trail
  behind it, counter reading 32. The animation loop is anchored as
  phase + elapsed-since-load; nothing is drawn from a wall clock minus
  an offset.
- All noise (grain speckle, block shades, ASCII glyph choice) derives
  from a seeded integer hash. No Math.random anywhere.
- Sizing comes from the Visual Viewport API with resize listeners on
  both the visual viewport and the window; the canvas CSS size is
  pinned in draw(). Phones are detected via window.screen physical
  size (min dimension < 700 px) with an aspect fallback (h > w × 1.15);
  the board is sized to the short side and stays centered.
- Silent: no audio at all. No gradients, no ctx.filter, no shadowBlur,
  no createElement, no ImageData/offscreen canvas, no microphone. The
  only text is the move counter and the ASCII medium glyphs, both
  specced by the prompt.
