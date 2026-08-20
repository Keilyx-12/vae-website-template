#!/usr/bin/env python3
"""Bundle the storefront into self-contained HTML files you can email or double-click.

    python3 build-preview.py            # writes preview/index.html + preview/reviews.html

Each output file has the CSS, JS and favicon inlined, so it needs no web server and no
sibling files. The storefront also gets a floating niche/theme picker for demos. Ship the
folder itself (or the two files together) so the links between them keep working.
"""
import base64
import pathlib
import re

ROOT = pathlib.Path(__file__).parent
OUT = ROOT / "preview"

STYLES = ["themes.css", "app.css"]
PICKER = """
    <style>
        .picker {
            position: fixed; z-index: 50; top: 12px; right: 12px; display: flex; gap: 6px;
            font: inherit;
        }
        .picker select {
            appearance: none; padding: 7px 10px; border-radius: 9999px; cursor: pointer;
            border: 1px solid var(--border); background: var(--surface); color: var(--text);
            font-size: 0.75rem; font-family: inherit;
        }
        @media (max-width: 720px) { .picker { top: 8px; right: 8px; } }
    </style>
    <div class="picker">
        <select id="pick-preset" aria-label="Example client"></select>
        <select id="pick-theme" aria-label="Theme"></select>
    </div>
"""
PICKER_JS = """
    <script>
    (() => {
        const params = new URLSearchParams(location.search);
        const go = (key, value) => {
            params.set(key, value);
            location.search = params.toString();
        };
        const fill = (id, values, current, key) => {
            const select = document.getElementById(id);
            values.forEach((value) => {
                const option = document.createElement("option");
                option.value = value;
                option.textContent = value[0].toUpperCase() + value.slice(1);
                option.selected = value === current;
                select.append(option);
            });
            select.addEventListener("change", (event) => go(key, event.target.value));
        };
        fill("pick-preset", Object.keys(PRESETS), params.get("preset") || CLIENT, "preset");
        fill("pick-theme", ["cyber", "luxe", "artisan"], document.documentElement.dataset.theme, "theme");
    })();
    </script>
"""


def bundle(page: str, scripts: list[str], picker: bool) -> str:
    html = (ROOT / page).read_text()
    favicon = base64.b64encode((ROOT / "favicon.svg").read_bytes()).decode()

    css = "\n".join((ROOT / name).read_text() for name in STYLES)
    html = re.sub(r' *<link rel="stylesheet"[^>]*>\n', "", html)
    html = html.replace("</head>", f"    <style>\n{css}\n    </style>\n</head>")
    html = re.sub(
        r'href="favicon\.svg"', f'href="data:image/svg+xml;base64,{favicon}"', html
    )

    js = "\n".join(
        f"    /* ---- {name} ---- */\n{(ROOT / name).read_text()}" for name in scripts
    )
    html = re.sub(r' *<script src="[^"]*"></script>\n', "", html)
    body = f"    <script>\n{js}\n    </script>\n"
    if picker:
        body = body + PICKER_JS
        html = html.replace("</main>", "</main>\n" + PICKER)
    return html.replace("</body>", body + "</body>")


OUT.mkdir(exist_ok=True)
pages = {
    "index.html": (["presets.js", "config.js", "shared.js", "app.js"], True),
    "reviews.html": (["presets.js", "config.js", "shared.js", "reviews.js"], False),
}
for page, (scripts, picker) in pages.items():
    target = OUT / page
    target.write_text(bundle(page, scripts, picker))
    print(f"{target} — {target.stat().st_size / 1024:.0f} KB")
