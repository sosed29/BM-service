(function () {
  "use strict";

  /** Координаты точки «БМ автоцентр» (Яндекс.Карты: ll=lon,lat) */
  const DEST_LAT = 45.072376;
  const DEST_LON = 39.021522;
  const MAPS_ORG_URL =
    "https://yandex.ru/maps/org/bm/131521270282/?ll=39.021522%2C45.072376&z=17";

  const IMG_FALLBACK = "img/placeholder.svg";

  /** Telegram Bot Configuration */
  const TELEGRAM_BOT_TOKEN = "8664964975:AAH38cl0YEYfWkYpGCGqv7rRtkwqAAnFAGM";

  // ⚠️⚠️⚠️ ВАЖНО: ЗАМЕНИТЕ 0 НА РЕАЛЬНЫЙ CHAT ID ПОЛУЧЕННЫЙ ИЗ ССЫЛКИ ⚠️⚠️⚠️
  // 1. Откройте в браузере: https://api.telegram.org/bot8664964975:AAH38cl0YEYfWkYpGCGqv7rRtkwqAAnFAGM/getUpdates
  // 2. Найдите "chat":{"id": и скопируйте число (например 123456789)
  // 3. Вставьте это число вместо 0 в строке ниже
  const TELEGRAM_CHAT_ID = 0; // <--- СЮДА ВСТАВЬТЕ CHAT ID

  const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  // --- МАССИВ УСЛУГ (22 карточки, соответствует service-1.jpg до service-22.jpg) ---
  const services = [
    // 1. service-1.jpg
    {
      title: "Эндоскопия",
      price: "2 000 ₽",
      desc: "Производим эндоскопию бензинового ДВС.",
      category: "engine",
    },
    // 2. service-2.jpg
    {
      title: "Замена свечей (за 4 шт.)",
      price: "от 1 000 ₽",
      desc: "Комплексная замена комплекта свечей зажигания.",
      category: "engine",
    },
    // 3. service-3.jpg
    {
      title: "Ремонт (переборка) тормозных суппортов",
      price: "2 000 ₽",
      desc: "Реставрация тормозных суппортов.",
      category: "brakes",
    },
    // 4. service-4.jpg
    {
      title: "Замена сайлентблоков задней балки",
      price: "7 000 ₽",
      desc: "Замена сайлентблоков задней балки легковых автомобилей.",
      category: "suspension",
    },
    // 5. service-5.jpg
    {
      title: "Замена рулевой рейки",
      price: "5 000 ₽",
      desc: "Замена рулевой рейки (съём-установка).",
      category: "steering",
    },
    // 6. service-6.jpg
    {
      title: "Замена ремней и цепей ГРМ",
      price: "5 000 ₽",
      desc: "Замена цепей и ремней ГРМ.",
      category: "engine",
    },
    // 7. service-7.jpg
    {
      title: "Замена радиатора печки со снятием торпедо",
      price: "10 000 ₽",
      desc: "Производим замену радиатора печки как со снятием торпедо, так и без. Многолетний опыт, гарантия.",
      category: "climate",
    },
    // 8. service-8.jpg
    {
      title: "Замена генератора",
      price: "2 500 ₽",
      desc: "Производим снятие-установку генераторов и стартеров любой сложности.",
      category: "electric",
    },
    // 9. service-9.jpg
    {
      title: "Замена ступичного подшипника",
      price: "2 000 ₽",
      desc: "Замена ступиц, подшипников на профессиональном оборудовании путем перепрессовки.",
      category: "suspension",
    },
    // 10. service-10.jpg
    {
      title: "Ремонт стартеров и генераторов",
      price: "5 000 ₽",
      desc: "Производим ремонт, дефектовку таких агрегатов как стартер и генератор. Гарантия на работы.",
      category: "electric",
    },
    // 11. service-11.jpg
    {
      title: "Ремонт рулевой рейки",
      price: "5 000 ₽",
      desc: "Грамотно производим ремонт рулевых реек, в том числе отечественных автомобилей. Гарантия.",
      category: "steering",
    },
    // 12. service-12.jpg
    {
      title: "Ремонт МКПП",
      price: "7 000 ₽",
      desc: "Производим грамотный ремонт механических коробок переключения передач, а так же обслуживание, замену масла.",
      category: "transmission",
    },
    // 13. service-13.jpg
    {
      title: "Замена сцепления МКПП",
      price: "5 000 ₽",
      desc: "Производим замену сцепления механических кпп. Стоимость услуги зависит от марки автомобиля.",
      category: "transmission",
    },
    // 14. service-14.jpg
    {
      title: "Аппаратная замена антифриза + промывка системы охлаждения",
      price: "2 500 ₽",
      desc: "Оказываем услуги по аппаратной замене антифриза, а также делаем промывку системы охлаждения в два этапа с применением химии.",
      category: "cooling",
    },
    // 15. service-15.jpg
    {
      title: "Замена тормозных колодок, дисков и барабанов",
      price: "1 000 ₽",
      desc: "Делаем замену колодок, тормозных дисков и барабанов. Также производим полный спектр обслуживания тормозной системы, в том числе с электроручником.",
      category: "brakes",
    },
    // 16. service-16.jpg
    {
      title: "Замена масла в АКПП",
      price: "2 000 ₽",
      desc: "Производим частичную замену масла в акпп, вариатора, ркпп и т. д. Замена фильтра со снятием поддона, замену фильтра с разбором акпп.",
      category: "transmission",
    },
    // 17. service-17.jpg
    {
      title: "Мойка радиаторов",
      price: "2 000 ₽",
      desc: "Производим мойку радиаторов автомобиля, так как забитые радиаторы приводят к перегреву системы охлаждения, а также плохой работе кондиционера.",
      category: "cooling",
    },
    // 18. service-18.jpg
    {
      title: "Заправка фреоном автокондиционеров",
      price: "500 ₽",
      desc: "Производим АППАРАТНУЮ заправку автокондиционеров, а также ремонт, обслуживание.",
      category: "ac",
    },
    // 19. service-19.jpg
    {
      title: "Регулировка Сход - развал",
      price: "1 500 ₽",
      desc: "Регулировка углов установки колёс производится на своевременно обслуженном и откалиброванном оборудование. Раз год обновляется база автомобилей.",
      category: "wheel",
    },
    // 20. service-20.jpg
    {
      title: "Ремонт ГБЦ",
      price: "10 000 ₽",
      desc: "Производим ремонт двигателей, ГБЦ, а также снятие-установку агрегатов.",
      category: "engine",
    },
    // 21. service-21.jpg
    {
      title: "Замена масла в двигателе",
      price: "1 000 ₽",
      desc: "Замена моторного масла и фильтра.",
      category: "engine",
    },
    // 22. service-22.jpg
    {
      title: "Другое",
      price: "по запросу",
      desc: "Иные виды работ — уточняйте по телефону, подберём решение под ваш случай.",
      category: "other",
    },
  ];

  // --- КАТЕГОРИИ ДЛЯ ФИЛЬТРОВ ---
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
   * Функция построения маршрута в Яндекс.Картах
   * @param {number} lat - широта текущего местоположения
   * @param {number} lon - долгота текущего местоположения
   */
  function openYandexRouteFromPosition(lat, lon) {
    // Формируем параметры маршрута: точка А (текущая) ~ точка Б (автосервис)
    const startPoint = `${lat},${lon}`;
    const endPoint = `${DEST_LAT},${DEST_LON}`;
    const rtext = `${startPoint}~${endPoint}`;

    // Открываем Яндекс.Карты с построенным маршрутом
    const url = `https://yandex.ru/maps/?rtext=${encodeURIComponent(rtext)}&rtt=auto`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  /**
   * Открытие карты сервиса (без маршрута, если геолокация недоступна)
   */
  function openMapsOrgFallback() {
    window.open(MAPS_ORG_URL, "_blank", "noopener,noreferrer");
  }

  let toastTimeout = null;

  function showToast(message, isError = false) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;

    // Стилизуем сообщение об ошибке
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
        // Сбрасываем стили
        toast.style.background = "";
        toast.style.borderColor = "";
      }, 400);
    }, 4500);
  }

  /**
   * Основная функция построения маршрута
   * Определяет геолокацию пользователя и строит маршрут до автосервиса
   */
  function buildRoute() {
    // Проверяем поддержку геолокации браузером
    if (!navigator.geolocation) {
      showToast("❌ Геолокация недоступна в вашем браузере. Открываем карту сервиса.", true);
      openMapsOrgFallback();
      return;
    }

    // Показываем индикатор загрузки
    showToast("📍 Определяем ваше местоположение...");

    // Запрашиваем текущее местоположение
    navigator.geolocation.getCurrentPosition(
      // Успешное получение координат
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log(`📍 Текущее местоположение: ${lat}, ${lon}`);
        openYandexRouteFromPosition(lat, lon);
      },
      // Ошибка получения координат
      (error) => {
        let errorMessage = "";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "❌ Доступ к геолокации запрещен. Разрешите доступ в настройках браузера.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "❌ Не удалось определить местоположение. Проверьте сигнал GPS.";
            break;
          case error.TIMEOUT:
            errorMessage = "❌ Превышено время ожидания геолокации. Попробуйте еще раз.";
            break;
          default:
            errorMessage = "❌ Не удалось определить местоположение.";
            break;
        }
        showToast(errorMessage, true);
        // Открываем карту сервиса без маршрута
        setTimeout(() => {
          openMapsOrgFallback();
        }, 1500);
      },
      {
        enableHighAccuracy: true,  // Использовать высокую точность (GPS)
        timeout: 15000,            // Таймаут 15 секунд
        maximumAge: 30000          // Кэшировать позицию на 30 секунд
      }
    );
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
    // Кнопки, которые должны строить маршрут
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
    // Проверяем, что Chat ID установлен
    if (TELEGRAM_CHAT_ID === 0) {
      console.warn("⚠️ Telegram Chat ID не настроен. Уведомления не отправляются.");
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
      if (result.ok) {
        console.log("✅ Уведомление отправлено в Telegram");
        return true;
      } else {
        console.error("❌ Ошибка Telegram API:", result);
        return false;
      }
    } catch (error) {
      console.error("❌ Ошибка отправки в Telegram:", error);
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
        showToast("❌ Укажите имя и телефон.");
        return;
      }
      const submitBtn = form.querySelector(".booking__submit");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Отправка...";
      submitBtn.disabled = true;
      try {
        const sent = await sendTelegramNotification(payload);
        if (sent) {
          showToast("✅ Заявка принята! Мы перезвоним на указанный номер.");
        } else {
          showToast("⚠️ Заявка принята. Мы свяжемся с вами в ближайшее время.");
        }
        console.log("[БМ запись]", payload);
        form.reset();
      } catch (error) {
        console.error("Ошибка:", error);
        showToast("❌ Произошла ошибка. Попробуйте позвонить по телефону.", true);
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
