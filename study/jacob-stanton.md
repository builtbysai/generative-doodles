# Jacob Stanton: Study Notes

**Site:** jacobstanton.com | **Key pieces:** Messing Around With Involute Curves,
Penrose Triangle Exploration, Line Pattern Nodebox

**Depth:** preliminary. Full text and code read from the involute article; penrose
page text read (thin); nodebox page unreachable. The artist's own rendered images
could not be visually inspected (his site refuses headless rendering), so the curve
form was verified by rendering the published parametric equation directly and
looking at the result. Revisit when the images are viewable.

## Why he matters for this project
Stanton is a designer who thinks like an engineer. He finds interesting curves in
the physical world (a nuclear reactor documentary, of all places), derives the math,
patterns it, and then pushes it into both 2D design and 3D-printed objects. That
pipeline, wild observation to equation to patterned artwork to physical object, is
exactly the kind of practice worth learning from. He is also a reminder that motif
sources do not have to come from other generative art.

## Core techniques

### 1. Involute curves, patterned radially
An involute of a circle is the path traced by the end of a string unwinding from
a cylinder. Parametric form:

```
x = a(cos(t) + t*sin(t))
y = a(sin(t) - t*cos(t))
```

Stanton's full Processing sketch is on the page: sample t, build a PShape, done.
The remarkable property, and the whole reason the piece exists: the involute is
the ONLY curve that can be arranged around a circle with a perfectly consistent
gap between neighbors. He saw it in the fuel plate arrangement of the High Flux
Isotope Reactor at Oak Ridge, where the constant gap lets cooling water flow
evenly. Same curve family as gear teeth profiles, for the same meshing reason.

**Takeaway:** Pattern one arm by rotation (12 to 24 copies) and the negative space
does half the visual work. The eye reads the uniform gaps as strongly as the lines.
Rendering the equation confirmed this: even a crude 12-arm plot reads instantly as
both mechanical (turbine, reactor) and organic (nautilus, seed head).

### 2. Engineering curves as design material
He treats the involute as a hatch pattern and as a way of blocking in large shapes,
comparing it directly against circular arcs to show why arcs fail (gaps pinch and
spread). Then he 3D-printed a rack-and-pinion mechanism where patterned involutes
mesh like gear teeth. It worked.

**Takeaway:** Output as SVG paths for vector and fabrication tools, not just
pixels. For this project that means: keep the plotter section in mind from the
start, design curves that survive as vector paths.

### 3. Penrose triangle exploration (minor)
An Illustrator exercise in impossible objects, Reutersvard and Escher as reference,
playing with the pen tool and patterning methods. Thin on technique, more of a
design sketchbook page.

**Takeaway:** Impossible geometry is a rich motif family (Escher proved it), but
this particular piece is an exercise, not a method. File under motifs, not techniques.

### 4. Line Pattern Nodebox (unreached)
Page would not load this pass. Nodebox is a Python-based generative design tool,
so the piece is likely about systematic line-pattern generation. Revisit.

## What makes it sing
Constraint from physics. The consistent gap is not a style choice, it is a property
of the curve, and that inevitability is what makes the images feel designed rather
than decorated. The work sits in the sweet spot between diagram and ornament.

## Techniques to steal (not copy)
- Involute arms as a radial structure: an alternative to plain arcs, spirals, and
  Gorillasun-style noise rings when you want mechanical precision
- Constant-gap curves for hatch fills and maze-like textures
- Motif hunting in engineering: gear profiles, reactor plates, linkages, cams.
  Real machinery is an underused sourcebook
- SVG-first output so pieces can move to plotter or 3D print

## What NOT to do
- Don't redraw his gear or his fuel-plate arrangement and call it a doodle.
  The method is "find a curve with a physical reason to exist, pattern it",
  not the specific curve.
- Involute-only pieces get monotonous fast (my 24-arm test render filled into a
  solid disc). Vary arm count, truncate t, modulate the base radius, or break
  arms like Gorillasun's disconnect trick.
