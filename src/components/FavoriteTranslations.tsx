import { Star, X } from "lucide-react";
import { Button } from "./ui/button";

export interface FavoriteItem {
  id: string;
  word: string;
  translation: string;
  category?: string;
  timestamp: number;
}

interface FavoriteTranslationsProps {
  favorites: FavoriteItem[];
  onRemove: (id: string) => void;
  onSelect: (word: string) => void;
}

export function FavoriteTranslations({ favorites, onRemove, onSelect }: FavoriteTranslationsProps) {
  if (favorites.length === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 mb-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5" style={{ color: '#FFD700', fill: '#FFD700' }} />
          <h2 className="text-gray-800">Избранные переводы</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer relative group"
              onClick={() => onSelect(item.word)}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(item.id);
                }}
              >
                <X className="w-4 h-4 text-gray-500" />
              </Button>
              
              <div className="pr-6">
                <div className="text-purple-600 mb-1">{item.word}</div>
                <div className="text-gray-600 text-sm">{item.translation}</div>
                {item.category && (
                  <div className="text-xs text-gray-400 mt-2">{item.category}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
