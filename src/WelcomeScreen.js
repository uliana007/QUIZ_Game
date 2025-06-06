import React from "react";
import "./css/WelcomeScreen.css";
import soundManager from './soundManager';
import { trackGoal } from './utils/analytics'; 
import { logEvent } from "./utils/googleAnalytics";
// 🟩 Добавляем импорт хука для Telemetree
import { useTWAEvent } from '@tonsolutions/telemetree-react';


const WelcomeScreen = ({ startQuiz }) => {

  // 🟩 Инициализируем Telemetree event builder
  const eventBuilder = useTWAEvent();

const handleStartClick = () => {
  console.log('Клик на "Начать викторину" - отправляем цель в Яндекс.Метрику');
  trackGoal('quiz_click');
  
      // 🟩 Добавляем отправку события в Google Analytics
    logEvent("engagement", "click_quiz", "Клик Викторина"); 

     // 🟩 Telemetree событие
    eventBuilder.track('Start Quiz Clicked', {
      label: 'Start Quiz Button',
      category: 'User Engagement',
    });

  soundManager.playButtonClickSound();
  startQuiz();
};


  return (
    <div className="quiz-container">
      <div className="welcome-card">
        <h3>Добро пожаловать в викторину!</h3>
        {/* Карточка с инструкцией */}
        <div className="instructions-card">
          <h2>Правила игры</h2>
          <div className="rules">
            <div className="rule">
              <span className="emoji">8️⃣</span>
              <div className="rule-content">
                <p className="rule-title">8 правильных ответов подряд:</p>
                <p className="rule-description">Чтобы выиграть, дайте 8 правильных ответов подряд</p>
              </div>
            </div>
            <div className="rule">
              <span className="emoji">8️⃣</span>
              <div className="rule-content">
                <p className="rule-title">8 секунд на ответ:</p>
                <p className="rule-description">У вас есть 8 секунд, чтобы выбрать правильный вариант, как в динамике футбольного матча.</p>
              </div>
            </div>
            <div className="rule">
              <span className="emoji">8️⃣</span>
              <div className="rule-content">
                <p className="rule-title">888 — три матрёшки:</p>
                <p className="rule-description">Выбери одну из трёх матрёшек (888), чтобы забрать свой выигрыш!</p>
              </div>
            </div>
          </div>
        </div>
        {/* Кнопка "Начать викторину" */}
        <button className="start-button" onClick={handleStartClick}>
          Начать викторину
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;