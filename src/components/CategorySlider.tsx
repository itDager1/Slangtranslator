import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useRef } from "react";
import { categories } from "../App";

interface CategorySliderProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategorySlider({ selectedCategory, onSelectCategory }: CategorySliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mb-8">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => scroll('left')}
          className="shrink-0 h-9 w-9 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <div 
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => onSelectCategory(category)}
              className={`shrink-0 rounded-lg ${
                selectedCategory === category
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-white hover:bg-gray-50 border-gray-200"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => scroll('right')}
          className="shrink-0 h-9 w-9 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
