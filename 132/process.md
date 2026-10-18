# №132 · Shader Room - process notes

## Concept
After Char Stiles's Shader.Place: three ghost collaborators live-code one GLSL shader together in a dark editor while the compiled result, a chrome torus knot turning on near-black, renders below. Every number a ghost edits morphs the knot on the same frame; the viewer drags to conduct the rehearsal forward and back.

## Construction
- Single self-contained page, no libraries, no WebGL. Top 35% is a 2D-canvas editor: 13 lines of monospace GLSL with a small tokenizer (keywords #C792EA, numbers #F78C6C, code #D6DEEB, comments dimmed code color) on editor ground #1E1E2E. Bottom 65% is a software raymarch of a torus knot SDF on a reduced grid (about 34k rays, cells upscaled), shaded as chrome #C8CCD4 with a procedural band environment, one analytic light and a rim term, on ground #0B0B0D.
- Exactly three ghosts, each owning one constant: ghost-1 (cyan #5AF2FF) owns STEPS, char (magenta #FF3EB5) owns TWIST, ghost-2 (yellow #E8FF47) owns TINT. Each ghost has a colored caret and a name flag that sits above the caret, multiplayer-cursor style; idle carets rest at the end of their own line and pulse gently.
- A scripted 24s edit cycle drives everything: ghost-1 drops STEPS 64 to 36 (the marcher really takes fewer steps, so the silhouette visibly frays), char raises TWIST 2.0 to 3.0 (the knot's weave re-threads), ghost-2 raises TINT 0.35 to 0.80 (the rim light swells), then all three revert in turn and the loop closes seamlessly. The typed text and the uniform value come from the same timeline function, so an edit and its morph land on the same frame; the knot also turns one full revolution per loop.
- Camera: fixed elevation tilt composed before the orbit rotation so the orbit never turns elevation into roll; the frame fits the knot's bounding sphere on the short axis, so portrait panes show the whole knot width-fit instead of cropping it.
- Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px inside draw; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load (opened mid-performance at 8s, STEPS already edited, char mid-type on TWIST) and requestAnimationFrame is guarded so node-canvas QA works.

## Interaction
- Horizontal drag anywhere scrubs the performance forward or backward through the edit script (a full frame width is one 24s loop); release resumes the loop from the scrubbed point. The ghosts, carets and knot all follow the scrub because everything is a pure function of performance time.
- Never click-to-reload; there is no text input, the ghosts are scripted performers.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before reporting. Three fixes during QA: idle carets first blinked fully off, leaving only the active ghost visible in a still frame; they now stay present at reduced alpha so all three flags read. The camera rotation order originally turned the orbit into roll at some angles (the ring presented edge-on); tilt now composes before orbit. The knot's first framing used its centerline radius and cropped the tube at some rotation angles on portrait panes; framing now fits the bounding sphere, verified numerically against the marcher's own hit-mask at desktop and mobile sizes (matching silhouette aspect, nothing clipped).
- Palette check: editor #1E1E2E, code #D6DEEB, keyword #C792EA, numbers #F78C6C, carets #FF3EB5 / #5AF2FF / #E8FF47, render ground #0B0B0D, chrome #C8CCD4. Nothing else. No terminal aesthetic, no Matrix rain, exactly three ghosts.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short ("drag to scrub the rehearsal").
- Files: `132/index.html`, `132/thumb.png` (720x720, rendered from the live script), `132/process.md`. Gallery entry for the parent to add: №132, title "Shader Room", formula date 2002 · 05 · 23, note ending "Drag to scrub the rehearsal."
