# №1980 Night Shelter (CR5 / PP1227, EXPANSION #258 ciara-reddy)

Driver: a flash-lit crowd under a bus shelter beside a giant glowing ad, re-arranging in bursts while the on-camera flash freezes the blur every six seconds.

FIRST_T: 6.4 s (flash peak, faces flash-white, blur killed).
Cycle length: 18 s. Flash fires every 6 s (peak 0.5 s into each beat, decayed by 1.5 s); group bursts re-arrange the six agents at t = 3, 9, 15, each settling over 1.4 s; the ad glow breathes on the 18 s cycle.
Interaction: watch-only. No pointer input is wired; the hint reads "Watch only. The flash fires on its own."
Gallery date: 2007 · 06 · 14.

Probe results:
- t = 6.4 (flash peak, frame one): faces flash-white with eyes, blur trails absent, thumb md5 a7af3e7ce7e24e084c7a9067844082bc.
- t = 4.0 (between flashes, burst settle): faces dim warm grey with no eyes, blur trails visible behind the figures, agent 2 mid-raise with the bottle glinting, md5 1a2c0809e6eae19e8321acb7d957fda1. The two probes visibly differ.
- thumb.png is byte-identical to a fresh 720x720 render at t = 6.4 (md5 a7af3e7ce7e24e084c7a9067844082bc, re-rendered and matched).

Deviations from the prompt:
- No audio. The prompt implies laughter and a street scene but no sound model is needed; visuals only, per the visual-only rule.
- The ad panel is abstract (gradient, cyan disc, price and copy bars) rather than a pictured product, keeping it indifferent and commercial without inventing a brand.
- Faces are featureless except for two eye dots readable only in the flash, per the "no staged poses, no beauty lighting" instruction.

Known warts:
- On tall phones the group reads small against a large dark ground field; the wet asphalt below the shelter is intentionally quiet.
- The magenta rim lines on the figures' ad-side edges can read as thin pink seams at desktop size.
- The distant rooftops are very faint and nearly lost on the thumb.
- The raised-drink gesture is visible only during the 3 s settle window after each burst, so most stills show no raised arm.
