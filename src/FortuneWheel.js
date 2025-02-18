import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { Howl } from "howler";
import "./css/FortuneWheel.css";

const segments = [
  { label: "💰 100 монет", color: "#d4af37" },
  { label: "🔥 Призовой бонус", color: "#ff8000" },
  { label: "🎁 Секретный подарок", color: "#ffd700" },
  { label: "💎 500 монет", color: "#b8860b" },
  { label: "❌ Пустая ячейка", color: "#ffcc00" },
  { label: "💵 250 монет", color: "#daa520" }
];

const spinSound = new Howl({ src: ["./assets/wheel-of-fortune.mp3"], volume: 1 });
const winSound = new Howl({ src: ["./assets/click_wheel.mp3"], volume: 1 });

const FortuneWheel = ({ onSpinComplete }) => {
  const wheelRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningSegment, setWinningSegment] = useState(null);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWinningSegment(null);
    spinSound.play();

    const spins = Math.floor(Math.random() * 5) + 5;
    const segmentAngle = 360 / segments.length;
    const stopAngle = Math.floor(Math.random() * segments.length) * segmentAngle;
    const totalRotation = spins * 360 + stopAngle;

    gsap.to(wheelRef.current, {
      rotation: totalRotation,
      duration: 4,
      ease: "power4.out",
      onComplete: () => {
        setIsSpinning(false);
        const index = Math.floor(stopAngle / segmentAngle);
        setWinningSegment(segments[index]);
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
          {segments.map((segment, index) => {
            const rotation = index * (360 / segments.length);
            return (
              <div
                key={index}
                className="segment"
                style={{ backgroundColor: segment.color, transform: `rotate(${rotation}deg)` }}
              >
                {segment.label}
              </div>
            );
          })}
        </div>
      </div>
      <button className="spin-button" onClick={spinWheel} disabled={isSpinning}>
        Крутить
      </button>

      {winningSegment && (
        <div className="result-modal">
          <p>Вы выиграли: {winningSegment.label} 🎉</p>
        </div>
      )}
    </div>
  );
};

export default FortuneWheel;