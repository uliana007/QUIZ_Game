import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";
import Instructions from "./Instructions";
import "./css/App.css";
import logoIcon from "./assets/png/logo.png";
import backgroundImage from "./assets/png/fon-balls.png";
import soundManager from './soundManager';
import BlurScreen from './BlurScreen';
import { SoundProvider } from './SoundContext';

function App() {
  const [isBlurScreenVisible, setIsBlurScreenVisible] = useState(true);

  useEffect(() => {
    soundManager.stopBackgroundMusic();
  }, []);

  const handleBlurScreenClick = () => {
    soundManager.playButtonClickSound();
    setIsBlurScreenVisible(false);
    soundManager.playBackgroundMusic();
  };

  return (
    <SoundProvider>
      <div className="app-container">
        {isBlurScreenVisible && <BlurScreen onClick={handleBlurScreenClick} />}
        {!isBlurScreenVisible && (
          <>
            <div className="overlay-bg">
            </div>
            <h1>Игра Три Восьмёрки</h1>
            <div className="logo-container">
              <img src={logoIcon} alt="Logo" className="logo" />
            </div>
            <Quiz />
          </>
        )}
      </div>
    </SoundProvider>
  );
}

export default App;