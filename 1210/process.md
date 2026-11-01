# №1210 — Interface Absences

Amy Szczepanski study block AS3. Grounded in Big_Sleep(TM) (2015, Evan Meaney
& Amy Szczepanski): "informatic elements ebb and flow — creating and relating
interface absences. These gaps suggest that no amount of hard drive space can
defy mortality." A desktop that is a film: it fills, plays fragments of
decaying newsreel, deletes itself, and ends with a cursor alone on the
wallpaper — then restores, because accumulation and loss are the cycle.

## How it works

- **The desktop.** Dark mode, committed: desktop #1E1E24, window chrome
  #3A3A46 with lighter #55556A title bars, deep-blue wallpaper #0A1A3A
  underneath. Eight named folders (photos_04, field_rec, birch_film, notes,
  scans, drive_bak, clips, misc) sit in two loose columns. Everything is drawn
  in code — no screenshots, no readable documents; everything is image or
  absence.
- **The schedule.** The whole 180-second arc is a pure function of cycle time
  plus seeded hashes. Ten window appearances: the first three opens are
  anchored (26 s, 40 s, 49 s), later opens follow hashed 8–14 s gaps and stop
  after ~130 s; each appearance lasts 6–14 s in one of four fixed window slots
  (birch_film.mov, street_reel, crowd_02, rooftops), assigned to the first
  free slot. Folder delete times are hashed across the arc (15 s to ~157 s,
  thinning as it goes); a folder vanishes under a 0.6 s checkerboard flicker.
  The last window closes by ~142 s, the last folder by ~157 s, and by 180 s
  only the cursor and the wallpaper remain. The desktop layer's opacity is
  tied to the surviving-item fraction, so the blue wallpaper literally fades
  in as things vanish. At the seam a 0.6 s checkerboard sweep covers the
  restore.
- **The footage.** Three generated monochrome newsreel scenes, drawn fresh
  each frame: a street with three walking figures, a bobbing crowd of heads,
  and a slow pan across rooftops with a water tower. Playback lasts only the
  first 2–4 s of a window's life — film grain re-hashed every 0.12 s step,
  ±1 px frame jitter, two vertical scratches, sepia decay bands at the edges —
  then stops too soon. What remains is absence: a missing-tile mask (24 px
  tiles, hashed per window) covers 22–48% of the frame during playback and
  55–90% afterward, over a 15%-opacity ghost of the frozen fragment.
  A window at 60% checkerboard still matters; that is the point.
- **The cursor.** A scripted agent, not the visitor's pointer. Its waypoints
  are computed from the schedule itself: it travels to a window's title bar
  0.8 s before the window opens (with a click pulse as it opens), hovers each
  folder 0.6 s before the folder deletes, and reports to the trash after each
  window closes. Motion between waypoints is smootherstep-eased at a capped
  speed, so its position is a closed-form function of time.
- **The trash.** Bottom right, drawn in code. Its count is the number of
  deleted items (folders gone + windows closed for good): 3 at frame one,
  18 — everything — at the end of the arc. Crumple lines and paper balls
  above the rim accumulate with the fill fraction.
- **Rescue.** Dragging a window moves it and marks it rescued: its close
  extends by 20 s (capped at 174 s so the arc still drains). The visitor can
  delay a loss, never prevent it. Rescue and drag state reset each cycle.
- **House rules.** Sizing comes from the Visual Viewport API with resize
  listeners on both the visual viewport and the window; the canvas CSS size
  is pinned in draw(). Phones are detected via `window.screen` physical size
  (min dimension < 700 px) with an aspect fallback (h > w * 1.15); on phones
  the windows shorten so the desktop still reads in portrait. The first frame
  is drawn synchronously at the exact fixed phase — cycle t = 52 s — and the
  rAF loop (typeof-guarded) continues from there. On frame one: two folders
  already deleted, the birch_film.mov window emptied into checkerboard
  absence, street_reel mid-fragment behind its missing tiles, the cursor at
  the title bar it just opened, trash at 3. Silent throughout. No gradients,
  no ctx.filter, no shadowBlur, no createElement, no ImageData/offscreen
  canvas, no microphone, no Math.random — seeded hashes only.
