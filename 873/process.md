# №873 Hang It Dirty (SOA3, PP1273, study #264 sheldon-omar-abba)

## Driver

The reviewer's nose to the grain. A gallery wall where the prints hang on
blue painter's tape and binder clips, a toolbox of spare prints below, a
tire and oil-jug shrine on the floor. The wall is close enough to touch;
the grain is visible when you lean in. Everything is within reach, nothing
is behind glass, nothing is at museum distance. Closeness is the
interaction, so closeness is the mechanism.

## Mechanism

Four black-and-white prints hang at nose height on a scuffed white wall,
each held by two strips of blue painter's tape at its top corners; the
second print also carries a binder clip. The prints are portrait sheets
with a white margin and one motif each: concentric circles, diagonal bars,
a halftone dot field, an arch over bars. The wall carries scuffs, specks,
old nail holes, and a faint pencil level line. Below, the floor holds a
toolbox with spare prints fanning out of it, a leaning tire, an amber oil
jug, and a shop rag.

Idle motion is a draft: each print sways around its top-left corner by at
most about half a degree, on a period that divides the 60 s cycle
(60/30/20/15 s), so the loop is seamless. Grain sits over every print at
all times: coarse and faint at rest, dense and crisp up close.

Drag is earned closeness. Pointer down on a print grabs it; dragging
downward pulls it toward the viewer. Proximity p runs 0 to 1 over 220 px
of pull. As p grows, the print rotates up to 0.52 rad around its taped
top-left corner, hanging by that one corner, and scales up to 1.30x as it
comes nearer. The far tape peels off the wall and flaps (rotating up to
1.35 rad), the wall shadow grows and drops as the print lifts, the motif
ink deepens, fine detail lines appear, and the grain resolves: 99 dots at
rest, 260 at full pull, shrinking and darkening as they multiply. Release
settles the print back onto the wall over 1.4 s of virtual time, then the
draft loop resumes exactly.

## Interaction

Drag a print toward you. Pointer down on a print grabs it; drags on empty
wall or floor do nothing. Release settles back. No click-to-reload, no tap
action, no audio (visual-only per the Franke rule).

## Fixed facts

Number 873; title "Hang It Dirty"; gallery date "2004 · 06 · 02"
(formula 2002-01-10 + 874 days); interaction cue "Drag a print toward
you." Caption plate and hint are drawn in-canvas: title and date top
left, hint centered just above the floor line in dark ink on the wall.

## QA gate

Rendered the actual script with node ~/workspace/tools/render-piece.js at
1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected
visually. thumb.png is the 720x720 render, md5
c4e5a66bffe54ca1ca2c62d5466d98c0.

- FIRST_T 12 s, cycle 60 s.
- Determinism: two draws at FIRST_T differ 0 px.
- Loop seam: FIRST_T vs FIRST_T + 60 s differ 0 px.
- Motion: FIRST_T vs +15 s differ 9,358 px; vs +27 s differ 10,671 px
  (draft sway, subtle by design).
- Drag probe (print 2, stripes): pointer down hits, pull 180 px gives
  p 0.818, pull 220 px gives p 1.000; angle 0.004 to 0.524 rad, scale
  1.00 to 1.30; drag frame differs 34,562 px from the loop frame at
  180 px and 39,604 px at full pull. Grain resolving: dark pixels in
  the print bounds rise from 5,677 at rest to 7,831 near, a 38 percent
  increase. Drag frame rendered and inspected: the print hangs by one
  corner, enlarged, far tape peeled and flapping, shadow grown.
- Release probe: p 0.500 at +0.7 s, 0.000 at +1.4 s; settled frame
  differs 0 px from the clean loop frame at the same t.
- Miss probes: pointer down on empty wall (10,10) and floor (360,680)
  grab nothing.

## Fix rounds

Fix round 1 (after first render inspection): oil jug overlapped the tire
on tall phones, so the tire moved left (0.52W to 0.47W), the jug moved
right (0.665W to 0.72W), the tire shrank (radius 0.44 to 0.40 of floor
height), and the rag moved clear of the tire; the binder clip wires were
shortened so they read less like antennae; the arch motif's white disc
was raised and shrunk so the mark reads as an arch over bars rather than
a question mark. All three sizes re-rendered and re-inspected, probes
re-run, thumb regenerated.

## Deviations

None material. Visual-only per the Franke audio rule. The four print
motifs, the toolbox, tire, jug, and rag are invented staging in the
study's register, as the prompt names the elements but not their exact
shapes.

## Minor known warts

- On tall phones the wall between the prints and the floor is a large
  quiet field; the pencil line and scuffs are the only marks there.
- The oil jug's handle and spout are flat stylized shapes; the spout
  reads as a dark wedge at thumb size.
- The binder clip wires still read as two short antennae above the
  second print at small sizes.
- The arch motif can still suggest a question mark at a glance.
- The rag is partly tucked behind the tire on desktop.
- The draft sway is near-invisible in stills by design.
