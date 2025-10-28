# 🚀 Руководство по развертыванию Backend в Supabase

## 📋 Обзор

Это руководство поможет вам развернуть монолитный backend в вашей собственной организации Supabase.

## 🎯 Что вам понадобится

- ✅ Аккаунт в Supabase (https://supabase.com)
- ✅ Supabase CLI установлен локально
- ✅ Node.js 18+ или Deno установлен
- ✅ Git (опционально)

## 📝 Шаг 1: Создание проекта в Supabase

### 1.1 Создайте новый проект

1. Перейдите на https://supabase.com
2. Войдите в свой аккаунт
3. Нажмите **"New Project"**
4. Заполните форму:
   - **Name**: SlangTranslator (или любое другое имя)
   - **Database Password**: создайте надёжный пароль
   - **Region**: выберите ближайший регион
   - **Plan**: Free tier достаточно для начала

5. Дождитесь создания проекта (~2 минуты)

### 1.2 Получите ключи API

После создания проекта:

1. Перейдите в **Settings** → **API**
2. Скопируйте:
   - **Project URL** (например: `https://xxxxx.supabase.co`)
   - **Project ID** (например: `xxxxx`)
   - **anon/public key** (начинается с `eyJ...`)
   - **service_role key** (начинается с `eyJ...`, ХРАНИТЕ В СЕКРЕТЕ!)

## 📦 Шаг 2: Установка Supabase CLI

### Для macOS/Linux:
```bash
brew install supabase/tap/supabase
```

### Для Windows:
```powershell
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### Проверка установки:
```bash
supabase --version
```

## 🔑 Шаг 3: Авторизация в Supabase CLI

```bash
supabase login
```

Откроется браузер для авторизации. После успешной авторизации вы увидите сообщение в терминале.

## 📁 Шаг 4: Подготовка файлов для развертывания

### 4.1 Создайте структуру проекта локально

Создайте папку для вашего проекта:

```bash
mkdir slangtranslator-backend
cd slangtranslator-backend
```

### 4.2 Инициализируйте Supabase проект

```bash
supabase init
```

Это создаст папку `supabase/` с необходимой структурой.

### 4.3 Скопируйте backend файлы

Создайте файл `supabase/functions/server/index.ts`:

```bash
mkdir -p supabase/functions/server
```

Скопируйте содержимое из `/supabase/functions/server/index.tsx` в новый файл `supabase/functions/server/index.ts`

**ВАЖНО**: Переименуйте расширение с `.tsx` на `.ts` (Supabase CLI требует `.ts`)

### 4.4 Создайте KV Store утилиты

Создайте файл `supabase/functions/server/kv_store.ts`:

```typescript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

const supabase = createClient(supabaseUrl, supabaseKey)

// Get value by key
export async function get(key: string) {
  const { data, error } = await supabase
    .from('kv_store_6f7662b1')
    .select('value')
    .eq('key', key)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // Not found
    throw error
  }

  return data?.value
}

// Set value by key
export async function set(key: string, value: any) {
  const { error } = await supabase
    .from('kv_store_6f7662b1')
    .upsert({
      key,
      value,
      updated_at: new Date().toISOString()
    })

  if (error) throw error
}

// Delete value by key
export async function del(key: string) {
  const { error } = await supabase
    .from('kv_store_6f7662b1')
    .delete()
    .eq('key', key)

  if (error) throw error
}

// Get multiple values
export async function mget(keys: string[]) {
  const { data, error } = await supabase
    .from('kv_store_6f7662b1')
    .select('key, value')
    .in('key', keys)

  if (error) throw error

  return data?.map(item => item.value) || []
}

// Get values by prefix
export async function getByPrefix(prefix: string) {
  const { data, error } = await supabase
    .from('kv_store_6f7662b1')
    .select('value')
    .like('key', `${prefix}%`)

  if (error) throw error

  return data?.map(item => item.value) || []
}
```

## 🗄️ Шаг 5: Создание KV Store таблицы

### 5.1 Создайте миграцию

Создайте файл `supabase/migrations/20251028000000_create_kv_store.sql`:

```sql
-- Create KV Store table
CREATE TABLE IF NOT EXISTS kv_store_6f7662b1 (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_kv_store_key ON kv_store_6f7662b1(key);
CREATE INDEX IF NOT EXISTS idx_kv_store_updated_at ON kv_store_6f7662b1(updated_at);

-- Enable Row Level Security
ALTER TABLE kv_store_6f7662b1 ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust as needed)
CREATE POLICY "Allow all operations on kv_store"
  ON kv_store_6f7662b1
  FOR ALL
  TO authenticated, anon
  USING (true)
  WITH CHECK (true);
```

### 5.2 Примените миграцию

Свяжите ваш локальный проект с проектом в Supabase:

```bash
supabase link --project-ref YOUR_PROJECT_ID
```

Примените миграцию:

```bash
supabase db push
```

## 🚀 Шаг 6: Развертывание Edge Function

### 6.1 Обновите index.ts

В файле `supabase/functions/server/index.ts` измените импорт kv_store:

```typescript
// Было:
import * as kv from "./kv_store.tsx";

// Стало:
import * as kv from "./kv_store.ts";
```

### 6.2 Задеплойте функцию

```bash
supabase functions deploy server
```

Дождитесь завершения развертывания. Вы увидите URL вашей функции:
```
Function URL: https://YOUR_PROJECT_ID.supabase.co/functions/v1/server
```

### 6.3 Установите переменные окружения (если нужно)

```bash
supabase secrets set MY_SECRET_KEY=value
```

## 🔧 Шаг 7: Обновление Frontend

### 7.1 Обновите конфигурацию

В вашем frontend проекте обновите файл `/utils/supabase/info.tsx`:

```typescript
// Замените на ваши реальные значения
export const projectId = 'YOUR_PROJECT_ID'; // ID вашего проекта
export const publicAnonKey = 'YOUR_ANON_KEY'; // Ваш anon/public key
```

### 7.2 Обновите API endpoint

В файле `/utils/api.ts` измените базовый URL:

```typescript
// Было:
const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-6f7662b1`;

// Стало:
const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/server`;
```

И обновите все пути endpoints, убрав префикс `/make-server-6f7662b1`:

```typescript
// Было:
return apiRequest('/make-server-6f7662b1/health');

// Стало:
return apiRequest('/health');
```

### 7.3 Обновите server/index.ts

В backend файле уберите префиксы из всех маршрутов:

```typescript
// Было:
app.get("/make-server-6f7662b1/health", (c) => {

// Стало:
app.get("/health", (c) => {
```

Примените это изменение ко всем маршрутам.

## ✅ Шаг 8: Тестирование

### 8.1 Проверьте health endpoint

```bash
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/server/health
```

Должен вернуть:
```json
{"status":"ok","message":"Slang Translator API is running"}
```

### 8.2 Проверьте в браузере

Откройте ваш frontend и проверьте:
- Footer должен показывать "Backend online" 🟢
- BackendDemo должен успешно выполнять все тесты

## 🔍 Шаг 9: Отладка

### Просмотр логов

```bash
supabase functions logs server
```

Или в реальном времени:
```bash
supabase functions logs server --follow
```

### Проверка через Dashboard

1. Откройте Supabase Dashboard
2. Перейдите в **Edge Functions**
3. Найдите функцию **server**
4. Нажмите **Logs** для просмотра логов
5. Нажмите **Metrics** для просмотра метрик

## 🔐 Безопасность

### Важные правила:

1. **НИКОГДА** не публикуйте `service_role` key в публичном коде
2. Используйте переменные окружения для секретов
3. Настройте Row Level Security (RLS) для таблиц
4. Ограничьте CORS только для вашего домена (в production)

### Обновление CORS для production:

В `supabase/functions/server/index.ts`:

```typescript
app.use(
  "/*",
  cors({
    origin: "https://yourdomain.com", // Замените на ваш домен
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);
```

## 📊 Мониторинг

### Настройка алертов

В Supabase Dashboard:
1. **Settings** → **Integrations**
2. Настройте webhook для уведомлений
3. Подключите Slack/Discord для алертов

### Метрики

Следите за:
- Количество запросов
- Время ответа
- Ошибки
- Использование ресурсов

## 💰 Тарифы и лимиты

### Free Tier включает:
- 500MB Database
- 1GB File Storage
- 2GB Edge Function invocations/month
- 500,000 Edge Function invocations/month

### Если нужно больше:
Рассмотрите **Pro Plan** ($25/month) для:
- 8GB Database
- 100GB File Storage
- Больше Edge Function invocations
- Приоритетная поддержка

## 🔄 Обновление Backend

Когда нужно обновить код:

```bash
# Внесите изменения в index.ts
# Затем задеплойте заново
supabase functions deploy server
```

## 📝 Чек-лист развертывания

- [ ] Создан проект в Supabase
- [ ] Получены API ключи
- [ ] Установлен Supabase CLI
- [ ] Авторизация выполнена
- [ ] Создана структура проекта
- [ ] Скопированы backend файлы
- [ ] Создана KV Store таблица
- [ ] Применены миграции
- [ ] Задеплоена Edge Function
- [ ] Обновлен frontend конфиг
- [ ] Обновлены API endpoints
- [ ] Протестирован health endpoint
- [ ] Проверен статус в UI
- [ ] Настроены алерты (опционально)

## 🎉 Готово!

Ваш backend теперь работает в вашей собственной организации Supabase!

## 📞 Поддержка

Если возникли проблемы:
1. Проверьте логи: `supabase functions logs server`
2. Проверьте Dashboard в Supabase
3. Убедитесь, что все ключи правильные
4. Проверьте, что миграции применены
5. Посмотрите документацию Supabase: https://supabase.com/docs

## 🔗 Полезные ссылки

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)
- [Deno Deploy Docs](https://deno.com/deploy/docs)
- [Hono Framework](https://hono.dev/)
