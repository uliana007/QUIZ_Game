import React, { createContext } from 'react';
import soundManager from './soundManager';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const playButtonClickSound = () => {
    soundManager.playButtonClickSound();
  };

  const playMatreshkaAppearSound = () => {
    soundManager.playMatreshkaAppearSound();
  };

  const playLoseSound = () => {
    soundManager.playLoseSound();
  };

  return (
    <SoundContext.Provider value={{ playButtonClickSound, playMatreshkaAppearSound, playLoseSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export default SoundContext;