# №8976 · Emissive Theory · process notes

Date: 2026-08-08 · Default seed: 104 ("Emissive Theory")

Gallery caption: *Plato thought the eye sends out rays. Here they are, marching.*

## Concept
Plato's emissive theory of vision, flipped into a playable piece after Char Stiles's
"Plato" hook: seeing as touch at a distance. The piece opens on Johann Zahn's 1702
Radiating Eye as an engraved title card (parchment, hatched iris, radiating lines),
then fades into a dark studio where a small radiant eye hovers before a simple
raymarched SDF scene (two smooth-blended spheres, an optional torus, a ground
plane). The eye casts fifteen visible "feelers": each ray is marched on the CPU
through the exact same SDF the fragment shader renders, drawn as a glowing
polyline with a dot at every march step and a bright traveling head. Rays strike
surfaces and bounce (up to two bounces, true reflection off the numeric normal),
then release and emanate again. A slow precession keeps the fan searching. A
one-line ticker teaches the theory in plain words while you play: the eye casts
its feelers, each step tests the distance, a strike and the ray bounces on, what
the feelers touch is what you see.

## Differentiation
№9026 Flight Deck is a z-stack rig of additive flow-field particle-trail sprites
with forward camera flight through fogged depth levels. This piece is a different
rendering technique and a different subject: a raymarched SDF scene (fragment
shader, analytic normals, fog) whose pedagogy is the per-ray march paths
themselves, drawn as visible geometry over the image. Nothing is shared with
the 9026 family: no particles, no flow field, no camera flight. It also stands
apart from the retired №8998 raytraced-room family (that was a static
three-light room study; this is an interactive emissive-theory instrument).

## Success criteria
A stranger learns emissive theory by playing: drag orbits the eye, click mints a
fresh seeded scene (new layout, palette, lighting), and the rays are the
prettiest thing on screen. The march-step dots make the "marching" literal.

## Seeds tried
- 104 (default, kept): alabaster palette, bone + rust smooth-blended spheres,
  torus off. Clean composition; after the fan bias, most rays strike the spheres
  and bounce visibly.
- 7: umber palette, torus on behind the spheres. Strong too, rays kink off the
  spheres, but busier; not the default.
- 42: checked for generator sanity during tuning.

## Implementation notes
- One self-contained index.html. WebGL fragment shader (56 march steps, cheap
  lambert + spec + rim + exp fog) rendered at reduced resolution and upscaled by
  CSS (0.62 desktop, 0.5 under 700px width) for phone perf. 2D canvas overlay
  draws the feelers additively.
- The CPU SDF mirrors the GLSL SDF exactly (spheres, torus with Y-rotation,
  plane); numeric-gradient normals for bounces.
- Click vs drag disambiguated by pointer travel (< 8px = reseed).
- No em dashes in any visible copy.

## QA
- Desktop 1280x800 and mobile 390x844 rendered headless (Chrome --headless=new,
  --enable-unsafe-swiftshader, isolated port 9345) and visually inspected:
  title card, scene, reseed, ticker, HUD. No scroll or overflow at either size.
- Fail-closed exception check (Runtime enabled before navigation, continuous
  drain through card load, scene entry, and a scripted reseed): 0 exceptions,
  0 console errors.
- Fixed during QA: title text overlapping the card eye (eye moved up, shrunk);
  top HUD plate/hint overlapping at 390px (plate hidden under 700px); ray fan
  rebiased toward the subject so strikes read clearly.
- Known rig note, not a piece bug: an isolated Chrome port is required; a
  sibling agent's instance on 9341 caused a tab race. Also, CDP
  Page.captureScreenshot intermittently returns no data right after an
  evaluate; retrying the capture succeeds.
