# №8996 · Still Life — process notes

## Concept
Seeded vessel still lifes drawn flat, in the discipline of the Parametric
Pottery lineage: a composition algorithm seats 2–4 vessels on a low table,
each with a generated bezier profile, long cast shadows in one consistent
direction, and exactly one accent vessel per arrangement. Two palette modes
(vibrant generative, natural preset). The horizon never lands in the same
place twice.

## Composition algorithm
- **Horizon**: seeded at 360–560 VU; wall above (warm paper), table below
  (darker tone), one horizon line. Faint light bloom upper-left matches the
  shadow direction.
- **Seating**: the table width is split into N slots; each vessel is centered
  in its slot with jitter, widths clamped to fit. The tallest vessel goes to
  a golden-ratio-ish slot (seeded side). At most one vessel per scene gets a
  plinth block.
- **Vessel profiles**: 8 seeded stations (foot, belly, shoulder, neck, mouth)
  interpolated with Catmull-Rom into a smooth symmetric silhouette. Belly
  position/width, neck pinch, and lip flare all vary.
- **Rendering per vessel**: long soft shadow (two layered fading quads down
  and right) + contact ellipse; body with vertical gradient; clipped
  highlight band, right-edge shade, 0–2 decorative bands; dark mouth ellipse
  inside a body-colored lip; base line. Some vessels get 2–3 thin stems with
  small leaves, emerging from inside the mouth along the stem's quadratic
  curve.
- **Headroom guard**: vessel height is clamped so the mouth always clears the
  top edge, and stem length is clamped to the available headroom.

## Palette logic
- Natural mode: quiet clay/sage/ochre/slate/bone vessels, accent in deep
  indigo or persimmon.
- Vibrant mode: two anchor hues 55–130° apart; quiet vessels interpolate
  between them at moderate saturation; the accent vessel takes the
  complement at high saturation. All colors resolved to hex at creation.

## What broke during tuning (real bugs, fixed at the source)
1. **Vessels invisible in vibrant mode**: the vibrant branch built colors as
   `hsl(...)` strings, but the shading helpers (`mix`, used by every
   `addColorStop`) parse hex only. `addColorStop` threw a SyntaxError on
   `rgb(NaN,NaN,45)`, aborting `render()` mid-vessel — shadows and plinths
   drew, bodies never did. Fixed by resolving vibrant colors through a new
   `hslToHex` helper at creation time.
2. **Tall vessel clipped at the top edge** (seed 1234): height had no
   headroom constraint. Fixed by clamping height against the vessel's base
   height and clamping stem length to remaining headroom.
3. **Blobby foliage**: first leaf pass used 2–3 huge ellipses clustered at
   stem tops. Reworked to 3–5 small leaves alternating along the upper stem,
   positioned on the actual quadratic stem curve.
4. **Adjacent plinths**: per-vessel plinth chance could stack blocks. Now at
   most one plinth per scene, on a seeded vessel.

## Tooling note
`shot_thumb.py` / `cdp_shot_port.py` report "console entries: 0" but do not
capture `Runtime.exceptionThrown` — the addColorStop crash above was
invisible to them. Verified exceptions separately via CDP with
`Runtime.enable` and an explicit `exceptionThrown` listener.

## Why the default seed won
`899601` seats four vessels with a clear rhythm (tall teal accent, two
mid quiet pots, one short ochre), varied believable profiles, bands on two
vessels, and long shadows pulling the eye right. Seed 42 (three vessels,
delicate sprigs) is a close second; seeds 7 and 555 confirmed the foliage
and natural-mode range.

## QA
- 5 seeds rendered (899601, 7, 42, 1234, 555): all balanced, no clipping,
  no overlaps, shadows consistent.
- Desktop + 390×844 mobile inspected: no scroll/overflow, caption fits.
- Zero console entries and zero uncaught exceptions on all captures.
- Click regenerates a new seeded seating; `?seed=` selects one.
