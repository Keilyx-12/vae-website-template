---
name: testing-static-storefront
description: How to run and end-to-end test the config-driven static storefront template (index.html + config.js + app.js) in this repo, including exact desktop/mobile viewports.
---

# Testing the static storefront template

## Serving
No build, no dependencies. From the repo root:

```bash
python3 -m http.server 8123
```

Then open `http://localhost:8123/index.html` (themes: `?theme=cyber|luxe|artisan`,
picker at `showcase.html`). `file://` also works, but http avoids any future
fetch/module restrictions.

## Where the behaviour lives
- `config.js` — all business data (name, fees, `minimumOrder`, WhatsApp phone,
  categories/items, `available: false` for sold out). Change values here to test
  edge cases instead of touching `app.js`.
- `app.js` — rendering, basket `Map`, totals, localStorage persistence
  (key `vae-basket-v1`), WhatsApp message builder, focus restoration after re-render.
- `themes.css` / `app.css` — theme tokens and layout.

## Test gotchas learned the hard way
- **Basket state persists in localStorage**, so a "fresh" page is not fresh.
  Clear it between scenarios (Application → Local Storage, or
  `localStorage.removeItem('vae-basket-v1')`) or expect leftover items.
- **All category panels exist in the DOM**; inactive ones are `hidden`. So
  `document.querySelectorAll('.card').length` counts every item (9 in the demo),
  not just the visible ones — assert on visible cards/screenshots instead.
- **Exact desktop viewport**: resize the real Chrome window (e.g.
  `wmctrl -r :ACTIVE: -b remove,maximized_vert,maximized_horz` then
  `wmctrl -r :ACTIVE: -e 0,0,0,<w>,<h>`) and confirm with
  `console.log(innerWidth, innerHeight)` — maximized windows are not 1280×800.
- **Mobile 390×844**: the OS window cannot go below ~500px wide and headless
  Chrome silently clamps to 500px. Use DevTools device toolbar
  (Ctrl+Shift+M) and type the dimensions; verify with `innerWidth`/`innerHeight`.
- **Structural a11y check** worth re-running after any card/stepper change:
  `document.querySelectorAll('button button').length` must be 0 (the stepper
  buttons must stay siblings of `.card__main`, not nested inside it).
- **Keyboard focus after re-render**: every quantity change re-renders the
  catalogue; `focusTarget()`/`restoreFocus()` re-focus via
  `data-item-id` + `data-control="minus"|"plus"`. Verify with
  `document.activeElement.getAttribute('aria-label')` after pressing Enter on a
  stepper — if it returns null/body, focus restoration regressed.
- **Checkout** opens `wa.me/<phone>?text=...`, which redirects to
  `api.whatsapp.com/send/...`. No login needed: read the rendered message text in
  the new tab to assert the itemised lines, `Total:` and `Ref: #XXXX`.
- The layout is a fixed `100dvh` box: `.app` never grows, the basket line list
  caps at `26vh` with its own scroll, and the catalogue absorbs the rest. Assert
  `document.documentElement.scrollHeight === innerHeight` and that the CTA's
  `getBoundingClientRect().bottom` is inside the viewport with the basket
  expanded — that combination regressed once already.

## Devin Secrets Needed
None — fully local and static.
