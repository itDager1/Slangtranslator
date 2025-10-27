import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { TranslationMode } from "../App";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (word: string) => void;
  translationMode: TranslationMode;
}

export function SearchBar({ value, onChange, onSearch, translationMode }: SearchBarProps) {
  const placeholder = translationMode === "slangToRussian" 
    ? "Введите сленговое слово..." 
    : "Введите обычное слово...";
    
  return (
    <div className="max-w-3xl mx-auto px-4 mb-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && value.trim()) {
              onSearch(value.trim());
            }
          }}
          className="pl-12 py-6 rounded-xl border-gray-200"
        />
      </div>
    </div>
  );
}
