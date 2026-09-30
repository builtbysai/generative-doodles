# №8961 — Five Methods (2026-07-24)

Seed 258 (Five Methods, One Frame).

Concept: one seeded scalar field, built five ways. Each panel re-derives its
construction from scratch under one shared constraint: the same field, the
same paper, the same ink. The panels read as portraits of their methods,
not pastiches of each other.

Technique: raw canvas 2D, seeded value-noise field (3 octaves). Panel 1
marching-squares contours (11 levels); panel 2 rejection-sampled stipple
with density following the field squared; panel 3 hatches oriented along
contours (perpendicular to the field gradient) with length from gradient
magnitude; panel 4 coarse voronoi tone cells tinted by field value at the
nucleus, nuclei marked in rust; panel 5 animated particles advected along
contours with fading trails. Responsive: five columns on landscape, five
rows on portrait. Tap/click reseeds the field.

QA: rendered and inspected at 1280x800 and 390x844; zero console/page
errors via cdp_exceptions.py at both viewports. Title/subtitle overlap
fixed (measured with the right font); drift panel strengthened (line
trails, slower fade, finer wash grid).
