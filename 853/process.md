# №853 Binocular Girl

IA7 / PP1253, study #261 iso-attrill. Formula date 2004-05-13.

## Driver

The driver is the small thrill of looking: a girl lifts her binoculars and the whole park falls away, and for a few seconds the world is only one bright thing, a bird, a kite, a paper plane, before the wide green comes back.

## What it is

A bright park scene, watch-only. A girl in a purple floral raincoat stands centered in a saturated green park under a blue sky. Every twenty seconds her binoculars rise, and the view irises open through the two lenses onto a distant detail that fills the frame edge to edge, then irises closed and the park returns. The details rotate in a fixed order: a coral-breasted bird on a blossoming branch, a pink and purple diamond kite with a bowed tail, a white paper plane over distant rooftops.

## Cycle

60 seconds, three 20 second segments, one detail per segment, fixed rotation bird, kite, paper plane, never reseeded. Inside a segment, phase s in seconds: 0 to 7 wide park with binoculars at the chest; 7 to 10 binoculars rise to the eyes; 9 to 11 iris opens through the lenses; 11 to 17 detail fills the frame; 17 to 19 iris closes; 19 to 20 binoculars lower. FIRST_T is 5 seconds: the girl in the bright park, binoculars at her chest, the first rise two seconds away.

## Palette

Saturated park green lawn and trees, floral purple and pink raincoat, sky blue, warm sun yellow, coral bird, white paper plane.

## Interaction

Watch-only. No click, no tap action, no reload. Hint, in canvas: "Watch the binoculars rise."

## Technique

Canvas 2D only. Two alternating scenes with a circular iris wipe: two circles grow from the binocular lens positions, clipped, with dark lens rims riding the wipe edge while it travels, until the detail scene fills the frame. All motion is closed-form functions of the virtual clock. No Math.random at runtime; flowers, blossoms, sky birds and coat print come from seeded tables fixed at load. One synchronous frame at load; every requestAnimationFrame call is guarded with a typeof check. Visual Viewport sizing with resize on visualViewport and window. Phone detection by window.screen with the aspect fallback. Field-like composition, full-bleed on phones, square on desktop. Caption plate and hint drawn in canvas in the template place. Reduced-motion preference shows the fixed first frame only.

## QA

Rendered from the actual script with node-canvas at 1280x900 desktop, 390x844 mobile and 720x720 thumb, all inspected: no clipping, caption and hint clear at every size, composition legible at thumb size. Time probes with a node harness rendering at two cycle times: centre region mean absolute pixel difference t=5 vs t=14 (wide vs bird detail) 67.92; t=14 vs t=34 (bird vs kite) 36.06; t=34 vs t=54 (kite vs plane) 18.57; t=5 vs t=8 (binoculars down vs rising) 2.95. Park surround stable across the same pair: lawn 0.00, sky 0.08. Mid-iris frames at t=10 and t=18 inspected: the wipe reads as two lens circles opening and closing.

## Known warts

The sleeves are the same purple as the coat, so the arms read mainly by their outline when raised. The hint pill sits over the treetop band in the kite detail and over rooftops in the plane detail, still legible on its dark pill. On a tall phone the girl is small in a large sky, which is the field composition doing its job, but the figure is less dominant than on desktop.
