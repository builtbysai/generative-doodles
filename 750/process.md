# No.750 Meeting Roof

EXPANSION #91 james-turrell, prompt block 7 "Meeting Roof" (TASKS.md, verified
verbatim). James Turrell, Meeting, MoMA PS1, 1980-86, renovated 2016: a square
aperture cut through a concrete ceiling, opening onto a flat plane of sky, with
the 2016 LED program washing the ceiling surround in colors synchronized to
sunrise and sunset.

## Concept

The frame is a concrete ceiling. At its center, a square hole has been broken
through it, and the break is the signature: the rim is jagged, chipped, with
hairline cracks running out into the slab. Through the hole, a flat plane of
sky runs its daylight program on the viewer's real local time: night blue-grey,
dawn rose warming through amber to pale, full day, dusk in reverse. Around the
hole, the LED wash plays the second color system: in the hour centered on
sunrise and on sunset it floods the concrete with rose turning teal turning
amber, strongest at the rim and dying into the room, and a trace of it spills
just inside the opening, so the artificial color and the natural sky meet at
the broken edge. Outside those windows the wash rests at a faint neutral and
only the sky moves. Watch-only; there is no input, no clock, no readout.

## Construction

- Single self-contained index.html, canvas 2D only, no external assets.
- Sizing from the Visual Viewport API, resize listeners on visualViewport and
  window; canvas.style.width/height pinned in px on every draw. Phone
  detection via window.screen (min dimension under 700px), aspect fallback
  h > w * 1.15; the aperture stays square at every size, page ground is the
  concrete tone.
- Program clock and minute quantization (house adaptation): Date is read only
  at (year, month, day, hour, minute) resolution. Sky state, wash state, and
  the drift of the faint sky bands are pure closed-form functions of the local
  date and minute-of-day, so the frame is constant inside any minute and
  back-to-back renders inside one minute are byte-identical, while the piece
  still genuinely runs on real local time. No seconds or milliseconds are ever
  consulted; no Date.now() anywhere.
- Solar model (same model as the sibling piece No.744 Skyspace Dawn):
  declination from day-of-year (decl = -23.44 deg * cos(2pi * (doy + 10) /
  365)), hour angle at a fixed 40 degree latitude, solar noon at 12:00 local;
  sunrise/sunset in minutes of day are 720 -/+ the half-day length. Dawn and
  dusk windows are the 60 minutes centered on sunrise and sunset.
- Sky program: keyframed [bottom, top] tone pairs interpolated between the
  palette anchors only: night [#232C3E, #232C3E] -> uniform rose #E8A2A8 ->
  amber low / rose high -> pale #AFC8E8 low / noon #7FA8D8 high, smoothstepped
  over progress p (0 at window start, 1 at full day; dusk runs p in reverse).
  The night anchor #232C3E is recorded here as the one addition the brief
  sanctions, a deep tone derived from the sky family for the night hold.
  Rendered as 48 flat horizontal strips (house rule: no gradients), plus two
  seeded noise bands at very low alpha (0.02-0.04) drifting as closed forms of
  the minute, cloud texture suppressed as in the sibling piece.
- LED wash program: inside a dawn or dusk window, color runs rose #E88AA0 ->
  teal #4AD8C8 -> amber #F0A840 across the window progress while strength
  follows a sine envelope (peak alpha about 0.39 at mid-window); outside the
  windows it rests at the concrete tone at alpha 0.05. Rendered as 16 layered
  low-alpha rounded rects expanding from the rim with a (1 - f)^1.7 falloff
  (house adaptation: layered alpha instead of a radial gradient), plus three
  low-alpha strokes just inside the rim where wash and sky meet.
- Concrete: flat #3A3B3E fill; 30 seeded trowel patches drawn as
  brightness-scaled concrete tones only (factor 0.90-1.12, low alpha); 2,400
  seeded speckle points in the edge tone and a lightened concrete tone; two
  faint formwork seams. All texture streams are mulberry32, rebuilt
  identically on every draw.
- Broken edge: 168 seeded offset knots around the aperture perimeter
  (mulberry32, seed 75090777); about 7.5% of knots are deep chip bites; the
  offsets are lightly smoothed (0.22 / 0.56 / 0.22) so the rim reads as
  fractured concrete rather than static. The rim is drawn as a band between
  two jagged loops in the broken-edge tone #2A2B2E, with an inner shadow lip
  stroked along the sky opening, a faint top catch of light on the outer loop,
  and 9 seeded two-segment hairline cracks running outward from the rim.
- Aperture proportion: side is 60% of the smaller frame dimension (66% on
  phones, for presence at small sizes); always exactly square, centered.
- No audio, no microphone, no interaction handlers.

## QA log

Rendered with node ~/workspace/tools/render-piece.js (node-canvas, no rAF, so
the QA renders are the synchronous first frame):

- qa-desktop.png (1280x900) and thumb.png (720x720), rendered 2026-10-31
  20:14-20:15 UTC, after the model's 17:08 sunset: night state. Concrete field
  with visible trowel variation, formwork seams and speckle; centered square
  aperture with a wavy, chipped broken rim, dark shadow lip, and hairline
  cracks; inside, a flat deep night-blue sky plane (#232C3E) with the two
  noise bands showing as a faint whisper of modulation. LED wash at rest,
  invisible as intended. The edge reads broken, not clean.
- qa-mobile.png (390x844): phone path taken; aperture stays square at 66% of
  the 390px width, centered, nothing clipped, concrete fills the tall frame.
- Determinism: thumb.png rendered twice back-to-back inside one minute, cmp
  byte-compare identical, before and after the fix round. Duplicate deleted.
- Forced dawn check (throwaway, ?seed=t6:42 hook; the model sunrise for
  2026-10-31 is 06:51, so 06:42 is dawn progress 0.35): sky inside the
  aperture is the warm rose plane, and the LED wash floods the concrete in
  teal (rose -> teal mix at that progress) at near-peak envelope strength,
  strongest at the rim, falling off smoothly outward, with the spill trace
  visible just inside the rim. The two color systems meet at the broken edge
  as specced. Throwaway render deleted after read-back.
- Fix round: the first pass used 9 wash layers and the falloff read as
  visible concentric steps; raised to 16 layers with per-layer alpha scaled
  to keep the same cumulative strength, and the sky noise-band alpha was
  halved (0.04-0.07 down to 0.02-0.04) after the night frame showed the
  banding as a faint blind-like structure. Re-rendered all sizes and
  re-verified the byte-compare.

## Deviations

- Minute quantization of the program clock (house adaptation, as on No.744):
  the real Turrell programs ease continuously; here the state steps once per
  minute so frame one is reproducible for the determinism gate. At the scale
  of an hour-long window the steps are imperceptible in normal viewing.
- Flat stepped bands for the sky and layered-alpha shapes for the wash,
  replacing the gradients a literal reading would use (house no-gradient
  rule); the tonal result is the same stepped Turrell plane.
- Fixed 40 degree latitude and 12:00 solar noon in the solar model (the piece
  cannot know the viewer's location), matching the sibling Skyspace piece;
  sunrise/sunset are honest estimates from simple solar math.
- Night sky anchor #232C3E added per the brief, recorded above; every other
  color comes from the specced palette.
- Aperture sized as 60% of the frame's smaller dimension rather than 60% of
  frame area, so the square keeps its proportion on wide and tall frames
  alike; 66% on phones.
