/*
 * Rendering + basket state. No business data lives in this file.
 */
/* Scoped per business so previewing another preset never inherits its basket. */
const STORAGE_KEY = `vae-basket-v1:${CONFIG.business.name}`;
const basket = new Map(); // itemId -> quantity

const el = {
  socials: document.getElementById("socials"),
  rating: document.getElementById("rating-link"),
  tabs: document.getElementById("tabs"),
  catalogue: document.getElementById("catalogue"),
  basket: document.getElementById("basket"),
  basketToggle: document.getElementById("basket-toggle"),
  basketLabel: document.getElementById("basket-label"),
  basketLines: document.getElementById("basket-lines"),
  count: document.getElementById("count"),
  total: document.getElementById("total"),
  cta: document.getElementById("cta"),
  hint: document.getElementById("hint"),
};

const labels = CONFIG.labels || {};

const itemIndex = new Map();
CONFIG.categories.forEach((category) =>
  category.items.forEach((item) => itemIndex.set(item.id, { ...item, category: category.label }))
);

/* ---------- helpers ---------- */

function feeTotal() {
  return (CONFIG.fees || []).reduce((sum, fee) => sum + fee.amount, 0);
}

function itemsTotal() {
  let sum = 0;
  basket.forEach((qty, id) => {
    sum += itemIndex.get(id).price * qty;
  });
  return sum;
}

function itemCount() {
  let sum = 0;
  basket.forEach((qty) => {
    sum += qty;
  });
  return sum;
}

/* ---------- rendering ---------- */

function renderTabs() {
  el.tabs.replaceChildren(
    ...CONFIG.categories.map((category, index) => {
      const tab = document.createElement("button");
      tab.type = "button";
      tab.className = "tab";
      tab.id = `tab-${category.id}`;
      tab.setAttribute("role", "tab");
      tab.textContent = category.label;
      tab.setAttribute("aria-selected", String(index === 0));
      tab.setAttribute("aria-controls", `panel-${category.id}`);
      tab.tabIndex = index === 0 ? 0 : -1;
      tab.addEventListener("click", () => selectCategory(category.id));
      return tab;
    })
  );
  el.tabs.addEventListener("keydown", onTabKeydown);
}

function card(item) {
  const selected = basket.has(item.id);
  const soldOut = item.available === false;

  const wrapper = document.createElement("div");
  wrapper.className = "card";
  wrapper.dataset.itemId = item.id;
  wrapper.dataset.selected = String(selected);
  if (soldOut) {
    wrapper.dataset.soldOut = "true";
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "card__main";
  button.setAttribute("aria-pressed", String(selected));
  button.disabled = soldOut;

  const body = document.createElement("div");
  body.className = "card__body";
  const name = document.createElement("h3");
  name.className = "card__name";
  name.textContent = soldOut ? `${item.name} — sold out` : item.name;
  body.append(name);
  if (item.desc) {
    const desc = document.createElement("p");
    desc.className = "card__desc";
    desc.textContent = item.desc;
    body.append(desc);
  }

  const price = document.createElement("span");
  price.className = item.price ? "card__price" : "card__price card__price--quote";
  price.textContent = item.price ? money(item.price) : item.note || "On quote";

  button.append(body, price);
  button.addEventListener("click", () => toggleItem(item.id));

  const aside = document.createElement("div");
  aside.className = "card__aside";
  aside.append(selected ? stepper(item) : check());

  wrapper.append(button, aside);
  return wrapper;
}

function check() {
  const mark = document.createElement("div");
  mark.className = "card__check";
  mark.setAttribute("aria-hidden", "true");
  mark.textContent = "+";
  return mark;
}

function stepper(item) {
  const wrap = document.createElement("div");
  wrap.className = "stepper";

  const minus = document.createElement("button");
  minus.type = "button";
  minus.className = "stepper__btn";
  minus.textContent = "−";
  minus.setAttribute("aria-label", `Remove one ${item.name}`);
  minus.dataset.control = "minus";
  minus.addEventListener("click", () => changeQty(item.id, -1));

  const qty = document.createElement("span");
  qty.className = "stepper__qty";
  qty.textContent = String(basket.get(item.id));

  const plus = document.createElement("button");
  plus.type = "button";
  plus.className = "stepper__btn";
  plus.textContent = "+";
  plus.setAttribute("aria-label", `Add one ${item.name}`);
  plus.dataset.control = "plus";
  plus.addEventListener("click", () => changeQty(item.id, 1));

  wrap.append(minus, qty, plus);
  return wrap;
}

function renderCatalogue(activeId) {
  el.catalogue.replaceChildren(
    ...CONFIG.categories.map((category) => {
      const panel = document.createElement("div");
      panel.className = "card-list";
      panel.id = `panel-${category.id}`;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", `tab-${category.id}`);
      panel.hidden = category.id !== activeId;
      if (!category.items.length) {
        const empty = document.createElement("p");
        empty.className = "empty";
        empty.textContent = "Nothing here yet — check the other categories.";
        panel.append(empty);
      } else {
        panel.append(...category.items.map(card));
      }
      return panel;
    })
  );
}

function renderBasket() {
  const count = itemCount();
  const items = itemsTotal();
  const fees = count ? feeTotal() : 0;

  el.count.textContent = count === 1 ? "1 item selected" : `${count} items selected`;
  el.total.textContent = money(items + fees);
  el.total.classList.remove("pop");
  if (count) {
    void el.total.offsetWidth;
    el.total.classList.add("pop");
  }

  el.basket.hidden = count === 0;
  el.basketLabel.textContent = count === 1 ? "1 item in basket" : `${count} items in basket`;

  const lines = [];
  basket.forEach((qty, id) => {
    const item = itemIndex.get(id);
    lines.push({
      label: `${qty}× ${item.name}`,
      value: item.price ? money(item.price * qty) : item.note || "On quote",
    });
  });
  (CONFIG.fees || []).forEach((fee) => {
    if (count) lines.push({ label: fee.label, value: money(fee.amount), fee: true });
  });

  el.basketLines.replaceChildren(
    ...lines.map((line) => {
      const row = document.createElement("div");
      row.className = line.fee ? "basket__line basket__line--fee" : "basket__line";
      const label = document.createElement("span");
      label.textContent = line.label;
      const value = document.createElement("span");
      value.textContent = line.value;
      row.append(label, value);
      return row;
    })
  );

  const belowMinimum = CONFIG.minimumOrder && items > 0 && items < CONFIG.minimumOrder;
  el.cta.disabled = count === 0 || belowMinimum;
  if (!count) {
    el.hint.textContent = labels.emptyHint || "Tap an item to start your order.";
  } else if (belowMinimum) {
    el.hint.textContent = `Minimum order is ${money(CONFIG.minimumOrder)} — add ${money(
      CONFIG.minimumOrder - items
    )} more.`;
  } else {
    el.hint.textContent = "";
  }
}

/* ---------- state ---------- */

function selectCategory(categoryId) {
  Array.from(el.tabs.children).forEach((tab) => {
    const active = tab.id === `tab-${categoryId}`;
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  Array.from(el.catalogue.children).forEach((panel) => {
    panel.hidden = panel.id !== `panel-${categoryId}`;
  });
  el.catalogue.scrollTop = 0;
}

function onTabKeydown(event) {
  const tabs = Array.from(el.tabs.children);
  const current = tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true");
  const offset = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
  if (!offset) return;
  event.preventDefault();
  const next = tabs[(current + offset + tabs.length) % tabs.length];
  selectCategory(next.id.replace("tab-", ""));
  next.focus();
}

function activeCategoryId() {
  const active = Array.from(el.tabs.children).find(
    (tab) => tab.getAttribute("aria-selected") === "true"
  );
  return active ? active.id.replace("tab-", "") : CONFIG.categories[0].id;
}

/* Re-rendering a category drops focus, so put it back where the user left it. */
function focusTarget() {
  const focused = document.activeElement;
  const card = focused && focused.closest ? focused.closest(".card") : null;
  if (!card) return null;
  return { itemId: card.dataset.itemId, control: focused.dataset.control || "main" };
}

function restoreFocus(target) {
  if (!target) return;
  const card = el.catalogue.querySelector(`[data-item-id="${target.itemId}"]`);
  if (!card) return;
  const next =
    card.querySelector(`[data-control="${target.control}"]`) || card.querySelector(".card__main");
  if (next) next.focus();
}

function refreshCards() {
  const target = focusTarget();
  renderCatalogue(activeCategoryId());
  renderBasket();
  restoreFocus(target);
  save();
}

function toggleItem(itemId) {
  if (basket.has(itemId)) {
    basket.delete(itemId);
  } else {
    basket.set(itemId, 1);
  }
  refreshCards();
}

function changeQty(itemId, delta) {
  const next = (basket.get(itemId) || 0) + delta;
  if (next <= 0) {
    basket.delete(itemId);
  } else {
    basket.set(itemId, Math.min(next, 99));
  }
  refreshCards();
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(basket.entries())));
  } catch (error) {
    /* private mode — basket simply will not persist */
  }
}

function restore() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    stored.forEach(([id, qty]) => {
      const item = itemIndex.get(id);
      if (item && item.available !== false && Number.isFinite(qty) && qty > 0) {
        basket.set(id, Math.min(qty, 99));
      }
    });
  } catch (error) {
    /* corrupt storage — start with an empty basket */
  }
}

/* ---------- checkout ---------- */

function orderReference() {
  return Math.random().toString(36).slice(2, 6).toUpperCase();
}

function buildMessage() {
  const lines = [CONFIG.whatsapp.greeting, ""];
  basket.forEach((qty, id) => {
    const item = itemIndex.get(id);
    const value = item.price ? money(item.price * qty) : item.note || "On quote";
    lines.push(`• ${qty}× ${item.name} — ${value}`);
  });
  (CONFIG.fees || []).forEach((fee) => lines.push(`• ${fee.label} — ${money(fee.amount)}`));
  lines.push("", `Total: ${money(itemsTotal() + feeTotal())}`, `Ref: #${orderReference()}`);
  if (CONFIG.whatsapp.closing) lines.push("", CONFIG.whatsapp.closing);
  return lines.join("\n");
}

function checkout() {
  if (!basket.size) return;
  const url = whatsappLink(buildMessage());
  if (!url) {
    el.hint.textContent = "No WhatsApp number configured yet.";
    return;
  }
  window.open(url, "_blank", "noopener");
}

/* ---------- boot ---------- */

applyBranding();
el.cta.firstChild.textContent = labels.cta || "Order on WhatsApp";
renderSocials(el.socials);
renderRatingLink(el.rating);
renderTabs();
restore();
renderCatalogue(CONFIG.categories[0].id);
renderBasket();

el.cta.addEventListener("click", checkout);
el.basketToggle.addEventListener("click", () => {
  const expanded = el.basketToggle.getAttribute("aria-expanded") === "true";
  el.basketToggle.setAttribute("aria-expanded", String(!expanded));
  el.basketLines.hidden = expanded;
});
