import React from "react";
import "./css/App.css";

const WelcomeScreen = ({ startQuiz }) => {
  return (
    <div className="quiz-container">
      <div className="welcome-card">
        <h1>Добро пожаловать в викторину!</h1>
        <button className="start-button" onClick={startQuiz}>
          Начать викторину
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
