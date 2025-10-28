# 🛠️ Scripts для развертывания Backend

Эта папка содержит скрипты для автоматизации развертывания backend в Supabase.

## 📁 Файлы

### `prepare-deployment-files.sh`
Создаёт папку `deployment/` с готовыми файлами для ручного развертывания.

**Использование:**
```bash
chmod +x scripts/prepare-deployment-files.sh
./scripts/prepare-deployment-files.sh
```

**Результат:**
- Создаёт папку `deployment/` в корне проекта
- Копирует и обрабатывает все необходимые файлы
- Готовит миграцию базы данных
- Создаёт README с инструкциями

### `deploy.sh`
Автоматически разворачивает backend в Supabase.

**Использование:**
```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

**Что делает:**
- Проверяет наличие Supabase CLI
- Проверяет авторизацию
- Запрашивает Project ID
- Подготавливает файлы
- Разворачивает Edge Function
- Применяет миграции
- Показывает инструкции для следующих шагов

### `update-config.md`
Руководство по обновлению конфигурации фронтенда после развертывания.

**Содержит:**
- Инструкции по получению API ключей
- Шаги по обновлению конфигурации
- Примеры кода
- Тестирование
- Решение проблем

## 🚀 Быстрый старт

### Вариант 1: Автоматическое развертывание (рекомендуется)

```bash
# 1. Сделайте скрипт исполняемым
chmod +x scripts/deploy.sh

# 2. Запустите развертывание
./scripts/deploy.sh

# 3. Следуйте инструкциям
```

### Вариант 2: Ручное развертывание

```bash
# 1. Подготовьте файлы
chmod +x scripts/prepare-deployment-files.sh
./scripts/prepare-deployment-files.sh

# 2. Перейдите в папку deployment
cd deployment

# 3. Инициализируйте Supabase
supabase init

# 4. Свяжите с проектом
supabase link --project-ref YOUR_PROJECT_ID

# 5. Примените миграцию
supabase db push

# 6. Разверните функцию
supabase functions deploy server
```

## 📋 Требования

### Обязательно:
- ✅ Supabase CLI установлен
- ✅ Аккаунт в Supabase
- ✅ Созданный проект в Supabase
- ✅ Выполнена авторизация: `supabase login`

### Опционально:
- Git (для версионирования)
- Node.js/Deno (для локальной разработки)

## 🔧 Установка Supabase CLI

### macOS/Linux:
```bash
brew install supabase/tap/supabase
```

### Windows:
```powershell
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### Проверка:
```bash
supabase --version
```

## 📝 Пошаговая инструкция

### 1. Подготовка

```bash
# Убедитесь, что вы в корне проекта
pwd

# Установите права на выполнение
chmod +x scripts/*.sh
```

### 2. Создание проекта в Supabase

1. Откройте https://supabase.com
2. Нажмите "New Project"
3. Заполните форму:
   - Name: SlangTranslator
   - Password: создайте сильный пароль
   - Region: выберите ближайший
4. Дождитесь создания (~2 минуты)

### 3. Авторизация в CLI

```bash
supabase login
```

Откроется браузер для авторизации.

### 4. Запуск развертывания

```bash
./scripts/deploy.sh
```

Введите Project ID когда попросит.

### 5. Обновление конфигурации

После успешного развертывания:

1. Откройте `/utils/supabase/info.tsx`
2. Обновите `projectId` и `publicAnonKey`
3. Откройте `/utils/api.ts`
4. Замените все `/make-server-6f7662b1/` на `/`

Подробнее в `scripts/update-config.md`

## ✅ Проверка

После развертывания проверьте:

```bash
# Замените YOUR_PROJECT_ID
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/server/health
```

Ответ должен быть:
```json
{"status":"ok","message":"Slang Translator API is running"}
```

## 🐛 Отладка

### Просмотр логов

```bash
supabase functions logs server
```

Или в реальном времени:
```bash
supabase functions logs server --follow
```

### Проверка статуса

```bash
supabase functions list
```

### Повторное развертывание

```bash
supabase functions deploy server
```

## 📖 Дополнительная документация

- **[DEPLOYMENT_GUIDE.md](/DEPLOYMENT_GUIDE.md)** - Полное руководство
- **[update-config.md](./update-config.md)** - Обновление конфигурации
- **[README_BACKEND.md](/README_BACKEND.md)** - Документация backend

## 🆘 Помощь

### Проблема: "Supabase CLI не установлен"

**Решение:**
```bash
# macOS/Linux
brew install supabase/tap/supabase

# Windows
scoop install supabase
```

### Проблема: "Не авторизован"

**Решение:**
```bash
supabase login
```

### Проблема: "Project ID не найден"

**Решение:**
1. Откройте Supabase Dashboard
2. Выберите проект
3. Project ID в URL: `https://supabase.com/dashboard/project/XXXXX`

### Проблема: "Миграция не применяется"

**Решение:**
```bash
# Проверьте связь с проектом
supabase projects list

# Свяжитесь заново
supabase link --project-ref YOUR_PROJECT_ID

# Попробуйте снова
supabase db push
```

## 💡 Советы

1. **Используйте автоматический скрипт** - он делает всё за вас
2. **Сохраните API ключи** - они понадобятся для конфигурации
3. **Проверяйте логи** - если что-то не работает
4. **Читайте вывод скрипта** - он содержит полезные инструкции
5. **Делайте бэкап** - перед изменениями в БД

## 🎯 Чек-лист

- [ ] Supabase CLI установлен
- [ ] Создан проект в Supabase
- [ ] Выполнена авторизация
- [ ] Запущен скрипт развертывания
- [ ] Миграция применена
- [ ] Edge Function развёрнута
- [ ] Health endpoint отвечает
- [ ] Конфигурация фронтенда обновлена
- [ ] Приложение протестировано

## 🎉 Готово!

После выполнения всех шагов ваш backend будет работать в вашей организации Supabase!
