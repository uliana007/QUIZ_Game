import React, { useState, useEffect } from "react";
import "./css/instructions.css";

const instructionSteps = [
  {
    text: "Корзина",
    description: "Здесь отображается количество заработанных очков",
    highlight: { top: "15%", left: "65%", width: "100px", height: "110px" },
    boxImage: require("./assets/png/screen-footbal-goal.png"),
    boxPosition: { top: "65%", left: "60%" },
    boxSize: { width: "150px", height: "250px" },
  },
  {
    text: "Поле для выбора ответов",
    description: "Здесь отображаются варианты ответов",
    highlight: { top: "57%", left: "15%", width: "300px", height: "240px" },
    boxImage: require("./assets/png/screen-quistions.png"),
    boxPosition: { top: "35%", left: "50%" },
    boxSize: { width: "200px", height: "200px" },
  },
  {
    text: "Секундомер",
    description: "Здесь отображается оставшееся время на ответ",
    highlight: { top: "48%", left: "67%", width: "90px", height: "45px" },
    boxImage: require("./assets/png/33.png"),
    boxPosition: { top: "80%", left: "50%" },
    boxSize: { width: "200px", height: "190px" },
  },
];

const Instructions = ({ startGame }) => {
  const [step, setStep] = useState(0);
  const [clipPath, setClipPath] = useState("");

  useEffect(() => {
    const { top, left, width, height } = instructionSteps[step].highlight;
    setClipPath(`polygon(
      0% 0%, 100% 0%, 100% 100%, 0% 100%,
      ${left} ${top}, 
      calc(${left} + ${width}) ${top}, 
      calc(${left} + ${width}) calc(${top} + ${height}), 
      ${left} calc(${top} + ${height})
    )`);
  }, [step]);

  const nextStep = () => {
    if (step < instructionSteps.length - 1) {
      setStep(step + 1);
    } else {
      startGame();
    }
  };

  return (
    <>
      <h1 className="quiz-title">Игра Три Восьмёрки</h1>
      <div className="instruction-overlay">
  
        {/* Затемненный фон с вырезанным окном */}
        <div className="dark-overlay" style={{ clipPath }}></div>
  
        {/* Подсвеченная область с изображением */}
        <div
          className="highlight-box"
          style={{
            ...instructionSteps[step].highlight,
            backgroundImage: `url(${instructionSteps[step].boxImage})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
      

      {/* Текстовое описание */}
      <div
        className="instruction-box"
        style={{
          top: instructionSteps[step].boxPosition.top,
          left: instructionSteps[step].boxPosition.left,
          width: instructionSteps[step].boxSize.width,
          height: instructionSteps[step].boxSize.height,
          transform: "translate(-50%, -50%)",
        }}
      >
        <p>{instructionSteps[step].text}</p>
        <p className="instruction-description">{instructionSteps[step].description}</p>

        <button className="next-button" onClick={nextStep}>
          {step < instructionSteps.length - 1 ? "Далее" : "Начать игру"}
        </button>
      </div>
    </div>
    </>
  );
};

export default Instructions;

