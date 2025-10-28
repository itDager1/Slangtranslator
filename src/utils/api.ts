import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-6f7662b1`;

// Вспомогательная функция для API запросов
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error(`API Error [${endpoint}]:`, error);
      throw new Error(error.error || `API request failed: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(`API Request Error [${endpoint}]:`, error);
    throw error;
  }
}

// ============================================================================
// СЛОВАРЬ (Dictionary API)
// ============================================================================

export const dictionaryAPI = {
  // Получить весь словарь
  getAll: async () => {
    return apiRequest('/dictionary');
  },

  // Поиск/автодополнение в словаре
  search: async (query: string, mode: string = "slangToRussian", limit: number = 10) => {
    return apiRequest(`/search?q=${encodeURIComponent(query)}&mode=${mode}&limit=${limit}`);
  },
};

// ============================================================================
// ИЗБРАННОЕ (Favorites API)
// ============================================================================

export const favoritesAPI = {
  // Получить избранное
  get: async (userId: string = 'guest') => {
    return apiRequest(`/favorites/${userId}`);
  },

  // Сохранить избранное
  save: async (userId: string = 'guest', favorites: any[]) => {
    return apiRequest(`/favorites/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ favorites }),
    });
  },
};

// ============================================================================
// ИСТОРИЯ (History API)
// ============================================================================

export const historyAPI = {
  // Получить историю
  get: async (userId: string = 'guest') => {
    return apiRequest(`/history/${userId}`);
  },

  // Сохранить историю
  save: async (userId: string = 'guest', history: any[]) => {
    return apiRequest(`/history/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ history }),
    });
  },

  // Очистить историю
  clear: async (userId: string = 'guest') => {
    return apiRequest(`/history/${userId}`, {
      method: 'DELETE',
    });
  },
};

// ============================================================================
// СТАТИСТИКА (Stats API)
// ============================================================================

export const statsAPI = {
  // Получить общую статистику
  get: async () => {
    return apiRequest('/stats');
  },

  // Получить популярные слова
  getPopular: async () => {
    return apiRequest('/popular');
  },
};

// ============================================================================
// ПЕРЕВОД (Translation API)
// ============================================================================

export const translationAPI = {
  // Перевести текст
  translate: async (text: string, mode: string) => {
    return apiRequest('/translate', {
      method: 'POST',
      body: JSON.stringify({ text, mode }),
    });
  },
};

// ============================================================================
// УТИЛИТЫ
// ============================================================================

export const utilsAPI = {
  // Проверка здоровья сервера
  health: async () => {
    return apiRequest('/health');
  },

  // Получить информацию о API
  info: async () => {
    return apiRequest('/info');
  },
};
