# Digital Storefront — one-page WhatsApp order hub

A single-page lead & order hub for any local business — salon, cafe, car detailing, aircond
servicing, plumbing, freelancers. Customers tap items or services to build a basket, see a
live total, and check out in one tap: the CTA opens WhatsApp with the itemised order pre-filled.

- `index.html` — the storefront (markup shell only, no business data)
- `reviews.html` — reviews page, driven by `CONFIG.reviews`
- `config.js` — **the only file you edit for a new client**
- `presets.js` — five example clients, one per niche: `salon`, `cafe`, `detailing`, `aircon`, `plumbing`
- `themes.css` — theme tokens: `cyber`, `luxe`, `artisan`
- `app.css` / `app.js` / `shared.js` — layout, basket logic, shared branding
- `showcase.html` — niche and theme picker for demos

No build step, no dependencies, no CDN. Open `index.html` in a browser or drop the folder on
any static host (GitHub Pages, Netlify, a client's cPanel).

## Previewing

Any preset and theme can be combined from the URL, so one deploy demos every niche:

```
index.html?preset=aircon
index.html?preset=salon&theme=cyber
reviews.html?preset=plumbing
```

`showcase.html` links all of them.

For a client who just wants to look at it — no server, no clone — run `python3 build-preview.py`.
It regenerates `preview/`, which opens straight off disk:

```
preview/index.html     storefront, styling + logic inlined, niche/theme picker in the corner
preview/reviews.html   reviews page
preview/presets.js     the five example clients   ← edit these two to change the demo
preview/config.js      which client is live
```

Keep the folder together (the pages load the two JS files as siblings). `preview/` is generated
output — for a real client edit the top-level `presets.js` / `config.js` and re-run the script.

## Re-skinning for a new client

1. In `config.js`, set `CLIENT` to the preset closest to the client's niche, then edit that
   entry in `presets.js` (or paste the object into `config.js` and edit it in place).
2. Fields to change:
   - `business` — name, tagline, logo path, status badge, page title, description, `shareImage`
     (an absolute URL, used for the WhatsApp/Instagram link preview)
   - `whatsapp.phone` — digits only, including country code (e.g. `60123456789`)
   - `currency` — symbol, locale, decimals
   - `categories[].items[]` — `id`, `name`, `desc`, `price` (a **number**, not a string),
     optional `available: false` to show as sold out
   - `fees` and `minimumOrder` — optional; remove to hide
   - `labels` — wording for service businesses: `cta` ("Book on WhatsApp", "Request a plumber"),
     `emptyHint`, `reviewsCta`
   - `reviews` — `headline`, `intro`, `rating`, `count`, `items[]` (`name`, `service`, `rating`,
     `date`, `source`, `text`). Omit the whole block and the rating pill and page link disappear.
   - `socials` — `[{ label, url }]`. Labels `Instagram`, `TikTok`, `Facebook`, `YouTube`,
     `Google`, `WhatsApp` get their own glyph; anything else falls back to a globe.
3. Pick a theme with `theme: "cyber" | "luxe" | "artisan"` (or preview with `?theme=luxe`).
4. Replace `favicon.svg` and drop in a `logo.png` if the client has one.

Services priced on site (a survey, a diagnosis) use `price: 0` with a `note`, e.g.
`{ id: "repipe", name: "Full Re-Pipe Survey", price: 0, note: "Quoted after survey" }` — the
card and the WhatsApp message show the note instead of a price and the total is unaffected.

Nothing else needs touching — cards, tabs, basket lines and the WhatsApp message are all
generated from the config.

## Adding a theme

Add one block to `themes.css` and list the name in `resolveTheme()` in `shared.js`:

```css
:root[data-theme="coastal"] {
  --bg: #f2f8fb;
  --accent: #0e7490;
  /* ...same tokens as the existing themes... */
}
```

## What the customer sends

```
Hi Kopi & Co.! I'd like to order:

• 2× Oat Latte — RM27.00
• 1× Butter Croissant — RM8.50
• Packaging — RM1.50

Total: RM37.00
Ref: #A7F3

Could you confirm availability and pickup time?
```

## Behaviour notes

- Basket survives a refresh and the trip to WhatsApp (`localStorage`), and selections are kept
  when switching categories.
- The CTA stays disabled until the basket is valid; `minimumOrder` shortfalls are shown inline.
- Cards and tabs are real buttons: keyboard operable, `aria-pressed` / `aria-selected`, arrow-key
  tab navigation.
- Sized with `100dvh` and `env(safe-area-inset-bottom)` so the checkout bar is never hidden
  behind a mobile browser bar; the item list and basket lines scroll inside it.
- The basket is stored per business name, so previewing another preset never inherits its basket.
