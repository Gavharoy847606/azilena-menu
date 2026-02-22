// Azilena QR Menu — Static (HTML/CSS/JS only)

// --- i18n ---
const I18N = {
  uz: {
    langName: "O‘zbekcha",
    langLabel: "Til",
    cta: "Menuga o‘tish",
    searchLabel: "Qidirish",
    searchPlaceholder: "Masalan: salat, shirinlik…",
    categoryLabel: "Kategoriya",
    empty: "Hech narsa topilmadi. Qidiruv yoki filtrni o‘zgartirib ko‘ring.",
    all: "Barchasi",
    cat_salads: "Salatlar",
    cat_desserts: "Shirinliklar",
    priceSuffix: "so‘m",
    modalAria: "Mahsulot tafsilotlari",
    ingredientsTitle: "Tarkibi",
    order: "Buyurtma",
    orderText: (name, price) => `Salom! ${name} (${price}) buyurtma qilmoqchiman.`,
    copy: "Linkni nusxa olish",
    copied: "Nusxa olindi ✅",
    call: "Qo‘ng‘iroq",
  },
  ru: {
    langName: "Русский",
    langLabel: "Язык",
    cta: "Открыть меню",
    searchLabel: "Поиск",
    searchPlaceholder: "Например: салат, десерт…",
    categoryLabel: "Категория",
    empty: "Ничего не найдено. Измените поиск или фильтр.",
    all: "Все",
    cat_salads: "Салаты",
    cat_desserts: "Десерты",
    priceSuffix: "сум",
    modalAria: "Детали блюда",
    ingredientsTitle: "Состав",
    order: "Заказать",
    orderText: (name, price) => `Здравствуйте! Хочу заказать: ${name} (${price}).`,
    copy: "Скопировать ссылку",
    copied: "Скопировано ✅",
    call: "Позвонить",
  },
  en: {
    langName: "English",
    langLabel: "Language",
    cta: "Open menu",
    searchLabel: "Search",
    searchPlaceholder: "E.g.: salad, dessert…",
    categoryLabel: "Category",
    empty: "Nothing found. Try changing the search or filters.",
    all: "All",
    cat_salads: "Salads",
    cat_desserts: "Desserts",
    priceSuffix: "UZS",
    modalAria: "Product details",
    ingredientsTitle: "Ingredients",
    order: "Order",
    orderText: (name, price) => `Hello! I would like to order: ${name} (${price}).`,
    copy: "Copy link",
    copied: "Copied ✅",
    call: "Call",
  },
};

const CATEGORIES = [
  { key: "salads", labelKey: "cat_salads" },
  { key: "desserts", labelKey: "cat_desserts" },
];

const products = [
  {
    id: "pancake",
    category: "desserts",
    price: 22000,
    image: "images/pancake.jpg",
    name: { uz: "Pankeyk", ru: "Панкейк", en: "Pancake" },
    ingredients: {
      uz: "Bug‘doy uni, tuxum, sut, shakar, sariyog‘, qabartma, vanilin. Asal, sirop yoki yangi rezavorlar bilan tortiladi.",
      ru: "пшеничная мука, яйца, молоко, сахар, сливочное масло, разрыхлитель, ваниль. Подаётся с мёдом, сиропом или свежими ягодами.",
      en: "Wheat flour, eggs, milk, sugar, butter, baking powder, vanilla. Served with honey, syrup, or fresh berries.",
    },
  },
  {
    id: "caesar-salad",
    category: "salads",
    price: 48000,
    image: "images/caesar-salad.jpg",
    name: { uz: "Salat “Sezar”", ru: "Салат «Цезарь»", en: "Caesar salad" },
    ingredients: {
      uz: "Grilda pishirilgan tovuq filesi, salat barglari, cherri pomidorlari, suxariklar, parmezan pishlog‘i, “Sezar” sousi.",
      ru: "куриное филе гриль, листья салата, помидоры черри, сухарики, сыр пармезан, соус «Цезарь».",
      en: "Grilled chicken fillet, lettuce, cherry tomatoes, croutons, Parmesan, Caesar dressing.",
    },
  },
  {
    id: "greek-salad",
    category: "salads",
    price: 42000,
    image: "images/greek-salad.jpg",
    name: { uz: "Salat “Grekcha”", ru: "Салат «Греческий»", en: "Greek salad" },
    ingredients: {
      uz: "Yangi pomidor, bodring, bolg‘ar qalampiri, qizil piyoz, feta pishlog‘i, zaytun, zaytun moyi, ziravorlar.",
      ru: "свежие помидоры, огурцы, болгарский перец, красный лук, сыр фета, оливки, оливковое масло, специи.",
      en: "Fresh tomatoes, cucumber, bell pepper, red onion, feta cheese, olives, olive oil, spices.",
    },
  },
  {
    id: "fruit-salad",
    category: "salads",
    price: 39000,
    image: "images/fruit-salad.jpg",
    name: { uz: "Mevali salat", ru: "Фруктовый салат", en: "Fruit salad" },
    ingredients: {
      uz: "Qulupnay, banan, kivi, uzum, olma, tabiiy yogurt yoki asal.",
      ru: "клубника, банан, киви, виноград, яблоко, натуральный йогурт или мёд.",
      en: "Strawberries, banana, kiwi, grapes, apple, natural yogurt or honey.",
    },
  },
  {
    id: "trifle",
    category: "desserts",
    price: 60000,
    image: "images/trifle.jpg",
    name: { uz: "Trayfl", ru: "Трайфл", en: "Trifle" },
    ingredients: {
      uz: "Yumshoq biskvit, qaymoqli krem, yangi mevalar (qulupnay, banan, kivi), shokolad uvoqlari.",
      ru: "нежный бисквит, сливочный крем, свежие фрукты (клубника, банан, киви), шоколадная крошка.",
      en: "Soft sponge cake, creamy custard, fresh fruits (strawberry, banana, kiwi), chocolate shavings.",
    },
  },
  {
    id: "medovik",
    category: "desserts",
    price: 26000,
    image: "images/medovik.jpg",
    name: { uz: "Medovik", ru: "Медовик", en: "Honey cake (Medovik)" },
    ingredients: {
      uz: "Asalli korjlar, smetana kremi, tabiiy asal.",
      ru: "медовые коржи, сметанный крем, натуральный мёд.",
      en: "Honey layers, sour-cream frosting, natural honey.",
    },
  },
  {
    id: "napoleon",
    category: "desserts",
    price: 27000,
    image: "images/napoleon.jpg",
    name: { uz: "Napoleon", ru: "Наполеон", en: "Napoleon cake" },
    ingredients: {
      uz: "Qatlamli xamir, zavarnoy krem, shakar upasi.",
      ru: "слоёное тесто, заварной крем, сахарная пудра.",
      en: "Puff pastry layers, custard cream, powdered sugar.",
    },
  },
  {
    id: "muffin",
    category: "desserts",
    price: 18000,
    image: "images/muffin.jpg",
    name: { uz: "Maffin", ru: "Маффин", en: "Muffin" },
    ingredients: {
      uz: "Bug‘doy uni, tuxum, shakar, yog‘, qabartma, shokolad tomchilari yoki yangi rezavorlar (qulupnay, chernika, malina).",
      ru: "пшеничная мука, яйца, сахар, масло, разрыхлитель, шоколадные капли или свежие ягоды (клубника, черника, малина).",
      en: "Wheat flour, eggs, sugar, butter/oil, baking powder, chocolate chips or fresh berries (strawberry, blueberry, raspberry).",
    },
  },
];

// --- DOM ---
const grid = document.getElementById("grid");
const empty = document.getElementById("empty");
const filtersEl = document.getElementById("filters");
const searchEl = document.getElementById("search");
const yearEl = document.getElementById("year");

const langSelect = document.getElementById("langSelect");
const ctaEl = document.getElementById("cta");
const searchLabel = document.getElementById("searchLabel");
const categoryLabel = document.getElementById("categoryLabel");
const callLink = document.getElementById("callLink");
const langUiLabel = document.getElementById("langUiLabel");

const modal = document.getElementById("modal");
const modalBackdrop = document.getElementById("modalBackdrop");
const closeModalBtn = document.getElementById("closeModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDesc = document.getElementById("modalDesc");
const copyBtn = document.getElementById("copyBtn");
const copyHint = document.getElementById("copyHint");

yearEl.textContent = new Date().getFullYear().toString();

const state = {
  q: "",
  category: "all",
  lang: getInitialLang(),
};

function getInitialLang() {
  const saved = localStorage.getItem("azilena_lang");
  if (saved === "uz" || saved === "ru" || saved === "en") return saved;

  const htmlLang = (document.documentElement.lang || "").toLowerCase();
  if (htmlLang.startsWith("ru")) return "ru";
  if (htmlLang.startsWith("en")) return "en";
  return "uz";
}

function t(key) {
  const dict = I18N[state.lang] || I18N.uz;
  return dict[key] ?? I18N.uz[key] ?? key;
}

function formatPrice(sum) {
  // 25000 -> "25 000 so'm" / "25 000 сум"
  const s = String(sum);
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const idxFromEnd = s.length - i;
    out += s[i];
    if (idxFromEnd > 1 && idxFromEnd % 3 === 1) out += " ";
  }
  return `${out} ${t("priceSuffix")}`;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function productName(p) {
  return p.name?.[state.lang] || p.name?.uz || p.name?.ru || p.name?.en || "";
}

function productIngredients(p) {
  return p.ingredients?.[state.lang] || p.ingredients?.uz || p.ingredients?.ru || p.ingredients?.en || "";
}

function applyLanguageToStaticUI() {
  document.documentElement.lang = state.lang;
  if (langSelect) langSelect.value = state.lang;

  if (ctaEl) ctaEl.textContent = t("cta");
  if (searchLabel) searchLabel.textContent = t("searchLabel");
  if (searchEl) searchEl.placeholder = t("searchPlaceholder");
  if (categoryLabel) categoryLabel.textContent = t("categoryLabel");
  if (langUiLabel) langUiLabel.textContent = t("langLabel");
  if (empty) empty.textContent = t("empty");
  if (callLink) callLink.textContent = t("call");
  if (copyBtn) copyBtn.textContent = t("copy");
  if (copyHint) copyHint.textContent = t("copied");

  // Modal aria label
  if (modal) modal.setAttribute("aria-label", t("modalAria"));
}

function renderFilters() {
  filtersEl.innerHTML = "";
  const cats = [{ key: "all", label: t("all") }, ...CATEGORIES.map((c) => ({ key: c.key, label: t(c.labelKey) }))];

  cats.forEach((c) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-btn";
    btn.textContent = c.label;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", String(state.category === c.key));
    btn.addEventListener("click", () => {
      state.category = c.key;
      [...filtersEl.querySelectorAll(".filter-btn")].forEach((b) =>
        b.setAttribute("aria-selected", String(b === btn))
      );
      render();
    });
    filtersEl.appendChild(btn);
  });
}

function filteredProducts() {
  const q = state.q.trim().toLowerCase();
  return products.filter((p) => {
    const byCat = state.category === "all" ? true : p.category === state.category;
    if (!byCat) return false;
    if (!q) return true;

    const hay = [
      p.name?.uz,
      p.name?.ru,
      p.name?.en,
      p.ingredients?.uz,
      p.ingredients?.ru,
      p.ingredients?.en,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return hay.includes(q);
  });
}

function cardTemplate(p) {
  const name = productName(p);
  const div = document.createElement("article");
  div.className = "card";
  div.setAttribute("tabindex", "0");
  div.setAttribute("role", "button");
  div.setAttribute("aria-label", `${name}`);

  div.innerHTML = `
    <img class="card__img" src="${p.image}" alt="${escapeHtml(name)}" loading="lazy" />
    <div class="card__body">
      <div class="card__top">
        <h3 class="card__title">${escapeHtml(name)}</h3>
        <div class="price">${formatPrice(p.price)}</div>
      </div>
      
    </div>
  `;

  const open = () => openModal(p);
  div.addEventListener("click", open);
  div.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  });

  return div;
}

function render() {
  const items = filteredProducts();
  grid.innerHTML = "";

  if (items.length === 0) {
    empty.classList.remove("hidden");
    return;
  }

  empty.classList.add("hidden");
  items.forEach((p) => grid.appendChild(cardTemplate(p)));
}

function buildShareUrl(pId) {
  const url = new URL(window.location.href);
  url.hash = `#${pId}`;
  url.searchParams.set("lang", state.lang);
  return url.toString();
}

function openModal(p) {
  const name = productName(p);
  const ing = productIngredients(p);

  modalImg.src = p.image;
  modalImg.alt = name;
  modalTitle.textContent = name;
  modalPrice.textContent = formatPrice(p.price);
  modalDesc.textContent = `${t("ingredientsTitle")}: ${ing}`;

  // deep link
  history.replaceState(null, "", buildShareUrl(p.id));

  copyHint.classList.add("hidden");
  modalBackdrop.classList.remove("hidden");
  if (typeof modal.showModal === "function") modal.showModal();
  else modal.classList.remove("hidden");
}

function closeModal() {
  modalBackdrop.classList.add("hidden");
  copyHint.classList.add("hidden");
  if (typeof modal.close === "function") modal.close();
  else modal.classList.add("hidden");
}

function findProductByHash() {
  const id = (window.location.hash || "").replace("#", "").trim();
  if (!id) return null;
  return products.find((p) => p.id === id) || null;
}

function applyLangFromUrl() {
  const url = new URL(window.location.href);
  const l = url.searchParams.get("lang");
  if (l === "uz" || l === "ru" || l === "en") {
    state.lang = l;
    localStorage.setItem("azilena_lang", l);
  }
}

// --- Events ---
closeModalBtn.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.open) closeModal();
});

searchEl.addEventListener("input", (e) => {
  state.q = e.target.value;
  render();
});

langSelect.addEventListener("change", (e) => {
  const next = e.target.value;
  if (next !== "uz" && next !== "ru" && next !== "en") return;
  state.lang = next;
  localStorage.setItem("azilena_lang", next);
  applyLanguageToStaticUI();
  renderFilters();
  render();

  // update share url if modal is open
  const current = findProductByHash();
  if (current && modal.open) history.replaceState(null, "", buildShareUrl(current.id));
});

copyBtn.addEventListener("click", async () => {
  try {
    const current = findProductByHash();
    const url = current ? buildShareUrl(current.id) : window.location.href;
    await navigator.clipboard.writeText(url);
    copyHint.classList.remove("hidden");
    setTimeout(() => copyHint.classList.add("hidden"), 1200);
  } catch {
    // clipboard permission denied — ignore
  }
});

window.addEventListener("hashchange", () => {
  const p = findProductByHash();
  if (p) openModal(p);
});

// --- init ---
applyLangFromUrl();
applyLanguageToStaticUI();
renderFilters();
render();

const openFromHash = findProductByHash();
if (openFromHash) openModal(openFromHash);
