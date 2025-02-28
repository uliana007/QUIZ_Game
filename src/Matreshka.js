import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PromoCodeTicket, { promoList } from "./PromoCodeTicket";
import "./css/Matreshka.css";

function Matreshka({ onPromoDisplayed }) {
  const [openedMatreshka, setOpenedMatreshka] = useState(null);
  const [promoCode, setPromoCode] = useState(null);
  const [isBlurred, setIsBlurred] = useState(false);
  const [usedPromoCodes, setUsedPromoCodes] = useState([]);
  const [notification, setNotification] = useState(null); // Добавлено для уведомлений

  const handleMatreshkaClick = (id) => {
    if (openedMatreshka) return;

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

  // Функция для обработки копирования промокода
  const handleCopyPromoCode = () => {
    if (promoCode) {
      navigator.clipboard.writeText(promoCode.code);
      setNotification("Промокод скопирован!");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="game-container">
      <div className={`background-overlay ${isBlurred ? "blurred" : ""}`}></div>

      <h1>Выбери матрешку:</h1>
      <div className="matryoshkas">
        {[1, 2, 3].map((id) => (
          <motion.div
            key={id}
            className={`matryoshka ${openedMatreshka ? "selected" : ""}`}
            onClick={() => handleMatreshkaClick(id)}
            whileHover={{ scale: openedMatreshka ? 1 : 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: openedMatreshka === id ? 2 : 1,
              y: openedMatreshka === id ? -150 : 0,
            }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="matryoshka-body">
              <img src={require("./assets/png/matreshka.png")} alt="Matryoshka" />
            </div>
            <motion.div
              className="matryoshka-top"
              animate={{ y: openedMatreshka === id ? -50 : 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <img src={require("./assets/png/matryoshka-top.png")} alt="Matryoshka Top" />
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
              transition={{ type: "spring", stiffness: 100 }}
            >
              <PromoCodeTicket promoCode={promoCode} onCopyPromoCode={handleCopyPromoCode} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {notification && <Notification message={notification} />}
    </div>
  );
}

function Notification({ message }) {
  return <div className="notification">{message}</div>;
}

export default Matreshka;
