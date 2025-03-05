import React, { useState, useEffect, useContext } from "react";
import WelcomeScreen from "./WelcomeScreen";
import Result from "./Result";
import Instructions from "./Instructions";
import questions from "./data";
import basketIcon from "./assets/png/football-goal.png";
import SoundContext from './SoundContext';

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

  useEffect(() => {
    if (quizStarted) {
      const shuffled = questions.sort(() => 0.5 - Math.random()).slice(0, 30);
      setQuizQuestions(shuffled);
      setCurrentQuestionIndex(0);
      setTimeLeft(8);
      setTimerActive(true);
      setCorrectStreak(0);
      setCorrectAnswers(0);
    }
  }, [quizStarted]);

  useEffect(() => {
    if (!timerActive || isFinished || quizQuestions.length === 0 || answerStatus !== null) return;

    setTimeLeft(8);
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

    setTimeout(() => {
      document.querySelectorAll(".answer-button").forEach((btn) => btn.blur());

      if (isCorrect) {
        setCorrectAnswers((prev) => prev + 1);
        setCorrectStreak((prev) => prev + 1);

        if (correctStreak + 1 === 8) {
          setHasWon(true);
          setIsFinished(true);
          setTimerActive(false);
        } else {
          handleNextQuestion();
        }
      } else {
        setCorrectStreak(0);
        setCorrectAnswers(0);  // Сбросить счетчик правильных ответов при ошибке
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
      setIsFinished(true);
      setTimerActive(false);
    }
  };

  const startQuiz = () => {
    playButtonClickSound();
    setShowInstructions(true);
  };

  const startGame = () => {
    playButtonClickSound();
    setShowInstructions(false);
    setQuizStarted(true);
  };

  const restartQuiz = () => {
    playButtonClickSound();
    setIsFinished(false);
    setCurrentQuestionIndex(0);
    setProgress(0);
    setSelectedAnswer(null);
    setAnswerStatus(null);
    setCorrectStreak(0);
    setCorrectAnswers(0);
    setHasWon(false);
    setQuizStarted(true);
    setTimerActive(true);

    const shuffled = questions.sort(() => 0.5 - Math.random()).slice(0, 30);
    setQuizQuestions(shuffled);
    setTimeLeft(8);
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