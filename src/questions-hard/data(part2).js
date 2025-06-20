
const questionsPart1 = [
    {
      level: "hard",
      question: "Кто выиграл больше всех турниров Большого шлема среди мужчин?",
      answers: ["Рафаэль Надаль", "Новак Джокович", "Роджер Федерер"],
      correctAnswer: "Новак Джокович",
      sport: "Теннис"
    },
    {
      level: "hard",
      question: "Как называется подача в теннисе, при которой мяч не отбит соперником?",
      answers: ["Эйс", "Двойная ошибка", "Лет"],
      correctAnswer: "Эйс",
      sport: "Теннис"
    },
    {
      level: "hard",
      question: "Какой турнир НЕ входит в Большой шлем?",
      answers: ["Уимблдон", "US Open", "Мастерс"],
      correctAnswer: "Мастерс",
      sport: "Теннис"
    },
    {
      level: "hard",
      question: "Как называется ничья в сете (6:6)?",
      answers: ["Дроу-брейк", "Тай-брейк", "Суперсет"],
      correctAnswer: "Тай-брейк",
      sport: "Теннис"
    },
    {
      level: "hard",
      question: "Какое покрытие у 'Ролан Гаррос'?",
      answers: ["Трава", "Грунт", "Хард"],
      correctAnswer: "Грунт",
      sport: "Теннис"
    },
    {
      level: "hard",
      question: "Кто самая титулованная теннисистка в истории?",
      answers: ["Серена Уильямс", "Маргарет Корт", "Штеффи Граф"],
      correctAnswer: "Штеффи Граф",
      sport: "Теннис"
    },
    {
      level: "hard",
      question: "Кто первым выполнил четверной прыжок в фигурном катании?",
      answers: ["Евгений Плющенко", "Курт Браунинг", "Натан Чен"],
      correctAnswer: "Курт Браунинг",
      sport: "Фигурное катание"
    },
    {
      level: "hard",
      question: "Сколько олимпийских золотых медалей у Юлии Липницкой?",
      answers: ["0", "1", "2"],
      correctAnswer: "1",
      sport: "Фигурное катание"
    },
    {
      level: "hard",
      question: "Как называется поддержка, где партнёр держит партнёршу за талию?",
      answers: ["Лассо", "Подкрутка", "Лифт"],
      correctAnswer: "Лифт",
      sport: "Фигурное катание"
    },
    {
      level: "hard",
      question: "Какой из прыжков самый сложный?",
      answers: ["Аксель", "Флип", "Тулуп"],
      correctAnswer: "Аксель",
      sport: "Фигурное катание"
    },
    {
      level: "hard",
      question: "Кто выиграл больше всего чемпионатов мира в фигурном катании среди мужчин?",
      answers: ["Ульрих Сальхов", "Евгений Плющенко", "Ульрих Сальхов"],
      correctAnswer: "Ульрих Сальхов",
      sport: "Фигурное катание"
    },
    {
      level: "hard",
      question: "Какой элемент выполняют в паре, когда партнёр вращает партнёршу на льду?",
      answers: ["Тодес", "Спираль", "Дорожка шагов"],
      correctAnswer: "Тодес",
      sport: "Фигурное катание"
    },
    {
      level: "hard",
      question: "В каком виде спорта используется термин 'брейк-пойнт'?",
      answers: ["Теннис", "Волейбол", "Баскетбол"],
      correctAnswer: "Теннис",
      sport: "Теннис"
    },
    {
      level: "hard",
      question: "Какой спортсмен НЕ связан с баскетболом?",
      answers: ["Стеф Карри", "Дерек Уайт", "Янник Синнер"],
      correctAnswer: "Янник Синнер",
      sport: "Баскетбол"
    },
    {
      level: "hard",
      question: "В каком виде спорта есть элемент 'бильман'?",
      answers: ["Фигурное катание", "Художественная гимнастика", "Фристайл"],
      correctAnswer: "Фигурное катание",
      sport: "Фигурное катание"
    },
    {
      level: "hard",
      question: "В каком виде спорта есть позиция 'либеро'?",
      answers: ["Волейбол", "Баскетбол", "Теннис"],
      correctAnswer: "Волейбол",
      sport: "Волейбол"
    },
    {
      level: "hard",
      question: "Какой турнир НЕ относится к Большому шлему?",
      answers: ["Australian Open", "Wimbledon", "Davis Cup"],
      correctAnswer: "Davis Cup",
      sport: "Теннис"
    },
      {
        level: "hard",
        question: "Какой вид спорта самый старый?",
        answers: ["Теннис", "Баскетбол", "Волейбол"],
        correctAnswer: "Теннис",
        sport: "Общие знания"
      },
      {
        level: "hard",
        question: "В каком фильме боксёр Рокки Бальбоа борется за чемпионский титул?",
        answers: ["«Неудержимые»", "«Рокки»", "«Тренер Картер»"],
        correctAnswer: "«Рокки»",
        sport: "Кино и бокс"
      },
      {
        level: "hard",
        question: "Какой фильм основан на реальной истории хоккейной «Золотой сборной» США 1980 года?",
        answers: ["«Чудо»", "«Неудержимые»", "«Слава»"],
        correctAnswer: "«Чудо»",
        sport: "Кино и хоккей"
      },
      {
        level: "hard",
        question: "В каком фильме Джеки Чан играет бездомного, который становится бойцом UFC?",
        answers: ["«Разборка в Бронксе»", "«Драка»", "«Час пик 3»"],
        correctAnswer: "«Драка»",
        sport: "Кино и MMA"
      },
      {
        level: "hard",
        question: "В каком фильме главный герой становится чемпионом по смешанным единоборствам?",
        answers: ["«Воин»", "«Рейд»", "«Неоспоримый»"],
        correctAnswer: "«Воин»",
        sport: "Кино и MMA"
      },
      {
        level: "hard",
        question: "Какой фильм основан на истории боксёра Джеймса Брэддока?",
        answers: ["«Тысяча лет боли»", "«Нокдаун»", "«Реквием по боксёру»"],
        correctAnswer: "«Нокдаун»",
        sport: "Кино и бокс"
      },
      {
        level: "hard",
        question: "Какой фильм рассказывает о ямайских бобслеистах?",
        answers: ["«Крутые виражи»", "«Форсаж»", "«Рокки 4»"],
        correctAnswer: "«Крутые виражи»",
        sport: "Кино и бобслей"
      },
      {
        level: "hard",
        question: "Какой фильм основан на истории футбольного клуба «Ньюкасл Юнайтед»?",
        answers: ["«Зелёная улица»", "«Гол!»", "«Город у моря»"],
        correctAnswer: "«Гол!»",
        sport: "Кино и футбол"
      },
      {
        level: "hard",
        question: "В каком фильме снялся Майк Тайсон в роли самого себя?",
        answers: ["«Рокки 5»", "«Игра на деньги»", "«Мальчишник в Вегасе»"],
        correctAnswer: "«Мальчишник в Вегасе»",
        sport: "Кино и бокс"
      },
      {
        level: "hard",
        question: "Какой фильм основан на истории баскетбольной команды, выигравшей Олимпиаду-1972?",
        answers: ["«Движение вверх»", "«Команда»", "«Тренер»"],
        correctAnswer: "«Движение вверх»",
        sport: "Кино и баскетбол"
      },
      {
        level: "hard",
        question: "Какой фильм основан на истории боксёра-женщины?",
        answers: ["«Мэри-ком»", "«Девушка с татуировкой дракона»", "«Крутая Джорджия»"],
        correctAnswer: "«Мэри-ком»",
        sport: "Кино и бокс"
      }
];

module.exports = questionsPart1;