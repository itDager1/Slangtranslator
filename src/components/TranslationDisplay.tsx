import { Sparkles } from "lucide-react";
import { TranslationMode } from "../App";

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
}

export function TranslationDisplay({ selectedWord, translation, translationMode }: TranslationDisplayProps) {
  if (!selectedWord || !translation) {
    return (
      <div className="w-full bg-gray-800 rounded-xl p-6 min-h-[280px] flex flex-col">
        <div className="text-gray-400">Перевод</div>
      </div>
    );
  }

  // Если есть shortTranslation, показываем его как перевод, а definition как объяснение
  // Если нет shortTranslation, показываем definition как перевод (например, для предложений)
  const translatedText = translation.shortTranslation || translation.definition;
  const hasExplanation = translation.shortTranslation && translation.definition;

  return (
    <div className="w-full bg-gray-800 rounded-xl p-6 min-h-[280px] flex flex-col overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-white">{translatedText}</h2>
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
                <span className="text-purple-400">{item.word}</span>
                <span className="text-gray-400"> — {item.explanation}</span>
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
