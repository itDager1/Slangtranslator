# Руководство по интеграции Backend с Frontend

## 🎯 Цель

Это руководство описывает, как интегрировать монолитный backend с существующим React фронтендом.

## 📝 Текущее состояние

### ✅ Что уже работает

1. **Backend полностью функционален**
   - Все API endpoints работают
   - Словарь загружен в память сервера
   - KV Store настроен для хранения данных

2. **API клиент готов**
   - Файл `/utils/api.ts` содержит все необходимые функции
   - Обработка ошибок реализована
   - Типизация готова

3. **UI компоненты готовы**
   - `BackendStatus` - индикатор статуса backend
   - `BackendDemo` - тестовая панель для проверки API
   - Footer обновлён для отображения статуса

## 🔄 Варианты использования

### Вариант 1: Гибридный режим (Рекомендуется)

Использовать backend для:
- Синхронизации избранного между устройствами
- Синхронизации истории
- Получения статистики
- Расширенных функций (если понадобятся в будущем)

Оставить на клиенте:
- Словарь (для быстрой работы офлайн)
- Локальный перевод
- Автодополнение

#### Преимущества:
- ✅ Быстрая работа (словарь на клиенте)
- ✅ Синхронизация данных между устройствами
- ✅ Работает офлайн
- ✅ Минимальные изменения кода

#### Реализация:

```typescript
// В App.tsx - добавить синхронизацию избранного
import { favoritesAPI } from './utils/api';

// Загрузка избранного с сервера
useEffect(() => {
  const loadFavorites = async () => {
    try {
      const userId = getUserId(); // Получить или создать userId
      const response = await favoritesAPI.get(userId);
      if (response.success) {
        setFavorites(response.favorites);
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
      // Fallback to localStorage
      const stored = localStorage.getItem('favorites');
      if (stored) setFavorites(JSON.parse(stored));
    }
  };
  
  loadFavorites();
}, []);

// Сохранение избранного на сервер
useEffect(() => {
  const saveFavorites = async () => {
    if (favorites.length === 0) return;
    
    try {
      const userId = getUserId();
      await favoritesAPI.save(userId, favorites);
      // Также сохранить локально как fallback
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  };
  
  saveFavorites();
}, [favorites]);

// Функция для получения/создания userId
function getUserId(): string {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userId', userId);
  }
  return userId;
}
```

### Вариант 2: Полностью серверный режим

Использовать backend для всего:
- Перевод через API
- Поиск через API
- Автодополнение через API
- Избранное через API
- История через API

#### Преимущества:
- ✅ Единый источник правды
- ✅ Проще обновлять словарь
- ✅ Централизованная статистика
- ✅ Меньше кода на клиенте

#### Недостатки:
- ❌ Требуется интернет
- ❌ Немного медленнее
- ❌ Больше нагрузка на сервер

#### Реализация:

```typescript
// Заменить локальный перевод на API
const handleSearch = async (query: string) => {
  if (!query.trim()) {
    setTranslation(null);
    return;
  }

  try {
    const response = await translationAPI.translate(query, translationMode);
    if (response.success) {
      setTranslation(response.translation);
      setSelectedWord(query);
      
      // Добавить в историю
      const newEntry = {
        word: query,
        translation: response.translation.definition,
        mode: translationMode,
        timestamp: Date.now()
      };
      setHistory(prev => [newEntry, ...prev].slice(0, 50));
    }
  } catch (error) {
    console.error('Translation error:', error);
    // Показать ошибку пользователю
  }
};

// Автодополнение через API
const handleSearchChange = async (value: string) => {
  setSearchValue(value);
  
  if (value.length < 2) {
    setSuggestions([]);
    return;
  }

  try {
    const response = await dictionaryAPI.search(value, translationMode, 10);
    if (response.success) {
      setSuggestions(response.results);
    }
  } catch (error) {
    console.error('Search error:', error);
  }
};
```

## 🧪 Тестирование Backend

### 1. Проверка работоспособности

Добавьте в ваш компонент:

```typescript
import { BackendDemo } from './components/BackendDemo';

// В разработке
{process.env.NODE_ENV === 'development' && <BackendDemo />}
```

### 2. Проверка статуса

Статус автоматически отображается в Footer. Убедитесь, что видите зелёную иконку "Backend online".

### 3. Ручное тестирование

```typescript
import { utilsAPI, translationAPI } from './utils/api';

// Проверка здоровья
const health = await utilsAPI.health();
console.log('Health:', health);

// Тест перевода
const result = await translationAPI.translate('чилить', 'slangToRussian');
console.log('Translation:', result);
```

## 📊 Мониторинг

### Backend статус

Footer автоматически показывает:
- 🟢 "Backend online" - всё работает
- 🔴 "Backend offline" - есть проблемы
- ⏳ "Проверка backend..." - загрузка

### Логи

Все API запросы логируются в консоль браузера с префиксом:
- `API Error [endpoint]:` - ошибки API
- `API Request Error [endpoint]:` - ошибки сети

Backend логирует все запросы в Supabase Functions Logs.

## 🎨 UI компоненты для тестирования

### BackendDemo

Добавьте панель тестирования в ваше приложение:

```typescript
import { BackendDemo } from './components/BackendDemo';

<div className="container mx-auto p-4">
  <BackendDemo />
</div>
```

Панель предоставляет кнопки для тестирования:
- Перевод
- Поиск
- Статистика
- Словарь

## 🔐 Безопасность

### userId

Для работы с избранным и историей нужен userId:

```typescript
// Создать и сохранить userId при первом запуске
function initUserId() {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('userId', userId);
  }
  return userId;
}

const userId = initUserId();
```

### API ключи

API ключи уже настроены в `/utils/supabase/info.tsx`. Не изменяйте их.

## 📈 Следующие шаги

1. **Выберите режим интеграции** (Гибридный или Полностью серверный)
2. **Реализуйте синхронизацию избранного** (если выбран гибридный режим)
3. **Добавьте BackendDemo** для тестирования
4. **Проверьте Footer** - должен показывать "Backend online"
5. **Протестируйте все функции** через BackendDemo

## 💡 Рекомендации

1. **Начните с гибридного режима** - это проще и безопаснее
2. **Добавьте обработку ошибок** - backend может быть недоступен
3. **Используйте fallback на localStorage** - для работы офлайн
4. **Тестируйте на медленном интернете** - добавьте индикаторы загрузки
5. **Логируйте всё** - это поможет при отладке

## ❓ Часто задаваемые вопросы

**Q: Backend не отвечает, что делать?**
A: Проверьте логи в Supabase, убедитесь, что Edge Functions запущены.

**Q: Нужно ли обновлять словарь на клиенте, если он есть на сервере?**
A: В гибридном режиме - да, для быстрой работы офлайн.

**Q: Как добавить аутентификацию?**
A: Backend уже поддерживает userId. Можно интегрировать Supabase Auth.

**Q: Можно ли использовать backend без интернета?**
A: Нет, но гибридный режим позволяет работать офлайн с ограниченным функционалом.

## 🎉 Готово!

Backend готов к использованию. Выберите подходящий вариант интеграции и начинайте разработку!
