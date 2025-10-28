# 🚀 НАЧНИТЕ ОТСЮДА - Перенос Backend в Supabase

## 👋 Добро пожаловать!

Вы хотите перенести backend вашего переводчика сленга в собственную организацию Supabase. Отлично! Всё уже готово.

## ⚡ Быстрый старт (5 минут)

### Шаг 1: Подготовка

```bash
# Установите Supabase CLI (если ещё не установлен)
# macOS/Linux:
brew install supabase/tap/supabase

# Windows:
scoop install supabase

# Авторизуйтесь
supabase login
```

### Шаг 2: Создайте проект в Supabase

1. Откройте https://supabase.com
2. Нажмите **"New Project"**
3. Заполните форму и дождитесь создания
4. Скопируйте **Project ID** (из URL или Settings → API)

### Шаг 3: Разверните backend

```bash
# Сделайте скрипт исполняемым
chmod +x scripts/deploy.sh

# Запустите развертывание
./scripts/deploy.sh

# Введите Project ID когда попросит
```

### Шаг 4: Обновите конфигурацию

1. Откройте Supabase Dashboard → Settings → API
2. Скопируйте **anon/public key**
3. Обновите `/utils/supabase/info.tsx`:

```typescript
export const projectId = 'ВАШ_PROJECT_ID';
export const publicAnonKey = 'ВАШ_ANON_KEY';
```

4. В файле `/utils/api.ts` замените:
   - Было: `/make-server-6f7662b1/`
   - Стало: `/`

### Шаг 5: Проверьте

```bash
# Замените YOUR_PROJECT_ID на ваш ID
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/server/health
```

Должен вернуть: `{"status":"ok"}`

## 📚 Полная документация

### Основные руководства (в порядке важности)

1. **[DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md)** ⭐ НАЧНИТЕ С ЭТОГО
   - Краткий обзор всего процесса
   - 2 варианта развертывания
   - Чек-листы
   - Изменения в коде

2. **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** 📖 Детальное руководство
   - Пошаговые инструкции
   - Скриншоты процесса
   - Создание БД
   - Настройка безопасности

3. **[scripts/update-config.md](./scripts/update-config.md)** 🔧 Обновление конфигурации
   - Что изменить в коде
   - Примеры замен
   - Тестирование
   - Решение проблем

4. **[scripts/README.md](./scripts/README.md)** 🛠️ Документация скриптов
   - Описание скриптов
   - Как использовать
   - Отладка

### Справочная информация

- **[README.md](./README.md)** - Общий README проекта
- **[BACKEND_API.md](./BACKEND_API.md)** - API Reference
- **[README_BACKEND.md](./README_BACKEND.md)** - Руководство по backend
- **[QUICK_START.md](./QUICK_START.md)** - Быстрый старт с примерами

## 🛠️ Доступные скрипты

### Автоматическое развертывание (рекомендуется)
```bash
./scripts/deploy.sh
```
Делает всё автоматически!

### Подготовка файлов для ручного развертывания
```bash
./scripts/prepare-deployment-files.sh
```
Создаёт папку `deployment/` с готовыми файлами

## 📋 Чек-лист

Следуйте этому чек-листу:

### Подготовка
- [ ] Установлен Supabase CLI
- [ ] Создан проект в Supabase
- [ ] Получен Project ID

### Развертывание
- [ ] Запущен `./scripts/deploy.sh`
- [ ] Backend развёрнут успешно
- [ ] Health endpoint отвечает

### Конфигурация
- [ ] Получены API ключи
- [ ] Обновлён `/utils/supabase/info.tsx`
- [ ] Обновлён `/utils/api.ts` (удалены префиксы)

### Тестирование
- [ ] curl запрос работает
- [ ] Footer показывает "Backend online" 🟢
- [ ] BackendDemo выполняет все тесты

## 🎯 Два варианта развертывания

### Вариант А: Автоматический ⚡ (5-10 минут)

**Идеально если:** Хотите быстро развернуть без заморочек

```bash
./scripts/deploy.sh
```

**Что делает:**
- ✅ Проверяет CLI и авторизацию
- ✅ Создаёт и обрабатывает файлы
- ✅ Разворачивает Edge Function
- ✅ Применяет миграции БД
- ✅ Показывает следующие шаги

### Вариант Б: Ручной 🔧 (15-20 минут)

**Идеально если:** Хотите полный контроль

```bash
# 1. Подготовка
./scripts/prepare-deployment-files.sh

# 2. Развертывание
cd deployment
supabase init
supabase link --project-ref YOUR_PROJECT_ID
supabase db push
supabase functions deploy server
```

## 🆘 Если что-то пошло не так

### Проблема: Backend offline

**Решение:**
1. Проверьте, что Edge Function развёрнута: `supabase functions list`
2. Проверьте логи: `supabase functions logs server`
3. Убедитесь, что API ключи правильные

### Проблема: 404 Not Found

**Решение:**
1. Проверьте, что удалили `/make-server-6f7662b1/` из путей
2. Убедитесь, что функция называется `server`
3. Проверьте URL: должен быть `/functions/v1/server/health`

### Проблема: Unauthorized

**Решение:**
1. Убедитесь, что используете правильный `publicAnonKey`
2. Проверьте, что ключ не service_role (он для backend)
3. Скопируйте ключ заново из Dashboard

## 💡 Полезные команды

```bash
# Просмотр логов
supabase functions logs server

# Просмотр логов в реальном времени
supabase functions logs server --follow

# Список всех функций
supabase functions list

# Повторное развертывание
supabase functions deploy server

# Проверка health
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/server/health
```

## 📞 Куда обратиться за помощью

1. **Документация в проекте** (рекомендуется)
   - DEPLOYMENT_GUIDE.md - полные инструкции
   - scripts/update-config.md - настройка
   - BACKEND_API.md - справка по API

2. **Официальная документация**
   - https://supabase.com/docs/guides/functions
   - https://supabase.com/docs/reference/cli

3. **Логи и отладка**
   - Консоль браузера (F12)
   - Supabase Dashboard → Edge Functions → Logs
   - Terminal: `supabase functions logs server`

## 🎓 Рекомендуемый порядок чтения

Если вы впервые разворачиваете backend:

1. **[DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md)** - Обзор (5 мин)
2. **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Детали (15 мин)
3. **Запуск развертывания** `./scripts/deploy.sh` (5-10 мин)
4. **[scripts/update-config.md](./scripts/update-config.md)** - Настройка (5 мин)
5. **Тестирование** - Проверка работы (5 мин)

**Общее время: 35-50 минут**

## 🎉 Что вы получите

После завершения развертывания:

✅ Backend работает в **вашей** организации Supabase  
✅ Полный контроль над данными и кодом  
✅ Возможность мониторинга и отладки  
✅ Масштабируемость и надёжность Supabase  
✅ Бесплатный tier (до 500K requests/месяц)  

## 🚀 Готовы начать?

### Вариант 1: Быстрый старт (если спешите)

```bash
supabase login
./scripts/deploy.sh
# Следуйте инструкциям
```

### Вариант 2: Подробное изучение (если есть время)

1. Прочитайте [DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md)
2. Изучите [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
3. Запустите `./scripts/deploy.sh`

---

**Удачи! 🍀**

Если возникнут вопросы, обратитесь к соответствующей документации. Всё подробно описано!
