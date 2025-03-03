import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./css/Matreshka.css";

export const promoList = [
  { label: " Промокод -30% на Кинопоиск", code: "PROMO30" },
  { label: "📺 Подписка RuTube", code: "RUTUBE1M" },
  { label: "Промокод -10% в ЕАптека", code: "PROMO10" },
  { label: "Промокод -40% в Остров Мечты", code: "PROMO40" },
  { label: "Промокод -20% в ЯндексЛавка", code: "PROMO20" },
  { label: "📺 Подписка RuTube", code: "RUTUBE3M" },
  { label: "Промокод -60% на Кинопоиск", code: "PROMO60" },
  { label: "Промокод -70% на Кинопоиск", code: "PROMO70" },
  { label: "Промокод -80% в ЯндексЛавка", code: "PROMO80" },
  { label: "Промокод -15% в ЯндексЛавка", code: "PROMO15" },
  { label: "Промокод -25% на Кинопоиск", code: "PROMO25" },
];

const PromoNotification = ({ message }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="promo-notification"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function PromoCodeTicket({ promoCode }) {
  const [notification, setNotification] = useState(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(promoCode.code).then(() => {
      setNotification("Промокод скопирован!");
      setTimeout(() => setNotification(null), 3000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <motion.div
      className="promo-ticket-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="promo-ticket bg-white p-4 rounded-lg shadow-md">
        <motion.p className="font-bold text-lg">
          {promoCode ? promoCode.label : ""}
        </motion.p>
        <motion.p className="text-gray-700 mt-2">
          ВАШ ПРОМОКОД: <strong>{promoCode ? promoCode.code : ""}</strong>
        </motion.p>
        <motion.button
          onClick={copyToClipboard}
          className="copy-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📋 Скопировать
        </motion.button>
      </div>
      {notification && <PromoNotification message={notification} />}
    </motion.div>
  );
}

export default PromoCodeTicket;