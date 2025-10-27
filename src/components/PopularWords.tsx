import { TranslationMode } from "../App";

interface Word {
  word: string;
  definition: string;
  category: string;
}

interface PopularWordsProps {
  onSelectWord: (word: string) => void;
  selectedWord: string | null;
  translationMode: TranslationMode;
  selectedCategory: string;
}

const popularSlangWords: Word[] = [
  { word: "Вайб", definition: "Атмосфера, флюиды", category: "Стиль жизни" },
  { word: "Чилить", definition: "Отдыхать, расслабляться", category: "Общение" },
  { word: "Кринж", definition: "Неловко, стыдно", category: "Эмоции" },
  { word: "Флексить", definition: "Хвастаться", category: "Стиль жизни" },
  { word: "Годнота", definition: "Качественный контент", category: "Стиль жизни" },
  { word: "Хайп", definition: "Ажиотаж, популярность", category: "Медиа" },
  { word: "Лол", definition: "Смешно", category: "Интернет" },
  { word: "Мем", definition: "Интернет-шутка", category: "Интернет" },
  { word: "Имба", definition: "Очень сильное", category: "Игры" },
  { word: "Нуб", definition: "Новичок", category: "Игры" },
  { word: "Краш", definition: "Объект симпатии", category: "Отношения" },
  { word: "Токсик", definition: "Неприятный человек", category: "Общение" },
];

const popularRussianWords: Word[] = [
  { word: "Отдыхать", definition: "Чилить", category: "Общение" },
  { word: "Атмосфера", definition: "Вайб", category: "Стиль жизни" },
  { word: "Смешно", definition: "Лол, Кек, Рофл", category: "Интернет" },
  { word: "Хвастаться", definition: "Флексить", category: "Стиль жизни" },
  { word: "Легко", definition: "Изи", category: "Игры" },
  { word: "Популярность", definition: "Хайп", category: "Медиа" },
  { word: "Неловко", definition: "Кринж", category: "Эмоции" },
  { word: "Нравится", definition: "Краш", category: "Отношения" },
  { word: "Шутка", definition: "Мем", category: "Интернет" },
  { word: "Новичок", definition: "Нуб", category: "Игры" },
];

export function PopularWords({ onSelectWord, selectedWord, translationMode, selectedCategory }: PopularWordsProps) {
  const allWords = translationMode === "slangToRussian" ? popularSlangWords : popularRussianWords;
  
  // Filter words by category
  const words = selectedCategory === "Все категории" 
    ? allWords 
    : allWords.filter(word => word.category === selectedCategory);
  
  const title = translationMode === "slangToRussian" ? "Популярные слова" : "Популярные запросы";
  
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-gray-900 mb-4">{title}</h3>

      {words.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Нет слов в этой категории</p>
        </div>
      ) : (
        <div className="space-y-3">
          {words.map((item, index) => (
            <button
              key={index}
              onClick={() => onSelectWord(item.word)}
              className={`w-full text-left p-4 rounded-lg transition-colors border ${
                selectedWord?.toLowerCase() === item.word.toLowerCase()
                  ? 'bg-purple-50 border-purple-200'
                  : 'bg-gray-50 border-transparent hover:bg-gray-100'
              }`}
            >
              <div className={`mb-1 ${
                selectedWord?.toLowerCase() === item.word.toLowerCase()
                  ? 'text-purple-600'
                  : 'text-gray-900'
              }`}>
                {item.word}
              </div>
              <div className="text-sm text-gray-600">{item.definition}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
