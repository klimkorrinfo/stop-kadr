// =====================================================================
// 0. АВАРИЙНЫЙ ИНДИКАТОР ОШИБОК
// Если в каком-то браузере всё же произойдёт непредвиденная ошибка,
// показываем её прямо на экране вместо тихого "ничего не происходит" —
// это сильно упрощает диагностику проблем на конкретных устройствах.
// =====================================================================
function showFatalErrorBanner(message) {
  let banner = document.getElementById("fatal-error-banner");
  if (!banner) {
    banner = document.createElement("div");
    banner.id = "fatal-error-banner";
    banner.style.cssText =
      "position:fixed;bottom:0;left:0;right:0;z-index:9999;background:#3a0d0d;" +
      "color:#fff;padding:10px 14px;font-size:12px;font-family:monospace;" +
      "white-space:pre-wrap;max-height:40vh;overflow:auto;border-top:2px solid #ff6b6b;";
    document.body.appendChild(banner);
  }
  banner.textContent = "⚠️ Ошибка на странице (пришлите этот текст разработчику): " + message;
}

window.addEventListener("error", (e) => {
  showFatalErrorBanner(e.message);
});
window.addEventListener("unhandledrejection", (e) => {
  showFatalErrorBanner(e.reason && e.reason.message ? e.reason.message : String(e.reason));
});

// =====================================================================
// СТОП-КАДР — логика фронтенда
// Переключение экранов, рендер списка заданий, работа с камерой,
// отправка фото на Netlify Function (которая шлёт в Telegram)
// и панель организатора (редактирование/удаление сцен по паролю)
// =====================================================================

// ---------------------------------------------------------------------
// 1. ИСХОДНЫЙ СПИСОК ЗАДАНИЙ (используется как "фабричный сброс")
// Поле "sample" — путь к вашей картинке-образцу.
// Замените "placeholder.jpg" на свои файлы, например "images/01-titanic.jpg"
// ---------------------------------------------------------------------
const DEFAULT_TASKS = [
  { id: 1, film: "Титаник", desc: "Найдите на территории комплекса перила. Раскиньте руки, как крылья, в стороны и насладитесь моментом беспечности.", sample: "images/01-titanic.jpg" },
  { id: 2, film: "Матрица", desc: "Найдите удобное место на фоне главного корпуса, где можно эффектно отклониться назад, уворачиваясь от «пуль».", sample: "images/02-matrix.jpg" },
  { id: 3, film: "Сияние", desc: "Выгляните из-за угла коридора с безумной, широкой улыбкой.", sample: "images/03-shining.jpg" },
  { id: 4, film: "Ла-Ла Ленд", desc: "Встаньте в силуэт на фоне яркого окна или заката в танцевальной позе.", sample: "images/04-lalaland.jpg" },
  { id: 5, film: "Один дома", desc: "Прижмите ладони к щекам и изобразите крик у любой двери или зеркала.", sample: "images/05-homealone.jpg" },
  { id: 6, film: "Кин-дза-дза", desc: "Поприветствуй всех легендарным «Ку!»", sample: "images/06-kindzadza.jpg" },
  { id: 7, film: "Рокки", desc: "Торжественно вскиньте руки вверх буквой «V», стоя на лестнице.", sample: "images/07-rocky.jpg" },
  { id: 8, film: "Криминальное чтиво", desc: "Изобразите комичный твист-танец в любом просторном месте.", sample: "images/08-pulpfiction.jpg" },
  { id: 9, film: "Миссия невыполнима", desc: "Почувствуй себя известным шпионом, замри неподвижно как Том Круз.", sample: "images/09-missionimpossible.jpg" },
  { id: 10, film: "Звёздные войны", desc: "Встаньте друг напротив друга и вытяните руки, как будто держите световые мечи.", sample: "images/10-starwars.jpg" },
];

// Ключ, под которым список сцен (изменённый организатором) хранится в этом браузере
const TASKS_STORAGE_KEY = "stopkadr_tasks_v1";

// Ключ, под которым хранится название кинокоманды (введённое гостем) в этом браузере
const TEAM_NAME_STORAGE_KEY = "stopkadr_team_name";

// Адрес serverless-функции, принимающей фото и отправляющей его в Telegram.
// При деплое на Netlify этот путь работает автоматически "из коробки".
const UPLOAD_ENDPOINT = "/.netlify/functions/sendPhoto";

// Пароль для входа в панель организатора.
// ВАЖНО: это простая защита от случайных гостей, а не настоящая безопасность —
// пароль виден любому, кто откроет исходный код страницы в браузере.
const ADMIN_PASSWORD = "2026";
const ADMIN_SESSION_KEY = "stopkadr_admin_authed";

// ---------------------------------------------------------------------
// 2. ТЕКУЩИЙ РАБОЧИЙ СПИСОК ЗАДАНИЙ
// Загружается из localStorage, если организатор уже что-то менял в этом браузере,
// иначе используется список по умолчанию.
// ---------------------------------------------------------------------
function loadTasks() {
  try {
    const raw = localStorage.getItem(TASKS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("Не удалось прочитать сохранённый список сцен, используем список по умолчанию", e);
  }
  return DEFAULT_TASKS.map((t) => ({ ...t }));
}

function saveTasks(tasks) {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.warn("Не удалось сохранить список сцен в этом браузере", e);
  }
}

let TASKS = loadTasks();

// ---------------------------------------------------------------------
// 3. СОСТОЯНИЕ ПРИЛОЖЕНИЯ
// ---------------------------------------------------------------------
const state = {
  completed: new Set(),   // id заданий, которые уже сняты (в рамках текущей сессии)
  currentTaskId: null,    // задание, открытое сейчас на экране загрузки
  selectedFile: null,     // выбранный файл фото
};

// Рабочая копия списка, которую редактирует организатор в панели —
// изменения применяются только по нажатию "Сохранить"
let adminWorkingTasks = [];

// ---------------------------------------------------------------------
// 4. УТИЛИТЫ ПЕРЕКЛЮЧЕНИЯ ЭКРАНОВ
// ---------------------------------------------------------------------
function showScreen(id) {
  document.querySelectorAll(".screen").forEach((el) => el.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  const header = document.getElementById("app-header");
  const screensWithHeader = ["screen-tasks", "screen-upload", "screen-finale"];
  if (screensWithHeader.includes(id)) {
    header.classList.remove("hidden");
  } else {
    header.classList.add("hidden");
  }

  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

function updateProgressUI() {
  const done = state.completed.size;
  const total = TASKS.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  document.getElementById("progress-chip").textContent = `${done} / ${total}`;
  document.getElementById("progress-fill").style.width = pct + "%";
  document.getElementById("progress-label").textContent = `${done} из ${total}`;
}

// ---------------------------------------------------------------------
// 5. РЕНДЕР СПИСКА ЗАДАНИЙ (гостевой экран)
// ---------------------------------------------------------------------
function renderTaskList() {
  const wrap = document.getElementById("task-list");
  wrap.innerHTML = "";

  if (TASKS.length === 0) {
    wrap.innerHTML = `<p class="text-reel-muted text-sm text-center py-10">Сцены пока не добавлены. Загляните позже.</p>`;
    return;
  }

  TASKS.forEach((task, index) => {
    const isDone = state.completed.has(task.id);

    const card = document.createElement("div");
    card.className = "card-frame rounded-2xl p-4 flex gap-4 items-center";

    card.innerHTML = `
      <div class="relative w-20 h-24 flex-shrink-0 rounded-xl overflow-hidden border border-reel-gold/25 bg-reel-panel2">
        <img src="${escapeAttr(task.sample)}" alt="${escapeAttr(task.film)}" class="w-full h-full object-cover" />
        ${isDone ? `<div class="absolute inset-0 bg-reel-black/60 flex items-center justify-center text-2xl">✅</div>` : ""}
      </div>
      <div class="flex-1 min-w-0">
        <p class="scene-num text-reel-gold text-xs tracking-widest2 uppercase mb-0.5">Сцена ${String(index + 1).padStart(2, "0")}</p>
        <p class="scene-num text-2xl leading-none text-reel-cream mb-1.5">${escapeHtml(task.film)}</p>
        <p class="text-reel-muted text-[13px] leading-snug line-clamp-2">${escapeHtml(task.desc)}</p>
      </div>
      <button
        class="btn-task flex-shrink-0 text-xs font-bold uppercase tracking-wide px-3 py-2.5 rounded-xl ${isDone ? "btn-ghost opacity-70" : "btn-primary"}"
        data-task-id="${task.id}"
      >
        ${isDone ? "Готово" : "Кадр"}
      </button>
    `;

    wrap.appendChild(card);
  });

  document.querySelectorAll(".btn-task").forEach((btn) => {
    btn.addEventListener("click", () => openUploadScreen(Number(btn.dataset.taskId)));
  });
}

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}
function escapeAttr(str) {
  return escapeHtml(str);
}

// ---------------------------------------------------------------------
// 6. ЭКРАН ЗАГРУЗКИ КОНКРЕТНОГО ЗАДАНИЯ
// ---------------------------------------------------------------------
function openUploadScreen(taskId) {
  const index = TASKS.findIndex((t) => t.id === taskId);
  const task = TASKS[index];
  if (!task) return;

  state.currentTaskId = taskId;
  state.selectedFile = null;

  document.getElementById("upload-scene-num").textContent = `Сцена ${String(index + 1).padStart(2, "0")}`;
  document.getElementById("upload-title").textContent = task.film;
  document.getElementById("upload-desc").textContent = task.desc;
  document.getElementById("upload-sample").src = task.sample;

  // Сброс предпросмотра и кнопок к исходному состоянию
  document.getElementById("preview-wrap").classList.add("hidden");
  document.getElementById("btn-send").classList.add("hidden");
  document.getElementById("btn-take-photo-label").textContent = "Сфотографировать или прикрепить файл";
  document.getElementById("upload-hint").textContent = "Можно сделать новое фото или прикрепить готовое";
  document.getElementById("photo-input").value = "";

  showScreen("screen-upload");
}

// Пользователь выбрал/снял фото
document.getElementById("photo-input").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  state.selectedFile = file;

  const previewUrl = URL.createObjectURL(file);
  const previewImg = document.getElementById("preview-img");
  previewImg.src = previewUrl;

  document.getElementById("preview-wrap").classList.remove("hidden");
  document.getElementById("btn-send").classList.remove("hidden");
  document.getElementById("btn-take-photo-label").textContent = "Заменить фото";
  document.getElementById("upload-hint").textContent = "Нравится кадр? Отправляйте на монтаж";
});

document.getElementById("btn-back-to-list").addEventListener("click", () => {
  showScreen("screen-tasks");
});

// ---------------------------------------------------------------------
// 6.5. НАЗВАНИЕ КИНОКОМАНДЫ
// ---------------------------------------------------------------------
function getTeamName() {
  try {
    return (localStorage.getItem(TEAM_NAME_STORAGE_KEY) || "").trim();
  } catch (e) {
    return "";
  }
}

function setTeamName(name) {
  try {
    localStorage.setItem(TEAM_NAME_STORAGE_KEY, name);
  } catch (e) {
    console.warn("Не удалось сохранить название команды в этом браузере", e);
  }
  const label = document.getElementById("header-team-label");
  if (label) label.textContent = name ? `Команда «${name}»` : "ОК Дагомыс";
}

document.getElementById("btn-team-continue").addEventListener("click", () => {
  const input = document.getElementById("team-name-input");
  const name = input.value.trim();
  const errorEl = document.getElementById("team-name-error");

  if (!name) {
    errorEl.classList.remove("hidden");
    return;
  }
  errorEl.classList.add("hidden");
  setTeamName(name);

  renderTaskList();
  updateProgressUI();
  showScreen("screen-tasks");
});

// ---------------------------------------------------------------------
// 7. ОТПРАВКА ФОТО НА СЕРВЕР (Netlify Function -> Telegram)
// ---------------------------------------------------------------------
document.getElementById("btn-send").addEventListener("click", sendPhotoToServer);
document.getElementById("btn-status-retry").addEventListener("click", sendPhotoToServer);

async function sendPhotoToServer() {
  if (!state.selectedFile || state.currentTaskId === null) return;

  const task = TASKS.find((t) => t.id === state.currentTaskId);
  if (!task) return;
  showStatusModal("loading");

  try {
    const formData = new FormData();
    formData.append("photo", state.selectedFile);
    formData.append("taskId", String(task.id));
    formData.append("filmTitle", task.film);
    formData.append("teamName", getTeamName());

    const response = await fetch(UPLOAD_ENDPOINT, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Ошибка сервера: " + response.status);
    }

    // Успех — помечаем задание выполненным
    state.completed.add(task.id);
    updateProgressUI();
    showStatusModal("success");
  } catch (err) {
    console.error("Не удалось отправить фото:", err);
    showStatusModal("error");
  }
}

function showStatusModal(mode) {
  const modal = document.getElementById("status-modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  ["loading", "success", "error"].forEach((m) => {
    document.getElementById(`status-${m}`).classList.toggle("hidden", m !== mode);
  });
}

function hideStatusModal() {
  const modal = document.getElementById("status-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

document.getElementById("btn-status-continue").addEventListener("click", () => {
  hideStatusModal();
  renderTaskList();
  updateProgressUI();

  if (TASKS.length > 0 && state.completed.size === TASKS.length) {
    showScreen("screen-finale");
  } else {
    showScreen("screen-tasks");
  }
});

// ---------------------------------------------------------------------
// 8. НАВИГАЦИЯ МЕЖДУ ГЛАВНЫМИ ЭКРАНАМИ
// ---------------------------------------------------------------------
document.getElementById("btn-start").addEventListener("click", () => {
  const existingName = getTeamName();
  if (existingName) {
    // Название уже вводили в этом браузере — не спрашиваем повторно
    setTeamName(existingName);
    renderTaskList();
    updateProgressUI();
    showScreen("screen-tasks");
  } else {
    showScreen("screen-team");
  }
});

document.getElementById("btn-finale-restart").addEventListener("click", () => {
  renderTaskList();
  showScreen("screen-tasks");
});


// ---------------------------------------------------------------------
// 10. ИНИЦИАЛИЗАЦИЯ
// ---------------------------------------------------------------------
setTeamName(getTeamName());
renderTaskList();
updateProgressUI();
