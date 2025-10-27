import { Sparkles } from "lucide-react";
import { TranslationMode } from "../App";

interface TranslationDisplayProps {
  selectedWord: string | null;
  translation: { word: string; definition: string; examples?: string[] } | null;
  translationMode: TranslationMode;
}

export function TranslationDisplay({ selectedWord, translation, translationMode }: TranslationDisplayProps) {
  if (!selectedWord || !translation) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-gray-300" />
        </div>
        <h3 className="text-gray-900 mb-2">Выберите слово для перевода🔥</h3>
        <p className="text-gray-500 text-sm max-w-xs">
          Введите слово в поле поиска или выберите из списка
        </p>
      </div>
    );
  }

  const badge = translationMode === "slangToRussian" ? "Сленг" : "Русский";
  const labelFrom = translationMode === "slangToRussian" ? "Значение" : "На сленге";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 min-h-[400px]">
      <div className="mb-6">
        <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-md text-sm mb-4">
          {badge}
        </div>
        <h2 className="text-gray-900 mb-2">{translation.word}</h2>
      </div>

      <div className="mb-6">
        <h3 className="text-gray-700 mb-3">{labelFrom}</h3>
        <p className="text-gray-900 bg-gray-50 rounded-lg p-4">
          {translation.definition}
        </p>
      </div>

      {translation.examples && translation.examples.length > 0 && (
        <div>
          <h3 className="text-gray-700 mb-3">Примеры использования</h3>
          <div className="space-y-3">
            {translation.examples.map((example, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 text-gray-700">
                {example}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
