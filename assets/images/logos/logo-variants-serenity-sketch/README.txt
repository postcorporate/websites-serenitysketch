Serenity Sketch wordmark - PNG variants
========================================

Generated from logo-serenity-sketch-grey.svg (Inkscape vector source).
The SVG itself ships with the press kit zip alongside the PNGs.

Variants
--------
- grey_transparent/   off-white mark (#F9F9F9) on transparent background  - matches SVG, intended for dark surfaces
- black_transparent/  black mark on transparent background                 - intended for light surfaces

Sizes (RGBA, transparent bg, aspect ratio ~1.937:1 from SVG viewBox 132.33x68.33)
--------------------------------------------------------------------------------
- small  : 320 x 165 px
- medium : 640 x 330 px
- large  : 1280 x 661 px

Filename pattern
----------------
logo-<variant>-<small|medium|large>-<W>x<H>.png
  e.g. logo-grey_transparent-medium-640x330.png

Regeneration
------------
From the repo root:
  python serenity-sketch-presskit/scripts/generate-logo-variants.py --logo serenity-sketch

Or rebuild every logo set in one go:
  python serenity-sketch-presskit/scripts/generate-logo-variants.py

The script requires Inkscape on PATH (or pass --inkscape <full path>).
Heights are computed by Inkscape from the SVG's viewBox so AR is always
preserved; final WxH dimensions are baked into the filename.

Source of truth
---------------
The single fill color in the SVG is #F9F9F9. The black variant is
produced by string-replacing that hex into a temp SVG before render.
