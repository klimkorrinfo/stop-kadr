<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
<title>СТОП-КАДР · ОК Дагомыс</title>
<meta name="description" content="Фотоквест «Стоп-кадр» в ОК Дагомыс — восстанови культовые кинокадры в локациях отеля" />

<!-- Локально собранный CSS (Tailwind скомпилирован заранее — интернет при открытии не нужен) -->
<link rel="stylesheet" href="styles.css">

<!-- Шрифты: Bebas Neue (афишный, для заголовков) + Inter (для текста) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

<style>
  html, body { background: #08080B; }
  body {
    font-family: 'Inter', sans-serif;
    color: #F3EFE4;
    -webkit-tap-highlight-color: transparent;
    overscroll-behavior-y: none;
  }

  /* ===== Плёночное зерно (film grain) — лёгкий шумовой оверлей ===== */
  .film-grain {
    pointer-events: none;
    position: fixed;
    inset: 0;
    z-index: 60;
    opacity: 0.05;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* Виньетка по краям экрана, как в кинотеатре */
  .vignette::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 50;
    pointer-events: none;
    background: radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%);
  }

  /* ===== Перфорация киноплёнки — боковые полосы ===== */
  .sprocket-rail {
    position: fixed;
    top: 0; bottom: 0;
    width: 18px;
    z-index: 40;
    background-color: #050506;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
  }
  .sprocket-rail span {
    width: 8px;
    height: 12px;
    border-radius: 2px;
    background: #1c1a24;
    flex-shrink: 0;
  }

  .screen { display: none; }
  .screen.active { display: block; }

  /* Мерцающий переход между экранами */
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .screen.active { animation: fadeSlideIn .45s ease-out; }

  /* Хлопушка — сигнатурный элемент, "хлопает" при загрузке */
  .clap-top {
    transform-origin: bottom left;
    animation: clapDown .7s cubic-bezier(.34,1.56,.64,1) forwards;
    animation-delay: .15s;
  }
  @keyframes clapDown {
    0%   { transform: rotate(-22deg); }
    60%  { transform: rotate(2deg); }
    100% { transform: rotate(0deg); }
  }

  .gold-text {
    background: linear-gradient(180deg, #F5DA8C 0%, #D4AF37 55%, #A8842A 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .card-frame {
    background: linear-gradient(180deg, #151320 0%, #100E17 100%);
    border: 1px solid rgba(212,175,55,0.18);
  }
  .card-frame:active { transform: scale(.98); }

  .btn-primary {
    background: linear-gradient(180deg, #F0CE6B 0%, #D4AF37 100%);
    color: #100E17;
    box-shadow: 0 10px 30px -8px rgba(212,175,55,0.45);
  }
  .btn-primary:active { transform: scale(.97); }

  .btn-ghost {
    border: 1px solid rgba(243,239,228,0.25);
    color: #F3EFE4;
  }

  .status-dot {
    box-shadow: 0 0 0 4px rgba(212,175,55,0.15);
  }

  .scene-num {
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: .05em;
  }

  ::-webkit-scrollbar { width: 0; height: 0; }

  .loader-clapper {
    animation: clapLoop 1s ease-in-out infinite;
    transform-origin: bottom left;
  }
  @keyframes clapLoop {
    0%, 100% { transform: rotate(0deg); }
    50% { transform: rotate(-18deg); }
  }

  .progress-track { background: rgba(243,239,228,0.08); }
  .progress-fill { background: linear-gradient(90deg, #A8842A, #F0CE6B); transition: width .4s ease; }

  input[type="file"] { display: none; }

  .modal-backdrop {
    background: rgba(5,5,7,0.82);
    backdrop-filter: blur(6px);
  }
</style>
</head>

<body class="bg-reel-black min-h-screen vignette">

<!-- Плёночное зерно поверх всего интерфейса -->
<div class="film-grain"></div>

<!-- Боковые перфорационные рейки, имитирующие киноплёнку -->
<div class="sprocket-rail left-0">
  <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
</div>
<div class="sprocket-rail right-0">
  <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
</div>

<div class="max-w-md mx-auto px-[22px] relative">

  <!-- ============================================================ -->
  <!-- ШАПКА (общая для всех экранов, кроме приветственного) -->
  <!-- ============================================================ -->
  <header id="app-header" class="hidden sticky top-0 z-30 pt-5 pb-3 bg-reel-black/90 backdrop-blur-sm">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9L20 5.5L21 9.5L4 13L3 9Z" fill="#D4AF37"/>
          <path d="M3 9L7 6L11 8.5L7.5 11L3 9Z" fill="#08080B" fill-opacity="0.35"/>
          <path d="M11 8.5L14 5.5L18 8L15 11L11 8.5Z" fill="#08080B" fill-opacity="0.35"/>
          <rect x="3" y="12.5" width="18" height="8" rx="1.2" fill="#D4AF37"/>
        </svg>
        <div>
          <p id="header-team-label" class="text-[10px] tracking-widest2 uppercase text-reel-muted leading-none">ОК Дагомыс</p>
          <p class="scene-num text-xl leading-none gold-text -mt-0.5">СТОП-КАДР</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div id="progress-chip" class="text-[11px] font-semibold text-reel-gold border border-reel-gold/30 rounded-full px-3 py-1.5">
          0 / 10
        </div>
        <a href="admin.html" aria-label="Панель организатора" class="w-8 h-8 rounded-full border border-reel-gold/25 flex items-center justify-center text-reel-muted hover:text-reel-gold flex-shrink-0">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" stroke="currentColor" stroke-width="1.8"/><path d="M19.4 13.5a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V19.5a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1.08-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H4.5a2 2 0 110-4h.09a1.65 1.65 0 001.51-1.08 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H10a1.65 1.65 0 001-1.51V4.5a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V10a1.65 1.65 0 001.51 1h.09a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" stroke-width="1.8"/></svg>
        </a>
      </div>
    </div>
  </header>

  <!-- ============================================================ -->
  <!-- ЭКРАН 1 — ПРИВЕТСТВИЕ -->
  <!-- ============================================================ -->
  <section id="screen-welcome" class="screen active min-h-screen flex flex-col justify-center py-10">

    <div class="clap-top mb-8">
      <svg width="100%" height="150" viewBox="0 0 320 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Нижняя часть хлопушки -->
        <rect x="20" y="55" width="280" height="80" rx="6" fill="#151320" stroke="#D4AF37" stroke-opacity="0.35"/>
        <!-- Диагональные полосы -->
        <g clip-path="url(#clipBody)">
          <rect x="20" y="55" width="280" height="80" fill="#151320"/>
          <g stroke="#D4AF37" stroke-width="10">
            <line x1="10" y1="145" x2="70" y2="55"/>
            <line x1="70" y1="145" x2="130" y2="55"/>
            <line x1="130" y1="145" x2="190" y2="55"/>
            <line x1="190" y1="145" x2="250" y2="55"/>
            <line x1="250" y1="145" x2="310" y2="55"/>
          </g>
        </g>
        <defs>
          <clipPath id="clipBody">
            <rect x="20" y="55" width="280" height="80" rx="6"/>
          </clipPath>
        </defs>
        <!-- Верхняя планка (хлопается) -->
        <g>
          <rect x="14" y="18" width="286" height="26" rx="4" fill="#0D0C12" stroke="#D4AF37" stroke-opacity="0.5"/>
          <g stroke="#D4AF37" stroke-width="8" clip-path="url(#clipTop)">
            <line x1="0" y1="44" x2="24" y2="18"/>
            <line x1="30" y1="44" x2="54" y2="18"/>
            <line x1="60" y1="44" x2="84" y2="18"/>
            <line x1="90" y1="44" x2="114" y2="18"/>
            <line x1="120" y1="44" x2="144" y2="18"/>
            <line x1="150" y1="44" x2="174" y2="18"/>
            <line x1="180" y1="44" x2="204" y2="18"/>
            <line x1="210" y1="44" x2="234" y2="18"/>
            <line x1="240" y1="44" x2="264" y2="18"/>
            <line x1="270" y1="44" x2="294" y2="18"/>
          </g>
          <defs>
            <clipPath id="clipTop">
              <rect x="14" y="18" width="286" height="26" rx="4"/>
            </clipPath>
          </defs>
        </g>
      </svg>
    </div>

    <p class="text-center text-[11px] tracking-widest2 uppercase text-reel-gold mb-3">ОК Дагомыс представляет</p>
    <h1 class="scene-num text-center text-[64px] leading-[0.9] gold-text mb-1">СТОП-КАДР</h1>
    <p class="scene-num text-center text-2xl text-reel-cream tracking-widest2 uppercase mb-6">фотоквест</p>

    <p class="text-center text-reel-muted text-[15px] leading-relaxed px-2 mb-10">
      Восстанови культовые сцены из легендарных фильмов прямо в локациях отеля.
      10 кадров — 10 ролей. Камера, мотор, снято!
    </p>

    <button id="btn-start" class="btn-primary w-full py-4 rounded-2xl font-bold text-[17px] tracking-wide uppercase">
      🎬 Начать съёмку!
    </button>

    <p class="text-center text-reel-muted text-xs mt-5">
      Нажимая «Начать», вы соглашаетесь на публикацию кадра в фотоотчёте отеля
    </p>

    <a href="admin.html" class="btn-ghost w-full py-3.5 rounded-2xl font-semibold text-[14px] mt-4 flex items-center justify-center gap-2">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" stroke="currentColor" stroke-width="1.8"/><path d="M19.4 13.5a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V19.5a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1.08-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H4.5a2 2 0 110-4h.09a1.65 1.65 0 001.51-1.08 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H10a1.65 1.65 0 001-1.51V4.5a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V10a1.65 1.65 0 001.51 1h.09a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" stroke-width="1.8"/></svg>
      Я организатор — редактировать сцены
    </a>
  </section>

  <!-- ============================================================ -->
  <!-- ЭКРАН 1.5 — НАЗВАНИЕ КИНОКОМАНДЫ -->
  <!-- ============================================================ -->
  <section id="screen-team" class="screen min-h-screen flex flex-col justify-center py-10">
    <p class="scene-num text-center text-reel-gold text-sm tracking-widest2 uppercase mb-2">Перед стартом</p>
    <h1 class="scene-num text-center text-4xl gold-text mb-6">Название команды</h1>
    <p class="text-center text-reel-muted text-[14px] leading-relaxed px-2 mb-8">
      Придумайте название своей кинокоманды — оно будет указано под каждым присланным кадром.
    </p>
    <input
      id="team-name-input"
      type="text"
      maxlength="60"
      placeholder="Например: Оскароносцы"
      class="w-full bg-reel-panel2 border border-reel-gold/25 rounded-2xl px-4 py-4 text-reel-cream text-center text-lg placeholder:text-reel-muted focus:outline-none focus:border-reel-gold mb-5"
    />
    <button id="btn-team-continue" class="btn-primary w-full py-4 rounded-2xl font-bold text-[17px] tracking-wide uppercase">
      Продолжить
    </button>
    <p id="team-name-error" class="hidden text-center text-red-400 text-xs mt-3">Введите название команды</p>
  </section>

  <!-- ============================================================ -->
  <!-- ЭКРАН 2 — СПИСОК ЗАДАНИЙ -->
  <!-- ============================================================ -->
  <section id="screen-tasks" class="screen pb-10">

    <div class="mb-5">
      <div class="progress-track h-1.5 rounded-full overflow-hidden">
        <div id="progress-fill" class="progress-fill h-full rounded-full" style="width:0%"></div>
      </div>
      <p class="text-reel-muted text-xs mt-2">Сыграно сцен: <span id="progress-label" class="text-reel-gold font-semibold">0 из 10</span></p>
    </div>

    <div id="task-list" class="flex flex-col gap-4">
      <!-- Карточки заданий генерируются в script.js -->
    </div>
  </section>

  <!-- ============================================================ -->
  <!-- ЭКРАН 3 — ЗАГРУЗКА ФОТО ДЛЯ ВЫБРАННОГО ЗАДАНИЯ -->
  <!-- ============================================================ -->
  <section id="screen-upload" class="screen pb-10">
    <button id="btn-back-to-list" class="flex items-center gap-1.5 text-reel-muted text-sm mb-4">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      К списку сцен
    </button>

    <div class="card-frame rounded-2xl p-5 mb-5">
      <p id="upload-scene-num" class="scene-num text-reel-gold text-sm tracking-widest2 uppercase mb-1">Сцена 01</p>
      <h2 id="upload-title" class="scene-num text-3xl gold-text mb-2">Титаник</h2>
      <p id="upload-desc" class="text-reel-cream/85 text-[15px] leading-relaxed"></p>
    </div>

    <div class="rounded-2xl overflow-hidden mb-5 border border-reel-gold/20 relative">
      <!-- Образец кадра: подставьте сюда свою картинку через placeholder.jpg или используйте data-image в script.js -->
      <img id="upload-sample" src="images/01-titanic.jpg" alt="Образец кадра" class="w-full aspect-[4/5] object-cover bg-reel-panel"/>
      <span class="absolute top-3 left-3 text-[10px] tracking-widest2 uppercase bg-reel-black/70 text-reel-gold px-2.5 py-1 rounded-full border border-reel-gold/30">Образец</span>
    </div>

    <!-- Область предпросмотра выбранного фото пользователя -->
    <div id="preview-wrap" class="hidden rounded-2xl overflow-hidden mb-5 border border-reel-gold/40">
      <img id="preview-img" class="w-full aspect-[4/5] object-cover" />
    </div>

    <label for="photo-input" id="btn-take-photo" class="btn-ghost w-full py-4 rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-2 cursor-pointer">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 8a2 2 0 012-2h1l1.2-1.6A1 1 0 019 4h6a1 1 0 01.8.4L17 6h1a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="13" r="3.3" stroke="currentColor" stroke-width="1.8"/></svg>
      <span id="btn-take-photo-label">Сфотографировать или прикрепить файл</span>
    </label>
    <!-- Без атрибута capture: телефон предложит выбор — снять камерой или выбрать файл из галереи -->
    <input type="file" id="photo-input" accept="image/*" />

    <button id="btn-send" class="btn-primary w-full py-4 rounded-2xl font-bold text-[17px] tracking-wide uppercase mt-3 hidden">
      Отправить на монтаж
    </button>

    <p id="upload-hint" class="text-center text-reel-muted text-xs mt-4">Можно сделать новое фото или прикрепить готовое</p>
  </section>
  <!-- (конец экрана загрузки фото) -->

  <!-- ============================================================ -->
  <!-- ЭКРАН 4 — ФИНАЛ (все 10 сцен сыграны) -->
  <!-- ============================================================ -->
  <section id="screen-finale" class="screen min-h-screen flex flex-col justify-center py-10 text-center">
    <p class="scene-num text-reel-gold text-2xl tracking-widest2 mb-2">ЭТО БЫЛ...</p>
    <h1 class="scene-num text-[56px] leading-[0.9] gold-text mb-6">ВЫШЕ! ПРОРАБ!</h1>
    <p class="text-reel-cream/85 text-[15px] leading-relaxed px-2 mb-10">
      Вы сыграли все 10 культовых сцен. Съёмочная группа ОК Дагомыс аплодирует стоя.
      Загляните на ресепшен — вас ждёт сюрприз от режиссёра!
    </p>
    <button id="btn-finale-restart" class="btn-ghost w-full py-4 rounded-2xl font-semibold text-[15px]">
      Пересмотреть список сцен
    </button>
  </section>

</div>

<!-- ============================================================ -->
<!-- МОДАЛЬНОЕ ОКНО — статус отправки на монтаж -->
<!-- ============================================================ -->
<div id="status-modal" class="fixed inset-0 z-50 hidden items-center justify-center modal-backdrop px-6">
  <div class="card-frame rounded-2xl p-7 w-full max-w-xs text-center">

    <div id="status-loading" class="hidden">
      <svg class="loader-clapper mx-auto mb-4" width="56" height="56" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="10" width="18" height="9" rx="1.2" fill="#D4AF37"/>
        <rect x="2.5" y="5" width="19" height="4.5" rx="1" fill="#F0CE6B"/>
      </svg>
      <p class="scene-num text-xl text-reel-cream tracking-wide">Мотор... Съёмка...</p>
      <p class="text-reel-muted text-sm mt-1">Отправляем кадр в монтажную</p>
    </div>

    <div id="status-success" class="hidden">
      <div class="w-14 h-14 rounded-full bg-reel-gold/15 border border-reel-gold flex items-center justify-center mx-auto mb-4">
        <span class="text-3xl">🎬</span>
      </div>
      <p class="scene-num text-2xl gold-text tracking-wide mb-1">Кадр принят!</p>
      <p class="text-reel-cream/80 text-sm">Режиссёр уже оценивает 🎬</p>
      <button id="btn-status-continue" class="btn-primary w-full py-3.5 rounded-xl font-bold text-sm uppercase mt-6">Дальше</button>
    </div>

    <div id="status-error" class="hidden">
      <div class="w-14 h-14 rounded-full bg-red-500/10 border border-red-400/50 flex items-center justify-center mx-auto mb-4">
        <span class="text-3xl">🎞️</span>
      </div>
      <p class="scene-num text-2xl text-reel-cream tracking-wide mb-1">Дубль не удался</p>
      <p class="text-reel-muted text-sm">Проверьте связь и попробуйте снова</p>
      <button id="btn-status-retry" class="btn-primary w-full py-3.5 rounded-xl font-bold text-sm uppercase mt-6">Повторить</button>
    </div>

  </div>
</div>

<script src="script.js"></script>
</body>
</html>
