# Near Nothing Sky (No. 1772)

The felt driver is standing under a pale grey sky after rain and waiting for a rainbow that may not come: the sky is almost nothing, just light and a low horizon, and a faint double arc sometimes gathers out of the grey, holds for a while at the edge of visibility, and lets go again, so the piece is mostly the patience of looking.

## Spec

TASKS.md prompt block PP1019, study #232 richard-chartier. A pale grey sky fills the screen; a faint double rainbow arc fades in and out over tens of minutes, sometimes barely visible, sometimes gone for long stretches. Palette: pale grey, faint spectral arc, off-white. Composition: horizon low, sky dominant. Motion/interaction: watch-only. Technical approach: gradient sky shader with time-based luminance drift; the arc as a spectral gradient ring masked to low opacity and long-period oscillation. What to avoid: vivid rainbows, clouds, birds, any fast change.

## Mechanism

The sky is a vertical gradient from pale grey at the top to off-white at the horizon, its brightness drifting by three percent on an eight minute sine, so the light slowly breathes without ever changing quickly. The ground below the low horizon (at 78 percent of the field height) is a single flat shade deeper than the sky, split from it by one thin grey line. Two concentric arcs rise from a center below the horizon: the primary bow at radius 0.60 of the field unit and the secondary at 0.535, each drawn as seven thin stroked bands in muted spectral colors (desaturated rose, ochre, straw, sage, slate blue, grey violet). Each band's alpha peaks at 0.13 and falls toward the inner edge of the bow, so the whole arc reads as a stain in the grey rather than a drawn line. The arcs are clipped to the sky so nothing spills below the horizon. Both bows follow the same fifteen minute tide, a sine from zero to one; the secondary bow lags by 0.7 radians, so at any moment the two bows sit at different strengths and the outer one leads. At the tide's trough the arcs vanish entirely for several minutes, then gather again.

## Palette

Pale grey sky top #d3d3cf warming to off-white #ebe9e2 at the horizon; ground #c6c6bd; horizon line grey #a9a9a0; spectral bands in muted rose, ochre, straw, sage, slate blue, grey violet, never saturated. Plates in translucent off-white with grey ink, low contrast by design.

## Periods

Arc tide 900 seconds (fifteen minutes) per bow, secondary lagging 1.1 radians. Sky brightness drift 480 seconds at three percent amplitude. Nothing moves faster than the drift; no flicker.

## Frame one

Fixed phase t = 60 seconds. At that phase the primary tide sits at 0.70 and the secondary at 0.36, so frame one shows the outer bow faintly but clearly present and the inner bow fainter beside it, with the sky three percent brighter than its mean. The first frame is fully determined by the fixed phase: no random values anywhere in the visual state, no clock read before the first draw. First frame rendered identically at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected. Desktop uses a centered square field; phones use the full bleed with the horizon still low and the sky dominant.

## Interaction

Watch only. There are no pointer handlers and no click behavior of any kind.

## Deviations from the prompt

One judgment call. The prompt describes the arc fading in and out "over tens of minutes"; the tide period is fifteen minutes per bow, so a full fade cycle runs about half an hour, which keeps the long slow rhythm while letting frame one and the thumbnail show a present arc. The seven spectral bands are drawn as separate thin strokes rather than a single gradient ring, because a single stroked gradient ring in node-canvas and in the browser both read as one hard-edged band, while separate strokes let each color stay muted and the bow fade band by band toward its inner edge.

## Gallery note

A pale grey sky fills the frame above a low horizon; a faint double rainbow gathers and lets go on a slow fifteen minute tide, sometimes barely visible, sometimes gone entirely. Watch only.

## Plates

Title: Near Nothing Sky. Date: 2006 · 11 · 18. Hint: Watch only.
