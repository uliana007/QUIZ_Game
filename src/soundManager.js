class SoundManager {
  constructor() {
    this.backgroundMusic = new Audio(require('./assets/sounds/fon_music.mp3'));
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 1; // Установите громкость по вашему усмотрению

    this.buttonClickSound = new Audio(require('./assets/sounds/click-v2.mp3'));
    this.buttonClickSound.volume = 1; // Установите громкость по вашему усмотрению

    this.matreshkaAppearSound = new Audio(require('./assets/sounds/pobeda.mp3'));
    this.matreshkaAppearSound.volume = 1; // Установите громкость по вашему усмотрению

    this.loseSound = new Audio(require('./assets/sounds/lose.mp3'));
    this.loseSound.volume = 1; // Установите громкость по вашему усмотрению
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