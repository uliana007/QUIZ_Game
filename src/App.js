import React from "react";
import Quiz from "./Quiz";
import "./css/App.css";
import logoIcon from "./assets/png/logo.png";
import backgroundImage from "./assets/png/fon-balls.png"; // Фоновое изображение

function App() {
  return (
    <div className="app-container">
      {/* Фоновое изображение перед контентом, но под карточками */}
      <div className="overlay-bg">
        {/* <img src={backgroundImage} alt="Background" className="background-image" /> */}
      </div>

      {/* Основной контент */}
      <h1>Игра Три Восьмёрки</h1>
      <div className="logo-container">
        <img src={logoIcon} alt="Logo" className="logo" />
      </div>
      <Quiz />
    </div>
  );
}

export default App;


// import React from "react";
// import FortuneWheel from "./FortuneWheel";

// const App = () => {
//   return (
//     <div className="app-container">
//       <FortuneWheel />
//     </div>
//   );
// };

// export default App;
