import { useState } from 'react';
import { translationAPI, dictionaryAPI, statsAPI } from '../utils/api';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function BackendDemo() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testTranslation = async () => {
    setLoading(true);
    try {
      const response = await translationAPI.translate('чилить', 'slangToRussian');
      setResult(JSON.stringify(response, null, 2));
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const testSearch = async () => {
    setLoading(true);
    try {
      const response = await dictionaryAPI.search('чил', 'slangToRussian', 5);
      setResult(JSON.stringify(response, null, 2));
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const testStats = async () => {
    setLoading(true);
    try {
      const response = await statsAPI.get();
      setResult(JSON.stringify(response, null, 2));
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const testDictionary = async () => {
    setLoading(true);
    try {
      const response = await dictionaryAPI.getAll();
      setResult(`Dictionary loaded: ${Object.keys(response.dictionary || {}).length} words`);
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-gray-800 border-gray-700">
      <h3 className="text-white mb-4">Backend API Тестирование</h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          onClick={testTranslation} 
          disabled={loading}
          variant="outline"
        >
          Тест: Перевод
        </Button>
        <Button 
          onClick={testSearch} 
          disabled={loading}
          variant="outline"
        >
          Тест: Поиск
        </Button>
        <Button 
          onClick={testStats} 
          disabled={loading}
          variant="outline"
        >
          Тест: Статистика
        </Button>
        <Button 
          onClick={testDictionary} 
          disabled={loading}
          variant="outline"
        >
          Тест: Словарь
        </Button>
      </div>

      {result && (
        <pre className="bg-gray-900 p-4 rounded text-sm text-gray-300 overflow-auto max-h-96">
          {result}
        </pre>
      )}
    </Card>
  );
}
