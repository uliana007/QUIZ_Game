import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PromoCodeTicket, { promoList } from "./PromoCodeTicket";
import "./css/Matreshka.css";
import matryoshkaBody from "./assets/png/matreshka-v2.png";
import matryoshkaTop from "./assets/png/matreshka-top-v2.png";
import SoundContext from './SoundContext';

function Matreshka({ onPromoDisplayed }) {
  const [openedMatreshka, setOpenedMatreshka] = useState(null);
  const [promoCode, setPromoCode] = useState(null);
  const [isBlurred, setIsBlurred] = useState(false);
  const [usedPromoCodes, setUsedPromoCodes] = useState([]);
  const { playButtonClickSound, playMatreshkaAppearSound } = useContext(SoundContext);

  useEffect(() => {
    playMatreshkaAppearSound();
  }, [playMatreshkaAppearSound]);

  const handleMatreshkaClick = (id) => {
    if (openedMatreshka) return;

    playButtonClickSound();

    const availablePromoCodes = promoList.filter(
      (promo) => !usedPromoCodes.includes(promo.code)
    );

    if (availablePromoCodes.length === 0) {
      alert("Все промокоды использованы!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * availablePromoCodes.length);
    const newPromoCode = availablePromoCodes[randomIndex];

    setUsedPromoCodes((prev) => [...prev, newPromoCode.code]);
    setPromoCode(newPromoCode);
    setOpenedMatreshka(id);
    setIsBlurred(true);

    setTimeout(() => {
      if (onPromoDisplayed) {
        onPromoDisplayed();
      }
    }, 1000);
  };

  return (
    <div className="game-container">
      <div className={`background-overlay ${isBlurred ? "blurred" : ""}`}></div>

      <h3 className="game-title">Выбери матрешку:</h3>
      <div className="matryoshkas">
        {[1, 2, 3].map((id) => (
          <motion.div
            key={id}
            className={`matryoshka ${openedMatreshka === id ? "opened" : ""}`}
            onClick={() => handleMatreshkaClick(id)}
            whileHover={openedMatreshka === null ? { scale: 1.1 } : {}}
            whileTap={{ scale: 0.95 }}
            animate={{
              width: openedMatreshka === id ? 300 : 100,
              height: openedMatreshka === id ? 300 : 200,
              y: openedMatreshka === id ? -130 : 0, // Поднятие выше
              zIndex: openedMatreshka === id ? 10 : 1, // Выделяем выбранную матрешку
            }}
            transition={{ type: "spring", stiffness: 120, damping: 15, duration: 0.8 }}
          >
            <motion.div
              className="matryoshka-body"
              animate={{
                y: openedMatreshka === id ? -190 : 0, // Поднятие матрешки выше
              }}
              transition={{ type: "spring", stiffness: 360, damping: 15, duration: 0.8 }}
            >
              <motion.img
                src={matryoshkaBody}
                alt="Matryoshka"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
              />
            </motion.div>
            <motion.div
              className="matryoshka-top"
              animate={{
                y: openedMatreshka === id ? -350 : 0, // Поднятие крышки выше
              }}
              transition={{ type: "spring", stiffness: 350, damping: 15, duration: 0.8 }}
            >
              <motion.img
                src={matryoshkaTop}
                alt="Matryoshka Top"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {openedMatreshka && (
          <motion.div
            className="promo-ticket-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="promo-ticket-container"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.8 }}
            >
              <PromoCodeTicket promoCode={promoCode} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Matreshka;