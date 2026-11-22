# №1976 The Zenith Body

Driver: a figure floats face up in dark green algae water seen from dead vertical, foam rings and seaweed drifting around it while the camera holds the zenith.

FIRST_T: 10 s. Cycle length: 60 s. Gallery date in the piece: 2007 · 06 · 10.

Interaction: drag to tilt the camera up to 4 degrees off the zenith; the figure's gaze follows the lens and the water, foam, and figure parallax shift against the tilt. On release a spring settles the camera back to dead vertical. Never click to reload.

Motion: the green field breathes on a slow sine, foam rings drift and spin, sun glitter twinkles, seaweed sways. The red register arrives late: the garment fades from dark green grey to red over cycle seconds 40 to 48. Once per cycle, seconds 42 to 54, the photographer's shadow (camera body and three tripod legs) crosses the lower fifth of the frame and never covers the face.

Probe results (node probe script, 1280x900):
- frame one (t=10) md5 e280baa1bc46208992a2045d69a56525
- tilt applied (4, -3 degrees) md5 2b6d5c014df4dc74ef1292f76845e0e3, differs from frame one: true
- release md5 e280baa1bc46208992a2045d69a56525, returns to frame one: true
- t=30 md5 0ccb678ac8da3a75ac8134e220743f25, differs from frame one: true
- t=48 (red garment, shadow mid crossing) md5 ecd2a642b5b6b0edea8998073f4deaa0, differs from frame one: true
- thumb.png is byte identical to the 720x720 render (md5 3fa0441aeb21557d7472d0c11f1262f6).

Deviations from the prompt: the red garment is not red from the start; it arrives in the late register (cycle seconds 40 to 48), per the prompt's "one red garment for the late register". No audio: the prompt implies no sound, and the piece is visual only.

Known warts: the figure is deliberately simple and flat, a posed pictogram rather than a drawn body; the water blobs read as soft bokeh pools, which suits the algae water but keeps the field abstract; the shadow's camera body stays a fairly plain dark block at mid crossing, softened at its edges.

Fix rounds: 2. Round 1 narrowed and lengthened the torso capsule (first build read as a round blob) and moved the arms in to match. Round 2 softened the photographer's shadow band with horizontal and top edge feathering (first build read as a hard black rectangle).
