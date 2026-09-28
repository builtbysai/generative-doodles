# Bjorn Karmann / Paragraphica (deep; 2026-09-28)

Hop from the Poetry.Camera study, which named three doorways: Dan
Macnish's doodling camera, Philipp Schmitt's Camera Restricta, and
this one. Paragraphica closes the conceptual-camera arc that Golan
Levin's experimentalcapture lecture sketches: Descriptive Camera
(2012, a human writes the caption), word.camera (2015, a vision model
writes the words), Poetry.Camera (2024, the words are the whole
output), Paragraphica (2023, the words are bent back into a picture).
The full loop: image to text to image, with the middle step doing all
the seeing.

Paragraphica is a "context-to-image camera" by Bjorn Karmann, Danish,
Amsterdam-based, who designs speculative futures at oio. May 2023. No
lens, no sensor. Where the lens would be sits a red 3D-printed
sculpture of a star-nosed mole's nose, the blind animal that maps the
world by touch. The joke lands and the metaphor holds: a camera that
cannot see, perceiving place through feelers made of data.

## The pipeline

Shutter press is a database query, not an exposure. The camera takes
its GPS position and hits open APIs for address, weather, temperature,
time of day, nearby places (press names Google Maps, Open Weather
Map, Foursquare). Those slots are stitched into a fixed paragraph
template, shown live in the viewfinder, and on trigger the paragraph
goes to a Stable Diffusion API as the prompt. The returned image is
what Karmann calls a "scintigraphic representation" of the
description. Scintigraphy is medical imaging that maps function, not
structure, and the word choice is doing real work: this is a photo of
what the data says the place is like, not of its light.

The exact template, read off the device screen in his build photos:

"A {time of day} photo taken at {address}. The weather is {weather}
with temperature of {temp} degrees. The date is {date}. Nearby there
is {poi, poi, poi}."

Example from press, Cliffordstraat, Amsterdam: "A midday photo taken
at Cliffordstraat, Amsterdam. The weather is partly cloudy and 18
degrees. The date is Wednesday 24th May, 2023. Nearby there is
parking and a yoga studio." The template's seams show in his own
photos: "temperture", "Near by there is", a trailing comma after the
last POI ("coffee, ."). He ships the roughness, which is a choice:
the paragraph reads as composed by a machine, and that is the point.

His pipeline diagram (visually inspected at full res, white line art
on transparent) lays it bare: six data pills on the left (Time of
day, Adress, Weather, Temperrature, Date / Event, Points of interest,
typos included in the original), arrows into paragraph blanks in the
middle, a bracket into "Text-to-image AI", arrow down to "Generated
photo". The viewfinder version of the same paragraph highlights each
filled slot as a dark chip behind the words, so the viewer watches
data become prose in real time.

## The dials: photographic controls remapped onto data

This is the sharpest design move in the piece. Three physical dials
on top, exactly where shutter speed and film speed would be, and each
re-maps a photographic concept onto the pipeline:

1. Meters (3, 5, 10, 25, 50, 100, infinity): the data catchment
   radius. Karmann's analogy is focal length, which is exactly right:
   it is a zoom lens that zooms through the database instead of
   space. Wide radius, more places, more generic paragraph.
2. Seed (0.1 to 1): the diffusion noise seed. His analogy is film
   grain, and the dial face is labeled N to 1 to 0.1 like an aperture
   ring turned inside out.
3. Guide (0 to 100%): the guidance scale, how tightly the model must
   follow the paragraph. His analogy is focus: high values are
   "sharp", low values "blurry". Sharpness redefined as obedience.

The device screen photo shows the readouts live: "meters 25",
"seed 0.1", "guide 100", GPS "52.392, 4.877" across the top, paragraph
below. Knurled metal dials, 3D-printed housing, trigger button on the
right. Hardware list on his page: Raspberry Pi 4, touchscreen, custom
electronics. One observed discrepancy: the page copy says "15-inch
touchscreen" but his own build photo shows the screen labeled "5inch
HDMI LCD (with touch screen) 800x480 pixel V2.02". Five inches is
what the photos show.

Software: a Noodl visual web app glues the camera to the APIs, plus
Python code he wrote for the project. The Noodl graph screenshot
(checked in the contact sheet) is the familiar purple/blue node
spaghetti. No code is public; the build is documented in photos, not
repos.

## What makes it sing

The viewfinder never shows an image. That is the whole piece in one
decision. A normal camera's screen promises "this is what you will
get"; Paragraphica's screen shows the sentence the place is about to
become, with the data slots visibly chipped. You compose in language
and the picture arrives as a surprise that is somehow still yours,
because you set the radius, the grain, the obedience.

The uncanny result Karmann reports honestly: "the photos do capture
some reminiscent moods and emotions from the place but in an uncanny
way, as the photos never really look exactly like where I am." Mood
without likeness. That sentence is a better artist statement than
most press releases.

The reception split is part of the work's texture. PetaPixel's
headline notes the camera "is making people furious"; Digital Camera
World called it "the strangest and stupidest thing I have ever seen";
MKBHD tweeted it as a joke about the future. Karmann's own
clarification: a passion art project, "questioning the role of AI in
a time of creative tension", not a product, not an attack on
photography. RMIT's Imaging Futures Lab files it next to Philipp
Schmitt's Camera Restricta (2015), which refuses to shoot when too
many photos already exist at a GPS point, and The Verge's "the
endgame for cameras is having no camera at all". The lineage is
real, and Paragraphica is its most complete object.

## Local re-render: the pipeline, procedural stand-in

Technique re-rendered locally in Python/PIL (rerender.py in the
evidence folder), both stages, three dial configurations on one
place (108 Columbia Avenue, Lindenwold NJ, via Nominatim; scripted
morning). All frames visually inspected:

- Viewfinder stage: the exact template with live data chips, GPS and
  dial readouts across the top, matching the device screen layout.
- Scintigraph stage: a procedural stand-in for the diffusion step,
  clearly labeled as such. Sky gradient and sun from the time slot,
  cloud count from the weather slot, one building per POI with the
  POI name as its shop sign, street perspective, film grain seeded by
  the seed dial, blur scaled by the guide dial.

Three frames: A (meters 25, seed 0.1, guide 100) shows two POI
buildings, crisp; B (meters infinity) pulls eight POIs into a
crowded street, the radius-as-zoom effect made legible; C (seed 0.9,
guide 25) goes heavy grain and soft, the "blurry" photo. The dials
read as designed: radius changes the world, seed changes the
material, guide changes the obedience.

## Honest gaps

The virtual camera (camera.sandbox.noodl.app) and paragraphica.objct.ai
are both unreachable in-session (connection failures), so no live
"photo" was taken and the current output pixels were not inspected.
The diffusion stage in the re-render is procedural, not Stable
Diffusion. Weather and POIs in the re-render are scripted stand-ins:
Nominatim reverse-geocode worked, but Overpass timed out twice
(504), so the POI list is honest fiction. The launch video was not
watched; the Noodl graph was inspected at contact-sheet scale only.

Seeds 187-189 added to FUTURE_PIECES.md. Evidence in
goals/generative-doodles-site/hidden_files/study-2026-09-28-karmann/
(viewfinder + scintigraph frames, dial diagram, pipeline diagram,
device photos, contact sheet, rerender.py).
