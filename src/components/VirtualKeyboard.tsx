import { useState } from "react";
import { Delete, ArrowUp, Globe } from "lucide-react";

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onSpace: () => void;
  onEnter: () => void;
}

const russianLayout = [
  ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
  ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
  ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э"],
  ["я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "."]
];

const englishLayout = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
  ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"]
];

export function VirtualKeyboard({ onKeyPress, onBackspace, onSpace, onEnter }: VirtualKeyboardProps) {
  const [isRussian, setIsRussian] = useState(true);
  const [isCapsLock, setIsCapsLock] = useState(false);

  const layout = isRussian ? russianLayout : englishLayout;

  const handleKeyClick = (key: string) => {
    const finalKey = isCapsLock ? key.toUpperCase() : key;
    onKeyPress(finalKey);
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4 mt-2">
      {/* Keyboard rows */}
      <div className="space-y-2">
        {layout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 justify-center">
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleKeyClick(key)}
                className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded min-w-[40px] transition-colors"
              >
                {isCapsLock ? key.toUpperCase() : key}
              </button>
            ))}
          </div>
        ))}

        {/* Bottom row with special keys */}
        <div className="flex gap-1 justify-center items-center">
          {/* Language switch */}
          <button
            onClick={() => setIsRussian(!isRussian)}
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
            title={isRussian ? "Switch to English" : "Переключить на русский"}
          >
            <Globe className="w-4 h-4" />
            {isRussian ? "EN" : "RU"}
          </button>

          {/* Caps Lock */}
          <button
            onClick={() => setIsCapsLock(!isCapsLock)}
            className={`px-4 py-2 rounded transition-colors ${
              isCapsLock 
                ? "bg-amber-600 hover:bg-amber-500 text-white" 
                : "bg-gray-600 hover:bg-gray-500 text-white"
            }`}
            title="Caps Lock"
          >
            <ArrowUp className="w-4 h-4" />
          </button>

          {/* Space */}
          <button
            onClick={onSpace}
            className="bg-gray-600 hover:bg-gray-500 text-white px-20 py-2 rounded transition-colors"
          >
            Пробел
          </button>

          {/* Backspace */}
          <button
            onClick={onBackspace}
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded transition-colors"
            title="Backspace"
          >
            <Delete className="w-4 h-4" />
          </button>

          {/* Enter */}
          <button
            onClick={onEnter}
            className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2 rounded transition-colors"
            title="Enter"
          >
            ↵
          </button>
        </div>
      </div>
    </div>
  );
}
