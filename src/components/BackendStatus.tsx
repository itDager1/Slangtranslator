import { XCircle } from 'lucide-react';

export function BackendStatus() {
  // Local mode - backend not required
  return (
    <div className="flex items-center gap-2 text-gray-400 text-sm">
      <XCircle className="w-4 h-4" />
      <span>Локальный режим</span>
    </div>
  );
}
