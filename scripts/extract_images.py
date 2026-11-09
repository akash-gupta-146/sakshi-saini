#!/usr/bin/env python3
"""Extract the original embedded images from Sakshi's PDF and build web-ready assets.

Requires: poppler (`pdfimages`) and Pillow.
Usage:    npm run assets   (or: python3 scripts/extract_images.py)

Outputs
  public/images/<key>-<width>.webp   responsive WebP variants (alpha preserved)
  src/content/imageManifest.json     key -> { w, h, widths } consumed by <Img />

Nothing is generated or restyled: every file is an embedded image from the PDF
(garment cut-outs get their soft-masks composited into real alpha channels).
"""
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / "Prompt" / "SAKSHI SAINI ASSIGNMENT.pdf"
RAW = ROOT / ".cache" / "pdf-raw"
OUT = ROOT / "public" / "images"
MANIFEST = ROOT / "src" / "content" / "imageManifest.json"

WIDTH_LADDER = (480, 960, 1600)
MAX_WIDTH = 2105  # native width of the technical sheets


# key -> (pdf page, embedded image index)
SOURCES: dict[str, tuple[int, int]] = {
    # Cover + forecast (pages 1-3)
    "hero-model": (1, 0),
    "botanical-shadow": (1, 1),
    "forecast-tulip": (2, 5),
    "world-soft-archive": (3, 9),
    "world-sharp-ease": (3, 7),
    "world-afterglow": (3, 8),
    # Moodboard (page 6)
    "mood-floral-sundress": (6, 11),
    "mood-lace-crop": (6, 12),
    "mood-wildflowers": (6, 13),
    "mood-bouquet": (6, 14),
    "mood-ranunculus": (6, 15),
    "mood-yellow-tulle": (6, 16),
    # Garments (pages 8-15): front / back / side model shots + illustration
    "celeste-front": (8, 39), "celeste-back": (8, 40), "celeste-side": (8, 41),
    "celeste-top-illustration": (8, 35), "celeste-skirt-illustration": (8, 37),
    "solea-front": (9, 42), "solea-back": (9, 43), "solea-side": (9, 44),
    "solea-illustration": (9, 45),
    "fleure-front": (10, 47), "fleure-back": (10, 48), "fleure-side": (10, 49),
    "fleure-illustration": (10, 50),
    "solene-front": (11, 52), "solene-back": (11, 53), "solene-side": (11, 54),
    "solene-illustration": (11, 55),
    "rose-front": (12, 57), "rose-back": (12, 58), "rose-side": (12, 59),
    "rose-illustration": (12, 60),
    "ivory-front": (13, 62), "ivory-back": (13, 63), "ivory-side": (13, 64),
    "ivory-illustration": (13, 65),
    "solara-front": (14, 67), "solara-back": (14, 68), "solara-side": (14, 69),
    "solara-illustration": (14, 70),
    "pearl-front": (15, 72), "pearl-back": (15, 73), "pearl-side": (15, 74),
    "pearl-illustration": (15, 75),
    # Lookbooks (pages 17-22)
    "look-brunch-to-party-full": (17, 77), "look-brunch-to-party-detail": (17, 78),
    "look-golden-hour-full": (18, 79), "look-golden-hour-detail": (18, 80),
    "look-birthday-full": (19, 81), "look-birthday-detail": (19, 82),
    "look-brunch-day-out-full": (20, 83), "look-brunch-day-out-detail": (20, 84),
    "look-office-dinner-full": (21, 85), "look-office-dinner-detail": (21, 86),
    "look-vacation-full": (22, 87), "look-vacation-detail": (22, 88),
    # Tech pack (pages 24-25)
    "techpack-sheet": (24, 89),
    "construction-sheet": (25, 90),
}

# Crops from the tech-pack sheet (left, top, right, bottom) in native pixels.
TECH_CROPS: dict[str, tuple[int, int, int, int]] = {
    "tech-front": (110, 400, 720, 1240),
    "tech-back": (720, 400, 1320, 1240),
    "tech-model": (1400, 380, 1950, 1200),
}


# Pixels to trim (left, top, right, bottom) where the PDF embedding left a dark edge.
EDGE_TRIM: dict[str, tuple[int, int, int, int]] = {
    "forecast-tulip": (0, 0, 6, 0),
}


def list_images() -> list[dict]:
    out = subprocess.run(
        ["pdfimages", "-list", "-f", "1", "-l", "25", str(PDF)],
        capture_output=True, text=True, check=True,
    ).stdout.splitlines()[2:]
    rows = []
    for line in out:
        p = line.split()
        rows.append({"page": int(p[0]), "idx": int(p[1]), "type": p[2]})
    return rows


def extract_raw() -> None:
    if RAW.exists() and any(RAW.glob("im-*.png")):
        print(f"Using cached raw extraction in {RAW}")
        return
    RAW.mkdir(parents=True, exist_ok=True)
    print("Extracting embedded images from the PDF (this takes a couple of minutes)...")
    subprocess.run(
        ["pdfimages", "-png", "-p", "-f", "1", "-l", "25", str(PDF), str(RAW / "im")],
        check=True,
    )


def raw_path(page: int, idx: int) -> Path:
    return RAW / f"im-{page:03d}-{idx:03d}.png"


def load_with_mask(rows: list[dict], page: int, idx: int) -> Image.Image:
    """Load an embedded image; if the next entry is its soft-mask, apply it as alpha."""
    im = Image.open(raw_path(page, idx)).convert("RGB")
    pos = next(i for i, r in enumerate(rows) if r["page"] == page and r["idx"] == idx)
    nxt = rows[pos + 1] if pos + 1 < len(rows) else None
    if nxt and nxt["type"] == "smask" and nxt["page"] == page:
        mask = Image.open(raw_path(page, nxt["idx"])).convert("L")
        if mask.size != im.size:
            mask = mask.resize(im.size)
        im.putalpha(mask)
    return im


def trim_transparent(im: Image.Image, pad: float = 0.03) -> Image.Image:
    """Crop a cut-out to its visible garment (+ a little breathing room).

    The PDF's garment illustrations sit inside large transparent canvases, which
    makes them render tiny wherever they are placed.
    """
    box = im.getchannel("A").point(lambda a: 255 if a > 20 else 0).getbbox()
    if not box:
        return im
    margin = round(max(box[2] - box[0], box[3] - box[1]) * pad)
    left, top = max(0, box[0] - margin), max(0, box[1] - margin)
    right, bottom = min(im.width, box[2] + margin), min(im.height, box[3] + margin)
    return im.crop((left, top, right, bottom))


def widths_for(native: int) -> list[int]:
    native = min(native, MAX_WIDTH)
    return [w for w in WIDTH_LADDER if w < native] + [native]


def save_variants(key: str, im: Image.Image, quality: int) -> dict:
    sizes = widths_for(im.width)
    for w in sizes:
        h = round(im.height * w / im.width)
        variant = im if w == im.width else im.resize((w, h), Image.LANCZOS)
        variant.save(
            OUT / f"{key}-{w}.webp", "WEBP",
            quality=quality, alpha_quality=100, method=6,
        )
    return {"w": im.width, "h": im.height, "widths": sizes}


def alpha_bbox_width(im: Image.Image) -> int:
    box = im.getchannel("A").getbbox()
    return (box[2] - box[0]) if box else im.width


def compose_celeste_set(top: Image.Image, skirt: Image.Image) -> Image.Image:
    """Stack the original top + skirt cut-outs into one set illustration.

    The top is scaled so its visible width is ~1.15x the skirt's, matching how
    the two pieces sit together on the PDF's range page.
    """
    scale = (alpha_bbox_width(skirt) * 1.15) / alpha_bbox_width(top)
    top = top.resize((round(top.width * scale), round(top.height * scale)), Image.LANCZOS)
    top = top.crop(top.getchannel("A").getbbox())
    skirt = skirt.crop(skirt.getchannel("A").getbbox())
    pad = 24
    canvas_w = max(top.width, skirt.width) + pad * 2
    canvas = Image.new("RGBA", (canvas_w, top.height + skirt.height + pad * 3), (0, 0, 0, 0))
    canvas.alpha_composite(top, ((canvas_w - top.width) // 2, pad))
    canvas.alpha_composite(skirt, ((canvas_w - skirt.width) // 2, top.height + pad * 2))
    return canvas


def main() -> int:
    if not PDF.exists():
        print(f"PDF not found: {PDF}", file=sys.stderr)
        return 1
    extract_raw()
    OUT.mkdir(parents=True, exist_ok=True)
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)

    rows = list_images()
    manifest: dict[str, dict] = {}
    loaded: dict[str, Image.Image] = {}

    for key, (page, idx) in SOURCES.items():
        im = load_with_mask(rows, page, idx)
        if key in EDGE_TRIM:
            left, top, right, bottom = EDGE_TRIM[key]
            im = im.crop((left, top, im.width - right, im.height - bottom))
        if key.endswith("-illustration") and im.mode == "RGBA":
            im = trim_transparent(im)
        loaded[key] = im
        quality = 90 if key in ("techpack-sheet", "construction-sheet") else 82
        manifest[key] = save_variants(key, im, quality)
        print(f"  {key:34s} {im.width}x{im.height}")

    set_ill = compose_celeste_set(
        loaded["celeste-top-illustration"], loaded["celeste-skirt-illustration"]
    )
    manifest["celeste-illustration"] = save_variants("celeste-illustration", set_ill, 88)

    sheet = loaded["techpack-sheet"].convert("RGB")
    for key, box in TECH_CROPS.items():
        manifest[key] = save_variants(key, sheet.crop(box), 90)

    # Keep the output folder honest: drop variants that are no longer in the manifest.
    expected = {f"{k}-{w}.webp" for k, v in manifest.items() for w in v["widths"]}
    for stale in OUT.glob("*.webp"):
        if stale.name not in expected:
            stale.unlink()

    MANIFEST.write_text(json.dumps(dict(sorted(manifest.items())), indent=2) + "\n")
    print(f"Wrote {len(manifest)} images -> {OUT} and {MANIFEST}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
