/*
 * The only file you edit for a new client.
 * Prices are numbers (never strings) so totals can be calculated.
 */
const CONFIG = {
  theme: "cyber", // "cyber" | "luxe" | "artisan" (override with ?theme=luxe)

  business: {
    name: "Kopi & Co.",
    tagline: "Specialty coffee & bakes — Bangsar, Kuala Lumpur",
    logo: "", // e.g. "logo.png" — falls back to initials when empty
    status: "Open daily 8am – 6pm",
    statusTone: "open", // "open" | "closed"
    pageTitle: "Kopi & Co. — Order on WhatsApp",
    description:
      "Browse our drinks, bakes and beans, then send your order straight to us on WhatsApp.",
    shareImage: "", // absolute URL used for WhatsApp/Instagram link previews
  },

  whatsapp: {
    phone: "60123456789", // digits only, including country code
    greeting: "Hi Kopi & Co.! I'd like to order:",
    closing: "Could you confirm availability and pickup time?",
  },

  currency: { symbol: "RM", locale: "en-MY", decimals: 2 },

  // Optional extras added to the total. Remove or set to null to hide.
  fees: [{ label: "Packaging", amount: 1.5 }],
  minimumOrder: 15,

  categories: [
    {
      id: "drinks",
      label: "Drinks",
      items: [
        { id: "latte", name: "Oat Latte", desc: "Double shot, house oat milk", price: 13.5 },
        { id: "kopi-o", name: "Kopi O Kaw", desc: "Traditional black, no sugar option", price: 6 },
        { id: "matcha", name: "Iced Matcha", desc: "Ceremonial grade, lightly sweetened", price: 15 },
        { id: "cold-brew", name: "24h Cold Brew", desc: "Single origin, served over ice", price: 14, available: false },
      ],
    },
    {
      id: "bakes",
      label: "Bakes",
      items: [
        { id: "croissant", name: "Butter Croissant", desc: "Baked fresh every morning", price: 8.5 },
        { id: "kaya-toast", name: "Kaya Butter Toast", desc: "Charcoal bread, cold butter", price: 7 },
        { id: "banana-loaf", name: "Banana Walnut Loaf", desc: "Thick slice, warmed on request", price: 9.5 },
      ],
    },
    {
      id: "beans",
      label: "Beans",
      items: [
        { id: "house-blend", name: "House Blend 250g", desc: "Chocolate, hazelnut, low acidity", price: 42 },
        { id: "single-origin", name: "Ethiopia Guji 250g", desc: "Floral, stone fruit, filter roast", price: 58 },
      ],
    },
  ],
};
