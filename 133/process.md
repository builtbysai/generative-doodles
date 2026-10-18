# №133 · Forty-Two Lines - process notes

## Concept
After Char Stiles's Genuary 2025 day 3 piece: a fantasy IDE with a hard budget of exactly 42 lines of code. The shader types itself to line 42 while its preview, an isometric world made of circles only, builds in sync below. A ghost hand keeps reaching for line 43; the editor flashes its status bar red and gracefully rewrites the attempt into a comment: "// nice try."

## Construction
- Single self-contained page, 2D canvas, no WebGL. Editor ground #14141B fills the frame above a preview strip of 22% of frame height and a 28px status bar at the very bottom reading "42/42 LINES · BUDGET ENFORCED" (middle dot separator, per the house copy rule against em dashes).
- The code is exactly 42 lines, counted in the source array and confirmed on the renders by the line-number gutter running 1 to 42. Syntax colors are the spec palette only: code #D6DEEB, keywords #C792EA, strings #C3E88D (quoted spans take the string color even inside comments), functions #82AAFF, comments #546E7A, error #FF3B3B, line numbers #3A3A4A.
- A 30s seamless loop: lines type character by character over 15s (one blinking caret), the preview builds in the same proportion, then three scripted line-43 attempts land at 15.5s, 18.5s and 21.5s. Each attempt types "float pwn = glory(43);", flashes the status bar red on a sine envelope, then morphs character by character into "// nice try.", rests, fades, and the budget is 42 again. At 24.4s the editor reverse-types itself clear and the loop restarts.
- Preview: a 13 by 13 grid of circles in isometric projection (no vanishing point), cyan #5AF2FF and magenta #FF3EB5 only on #0B0B0D, heights from a travelling sine wave, drawn back to front; circle radius follows height and each circle pops in by a hashed threshold tied to the typing progress, so code and world build together. Scroll position adds to the world's rotation.
- Visual Viewport sizing with resize listened to on visualViewport and window; canvas pinned by style width and height in px inside draw; phone detection via window.screen with aspect fallback. A synchronous first frame is drawn at load (opened at 16.9s, mid-correction with the status bar flashing) and requestAnimationFrame is guarded so node-canvas QA works.

## Interaction
- Vertical drag scrolls the code through its 43-line scrollback; the preview world's rotation follows the scroll offset. On release the view holds for 4s, then eases back to following the typing caret.
- Tapping the status bar triggers one manual line-43 attempt with the same flash and correction animation (ignored while an attempt is already running).
- Never click-to-reload; the correction is graceful, no dialogs, no popups.

## QA log
- Frames rendered from the actual page script (node-canvas) at 1280x900 desktop, 390x844 mobile and 720x720 thumbnail size and inspected before reporting. The QA frame catches the first attempt mid-morph: line 43 reads "// nice try.(43);" with the un-flipped tail of the offending line still visible, the status bar red, all 42 lines typed and the preview fully built at all three sizes.
- Two fixes during QA: the status bar originally carried a second state readout on the right, which the spec does not allow ("no other UI"), so it was removed; and the palette's string color never appeared because the only quoted text sat inside a comment, so the tokenizer now gives quoted spans inside comments the string color too.
- Palette check: editor #14141B, code #D6DEEB, keyword #C792EA, string #C3E88D, function #82AAFF, comment #546E7A, error #FF3B3B, line numbers #3A3A4A, preview ground #0B0B0D, circles #5AF2FF and #FF3EB5 only.
- Visible copy check: no em dashes, no date strings, no absolute URLs; hint is lowercase and short ("drag to scroll the code").
- Files: `133/index.html`, `133/thumb.png` (720x720, rendered from the live script), `133/process.md`. Gallery entry for the parent to add: №133, title "Forty-Two Lines", formula date 2002 · 05 · 24, note ending "Drag to scroll the code."
