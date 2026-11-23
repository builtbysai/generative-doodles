# №8993 · What Isn't There - process

From the 2026-09-25 Jürg Lehni study (Empty Words): a poster where the
typography lives in the erasure. One slab of ink on warm paper, and every
word in it is carved out, rubbed away, or punched through. Nothing was
printed here.

Recipe: a seeded ink slab with ragged sine-noise edges and print grain,
then a full erasure pass in destination-out compositing. A punched hole
row near the top, rubbed horizontal bands with chewed edges, and the
headline READ THE GAPS carved in heavy condensed type, jittered a few
passes for a hand-erased edge before one crisp pass. The footer, also
erased: no words were printed here.

Two structural fixes came out of inspecting the renders. First,
destination-out erases in proportion to the source alpha, and the grain
loop left a translucent fill style behind, so every erasure was only
lifting part of the ink and the letters came out gray instead of paper.
Fixed at the root: the erasure pass resets to a fully opaque fill before
carving anything. Second, letter spacing is applied at render time but
ignored by measureText, so the footer measured too narrow, rendered too
wide, and clipped past the slab edges. The spacing is now reserved by
hand before measuring, and the footer sits fully inside the ink.

Deterministic per seed. Seed 777 is the default: punched holes, one thin
band and one double band, the headline reading clean. Click the piece for
a new variation.
