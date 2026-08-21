/*
 * Example clients, one per niche. Nothing here is required by the code — they are
 * starting points you copy and edit. Pick one in config.js (or preview any of them
 * with ?preset=salon, ?preset=detailing, ...).
 *
 * Every preset has the same shape, so swapping niches never means touching app.js:
 *   business / whatsapp / currency / fees / minimumOrder / categories / reviews / socials
 *
 * Prices are numbers, never strings, so totals can be calculated.
 * Items priced from a survey or consultation use `price: 0` + `note`.
 */
const PRESETS = {
  /* ---------------------------------------------------------------- salon */
  salon: {
    theme: "luxe",
    business: {
      name: "Studio Sora",
      tagline: "Hair, nails & lashes — Damansara Uptown",
      logo: "",
      status: "Booking this week",
      statusTone: "open",
      pageTitle: "Studio Sora — Book on WhatsApp",
      description: "Pick your services, see the total, then send the booking to us on WhatsApp.",
      shareImage: "",
    },
    whatsapp: {
      phone: "60123456789",
      greeting: "Hi Studio Sora! I'd like to book:",
      closing: "Which slots do you have this week?",
    },
    labels: {
      cta: "Book on WhatsApp",
      emptyHint: "Tap a service to start your booking.",
      reviewsCta: "Ask us on WhatsApp",
    },
    currency: { symbol: "RM", locale: "en-MY", decimals: 2 },
    fees: [],
    minimumOrder: 0,
    categories: [
      {
        id: "hair",
        label: "Hair",
        items: [
          { id: "cut-style", name: "Cut & Style", desc: "Consultation, wash, blow dry", price: 65 },
          { id: "root-touch", name: "Root Touch-Up", desc: "Single colour, up to 3cm", price: 130 },
          { id: "balayage", name: "Balayage", desc: "Hand-painted, includes toner", price: 380 },
          { id: "keratin", name: "Keratin Smoothing", desc: "Lasts 3–4 months", price: 450, available: false },
        ],
      },
      {
        id: "nails",
        label: "Nails",
        items: [
          { id: "gel-mani", name: "Gel Manicure", desc: "Shape, cuticle care, one colour", price: 70 },
          { id: "gel-pedi", name: "Gel Pedicure", desc: "Includes callus treatment", price: 90 },
          { id: "nail-art", name: "Nail Art (per nail)", desc: "Chrome, French or freehand", price: 8 },
        ],
      },
      {
        id: "lashes",
        label: "Lashes & Brows",
        items: [
          { id: "classic-lash", name: "Classic Lash Set", desc: "One extension per lash", price: 180 },
          { id: "volume-lash", name: "Volume Lash Set", desc: "Fuller, 3D–5D fans", price: 250 },
          { id: "brow-lam", name: "Brow Lamination", desc: "Includes shaping and tint", price: 120 },
        ],
      },
    ],
    reviews: {
      headline: "What our clients say",
      intro: "Collected from Google and WhatsApp with permission.",
      rating: 4.9,
      count: 214,
      items: [
        { name: "Nurul A.", service: "Balayage", rating: 5, date: "Mar 2025", source: "Google", text: "Third time here and the colour is always exactly what I asked for. They talk you out of anything that will not suit your hair, which I appreciate." },
        { name: "Priya R.", service: "Volume Lash Set", rating: 5, date: "Feb 2025", source: "Google", text: "Two weeks in and barely any shedding. Booking over WhatsApp took about a minute." },
        { name: "Chloe T.", service: "Gel Manicure", rating: 4, date: "Feb 2025", source: "WhatsApp", text: "Lovely work and very clean setup. Only note is that I waited ten minutes past my slot." },
        { name: "Amira S.", service: "Cut & Style", rating: 5, date: "Jan 2025", source: "Google", text: "First salon that got the fringe right. The stylist explained how to style it at home." },
      ],
    },
    socials: [
      { label: "Instagram", url: "https://instagram.com/" },
      { label: "TikTok", url: "https://tiktok.com/" },
      { label: "Google", url: "https://maps.google.com/" },
    ],
  },

  /* ----------------------------------------------------------------- cafe */
  cafe: {
    theme: "artisan",
    business: {
      name: "Kopi & Co.",
      tagline: "Specialty coffee & bakes — Bangsar, Kuala Lumpur",
      logo: "",
      status: "Open daily 8am – 6pm",
      statusTone: "open",
      pageTitle: "Kopi & Co. — Order on WhatsApp",
      description: "Browse the menu, then send your order straight to us on WhatsApp.",
      shareImage: "",
    },
    whatsapp: {
      phone: "60123456789",
      greeting: "Hi Kopi & Co.! I'd like to order:",
      closing: "Could you confirm availability and pickup time?",
    },
    currency: { symbol: "RM", locale: "en-MY", decimals: 2 },
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
    reviews: {
      headline: "Regulars, in their own words",
      intro: "Pulled from Google reviews and our WhatsApp orders.",
      rating: 4.8,
      count: 96,
      items: [
        { name: "Daniel L.", service: "Oat Latte", rating: 5, date: "Mar 2025", source: "Google", text: "Best oat latte in Bangsar and the WhatsApp ordering means it is ready when I walk in." },
        { name: "Farah M.", service: "Kaya Butter Toast", rating: 5, date: "Mar 2025", source: "Google", text: "Charcoal bread with cold butter is exactly how it should be. Staff remember my usual." },
        { name: "Wei Ken", service: "House Blend 250g", rating: 4, date: "Feb 2025", source: "WhatsApp", text: "Beans are consistently fresh. Would love a bigger bag option." },
      ],
    },
    socials: [
      { label: "Instagram", url: "https://instagram.com/" },
      { label: "Facebook", url: "https://facebook.com/" },
      { label: "Google", url: "https://maps.google.com/" },
    ],
  },

  /* ------------------------------------------------------------ detailing */
  detailing: {
    theme: "cyber",
    business: {
      name: "Apex Detail",
      tagline: "Mobile car detailing — Klang Valley, we come to you",
      logo: "",
      status: "Slots open Sat & Sun",
      statusTone: "open",
      pageTitle: "Apex Detail — Book on WhatsApp",
      description: "Choose your packages and add-ons, then send the job to us on WhatsApp.",
      shareImage: "",
    },
    whatsapp: {
      phone: "60123456789",
      greeting: "Hi Apex Detail! I'd like to book:",
      closing: "My car is a __ and I'm in __ . Which slots are free?",
    },
    labels: {
      cta: "Book on WhatsApp",
      emptyHint: "Tap a package to start your booking.",
      reviewsCta: "Get a quote on WhatsApp",
    },
    currency: { symbol: "RM", locale: "en-MY", decimals: 2 },
    fees: [{ label: "Callout (Klang Valley)", amount: 20 }],
    minimumOrder: 80,
    categories: [
      {
        id: "packages",
        label: "Packages",
        items: [
          { id: "express", name: "Express Wash", desc: "Foam wash, wheels, dry — 45 min", price: 80 },
          { id: "interior", name: "Interior Deep Clean", desc: "Vacuum, shampoo, panels — 3 hrs", price: 260 },
          { id: "full-detail", name: "Full Detail", desc: "Inside and out, decontamination — 6 hrs", price: 520 },
          { id: "ceramic", name: "Ceramic Coating 2yr", desc: "Paint correction included — 2 days", price: 1800, available: false },
        ],
      },
      {
        id: "addons",
        label: "Add-ons",
        items: [
          { id: "engine-bay", name: "Engine Bay Clean", desc: "Degrease and dress", price: 90 },
          { id: "headlight", name: "Headlight Restoration", desc: "Per pair, sealed after", price: 150 },
          { id: "pet-hair", name: "Pet Hair Removal", desc: "Extra pass on all fabric", price: 60 },
          { id: "leather", name: "Leather Conditioning", desc: "Clean and feed all seats", price: 120 },
        ],
      },
    ],
    reviews: {
      headline: "Recent jobs, rated by owners",
      intro: "Every review below is from a completed booking.",
      rating: 4.9,
      count: 143,
      items: [
        { name: "Hafiz Z.", service: "Full Detail", rating: 5, date: "Mar 2025", source: "Google", text: "Turned up on time, took photos before and after, and the swirl marks on my black paint are gone." },
        { name: "Sam O.", service: "Interior Deep Clean", rating: 5, date: "Feb 2025", source: "Google", text: "Two kids and a dog later, the cabin smells new again. Worth the three hours." },
        { name: "Rajesh K.", service: "Express Wash", rating: 4, date: "Feb 2025", source: "WhatsApp", text: "Quick and tidy. Ran about 20 minutes late but messaged me ahead." },
      ],
    },
    socials: [
      { label: "Instagram", url: "https://instagram.com/" },
      { label: "TikTok", url: "https://tiktok.com/" },
      { label: "YouTube", url: "https://youtube.com/" },
    ],
  },

  /* --------------------------------------------------------------- aircon */
  aircon: {
    theme: "cyber",
    business: {
      name: "CoolWorks Aircond",
      tagline: "Servicing, repairs & installation — 7 days a week",
      logo: "",
      status: "Same-day slots available",
      statusTone: "open",
      pageTitle: "CoolWorks Aircond — Request a job on WhatsApp",
      description: "Select the units and work you need, then send the job list to us on WhatsApp.",
      shareImage: "",
    },
    whatsapp: {
      phone: "60123456789",
      greeting: "Hi CoolWorks! I'd like to request:",
      closing: "Address is __ . When can a technician come?",
    },
    labels: {
      cta: "Request on WhatsApp",
      emptyHint: "Tap the work you need — per unit.",
      reviewsCta: "Book a technician on WhatsApp",
    },
    currency: { symbol: "RM", locale: "en-MY", decimals: 2 },
    fees: [{ label: "Transport", amount: 30 }],
    minimumOrder: 100,
    categories: [
      {
        id: "servicing",
        label: "Servicing",
        items: [
          { id: "normal-wash", name: "Normal Service (per unit)", desc: "Filter, blower and drain clean", price: 80 },
          { id: "chemical-wash", name: "Chemical Wash (per unit)", desc: "Coil chemical treatment", price: 160 },
          { id: "chemical-overhaul", name: "Chemical Overhaul (per unit)", desc: "Full dismantle and deep clean", price: 320 },
          { id: "gas-top-up", name: "Gas Top-Up (R32)", desc: "Includes leak check", price: 180 },
        ],
      },
      {
        id: "repairs",
        label: "Repairs",
        items: [
          { id: "diagnosis", name: "Fault Diagnosis", desc: "Waived if you proceed with the repair", price: 60 },
          { id: "water-leak", name: "Water Leak Fix", desc: "Drainage line clear and reseal", price: 150 },
          { id: "capacitor", name: "Capacitor / PCB Replacement", desc: "Part quoted after diagnosis", price: 250 },
          { id: "compressor", name: "Compressor Replacement", desc: "1–1.5HP, parts and labour", price: 900, available: false },
        ],
      },
      {
        id: "installation",
        label: "Installation",
        items: [
          { id: "install-1hp", name: "Install 1.0–1.5HP", desc: "Up to 5m piping, wall bracket", price: 450 },
          { id: "install-2hp", name: "Install 2.0–2.5HP", desc: "Up to 5m piping, wall bracket", price: 650 },
          { id: "relocate", name: "Relocate Existing Unit", desc: "Dismantle, reinstall, vacuum", price: 550 },
          { id: "extra-piping", name: "Extra Piping (per metre)", desc: "Insulated copper", price: 55 },
        ],
      },
    ],
    reviews: {
      headline: "Rated by homeowners and offices",
      intro: "Recent jobs across Klang Valley.",
      rating: 4.7,
      count: 308,
      items: [
        { name: "Mrs. Lim", service: "Chemical Overhaul", rating: 5, date: "Mar 2025", source: "Google", text: "Two bedroom units were barely cooling. Technician showed me the dirt from the coils and the difference that night was obvious." },
        { name: "Aizat H.", service: "Install 2.0–2.5HP", rating: 5, date: "Feb 2025", source: "Google", text: "Clean piping work, no mess left behind, and the quote on WhatsApp was the final price." },
        { name: "Office Manager, Sunway", service: "Normal Service", rating: 4, date: "Feb 2025", source: "WhatsApp", text: "Serviced eight units in one morning. Would prefer a slightly earlier start time." },
        { name: "Kevin T.", service: "Water Leak Fix", rating: 5, date: "Jan 2025", source: "Google", text: "Came the same day I messaged. Leak sorted in under an hour." },
      ],
    },
    socials: [
      { label: "Facebook", url: "https://facebook.com/" },
      { label: "Instagram", url: "https://instagram.com/" },
      { label: "Google", url: "https://maps.google.com/" },
    ],
  },

  /* ------------------------------------------------------------- plumbing */
  plumbing: {
    theme: "luxe",
    business: {
      name: "Ratna Plumbing",
      tagline: "Licensed plumber — 24 hour emergency callout",
      logo: "",
      status: "On call now",
      statusTone: "open",
      pageTitle: "Ratna Plumbing — Request a plumber on WhatsApp",
      description: "Tell us what needs fixing and send the job list straight to WhatsApp.",
      shareImage: "",
    },
    whatsapp: {
      phone: "60123456789",
      greeting: "Hi Ratna Plumbing! I need help with:",
      closing: "Address is __ . How soon can someone come?",
    },
    labels: {
      cta: "Request a plumber",
      emptyHint: "Tap what needs fixing.",
      reviewsCta: "Request a plumber on WhatsApp",
    },
    currency: { symbol: "RM", locale: "en-MY", decimals: 2 },
    fees: [{ label: "Callout", amount: 50 }],
    minimumOrder: 0,
    categories: [
      {
        id: "urgent",
        label: "Urgent",
        items: [
          { id: "burst-pipe", name: "Burst Pipe", desc: "Isolate, repair, pressure test", price: 220 },
          { id: "blocked-drain", name: "Blocked Drain", desc: "Rodding or jetting, per point", price: 180 },
          { id: "no-water", name: "No Water Supply", desc: "Trace fault, pump and tank check", price: 150 },
          { id: "afterhours", name: "After-Hours Callout", desc: "10pm – 7am, added to the job", price: 120 },
        ],
      },
      {
        id: "repairs",
        label: "Repairs",
        items: [
          { id: "leaking-tap", name: "Leaking Tap / Mixer", desc: "Reseal or cartridge swap", price: 90 },
          { id: "toilet-repair", name: "Running Toilet", desc: "Flush valve and seal", price: 120 },
          { id: "water-heater", name: "Water Heater Repair", desc: "Element or thermostat", price: 200 },
          { id: "pump-service", name: "Water Pump Service", desc: "Clean, reprime, adjust pressure", price: 250 },
        ],
      },
      {
        id: "installation",
        label: "Installation",
        items: [
          { id: "install-tap", name: "Supply & Install Mixer Tap", desc: "Standard basin or sink", price: 260 },
          { id: "install-heater", name: "Install Water Heater", desc: "Instant type, existing point", price: 380 },
          { id: "install-toilet", name: "Install Toilet Bowl", desc: "Remove old unit included", price: 420 },
          { id: "repipe", name: "Full Re-Pipe Survey", desc: "Priced after site visit", price: 0, note: "Quoted after survey" },
        ],
      },
    ],
    reviews: {
      headline: "Trusted by neighbours nearby",
      intro: "Reviews from jobs completed in the last few months.",
      rating: 4.8,
      count: 176,
      items: [
        { name: "Suraya B.", service: "Burst Pipe", rating: 5, date: "Mar 2025", source: "Google", text: "Messaged at 11pm with water everywhere. Someone arrived within the hour and stayed until it was dry." },
        { name: "Mr. Chong", service: "Blocked Drain", rating: 5, date: "Feb 2025", source: "Google", text: "Cleared a blockage two other plumbers gave up on, then explained how to avoid it happening again." },
        { name: "Divya N.", service: "Install Water Heater", rating: 4, date: "Jan 2025", source: "WhatsApp", text: "Neat installation and fair price. Had to wait two days for the appointment." },
      ],
    },
    socials: [
      { label: "WhatsApp", url: "https://wa.me/60123456789" },
      { label: "Facebook", url: "https://facebook.com/" },
      { label: "Google", url: "https://maps.google.com/" },
    ],
  },
};
