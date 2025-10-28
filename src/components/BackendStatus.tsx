import { useState, useEffect } from 'react';
import { utilsAPI } from '../utils/api';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export function BackendStatus() {
  const [status, setStatus] = useState<'loading' | 'online' | 'offline'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      setStatus('loading');
      const response = await utilsAPI.health();
      if (response.status === 'ok') {
        setStatus('online');
        setErrorMessage('');
      } else {
        setStatus('offline');
        setErrorMessage('Backend returned unexpected status');
      }
    } catch (error) {
      setStatus('offline');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
      console.error('Backend health check failed:', error);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Проверка backend...</span>
      </div>
    );
  }

  if (status === 'offline') {
    return (
      <div className="flex items-center gap-2 text-red-400 text-sm">
        <XCircle className="w-4 h-4" />
        <span>Backend offline</span>
        {errorMessage && (
          <span className="text-xs text-gray-500">({errorMessage})</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-green-400 text-sm">
      <CheckCircle className="w-4 h-4" />
      <span>Backend online</span>
    </div>
  );
}
