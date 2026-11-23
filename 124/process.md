# No.165 Strange Loop (Five Colours)

## Concept
Squares hinged at their corners open and close like a
breathing lattice, map-coloured in exactly five colours with
neighbours never matching, while the plane itself rotates so
that the central square sits perfectly still. A strange loop:
everything moves, and the middle does not.

## Construction
Canvas 2D, single self-contained page, watch only. The
stillness is exact, and the construction is the proof. Every
square turns +theta about its own hinge corner inside a plane
that turns -theta about the panel centre, so in the world
frame no square ever rotates: each stays axis-aligned and
only travels, its hinge tracing a circle whose radius is its
distance from the centre. One hinge sits exactly at the
centre; its square has radius zero, nowhere to travel to, and
is motionless in every frame while the field breathes around
it. Theta runs a 24 second loop (open 11s, hold 2s, close
11s, smoothstep eased) from closed to a full quarter turn.
Thirty-six squares on a 6 by 6 hinge lattice, coloured
(i + 2j) mod 5 from vermillion #D64533, ochre #D9A441, teal
#1F7A6B, indigo #2A2A72, bone #F2EDE3, a gradient colouring
that keeps edge and corner neighbours distinct; the colour
offset advances by one each completed loop. Hinge dots in
#1A1A1A ride the plane transform at the lattice corners.
Pitch is set so the widest orbit (a corner hinge dot at
4.24 pitches) stays inside the panel. House rules held:
Visual Viewport sizing with both resize listeners, canvas
pinned in px, page ground equal to the bone of the palette,
synchronous first frame opened mid-loop at theta near 50
degrees, typeof-guarded rAF, no pointer listeners (the
renderer confirms only the two resize listeners). Two
recorded decisions: an early draft counter-rotated by only
theta/2 with a separate untransformed underlayer, and the
squares visibly tumbled and scattered; the exact-cancellation
construction replaced it. A breathing scale on the plane was
also cut, because any scale about the centre moves the
central square's corners: exact stillness allows rotation
alone.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720
and inspected all three. The first two builds failed honestly:
squares rotated about their corners inside a half-cancelled
plane rotation tumbled across the whole canvas, the lattice
and the five-colour law unreadable. The rebuilt construction
was verified in the renders: every square axis-aligned in the
world frame at theta near 50 degrees, squares travelling on
their circular hinge paths, hinge dots at the corners, the
vermillion central square registered at the panel centre.
Colour adjacency checked across the lattice in the desktop
render: no edge neighbours share a colour. Pitch was raised
once (panel/9.2 to panel/8.8) after the first rebuilt render
sat small in its ground; containment of the corner orbits was
recomputed before the change.
