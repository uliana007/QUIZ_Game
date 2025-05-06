import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./css/Matreshka.css";
import SoundContext from './SoundContext';

export const promoList = [
  { label: "Скидка 200₽ на первый онлайн-заказ по промокоду", code: "VSEAF8", referralLink: "https://pxl.leads.su/click/69922da7a7cc76bcdd989024cb86a6f9?erid=2W5zFJodDUL" },
  { label: "Бессрочный промокод на 700 бонусов в Делимобиль", code: "sportliga", referralLink: "https://cpatracking.ru/go/1c0317f70b2d426b7a24e4242aaa9b3e365b64d1eb0a0b0b/?erid=2VtzqvL9BbV" },
  { label: "Скидка в 1000 рублей в магазин одежды Putin-Team", code: "AD-OMISF-0B2AW10RM2025", referralLink: "https://tplto.com/d8e4f605/" },
  { label: "Скидка 7% на товары по полной цене в Street-Beat", code: "sportliga", referralLink: "https://tplto.com/d9e4f605/" },
  { label: "Скидка 750 ₽ на первый заказ от 3 000 ₽, раздел рестораны в Купер", code: "750pf", referralLink: "https://tplto.com/dae4f605/" },
  { label: "Скидка 200 ₽ на первый заказ от 800 ₽, раздел рестораны в Купер", code: "200plrest", referralLink: "https://tplto.com/dae4f605/" },
  { label: "5 фрибетов по 1 000 руб в Парибет", code: "SPORTLIGA7", referralLink: "https://fon.bet/" },
  { label: "Фрибет до 15 000 в Фонбет", code: "SPORTLIGA7", referralLink: "https://pari.ru/" },
  { label: "Скидка 5% на один заказ по промокоду в Brandshop", code: "BRANDSHOP", referralLink: "https://tplto.com/dbe4f605/" },
  { label: "Скидка 70% на товары  в Polaris", code: "sportliga25adv", referralLink: "https://tplto.com/dce4f605/" },
  { label: "Скидка 300 ₽ на корзину от 3000₽ в КотоФото", code: "sportliga", referralLink: "https://tplto.com/dde4f605/" },
  { label: "Скидка 500 ₽ на корзину от 7000₽ в КотоФото", code: "sportliga7", referralLink: "https://tplto.com/dde4f605/" },
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
  const { playButtonClickSound } = useContext(SoundContext);

  const copyToClipboard = () => {
    playButtonClickSound();
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
        <motion.div className="font-bold text-lg mb-4">
          {promoCode ? promoCode.label : ""}
        </motion.div>
        
        <motion.div className="text-gray-700 mb-4 mt-2">
          ВАШ ПРОМОКОД: <strong>{promoCode ? promoCode.code : ""}</strong>
        </motion.div>

        <motion.button
          onClick={copyToClipboard}
          className="copy-button mb-6" // Увеличенный margin-bottom
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📋 Скопировать
        </motion.button>

        {promoCode?.referralLink && (
          <motion.a
            href={promoCode.referralLink}
            target="_blank"
            rel="noopener noreferrer"
            className="referral-link pulsing-cloud mt-4 block" // Добавлен margin-top
          >
            Перейти по ссылке
          </motion.a>
        )}
      </div>
      {notification && <PromoNotification message={notification} />}
    </motion.div>
  );
}


export default PromoCodeTicket;