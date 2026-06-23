Serenity Sketch wordmark - PNG / WebP variants
================================================

Generated from logo-serenity-sketch-grey.svg (Inkscape vector source).
The SVG itself ships with the press kit zip alongside the rasters.

Variants
--------
- grey_transparent/   off-white mark (#F9F9F9) on transparent background  - matches SVG, intended for dark surfaces
- black_transparent/  black mark on transparent background                 - intended for light surfaces

Sizes (RGBA, transparent bg, aspect ratio ~2.12:1 after trimming)
-----------------------------------------------------------------
- small  : 320 x 151 px
- medium : 640 x 302 px
- large  : 1280 x 604 px

Each size is generated as both .png and .webp.

Filename pattern
----------------
logo-<variant>-<small|medium|large>-<W>x<H>.<png|webp>
  e.g. logo-grey_transparent-medium-640x302.png
       logo-grey_transparent-medium-640x302.webp

Regeneration
------------
From the repo root:
  python serenity-sketch-presskit/website/scripts/generate-logo-variants.py --logo serenity-sketch

Or rebuild every logo set in one go:
  python serenity-sketch-presskit/website/scripts/generate-logo-variants.py

The script uses cairosvg (preferred) or Inkscape on PATH (or pass
--inkscape <full path>). Transparent padding is automatically trimmed
before final resize so the logo fills its bounding box tightly.

Source of truth
---------------
The single fill color in the SVG is #F9F9F9. The black variant is
produced by string-replacing that hex into a temp SVG before render.
