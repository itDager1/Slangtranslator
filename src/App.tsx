import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { CategorySlider } from "./components/CategorySlider";
import { PopularWords } from "./components/PopularWords";
import { TranslationDisplay } from "./components/TranslationDisplay";
import { Stats } from "./components/Stats";
import { Footer } from "./components/Footer";

export type TranslationMode = "slangToRussian" | "russianToSlang";

interface DictionaryEntry {
  word: string;
  definition: string;
  examples: string[];
  category: string;
}

// Mock dictionary data - Slang to Russian
const dictionary: Record<string, DictionaryEntry> = {
  "чилить": {
    word: "Чилить",
    definition: "Отдыхать, расслабляться, проводить время в спокойной обстановке без стресса и напряжения.",
    examples: [
      "Сегодня весь день чилил дома, смотрел сериалы",
      "Давай встретимся и просто почилим в парке"
    ],
    category: "Общение"
  },
  "скучно": {
    word: "Скучно",
    definition: "Грустно, печально. В молодежном сленге используется для выражения эмоций грусти или тоски.",
    examples: [
      "Мне так скучно без тебя",
      "Погода скучная, настроение тоже"
    ],
    category: "Эмоции"
  },
  "батхёрт": {
    word: "Батхёрт",
    definition: "Обида, досада, болезненная реакция на критику или неудачу. От английского 'butthurt'.",
    examples: [
      "У него полный батхёрт после вчерашнего спора",
      "Не надо батхёртить по каждому поводу"
    ],
    category: "Эмоции"
  },
  "криво": {
    word: "Криво",
    definition: "Неправильно, плохо, некачественно. Что-то сделано не так, как нужно.",
    examples: [
      "Эта программа работает криво",
      "Он криво перевел текст"
    ],
    category: "Общение"
  },
  "лол": {
    word: "Лол",
    definition: "Смешно, потешно. Сокращение от 'LOL' (Laughing Out Loud) - громко смеюсь.",
    examples: [
      "Лол, это очень смешно!",
      "Посмотри это видео, там лол"
    ],
    category: "Интернет"
  },
  "баян": {
    word: "Баян",
    definition: "Старая шутка или новость, которую все уже видели. Надоевшая, избитая история.",
    examples: [
      "Это баян, эту шутку все знают",
      "Опять баян публикуешь?"
    ],
    category: "Интернет"
  },
  "рофлить": {
    word: "Рофлить",
    definition: "Смеяться, шутить, веселиться. От 'ROFL' (Rolling On Floor Laughing).",
    examples: [
      "Мы весь вечер рофлили над мемами",
      "Перестань рофлить, это серьезно"
    ],
    category: "Интернет"
  },
  "краш": {
    word: "Краш",
    definition: "Объект симпатии, влюбленности. Человек, который очень нравится.",
    examples: [
      "Он мой краш уже полгода",
      "Познакомь меня со своим крашем"
    ],
    category: "Отношения"
  },
  "флексить": {
    word: "Флексить",
    definition: "Хвастаться, выпендриваться, показывать свои достижения или вещи.",
    examples: [
      "Он постоянно флексит новыми кроссовками",
      "Хватит флексить своими оценками"
    ],
    category: "Стиль жизни"
  },
  "вайб": {
    word: "Вайб",
    definition: "Атмосфера, настроение, общее ощущение от места, события или человека. От английского 'vibe'.",
    examples: [
      "Здесь классный вайб",
      "У этой песни летний вайб"
    ],
    category: "Стиль жизни"
  },
  "кринж": {
    word: "Кринж",
    definition: "Что-то очень неловкое, стыдное, вызывающее дискомфорт. Испанский стыд.",
    examples: [
      "Это такой кринж, я не могу на это смотреть",
      "Его поведение было полным кринжем"
    ],
    category: "Эмоции"
  },
  "токсик": {
    word: "Токсик",
    definition: "Токсичный человек, неприятный в общении, распространяющий негатив.",
    examples: [
      "Он полный токсик, лучше с ним не общаться",
      "В этой игре слишком много токсиков"
    ],
    category: "Общение"
  },
  "хейтить": {
    word: "Хейтить",
    definition: "Ненавидеть, критиковать, испытывать неприязнь. От английского 'hate'.",
    examples: [
      "Зачем ты его хейтишь?",
      "Хейтеры всегда будут хейтить"
    ],
    category: "Общение"
  },
  "агриться": {
    word: "Агриться",
    definition: "Злиться, раздражаться, быть в плохом настроении. От английского 'aggressive'.",
    examples: [
      "Не агрись, это всего лишь игра",
      "Он всегда агрится по мелочам"
    ],
    category: "Эмоции"
  },
  "зумер": {
    word: "Зумер",
    definition: "Представитель поколения Z, рожденный в конце 1990-х - начале 2010-х.",
    examples: [
      "Типичный зумер, постоянно в телефоне",
      "Зумеры не знают мир без интернета"
    ],
    category: "Общение"
  },
  "бумер": {
    word: "Бумер",
    definition: "Человек старшего поколения, не понимающий современных технологий и трендов.",
    examples: [
      "Ок, бумер, как скажешь",
      "Не будь бумером, попробуй разобраться"
    ],
    category: "Общение"
  },
  "изи": {
    word: "Изи",
    definition: "Легко, просто, без усилий. От английского 'easy'.",
    examples: [
      "Это задание изи, справлюсь за минуту",
      "Изи катка, мы выиграли"
    ],
    category: "Игры"
  },
  "го": {
    word: "Го",
    definition: "Пойдем, давай, приглашение к действию. От английского 'go'.",
    examples: [
      "Го играть в футбол",
      "Го в кино сегодня вечером"
    ],
    category: "Общение"
  },
  "рандом": {
    word: "Рандом",
    definition: "Случайность, что-то непредсказуемое. От английского 'random'.",
    examples: [
      "Это был полный рандом",
      "Выбери рандомную песню"
    ],
    category: "Игры"
  },
  "спойлер": {
    word: "Спойлер",
    definition: "Информация, раскрывающая сюжет фильма, книги или игры заранее.",
    examples: [
      "Не говори спойлеры, я еще не смотрел!",
      "Ты мне весь фильм заспойлерил"
    ],
    category: "Медиа"
  },
  "стримить": {
    word: "Стримить",
    definition: "Вести прямую трансляцию в интернете.",
    examples: [
      "Сегодня буду стримить игру",
      "Он каждый день стримит на Твиче"
    ],
    category: "Медиа"
  },
  "донатить": {
    word: "Донатить",
    definition: "Отправлять денежные пожертвования стримеру или создателю контента.",
    examples: [
      "Я задонатил своему любимому стримеру",
      "Спасибо всем, кто донатит!"
    ],
    category: "Медиа"
  },
  "пранк": {
    word: "Пранк",
    definition: "Розыгрыш, шутка над кем-то. От английского 'prank'.",
    examples: [
      "Это был эпичный пранк над другом",
      "Давай заснимем пранк для ютуба"
    ],
    category: "Медиа"
  },
  "троллить": {
    word: "Троллить",
    definition: "Специально провоцировать, дразнить или обманывать кого-то ради смеха.",
    examples: [
      "Он любит троллить людей в комментариях",
      "Перестань меня троллить!"
    ],
    category: "Общение"
  },
  "шипперить": {
    word: "Шипперить",
    definition: "Желать, чтобы два человека были вместе, поддерживать романтическую пару.",
    examples: [
      "Я их шипперю с первого сезона",
      "Все шипперят этих персонажей"
    ],
    category: "Отношения"
  },
  "сасный": {
    word: "Сасный",
    definition: "Очень красивый, привлекательный. Искаженное 'сексуальный'.",
    examples: [
      "Он такой сасный парень",
      "Сасная фотка, выложи в инсту"
    ],
    category: "Стиль жизни"
  },
  "годнота": {
    word: "Годнота",
    definition: "Качественный, хороший контент или продукт.",
    examples: [
      "Этот фильм - настоящая годнота",
      "Где найти такую годноту?"
    ],
    category: "Стиль жизни"
  },
  "годный": {
    word: "Годный",
    definition: "Качественный, хороший, стоящий внимания.",
    examples: [
      "Годный контент на канале",
      "Это годная идея"
    ],
    category: "Стиль жизни"
  },
  "душный": {
    word: "Душный",
    definition: "Скучный, занудный человек или ситуация.",
    examples: [
      "Такой душный препод",
      "Не будь душным, расслабься"
    ],
    category: "Общение"
  },
  "фанбой": {
    word: "Фанбой",
    definition: "Ярый поклонник чего-либо или кого-либо.",
    examples: [
      "Он фанбой Apple",
      "Типичный фанбой этой группы"
    ],
    category: "Медиа"
  },
  "хайп": {
    word: "Хайп",
    definition: "Ажиотаж, популярность, шумиха вокруг чего-либо.",
    examples: [
      "Вокруг этого фильма такой хайп",
      "Это просто хайп, скоро забудут"
    ],
    category: "Медиа"
  },
  "хайпить": {
    word: "Хайпить",
    definition: "Создавать ажиотаж, пользоваться популярностью темы.",
    examples: [
      "Он хайпит на скандале",
      "Блогеры хайпят на этой новости"
    ],
    category: "Медиа"
  },
  "мем": {
    word: "Мем",
    definition: "Шутка, картинка или видео, которые быстро распространяются в интернете.",
    examples: [
      "Этот мем уже видели все",
      "Скинь смешной мем"
    ],
    category: "Интернет"
  },
  "мемас": {
    word: "Мемас",
    definition: "Уменьшительное от 'мем', милое название для смешной картинки.",
    examples: [
      "Какой смешной мемас",
      "Глянь, какой мемас нашел"
    ],
    category: "Интернет"
  },
  "ору": {
    word: "Ору",
    definition: "Очень смешно, сильно смеюсь.",
    examples: [
      "Ору с этого видео",
      "Не могу, ору!"
    ],
    category: "Интернет"
  },
  "кек": {
    word: "Кек",
    definition: "Смех, смешно. Аналог 'лол'.",
    examples: [
      "Кек, это смешно",
      "Кекнул с твоей шутки"
    ],
    category: "Интернет"
  },
  "имба": {
    word: "Имба",
    definition: "Что-то очень сильное, несбалансированное. От 'imbalanced'.",
    examples: [
      "Этот персонаж имба",
      "Имба оружие в игре"
    ],
    category: "Игры"
  },
  "нуб": {
    word: "Нуб",
    definition: "Новичок, неопытный игрок. От 'newbie'.",
    examples: [
      "Ты играешь как нуб",
      "Нубы испортили катку"
    ],
    category: "Игры"
  },
  "про": {
    word: "Про",
    definition: "Профессионал, опытный игрок.",
    examples: [
      "Он настоящий про",
      "Играет как про-игрок"
    ],
    category: "Игры"
  },
  "лаг": {
    word: "Лаг",
    definition: "Задержка, зависание в игре или программе.",
    examples: [
      "У меня лаги, не могу играть",
      "Сервер лагает"
    ],
    category: "Игры"
  },
  "читер": {
    word: "Читер",
    definition: "Игрок, использующий читы для нечестной игры.",
    examples: [
      "Это точно читер",
      "Читеры испортили игру"
    ],
    category: "Игры"
  },
  "тильт": {
    word: "Тильт",
    definition: "Состояние фрустрации и злости из-за проигрышей.",
    examples: [
      "Я на тильте после этой катки",
      "Не играй на тильте"
    ],
    category: "Игры"
  },
  "гг": {
    word: "ГГ",
    definition: "Хорошая игра. От 'good game'.",
    examples: [
      "ГГ, хорошо сыграли",
      "ГГ ВП (хорошо сыграли, молодцы)"
    ],
    category: "Игры"
  },
  "афк": {
    word: "АФК",
    definition: "Отошел от компьютера. От 'away from keyboard'.",
    examples: [
      "Я афк на 5 минут",
      "Не начинайте, я афк"
    ],
    category: "Игры"
  },
  "бан": {
    word: "Бан",
    definition: "Блокировка пользователя или доступа.",
    examples: [
      "Получил бан на форуме",
      "Админ выдал бан"
    ],
    category: "Игры"
  }
};

// Reverse dictionary for Russian to Slang translation
const reverseDictionary: Record<string, DictionaryEntry> = {
  "отдыхать": {
    word: "Отдыхать",
    definition: "Чилить",
    examples: ["Чилить у себя дома", "Почилим в парке"],
    category: "Общение"
  },
  "расслабляться": {
    word: "Расслабляться",
    definition: "Чилить",
    examples: ["Просто чилить и наслаждаться жизнью"],
    category: "Общение"
  },
  "грустно": {
    word: "Грустно",
    definition: "Скучно",
    examples: ["Мне скучно без тебя"],
    category: "Эмоции"
  },
  "обида": {
    word: "Обида",
    definition: "Батхёрт",
    examples: ["У него полный батхёрт"],
    category: "Эмоции"
  },
  "плохо": {
    word: "Плохо",
    definition: "Криво",
    examples: ["Работает криво"],
    category: "Общение"
  },
  "смешно": {
    word: "Смешно",
    definition: "Лол, Кек, Рофл",
    examples: ["Лол, это смешно!", "Кек, рофлю с этого"],
    category: "Интернет"
  },
  "старая шутка": {
    word: "Старая шутка",
    definition: "Баян",
    examples: ["Это баян, все уже видели"],
    category: "Интернет"
  },
  "смеяться": {
    word: "Смеяться",
    definition: "Рофлить, Орать",
    examples: ["Ору с этого", "Рофлю над мемами"],
    category: "Интернет"
  },
  "нравится": {
    word: "Нравится (человек)",
    definition: "Краш",
    examples: ["Он мой краш"],
    category: "Отношения"
  },
  "хвастаться": {
    word: "Хвастаться",
    definition: "Флексить",
    examples: ["Флексит новыми кроссами"],
    category: "Стиль жизни"
  },
  "атмосфера": {
    word: "Атмосфера",
    definition: "Вайб",
    examples: ["Классный вайб здесь"],
    category: "Стиль жизни"
  },
  "неловко": {
    word: "Неловко",
    definition: "Кринж",
    examples: ["Полный кринж"],
    category: "Эмоции"
  },
  "неприятный": {
    word: "Неприятный человек",
    definition: "Токсик",
    examples: ["Он такой токсик"],
    category: "Общение"
  },
  "ненавидеть": {
    word: "Ненавидеть",
    definition: "Хейтить",
    examples: ["Зачем хейтишь?"],
    category: "Общение"
  },
  "злиться": {
    word: "Злиться",
    definition: "Агриться",
    examples: ["Не агрись по мелочам"],
    category: "Эмоции"
  },
  "легко": {
    word: "Легко",
    definition: "Изи",
    examples: ["Это изи"],
    category: "Игры"
  },
  "пойдем": {
    word: "Пойдем",
    definition: "Го",
    examples: ["Го играть", "Го в кино"],
    category: "Общение"
  },
  "качественно": {
    word: "Качественно",
    definition: "Годно, Годнота",
    examples: ["Годный контент"],
    category: "Стиль жизни"
  },
  "скучный": {
    word: "Скучный",
    definition: "Душный",
    examples: ["Такой душный человек"],
    category: "Общение"
  },
  "популярность": {
    word: "Популярность",
    definition: "Хайп",
    examples: ["Вокруг этого хайп"],
    category: "Медиа"
  },
  "новичок": {
    word: "Новичок",
    definition: "Нуб",
    examples: ["Играет как нуб"],
    category: "Игры"
  },
  "профессионал": {
    word: "Профессионал",
    definition: "Про",
    examples: ["Настоящий про"],
    category: "Игры"
  },
  "задержка": {
    word: "Задержка",
    definition: "Лаг",
    examples: ["У меня лаги"],
    category: "Игры"
  },
  "красивый": {
    word: "Красивый",
    definition: "Сасный",
    examples: ["Сасный парень"],
    category: "Стиль жизни"
  },
  "шутка": {
    word: "Шутка (интернет)",
    definition: "Мем",
    examples: ["Смешной мем", "Мемас"],
    category: "Интернет"
  },
  "розыгрыш": {
    word: "Розыгрыш",
    definition: "Пранк",
    examples: ["Эпичный пранк"],
    category: "Медиа"
  },
  "провоцировать": {
    word: "Провоцировать",
    definition: "Троллить",
    examples: ["Троллить в комментах"],
    category: "Общение"
  }
};

export const categories = [
  "Все категории",
  "Интернет",
  "Игры",
  "Эмоции",
  "Общение",
  "Стиль жизни",
  "Медиа",
  "Отношения"
];

export default function App() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все категории");
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [translation, setTranslation] = useState<DictionaryEntry | null>(null);
  const [translationMode, setTranslationMode] = useState<TranslationMode>("slangToRussian");

  const handleSearch = (word: string) => {
    const wordKey = word.toLowerCase();
    const currentDictionary = translationMode === "slangToRussian" ? dictionary : reverseDictionary;
    const found = currentDictionary[wordKey];
    
    if (found) {
      setSelectedWord(word);
      setTranslation(found);
    } else {
      setSelectedWord(word);
      setTranslation({
        word: word,
        definition: "Извините, это слово пока не найдено в нашем словаре. Попробуйте другое слово из популярных.",
        examples: [],
        category: ""
      });
    }
  };
  
  const toggleTranslationMode = () => {
    setTranslationMode(prev => prev === "slangToRussian" ? "russianToSlang" : "slangToRussian");
    setSearchValue("");
    setSelectedWord(null);
    setTranslation(null);
  };

  const handleSelectWord = (word: string) => {
    setSearchValue(word);
    handleSearch(word);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        translationMode={translationMode}
        onToggleMode={toggleTranslationMode}
      />
      
      <main className="flex-1">
        <Header translationMode={translationMode} />
        
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          onSearch={handleSearch}
          translationMode={translationMode}
        />
        
        <CategorySlider
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PopularWords 
            onSelectWord={handleSelectWord} 
            selectedWord={selectedWord}
            translationMode={translationMode}
            selectedCategory={selectedCategory}
          />
          <TranslationDisplay 
            selectedWord={selectedWord} 
            translation={translation}
            translationMode={translationMode}
          />
        </div>
        
        <Stats />
      </main>
      
      <Footer />
    </div>
  );
}
