#!/bin/bash

# Скрипт для подготовки файлов для ручного развертывания
# Создаёт папку deployment/ с готовыми файлами

echo "📦 Подготовка файлов для развертывания..."
echo ""

# Создание директорий
mkdir -p deployment/supabase/functions/server
mkdir -p deployment/supabase/migrations

# Копирование и обработка index.tsx
echo "📄 Обработка index.tsx..."
cp ./supabase/functions/server/index.tsx deployment/supabase/functions/server/index.ts

# Замена .tsx на .ts в импортах
sed -i.bak 's/import \* as kv from "\.\/kv_store\.tsx"/import * as kv from ".\/kv_store.ts"/' deployment/supabase/functions/server/index.ts
rm deployment/supabase/functions/server/index.ts.bak 2>/dev/null || true

# Удаление префиксов /make-server-6f7662b1
sed -i.bak 's/\/make-server-6f7662b1//g' deployment/supabase/functions/server/index.ts
rm deployment/supabase/functions/server/index.ts.bak 2>/dev/null || true

# Создание kv_store.ts
echo "📄 Создание kv_store.ts..."
cat > deployment/supabase/functions/server/kv_store.ts << 'EOF'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

const supabase = createClient(supabaseUrl, supabaseKey)

export async function get(key: string) {
  const { data, error } = await supabase
    .from('kv_store_6f7662b1')
    .select('value')
    .eq('key', key)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }

  return data?.value
}

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

export async function del(key: string) {
  const { error } = await supabase
    .from('kv_store_6f7662b1')
    .delete()
    .eq('key', key)

  if (error) throw error
}

export async function mget(keys: string[]) {
  const { data, error } = await supabase
    .from('kv_store_6f7662b1')
    .select('key, value')
    .in('key', keys)

  if (error) throw error

  return data?.map(item => item.value) || []
}

export async function getByPrefix(prefix: string) {
  const { data, error } = await supabase
    .from('kv_store_6f7662b1')
    .select('value')
    .like('key', `${prefix}%`)

  if (error) throw error

  return data?.map(item => item.value) || []
}
EOF

# Создание миграции
echo "📄 Создание миграции..."
cat > deployment/supabase/migrations/20251028000000_create_kv_store.sql << 'EOF'
-- Create KV Store table
CREATE TABLE IF NOT EXISTS kv_store_6f7662b1 (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_kv_store_key ON kv_store_6f7662b1(key);
CREATE INDEX IF NOT EXISTS idx_kv_store_updated_at ON kv_store_6f7662b1(updated_at);

-- Enable RLS
ALTER TABLE kv_store_6f7662b1 ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Allow all operations on kv_store"
  ON kv_store_6f7662b1
  FOR ALL
  TO authenticated, anon
  USING (true)
  WITH CHECK (true);
EOF

# Создание README для развертывания
cat > deployment/README.md << 'EOF'
# Backend Deployment Files

Эти файлы готовы для развертывания в Supabase.

## Структура

```
deployment/
├── supabase/
│   ├── functions/
│   │   └── server/
│   │       ├── index.ts       # Основной backend файл
│   │       └── kv_store.ts    # KV Store утилиты
│   └── migrations/
│       └── 20251028000000_create_kv_store.sql  # Миграция БД
└── README.md
```

## Быстрое развертывание

### 1. Установите Supabase CLI

```bash
# macOS/Linux
brew install supabase/tap/supabase

# Windows
scoop install supabase
```

### 2. Авторизуйтесь

```bash
supabase login
```

### 3. Инициализируйте проект

```bash
cd deployment
supabase init
```

### 4. Свяжите с вашим проектом

```bash
supabase link --project-ref YOUR_PROJECT_ID
```

### 5. Примените миграцию

```bash
supabase db push
```

### 6. Разверните функцию

```bash
supabase functions deploy server
```

## Проверка

```bash
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/server/health
```

Должен вернуть:
```json
{"status":"ok","message":"Slang Translator API is running"}
```

## Следующие шаги

1. Обновите frontend конфигурацию (см. /scripts/update-config.md)
2. Протестируйте все endpoints
3. Настройте мониторинг

## Дополнительная информация

См. полную документацию в /DEPLOYMENT_GUIDE.md
EOF

echo ""
echo "✅ Файлы подготовлены в папке deployment/"
echo ""
echo "📁 Структура:"
echo "deployment/"
echo "├── supabase/"
echo "│   ├── functions/server/"
echo "│   │   ├── index.ts"
echo "│   │   └── kv_store.ts"
echo "│   └── migrations/"
echo "│       └── 20251028000000_create_kv_store.sql"
echo "└── README.md"
echo ""
echo "📝 Следующие шаги:"
echo "1. cd deployment"
echo "2. supabase init"
echo "3. supabase link --project-ref YOUR_PROJECT_ID"
echo "4. supabase db push"
echo "5. supabase functions deploy server"
echo ""
echo "📖 Полная инструкция: /DEPLOYMENT_GUIDE.md"
echo ""
