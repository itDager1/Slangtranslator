# Backend API Documentation

## Монолитный Backend для Переводчика Сленга

Этот документ описывает API endpoints монолитного backend сервера для сайта-переводчика со сленга на русский.

## Base URL

```
https://{projectId}.supabase.co/functions/v1/make-server-6f7662b1
```

## Авторизация

Все запросы должны включать заголовок:
```
Authorization: Bearer {publicAnonKey}
```

---

## Endpoints

### 1. Health Check

**GET** `/health`

Проверка работоспособности сервера.

**Response:**
```json
{
  "status": "ok",
  "message": "Slang Translator API is running"
}
```

---

### 2. Получить словарь

**GET** `/dictionary`

Получить весь словарь с формами слов и категориями.

**Response:**
```json
{
  "success": true,
  "dictionary": { ... },
  "wordFormsMap": { ... },
  "russianToSlangMap": { ... },
  "categories": ["Все", "Интернет", ...],
  "popularWords": ["чилить", "рофлить", ...]
}
```

---

### 3. Перевод текста

**POST** `/translate`

Перевести слово или предложение.

**Request Body:**
```json
{
  "text": "чилить",
  "mode": "slangToRussian" // или "russianToSlang"
}
```

**Response (одно слово):**
```json
{
  "success": true,
  "translation": {
    "word": "Чилить",
    "definition": "Отдыхать, расслабляться...",
    "shortTranslation": "отдыхать",
    "examples": ["Сегодня весь день чилил дома"],
    "category": "Общение"
  }
}
```

**Response (предложение):**
```json
{
  "success": true,
  "translation": {
    "word": "я вчера чилил",
    "definition": "я вчера отдыхать",
    "explanations": [
      {
        "word": "чилил",
        "explanation": "Отдыхать, расслабляться..."
      }
    ],
    "category": "Перевод"
  }
}
```

---

### 4. Поиск/Автодополнение

**GET** `/search?q={query}&mode={mode}&limit={limit}`

Поиск слов для автодополнения.

**Parameters:**
- `q` (required): Поисковый запрос
- `mode` (optional): "slangToRussian" или "russianToSlang" (default: "slangToRussian")
- `limit` (optional): Максимальное количество результатов (default: 10)

**Response:**
```json
{
  "success": true,
  "results": ["чилить", "чилил", "чилю"]
}
```

---

### 5. Популярные слова

**GET** `/popular`

Получить список популярных слов с их переводами.

**Response:**
```json
{
  "success": true,
  "words": [
    {
      "word": "чилить",
      "definition": "Отдыхать, расслабляться...",
      "shortTranslation": "отдыхать",
      "examples": [...],
      "category": "Общение"
    },
    ...
  ]
}
```

---

### 6. Избранное

#### Получить избранное

**GET** `/favorites/{userId}`

**Response:**
```json
{
  "success": true,
  "favorites": [
    {
      "word": "чилить",
      "translation": "отдыхать",
      "mode": "slangToRussian",
      "timestamp": 1234567890
    }
  ]
}
```

#### Сохранить избранное

**POST** `/favorites/{userId}`

**Request Body:**
```json
{
  "favorites": [
    {
      "word": "чилить",
      "translation": "отдыхать",
      "mode": "slangToRussian",
      "timestamp": 1234567890
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Favorites updated"
}
```

---

### 7. История переводов

#### Получить историю

**GET** `/history/{userId}`

**Response:**
```json
{
  "success": true,
  "history": [
    {
      "word": "чилить",
      "translation": "отдыхать",
      "mode": "slangToRussian",
      "timestamp": 1234567890
    }
  ]
}
```

#### Сохранить историю

**POST** `/history/{userId}`

**Request Body:**
```json
{
  "history": [...]
}
```

**Response:**
```json
{
  "success": true,
  "message": "History updated"
}
```

#### Очистить историю

**DELETE** `/history/{userId}`

**Response:**
```json
{
  "success": true,
  "message": "History cleared"
}
```

---

### 8. Статистика

**GET** `/stats`

Получить общую статистику сайта.

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalTranslations": 1250,
    "totalWords": 30,
    "categories": 7,
    "lastUpdate": 1234567890
  }
}
```

---

## Обработка ошибок

Все ошибки возвращаются в формате:

```json
{
  "success": false,
  "error": "Описание ошибки"
}
```

### HTTP коды ошибок:
- `400` - Неверные параметры запроса
- `404` - Ресурс не найден
- `500` - Внутренняя ошибка сервера

---

## Примеры использования

### JavaScript/TypeScript

```typescript
import { translationAPI } from './utils/api';

// Перевод слова
const result = await translationAPI.translate('чилить', 'slangToRussian');
console.log(result.translation);

// Поиск
const searchResults = await dictionaryAPI.search('чил', 'slangToRussian', 5);
console.log(searchResults.results);

// Статистика
const stats = await statsAPI.get();
console.log(stats.stats);
```

---

## Хранилище данных

Backend использует Supabase KV Store для хранения:
- **Избранное**: `favorites:{userId}`
- **История**: `history:{userId}`
- **Статистика**: `stats:translations`

Словарь и формы слов хранятся в памяти сервера для быстрого доступа.
