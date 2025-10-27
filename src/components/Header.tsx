import { Languages } from "lucide-react";
import { TranslationMode } from "../App";

interface HeaderProps {
  translationMode: TranslationMode;
}

export function Header({ translationMode }: HeaderProps) {
  return (
    <div className="text-center max-w-4xl mx-auto px-4 pt-12 pb-8">
      <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-2 rounded-full text-sm mb-6">
        <Languages className="w-4 h-4" />
        Переводчик интернет-сленга
      </div>
      
      {translationMode === "slangToRussian" ? (
        <>
          <h1 className="mb-4">
            Поймите русский <span className="text-purple-600">интернет-сленг</span>
          </h1>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Введите сленговое слово и мы объясним, что оно означает. ТОП🔥машина для понимания современного русского языка.
          </p>
          
          <p className="text-sm text-gray-500 mt-2">
            Идеально для всех, кто хочет разобраться в молодежном жаргоне
          </p>
        </>
      ) : (
        <>
          <h1 className="mb-4">
            Переведите на <span className="text-purple-600">молодежный сленг</span>
          </h1>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Введите обычное русское слово и узнайте, как его говорят в интернете. ТОП🔥способ звучать современно!
          </p>
          
          <p className="text-sm text-gray-500 mt-2">
            Идеально для тех, кто хочет говорить на языке зумеров
          </p>
        </>
      )}
    </div>
  );
}
