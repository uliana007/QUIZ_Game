import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import sadFaceIcon from "./assets/png/sad-football.png";
import "./css/styles.css";
import "./css/Lose.css";

const Lose = ({ restartQuiz }) => {
  const [showRestart, setShowRestart] = useState(false); // Скрыто изначально

  useEffect(() => {
    setShowRestart(true); // Показать кнопку при загрузке компонента
  }, []);

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h3 className="result-title lose">Вы проиграли</h3> {/* Заменили h1 на .result-title */}

        <div className="lose-animation-container">
          <motion.img
            src={sadFaceIcon}
            alt="Sad Face"
            className="lose-animation"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>

        {showRestart && (
          <div className="restart-button-container restart-center">
            <button className="restart-button" onClick={restartQuiz}>
              Повторить
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lose;