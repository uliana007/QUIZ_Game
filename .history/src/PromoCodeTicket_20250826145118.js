import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./css/Matreshka.css";
import SoundContext from './SoundContext';
import { trackGoal } from './utils/analytics';
import { logEvent } from "./utils/googleAnalytics"; // 🟩 импорт функции логирования GA

export const promoList = [
  { label: "Скидка 200₽ на первый онлайн-заказ по промокоду", code: "VSEAF8", referralLink: "https://pxl.leads.su/click/69922da7a7cc76bcdd989024cb86a6f9?erid=2W5zFJodDUL" },
  { label: "Бессрочный промокод на 700 бонусов в Делимобиль", code: "sportliga", referralLink: "https://cpatracking.ru/go/1c0317f70b2d426b7a24e4242aaa9b3e365b64d1eb0a0b0b/?erid=2VtzqvL9BbV" },
  { label: "Скидка в 1000 рублей в магазин одежды Putin-Team", code: "AD-OMISF-0B2AW10RM2025", referralLink: "https://tplto.com/d8e4f605/" },
  { label: "Скидка 7% на товары по полной цене в Street-Beat", code: "sportliga", referralLink: "https://tplto.com/d9e4f605/" },
  { label: "Скидка 750 ₽ на первый заказ от 3 000 ₽, раздел рестораны в Купер", code: "750pf", referralLink: "https://tplto.com/dae4f605/" },
  { label: "Скидка 200 ₽ на первый заказ от 800 ₽, раздел рестораны в Купер", code: "200plrest", referralLink: "https://tplto.com/dae4f605/" },
  { label: "5 фрибетов по 1 000 руб в Парибет", code: "SPORTLIGA7", referralLink: "https://pari.ru/" },
  { label: "Фрибет до 15 000 в Фонбет", code: "SPORTLIGA7", referralLink: "https://fon.bet/" },
  { label: "Скидка 5% на один заказ по промокоду в Brandshop", code: "BRANDSHOP", referralLink: "https://tplto.com/dbe4f605/" },
  { label: "Скидка 300 ₽ на корзину от 3000₽ в КотоФото", code: "sportliga", referralLink: "https://tplto.com/dde4f605/" },
  { label: "Скидка 500 ₽ на корзину от 7000₽ в КотоФото", code: "sportliga7", referralLink: "https://tplto.com/dde4f605/" },

  { label: "Скидка 10% на всё по промокоду на сайте Он и Она", code: "ADVCAKE", referralLink: "https://tplto.com/d5e4f605/" },
  { label: "Скидка 12% на заказ от 3900 ₽ на первую покупку в GLOBUS", code: "a12sale", referralLink: "http://tplto.com/d3e4f605/" },
  { label: "Скидка 5% на заказ в магазине Braun", code: "sale5", referralLink: "https://tplto.com/d6e4f605/" },
  { label: "Скидка 1000 ₽ от суммы корзины 20 000 рублей в Бигам", code: "advcake1000r", referralLink: "https://tplto.com/d7e4f605/" },
  { label: "Скидка 3% при покупке от 1 000 руб в Максидом", code: "advertise0507", referralLink: "https://tplto.com/dfe4f605/" },
  // 16 промиков

  { label: "Скидка до 25% на заказ по промокоду в FoodBand", code: "SportLiga", referralLink: "https://foodband.ru/pizza/?utm_source=yandex&utm_medium=cpc&utm_campaign=112904249&utm_content=16334861002&utm_term=food%20band&roistat_referrer=none&roistat_pos=premium_1&roistat=direct61_search_16334861002_food%20band&yclid=664196993353252863" },
  { label: "Скидка 10% на заказ в Нияма", code: "BEF089021", referralLink: "https://niyama.ru/?utm_source=eLama-yandex&utm_medium=cpc&utm_campaign=Поиск%20%3A%20Доставка&utm_content=cid%7C101539010%7Cgid%7C5339487004%7Caid%7C15424509444%7Cadp%7Cno%7Cdvc%7Cdesktop%7Cpid%7C48583740956%7Crid%7C48583740956%7Cdid%7C48583740956%7Cpos%7Cpremium1%7Cadn%7Csearch%7Ccrid%7C0%7C&utm_term=---autotargeting&yclid=4431288914067587071" },
  { label: "Пицца Мега пепперони 31см на тонком тесте в подарок при заказе от 1700р по промокоду", code: "CITYADS", referralLink: "https://ipizza.ru/msk/"},
  { label: "Скидка 12% на заказ от 1500 по промокоду, действует в Суши Мастер", code: "SportLiga", referralLink: "https://moskva.sushi-master.ru/?yclid=5998612535750950911" },
  { label: "Скидка 12% на заказ от 1500 по промокоду, действует в Галерея Суши", code: "SportLiga", referralLink: "https://tyumen.sushi-gallery.ru/" },
  { label: "Скидка 12% на заказ от 1500 по промокоду, действует в Мир Суши", code: "SportLiga", referralLink: "https://tyumen.mirsushi.com/" },
  { label: "Скидка 10% на заказ в Lacoste", code: "SportLiga", referralLink: "https://lacoste.ru/catalog/sales/?utm_source=yandex&utm_medium=cpc&utm_campaign=search_pure_brands&utm_term=---autotargeting&utm_content=pid%7C53835051871%7Crid%7C53835051871%7Ccid%7C76681676%7Cct%7Ctype1%7Cgid%7C5518396521%7Caid%7C16689731658%7Cap%7Cno%7Capt%7Cnone%7Cdt%7Cdesktop%7Catn%7C%7Catid%7C53835051871%7Cpos%7C2%7Cpost%7Cpremium%7Csrc%7Cnone%7Csrct%7Csearch%7Crgn%7CМосква%7Crgid%7C213&yclid=17026057983130337279"},
   // +8 промиков

  // внизу промокоды из синий таблицы, без реферальной ссылки (9 штук)
  { label: "Скидка 25% на подписку Premium в Twinby", code: "SPORT", referralLink: "https://twinby.biz/sport" },
  { label: "Подписка 45 дней за 1 рубль в START по персональному промокоду", code: "gr45sportl", referralLink: "https://start.ru/" },

];

const PromoNotification = ({ message }) => (
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

function PromoCodeChest({ promoCode }) {
  const [notification, setNotification] = useState(null);
  const { playButtonClickSound } = useContext(SoundContext);
  const [opened, setOpened] = useState(false);

  const handleOpenChest = () => {
    playButtonClickSound();
    setOpened(true);
  };

  const handleReferralLinkClick = () => {
    trackGoal('promo_referral_click');
    logEvent("engagement", "click_referral_link", "Клик Перейти по ссылке");
  };

  const copyToClipboard = () => {
    playButtonClickSound();
    trackGoal('promo_copy');
    logEvent("engagement", "click_copy_promo", "Клик Скопировать промокод");
    navigator.clipboard.writeText(promoCode.code).then(() => {
      setNotification("Промокод скопирован!");
      setTimeout(() => setNotification(null), 3000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <motion.div
      className="promo-chest-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="promo-chest-container">
        {!opened ? (
          <motion.button
            className="chest-btn"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleOpenChest}
          >
            <span role="img" aria-label="chest" className="chest-icon">🗄️</span>
            <span className="chest-text">Открыть сундук победителя!</span>
          </motion.button>
        ) : (
          <AnimatePresence>
            <motion.div
              className="chest-content"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="promo-code-win">
                <span className="win-badge">🏆 Победитель!</span>
                <div className="promo-label">{promoCode?.label}</div>
                <div className="promo-code-text">
                  Ваш промокод: <strong>{promoCode?.code}</strong>
                </div>
              </div>
              <div className="chest-actions">
                <motion.button
                  onClick={copyToClipboard}
                  className="copy-button"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📋 Скопировать
                </motion.button>
                {promoCode?.referralLink && (
                  <motion.a
                    href={promoCode.referralLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="referral-link chest-referral"
                    whileHover={{ scale: 1.08 }}
                    onClick={handleReferralLinkClick}
                  >
                    🚀 Перейти по ссылке
                  </motion.a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
      {notification && <PromoNotification message={notification} />}
    </motion.div>
  );
}


export default PromoCodeTicket;