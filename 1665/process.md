# No.1665 Double Pursuit, Pentagons

Study #219 jos-vromans, prompt PP912 (JV2). Gallery date 2006 · 08 · 03.
Silent. Watch only, no interaction.

## Driver

Five points chase each other around a pentagon until the chase closes
into a flower.

## Mechanism

The chase is a closed-form function of piece time, never frame
integrated state, so frame one is reproducible. n agents start on the
vertices of a regular n-gon of radius R and each moves at constant
speed toward the next; by symmetry the agents always form a regular
n-gon, and at chase progress u in [0,1) the radius is R(1-u) while the
whole figure has rotated by -cot(pi/n) ln(1-u). Each chase lasts 8
seconds, then the closed figure holds for 1.2 seconds while its
rosette breathes out to 40% brightness before the next polygon begins.
The cycle runs n = 3..8 and repeats, 55.2 seconds per full round. Each
agent's trail is drawn from 200 samples clustered toward closure (so
the tight final winding stays smooth), with alpha fading from 0.90 for
the freshest segment to 0.22 for the oldest, so recent paths are bright
and old paths dissolve. Frame one is piece time 0, which lands in the
n=5 cycle at 62% of its chase: a developed pentagon rosette, five
curved arms and five bright agents partway to the center. All
time-varying terms run well under 14 Hz by construction. Reduced
motion renders one still developed frame.

## Palette

The silver-on-black inverse: silver threadlines (rgb 201, 201, 194)
on a near-black ground (#0e0e0d), agents as bright #f2f2ee dots, title
and hint plates in dark #1e1e1b with light text. One palette, no
mixing.

## Deviations

- The prompt offers two palettes: white threadlines on paper white,
  or the silver-on-black inverse. The paper run was built and
  rendered first, but its #F2F2EE lines on paper were unreadable at
  thumb size (faint hairlines, no flower), so this run uses the
  prompt's own inverse instead, per the run's adaptation rule.
  Agents are bright dots on the black ground rather than darker ink
  dots, matching the inverse.
- Frame one is fixed at 62% through the pentagon chase rather than
  at the chase start, so the first frame is a developed rosette, not
  a bare polygon, per the run's determinism adaptation.

## Interaction

Watch only. No tap, no drag, no reload; the system plays itself out,
n = 3..8, then restarts.

## Asserted counts

- 6 polygons per round (n = 3, 4, 5, 6, 7, 8), 8 s chase + 1.2 s
  hold each, 55.2 s per round.
- 200 trail samples per agent per frame; at most 8 agents (n=8).
- Probe: cycleAt(0) is n=5 at u=0.62; cycleAt(55.2) returns to n=5
  at u=0.62; adjacent-vertex chord at u=0 measures 380.9 px against
  the expected 2R sin(pi/5) = 380.9 px; agent radius at u=0.99 is
  within a pixel of the center.

## QA

Rendered from the actual script with node-canvas at 1280x900
desktop, 390x844 mobile, and 720x720 thumb; all three inspected.
The inverse palette reads at every size: five silver arcs curving
inward, bright agent dots, legible title, date, and hint plates. The
paper-white first build was rejected on its thumb render (lines
unreadable) and rebuilt in the inverse palette. Thumb re-rendered a
second time: byte-identical (md5 bce1a8fbdbec5b861e05f38bd2c2d916).
index.html md5 c3c4fc0d60c16575811e2e430fc6eb3f.
