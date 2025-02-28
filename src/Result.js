import React, { useState, useEffect } from "react";
import basketIcon from "./assets/png/football-goal.png";
import coinIcon from "./assets/png/icon-money.png";
import "./css/styles.css";
import "./css/Result.css";
import Matreshka from "./Matreshka";

const Result = ({ hasWon, coins, setCoins, correctAnswers, restartQuiz }) => {
  const [showCoin, setShowCoin] = useState(false);
  const [animateCoin, setAnimateCoin] = useState(false);
  const [disappear, setDisappear] = useState(false);
  const [showWheel, setShowWheel] = useState(false);
  const [showRestart, setShowRestart] = useState(false); // Теперь скрыто изначально

  useEffect(() => {
    if (hasWon) {
      setShowCoin(true);
      setTimeout(() => {
        setAnimateCoin(true);
        setTimeout(() => {
          setDisappear(true);
          if (typeof setCoins === "function") {
            setCoins((prevCoins) => prevCoins + 1);
          }
          setTimeout(() => {
            setShowWheel(true);
          }, 500);
        }, 1500);
      }, 500);
    } else {
      setShowRestart(true); // Если проиграл, сразу показать кнопку
    }
  }, [hasWon, setCoins]);

  const handlePromoDisplayed = () => {
    setShowRestart(true); // Показать кнопку после отображения промокода
  };

  return (
    <div className="quiz-container">
      <div className="coin-basket">
        <img src={basketIcon} alt="basket" className="basket-icon" />
        <div className="correct-answer-counter">{correctAnswers}</div>
      </div>
      <div className="quiz-card">
        <h1 className="result-text">{hasWon ? "Вы выиграли!" : "Вы проиграли"}</h1>

        {hasWon && showCoin && (
          <div className={`coin-container ${animateCoin ? "animate" : ""} ${disappear ? "disappear" : ""}`}>
            <img src={coinIcon} alt="coin" className="coin-image" />
          </div>
        )}

        {hasWon && showWheel && <Matreshka onPromoDisplayed={handlePromoDisplayed} />} 

        {showRestart && (
          <div className={`restart-button-container ${hasWon ? "restart-bottom" : "restart-center"}`}>
            <button className="restart-button" onClick={restartQuiz}>
              Повторить
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
