class SoundManager {
  constructor() {
    this.backgroundMusic = new Audio(require('./assets/sounds/Øneheart, reidenshi — distorted memories.mp3'));
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.05; // Установите громкость по вашему усмотрению

    this.buttonClickSound = new Audio(require('./assets/sounds/button.mp3'));
    this.buttonClickSound.volume = 0.8; // Установите громкость по вашему усмотрению

    this.matreshkaAppearSound = new Audio(require('./assets/sounds/happy-bonus.mp3'));
    this.matreshkaAppearSound.volume = 0.8; // Установите громкость по вашему усмотрению

    this.loseSound = new Audio(require('./assets/sounds/lose.mp3'));
    this.loseSound.volume = 0.8; // Установите громкость по вашему усмотрению
  }

  playBackgroundMusic() {
    this.backgroundMusic.play().catch(error => {
      console.error('Failed to play background music:', error);
    });
  }

  stopBackgroundMusic() {
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
  }

  playButtonClickSound() {
    this.buttonClickSound.play().catch(error => {
      console.error('Failed to play button click sound:', error);
    });
  }

  playMatreshkaAppearSound() {
    this.matreshkaAppearSound.play().catch(error => {
      console.error('Failed to play matreshka appear sound:', error);
    });
  }

  playLoseSound() {
    this.loseSound.play().catch(error => {
      console.error('Failed to play lose sound:', error);
    });
  }
}

const soundManager = new SoundManager();
export default soundManager;