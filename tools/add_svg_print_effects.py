from __future__ import annotations

import copy
import sys
from pathlib import Path

from lxml import etree


SVG = "http://www.w3.org/2000/svg"
XLINK = "http://www.w3.org/1999/xlink"


def node(name: str, **attributes: str) -> etree._Element:
    return etree.Element(f"{{{SVG}}}{name}", attrib=attributes)


def add_use(parent: etree._Element, href: str, **attributes: str) -> etree._Element:
    use = node("use", **attributes)
    use.set("href", href)
    use.set(f"{{{XLINK}}}href", href)
    parent.append(use)
    return use


def build_defs() -> etree._Element:
    defs = node("defs")

    soft = node(
        "filter",
        id="softEdgeGlow",
        filterUnits="userSpaceOnUse",
        x="-40",
        y="-40",
        width="1528",
        height="1166",
        color_interpolation_filters="sRGB",
    )
    soft.set("color-interpolation-filters", soft.attrib.pop("color_interpolation_filters"))
    soft.append(node("feMorphology", attrib_in="SourceAlpha", operator="dilate", radius="1.6", result="spread"))
    soft[-1].set("in", soft[-1].attrib.pop("attrib_in"))
    soft.append(node("feGaussianBlur", attrib_in="spread", stdDeviation="3.2", result="blur"))
    soft[-1].set("in", soft[-1].attrib.pop("attrib_in"))
    soft.append(node("feFlood", flood_color="#f4f4f4", flood_opacity="0.92", result="color"))
    soft[-1].set("flood-color", soft[-1].attrib.pop("flood_color"))
    soft[-1].set("flood-opacity", soft[-1].attrib.pop("flood_opacity"))
    soft.append(node("feComposite", attrib_in="color", in2="blur", operator="in", result="halo"))
    soft[-1].set("in", soft[-1].attrib.pop("attrib_in"))
    defs.append(soft)

    ambient = node(
        "filter",
        id="ambientGlow",
        filterUnits="userSpaceOnUse",
        x="-60",
        y="-60",
        width="1568",
        height="1206",
        color_interpolation_filters="sRGB",
    )
    ambient.set("color-interpolation-filters", ambient.attrib.pop("color_interpolation_filters"))
    ambient.append(node("feGaussianBlur", attrib_in="SourceAlpha", stdDeviation="8", result="blur"))
    ambient[-1].set("in", ambient[-1].attrib.pop("attrib_in"))
    ambient.append(node("feFlood", flood_color="#ffffff", flood_opacity="0.72", result="color"))
    ambient[-1].set("flood-color", ambient[-1].attrib.pop("flood_color"))
    ambient[-1].set("flood-opacity", ambient[-1].attrib.pop("flood_opacity"))
    ambient.append(node("feComposite", attrib_in="color", in2="blur", operator="in"))
    ambient[-1].set("in", ambient[-1].attrib.pop("attrib_in"))
    defs.append(ambient)

    bloom = node(
        "filter",
        id="arrowBloom",
        filterUnits="userSpaceOnUse",
        x="1080",
        y="500",
        width="340",
        height="200",
        color_interpolation_filters="sRGB",
    )
    bloom.set("color-interpolation-filters", bloom.attrib.pop("color_interpolation_filters"))
    bloom.append(node("feGaussianBlur", attrib_in="SourceAlpha", stdDeviation="13", result="blur"))
    bloom[-1].set("in", bloom[-1].attrib.pop("attrib_in"))
    bloom.append(node("feFlood", flood_color="#fffaf0", flood_opacity="1", result="color"))
    bloom[-1].set("flood-color", bloom[-1].attrib.pop("flood_color"))
    bloom[-1].set("flood-opacity", bloom[-1].attrib.pop("flood_opacity"))
    bloom.append(node("feComposite", attrib_in="color", in2="blur", operator="in"))
    bloom[-1].set("in", bloom[-1].attrib.pop("attrib_in"))
    defs.append(bloom)

    clip = node("clipPath", id="arrowBloomClip", clipPathUnits="userSpaceOnUse")
    clip.append(node("rect", x="1080", y="505", width="330", height="190", rx="36"))
    defs.append(clip)
    return defs


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("usage: add_svg_print_effects.py input.svg output.svg")
    source, output = map(Path, sys.argv[1:])
    parser = etree.XMLParser(remove_blank_text=False, resolve_entities=False, no_network=True)
    tree = etree.parse(str(source), parser)
    root = tree.getroot()

    for old in root.xpath("./*[local-name()='defs' and @data-print-effects='true']"):
        root.remove(old)

    title_desc = [child for child in root if etree.QName(child).localname in {"title", "desc"}]
    graphics = [child for child in root if child not in title_desc and etree.QName(child).localname != "defs"]
    for child in graphics:
        root.remove(child)

    defs = build_defs()
    defs.set("data-print-effects", "true")
    insertion = len(title_desc)
    root.insert(insertion, defs)

    artwork = node("g", id="artwork")
    for child in graphics:
        artwork.append(child)

    effects = node("g", id="print-effects", style="isolation:isolate", **{"pointer-events": "none"})
    add_use(effects, "#artwork", filter="url(#ambientGlow)", opacity="0.16")
    add_use(effects, "#artwork", filter="url(#softEdgeGlow)", opacity="0.38")
    add_use(
        effects,
        "#artwork",
        filter="url(#arrowBloom)",
        opacity="0.72",
        **{"clip-path": "url(#arrowBloomClip)"},
    )
    root.append(effects)
    root.append(artwork)

    desc = next((x for x in title_desc if etree.QName(x).localname == "desc"), None)
    if desc is not None:
        desc.text = (
            "Transparent grayscale vector artwork with restrained edge glow, ambient blur, "
            "and localized arrow-tip bloom. Crisp vector artwork remains layered above the effects."
        )

    tree.write(
        str(output),
        encoding="UTF-8",
        xml_declaration=True,
        doctype='<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">',
        pretty_print=False,
    )
    print(output)


if __name__ == "__main__":
    main()
