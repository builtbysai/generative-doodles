# No.148 Dual Level Five

## Concept
Her 2018 dual-level system as a single desk-drawn panel: a five-fold
rosette field in deep green ink over red compass construction that is
never erased. Level 1 is the primary pattern, a centre rosette with
five satellite rosettes. Level 2 is her invention, the relationships
among the motifs: the pentagon joining the satellite centres, its
inner pentagram, and a half-scale pentagram inscribed in each cell.
Dragging scrubs between the two levels while the construction arcs
stay on the page at 0.25 alpha throughout.

## Construction
Canvas 2D, single self-contained page. A rosette is line work only:
the {5/2} pentagram, its pentagon, five petal arcs bulging off the
pentagon's edges, and an outer decagon ring. Construction is drawn
first and clipped to the paper panel: circles on the satellite ring,
on each satellite centre (at pattern radius and at ring radius, so
the arcs bleed off the panel edges), and two on the centre. Level 2
is drawn under level 1: connectors and the inner pentagram in red,
gaining alpha and weight with the scrub parameter; the half-scale
cell pentagrams in green. Level 1 fades to 0.22 alpha and thins as
level 2 rises, but never vanishes. The scrub parameter is horizontal
drag distance over 0.55 of the width; release holds the level.
Double-tap cycles three curated five-fold family members (ring
radius, satellite scale, petal depth and rotation vary). The piece
opens at level 0.3, level 1 dominant with level 2 threading through.
House rules held: Visual Viewport sizing with both resize listeners,
canvas pinned in px, window.screen phone check with aspect fallback,
panel keeps its shape on phones with the near-black ground around it,
synchronous first frame, typeof-guarded requestAnimationFrame,
lowercase hint.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720 and
inspected all three. First pass was already close to the prompt: six
green rosettes, red compass circles bleeding past the rosettes to the
panel edges, the red level-2 pentagon faintly threading the middle at
the opening level. No geometry changes were needed; the opening
level 0.3 was kept because both levels and the construction all read
at once, which is the piece's argument. Final frames: warm paper
panel on the near-black margin, green line work only (no cell fills
anywhere), construction present in every corner. Palette audit:
pattern ink #2E7D4F, construction red #C0392B, paper #FAF6EC,
background #0D0D0F only. Interaction is horizontal drag (level scrub)
plus double-tap reseed; no click-to-reload.
Gallery entry ready: 2002 · 06 · 08, "A five fold rosette in green
ink over red construction arcs, the compass circles never hidden,
with a second level of relationships threading through the motifs.
Drag to scrub between the levels."
