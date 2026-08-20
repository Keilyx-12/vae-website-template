# Digital Storefront — one-page WhatsApp order hub

A single-page lead & order hub for local businesses (cafes, salons, detailing, freelancers).
Customers tap items to build a basket, see a live total, and check out in one tap — the
CTA opens WhatsApp with the itemised order pre-filled.

- `index.html` — the template (markup shell only, no business data)
- `config.js` — **the only file you edit for a new client**
- `themes.css` — theme tokens: `cyber`, `luxe`, `artisan`
- `app.css` / `app.js` — layout and basket logic
- `showcase.html` — theme picker for demos

No build step, no dependencies, no CDN. Open `index.html` in a browser or drop the folder on
any static host (GitHub Pages, Netlify, a client's cPanel).

## Re-skinning for a new client

1. Edit `config.js`:
   - `business` — name, tagline, logo path, status badge, page title, description, `shareImage`
     (an absolute URL, used for the WhatsApp/Instagram link preview)
   - `whatsapp.phone` — digits only, including country code (e.g. `60123456789`)
   - `currency` — symbol, locale, decimals
   - `categories[].items[]` — `id`, `name`, `desc`, `price` (a **number**, not a string),
     optional `available: false` to show as sold out
   - `fees` and `minimumOrder` — optional; remove to hide
2. Pick a theme with `theme: "cyber" | "luxe" | "artisan"` (or preview with `?theme=luxe`).
3. Replace `favicon.svg` and drop in a `logo.png` if the client has one.

Nothing else needs touching — cards, tabs, basket lines and the WhatsApp message are all
generated from the config.

## Adding a theme

Add one block to `themes.css` and list the name in `resolveTheme()` in `app.js`:

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
  behind a mobile browser bar.
