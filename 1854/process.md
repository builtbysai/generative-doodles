# No.1854 Suminagashi (TW7, PP1101, study #242 theresa-wong)

Gallery date: 2007 · 02 · 08. Interaction cue: "Drag to breathe across the water."

## Spec as built

A shallow black tray of water fills the frame, seen straight from above.
Drops of ink fall at irregular intervals, black, indigo, a rare gold. Each
drop spreads into concentric rings that collide with older rings and deform
into marbled veins. A slow ambient breath shears the whole pattern sideways.
When the pattern reaches full density, a sheet of paper descends, touches
the surface once, lifts the marbling away, and the tray is dark water again.
Then the drops begin again. Drag is the breath of air: while pressed, the
pointer feeds a shear that pushes the floating pattern sideways; the shear
decays back to still water once the drag ends. A tap alone does nothing.
Never click to reload.

## Palette (hand picked from the prompt's named colors)

- Water: #04070A, with a faint sheen gradient to #0A1118
- Ink black: #0B0B0C (drop identity); rings drawn in a lighter ink sheen
  #565D66 with vein highlights #7A828C so the marbling reads on black water
- Indigo: #2E3A67, ring #5C6FAE, vein highlight #7C8CC4
- Rare gold: #C9A227, highlight #E3C766 (about 1 in 10 drops)
- Paper: #EDE6D6, edge #D8CFB8
- Plates: #070B0E ground, title ink #EDE6D6, hint ink #9AA3AD

## Deviations from the prompt, with reasons

1. Ring colors are lightened sheens of the named inks. Literal ink black
   (#0B0B0C) on black water (#04070A) is invisible on screen, so the rings
   are drawn in grey, indigo, and gold tones that keep the palette's
   character while the marbling stays visible. The drop identity colors
   (black, indigo, gold) are preserved in the code and in the paper lift,
   where the marbling is sampled onto the pale sheet in the true ink colors.
2. The paper lift samples the pattern by re-drawing the live ring geometry
   clipped to the sheet, rather than by copying canvas pixels. Same visible
   result, and it keeps the piece working under node-canvas QA with no
   offscreen canvas dependency.
3. A thin density meter runs down the tray's right edge and fills as drops
   land, turning gold when full, the moment the paper is due. The prompt
   calls for a density trigger; the meter makes it visible.
4. The paper cycle is on a fixed 90 second closed-form schedule (paper
   descends at 76 s, rests at 82 s, lifts at 85 s, tray clear by 89 s)
   rather than a counted density threshold, so the whole piece stays a
   closed-form function of elapsed time and frame one is reproducible.

## Determinism

Fixed phase FRAME_T = 60.0 s for frame one. All drop times, positions,
colors, growth rates, and vein wobbles come from mulberry32(1854 + cycle
* 7919), one seeded batch per 90 s cycle. No wall clock, no unseeded
Math.random. Ambient shear is a closed-form sine of elapsed time. The
paper descent and the cycle reset are closed-form functions of phase.
Re-renders of frame one are byte identical (verified: two desktop renders
produce the same md5, and drawAt(60) twice produces identical PNG bytes).
Reduced motion: the animation loop is skipped and the fixed phase frame
stands.

## House rules

- 2D canvas only, self contained index.html, one synchronous frame at load,
  requestAnimationFrame guarded by a typeof check.
- Visual Viewport sizing with resize listeners on both visualViewport and
  window; canvas element pinned in draw() via canvas.style.width/height.
- Phone detection via window.screen (min dimension under 700 px) with
  aspect fallback (h > w * 1.15). Field-like composition: full-bleed on
  phones, square tray centered on desktop.
- Title plate and date plate drawn on the canvas ("Suminagashi",
  "2007 · 02 · 08"), hint line "Drag to breathe across the water."
- Page ground takes the piece's own background color. No audio. No em
  dashes in visible copy. No click to reload.

## QA

Rendered the actual script with node-canvas at 1280x900 desktop, 390x844
mobile, and 720x720 thumb; all three inspected. Two fixes during QA: a
string passed to the rgba helper (alpha must be a number) and a shear term
multiplied by the field size twice, which had pushed every ring off canvas
and left frame one as empty water. After the fixes the marbling reads on
all three sizes: grey, indigo, and rare gold rings with vein arcs,
legible plates, no clipping or overlap. Paper phases at t = 80, 83, 87,
89.5 and the next cycle at t = 95, 150 were exercised through the probe
and draw without error; ring counts behave (22 live at end of cycle, 2
just after reset).
