# 9148 — Streetball

A procedural basketball performance in four hand-painted New York City scenes: Washington Square, DUMBO, SoHo and Coney Island.

## Art direction

Illustrated streetball, not realistic city photography. Each neighborhood has a distinct pigment palette, architecture, light, and painted court. The player uses a complementary deep-teal / soft-cream / coral kit; the ball has a stippled leather texture. The brush treatment and street illustrations are generated locally in code, with no external image assets.

## Motion

The 24-beat loop is deterministic, so scrubbing, exports, and normal playback share the same poses. Foot targets stay planted between scheduled steps; the player shifts their weight and counter-rotates their torso while handling the ball. Free ball segments use solved gravity and contact endpoints. Ball seams rotate during flight; floor collisions create a short squash and chalk-ring accent.

## Camera

The character performs and the neighborhood changes automatically. The **camera starts in Free orbit**, with no automatic cuts or tracking fighting user input. Drag or swipe to rotate around the player; scroll or pinch to zoom; Shift-drag, right-drag or two-finger drag to pan. Double-click the artwork, press R or use the bottom-right reset control to return to the opening view. On a keyboard, arrow keys orbit and +/- zoom when the canvas is focused. Any camera gesture takes over from an optional automatic camera preset. The full painted panorama remains fixed in the world instead of turning with the viewer; scene-to-scene fades use real shader opacity, without blank wipe sectors or wrap seams.

## Performance and controls

The scene paintings and court textures bake once. High-quality GPUs retain real shadow maps and halftone projection. Touch/software GPUs get light painted contact shadows instead. The artwork opens with the editing tools collapsed.

Open with `?fps=1` to inspect animation rate, `?quality=low` to force the lightweight rendering path, or `?beat=6` to inspect a pose. `?beat=6&street=2` previews the same pose on a fully revealed SoHo background. Settings, palette changes, format selection, beat scrubbing, and video export remain available through the editing panel.
