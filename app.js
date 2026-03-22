(function () {
  "use strict";

  /** Координаты точки «БМ автоцентр» (Яндекс.Карты: ll=lon,lat) */
  const DEST_LAT = 45.072376;
  const DEST_LON = 39.021522;
  const DEST_NAME = "БМ автоцентр";
  const MAPS_ORG_URL =
    "https://yandex.ru/maps/org/bm/131521270282/?ll=39.021522%2C45.072376&z=17";

  // ВАЖНО: Ссылка на организацию в Яндекс.Навигаторе (ваша ссылка)
  const YANDEX_NAVI_ORG_URL = "https://yandex.ru/navi/org/bm/131521270282?si=2mqumcbrd1fjz9jayxmg73ykq8";

  // Схема для открытия в приложении Яндекс.Навигатор
  const YANDEX_NAVI_SCHEME = "yandexnavi://org?id=131521270282";

  const IMG_FALLBACK = "img/placeholder.svg";

  /** Telegram Bot Configuration */
  const TELEGRAM_BOT_TOKEN = "8664964975:AAH38cl0YEYfWkYpGCGqv7rRtkwqAAnFAGM";

  // ⚠️⚠️⚠️ ВАЖНО: ЗАМЕНИТЕ 0 НА РЕАЛЬНЫЙ CHAT ID ⚠️⚠️⚠️
  const TELEGRAM_CHAT_ID = 0; // <--- СЮДА ВСТАВЬТЕ CHAT ID ПОСЛЕ ТОГО КАК СОТРУДНИК НАЖМЕТ СТАРТ

  const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  // --- МАССИВ УСЛУГ (22 карточки) ---
  const services = [
    { title: "Эндоскопия", price: "2 000 ₽", desc: "Производим эндоскопию бензинового ДВС.", category: "engine" },
    { title: "Замена свечей (за 4 шт.)", price: "от 1 000 ₽", desc: "Комплексная замена комплекта свечей зажигания.", category: "engine" },
    { title: "Ремонт (переборка) тормозных суппортов", price: "2 000 ₽", desc: "Реставрация тормозных суппортов.", category: "brakes" },
    { title: "Замена сайлентблоков задней балки", price: "7 000 ₽", desc: "Замена сайлентблоков задней балки легковых автомобилей.", category: "suspension" },
    { title: "Замена рулевой рейки", price: "5 000 ₽", desc: "Замена рулевой рейки (съём-установка).", category: "steering" },
    { title: "Замена ремней и цепей ГРМ", price: "5 000 ₽", desc: "Замена цепей и ремней ГРМ.", category: "engine" },
    { title: "Замена радиатора печки со снятием торпедо", price: "10 000 ₽", desc: "Производим замену радиатора печки как со снятием торпедо, так и без. Многолетний опыт, гарантия.", category: "climate" },
    { title: "Замена генератора", price: "2 500 ₽", desc: "Производим снятие-установку генераторов и стартеров любой сложности.", category: "electric" },
    { title: "Замена ступичного подшипника", price: "2 000 ₽", desc: "Замена ступиц, подшипников на профессиональном оборудовании путем перепрессовки.", category: "suspension" },
    { title: "Ремонт стартеров и генераторов", price: "5 000 ₽", desc: "Производим ремонт, дефектовку таких агрегатов как стартер и генератор. Гарантия на работы.", category: "electric" },
    { title: "Ремонт рулевой рейки", price: "5 000 ₽", desc: "Грамотно производим ремонт рулевых реек, в том числе отечественных автомобилей. Гарантия.", category: "steering" },
    { title: "Ремонт МКПП", price: "7 000 ₽", desc: "Производим грамотный ремонт механических коробок переключения передач, а так же обслуживание, замену масла.", category: "transmission" },
    { title: "Замена сцепления МКПП", price: "5 000 ₽", desc: "Производим замену сцепления механических кпп. Стоимость услуги зависит от марки автомобиля.", category: "transmission" },
    { title: "Аппаратная замена антифриза + промывка системы охлаждения", price: "2 500 ₽", desc: "Оказываем услуги по аппаратной замене антифриза, а также делаем промывку системы охлаждения в два этапа с применением химии.", category: "cooling" },
    { title: "Замена тормозных колодок, дисков и барабанов", price: "1 000 ₽", desc: "Делаем замену колодок, тормозных дисков и барабанов. Также производим полный спектр обслуживания тормозной системы, в том числе с электроручником.", category: "brakes" },
    { title: "Замена масла в АКПП", price: "2 000 ₽", desc: "Производим частичную замену масла в акпп, вариатора, ркпп и т. д. Замена фильтра со снятием поддона, замену фильтра с разбором акпп.", category: "transmission" },
    { title: "Мойка радиаторов", price: "2 000 ₽", desc: "Производим мойку радиаторов автомобиля, так как забитые радиаторы приводят к перегреву системы охлаждения, а также плохой работе кондиционера.", category: "cooling" },
    { title: "Заправка фреоном автокондиционеров", price: "500 ₽", desc: "Производим АППАРАТНУЮ заправку автокондиционеров, а также ремонт, обслуживание.", category: "ac" },
    { title: "Регулировка Сход - развал", price: "1 500 ₽", desc: "Регулировка углов установки колёс производится на своевременно обслуженном и откалиброванном оборудование. Раз год обновляется база автомобилей.", category: "wheel" },
    { title: "Ремонт ГБЦ", price: "10 000 ₽", desc: "Производим ремонт двигателей, ГБЦ, а также снятие-установку агрегатов.", category: "engine" },
    { title: "Замена масла в двигателе", price: "1 000 ₽", desc: "Замена моторного масла и фильтра.", category: "engine" },
    { title: "Другое", price: "по запросу", desc: "Иные виды работ — уточняйте по телефону, подберём решение под ваш случай.", category: "other" },
  ];

  const categoryLabels = {
    engine: "Двигатель",
    brakes: "Тормозная система",
    suspension: "Подвеска",
    steering: "Рулевое управление",
    transmission: "Трансмиссия",
    electric: "Электрика",
    climate: "Климат (печка)",
    ac: "Кондиционер",
    cooling: "Система охлаждения",
    wheel: "Сход-развал",
    other: "Другое",
  };

  function catalogImagePath(indexInCatalog) {
    return "img/service-" + (1 + indexInCatalog) + ".jpg";
  }

  /**
   * Открытие Яндекс.Навигатор с карточкой организации
   * Сначала пытается открыть приложение, если не установлено - открывает веб-версию
   */
  function openYandexNavigator() {
    console.log("Открываем Яндекс.Навигатор: " + YANDEX_NAVI_ORG_URL);

    // Пытаемся открыть через схему (если приложение установлено)
    window.location.href = YANDEX_NAVI_SCHEME;

    // Если через 2 секунды не открылось, открываем веб-версию
    setTimeout(() => {
      window.open(YANDEX_NAVI_ORG_URL, "_blank", "noopener,noreferrer");
    }, 2000);
  }

  function openMapsOrgFallback() {
    window.open(MAPS_ORG_URL, "_blank", "noopener,noreferrer");
  }

  let toastTimeout = null;

  function showToast(message, isError = false) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;

    if (isError) {
      toast.style.background = "rgba(227, 6, 19, 0.9)";
      toast.style.borderColor = "#ff1a28";
    } else {
      toast.style.background = "var(--surface)";
      toast.style.borderColor = "var(--border)";
    }

    requestAnimationFrame(() => toast.classList.add("is-visible"));
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove("is-visible");
      setTimeout(() => {
        toast.hidden = true;
        toast.style.background = "";
        toast.style.borderColor = "";
      }, 400);
    }, 4500);
  }

  function buildRoute() {
    showToast("📍 Открываем Яндекс.Навигатор...");
    openYandexNavigator();
  }

  function imgFallbackAttr() {
    return ` onerror="this.onerror=null;this.src='${IMG_FALLBACK}'"`;
  }

  function renderCatalog(filter) {
    const grid = document.getElementById("catalog-grid");
    if (!grid) return;
    grid.innerHTML = "";
    services.forEach((item, index) => {
      if (filter !== "all" && item.category !== filter) return;
      const card = document.createElement("article");
      card.className = "service-card";
      const imgSrc = catalogImagePath(index);
      card.innerHTML = `
        <div class="service-card__img">
          <img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(item.title)}" width="400" height="250" loading="lazy"${imgFallbackAttr()} />
        </div>
        <div class="service-card__body">
          <h3 class="service-card__title">${escapeHtml(item.title)}</h3>
          <p class="service-card__price${item.price === "по запросу" ? " service-card__price--muted" : ""}">${escapeHtml(item.price)}</p>
          <p class="service-card__desc">${escapeHtml(item.desc)}</p>
          <p class="service-card__meta">${escapeHtml(categoryLabels[item.category] || "")}</p>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function initFilters() {
    const chips = document.querySelectorAll(".filter-chip");
    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        const filter = chip.getAttribute("data-filter") || "all";
        chips.forEach(c => c.classList.toggle("is-active", c === chip));
        renderCatalog(filter);
      });
    });
  }

  function initBurger() {
    const burger = document.getElementById("burger");
    const nav = document.getElementById("nav");
    if (!burger || !nav) return;
    burger.addEventListener("click", () => {
      const isOpen = nav.classList.contains("is-open");
      nav.classList.toggle("is-open", !isOpen);
      burger.classList.toggle("is-open", !isOpen);
      burger.setAttribute("aria-expanded", !isOpen ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        burger.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  function bindRouteButtons() {
    const buttonIds = ["btn-route", "btn-route-2", "btn-route-footer"];
    buttonIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("click", (e) => {
          e.preventDefault();
          buildRoute();
        });
      }
    });
  }

  async function sendTelegramNotification(bookingData) {
    if (TELEGRAM_CHAT_ID === 0) {
      console.warn("⚠️ Telegram Chat ID не настроен");
      return false;
    }

    const message = `
📢 <b>НОВАЯ ЗАЯВКА НА ЗАПИСЬ!</b>
━━━━━━━━━━━━━━━━━━━━━
👤 <b>Имя:</b> ${escapeHtml(bookingData.name)}
📞 <b>Телефон:</b> ${escapeHtml(bookingData.phone)}
🚗 <b>Пожелания:</b> ${escapeHtml(bookingData.comment || "—")}
━━━━━━━━━━━━━━━━━━━━━
🕐 <b>Время:</b> ${new Date().toLocaleString("ru-RU")}
📍 <b>Источник:</b> Сайт БМ Автоцентр
    `;

    try {
      const response = await fetch(TELEGRAM_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message, parse_mode: "HTML" }),
      });
      const result = await response.json();
      return result.ok;
    } catch (error) {
      console.error("Ошибка отправки в Telegram:", error);
      return false;
    }
  }

  function initBookingForm() {
    const form = document.getElementById("booking-form");
    if (!form) return;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const payload = {
        name: String(fd.get("name") || "").trim(),
        phone: String(fd.get("phone") || "").trim(),
        comment: String(fd.get("comment") || "").trim(),
      };
      if (!payload.name || !payload.phone) {
        showToast("❌ Укажите имя и телефон.", true);
        return;
      }
      const submitBtn = form.querySelector(".booking__submit");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Отправка...";
      submitBtn.disabled = true;
      try {
        const sent = await sendTelegramNotification(payload);
        if (sent) {
          showToast("✅ Заявка принята! Мы перезвоним.");
        } else {
          showToast("⚠️ Заявка принята. Мы свяжемся с вами.");
        }
        form.reset();
      } catch (error) {
        showToast("❌ Ошибка. Попробуйте позвонить.", true);
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());
    renderCatalog("all");
    initFilters();
    initBurger();
    bindRouteButtons();
    initBookingForm();
  });
})();
