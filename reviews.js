/*
 * Reviews page. Everything comes from CONFIG.reviews — add entries there and
 * they appear here, no markup changes.
 */
const el = {
  headline: document.getElementById("reviews-headline"),
  intro: document.getElementById("reviews-intro"),
  score: document.getElementById("score"),
  scoreValue: document.getElementById("score-value"),
  scoreStars: document.getElementById("score-stars"),
  scoreCount: document.getElementById("score-count"),
  list: document.getElementById("reviews-list"),
  socials: document.getElementById("socials"),
  cta: document.getElementById("reviews-cta"),
};

const reviews = CONFIG.reviews || { items: [] };

function reviewCard(review) {
  const card = document.createElement("article");
  card.className = "review";

  const head = document.createElement("header");
  head.className = "review__head";

  const avatar = document.createElement("div");
  avatar.className = "review__avatar";
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = initials(review.name);

  const who = document.createElement("div");
  who.className = "review__who";
  const name = document.createElement("h3");
  name.className = "review__name";
  name.textContent = review.name;
  who.append(name);

  const detail = [review.service, review.date].filter(Boolean).join(" · ");
  if (detail) {
    const meta = document.createElement("p");
    meta.className = "review__meta";
    meta.textContent = detail;
    who.append(meta);
  }

  head.append(avatar, who);
  if (review.rating) head.append(stars(review.rating));
  card.append(head);

  const text = document.createElement("p");
  text.className = "review__text";
  text.textContent = review.text;
  card.append(text);

  if (review.source) {
    const source = document.createElement("p");
    source.className = "review__source";
    source.textContent = `via ${review.source}`;
    card.append(source);
  }

  return card;
}

function renderReviews() {
  el.headline.textContent = reviews.headline || "Reviews";
  el.intro.textContent = reviews.intro || "";
  el.intro.hidden = !reviews.intro;

  if (reviews.rating) {
    el.score.hidden = false;
    el.scoreValue.textContent = reviews.rating.toFixed(1);
    el.scoreStars.replaceChildren(stars(reviews.rating));
    el.scoreCount.textContent = reviews.count ? `${reviews.count} reviews` : "";
  }

  const items = reviews.items || [];
  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "No reviews yet — add them to CONFIG.reviews.items.";
    el.list.replaceChildren(empty);
    return;
  }
  el.list.replaceChildren(...items.map(reviewCard));
}

applyBranding();
renderReviews();
renderSocials(el.socials, { showLabels: true });

const url = whatsappLink(`Hi ${CONFIG.business.name}! I saw your reviews and I'd like to ask about:`);
if (url) {
  el.cta.firstChild.textContent = (CONFIG.labels || {}).reviewsCta || "Message us on WhatsApp";
  el.cta.href = url;
  el.cta.target = "_blank";
  el.cta.rel = "noopener noreferrer";
} else {
  el.cta.hidden = true;
}
