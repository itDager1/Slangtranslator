import { TranslationMode } from "../App";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (word: string) => void;
  translationMode: TranslationMode;
}

export function SearchBar({ value, onChange, onSearch, translationMode }: SearchBarProps) {
  const placeholder = "Введите текст...";
    
  return (
    <div className="w-full">
      <div className="bg-gray-800 rounded-xl p-6 min-h-[280px] flex flex-col">
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            onChange(newValue);
            if (newValue.trim()) {
              onSearch(newValue.trim());
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && value.trim()) {
              e.preventDefault();
              onSearch(value.trim());
            }
          }}
          className="w-full flex-1 bg-transparent border-none outline-none text-[rgb(255,255,255)] placeholder:text-white placeholder:text-lg resize-none text-[16px] font-normal not-italic no-underline"
        />
      </div>
    </div>
  );
}
