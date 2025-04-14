import React, { useState, useEffect, useContext } from "react";
import WelcomeScreen from "./WelcomeScreen";
import Result from "./Result";
import Instructions from "./Instructions";
import basketIcon from "./assets/png/football-goal.png";
import SoundContext from './SoundContext';
import { loadQuestions as loadEasyQuestions, analytics } from './db_config/firebaseConfig';
import { loadQuestions as loadHardQuestions } from './questions-hard/firebaseConfig';
import { logEvent } from "firebase/analytics"; // Импорт logEvent из Firebase Analytics

const Quiz = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [timeLeft, setTimeLeft] = useState(8);
  const [timerActive, setTimerActive] = useState(false);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [hasWon, setHasWon] = useState(false);

  const { playButtonClickSound } = useContext(SoundContext);

  const filterValidQuestions = (questions) => {
    return questions.filter(
      (q) => q && q.question && Array.isArray(q.answers) && q.answers.length > 0 && q.correctAnswer
    );
  };

  useEffect(() => {
    if (quizStarted) {
      logEvent(analytics, "quiz_started"); // Логируем начало викторины
      const fetchQuestions = async () => {
        try {
          const easyQuestions = filterValidQuestions(await loadEasyQuestions());
          const hardQuestions = filterValidQuestions(await loadHardQuestions());

          let quizQuestions = [];
          for (let i = 0; i < 30; i++) {
            if ((i + 1) % 8 === 0) {
              const hardQuestion = hardQuestions[Math.floor(Math.random() * hardQuestions.length)];
              if (hardQuestion) quizQuestions.push(hardQuestion);
            } else {
              const easyQuestion = easyQuestions[Math.floor(Math.random() * easyQuestions.length)];
              if (easyQuestion) quizQuestions.push(easyQuestion);
            }
          }

          setQuizQuestions(quizQuestions);
          setCurrentQuestionIndex(0);
          setTimeLeft(8);
          setTimerActive(false); // Таймер отключен до старта игры
          setCorrectStreak(0);
          setCorrectAnswers(0);
        } catch (error) {
          console.error("Ошибка загрузки вопросов:", error);
          logEvent(analytics, "error_loading_questions", { error_message: error.message }); // Логируем ошибку
        }
      };
      fetchQuestions();
    }
  }, [quizStarted]);

  useEffect(() => {
    if (!timerActive || isFinished || quizQuestions.length === 0 || answerStatus !== null) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          handleNextQuestion(false);
          return 8;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, timerActive, answerStatus]);

  const handleAnswer = (answer) => {
    if (answerStatus !== null) return;

    playButtonClickSound();

    const isCorrect = answer === quizQuestions[currentQuestionIndex].correctAnswer;
    setSelectedAnswer(answer);
    setAnswerStatus(isCorrect ? "correct" : "incorrect");

    // Логируем событие выбора ответа
    logEvent(analytics, "answer_selected", {
      question: quizQuestions[currentQuestionIndex].question,
      selected_answer: answer,
      is_correct: isCorrect,
    });

    setTimeout(() => {
      document.querySelectorAll(".answer-button").forEach((btn) => btn.blur());

      if (isCorrect) {
        setCorrectAnswers((prev) => prev + 1);
        setCorrectStreak((prev) => prev + 1);

        if (correctStreak + 1 === 8) {
          logEvent(analytics, "game_won", { correct_answers: correctAnswers }); // Логируем победу
          setHasWon(true);
          setIsFinished(true);
          setTimerActive(false);
        } else {
          handleNextQuestion();
        }
      } else {
        logEvent(analytics, "streak_broken"); // Логируем сбой серии
        setCorrectStreak(0);
        setCorrectAnswers(0); // Сбросить счетчик правильных ответов при ошибке
        handleNextQuestion();
      }
    }, 300);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setAnswerStatus(null);

    setTimeout(() => {
      document.activeElement?.blur();
    }, 100);

    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setProgress(((currentQuestionIndex + 1) / quizQuestions.length) * 100);
    } else {
      logEvent(analytics, "quiz_finished", { correct_answers: correctAnswers }); // Логируем завершение викторины
      if (correctAnswers < 8) {
        logEvent(analytics, "game_lost", { correct_answers: correctAnswers }); // Логируем проигрыш
      }
      setIsFinished(true);
      setTimerActive(false);
    }
  };

  const startQuiz = () => {
    playButtonClickSound();
    logEvent(analytics, "instructions_viewed"); // Логируем просмотр инструкций
    setShowInstructions(true);
  };

  const startGame = () => {
    playButtonClickSound();
    logEvent(analytics, "quiz_started_after_instructions"); // Логируем начало викторины после инструкций
    setShowInstructions(false);
    setQuizStarted(true);
  };

  const restartQuiz = () => {
    logEvent(analytics, "quiz_restarted"); // Логируем перезапуск викторины
    playButtonClickSound();
    setIsFinished(false);
    setShowInstructions(false);
    setCurrentQuestionIndex(0);
    setProgress(0);
    setSelectedAnswer(null);
    setAnswerStatus(null);
    setCorrectStreak(0);
    setCorrectAnswers(0);
    setHasWon(false);

    const fetchQuestions = async () => {
      const easyQuestions = filterValidQuestions(await loadEasyQuestions());
      const hardQuestions = filterValidQuestions(await loadHardQuestions());

      let quizQuestions = [];
      for (let i = 0; i < 30; i++) {
        if ((i + 1) % 8 === 0) {
          const hardQuestion = hardQuestions[Math.floor(Math.random() * hardQuestions.length)];
          if (hardQuestion) quizQuestions.push(hardQuestion);
        } else {
          const easyQuestion = easyQuestions[Math.floor(Math.random() * easyQuestions.length)];
          if (easyQuestion) quizQuestions.push(easyQuestion);
        }
      }

      setQuizQuestions(quizQuestions);
      setTimeLeft(8);
      setTimerActive(true); // Таймер включается только после загрузки вопросов
    };
    fetchQuestions();
  };

  if (!quizStarted && !showInstructions) {
    return <WelcomeScreen startQuiz={startQuiz} />;
  }

  if (showInstructions) {
    return <Instructions startGame={startGame} />;
  }

  if (isFinished) {
    return <Result hasWon={hasWon} restartQuiz={restartQuiz} correctAnswers={correctAnswers} />;
  }

  if (quizQuestions.length === 0) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="quiz-container">
      <div className="coin-basket">
        <img src={basketIcon} alt="basket" className="basket-icon" />
        <div className="correct-answer-counter">{correctAnswers}</div>
      </div>

      <div className="quiz-card">
        <h2 className="quiz-question">{quizQuestions[currentQuestionIndex].question}</h2>

        {((currentQuestionIndex + 1) % 8 === 0) && (
          <div className="hard-question-label">(hard)</div>
        )}

        <div className={`timer ${timeLeft > 5 ? "green" : timeLeft > 3 ? "orange" : "red"}`}>
          Осталось времени: {timeLeft} сек
        </div>

        <div className="answers-container">
          {quizQuestions[currentQuestionIndex].answers.map((answer, index) => (
            <button
              key={index}
              className={`quiz-answer-button ${selectedAnswer === answer ? (answerStatus === "correct" ? "correct-answer" : "incorrect-answer") : ""}`}
              onClick={() => handleAnswer(answer)}
              disabled={selectedAnswer !== null}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default Quiz;