const state = { prompts: [], category: 'Все', query: '', current: null };
const grid = document.querySelector('#grid');
const filters = document.querySelector('#filters');
const search = document.querySelector('#search');
const modal = document.querySelector('#modal');
const modalCategory = document.querySelector('#modalCategory');
const modalTitle = document.querySelector('#modalTitle');
const modalSubtitle = document.querySelector('#modalSubtitle');
const modalUse = document.querySelector('#modalUse');
const modalVisual = document.querySelector('#modalVisual');
const promptText = document.querySelector('#promptText');
const copyPrompt = document.querySelector('#copyPrompt');
const closeModal = document.querySelector('#closeModal');
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
  return String(value).replace(/[&<>"]/g, symbol => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[symbol]));
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

  grid.innerHTML = items.map(item => `
    <article class="prompt-card">
      <div class="topline"><span class="number">${String(item.id).padStart(2, '0')}</span><span>${escapeHtml(item.category)}</span></div>
      <h3>${escapeHtml(item.title)}</h3>
      <div class="subtitle">${escapeHtml(item.subtitle)}</div>
      <p class="desc">${escapeHtml(item.use)}</p>
      <button class="open" type="button" data-id="${item.id}">Открыть промпт</button>
    </article>
  `).join('') || '<p>Ничего не найдено. Даже алгоритм немного расстроился.</p>';

  grid.querySelectorAll('.open').forEach(button => {
    button.addEventListener('click', () => openPrompt(Number(button.dataset.id)));
  });
}

function openPrompt(id) {
  const item = state.prompts.find(prompt => prompt.id === id);
  if (!item) return;
  state.current = item;
  modalCategory.textContent = item.category;
  modalTitle.textContent = item.title;
  modalSubtitle.textContent = item.subtitle;
  modalUse.textContent = item.use;
  modalVisual.textContent = item.visual;
  promptText.textContent = createPrompt(item);
  copyPrompt.textContent = 'Скопировать промпт';
  modal.showModal();
}

async function loadPrompts() {
  try {
    const response = await fetch('data/prompts.json');
    state.prompts = await response.json();
    buildFilters();
    render();
  } catch (error) {
    grid.innerHTML = '<p>Не удалось загрузить data/prompts.json. Открывайте проект через GitHub Pages или локальный сервер, а не как случайный файл из папки.</p>';
  }
}

search.addEventListener('input', event => {
  state.query = event.target.value;
  render();
});

copyPrompt.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(promptText.textContent);
    copyPrompt.textContent = 'Скопировано';
    setTimeout(() => copyPrompt.textContent = 'Скопировать промпт', 1200);
  } catch (error) {
    copyPrompt.textContent = 'Скопируйте вручную';
  }
});

closeModal.addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {
  const rect = modal.getBoundingClientRect();
  const inDialog = rect.top <= event.clientY && event.clientY <= rect.bottom && rect.left <= event.clientX && event.clientX <= rect.right;
  if (!inDialog) modal.close();
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
