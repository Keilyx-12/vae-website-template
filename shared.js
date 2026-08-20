/*
 * Shared by the storefront and the reviews page: branding, socials, ratings,
 * formatting. No business data lives in this file.
 */
const params = new URLSearchParams(location.search);

/* Keep ?theme= / ?preset= when moving between pages so previews stay consistent. */
function withParams(href) {
  const query = params.toString();
  return query ? `${href}?${query}` : href;
}

function money(amount) {
  const { symbol, locale, decimals } = CONFIG.currency;
  return `${symbol}${amount.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

function resolveTheme() {
  const requested = params.get("theme");
  const themes = ["cyber", "luxe", "artisan"];
  return themes.includes(requested) ? requested : CONFIG.theme;
}

/* ---------- social icons ---------- */

/* Simple monochrome glyphs so no icon font or CDN is needed. */
const SOCIAL_PATHS = {
  instagram:
    "M12 2.2c-2.7 0-3 0-4.1.1-1 0-1.7.2-2.3.4-.6.3-1.1.6-1.6 1.1S3.2 4.9 3 5.5c-.2.6-.4 1.3-.4 2.3C2.5 9 2.5 9.3 2.5 12s0 3 .1 4.1c0 1 .2 1.7.4 2.3.3.6.6 1.1 1.1 1.6s1 .8 1.6 1.1c.6.2 1.3.4 2.3.4 1.1.1 1.4.1 4.1.1s3 0 4.1-.1c1 0 1.7-.2 2.3-.4.6-.3 1.1-.6 1.6-1.1s.8-1 1.1-1.6c.2-.6.4-1.3.4-2.3.1-1.1.1-1.4.1-4.1s0-3-.1-4.1c0-1-.2-1.7-.4-2.3-.3-.6-.6-1.1-1.1-1.6s-1-.8-1.6-1.1c-.6-.2-1.3-.4-2.3-.4C15 2.2 14.7 2.2 12 2.2zm0 1.8c2.7 0 2.9 0 4 .1.8 0 1.2.2 1.5.3.4.1.7.3 1 .6.3.3.5.6.6 1 .1.3.3.7.3 1.5.1 1.1.1 1.3.1 4s0 2.9-.1 4c0 .8-.2 1.2-.3 1.5-.1.4-.3.7-.6 1-.3.3-.6.5-1 .6-.3.1-.7.3-1.5.3-1.1.1-1.3.1-4 .1s-2.9 0-4-.1c-.8 0-1.2-.2-1.5-.3-.4-.1-.7-.3-1-.6-.3-.3-.5-.6-.6-1-.1-.3-.3-.7-.3-1.5-.1-1.1-.1-1.3-.1-4s0-2.9.1-4c0-.8.2-1.2.3-1.5.1-.4.3-.7.6-1 .3-.3.6-.5 1-.6.3-.1.7-.3 1.5-.3 1.1-.1 1.3-.1 4-.1zm0 3.1a4.9 4.9 0 100 9.8 4.9 4.9 0 000-9.8zm0 8a3.1 3.1 0 110-6.2 3.1 3.1 0 010 6.2zm6.3-8.2a1.15 1.15 0 11-2.3 0 1.15 1.15 0 012.3 0z",
  facebook:
    "M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.6V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H7.6V13h2.7v8h3.2z",
  tiktok:
    "M16.6 2h-2.8v12.2a2.4 2.4 0 11-2.4-2.4c.3 0 .5 0 .7.1V9c-.2 0-.5-.1-.7-.1a5.2 5.2 0 105.2 5.2V8.4c1 .8 2.3 1.3 3.7 1.3V6.9a3.7 3.7 0 01-3.7-3.7V2z",
  youtube:
    "M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15.2V8.8L15.5 12 10 15.2z",
  google:
    "M21.4 10.2h-9v3.6h5.2a5.3 5.3 0 01-5.2 3.9 5.7 5.7 0 110-11.4c1.4 0 2.7.5 3.7 1.4l2.6-2.6A9.4 9.4 0 0012.4 2.5a9.5 9.5 0 100 19c5.3 0 9.1-3.7 9.1-9 0-.8-.1-1.5-.1-2.3z",
  whatsapp:
    "M12 2a9.9 9.9 0 00-8.5 15L2 22l5.1-1.4A9.9 9.9 0 1012 2zm0 1.8a8.1 8.1 0 11-4.2 15l-.3-.2-3 .8.8-2.9-.2-.3A8.1 8.1 0 0112 3.8zm-3.6 4c-.2 0-.5.1-.7.4-.3.3-.9 1-.9 2s.7 2 1 2.4c.3.4 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.7.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3l-1.8-.9c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 01-3.3-2.9c-.1-.2 0-.4.1-.5l.6-.7c.1-.2.2-.3.1-.5l-.8-1.8c-.2-.4-.4-.4-.5-.4h-.1z",
  website:
    "M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zm0 1.8c1.2 0 2.4 1.7 3 4.2H9c.6-2.5 1.8-4.2 3-4.2zM7.2 8.5H4.9A7.8 7.8 0 019.3 4.7 10 10 0 007.2 8.5zm-2.9 1.8h2.5a17 17 0 000 3.4H4.3a7.7 7.7 0 010-3.4zm4.3 0h6.8a15 15 0 010 3.4H8.6a15 15 0 010-3.4zm8.6 0h2.5a7.7 7.7 0 010 3.4h-2.5a17 17 0 000-3.4zm-.4-1.8a10 10 0 00-2.1-3.8 7.8 7.8 0 014.4 3.8h-2.3zM9 15.5h6c-.6 2.5-1.8 4.2-3 4.2s-2.4-1.7-3-4.2zm-1.8 0a10 10 0 002.1 3.8 7.8 7.8 0 01-4.4-3.8h2.3zm7.5 3.8a10 10 0 002.1-3.8h2.3a7.8 7.8 0 01-4.4 3.8z",
};

function socialIcon(label) {
  const key = label.toLowerCase().replace(/[^a-z]/g, "");
  const path = SOCIAL_PATHS[key] || SOCIAL_PATHS.website;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  const shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
  shape.setAttribute("d", path);
  svg.append(shape);
  return svg;
}

function renderSocials(container, options = {}) {
  if (!container) return;
  const socials = CONFIG.socials || [];
  container.hidden = socials.length === 0;
  container.replaceChildren(
    ...socials.map((social) => {
      const link = document.createElement("a");
      link.className = "social";
      link.href = social.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", `${CONFIG.business.name} on ${social.label}`);
      link.append(socialIcon(social.label));
      if (options.showLabels) {
        const text = document.createElement("span");
        text.className = "social__label";
        text.textContent = social.label;
        link.append(text);
      }
      return link;
    })
  );
}

/* ---------- reviews ---------- */

function stars(rating) {
  const wrap = document.createElement("span");
  wrap.className = "stars";
  wrap.setAttribute("role", "img");
  wrap.setAttribute("aria-label", `${rating} out of 5`);
  for (let i = 1; i <= 5; i += 1) {
    const star = document.createElement("span");
    star.className = "stars__star";
    star.dataset.on = String(i <= Math.round(rating));
    star.textContent = "★";
    wrap.append(star);
  }
  return wrap;
}

/* Rating pill in the hero, linking through to the reviews page. */
function renderRatingLink(container) {
  const reviews = CONFIG.reviews;
  if (!container) return;
  if (!reviews || !reviews.rating) {
    container.hidden = true;
    return;
  }
  container.hidden = false;
  container.href = withParams("reviews.html");
  container.replaceChildren(
    stars(reviews.rating),
    Object.assign(document.createElement("span"), {
      className: "rating__value",
      textContent: reviews.count
        ? `${reviews.rating} · ${reviews.count} reviews`
        : String(reviews.rating),
    })
  );
}

/* ---------- branding ---------- */

function applyBranding() {
  const { business } = CONFIG;
  document.documentElement.dataset.theme = resolveTheme();
  document.title = business.pageTitle || business.name;

  const set = (id, text) => {
    const node = document.getElementById(id);
    if (node) node.textContent = text || "";
  };
  set("business-name", business.name);
  set("tagline", business.tagline);
  set("status-text", business.status);

  const badge = document.getElementById("status-badge");
  if (badge) {
    badge.dataset.tone = business.statusTone || "open";
    badge.hidden = !business.status;
  }

  const logo = document.getElementById("logo");
  if (logo) {
    if (business.logo) {
      const img = document.createElement("img");
      img.src = business.logo;
      img.alt = `${business.name} logo`;
      logo.replaceChildren(img);
    } else {
      logo.textContent = initials(business.name);
    }
  }

  document.querySelectorAll("[data-meta-description]").forEach((tag) => {
    tag.setAttribute("content", business.description || business.tagline);
  });
  document.querySelectorAll("[data-meta-title]").forEach((tag) => {
    tag.setAttribute("content", business.pageTitle || business.name);
  });
  if (business.shareImage) {
    document.querySelectorAll("[data-meta-image]").forEach((tag) => {
      tag.setAttribute("content", business.shareImage);
    });
  }

  document.querySelectorAll("[data-keep-params]").forEach((link) => {
    link.href = withParams(link.getAttribute("href"));
  });
}

function whatsappLink(message) {
  const phone = String(CONFIG.whatsapp.phone).replace(/\D/g, "");
  if (!phone) return "";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
