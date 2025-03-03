import React from "react";
import "./css/BlurScreen.css";
import soundManager from './soundManager';

const BlurScreen = ({ onClick }) => {
  return (
    <div className="blur-screen" onClick={onClick}>
      <h1>Кликни</h1>
    </div>
  );
};

export default BlurScreen;