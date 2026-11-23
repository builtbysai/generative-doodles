# №9045 · What Is Generative Art, process notes

Hans asked what generative art is, and asked for the answer as a piece.
The honest answer: the artist writes the rules, the machine rolls the dice,
and a family comes out. The artwork is the system, not any single image.
The artist's hand is in the rules and in choosing the keeper.

## Concept

A visual essay on one print. One branching system drawn many times:
a hand-drawn rule diagram (branch, shrink, turn, repeat), the seed in a
wobbly hand circle (the chance), six small children from the same system
with different seeds, and one large keeper. Annotations with leader lines
tell the story: the rules written by hand, the chance rolled by the machine,
the children from one system, the keeper chosen, not drawn. Clicking mints
a whole new family, which is itself the point.

## Technique

- Recursive branching tree in plain canvas 2D: each branch is a wobbled
  quadratic segment, then two (sometimes three) children at seeded spread
  angles, length decaying, width tapering, with a slight phototropic pull
  toward straight up so canopies read as trees, not scribbles.
- Keeper: depth 9 from a 96-unit trunk. Children: depth 8, seeds derived
  from the master seed by hashing, each with its own RNG and noise field.
- Print voice throughout: warm paper gradient, 5200 grain dots, vignette,
  wobbly plate frame, Georgia italic annotations, thin leader lines.
- Viewport-invariant 1000x1000 layout; seeded mulberry32; click reseeds
  via ?seed= and redraws the entire family.

## QA (2026-10-02, Bug direct)

- node --check on extracted JS: clean. No em dashes anywhere.
- CDP fail-closed exception probe (isolated Chrome :9333): zero
  exceptions, zero console errors.
- Rendered at 3 seeds (90210, 424242, 777001), inspected 90210 and 424242:
  both compose cleanly, families visibly differ, keeper never collides
  with the children grid. First render failed review: the keeper canopy
  spread into the children column, so spread, length, and phototropism
  were tightened and bottom annotations lifted off the frame.
- Mobile 390x844 inspected: square print centers, caption holds, no overflow.
- Default seed 90210: most balanced keeper with clear asymmetric character
  and six distinct children.
