/* ============================================================
   Azilena QR Menu — script.js
   Tuzatishlar:
   1. modal backdrop CSS klassi bilan boshqariladi (is-open)
   2. dialog.showModal() o'rniga oddiy div modal — backdrop ichida
   3. body scroll lock/unlock
   4. card desc ko'rsatiladi
   5. Yangi kategoriya: ichimliklar
   6. Yangi mahsulotlar: cappuccino, latte, lemon-tea, cheesecake
   7. escapeHtml barcha joyda to'g'ri ishlatiladi
   8. hashchange + deep link ishlaydi
   ============================================================ */

// ─── i18n ──────────────────────────────────────────────────
const I18N = {
  uz: {
    langLabel:          "Til",
    cta:                "Menuga o'tish",
    searchLabel:        "Qidirish",
    searchPlaceholder:  "Masalan: salat, shirinlik, kapuchino…",
    categoryLabel:      "Kategoriya",
    empty:              "Hech narsa topilmadi. Qidiruv yoki filtrni o'zgartirib ko'ring.",
    all:                "Barchasi",
    cat_salads:         "Salatlar",
    cat_desserts:       "Shirinliklar",
    cat_drinks:         "Ichimliklar",
    priceSuffix:        "so'm",
    modalAria:          "Mahsulot tafsilotlari",
    ingredientsTitle:   "Tarkibi",
    copy:               "Linkni nusxa olish",
    copied:             "Nusxa olindi ✅",
    call:               "Qo'ng'iroq",
    close:              "Yopish",
  },
  ru: {
    langLabel:          "Язык",
    cta:                "Открыть меню",
    searchLabel:        "Поиск",
    searchPlaceholder:  "Например: салат, десерт, капучино…",
    categoryLabel:      "Категория",
    empty:              "Ничего не найдено. Измените поиск или фильтр.",
    all:                "Все",
    cat_salads:         "Салаты",
    cat_desserts:       "Десерты",
    cat_drinks:         "Напитки",
    priceSuffix:        "сум",
    modalAria:          "Детали блюда",
    ingredientsTitle:   "Состав",
    copy:               "Скопировать ссылку",
    copied:             "Скопировано ✅",
    call:               "Позвонить",
    close:              "Закрыть",
  },
};

// ─── Kategoriyalar ──────────────────────────────────────────
const CATEGORIES = [
  { key: "salads",   labelKey: "cat_salads" },
  { key: "desserts", labelKey: "cat_desserts" },
  { key: "drinks",   labelKey: "cat_drinks" },
];

// ─── Mahsulotlar ────────────────────────────────────────────
const products = [
  // ── Salatlar ──
  {
    id: "caesar-salad",
    category: "salads",
    price: 48000,
    image: "images/caesar-salad.jpg",
    name: { uz: "Salat «Sezar»", ru: "Салат «Цезарь»" },
    ingredients: {
      uz: "Grilda pishirilgan tovuq filesi, salat barglari, cherri pomidorlari, suxariklar, parmezan pishlog'i, «Sezar» sousi.",
      ru: "Куриное филе гриль, листья салата, помидоры черри, сухарики, сыр пармезан, соус «Цезарь».",
    },
  },
  {
    id: "greek-salad",
    category: "salads",
    price: 42000,
    image: "images/greek-salad.jpg",
    name: { uz: "Salat «Grekcha»", ru: "Салат «Греческий»" },
    ingredients: {
      uz: "Yangi pomidor, bodring, bolg'ar qalampiri, qizil piyoz, feta pishlog'i, zaytun, zaytun moyi, ziravorlar.",
      ru: "Свежие помидоры, огурцы, болгарский перец, красный лук, сыр фета, оливки, оливковое масло, специи.",
    },
  },
  {
    id: "fruit-salad",
    category: "salads",
    price: 39000,
    image: "images/fruit-salad.jpg",
    name: { uz: "Mevali salat", ru: "Фруктовый салат" },
    ingredients: {
      uz: "Qulupnay, banan, kivi, uzum, olma, tabiiy yogurt yoki asal.",
      ru: "Клубника, банан, киви, виноград, яблоко, натуральный йогурт или мёд.",
    },
  },
  {
    id: "trifle",
    category: "salads",
    price: 60000,
    image: "images/trifle.jpg",
    name: { uz: "Trayfl", ru: "Трайфл" },
    ingredients: {
      uz: "Yumshoq biskvit, qaymoqli krem, yangi mevalar (qulupnay, banan, kivi), shokolad uvoqlari.",
      ru: "Нежный бисквит, сливочный крем, свежие фрукты (клубника, банан, киви), шоколадная крошка.",
    },
  },
  // ── Shirinliklar ──
  {
    id: "pancake",
    category: "desserts",
    price: 22000,
    image: "images/pancake.jpg",
    name: { uz: "Pankeyk", ru: "Панкейк" },
    ingredients: {
      uz: "Bug'doy uni, tuxum, sut, shakar, sariyog', qabartma, vanilin. Asal yoki yangi rezavorlar bilan.",
      ru: "Пшеничная мука, яйца, молоко, сахар, сливочное масло, разрыхлитель, ваниль. С мёдом или ягодами.",
    },
  },
  {
    id: "medovik",
    category: "desserts",
    price: 26000,
    image: "images/medovik.jpg",
    name: { uz: "Medovik", ru: "Медовик" },
    ingredients: {
      uz: "Asalli korjlar, smetana kremi, tabiiy asal.",
      ru: "Медовые коржи, сметанный крем, натуральный мёд.",
    },
  },
  {
    id: "napoleon",
    category: "desserts",
    price: 27000,
    image: "images/napoleon.jpg",
    name: { uz: "Napoleon", ru: "Наполеон" },
    ingredients: {
      uz: "Qatlamli xamir, zavarnoy krem, shakar upasi.",
      ru: "Слоёное тесто, заварной крем, сахарная пудра.",
    },
  },
  {
    id: "muffin",
    category: "desserts",
    price: 18000,
    image: "images/muffin.jpg",
    name: { uz: "Maffin", ru: "Маффин" },
    ingredients: {
      uz: "Bug'doy uni, tuxum, shakar, yog', qabartma, shokolad tomchilari yoki yangi rezavorlar.",
      ru: "Пшеничная мука, яйца, сахар, масло, разрыхлитель, шоколадные капли или свежие ягоды.",
    },
  },
  {
    id: "cheesecake",
    category: "desserts",
    price: 32000,
    image: "images/cheesecake.jpg",
    name: { uz: "Chizkeyk", ru: "Чизкейк" },
    ingredients: {
      uz: "Krem-pishloq, pechenye korji, shakar, tuxum, vanilin. Gilos sousi bilan tortiladi.",
      ru: "Сливочный сыр, основа из печенья, сахар, яйца, ваниль. Подаётся с вишнёвым соусом.",
    },
  },
  // ── Ichimliklar ──
  {
    id: "cappuccino",
    category: "drinks",
    price: 24000,
    image: "images/cappuccino.jpg",
    name: { uz: "Kapuchino", ru: "Капучино" },
    ingredients: {
      uz: "Espresso, bug'langan sut, sut ko'pigi. Klassik italyan qahvasi.",
      ru: "Эспрессо, вспененное молоко, молочная пенка. Классический итальянский кофе.",
    },
  },
  {
    id: "latte",
    category: "drinks",
    price: 26000,
    image: "images/latte.jpg",
    name: { uz: "Latte", ru: "Латте" },
    ingredients: {
      uz: "Espresso, ko'p miqdorda bug'langan sut, ozgina sut ko'pigi. Yumshoq va mayin ta'm.",
      ru: "Эспрессо, большое количество вспененного молока, немного пенки. Мягкий и нежный вкус.",
    },
  },
  {
    id: "lemon-tea",
    category: "drinks",
    price: 16000,
    image: "images/lemon-tea.jpg",
    name: { uz: "Limonli choy", ru: "Чай с лимоном" },
    ingredients: {
      uz: "Sifatli qora choy, yangi limon, yalpiz bargi. Issiq yoki muzli holatda beriladi.",
      ru: "Качественный чёрный чай, свежий лимон, листья мяты. Подаётся горячим или холодным.",
    },
  },
];

// ─── DOM Refs ───────────────────────────────────────────────
const gridEl        = document.getElementById("grid");
const emptyEl       = document.getElementById("empty");
const filtersEl     = document.getElementById("filters");
const searchEl      = document.getElementById("search");
const yearEl        = document.getElementById("year");
const langSelect    = document.getElementById("langSelect");
const ctaEl         = document.getElementById("cta");
const searchLabel   = document.getElementById("searchLabel");
const categoryLabel = document.getElementById("categoryLabel");
const callLink      = document.getElementById("callLink");
const langUiLabel   = document.getElementById("langUiLabel");

const backdropEl    = document.getElementById("modalBackdrop");
const modalEl       = document.getElementById("modal");
const closeModalBtn = document.getElementById("closeModal");
const modalImg      = document.getElementById("modalImg");
const modalTitle    = document.getElementById("modalTitle");
const modalPrice    = document.getElementById("modalPrice");
const modalDesc     = document.getElementById("modalDesc");
const copyBtn       = document.getElementById("copyBtn");
const copyHint      = document.getElementById("copyHint");

// ─── State ──────────────────────────────────────────────────
const state = {
  q:        "",
  category: "all",
  lang:     getInitialLang(),
};

// ─── Helpers ────────────────────────────────────────────────
function getInitialLang() {
  const saved = localStorage.getItem("azilena_lang");
  if (saved === "uz" || saved === "ru") return saved;
  return "uz";
}

function t(key) {
  return (I18N[state.lang] ?? I18N.uz)[key] ?? (I18N.uz)[key] ?? key;
}

function formatPrice(sum) {
  const s = String(sum);
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const fromEnd = s.length - i;
    out += s[i];
    if (fromEnd > 1 && fromEnd % 3 === 1) out += "\u202F"; // narrow no-break space
  }
  return `${out} ${t("priceSuffix")}`;
}

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function productName(p) {
  return p.name?.[state.lang] || p.name?.uz || "";
}

function productIngredients(p) {
  return p.ingredients?.[state.lang] || p.ingredients?.uz || "";
}

// ─── Static UI translations ─────────────────────────────────
function applyLangUI() {
  document.documentElement.lang = state.lang;
  if (langSelect)    langSelect.value    = state.lang;
  if (ctaEl)         ctaEl.textContent   = t("cta");
  if (searchLabel)   searchLabel.textContent  = t("searchLabel");
  if (searchEl)      searchEl.placeholder     = t("searchPlaceholder");
  if (categoryLabel) categoryLabel.textContent = t("categoryLabel");
  if (langUiLabel)   langUiLabel.textContent  = t("langLabel");
  if (emptyEl)       emptyEl.textContent      = t("empty");
  if (callLink)      callLink.textContent      = t("call");
  if (copyBtn)       copyBtn.textContent       = t("copy");
  if (closeModalBtn) closeModalBtn.setAttribute("aria-label", t("close"));
  if (modalEl)       modalEl.setAttribute("aria-label", t("modalAria"));
}

// ─── Filters ────────────────────────────────────────────────
function renderFilters() {
  filtersEl.innerHTML = "";
  const cats = [
    { key: "all", label: t("all") },
    ...CATEGORIES.map(c => ({ key: c.key, label: t(c.labelKey) })),
  ];

  cats.forEach(c => {
    const btn = document.createElement("button");
    btn.type      = "button";
    btn.className = "filter-btn";
    btn.textContent = c.label;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", String(state.category === c.key));

    btn.addEventListener("click", () => {
      state.category = c.key;
      filtersEl.querySelectorAll(".filter-btn").forEach(b =>
        b.setAttribute("aria-selected", String(b === btn))
      );
      render();
    });

    filtersEl.appendChild(btn);
  });
}

// ─── Filter logic ───────────────────────────────────────────
function filteredProducts() {
  const q = state.q.trim().toLowerCase();
  return products.filter(p => {
    if (state.category !== "all" && p.category !== state.category) return false;
    if (!q) return true;
    const hay = [p.name?.uz, p.name?.ru, p.ingredients?.uz, p.ingredients?.ru]
      .filter(Boolean).join(" ").toLowerCase();
    return hay.includes(q);
  });
}

// ─── Card template ──────────────────────────────────────────
function cardTemplate(p) {
  const name = productName(p);
  const ing  = productIngredients(p);

  const article = document.createElement("article");
  article.className = "card";
  article.setAttribute("tabindex", "0");
  article.setAttribute("role", "button");
  article.setAttribute("aria-label", name);

  article.innerHTML = `
    <div class="card__img-wrap">
      <img class="card__img"
           src="${esc(p.image)}"
           alt="${esc(name)}"
           loading="lazy"
           decoding="async" />
    </div>
    <div class="card__body">
      <div class="card__top">
        <h3 class="card__title">${esc(name)}</h3>
        <div class="price">${formatPrice(p.price)}</div>
      </div>
      <p class="card__desc">${esc(ing)}</p>
    </div>
  `;

  const open = () => openModal(p);
  article.addEventListener("click", open);
  article.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
  });

  return article;
}

// ─── Render grid ────────────────────────────────────────────
function render() {
  const items = filteredProducts();
  gridEl.innerHTML = "";

  if (items.length === 0) {
    emptyEl.classList.remove("hidden");
    return;
  }
  emptyEl.classList.add("hidden");
  const frag = document.createDocumentFragment();
  items.forEach(p => frag.appendChild(cardTemplate(p)));
  gridEl.appendChild(frag);
}

// ─── Deep-link helpers ──────────────────────────────────────
function buildShareUrl(pId) {
  const url = new URL(window.location.href);
  url.hash = `#${pId}`;
  url.searchParams.set("lang", state.lang);
  return url.toString();
}

function findProductByHash() {
  const id = window.location.hash.replace("#", "").trim();
  return id ? products.find(p => p.id === id) ?? null : null;
}

// ─── Modal open / close ─────────────────────────────────────
function openModal(p) {
  const name = productName(p);
  const ing  = productIngredients(p);

  modalImg.src         = p.image;
  modalImg.alt         = name;
  modalTitle.textContent = name;
  modalPrice.textContent = formatPrice(p.price);
  modalDesc.textContent  = `${t("ingredientsTitle")}: ${ing}`;
  copyHint.classList.add("hidden");

  history.replaceState(null, "", buildShareUrl(p.id));

  // CSS animatsiya uchun is-open klassi
  backdropEl.classList.remove("hidden");
  // Bir frame kutib, keyin animatsiya klassi — CSS transition ishlaydi
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      backdropEl.classList.add("is-open");
    });
  });

  document.body.style.overflow = "hidden";
  // Fokusni modal yopish tugmasiga o'tkazamiz
  setTimeout(() => closeModalBtn.focus(), 320);
}

function closeModal() {
  backdropEl.classList.remove("is-open");
  // Animatsiya tugagach hidden qo'yamiz
  backdropEl.addEventListener("transitionend", function handler() {
    backdropEl.classList.add("hidden");
    backdropEl.removeEventListener("transitionend", handler);
  });
  document.body.style.overflow = "";
  copyHint.classList.add("hidden");
}

// ─── Events ─────────────────────────────────────────────────

// Yopish tugmasi
closeModalBtn.addEventListener("click", closeModal);

// Backdrop ustiga bosilsa yopiladi (modal ichiga bosilsa yopilmaydi)
backdropEl.addEventListener("click", e => {
  if (e.target === backdropEl) closeModal();
});

// Escape
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && backdropEl.classList.contains("is-open")) closeModal();
});

// Qidiruv
searchEl.addEventListener("input", e => {
  state.q = e.target.value;
  render();
});

// Til o'zgartirish
langSelect.addEventListener("change", e => {
  const next = e.target.value;
  if (next !== "uz" && next !== "ru") return;
  state.lang = next;
  localStorage.setItem("azilena_lang", next);
  applyLangUI();
  renderFilters();
  render();

  // Modal ochiq bo'lsa URL yangilanadi
  const cur = findProductByHash();
  if (cur && backdropEl.classList.contains("is-open")) {
    history.replaceState(null, "", buildShareUrl(cur.id));
    // Modal ichidagi matnlarni ham yangilaymiz
    const name = productName(cur);
    const ing  = productIngredients(cur);
    modalImg.alt           = name;
    modalTitle.textContent = name;
    modalPrice.textContent = formatPrice(cur.price);
    modalDesc.textContent  = `${t("ingredientsTitle")}: ${ing}`;
  }
});

// Copy link
copyBtn.addEventListener("click", async () => {
  try {
    const cur = findProductByHash();
    const url = cur ? buildShareUrl(cur.id) : window.location.href;
    await navigator.clipboard.writeText(url);
    copyBtn.textContent = t("copied");
    setTimeout(() => {
      copyBtn.textContent = t("copy");
    }, 1800);
  } catch {
    // Clipboard permission denied — silently ignore
  }
});

// Hash change (browser orqaga/oldinga bosish)
window.addEventListener("hashchange", () => {
  const p = findProductByHash();
  if (p) openModal(p);
});

// ─── Init ───────────────────────────────────────────────────
function applyLangFromUrl() {
  const urlLang = new URL(window.location.href).searchParams.get("lang");
  if (urlLang === "uz" || urlLang === "ru") {
    state.lang = urlLang;
    localStorage.setItem("azilena_lang", urlLang);
  }
}

if (yearEl) yearEl.textContent = new Date().getFullYear();

applyLangFromUrl();
applyLangUI();
renderFilters();
render();

// Deep-link: URL da hash bo'lsa modal ochiladi
const initProduct = findProductByHash();
if (initProduct) openModal(initProduct);