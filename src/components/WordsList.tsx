import { useState } from "react";
import { Card } from "./ui/card";
import { Book, ChevronDown, ChevronUp } from "lucide-react";

interface DictionaryEntry {
  word: string;
  definition: string;
  shortTranslation?: string;
  examples: string[];
  category: string;
}

interface WordsListProps {
  category: string;
  onSelectWord?: (word: string) => void;
}

export function WordsList({ category, onSelectWord }: WordsListProps) {
  const [expandedWords, setExpandedWords] = useState<Set<string>>(new Set());

  // Placeholder - this component is not currently used
  // If you need to display category words, pass the dictionary as a prop
  const words: DictionaryEntry[] = [];

  const toggleExpanded = (word: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const newExpanded = new Set(expandedWords);
    if (newExpanded.has(word)) {
      newExpanded.delete(word);
    } else {
      newExpanded.add(word);
    }
    setExpandedWords(newExpanded);
  };

  const handleWordClick = (word: string) => {
    if (onSelectWord) {
      onSelectWord(word);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (words.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Book className="w-5 h-5 text-[#E19E2F]" />
        <h2 className="text-gray-700">
          Словарь: {category} <span className="text-gray-400">({words.length} слов)</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {words.map((entry) => {
          const isExpanded = expandedWords.has(entry.word);
          
          return (
            <Card
              key={entry.word}
              className="p-4 hover:shadow-md hover:border-[#E19E2F]/50 transition-all cursor-pointer group"
              onClick={() => handleWordClick(entry.word)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="text-[#E19E2F] group-hover:text-[#E19E2F] transition-colors mb-1">
                    {entry.word}
                  </h3>
                  
                  {entry.shortTranslation && (
                    <p className="text-gray-600 text-sm mb-2">
                      → {entry.shortTranslation}
                    </p>
                  )}
                  
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-gray-700 text-sm mb-3">
                        {entry.definition}
                      </p>
                      
                      {entry.examples && entry.examples.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs text-gray-500">Примеры:</p>
                          {entry.examples.map((example, idx) => (
                            <p key={idx} className="text-xs text-gray-600 italic pl-2 border-l-2 border-[#E19E2F]/30">
                              {example}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <button 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={(e) => toggleExpanded(entry.word, e)}
                >
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
