# Half-Moon Dots

№8994, built 2026-09-25.

The idea started from a study of the Snow Esamosc sketch archived by viewyonder: a dotted field under a rotating difference-blend window, where the prettiest things on screen are the dots cut in half by the window's edge. I wanted a piece where that edge is the whole subject.

So: a full-bleed field of bone-colored dots on dark ink, each dot breathing in size on its own slow cycle, crossed by a crescent window that turns slowly while waxing and waning. There is no drawn outline anywhere. The crescent is just a region where ground and dots trade tones, and the only place the two tones ever meet is along its two arcs, in the dots that straddle them. Those dots come out half bone, half ink, and they run a little larger than their neighbors, so the boundary reads as a beaded curve instead of a frame.

Technically it is plain canvas, no libraries. Each frame renders the dots once into a mask layer, paints a two-tone layer (bone outside the crescent, ink inside), punches the mask through it, and composites that over the two-tone ground. A dot crossing the edge gets its color split exactly along the curve for free, because the mask never knows about the window. The crescent itself is two circles, one strictly inside the other, filled with an even-odd rule, which keeps the geometry exact at any rotation or phase.

Seeded RNG throughout, so the field is identical on every load. The motion is slow: about 84 seconds per revolution, 47 per waxing cycle, dots breathing over roughly twenty seconds. It holds together as a still frame, which is how the gallery thumbnail shows it.
