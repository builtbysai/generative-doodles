# №1116 — Point Cloud Country

Markus Kison study block MK5. A whole country rendered as points only: no mesh, no wireframe, no lines. The prompt's Three.js point-cloud spec adapted to a canvas 2D perspective projection, per house precedent.

## Terrain

- Seeded value-noise fBm (integer-hash lattice noise, 5 octaves) over a square grid: 124×124 = 15,376 points on desktop, 92×92 = 8,464 on phones. Each point is jittered within its cell so the grid never shows.
- Two seeded gaussian mountain masses guarantee a real summit; a high-frequency fBm detail layer keeps the slopes from going smooth and blobby. Heights are normalized, then dropped toward the coasts so the land reads as one island-country floating in black space.
- Hypsometric colour by height, exactly the specced ladder: deep valley green #2E5E2A → valley green #3E7A3A → ochre #C9962E → pale rock #B8B0A0 → snow #F2F2EE above a seeded snowline (~0.79–0.85 of normalized height). A small seeded jitter on each point's band value keeps the contour edges from ringing.

## River

A pure steepest-descent walk dies in the first fBm hollow, so the river is a seeded meander walk: it is born on the main peak's flank with a heading pointing away from the summit, keeps momentum (heading relaxes 55/45 toward each chosen step), and at every step picks the lowest cell inside its forward cone. It winds downhill for up to 1.5× the grid width and reaches the far coast. River cells are drawn in brighter cyan #57D8E8, a size step larger, and lifted a hair (0.006) above the land so the trail stays legible over the slopes.

## Projection & motion

- Points are rotated around the vertical axis, tilted at a fixed ~35°, and perspectively projected. Drawing order comes from 26 depth buckets (far first, alpha rising toward the viewer); inside a bucket, points are batched by colour into single filled paths of rects, so 15k points stay cheap. Point size is perspective-scaled and clamped to 1–4.2 px; the river rides one step bigger.
- Idle motion is a slow autonomous orbit: one revolution per 60 s, azimuth a closed form of elapsed time. Frame one is a synchronous draw at t = 0, fixed azimuth 0.85 rad, chosen so the snow massif and the river's meander both read.
- Dragging adds azimuth/elevation offsets on top of the idle path; on release the offsets decay with a ~2.5 s half-life back onto the idle rotation, so the country never stops breathing. Double-tap (or double-click) reseeds: new peaks, new snowline, new river.

## Sound

An optional wind tone (seeded pinkish noise through a lowpass, very low gain) may start lazily inside the first pointer gesture only, fully typeof/try-guarded. It never autoplays and the piece is complete without it.

## House rules honoured

Visual Viewport sizing with resize listeners on both visualViewport and window; canvas CSS size pinned in draw(); phone detection via window.screen physical size (min dimension < 700 px) with the aspect fallback; deterministic fixed-phase first frame; rAF typeof-guarded and anchored as fixed phase + elapsed-since-load; no canvas gradients, no ctx.filter, no shadowBlur, no offscreen canvas, no createElement, no microphone. No visible text beyond the <title>.

## QA

- qa-desktop.png (1280×800) and qa-mobile.png (390×844) rendered with the house renderer and inspected: a single point-only landmass centred in black space — green valleys, ochre slopes, pale rock and snow heights, and the cyan river trail winding from the west coast up toward the massif. Mobile keeps the full country in frame at the reduced point count.
- thumb.png (720×720) rendered twice; `cmp` reports the two renders byte-identical. Duplicate deleted.
