import { Sparkles, Star } from "lucide-react";
import { TranslationMode } from "../App";
import { Button } from "./ui/button";

interface TranslationDisplayProps {
  selectedWord: string | null;
  translation: { 
    word: string; 
    definition: string; 
    shortTranslation?: string; 
    examples?: string[]; 
    category?: string;
    explanations?: Array<{ word: string; explanation: string }>;
  } | null;
  translationMode: TranslationMode;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function TranslationDisplay({ selectedWord, translation, translationMode, isFavorite, onToggleFavorite }: TranslationDisplayProps) {
  if (!selectedWord || !translation) {
    return (
      <div className="w-full bg-gray-800 rounded-xl p-6 min-h-[280px] flex flex-col">
        <div className="text-[rgb(255,255,255)] text-lg">Перевод</div>
      </div>
    );
  }

  // Если есть shortTranslation - это одиночное слово, показываем краткий перевод
  // Если нет shortTranslation - это предложение, показываем полный переведенный текст
  const translatedText = translation.shortTranslation || translation.definition;
  const hasExplanation = translation.shortTranslation && translation.definition;
  
  // Функция для преобразования первой буквы в нижний регистр
  const lowercaseFirst = (str: string) => {
    if (!str) return str;
    return str.charAt(0).toLowerCase() + str.slice(1);
  };

  return (
    <div className="w-full bg-gray-800 rounded-xl p-6 min-h-[280px] flex flex-col overflow-y-auto relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleFavorite}
        className="absolute top-4 right-4 hover:bg-gray-700"
      >
        <Star 
          className="w-5 h-5" 
          style={{ 
            color: isFavorite ? '#FFD700' : '#9ca3af',
            fill: isFavorite ? '#FFD700' : 'none'
          }} 
        />
      </Button>
      
      <div className="mb-4 pr-10">
        <h2 className="text-white font-normal">{translatedText}</h2>
      </div>

      {hasExplanation && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <h3 className="text-gray-400 mb-2 text-sm">Объяснение:</h3>
          <div className="text-gray-300 text-sm">
            {translation.definition}
          </div>
        </div>
      )}

      {translation.explanations && translation.explanations.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <h3 className="text-gray-400 mb-2 text-sm">Объяснение слов:</h3>
          <div className="space-y-3">
            {translation.explanations.map((item, index) => (
              <div key={index} className="text-sm">
                <span className="capitalize" style={{ color: '#FFD700' }}>{item.word}</span>
                <span className="text-gray-400"> — {lowercaseFirst(item.explanation)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {translation.examples && translation.examples.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <h3 className="text-gray-400 mb-2 text-sm">Примеры:</h3>
          <div className="space-y-2">
            {translation.examples.slice(0, 2).map((example, index) => (
              <div key={index} className="text-gray-400 text-sm italic">
                • {example}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
