import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Book, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { dictionaryAPI } from "../utils/api";

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
  const [words, setWords] = useState<DictionaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedWords, setExpandedWords] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchWords();
  }, [category]);

  const fetchWords = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await dictionaryAPI.getByCategory(category);
      
      if (data.success) {
        setWords(data.words);
      } else {
        setError(data.error || "Failed to load words");
      }
    } catch (err) {
      console.error("Error fetching words:", err);
      setError("Не удалось загрузить слова");
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (word: string, event: React.MouseEvent) => {
    // Stop propagation to prevent card click handler
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
      // Scroll to top to see the translation
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-4">
          <Book className="w-5 h-5 text-yellow-600" />
          <h2 className="text-gray-700">Словарь слов</h2>
        </div>
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-full" />
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <Button 
          onClick={fetchWords} 
          variant="outline" 
          className="mt-4"
        >
          Попробовать снова
        </Button>
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="text-center py-8">
        <Book className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">Нет слов в этой категории</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Book className="w-5 h-5 text-yellow-600" />
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
              className="p-4 hover:shadow-md hover:border-yellow-300 transition-all cursor-pointer group"
              onClick={() => handleWordClick(entry.word)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="text-yellow-600 group-hover:text-yellow-600 transition-colors mb-1">
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
                            <p key={idx} className="text-xs text-gray-600 italic pl-2 border-l-2 border-yellow-200">
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
