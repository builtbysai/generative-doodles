# Draw This, Dan Macnish (deep; 2026-09-28)

Hop from the conceptual-camera thread: the Paragraphica study's "next
doorways" named Dan Macnish's doodling camera alongside Camera
Restricta. This is the sibling study, and together the two close the
loop that started with Matt Richardson's Descriptive Camera: cameras
that reinterpret instead of record, and cameras that refuse instead of
record.

Draw This (2018) is a Polaroid-style camera that prints cartoons. You
point, press the shutter, and a thermal printer spits out a doodle:
the camera's best interpretation of what it saw. There is no
viewfinder, no preview screen. You never see the original photo. The
original repo (github.com/danmacnish/cartoonify) is gone, but several
forks preserve it; the study read the kyselejsyrecek fork's full
application source (Python, originally 2.7, ported to 3), which is the
complete pipeline, not a stub.

## The pipeline, from the source

1. Shutter: Raspberry Pi Camera v2 captures a frame (desktop mode takes
   a file path instead).
2. Detection: a frozen SSD MobileNet v1 COCO graph
   (`ssd_mobilenet_v1_coco_2017_11_17/frozen_inference_graph.pb`,
   about 100 MB), run through the TensorFlow v1 API. 90 COCO classes.
3. For each detection box above threshold, the box center becomes the
   doodle position and the box size becomes the doodle scale
   (sketchgizeh.py: `scale *= mean(width, height) / 255`, positions in
   normalized 0-1 coords). Threshold 0.5 in the sketcher.
4. The COCO label goes through `label_mapping.jsonl`, a hand-written
   mapping from the 90 detection labels onto Quick, Draw! categories.
   This file is the soul of the piece. It contains deliberate
   mistranslations: "remote" maps to "key", "snowboard" to "skateboard",
   "frisbee" to "baseball", "bowl" to "bathtub", "orange" to "apple",
   "skis" to "lollipop", "kite" to "postcard", "parking meter" to
   "sword", "hair dryer" to "drill", "spoon" to "fork", "bottle" to
   "wine bottle", "mouse" to "mouse". Anything with no mapping falls
   back to "scorpion" in the code
   (`self._category_mapping.get(name, 'scorpion')`).
5. The dataset: the full Quick, Draw! binary release (about 5 GB),
   parsed from the raw .bin format in drawingdataset.py (key id,
   country code, recognized flag, timestamp, then stroke count and
   x/y byte arrays per stroke). `get_drawing(name, random 1-1000)`
   picks one random human doodle of the mapped category.
6. Rendering: gizeh (cairo) polylines on a 1200x900 surface, black
   strokes, stroke width 6, scaled and centered on the detection box.
   The `person` class gets special treatment: `draw_person` stacks
   three separate doodles, face at [0,0], t-shirt at [0,250], pants at
   [0,480], a composite paper-doll body.
7. Print: the PNG goes out through `lp` to an Adafruit thermal printer
   over TTL serial (USB explicitly not used, per the README wiring
   notes; eneloop cells required, AA alkalines will not drive the Pi
   plus printer).

## What makes it sing

The misrecognition is the aesthetic, and the mapping file proves it
was tuned, not accidental. "Parking meter" becoming a sword and "hair
dryer" becoming a drill are jokes the author wrote into the lookup
table. The press quotes confirm the intended experience: "a food
selfie of a healthy salad might turn into an enormous hot dog," "a
friend might be reduced to a completely unrecognizable blob." The
device photo (photos/raspi-camera-cartoons.jpg, visually inspected at
full res) shows why the piece works as an object: the camera is a
humble cardboard box with a green lid and a pinhole, the Pi sits
outside it trailing jumper wires, and the receipts on the table show
QuickDraw-crude doodles, a wine glass, a chair, stick-figure people
with faces (the draw_person composite, recognizable). The whole thing
costs almost nothing and looks like it. The Raspberry Pi GPIO code is
full of craft details: capture on button release, hold for video,
proximity sensor approach detection, a halt button, LEDs for
alive/recording/busy states, even a clap detector module.

## Re-render (local, visually inspected)

Three thermal receipts showing the pipeline stages, with hand-drawn
QuickDraw-style strokes (0-255 space, honest stand-ins, not dataset
rows): receipt 1, wine glass detected at 0.87, mapped to wine glass,
random doodle drawn; receipt 2, remote at 0.74, mapped to key through
the hand-written mistranslation; receipt 3, unmapped class, falling
back to scorpion per the code. Files: drawthis.html plus drawthis.png
in the evidence dir. The wine glass doodle took two passes to read as
a glass rather than a ring; the scorpion is deliberately crude.

## Honest gaps

Macnish's original blog post (danmacnish.com/2018/07/01/draw-this/) is
gone, 404 on both http and https, so his own writeup comes secondhand
through the forks' READMEs and the 2018 TechCrunch/Engadget/Gizmodo
coverage. No model was run (the 100 MB graph and 5 GB dataset were not
downloaded); the QuickDraw .bin parsing was read, not executed. The
Kapwing online demo was not tried. Device seen only in the repo photo.

## Technique notes for the practice

- Detection box as composition: center and size of the box drive
  placement and scale of the replacement drawing, the photo's
  composition survives even though its pixels do not.
- The lookup table as the artwork: label_mapping.jsonl is where the
  jokes live; the model is dumb on purpose, the mapping is smart.
- Fallback as character: an unmapped class does not error, it draws a
  scorpion. Defaults are design decisions.
- Blind capture: no viewfinder means the photographer composes for
  the network's interpretation, not for the frame.
- Stroke data as a medium: QuickDraw's binary stroke format (byte
  x/y arrays) is trivially parseable and endlessly reusable.

Next doorways: the Kapwing online version (same pipeline, browser),
Ross Goodwin's word.camera (the lineage's other blind camera, already
studied 2026-09-27), and Quick, Draw! itself as a dataset (50M+
drawings, the largest human stroke corpus in existence, barely touched
in this study queue).
