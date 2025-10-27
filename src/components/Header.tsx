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
        </>
      ) : (
        <>
          <h1 className="mb-4">
            Переведите на <span className="text-purple-600">молодежный сленг</span>
          </h1>
        </>
      )}
    </div>
  );
}
