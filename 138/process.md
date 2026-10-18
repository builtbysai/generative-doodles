# No.138 NPC Intermission

## Concept
A blocky low-poly NPC works tiny DJ decks in a dark club void while a game
dialogue box types deadpan lines above it and shader-style patterns pulse
full-bleed behind. The joke is the frame; the visuals stay serious. The set
loops every 12 seconds: the NPC bobs, its right arm "types" at each beat,
and the background pattern switches (scanlines, strobe grid, RGB split).
Dragging across the decks scratches: the background glitches in proportion
to drag speed and the bob phase kicks with the hand. Tapping the dialogue
box advances the line early.

## Construction
Canvas 2D, single self-contained page. The NPC is articulated boxes (head,
torso, two arms on shoulder pivots) in flat #9AA0AA over decks in #1E1E2E
with cyan and magenta buttons and two platter circles with rotating
highlight arcs. Backgrounds are procedural and drawn at 35% alpha or less:
scanline rows with alternating cyan/magenta bands, a strobe checker grid
flipping twice a second, and diagonal bars drawn three times with channel
offsets for the RGB split. Dialogue is a typewriter in a bordered box,
eight deadpan lines advancing every 4 seconds, with a blinking cyan prompt
triangle. The clock starts at 5.2s so frame one shows a typed line and an
active pattern. Scratch state decays per frame; glitch offsets use a
seeded hash so slices jump coherently. House rules held: Visual Viewport
sizing with both resize listeners, canvas pinned in px every frame,
window.screen phone check with aspect fallback, synchronous first frame,
typeof-guarded requestAnimationFrame.

## QA log
Rendered with render-piece.js at 1280x900, 390x844 and 720x720 and
inspected all three. Frame one lands mid-set: strobe grid behind, the
line "> the npc is livecoding" fully typed, prompt arrow lit, NPC framed
by the decks with buttons showing. Mobile frame keeps the full scene
legible with the dialogue box widened. Palette audit: void #08080A, NPC
#9AA0AA, decks #1E1E2E, cyan #5AF2FF, magenta #FF3EB5, dialogue ground
#0D0D12 and bone #EDE6D6 only. Interaction: drag to scratch, tap dialogue
to advance; no click-to-reload. Gallery entry ready: 2002 · 05 · 29,
"A blocky NPC works tiny DJ decks in a dark club void, deadpan dialogue
typing above while shader patterns pulse behind. Drag across the decks
to scratch."
