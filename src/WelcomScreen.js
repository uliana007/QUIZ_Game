import React from "react";
import "./css/WelcomeScreen.css";

const WelcomeScreen = ({ startQuiz }) => {
  return (
    <div className="quiz-container">
      <div className="welcome-card">
        <h3>Добро пожаловать в викторину!</h3>
        {/* Карточка с инструкцией */}
        <div className="instructions-card">
          <h2>Правила игры</h2>
          <div className="rules">
            <div className="rule">
              <span>1️⃣</span>
              <p>Выберите правильный ответ из предложенных вариантов.</p>
            </div>
            <div className="rule">
              <span>2️⃣</span>
              <p>За каждый правильный ответ начисляются очки.</p>
            </div>
            <div className="rule">
              <span>3️⃣</span>
              <p>У вас ограниченное время на каждый вопрос! ⏳</p>
            </div>
            <div className="rule">
              <span>4️⃣</span>
              <p>Попробуйте набрать максимальный результат! 🎯</p>
            </div>
          </div>
        </div>
        {/* Кнопка "Начать викторину" */}
        <button className="start-button" onClick={startQuiz}>
          Начать викторину
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;