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
  { word: "Диссить", definition: "Оскорблять, критиковать", category: "Общение" },
  { word: "Чекать", definition: "Проверять, смотреть", category: "Интернет" },
  { word: "Скамить", definition: "Выпрашивать, клянчить", category: "Общение" },
  { word: "Жиза", definition: "Жизненная ситуация", category: "Эмоции" },
  { word: "Видос", definition: "Видео, ролик", category: "Интернет" },
  { word: "Сторис", definition: "Истории в соцсетях", category: "Интернет" },
  { word: "Скин", definition: "Внешний вид персонажа", category: "Игры" },
  { word: "Буст", definition: "Усиление, ускорение", category: "Игры" },
  { word: "Огонь", definition: "Отлично, круто", category: "Стиль жизни" },
  { word: "Топ", definition: "Лучший, высшего качества", category: "Стиль жизни" },
  { word: "Влог", definition: "Видеоблог о жизни", category: "Медиа" },
  { word: "Рилс", definition: "Короткие видео", category: "Медиа" },
  { word: "Френдзона", definition: "Дружеская зона", category: "Отношения" },
  { word: "Шипперить", definition: "Желать, чтобы были вместе", category: "Отношения" },
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
  { word: "Оскорблять", definition: "Диссить", category: "Общение" },
  { word: "Проверять", definition: "Чекать", category: "Интернет" },
  { word: "Выпрашивать", definition: "Скамить", category: "Общение" },
  { word: "Клянчить", definition: "Скамить", category: "Общение" },
  { word: "Круто", definition: "Огонь, Топ, Бомба", category: "Стиль жизни" },
  { word: "Видео", definition: "Видос", category: "Интернет" },
  { word: "Голосовое", definition: "Войс", category: "Интернет" },
  { word: "Усиление", definition: "Буст, Баф", category: "Игры" },
  { word: "Создавать", definition: "Крафтить", category: "Игры" },
  { word: "Розыгрыш", definition: "Пранк", category: "Медиа" },
  { word: "Видеоблог", definition: "Влог", category: "Медиа" },
  { word: "Кокетничать", definition: "Флиртовать", category: "Отношения" },
  { word: "Сводить", definition: "Шипперить", category: "Отношения" },
  { word: "Желать", definition: "Шипперить", category: "Отношения" },
];

export function PopularWords({ onSelectWord, selectedWord, translationMode, selectedCategory }: PopularWordsProps) {
  const allWords = translationMode === "slangToRussian" ? popularSlangWords : popularRussianWords;
  
  // Filter words by category. If selectedCategory is empty (""), show all words
  const filteredWords = selectedCategory === "" 
    ? allWords 
    : allWords.filter(word => word.category === selectedCategory);
  
  // Limit to 8 words
  const words = filteredWords.slice(0, 8);
  
  const title = translationMode === "slangToRussian" ? "Популярные запросы" : "Популярные запросы";
  
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-gray-900 mb-4 text-[20px] font-[Roboto]">{title}</h3>

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
                  ? 'text-amber-600'
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
