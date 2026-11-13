# 9148 — Streetball

A procedural basketball performance in four hand-painted New York City scenes: Washington Square, DUMBO, SoHo and Coney Island.

## Art direction

Illustrated streetball, not realistic city photography. Each neighborhood has a distinct pigment palette, architecture, light, and painted court. The player uses a complementary deep-teal / soft-cream / coral kit; the ball has a stippled leather texture. The brush treatment and street illustrations are generated locally in code, with no external image assets.

## Motion

The 24-beat loop is deterministic, so scrubbing, exports, and normal playback share the same poses. Foot targets stay planted between scheduled steps; the player shifts their weight and counter-rotates their torso while handling the ball. Free ball segments use solved gravity and contact endpoints. Ball seams rotate during flight; floor collisions create a short squash and chalk-ring accent.

## Performance and controls

The scene paintings and court textures bake once. High-quality GPUs retain real shadow maps and halftone projection. Touch/software GPUs get light painted contact shadows instead. The artwork opens with the editing tools collapsed.

Open with `?fps=1` to inspect animation rate, `?quality=low` to force the lightweight rendering path, or `?beat=6` to inspect a pose. Settings, palette changes, format selection, beat scrubbing, and video export remain available through the editing panel.
