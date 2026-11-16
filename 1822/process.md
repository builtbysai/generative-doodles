# No.1822 Layered Testimony

## Prompt (TASKS.md, AD7, PP1069, study #238 arnold-dreyblatt)

Title: Layered Testimony. Visual description: Five backlit panels hang in a black room, each carrying strata of overprinted text like pages pressed together until the words become texture. The panels drift in slow parallax; a soft hand-shaped shadow occasionally passes across one. The text is present as ink and light, never as a readable declaration. Palette: black room, milky white panels, warm grey text. Composition: the five panels in a receding row; the viewer faces them straight on. Motion-interaction: watch-only. Panels breathe with slow light modulation; the shadow passes on its own schedule. No input. Technical approach: layered canvas text with per-layer alpha and offset drift; shadow as a soft blurred mask moving on a long timer. What to avoid: do not invent specific historical claims or readable political text; the text must stay abstract strata, not statements.

## Build

- Single self-contained index.html. Five panels of overprinted text-as-texture, drifting in parallax; a soft shadow passes on a long timer.
- Five panels in a receding row, asserted count, center largest and brightest, outer panels smaller and dimmer: center panel 0.215 of layout width by 0.64 of panel scale, inner pair 0.175 by 0.55, outer pair 0.150 by 0.46. Drawn outer first, center last, so the row overlaps correctly. Each panel breathes with its own slow light modulation (0.11 rad per second, per-panel phase) and drifts in slow parallax (sine drift scaled by depth).
- Text strata: 6 overprinted layers per panel, 9 to 11 rows each, built from a fixed list of consonant clusters and single letters (kth, zrm, plv, nqk, thl, vrz, mkn, spt, grd, bln, qst, wrx, fjd, hng, cpl, dvm, plus two-letter fragments and single letters). No real words, names, dates, or sentences anywhere in the piece. Each layer has its own alpha (0.14 to 0.34) and slow horizontal offset drift; each row has fixed jitter and rotation. All strata are precomputed once from seeded mulberry32(1822), so the layout is identical on every render.
- Shadow: a soft hand-shaped silhouette (palm, four long fanned fingers, thumb rooted in the palm) drawn in three passes at growing scale and falling alpha for a soft edge. It crosses the row once per 240 second cycle, entering at t = 100 s and leaving at t = 140 s, and is parked off frame the rest of the cycle. At the fixed first-frame phase t = 60 s the shadow is still off frame.
- Palette: black room ground #0B0B0A, milky white panels #F2EEE3 / #EDE8DB / #E4DFD0 / #DCD6C4 / #D2CCB9, warm grey text #5A5348 / #6E675C / #8A8172. A faint radial wash and a floor line ground the row in the room.
- Watch-only, no input handlers. Flicker is nil by construction: the only motion is slow sine drift, slow light breathing, and the 40 second shadow crossing once per 240 seconds. prefers-reduced-motion renders the still frame one.
- Frame one is fixed phase t = 60 s: all five panels visible, strata settled, shadow off frame. Deterministic, seeded PRNG only.
- Plates: title plate "Layered Testimony" with date "2007 · 01 · 07" top left, hint plate "Watch only." bottom left. Page ground is the piece's own black; centered geometry kept, full-bleed field treatment not applicable.
- Phone treatment: on portrait phones the panel geometry scales from the viewport width (panel scale min(0.62 of height, 1.6 of width)) instead of the short side, so the row does not read as a thin band in a tall black field.
- House rules: Visual Viewport sizing with resize listeners on visualViewport and window; canvas pinned in draw() via canvas.style.width/height in px; phone detection via window.screen (min dimension under 700 px) with aspect fallback; one synchronous frame at load; requestAnimationFrame guarded by a typeof check.

## Deviations from the prompt

None material. Two clarifications: the prompt does not fix the shadow schedule, so this build fixes it at a 240 second cycle with a 40 second crossing (t = 100 to 140 s). The prompt's "soft blurred mask" is implemented as three layered passes at growing scale and falling alpha, which keeps the edge soft where blur filters are unavailable.

## QA

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually.
- Round 1: desktop and thumb read clean, but the mobile row was a thin band in a tall black field. Fixed by scaling panel geometry from the viewport width on portrait phones.
- Round 2: mobile row filled the frame correctly, but the shadow at t = 120 s (checked with a probe render at that phase) read as a paw print: short stubby fingers detached from the palm. Fixed twice: first by sinking the finger bases into the palm and softening the halo passes, then by lengthening the fingers, narrowing the palm, and rooting the thumb inside the palm. The final probe render at t = 120 s reads as a hand: four long fanned fingers, palm, thumb angled across.
- Round 3: re-rendered all three sizes from the final file and inspected again. Desktop, mobile, and thumb all read: five panels in a receding row, abstract glyph strata with no readable sentences, plates legible, nothing clipped, no overlap between plates and panels.
- Determinism gate: thumb.png rendered twice independently, md5 identical (2aaa66755f77b43e082162ec1ef750bc). Desktop rendered twice independently, md5 identical (903fce330ab84c741d772e92e77b6278).
- No em dashes in visible copy. No AI-signature copy.

## Gallery

- Title: Layered Testimony
- Date: 2007 · 01 · 07
- Note: "Five backlit panels drift; a shadow passes on its own schedule. Watch only."
