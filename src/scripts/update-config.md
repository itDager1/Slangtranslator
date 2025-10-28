# 🔧 Обновление конфигурации после развертывания

После развертывания backend в вашу организацию Supabase, необходимо обновить конфигурацию фронтенда.

## ⚙️ Шаг 1: Получение API ключей

1. Откройте https://supabase.com/dashboard
2. Выберите ваш проект
3. Перейдите в **Settings** → **API**
4. Скопируйте:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Project ID**: `xxxxx` (из URL)
   - **anon public**: начинается с `eyJ...`

## 📝 Шаг 2: Обновление `/utils/supabase/info.tsx`

Замените значения на ваши реальные:

```typescript
// До:
export const projectId = 'demo-project-id';
export const publicAnonKey = 'demo-anon-key';

// После:
export const projectId = 'ВАШИХ_PROJECT_ID'; // Например: 'abcdefghijklmnop'
export const publicAnonKey = 'ВАШ_ANON_PUBLIC_KEY'; // Начинается с eyJ...
```

## 🔄 Шаг 3: Обновление `/utils/api.ts`

### 3.1 Обновите базовый URL

```typescript
// До:
const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-6f7662b1`;

// После:
const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/server`;
```

### 3.2 Обновите все endpoints

Найдите и замените все вхождения `/make-server-6f7662b1/` на `/`:

**До:**
```typescript
return apiRequest('/make-server-6f7662b1/health');
return apiRequest('/make-server-6f7662b1/dictionary');
return apiRequest('/make-server-6f7662b1/translate', {...});
return apiRequest('/make-server-6f7662b1/search?q=...');
return apiRequest('/make-server-6f7662b1/popular');
return apiRequest(`/make-server-6f7662b1/favorites/${userId}`);
return apiRequest(`/make-server-6f7662b1/history/${userId}`);
return apiRequest('/make-server-6f7662b1/stats');
```

**После:**
```typescript
return apiRequest('/health');
return apiRequest('/dictionary');
return apiRequest('/translate', {...});
return apiRequest('/search?q=...');
return apiRequest('/popular');
return apiRequest(`/favorites/${userId}`);
return apiRequest(`/history/${userId}`);
return apiRequest('/stats');
```

## 🧪 Шаг 4: Тестирование

### 4.1 Проверка через curl

```bash
# Замените YOUR_PROJECT_ID на ваш реальный ID
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/server/health

# Должен вернуть:
# {"status":"ok","message":"Slang Translator API is running"}
```

### 4.2 Проверка в браузере

1. Откройте ваше приложение
2. Прокрутите вниз до футера
3. Проверьте статус:
   - 🟢 "Backend online" - всё работает!
   - 🔴 "Backend offline" - проверьте конфигурацию

### 4.3 Тестирование через BackendDemo

Добавьте в любой компонент:

```typescript
import { BackendDemo } from './components/BackendDemo';

<BackendDemo />
```

Нажмите все 4 кнопки и убедитесь, что они работают.

## 🔍 Поиск и замена (автоматизация)

Для быстрого обновления используйте поиск и замену в вашем редакторе:

### VS Code / Cursor
1. Нажмите `Cmd+Shift+F` (Mac) или `Ctrl+Shift+F` (Windows/Linux)
2. Поиск: `/make-server-6f7662b1/`
3. Замена: `/`
4. Файлы: `utils/api.ts`
5. Нажмите "Replace All"

### Командная строка (Unix/Mac)
```bash
# В корне проекта
sed -i '' 's/\/make-server-6f7662b1\//\//g' utils/api.ts
```

### Командная строка (Windows PowerShell)
```powershell
(Get-Content utils/api.ts) -replace '/make-server-6f7662b1/', '/' | Set-Content utils/api.ts
```

## ✅ Финальный чек-лист

После всех изменений проверьте:

- [ ] `projectId` обновлён в `/utils/supabase/info.tsx`
- [ ] `publicAnonKey` обновлён в `/utils/supabase/info.tsx`
- [ ] `API_BASE_URL` обновлён в `/utils/api.ts`
- [ ] Все `/make-server-6f7662b1/` заменены на `/`
- [ ] curl запрос к `/health` возвращает успех
- [ ] Footer показывает "Backend online" 🟢
- [ ] BackendDemo успешно выполняет все тесты

## 🚨 Распространённые ошибки

### Ошибка: "Backend offline"

**Причина:** Неправильные API ключи или URL

**Решение:**
1. Проверьте `projectId` и `publicAnonKey`
2. Убедитесь, что Edge Function развёрнута
3. Проверьте логи: `supabase functions logs server`

### Ошибка: "404 Not Found"

**Причина:** Неправильный путь к endpoint

**Решение:**
1. Убедитесь, что удалили `/make-server-6f7662b1/` из путей
2. Проверьте, что функция называется `server`, а не `make-server-6f7662b1`

### Ошибка: "Unauthorized"

**Причина:** Неправильный `publicAnonKey`

**Решение:**
1. Скопируйте правильный ключ из Supabase Dashboard
2. Убедитесь, что используете **anon public**, а не service_role

## 📞 Дополнительная помощь

Если проблемы сохраняются:

1. Проверьте консоль браузера на ошибки
2. Проверьте Network tab в DevTools
3. Просмотрите логи Edge Function: `supabase functions logs server`
4. Проверьте настройки CORS в backend
5. Убедитесь, что KV Store таблица создана

## 🎉 Готово!

После успешного обновления конфигурации ваш фронтенд будет работать с вашим собственным backend в Supabase!
