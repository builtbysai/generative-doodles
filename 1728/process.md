# The Permutation Grid (No. 1728)

Twenty-four cells, each holding one ordering of four bars, and the whole grid slowly walks through every ordering exactly once before resting.

## Mechanism

All 24 permutations of {0,1,2,3} are precomputed in lexicographic order, one per cell, so at any cycle step the grid shows the complete set with no repeats and no omissions. The cycle runs 52 seconds: 24 steps of 2 seconds, then a 4 second rest. On each step the highlight frame advances one cell in row-major order and every cell shifts to its next ordering, with bar heights easing between states over 0.7 seconds. During the rest the grid holds its final state with the frame on the last cell. Bar heights map to rank 0 to 3 (shortest to tallest); bar colors rotate through the three palette colors by rank in a fixed rotation (rank 0 dark grey, rank 1 dusty pink, rank 2 off-white, rank 3 dark grey again), so height carries the rank and color carries the system. A small 0 to 3 scale sits in the shared left margin, its ticks aligned to the bottom row baseline.

## Interaction

Watch-only. No input. The loop is seamless: after the rest the cycle restarts from the first ordering.

## Counts asserted

24 cells in a 6 by 4 grid, 4 bars per cell, 24 permutations visited exactly once per cycle, verified in node (24 unique orderings, each a permutation of 0,1,2,3). First frame is fixed at t = 13.0 s of the 52 s cycle (step 6, active cell 6, transitions settled), rendered identically at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three renders inspected, grid fills the frame, active-cell frame visible, plates clear of the cells.

## Deviations from the prompt

None in substance. Two judgment calls: the bar-color rotation wraps rank 3 back to dark grey (three colors for four ranks, per the brief), so the shortest and tallest bars share a color and are told apart by height; and the grid is inset clear of the title and hint plates rather than running edge to edge, so no cell is ever covered.

## Gallery note

Twenty-four cells, each holding one ordering of four bars; the grid cycles every permutation exactly once, then rests. Watch the grid exhaust every ordering.

## Plates

Title: The Permutation Grid. Date: 2006 · 10 · 05. Hint: Watch the grid exhaust every ordering.
