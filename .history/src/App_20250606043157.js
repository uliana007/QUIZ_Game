import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";
import Instructions from "./Instructions";
import "./css/App.css";
import logoIcon from "./assets/png/logo.png";
import backgroundImage from "./assets/png/fon-balls.png";
import soundManager from './soundManager';
import BlurScreen from './BlurScreen';
import { SoundProvider } from './SoundContext';
import { TrackGroups, TwaAnalyticsProvider } from '@tonsolutions/telemetree-react';

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
    <TwaAnalyticsProvider   // 🟩 обёртка приложения для Telemetree
      projectId='abe9b751-af69-441c-98c0-f3bbd46e4363'
        apiKey='99d1568a-9497-4590-b8bb-ba1cee7da514'
        trackGroup={TrackGroups.MEDIUM} // default is TrackGroups.MEDIUM
    >
    <SoundProvider>
      <div className="app-container">
        {isBlurScreenVisible && <BlurScreen onClick={handleBlurScreenClick} />}
        {!isBlurScreenVisible && (
          <>
            <div className="overlay-bg">
            </div>
            <h1>Игра Три Восьмёрки</h1>
            {/* <div className="logo-container">
              <img src={logoIcon} alt="Logo" className="logo" />
            </div> */}
            <Quiz />
          </>
        )}
      </div>
    </SoundProvider>
     </TwaAnalyticsProvider>  // 🟩 закрывающий тег Telemetree
  );
}

export default App;