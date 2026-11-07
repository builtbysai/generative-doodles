# No.1606 "We Have a River Now" (AW7, aluan-wang #211, PP853)

Driver: the landscape is a diary log that writes itself, one dated feature at a time.

## What was built

A flat cartoon landscape in the prompt's exact palette (sky #7EC8E3, mountain purple #8B7CB8 with hatch #5B4A8A, tree green #3FA34D, field yellow #F2C14E, soil #8A5A3B, river blue #4D96FF, ink #22303C, nothing else). Bands: sky, hatched purple mountains, yellow field, soil foreground, with a blue river band crossing the foreground. Watch-only: no pointer listeners of any kind.

A seeded scheduler deals one feature per 25 second cycle in the prompt's order (tree, mountains, field, power lines, river, birds), each growing in with a wipe or a scale from its anchor plus a small ink asterisk flourish while it grows. Clouds drift as ink outlines and the river shimmers with drifting sky-coloured dashes. Each feature carries a fixed authored log date, starting 2006-05-30 for the tree and incrementing one day per feature through 2006-06-04 for the birds; the corner stamp shows the day of the latest entry written so far. No runtime Date is used anywhere in the visuals, so frame one is deterministic. Gallery date is 2006-06-05, displayed as "2006 · 06 · 05".

House rules: self-contained index.html; Visual Viewport sizing with resize on visualViewport and window; canvas pinned in draw() via style width/height in px; phone detection via window.screen (min dimension under 700px) with aspect fallback; field-like composition full-bleed on phones, square on desktop with the page ground in the piece's own sky colour; one synchronous frame at load; requestAnimationFrame guarded by a typeof check; seeded mulberry32 RNG only.

## Fix rounds

1. First render: frame one read correctly as an early log (sky, ground lines, soil foreground, tree growing in with flourish, log stamp 2006-05-30), but the first cloud was clipped at the left edge on the 390x844 phone render because its drift offset put its centre off-screen at the fixed first-frame time. Moved both clouds' starting positions right (baseX 0.10 to 0.22 and 0.55 to 0.65). Re-rendered all three sizes and re-checked: both clouds fully on-screen on phone, desktop, and thumb.

## Verification

- Rendered 1280x900, 390x844, and 720x720 from the actual script; all three inspected visually.
- Determinism: thumb rendered twice, md5 identical (918dd474e18696f9e13d820b80f230d6).
- Forbidden-API check: no Math.random, no Date.now, no gradients, no shadowBlur. The only addEventListener calls are the required resize listeners.

## Deviations from the prompt

- Clouds: the palette lists no cloud colour, so clouds are drawn as ink outlines with no fill rather than filled shapes.
- The soil foreground band and the two ink ground lines are present from frame one as the prompt's starting "line of ground"; the yellow field grows in over the soil later, per the feature schedule.
- The log cycles: after the birds (2006-06-04) the 150 second cycle restarts at the tree (2006-05-30), so the piece is always mid-log and never a finished landscape.
