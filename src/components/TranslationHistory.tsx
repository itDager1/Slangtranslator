import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { History, X, ArrowRight } from "lucide-react";
import { TranslationMode } from "../App";
import { ScrollArea } from "./ui/scroll-area";

export interface HistoryEntry {
  id: string;
  input: string;
  output: string;
  mode: TranslationMode;
  timestamp: number;
}

interface TranslationHistoryProps {
  history: HistoryEntry[];
  onClearHistory: () => void;
  onSelectEntry: (entry: HistoryEntry) => void;
}

export function TranslationHistory({ 
  history, 
  onClearHistory,
  onSelectEntry 
}: TranslationHistoryProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return minutes < 1 ? 'Только что' : `${minutes} мин назад`;
    } else if (hours < 24) {
      return `${hours} ч назад`;
    } else {
      return date.toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          className="text-gray-700 border-gray-300 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200 gap-2 shadow-sm hover:shadow-md"
        >
          <History className="w-5 h-5" />
          <span>История</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[400px]">
        <SheetHeader className="mb-4">
          <div className="flex items-center gap-4">
            <SheetTitle>История переводов</SheetTitle>
            {history.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClearHistory}
                className="text-gray-500 hover:text-gray-700"
              >
                Очистить
              </Button>
            )}
          </div>
          <SheetDescription className="sr-only">
            Просмотр и управление историей переводов
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-120px)] pr-4">
          {history.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <History className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>История переводов пуста</p>
              <p className="text-sm mt-2">Ваши переводы будут появляться здесь</p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  onClick={() => onSelectEntry(entry)}
                  className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors border border-gray-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded">
                          {entry.mode === "slangToRussian" ? "Сленг → Русский" : "Русский → Сленг"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(entry.timestamp)}
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 truncate">
                            {entry.input}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-purple-600">
                          <ArrowRight className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm truncate">
                            {entry.output}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
