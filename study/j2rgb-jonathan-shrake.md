# j2rgb (Jonathan Shrake): Study Notes

**Profile:** x.com/j2rgb (login wall, not accessed) | X bio: "real-time graphics,
shaders, math", 3K followers | instagram.com/j2rgb | GitHub: jshrake.
**Key works:** "geometric avoidance", "parametric organisms", "perlins loom"
(r/generative, 2021, threads pwi1ch, pkzlw5, q7zlg4); the X post Hans shared,
status 1459567301133430786 (2021-11-13 17:02 UTC), three still images tagged
#glsl #creativecoding #generativeart #simulation. Author of **grimoire**, a
cross-platform live-coding GLSL shader tool (Rust/SDL2/GStreamer, now
jshrake/grimoire-legacy; forked to technologyarts/grimoire in 2022), described
by him as "my personal prototyping tool".

**Depth:** deep technique, visual on the artwork, one honest gap. The tweet's
three images were recovered from the Wayback Machine (3 captures of the exact
status URL, earliest 20211113171102) and inspected at 2048px. His 2019
physarum engine (jshrake/physarum) was read in full: all six GLSL shaders,
index.js, Controls.js. The steering model was re-rendered locally in Python
(three variants, faithful port of his update shader with his default
parameters), visually compared against his images. His five 2019 sample
renders were inspected. The three named r/generative videos were NOT seen:
the ludochaordic mp4s 404, reddit is unreachable, X is login-walled. What
follows is certain about the engine and the tweet images; the three videos
are known only by title and archive caption.

## Who he is
A real-time graphics engineer (his day-job repos are point clouds, LiDAR,
NeRF tooling, WebGPU) who performs generative art live in GLSL. The through
line of his practice is the instrument: he builds his own live-coding
environment (grimoire), his own simulation rigs, and then plays them. The
2021 pieces are performances of a simulation, not renders of a script.

## The tweet images, read off the pixels
Three square frames, same system, same discipline:

- Each frame shows agents as angular polyline trails plus solid flat discs.
  Frame 1 is sparse: roughly 50 long zigzag trails, each carrying triangular
  and circuit-like motifs, with discs of varying size sitting on the trails.
  Frame 2 is dense: thousands of short angular segments aligned to a diagonal
  flow with vortices, discs scattered through. Frame 3 is densest: a tangled
  scribble of small loops and curls filling the frame, discs throughout.
- Palette discipline is the whole upgrade over his 2019 work: one hue family
  (purple), four to five flat values from near-black indigo through deep
  purple, mid purple, mauve, pale lavender, on a warm off-white paper
  ground. Flat fills only. No gradients, no glow, no black background.
- The trails never look drawn; they look walked. Sharp angular turns, no
  smooth curves. That angularity is a parameter choice, not a style filter
  (see the steering section).

## The engine: a slime mold, played like an instrument
jshrake/physarum (2019, "a slime mold simulation in JS and WebGL") is the
engine family behind these images. It implements Jeff Jones's Physarum
particle model (Jones 2010, Artificial Life; PMID 20067403): a population of
simple agents doing chemotaxis on a trail field, which spontaneously forms
transport networks, labyrinths, and reticulated patterns.

The steering shader (update_agents_fs.glsl), read in full:

- 65,536 agents (256x256 texture, RGBA = x, y, angle/2pi, 1).
- Each agent samples the trail field at three sensors: forward-left,
  forward, forward-right, at sensor angle SA and offset SO.
- Steering: forward strongest, go straight; forward weakest, turn randomly
  plus/minus RA; left weaker than right, turn plus RA; right weaker, minus RA.
- Move by step size SS, wrap the world with fract.
- His defaults: SA=22.5 degrees, RA=21 degrees, SO=9 px, SS=2.5 px,
  decay=0.8. The trail pass is a 3x3 box blur with decay each frame.

The performance layer (Controls.js), read in full:

- Click-drag paints agent streams into the world (250 agents on mousedown,
  50 per mousemove, radius 0.025).
- Double-click gathers ALL 65,536 agents into a disc of radius 0.075 at the
  cursor, with random headings. This is the disc in the tweet images: one
  gesture collapses the entire swarm into a solid form, then the agents
  stream back out, avoiding each other's trails, and the network rebuilds.
- dat.GUI exposes decay, SA, RA, SO, SS, reset, radius. He tunes the
  instrument live.

That decodes the tweet completely: painted streams plus gathered discs,
performed. The three frames are three moments or parameter states of one
performance.

## The hops
- **Sage Jenson**, his cited inspiration ("inspired by this amazing work"):
  "36 Points / Physarum Explorer (2019)". NASA's quoted line on Jenson's
  work: "mesmerizing artistic simulations". Jenson proved the slime mold
  could be gallery work; Shrake built his own rig and took it further into
  performance.
- **Jeff Jones** (UWE Bristol): the particle model both of them implement.
  Jones's parameter maps show SA/RA/SO scaling controlling the pattern
  regime, which is exactly what Shrake's GUI exposes.
- **grimoire** (SPEC.md, read): TOML-defined resources (image, video,
  webcam, mic, audio, GStreamer pipelines, framebuffers) plus an ordered
  list of shader passes with blend/depth/primitive control, all files
  watched and live-reloaded. His 2021 performances almost certainly run on
  a rig of this shape: ping-pong agent texture, trail buffer, render pass,
  played live.

## Local re-render: what the model actually produces
A CPU port of his exact steering shader and diffuse/decay pass, his default
parameters, run three ways (hidden_files/study-2026-10-01-j2rgb/simulate.py):

- v1 (diffuse trail field, his 2019 render path): correct network
  morphology but washed out, wrong for the 2021 look.
- v2 (65k agents, persistent path-lines): saturated into a solid purple
  network. Too many agents for crisp lines.
- v3 (4,000 agents, persistent 1px path-lines, purple ink on paper, stamped
  discs): reproduces the structural vocabulary. Reticulated branching
  networks, angular trails, flat discs on cream. Denser and more
  network-like than his sparse frame 1, closest to his frame 2.

Verified: the Jones/Shrake steering model with SA/RA in the low twenties
produces exactly this angular, geometric trail quality. High RA is what
makes it read geometric rather than organic. The disc-gather mechanic is
the compositional device: solid flat form against self-avoiding linework.

## What to steal (study, not copy)
- The gather gesture: one input that collapses the entire agent population
  into a solid form, then releases it. Punctuation for a continuous system.
- Palette as the upgrade path: the 2019 white-on-black demo look and the
  2021 purple-on-paper gallery look are the same engine. The restraint is
  the piece.
- Angular steering: keep rotation angles high and sensor angles moderate,
  and agent trails read as geometric circuitry instead of organic slime.
- Performance over render: the work is played (paint streams, gather
  discs, tune SA/RA live), not scripted to a final frame.
