from __future__ import annotations

import argparse
import math
import re
from pathlib import Path

from lxml import etree


SVG = "http://www.w3.org/2000/svg"
TOKEN = re.compile(r"[AaCcHhLlMmQqSsTtVvZz]|[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?")
ARITY = {"M": 2, "L": 2, "H": 1, "V": 1, "C": 6, "S": 4, "Q": 4, "T": 2, "A": 7, "Z": 0}


def path_bbox(data: str) -> tuple[float, float, float, float] | None:
    tokens = TOKEN.findall(data)
    i = 0
    command = ""
    x = y = 0.0
    start_x = start_y = 0.0
    points: list[tuple[float, float]] = []

    while i < len(tokens):
        if tokens[i].isalpha():
            command = tokens[i]
            i += 1
            if command.upper() == "Z":
                x, y = start_x, start_y
                points.append((x, y))
                continue
        if not command:
            break
        upper = command.upper()
        arity = ARITY[upper]
        if i + arity > len(tokens) or any(t.isalpha() for t in tokens[i : i + arity]):
            continue
        values = [float(v) for v in tokens[i : i + arity]]
        i += arity
        relative = command.islower()

        if upper == "M":
            nx, ny = values
            if relative:
                nx, ny = x + nx, y + ny
            x, y = nx, ny
            start_x, start_y = x, y
            points.append((x, y))
            command = "l" if relative else "L"
        elif upper == "L" or upper == "T":
            nx, ny = values[-2:]
            if relative:
                nx, ny = x + nx, y + ny
            x, y = nx, ny
            points.append((x, y))
        elif upper == "H":
            x = x + values[0] if relative else values[0]
            points.append((x, y))
        elif upper == "V":
            y = y + values[0] if relative else values[0]
            points.append((x, y))
        elif upper in {"C", "S", "Q"}:
            for px, py in zip(values[0::2], values[1::2]):
                points.append((x + px, y + py) if relative else (px, py))
            nx, ny = values[-2:]
            if relative:
                nx, ny = x + nx, y + ny
            x, y = nx, ny
        elif upper == "A":
            nx, ny = values[-2:]
            if relative:
                nx, ny = x + nx, y + ny
            # Include the endpoint; radii are not positions and should not affect cleanup size.
            x, y = nx, ny
            points.append((x, y))

    finite = [(px, py) for px, py in points if math.isfinite(px) and math.isfinite(py)]
    if not finite:
        return None
    xs, ys = zip(*finite)
    return min(xs), min(ys), max(xs), max(ys)


def main() -> None:
    parser = argparse.ArgumentParser(description="Remove only tiny stroke fragments from a traced SVG.")
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--min-span", type=float, default=2.25)
    parser.add_argument("--min-area", type=float, default=3.0)
    args = parser.parse_args()

    xml_parser = etree.XMLParser(remove_blank_text=False, resolve_entities=False, no_network=True)
    tree = etree.parse(str(args.source), xml_parser)
    root = tree.getroot()
    root.set("width", "1448")
    root.set("height", "1086")
    root.set("viewBox", "0 0 1448 1086")
    root.set("shape-rendering", "geometricPrecision")

    title = etree.Element(f"{{{SVG}}}title")
    title.text = "Beyond Time — cleaned print artwork"
    desc = etree.Element(f"{{{SVG}}}desc")
    desc.text = "Transparent grayscale vector. Tiny isolated trace fragments removed; structural paths retained."
    root.insert(0, desc)
    root.insert(0, title)

    removed = 0
    retained = 0
    for group in root.xpath("//*[local-name()='g' and @stroke-width]"):
        for path in list(group.xpath("./*[local-name()='path']")):
            bbox = path_bbox(path.get("d", ""))
            if bbox is None:
                continue
            min_x, min_y, max_x, max_y = bbox
            width, height = max_x - min_x, max_y - min_y
            # Keep long/thin deliberate marks; remove only fragments small in both axes.
            if max(width, height) < args.min_span and width * height < args.min_area:
                group.remove(path)
                removed += 1
            else:
                retained += 1

    tree.write(
        str(args.output),
        encoding="UTF-8",
        xml_declaration=True,
        doctype='<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">',
        pretty_print=False,
    )
    print(f"removed={removed} retained_stroke_paths={retained} output={args.output}")


if __name__ == "__main__":
    main()
