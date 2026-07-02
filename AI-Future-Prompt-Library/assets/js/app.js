const state = { prompts: [], category: 'Все', query: '' };
const grid = document.querySelector('#grid');
const filters = document.querySelector('#filters');
const search = document.querySelector('#search');
const themeBtn = document.querySelector('#themeBtn');

function createPrompt(item) {
  return `Вы - арт-директор международной дизайн-студии, специализирующейся на сложных образовательных инфографиках, визуальных объяснениях и редакционных спецпроектах. Создайте профессиональную инфографику в стиле "${item.title}" на тему "[ТЕМА]".

Цель инфографики - быстро, красиво и понятно объяснить тему человеку, который видит ее впервые. Инфографика должна быть не декоративной картинкой, а полноценной визуальной системой: с логикой, иерархией, структурой и короткими понятными пояснениями.

Используйте этот стиль особенно для задач: ${item.use}. Визуальная основа стиля: ${item.visual}. Постройте композицию вокруг одной центральной идеи. Разделите материал на 6-8 смысловых блоков. Каждый блок должен иметь короткий заголовок, мини-пояснение на 1-2 строки и собственный визуальный образ: иконку, сцену, схему, мини-диаграмму или символ.

Композиция: крупный заголовок в верхней части, под ним краткий вводный тезис, затем основная схема из блоков. Между блоками должны быть логичные связи: стрелки, линии, маршруты, уровни, слои или визуальные переходы. Сетка должна быть чистой, с равномерными отступами и ясным движением взгляда от главной идеи к деталям.

Типографика: используйте крупный читаемый заголовок, выразительные подзаголовки и короткие подписи. Текст должен быть на русском языке, без ошибок, без обрезанных букв, без случайных символов и без бессмысленных псевдослов. Не делайте мелкий текст. Если модель плохо пишет текст, оставьте крупные текстовые зоны с понятными короткими заголовками и визуальными маркерами.

Цвет и свет: подберите единую цветовую систему, соответствующую стилю "${item.title}". Контраст между фоном и текстом должен быть высоким. Важные элементы выделяйте цветом, размером или положением, но не перегружайте композицию.

Качество: итог должен выглядеть как готовая инфографика для лендинга, презентации, Telegram-поста, образовательного курса или печатного постера. Уровень исполнения - премиальная дизайн-студия, аккуратная верстка, чистая визуальная иерархия, продуманная композиция, единый дизайн-код.

Ограничения: без хаотичного набора иконок, без перегруза, без водяных знаков, без логотипов реальных брендов, если они не указаны отдельно, без случайных лиц, без лишнего мелкого текста, без визуального мусора. Формат: [укажите формат, например 3:4, 16:9, 1:1 или горизонтальный баннер].`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>\"]/g, symbol => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[symbol]));
}

function buildFilters() {
  const categories = ['Все', ...new Set(state.prompts.map(item => item.category))];
  filters.innerHTML = categories.map(category => `<button type="button" class="${category === state.category ? 'active' : ''}" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join('');
  filters.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      state.category = button.dataset.category;
      buildFilters();
      render();
    });
  });
}

function render() {
  const query = state.query.toLowerCase().trim();
  const items = state.prompts.filter(item => {
    const categoryOk = state.category === 'Все' || item.category === state.category;
    const text = `${item.title} ${item.subtitle} ${item.category} ${item.use} ${item.visual}`.toLowerCase();
    return categoryOk && (!query || text.includes(query));
  });

  if (!items.length) {
    grid.innerHTML = '<p class="empty">Ничего не найдено. Даже алгоритм немного приуныл.</p>';
    return;
  }

  grid.innerHTML = items.map(item => {
    const prompt = createPrompt(item);
    return `
      <article class="prompt-card" id="prompt-${item.id}">
        <div class="topline"><span class="number">${String(item.id).padStart(2, '0')}</span><span>${escapeHtml(item.category)}</span></div>
        <h3>${escapeHtml(item.title)}</h3>
        <div class="subtitle">${escapeHtml(item.subtitle)}</div>
        <p class="desc"><b>Когда использовать:</b> ${escapeHtml(item.use)}</p>
        <p class="desc"><b>Визуальный принцип:</b> ${escapeHtml(item.visual)}</p>
        <div class="card-actions">
          <button class="open" type="button" data-id="${item.id}">Показать промпт</button>
          <button class="copy-small" type="button" data-id="${item.id}">Скопировать</button>
        </div>
        <div class="prompt-panel" data-panel="${item.id}" hidden>
          <pre>${escapeHtml(prompt)}</pre>
        </div>
      </article>
    `;
  }).join('');

  grid.querySelectorAll('.open').forEach(button => {
    button.addEventListener('click', () => togglePrompt(Number(button.dataset.id), button));
  });

  grid.querySelectorAll('.copy-small').forEach(button => {
    button.addEventListener('click', () => copyById(Number(button.dataset.id), button));
  });
}

function togglePrompt(id, button) {
  const panel = grid.querySelector(`[data-panel="${id}"]`);
  if (!panel) return;
  const isHidden = panel.hasAttribute('hidden');
  if (isHidden) {
    panel.removeAttribute('hidden');
    button.textContent = 'Скрыть промпт';
  } else {
    panel.setAttribute('hidden', '');
    button.textContent = 'Показать промпт';
  }
}

async function copyById(id, button) {
  const item = state.prompts.find(prompt => prompt.id === id);
  if (!item) return;
  const text = createPrompt(item);
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = 'Скопировано';
    setTimeout(() => button.textContent = 'Скопировать', 1300);
  } catch (error) {
    const panel = grid.querySelector(`[data-panel="${id}"]`);
    if (panel) panel.removeAttribute('hidden');
    button.textContent = 'Скопируйте вручную';
  }
}

async function loadPrompts() {
  try {
    const response = await fetch('data/prompts.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('JSON not loaded');
    state.prompts = await response.json();
    buildFilters();
    render();
  } catch (error) {
    grid.innerHTML = '<p class="empty">Не удалось загрузить data/prompts.json. Откройте сайт через GitHub Pages, а не через просмотр файла на github.com/blob. Да, GitHub любит путать сайт и склад файлов, удивительно полезная традиция.</p>';
  }
}

search.addEventListener('input', event => {
  state.query = event.target.value;
  render();
});

themeBtn.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
});

if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');

addEventListener('scroll', () => {
  const doc = document.documentElement;
  const progress = doc.scrollTop / (doc.scrollHeight - doc.clientHeight) * 100;
  document.querySelector('#progress').style.width = `${progress}%`;
}, { passive: true });

loadPrompts();
