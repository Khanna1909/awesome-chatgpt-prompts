# AI Future Prompt Library

Профессиональная библиотека промптов для создания инфографик в нейросетях.

## Что внутри

- 50 стилей инфографики
- 5 категорий
- поиск по библиотеке
- фильтры по категориям
- карточки промптов
- модальное окно с полным промптом
- кнопка копирования
- светлая и темная тема
- адаптив под телефон

## Структура проекта

```text
AI-Future-Prompt-Library/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
├── data/
│   └── prompts.json
└── README.md
```

## Как открыть

Локально лучше открывать через простой сервер, потому что браузеры могут блокировать загрузку JSON при открытии файла напрямую.

```bash
python -m http.server 8080
```

Затем открыть:

```text
http://localhost:8080/AI-Future-Prompt-Library/
```

## Как включить GitHub Pages

1. Откройте репозиторий на GitHub.
2. Перейдите в Settings.
3. Откройте Pages.
4. В разделе Build and deployment выберите:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /root
5. Сохраните.
6. Сайт будет доступен по адресу:

```text
https://khanna1909.github.io/awesome-chatgpt-prompts/AI-Future-Prompt-Library/
```

Если в репозитории ветка называется master, выберите master вместо main.

## Как добавлять новые промпты

Откройте файл:

```text
data/prompts.json
```

Добавьте новый объект по структуре:

```json
{
  "id": 51,
  "category": "Новая категория",
  "title": "Название стиля",
  "subtitle": "Короткое описание",
  "use": "когда использовать",
  "visual": "визуальный принцип"
}
```

Сайт сам подтянет новые карточки.
