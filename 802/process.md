# No.802 — Monochrome Field

EXPANSION #98 olivier-mosset, prompt block PP3 "Monochrome Field".

## Concept

Mosset's New York years were monochromes only (1977–86), and the late
monumental version of that program is the giant orange field at MDC Milano
2018: an ~8:1 panorama of flat vermilion-orange enamel where nothing is
depicted and the surface itself is the work. This piece is that wall with no
wall around it: the field fills the frame edge to edge, and the only event
the painting allows is light moving across its semigloss skin, the way sun
crosses a car door. No motif, no figure for scale, no second colour. The
restraint is the content.

## Construction

- **Field.** One flat fill of #C83A1E, wall to wall, on every frame size.
  The page ground behind the canvas is the same tone, so the field reads
  full-bleed everywhere.
- **Palette discipline.** Only two specced tones are used as paint: the
  field #C83A1E and the edge darkening #A62C14. The sheen needed a lighter
  reading of the same enamel, so it uses the field mixed 0.38 toward white
  (#DE846C) — a mix inside the family, recorded here per the brief; no new
  hue is introduced.
- **Sheen.** No gradients exist in this house renderer, so the specular
  band is built from 24 nested full-height flat rects of the sheen tone,
  widest and faintest first, each narrower layer adding 1.4% alpha, so the
  composited light ramps smoothly to ~0.29 at the band centre and back to
  nothing at the edges. (A first build used 56 thin vertical strips; their
  fractional edges antialiased into visible pinstripes, so the nested-rect
  construction replaced them — coordinates rounded to whole pixels.)
  The band is 0.60 of the frame width across, soft as raking light but
  plainly a passage of light ON a flat field, not a gradient IN the field.
- **Motion.** Watch-only, seamless 40 s loop, everything closed-form in t.
  The band centre follows x = W·(0.5 + 0.45·sin(phase)), sweeping left to
  right and back once per loop. The field's brightness breathes ±4% on the
  same phase, approximated by a full-field overlay of the sheen tone (light
  gathering) or the edge tone (light leaving) at up to 5% alpha.
- **Frame one.** The phase carries a fixed offset (PHASE0 ≈ −0.4605 rad,
  sin = −0.444) so that at t = 0 the band centre sits at 0.30·W,
  left-centre, inside the frame — the light is present in the thumbnail
  instead of entering from off-frame. Frame one is the synchronous draw(0);
  Date.now() is never read.
- **Edge darkening.** Five layered flat inset stroke bands of #A62C14 at
  alphas 0.055 down to 0.018, cumulative toward the perimeter, so the rim
  sits slightly darker without ever becoming a vignette gradient.
- **Grain.** Fine enamel grain is precomputed seeded data (mulberry32, seed
  80240): specks of the edge tone (62%) and sheen tone at 1.5–4.5% alpha,
  count proportional to frame area, regenerated identically per size.
- **House rules.** Canvas size from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas pinned in px inside
  draw(); phone detection via window.screen (min dimension < 700px) with
  the aspect fallback, used only to keep grain density right on small
  frames. rAF typeof-guarded; no audio; the only text is the <title>.

## QA log

- Renderer: node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice, byte-compared with cmp —
  identical; duplicate deleted.
- Read-back: all three renders inspected. Desktop and thumb show an even
  vermilion-orange field with one broad, soft passage of lighter enamel
  across the left-centre (the sheen at its t = 0 position), the perimeter
  a touch darker from the layered edge bands, fine grain present but
  quiet. Mobile holds the same reading in the tall frame, sheen left of
  centre, nothing clipped, nothing else in frame. First render round had
  the sheen built from thin strips and read as pinstripes; rebuilt as
  nested rects and re-rendered (see Sheen note above).
- Deviations: the sheen tone is a within-family mix of the field toward
  white, as the brief explicitly allows and records; the ±4% brightness
  breath is realised as a low-alpha overlay rather than a true luminance
  scale, the only mechanism available without filters. No other deviations.
