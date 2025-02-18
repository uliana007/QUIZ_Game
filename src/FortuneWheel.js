import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { Howl } from "howler";
import "./css/FortuneWheel.css";

const prizes = [
  { label: "📱 iPhone 15", type: "device" },
  { label: "🎟️ Промокод -50% в ЯндексЛавка", type: "promo", code: "PROMO50" },
  { label: "🎟️ Промокод -30% на Кинопоиск", type: "promo", code: "PROMO30" },
  { label: "📺 Подписка RuTube", type: "promo", code: "RUTUBE1M" },
  { label: "🎟️ Промокод -10% в ЕАптека", type: "promo", code: "PROMO10" },
  { label: "📱 iPhone 14", type: "device" },
  { label: "🎟️ Промокод -40% в Остров Мечты", type: "promo", code: "PROMO40" },
  { label: "🎟️ Промокод -20% в ЯндексЛавка", type: "promo", code: "PROMO20" },
  { label: "📺 Подписка RuTube", type: "promo", code: "RUTUBE3M" },
  { label: "🎟️ Промокод -60% на Кинопоиск", type: "promo", code: "PROMO60" },
  { label: "🎟️ Промокод -70% на Кинопоиск", type: "promo", code: "PROMO70" },
  { label: "🎟️ Промокод -80% в ЯндексЛавка", type: "promo", code: "PROMO80" }
];

const spinSound = new Howl({ src: ["./assets/wheel-spin.mp3"], volume: 1 });
const winSound = new Howl({ src: ["./assets/win.mp3"], volume: 1 });

const FortuneWheel = ({ onSpinComplete }) => {
  const wheelRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningPrize, setWinningPrize] = useState(null);
  const [revealPromo, setRevealPromo] = useState(false);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWinningPrize(null);
    setRevealPromo(false);
    spinSound.play();

    const spins = Math.floor(Math.random() * 5) + 5;
    const segmentAngle = 360 / prizes.length;
    const stopAngle = Math.floor(Math.random() * prizes.length) * segmentAngle;
    const totalRotation = spins * 360 + stopAngle;

    gsap.to(wheelRef.current, {
      rotation: totalRotation,
      duration: 4,
      ease: "power4.out",
      onComplete: () => {
        setIsSpinning(false);
        const index = Math.floor(stopAngle / segmentAngle);
        setWinningPrize(prizes[index]);
        winSound.play();
        if (onSpinComplete) onSpinComplete();
      }
    });
  };

  return (
    <div className="wheel-container">
      <div className="arrow"></div>
      <div className="wheel-border">
        <div className="wheel" ref={wheelRef}>
          {prizes.map((prize, index) => {
            const rotation = index * (360 / prizes.length);
            return (
              <div
                key={index}
                className="segment"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <span className="segment-text">{prize.label}</span>
              </div>
            );
          })}
        </div>
      </div>
      <button className="spin-button" onClick={spinWheel} disabled={isSpinning}>
        Крутить
      </button>
      {winningPrize && (
        <div className="result-modal">
          <p>Вы выиграли: {winningPrize.label} 🎉</p>
          {winningPrize.type === "promo" && (
            <p
              className={`promo-code ${revealPromo ? "visible" : "blurred"}`}
              onClick={() => setRevealPromo(true)}
            >
              {revealPromo ? winningPrize.code : "***********"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FortuneWheel;