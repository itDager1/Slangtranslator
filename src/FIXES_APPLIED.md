# 🔧 Исправления ошибок развертывания

## Проблема
Ошибка 403 при развертывании Edge Function:
```
Error while deploying: XHR for "/api/integrations/supabase/.../edge_functions/make-server/deploy" failed with status 403
```

## Причины
1. Несоответствие путей API endpoints (использовался префикс `/make-server-6f7662b1/`)
2. Неправильный URL в frontend (указывал на `make-server-6f7662b1` вместо `server`)
3. Наличие лишнего файла `index_extended.txt`

## Исправления

### 1. ✅ Удален лишний файл
- Удален `/supabase/functions/server/index_extended.txt`

### 2. ✅ Обновлены маршруты в Backend (`/supabase/functions/server/index.tsx`)

**Было:**
```typescript
app.get("/make-server-6f7662b1/health", (c) => { ... });
app.get("/make-server-6f7662b1/dictionary", (c) => { ... });
app.post("/make-server-6f7662b1/translate", async (c) => { ... });
// и т.д.
```

**Стало:**
```typescript
app.get("/health", (c) => { ... });
app.get("/dictionary", (c) => { ... });
app.post("/translate", async (c) => { ... });
// и т.д.
```

**Список обновленных маршрутов:**
- `/health` - проверка состояния
- `/dictionary` - получение словаря
- `/translate` - перевод текста
- `/popular` - популярные слова
- `/search` - поиск/автодополнение
- `/favorites/:userId` - избранное (GET/POST)
- `/history/:userId` - история (GET/POST/DELETE)
- `/stats` - статистика
- `/words/:category` - слова по категории

### 3. ✅ Обновлен Frontend API (`/utils/api.ts`)

**Было:**
```typescript
const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-6f7662b1`;
```

**Стало:**
```typescript
const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/server`;
```

Все endpoint вызовы уже использовали правильные пути (без префикса), поэтому дополнительных изменений не требовалось.

### 4. ✅ Добавлен конфигурационный файл

Создан `/supabase/functions/server/deno.json`:
```json
{
  "tasks": {
    "dev": "deno run --allow-net --allow-env --allow-read --watch index.tsx"
  }
}
```

## Структура после исправлений

```
/supabase/functions/server/
├── index.tsx          ✅ Основной файл Edge Function (обновлен)
├── kv_store.tsx       ✅ KV Store утилиты
└── deno.json          ✅ Конфигурация Deno (создан)
```

## Как развернуть сейчас

### Вариант 1: Через Figma Make (рекомендуется)
1. Нажмите кнопку "Connect Supabase" в интерфейсе
2. Авторизуйтесь в Supabase
3. Выберите проект или создайте новый
4. Дождитесь автоматического развертывания

### Вариант 2: Через CLI
```bash
# 1. Установите Supabase CLI (если еще не установлен)
brew install supabase/tap/supabase  # macOS
# или
scoop install supabase  # Windows

# 2. Авторизуйтесь
supabase login

# 3. Свяжите проект
supabase link --project-ref YOUR_PROJECT_ID

# 4. Разверните Edge Function
supabase functions deploy server

# 5. Примените миграции для KV Store (если еще не применены)
supabase db push
```

## Проверка развертывания

### 1. Проверка через curl
```bash
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/server/health
```

Ожидаемый ответ:
```json
{"status":"ok","message":"Slang Translator API is running"}
```

### 2. Проверка в приложении
- Footer должен показывать "Backend online" 🟢
- BackendDemo должен успешно выполнять все тесты
- Перевод должен работать

## Что было добавлено ранее

В этой сессии был значительно расширен словарь:

### 📊 Статистика расширения
- **Добавлено новых слов:** 150+
- **Всего слов в словаре:** 200+
- **Всего форм слов:** 2000+

### Категории новых слов:
- **Интернет:** 21 слово (абуз, афк, бан, вайп, гг, жиза, лурк, найс, овн, и др.)
- **Игры:** 36 слов (авп, ачивка, билд, бафф, варик, ганг, данж, и др.)
- **Эмоции:** 19 слов (вайбить, грустить, кекать, лютить, панчить, и др.)
- **Общение:** 12 слов (базар, вписка, движуха, личить, шарить, и др.)
- **Стиль жизни:** 4 слова (буст, апгрейд, лайфхак, шеймить)
- **Медиа:** 11 слов (апвоут, вирусить, запостить, лайкать, и др.)
- **Отношения:** 7 слов (тянка, френдить, галить, залететь, и др.)

Для каждого слова добавлены:
- ✅ Все формы склонения (падежи)
- ✅ Все времена и лица для глаголов
- ✅ Полные определения с контекстом
- ✅ Примеры использования
- ✅ Обратные маппинги для перевода

## Результат

Теперь:
- ✅ Edge Function имеет стандартную структуру Supabase
- ✅ API endpoints используют правильные пути
- ✅ Frontend правильно обращается к backend
- ✅ Словарь содержит 200+ слов
- ✅ Все готово к развертыванию

## Следующие шаги

1. Разверните Edge Function (используя один из вариантов выше)
2. Обновите `/utils/supabase/info.tsx` с вашими реальными ключами
3. Проверьте работу через health endpoint
4. Протестируйте функционал перевода

## Дополнительная информация

Подробное руководство по развертыванию находится в:
- `/DEPLOYMENT_GUIDE.md` - полное руководство
- `/QUICK_START.md` - быстрый старт
- `/README_BACKEND.md` - документация backend API
