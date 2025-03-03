import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import sadFaceIcon from "./assets/png/sad-football.png";
import "./css/styles.css";
import "./css/Lose.css";
import SoundContext from './SoundContext';

const Lose = ({ restartQuiz }) => {
  const [showRestart, setShowRestart] = useState(false); // Скрыто изначально
  const { playButtonClickSound, playLoseSound } = useContext(SoundContext);

  useEffect(() => {
    setShowRestart(true); // Показать кнопку при загрузке компонента
    playLoseSound(); // Проигрываем звук проигрыша при загрузке компонента
  }, [playLoseSound]);

  const handleRestartClick = () => {
    playButtonClickSound();
    restartQuiz();
  };

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
            <button className="restart-button" onClick={handleRestartClick}>
              Идти за новой попыткой!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lose;